# Installation Required

To use the new Eval Lab page, you need to install the Radix UI Accordion dependency:

```bash
npm install @radix-ui/react-accordion
```

Or if using the shadcn CLI:

```bash
npx shadcn@latest add accordion
```

This is required for the collapsible gate configuration cards in the left column.

## What was changed:

1. Created `/components/ui/accordion.tsx` - The Accordion component
2. Updated `/tailwind.config.ts` - Added accordion animations
3. Completely redesigned `/app/evals/page.tsx` - New 3-column layout

## After installation:

Run the dev server:
```bash
npm run dev
```

Then navigate to http://localhost:3000/evals to see the new Eval Lab.
