"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import gsap from "gsap";


const OFFICES = [
  {
    id: 1,
    city: "New York",
    image: "/images/img-11.jpg",
    address: "1 Central Park West, New York, NY 10023",
    phone: "+1 (212) 555-0198",
    email: "ny@luxeestates.com",
  },
  {
    id: 2,
    city: "London",
    image: "/images/img-12.jpg",
    address: "1 Hyde Park Corner, London W1J 7NT",
    phone: "+44 20 7946 0958",
    email: "london@luxeestates.com",
  },
  {
    id: 3,
    city: "Dubai",
    image: "/images/img-13.jpg",
    address: "Burj Khalifa Boulevard, Downtown Dubai",
    phone: "+971 4 366 1688",
    email: "dubai@luxeestates.com",
  }
];

export default function OfficeLocations() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll(".office-card");

    const ctx = gsap.matchMedia(containerRef);
    ctx.add("(prefers-reduced-motion: no-preference)", () => {
      cards.forEach((card) => {
        const bg = card.querySelector(".parallax-bg");
        
        if (bg) {
          gsap.to(bg, {
            yPercent: 30, // move the background down as we scroll down
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom", // when the top of the card hits the bottom of the viewport
              end: "bottom top",   // when the bottom of the card hits the top of the viewport
              scrub: true,
            }
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-[#050505] z-10 relative">
      <div className="flex flex-col">
        {OFFICES.map((office) => (
          <div key={office.id} className="office-card relative w-full h-[60vh] md:h-[80vh] overflow-hidden flex items-center justify-center border-t border-white/5">
            
            {/* Parallax Background Layer */}
            <div className="absolute inset-0 w-full h-[130%] -top-[15%] z-0 parallax-bg pointer-events-none">
              <Image
                src={office.image}
                alt={`${office.city} Office`}
                fill
                className="object-cover opacity-40 mix-blend-luminosity"
                sizes="100vw"
                priority={office.id === 1}
              />
            </div>

            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80 z-10 pointer-events-none" />

            {/* Content */}
            <div className="relative z-20 text-white text-center flex flex-col items-center px-6">
              <span className="text-xs font-bold tracking-widest uppercase text-white/50 mb-6 block">
                Global Presence
              </span>
              <h3 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-12 uppercase drop-shadow-2xl">
                {office.city}
              </h3>
              
              <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-white/80 text-sm md:text-base font-light tracking-wide bg-black/20 backdrop-blur-md border border-white/10 px-8 py-6 rounded-2xl">
                <div className="flex items-center justify-center gap-3">
                  <MapPin size={18} className="text-white/50" />
                  <span>{office.address}</span>
                </div>
                
                <a href={`tel:${office.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center justify-center gap-3 hover:text-white transition-colors group">
                  <Phone size={18} className="text-white/50 group-hover:text-white transition-colors" />
                  <span>{office.phone}</span>
                </a>
                
                <a href={`mailto:${office.email}`} className="flex items-center justify-center gap-3 hover:text-white transition-colors group">
                  <Mail size={18} className="text-white/50 group-hover:text-white transition-colors" />
                  <span>{office.email}</span>
                </a>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
