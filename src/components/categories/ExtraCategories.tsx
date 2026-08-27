"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { extras } from "@/data/extras";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import type { ExtraItem } from "@/types";

const sectionLabels: Record<string, string> = {
  coffee: "Coffee Station",
  outdoor: "Outdoor Gear",
  relax: "Relax Zone",
  garage: "Garage Space",
};

const sectionOrder = ["coffee", "outdoor", "relax", "garage"];

function ExtraCard({ item }: { item: ExtraItem }) {
  const selectedExtras = useWorkspaceStore((state) => state.selectedExtras);
  const toggleExtra = useWorkspaceStore((state) => state.toggleExtra);
  const isSelected = selectedExtras.some((e) => e.id === item.id);

  return (
    <button
      onClick={() => toggleExtra(item)}
      className={`relative flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200 cursor-pointer min-w-[140px] flex-shrink-0 ${
        isSelected
          ? "bg-teal-50 border-2 border-teal-600 shadow-md"
          : "bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-slate-300"
      }`}
      aria-label={`${isSelected ? "Hapus" : "Tambah"} ${item.name}`}
    >
      {isSelected && (
        <Check className="absolute top-2 right-2 w-4 h-4 text-teal-600" />
      )}
      <div className="relative w-16 h-16 overflow-hidden rounded-lg">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>
      <p className="text-xs font-semibold text-slate-900 text-center">
        {item.name}
      </p>
      <p className="text-[10px] text-teal-600 font-medium">
        {isSelected ? "Added" : `+ Add ${item.name}`}
      </p>
    </button>
  );
}

export function ExtraCategories() {
  const grouped = sectionOrder.map((section) => ({
    section,
    label: sectionLabels[section],
    items: extras.filter((e) => e.section === section),
  }));

  return (
    <div className="flex gap-4 py-6 px-4 lg:px-6 overflow-x-auto">
      {grouped.map(({ section, label, items }) => (
        <div
          key={section}
          className="flex flex-col gap-3 min-w-[300px] flex-shrink-0"
        >
          <h3 className="text-lg font-bold text-slate-900">{label}</h3>
          <div className="flex gap-3">
            {items.map((item) => (
              <ExtraCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
