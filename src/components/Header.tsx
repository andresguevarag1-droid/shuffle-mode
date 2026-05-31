"use client";

import { useEffect, useState } from "react";
import { NAV } from "@/lib/content";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-bone/85 backdrop-blur-md border-b border-ink/10"
          : "bg-transparent"
      }`}
    >
      <nav className="container-x flex items-center justify-between h-16 md:h-20">
        <a
          href="#top"
          className="font-display text-lg md:text-xl font-semibold uppercase tracking-[0.22em]"
        >
          Shuffle Mode<span className="text-ember">.</span>
        </a>

        <ul className="hidden md:flex items-center gap-8 text-sm tracking-wide">
          {NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="relative py-1 text-ink/80 hover:text-ink transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-ember after:transition-all hover:after:w-full"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <a
            href="#newsletter"
            className="hidden sm:inline-flex items-center rounded-full bg-ink px-5 py-2 text-sm text-cream hover:bg-ember transition-colors"
          >
            Get on the list
          </a>
          <button
            aria-label="Cart"
            className="relative text-ink/80 hover:text-ink transition-colors"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 7h12l-1 13H7L6 7Z" />
              <path d="M9 7a3 3 0 0 1 6 0" />
            </svg>
            <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-ember px-1 text-[10px] text-cream">
              0
            </span>
          </button>
          <button
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden text-ink"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-ink/10 bg-bone">
          <ul className="container-x flex flex-col py-4">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-lg font-display"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
