"use client";

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
    <div className="w-full bg-slate-100 border-y border-slate-200">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-5 px-4 lg:px-6 max-w-screen-2xl mx-auto">
        <div className="flex flex-col items-center sm:items-start gap-1">
          <p className="text-xl font-bold text-slate-900">Ready to Rent?</p>
          <p className="text-sm text-slate-500">
            {itemCount > 0
              ? `${itemCount} item dipilih — ${formatIDR(totalPrice)}`
              : "Pilih furniture dan aksesoris untuk workspace impianmu"}
          </p>
        </div>
        <Button variant="checkout" onClick={openCheckout} className="text-base px-8">
          Rent Your Setup!
        </Button>
      </div>
    </div>
  );
}
