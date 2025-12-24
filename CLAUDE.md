# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

STACK Dashboard is a React 19 single-page application with a neo-brutalist design system. It's built with Vite, TypeScript, and uses CDN-based module imports via esm.sh. The app features 19+ demo pages including a main dashboard with real-time analytics.

## Development Commands

```bash
npm install              # Install dependencies
npm run dev              # Start development server (port 3000)
npm run build            # Build for production
npm run preview          # Preview production build
```

## Architecture

### Routerless Navigation
This app does **not** use React Router. Navigation is handled through simple state management in `App.tsx`:
- `currentPage` state tracks the active view
- Sidebar navigation directly updates `currentPage`
- Each page component is imported in `App.tsx` and conditionally rendered

### Component Structure

**Entry Points:**
- `index.tsx` - React 18 createRoot bootstrap
- `App.tsx` - Main component with all page imports, navigation state, and mock data
- `index.html` - HTML template with Tailwind CDN config, import maps, and custom CSS

**Core Components:**
- `components/layout.tsx` - Sidebar and Header
- `components/DashboardWidgets.tsx` - StatCard, RevenueChart, UserActivityChart, ActivityTable
- `components/ui.tsx` - Reusable UI elements (Button, Card, Badge)

**Page Components** (all in `components/`):
- Business: CustomersPage, AnalyticsPage, BillingPage, TicketsPage
- Apps: ChatPage, EmailPage, FileManagerPage, KanbanPage
- Tools: CalendarPage, TimelinePage, InventoryPage, SettingsPage, NotificationsPage
- Media: GalleryPage
- Crypto: CryptoMarketPage, TradePage, WalletPage, ConvertPage
- Errors: NotFoundPage, ServerErrorPage, LoginPage

### Type Definitions
All TypeScript interfaces are in `types.ts`:
- `Metric`, `ChartDataPoint`, `ActivityItem`, `DashboardState`

## Styling System

**Neo-brutalist Design:**
- Custom color palette defined in `index.html` (neo-yellow, neo-red, neo-blue, neo-black, etc.)
- Shadow utilities: `shadow-neo`, `shadow-neo-sm`, `shadow-neo-lg`
- Typography: Space Grotesk (sans), Space Mono (code)
- Border-heavy aesthetic with 2px solid borders

The dot-grid background is applied via CSS:
```css
background-image: radial-gradient(#181818 1px, transparent 1px);
background-size: 24px 24px;
```

## Import Maps

The app uses esm.sh CDN imports defined in `index.html`. When adding new packages:
1. Add to `importmap` in `index.html`
2. Add to `dependencies` in `package.json` for type checking

## State Management

No external state management library. Uses React hooks:
- `useState` for component-local state
- Mock data initialized in `App.tsx` top-level

## Path Aliases

`@/*` maps to the project root (configured in `vite.config.ts`).
