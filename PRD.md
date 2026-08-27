# Product Requirements Document (PRD): monis.rent Interactive Workspace Builder

---

## 1. Overview

### 1.1 Product Name
monis.rent Workspace Builder

### 1.2 Client
monis.rent — Office equipment rental service for digital nomads and startups in Bali.

### 1.3 Objective
Build an engaging, visual, and user-centric interactive web application where users can customize their dream workspace layout and proceed to a rental checkout summary.

### 1.4 Target Audience
Freelancers, digital nomads, and remote workers in Bali looking for fast, flexible, and aesthetic workspace solutions.

---

## 2. Tech Stack

| Layer              | Technology                                  |
|--------------------|---------------------------------------------|
| Framework          | Next.js 14+ (App Router)                   |
| Language           | TypeScript                                  |
| Styling            | Tailwind CSS                                |
| Deployment         | Vercel                                      |
| State Management   | Zustand                                     |
| Animations         | Framer Motion                               |
| Icons              | Lucide React                                |
| Image Optimization | Next.js `<Image>` component                |

---

## 3. Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (html, body, fonts, metadata)
│   ├── page.tsx                # Landing / Builder page (main entry)
│   └── globals.css             # Global styles + Tailwind directives
├── components/
│   ├── layout/
│   │   └── SplitLayout.tsx     # Two-panel layout: controls (left) + preview (right)
│   ├── panels/
│   │   ├── ControlPanel.tsx    # Left panel container with tab navigation
│   │   ├── DeskTab.tsx         # Desk selection tab content
│   │   ├── ChairTab.tsx        # Chair selection tab content
│   │   └── AccessoryTab.tsx    # Accessory add-ons tab content
│   ├── preview/
│   │   ├── VisualCanvas.tsx    # Right panel: live workspace preview canvas
│   │   ├── DeskRenderer.tsx    # Renders the selected desk image on canvas
│   │   ├── ChairRenderer.tsx   # Renders the selected chair image on canvas
│   │   └── AccessoryRenderer.tsx # Renders toggleable accessories on canvas
│   ├── summary/
│   │   ├── SummaryBar.tsx      # Bottom sticky bar showing total cost
│   │   └── CheckoutModal.tsx   # Full summary modal with itemized breakdown + "Rent Now"
│   └── ui/
│       ├── OptionCard.tsx      # Reusable card for selecting an item (desk/chair)
│       ├── AccessoryToggle.tsx # Toggle switch for adding/removing an accessory
│       └── Button.tsx          # Reusable button component
├── data/
│   ├── desks.ts               # Desk product data
│   ├── chairs.ts              # Chair product data
│   └── accessories.ts         # Accessory product data
├── store/
│   └── useWorkspaceStore.ts   # Zustand store for workspace state
├── types/
│   └── index.ts               # TypeScript interfaces/types
└── lib/
    └── utils.ts               # Utility functions (formatCurrency, etc.)
```

---

## 4. Data Models

### 4.1 Product Types

```typescript
// types/index.ts

export interface Desk {
  id: string;
  name: string;
  description: string;
  dimensions: string;          // e.g. "120cm x 60cm x 75cm"
  features: string[];          // e.g. ["Height adjustable", "Cable management"]
  pricePerMonth: number;       // in IDR
  image: string;               // path to image in /public
}

export interface Chair {
  id: string;
  name: string;
  description: string;
  ergonomicHighlights: string[]; // e.g. ["Lumbar support", "Adjustable armrests"]
  pricePerMonth: number;        // in IDR
  image: string;
}

export interface Accessory {
  id: string;
  name: string;
  description: string;
  category: "monitor" | "lighting" | "greenery" | "other";
  pricePerMonth: number;       // in IDR
  image: string;
  position: "left" | "right" | "center"; // where it renders on the canvas
}
```

### 4.2 Store State

```typescript
// store/useWorkspaceStore.ts

interface WorkspaceState {
  selectedDesk: Desk | null;
  selectedChair: Desk | null;
  selectedAccessories: Accessory[];
  isCheckoutOpen: boolean;

  // Actions
  selectDesk: (desk: Desk) => void;
  selectChair: (chair: Chair) => void;
  toggleAccessory: (accessory: Accessory) => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  getTotalPrice: () => number;      // computed: desk + chair + all accessories
  getSelectedItemSummary: () => ItemSummary[];
}

