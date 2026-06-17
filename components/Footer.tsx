"use client";

import { motion } from "framer-motion";
import { Activity, MessageCircle as Twitter, Code2 as Github, Briefcase as Linkedin, Mail } from 'lucide-react';
import { APP_NAME, APP_TAGLINE, navLinks } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const footerSections = [
  {
    title: "Product",
    links: [
      { label: "Overview",  href: "#overview"  },
      { label: "Features",  href: "#features"  },
      { label: "Charts",    href: "#charts"    },
      { label: "Pricing",   href: "#pricing"   },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About",    href: "#about"    },
      { label: "Blog",     href: "#about"    },
      { label: "Careers",  href: "#about"    },
      { label: "Contact",  href: "#contact"  },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy",  href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy",   href: "#" },
      { label: "GDPR",            href: "#" },
    ],
  },
];

const socialLinks = [
  { icon: Twitter,  href: "#", label: "Twitter"  },
  { icon: Github,   href: "#", label: "GitHub"   },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Mail,     href: "#", label: "Email"    },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main footer content */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <a
              href="#"
              className="flex items-center gap-2.5 mb-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-lg w-fit"
              aria-label={`${APP_NAME} home`}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md">
                <Activity className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-lg text-white">{APP_NAME}</span>
            </a>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs mb-6">
              {APP_TAGLINE}
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-indigo-600 flex items-center justify-center text-slate-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <motion.div key={section.title} variants={fadeInUp}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5" role="list">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
                      {...(section.title === "Product" && link.label === "Overview" ? { style: { color: "#190101", fontFamily: "IBM Plex Sans", fontSize: "24px" } } : {})}
                      {...(section.title === "Product" && link.label === "Pricing" ? { style: { color: "#1c0202" } } : {})}
                    >
                      {section.title === "Product" && link.label === "Pricing" ? "Start Free Trial" : link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Built with ♥ for data-driven teams
          </p>
        </div>
      </div>
    </footer>
  );
}