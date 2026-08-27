import Image from "next/image";
import { motion } from "framer-motion";
import type { Desk } from "@/types";

interface DeskRendererProps {
  desk: Desk;
}

export function DeskRenderer({ desk }: DeskRendererProps) {
  return (
    <motion.div
      key={desk.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="absolute bottom-[20%] left-1/2 -translate-x-1/2 z-10 w-[70%]"
    >
      <Image
        src={desk.image}
        alt={`${desk.name} - ${desk.description}`}
        width={800}
        height={400}
        className="w-full h-auto"
        priority
      />
    </motion.div>
  );
}
