# AGENTS.md — Coding Rules & Conventions

> **Purpose:** This document defines non-negotiable rules and conventions for building the monis.rent Workspace Builder. Every AI agent and human contributor must follow these rules to ensure consistency, readability, and maintainability across the codebase.

---

## 1. Project Structure Rules

### 1.1 Follow the Prescribed Directory Layout

```
src/
├── app/              # Next.js App Router pages and layouts
├── components/       # React components, organized by domain
│   ├── layout/       # Structural layout components
│   ├── panels/       # Control panel tabs
│   ├── preview/      # Visual canvas and renderers
│   ├── summary/      # Summary bar and checkout modal
│   └── ui/           # Reusable, generic UI primitives
├── data/             # Static mock data (desks, chairs, accessories)
├── store/            # Zustand store definitions
├── types/            # TypeScript interfaces and type definitions
└── lib/              # Utility/helper functions
```

**Rule:** Never place files outside these directories. Never create new top-level directories under `src/` without updating this document first.

**Reason:** A fixed structure makes it predictable for AI agents to locate files. When a new component is needed, the agent immediately knows which directory it belongs in based on its purpose.

### 1.2 One Component Per File

**Rule:** Each React component must be defined in its own file. The file name must match the component's exported name exactly.

```
✅ OptionCard.tsx    → exports OptionCard
✅ useWorkspaceStore.ts → exports useWorkspaceStore
❌ utils.ts          → exports formatCurrency, cn (multiple unrelated helpers)
```

**Exception:** Small helper functions that are tightly coupled to a single component (e.g., a `getStatusLabel` function used only inside `CheckoutModal.tsx`) can remain in the same file.

**Reason:** One-component-per-file makes searching, importing, and refactoring trivial. AI agents can locate any component by its file name without reading file contents.

### 1.3 No Nested Component Folders

**Rule:** Do not create subdirectories inside any component directory. All components within a domain (e.g., `panels/`) live as flat files.

```
✅ src/components/panels/DeskTab.tsx
✅ src/components/panels/ChairTab.tsx
❌ src/components/panels/tabs/DeskTab.tsx
```

**Reason:** This project has a small number of components. Nested folders add unnecessary hierarchy that slows down file discovery. Flat directories keep the mental model simple.

### 1.4 Data Files Are Static and Importable

**Rule:** All mock product data must live in `src/data/` as typed TypeScript files that export `const` arrays. Data files must never contain logic, side effects, or React imports.

```typescript
// ✅ src/data/desks.ts
import { Desk } from "@/types";

export const desks: Desk[] = [
  { id: "desk-standing", name: "Standing Desk Pro", ... },
  { id: "desk-wooden", name: "Minimalist Wooden Desk", ... },
];
```

**Reason:** Separating data from components makes it easy to swap mock data for real API responses later. It also keeps components focused on rendering, not data definition.

---

## 2. Naming Conventions

### 2.1 File Naming

| File Type           | Convention         | Example                      | Reason                                      |
|---------------------|--------------------|------------------------------|---------------------------------------------|
| React components    | PascalCase         | `OptionCard.tsx`             | Matches component export name; standard React convention |
| Zustand stores      | camelCase with `use` prefix | `useWorkspaceStore.ts` | Matches the hook convention for state access |
| TypeScript types    | camelCase          | `index.ts` (in `types/`)    | Types directory is a single barrel file      |
| Data files          | camelCase (plural) | `desks.ts`, `chairs.ts`     | Plural because they export arrays of items   |
| Utility files       | camelCase          | `utils.ts`                  | Standard convention for helper modules      |

**Rule:** Never use `snake_case` or `kebab-case` for file names. Never use abbreviations in file names (e.g., `acc.ts` is forbidden; use `accessories.ts`).

**Reason:** Consistent casing prevents confusion between file imports. Full words prevent ambiguity when AI agents search for files by name.

### 2.2 Component Naming

**Rule:** Component names must be descriptive nouns or noun phrases that describe *what* the component renders, not *where* it is used.

