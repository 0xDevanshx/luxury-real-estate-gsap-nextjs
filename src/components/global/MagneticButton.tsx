"use client";

import { useRef, ReactNode, MouseEvent } from "react";
import { motion, useSpring } from "motion/react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
}

export default function MagneticButton({
  children,
  className = "",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useSpring(0, { stiffness: 150, damping: 20 });
  const y = useSpring(0, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Limit movement to max ±12px
    const maxDist = 12;
    const boundedX = Math.max(-maxDist, Math.min(maxDist, mouseX * 0.5));
    const boundedY = Math.max(-maxDist, Math.min(maxDist, mouseY * 0.5));

    x.set(boundedX);
    y.set(boundedY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block will-change-transform ${className}`}
      style={{ x, y }}
      data-magnetic
    >
      {children}
    </motion.div>
  );
}
