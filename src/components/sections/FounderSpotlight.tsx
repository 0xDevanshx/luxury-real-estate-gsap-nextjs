"use client";

import { useEffect, useRef, memo } from "react";
import Image from "next/image";
import gsap from "gsap";
import SplitType from "split-type";

const BioText = memo(() => {
  const bioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bioRef.current) return;

    // Split into lines and wrap each in an inner div for overflow-mask animation
    const split = new SplitType(bioRef.current, {
      types: "lines",
      lineClass: "overflow-hidden block",
    });

    const lines = split.lines;
    if (lines) {
      lines.forEach((line) => {
        const content = line.innerHTML;
        line.innerHTML = `<div class="line-inner" style="display:block">${content}</div>`;
      });
    }

    const inners = Array.from(bioRef.current.querySelectorAll(".line-inner"));

    // Start all lines hidden
    gsap.set(inners, { y: "105%", opacity: 0 });

    // Build a timeline where each line reveals one after the other
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: bioRef.current,
        // Start as soon as the text block enters the bottom of the screen
        start: "top bottom",
        // End when the bottom of the text block reaches the center of the screen
        end: "bottom center",
        scrub: 1.2, // ties progress directly to scroll — slower scroll = slower reveal
      },
    });

    // Each line gets a staggered slot in the timeline — equally distributed
    inners.forEach((inner, i) => {
      tl.to(
        inner,
        { y: "0%", opacity: 1, ease: "power2.out", duration: 0.4 },
        i * 0.15 // stagger offset within the timeline
      );
    });

    return () => {
      split.revert();
      tl.kill();
    };
  }, []);


  return (
    <div
      ref={bioRef}
      className="text-2xl md:text-3xl lg:text-4xl font-serif font-light leading-snug tracking-normal text-white/90 text-justify hyphens-auto"
    >
      &quot;Real estate is not just about transactions; it&apos;s about curating
      a legacy. We established Luxe Estates to redefine the boundaries of modern
      luxury living. Every property in our portfolio represents the pinnacle of
      architectural excellence, absolute privacy, and uncompromising elegance.
      Our vision is simple: to connect the extraordinary with the
      exceptional.&quot;
    </div>
  );
});
BioText.displayName = "BioText";

export default function FounderSpotlight() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia(containerRef);

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { reduceMotion } = context.conditions as {
          isDesktop: boolean;
          isMobile: boolean;
          reduceMotion: boolean;
        };

        if (reduceMotion) return;

        // Subtle parallax on the image only — no pinning so content is always reachable
        gsap.to(imageRef.current, {
          scale: 1.08,
          y: "8%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-black py-24 md:py-32 overflow-hidden"
    >
      <div className="w-full max-w-screen-xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Left Side: Portrait */}
        <div className="relative w-full aspect-[3/4] max-h-[70vh] overflow-hidden rounded-xl border border-white/10 flex-shrink-0">
          <Image
            ref={imageRef}
            src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=1200"
            alt="Founder Portrait"
            fill
            className="object-cover origin-center will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-lg font-bold uppercase tracking-widest">
              Alexander Pierce
            </h3>
            <p className="text-xs text-white/60 uppercase tracking-widest mt-1">
              Founder &amp; CEO
            </p>
          </div>
        </div>

        {/* Right Side: Bio */}
        <div className="flex flex-col justify-center gap-6">
          <h2 className="text-xs uppercase tracking-widest text-white/50 font-medium">
            The Vision
          </h2>
          <BioText />
          <div className="flex items-center gap-3 mt-4">
            <div className="w-8 h-px bg-white/30" />
            <span className="text-xs uppercase tracking-widest text-white/40">
              Alexander Pierce, Founder
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
