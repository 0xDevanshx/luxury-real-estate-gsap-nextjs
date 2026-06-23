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
    // Force scroll to top on reload
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Initialize Lenis
    const lenis = new Lenis({
      lerp: prefersReducedMotion ? 1 : 0.1,
      smoothWheel: !prefersReducedMotion,
    });

    // Force Lenis to strictly start at the top
    lenis.scrollTo(0, { immediate: true });

    Object.assign(window, { lenis });

    // Hack for Safari/Chrome aggressive scroll memory
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };

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
      Object.assign(window, { lenis: undefined });
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      mm.revert();
    };
  }, []);

  return <>{children}</>;
}
