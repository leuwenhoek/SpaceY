"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Explore", href: "#explore" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>, item: typeof navItems[0]) => {
    handleScrollTo(e, item.href);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className={`w-full transition-all duration-350 border-b ${
            isScrolled
              ? "glass-frosted-light shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-zinc-200/80 py-4"
              : "bg-transparent border-transparent py-5"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => handleScrollTo(e, "#home")}
              className="flex items-center gap-2 transition-all duration-300"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="SpaceY Logo"
                className="h-20 md:h-24 w-auto object-contain transition-all duration-300 -my-6 md:-my-8"
                style={{
                  filter: isScrolled
                    ? "brightness(0)"
                    : "brightness(0) invert(1) drop-shadow(0 0 12px rgba(255,255,255,0.5))",
                }}
              />
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleItemClick(e, item)}
                  className={`relative text-sm font-medium transition-colors px-2 py-1 group transition-all duration-300 ${
                    isScrolled ? "text-zinc-600 hover:text-zinc-900" : "text-zinc-300 hover:text-white"
                  }`}
                >
                  {item.name}
                  <span className={`absolute bottom-0 left-0 w-full h-[1.5px] scale-x-0 origin-right transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-left ${
                    isScrolled ? "bg-zinc-900" : "bg-white"
                  }`} />
                </a>
              ))}
            </div>

            {/* Desktop CTA Button */}
            <div className="hidden md:block">
              <Link
                href="/chat"
                className={`text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-300 ${
                  isScrolled
                    ? "text-white bg-zinc-900 hover:bg-zinc-800 hover:shadow-lg hover:shadow-zinc-900/10"
                    : "text-zinc-900 bg-white hover:bg-zinc-100 hover:shadow-lg hover:shadow-white/10"
                }`}
              >
                Continue -&gt;
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-1.5 rounded-full transition-colors duration-300 hover:bg-zinc-100/10 ${
                isScrolled ? "text-zinc-700 hover:text-zinc-900" : "text-white"
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" as const }}
            className={`fixed left-0 right-0 z-40 px-6 py-8 border-b shadow-[0_15px_30px_rgba(0,0,0,0.05)] md:hidden flex flex-col gap-4 ${
              isScrolled
                ? "glass-frosted-light top-[63px] border-zinc-200/80"
                : "glass-frosted-dark top-[67px] border-zinc-900"
            }`}
          >
            {navItems.map((item, idx) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => handleItemClick(e, item)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`text-lg font-medium py-2 border-b last:border-0 transition-colors ${
                  isScrolled
                    ? "text-zinc-700 hover:text-zinc-955 border-zinc-100/50"
                    : "text-zinc-300 hover:text-white border-zinc-900"
                }`}
              >
                {item.name}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Link
                href="/chat"
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-center font-semibold py-3 rounded-2xl mt-2 transition-colors ${
                  isScrolled ? "text-white bg-zinc-900 hover:bg-zinc-800" : "text-zinc-900 bg-white hover:bg-zinc-100"
                }`}
              >
                Let&apos;s talk
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}
