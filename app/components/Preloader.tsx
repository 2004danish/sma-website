// app/components/Preloader.tsx
"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const bootSequence = [
  "SYS.INIT( )",
  "ESTABLISHING SERVER CONNECTION...",
  "LOADING ASSETS [14%]",
  "LOADING ASSETS [48%]",
  "LOADING ASSETS [89%]",
  "RENDERING GEOMETRY [100%]",
  "ACCESS GRANTED"
];

const customEase = [0.76, 0, 0.24, 1];

export default function Preloader() {
  const [textIndex, setTextIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(false);

  useEffect(() => {
    // 1. Lock the scroll so the user can't scroll while the preloader is active
    document.body.style.overflow = 'hidden';

    // 2. Rapidly cycle through the boot sequence text
    const textInterval = setInterval(() => {
      setTextIndex((prev) => {
        if (prev < bootSequence.length - 1) return prev + 1;
        clearInterval(textInterval);
        return prev;
      });
    }, 200); // Changes text every 200 milliseconds

    // 3. Trigger the slide-up animation after 1.8 seconds
    const slideUpTimeout = setTimeout(() => {
      setIsComplete(true);
      document.body.style.overflow = 'unset'; // Unlock scroll
    }, 1800);

    // 4. Completely remove the component from the DOM after animation finishes
    const unmountTimeout = setTimeout(() => {
      setIsUnmounted(true);
    }, 2800);

    return () => {
      clearInterval(textInterval);
      clearTimeout(slideUpTimeout);
      clearTimeout(unmountTimeout);
    };
  }, []);

  if (isUnmounted) return null;

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: isComplete ? "-100vh" : 0 }}
      transition={{ duration: 1, ease: customEase }}
      className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex flex-col items-center justify-center pointer-events-none"
    >
      {/* Centered crosshair detail */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <div className="w-[1px] h-32 bg-[#FAFAFA]"></div>
        <div className="absolute h-[1px] w-32 bg-[#FAFAFA]"></div>
      </div>

      {/* Boot-up text */}
      <div className="font-mono text-xs md:text-sm tracking-[0.2em] text-[#FAFAFA] uppercase relative z-10">
        {bootSequence[textIndex]}
      </div>
      
      {/* Loading bar */}
      <div className="w-48 h-[1px] bg-white/20 mt-6 relative overflow-hidden">
        <motion.div 
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.4, ease: "linear" }}
          className="absolute top-0 left-0 h-full bg-[#FAFAFA]"
        />
      </div>
    </motion.div>
  );
}