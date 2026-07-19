// app/components/Cursor.tsx
"use client";

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor() {
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  // Track raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Apply a rigid, highly responsive spring for that "tactile" CAD feel
  const springConfig = { damping: 30, stiffness: 700, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable on mobile/touch devices entirely
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // The Magic Trick: Check if the hovered element has a data-cursor attribute
      const target = e.target as HTMLElement;
      const cursorElement = target.closest('[data-cursor]');

      if (cursorElement) {
        setCursorText(cursorElement.getAttribute('data-cursor') || "");
      } else {
        setCursorText("");
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  // Don't render anything on touchscreens
  if (typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:flex items-center justify-center"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%', // Centers the cursor exactly on the mouse tip
        translateY: '-50%',
        opacity: isVisible ? 1 : 0
      }}
    >
      {cursorText ? (
        // ACTIVE STATE (Hovering over a link/button)
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-[#FAFAFA] text-[#0A0A0A] font-mono text-[10px] px-3 py-1.5 tracking-[0.2em] uppercase font-bold"
        >
          [ {cursorText} ]
        </motion.div>
      ) : (
        // DEFAULT STATE (The Drafting Crosshair)
        <div className="relative w-6 h-6 flex items-center justify-center">
          <div className="absolute w-full h-[1px] bg-[#FAFAFA]"></div>
          <div className="absolute h-full w-[1px] bg-[#FAFAFA]"></div>
        </div>
      )}
    </motion.div>
  );
}