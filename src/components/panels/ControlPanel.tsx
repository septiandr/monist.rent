"use client";

import { motion } from "framer-motion";
import { Armchair, Armchair as ChairIcon, Puzzle } from "lucide-react";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { DeskTab } from "@/components/panels/DeskTab";
import { ChairTab } from "@/components/panels/ChairTab";
import { AccessoryTab } from "@/components/panels/AccessoryTab";

const tabs = [
  { id: "desks" as const, label: "Desks", icon: Armchair },
  { id: "chairs" as const, label: "Chairs", icon: ChairIcon },
  { id: "accessories" as const, label: "Accessories", icon: Puzzle },
];

export function ControlPanel() {
  const activeTab = useWorkspaceStore((state) => state.activeTab);
  const setActiveTab = useWorkspaceStore((state) => state.setActiveTab);

  return (
    <div className="flex flex-col gap-5">
      {/* Sliding Pill Tab Navigation */}
      <div className="relative flex p-1.5 bg-slate-100/90 backdrop-blur rounded-xl border border-slate-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-semibold transition-colors duration-200 cursor-pointer z-10 ${
                isActive ? "text-teal-700" : "text-slate-500 hover:text-slate-900"
              }`}
              aria-label={`Tab ${tab.label}`}
              aria-selected={isActive}
              role="tab"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabPill"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="absolute inset-0 bg-white rounded-lg shadow-sm -z-10"
                />
              )}
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels with Fade Entrance */}
      <div role="tabpanel" className="min-h-[400px]">
        {activeTab === "desks" && <DeskTab />}
        {activeTab === "chairs" && <ChairTab />}
        {activeTab === "accessories" && <AccessoryTab />}
      </div>
    </div>
  );
}
