"use client";

import { useState } from "react";
import { X, ArrowRight, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { formatIDR } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { CheckoutItemRow } from "@/components/summary/CheckoutItemRow";
import { CheckoutSuccessView } from "@/components/summary/CheckoutSuccessView";

export function CheckoutModal() {
  const isCheckoutOpen = useWorkspaceStore((state) => state.isCheckoutOpen);
  const closeCheckout = useWorkspaceStore((state) => state.closeCheckout);
  const getSelectedItemSummary = useWorkspaceStore(
    (state) => state.getSelectedItemSummary
  );
  const getTotalPrice = useWorkspaceStore((state) => state.getTotalPrice);

  const [isSuccess, setIsSuccess] = useState(false);

  const items = getSelectedItemSummary();
  const totalPrice = getTotalPrice();

  const handleClose = () => {
    setIsSuccess(false);
    closeCheckout();
  };

  const handleRentNow = () => {
    setIsSuccess(true);
  };

  if (!isCheckoutOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={handleClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Tutup ringkasan checkout"
        >
          <X className="w-5 h-5" />
        </button>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <CheckoutSuccessView onClose={handleClose} />
          ) : (
            <motion.div
              key="checkout"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-5"
            >
              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  Ringkasan Sewa Workspace
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Setup lengkap siap pakai, sewa bulanan fleksibel tanpa komitmen jangka panjang.
                </p>
              </div>

              {items.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-8">
                  Belum ada item yang dipilih.
                </p>
              ) : (
                <div className="flex flex-col max-h-[300px] overflow-y-auto divide-y divide-slate-100 pr-1">
                  {items.map((item) => (
                    <CheckoutItemRow key={item.id} item={item} />
                  ))}
                </div>
              )}

              {/* Total & Guarantees */}
              <div className="flex flex-col gap-3 pt-3 border-t-2 border-slate-100">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium text-slate-500">
                    Total Biaya Sewa
                  </span>
                  <p className="text-2xl font-black text-teal-700">
                    {formatIDR(totalPrice)}
                  </p>
                </div>

                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-teal-50/70 border border-teal-100 text-xs text-teal-800">
                  <ShieldCheck className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  <span>Garansi swap unit & servis teknisi gratis selama masa sewa di Bali.</span>
                </div>
              </div>

              <Button
                variant="primary"
                className="w-full flex items-center justify-center gap-2 h-12 text-base font-bold shadow-lg shadow-orange-500/20"
                onClick={handleRentNow}
                disabled={items.length === 0}
              >
                <span>Sewa Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
