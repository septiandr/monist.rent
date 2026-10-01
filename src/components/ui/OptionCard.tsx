"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Star, Sparkles } from "lucide-react";
import type { Desk, Chair } from "@/types";
import { formatIDR } from "@/lib/utils";

interface OptionCardProps {
  item: Desk | Chair;
  isSelected: boolean;
  onSelect: (item: Desk | Chair) => void;
}

export function OptionCard({ item, isSelected, onSelect }: OptionCardProps) {
  const features = "features" in item ? item.features : item.ergonomicHighlights;
  const dimensions = "dimensions" in item ? item.dimensions : undefined;

  return (
    <motion.button
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(item)}
      className={`group relative flex flex-col gap-3 p-4 rounded-2xl text-left transition-all duration-300 cursor-pointer ${
        isSelected
          ? "bg-teal-50/90 border-2 border-teal-600 ring-4 ring-teal-500/15 shadow-lg"
          : "bg-white border border-slate-200/90 shadow-sm hover:border-teal-300 hover:shadow-xl hover:bg-slate-50/50"
      }`}
      aria-label={`Pilih ${item.name}`}
    >
      {/* Selected Indicator Pill */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-600 text-white shadow-md z-10"
        >
          <Check className="w-3.5 h-3.5 stroke-[3]" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Active</span>
        </motion.div>
      )}

      {/* Product Image Frame with Studio Lighting Glow */}
      <div className="relative w-full h-[150px] overflow-hidden rounded-xl bg-gradient-to-b from-slate-100/90 via-slate-50 to-slate-200/50 border border-slate-200/60 p-2 flex items-center justify-center">
        <Image
          src={item.image}
          alt={`${item.name} - ${item.description}`}
          fill
          className="object-contain p-2 drop-shadow-md transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 40vw"
        />

        {/* Subtle Nomad Rating Badge */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-sm border border-slate-200/70 text-[10px] font-bold text-slate-700 shadow-xs">
          <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
          <span>4.9/5 Nomad Pick</span>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-slate-900 tracking-tight">
            {item.name}
          </h3>
        </div>

        <p className="text-xs text-slate-500 line-clamp-1">{item.description}</p>

        {dimensions && (
          <p className="text-[11px] font-mono text-slate-400 mt-0.5">{dimensions}</p>
        )}
      </div>

      {/* Tactile Specs Badges */}
      <div className="flex flex-wrap gap-1.5">
        {features.map((feature) => (
          <span
            key={feature}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700"
          >
            <Sparkles className="w-2.5 h-2.5 text-teal-600" />
            {feature}
          </span>
        ))}
      </div>

      {/* Price Footer */}
      <div className="flex items-baseline justify-between pt-2.5 border-t border-slate-100 mt-1">
        <span className="text-xs text-slate-400 font-medium">Rental Rate</span>
        <div className="text-right">
          <p className="text-base font-black text-teal-700">
            {formatIDR(item.pricePerMonth)}
          </p>
        </div>
      </div>
    </motion.button>
  );
}
