"use client";

import { motion } from "framer-motion";
import type { TimeOfDay, CameraAngle } from "@/types";

interface CanvasRoomBackdropProps {
  timeOfDay: TimeOfDay;
  cameraAngle: CameraAngle;
}

export function CanvasRoomBackdrop({
  timeOfDay,
  cameraAngle,
}: CanvasRoomBackdropProps) {
  const isBlueprint = cameraAngle === "blueprint";

  if (isBlueprint) {
    return (
      <div className="absolute inset-0 bg-[#091e3a] overflow-hidden pointer-events-none transition-colors duration-500">
        {/* Engineering Blueprint Grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)",
            backgroundSize: "160px 160px",
          }}
        />
        {/* Blueprint Architectural Dimension Markers */}
        <div className="absolute top-6 left-6 font-mono text-[10px] text-cyan-400/80 tracking-widest uppercase">
          BALI VILLA ARCHITECTURAL SPEC // SCALE 1:20
        </div>
        <div className="absolute bottom-6 right-6 font-mono text-[10px] text-cyan-400/60">
          CLEARANCE: 1800mm x 1200mm | POWER: 220V/50Hz
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none transition-all duration-700">
      {/* Dynamic Sky Gradient (Through Window Wall) */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          timeOfDay === "sunset"
            ? "bg-gradient-to-b from-amber-600/30 via-rose-500/20 to-slate-900/60"
            : timeOfDay === "night"
              ? "bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
              : "bg-gradient-to-b from-sky-100/60 via-slate-50 to-teal-50/20"
        }`}
      />

      {/* Villa Window Frame Mullions & Tropical Palms Silhouette */}
      <div className="absolute top-0 left-0 right-0 h-[65%] border-b border-black/5 opacity-70">
        {/* Palm Fronds Shadow in Window Background */}
        <div
          className={`absolute top-2 right-8 w-64 h-48 rounded-full blur-2xl transition-opacity duration-700 ${
            timeOfDay === "sunset"
              ? "bg-orange-500/15"
              : timeOfDay === "night"
                ? "bg-teal-500/5"
                : "bg-emerald-500/10"
          }`}
        />
        <div className="absolute top-0 bottom-0 left-[28%] w-[1px] bg-slate-300/30" />
        <div className="absolute top-0 bottom-0 right-[28%] w-[1px] bg-slate-300/30" />
        <div className="absolute top-[42%] left-0 right-0 h-[1px] bg-slate-300/25" />
      </div>

      {/* 3D Perspective Terrazzo / Herringbone Studio Floor */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-[48%] border-t transition-colors duration-700 ${
          timeOfDay === "night"
            ? "bg-gradient-to-b from-slate-900 to-slate-950 border-slate-800"
            : timeOfDay === "sunset"
              ? "bg-gradient-to-b from-amber-950/20 to-stone-900/40 border-amber-900/20"
              : "bg-gradient-to-b from-slate-200/50 via-slate-100/80 to-slate-200/90 border-slate-300/60"
        }`}
        style={{
          perspective: "600px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Floor Depth Plank Perspective Lines */}
        <div className="absolute inset-0 opacity-15 overflow-hidden">
          <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-slate-700" />
          <div className="absolute left-[24%] top-0 bottom-0 w-[1px] bg-slate-700" />
          <div className="absolute left-[40%] top-0 bottom-0 w-[1px] bg-slate-700" />
          <div className="absolute right-[40%] top-0 bottom-0 w-[1px] bg-slate-700" />
          <div className="absolute right-[24%] top-0 bottom-0 w-[1px] bg-slate-700" />
          <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-slate-700" />
        </div>
      </div>

      {/* Sunlight Ray Beam Streaming through Blinds (for Morning Day mode) */}
      {timeOfDay === "day" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.12 }}
          className="absolute -top-12 -left-16 w-[700px] h-[700px] bg-gradient-to-br from-amber-200 via-yellow-100 to-transparent transform -rotate-25 blur-3xl pointer-events-none"
        />
      )}
    </div>
  );
}
