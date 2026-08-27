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
│   │   ├── AccessoryTab.tsx    # Accessory add-ons tab content
│   │   └── CategorySection.tsx # Reusable horizontal scroll section (used for extra categories)
│   ├── preview/
│   │   ├── VisualCanvas.tsx    # Right panel: live workspace preview canvas
│   │   ├── DeskRenderer.tsx    # Renders the selected desk image on canvas
│   │   ├── ChairRenderer.tsx   # Renders the selected chair image on canvas
│   │   └── AccessoryRenderer.tsx # Renders toggleable accessories on canvas
│   ├── summary/
│   │   ├── SummaryBar.tsx      # Sticky bar with "Ready to Rent?" prompt
│   │   └── CheckoutModal.tsx   # Full summary modal with itemized breakdown + "Sewa Sekarang"
│   ├── categories/
│   │   └── ExtraCategories.tsx # Horizontal scroll sections: Coffee Station, Outdoor Gear, etc.
│   └── ui/
│       ├── OptionCard.tsx      # Reusable card for selecting an item (desk/chair)
│       ├── AccessoryToggle.tsx # Toggle switch for adding/removing an accessory
│       └── Button.tsx          # Reusable button component
├── data/
│   ├── desks.ts               # Desk product data
│   ├── chairs.ts              # Chair product data
│   ├── accessories.ts         # Workspace accessory data
│   └── extras.ts              # Extra category data (Coffee Station, Outdoor Gear, etc.)
├── store/
│   └── useWorkspaceStore.ts   # Zustand store for workspace state
├── types/
│   └── index.ts               # TypeScript interfaces/types
└── lib/
    └── utils.ts               # Utility functions (formatCurrency, etc.)
```

---

## 4. Page Layout (Wireframe Reference)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    Design Your Workspace!                               │
│                  — Create Your Perfect Setup! —                         │
├─────────────────────────────────────────────────────────────────────────┤
│  LEFT PANEL (40%)             │  RIGHT PANEL (60%)                      │
│  ┌─────────────────────────┐  │  ┌───────────────────────────────────┐  │
│  │ [Chairs] [Desks] [Acc]  │  │  │                                   │  │
│  │                         │  │  │      VISUAL CANVAS                │  │
│  │  ┌───┐ ┌───┐ ┌───┐     │  │  │                                   │  │
│  │  │ 🪑│ │ 🪑│ │ 🪑│     │  │  │   [Desk] + [Chair] + [Accessories]│  │
│  │  └───┘ └───┘ └───┘     │  │  │                                   │  │
│  │  ┌───┐ ┌───┐ ┌───┐     │  │  │   Positioned as layers           │  │
│  │  │🖥️│ │🖥️│ │🖥️│     │  │  │                                   │  │
│  │  └───┘ └───┘ └───┘     │  │  │                                   │  │
│  └─────────────────────────┘  │  └───────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │              Ready to Rent?  [Rent Your Setup!]                     ││
│  └─────────────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐ ┌────┐ │
│  │ Coffee Station   │ │ Outdoor Gear     │ │ Relax Zone       │ │Gar │ │
│  │ [☕] [🖥️]       │ │ [🏄] [🏍️]       │ │ [🫘] [🛋️]      │ │[🔧]│ │
│  │ +Add Coffee Mac..│ │ +Add Surfboard   │ │ +Add Bean Bag    │ │+Add│ │
│  └──────────────────┘ └──────────────────┘ └──────────────────┘ └────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Data Models

### 5.1 Core Product Types

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

export interface ExtraItem {
  id: string;
  name: string;
  description: string;
  section: "coffee" | "outdoor" | "relax" | "garage";
  pricePerMonth: number;
  image: string;
}
```

### 5.2 Store State

```typescript
// store/useWorkspaceStore.ts

interface WorkspaceState {
  // Core selections
  selectedDesk: Desk | null;
  selectedChair: Chair | null;
  selectedAccessories: Accessory[];

  // Extra category selections
  selectedExtras: ExtraItem[];

  // UI state
  isCheckoutOpen: boolean;
  activeTab: "chairs" | "desks" | "accessories";

  // Actions
  selectDesk: (desk: Desk) => void;
  selectChair: (chair: Chair) => void;
  toggleAccessory: (accessory: Accessory) => void;
  toggleExtra: (extra: ExtraItem) => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  setActiveTab: (tab: "chairs" | "desks" | "accessories") => void;

  // Computed
  getTotalPrice: () => number;
  getSelectedItemSummary: () => ItemSummary[];
}

interface ItemSummary {
  id: string;
  name: string;
  type: "desk" | "chair" | "accessory" | "extra";
  section?: string;           // for extras: "coffee", "outdoor", "relax", "garage"
  pricePerMonth: number;
}
```

