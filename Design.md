# Design Document: monis.rent Interactive Workspace Builder

---

## 1. Design Philosophy & UX Goals

| Principle            | Description                                                                                   |
|----------------------|-----------------------------------------------------------------------------------------------|
| **Visual & Immersive** | Users see their workspace composition change instantly — no static text catalogs.             |
| **Playful & Nomadic**  | Clean, modern, effortless UI tailored for digital nomads and startups in Bali.              |
| **Low Friction**       | Smooth tab switching, immediate visual feedback, and clear pricing at every step.           |
| **Mobile-Aware**       | Desktop-first, but fully functional on mobile with stacked layout.                           |

---

## 2. Layout Architecture

### 2.1 Full-Page Wireframe

```
+===========================================================================+
|                              HEADER                                       |
|  [monis.rent logo]              "Design Your Workspace!"                 |
|                               Tagline text                                |
+===========================================================================+
|  [Tab: Meja]  [Tab: Kursi]  [Tab: Aksesoris]                            |
+-----------------------------------+---------------------------------------+
|                                   |                                       |
|     CONTROL PANEL (Left 40%)      |    VISUAL CANVAS (Right 60%)         |
|                                   |                                       |
|  +-----------------------------+  |   +-------------------------------+  |
|  |  [OptionCard] Desk A        |  |   |                               |  |
|  |  ┌──────┐                   |  |   |     ┌───────────────────┐     |  |
|  |  │ img  │ Name              |  |   |     │  ACCESSORY LAYER  │     |  |
|  |  └──────┘ Dimensions        |  |   |     │  (top - z: 30)    │     |  |
|  |          Features...        |  |   |     ├───────────────────┤     |  |
|  |          Rp 450.000/bln     |  |   |     │  CHAIR LAYER      │     |  |
|  +-----------------------------+  |   |     │  (mid - z: 20)    │     |  |
|                                   |   |     ├───────────────────┤     |  |
|  +-----------------------------+  |   |     │  DESK LAYER       │     |  |
|  |  [OptionCard] Desk B        |  |   |     │  (base - z: 10)   │     |  |
|  |  ┌──────┐                   |  |   |     ├───────────────────┤     |  |
|  |  │ img  │ Name              |  |   |     │  BACKGROUND        │     |  |
|  |  └──────┘ Dimensions        |  |   |     │  (z: 0)           │     |  |
|  |          Features...        |  |   |     └───────────────────┘     |  |
|  |          Rp 350.000/bln     |  |   |                               |  |
|  +-----------------------------+  |   +-------------------------------+  |
|                                   |                                       |
+-----------------------------------+---------------------------------------+
|          SUMMARY BAR (Sticky Bottom, full width, z-index: 50)           |
|  3 item terpilih          Total: Rp 1.400.000/bln      [Checkout →]    |
+===========================================================================+
```

### 2.2 Layout Ratios

| Screen     | Left Panel (Controls) | Right Panel (Canvas) | Summary Bar |
|------------|-----------------------|----------------------|-------------|
| Desktop    | 40% width             | 60% width            | Sticky bottom, full width |
| Tablet     | 45% width             | 55% width            | Sticky bottom, full width |
| Mobile     | 100% (stacked top)    | 100% (below controls, sticky or scroll) | Sticky bottom, full width |

### 2.3 Breakpoints

| Name     | Min Width | Tailwind Class |
|----------|-----------|----------------|
| Mobile   | 0px       | (default)      |
| Tablet   | 768px     | `md:`          |
| Desktop  | 1024px    | `lg:`          |
| Wide     | 1280px    | `xl:`          |

---

## 3. Color System

### 3.1 Brand Colors

| Token             | Hex       | Tailwind Class              | Usage                              |
|-------------------|-----------|-----------------------------|------------------------------------|
| Primary           | `#0D9488` | `teal-600`                  | Active tabs, selected card border, CTA buttons |
| Primary Light     | `#CCFBF1` | `teal-50`                   | Selected card background           |
| Primary Dark      | `#115E59` | `teal-800`                  | Hover states on primary elements   |
| Accent            | `#F97316` | `orange-500`                | "Sewa Sekarang" CTA button, price highlights |
| Accent Hover      | `#EA580C` | `orange-600`                | CTA hover state                    |

