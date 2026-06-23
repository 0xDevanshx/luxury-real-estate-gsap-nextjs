"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ArrowRight, MapPin } from "lucide-react";
import MagneticButton from "../global/MagneticButton";
import { FEATURED_LISTINGS as LISTINGS } from "@/data/mockData";

export default function FeaturedListings() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !scrollContainerRef.current) return;

    const ctx = gsap.matchMedia(sectionRef);
    ctx.add("(prefers-reduced-motion: no-preference)", () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const getScrollAmount = () => {
        // The container thinks it's wider because of the untranslated flex items
        const containerWidth = container.scrollWidth;
        const visibleWidth = sectionRef.current?.offsetWidth || window.innerWidth;
        
        // We overlap cards by 120px each using translateX
        const overlapTotal = (LISTINGS.length - 1) * 120;
        
        // Calculate the actual visual end of the cards
        const actualContentWidth = containerWidth - overlapTotal;
        
        // Scroll enough to see the end, plus a little padding
        return -(actualContentWidth - visibleWidth + 100);
      };

      const tween = gsap.to(container, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${Math.abs(getScrollAmount())}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.kill();
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <div id="search" className="w-full bg-[#0a0a0a]">
      {/* 
        1. Preserve 15-inch composition on all screens 
        Wrap section in a constrained container to lock the layout from stretching out.
      */}
      <div className="max-w-[1600px] mx-auto relative overflow-hidden">
        <section id="properties" ref={sectionRef} className="relative w-full h-screen text-white overflow-hidden py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-80 pointer-events-none" />

          <div className="absolute top-24 left-6 lg:left-12 z-20 pointer-events-none mix-blend-difference">
            {/* 2. Increase "EXCLUSIVE LISTINGS" size by 15-25% without changing other props */}
            <h2 className="text-[3.5rem] md:text-[5rem] lg:text-[7.5rem] font-bold uppercase tracking-tighter leading-none">Exclusive<br/>Listings</h2>
            <p className="mt-4 text-sm uppercase tracking-widest text-white/60 max-w-xs">Discover unparalleled luxury properties across the globe.</p>
          </div>

          <div className="md:hidden absolute bottom-8 left-0 right-0 z-20 text-white/50 text-xs uppercase tracking-widest flex items-center justify-center gap-2">
            <ArrowRight size={12} className="rotate-180" />
            <span>Swipe to explore</span>
            <ArrowRight size={12} />
          </div>

          <div 
            ref={scrollContainerRef} 
            // Removed gap to use manual translateX for overlap. Used fixed padding instead of vw.
            className="flex h-full w-max pl-6 lg:pl-[350px] items-center will-change-transform touch-pan-y"
          >
            {LISTINGS.map((property, idx) => (
              <div 
                key={property.id} 
                className="flex-shrink-0"
                style={{
                  // 3. Restore Proper Card Overlap
                  // Secondary cards slide partially behind featured card
                  transform: `translateX(-${idx * 120}px)`,
                  zIndex: LISTINGS.length - idx,
                  position: 'relative'
                }}
              >
                <div 
                  className="group relative w-[85vw] sm:w-[400px] md:w-[450px] lg:w-[500px] h-[60vh] flex flex-col justify-end overflow-hidden rounded-xl cursor-pointer will-change-transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)] bg-black"
                  style={{ transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)" }}
                >
                  <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      sizes="(max-width: 768px) 90vw, 500px"
                      // 5. Premium Hover Effect: filter change
                      className="object-cover transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:brightness-110 group-hover:contrast-105 pointer-events-none"
                      // 4. Load all gallery images immediately to prevent blank/delayed rendering in GSAP
                      priority={true} 
                    />
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative z-10 p-6 lg:p-8 flex flex-col justify-end h-full pointer-events-none">
                    <div className="transform transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-2">
                      <div className="flex items-center gap-2 text-white/80 mb-2 text-[10px] md:text-xs uppercase tracking-widest font-semibold">
                        <MapPin size={12} />
                        <span>{property.location}</span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-serif mb-4 tracking-tight line-clamp-2 drop-shadow-md">{property.title}</h3>
                      
                      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-t border-white/20 pt-4">
                        <div>
                          <p className="text-[10px] md:text-xs text-white/60 mb-1 uppercase tracking-widest">Price</p>
                          <p className="text-lg md:text-xl font-light tracking-wide">{property.price}</p>
                        </div>
                        <div className="flex gap-4 text-xs md:text-sm text-white/70 text-right font-light">
                          <div>
                            <span className="block text-white font-medium text-sm">{property.beds}</span> Beds
                          </div>
                          <div>
                            <span className="block text-white font-medium text-sm">{property.baths}</span> Baths
                          </div>
                          <div>
                            <span className="block text-white font-medium text-sm">{property.sqft}</span> Sq.Ft
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hover Action Button */}
                  <div className="absolute top-6 right-6 opacity-0 translate-x-4 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:opacity-100 group-hover:translate-x-0">
                    <MagneticButton>
                      <div className="bg-white text-black p-4 rounded-full pointer-events-auto">
                        <ArrowRight size={20} />
                      </div>
                    </MagneticButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
