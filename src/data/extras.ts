import type { ExtraItem } from "@/types";

export const extras: ExtraItem[] = [
  // Coffee Station
  {
    id: "extra-coffee-machine",
    name: "Coffee Machine",
    description: "Mesin kopi otomatis untuk kopi favoritmu",
    section: "coffee",
    pricePerMonth: 200000,
    image: "/images/extras/coffee-machine.svg",
  },
  {
    id: "extra-coffee-grinder",
    name: "Coffee Grinder",
    description: "Penggiling kopi manual untuk freshness maksimal",
    section: "coffee",
    pricePerMonth: 75000,
    image: "/images/extras/coffee-grinder.svg",
  },
  // Outdoor Gear
  {
    id: "extra-surfboard",
    name: "Surfboard",
    description: "Papan selancar untuk break kerja di Bali",
    section: "outdoor",
    pricePerMonth: 300000,
    image: "/images/extras/surfboard.svg",
  },
  {
    id: "extra-motorcycle",
    name: "Scooter Rental",
    description: "Skuter untuk mobilitas sehari-hari di Bali",
    section: "outdoor",
    pricePerMonth: 800000,
    image: "/images/extras/scooter.svg",
  },
  // Relax Zone
  {
    id: "extra-bean-bag",
    name: "Bean Bag Chair",
    description: "Kursi bean bag nyaman untuk santai",
    section: "relax",
    pricePerMonth: 150000,
    image: "/images/extras/bean-bag.svg",
  },
  {
    id: "extra-floor-cushion",
    name: "Floor Cushion",
    description: "Bantal lesehan untuk suasana casual",
    section: "relax",
    pricePerMonth: 75000,
    image: "/images/extras/floor-cushion.svg",
  },
  // Garage Space
  {
    id: "extra-tool-shelf",
    name: "Tool Shelf",
    description: "Rak penyimpanan alat kerja",
    section: "garage",
    pricePerMonth: 120000,
    image: "/images/extras/tool-shelf.svg",
  },
  {
    id: "extra-storage-box",
    name: "Storage Box",
    description: "Kotak penyimpanan serbaguna",
    section: "garage",
    pricePerMonth: 80000,
    image: "/images/extras/storage-box.svg",
  },
];
