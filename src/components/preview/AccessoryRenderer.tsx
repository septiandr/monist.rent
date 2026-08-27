import Image from "next/image";
import { motion } from "framer-motion";
import type { Accessory } from "@/types";

interface AccessoryRendererProps {
  accessory: Accessory;
}

const positionStyles: Record<string, string> = {
  left: "left-[5%] bottom-[30%]",
  center: "left-1/2 -translate-x-1/2 bottom-[35%]",
  right: "right-[5%] bottom-[30%]",
};

export function AccessoryRenderer({ accessory }: AccessoryRendererProps) {
  return (
    <motion.div
      key={accessory.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={`absolute z-30 w-[20%] ${positionStyles[accessory.position]}`}
    >
      <Image
        src={accessory.image}
        alt={`${accessory.name} - ${accessory.description}`}
        width={200}
        height={200}
        className="w-full h-auto"
      />
    </motion.div>
  );
}
