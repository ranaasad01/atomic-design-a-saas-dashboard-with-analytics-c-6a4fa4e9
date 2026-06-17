// ─── Brand constants ────────────────────────────────────────────────────────
export const APP_NAME = "Pulse Analytics";
export const APP_TAGLINE = "Every metric that moves your business, in one place.";
export const APP_DESCRIPTION =
  "Pulse gives SaaS teams a single pane of glass for revenue, growth, and user behaviour — powered by real-time data and beautiful visualisations.";

// ─── Navigation (single source of truth) ────────────────────────────────────
// All hrefs are on-page anchors because only the homepage exists right now.
export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Overview",  href: "#overview"  },
  { label: "Features",  href: "#features"  },
  { label: "Charts",    href: "#charts"    },
  { label: "Pricing",   href: "#pricing"   },
  { label: "About",     href: "#about"     },
];

export const navCTA = {
  label: "Start Free Trial",
  href: "#get-started",
};

// ─── Shared TypeScript types ─────────────────────────────────────────────────
export interface KpiCard {
  id: string;
  label: string;
  value: string;
  delta: string;
  deltaPositive: boolean;
  icon: string; // lucide icon name
  color: string; // tailwind bg class for accent
}

export interface ChartDataPoint {
  month: string;
  revenue: number;
  mrr: number;
  users: number;
  activeUsers: number;
}

export interface Transaction {
  id: string;
  customer: string;
  email: string;
  plan: string;
  amount: number;
  status: "paid" | "pending" | "failed";
  date: string;
}

export interface TrafficSource {
  name: string;
  value: number;
  color: string;
}

// ─── Palette / design tokens ─────────────────────────────────────────────────
export const BRAND_COLORS = {
  primary:   "#6366f1",
  secondary: "#8b5cf6",
  dark:      "#1e1b4b",
  light:     "#f8fafc",
  border:    "#e2e8f0",
} as const;