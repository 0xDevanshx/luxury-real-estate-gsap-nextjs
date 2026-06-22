"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ArrowRight, MapPin } from "lucide-react";
import MagneticButton from "../global/MagneticButton";
import { FEATURED_LISTINGS as LISTINGS } from "@/data/mockData";

export default function FeaturedListings() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!sectionRef.current || !scrollContainerRef.current) return;

    const ctx = gsap.matchMedia(sectionRef);
    ctx.add("(prefers-reduced-motion: no-preference)", () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const getScrollAmount = () => {
        const containerWidth = container.scrollWidth;
        return -(containerWidth - window.innerWidth);
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
    <div id="search" className="w-full">
      <section id="properties" ref={sectionRef} className="relative w-full h-screen bg-[#0a0a0a] text-white overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-80 pointer-events-none" />

      <div className="absolute top-24 left-6 lg:left-12 z-20 pointer-events-none mix-blend-difference">
        <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">Exclusive<br/>Listings</h2>
        <p className="mt-4 text-sm uppercase tracking-widest text-white/60 max-w-xs">Discover unparalleled luxury properties across the globe.</p>
      </div>

      <div className="md:hidden absolute bottom-8 left-0 right-0 z-20 text-white/50 text-xs uppercase tracking-widest flex items-center justify-center gap-2">
        <ArrowRight size={12} className="rotate-180" />
        <span>Swipe to explore</span>
        <ArrowRight size={12} />
      </div>

      <div 
        ref={scrollContainerRef} 
        className="flex h-full w-max px-[30vw] items-center gap-12 lg:gap-24 will-change-transform touch-pan-y"
      >
        {LISTINGS.map((property, idx) => (
          <div 
            key={property.id} 
            className="group relative flex-shrink-0 w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[30vw] h-[60vh] flex flex-col justify-end overflow-hidden cursor-pointer"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
          >
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <Image
                src={property.image}
                alt={property.title}
                fill
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                priority={idx < 2}
              />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-80" />

            <div className="relative z-10 p-6 lg:p-10 transform transition-transform duration-500 ease-out group-hover:-translate-y-4">
              <div className="flex items-center gap-2 text-white/70 mb-3 text-xs uppercase tracking-widest">
                <MapPin size={14} />
                <span>{property.location}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2 uppercase tracking-tight line-clamp-1">{property.title}</h3>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mt-4 gap-4">
                <div>
                  <p className="text-sm text-white/60 mb-1">Price</p>
                  <p className="text-xl md:text-2xl font-light">{property.price}</p>
                </div>
                <div className="flex gap-4 text-sm text-white/60 text-right">
                  <div>
                    <span className="block text-white font-medium">{property.beds}</span> Beds
                  </div>
                  <div>
                    <span className="block text-white font-medium">{property.baths}</span> Baths
                  </div>
                  <div>
                    <span className="block text-white font-medium">{property.sqft}</span> Sq.Ft
                  </div>
                </div>
              </div>
            </div>

            {/* Hover Action Button */}
            <div className="absolute top-6 right-6 opacity-0 translate-x-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-x-0">
              <MagneticButton>
                <div className="bg-white text-black p-4 rounded-full">
                  <ArrowRight size={20} />
                </div>
              </MagneticButton>
            </div>
          </div>
        ))}
      </div>
    </section>
    </div>
  );
}
