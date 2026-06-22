"use client";

import { useState, useRef, useEffect, MouseEvent } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Play, X } from "lucide-react";
import MagneticButton from "../global/MagneticButton";

const PRESS_LOGOS = [
  "Vogue", "Architectural Digest", "Forbes", "The New York Times", "Robb Report", "Wall Street Journal", "GQ", "Esquire"
];

export default function PressVideoSection() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const thumbnailRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // CSS 3D Tilt Logic
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!thumbnailRef.current) return;
    const { left, top, width, height } = thumbnailRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - top) / height - 0.5; // -0.5 to 0.5

    // Invert Y for correct tilt feel
    thumbnailRef.current.style.setProperty("--rotate-y", `${x * 15}deg`);
    thumbnailRef.current.style.setProperty("--rotate-x", `${y * -15}deg`);
  };

  const handleMouseLeave = () => {
    if (!thumbnailRef.current) return;
    thumbnailRef.current.style.setProperty("--rotate-y", "0deg");
    thumbnailRef.current.style.setProperty("--rotate-x", "0deg");
  };

  // Lightbox GSAP Animation
  useEffect(() => {
    if (isLightboxOpen) {
      // Open animation
      gsap.fromTo(
        lightboxRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power4.out" }
      );
      videoRef.current?.play().catch(() => {});
    } else if (lightboxRef.current) {
      // Close animation
      gsap.to(lightboxRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          videoRef.current?.pause();
          if (videoRef.current) videoRef.current.currentTime = 0;
        }
      });
    }
  }, [isLightboxOpen]);

  return (
    <section className="relative w-full bg-black text-white py-24 md:py-32 overflow-hidden z-10">
      
      {/* Press Marquee */}
      <div className="w-full border-y border-white/10 mb-24 md:mb-32 overflow-hidden flex relative select-none bg-black">
        <div className="flex animate-marquee-left min-w-max">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16 px-8 py-8 items-center">
              {PRESS_LOGOS.map((logo, idx) => (
                <span key={`${i}-${idx}`} className="text-3xl md:text-5xl font-serif italic text-white/40 tracking-wider whitespace-nowrap">
                  {logo}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Brand Film Thumbnail */}
      <div className="w-full max-w-5xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-sm uppercase tracking-widest text-white/60 mb-4">The Brand Film</h2>
          <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-tight">Experience Luxury</h3>
        </div>

        <div 
          ref={thumbnailRef}
          className="relative w-full aspect-video rounded-lg cursor-pointer group"
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d"
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => setIsLightboxOpen(true)}
        >
          {/* Inner Tilt Container */}
          <div 
            className="w-full h-full relative rounded-lg overflow-hidden transition-transform duration-200 ease-out will-change-transform border border-white/10"
            style={{
              transform: "rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg)) translateZ(0)",
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"
              alt="Brand Film Thumbnail"
              fill
              className="object-cover opacity-60 transition-opacity duration-500 group-hover:opacity-100"
            />
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <MagneticButton>
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 transition-transform duration-500 group-hover:scale-110">
                  <Play className="text-white fill-white ml-2" size={32} />
                </div>
              </MagneticButton>
            </div>
          </div>
          
          {/* Glow beneath */}
          <div className="absolute -inset-12 bg-white/5 blur-3xl -z-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        </div>
      </div>

      {/* Lightbox Overlay */}
      {/* We keep it in the DOM but hidden when not active so GSAP can animate it out properly */}
      <div 
        ref={lightboxRef}
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl ${isLightboxOpen ? "pointer-events-auto" : "pointer-events-none opacity-0"}`}
      >
        <button 
          onClick={() => setIsLightboxOpen(false)}
          className="absolute top-6 right-6 md:top-12 md:right-12 z-50 p-4 text-white hover:text-white/70 transition-colors"
          aria-label="Close brand film"
        >
          <X size={40} strokeWidth={1} />
        </button>

        <div className="w-full max-w-7xl px-4 aspect-video relative">
          <video
            ref={videoRef}
            src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
            className="w-full h-full object-contain bg-black rounded-lg"
            controls
            playsInline
            loop
          />
        </div>
      </div>

    </section>
  );
}
