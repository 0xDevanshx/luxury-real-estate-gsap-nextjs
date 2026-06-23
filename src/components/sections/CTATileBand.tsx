"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

import { ArrowUpRight } from "lucide-react";
import MagneticButton from "../global/MagneticButton";

import Link from "next/link";
import Image from "next/image";

const TILES = [
  { id: 1, type: "image", bgUrl: "/images/img-3.jpg" },
  { id: 2, type: "text", content: "Global Reach", bgUrl: "/images/img-4.jpg" },
  {
    id: 3,
    type: "image",
    bgUrl: "https://images.unsplash.com/photo-1613977257363-707ba9348227",
  },
  { id: 9, type: "image", bgUrl: "/images/img-5.jpg" }, // Added to fill the CSS Grid gap before CTA
  { id: 4, type: "cta" }, // CTA tile
  { id: 5, type: "image", bgUrl: "/images/img-6.jpg" },
  {
    id: 6,
    type: "text",
    content: "Exclusive Access",
    bgUrl: "/images/img-7.jpg",
  },
  {
    id: 7,
    type: "image",
    bgUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
  },
  { id: 8, type: "image", bgUrl: "/images/img-8.jpg" },
];

const ImageTile = ({
  tile,
  priority = false,
}: {
  tile: { id: number; type: string; bgUrl?: string; content?: string };
  priority?: boolean;
}) => {
  const tileRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!tileRef.current) return;
    const { left, top, width, height } =
      tileRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5; // Range: -0.5 to 0.5
    const y = (e.clientY - top) / height - 0.5; // Range: -0.5 to 0.5

    // Smooth, very subtle movement to create depth
    gsap.to(tileRef.current.querySelector(".image-mover"), {
      x: x * 15, // max 7.5px shift
      y: y * 15,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!tileRef.current) return;
    gsap.to(tileRef.current.querySelector(".image-mover"), {
      x: 0,
      y: 0,
      duration: 1,
      ease: "power3.out",
    });
  };

  return (
    <div
      ref={tileRef}
      className="absolute inset-0 w-full h-full group/image cursor-pointer overflow-hidden shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)] transition-shadow duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 bg-black/30 z-10 transition-opacity duration-700 ease-out group-hover/image:opacity-0 pointer-events-none mix-blend-multiply" />

      <div className="image-mover w-full h-full absolute inset-0 transform-gpu will-change-transform scale-[1.03]">
        <Image
          src={tile.bgUrl!}
          alt="Premium Real Estate"
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          priority={priority}
          unoptimized={true}
          // Removed opacity-60 and added premium CSS filters for a luxury feel
          className="object-cover transform-gpu transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/image:scale-[1.05] group-hover/image:brightness-110 group-hover/image:contrast-[1.05] group-hover/image:saturate-[1.05] will-change-[transform,filter]"
        />
      </div>
    </div>
  );
};

export default function CTATileBand() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tiles = sectionRef.current.querySelectorAll(".cta-tile");

    const ctx = gsap.matchMedia(sectionRef);
    ctx.add("(prefers-reduced-motion: no-preference)", () => {
      // Stagger animate in directly from CSS initial states
      gsap.to(tiles, {
        opacity: 1,
        rotateX: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#111111] text-white py-24 z-10"
      style={{ perspective: "1000px" }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-white/10">
          {TILES.map((tile, idx) => (
            <div
              key={tile.id}
              // Set initial state via CSS: opacity-0 and rotateX(-89.9deg) instead of -90deg to force GPU decoding on mount
              className={`cta-tile opacity-0 [transform:rotateX(-89.9deg)] [transform-origin:50%_50%_-50px] relative aspect-square border-r border-b border-white/10 flex flex-col justify-between p-6 transition-all duration-500 hover:z-20 ${tile.type === "cta" ? "col-span-2 md:col-span-2 row-span-2 md:row-span-1 aspect-auto md:aspect-[2/1] bg-white/5" : ""}`}
            >
              {tile.type === "empty" && (
                <div className="w-full h-full opacity-20 bg-gradient-to-br from-white/5 to-transparent rounded-sm" />
              )}

              {tile.type === "image" && (
                <ImageTile tile={tile} priority={idx < 4} />
              )}

              {tile.type === "text" && (
                <>
                  {tile.bgUrl && <ImageTile tile={tile} priority={idx < 4} />}
                  <div className="relative z-20 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                  <p className="relative z-20 text-sm md:text-base font-bold tracking-widest uppercase text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                    {tile.content}
                  </p>
                </>
              )}

              {tile.type === "cta" && (
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 group">
                  <h3 className="text-2xl md:text-4xl font-bold uppercase tracking-tight mb-8">
                    Ready to elevate
                    <br />
                    your lifestyle?
                  </h3>
                  <MagneticButton>
                    <Link
                      href="#contact"
                      className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest transition-transform duration-300 hover:scale-105"
                    >
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
