"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

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
    <main className="flex min-h-[300vh] flex-col items-center justify-between p-24">
      <div className="h-screen flex items-center justify-center w-full">
        <h1 className="text-4xl font-bold">Scroll Down to Verify Lenis</h1>
      </div>

      <div className="h-screen flex items-center justify-start w-full px-24">
        <div
          ref={boxRef}
          className="w-32 h-32 bg-white text-black flex items-center justify-center font-bold"
          style={{ willChange: "transform" }}
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
