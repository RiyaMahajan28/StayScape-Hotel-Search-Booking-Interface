# Soulea Website

Marketing and booking UI for Soulea, built with [Next.js](https://nextjs.org) (App Router) and plain JavaScript (`.jsx` for components and pages, `.js` for data and helpers).

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

| Script          | Purpose                                  |
| --------------- | ---------------------------------------- |
| `npm run dev`   | Start the dev server with hot reload     |
| `npm run build` | Create a production build                |
| `npm start`     | Serve the production build (build first) |
| `npm run lint`  | Run ESLint                               |

## Project structure

```
app/                    Routes (App Router)
  layout.jsx            Root layout, font and theme provider
  page.jsx              Home
  franchise/            Franchise landing page
  plp/                  Property listing form (+ plp.css)
  search/               Search results
  globals.css           Global styles and theme variables
components/
  layout/               Header, Footer, ProfileDropdown
  auth/                 Phone/OTP sign-in modal
  home/                 Home page sections (Hero, destinations, reviews)
  search/               SearchBox, search results page and filters
  plp/                  Listing form building blocks
  common/               Shared UI (PropertyCard)
  providers/            ThemeProvider (light/dark)
data/                   Static mock content (swap for API calls later)
lib/                    Pure helpers (image URLs, property search/sort)
public/                 Images and icons
```

Imports use the `@/` alias for the project root (configured in `jsconfig.json`).

Pages are server components by default; only interactive pieces are marked `"use client"`.
