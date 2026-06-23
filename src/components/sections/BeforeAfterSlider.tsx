"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BEFORE_IMAGE = "/before.png";
const AFTER_IMAGE = "/after.png";

export default function BeforeAfterSlider() {
  const [position, setPosition] = useState(50); // Percentage 0-100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Helper to calculate position based on pointer event
  const calculatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Calculate relative x position, clamping between 0 and 1
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const newPosition = (x / rect.width) * 100;
    setPosition(newPosition);
  }, []);

  // Pointer event handlers
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true);
    calculatePosition(e.clientX);
  }, [calculatePosition]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    calculatePosition(e.clientX);
  }, [isDragging, calculatePosition]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Global mouse move/up listeners to ensure drag continues even if pointer leaves the container slightly
  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseMove = (e: MouseEvent) => calculatePosition(e.clientX);
    const handleGlobalMouseUp = () => setIsDragging(false);

    const handleTouchMove = (e: TouchEvent) => calculatePosition(e.touches[0].clientX);

    window.addEventListener("mousemove", handleGlobalMouseMove);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    
    // Also handle touch globally if dragging started
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleGlobalMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleGlobalMouseUp);
    };
  }, [isDragging, calculatePosition]);


  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPosition((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <section className="relative w-full bg-[#0a0a0a] text-white py-24 md:py-32 z-10">
      <div className="max-w-[1200px] mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-4">Transforming Visions</h2>
          <p className="text-white/60 tracking-widest uppercase text-sm">Drag to compare Before & After</p>
        </div>

        <div 
          ref={containerRef}
          className="relative w-full aspect-video md:aspect-[21/9] rounded-xl overflow-hidden cursor-ew-resize select-none touch-none bg-zinc-900"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          {/* Before Image (Bottom) */}
          <div className="absolute inset-0">
            <Image 
              src={BEFORE_IMAGE}
              alt="Unrenovated Space"
              fill
              className="object-cover object-center grayscale-[0.3]"
              sizes="100vw"
            />
            <div className="absolute top-6 right-6 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-white">
              Before
            </div>
          </div>

          {/* After Image (Top, Clipped) */}
          <div 
            className="absolute inset-0 z-10"
            style={{ clipPath: `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)` }}
          >
            <Image 
              src={AFTER_IMAGE}
              alt="Renovated Luxury Space"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-black">
              After
            </div>
          </div>

          {/* Slider Handle Line */}
          <div 
            className="absolute top-0 bottom-0 w-[2px] bg-white z-20 pointer-events-none"
            style={{ left: `${position}%`, transform: "translateX(-50%)" }}
          >
            {/* Slider Handle Button */}
            <button
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] pointer-events-auto transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white/50"
              aria-label="Drag or use arrow keys to compare images"
              tabIndex={0}
              onKeyDown={handleKeyDown}
              // Stop pointer events on the button from bubbling up and breaking the drag math if they click the button exactly
              onPointerDown={(e) => {
                e.stopPropagation(); // But we still want to drag if they click the button!
                handlePointerDown(e);
              }}
            >
              <div className="flex gap-0.5 text-black">
                <ChevronLeft size={20} className="mr-[-6px]" />
                <ChevronRight size={20} />
              </div>
            </button>
          </div>
          
        </div>

      </div>
    </section>
  );
}
