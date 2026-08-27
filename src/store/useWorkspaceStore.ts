import { create } from "zustand";
import type { Desk, Chair, Accessory, ExtraItem, WorkspaceState, ItemSummary } from "@/types";

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  selectedDesk: null,
  selectedChair: null,
  selectedAccessories: [],
  selectedExtras: [],
  isCheckoutOpen: false,
  activeTab: "chairs",

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

  toggleExtra: (extra: ExtraItem) =>
    set((state) => ({
      selectedExtras: state.selectedExtras.some((e) => e.id === extra.id)
        ? state.selectedExtras.filter((e) => e.id !== extra.id)
        : [...state.selectedExtras, extra],
    })),

  openCheckout: () => set({ isCheckoutOpen: true }),

  closeCheckout: () => set({ isCheckoutOpen: false }),

  setActiveTab: (tab) => set({ activeTab: tab }),

  getTotalPrice: (): number => {
    const { selectedDesk, selectedChair, selectedAccessories, selectedExtras } = get();
    const accessoryTotal = selectedAccessories.reduce(
      (sum, acc) => sum + acc.pricePerMonth,
      0
    );
    const extrasTotal = selectedExtras.reduce(
      (sum, ext) => sum + ext.pricePerMonth,
      0
    );
    return (
      (selectedDesk?.pricePerMonth ?? 0) +
      (selectedChair?.pricePerMonth ?? 0) +
      accessoryTotal +
      extrasTotal
    );
  },

  getSelectedItemSummary: (): ItemSummary[] => {
    const { selectedDesk, selectedChair, selectedAccessories, selectedExtras } = get();
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

    selectedExtras.forEach((ext) => {
      summary.push({
        id: ext.id,
        name: ext.name,
        type: "extra",
        section: ext.section,
        pricePerMonth: ext.pricePerMonth,
      });
    });

    return summary;
  },
}));
