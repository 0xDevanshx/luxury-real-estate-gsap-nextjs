"use client";

import { useEffect, useRef, useState, memo } from "react";
import gsap from "gsap";
import {
  Circle,
  CircleDot,
  Play,
  Pause,
  ChevronDown,
  Compass,
  MapPin,
  Key,
  Shield,
} from "lucide-react";
import MagneticButton from "../global/MagneticButton";

import Image from "next/image";
import { FEATURED_LISTINGS } from "@/data/mockData";

const HERO_BACKGROUNDS = FEATURED_LISTINGS.map((l) => l.image);

// Extracted KineticHeadline to prevent React re-renders from destroying SplitType DOM nodes
const KineticHeadline = memo(() => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headlineRef.current || !wrapperRef.current) return;

    // IMPORTANT: We do NOT animate font-size — that causes text reflow and CLS.
    // Instead we use transform: scale() on a wrapper to create the shrinking effect.
    // The text layout is baked in at a FIXED font-size — no layout shifts.
    const ctx = gsap.matchMedia(headlineRef);
    ctx.add("(prefers-reduced-motion: no-preference)", () => {
      // Entry animation — words slide up using transform only
      const words = headlineRef.current!.querySelectorAll(".word");
      gsap.set(words, { opacity: 0, y: 60 });
      gsap.to(words, {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });

      // Scroll: scale the wrapper down — NO font-size change, NO reflow
      gsap.to(wrapperRef.current, {
        scale: 0.35,
        opacity: 0,
        transformOrigin: "center center",
        ease: "none",
        scrollTrigger: {
          trigger: headlineRef.current!.closest("section"),
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="will-change-transform">
      <h1
        ref={headlineRef}
        // Fixed font size — never changes, never causes reflow
        className="text-[clamp(4rem,10vw,10rem)] font-bold tracking-tighter uppercase leading-none pb-4 text-center"
      >
        {["Redefining", "Luxury", "Living"].map((word, i) => (
          <span key={i} className="word inline-block mr-[0.2em] last:mr-0">
            {word}
          </span>
        ))}
      </h1>
    </div>
  );
});
KineticHeadline.displayName = "KineticHeadline";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setActiveIndex((prev) => (prev + 1) % HERO_BACKGROUNDS.length);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Indicator bobbing — transform only, no layout impact
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion && indicatorRef.current) {
        gsap.to(indicatorRef.current, {
          y: 12,
          duration: 1.2,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[150vh] flex flex-col justify-start overflow-hidden bg-black text-white"
    >
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden after:content-[''] after:absolute after:inset-0 after:bg-black/40">
          {HERO_BACKGROUNDS.map((bg, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 will-change-transform ${
                idx === activeIndex ? "opacity-60 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                src={bg}
                alt={`Luxury Property ${idx + 1}`}
                fill
                priority={idx === 0}
                sizes="100vw"
                className={`object-cover will-change-transform ${idx === activeIndex ? "animate-[kenBurns_20s_ease-out_forwards]" : ""}`}
              />
            </div>
          ))}
        </div>

        <div className="absolute bottom-12 right-6 lg:right-12 z-20 flex items-center gap-4">
          <MagneticButton>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-white hover:text-white/70 transition-colors p-2"
              aria-label={isPlaying ? "Pause" : "Play"}
              data-cursor="pointer"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
          </MagneticButton>
          <div className="flex gap-2 items-center">
            {HERO_BACKGROUNDS.map((_, idx) => (
              <MagneticButton key={idx}>
                <button
                  onClick={() => setActiveIndex(idx)}
                  className="text-white hover:text-white/70 transition-colors"
                  aria-label={`Show slide ${idx + 1}`}
                  data-cursor="pointer"
                >
                  {activeIndex === idx ? (
                    <CircleDot size={16} />
                  ) : (
                    <Circle size={16} />
                  )}
                </button>
              </MagneticButton>
            ))}
          </div>
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center pointer-events-none">
          <KineticHeadline />

          <div className="mt-8 flex flex-col items-center gap-12 opacity-100">
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 pointer-events-auto">
              {[
                { icon: Compass, label: "Explore" },
                { icon: MapPin, label: "Locations" },
                { icon: Key, label: "Exclusive" },
                { icon: Shield, label: "Private" },
              ].map(({ icon: Icon, label }, i) => (
                <MagneticButton key={i}>
                  <button
                    className="flex items-center gap-2 text-sm font-medium tracking-wide uppercase hover:text-white/70 transition-colors"
                    data-cursor="pointer"
                  >
                    <Icon size={18} />
                    <span>{label}</span>
                  </button>
                </MagneticButton>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-70">
          <span className="text-[10px] uppercase tracking-widest font-medium">
            Scroll to Discover
          </span>
          <div ref={indicatorRef} className="will-change-transform">
            <ChevronDown size={22} />
          </div>
        </div>
      </div>
    </section>
  );
}
