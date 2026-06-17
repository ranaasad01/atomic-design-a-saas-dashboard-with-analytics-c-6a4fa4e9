"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, ArrowRight, Check, Star, Zap, Shield, BarChart2, Globe, Bell, ChevronDown, Sparkles, Eye, Clock, AlertCircle } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn, slideInLeft, slideInRight } from "@/lib/motion";
import { APP_NAME, APP_TAGLINE, APP_DESCRIPTION, BRAND_COLORS } from "@/lib/data";

// ─── Inline mock data ────────────────────────────────────────────────────────

const revenueData = [
  { month: "Jan", revenue: 42000, mrr: 38000, users: 1200, activeUsers: 980 },
  { month: "Feb", revenue: 48500, mrr: 41000, users: 1380, activeUsers: 1100 },
  { month: "Mar", revenue: 51200, mrr: 44500, users: 1520, activeUsers: 1240 },
  { month: "Apr", revenue: 55800, mrr: 48000, users: 1710, activeUsers: 1390 },
  { month: "May", revenue: 61400, mrr: 53200, users: 1950, activeUsers: 1580 },
  { month: "Jun", revenue: 67900, mrr: 58700, users: 2180, activeUsers: 1790 },
  { month: "Jul", revenue: 72300, mrr: 63100, users: 2420, activeUsers: 1980 },
  { month: "Aug", revenue: 79800, mrr: 69400, users: 2690, activeUsers: 2210 },
  { month: "Sep", revenue: 85200, mrr: 74800, users: 2940, activeUsers: 2430 },
  { month: "Oct", revenue: 91600, mrr: 80200, users: 3210, activeUsers: 2650 },
  { month: "Nov", revenue: 98400, mrr: 86500, users: 3490, activeUsers: 2880 },
  { month: "Dec", revenue: 107200, mrr: 94100, users: 3820, activeUsers: 3150 },
];

const trafficSources = [
  { name: "Organic Search", value: 38, color: "#6366f1" },
  { name: "Direct", value: 24, color: "#8b5cf6" },
  { name: "Referral", value: 18, color: "#06b6d4" },
  { name: "Social Media", value: 12, color: "#f59e0b" },
  { name: "Email", value: 8, color: "#10b981" },
];

const kpiCards = [
  {
    id: "mrr",
    label: "Monthly Recurring Revenue",
    value: "$94,100",
    delta: "+12.4%",
    deltaPositive: true,
    icon: DollarSign,
    color: "from-indigo-500 to-violet-600",
    bg: "bg-indigo-50",
    textColor: "text-indigo-600",
  },
  {
    id: "users",
    label: "Total Active Users",
    value: "3,820",
    delta: "+9.5%",
    deltaPositive: true,
    icon: Users,
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-50",
    textColor: "text-violet-600",
  },
  {
    id: "churn",
    label: "Churn Rate",
    value: "2.1%",
    delta: "-0.4%",
    deltaPositive: true,
    icon: TrendingDown,
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    textColor: "text-emerald-600",
  },
  {
    id: "arpu",
    label: "Avg Revenue Per User",
    value: "$24.63",
    delta: "+3.2%",
    deltaPositive: true,
    icon: Activity,
    color: "from-cyan-500 to-blue-600",
    bg: "bg-cyan-50",
    textColor: "text-cyan-600",
  },
];

const transactions = [
  { id: "txn-001", customer: "Acme Corp", email: "billing@acme.com", plan: "Enterprise", amount: 1200, status: "paid" as const, date: "Dec 28" },
  { id: "txn-002", customer: "Bright Labs", email: "admin@brightlabs.io", plan: "Growth", amount: 299, status: "paid" as const, date: "Dec 27" },
  { id: "txn-003", customer: "Nova Systems", email: "finance@novasys.com", plan: "Enterprise", amount: 1200, status: "pending" as const, date: "Dec 27" },
  { id: "txn-004", customer: "Pixel Studio", email: "hello@pixelstudio.co", plan: "Starter", amount: 49, status: "paid" as const, date: "Dec 26" },
  { id: "txn-005", customer: "Drift Analytics", email: "ops@driftanalytics.com", plan: "Growth", amount: 299, status: "failed" as const, date: "Dec 26" },
  { id: "txn-006", customer: "Helix Health", email: "billing@helixhealth.io", plan: "Enterprise", amount: 1200, status: "paid" as const, date: "Dec 25" },
];

