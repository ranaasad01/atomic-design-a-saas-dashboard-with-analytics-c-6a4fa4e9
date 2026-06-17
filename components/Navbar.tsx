"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { APP_NAME, navLinks, navCTA } from "@/lib/data";
import { Activity, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navVariants = {
    hidden:  { opacity: 0, y: shouldReduce ? 0 : -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const mobileMenuVariants = {
    hidden:  { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  const linkVariants = {
    hidden:  { opacity: 0, x: -12 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.06, duration: 0.3, ease: "easeOut" },
    }),
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200/60"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg"
            aria-label={`${APP_NAME} home`}
          >
            <motion.div
              whileHover={{ scale: 1.08, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md"
            >
              <Activity className="w-4 h-4 text-white" strokeWidth={2.5} />
            </motion.div>
            <span className="font-bold text-lg tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
              {APP_NAME}
            </span>
          </a>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <motion.a
                  href={link.href}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  {link.label}
                </motion.a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <motion.a
              href="#get-started"
              whileHover={{ scale: 1.04, boxShadow: "0 4px 20px rgba(99,102,241,0.35)" }}
              whileTap={{ scale: 0.97 }}
              style={{ color: "#190101", fontFamily: "Playfair Display", fontSize: "26px" }}
              className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-600 rounded-lg shadow-md hover:from-indigo-600 hover:to-violet-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              {navCTA.label}
            </motion.a>
          </div>

          {/* Mobile hamburger */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={mobileMenuVariants}
              className="md:hidden overflow-hidden"
            >
              <ul
                className="flex flex-col gap-1 pb-4 pt-2 border-t border-slate-100"
                role="list"
              >
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={linkVariants}
                  >
                    <a
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-2.5 text-sm font-medium text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
                <motion.li
                  custom={navLinks.length}
                  initial="hidden"
                  animate="visible"
                  variants={linkVariants}
                  className="mt-2"
                >
                  <a
                    href={navCTA.href}
                    onClick={() => setMobileOpen(false)}
                    style={{ fontFamily: "JetBrains Mono", fontSize: "25px", color: "#140000" }}
                    className="block px-3 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-600 rounded-lg text-center shadow"
                  >
                    {navCTA.label}
                  </a>
                </motion.li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}