```
✅ OptionCard        — renders a selectable product card
✅ VisualCanvas      — renders the live preview canvas
✅ CheckoutModal     — renders the checkout summary modal
❌ LeftPanel         — describes position, not purpose
❌ TabContent        — too generic, doesn't describe the content
❌ MainComponent     — meaningless
```

**Reason:** Position-based names break when layout changes. Purpose-based names remain meaningful regardless of where the component is placed.

### 2.3 Variable & Function Naming

| Type               | Convention        | Example                      | Reason                                    |
|--------------------|--------------------|------------------------------|-------------------------------------------|
| React state        | `is`/`has` prefix  | `isCheckoutOpen`, `hasSelection` | Boolean prefix makes state purpose instantly clear |
| Event handlers     | `handle` prefix    | `handleSelectDesk`, `handleToggle` | Distinguishes handlers from other functions |
| Callbacks (props)  | `on` prefix        | `onSelect`, `onToggle`, `onClose` | Distinguishes prop callbacks from internal handlers |
| Derived values     | `get` prefix       | `getTotalPrice`, `getSelectedItemSummary` | Signals a computed/read operation         |
| Zustand actions    | verb phrase         | `selectDesk`, `toggleAccessory`, `openCheckout` | Actions are imperative commands           |
| Regular variables  | camelCase, descriptive | `selectedAccessories`, `deskPrice` | Standard JS convention                    |
| Constants          | UPPER_SNAKE_CASE   | `MAX_ACCESSORIES`, `CURRENCY_LOCALE` | Signals a value that never changes        |

**Rule:** Never use single-letter variable names except for loop counters (`i`, `j`) and short-lived lambda parameters (`x => x.id`).

**Reason:** Readable variable names reduce cognitive load. An AI agent reading `const total = getPrice()` has no context, but `const totalPrice = calculateMonthlyTotal()` is self-documenting.

### 2.4 Type & Interface Naming

**Rule:** Use PascalCase. Interface names must be nouns. Do not prefix with `I`.

```
✅ Desk, Chair, Accessory, WorkspaceState, ItemSummary
❌ IDesk, IChair, DeskType, ChairInterface, TDesk
```

**Exception:** Generic utility types may use descriptive prefixes if needed (e.g., `Maybe<T>` for nullable types).

**Reason:** The `I` prefix is a C#/.NET convention, not standard TypeScript. Removing it reduces noise. Suffixes like `Type` or `Interface` are redundant because the context (imported from `types/`) already signals that it is a type.

### 2.5 CSS Class Ordering

**Rule:** Follow this Tailwind class order inside `className` attributes:

1. Layout (`flex`, `grid`, `block`, `inline-flex`)
2. Positioning (`relative`, `absolute`, `fixed`, `sticky`)
3. Box model (`w-`, `h-`, `p-`, `m-`, `gap-`)
4. Typography (`text-`, `font-`, `leading-`, `tracking-`)
5. Visual (`bg-`, `border-`, `rounded-`, `shadow-`)
6. Interactive (`hover:`, `focus:`, `active:`, `disabled:`)
7. Transitions (`transition-`, `duration-`, `ease-`)

```
✅ className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-2xl hover:shadow-lg transition-shadow"
❌ className="rounded-2xl p-4 flex bg-white hover:shadow-lg border items-center gap-3 border-slate-200 transition-shadow"
```

**Reason:** Consistent class ordering makes styles scannable. Developers and AI can predict where a class is in the string, making edits faster and diffs cleaner.

---

## 3. TypeScript Rules

### 3.1 Strict Mode Always

**Rule:** `tsconfig.json` must have `"strict": true`. Never use `@ts-ignore` or `@ts-expect-error` unless accompanied by a comment explaining why.

**Reason:** Strict mode catches null/undefined bugs, implicit any, and unsafe operations at compile time. This is critical for a project with complex state interactions.

### 3.2 No `any` Type

**Rule:** Never use `any`. If a type is unknown, use `unknown` and narrow it with type guards.

