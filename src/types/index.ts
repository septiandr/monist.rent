export interface Desk {
  id: string;
  name: string;
  description: string;
  dimensions: string;
  features: string[];
  pricePerMonth: number;
  image: string;
}

export interface Chair {
  id: string;
  name: string;
  description: string;
  ergonomicHighlights: string[];
  pricePerMonth: number;
  image: string;
}

export interface Accessory {
  id: string;
  name: string;
  description: string;
  category: "monitor" | "lighting" | "greenery" | "other";
  pricePerMonth: number;
  image: string;
  position: "left" | "right" | "center";
}

export type AccessoryCategory = "monitor" | "lighting" | "greenery" | "other";

export type AccessoryPosition = "left" | "right" | "center";

export interface ExtraItem {
  id: string;
  name: string;
  description: string;
  section: "coffee" | "outdoor" | "relax" | "garage";
  pricePerMonth: number;
  image: string;
}

export interface ItemSummary {
  id: string;
  name: string;
  type: "desk" | "chair" | "accessory" | "extra";
  section?: string;
  pricePerMonth: number;
}

export interface WorkspaceState {
  selectedDesk: Desk | null;
  selectedChair: Chair | null;
  selectedAccessories: Accessory[];
  selectedExtras: ExtraItem[];
  isCheckoutOpen: boolean;
  activeTab: "chairs" | "desks" | "accessories";
  isStandingMode: boolean;
  isLampActive: boolean;
  isNightMode: boolean;

  selectDesk: (desk: Desk) => void;
  selectChair: (chair: Chair) => void;
  toggleAccessory: (accessory: Accessory) => void;
  toggleExtra: (extra: ExtraItem) => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  setActiveTab: (tab: "chairs" | "desks" | "accessories") => void;
  setStandingMode: (isStanding: boolean) => void;
  setLampActive: (isActive: boolean) => void;
  setNightMode: (isNight: boolean) => void;
  applyPreset: (presetId: "starter" | "powerhouse" | "executive") => void;
  clearWorkspace: () => void;
  getTotalPrice: () => number;
  getSelectedItemSummary: () => ItemSummary[];
}