---

## 6. Product Data (Mock Data)

### 6.1 Desks

| ID               | Name                   | Dimensions             | Price/Month (IDR) | Features                                      |
|------------------|------------------------|------------------------|--------------------|-----------------------------------------------|
| `desk-standing`  | Standing Desk Pro      | 120cm x 60cm x 75-120cm | 450,000           | Electric height adjustable, Cable management, Memory presets |
| `desk-wooden`    | Minimalist Wooden Desk | 110cm x 55cm x 75cm   | 350,000            | Solid teak wood, Compact design, Drawer included |

### 6.2 Chairs

| ID               | Name                     | Price/Month (IDR) | Ergonomic Highlights                              |
|------------------|--------------------------|--------------------|---------------------------------------------------|
| `chair-mesh`     | Ergonomic Mesh Chair     | 300,000            | Breathable mesh back, Lumbar support, Adjustable height |
| `chair-executive`| Executive Leather Chair  | 500,000            | Premium leather, Full lumbar + headrest, Tilt mechanism |

### 6.3 Workspace Accessories

| ID                      | Name                   | Category  | Price/Month (IDR) | Canvas Position |
|-------------------------|------------------------|-----------|--------------------|-----------------|
| `acc-ultrawide-monitor` | UltraWide Monitor 34"  | monitor   | 600,000            | center          |
| `acc-dual-monitor`      | Dual Monitor Setup     | monitor   | 800,000            | center          |
| `acc-desk-lamp`         | LED Desk Lamp          | lighting  | 75,000             | left            |
| `acc-plant`             | Indoor Plant           | greenery  | 50,000             | right           |
| `acc-desk-mat`          | XL Desk Mat            | other     | 40,000             | center          |
| `acc-laptop-stand`      | Laptop Stand           | other     | 60,000             | left            |

> **Mutual Exclusion:** "Dual Monitor Setup" and "UltraWide Monitor 34" are mutually exclusive. Selecting one disables the other.

### 6.4 Extra Categories (Below Builder)

#### Coffee Station
| ID                    | Name              | Price/Month (IDR) |
|-----------------------|-------------------|--------------------|
| `extra-coffee-machine`| Coffee Machine    | 200,000            |
| `extra-coffee-grinder`| Coffee Grinder    | 75,000             |

#### Outdoor Gear
| ID                    | Name              | Price/Month (IDR) |
|-----------------------|-------------------|--------------------|
| `extra-surfboard`     | Surfboard         | 300,000            |
| `extra-motorcycle`    | Scooter Rental    | 800,000            |

#### Relax Zone
| ID                    | Name              | Price/Month (IDR) |
|-----------------------|-------------------|--------------------|
| `extra-bean-bag`      | Bean Bag Chair    | 150,000            |
| `extra-floor-cushion` | Floor Cushion     | 75,000             |

#### Garage Space
| ID                    | Name              | Price/Month (IDR) |
|-----------------------|-------------------|--------------------|
| `extra-tool-shelf`    | Tool Shelf        | 120,000            |
| `extra-storage-box`   | Storage Box       | 80,000             |

---

## 7. Core Features & Requirements

### 7.1 Feature: Page Header
- **Location:** `page.tsx` (above the split layout)
- Display the heading: "Design Your Workspace!"
- Display the subtitle: "Create Your Perfect Setup!" with decorative em dashes or line on both sides.

**Acceptance Criteria:**
- [ ] Header is centered at the top of the page.
- [ ] Heading uses large bold typography (`text-3xl` to `text-4xl`).
- [ ] Subtitle is smaller and centered below the heading.

---

### 7.2 Feature: Tab Navigation (Left Panel)
- **Location:** `ControlPanel.tsx`
- Three tabs: **Chairs**, **Desks**, **Accessories**.
- Tabs are rendered as horizontal buttons at the top of the left panel.
- Active tab is visually highlighted (e.g., filled background or underline).
- Only one tab is active at a time.

