"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import { ArrowUpRight } from "lucide-react";
import MagneticButton from "../global/MagneticButton";

import Link from "next/link";
import Image from "next/image";

const TILES = [
  { id: 1, type: "image", bgUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9" },
  { id: 2, type: "text", content: "Global Reach" },
  { id: 3, type: "image", bgUrl: "https://images.unsplash.com/photo-1613977257363-707ba9348227" },
  { id: 4, type: "cta" }, // CTA tile
  { id: 5, type: "image", bgUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
  { id: 6, type: "text", content: "Exclusive Access" },
  { id: 7, type: "image", bgUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3" },
  { id: 8, type: "image", bgUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c" },
];

export default function CTATileBand() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tiles = sectionRef.current.querySelectorAll(".cta-tile");

    const ctx = gsap.matchMedia(sectionRef);
    ctx.add("(prefers-reduced-motion: no-preference)", () => {
      // Set initial state
      gsap.set(tiles, { 
        opacity: 0, 
        rotateX: -90,
        transformOrigin: "50% 50% -50px"
      });

      // Stagger animate in
      gsap.to(tiles, {
        opacity: 1,
        rotateX: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#111111] text-white py-24 z-10" style={{ perspective: "1000px" }}>
      <div className="max-w-screen-2xl mx-auto px-6">
        
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-white/10">
          {TILES.map((tile) => (
            <div 
              key={tile.id} 
              className={`cta-tile relative aspect-square border-r border-b border-white/10 flex flex-col justify-between p-6 ${tile.type === 'cta' ? 'col-span-2 md:col-span-2 row-span-2 md:row-span-1 aspect-auto md:aspect-[2/1] bg-white/5' : ''}`}
            >
              {tile.type === "empty" && (
                <div className="w-full h-full opacity-20 bg-gradient-to-br from-white/5 to-transparent rounded-sm" />
              )}
              
              {tile.type === "image" && (
                <div className="absolute inset-0 w-full h-full">
                  <div className="absolute inset-0 bg-black/40 z-10 hover:bg-black/20 transition-colors duration-500 cursor-pointer" />
                  <Image src={tile.bgUrl!} alt="Tile Image" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover opacity-60" />
                </div>
              )}
              
              {tile.type === "text" && (
                <>
                  <div className="w-2 h-2 rounded-full bg-white/30" />
                  <p className="text-sm md:text-base font-light tracking-widest uppercase text-white/60">
                    {tile.content}
                  </p>
                </>
              )}

              {tile.type === "cta" && (
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 group">
                  <h3 className="text-2xl md:text-4xl font-bold uppercase tracking-tight mb-8">
                    Ready to elevate<br/>your lifestyle?
                  </h3>
                  <MagneticButton>
                    <Link href="#contact" className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest transition-transform duration-300 hover:scale-105">
                      <span>Start Your Journey</span>
                      <ArrowUpRight size={18} />
                    </Link>
                  </MagneticButton>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