```typescript
// ❌
function processData(data: any) { ... }

// ✅
function processData(data: unknown) {
  if (typeof data === "string") { ... }
}
```

**Reason:** `any` defeats the purpose of TypeScript. AI agents rely on type information to generate correct code; `any` removes that information.

### 3.3 Explicit Return Types for Complex Functions

**Rule:** Functions longer than 3 lines or with non-trivial return values must have explicit return type annotations.

```typescript
// ✅
function getSelectedItemSummary(): ItemSummary[] { ... }

// ✅ (short arrow functions can omit return type)
const formatPrice = (price: number) => `Rp ${price.toLocaleString("id-ID")}`;
```

**Reason:** Explicit return types serve as documentation and prevent accidental return type changes from breaking consumers.

### 3.4 Use Interface for Object Shapes, Type for Unions

**Rule:** Use `interface` for object shapes (product data, store state). Use `type` for unions, intersections, and computed types.

```typescript
// ✅
interface Desk { id: string; name: string; ... }
type AccessoryCategory = "monitor" | "lighting" | "greenery" | "other";

// ❌
type Desk = { id: string; name: string; ... }
interface AccessoryCategory = "monitor" | "lighting" | "greenery" | "other"
```

**Reason:** Interfaces are extensible (can be merged) and produce clearer error messages. Types are required for unions because interfaces cannot express union logic.

### 3.5 Path Aliases

**Rule:** Use the `@/` path alias for all imports within `src/`. Never use relative paths that climb more than one level (`../../`).

```typescript
// ✅
import { Desk } from "@/types";
import { desks } from "@/data/desks";
import { OptionCard } from "@/components/ui/OptionCard";

// ❌
import { Desk } from "../../../types";
import { desks } from "../data/desks";
```

**Reason:** Relative paths become fragile when files are moved. `@/` paths are absolute and stable, making refactoring safe. This is especially important when AI agents generate imports across the codebase.

---

## 4. Component Architecture Rules

### 4.1 Components Are Functional Only

**Rule:** Never use class components. All components must be React functional components with explicit prop types.

```typescript
// ✅
interface OptionCardProps {
  item: Desk | Chair;
  isSelected: boolean;
  onSelect: (item: Desk | Chair) => void;
}

export function OptionCard({ item, isSelected, onSelect }: OptionCardProps) { ... }

// ❌
class OptionCard extends React.Component { ... }
```

**Reason:** Functional components are simpler, easier to test, and compatible with hooks. Class components are deprecated in modern React patterns.

### 4.2 Props Are Destructured, Not Accessed via `props.`

**Rule:** Always destructure props in the function signature. Never access `props.item` or `props.isSelected`.

```typescript
// ✅
export function OptionCard({ item, isSelected, onSelect }: OptionCardProps) { ... }

// ❌
export function OptionCard(props: OptionCardProps) {
  return <div>{props.item.name}</div>;
}
```

**Reason:** Destructuring makes the component's dependencies visible at a glance. It also prevents typos like `props.itme` from silently producing `undefined`.

### 4.3 Export Components as Named Exports

**Rule:** Use named exports, not default exports.

```typescript
// ✅
export function OptionCard({ ... }: OptionCardProps) { ... }

// ❌
export default function OptionCard({ ... }: OptionCardProps) { ... }
```

**Reason:** Named exports make refactoring easier (IDE rename across all import sites), prevent accidental name mismatches in imports, and make dependency graphs explicit.

### 4.4 Co-locate Styles, Not Separate CSS Files

**Rule:** All styling must use Tailwind CSS utility classes directly in JSX. Never create `.css`, `.module.css`, or `.scss` files for component styles.

```typescript
// ✅
<div className="flex items-center gap-3 p-4 bg-white rounded-2xl">

// ❌
import styles from "./OptionCard.module.css";
<div className={styles.card}>
```

**Reason:** Tailwind utility classes keep styles co-located with markup, making it trivial for AI agents to understand and modify visual properties without switching files. CSS modules introduce a layer of indirection.

### 4.5 No Inline Styles

