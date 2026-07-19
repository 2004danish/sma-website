"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

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
    desc: "A masterful blend of concrete and glass, redefining residential living with uncompromising structural integrity and minimalist aesthetics."
  },
  { 
    id: "02", 
    title: "Vertex Towers", 
    loc: "Mumbai, IN", 
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070&auto=format&fit=crop",
    category: "Master Planning",
    status: "Phase 1",
    area: "12 ACRES",
    desc: "An expansive urban master plan integrating lush landscapes with modern residential towers, prioritizing sustainable community living."
  },
  { 
    id: "03", 
    title: "Brutalist Echo", 
    loc: "Bangalore, IN", 
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop",
    category: "Cultural",
    status: "In Progress",
    area: "45,000 SQ.FT",
    desc: "An exploration of raw concrete forms creating a dramatic sequence of light and shadow for a modern art museum."
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
                ease: [0.76, 0, 0.24, 1] as any, // FIXED: Added 'as any' to bypass TS errors
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeProject, setActiveProject] = useState<FeaturedProject | null>(null);

  // Lock body scroll when project modal is open
  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { 
      document.body.style.overflow = 'unset'; 
    };
  }, [activeProject]);

  return (
    <>
      <section className="relative h-[100dvh] w-full flex flex-col overflow-hidden bg-[#0A0A0A] z-10">
        
        {/* Background Images */}
        <div className="absolute inset-0 w-full h-full">
          {featuredProjects.map((project, index) => (
            <div 
              key={project.id}
              className={`absolute inset-0 z-0 transition-all duration-[2000ms] ease-in-out ${
                index === currentIndex ? "opacity-100 scale-105" : "opacity-0 scale-100"
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
          {/* Gradient Overlay to make text readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10 pointer-events-none"></div>
        </div>

        {/* Text Content */}
        <div className="relative z-20 w-full h-full flex flex-col justify-end px-6 md:px-12 pb-24 md:pb-32 max-w-screen-2xl mx-auto">
          <div className="flex flex-col w-full pointer-events-none">
            
            {/* Animated Title */}
            <div className="mb-4 md:mb-8 pointer-events-auto">
              <h2 className="text-[11vw] md:text-[6vw] 2xl:text-[92px] font-medium leading-[0.85] tracking-tighter text-[#FAFAFA] uppercase">
                <span key={currentIndex}>
                  <SplitText text={featuredProjects[currentIndex].title} />
                </span>
              </h2>
            </div>

            {/* Bottom Bar: Number, Line, Explore Button */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 w-full mb-6 pointer-events-auto">
              <span className="font-mono text-xs md:text-sm font-bold tracking-[0.2em] text-[#FAFAFA]">
                {featuredProjects[currentIndex].id} &mdash; 0{featuredProjects.length}
              </span>
              
              <div className="h-[2px] w-full md:flex-1 bg-white/60"></div>
              
              <button 
                onClick={() => setActiveProject(featuredProjects[currentIndex])}
                className="group flex items-center gap-4 font-mono text-xs md:text-sm tracking-[0.2em] uppercase hover:text-[#B19F91] transition-colors cursor-pointer relative z-30"
              >
                <span className="font-bold drop-shadow-md">
                  Explore
                </span>
                <div className="w-10 h-10 rounded-full border border-white/50 flex items-center justify-center group-hover:border-[#FAFAFA] group-hover:bg-[#FAFAFA] group-hover:text-black transition-all bg-black/40 backdrop-blur-md">
                  ↗
                </div>
              </button>
            </div>

          </div>
        </div>

        {/* Pagination Buttons (Bottom Left) */}
        <div className="absolute bottom-8 left-6 md:left-12 z-30 flex gap-8 font-mono text-xs tracking-[0.2em] text-[#FAFAFA]/40">
          {featuredProjects.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`hover:text-[#FAFAFA] transition-colors cursor-pointer ${currentIndex === i ? 'text-[#FAFAFA] font-bold' : ''}`}
            >
              0{i + 1}
            </button>
          ))}
        </div>
      </section>

      {/* Slide-out Project Details Panel */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-[100]">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
              onClick={() => setActiveProject(null)}
            />
            
            {/* Sliding Panel */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] as any }} // FIXED: Added 'as any'
              className="absolute top-0 right-0 h-full w-full md:w-1/2 lg:w-[40%] bg-[#0A0A0A] border-l border-[#FAFAFA]/10 shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center px-6 md:px-8 py-6 border-b border-[#FAFAFA]/10">
                <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#FAFAFA]/50">
                  {activeProject.category}
                </span>
                <button 
                  onClick={() => setActiveProject(null)}
                  className="text-[#FAFAFA] font-mono text-xs tracking-[0.2em] uppercase hover:text-[#B19F91] cursor-pointer"
                >
                  Close ✕
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 md:p-12">
                <div className="relative w-full aspect-[4/3] mb-8 border border-[#FAFAFA]/10 overflow-hidden">
                  <Image src={activeProject.image} alt={activeProject.title} fill className="object-cover" />
                </div>
                <h2 className="text-3xl md:text-5xl font-sans font-light tracking-tight text-[#FAFAFA] mb-6">
                  {activeProject.title}
                </h2>
                <div className="flex flex-col gap-4 mb-8 font-mono text-xs tracking-[0.2em] uppercase text-[#FAFAFA]/60">
                  <div className="flex justify-between border-b border-[#FAFAFA]/10 pb-2">
                    <span>Location</span>
                    <span className="text-[#FAFAFA]">{activeProject.loc}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#FAFAFA]/10 pb-2">
                    <span>Area</span>
                    <span className="text-[#FAFAFA]">{activeProject.area}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#FAFAFA]/10 pb-2">
                    <span>Status</span>
                    <span className="text-[#FAFAFA]">{activeProject.status}</span>
                  </div>
                </div>
                <p className="font-sans font-light text-[#FAFAFA]/70 text-base md:text-lg leading-relaxed mb-8">
                  {activeProject.desc}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}