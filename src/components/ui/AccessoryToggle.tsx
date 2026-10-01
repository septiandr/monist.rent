"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Accessory } from "@/types";
import { formatIDR } from "@/lib/utils";

interface AccessoryToggleProps {
  accessory: Accessory;
  isSelected: boolean;
  isDisabled: boolean;
  onToggle: (accessory: Accessory) => void;
}

export function AccessoryToggle({
  accessory,
  isSelected,
  isDisabled,
  onToggle,
}: AccessoryToggleProps) {
  return (
    <motion.button
      whileHover={isDisabled ? {} : { y: -2 }}
      whileTap={isDisabled ? {} : { scale: 0.99 }}
      onClick={() => onToggle(accessory)}
      disabled={isDisabled}
      className={`flex items-center gap-4 w-full p-3.5 rounded-2xl text-left transition-all duration-200 ${
        isDisabled
          ? "opacity-45 cursor-not-allowed bg-slate-50 border border-slate-200"
          : isSelected
            ? "bg-teal-50/90 border-2 border-teal-500 ring-2 ring-teal-200/50 shadow-sm cursor-pointer"
            : "bg-white border border-slate-200 cursor-pointer hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm"
      }`}
      aria-label={`${isSelected ? "Nonaktifkan" : "Aktifkan"} ${accessory.name}`}
    >
      <div className="relative w-14 h-14 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-b from-slate-100 to-slate-200/60 p-1 border border-slate-200/60">
        <Image
          src={accessory.image}
          alt={`${accessory.name} - ${accessory.description}`}
          fill
          className="object-contain p-1"
          sizes="56px"
        />
      </div>

      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-900 truncate">
            {accessory.name}
          </h4>
        </div>
        <p className="text-xs text-slate-500 truncate">{accessory.description}</p>
        <p className="text-xs font-bold text-teal-600">
          {formatIDR(accessory.pricePerMonth)}
        </p>
      </div>

      {/* Spring Animated Toggle Switch */}
      <div
        className={`relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0 ${
          isSelected ? "bg-teal-600" : "bg-slate-300"
        }`}
        aria-hidden="true"
      >
        <motion.div
          animate={{ x: isSelected ? 20 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow-md"
        />
      </div>
    </motion.button>
  );
}
