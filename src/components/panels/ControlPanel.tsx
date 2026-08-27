"use client";

import { Armchair, Armchair as ChairIcon, Puzzle } from "lucide-react";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { DeskTab } from "@/components/panels/DeskTab";
import { ChairTab } from "@/components/panels/ChairTab";
import { AccessoryTab } from "@/components/panels/AccessoryTab";

const tabs = [
  { id: "chairs" as const, label: "Chairs", icon: ChairIcon },
  { id: "desks" as const, label: "Desks", icon: Armchair },
  { id: "accessories" as const, label: "Accessories", icon: Puzzle },
];

export function ControlPanel() {
  const activeTab = useWorkspaceStore((state) => state.activeTab);
  const setActiveTab = useWorkspaceStore((state) => state.setActiveTab);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 p-1 bg-slate-100 rounded-lg overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? "bg-white shadow-sm font-semibold text-teal-600"
                  : "text-slate-500 hover:text-slate-700"
              }`}
              aria-label={`Tab ${tab.label}`}
              aria-selected={isActive}
              role="tab"
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div role="tabpanel">
        {activeTab === "chairs" && <ChairTab />}
        {activeTab === "desks" && <DeskTab />}
        {activeTab === "accessories" && <AccessoryTab />}
      </div>
    </div>
  );
}