**Rule:** Never use the `style` prop with JavaScript objects. Use Tailwind classes exclusively.

```typescript
// ✅
<div className="h-[140px] w-full">

// ❌
<div style={{ height: "140px", width: "100%" }}>
```

**Exception:** Dynamic values that cannot be known at build time (e.g., a positioning value derived from runtime data) may use inline styles with a comment explaining why.

```typescript
// ✅ (dynamic positioning from data)
<div style={{ left: `${position.x}%` }} className="absolute">
```

**Reason:** Inline styles break the Tailwind utility system, prevent purging of unused classes, and make the design system harder to audit.

### 4.6 Component Size Limit

**Rule:** No component file should exceed 150 lines. If it does, extract sub-components or helper functions into separate files.

**Reason:** Large files are harder for AI agents to process within context limits. Smaller files are easier to understand, test, and modify in isolation.

### 4.7 Conditional Rendering with Early Returns

**Rule:** Use early returns for null/empty states at the top of the component. Avoid deeply nested ternary expressions.

```typescript
// ✅
export function VisualCanvas() {
  const { selectedDesk, selectedChair } = useWorkspaceStore();

  if (!selectedDesk && !selectedChair) {
    return <EmptyCanvasState />;
  }

  return (
    <div>
      <DeskRenderer desk={selectedDesk} />
      {selectedChair && <ChairRenderer chair={selectedChair} />}
    </div>
  );
}

// ❌
export function VisualCanvas() {
  const { selectedDesk, selectedChair } = useWorkspaceStore();
  return (
    <div>
      {selectedDesk ? <DeskRenderer desk={selectedDesk} /> : null}
      {selectedChair ? <ChairRenderer chair={selectedChair} /> : null}
    </div>
  );
}
```

**Reason:** Early returns reduce nesting, improve readability, and make empty states explicit. Deeply nested ternaries are hard to parse visually.

---

## 5. State Management Rules (Zustand)

### 5.1 Single Store, Single File

**Rule:** All workspace state lives in one store file: `src/store/useWorkspaceStore.ts`. Do not create multiple stores for this project.

**Reason:** This is a small, single-page application. One store keeps the state model unified and avoids the complexity of store composition or cross-store subscriptions.

### 5.2 Store Actions Are Defined Inside the Store

**Rule:** All actions (functions that modify state) must be defined inside the Zustand store, not outside as standalone functions.

```typescript
// ✅
const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  selectedDesk: null,
  selectDesk: (desk) => set({ selectedDesk: desk }),
  getTotalPrice: () => {
    const state = get();
    return (state.selectedDesk?.pricePerMonth ?? 0) + ...
  },
}));

// ❌
function selectDesk(desk: Desk) { /* uses a global variable */ }
```

**Reason:** Zustand's `set` and `get` are the only sanctioned mechanisms for state mutation. External mutation functions bypass React's reactivity system and cause stale renders.

### 5.3 Use `get()` for Computed Values, Not Separate State

**Rule:** Derived values (like total price, item count) must use `get()` inside store methods. Do not store them as separate state fields.

```typescript
// ✅
getTotalPrice: () => {
  const { selectedDesk, selectedChair, selectedAccessories } = get();
  const accessoryTotal = selectedAccessories.reduce((sum, acc) => sum + acc.pricePerMonth, 0);
  return (selectedDesk?.pricePerMonth ?? 0) + (selectedChair?.pricePerMonth ?? 0) + accessoryTotal;
};

// ❌ (storing derived value as state — causes sync bugs)
totalPrice: 0,
selectDesk: (desk) => set({ selectedDesk: desk, totalPrice: desk.pricePerMonth + ... }),
```

**Reason:** Storing derived values creates synchronization bugs — the derived value must be recalculated every time any dependency changes. Using `get()` ensures it is always computed from current state.

### 5.4 Never Mutate State Directly

**Rule:** Always use `set()` to update state. Never mutate the state object directly.

