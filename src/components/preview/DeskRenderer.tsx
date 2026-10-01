"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Desk } from "@/types";

interface DeskRendererProps {
  desk: Desk;
  isStandingMode: boolean;
}

export function DeskRenderer({ desk, isStandingMode }: DeskRendererProps) {
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
          className="object-contain drop-shadow-xl"
          priority
          sizes="(max-width: 1024px) 80vw, 50vw"
        />
      </div>
    </motion.div>
  );
}
