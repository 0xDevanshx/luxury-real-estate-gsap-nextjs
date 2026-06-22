"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp } from "lucide-react";
import MagneticButton from "./MagneticButton";

export default function BackToTop() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 600,
        end: "max",
        onEnter: () => setIsVisible(true),
        onLeaveBack: () => setIsVisible(false),
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isVisible) {
        gsap.fromTo(
          buttonRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
        );
      } else {
        gsap.to(buttonRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    });

    return () => ctx.revert();
  }, [isVisible]);

  const handleClick = () => {
    const w = window as unknown as {
      lenis?: { scrollTo: (target: number, options?: unknown) => void };
    };
    if (w.lenis) {
      w.lenis.scrollTo(0, { duration: 1.5, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 transition-opacity duration-300 ${
        isVisible ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <MagneticButton>
        <button
          ref={buttonRef}
          onClick={handleClick}
          className="p-3 rounded-full bg-white text-black will-change-transform opacity-0 translate-y-5"
          aria-label="Back to top"
          data-cursor="pointer"
        >
          <ArrowUp size={24} />
        </button>
      </MagneticButton>
    </div>
  );
}