```typescript
// ✅
toggleAccessory: (accessory) => set((state) => ({
  selectedAccessories: state.selectedAccessories.some((a) => a.id === accessory.id)
    ? state.selectedAccessories.filter((a) => a.id !== accessory.id)
    : [...state.selectedAccessories, accessory],
}));

// ❌
toggleAccessory: (accessory) => {
  state.selectedAccessories.push(accessory); // Direct mutation!
  set({ selectedAccessories: state.selectedAccessories });
};
```

**Reason:** Direct mutation bypasses Zustand's equality check, causing React to miss re-renders. Immutable updates guarantee reactivity.

### 5.5 Selectors Over Accessing Full State

**Rule:** When using the store in components, always use selectors to pick only the values you need. Never destructure the entire store.

```typescript
// ✅
const selectedDesk = useWorkspaceStore((state) => state.selectedDesk);
const selectDesk = useWorkspaceStore((state) => state.selectDesk);

// ❌
const { selectedDesk, selectedChair, selectedAccessories, selectDesk, ... } = useWorkspaceStore();
```

**Reason:** Selecting the entire store causes the component to re-render on *any* state change, even unrelated ones. Selectors ensure minimal re-render scope.

---

## 6. Data & Type Rules

### 6.1 IDs Use Kebab-Case with Prefix

**Rule:** All product IDs must follow the format `{category}-{descriptive-name}` in kebab-case.

```
✅ desk-standing, desk-wooden
✅ chair-mesh, chair-executive
✅ acc-ultrawide-monitor, acc-desk-lamp, acc-plant
❌ standing_desk, desk1, ultrawide
```

**Reason:** Prefixed IDs prevent collisions across categories and make the category derivable from the ID string alone.

### 6.2 Prices Are Stored as Raw Numbers

**Rule:** Store prices as plain numbers (e.g., `450000`). Never store formatted strings (e.g., `"Rp 450.000"`).

**Reason:** Raw numbers enable arithmetic operations (summing, comparing). Formatting is a display concern and belongs in utility functions or components, not data.

### 6.3 Format Currency via Utility Function

**Rule:** All IDR price formatting must use a single utility function in `src/lib/utils.ts`.

```typescript
// src/lib/utils.ts
export function formatIDR(price: number): string {
  return `Rp ${price.toLocaleString("id-ID")}/bln`;
}
```

**Rule:** Never inline price formatting logic in components.

**Reason:** A single formatting function ensures consistent output (e.g., `"Rp 450.000/bln"` everywhere) and makes locale changes trivial.

### 6.4 Type Definitions Are Centralized

**Rule:** All TypeScript interfaces and types go in `src/types/index.ts`. Do not define types inside component files or data files (except for local props interfaces).

```typescript
// ✅ src/types/index.ts
export interface Desk { ... }
export interface Chair { ... }
export interface Accessory { ... }
export interface WorkspaceState { ... }

// ✅ src/components/ui/OptionCard.tsx (local props are fine here)
interface OptionCardProps { ... }

// ❌ src/data/desks.ts (data file should not define types)
interface Desk { ... }
```

**Reason:** Centralized types prevent duplication and make it easy to find all type definitions. Component-level prop types are an exception because they describe component-specific contracts.

---

## 7. Styling Rules (Tailwind)

### 7.1 Use Tailwind Design Tokens

**Rule:** Always use Tailwind's built-in color, spacing, and typography tokens. Never use arbitrary hex values or pixel values in class names unless no token exists.

```typescript
// ✅
<div className="bg-teal-600 text-white p-4">

// ❌ (arbitrary values when tokens exist)
<div className="bg-[#0D9488] text-[#FFFFFF] p-[16px]">
```

**Exception:** Use arbitrary values for canvas positioning (`left-[35%]`), image heights (`h-[140px]`), and other values not covered by Tailwind's default scale.

**Reason:** Tokens enforce design consistency. Arbitrary values create one-off styles that drift from the design system and cannot be audited or changed globally.

### 7.2 No `@apply` Directives

**Rule:** Never use `@apply` in CSS files. Compose utility classes directly in JSX.