### 3.2 Neutral Colors

| Token             | Hex       | Tailwind Class              | Usage                              |
|-------------------|-----------|-----------------------------|------------------------------------|
| Background        | `#F8FAFC` | `slate-50`                  | Page background                    |
| Surface           | `#FFFFFF` | `white`                     | Cards, modal, panels               |
| Border            | `#E2E8F0` | `slate-200`                 | Card borders, dividers             |
| Border Active     | `#0D9488` | `teal-600`                   | Selected card ring                 |
| Text Primary      | `#0F172A` | `slate-900`                 | Headings, product names            |
| Text Secondary    | `#64748B` | `slate-500`                 | Descriptions, features, dimensions |
| Text Muted        | `#94A3B8` | `slate-400`                 | Placeholder text, empty states     |

### 3.3 Semantic Colors

| Token             | Hex       | Tailwind Class              | Usage                              |
|-------------------|-----------|-----------------------------|------------------------------------|
| Success           | `#16A34A` | `green-600`                 | Success toast/modal after checkout |
| Success BG        | `#F0FDF4` | `green-50`                  | Success modal background           |
| Error             | `#DC2626` | `red-600`                   | Validation errors (if any)         |

---

## 4. Typography

### 4.1 Font Family

| Usage     | Font      | Source                  | Tailwind Config |
|-----------|-----------|-------------------------|-----------------|
| All text  | Inter     | `next/font/google`      | `font-sans`     |

### 4.2 Type Scale

| Token           | Size    | Weight   | Tailwind Classes                         | Usage                          |
|-----------------|---------|----------|------------------------------------------|--------------------------------|
| Page Title      | 30px    | 700      | `text-3xl font-bold text-slate-900`      | Header "Design Your Workspace!" |
| Section Heading | 20px    | 600      | `text-xl font-semibold text-slate-900`   | Tab section titles             |
| Card Title      | 16px    | 600      | `text-base font-semibold text-slate-900` | Product name in cards          |
| Body            | 14px    | 400      | `text-sm text-slate-500`                 | Descriptions, dimensions       |
| Feature List    | 13px    | 400      | `text-xs text-slate-500`                 | Bullet features, specs         |
| Price           | 16px    | 600      | `text-base font-semibold text-teal-600`  | Product price on cards         |
| Total Price     | 22px    | 700      | `text-2xl font-bold text-slate-900`      | Summary bar total              |
| Button Text     | 14px    | 600      | `text-sm font-semibold`                  | All CTA buttons                |
| Small / Caption | 12px    | 400      | `text-xs text-slate-400`                 | Meta text, badges              |

### 4.3 Price Formatting

All prices use **Indonesian Rupiah (IDR)** format:

```
Rp 450.000/bln
Rp 1.400.000/bln
```

- Thousands separator: `.` (dot)
- Currency prefix: `Rp `
- Period suffix: `/bln` (abbreviation for "per bulan" / per month)

---

## 5. Spacing & Sizing System

### 5.1 Base Unit

Use Tailwind's default 4px spacing scale. All spacing should be multiples of 4px.

### 5.2 Key Measurements

| Element                  | Value          | Tailwind Class                            |
|--------------------------|----------------|-------------------------------------------|
| Page horizontal padding  | 24px           | `px-6` (mobile: `px-4`)                   |
| Page vertical padding    | 16px           | `py-4`                                    |
| Card padding             | 16px           | `p-4`                                     |
| Card gap (grid)          | 12px           | `gap-3`                                   |
| Card border-radius       | 16px           | `rounded-2xl`                             |
| Card image height        | 140px          | `h-[140px]`                               |
| Modal padding            | 24px           | `p-6`                                     |
| Modal border-radius      | 24px           | `rounded-2xl`                             |
| Summary bar height       | 64px           | `h-16`                                    |
| Tab height               | 44px           | `h-11`                                    |
| Button height            | 44px           | `h-11`                                    |
| Button padding-x         | 24px           | `px-6`                                    |
| Button border-radius     | 12px           | `rounded-xl`                              |

