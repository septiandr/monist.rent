import { Desk } from "@/types";

export const desks: Desk[] = [
  {
    id: "desk-standing",
    name: "Standing Desk Pro",
    description: "Meja elektrik adjustable untuk produktivitas maksimal",
    dimensions: "120cm x 60cm x 75-120cm",
    features: ["Electric height adjustable", "Cable management", "Memory presets"],
    pricePerMonth: 450000,
    image: "/images/desks/standing-desk.jpg",
  },
  {
    id: "desk-wooden",
    name: "Minimalist Wooden Desk",
    description: "Meja kayu jati minimalis dengan desain compact",
    dimensions: "110cm x 55cm x 75cm",
    features: ["Solid teak wood", "Compact design", "Drawer included"],
    pricePerMonth: 350000,
    image: "/images/desks/wooden-desk.jpg",
  },
];
