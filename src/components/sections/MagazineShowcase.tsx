"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import Link from "next/link";

const MAGAZINES = [
  {
    id: 1,
    title: "Luxe Estates Quarterly - Autumn 2025",
    image: "/images/img-3.jpg",
    rotation: "-rotate-12",
    zIndex: "z-10",
  },
  {
    id: 2,
    title: "Luxe Estates Quarterly - Summer 2025",
    image: "/images/img-5.jpg",
    rotation: "rotate-0",
    zIndex: "z-20",
  },
  {
    id: 3,
    title: "Luxe Estates Quarterly - Spring 2025",
    image: "/images/img-10.jpg",
    rotation: "rotate-12",
    zIndex: "z-30",
  }
];

export default function MagazineShowcase() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  // Prevent scrolling when lightbox is open
  useEffect(() => {
    if (activeImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeImage]);

  return (
    <section className="relative w-full bg-[#0a0a0a] text-white py-32 md:py-48 z-10 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 relative">
        
        <div className="flex flex-col md:flex-row items-center justify-between mb-24 gap-8 text-center md:text-left">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-6">The Curated Lifestyle</h2>
            <p className="text-white/60 text-lg font-light leading-relaxed">
              Explore our exclusive quarterly publication featuring unseen properties, architectural deep dives, and global design trends.
            </p>
          </div>
          <div>
            <Link href="#contact" className="px-8 py-4 bg-white text-black font-medium text-sm tracking-widest uppercase hover:bg-white/90 transition-colors rounded-full inline-block">
              Subscribe to Print
            </Link>
          </div>
        </div>

        {/* Magazine Stack */}
        <div className="flex justify-center items-center relative h-[400px] md:h-[600px] w-full max-w-4xl mx-auto">
          {MAGAZINES.map((mag) => (
            <div 
              key={mag.id}
              className={`absolute w-[200px] md:w-[320px] aspect-[3/4] cursor-pointer hover:scale-105 animate-float ${mag.rotation} ${mag.zIndex}`}
              style={{
                marginLeft: mag.id === 3 ? "20%" : mag.id === 1 ? "-20%" : "0",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
                animationDelay: mag.id === 1 ? "0s" : mag.id === 2 ? "0.4s" : "0.8s",
                transition: "transform 0.5s ease-out",
              }}
              onClick={() => setActiveImage(mag.image)}
            >
              <div className="relative w-full h-full rounded-sm overflow-hidden border border-white/20 bg-zinc-900">
                <Image 
                  src={mag.image}
                  alt={mag.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 200px, 320px"
                />
                
                {/* Glossy overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Overlay */}
      {activeImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-6"
          onClick={() => setActiveImage(null)}
          style={{ animation: "fadeIn 0.3s ease-out forwards" }}
        >
          <button 
            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
            onClick={() => setActiveImage(null)}
            aria-label="Close lightbox"
          >
            <X size={40} strokeWidth={1} />
          </button>
          
          <div 
            className="relative w-full max-w-2xl aspect-[3/4] shadow-[0_0_100px_rgba(255,255,255,0.1)]"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "zoomIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
          >
            <Image 
              src={activeImage}
              alt="Magazine Cover Expanded"
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </div>
        </div>
      )}

      {/* Inline animations for Lightbox since Tailwind `animate-in` isn't universally loaded by default */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}} />

    </section>
  );
}
