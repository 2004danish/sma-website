// app/studio/page.tsx
"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const customEase = [0.76, 0, 0.24, 1];

export default function StudioPage() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle the drag math
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) handleMove(e.touches[0].clientX);
  };

  // Stop dragging if mouse leaves the screen or lets go
  useEffect(() => {
    const stopDragging = () => setIsDragging(false);
    window.addEventListener('mouseup', stopDragging);
    window.addEventListener('touchend', stopDragging);
    return () => {
      window.removeEventListener('mouseup', stopDragging);
      window.removeEventListener('touchend', stopDragging);
    };
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-[#0A0A0A] pt-32 pb-24 overflow-hidden">
      
      {/* Global Background Grid Lines */}
      <div className="fixed inset-0 pointer-events-none z-0 flex justify-between px-6 md:px-12 max-w-screen-2xl mx-auto opacity-[0.03]">
        <div className="h-full w-[1px] bg-white"></div>
        <div className="h-full w-[1px] bg-white hidden md:block"></div>
        <div className="h-full w-[1px] bg-white hidden lg:block"></div>
        <div className="h-full w-[1px] bg-white hidden md:block"></div>
        <div className="h-full w-[1px] bg-white"></div>
      </div>

      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-12">
        
        {/* HEADER SECTION */}
        <header className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex flex-col leading-[0.85] tracking-tighter uppercase select-none">
            <div className="overflow-hidden pb-2">
              <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.2, ease: customEase }}
                className="text-[14vw] md:text-[8vw] font-medium text-[#FAFAFA]"
              >
                THE
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.2, ease: customEase, delay: 0.1 }}
                className="text-[14vw] md:text-[8vw] font-medium text-[#FAFAFA]"
              >
                STUDIO
              </motion.h1>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="flex flex-col gap-2 font-mono text-[10px] md:text-xs tracking-[0.2em] text-[#FAFAFA]/50 uppercase pb-4"
          >
            <p className="max-w-xs text-right">
              Bridging the gap between conceptual geometry and physical realization.
            </p>
          </motion.div>
        </header>

        {/* INTERACTIVE COMPARISON SLIDER */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: customEase }}
          className="relative w-full aspect-[4/5] md:aspect-[21/9] bg-[#111] border border-[#FAFAFA]/10 select-none group mb-24 cursor-ew-resize"
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          {/* Base Image (Reality / After) */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
              alt="Finished Architecture"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            {/* Base Image Label */}
            <div className="absolute bottom-6 right-6 font-mono text-[10px] tracking-[0.2em] uppercase text-[#FAFAFA] bg-black/40 px-3 py-1 backdrop-blur-md rounded border border-white/10 z-0">
              Reality
            </div>
          </div>

          {/* Top Image (Blueprint / Before) using clip-path to crop it based on slider position */}
          <div 
            className="absolute inset-0 z-10"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <Image
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop"
              alt="Architectural Blueprint"
              fill
              priority
              className="object-cover grayscale contrast-125"
              sizes="100vw"
            />
            {/* Top Image Label */}
            <div className="absolute bottom-6 left-6 font-mono text-[10px] tracking-[0.2em] uppercase text-[#0A0A0A] bg-[#FAFAFA]/90 px-3 py-1 backdrop-blur-md rounded z-10">
              Blueprint
            </div>
          </div>

          {/* The Draggable Slider Line */}
          <div 
            className="absolute top-0 bottom-0 z-20 flex items-center justify-center group-hover:bg-white/10 transition-colors"
            style={{ left: `${sliderPosition}%`, width: '40px', transform: 'translateX(-50%)' }}
            onMouseDown={(e) => { e.preventDefault(); setIsDragging(true); }}
            onTouchStart={(e) => { setIsDragging(true); }}
          >
            {/* Vertical Line */}
            <div className="absolute top-0 bottom-0 w-[2px] bg-[#FAFAFA] shadow-[0_0_10px_rgba(0,0,0,0.5)]"></div>
            
            {/* Drag Handle */}
            <div className={`relative w-12 h-12 bg-[#FAFAFA] rounded-full flex items-center justify-center gap-1 text-[#0A0A0A] shadow-2xl transition-transform duration-300 ${isDragging ? 'scale-90' : 'scale-100 hover:scale-110'}`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* METHODOLOGY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#FAFAFA]/10 border-t border-b border-[#FAFAFA]/10 -mx-6 md:-mx-12 px-6 md:px-12 bg-[#0A0A0A]">
          
          <div className="py-16 md:pr-12 flex flex-col gap-6">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#FAFAFA]/40 uppercase">Phase 01</span>
            <h3 className="text-3xl font-sans font-light tracking-tight text-[#FAFAFA]">Spatial Logic</h3>
            <p className="font-sans font-light text-[#FAFAFA]/60 leading-relaxed text-sm">
              Before aesthetics, we define logic. We analyze environmental impact, structural feasibility, and human flow to establish a rigorous geometric foundation.
            </p>
          </div>

          <div className="py-16 md:px-12 flex flex-col gap-6">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#FAFAFA]/40 uppercase">Phase 02</span>
            <h3 className="text-3xl font-sans font-light tracking-tight text-[#FAFAFA]">Material Truth</h3>
            <p className="font-sans font-light text-[#FAFAFA]/60 leading-relaxed text-sm">
              We do not hide structure. Concrete, steel, and timber are expressed honestly. The material palette is selected based on site context and raw durability.
            </p>
          </div>

          <div className="py-16 md:pl-12 flex flex-col gap-6">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#FAFAFA]/40 uppercase">Phase 03</span>
            <h3 className="text-3xl font-sans font-light tracking-tight text-[#FAFAFA]">Execution</h3>
            <p className="font-sans font-light text-[#FAFAFA]/60 leading-relaxed text-sm">
              The transition from render to reality requires absolute precision. We maintain strict oversight during construction to ensure the blueprint is honored.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}