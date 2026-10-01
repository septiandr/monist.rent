"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Chair } from "@/types";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";

interface ChairRendererProps {
  chair: Chair;
}

export function ChairRenderer({ chair }: ChairRendererProps) {
  const cameraAngle = useWorkspaceStore((state) => state.cameraAngle);

  return (
    <motion.div
      key={chair.id}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -15, scale: 0.95 }}
      whileHover={{ y: -6, rotate: 1 }}
      whileTap={{ scale: 0.97 }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 22,
      }}
      className="absolute bottom-[9%] left-1/2 -translate-x-1/2 z-20 w-[40%] max-w-[280px] pointer-events-auto cursor-pointer"
    >
      <div className="relative w-full aspect-[400/500]">
        <Image
          src={chair.image}
          alt={`${chair.name} - ${chair.description}`}
          fill
          className="object-contain drop-shadow-2xl"
          sizes="(max-width: 1024px) 45vw, 25vw"
        />

        {/* Blueprint Ergonomic Clearance Arc */}
        {cameraAngle === "blueprint" && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-44 h-16 border border-cyan-400/50 rounded-[100%] flex items-center justify-center font-mono text-[8px] text-cyan-300 pointer-events-none">
            Ø 650mm CASTER SWEEP
          </div>
        )}
      </div>
    </motion.div>
  );
}
