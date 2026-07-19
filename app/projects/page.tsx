// app/projects/page.tsx
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const customEase = [0.76, 0, 0.24, 1];

interface Project {
  id: string;
  title: string;
  category: string;
  status: string;
  area: string;
  image: string;
}

// Expanded dataset to demonstrate filtering
const allProjects: Project[] = [
  { id: "01", title: "The Glass Pavilion", category: "Residential", status: "Completed", area: "8,500 SQ.FT", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop" },
  { id: "02", title: "Vertex Towers", category: "Master Planning", status: "Phase 1", area: "12 ACRES", image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070&auto=format&fit=crop" },
  { id: "03", title: "Aura Tech Hub", category: "Commercial", status: "In Progress", area: "28,000 SQ.FT", image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=2070&auto=format&fit=crop" },
  { id: "04", title: "Dr. Danish's Bungalow", category: "Residential", status: "Completed", area: "6,200 SQ.FT", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop" },
  { id: "05", title: "Nagpur Central Library", category: "Public", status: "Phase 1", area: "24,000 SQ.FT", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" },
  { id: "06", title: "Sky Hal Business Center", category: "Commercial", status: "Implemented", area: "12,500 SQ.FT", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" },
  { id: "07", title: "Riverfront Ambulatory", category: "Healthcare", status: "In Progress", area: "8,000 SQ.FT", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop" },
  { id: "08", title: "Mangalam Solitare", category: "Residential", status: "Completed", area: "15,000 SQ.FT", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" },
  { id: "09", title: "Techops Glory", category: "Commercial", status: "Completed", area: "45,000 SQ.FT", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" },
];

const categories = ["All", "Residential", "Commercial", "Master Planning", "Public", "Healthcare"];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = allProjects.filter(project => 
    activeFilter === "All" ? true : project.category === activeFilter
  );

  return (
    <main className="relative min-h-screen w-full bg-[#0A0A0A] pt-32 pb-24">
      
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
          <div className="overflow-hidden">
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.2, ease: customEase }}
              className="text-6xl md:text-8xl font-sans font-medium tracking-tighter text-[#FAFAFA] uppercase leading-none"
            >
              Archive
            </motion.h1>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="font-mono text-xs tracking-[0.2em] text-[#FAFAFA]/50 uppercase"
          >
            {allProjects.length} Projects // {new Date().getFullYear()}
          </motion.div>
        </header>

        {/* STICKY FILTER BAR */}
        <div className="sticky top-8 z-40 mb-12 mix-blend-difference py-4">
          <div className="flex flex-wrap gap-6 font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`relative pb-2 transition-colors duration-300 ${
                  activeFilter === category ? "text-[#FAFAFA]" : "text-[#FAFAFA]/40 hover:text-[#FAFAFA]/70"
                }`}
              >
                {category}
                {/* Animated underline for active state */}
                {activeFilter === category && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute left-0 bottom-0 w-full h-[1px] bg-[#FAFAFA]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* FLUID PROJECT GRID */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: customEase }}
                className="group relative flex flex-col cursor-pointer"
              >
                {/* Image Container with Hover Zoom */}
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#111111] mb-6">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110"
                  />
                  {/* Subtle dark overlay that lifts on hover */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700"></div>
                </div>

                {/* Metadata */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl md:text-2xl font-sans font-light tracking-tight text-[#FAFAFA]">
                      {project.title}
                    </h2>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-[#FAFAFA]/30 mt-1">
                      {project.id}
                    </span>
                  </div>
                  
                  <div className="flex gap-4 font-mono text-[10px] tracking-[0.2em] uppercase text-[#FAFAFA]/50 border-t border-[#FAFAFA]/10 pt-4 mt-2">
                    <span>{project.category}</span>
                    <span>//</span>
                    <span>{project.status}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </main>
  );
}