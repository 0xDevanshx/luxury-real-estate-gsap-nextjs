"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Building2, Menu, Home, Search, Phone } from "lucide-react";
import MagneticButton from "./MagneticButton";
import Link from "next/link";

export default function StickyHeader() {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.matchMedia(headerRef);
    ctx.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.to(headerRef.current, {
        backgroundColor: "rgba(0, 0, 0, 0.85)", // solid background fade
        backdropFilter: "blur(12px)", // blur
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "100vh top",
          scrub: 1.5,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-[90] flex items-center justify-between px-6 py-5 lg:px-12 text-white will-change-transform"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0)",
        backdropFilter: "blur(0px)",
        WebkitBackdropFilter: "blur(0px)", // for Safari support
      }}
    >
      <MagneticButton>
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl tracking-tight"
          data-cursor="pointer"
        >
          <Building2 size={24} />
          <span>
            LUXE<span className="font-light">ESTATES</span>
          </span>
        </Link>
      </MagneticButton>

      <nav className="hidden md:flex items-center gap-8 font-medium">
        <MagneticButton>
          <Link
            href="#properties"
            className="flex items-center gap-2 hover:text-zinc-300 transition-colors"
            data-cursor="pointer"
          >
            <Home size={18} />
            <span>Properties</span>
          </Link>
        </MagneticButton>
        <MagneticButton>
          <Link
            href="#search"
            className="flex items-center gap-2 hover:text-zinc-300 transition-colors"
            data-cursor="pointer"
          >
            <Search size={18} />
            <span>Search</span>
          </Link>
        </MagneticButton>
        <MagneticButton>
          <Link
            href="#contact"
            className="flex items-center gap-2 hover:text-zinc-300 transition-colors"
            data-cursor="pointer"
          >
            <Phone size={18} />
            <span>Contact</span>
          </Link>
        </MagneticButton>
      </nav>

      <div className="md:hidden flex items-center">
        <MagneticButton>
          <button
            className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
            data-cursor="pointer"
            aria-label="Menu"
          >
            <Menu size={24} />
          </button>
        </MagneticButton>
      </div>
    </header>
  );
}
