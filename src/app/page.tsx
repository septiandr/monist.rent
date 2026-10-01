import { SplitLayout } from "@/components/layout/SplitLayout";
import { ControlPanel } from "@/components/panels/ControlPanel";
import { VisualCanvas } from "@/components/preview/VisualCanvas";
import { SummaryBar } from "@/components/summary/SummaryBar";
import { CheckoutModal } from "@/components/summary/CheckoutModal";
import { ExtraCategories } from "@/components/panels/ExtraCategories";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fafaf9] text-slate-900 selection:bg-teal-500 selection:text-white">
      {/* Luxury Editorial Header */}
      <header className="py-4 px-4 sm:px-8 bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 max-w-7xl mx-auto">
          {/* Brand Identity */}
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black tracking-tight text-teal-700">
              monis<span className="text-orange-500">.rent</span>
            </span>
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-teal-50 text-teal-800 border border-teal-200/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Bali Nomad Office Rental</span>
            </div>
          </div>

          {/* Value Props & Trust Badges */}
          <div className="hidden lg:flex items-center gap-5 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-600 font-bold">✓</span> 24h Villa Delivery
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-600 font-bold">✓</span> Free Ergonomic Setup
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-600 font-bold">✓</span> No Lock-In Contracts
            </span>
          </div>

          <div className="text-center md:text-right">
            <h1 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              Design Your Bali Workspace
            </h1>
            <p className="text-[11px] text-slate-400">
              Live 3D Studio Configurator
            </p>
          </div>
        </div>
      </header>

      {/* Main Interactive Configurator Studio Arena */}
      <main className="flex-1 max-w-7xl mx-auto w-full py-4 sm:py-6">
        <SplitLayout
          controls={<ControlPanel />}
          preview={<VisualCanvas />}
        />
      </main>

      {/* Lifestyle Extras (Coffee, Outdoor, Relax, Garage) */}
      <div className="bg-slate-100/70 border-t border-slate-200">
        <ExtraCategories />
      </div>

      {/* Sticky Bottom Summary Dock */}
      <SummaryBar />

      {/* Itemized Checkout Modal */}
      <CheckoutModal />
    </div>
  );
}
