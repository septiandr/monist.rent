import { SplitLayout } from "@/components/layout/SplitLayout";
import { ControlPanel } from "@/components/panels/ControlPanel";
import { VisualCanvas } from "@/components/preview/VisualCanvas";
import { SummaryBar } from "@/components/summary/SummaryBar";
import { CheckoutModal } from "@/components/summary/CheckoutModal";
import { ExtraCategories } from "@/components/panels/ExtraCategories";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 selection:bg-teal-500 selection:text-white">
      {/* Agency-Grade Header with monis.rent Brand Identity */}
      <header className="py-5 px-4 sm:px-8 bg-white border-b border-slate-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black tracking-tight text-teal-600">
              monis<span className="text-orange-500">.rent</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200/60">
              🌴 Bali Office & Nomad Rentals
            </span>
          </div>

          <div className="text-center sm:text-right">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Design Your Workspace!
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Atur setup meja kerja impianmu & sewa bulanan tanpa ribet
            </p>
          </div>
        </div>
      </header>

      {/* Main Interactive Studio Arena */}
      <main className="flex-1 max-w-7xl mx-auto w-full py-4 sm:py-6">
        <SplitLayout
          controls={<ControlPanel />}
          preview={<VisualCanvas />}
        />
      </main>

      {/* Lifestyle Extras Section (as featured in sketch) */}
      <div className="bg-slate-100/60 border-t border-slate-200">
        <ExtraCategories />
      </div>

      {/* Sticky Bottom Summary Action Bar */}
      <SummaryBar />

      {/* Itemized Checkout Breakdown Modal */}
      <CheckoutModal />
    </div>
  );
}
