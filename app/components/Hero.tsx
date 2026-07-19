// app/components/Hero.tsx
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const customEase = [0.76, 0, 0.24, 1];

interface HeroProject {
  id: number;
  image: string;
  alt: string;
}

const heroProjects: HeroProject[] = [
  { 
    id: 1, 
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    alt: "Syed Mobin Architecture Exterior Render"
  },
  { 
    id: 2, 
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
    alt: "Modern Concrete Villa Facade"
  },
  { 
    id: 3, 
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    alt: "Commercial High-rise Development"
  }
];

export default function Hero() {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    const heroTimer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroProjects.length);
    }, 5000);
    return () => clearInterval(heroTimer);
  }, []);

  return (
    <section className="relative h-[100dvh] w-full flex flex-col overflow-hidden bg-[#0A0A0A] z-10">
      <div className="relative w-full h-full">
        {heroProjects.map((project, index) => (
          <div 
            key={project.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentHeroIndex ? "opacity-100 scale-105 z-10" : "opacity-0 scale-100 z-0"
            }`}
          >
            <Image
              src={project.image}
              alt={project.alt}
              fill
              priority={index === 0}
              className="object-cover object-center"
              sizes="100vw"
              quality={90}
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-20 pointer-events-none"></div>

        {/* THE FIX: Removed 2xl:px-0 so px-12 padding protects the text from the scrollbar */}
        <div className="absolute inset-0 z-30 flex flex-col justify-end px-6 md:px-12 pb-12 md:pb-16 max-w-screen-2xl mx-auto w-full">
          
          <div className="flex flex-col md:flex-row justify-between items-end w-full gap-8 md:gap-0">
            
            <div className="flex flex-col leading-[0.75] tracking-tighter select-none">
              <div className="overflow-hidden pb-2">
                <motion.h1 
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.4, ease: customEase }}
                  className="text-[16vw] md:text-[9.5vw] 2xl:text-[145px] font-medium text-[#FAFAFA]"
                >
                  SYED
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1 
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.4, ease: customEase, delay: 0.1 }}
                  className="text-[16vw] md:text-[9.5vw] 2xl:text-[145px] font-medium text-[#FAFAFA]"
                >
                  MOBIN
                </motion.h1>
              </div>
            </div>

            <div className="flex flex-col gap-8 font-mono text-[10px] tracking-[0.2em] uppercase text-[#FAFAFA]/50 text-left md:text-right pb-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, ease: customEase, delay: 0.5 }}
                className="flex flex-col"
              >
                <span>Architectural</span>
                <span className="text-[#FAFAFA] font-bold">Expression</span>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, ease: customEase, delay: 0.6 }}
                className="flex flex-col"
              >
                <span>HQ // NAGPUR, IN</span>
                <span>21.1458° N, 79.0882° E</span>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}