**Acceptance Criteria:**
- [ ] All three tabs are visible.
- [ ] Clicking a tab switches the panel content below.
- [ ] Active tab has a distinct visual indicator.
- [ ] Default active tab is "Chairs".

---

### 7.3 Feature: Desk Selection
- **Location:** `ControlPanel.tsx` > `DeskTab.tsx`
- Display a grid (2–3 columns) of `OptionCard` components, one per desk.
- Each card shows: desk image, name, dimensions, features (as bullet list), and price/month.
- Only one desk can be selected at a time (radio behavior).
- Selecting a desk immediately updates the preview canvas.

**Acceptance Criteria:**
- [ ] At least 2 desk options are displayed in a grid.
- [ ] Clicking a desk card selects it (visual highlight: ring/border).
- [ ] Previously selected desk is deselected automatically.
- [ ] The preview canvas updates to show the selected desk.
- [ ] The summary bar updates with the desk price.

---

### 7.4 Feature: Chair Selection
- **Location:** `ControlPanel.tsx` > `ChairTab.tsx`
- Display a grid (2–3 columns) of `OptionCard` components, one per chair.
- Each card shows: chair image, name, ergonomic highlights (as bullet list), and price/month.
- Only one chair can be selected at a time (radio behavior).
- Selecting a chair immediately updates the preview canvas.

**Acceptance Criteria:**
- [ ] At least 2 chair options are displayed in a grid.
- [ ] Clicking a chair card selects it (visual highlight: ring/border).
- [ ] Previously selected chair is deselected automatically.
- [ ] The preview canvas updates to show the selected chair.
- [ ] The summary bar updates with the chair price.

---

### 7.5 Feature: Accessory Add-ons
- **Location:** `ControlPanel.tsx` > `AccessoryTab.tsx`
- Display a list of `AccessoryToggle` components, one per accessory.
- Each toggle shows: accessory image, name, description, and price/month.
- Users can add or remove multiple accessories (multi-select).
- Mutual exclusion: if "UltraWide Monitor" is selected, "Dual Monitor" is disabled (and vice versa).

**Acceptance Criteria:**
- [ ] All 6 workspace accessories are listed.
- [ ] Toggling ON adds the accessory to the preview canvas.
- [ ] Toggling OFF removes the accessory from the preview canvas.
- [ ] Selecting one monitor type disables the other monitor type.
- [ ] The summary bar updates dynamically with each accessory change.

---

### 7.6 Feature: Live Visual Preview (Canvas)
- **Location:** `VisualCanvas.tsx` with child renderers (`DeskRenderer`, `ChairRenderer`, `AccessoryRenderer`)
- Central canvas area occupying the right panel of the split layout.
- Renders layered images: desk as the base, chair in front of the desk, accessories positioned by their `position` property (left/center/right).
- Smooth transitions when items are swapped (Framer Motion `AnimatePresence`).

**Canvas Layer Order (back to front):**
1. Background (neutral/gradient)
2. Desk (center)
3. Chair (center, in front of desk)
4. Accessories (positioned: left, center, right)

**Acceptance Criteria:**
- [ ] The canvas shows the selected desk as the base layer.
- [ ] The chair renders on top of / in front of the desk.
- [ ] Accessories render at their designated positions (left/center/right).
- [ ] Item transitions are animated (fade + slight y-translate).
- [ ] If no item is selected for a category, that layer is hidden gracefully (placeholder or empty).
- [ ] Canvas remains visually balanced regardless of which items are selected.

---

### 7.7 Feature: Ready to Rent Bar
- **Location:** `SummaryBar.tsx`
- Horizontal bar below the split layout and above the extra categories.
- Display text: "Ready to Rent?"
- Display a prominent CTA button: "Rent Your Setup!"
- Clicking the button opens the checkout modal.

**Acceptance Criteria:**
- [ ] The bar spans the full width of the page.
- [ ] "Ready to Rent?" text is displayed prominently.
- [ ] "Rent Your Setup!" button is visually distinct (filled, colored).
- [ ] Clicking the button opens the `CheckoutModal`.
- [ ] The bar shows a summary of total items and total cost.

---

