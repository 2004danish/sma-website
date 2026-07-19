"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function BlueprintSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <div className="w-full max-w-screen-xl mx-auto px-6 md:px-12 my-24">
      
      <div className="flex justify-between items-end mb-8 border-b border-[#FAFAFA]/20 pb-4">
        <h2 className="text-3xl md:text-5xl font-light tracking-tighter uppercase text-[#FAFAFA]">
          Process &mdash; Reality
        </h2>
        <span className="font-mono text-xs tracking-[0.2em] text-[#FAFAFA]/50 uppercase hidden md:block">
          Drag to compare
        </span>
      </div>

      <div className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden group select-none">
        
        {/* Underlay: Blueprint / Sketch Image */}
        <div className="absolute inset-0 w-full h-full bg-[#111]">
          <Image 
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop" 
            alt="Architectural Blueprint" 
            fill 
            className="object-cover grayscale contrast-125"
          />
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 font-mono text-[10px] tracking-[0.2em] uppercase text-white border border-white/20">
            Concept
          </div>
        </div>

        {/* Overlay: Render / Reality Image (Clipped) */}
        <div 
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image 
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop" 
            alt="Finished Building" 
            fill 
            className="object-cover"
          />
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 font-mono text-[10px] tracking-[0.2em] uppercase text-white border border-white/20">
            Reality
          </div>
        </div>

        {/* The Slider Divider Line */}
        <div 
          className="absolute top-0 bottom-0 w-[2px] bg-[#FAFAFA] pointer-events-none z-20 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#FAFAFA] rounded-full flex items-center justify-center shadow-lg">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180 absolute">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </div>
        </div>

        {/* Invisible Range Input */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={(e) => setSliderPosition(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
        />

      </div>
    </div>
  );
}