### 5.3 Canvas Sizing

| Property          | Value                             |
|-------------------|-----------------------------------|
| Min height        | 400px (`min-h-[400px]`)           |
| Desktop height    | `calc(100vh - header - tabs - summary bar)` |
| Background        | Subtle gradient or solid `slate-50` |
| Border            | `border border-slate-200 rounded-2xl` |

---

## 6. Component Styling Specifications

### 6.1 Header

```
┌─────────────────────────────────────────────┐
│  [monis.rent]   Design Your Workspace!      │
│                 Atur workspace impianmu     │
└─────────────────────────────────────────────┘
```

| Property         | Value                                              |
|------------------|----------------------------------------------------|
| Background       | `bg-white`                                         |
| Border bottom    | `border-b border-slate-200`                        |
| Padding          | `py-4 px-6`                                        |
| Logo             | Text-based `monis.rent` in `font-bold text-teal-600 text-xl` |
| Title            | `text-3xl font-bold text-slate-900`                |
| Tagline          | `text-sm text-slate-500 mt-1`                      |

### 6.2 Tab Bar

| Property           | Inactive State                              | Active State                                  |
|--------------------|---------------------------------------------|-----------------------------------------------|
| Background         | `bg-slate-100` (container)                  | `bg-slate-100`                                |
| Tab item bg        | `bg-transparent`                            | `bg-white shadow-sm`                          |
| Tab item text      | `text-sm text-slate-500`                    | `text-sm font-semibold text-teal-600`         |
| Tab item padding   | `px-4 py-2`                                 | `px-4 py-2`                                   |
| Tab item radius    | `rounded-lg`                                | `rounded-lg`                                  |
| Transition         | `transition-all duration-200`               | `transition-all duration-200`                 |

### 6.3 OptionCard (Desk / Chair)

```
┌──────────────────────────────┐
│  ┌────────────────────────┐  │
│  │                        │  │
│  │      PRODUCT IMAGE     │  │
│  │      h-[140px]         │  │
│  │      object-cover      │  │
│  │      rounded-xl        │  │
│  └────────────────────────┘  │
│                              │
│  Standing Desk Pro           │  ← font-semibold text-slate-900
│  120cm x 60cm x 75cm        │  ← text-xs text-slate-400
│                              │
│  • Electric adjustable       │  ← text-xs text-slate-500
│  • Cable management          │
│  • Memory presets            │
│                              │
│  Rp 450.000/bln             │  ← font-semibold text-teal-600
└──────────────────────────────┘
```

| Property              | Default State                                  | Selected State                               | Hover State                                  |
|-----------------------|------------------------------------------------|----------------------------------------------|----------------------------------------------|
| Background            | `bg-white`                                     | `bg-teal-50`                                 | `bg-slate-50`                                |
| Border                | `border border-slate-200`                      | `border-2 border-teal-600 ring-1 ring-teal-200` | `border-slate-300`                        |
| Shadow                | `shadow-sm`                                    | `shadow-md`                                  | `shadow-lg`                                  |
| Border-radius         | `rounded-2xl`                                  | `rounded-2xl`                                | `rounded-2xl`                                |
| Transition            | `transition-all duration-200`                  | `transition-all duration-200`                | `transition-all duration-200`                |
| Cursor                | `cursor-pointer`                               | `cursor-pointer`                             | `cursor-pointer`                             |
| Selected indicator    | —                                              | Checkmark icon (top-right corner)            | —                                            |

### 6.4 AccessoryToggle

```
┌──────────────────────────────────────────────────┐
│  ┌──────────┐                                    │
│  │  [img]   │   LED Desk Lamp                    │
│  │  48x48   │   Lampu meja LED adjustable        │
│  └──────────┘                      [Toggle: ON]  │
│                                   Rp 75.000/bln  │
└──────────────────────────────────────────────────┘
```

