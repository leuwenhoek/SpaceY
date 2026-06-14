"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-white text-zinc-950 border-t border-zinc-100 py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Logo and copyright */}
          <div className="flex flex-col items-center md:items-start gap-3 text-center md:text-left">
            <a
              href="#home"
              onClick={(e) => handleScrollTo(e, "#home")}
              className="flex items-center gap-2 transition-all duration-300"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="SpaceY Logo"
                className="h-14 w-auto object-contain"
                style={{ filter: "brightness(0)" }}
              />
            </a>
            <p className="text-[11px] text-zinc-400 font-light tracking-wide">
              © {currentYear} SpaceY Technologies Inc. All rights reserved.
            </p>
          </div>

          {/* Minimal Links */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-10">
            <a
              href="#home"
              onClick={(e) => handleScrollTo(e, "#home")}
              className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 transition-colors uppercase tracking-widest"
            >
              Home
            </a>
            <a
              href="#explore"
              onClick={(e) => handleScrollTo(e, "#explore")}
              className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 transition-colors uppercase tracking-widest"
            >
              Explore
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
