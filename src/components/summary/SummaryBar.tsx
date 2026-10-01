"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { formatIDR } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function SummaryBar() {
  const selectedDesk = useWorkspaceStore((state) => state.selectedDesk);
  const selectedChair = useWorkspaceStore((state) => state.selectedChair);
  const selectedAccessories = useWorkspaceStore(
    (state) => state.selectedAccessories
  );
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
    <div className="sticky bottom-0 left-0 right-0 w-full bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] z-50">
      <div className="flex flex-row items-center justify-between gap-4 py-3.5 px-4 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center justify-center w-11 h-11 rounded-xl bg-teal-50 border border-teal-200 text-teal-600">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {itemCount > 0 ? `${itemCount} Item Dipilih` : "Belum Ada Item"}
            </p>
            <motion.p
              key={totalPrice}
              initial={{ scale: 1.08, color: "#0d9488" }}
              animate={{ scale: 1, color: "#0f172a" }}
              transition={{ duration: 0.25 }}
              className="text-lg sm:text-2xl font-black text-slate-900"
            >
              {formatIDR(totalPrice)}
            </motion.p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            onClick={openCheckout}
            className="flex items-center gap-2 h-11 px-6 sm:px-8 text-sm sm:text-base font-bold shadow-lg hover:shadow-orange-500/25 transition-all duration-200"
          >
            <span>Rent Your Setup!</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
