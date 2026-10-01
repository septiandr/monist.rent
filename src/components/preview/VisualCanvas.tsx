"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ImageOff } from "lucide-react";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { DeskRenderer } from "@/components/preview/DeskRenderer";
import { ChairRenderer } from "@/components/preview/ChairRenderer";
import { AccessoryRenderer } from "@/components/preview/AccessoryRenderer";
import { CanvasHotspots } from "@/components/preview/CanvasHotspots";
import { CanvasToolbar } from "@/components/preview/CanvasToolbar";

export function VisualCanvas() {
  const selectedDesk = useWorkspaceStore((state) => state.selectedDesk);
  const selectedChair = useWorkspaceStore((state) => state.selectedChair);
  const selectedAccessories = useWorkspaceStore((state) => state.selectedAccessories);
  const isStandingMode = useWorkspaceStore((state) => state.isStandingMode);
  const isLampActive = useWorkspaceStore((state) => state.isLampActive);
  const isNightMode = useWorkspaceStore((state) => state.isNightMode);

  const hasSelection = selectedDesk || selectedChair || selectedAccessories.length > 0;
  const isStandingDesk = selectedDesk?.id === "desk-standing";
  const hasLamp = selectedAccessories.some((a) => a.id === "acc-desk-lamp");

  return (
    <div
      className={`relative flex flex-col w-full h-full min-h-[520px] rounded-2xl border transition-colors duration-500 overflow-hidden shadow-sm ${
        isNightMode
          ? "bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-slate-800"
          : "bg-gradient-to-b from-slate-100/90 via-slate-50 to-teal-50/20 border-slate-200"
      }`}
    >
      <CanvasToolbar />

      {/* Main Studio Interactive Stage */}
      <div className="relative flex-1 w-full min-h-[440px] overflow-hidden select-none">
        {/* Curved Presentation Podium / Pedestal (as in client sketch) */}
        <div
          className={`absolute bottom-[6%] left-1/2 -translate-x-1/2 w-[92%] max-w-[720px] h-[72px] rounded-[100%] transition-colors duration-500 ${
            isNightMode
              ? "bg-slate-800/60 border border-slate-700/50 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              : "bg-white/80 border border-slate-200/90 shadow-[0_20px_50px_rgba(13,148,136,0.08)]"
          }`}
        />

        {/* Ambient Lamp Illumination Wash over the Desk */}
        {hasLamp && isLampActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute right-[12%] bottom-[20%] w-[380px] h-[260px] bg-gradient-to-bl from-amber-300/25 via-amber-400/10 to-transparent rounded-full blur-2xl pointer-events-none z-14"
          />
        )}

        {/* Desk Layer */}
        <AnimatePresence mode="wait">
          {selectedDesk && (
            <DeskRenderer
              key={selectedDesk.id}
              desk={selectedDesk}
              isStandingMode={isStandingMode}
            />
          )}
        </AnimatePresence>

        {/* Chair Layer */}
        <AnimatePresence mode="wait">
          {selectedChair && (
            <ChairRenderer key={selectedChair.id} chair={selectedChair} />
          )}
        </AnimatePresence>

        {/* Accessory Layer */}
        <AnimatePresence>
          {selectedAccessories.map((acc) => (
            <AccessoryRenderer
              key={acc.id}
              accessory={acc}
              isStandingMode={isStandingMode}
              isStandingDesk={isStandingDesk}
            />
          ))}
        </AnimatePresence>

        {/* Interactive In-Canvas Hotspots ('+ Add Monitor!', '+ Place a Plant!') */}
        {selectedDesk && <CanvasHotspots />}

        {/* Empty Canvas State */}
        {!hasSelection && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <ImageOff className="w-12 h-12 text-slate-300" />
            <p className="text-sm font-medium text-slate-400">
              Pilih meja untuk memulai desain workspace-mu
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