```html
<!-- ✅ -->
<button className="h-11 px-6 rounded-xl text-sm font-semibold transition-colors duration-200">

<!-- ❌ -->
<style>
.btn-primary { @apply h-11 px-6 rounded-xl text-sm font-semibold; }
</style>
<button className="btn-primary">
```

**Reason:** `@apply` creates invisible abstractions that hide the actual styles. It also defeats Tailwind's tree-shaking, increasing bundle size.

### 7.3 Responsive Prefixes Follow Mobile-First

**Rule:** Write mobile styles first (no prefix), then override for larger screens.

```typescript
// ✅ (mobile: stacked, desktop: side-by-side)
<div className="flex flex-col lg:flex-row">

// ❌ (desktop-first)
<div className="flex flex-row max-lg:flex-col">
```

**Reason:** Mobile-first is Tailwind's default approach and produces smaller CSS. Overrides stack naturally as screen size increases.

### 7.4 Semantic Color Usage

**Rule:** Use colors according to their defined purpose in Design.md. Never use `teal-600` for a destructive action or `red-600` for a success state.

| Color              | Permitted Usage                              |
|--------------------|----------------------------------------------|
| `teal-600`         | Primary CTAs, selected borders, active tabs  |
| `orange-500`       | "Sewa Sekarang" CTA, accent highlights       |
| `slate-50`         | Page background                              |
| `white`            | Card surfaces, modals                        |
| `slate-900`        | Primary text, headings                       |
| `slate-500`        | Secondary text, descriptions                 |
| `green-600`        | Success states only                          |
| `red-600`          | Error states only                            |

**Reason:** Consistent color semantics create visual predictability. Users and AI agents learn to associate colors with meanings, reducing cognitive load.

---

## 8. Animation Rules (Framer Motion)

### 8.1 Use `AnimatePresence` for List Transitions

**Rule:** Any component that conditionally renders items in a list (canvas layers, accessory toggles) must wrap the list in `AnimatePresence` with a unique `key` on each child.

```typescript
// ✅
<AnimatePresence mode="wait">
  {selectedDesk && (
    <motion.div
      key={selectedDesk.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <img src={selectedDesk.image} />
    </motion.div>
  )}
</AnimatePresence>

// ❌
<div>
  {selectedDesk && <img src={selectedDesk.image} />}
</div>
```

**Reason:** `AnimatePresence` enables exit animations. Without it, removed items instantly disappear without transition, breaking the visual continuity.

### 8.2 Key Props Must Be Unique and Stable

**Rule:** Every `motion.*` component inside a mapped list or conditional render must have a `key` prop. Keys must be unique identifiers (e.g., `item.id`), never array indices.

```typescript
// ✅
{selectedAccessories.map((acc) => (
  <motion.div key={acc.id} ...>
    <img src={acc.image} />
  </motion.div>
))}

// ❌
{selectedAccessories.map((acc, index) => (
  <motion.div key={index} ...>
    <img src={acc.image} />
  </motion.div>
))}
```

**Reason:** Index keys cause incorrect animations when items are reordered or removed. Unique IDs ensure React tracks the correct DOM node for each item.

### 8.3 Animation Durations Must Match Design.md

**Rule:** Use the durations specified in Design.md Section 8.1. Default is 200ms. Do not invent custom durations without updating Design.md.

**Reason:** Inconsistent durations create a disjointed feel. The design document is the single source of truth for animation timing.

### 8.4 No Animation on Layout-Blocking Elements

**Rule:** Never animate properties that affect layout (width, height, padding, margin) on structural containers. Animate only opacity, transform (translate, scale, rotate), and colors.

```typescript
// ✅ (transform does not affect layout)
<motion.div animate={{ opacity: 1, y: 0 }}>

// ❌ (height affects layout, causes jank)
<motion.div animate={{ height: "auto" }}>
```

**Reason:** Layout property animations trigger browser reflow/repaint on every frame, causing jank. Transform and opacity animations are GPU-accelerated.

---

## 9. Performance Rules

### 9.1 Use Next.js `<Image>` for All Product Images

