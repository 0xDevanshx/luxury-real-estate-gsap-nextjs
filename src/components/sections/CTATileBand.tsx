"use client";

import React from "react";
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
  return (
    <div className="absolute inset-0 w-full h-full group/image overflow-hidden shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)] transition-shadow duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
      <div className="absolute inset-0 bg-black/30 z-10 transition-opacity duration-300 group-hover/image:opacity-0 pointer-events-none mix-blend-multiply" />

      <div className="w-full h-full absolute inset-0">
        <Image
          src={tile.bgUrl!}
          alt="Premium Real Estate"
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          priority={priority}
          unoptimized={true}
          className="object-cover transition-transform duration-300 group-hover/image:scale-[1.05]"
        />
      </div>
    </div>
  );
};

export default function CTATileBand() {
  return (
    <section className="relative w-full bg-[#111111] text-white py-24 z-10">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-white/10">
          {TILES.map((tile, idx) => (
            <div
              key={tile.id}
              className={`relative aspect-square border-r border-b border-white/10 flex flex-col justify-between p-6 transition-all duration-300 hover:z-20 ${tile.type === "cta" ? "col-span-2 md:col-span-2 row-span-2 md:row-span-1 aspect-auto md:aspect-[2/1] bg-white/5" : ""}`}
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
                      href="/contact"
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