### 7.8 Feature: Extra Categories (Below Builder)
- **Location:** `categories/ExtraCategories.tsx`
- Four horizontal sections displayed below the "Ready to Rent?" bar:
  1. **Coffee Station** — Coffee Machine, Coffee Grinder
  2. **Outdoor Gear** — Surfboard, Scooter Rental
  3. **Relax Zone** — Bean Bag Chair, Floor Cushion
  4. **Garage Space** — Tool Shelf, Storage Box
- Each section has a heading (e.g., "Coffee Station") and a horizontal row of item cards.
- Each card has an image and a label: "+ Add [Item Name]".
- Items can be toggled ON/OFF (multi-select across all sections).
- Selected items appear with a visual indicator (checkmark or highlight).
- Selected items are included in the checkout summary.

**Acceptance Criteria:**
- [ ] All 4 sections are displayed in a horizontal scroll or grid row.
- [ ] Each section has a bold heading and 2 item cards.
- [ ] Cards show the item image and "+ Add [Name]" label.
- [ ] Clicking a card toggles the item ON/OFF.
- [ ] Selected items have a visual indicator (highlight, checkmark, or border).
- [ ] Selected items are included in the total price calculation.
- [ ] Selected items appear in the checkout modal summary.

---

### 7.9 Feature: Checkout Modal
- **Location:** `CheckoutModal.tsx`
- Full-screen overlay modal with a close button (X) in the top-right corner.
- Content layout:
  - **Header:** "Ringkasan Sewa Anda" (Your Rental Summary)
  - **Itemized list:** Each selected item grouped by type:
    - Desk section
    - Chair section
    - Workspace Accessories section
    - Extra Items section (grouped by section name)
  - Each item row shows: item name, item type/section, and price/month.
  - **Divider line**
  - **Total row:** Bold, larger text showing total monthly cost in IDR.
  - **Call-to-Action button:** "Sewa Sekarang" (Rent Now) — full-width, colored (e.g., teal or coral).
- Clicking "Sewa Sekarang" shows a success confirmation:
  - A toast or mini-modal: "Terima kasih! Tim kami akan menghubungi Anda segera."
  - The checkout modal closes after a brief delay.

**Acceptance Criteria:**
- [ ] Modal opens when "Rent Your Setup!" is clicked.
- [ ] All selected items (desk, chair, accessories, extras) are listed.
- [ ] Items are grouped by category with section headers.
- [ ] Prices are formatted in IDR with thousand separators (e.g., "Rp 450.000").
- [ ] Total is calculated correctly and displayed prominently.
- [ ] Modal can be closed via X button or clicking the overlay background.
- [ ] "Sewa Sekarang" shows a success message, then closes the modal.
- [ ] If no items are selected, the modal shows an empty state message.

---

## 8. User Flow

```
1. LANDING (page.tsx)
   └── User sees:
       • Header: "Design Your Workspace!"
       • Split-screen: Left (control panel) + Right (canvas)
       • "Ready to Rent?" bar
       • Extra categories below

2. SELECT CHAIR (Chairs tab — default)
   └── User clicks a chair card
       → Chair appears on canvas (in front of desk position)
       → Summary updates with chair price

3. SELECT DESK (Desks tab)
   └── User clicks a desk card
       → Desk appears on canvas (base layer)
       → Summary updates with desk price

4. ADD WORKSPACE ACCESSORIES (Accessories tab)
   └── User toggles accessories ON/OFF
       → Accessories appear/disappear on canvas
       → Summary updates in real-time

5. ADD EXTRA ITEMS (Extra categories below)
   └── User clicks "+ Add Coffee Machine", "+ Add Surfboard", etc.
       → Items are added to the selection
       → Summary updates with extra item prices

6. CHECKOUT (Ready to Rent? → Rent Your Setup!)
   └── User clicks "Rent Your Setup!"
       → CheckoutModal opens with full itemized summary
       → User clicks "Sewa Sekarang"
       → Success message: "Terima kasih!"
       → Modal closes
```

---

## 9. Styling & Design Guidelines

### 9.1 Color Palette

| Color              | Hex       | Usage                                        |
|--------------------|-----------|----------------------------------------------|
| Primary            | `#0D9488` | CTA buttons, active tab, selected card ring  |
| Accent             | `#F97316` | "Sewa Sekarang" button, highlight accents    |
| Background         | `#F8FAFC` | Page background (slate-50)                   |
| Card Surface       | `#FFFFFF` | Card backgrounds, modal background           |
| Primary Text       | `#1E293B` | Headings, body text (slate-900)              |
| Secondary Text     | `#64748B` | Descriptions, labels (slate-500)             |
| Success            | `#16A34A` | Success confirmation states (green-600)      |
| Border             | `#E2E8F0` | Card borders, dividers (slate-200)           |