interface ItemSummary {
  id: string;
  name: string;
  type: "desk" | "chair" | "accessory";
  pricePerMonth: number;
}
```

---

## 5. Product Data (Mock Data)

### 5.1 Desks

| ID               | Name                   | Dimensions             | Price/Month (IDR) | Features                                      |
|------------------|------------------------|------------------------|--------------------|-----------------------------------------------|
| `desk-standing`  | Standing Desk Pro      | 120cm x 60cm x 75-120cm | 450,000           | Electric height adjustable, Cable management, Memory presets |
| `desk-wooden`    | Minimalist Wooden Desk | 110cm x 55cm x 75cm   | 350,000            | Solid teak wood, Compact design, Drawer included |

### 5.2 Chairs

| ID               | Name                     | Price/Month (IDR) | Ergonomic Highlights                              |
|------------------|--------------------------|--------------------|---------------------------------------------------|
| `chair-mesh`     | Ergonomic Mesh Chair     | 300,000            | Breathable mesh back, Lumbar support, Adjustable height |
| `chair-executive`| Executive Leather Chair  | 500,000            | Premium leather, Full lumbar + headrest, Tilt mechanism |

### 5.3 Accessories

| ID                      | Name                   | Category  | Price/Month (IDR) | Canvas Position |
|-------------------------|------------------------|-----------|--------------------|-----------------|
| `acc-ultrawide-monitor` | UltraWide Monitor 34"  | monitor   | 600,000            | center          |
| `acc-dual-monitor`      | Dual Monitor Setup     | monitor   | 800,000            | center          |
| `acc-desk-lamp`         | LED Desk Lamp          | lighting  | 75,000             | left            |
| `acc-plant`             | Indoor Plant           | greenery  | 50,000             | right           |
| `acc-desk-mat`          | XL Desk Mat            | other     | 40,000             | center          |
| `acc-laptop-stand`      | Laptop Stand           | other     | 60,000             | left            |

> **Note:** When "Dual Monitor Setup" is selected, "UltraWide Monitor 34" must be disabled (mutually exclusive).

---

## 6. Core Features & Requirements

### 6.1 Feature: Desk Selection
- **Location:** `ControlPanel.tsx` > `DeskTab.tsx`
- Display a list of `OptionCard` components, one per desk.
- Each card shows: desk image, name, dimensions, features (as bullet list), and price/month.
- Only one desk can be selected at a time (radio behavior).
- Selecting a desk immediately updates the preview canvas.

**Acceptance Criteria:**
- [ ] At least 2 desk options are displayed.
- [ ] Clicking a desk card selects it (visual highlight on the card).
- [ ] The preview canvas updates to show the selected desk.
- [ ] The summary bar updates with the desk price.

### 6.2 Feature: Chair Selection
- **Location:** `ControlPanel.tsx` > `ChairTab.tsx`
- Display a list of `OptionCard` components, one per chair.
- Each card shows: chair image, name, ergonomic highlights (as bullet list), and price/month.
- Only one chair can be selected at a time (radio behavior).
- Selecting a chair immediately updates the preview canvas.

**Acceptance Criteria:**
- [ ] At least 2 chair options are displayed.
- [ ] Clicking a chair card selects it (visual highlight on the card).
- [ ] The preview canvas updates to show the selected chair.
- [ ] The summary bar updates with the chair price.

### 6.3 Feature: Accessory Add-ons
- **Location:** `ControlPanel.tsx` > `AccessoryTab.tsx`
- Display a list of `AccessoryToggle` components, one per accessory.
- Each toggle shows: accessory image, name, description, and price/month.
- Users can add or remove multiple accessories (checkbox/multi-select behavior).
- Mutual exclusion: if "UltraWide Monitor" is selected, "Dual Monitor" is disabled, and vice versa.

**Acceptance Criteria:**
- [ ] All 6 accessories are listed with toggle controls.
- [ ] Toggling ON adds the accessory to the preview canvas.
- [ ] Toggling OFF removes the accessory from the preview canvas.
- [ ] Selecting one monitor type disables the other monitor type.
- [ ] The summary bar updates dynamically with each accessory change.

### 6.4 Feature: Live Visual Preview
- **Location:** `VisualCanvas.tsx` with child renderers (`DeskRenderer`, `ChairRenderer`, `AccessoryRenderer`)
- Central canvas area occupying the right panel of the split layout.
- Renders layered images: desk as the base, chair in front of the desk, accessories positioned by their `position` property.
- Smooth transitions when items are swapped (Framer Motion `AnimatePresence`).

**Acceptance Criteria:**
- [ ] The canvas shows the selected desk as the base layer.
- [ ] The chair renders on top of / in front of the desk.
- [ ] Accessories render at their designated positions (left/center/right).
- [ ] Item transitions are animated (fade or slide).
- [ ] If no item is selected for a category, that layer is hidden gracefully (placeholder text or icon).

### 6.5 Feature: Summary Bar (Sticky Bottom)
- **Location:** `SummaryBar.tsx`
- Sticky bar fixed at the bottom of the viewport.
- Shows: count of selected items and total monthly cost formatted in IDR (e.g., "Rp 1.250.000/bulan").
- Contains a "Checkout" / "Lihat Ringkasan" button that opens the checkout modal.

**Acceptance Criteria:**
- [ ] The bar is always visible at the bottom when scrolling.
- [ ] Total price recalculates instantly on any selection change.
- [ ] Currency is formatted in Indonesian Rupiah (IDR) with thousand separators.
- [ ] Clicking the checkout button opens the `CheckoutModal`.

### 6.6 Feature: Checkout Modal
- **Location:** `CheckoutModal.tsx`
- Full-screen overlay modal with a close button (X).
- Content:
  - **Header:** "Ringkasan Sewa Anda" (Your Rental Summary)
  - **Itemized list:** Each selected item with name, type, and price/month.
  - **Divider**
  - **Total:** Bold, larger text showing total monthly cost.
  - **Call-to-Action:** "Sewa Sekarang" (Rent Now) button.
- Clicking "Sewa Sekarang" shows a success confirmation (e.g., toast or mini-modal: "Terima kasih! Tim kami akan menghubungi Anda.").

**Acceptance Criteria:**
- [ ] Modal opens when the checkout button is clicked.
- [ ] All selected items are listed with correct prices.
- [ ] Total is calculated and displayed correctly.
- [ ] Modal can be closed via X button or clicking outside.
- [ ] Clicking "Sewa Sekarang" shows a success message, then closes the modal.

---

## 7. User Flow

```
1. LANDING (page.tsx)
   └── User sees the builder split-screen:
       LEFT  → ControlPanel with tabs (Kursi, Meja, Aksesoris)
       RIGHT → VisualCanvas (empty/placeholder state)

