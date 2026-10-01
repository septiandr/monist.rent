"use client";

import { Sun, Moon, Sunrise, Volume2, VolumeX, Eye, Sparkles, Layers, Sliders } from "lucide-react";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import type { CameraAngle } from "@/types";

export function CanvasToolbar() {
  const selectedDesk = useWorkspaceStore((state) => state.selectedDesk);
  const isStandingMode = useWorkspaceStore((state) => state.isStandingMode);
  const setStandingMode = useWorkspaceStore((state) => state.setStandingMode);
  const timeOfDay = useWorkspaceStore((state) => state.timeOfDay);
  const setTimeOfDay = useWorkspaceStore((state) => state.setTimeOfDay);
  const cameraAngle = useWorkspaceStore((state) => state.cameraAngle);
  const setCameraAngle = useWorkspaceStore((state) => state.setCameraAngle);
  const isSoundEnabled = useWorkspaceStore((state) => state.isSoundEnabled);
  const toggleSound = useWorkspaceStore((state) => state.toggleSound);
  const applyPreset = useWorkspaceStore((state) => state.applyPreset);

  const hasStandingDesk = selectedDesk?.id === "desk-standing";

  return (
    <div className="flex flex-wrap items-center justify-between gap-2.5 p-3 bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border-b border-slate-200/80 rounded-t-2xl z-40 transition-colors">
      {/* 1-Click Curated Presets */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
        <span className="flex items-center gap-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
          <Sparkles className="w-3 h-3 text-teal-600" />
          Presets:
        </span>
        <button
          onClick={() => applyPreset("starter")}
          className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-700 transition-colors cursor-pointer"
          aria-label="Preset Nomad Starter"
        >
          🏄 Nomad
        </button>
        <button
          onClick={() => applyPreset("powerhouse")}
          className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-700 transition-colors cursor-pointer"
          aria-label="Preset Dev Powerhouse"
        >
          ⚡ Dev Pro
        </button>
        <button
          onClick={() => applyPreset("executive")}
          className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-700 transition-colors cursor-pointer"
          aria-label="Preset Bali Villa Executive"
        >
          🌴 Executive
        </button>
      </div>

      {/* Center/Right: Camera Angle + Time + Sound + Motor */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Camera Angle Selector */}
        <div className="flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-200/80">
          {(["perspective", "focus", "blueprint"] as CameraAngle[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setCameraAngle(mode)}
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-bold capitalize transition-all ${
                cameraAngle === mode
                  ? "bg-white text-teal-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              aria-label={`Kamera ${mode}`}
            >
              {mode === "perspective" && <Eye className="w-3 h-3" />}
              {mode === "focus" && <Sliders className="w-3 h-3" />}
              {mode === "blueprint" && <Layers className="w-3 h-3" />}
              <span className="hidden sm:inline">{mode}</span>
            </button>
          ))}
        </div>

        {/* Motorized Height Adjuster (for Standing Desk Pro) */}
        {hasStandingDesk && (
          <div className="flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-200">
            <button
              onClick={() => setStandingMode(false)}
              className={`px-2 py-1 rounded-md text-[11px] font-bold transition-all ${
                !isStandingMode
                  ? "bg-white text-teal-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              aria-label="Duduk 75 cm"
            >
              75cm Sit
            </button>
            <button
              onClick={() => setStandingMode(true)}
              className={`px-2 py-1 rounded-md text-[11px] font-bold transition-all ${
                isStandingMode
                  ? "bg-teal-600 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              aria-label="Berdiri 110 cm"
            >
              110cm Stand
            </button>
          </div>
        )}

        {/* Time of Day Mood Lighting (Day / Sunset / Night) */}
        <div className="flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-200/80">
          <button
            onClick={() => setTimeOfDay("day")}
            className={`p-1.5 rounded-md transition-all ${timeOfDay === "day" ? "bg-amber-100 text-amber-800 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
            aria-label="Day Mode"
          >
            <Sun className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setTimeOfDay("sunset")}
            className={`p-1.5 rounded-md transition-all ${timeOfDay === "sunset" ? "bg-orange-100 text-orange-800 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
            aria-label="Sunset Mode"
          >
            <Sunrise className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setTimeOfDay("night")}
            className={`p-1.5 rounded-md transition-all ${timeOfDay === "night" ? "bg-slate-800 text-indigo-300 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
            aria-label="Night Mode"
          >
            <Moon className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Sound Toggle Button */}
        <button
          onClick={toggleSound}
          className={`p-1.5 rounded-lg border transition-all ${
            isSoundEnabled
              ? "bg-teal-50 text-teal-700 border-teal-200"
              : "bg-slate-100 text-slate-400 border-slate-200"
          }`}
          aria-label={isSoundEnabled ? "Mute audio" : "Enable tactile sound"}
          title={isSoundEnabled ? "Sound: On" : "Sound: Off"}
        >
          {isSoundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
}
