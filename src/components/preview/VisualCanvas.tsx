"use client";

import { AnimatePresence } from "framer-motion";
import { ImageOff } from "lucide-react";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { DeskRenderer } from "@/components/preview/DeskRenderer";
import { ChairRenderer } from "@/components/preview/ChairRenderer";
import { AccessoryRenderer } from "@/components/preview/AccessoryRenderer";

export function VisualCanvas() {
  const selectedDesk = useWorkspaceStore((state) => state.selectedDesk);
  const selectedChair = useWorkspaceStore((state) => state.selectedChair);
  const selectedAccessories = useWorkspaceStore(
    (state) => state.selectedAccessories
  );

  const hasSelection = selectedDesk || selectedChair || selectedAccessories.length > 0;

  return (
    <div className="relative w-full h-full min-h-[400px] lg:min-h-0 bg-gradient-to-b from-slate-50 to-slate-100 rounded-2xl border border-slate-200 overflow-hidden">
      <AnimatePresence mode="wait">
        {selectedDesk && <DeskRenderer key={selectedDesk.id} desk={selectedDesk} />}

        {selectedChair && <ChairRenderer key={selectedChair.id} chair={selectedChair} />}

        {selectedAccessories.map((acc) => (
          <AccessoryRenderer key={acc.id} accessory={acc} />
        ))}
      </AnimatePresence>

      {!hasSelection && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <ImageOff className="w-12 h-12 text-slate-300" />
          <p className="text-sm text-slate-400">
            Pilih meja untuk memulai desainmu
          </p>
        </div>
      )}
    </div>
  );
}
