"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
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
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onSelect(item)}
      className={`relative flex flex-col gap-3 p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer ${
        isSelected
          ? "bg-teal-50/90 border-2 border-teal-600 ring-2 ring-teal-200/60 shadow-md"
          : "bg-white border border-slate-200 shadow-sm hover:bg-slate-50 hover:border-slate-300 hover:shadow-md"
      }`}
      aria-label={`Pilih ${item.name}`}
    >
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3 flex items-center justify-center w-6 h-6 rounded-full bg-teal-600 text-white shadow-sm z-10"
        >
          <Check className="w-4 h-4" />
        </motion.div>
      )}

      {/* Product Image Frame with Ambient Pedestal */}
      <div className="relative w-full h-[145px] overflow-hidden rounded-xl bg-gradient-to-b from-slate-100/70 to-slate-200/50 border border-slate-200/60 p-2">
        <Image
          src={item.image}
          alt={`${item.name} - ${item.description}`}
          fill
          className="object-contain p-2 drop-shadow-md transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 40vw"
        />
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">{item.name}</h3>
        </div>

        <p className="text-xs text-slate-500 line-clamp-1">{item.description}</p>

        {dimensions && (
          <p className="text-[11px] font-mono text-slate-400 mt-0.5">{dimensions}</p>
        )}
      </div>

      {/* Features Pills */}
      <div className="flex flex-wrap gap-1.5 mt-1">
        {features.map((feature) => (
          <span
            key={feature}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-600"
          >
            <Sparkles className="w-2.5 h-2.5 text-teal-600" />
            {feature}
          </span>
        ))}
      </div>

      <div className="flex items-baseline justify-between pt-2 border-t border-slate-100 mt-1">
        <span className="text-xs text-slate-400">Sewa per bulan</span>
        <p className="text-base font-bold text-teal-600">
          {formatIDR(item.pricePerMonth)}
        </p>
      </div>
    </motion.button>
  );
}
