"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import type { Accessory } from "@/types";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";

interface AccessoryRendererProps {
  accessory: Accessory;
  isStandingMode: boolean;
  isStandingDesk: boolean;
}

const accessoryLayouts: Record<string, { className: string; zIndex: number }> = {
  "acc-ultrawide-monitor": {
    className: "left-1/2 -translate-x-1/2 bottom-[34%] w-[58%] max-w-[440px]",
    zIndex: 15,
  },
  "acc-dual-monitor": {
    className: "left-1/2 -translate-x-1/2 bottom-[34%] w-[62%] max-w-[460px]",
    zIndex: 15,
  },
  "acc-desk-mat": {
    className: "left-1/2 -translate-x-1/2 bottom-[23%] w-[54%] max-w-[390px]",
    zIndex: 12,
  },
  "acc-laptop-stand": {
    className: "left-[20%] bottom-[28%] w-[26%] max-w-[175px]",
    zIndex: 16,
  },
  "acc-desk-lamp": {
    className: "right-[15%] bottom-[31%] w-[27%] max-w-[185px]",
    zIndex: 18,
  },
  "acc-plant": {
    className: "left-[14%] bottom-[29%] w-[24%] max-w-[160px]",
    zIndex: 18,
  },
};

export function AccessoryRenderer({
  accessory,
  isStandingMode,
  isStandingDesk,
}: AccessoryRendererProps) {
  const toggleAccessory = useWorkspaceStore((state) => state.toggleAccessory);
  const isLampActive = useWorkspaceStore((state) => state.isLampActive);
  const layout = accessoryLayouts[accessory.id] ?? {
    className: "left-1/2 -translate-x-1/2 bottom-[32%] w-[25%]",
    zIndex: 15,
  };

  const elevationOffset = isStandingDesk && isStandingMode ? -36 : 0;
  const isLamp = accessory.id === "acc-desk-lamp";

  return (
    <motion.div
      key={accessory.id}
      initial={{ opacity: 0, scale: 0.9, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: elevationOffset }}
      exit={{ opacity: 0, scale: 0.85, y: -10 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={`group absolute ${layout.className}`}
      style={{ zIndex: layout.zIndex }}
    >
      <div className="relative w-full aspect-square">
        <Image
          src={accessory.image}
          alt={`${accessory.name} - ${accessory.description}`}
          fill
          className={`object-contain transition-all duration-300 ${
            isLamp && isLampActive ? "drop-shadow-[0_0_20px_rgba(251,191,36,0.65)]" : "drop-shadow-lg"
          }`}
          sizes="(max-width: 1024px) 30vw, 20vw"
        />

        {/* Hover Quick-Remove Badge */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleAccessory(accessory);
          }}
          className="absolute -top-2 -right-2 p-1.5 bg-slate-900/85 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md cursor-pointer pointer-events-auto"
          aria-label={`Hapus ${accessory.name}`}
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
