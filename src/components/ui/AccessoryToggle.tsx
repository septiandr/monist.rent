"use client";

import Image from "next/image";
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
    <button
      onClick={() => onToggle(accessory)}
      disabled={isDisabled}
      className={`flex items-center gap-4 w-full p-4 rounded-2xl text-left transition-all duration-200 ${
        isDisabled
          ? "opacity-50 cursor-not-allowed pointer-events-none bg-white border border-slate-200"
          : isSelected
            ? "bg-teal-50 border border-teal-300 cursor-pointer"
            : "bg-white border border-slate-200 cursor-pointer hover:bg-slate-50"
      }`}
      aria-label={`${isSelected ? "Nonaktifkan" : "Aktifkan"} ${accessory.name}`}
    >
      <div className="relative w-12 h-12 flex-shrink-0 overflow-hidden rounded-xl">
        <Image
          src={accessory.image}
          alt={`${accessory.name} - ${accessory.description}`}
          fill
          className="object-cover"
          sizes="48px"
        />
      </div>

      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-slate-900 truncate">
          {accessory.name}
        </h4>
        <p className="text-xs text-slate-500 truncate">
          {accessory.description}
        </p>
        <p className="text-xs font-semibold text-teal-600">
          {formatIDR(accessory.pricePerMonth)}
        </p>
      </div>

      <div
        className={`relative w-10 h-6 rounded-full transition-colors duration-200 ${
          isSelected ? "bg-teal-600" : "bg-slate-300"
        }`}
        aria-hidden="true"
      >
        <div
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
            isSelected ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </div>
    </button>
  );
}
