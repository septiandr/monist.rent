"use client";

import { motion } from "framer-motion";
import { Plus, Monitor, Leaf, Lamp } from "lucide-react";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { accessories } from "@/data/accessories";

export function CanvasHotspots() {
  const selectedAccessories = useWorkspaceStore((state) => state.selectedAccessories);
  const toggleAccessory = useWorkspaceStore((state) => state.toggleAccessory);
  const setActiveTab = useWorkspaceStore((state) => state.setActiveTab);

  const hasMonitor = selectedAccessories.some((a) => a.category === "monitor");
  const hasPlant = selectedAccessories.some((a) => a.id === "acc-plant");
  const hasLamp = selectedAccessories.some((a) => a.id === "acc-desk-lamp");

  const handleAddMonitor = () => {
    const ultrawide = accessories.find((a) => a.id === "acc-ultrawide-monitor");
    if (ultrawide) toggleAccessory(ultrawide);
    setActiveTab("accessories");
  };

  const handleAddPlant = () => {
    const plant = accessories.find((a) => a.id === "acc-plant");
    if (plant) toggleAccessory(plant);
    setActiveTab("accessories");
  };

  const handleAddLamp = () => {
    const lamp = accessories.find((a) => a.id === "acc-desk-lamp");
    if (lamp) toggleAccessory(lamp);
    setActiveTab("accessories");
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-25">
      {!hasMonitor && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          onClick={handleAddMonitor}
          className="absolute left-1/2 -translate-x-1/2 bottom-[46%] flex items-center gap-1.5 px-3 py-1.5 bg-white/90 hover:bg-white border-2 border-dashed border-teal-500/70 hover:border-teal-600 rounded-full text-xs font-semibold text-teal-700 shadow-md backdrop-blur-sm cursor-pointer pointer-events-auto transition-all"
          aria-label="Add Monitor"
        >
          <Plus className="w-3.5 h-3.5 text-teal-600" />
          <Monitor className="w-3.5 h-3.5 text-teal-600" />
          <span>+ Add Monitor!</span>
        </motion.button>
      )}

      {!hasPlant && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          onClick={handleAddPlant}
          className="absolute left-[12%] bottom-[32%] flex items-center gap-1.5 px-2.5 py-1.5 bg-white/90 hover:bg-white border-2 border-dashed border-emerald-500/70 hover:border-emerald-600 rounded-full text-[11px] font-semibold text-emerald-700 shadow-md backdrop-blur-sm cursor-pointer pointer-events-auto transition-all"
          aria-label="Place a Plant"
        >
          <Leaf className="w-3.5 h-3.5 text-emerald-600" />
          <span>+ Place a Plant!</span>
        </motion.button>
      )}

      {!hasLamp && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          onClick={handleAddLamp}
          className="absolute right-[14%] bottom-[34%] flex items-center gap-1.5 px-2.5 py-1.5 bg-white/90 hover:bg-white border-2 border-dashed border-amber-500/70 hover:border-amber-600 rounded-full text-[11px] font-semibold text-amber-700 shadow-md backdrop-blur-sm cursor-pointer pointer-events-auto transition-all"
          aria-label="Add Lamp"
        >
          <Lamp className="w-3.5 h-3.5 text-amber-600" />
          <span>+ Add Lamp!</span>
        </motion.button>
      )}
    </div>
  );
}
