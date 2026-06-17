import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pulse Analytics — SaaS Dashboard",
  description:
    "Monitor your business performance with real-time KPIs, revenue trends, user analytics, and actionable insights — all in one place.",
  keywords: ["analytics", "dashboard", "SaaS", "metrics", "KPI", "revenue"],
  authors: [{ name: "Pulse Analytics" }],
  openGraph: {
    title: "Pulse Analytics — SaaS Dashboard",
    description: "Monitor your business performance with real-time analytics.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-slate-50 text-slate-900 antialiased font-sans">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}