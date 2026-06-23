"use client";

import { useEffect, useRef, memo } from "react";
import Image from "next/image";
import gsap from "gsap";

const BioText = memo(() => {
  const bioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bioRef.current) return;

    // IMPORTANT: We animate individual words (not lines).
    // Line-based SplitType changes on resize, causing words to jump between lines (CLS).
    // Word positions never change regardless of container width.
    const words = Array.from(
      bioRef.current.querySelectorAll(".bio-word")
    ) as HTMLElement[];

    gsap.set(words, { opacity: 0, y: 30 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: bioRef.current,
        start: "top bottom",
        end: "bottom center",
        scrub: 1.2,
      },
    });

    words.forEach((word, i) => {
      tl.to(
        word,
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.3 },
        i * 0.05
      );
    });

    return () => {
      tl.kill();
    };
  }, []);


  const QUOTE = `"Real estate is not just about transactions; it's about curating a legacy. We established Luxe Estates to redefine the boundaries of modern luxury living. Every property in our portfolio represents the pinnacle of architectural excellence, absolute privacy, and uncompromising elegance. Our vision is simple: to connect the extraordinary with the exceptional."`;

  return (
    <div
      ref={bioRef}
      className="text-2xl md:text-3xl font-light leading-relaxed tracking-normal text-white/90 text-justify hyphens-auto italic"
      style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
    >
      {/* Animate each word independently — word positions never change between screen sizes */}
      {QUOTE.split(" ").map((word, i) => (
        <span key={i} className="bio-word inline-block mr-[0.25em] will-change-transform">
          {word}
        </span>
      ))}
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
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Left Side: Portrait */}
        <div className="relative w-full aspect-[3/4] max-h-[70vh] overflow-hidden rounded-xl border border-white/10 flex-shrink-0">
          <Image
            ref={imageRef}
            src="/images/img-9.jpg"
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
