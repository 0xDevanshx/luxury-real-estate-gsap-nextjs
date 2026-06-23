"use client";

import { useEffect, useRef, useState, MouseEvent } from "react";
import gsap from "gsap";

export default function CompanyOverview() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgLineRef = useRef<SVGLineElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!sectionRef.current || !svgLineRef.current) return;

    const ctx = gsap.matchMedia(sectionRef);
    ctx.add("(prefers-reduced-motion: no-preference)", () => {
      // Background Color Tween (Darker base for better spotlight contrast)
      gsap.fromTo(
        sectionRef.current,
        { backgroundColor: "#050505" },
        {
          backgroundColor: "#0a0a0a",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      // SVG Line Drawing Animation
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
    });

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative w-full py-32 md:py-48 text-white z-10 overflow-hidden"
    >
      {/* Interactive Spotlight */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 80%)`
        }}
      />
      
      {/* Static ambient glow for mobile/fallback */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_70%)] opacity-50 md:hidden" />

      <div className="relative max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col items-center text-center z-10">
        <h2 className="text-sm uppercase tracking-widest text-white/40 mb-12 border border-white/10 px-6 py-2 rounded-full">
          Our Philosophy
        </h2>

        <div className="max-w-2xl w-full">
          <p className="text-xl md:text-2xl font-light leading-relaxed tracking-tight mb-16 text-white/90">
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
          <p className="text-base md:text-lg font-light leading-relaxed text-white/60">
            By choosing to represent only a select handful of clients and architectural masterpieces at a time, we make sure you never feel like just another listing. You get our absolute undivided attention, fierce discretion, and a deeply personal relationship that lasts long after the paperwork is signed. Welcome to real estate, done differently.
          </p>
        </div>
      </div>
    </section>
  );
}
