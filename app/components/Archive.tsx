"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from './Reveal';

interface ArchiveProject {
  id: string;
  title: string;
  category: string;
  status: string;
  area: string;
  image: string;
  desc: string;
}

// Curated list of only 4 projects for the homepage teaser
const selectedProjects: ArchiveProject[] = [
  { id: "04", title: "Dr. Danish's Bungalow", category: "Architecture", status: "Completed", area: "6,200 SQ.FT", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop", desc: "A brutalist monument to residential living. Built heavily with exposed concrete and warm timber accents." },
  { id: "05", title: "Nagpur Central Library", category: "Public Building", status: "Phase 1", area: "24,000 SQ.FT", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop", desc: "Featuring sweeping light wells and open study atriums, designed to inspire the next generation of scholars." },
  { id: "06", title: "Sky Hal Business Center", category: "Commercial", status: "Implemented", area: "12,500 SQ.FT", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop", desc: "Corporate architecture that commands authority with its monolithic structure and intelligent facades." },
  { id: "07", title: "Riverfront Care Ambulatory", category: "Healthcare", status: "In Progress", area: "8,000 SQ.FT", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop", desc: "Healing spaces designed with natural material palettes, intended to reduce patient anxiety through environmental design." },
];

export default function Archive() {
  const [activeArchiveProject, setActiveArchiveProject] = useState<ArchiveProject | null>(null);

  useEffect(() => {
    if (activeArchiveProject) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    
    return () => { document.body.style.overflow = 'unset'; };
  }, [activeArchiveProject]);

  return (
    <>
      <section className="pt-8 pb-20 w-full px-6 md:px-12 max-w-screen-2xl mx-auto relative z-10 bg-[#0A0A0A]">
        <Reveal>
          <div className="flex justify-between items-end mb-0 border-b border-[#FAFAFA]/10 pb-4">
            {/* Changed from "FULL ARCHIVE" to "SELECTED WORKS" */}
            <h3 className="text-2xl md:text-3xl font-sans font-medium tracking-[0.1em] uppercase text-[#FAFAFA]">
              Selected Works
            </h3>
            <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#FAFAFA]/50 font-mono hidden md:block">
              // Curated Index
            </p>
          </div>
        </Reveal>

        <div className="flex flex-col border-b border-[#FAFAFA]/10">
          {selectedProjects.map((project, i) => (
            <Reveal key={project.id} delay={i * 50}>
              <div 
                onClick={() => setActiveArchiveProject(project)}
                className="group flex flex-col md:flex-row justify-between items-start md:items-center py-6 border-b border-[#FAFAFA]/10 hover:bg-[#111111] transition-all duration-500 cursor-pointer px-4 md:px-8 -mx-4 md:-mx-8"
              >
                <div className="flex items-center gap-6 mb-4 md:mb-0 w-full md:w-[40%]">
                  <span className="font-mono text-[10px] md:text-xs text-[#FAFAFA]/30 group-hover:text-[#B19F91] transition-colors">{project.id}</span>
                  <h4 className="text-lg md:text-xl font-sans font-light tracking-wide text-[#FAFAFA] group-hover:text-[#B19F91] transition-colors duration-500">
                    {project.title}
                  </h4>
                </div>
                
                <div className="flex flex-col md:flex-row justify-between w-full md:w-[60%] gap-3 md:gap-0 font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#FAFAFA]/50 group-hover:text-[#FAFAFA] transition-colors duration-500">
                  <span className="w-full md:w-1/3">CAT: {project.category}</span>
                  <span className="w-full md:w-1/3">STS: {project.status}</span>
                  <span className="w-full md:w-1/3 flex justify-between items-center group-hover:text-[#B19F91] transition-colors duration-500">
                    AREA: {project.area}
                    <span className="text-xl font-sans font-light transform group-hover:translate-x-4 transition-transform duration-500 text-[#FAFAFA]">
                      ↗
                    </span>
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* --- NEW: ROUTING CTA TO FULL ARCHIVE --- */}
        <Reveal delay={200}>
          <div className="mt-12 flex justify-center md:justify-end">
            <Link 
              href="/projects"
              className="group flex items-center gap-6 text-[#FAFAFA] hover:text-[#B19F91] transition-colors duration-500"
            >
              <span className="font-mono text-xs tracking-[0.2em] uppercase">
                View All 120+ Projects
              </span>
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#B19F91] transition-all">
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Slide-Up Modal (Remains exactly the same) */}
      <div 
        className={`fixed inset-0 z-[100] flex items-end justify-center transition-all duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
          activeArchiveProject ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer transition-opacity duration-[800ms]"
          onClick={() => setActiveArchiveProject(null)}
        ></div>

        <div 
          className={`relative w-full h-[90vh] bg-[#111] flex flex-col md:flex-row transform transition-transform duration-[800ms] delay-100 ease-[cubic-bezier(0.76,0,0.24,1)] rounded-t-3xl overflow-hidden ${
            activeArchiveProject ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <button 
            onClick={() => setActiveArchiveProject(null)}
            className="absolute top-6 right-6 md:top-12 md:right-12 z-50 text-[#FAFAFA] font-mono text-xs tracking-[0.2em] uppercase hover:text-[#B19F91] transition-colors bg-black/40 px-6 py-3 rounded-full backdrop-blur-sm border border-white/10"
          >
            Close ✕
          </button>

          <div className="w-full md:w-[65%] h-[50vh] md:h-full relative bg-black">
            {activeArchiveProject && (
              <Image 
                src={activeArchiveProject.image}
                alt={activeArchiveProject.title}
                fill
                sizes="(max-width: 768px) 100vw, 65vw"
                quality={90}
                className="object-cover object-center"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent md:hidden"></div>
          </div>

          <div className="w-full md:w-[35%] h-full flex flex-col justify-center p-8 md:p-16 relative">
            <span className="text-8xl md:text-[12rem] font-sans font-bold text-[#FAFAFA]/5 absolute top-0 left-8 select-none">
              {activeArchiveProject?.id}
            </span>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-sans font-light tracking-tight text-[#FAFAFA] mb-8 leading-tight">
                {activeArchiveProject?.title}
              </h2>
              
              <p className="font-sans font-light text-[#FAFAFA]/70 text-lg leading-relaxed mb-12">
                {activeArchiveProject?.desc}
              </p>

              <div className="flex flex-col gap-6 font-mono text-xs tracking-[0.2em] uppercase text-[#FAFAFA]/40 border-t border-[#FAFAFA]/10 pt-8">
                <div className="flex justify-between">
                  <span>Category</span>
                  <span className="text-[#FAFAFA]">{activeArchiveProject?.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status</span>
                  <span className="text-[#FAFAFA]">{activeArchiveProject?.status}</span>
                </div>
                <div className="flex justify-between">
                  <span>Scale</span>
                  <span className="text-[#FAFAFA]">{activeArchiveProject?.area}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}