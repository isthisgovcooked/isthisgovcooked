"use client";
import LevelToggle from "@/components/ui/LevelToggle";
import { useState, useEffect } from "react";

const NAV_LINKS: { href: string; label: string; accent?: "amber" | "red" }[] = [
  { href: "#pressure",     label: "Pressure Gauge", accent: "red" },
  { href: "#cooked-metre", label: "Cooked Metre", accent: "red" },
  { href: "#overview",     label: "25 Years" },
  { href: "#strategies",   label: "Book Tricks" },
  { href: "#baseline",     label: "Baseline" },
  { href: "#rankings",     label: "Rankings" },
  { href: "#faircentre",   label: "Fair Centre", accent: "amber" },
  { href: "#forward",      label: "What's Coming", accent: "red" },
  { href: "#calculator",   label: "Your Impact" },
  { href: "#rate-sensitivity", label: "Rates" },
  { href: "#quiz",         label: "Quiz" },
  { href: "#col",          label: "Your Wallet" },
  { href: "#chat",         label: "Ask AI" },
  { href: "/about",        label: "About" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS
      .filter((l) => l.href.startsWith("#"))
      .map((l) => l.href.slice(1));

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px -60% 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-black/98 backdrop-blur-sm border-b border-red-900"
          : "bg-black border-b border-red-900"
      }`}
    >
      {/* Tier 1: Brand + Level Toggle + Menu toggle */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-12 gap-4">
          {/* Brand */}
          <a
            href="/"
            className="font-mono text-xs text-red-500 font-bold tracking-wider uppercase shrink-0"
            onClick={(e) => {
              if (window.location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            ISTHISGOVCOOKED
          </a>

          {/* Level toggle — always centred, always visible */}
          <div className="flex-1 flex justify-center min-w-0">
            <LevelToggle />
          </div>

          {/* Desktop: GitHub link | Mobile: hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://github.com/isthisgovcooked/isthisgovcooked"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block font-mono text-xs text-zinc-600 hover:text-zinc-300 transition-colors"
            >
              GitHub ↗
            </a>
            <button
              className="lg:hidden text-zinc-400 hover:text-white p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Tier 2: Section links — horizontally scrollable, desktop only */}
      <div className="hidden lg:block border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-0 overflow-x-auto scrollbar-none">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => {
                  handleNavClick(e, l.href);
                }}
                className={`font-mono text-[10px] uppercase tracking-wider px-3 py-2 whitespace-nowrap border-r border-zinc-900 last:border-r-0 transition-colors shrink-0 ${
                  activeSection === l.href.slice(1)
                    ? "text-white border-b border-white -mb-px"
                    : l.accent === "red"
                    ? "text-red-500 hover:text-red-300"
                    : l.accent === "amber"
                    ? "text-amber-400 hover:text-amber-300"
                    : "text-zinc-500 hover:text-zinc-200"
                }`}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-zinc-900 bg-black">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="grid grid-cols-3 gap-1">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => {
                    handleNavClick(e, l.href);
                    setMenuOpen(false);
                  }}
                  className={`font-mono text-[10px] uppercase tracking-wider px-2 py-2 text-center border border-zinc-900 transition-colors rounded ${
                    l.accent === "red" ? "text-red-500" : l.accent === "amber" ? "text-amber-400" : "text-zinc-500"
                  }`}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
