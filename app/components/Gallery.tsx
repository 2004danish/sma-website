// app/components/Gallery.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const customEase = [0.76, 0, 0.24, 1];

interface FeaturedProject {
  id: string;
  title: string;
  loc: string;
  image: string;
  category: string;
  status: string;
  area: string;
  desc: string;
}

const featuredProjects: FeaturedProject[] = [
  { 
    id: "01", 
    title: "The Glass Pavilion", 
    loc: "Pune, IN", 
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop",
    category: "Residential",
    status: "Completed",
    area: "8,500 SQ.FT",
    desc: "A masterful blend of concrete and glass, redefining residential living with uncompromising structural integrity and minimalist aesthetics. The pavilion seamlessly integrates with the surrounding landscape, blurring the lines between indoor comfort and outdoor raw nature."
  },
  { 
    id: "02", 
    title: "Vertex Towers", 
    loc: "Mumbai, IN", 
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070&auto=format&fit=crop",
    category: "Master Planning",
    status: "Phase 1",
    area: "12 ACRES",
    desc: "An expansive urban master plan integrating lush landscapes with modern residential towers, prioritizing sustainable community living. The structural design optimizes wind flow and natural light for all 400 residential units."
  },
  { 
    id: "03", 
    title: "Aura Tech Hub", 
    loc: "Nagpur, IN", 
    image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=2070&auto=format&fit=crop",
    category: "Commercial",
    status: "In Progress",
    area: "28,000 SQ.FT",
    desc: "Corporate architecture that commands authority, utilizing parametric facades to reduce heat glare while maximizing natural daylight. Features a triple-height atrium and cantilevered meeting spaces."
  }
];

