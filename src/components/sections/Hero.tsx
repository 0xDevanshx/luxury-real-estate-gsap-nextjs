"use client";

import { useEffect, useRef, useState, memo } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { Circle, CircleDot, Play, Pause, ChevronDown, Compass, MapPin, Key, Shield } from "lucide-react";
import MagneticButton from "../global/MagneticButton";
import dynamic from "next/dynamic";
import Image from "next/image";
import { FEATURED_LISTINGS } from "@/data/mockData";

const HERO_BACKGROUNDS = FEATURED_LISTINGS.map(l => l.image);

// Extracted KineticHeadline to prevent React re-renders from destroying SplitType DOM nodes
const KineticHeadline = memo(() => {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!headlineRef.current) return;
    
    const split = new SplitType(headlineRef.current, { types: 'words' });
    
    const ctx = gsap.matchMedia(headlineRef);
    ctx.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(split.words, { opacity: 0, y: 60 });
      // Word stagger reveal on load
      gsap.to(split.words, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        delay: 0.2, // slight delay for smooth load
      });

      // Kinetic scale tween on custom properties
      // from: clamp(10vw, 12vw, 160px)
      // to: clamp(2rem, 3vw, 48px) -- mapping to 3vw, 3vw, 48px for simplicity of CSS interpolation
      gsap.to(headlineRef.current, {
        "--fs-min": 3,
        "--fs-pref": 3,
        "--fs-max": 48,
        ease: "none",
        scrollTrigger: {
          trigger: headlineRef.current!.parentElement,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        }
      });
    });

    return () => {
      split.revert();
      ctx.revert();
    };
  }, []);

  return (
    <h1
      ref={headlineRef}
      className="font-bold tracking-tighter uppercase leading-none will-change-transform pb-4"
      style={{ 
        // Initial values match clamp(10vw, 12vw, 160px)
        "--fs-min": 10,
        "--fs-pref": 12,
        "--fs-max": 160,
        fontSize: "clamp(calc(var(--fs-min) * 1vw), calc(var(--fs-pref) * 1vw), calc(var(--fs-max) * 1px))"
      } as React.CSSProperties}
    >
      Redefining Luxury Living
    </h1>
  );
});
KineticHeadline.displayName = "KineticHeadline";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const subheadRef = useRef<HTMLDivElement>(null);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Removed video playback logic since we are using images now
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setActiveIndex((prev) => (prev + 1) % HERO_BACKGROUNDS.length);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Indicator bobbing
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    const ctx = gsap.context(() => {
      if (!prefersReducedMotion && indicatorRef.current) {
        gsap.to(indicatorRef.current, {
          y: 15,
          duration: 1,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut"
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
        
        {/* Background Images with Ken Burns Effect */}
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

        {/* Video Controls */}
        <div className="absolute bottom-12 right-6 lg:right-12 z-20 flex items-center gap-4">
          <MagneticButton>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-white hover:text-white/70 transition-colors p-2"
              aria-label={isPlaying ? "Pause background videos" : "Play background videos"}
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
                  aria-label={`Show video ${idx + 1}`}
                  data-cursor="pointer"
                >
                  {activeIndex === idx ? <CircleDot size={16} /> : <Circle size={16} />}
                </button>
              </MagneticButton>
            ))}
          </div>
        </div>

        {/* Removed Hero3DPanel Hologram Overlay */}

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center mt-20 pointer-events-none">
          
          <KineticHeadline />
          
          <div ref={subheadRef} className="mt-8 flex flex-col items-center gap-12 opacity-100 transition-opacity duration-500">
            {/* Quick Links Row */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
              {[
                { icon: Compass, label: "Explore" },
                { icon: MapPin, label: "Locations" },
                { icon: Key, label: "Exclusive" },
                { icon: Shield, label: "Private" },
              ].map(({ icon: Icon, label }, i) => (
                <MagneticButton key={i}>
                  <button className="flex items-center gap-2 text-sm md:text-base font-medium tracking-wide uppercase hover:text-white/70 transition-colors" data-cursor="pointer">
                    <Icon size={20} />
                    <span>{label}</span>
                  </button>
                </MagneticButton>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-70">
          <span className="text-[10px] md:text-xs uppercase tracking-widest font-medium">Scroll to Discover</span>
          <div ref={indicatorRef} className="will-change-transform">
            <ChevronDown size={24} />
          </div>
        </div>
      </div>
    </section>
  );
}