### 9.2 Typography
- Font: **Inter** (via `next/font/google`)
- Headings: `font-bold`, `text-3xl` to `text-4xl`
- Subheadings: `font-semibold`, `text-lg` to `text-xl`
- Body: `text-base` / `text-sm`
- Prices: `font-semibold`, formatted as `Rp X.XXX.XXX/bulan`

### 9.3 Layout

| Breakpoint | Left Panel | Right Panel | Extra Categories |
|------------|------------|-------------|------------------|
| Desktop    | 40% width  | 60% width   | 4-column grid    |
| Mobile     | Full width (stacked above canvas) | Full width (stacked below controls) | 2-column grid    |

### 9.4 Interactions & Animations

| Element              | Interaction                                          | Animation                          |
|----------------------|------------------------------------------------------|------------------------------------|
| Option Card          | Hover                                                | Shadow lift (`hover:shadow-lg`)    |
| Option Card          | Selected                                             | Ring border (`ring-2 ring-teal-500`) + checkmark icon |
| Tab                  | Click to switch                                      | Underline slide or bg highlight    |
| Canvas item          | Added                                                | Fade-in + slide up (`y: 10 → 0`)  |
| Canvas item          | Removed                                              | Fade-out + slide up (`y: 0 → -10`)|
| Checkout Modal       | Open                                                 | Fade-in overlay + scale-up modal   |
| Checkout Modal       | Close                                                | Fade-out overlay + scale-down modal|
| Extra item           | Toggle ON                                            | Checkmark appears, border highlight|
| Extra item           | Toggle OFF                                           | Checkmark disappears, border normal|

---

## 10. Non-Functional Requirements

| Requirement     | Detail                                                              |
|-----------------|---------------------------------------------------------------------|
| Performance     | Use Next.js `<Image>` for all product images with explicit `width`/`height`. Lazy-load below-fold content. Target: LCP < 2.5s. |
| Responsiveness  | Desktop-first. Must be fully functional on mobile with stacked layout. |
| Accessibility   | Semantic HTML, `aria-labels` on all interactive elements, keyboard-navigable tabs (arrow keys), focus-visible outlines. |
| Code Quality    | TypeScript strict mode. Component-driven. No inline styles. No `any` types. |
| SEO             | `<title>`: "monis.rent — Workspace Builder" / `<meta description>` in `layout.tsx`. |
| Error Handling  | Graceful fallback for missing images. Empty state for no selections. |

---

## 11. Acceptance Criteria Summary

The project is considered **complete** when:

1. The page loads with the header "Design Your Workspace!" and subtitle.
2. The split-screen layout renders: left panel (40%) with tabbed controls, right panel (60%) with the visual canvas.
3. Three tabs (Chairs, Desks, Accessories) switch panel content correctly.
4. Users can select exactly one desk and one chair (radio behavior).
5. Users can toggle multiple accessories on/off (with mutual exclusion for monitor types).
6. The visual preview canvas updates in real-time with animated transitions.
7. The "Ready to Rent?" bar is displayed with the "Rent Your Setup!" CTA.
8. Four extra category sections (Coffee Station, Outdoor Gear, Relax Zone, Garage Space) are displayed with toggleable items.
9. The checkout modal shows an accurate itemized summary with correct total.
10. "Sewa Sekarang" triggers a success confirmation message.
11. The app is responsive (stacked layout on mobile).
12. All components are TypeScript with proper types, no `any`.
13. The app builds and deploys to Vercel without errors.

---

## 12. Future Improvements (Out of Scope for MVP)

- **Drag-and-Drop Canvas:** Free repositioning of items on the desk.
- **Saved Configurations:** Unique shareable URLs for workspace designs.
- **Backend Integration:** Database, user auth, and payment gateway (Midtrans/Stripe).
- **AR Preview:** Augmented Reality mode for room preview via mobile camera.
- **Multi-language:** English/Indonesian toggle.
- **Rental Duration Selector:** Weekly, monthly, or custom rental periods.
- **Availability Check:** Real-time stock availability for each item.
