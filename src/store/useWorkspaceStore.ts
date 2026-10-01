import { create } from "zustand";
import type { Desk, Chair, Accessory, ExtraItem, WorkspaceState, ItemSummary } from "@/types";
import { desks } from "@/data/desks";
import { chairs } from "@/data/chairs";
import { accessories } from "@/data/accessories";
import { extras } from "@/data/extras";

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  selectedDesk: desks[0] ?? null,
  selectedChair: chairs[0] ?? null,
  selectedAccessories: [accessories[0], accessories[2], accessories[3]].filter(Boolean),
  selectedExtras: [extras[0]].filter(Boolean),
  isCheckoutOpen: false,
  activeTab: "desks",
  isStandingMode: false,
  isLampActive: true,
  isNightMode: false,

  selectDesk: (desk: Desk) => set({ selectedDesk: desk }),
  selectChair: (chair: Chair) => set({ selectedChair: chair }),
  toggleAccessory: (accessory: Accessory) =>
    set((state) => {
      const exists = state.selectedAccessories.some((a) => a.id === accessory.id);
      if (exists) {
        return { selectedAccessories: state.selectedAccessories.filter((a) => a.id !== accessory.id) };
      }
      const isMonitor = accessory.category === "monitor";
      const filtered = isMonitor
        ? state.selectedAccessories.filter((a) => a.category !== "monitor")
        : state.selectedAccessories;
      return { selectedAccessories: [...filtered, accessory] };
    }),

  toggleExtra: (extra: ExtraItem) =>
    set((state) => ({
      selectedExtras: state.selectedExtras.some((e) => e.id === extra.id)
        ? state.selectedExtras.filter((e) => e.id !== extra.id)
        : [...state.selectedExtras, extra],
    })),

  openCheckout: () => set({ isCheckoutOpen: true }),
  closeCheckout: () => set({ isCheckoutOpen: false }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setStandingMode: (isStanding) => set({ isStandingMode: isStanding }),
  setLampActive: (isActive) => set({ isLampActive: isActive }),
  setNightMode: (isNight) => set({ isNightMode: isNight }),

  applyPreset: (presetId) => {
    if (presetId === "starter") {
      set({
        selectedDesk: desks[1] ?? desks[0],
        selectedChair: chairs[0],
        selectedAccessories: accessories.filter((a) => ["acc-laptop-stand", "acc-desk-mat", "acc-plant"].includes(a.id)),
        selectedExtras: extras.filter((e) => ["surfboard", "coffee-machine"].includes(e.id)),
        isStandingMode: false,
      });
    } else if (presetId === "powerhouse") {
      set({
        selectedDesk: desks[0],
        selectedChair: chairs[0],
        selectedAccessories: accessories.filter((a) => ["acc-dual-monitor", "acc-desk-lamp", "acc-desk-mat", "acc-plant"].includes(a.id)),
        selectedExtras: extras.filter((e) => ["coffee-machine", "coffee-grinder"].includes(e.id)),
        isStandingMode: true,
      });
    } else if (presetId === "executive") {
      set({
        selectedDesk: desks[0],
        selectedChair: chairs[1] ?? chairs[0],
        selectedAccessories: accessories.filter((a) => ["acc-ultrawide-monitor", "acc-desk-lamp", "acc-plant", "acc-desk-mat"].includes(a.id)),
        selectedExtras: extras.filter((e) => ["bean-bag", "scooter"].includes(e.id)),
        isStandingMode: false,
      });
    }
  },

  clearWorkspace: () =>
    set({
      selectedDesk: null,
      selectedChair: null,
      selectedAccessories: [],
      selectedExtras: [],
    }),

  getTotalPrice: (): number => {
    const { selectedDesk, selectedChair, selectedAccessories, selectedExtras } = get();
    const accTotal = selectedAccessories.reduce((sum, acc) => sum + acc.pricePerMonth, 0);
    const extTotal = selectedExtras.reduce((sum, ext) => sum + ext.pricePerMonth, 0);
    return (selectedDesk?.pricePerMonth ?? 0) + (selectedChair?.pricePerMonth ?? 0) + accTotal + extTotal;
  },

  getSelectedItemSummary: (): ItemSummary[] => {
    const { selectedDesk, selectedChair, selectedAccessories, selectedExtras } = get();
    const summary: ItemSummary[] = [];
    if (selectedDesk) {
      summary.push({ id: selectedDesk.id, name: selectedDesk.name, type: "desk", pricePerMonth: selectedDesk.pricePerMonth });
    }
    if (selectedChair) {
      summary.push({ id: selectedChair.id, name: selectedChair.name, type: "chair", pricePerMonth: selectedChair.pricePerMonth });
    }
    selectedAccessories.forEach((acc) => {
      summary.push({ id: acc.id, name: acc.name, type: "accessory", pricePerMonth: acc.pricePerMonth });
    });
    selectedExtras.forEach((ext) => {
      summary.push({ id: ext.id, name: ext.name, type: "extra", section: ext.section, pricePerMonth: ext.pricePerMonth });
    });
    return summary;
  },
}));
