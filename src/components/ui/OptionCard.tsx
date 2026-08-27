"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import type { Desk, Chair } from "@/types";
import { formatIDR } from "@/lib/utils";

interface OptionCardProps {
  item: Desk | Chair;
  isSelected: boolean;
  onSelect: (item: Desk | Chair) => void;
}

export function OptionCard({ item, isSelected, onSelect }: OptionCardProps) {
  const features =
    "features" in item ? item.features : item.ergonomicHighlights;
  const dimensions = "dimensions" in item ? item.dimensions : undefined;

  return (
    <button
      onClick={() => onSelect(item)}
      className={`relative flex flex-col gap-3 p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer ${
        isSelected
          ? "bg-teal-50 border-2 border-teal-600 ring-1 ring-teal-200 shadow-md"
          : "bg-white border border-slate-200 shadow-sm hover:bg-slate-50 hover:border-slate-300 hover:shadow-lg"
      }`}
      aria-label={`Pilih ${item.name}`}
    >
      {isSelected && (
        <Check className="absolute top-2 right-2 w-5 h-5 text-teal-600" />
      )}

      <div className="relative w-full h-[140px] overflow-hidden rounded-xl">
        <Image
          src={item.image}
          alt={`${item.name} - ${item.description}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 40vw"
        />
      </div>

      <h3 className="text-base font-semibold text-slate-900">{item.name}</h3>

      {dimensions && (
        <p className="text-xs text-slate-400">{dimensions}</p>
      )}

      <ul className="flex flex-col gap-1">
        {features.map((feature) => (
          <li key={feature} className="text-xs text-slate-500">
            • {feature}
          </li>
        ))}
      </ul>

      <p className="text-base font-semibold text-teal-600">
        {formatIDR(item.pricePerMonth)}
      </p>
    </button>
  );
}
