"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ImageOff } from "lucide-react";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { DeskRenderer } from "@/components/preview/DeskRenderer";
import { ChairRenderer } from "@/components/preview/ChairRenderer";
import { AccessoryRenderer } from "@/components/preview/AccessoryRenderer";
import { CanvasHotspots } from "@/components/preview/CanvasHotspots";
import { CanvasToolbar } from "@/components/preview/CanvasToolbar";

function CanvasRoomBackdrop({
  timeOfDay,
  cameraAngle,
}: {
  timeOfDay: string;
  cameraAngle: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 transition-colors duration-700 ${
        timeOfDay === "night" ? "bg-slate-950" : "bg-slate-100"
      } ${cameraAngle === "blueprint" ? "opacity-70" : ""}`}
    />
  );
}

export function VisualCanvas() {
  const selectedDesk = useWorkspaceStore((state) => state.selectedDesk);
  const selectedChair = useWorkspaceStore((state) => state.selectedChair);
  const selectedAccessories = useWorkspaceStore((state) => state.selectedAccessories);
  const isStandingMode = useWorkspaceStore((state) => state.isStandingMode);
  const isLampActive = useWorkspaceStore((state) => state.isLampActive);
  const timeOfDay = useWorkspaceStore((state) => state.timeOfDay);
  const cameraAngle = useWorkspaceStore((state) => state.cameraAngle);

  const hasSelection = selectedDesk || selectedChair || selectedAccessories.length > 0;
  const isStandingDesk = selectedDesk?.id === "desk-standing";
  const hasLamp = selectedAccessories.some((a) => a.id === "acc-desk-lamp");

  const cameraTransforms = {
    perspective: { scale: 1, y: 0 },
    focus: { scale: 1.15, y: -20 },
    blueprint: { scale: 0.94, y: 0 },
  };

  return (
    <div className="relative flex flex-col w-full h-full min-h-[540px] rounded-2xl border border-slate-200 shadow-xl overflow-hidden select-none">
      <CanvasToolbar />

      {/* Main 3D Studio Arena */}
      <div className="relative flex-1 w-full min-h-[460px] overflow-hidden">
        {/* Architectural 3D Villa Room Backdrop */}
        <CanvasRoomBackdrop timeOfDay={timeOfDay} cameraAngle={cameraAngle} />

        {/* Dynamic Studio Stage Container (Spring Morphing per Camera Mode) */}
        <motion.div
          animate={cameraTransforms[cameraAngle]}
          transition={{ type: "spring", stiffness: 220, damping: 25 }}
          className="relative w-full h-full"
        >
          {/* Studio Pedestal Platform */}
          <div
            className={`absolute bottom-[7%] left-1/2 -translate-x-1/2 w-[90%] max-w-[720px] h-[76px] rounded-[100%] transition-all duration-700 ${
              cameraAngle === "blueprint"
                ? "border-2 border-dashed border-cyan-400/40 bg-cyan-950/20"
                : timeOfDay === "night"
                  ? "bg-slate-800/80 border border-slate-700/60 shadow-[0_24px_60px_rgba(0,0,0,0.85)]"
                  : "bg-white/90 border border-slate-200/90 shadow-[0_24px_60px_rgba(13,148,136,0.12)]"
            }`}
          />

          {/* Volumetric Lamp Beam Projection */}
          {hasLamp && isLampActive && cameraAngle !== "blueprint" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute right-[12%] bottom-[16%] w-[420px] h-[300px] bg-gradient-to-bl from-amber-300/35 via-amber-400/15 to-transparent rounded-full blur-2xl pointer-events-none z-14"
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

          {/* Accessories Layer */}
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

          {/* In-Canvas Hotspots */}
          {selectedDesk && cameraAngle !== "blueprint" && <CanvasHotspots />}
        </motion.div>

        {/* Empty Canvas State */}
        {!hasSelection && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-30">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white/80 shadow-md">
              <ImageOff className="w-8 h-8 text-teal-600" />
            </div>
            <p className="text-sm font-bold text-slate-700">
              Pilih meja untuk memulai desain workspace-mu
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
