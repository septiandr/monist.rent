"use client";

import { Sun, Moon, ArrowUpDown, Sparkles, Lamp } from "lucide-react";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";

export function CanvasToolbar() {
  const selectedDesk = useWorkspaceStore((state) => state.selectedDesk);
  const selectedAccessories = useWorkspaceStore((state) => state.selectedAccessories);
  const isStandingMode = useWorkspaceStore((state) => state.isStandingMode);
  const setStandingMode = useWorkspaceStore((state) => state.setStandingMode);
  const isLampActive = useWorkspaceStore((state) => state.isLampActive);
  const setLampActive = useWorkspaceStore((state) => state.setLampActive);
  const isNightMode = useWorkspaceStore((state) => state.isNightMode);
  const setNightMode = useWorkspaceStore((state) => state.setNightMode);
  const applyPreset = useWorkspaceStore((state) => state.applyPreset);

  const hasStandingDesk = selectedDesk?.id === "desk-standing";
  const hasLamp = selectedAccessories.some((a) => a.id === "acc-desk-lamp");

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-white/80 backdrop-blur-md border-b border-slate-200/80 rounded-t-2xl z-40">
      {/* 1-Click Curated Presets */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
        <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">
          <Sparkles className="w-3 h-3 text-teal-600" />
          Presets:
        </span>
        <button
          onClick={() => applyPreset("starter")}
          className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-600 transition-colors cursor-pointer"
          aria-label="Preset Nomad Starter"
        >
          🏄 Nomad
        </button>
        <button
          onClick={() => applyPreset("powerhouse")}
          className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-600 transition-colors cursor-pointer"
          aria-label="Preset Dev Powerhouse"
        >
          ⚡ Dev Pro
        </button>
        <button
          onClick={() => applyPreset("executive")}
          className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-600 transition-colors cursor-pointer"
          aria-label="Preset Bali Villa Executive"
        >
          🌴 Executive
        </button>
      </div>

      {/* Right Controls: Height Motor & Ambiance */}
      <div className="flex items-center gap-2">
        {/* Motorized Height Adjuster (for Standing Desk Pro) */}
        {hasStandingDesk && (
          <div className="flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-200">
            <button
              onClick={() => setStandingMode(false)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                !isStandingMode
                  ? "bg-white text-teal-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              aria-label="Duduk 75 cm"
            >
              <ArrowUpDown className="w-3 h-3" />
              <span>Sit 75cm</span>
            </button>
            <button
              onClick={() => setStandingMode(true)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                isStandingMode
                  ? "bg-teal-600 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              aria-label="Berdiri 110 cm"
            >
              <ArrowUpDown className="w-3 h-3" />
              <span>Stand 110cm</span>
            </button>
          </div>
        )}

        {/* Lamp Glow Switch (if lamp is added) */}
        {hasLamp && (
          <button
            onClick={() => setLampActive(!isLampActive)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              isLampActive
                ? "bg-amber-100 text-amber-800 border border-amber-300"
                : "bg-slate-100 text-slate-500 hover:text-slate-800"
            }`}
            aria-label="Toggle Lampu Meja"
          >
            <Lamp className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Light</span>
          </button>
        )}

        {/* Day / Night Mood Toggle */}
        <button
          onClick={() => setNightMode(!isNightMode)}
          className={`p-1.5 rounded-lg border transition-all ${
            isNightMode
              ? "bg-slate-800 text-amber-300 border-slate-700"
              : "bg-slate-100 text-slate-600 hover:text-slate-900 border-slate-200"
          }`}
          aria-label={isNightMode ? "Switch to Day Mode" : "Switch to Night Mode"}
        >
          {isNightMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
