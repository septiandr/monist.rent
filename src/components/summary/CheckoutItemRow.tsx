"use client";

import { Armchair, Armchair as ChairIcon, Puzzle, Package } from "lucide-react";
import type { ItemSummary } from "@/types";
import { formatIDR } from "@/lib/utils";

const typeIcons = {
  desk: Armchair,
  chair: ChairIcon,
  accessory: Puzzle,
  extra: Package,
};

const sectionLabels: Record<string, string> = {
  coffee: "Coffee Station",
  outdoor: "Outdoor Gear",
  relax: "Relax Zone",
  garage: "Garage Space",
};

interface CheckoutItemRowProps {
  item: ItemSummary;
}

export function CheckoutItemRow({ item }: CheckoutItemRowProps) {
  const Icon = typeIcons[item.type];
  const label =
    item.type === "extra" && item.section
      ? sectionLabels[item.section] ?? item.section
      : item.type;

  return (
    <div className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex-shrink-0">
          <Icon className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-900 truncate">
            {item.name}
          </p>
          <p className="text-[11px] text-slate-400 capitalize">{label}</p>
        </div>
      </div>
      <p className="text-sm font-bold text-teal-600 ml-4 flex-shrink-0">
        {formatIDR(item.pricePerMonth)}
      </p>
    </div>
  );
}
