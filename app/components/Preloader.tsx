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

export default function Preloader() {
  const [textIndex, setTextIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // 1. Rapidly cycle through the boot sequence text
    const textInterval = setInterval(() => {
      setTextIndex((prev) => {
        if (prev < bootSequence.length - 1) return prev + 1;
        clearInterval(textInterval);
        return prev;
      });
    }, 200);

    // 2. Trigger the slide-up animation after 1.8 seconds
    const slideUpTimeout = setTimeout(() => {
      setIsComplete(true);
      document.body.style.overflow = ''; 
    }, 1800);

    // 3. Completely remove the component from the DOM
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
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }} // Hardcoded to bypass strict Vercel errors
      className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex flex-col items-center justify-center pointer-events-none"
    >
      {/* Centered geometric crosshair detail */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <div className="w-[1px] h-32 bg-[#FAFAFA]"></div>
        <div className="absolute h-[1px] w-32 bg-[#FAFAFA]"></div>
      </div>

      {/* Cycling Boot-up text */}
      <div className="font-mono text-xs md:text-sm tracking-[0.2em] text-[#FAFAFA] uppercase relative z-10">
        {bootSequence[textIndex]}
      </div>
      
      {/* Loading bar */}
      <div className="w-48 md:w-64 h-[1px] bg-white/20 mt-6 relative overflow-hidden">
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