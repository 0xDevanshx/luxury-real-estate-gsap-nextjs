"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { Apple, Play } from "lucide-react";
import Link from "next/link";

export default function AppShowcase() {
  const phoneRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!phoneRef.current) return;
    const rect = phoneRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;  
    
    // Calculate rotation: maximum 15 degrees
    const rY = ((x / rect.width) - 0.5) * 30; 
    const rX = ((y / rect.height) - 0.5) * -30; 

    setRotateX(rX);
    setRotateY(rY);
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setRotateX(0);
    setRotateY(0);
    setIsHovering(false);
  }, []);

  return (
    <section className="relative w-full bg-white text-black py-32 md:py-48 z-10">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">
        
        {/* Left Side: Copy & Badges */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
          <span className="text-sm font-bold tracking-widest uppercase text-black/50 mb-6 block">
            The VIP Client Portal
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight mb-8">
            Your portfolio, <br />
            in your pocket.
          </h2>
          <p className="text-lg text-black/70 font-light max-w-md mx-auto lg:mx-0 mb-12">
            Experience absolute control over your global assets. Browse off-market masterpieces, communicate securely with your dedicated advisor, and sign contracts with biometric encryption.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            {/* App Store Badge */}
            <Link href="#" className="flex items-center gap-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-xl px-6 py-4 transition-colors">
              <Apple size={32} />
              <div className="flex flex-col items-start">
                <span className="text-xs text-white/70 uppercase tracking-widest">Download on the</span>
                <span className="text-xl font-medium leading-none mt-1">App Store</span>
              </div>
            </Link>

            {/* Google Play Badge */}
            <Link href="#" className="flex items-center gap-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-xl px-6 py-4 transition-colors">
              <Play size={26} className="fill-white" />
              <div className="flex flex-col items-start">
                <span className="text-xs text-white/70 uppercase tracking-widest">Get it on</span>
                <span className="text-xl font-medium leading-none mt-1">Google Play</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Right Side: 3D Phone Mockup */}
        <div 
          className="w-full lg:w-1/2 flex justify-center items-center perspective-[1000px]"
        >
          <div
            ref={phoneRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-[300px] h-[600px] rounded-[3rem] bg-black p-4 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border-[8px] border-zinc-800"
            style={{
              transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
              transition: isHovering ? "none" : "transform 0.5s ease-out",
              transformStyle: "preserve-3d"
            }}
          >
            {/* Inner Screen */}
            <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-zinc-900 shadow-inner">
              <Image 
                src="/images/img-1.jpg"
                alt="App Interface Preview"
                fill
                className="object-cover"
                sizes="300px"
              />
              
              {/* Dynamic screen glare effect based on tilt */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.1) 25%, transparent 30%)`,
                  transform: `translateX(${rotateY * 2}%)`,
                  transition: isHovering ? "none" : "transform 0.5s ease-out",
                }}
              />
            </div>

            {/* Dynamic outer reflection based on tilt to enhance 3D feel */}
            <div 
              className="absolute inset-0 rounded-[3rem] pointer-events-none shadow-[inset_0_0_20px_rgba(255,255,255,0.2)]"
              style={{
                transform: "translateZ(1px)" // Keep it above the screen
              }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
