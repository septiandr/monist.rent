"use client";

import { useState } from "react";
import { X, CheckCircle, Armchair, Armchair as ChairIcon, Puzzle, Package } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { formatIDR } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const typeIcons = {
  desk: Armchair,
  chair: ChairIcon,
  accessory: Puzzle,
  extra: Package,
};

const sectionLabels: Record<string, string> = {
  coffee: "Coffee Station",
  outdoor: "Outdoor Gear",
  relax: "Relax Zone",
  garage: "Garage Space",
};

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

  const handleRentNow = () => {
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      closeCheckout();
    }, 3000);
  };

  if (!isCheckoutOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={closeCheckout}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="relative w-full max-w-md lg:max-w-lg bg-white rounded-2xl shadow-xl p-6 max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeCheckout}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Tutup ringkasan checkout"
        >
          <X className="w-5 h-5" />
        </button>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center gap-4 py-8"
            >
              <CheckCircle className="w-16 h-16 text-green-600" />
              <h2 className="text-xl font-semibold text-slate-900">
                Terima kasih!
              </h2>
              <p className="text-sm text-slate-500 text-center">
                Tim kami akan menghubungi Anda segera.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="checkout"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                Ringkasan Sewa Anda
              </h2>

              {items.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-8">
                  Belum ada item yang dipilih.
                </p>
              ) : (
                <div className="flex flex-col gap-3">
                  {items.map((item) => {
                    const Icon = typeIcons[item.type];
                    const label =
                      item.type === "extra" && item.section
                        ? sectionLabels[item.section] ?? item.section
                        : item.type;
                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between py-3 border-b border-slate-100"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-slate-400" />
                          <div>
                            <p className="text-sm font-medium text-slate-900">
                              {item.name}
                            </p>
                            <p className="text-xs text-slate-400 capitalize">
                              {label}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm font-semibold text-teal-600">
                          {formatIDR(item.pricePerMonth)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="border-t-2 border-slate-200 pt-4 mt-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-500">Total</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {formatIDR(totalPrice)}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={handleRentNow}
                  disabled={items.length === 0}
                >
                  <span className="flex items-center justify-center gap-2">
                    Sewa Sekarang
                    <span>→</span>
                  </span>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
