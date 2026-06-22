"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";

const PRESS_DATA = [
  {
    id: 1,
    publication: "The Wall Street Journal",
    headline: "Luxe Estates breaks global records with unseen off-market portfolio.",
    date: "OCT 2025"
  },
  {
    id: 2,
    publication: "Architectural Digest",
    headline: "A look inside the most exclusive brokerage defining modern luxury.",
    date: "SEP 2025"
  },
  {
    id: 3,
    publication: "Forbes",
    headline: "How bespoke discretion is changing high-net-worth real estate.",
    date: "AUG 2025"
  },
  {
    id: 4,
    publication: "Vogue Living",
    headline: "The intersection of high fashion and pinnacle architectural design.",
    date: "JUL 2025"
  },
  {
    id: 5,
    publication: "Financial Times",
    headline: "Real estate as legacy: The ultimate asset class explored.",
    date: "JUN 2025"
  },
  {
    id: 6,
    publication: "Bloomberg Pursuits",
    headline: "Navigating the ultra-luxury market with unparalleled precision.",
    date: "MAY 2025"
  }
];

export default function PressMediaGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const items = sectionRef.current.querySelectorAll(".press-item");

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(items, { opacity: 0, y: 50 });

      // Stagger animate in
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#0a0a0a] text-white py-32 md:py-48 z-10 border-t border-white/5">
      <div className="max-w-screen-2xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-4">In The Press</h2>
            <p className="text-white/50 tracking-widest uppercase text-sm">Global Recognition</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRESS_DATA.map((item) => (
            <div 
              key={item.id} 
              className="press-item group relative bg-[#111111] border border-white/10 rounded-xl p-8 overflow-hidden cursor-pointer"
            >
              <div className="flex flex-col h-full justify-between relative z-10 transition-transform duration-500 group-hover:-translate-y-4">
                <div>
                  <span className="text-xs font-bold tracking-widest uppercase text-white/40 mb-6 block">
                    {item.publication}
                  </span>
                  <h3 className="text-xl md:text-2xl font-light leading-snug text-white/90">
                    &quot;{item.headline}&quot;
                  </h3>
                </div>
                
                <span className="text-xs font-mono text-white/30 mt-8 block">
                  {item.date}
                </span>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out flex items-end justify-between p-8 z-0">
                <span className="text-xs font-bold tracking-widest uppercase text-white">Read Article</span>
                <ExternalLink size={20} className="text-white" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
