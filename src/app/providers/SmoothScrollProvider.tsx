"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Initialize Lenis
    const lenis = new Lenis({
      // If user prefers reduced motion, disable smoothing (or you can pass duration: 0 / smoothWheel: false)
      // Setting lerp to 1 disables the smooth easing, making it instant
      lerp: prefersReducedMotion ? 1 : 0.1,
      smoothWheel: !prefersReducedMotion,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Global matchMedia for ScrollTrigger to handle reduced motion
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: reduce)", () => {
      // In reduced motion, we disable scroll triggers that scrub by skipping them
      // This is usually handled per component, but setting up the matchMedia here
      // acts as a global entry point if needed.
      return () => {};
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      mm.revert();
    };
  }, []);

  return <>{children}</>;
}
