"use client";

import { useRef, useEffect, useState } from "react";
import { Play, X } from "lucide-react";
import gsap from "gsap";

import SplitType from "split-type";

export default function Philanthropy() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    // Use words instead of lines to avoid reflow/resize issues
    const splitText = new SplitType(textRef.current, { types: "words", wordClass: "will-change-transform inline-block" });

    const ctx = gsap.matchMedia(containerRef);
    ctx.add("(prefers-reduced-motion: no-preference)", () => {
      // Animate text words instead of lines
      gsap.fromTo(splitText.words, 
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.02,
          ease: "power3.out"
        }
      );
    });

    return () => {
      splitText.revert();
      ctx.revert();
    };
  }, []);

  // Prevent background scroll when video is open
  useEffect(() => {
    if (isVideoOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isVideoOpen]);

  return (
    <section ref={containerRef} className="relative w-full h-[80vh] md:h-[90vh] bg-black text-white flex items-center justify-center overflow-hidden z-10">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video 
          src="https://cdn.coverr.co/videos/coverr-a-beautiful-waterfall-in-the-middle-of-the-forest-4112/1080p.mp4" 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="object-cover w-full h-full opacity-50"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/80" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center flex flex-col items-center">
        
        <span className="text-sm font-bold tracking-widest uppercase text-white/50 mb-6 block">
          Luxe Estates Foundation
        </span>
        
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-8 max-w-4xl">
          Building communities, <br className="hidden md:block" />
          beyond borders.
        </h2>
        
        <div className="max-w-2xl mx-auto w-full mb-16">
          <p ref={textRef} className="text-lg md:text-xl text-white/90 font-light leading-relaxed">
            We believe true luxury is leaving the world better than we found it. A portion of every transaction funds sustainable housing initiatives in developing nations, creating lasting legacies of shelter and hope.
          </p>
        </div>

        <button 
          onClick={() => setIsVideoOpen(true)}
          className="group relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-white/5 backdrop-blur-md rounded-full border border-white/20 hover:bg-white transition-colors duration-500"
          aria-label="Play Foundation Film"
        >
          <Play size={32} className="text-white group-hover:text-black transition-colors duration-500 ml-2" strokeWidth={1} />
          {/* Subtle pulse ring */}
          <div className="absolute inset-0 rounded-full border border-white/30 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-20" />
        </button>

      </div>

      {/* Lightbox Video Player */}
      {isVideoOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
          onClick={() => setIsVideoOpen(false)}
          style={{ animation: "fadeIn 0.3s ease-out forwards" }}
        >
          <button 
            className="absolute top-6 right-6 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors z-50"
            onClick={() => setIsVideoOpen(false)}
            aria-label="Close video"
          >
            <X size={40} strokeWidth={1} />
          </button>
          
          <div 
            className="relative w-full max-w-5xl aspect-video bg-black shadow-[0_0_100px_rgba(255,255,255,0.1)] rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "zoomIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
          >
            <iframe 
              width="100%" 
              height="100%" 
              // TODO: wire up real youtube ID. Using a placeholder 4k nature video.
              src="https://www.youtube.com/embed/LXb3EKWsInQ?autoplay=1" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
}
