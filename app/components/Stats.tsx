// app/components/Stats.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import Reveal from './Reveal';

function AnimatedNumber({ value, duration = 2500 }: { value: number, duration?: number }) {
  // ... (keep your existing AnimatedNumber logic exactly the same)
  const [count, setCount] = useState(0);
  const domRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) setIsVisible(true);
    }, { threshold: 0.5 });
    
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * value));
      
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };
    
    animationFrameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [isVisible, value, duration]);

  return <span ref={domRef}>{count}</span>;
}

export default function Stats() {
  return (
    // Changed py-12 to pt-12 pb-0 to kill the dead space below the grid
    <section className="w-full px-6 md:px-12 max-w-screen-2xl mx-auto relative z-10 pt-12 pb-0">
      <Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#FAFAFA]/10 bg-[#0A0A0A] border-b border-[#FAFAFA]/10">
          
          {/* Changed py-16 to py-10 md:py-12 for a sleeker, wider proportion */}
          <div className="flex flex-col items-center justify-center py-10 md:py-12 px-8 text-center group hover:bg-[#111111] transition-colors duration-500 cursor-default">
            <span className="text-6xl md:text-8xl font-sans font-light text-[#FAFAFA] group-hover:text-[#B19F91] transition-colors duration-500">
              <AnimatedNumber value={19} duration={2000} />
            </span>
            <span className="mt-4 md:mt-6 text-[10px] md:text-xs tracking-[0.2em] uppercase font-mono text-[#FAFAFA]/50 group-hover:text-[#FAFAFA] transition-colors duration-500">Years Experience</span>
          </div>
          
          <div className="flex flex-col items-center justify-center py-10 md:py-12 px-8 text-center group hover:bg-[#111111] transition-colors duration-500 cursor-default">
            <span className="text-6xl md:text-8xl font-sans font-light text-[#FAFAFA] group-hover:text-[#B19F91] transition-colors duration-500 flex items-start">
              <AnimatedNumber value={120} duration={2500} />
              <span className="text-4xl md:text-6xl text-[#FAFAFA]/30 font-light">+</span>
            </span>
            <span className="mt-4 md:mt-6 text-[10px] md:text-xs tracking-[0.2em] uppercase font-mono text-[#FAFAFA]/50 group-hover:text-[#FAFAFA] transition-colors duration-500">Built Projects</span>
          </div>
          
          <div className="flex flex-col items-center justify-center py-10 md:py-12 px-8 text-center group hover:bg-[#111111] transition-colors duration-500 cursor-default">
            <span className="text-6xl md:text-8xl font-sans font-light text-[#FAFAFA] group-hover:text-[#B19F91] transition-colors duration-500 flex items-start">
              <AnimatedNumber value={40} duration={3000} />
              <span className="text-4xl md:text-6xl text-[#FAFAFA]/30 font-light">+</span>
            </span>
            <span className="mt-4 md:mt-6 text-[10px] md:text-xs tracking-[0.2em] uppercase font-mono text-[#FAFAFA]/50 group-hover:text-[#FAFAFA] transition-colors duration-500">Master Plans</span>
          </div>

        </div>
      </Reveal>
    </section>
  );
}