# vibe-template

A React + TypeScript template powered by Vite, Tailwind CSS, and shadcn/ui components.

## Requirements

- Node.js 18+ (LTS recommended)
- npm

## Getting started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

## Available scripts

- `npm run dev` - start Vite in development mode
- `npm run build` - create a production build
- `npm run build:dev` - create a development-mode build
- `npm run preview` - preview the production build locally
- `npm run lint` - run ESLint checks
- `npm run test` - run Vitest tests once
- `npm run test:watch` - run Vitest in watch mode

## Verification commands

Use these to verify repository health:

```bash
npm run lint
npm run test
npm run build
npx tsc --noEmit
```

## Lockfile policy

This repository does not track `package-lock.json`.

## Annunci (feed Immobiliare.it / Getrix)

1. `.github/workflows/download.yml` gira ogni giorno (04:30 UTC) e manualmente.
2. `scripts/download.py` scarica gli XML Getrix e scrive `docs/feed.json`.
3. Il sito legge `docs/feed.json` via raw.githubusercontent.com in `src/hooks/useProperties.ts`.
