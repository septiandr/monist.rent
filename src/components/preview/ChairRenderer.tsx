"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Chair } from "@/types";

interface ChairRendererProps {
  chair: Chair;
}

export function ChairRenderer({ chair }: ChairRendererProps) {
  return (
    <motion.div
      key={chair.id}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -15, scale: 0.95 }}
      whileHover={{ y: -4 }}
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
      </div>
    </motion.div>
  );
}
