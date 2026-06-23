"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CompanyOverview() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgLineRef = useRef<SVGLineElement>(null);
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const ring3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !svgLineRef.current) return;

    const ctx = gsap.matchMedia(sectionRef);
    ctx.add("(prefers-reduced-motion: no-preference)", () => {
      // 1. Background Color Tween
      gsap.fromTo(
        sectionRef.current,
        { backgroundColor: "#0a0a0a" },
        {
          backgroundColor: "#111111",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      // 2. SVG Line Drawing Animation
      gsap.fromTo(
        svgLineRef.current,
        { strokeDasharray: "100", strokeDashoffset: "100" },
        {
          strokeDashoffset: "0",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 25%",
            scrub: 1,
          },
        },
      );

      // 3. Hypnotic Geometric Rings Parallax & Rotation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5, // Super smooth scrub
        }
      });

      tl.fromTo(ring1Ref.current, 
        { y: -100, rotation: 0, scale: 0.9 }, 
        { y: 100, rotation: 90, scale: 1.1, ease: "none" },
        0
      );
      
      tl.fromTo(ring2Ref.current, 
        { y: 50, rotation: 45, scale: 1.1 }, 
        { y: -50, rotation: -45, scale: 0.9, ease: "none" },
        0
      );

      tl.fromTo(ring3Ref.current, 
        { y: -50, rotation: -90, scale: 1 }, 
        { y: 150, rotation: 180, scale: 1.2, ease: "none" },
        0
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-32 md:py-48 text-white z-10 overflow-hidden"
    >
      {/* --- HYPNOTIC BACKGROUND GEOMETRY --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none flex items-center justify-center opacity-30 mix-blend-screen">
        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-white/5 blur-[120px] rounded-full" />
        
        {/* Ring 1 - Outer */}
        <div 
          ref={ring1Ref}
          className="absolute w-full h-full border-[1px] border-white/10 rounded-full"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 80%, 0 80%)" }}
        />
        
        {/* Ring 2 - Middle Dashed */}
        <div 
          ref={ring2Ref}
          className="absolute w-[85%] h-[85%] border-[1px] border-white/20 border-dashed rounded-full"
          style={{ opacity: 0.5 }}
        />

        {/* Ring 3 - Inner */}
        <div 
          ref={ring3Ref}
          className="absolute w-[70%] h-[70%] border-[2px] border-white/5 rounded-full"
          style={{ clipPath: "polygon(20% 0, 100% 0, 100% 100%, 20% 100%)" }}
        />
      </div>
      {/* ------------------------------------ */}

      <div className="relative max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col items-center text-center z-10">
        <h2 className="text-sm uppercase tracking-widest text-white/50 mb-12 backdrop-blur-sm px-4 py-1 rounded-full border border-white/5">
          Our Philosophy
        </h2>

        <div className="max-w-2xl w-full">
          <p className="text-xl md:text-2xl font-light leading-relaxed tracking-tight mb-16 text-white/90 drop-shadow-2xl">
            A home isn&apos;t just an asset—it&apos;s the canvas where your life&apos;s greatest moments will unfold. For over twenty years, we&apos;ve traveled the world not to broker transactions, but to discover those rare, breathtaking spaces that make you stop and say, <span className="italic">&quot;This is it.&quot;</span> We don&apos;t just hand you keys; we listen, we understand, and we help you find the sanctuary that perfectly mirrors your legacy.
          </p>
        </div>

        <div className="w-full max-w-2xl mx-auto h-[1px] my-16 opacity-30">
          <svg
            width="100%"
            height="1"
            viewBox="0 0 100 1"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              ref={svgLineRef}
              x1="0"
              y1="0.5"
              x2="100"
              y2="0.5"
              stroke="white"
              strokeWidth="1"
              pathLength="100"
            />
          </svg>
        </div>

        <div className="max-w-xl w-full">
          <p className="text-base md:text-lg font-light leading-relaxed text-white/60 drop-shadow-2xl">
            By choosing to represent only a select handful of clients and architectural masterpieces at a time, we make sure you never feel like just another listing. You get our absolute undivided attention, fierce discretion, and a deeply personal relationship that lasts long after the paperwork is signed. Welcome to real estate, done differently.
          </p>
        </div>
      </div>
    </section>
  );
}
