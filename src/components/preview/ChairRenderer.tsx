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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="absolute bottom-[10%] left-1/2 -translate-x-1/2 z-20 w-[35%]"
    >
      <Image
        src={chair.image}
        alt={`${chair.name} - ${chair.description}`}
        width={400}
        height={500}
        className="w-full h-auto"
      />
    </motion.div>
  );
}