const features = [
  {
    icon: BarChart2,
    title: "Real-Time Revenue Charts",
    description: "Track MRR, ARR, and expansion revenue with live-updating charts. Spot trends the moment they emerge — not in your next weekly report.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: Users,
    title: "User Behaviour Analytics",
    description: "Understand exactly how customers move through your product. Funnel analysis, cohort retention, and session heatmaps in one unified view.",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    icon: Globe,
    title: "Traffic Source Breakdown",
    description: "See which channels drive your highest-value signups. Attribute revenue to campaigns, organic search, referrals, and more — automatically.",
    color: "text-cyan-600",
    bg: "bg-cyan-50",
  },
  {
    icon: Bell,
    title: "Smart Anomaly Alerts",
    description: "Pulse watches your metrics 24/7 and fires Slack or email alerts the instant something unusual happens — before it becomes a crisis.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: Shield,
    title: "SOC 2 Type II Certified",
    description: "Enterprise-grade security baked in from day one. Your data is encrypted at rest and in transit, with granular role-based access controls.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Zap,
    title: "One-Click Integrations",
    description: "Connect Stripe, Segment, HubSpot, Salesforce, and 40+ other tools in minutes. No engineering tickets, no data pipelines to maintain.",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
];

const testimonials = [
  {
    id: "t1",
    name: "Sarah Chen",
    role: "Head of Growth",
    company: "Luma Cloud",
    avatar: "/images/sarah-chen-head-of-growth.jpg",
    quote: "Pulse replaced four separate tools we were stitching together. Our Monday morning revenue review went from 2 hours to 10 minutes. It's genuinely changed how we operate.",
    stars: 5,
  },
  {
    id: "t2",
    name: "Marcus Webb",
    role: "Co-founder & CEO",
    company: "Stackform",
    avatar: "/images/marcus-webb-ceo-founder.jpg",
    quote: "The anomaly detection alone paid for itself in the first month. We caught a billing integration bug that would have cost us $40k in lost revenue. Incredible product.",
    stars: 5,
  },
  {
    id: "t3",
    name: "Priya Nair",
    role: "VP of Product",
    company: "Orbit SaaS",
    avatar: "/images/priya-nair-vp-product.jpg",
    quote: "I've evaluated every analytics platform on the market. Pulse is the only one that gives you the depth of Mixpanel with the financial clarity of Baremetrics — in one place.",
    stars: 5,
  },
];

const pricingPlans = [
  {
    id: "starter",
    name: "Starter",
    price: "$49",
    period: "/month",
    description: "Perfect for early-stage SaaS teams getting their first analytics in place.",
    features: [
      "Up to 500 tracked users",
      "Core revenue metrics (MRR, ARR)",
      "7 pre-built dashboards",
      "Slack & email alerts",
      "Stripe integration",
      "14-day data history",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    id: "growth",
    name: "Growth",
    price: "$299",
    period: "/month",
    description: "For scaling teams that need deeper insights and longer data retention.",
    features: [
      "Up to 5,000 tracked users",
      "Full revenue & cohort analytics",
      "Unlimited custom dashboards",
      "Anomaly detection & alerts",
      "40+ integrations",
      "12-month data history",
      "Priority support",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$1,200",
    period: "/month",
    description: "For large teams with advanced security, compliance, and scale requirements.",
    features: [
      "Unlimited tracked users",
      "Custom metric builder",
      "SSO & SAML authentication",
      "SOC 2 compliance reports",
      "Dedicated success manager",
      "Unlimited data history",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const integrations = [
  { name: "Stripe", logo: "/images/stripe-logo-integration.jpg" },
  { name: "Segment", logo: "/images/segment-logo-integration.jpg" },
  { name: "HubSpot", logo: "/images/hubspot-logo-integration.jpg" },
  { name: "Salesforce", logo: "/images/salesforce-logo-integration.jpg" },
  { name: "Slack", logo: "/images/slack-logo-integration.jpg" },
  { name: "Intercom", logo: "/images/intercom-logo-integration.jpg" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: "paid" | "pending" | "failed" }) {
  const map = {
    paid: "bg-emerald-100 text-emerald-700",
    pending: "bg-amber-100 text-amber-700",
    failed: "bg-rose-100 text-rose-700",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${map[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────

export default function HomePage() {
  const shouldReduce = useReducedMotion();
  const [activeTab, setActiveTab] = useState<"revenue" | "users">("revenue");
  const [billingAnnual, setBillingAnnual] = useState(false);

  return (
    <main className="overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        id="overview"
        className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900"
      >
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.15) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Glow blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-center gap-6"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                Now with AI-powered anomaly detection
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight"
            >
              Analytics that{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                move your business
              </span>{" "}
              forward.
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={fadeInUp}
              className="max-w-2xl text-lg sm:text-xl text-slate-400 leading-relaxed"
            >
              {APP_DESCRIPTION}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mt-2">
              <motion.a
                href="#get-started"
                whileHover={shouldReduce ? {} : { scale: 1.04, boxShadow: "0 8px 32px rgba(99,102,241,0.45)" }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-600 rounded-xl shadow-lg hover:from-indigo-600 hover:to-violet-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                Start Free Trial — No card needed
              </motion.a>
              <motion.a
                href="#charts"
                whileHover={shouldReduce ? {} : { scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 text-base font-semibold text-slate-200 bg-white/10 border border-white/20 rounded-xl hover:bg-white/15 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 flex items-center gap-2"
              >
                See live demo <ArrowRight className="w-4 h-4" />
              </motion.a>
            </motion.div>

            {/* Social proof strip */}
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center items-center gap-6 mt-4 text-sm text-slate-500">
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> 14-day free trial</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> No credit card required</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> SOC 2 certified</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> Cancel anytime</span>
            </motion.div>
          </motion.div>

          {/* Dashboard preview card */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduce ? 0 : 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mt-16 relative"
          >
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-sm shadow-2xl overflow-hidden">
              {/* Fake browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/80 border-b border-white/10">
                <span className="w-3 h-3 rounded-full bg-rose-500/70" />
                <span className="w-3 h-3 rounded-full bg-amber-500/70" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
                <span className="ml-4 flex-1 bg-slate-700/60 rounded-md h-5 text-xs text-slate-500 flex items-center px-3">
                  app.pulseanalytics.io/dashboard
                </span>
              </div>

              {/* Mini KPI row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5 border-b border-white/10">
                {kpiCards.map((kpi) => {
                  const Icon = kpi.icon;
                  return (
                    <div key={kpi.id} className="bg-slate-900/90 px-4 py-4">
                      <p className="text-xs text-slate-500 mb-1">{kpi.label}</p>
                      <p className="text-xl font-bold text-white">{kpi.value}</p>
                      <p className={`text-xs font-medium mt-0.5 ${kpi.deltaPositive ? "text-emerald-400" : "text-rose-400"}`}>
                        {kpi.delta} vs last month
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Mini chart */}
              <div className="px-4 py-6 bg-slate-900/90">
                <p className="text-xs text-slate-500 mb-3 font-medium uppercase tracking-wider">Revenue — last 12 months</p>
                <ResponsiveContainer width="100%" height={160}>
                  <AreaChart data={revenueData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fill="url(#heroGrad)" dot={false} />
                    <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, fontSize: 12 }}
                      labelStyle={{ color: "#94a3b8" }}
                      itemStyle={{ color: "#a5b4fc" }}
                      formatter={(v: number) => [`$${(v ?? 0).toLocaleString()}`, "Revenue"]}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              animate={shouldReduce ? {} : { y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 sm:-right-8 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
            >
              ↑ MRR +12.4%
            </motion.div>
            <motion.div
              animate={shouldReduce ? {} : { y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-4 -left-4 sm:-left-8 bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
            >
              3,820 active users
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          animate={shouldReduce ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-600"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* ── KPI OVERVIEW ─────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {kpiCards.map((kpi) => {
              const Icon = kpi.icon;
              return (
                <motion.div
                  key={kpi.id}
                  variants={scaleIn}
                  whileHover={shouldReduce ? {} : { y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.10)" }}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl ${kpi.bg} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${kpi.textColor}`} />
                    </div>
                    <span className={`text-sm font-semibold flex items-center gap-1 ${kpi.deltaPositive ? "text-emerald-600" : "text-rose-600"}`}>
                      {kpi.deltaPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                      {kpi.delta}
                    </span>
                  </div>
                  <p className="text-3xl font-extrabold text-slate-900 mb-1">{kpi.value}</p>
                  <p className="text-sm text-slate-500">{kpi.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── CHARTS ───────────────────────────────────────────────────────── */}
      <section id="charts" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.p variants={fadeInUp} className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
              Live Analytics
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">
              Your data, beautifully visualised
            </motion.h2>
            <motion.p variants={fadeInUp} className="max-w-2xl mx-auto text-lg text-slate-500">
              Every chart updates in real time. Drill down by date range, segment, or plan tier — no SQL required.
            </motion.p>
          </motion.div>

          {/* Tab switcher */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
              {(["revenue", "users"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === tab
                      ? "bg-indigo-600 text-white shadow-md"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {tab === "revenue" ? "Revenue & MRR" : "User Growth"}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Main chart */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={scaleIn}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {activeTab === "revenue" ? "Revenue & MRR Trend" : "Total vs Active Users"}
                </h3>
                <p className="text-sm text-slate-500 mt-0.5">January – December 2024</p>
              </div>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                ↑ Strong growth trajectory
              </span>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              {activeTab === "revenue" ? (
                <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, fontSize: 13 }}
                    formatter={(v: number) => [`$${(v ?? 0).toLocaleString()}`, undefined]}
                  />
                  <Legend wrapperStyle={{ fontSize: 13, paddingTop: 12 }} />
                  <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#6366f1" strokeWidth={2.5} fill="url(#revGrad)" dot={false} activeDot={{ r: 5 }} />
                  <Area type="monotone" dataKey="mrr" name="MRR" stroke="#8b5cf6" strokeWidth={2} fill="url(#mrrGrad)" dot={false} activeDot={{ r: 4 }} />
                </AreaChart>
              ) : (
                <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="usersGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="activeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, fontSize: 13 }}
                    formatter={(v: number) => [(v ?? 0).toLocaleString(), undefined]}
                  />
                  <Legend wrapperStyle={{ fontSize: 13, paddingTop: 12 }} />
                  <Area type="monotone" dataKey="users" name="Total Users" stroke="#06b6d4" strokeWidth={2.5} fill="url(#usersGrad)" dot={false} activeDot={{ r: 5 }} />
                  <Area type="monotone" dataKey="activeUsers" name="Active Users" stroke="#10b981" strokeWidth={2} fill="url(#activeGrad)" dot={false} activeDot={{ r: 4 }} />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </motion.div>

          {/* Secondary charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Bar chart */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={slideInLeft}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6"
            >
              <h3 className="text-base font-bold text-slate-900 mb-1">Monthly Revenue Bars</h3>
              <p className="text-sm text-slate-500 mb-5">Consistent month-over-month growth</p>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={revenueData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, fontSize: 12 }}
                    formatter={(v: number) => [`$${(v ?? 0).toLocaleString()}`, "Revenue"]}
                  />
                  <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Pie chart */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={slideInRight}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6"
            >
              <h3 className="text-base font-bold text-slate-900 mb-1">Traffic Sources</h3>
              <p className="text-sm text-slate-500 mb-5">Where your signups come from</p>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <ResponsiveContainer width={180} height={180}>
                  <PieChart>
                    <Pie
                      data={trafficSources}
                      cx="50%"
                      cy="50%"
                      innerRadius={52}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {trafficSources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, fontSize: 12 }}
                      formatter={(v: number) => [`${v}%`, undefined]}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-col gap-2.5 flex-1">
                  {trafficSources.map((src) => (
                    <div key={src.name} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: src.color }} />
                        <span className="text-sm text-slate-600">{src.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-slate-900">{src.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Transactions table */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="mt-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Recent Transactions</h3>
                <p className="text-sm text-slate-500 mt-0.5">Latest billing activity across all plans</p>
              </div>
              <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-colors">
                View all <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Plan</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(transactions ?? []).map((tx) => (
                    <motion.tr
                      key={tx.id}
                      whileHover={shouldReduce ? {} : { backgroundColor: "#f8fafc" }}
                      className="transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-slate-900">{tx.customer}</p>
                          <p className="text-xs text-slate-400">{tx.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden sm:table-cell">
                        <span className="text-slate-600">{tx.plan}</span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-900">
                        ${(tx.amount ?? 0).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={tx.status} />
                      </td>
                      <td className="px-6 py-4 text-slate-500 hidden md:table-cell">{tx.date}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p variants={fadeInUp} className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
              Why teams choose Pulse
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">
              Everything you need to grow faster
            </motion.h2>
            <motion.p variants={fadeInUp} className="max-w-2xl mx-auto text-lg text-slate-500">
              Stop switching between tools. Pulse brings your revenue data, user analytics, and growth metrics into a single, beautiful workspace.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  variants={fadeInUp}
                  whileHover={shouldReduce ? {} : { y: -6, boxShadow: "0 16px 40px rgba(0,0,0,0.09)" }}
                  className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm transition-all"
                >
                  <div className={`w-12 h-12 rounded-xl ${feat.bg} flex items-center justify-center mb-5`}>
                    <Icon className={`w-6 h-6 ${feat.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{feat.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">{feat.description}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Integration logos */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="mt-20 text-center"
          >
            <p className="text-sm text-slate-400 font-medium uppercase tracking-widest mb-8">Connects with your existing stack</p>
            <div className="flex flex-wrap justify-center items-center gap-6">
              {integrations.map((int) => (
                <motion.div
                  key={int.name}
                  whileHover={shouldReduce ? {} : { scale: 1.08 }}
                  className="flex items-center gap-2.5 px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:border-indigo-300 hover:text-indigo-700 transition-colors cursor-default"
                >
                  <img
                    src={int.logo}
                    alt={`${int.name} logo`}
                    className="w-5 h-5 rounded object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                  {int.name}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ─────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-950 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.p variants={fadeInUp} className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-3">
              Customer stories
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
              Trusted by 2,000+ SaaS teams
            </motion.h2>
            <motion.p variants={fadeInUp} className="max-w-xl mx-auto text-lg text-slate-400">
              From seed-stage startups to Series B companies — teams that care about growth use Pulse.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                variants={scaleIn}
                whileHover={shouldReduce ? {} : { y: -6 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-7 backdrop-blur-sm transition-all"
              >
                <StarRating count={t.stars} />
                <blockquote className="mt-4 text-slate-300 leading-relaxed text-sm">
                  "{t.quote}"
                </blockquote>
                <div className="flex items-center gap-3 mt-6">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover bg-slate-700"
                    onError={(e) => { (e.target as HTMLImageElement).src = ""; (e.target as HTMLImageElement).className = "w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold"; }}
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.role}, {t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-14"
          >
            {[
              { value: "2,000+", label: "SaaS teams" },
              { value: "$2.4B", label: "Revenue tracked" },
              { value: "99.9%", label: "Uptime SLA" },
              { value: "< 2 min", label: "Avg. setup time" },
            ].map((stat) => (
              <motion.div key={stat.label} variants={fadeInUp} className="text-center">
                <p className="text-4xl font-extrabold text-white mb-1">{stat.value}</p>
                <p className="text-sm text-slate-400">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.p variants={fadeInUp} className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
              Simple pricing
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">
              Grow without surprises
            </motion.h2>
            <motion.p variants={fadeInUp} className="max-w-xl mx-auto text-lg text-slate-500 mb-8">
              All plans include a 14-day free trial. No credit card required. Upgrade or downgrade at any time.
            </motion.p>

            {/* Billing toggle */}
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-3">
              <span className={`text-sm font-medium ${!billingAnnual ? "text-slate-900" : "text-slate-400"}`}>Monthly</span>
              <button
                onClick={() => setBillingAnnual((v) => !v)}
                className={`relative w-12 h-6 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${billingAnnual ? "bg-indigo-600" : "bg-slate-300"}`}
                aria-label="Toggle annual billing"
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${billingAnnual ? "translate-x-6" : "translate-x-0"}`}
                />
              </button>
              <span className={`text-sm font-medium ${billingAnnual ? "text-slate-900" : "text-slate-400"}`}>
                Annual <span className="text-emerald-600 font-semibold">Save 20%</span>
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
          >
            {pricingPlans.map((plan) => {
              const rawPrice = parseInt(plan.price.replace("$", ""), 10);
              const displayPrice = billingAnnual ? `$${Math.round(rawPrice * 0.8)}` : plan.price;
              return (
                <motion.div
                  key={plan.id}
                  variants={scaleIn}
                  whileHover={shouldReduce ? {} : { y: -6 }}
                  className={`relative rounded-2xl p-8 flex flex-col transition-all ${
                    plan.highlighted
                      ? "bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-2xl shadow-indigo-500/30 border-0"
                      : "bg-white border border-slate-200 shadow-sm"
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-amber-400 text-amber-900 text-xs font-bold px-4 py-1.5 rounded-full shadow">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className={`text-xl font-bold mb-1 ${plan.highlighted ? "text-white" : "text-slate-900"}`}>
                      {plan.name}
                    </h3>
                    <p className={`text-sm mb-4 ${plan.highlighted ? "text-indigo-200" : "text-slate-500"}`}>
                      {plan.description}
                    </p>
                    <div className="flex items-end gap-1">
                      <span className={`text-5xl font-extrabold ${plan.highlighted ? "text-white" : "text-slate-900"}`}>
                        {displayPrice}
                      </span>
                      <span className={`text-base mb-1.5 ${plan.highlighted ? "text-indigo-200" : "text-slate-400"}`}>
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.highlighted ? "text-indigo-200" : "text-indigo-600"}`} />
                        <span className={`text-sm ${plan.highlighted ? "text-indigo-100" : "text-slate-600"}`}>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.a
                    href="#get-started"
                    whileHover={shouldReduce ? {} : { scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`block text-center py-3 rounded-xl text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 ${
                      plan.highlighted
                        ? "bg-white text-indigo-700 hover:bg-indigo-50 focus-visible:ring-white"
                        : "bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-500"
                    }`}
                  >
                    {plan.cta}
                  </motion.a>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={slideInLeft}
            >
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">Our mission</p>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                Built by SaaS founders,{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  for SaaS founders
                </span>
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed mb-6">
                We started Pulse after spending years duct-taping together Stripe dashboards, Google Analytics, and spreadsheets just to answer basic questions about our own business. There had to be a better way.
              </p>
              <p className="text-lg text-slate-500 leading-relaxed mb-8">
                Today, Pulse gives every SaaS team — from two-person startups to 200-person scale-ups — the same quality of analytics that used to require a full data engineering team.
              </p>
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: Eye, label: "Full transparency" },
                  { icon: Clock, label: "Real-time data" },
                  { icon: AlertCircle, label: "Proactive alerts" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-xl text-sm font-medium text-indigo-700">
                    <Icon className="w-4 h-4" />
                    {label}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={slideInRight}
              className="relative"
            >
              <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-3xl p-8 border border-indigo-100">
                <div className="grid grid-cols-2 gap-5">
                  {[
                    { label: "Founded", value: "2022", sub: "San Francisco, CA" },
                    { label: "Team size", value: "38", sub: "Across 12 countries" },
                    { label: "Customers", value: "2,000+", sub: "In 60+ countries" },
                    { label: "Funding", value: "$12M", sub: "Series A, 2024" },
                  ].map((item) => (
                    <div key={item.label} className="bg-white rounded-2xl p-5 shadow-sm border border-indigo-100/60">
                      <p className="text-3xl font-extrabold text-slate-900 mb-0.5">{item.value}</p>
                      <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">{item.label}</p>
                      <p className="text-xs text-slate-400">{item.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Decorative blob */}
              <div className="absolute -z-10 -bottom-8 -right-8 w-64 h-64 bg-violet-200/40 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA / GET STARTED ────────────────────────────────────────────── */}
      <section id="get-started" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-600 to-violet-700">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="flex flex-col items-center gap-6"
          >
            <motion.div variants={scaleIn} className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
              <Activity className="w-8 h-8 text-white" />
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
              Start making data-driven decisions today
            </motion.h2>
            <motion.p variants={fadeInUp} className="max-w-xl text-lg text-indigo-200">
              Join 2,000+ SaaS teams who use Pulse to track what matters, catch problems early, and grow with confidence.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mt-2">
              <motion.a
                href="#"
                whileHover={shouldReduce ? {} : { scale: 1.05, boxShadow: "0 8px 32px rgba(0,0,0,0.25)" }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 text-base font-semibold text-indigo-700 bg-white rounded-xl shadow-lg hover:bg-indigo-50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Start your free 14-day trial
              </motion.a>
              <motion.a
                href="#features"
                whileHover={shouldReduce ? {} : { scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 text-base font-semibold text-white border border-white/30 rounded-xl hover:bg-white/10 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 flex items-center justify-center gap-2"
              >
                Explore features <ArrowRight className="w-4 h-4" />
              </motion.a>
            </motion.div>
            <motion.p variants={fadeInUp} className="text-sm text-indigo-300">
              No credit card required · Cancel anytime · SOC 2 certified
            </motion.p>
          </motion.div>
        </div>
      </section>

    </main>
  );
}