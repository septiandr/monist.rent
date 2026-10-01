"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Desk } from "@/types";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";

interface DeskRendererProps {
  desk: Desk;
  isStandingMode: boolean;
}

export function DeskRenderer({ desk, isStandingMode }: DeskRendererProps) {
  const cameraAngle = useWorkspaceStore((state) => state.cameraAngle);
  const isStandingDesk = desk.id === "desk-standing";
  const elevationOffset = isStandingDesk && isStandingMode ? -36 : 0;

  return (
    <motion.div
      key={desk.id}
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={{ opacity: 1, y: elevationOffset, scale: 1 }}
      exit={{ opacity: 0, y: -15, scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 24,
      }}
      className="absolute bottom-[20%] left-1/2 -translate-x-1/2 z-10 w-[78%] max-w-[620px] pointer-events-none"
    >
      <div className="relative w-full aspect-[800/420]">
        <Image
          src={desk.image}
          alt={`${desk.name} - ${desk.description}`}
          fill
          className="object-contain drop-shadow-2xl"
          priority
          sizes="(max-width: 1024px) 80vw, 50vw"
        />

        {/* Blueprint Dimension Overlay Lines */}
        {cameraAngle === "blueprint" && (
          <div className="absolute inset-0 flex flex-col justify-between p-2 pointer-events-none font-mono text-[9px] text-cyan-400">
            <div className="flex items-center justify-between border-b border-dashed border-cyan-400/50 pb-1">
              <span>◄ 1200 mm (WIDTH) ►</span>
              <span>DEPTH: 600 mm</span>
            </div>
            <div className="flex items-center justify-between border-t border-dashed border-cyan-400/50 pt-1">
              <span>{isStandingDesk ? "MOTOR: DUAL TELESCOPIC" : "FRAME: SOLID FSC TEAK"}</span>
              <span>{isStandingMode ? "ELEVATION: 1100 mm" : "ELEVATION: 750 mm"}</span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
