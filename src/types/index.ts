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

export interface ItemSummary {
  id: string;
  name: string;
  type: "desk" | "chair" | "accessory";
  pricePerMonth: number;
}

export interface WorkspaceState {
  selectedDesk: Desk | null;
  selectedChair: Chair | null;
  selectedAccessories: Accessory[];
  isCheckoutOpen: boolean;

  selectDesk: (desk: Desk) => void;
  selectChair: (chair: Chair) => void;
  toggleAccessory: (accessory: Accessory) => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  getTotalPrice: () => number;
  getSelectedItemSummary: () => ItemSummary[];
}