| Property              | OFF State                                     | ON State                                     |
|-----------------------|-----------------------------------------------|----------------------------------------------|
| Background            | `bg-white`                                    | `bg-teal-50`                                 |
| Border                | `border border-slate-200`                     | `border border-teal-300`                     |
| Toggle track bg       | `bg-slate-300`                                | `bg-teal-600`                                |
| Toggle circle         | `bg-white translate-x-0`                      | `bg-white translate-x-5`                     |
| Disabled (mutual excl)| `opacity-50 cursor-not-allowed pointer-events-none` | —                                   |
| Transition            | `transition-colors duration-200`              | `transition-colors duration-200`             |

### 6.5 Summary Bar

```
┌──────────────────────────────────────────────────────────────────┐
│  🪑 3 item terpilih            Total: Rp 1.400.000/bln   [→] │
└──────────────────────────────────────────────────────────────────┘
```

| Property           | Value                                              |
|--------------------|----------------------------------------------------|
| Position           | `fixed bottom-0 left-0 right-0`                    |
| Z-index            | `z-50`                                             |
| Height             | `h-16`                                             |
| Background         | `bg-white border-t border-slate-200 shadow-lg`     |
| Item count text    | `text-sm text-slate-500`                           |
| Total price text   | `text-xl font-bold text-slate-900`                 |
| Checkout button    | See Button component below                         |

### 6.6 Checkout Modal

```
┌─────────────────────────────────────────────┐
│  Ringkasan Sewa Anda                    [X] │  ← Header
├─────────────────────────────────────────────┤
│                                             │
│  🪑 Desk          Standing Desk Pro         │
│                    Rp 450.000/bln           │
│  ─────────────────────────────────────────  │
│  💺 Chair         Ergonomic Mesh Chair      │
│                    Rp 300.000/bln           │
│  ─────────────────────────────────────────  │
│  🖥️ Monitor       UltraWide Monitor 34"     │
│                    Rp 600.000/bln           │
│  ─────────────────────────────────────────  │
│  🌿 Plant         Indoor Plant              │
│                    Rp 50.000/bln            │
│                                             │
│  ═══════════════════════════════════════════│
│  Total                    Rp 1.400.000/bln  │  ← Bold, larger
│                                             │
│        [ Sewa Sekarang → ]                  │  ← CTA Button
└─────────────────────────────────────────────┘
```

| Property              | Value                                              |
|-----------------------|----------------------------------------------------|
| Overlay               | `bg-black/50` (backdrop-blur-sm)                   |
| Modal position        | Centered (`flex items-center justify-center`)       |
| Modal width           | `max-w-md` (448px) on mobile, `max-w-lg` (512px) on desktop |
| Modal background      | `bg-white rounded-2xl shadow-xl`                    |
| Modal padding         | `p-6`                                               |
| Header text           | `text-xl font-semibold text-slate-900`              |
| Close button (X)      | `text-slate-400 hover:text-slate-600` in top-right |
| Item row padding      | `py-3`                                              |
| Divider               | `border-b border-slate-100`                         |
| Total row             | `border-t-2 border-slate-200 pt-4 mt-2`            |
| Total text            | `text-2xl font-bold text-slate-900`                 |
| CTA Button            | See Button component below                          |
| Animation             | Framer Motion: `initial={{ opacity: 0, scale: 0.95 }}` → `animate={{ opacity: 1, scale: 1 }}` |

### 6.7 Buttons

| Variant     | Background          | Text               | Border            | Hover                                  |
|-------------|---------------------|---------------------|-------------------|----------------------------------------|
| **Primary (CTA)** | `bg-orange-500` | `text-white`        | None              | `bg-orange-600`                        |
| **Secondary**     | `bg-white`        | `text-slate-700`    | `border border-slate-200` | `bg-slate-50`                 |
| **Checkout**      | `bg-teal-600`     | `text-white`        | None              | `bg-teal-700`                          |

All buttons:
- Height: `h-11`
- Padding: `px-6`
- Border-radius: `rounded-xl`
- Font: `text-sm font-semibold`
- Transition: `transition-colors duration-200`
- Disabled state: `opacity-50 cursor-not-allowed`

---

## 7. Icon System

Use **Lucide React** for all icons. Consistent sizing:

