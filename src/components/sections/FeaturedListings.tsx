"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ArrowRight, MapPin } from "lucide-react";
import MagneticButton from "../global/MagneticButton";

const PROPERTIES = [
  {
    id: "p1",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
    price: "$12,500,000",
    location: "Beverly Hills, CA",
    title: "Modern Architectural Masterpiece",
    beds: 6,
    baths: 8,
    sqft: "10,500",
  },
  {
    id: "p2",
    image: "https://images.unsplash.com/photo-1600607687931-cecebd802404?auto=format&fit=crop&q=80&w=1200",
    price: "$8,950,000",
    location: "Aspen, CO",
    title: "Luxury Mountain Retreat",
    beds: 5,
    baths: 6,
    sqft: "7,200",
  },
  {
    id: "p3",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
    price: "$24,000,000",
    location: "Miami Beach, FL",
    title: "Oceanfront Estate",
    beds: 8,
    baths: 10,
    sqft: "14,000",
  },
  {
    id: "p4",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1200",
    price: "$15,200,000",
    location: "Malibu, CA",
    title: "Cliffside Sanctuary",
    beds: 4,
    baths: 5,
    sqft: "5,800",
  },
  {
    id: "p5",
    image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&q=80&w=1200",
    price: "$18,500,000",
    location: "Tribeca, NY",
    title: "Ultra-Modern Penthouse",
    beds: 3,
    baths: 4,
    sqft: "4,500",
  },
];

export default function FeaturedListings() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !scrollContainerRef.current) return;

    const ctx = gsap.matchMedia(sectionRef);
    ctx.add("(prefers-reduced-motion: no-preference)", () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      // Calculate the total horizontal scroll distance
      // We want to scroll until the end of the container aligns with the end of the viewport
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
          end: () => `+=${getScrollAmount() * -1}`,
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
    <section ref={sectionRef} className="relative w-full h-screen bg-[#0a0a0a] text-white overflow-hidden py-24">
      {/* Background ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-80 pointer-events-none" />

      {/* Section Header */}
      <div className="absolute top-24 left-6 lg:left-12 z-20 pointer-events-none mix-blend-difference">
        <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">Exclusive<br/>Listings</h2>
        <p className="mt-4 text-sm uppercase tracking-widest text-white/60 max-w-xs">Discover unparalleled luxury properties across the globe.</p>
      </div>

      {/* Horizontal Scroll Container */}
      <div 
        ref={scrollContainerRef} 
        className="flex h-full w-max px-[30vw] items-center gap-12 lg:gap-24 will-change-transform"
      >
        {PROPERTIES.map((property, idx) => (
          <div 
            key={property.id} 
            className="group relative flex-shrink-0 w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[30vw] h-[60vh] flex flex-col justify-end overflow-hidden cursor-pointer"
          >
            {/* Background Image with Hover Scale */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <Image
                src={property.image}
                alt={property.title}
                fill
                sizes="(max-width: 768px) 85vw, (max-width: 1024px) 45vw, 30vw"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105 will-change-transform"
                priority={idx < 2}
              />
            </div>
            
            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-80" />

            {/* Content */}
            <div className="relative z-10 p-6 lg:p-10 transform transition-transform duration-500 ease-out group-hover:-translate-y-4">
              <div className="flex items-center gap-2 text-white/70 mb-3 text-xs uppercase tracking-widest">
                <MapPin size={14} />
                <span>{property.location}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2 uppercase tracking-tight">{property.title}</h3>
              <div className="flex items-end justify-between mt-6">
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
  );
}