**Rule:** Every `<img>` tag showing product images must use `next/image`'s `<Image>` component with explicit `width` and `height` props.

```typescript
// ✅
import Image from "next/image";
<Image src={desk.image} alt={desk.name} width={400} height={200} className="object-cover" />

// ❌
<img src={desk.image} alt={desk.name} />
```

**Reason:** `next/image` provides automatic optimization (WebP conversion, lazy loading, responsive sizing) on Vercel. Explicit dimensions prevent layout shift (CLS).

### 9.2 No Large Inline Objects or Arrays in JSX

**Rule:** Do not define large objects or arrays inside JSX return statements. Define them outside the component or memoize them.

```typescript
// ❌ (new array created every render)
<div>
  {["feature1", "feature2", "feature3"].map(f => <span key={f}>{f}</span>)}
</div>

// ✅ (defined outside or as constant)
const FEATURES = ["feature1", "feature2", "feature3"];

function Component() {
  return <div>{FEATURES.map(f => <span key={f}>{f}</span>)}</div>;
}
```

**Reason:** Inline allocations create new references every render, defeating React's memoization and causing unnecessary re-renders in child components.

### 9.3 Lazy Load Below-the-Fold Content

**Rule:** The checkout modal and success toast must use `React.lazy()` with `Suspense` to avoid loading them in the initial bundle.

```typescript
const CheckoutModal = React.lazy(() =>
  import("@/components/summary/CheckoutModal")
);
```

**Reason:** The checkout modal is not needed until the user clicks "Checkout". Lazy loading reduces initial JavaScript bundle size, improving First Contentful Paint (FCP).

---

## 10. Accessibility Rules

### 10.1 Interactive Elements Must Have `aria-label`

**Rule:** Every button, toggle, and tab must have an `aria-label` attribute that describes its action.

```typescript
// ✅
<button aria-label="Pilih meja Standing Desk Pro" onClick={...}>

// ✅
<button aria-label="Tutup ringkasan checkout" onClick={...}>

// ❌
<button onClick={...}>X</button>
```

**Reason:** Screen readers cannot interpret icons or visual indicators. `aria-label` provides text alternatives for non-text interactive elements.

### 10.2 Tab Navigation Must Be Keyboard Accessible

**Rule:** Tab controls must respond to keyboard events: `Enter` or `Space` to activate, `ArrowLeft`/`ArrowRight` to move between tabs.

**Reason:** Keyboard-only users cannot use a mouse. The WCAG 2.1 keyboard navigation requirement mandates this for accessibility compliance.

### 10.3 Images Must Have Descriptive `alt` Text

**Rule:** Every `<Image>` or `<img>` element must have an `alt` prop that describes the product, not "image" or "photo".

```typescript
// ✅
<Image alt="Standing Desk Pro - Meja elektrik adjustable" ... />

// ❌
<Image alt="desk image" ... />
<Image alt="" ... />  // Only acceptable for decorative images
```

**Reason:** Descriptive alt text enables screen reader users to understand visual content. Decorative images (if any) should have empty `alt=""`.

### 10.4 Color Is Not the Only Indicator

**Rule:** Selected states must use color AND a secondary indicator (icon, border thickness, text change). Never rely on color alone.

```typescript
// ✅ (color + checkmark icon + ring)
<div className="border-2 border-teal-600 ring-1 ring-teal-200">
  <Check className="absolute top-2 right-2" />
  ...
</div>

// ❌ (color only)
<div className="border-2 border-teal-600">
  ...
</div>
```

**Reason:** Colorblind users may not perceive color differences. WCAG 2.1 Success Criterion 1.4.1 requires non-color indicators for state changes.

---

## 11. Error Handling Rules

### 11.1 Null Checks Before Access

**Rule:** Always check for `null`/`undefined` before accessing properties on optional values. Use optional chaining (`?.`) or nullish coalescing (`??`).

```typescript
// ✅
const price = selectedDesk?.pricePerMonth ?? 0;
const features = desk?.features ?? [];

// ❌
const price = selectedDesk.pricePerMonth;  // Crashes if selectedDesk is null
```

