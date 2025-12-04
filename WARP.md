# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Next.js 16 application using the App Router, React 19, TypeScript, and Tailwind CSS v4. The project focuses on displaying competitive landscape data with interactive vendor cards.

## Common Commands

### Development
```bash
npm run dev          # Start development server on http://localhost:3000
npm run build        # Create production build
npm start            # Start production server
npm run lint         # Run ESLint
```

### Testing
This project does not currently have a test suite configured.

## Architecture

### App Router Structure
- Uses Next.js App Router (app directory)
- Server components by default; client components marked with `'use client'`
- File-based routing: each folder in `app/` represents a route

### Key Directories
- `app/` - Application pages and layouts using App Router conventions
  - `layout.tsx` - Root layout with Geist font configuration
  - `page.tsx` - Home page (route: `/`)
  - `competitive-landscape/` - Competitive landscape feature (route: `/competitive-landscape`)
- `data/` - CSV data files (e.g., `comp-data.csv` for vendor information)
- `public/` - Static assets served from root path

### Data Flow
The `/competitive-landscape` route demonstrates a common pattern:
1. Server component (`page.tsx`) reads CSV data from `data/` directory using Node.js fs module
2. Data is parsed and typed with TypeScript interfaces
3. Processed data is passed to client component (`VendorGrid.tsx`) for interactive rendering
4. Client component handles sorting and UI interactions

### TypeScript Configuration
- Path alias `@/*` maps to project root
- Strict mode enabled
- Uses bundler module resolution

### Styling
- Tailwind CSS v4 with PostCSS
- Custom CSS variables defined in `app/globals.css`
- Geist Sans and Geist Mono fonts from Google Fonts
- Dark mode support via `prefers-color-scheme`