const SplitText = ({ text }: { text: string }) => {
  return (
    <div className="flex flex-wrap overflow-hidden pt-2 pb-4">
      {text.split(" ").map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block overflow-hidden mr-[0.25em]">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={charIndex}
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{
                duration: 1.2,
                ease: customEase,
                delay: (wordIndex * 0.05) + (charIndex * 0.02),
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </div>
  );
};

export default function Gallery() {
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [isGalleryAutoPlaying, setIsGalleryAutoPlaying] = useState(true);
  const [activeGalleryProject, setActiveGalleryProject] = useState<FeaturedProject | null>(null);

  useEffect(() => {
    if (!isGalleryAutoPlaying) return;
    const galleryTimer = setInterval(() => {
      setCurrentGalleryIndex((prev) => (prev + 1) % featuredProjects.length);
    }, 6000);
    return () => clearInterval(galleryTimer);
  }, [isGalleryAutoPlaying]);

  useEffect(() => {
    if (activeGalleryProject) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [activeGalleryProject]);

  return (
    <>
      <section className="relative h-[100dvh] w-full flex flex-col overflow-hidden bg-[#0A0A0A] z-10">
        
        {/* Background Images */}
        <div className="absolute inset-0 w-full h-full">
          {featuredProjects.map((project, index) => (
            <div 
              key={project.id}
              className={`absolute inset-0 z-0 transition-all duration-[2000ms] ease-in-out ${
                index === currentGalleryIndex ? "opacity-100 scale-105" : "opacity-0 scale-100"
              }`}
            >
              <Image 
                src={project.image}
                alt={project.title}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
          ))}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10 pointer-events-none"></div>
        </div>

        {/* CONTENT LAYER */}
        <div className="relative z-20 w-full h-full flex flex-col justify-end px-6 md:px-12 pb-24 md:pb-32 max-w-screen-2xl mx-auto">
          <div className="flex flex-col w-full pointer-events-none">
            
            <div className="mb-4 md:mb-8 pointer-events-auto">
              <h2 className="text-[11vw] md:text-[6vw] 2xl:text-[92px] font-medium leading-[0.85] tracking-tighter text-[#FAFAFA] uppercase">
                <span key={currentGalleryIndex}>
                  <SplitText text={featuredProjects[currentGalleryIndex].title} />
                </span>
              </h2>
            </div>

            {/* ENHANCED UI LINE & EXPLORE BUTTON */}
            <div className="flex items-center gap-6 w-full mb-6 pointer-events-auto">
              <span className="font-mono text-xs md:text-sm font-bold tracking-[0.2em] text-[#FAFAFA] whitespace-nowrap drop-shadow-md">
                {featuredProjects[currentGalleryIndex].id} &mdash; 0{featuredProjects.length}
              </span>
              
              <div className="h-[2px] flex-1 bg-white/60 drop-shadow-md"></div>
              
              <button 
  onClick={() => setActiveGalleryProject(featuredProjects[currentGalleryIndex])}
  className="group flex items-center gap-4 font-mono text-xs md:text-sm tracking-[0.2em] uppercase hover:text-[#B19F91] transition-colors cursor-pointer relative z-30"
>
  <span className="font-bold drop-shadow-md hidden md:inline">
    Explore
  </span>
  
  <div className="w-10 h-10 rounded-full border border-white/50 flex items-center justify-center group-hover:border-[#FAFAFA] group-hover:bg-[#FAFAFA] group-hover:text-black transition-all bg-black/40 backdrop-blur-md">
    ↗
  </div>
</button>
            </div>

            {/* METADATA */}
            <p className="font-mono text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#FAFAFA]/80 uppercase bg-black/40 self-start px-4 py-2 backdrop-blur-md rounded border border-white/10 pointer-events-auto">
              {featuredProjects[currentGalleryIndex].category} // {featuredProjects[currentGalleryIndex].loc}
            </p>
          </div>
        </div>

        {/* CONTROLS LAYER */}
        <div className="absolute bottom-8 left-6 md:left-12 z-30 flex gap-8 font-mono text-xs tracking-[0.2em] text-[#FAFAFA]/40">
          {featuredProjects.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentGalleryIndex(i);
                setIsGalleryAutoPlaying(false);
              }}
              className={`hover:text-[#FAFAFA] transition-colors ${currentGalleryIndex === i ? 'text-[#FAFAFA] font-bold' : ''}`}
            >
              0{i + 1}
            </button>
          ))}
        </div>
      </section>

      {/* Slide-in Drawer Modal */}
      <AnimatePresence>
        {activeGalleryProject && (
          <div className="fixed inset-0 z-[100]">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
              onClick={() => setActiveGalleryProject(null)}
            ></motion.div>

            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.8, ease: customEase }}
              className="absolute top-0 right-0 h-full w-full md:w-1/2 lg:w-[40%] bg-[#0A0A0A] border-l border-[#FAFAFA]/10 shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center px-8 py-6 border-b border-[#FAFAFA]/10">
                <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#FAFAFA]/50">
                  {activeGalleryProject.category} | {activeGalleryProject.loc}
                </span>
                <button 
                  onClick={() => setActiveGalleryProject(null)}
                  className="text-[#FAFAFA] font-mono text-xs tracking-[0.2em] uppercase hover:text-[#B19F91] transition-colors flex items-center gap-2"
                >
                  Close ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto overflow-x-hidden p-8 md:p-12">
                <div className="relative w-full aspect-[4/3] mb-10 border border-[#FAFAFA]/10 overflow-hidden">
                  <Image 
                    src={activeGalleryProject.image}
                    alt={activeGalleryProject.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center"
                  />
                </div>
                
                <h2 className="text-4xl md:text-5xl font-sans font-light tracking-tight text-[#FAFAFA] mb-8 leading-tight">
                  {activeGalleryProject.title}
                </h2>
                
                <p className="font-sans font-light text-[#FAFAFA]/70 text-lg leading-relaxed mb-12">
                  {activeGalleryProject.desc}
                </p>

                <div className="flex flex-col gap-6 font-mono text-xs tracking-[0.2em] uppercase text-[#FAFAFA]/50 border-t border-[#FAFAFA]/10 pt-8">
                  <div className="flex justify-between">
                    <span>Category</span>
                    <span className="text-[#FAFAFA]">{activeGalleryProject.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status</span>
                    <span className="text-[#FAFAFA]">{activeGalleryProject.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Scale</span>
                    <span className="text-[#FAFAFA]">{activeGalleryProject.area}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}