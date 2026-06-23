"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";


export default function CompanyOverview() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgLineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !svgLineRef.current) return;

    const ctx = gsap.matchMedia(sectionRef);
    ctx.add("(prefers-reduced-motion: no-preference)", () => {
      // 1. Background Color Tween
      gsap.fromTo(sectionRef.current, 
        { backgroundColor: "#0a0a0a" },
        {
          backgroundColor: "#111111",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );

      // 2. SVG Line Drawing Animation
      // We use pathLength="100" on the SVG line, so we can reliably animate strokeDashoffset from 100 to 0
      gsap.fromTo(svgLineRef.current,
        { strokeDasharray: "100", strokeDashoffset: "100" },
        {
          strokeDashoffset: "0",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 25%",
            scrub: 1,
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-32 md:py-48 text-white z-10">
      {/* Max-width container prevents layout shifts on large screens */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        
        <h2 className="text-sm uppercase tracking-widest text-white/50 mb-12">The Luxe Estates Mission</h2>
        
        {/* max-w-2xl locks line length — same wrap on 15" and 27" */}
        <div className="max-w-2xl w-full">
          <p className="text-xl md:text-2xl font-light leading-relaxed tracking-tight mb-16 text-white/90">
            For over two decades, we have defined the absolute standard of international luxury real estate. Our mission transcends beyond simple property acquisition; we meticulously match extraordinary individuals with exceptional properties that complement their unique legacies. We operate globally, yet deliver an intensely private and localized advisory experience.
          </p>
        </div>

        {/* Animated Horizontal SVG Separator */}
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
            By limiting our active portfolio to only the top tier of architectural achievements, we ensure that every client receives our undivided attention, absolute discretion, and the unparalleled market insight that only a specialized boutique can provide. Welcome to the pinnacle of living.
          </p>
        </div>

      </div>
    </section>
  );
}