**Reason:** The workspace state starts with `null` selections. Accessing properties on `null` causes runtime crashes.

### 11.2 Exhaustive Switch/If-Else

**Rule:** When branching on union types (e.g., `AccessoryCategory`), ensure all variants are handled. If a new variant is added to the type, TypeScript must produce a compile error.

```typescript
function getCategoryIcon(category: AccessoryCategory) {
  switch (category) {
    case "monitor": return <Monitor />;
    case "lighting": return <Lamp />;
    case "greenery": return <Leaf />;
    case "other": return <Puzzle />;
    default:
      const _exhaustive: never = category; // Compile error if variant is missing
      return _exhaustive;
  }
}
```

**Reason:** Exhaustive checks prevent silent failures when new data variants are added. TypeScript enforces coverage at compile time.

---

## 12. Git & Commit Rules

### 12.1 Branch Naming

```
feat/desk-selection      → new feature
fix/checkout-modal-close → bug fix
chore/update-prd        → documentation or tooling
refactor/store-cleanup   → code restructuring
```

**Rule:** Branch names must follow `type/description` format. Use kebab-case for the description. Types: `feat`, `fix`, `chore`, `refactor`, `docs`.

**Reason:** Consistent branch names make it easy to understand the purpose of a branch from its name alone.

### 12.2 Commit Messages

```
feat: add desk selection with OptionCard component
fix: prevent double-toggle on accessory mutual exclusion
chore: initialize Next.js project with Tailwind
```

**Rule:** Commit messages must follow Conventional Commits: `type(scope): description`. Scope is optional. Description must be imperative mood ("add", not "added" or "adds").

**Reason:** Conventional commits enable automated changelog generation and make git history scannable.

### 12.3 Do Not Commit

- `node_modules/`
- `.env` or `.env.local` (must be in `.gitignore`)
- Build artifacts (`.next/`, `out/`)
- Product image files (use external URLs or Vercel Blob Storage instead)

**Reason:** These files are either generated, environment-specific, or too large for git. Committing them bloats the repository and leaks secrets.

---

## 13. Documentation Rules

### 13.1 PRD.md Is the Source of Truth for Features

**Rule:** All feature requirements, acceptance criteria, and data models come from `PRD.md`. If there is a conflict between code and PRD, the PRD is authoritative until it is updated.

**Reason:** PRD is the contract with the client. Code that deviates from it is incorrect, even if it "works."

### 13.2 Design.md Is the Source of Truth for Visuals

**Rule:** All colors, typography, spacing, animations, and component styles come from `Design.md`. If there is a conflict between code and Design.md, the Design.md is authoritative until it is updated.

**Reason:** Design is the contract for the visual experience. Consistency across the UI depends on a single source of truth.

### 13.3 This Document (AGENTS.md) Is the Source of Truth for Code Rules

**Rule:** All coding conventions, naming rules, and architectural decisions come from `AGENTS.md`. If a question arises about "how to write code," consult this document first.

**Reason:** This document prevents drift between agents. Without it, each agent may apply different conventions, producing an inconsistent codebase.

---

## Quick Reference: File Naming Cheat Sheet

| What                  | Where                | Name Pattern           | Example                  |
|-----------------------|----------------------|------------------------|--------------------------|
| Page/route            | `src/app/`           | `page.tsx`             | `page.tsx`               |
| Layout                | `src/app/`           | `layout.tsx`           | `layout.tsx`             |
| Component             | `src/components/`    | `PascalCase.tsx`       | `OptionCard.tsx`         |
| Store                 | `src/store/`         | `useCamelCase.ts`      | `useWorkspaceStore.ts`   |
| Types                 | `src/types/`         | `index.ts`             | `index.ts`               |
| Data                  | `src/data/`          | `camelCase.ts`         | `desks.ts`               |
| Utility               | `src/lib/`           | `camelCase.ts`         | `utils.ts`               |
| Global CSS            | `src/app/`           | `globals.css`          | `globals.css`            |

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