2. SELECT DESK (DeskTab)
   └── User clicks a desk card
       → Desk appears on canvas
       → SummaryBar updates with desk price

3. SELECT CHAIR (ChairTab)
   └── User clicks a chair card
       → Chair appears on canvas (in front of desk)
       → SummaryBar updates with chair price

4. ADD ACCESSORIES (AccessoryTab)
   └── User toggles accessories ON/OFF
       → Accessories appear/disappear on canvas
       → SummaryBar updates in real-time

5. CHECKOUT (SummaryBar → CheckoutModal)
   └── User clicks "Checkout"
       → Modal opens with itemized summary + total
       → User clicks "Sewa Sekarang"
       → Success message shown
       → Modal closes
```

---

## 8. Styling & Design Guidelines

### 8.1 Color Palette
- **Primary:** Teal/Cyan tones (aligns with tropical Bali branding)
- **Secondary:** Warm wood tones (browns, beige)
- **Background:** Off-white / light gray (`bg-gray-50`)
- **Text:** Dark gray (`text-gray-900`) for readability
- **Accent:** Coral or orange for CTA buttons

### 8.2 Typography
- Font: Inter (via `next/font/google`)
- Headings: `font-bold`, sizes `text-2xl` to `text-4xl`
- Body: `text-base` / `text-sm`
- Prices: `font-semibold`, formatted as `Rp X.XXX.XXX`

### 8.3 Layout
- **Desktop (primary):** Split layout — left panel 40% / right panel 60%.
- **Mobile:** Stacked layout — controls on top, canvas below (scrollable).
- **Summary bar:** Sticky bottom, full width, `z-index: 50`.

### 8.4 Interactions
- Card hover: subtle shadow lift (`hover:shadow-lg transition-shadow`).
- Card selected: border highlight (`ring-2 ring-teal-500`).
- Tab switching: underline animation or background highlight.
- Canvas transitions: Framer Motion `AnimatePresence` with fade + slight y-translate.

---

## 9. Non-Functional Requirements

| Requirement     | Detail                                                              |
|-----------------|---------------------------------------------------------------------|
| Performance     | Use Next.js `<Image>` for all product images with `width`/`height` for layout stability. Lazy-load below-fold content. |
| Responsiveness  | Desktop-first, but must be functional on mobile (stacked layout).   |
| Accessibility   | Use semantic HTML, proper `aria-labels` on interactive elements, keyboard-navigable tabs. |
| Code Quality    | TypeScript strict mode. Component-driven architecture. No inline styles. |
| SEO             | Proper `<title>` and `<meta description>` in `layout.tsx`.         |

---

## 10. Acceptance Criteria Summary

The project is considered **complete** when:

1. The builder page loads with a split-screen layout (controls + canvas).
2. Users can select exactly one desk and one chair from provided options.
3. Users can toggle multiple accessories on/off (with mutual exclusion for monitors).
4. The visual preview canvas updates in real-time with animated transitions.
5. A sticky summary bar shows the correct total monthly cost in IDR.
6. The checkout modal displays an accurate itemized breakdown.
7. The "Sewa Sekarang" button triggers a success confirmation.
8. The app is responsive (usable on mobile with stacked layout).
9. All components are TypeScript with proper types.
10. The app builds and deploys to Vercel without errors.

---

## 11. Future Improvements (Out of Scope for MVP)

- **Drag-and-Drop Canvas:** Free repositioning of items on the desk.
- **Saved Configurations:** Unique shareable URLs for workspace designs.
- **Backend Integration:** Database, user auth, and payment gateway (Midtrans/Stripe).
- **AR Preview:** Augmented Reality mode for room preview via mobile camera.
- **Multiple Language Support:** English/Indonesian toggle.
