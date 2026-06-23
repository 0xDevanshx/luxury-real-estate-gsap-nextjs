"use client";

import { memo } from "react";

const MarqueeText = memo(
  ({ text, direction }: { text: string; direction: "left" | "right" }) => {
    // Duplicate text to create seamless infinite loop.
    // Using 4 copies to ensure it fills screens seamlessly.
    const copies = [1, 2, 3, 4];

    return (
      <div
        className={`flex whitespace-nowrap will-change-transform ${
          direction === "left"
            ? "animate-marquee-left"
            : "animate-marquee-right"
        }`}
      >
        {copies.map((i) => (
          <span
            key={i}
            className="text-[8rem] md:text-[12rem] lg:text-[16rem] font-bold leading-none uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent select-none pr-12 md:pr-24"
          >
            {text}
          </span>
        ))}
      </div>
    );
  },
);
MarqueeText.displayName = "MarqueeText";

export default function SocialMarquee() {
  return (
    <section className="relative w-full bg-[#111111] py-16 md:py-24 overflow-hidden z-10 border-t border-white/5 group">
      <div className="flex flex-col gap-4 md:gap-8">
        <div className="w-full flex">
          <MarqueeText text="OVER $10B IN SALES" direction="left" />
        </div>

        <div className="w-full flex">
          <MarqueeText text="OFF-MARKET EXCLUSIVES" direction="right" />
        </div>
      </div>
    </section>
  );
}
