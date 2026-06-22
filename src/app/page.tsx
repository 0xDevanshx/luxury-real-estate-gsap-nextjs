"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import MagneticButton from "@/components/global/MagneticButton";

export default function Home() {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(boxRef.current, {
        x: 300,
        rotation: 360,
        scrollTrigger: {
          trigger: boxRef.current,
          start: "top center",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="flex min-h-[300vh] flex-col items-center justify-start py-24">
      <div className="h-screen flex flex-col items-center justify-center w-full gap-8">
        <h1 className="text-4xl font-bold">Global Interactive Layer Test</h1>
        <p className="text-xl">Scroll down to see the progress bar and back-to-top button.</p>

        <div className="flex gap-4 mt-8">
          <MagneticButton>
            <button
              className="px-6 py-3 bg-white text-black font-semibold rounded-lg will-change-transform"
              data-cursor="pointer"
            >
              Magnetic Button
            </button>
          </MagneticButton>

          <button
            className="px-6 py-3 border border-white text-white font-semibold rounded-lg"
            data-cursor="pointer"
          >
            Hover Me (Cursor Scale)
          </button>
        </div>
      </div>

      <div className="h-screen flex items-center justify-start w-full px-24">
        <div
          ref={boxRef}
          className="w-32 h-32 bg-zinc-800 text-white flex items-center justify-center font-bold"
          style={{ willChange: "transform" }}
          data-cursor="pointer"
        >
          Animate Me
        </div>
      </div>

      <div className="h-screen flex items-center justify-center w-full">
        <h1 className="text-4xl font-bold">End of Scroll</h1>
      </div>
    </main>
  );
}
