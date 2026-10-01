"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Check } from "lucide-react";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { formatIDR } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function SummaryBar() {
  const selectedDesk = useWorkspaceStore((state) => state.selectedDesk);
  const selectedChair = useWorkspaceStore((state) => state.selectedChair);
  const selectedAccessories = useWorkspaceStore((state) => state.selectedAccessories);
  const selectedExtras = useWorkspaceStore((state) => state.selectedExtras);
  const getTotalPrice = useWorkspaceStore((state) => state.getTotalPrice);
  const openCheckout = useWorkspaceStore((state) => state.openCheckout);

  const itemCount =
    (selectedDesk ? 1 : 0) +
    (selectedChair ? 1 : 0) +
    selectedAccessories.length +
    selectedExtras.length;
  const totalPrice = getTotalPrice();

  return (
    <div className="sticky bottom-0 left-0 right-0 w-full bg-white/90 backdrop-blur-xl border-t border-slate-200 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] z-50 transition-all">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-3.5 px-4 lg:px-8 max-w-7xl mx-auto">
        {/* Left: Setup Checklist Pills */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center justify-center w-11 h-11 rounded-xl bg-teal-50 border border-teal-200 text-teal-600">
            <ShoppingBag className="w-5 h-5" />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md ${selectedDesk ? "bg-teal-50 text-teal-700 border border-teal-200" : "bg-slate-100 text-slate-400"}`}>
                {selectedDesk && <Check className="w-3 h-3" />} Desk
              </span>
              <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md ${selectedChair ? "bg-teal-50 text-teal-700 border border-teal-200" : "bg-slate-100 text-slate-400"}`}>
                {selectedChair && <Check className="w-3 h-3" />} Chair
              </span>
              <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md ${selectedAccessories.length > 0 ? "bg-teal-50 text-teal-700 border border-teal-200" : "bg-slate-100 text-slate-400"}`}>
                {selectedAccessories.length > 0 && <Check className="w-3 h-3" />} {selectedAccessories.length} Acc
              </span>
              {selectedExtras.length > 0 && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-orange-50 text-orange-700 border border-orange-200">
                  <Check className="w-3 h-3" /> {selectedExtras.length} Extras
                </span>
              )}
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-xs text-slate-400 font-medium">Monthly Rent:</span>
              <motion.p
                key={totalPrice}
                initial={{ scale: 1.08, color: "#0d9488" }}
                animate={{ scale: 1, color: "#0f172a" }}
                transition={{ duration: 0.25 }}
                className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight"
              >
                {formatIDR(totalPrice)}
              </motion.p>
            </div>
          </div>
        </div>

        {/* Right: Primary Checkout Action */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            variant="primary"
            onClick={openCheckout}
            disabled={itemCount === 0}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 h-12 px-8 text-sm sm:text-base font-bold shadow-xl shadow-orange-500/20 hover:shadow-orange-500/35 transition-all duration-300"
          >
            <span>Rent Your Setup!</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
