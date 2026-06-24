---
name: Advanced Web Animation & Performance (GSAP + Lenis + R3F)
description: Master-level techniques for horizontal scrolljacking, Lenis smooth scroll integrations, React Three Fiber optimization, and resolving Next.js specific hydration and deployment issues.
---

# Advanced Web Animation & Performance Skill Guide

This document captures the hard-earned lessons from actively testing, simulating, and debugging complex UI animations in modern web environments (Next.js + GSAP + Lenis + React Three Fiber). By applying these principles, AI agents can bypass trial-and-error and directly implement highly performant, production-ready experiences.

## 1. GSAP Horizontal Scrolljacking (The Math)
When implementing a horizontal scroll section (where scrolling down moves elements sideways), calculating the correct translation distance is critical to avoid "empty space" at the end of the scroll track.

**The Golden Calculation:**
To ensure the last card stops exactly flush with the right edge of the screen:
```javascript
// x: the amount to translate the container horizontally
// If the container is larger than the viewport, you shift it left by the difference.
const getScrollAmount = () => {
  const containerWidth = container.scrollWidth;
  const viewportWidth = window.innerWidth;
  return -(containerWidth - viewportWidth); 
};
```

**Implementation Pattern (React):**
```javascript
useGSAP(() => {
  const container = containerRef.current;
  const mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
    const tween = gsap.to(container, {
      x: getScrollAmount,
      ease: "none"
    });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: () => `+=${getScrollAmount() * -1}`, // The scroll duration matches the width
      pin: true,
      animation: tween,
      invalidateOnRefresh: true, // Recalculate on window resize
      scrub: 1 // Smooth scrubbing
    });
  });
}, { scope: sectionRef });
```

## 2. Lenis Smooth Scroll Integration & Conflicts
Lenis takes over the browser's native scroll behavior, which causes severe bugs upon page reload. The browser tries to restore the historical scroll position while Lenis fights it, breaking GSAP `ScrollTrigger` markers.

**The Fix:**
Force manual scroll restoration and snap to the top on component mount.
```javascript
useEffect(() => {
  // Disable native scroll restoration
  if (typeof window !== "undefined" && window.history) {
    window.history.scrollRestoration = "manual";
  }
}, []);

useEffect(() => {
  // Instantly snap to top when the layout first mounts
  if (lenis) {
    lenis.scrollTo(0, { immediate: true });
  }
}, [lenis]);
```

## 3. React Three Fiber (R3F) Scroll Performance
3D scenes embedded within scrolling pages often cause massive frame drops because dynamic effects continuously recalculate during the scroll event.

**The Fix (ContactShadows):**
If using `ContactShadows` (or dynamic lighting), and the objects are static relative to the light source, ALWAYS bake the shadows. A continuous 60fps calculation of soft shadows will kill page performance during scrolling.
```jsx
// BAD: Recalculates shadows every frame
<ContactShadows resolution={1024} scale={10} blur={2} opacity={0.5} far={10} />

// GOOD: Bakes the shadow on the first frame only
<ContactShadows resolution={1024} scale={10} blur={2} opacity={0.5} far={10} frames={1} />
```

## 4. Next.js Hydration & GSAP
Next.js Server-Side Rendering (SSR) means the initial HTML structure must exactly match what the client renders.
- Never use `window.innerWidth` or DOM calculations in the initial render state or outside of `useEffect`.
- Always wrap GSAP logic in `useGSAP` (from `@gsap/react`) or a `useEffect` to ensure it only runs on the client.
- When pinning elements, GSAP wraps them in a `.pin-spacer`. Ensure your CSS doesn't rely on strict parent-child combinators (like `> div`) that `ScrollTrigger` might break.

## 5. Asset Optimization for Animation
Heavy images cause jittery scroll performance as the browser decodes them on the fly during a GSAP scrub.
- Convert all imagery to `.webp` (or `.avif`). Write Node scripts (e.g., using `sharp`) to automate this if necessary.
- Avoid CSS properties like `box-shadow` or `filter: blur` on large, moving elements during GSAP scrubbing, as they trigger expensive repaints. Use `will-change: transform` appropriately.
