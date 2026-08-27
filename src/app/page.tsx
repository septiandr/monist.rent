import { SplitLayout } from "@/components/layout/SplitLayout";
import { ControlPanel } from "@/components/panels/ControlPanel";
import { VisualCanvas } from "@/components/preview/VisualCanvas";
import { SummaryBar } from "@/components/summary/SummaryBar";
import { CheckoutModal } from "@/components/summary/CheckoutModal";
import { ExtraCategories } from "@/components/categories/ExtraCategories";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex flex-col items-center gap-2 py-8 px-6 bg-white border-b border-slate-200">
        <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">
          Design Your Workspace!
        </h1>
        <p className="text-sm text-slate-500">
          — Create Your Perfect Setup! —
        </p>
      </header>

      <main className="flex-1 min-h-0">
        <SplitLayout
          controls={<ControlPanel />}
          preview={<VisualCanvas />}
        />
      </main>

      <SummaryBar />
      <ExtraCategories />
      <CheckoutModal />
    </div>
  );
}
