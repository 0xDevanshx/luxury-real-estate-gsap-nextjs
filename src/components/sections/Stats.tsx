"use client";

import { useEffect, useRef, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

const STATS_DATA = [
  {
    id: "sales",
    prefix: "$",
    target: 2,
    suffix: "B+",
    label: "Sales",
  },
  {
    id: "properties",
    prefix: "",
    target: 150,
    suffix: "+",
    label: "Properties",
  },
  {
    id: "offices",
    prefix: "",
    target: 12,
    suffix: "",
    label: "Global Offices",
  },
];

const StatItem = memo(({ item }: { item: typeof STATS_DATA[0] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !counterRef.current || !labelRef.current) return;

    // Split the label text into characters
    const splitLabel = new SplitType(labelRef.current, { types: "chars" });
    const chars = splitLabel.chars;

    // Prepare GSAP context to ensure proper cleanup
    const ctx = gsap.matchMedia(containerRef);
    ctx.add("(prefers-reduced-motion: no-preference)", () => {
      // 1. Text Character Reveal Animation (Scrubbed)
      if (chars) {
        gsap.fromTo(chars, 
          { opacity: 0, y: 20 }, 
          { 
            opacity: 1, 
            y: 0, 
            stagger: 0.05,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              end: "top 50%",
              scrub: 1, // Ensures precise reverse on scroll-up
            }
          }
        );
      }

      // 2. Number Counter Animation (Scrubbed)
      // Create a dummy object to animate
      const counterObj = { val: 0 };
      gsap.to(counterObj, {
        val: item.target,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: "top 50%",
          scrub: 1, // Ensures precise reverse on scroll-up
        },
        onUpdate: () => {
          if (counterRef.current) {
            // Update the DOM element directly for maximum performance during scroll
            counterRef.current.innerText = Math.round(counterObj.val).toString();
          }
        }
      });
    });

    return () => {
      splitLabel.revert();
      ctx.revert();
    };
  }, [item.target]);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center text-center">
      <div className="flex items-center text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter mb-4 text-white">
        {item.prefix && <span>{item.prefix}</span>}
        <span ref={counterRef}>0</span>
        {item.suffix && <span>{item.suffix}</span>}
      </div>
      <div ref={labelRef} className="text-xl md:text-3xl font-light tracking-widest uppercase text-white/70 overflow-hidden">
        {item.label}
      </div>
    </div>
  );
});
StatItem.displayName = "StatItem";

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full py-32 md:py-48 bg-[#0a0a0a] overflow-hidden"
    >
      <div className="max-w-screen-2xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-24 md:gap-12 relative z-10">
        {STATS_DATA.map((item) => (
          <StatItem key={item.id} item={item} />
        ))}
      </div>
      
      {/* Subtle Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[100vw] h-[50vh] bg-white/[0.02] blur-3xl rounded-full pointer-events-none" />
    </section>
  );
}
