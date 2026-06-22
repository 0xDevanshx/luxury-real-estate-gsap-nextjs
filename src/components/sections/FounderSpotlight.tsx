"use client";

import { useEffect, useRef, memo } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

const BioText = memo(() => {
  const bioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bioRef.current) return;

    // Use SplitType to split the text into lines
    const split = new SplitType(bioRef.current, { types: 'lines', lineClass: 'overflow-hidden' });
    
    // We need to wrap each line in an inner div to animate the transform while keeping the outer line as an overflow hidden mask
    const lines = split.lines;
    if (lines) {
      lines.forEach(line => {
        const content = line.innerHTML;
        line.innerHTML = `<div class="line-inner" style="transform: translateY(100%); opacity: 0">${content}</div>`;
      });
    }

    const mm = gsap.matchMedia();
    const section = bioRef.current.closest('section');

    mm.add("(min-width: 768px)", () => {
      // Desktop: Pin and scrub
      if (!section) return;
      
      const inners = bioRef.current!.querySelectorAll('.line-inner');
      
      gsap.to(inners, {
        y: "0%",
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=100vh",
          scrub: 1,
        }
      });
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile: Normal scroll without pin
      const inners = bioRef.current!.querySelectorAll('.line-inner');
      
      gsap.to(inners, {
        y: "0%",
        opacity: 1,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: bioRef.current,
          start: "top 80%",
        }
      });
    });

    return () => {
      split.revert();
      mm.revert();
    };
  }, []);

  return (
    <div 
      ref={bioRef} 
      className="text-2xl md:text-4xl lg:text-5xl font-light leading-tight tracking-tight text-white/90"
    >
      &quot;Real estate is not just about transactions; it&apos;s about curating a legacy. We established Luxe Estates to redefine the boundaries of modern luxury living. Every property in our portfolio represents the pinnacle of architectural excellence, absolute privacy, and uncompromising elegance. Our vision is simple: to connect the extraordinary with the exceptional.&quot;
    </div>
  );
});
BioText.displayName = "BioText";

export default function FounderSpotlight() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Desktop: Pin container, slow pan/scale portrait
      const ctx = gsap.context(() => {
        
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "+=100vh",
          pin: true,
          pinSpacing: true,
        });

        gsap.to(imageRef.current, {
          scale: 1.15,
          y: "10%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      }, containerRef);
      return () => ctx.revert();
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile: subtle scale without pin
      const ctx = gsap.context(() => {
        gsap.to(imageRef.current, {
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      }, containerRef);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-black py-24 md:py-0 md:h-screen flex items-center overflow-hidden">
      <div className="w-full max-w-screen-2xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* Left Side: Portrait */}
        <div className="relative w-full aspect-[3/4] md:h-[80vh] overflow-hidden rounded-xl border border-white/10 flex-shrink-0">
          <Image
            ref={imageRef}
            src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=1200"
            alt="Founder Portrait"
            fill
            className="object-cover origin-center will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-xl font-bold uppercase tracking-widest">Alexander Pierce</h3>
            <p className="text-sm text-white/60 uppercase tracking-widest mt-1">Founder & CEO</p>
          </div>
        </div>

        {/* Right Side: Bio */}
        <div className="flex flex-col justify-center">
          <h2 className="text-sm uppercase tracking-widest text-white/60 mb-8">The Vision</h2>
          <BioText />
        </div>

      </div>
    </section>
  );
}
