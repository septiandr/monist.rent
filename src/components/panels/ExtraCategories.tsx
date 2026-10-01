"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import { extras } from "@/data/extras";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import type { ExtraItem } from "@/types";
import { formatIDR } from "@/lib/utils";

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
    <motion.button
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => toggleExtra(item)}
      className={`relative flex flex-col items-center gap-2.5 p-3 rounded-2xl transition-all duration-200 cursor-pointer min-w-[150px] flex-shrink-0 ${
        isSelected
          ? "bg-teal-50/90 border-2 border-teal-600 ring-2 ring-teal-200/50 shadow-md"
          : "bg-white border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md"
      }`}
      aria-label={`${isSelected ? "Hapus" : "Tambah"} ${item.name}`}
    >
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 right-2 flex items-center justify-center w-5 h-5 rounded-full bg-teal-600 text-white z-10"
        >
          <Check className="w-3 h-3" />
        </motion.div>
      )}

      <div className="relative w-20 h-20 overflow-hidden rounded-xl bg-gradient-to-b from-slate-100 to-slate-200/60 p-1.5 border border-slate-200/60">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-contain p-1"
          sizes="80px"
        />
      </div>

      <div className="flex flex-col items-center gap-0.5 w-full text-center">
        <p className="text-xs font-bold text-slate-900 truncate w-full">
          {item.name}
        </p>
        <p className="text-[11px] font-semibold text-teal-600">
          {formatIDR(item.pricePerMonth)}
        </p>
      </div>

      <span
        className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${
          isSelected
            ? "bg-teal-600 text-white"
            : "bg-slate-100 text-slate-600 hover:bg-teal-50 hover:text-teal-700"
        }`}
      >
        {isSelected ? (
          <span>Added ✓</span>
        ) : (
          <>
            <Plus className="w-2.5 h-2.5" />
            <span>Add</span>
          </>
        )}
      </span>
    </motion.button>
  );
}

export function ExtraCategories() {
  const grouped = sectionOrder.map((section) => ({
    section,
    label: sectionLabels[section],
    items: extras.filter((e) => e.section === section),
  }));

  return (
    <div className="flex flex-col gap-3 py-6 px-4 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-black text-slate-900 tracking-tight">
          Complete Your Bali Lifestyle Setup
        </h3>
        <p className="text-xs text-slate-500">
          Tambahkan perlengkapan pendukung kopi, outdoor, relaksasi, dan storage untuk villa/kantormu.
        </p>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4 pt-1 no-scrollbar">
        {grouped.map(({ section, label, items }) => (
          <div key={section} className="flex flex-col gap-2.5 flex-shrink-0">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {label}
            </h4>
            <div className="flex gap-3">
              {items.map((item) => (
                <ExtraCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