| Context               | Icon Size | Tailwind Class     |
|-----------------------|-----------|--------------------|
| Tab icons             | 16px      | `w-4 h-4`          |
| Card category icons   | 20px      | `w-5 h-5`          |
| Summary bar icons     | 20px      | `w-5 h-5`          |
| Modal close (X)       | 20px      | `w-5 h-5`          |
| Empty state icons     | 48px      | `w-12 h-12`        |
| Canvas placeholder    | 32px      | `w-8 h-8`          |

### Icon Mapping

| Context                    | Icon Name        | Import                          |
|----------------------------|------------------|---------------------------------|
| Desks tab                  | `Armchair`       | `lucide-react`                  |
| Chairs tab                 | `Chair`          | `lucide-react`                  |
| Accessories tab            | `Puzzle`         | `lucide-react`                  |
| Monitor category           | `Monitor`        | `lucide-react`                  |
| Lighting category          | `Lamp`           | `lucide-react`                  |
| Greenery category          | `Leaf`           | `lucide-react`                  |
| Price display              | `Banknote`       | `lucide-react`                  |
| Checkout / Arrow           | `ArrowRight`     | `lucide-react`                  |
| Close modal                | `X`              | `lucide-react`                  |
| Checkmark (selected)       | `Check`          | `lucide-react`                  |
| Success toast              | `CheckCircle`    | `lucide-react`                  |
| Empty canvas state         | `ImageOff`       | `lucide-react`                  |

---

## 8. Animation & Transitions

### 8.1 Global Defaults

| Property            | Value                  |
|---------------------|------------------------|
| Duration            | 200ms                  |
| Easing              | `ease-in-out`          |
| Tailwind class      | `transition-all duration-200 ease-in-out` |

### 8.2 Specific Animations (Framer Motion)

| Element              | Trigger              | Animation                                                                 |
|----------------------|----------------------|---------------------------------------------------------------------------|
| OptionCard           | Selected             | Scale: `1 → 1.02`, Border color change, Shadow lift                      |
| AccessoryToggle      | Toggled ON/OFF       | Track color transition (200ms)                                            |
| VisualCanvas item    | Added                | `initial={{ opacity: 0, y: 10 }}` → `animate={{ opacity: 1, y: 0 }}`   |
| VisualCanvas item    | Removed              | `exit={{ opacity: 0, y: -10 }}`                                          |
| VisualCanvas item    | Swapped              | `AnimatePresence` with `mode="wait"` — fade out old, fade in new        |
| CheckoutModal        | Opened               | `initial={{ opacity: 0, scale: 0.95 }}` → `animate={{ opacity: 1, scale: 1 }}` |
| CheckoutModal        | Closed               | `exit={{ opacity: 0, scale: 0.95 }}`                                     |
| Success toast        | After "Sewa Sekarang"| `initial={{ opacity: 0, y: 20 }}` → `animate={{ opacity: 1, y: 0 }}`, auto-dismiss after 3s |
| SummaryBar total     | Price changes        | `animate={{ scale: [1, 1.05, 1] }}` (subtle pulse on change)            |

### 8.3 Canvas Layer Z-Index

| Layer        | Z-Index | Content                                    |
|--------------|---------|--------------------------------------------|
| Background   | 0       | Subtle gradient or solid color             |
| Desk layer   | 10      | Selected desk image                        |
| Chair layer  | 20      | Selected chair image                       |
| Accessory layer | 30   | All toggled accessories                    |

---

## 9. Responsive Design Details

### 9.1 Mobile Layout (< 768px)

```
┌─────────────────────────┐
│       HEADER            │
├─────────────────────────┤
│  [Tab: Meja] [Tab: ...] │  ← Horizontal scrollable tabs
├─────────────────────────┤
│                         │
│    CONTROL PANEL        │  ← Full width, scrollable
│    (product cards)      │
│                         │
├─────────────────────────┤
│                         │
│    VISUAL CANVAS        │  ← Full width, min-h 300px
│                         │
├─────────────────────────┤
│     SUMMARY BAR         │  ← Sticky bottom
└─────────────────────────┘
```

