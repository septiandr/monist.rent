import { create } from "zustand";
import type { Desk, Chair, Accessory, WorkspaceState, ItemSummary } from "@/types";

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  selectedDesk: null,
  selectedChair: null,
  selectedAccessories: [],
  isCheckoutOpen: false,

  selectDesk: (desk: Desk) => set({ selectedDesk: desk }),

  selectChair: (chair: Chair) => set({ selectedChair: chair }),

  toggleAccessory: (accessory: Accessory) =>
    set((state) => ({
      selectedAccessories: state.selectedAccessories.some(
        (a) => a.id === accessory.id
      )
        ? state.selectedAccessories.filter((a) => a.id !== accessory.id)
        : [...state.selectedAccessories, accessory],
    })),

  openCheckout: () => set({ isCheckoutOpen: true }),

  closeCheckout: () => set({ isCheckoutOpen: false }),

  getTotalPrice: (): number => {
    const { selectedDesk, selectedChair, selectedAccessories } = get();
    const accessoryTotal = selectedAccessories.reduce(
      (sum, acc) => sum + acc.pricePerMonth,
      0
    );
    return (
      (selectedDesk?.pricePerMonth ?? 0) +
      (selectedChair?.pricePerMonth ?? 0) +
      accessoryTotal
    );
  },

  getSelectedItemSummary: (): ItemSummary[] => {
    const { selectedDesk, selectedChair, selectedAccessories } = get();
    const summary: ItemSummary[] = [];

    if (selectedDesk) {
      summary.push({
        id: selectedDesk.id,
        name: selectedDesk.name,
        type: "desk",
        pricePerMonth: selectedDesk.pricePerMonth,
      });
    }

    if (selectedChair) {
      summary.push({
        id: selectedChair.id,
        name: selectedChair.name,
        type: "chair",
        pricePerMonth: selectedChair.pricePerMonth,
      });
    }

    selectedAccessories.forEach((acc) => {
      summary.push({
        id: acc.id,
        name: acc.name,
        type: "accessory",
        pricePerMonth: acc.pricePerMonth,
      });
    });

    return summary;
  },
}));
