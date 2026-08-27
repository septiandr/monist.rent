# monis.rent Workspace Builder

Interactive web application for customizing workspace setups for digital nomads in Bali.

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Zustand
- Framer Motion
- Lucide React

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Approach

I built this as a single-page configurator where users can compose a workspace from a desk, chair, accessories, and extras, then see a live preview and a price summary. The core idea is that every selection is a discrete, togglable state, and the canvas is just a projection of that state.

**Tech choices.** Next.js 16 (App Router) for the file-based routing and image optimization, TypeScript in strict mode for compile-time safety on a small but state-heavy UI, and Zustand for a single flat store that holds selections and exposes actions (no prop drilling, no context boilerplate). Tailwind keeps every component's styles co-located in JSX, and Framer Motion + `AnimatePresence` handle the swap/enter/exit transitions when items change. All product data is static TypeScript files in `src/data/`, which makes it trivial to swap in an API later without touching components.

**What I'd improve with more time.** Add per-item positioning on the canvas (drag-to-place accessories), persist selections to `localStorage` so a refresh doesn't wipe the workspace, surface a "complete" preset the user can load in one click, and replace the SVG product art with real photography. I'd also add unit tests around the store's `getTotalPrice` and `getSelectedItemSummary` since they're the only place where the pricing math lives, and a basic a11y pass to verify keyboard tab navigation between the option cards.