| Element             | Mobile Behavior                                                |
|---------------------|----------------------------------------------------------------|
| Split layout        | Stacked vertically (controls above, canvas below)             |
| Tab bar             | Horizontally scrollable (`overflow-x-auto`)                   |
| Control panel       | Single column card grid                                        |
| Visual canvas       | Full width, `min-h-[300px]`, sticky or follows scroll         |
| Summary bar         | Sticky bottom, condensed (hide item count, show total + button) |
| Checkout modal      | Full-width sheet sliding from bottom (`rounded-t-2xl`)        |

### 9.2 Tablet (768px — 1023px)

- Side-by-side layout: Left panel 45%, Right panel 55%
- Cards: 2-column grid
- Canvas: Proportional sizing

### 9.3 Desktop (1024px+)

- Side-by-side layout: Left panel 40%, Right panel 60%
- Cards: Single column (stacked vertically in left panel) or 2-column if space permits
- Canvas: Maximum space utilization
- Checkout modal: Centered overlay (`max-w-lg`)

---

## 10. Empty States

### 10.1 No Desk Selected

```
┌─────────────────────────────────┐
│                                 │
│         [ImageOff icon]         │
│                                 │
│      Pilih meja untuk           │
│      memulai desainmu           │
│                                 │
└─────────────────────────────────┘
```

- Icon: `ImageOff` from Lucide, size `w-12 h-12`, color `text-slate-300`
- Text: `text-sm text-slate-400`
- Background: `bg-slate-50`

### 10.2 No Chair Selected

Same layout as above, text: "Pilih kursi untuk melengkapi setup-mu"

### 10.3 No Accessories Selected

Same layout, text: "Tambahkan aksesoris untuk personalisasi workspace-mu"

---

## 11. Visual Canvas: Layering System Detail

The canvas uses **positioned `<div>` layers** with absolute positioning and z-index to stack items visually.

### 11.1 Canvas Container

```html
<div className="relative w-full h-full min-h-[400px] bg-gradient-to-b from-slate-50 to-slate-100 rounded-2xl border border-slate-200 overflow-hidden">
  <!-- Background layer (z-0) -->
  <!-- Desk layer (z-10) -->
  <!-- Chair layer (z-20) -->
  <!-- Accessory layer (z-30) -->
</div>
```

### 11.2 Image Placement Strategy

| Layer        | Positioning                       | Size                                    |
|--------------|-----------------------------------|-----------------------------------------|
| Desk         | Centered horizontally, bottom 20% | `w-[70%] h-auto`                       |
| Chair        | Centered horizontally, bottom 10% | `w-[35%] h-auto`, overlaps desk front  |
| Accessories  | Absolute, by `position` property  | `w-[20-30%] h-auto`                    |

### 11.3 Accessory Positioning Map

```
┌──────────────────────────────────────┐
│                                      │
│  LEFT (x: 5%)      CENTER (x: 35%)     RIGHT (x: 70%)  │
│  ┌────────┐        ┌──────────────┐     ┌────────┐     │
│  │ Lamp   │        │  Monitor(s)  │     │ Plant  │     │
│  │ Stand  │        │  Desk Mat    │     │        │     │
│  └────────┘        └──────────────┘     └────────┘     │
│                                      │
└──────────────────────────────────────┘
```

---

## 12. Z-Index Scale

| Layer                | Z-Index  | Tailwind  |
|----------------------|----------|-----------|
| Page background      | 0        | `z-0`     |
| Canvas desk layer    | 10       | `z-10`    |
| Canvas chair layer   | 20       | `z-20`    |
| Canvas accessory layer | 30     | `z-30`    |
| Summary bar          | 50       | `z-50`    |
| Modal overlay        | 100      | `z-[100]` |
| Modal content        | 110      | `z-[110]` |
| Success toast        | 120      | `z-[120]` |

---

## 13. Design Tokens Summary (Tailwind Config Extension)

```javascript
// tailwind.config.js (extend)
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0D9488',    // teal-600
          accent: '#F97316',     // orange-500
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'card': '16px',
        'modal': '24px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.12)',
        'card-selected': '0 0 0 2px #0D9488, 0 4px 12px rgba(13,148,136,0.15)',
        'bar': '0 -2px 10px rgba(0,0,0,0.08)',
      },
    },
  },
};
```
