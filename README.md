# Wolfrayet Media — Digital Marketing Agency Website

A premium, production-ready Next.js 14 marketing website with TypeScript, Tailwind CSS, Framer Motion, and ShadCN UI components.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** — scroll animations, page transitions, counters
- **ShadCN UI** — Button, Card, Accordion, Dialog, Tabs, Input
- **Lucide React** — icons
- **next-themes** — dark/light mode
- **React Hook Form + Zod** — form validation

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, services, testimonials, pricing, FAQ, blog preview |
| `/about` | Company intro, team, timeline, mission/vision |
| `/services` | Service cards, detailed sections, process, comparison |
| `/portfolio` | Masonry grid, filters, project modal |
| `/blog` | Listing with search and category tabs |
| `/blog/[slug]` | Dynamic blog post pages |
| `/contact` | Form, contact cards, Google Maps embed |

## Project Structure

```
src/
├── app/              # Pages, layouts, API routes
├── components/
│   ├── layout/       # Header, Footer, MobileNav
│   ├── sections/     # Page sections (Hero, FAQ, etc.)
│   ├── shared/       # Reusable utilities
│   ├── ui/           # ShadCN primitives
│   └── providers/    # Theme, page transitions
├── data/             # Mock JSON data
├── hooks/
├── lib/              # Utils, constants, validations
└── types/
```

## Environment Variables

Copy `.env.example` to `.env.local`:

- `NEXT_PUBLIC_SITE_URL` — canonical site URL for SEO
- `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL` — Google Maps iframe embed URL

## API Routes

- `POST /api/contact` — contact form submission (ready for email integration)
- `POST /api/newsletter` — newsletter signup (ready for provider integration)

## Build

```bash
npm run build
npm start
```

## Features

- Dark/light mode toggle
- Sticky navbar with scroll reveal
- Mobile hamburger with slide animation
- SEO metadata per page
- Error boundary and loading states
- Accessible forms and skip links
- Optimized images via `next/image`
