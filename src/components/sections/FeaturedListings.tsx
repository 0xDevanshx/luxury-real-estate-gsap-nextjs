"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ArrowRight, MapPin } from "lucide-react";

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
        const wrapperWidth =
          container.parentElement?.offsetWidth || window.innerWidth;
        return -(containerWidth - wrapperWidth);
      };

      const tween = gsap.to(container, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          // Multiply scroll amount by 2 so the vertical scroll required is twice as long,
          // making the horizontal scrub slower and smoother for 6 cards.
          end: () => `+=${Math.abs(getScrollAmount()) * 2}`,
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
      <section
        id="properties"
        ref={sectionRef}
        className="relative w-full h-screen bg-[#0a0a0a] text-white overflow-hidden py-24"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-80 pointer-events-none" />

        <div className="absolute top-24 left-6 lg:left-12 z-20 pointer-events-none mix-blend-difference">
          <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-tighter leading-none">
            Exclusive
            <br />
            Listings
          </h2>
          <p className="mt-4 text-sm uppercase tracking-widest text-white/60 max-w-xs">
            Discover unparalleled luxury properties across the globe.
          </p>
        </div>

        <div className="md:hidden absolute bottom-8 left-0 right-0 z-20 text-white/50 text-xs uppercase tracking-widest flex items-center justify-center gap-2">
          <ArrowRight size={12} className="rotate-180" />
          <span>Swipe to explore</span>
          <ArrowRight size={12} />
        </div>

        <div className="w-full h-full max-w-[1440px] mx-auto relative flex items-center overflow-visible">
          <div
            ref={scrollContainerRef}
            // Changed from px-[350px] to pl-[350px] and a smaller pr-[50px].
            // Massive right padding was causing the scroll to "end" while the last cards were still in the middle of the screen!
            className="flex h-max w-max pl-[10vw] pr-6 lg:pl-[350px] lg:pr-[50px] items-center will-change-transform touch-pan-y"
          >
            {LISTINGS.map((property, idx) => (
              <div
                key={property.id}
                // Fixed width (lg:w-[600px]) and controlled negative margins (lg:-ml-[150px])
                // forces the cards to physically overlap exactly as they do in the approved 15-inch design.
                className={`group relative flex-shrink-0 w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[600px] h-[60vh] flex flex-col justify-end overflow-hidden cursor-pointer shadow-[0_0_40px_rgba(0,0,0,0.6)] border border-white/5 transition-all duration-500 hover:-translate-y-4 ${idx > 0 ? "ml-4 lg:-ml-[20px]" : ""}`}
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                style={{
                  cursor: isDragging ? "grabbing" : "grab",
                  zIndex: idx,
                }}
              >
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 600px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                    priority={idx < 2}
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10 p-6 lg:p-8 flex flex-col justify-end h-full">
                  <div className="transform transition-transform duration-500 ease-out group-hover:-translate-y-2">
                    <div className="flex items-center gap-2 text-white/80 mb-2 text-[10px] md:text-xs uppercase tracking-widest font-semibold">
                      <MapPin size={12} />
                      <span>{property.location}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-serif mb-4 tracking-tight line-clamp-2 drop-shadow-md">
                      {property.title}
                    </h3>

                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-t border-white/20 pt-4">
                      <div>
                        <p className="text-[10px] md:text-xs text-white/60 mb-1 uppercase tracking-widest">
                          Price
                        </p>
                        <p className="text-lg md:text-xl font-light tracking-wide">
                          {property.price}
                        </p>
                      </div>
                      <div className="flex gap-4 text-xs md:text-sm text-white/70 text-right font-light">
                        <div>
                          <span className="block text-white font-medium text-sm">
                            {property.beds}
                          </span>{" "}
                          Beds
                        </div>
                        <div>
                          <span className="block text-white font-medium text-sm">
                            {property.baths}
                          </span>{" "}
                          Baths
                        </div>
                        <div>
                          <span className="block text-white font-medium text-sm">
                            {property.sqft}
                          </span>{" "}
                          Sq.Ft
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
