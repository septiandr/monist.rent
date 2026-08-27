import { Chair } from "@/types";

export const chairs: Chair[] = [
  {
    id: "chair-mesh",
    name: "Ergonomic Mesh Chair",
    description: "Kursi ergonomis dengan jaring breathable untuk kenyamanan sepanjang hari",
    ergonomicHighlights: ["Breathable mesh back", "Lumbar support", "Adjustable height"],
    pricePerMonth: 300000,
    image: "/images/chairs/mesh-chair.jpg",
  },
  {
    id: "chair-executive",
    name: "Executive Leather Chair",
    description: "Kursi eksekutif kulit premium untuk tampilan profesional",
    ergonomicHighlights: ["Premium leather", "Full lumbar + headrest", "Tilt mechanism"],
    pricePerMonth: 500000,
    image: "/images/chairs/executive-chair.jpg",
  },
];
