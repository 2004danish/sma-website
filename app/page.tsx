"use client";
import { useState, useEffect, useRef } from 'react';

// --- ANIMATION COMPONENTS ---
function Reveal({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setIsVisible(true);
      });
    }, { threshold: 0.15 });
    
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);
  
  return (
    <div 
      ref={domRef} 
      className={`transition-all duration-[1200ms] ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`} 
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function AnimatedNumber({ value, duration = 2500 }: { value: number, duration?: number }) {
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
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * value));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [isVisible, value, duration]);

  return <span ref={domRef}>{count}</span>;
}

export default function Home() {
  // 1. BRAND HERO IMAGES
  const heroProjects = [
    { id: 1, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" },
    { id: 2, image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop" },
    { id: 3, image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" }
  ];

  // 2. FEATURED GALLERY IMAGES
  const featuredProjects = [
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

  // 3. ARCHIVE PROJECTS
  const archiveProjects = [
    { id: "04", title: "Dr. Danish's Bungalow", category: "Architecture", status: "Completed", area: "6,200 SQ.FT", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop", desc: "A brutalist monument to residential living. Built heavily with exposed concrete and warm timber accents." },
    { id: "05", title: "Nagpur Central Library", category: "Public Building", status: "Phase 1", area: "24,000 SQ.FT", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop", desc: "Featuring sweeping light wells and open study atriums, designed to inspire the next generation of scholars." },
    { id: "06", title: "Sky Hal Business Center", category: "Commercial", status: "Implemented", area: "12,500 SQ.FT", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop", desc: "Corporate architecture that commands authority with its monolithic structure and intelligent facades." },
    { id: "07", title: "Riverfront Care Ambulatory", category: "Healthcare", status: "In Progress", area: "8,000 SQ.FT", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop", desc: "Healing spaces designed with natural material palettes, intended to reduce patient anxiety through environmental design." },
  ];

  // STATES
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [isGalleryAutoPlaying, setIsGalleryAutoPlaying] = useState(true);
  
  const [activeGalleryProject, setActiveGalleryProject] = useState<any>(null);
  const [activeArchiveProject, setActiveArchiveProject] = useState<any>(null);

  // TIMERS
  useEffect(() => {
    const heroTimer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroProjects.length);
    }, 5000);
    return () => clearInterval(heroTimer);
  }, [heroProjects.length]);

  useEffect(() => {
    if (!isGalleryAutoPlaying) return;
    const galleryTimer = setInterval(() => {
      setCurrentGalleryIndex((prev) => (prev + 1) % featuredProjects.length);
    }, 6000);
    return () => clearInterval(galleryTimer);
  }, [isGalleryAutoPlaying, featuredProjects.length]);

  useEffect(() => {
    if (activeGalleryProject || activeArchiveProject) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [activeGalleryProject, activeArchiveProject]);

  return (
    <main className="relative w-full overflow-x-hidden">
      
      <div className="fixed inset-0 pointer-events-none z-0 flex justify-between px-6 md:px-12 max-w-screen-2xl mx-auto opacity-[0.03]">
        <div className="h-full w-[1px] bg-white"></div>
        <div className="h-full w-[1px] bg-white hidden md:block"></div>
        <div className="h-full w-[1px] bg-white hidden lg:block"></div>
        <div className="h-full w-[1px] bg-white hidden md:block"></div>
        <div className="h-full w-[1px] bg-white"></div>
      </div>

      {/* 1. BRAND HERO SECTION */}
      <section className="relative h-screen w-full flex flex-col overflow-hidden bg-[#0A0A0A] z-10">
        <div className="relative w-full h-full">
          {heroProjects.map((project, index) => (
            <div 
              key={project.id}
              className={`absolute inset-0 z-0 transition-opacity duration-[3000ms] ease-in-out ${
                index === currentHeroIndex ? "opacity-100 scale-105" : "opacity-0 scale-100"
              }`}
              style={{
                backgroundImage: `url('${project.image}')`,
                backgroundPosition: "center",
                backgroundSize: "cover"
              }}
            ></div>
          ))}

          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#0A0A0A] z-10 pointer-events-none"></div>

          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6">
            <Reveal>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans font-medium uppercase tracking-[0.2em] text-white text-center drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                SYED MOBIN
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 text-[10px] md:text-xs tracking-[0.5em] uppercase text-white font-bold font-mono bg-black/20 px-4 py-1 backdrop-blur-sm border border-white/10">
                Architectural Expression
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2. ELEMENTIS-STYLE INTERACTIVE GALLERY */}
      <section className="relative h-[85vh] w-full flex flex-col overflow-hidden bg-[#0A0A0A] z-10 border-t border-[#FAFAFA]/10">
        <div className="absolute inset-0 w-full h-full">
          {featuredProjects.map((project, index) => (
            <div 
              key={project.id}
              className={`absolute inset-0 z-0 transition-all duration-[2000ms] ease-in-out ${
                index === currentGalleryIndex ? "opacity-100 scale-105" : "opacity-0 scale-100"
              }`}
              style={{
                backgroundImage: `url('${project.image}')`,
                backgroundPosition: "center",
                backgroundSize: "cover"
              }}
            ></div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10 pointer-events-none"></div>
        </div>

        <div className="relative z-20 w-full h-full flex flex-col justify-center px-6 md:px-12 max-w-screen-2xl mx-auto">
          <div className="flex flex-col max-w-4xl mt-12">
            <div className="overflow-hidden mb-6">
              <h2 
                key={currentGalleryIndex} 
                className="text-5xl md:text-7xl lg:text-[7rem] font-sans font-light tracking-tight text-[#FAFAFA] leading-none animate-[slideUp_1s_ease-out]"
              >
                {featuredProjects[currentGalleryIndex].title}
              </h2>
            </div>

            <div className="flex items-center gap-6 w-full opacity-80 mb-6">
              <span className="font-mono text-xs tracking-[0.2em] text-[#FAFAFA] whitespace-nowrap">
                {featuredProjects[currentGalleryIndex].id} &mdash; 0{featuredProjects.length}
              </span>
              <div className="h-[1px] flex-1 bg-white/30"></div>
              <button 
                onClick={() => setActiveGalleryProject(featuredProjects[currentGalleryIndex])}
                className="group flex items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase hover:text-[#B19F91] transition-colors cursor-pointer relative z-30"
              >
                <span>Explore</span>
                <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover:border-[#B19F91] transition-colors bg-black/20 backdrop-blur-sm">
                  ↗
                </div>
              </button>
            </div>

            <p className="font-mono text-xs tracking-[0.2em] text-[#FAFAFA]/60 uppercase bg-black/20 self-start px-3 py-1 backdrop-blur-sm rounded">
              {featuredProjects[currentGalleryIndex].category} // {featuredProjects[currentGalleryIndex].loc}
            </p>
          </div>

          <div className="absolute bottom-12 right-6 md:right-12 flex gap-4 md:gap-6 z-30">
            {featuredProjects.map((project, i) => (
              <div 
                key={project.id}
                onClick={() => {
                  setCurrentGalleryIndex(i);
                  setIsGalleryAutoPlaying(false); 
                }}
                className="flex flex-col gap-2 cursor-pointer group"
              >
                <span className={`font-mono text-[10px] tracking-[0.2em] transition-colors ${currentGalleryIndex === i ? 'text-[#FAFAFA]' : 'text-[#FAFAFA]/40 group-hover:text-[#FAFAFA]/70'}`}>
                  {project.id}.
                </span>
                <div 
                  className={`w-24 h-16 md:w-32 md:h-20 bg-cover bg-center transition-all duration-500 overflow-hidden ${
                    currentGalleryIndex === i ? 'border border-[#FAFAFA] opacity-100 scale-100' : 'border border-transparent opacity-40 scale-95 group-hover:opacity-70'
                  }`}
                  style={{ backgroundImage: `url('${project.image}')` }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. BUSINESS DATA / AUTHORITY STATS */}
      <section className="w-full px-6 md:px-12 max-w-screen-2xl mx-auto relative z-10 py-12">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#FAFAFA]/10 bg-[#0A0A0A] border-b border-[#FAFAFA]/10">
            <div className="flex flex-col items-center justify-center py-16 px-8 text-center group hover:bg-[#111111] transition-colors duration-500 cursor-default">
              <span className="text-6xl md:text-8xl font-sans font-light text-[#FAFAFA] group-hover:text-[#B19F91] transition-colors duration-500">
                <AnimatedNumber value={19} duration={2000} />
              </span>
              <span className="mt-6 text-xs tracking-[0.2em] uppercase font-mono text-[#FAFAFA]/50 group-hover:text-[#FAFAFA] transition-colors duration-500">Years Experience</span>
            </div>
            <div className="flex flex-col items-center justify-center py-16 px-8 text-center group hover:bg-[#111111] transition-colors duration-500 cursor-default">
              <span className="text-6xl md:text-8xl font-sans font-light text-[#FAFAFA] group-hover:text-[#B19F91] transition-colors duration-500 flex items-start">
                <AnimatedNumber value={120} duration={2500} />
                <span className="text-4xl md:text-6xl text-[#FAFAFA]/30 font-light">+</span>
              </span>
              <span className="mt-6 text-xs tracking-[0.2em] uppercase font-mono text-[#FAFAFA]/50 group-hover:text-[#FAFAFA] transition-colors duration-500">Built Projects</span>
            </div>
            <div className="flex flex-col items-center justify-center py-16 px-8 text-center group hover:bg-[#111111] transition-colors duration-500 cursor-default">
              <span className="text-6xl md:text-8xl font-sans font-light text-[#FAFAFA] group-hover:text-[#B19F91] transition-colors duration-500 flex items-start">
                <AnimatedNumber value={40} duration={3000} />
                <span className="text-4xl md:text-6xl text-[#FAFAFA]/30 font-light">+</span>
              </span>
              <span className="mt-6 text-xs tracking-[0.2em] uppercase font-mono text-[#FAFAFA]/50 group-hover:text-[#FAFAFA] transition-colors duration-500">Master Plans</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 4. FULL PROJECT ARCHIVE LIST */}
      <section className="py-20 w-full px-6 md:px-12 max-w-screen-2xl mx-auto relative z-10 bg-[#0A0A0A]">
        <Reveal>
          <div className="flex justify-between items-end mb-16 border-b border-[#FAFAFA]/10 pb-8">
            <h3 className="text-3xl md:text-4xl font-sans font-medium tracking-[0.1em] uppercase text-[#FAFAFA]">
              Full Archive
            </h3>
            <p className="text-xs tracking-[0.4em] uppercase text-[#FAFAFA]/50 font-mono hidden md:block">
              // Project Index
            </p>
          </div>
        </Reveal>

        <div className="flex flex-col border-t border-[#FAFAFA]/10 border-b">
          {archiveProjects.map((project, i) => (
            <Reveal key={i} delay={i * 100}>
              <div 
                onClick={() => setActiveArchiveProject(project)}
                className="group flex flex-col md:flex-row justify-between items-start md:items-center py-10 border-b border-[#FAFAFA]/10 hover:bg-[#111111] transition-all duration-500 cursor-pointer px-4 md:px-8 -mx-4 md:-mx-8"
              >
                <div className="flex items-center gap-8 mb-6 md:mb-0 w-full md:w-[40%]">
                  <span className="font-mono text-xs text-[#FAFAFA]/30 group-hover:text-[#B19F91] transition-colors">{project.id}</span>
                  <h4 className="text-xl md:text-2xl font-sans font-light tracking-wide text-[#FAFAFA] group-hover:text-[#B19F91] transition-colors duration-500">
                    {project.title}
                  </h4>
                </div>
                
                <div className="flex flex-col md:flex-row justify-between w-full md:w-[60%] gap-4 md:gap-0 font-mono text-xs tracking-[0.2em] uppercase text-[#FAFAFA]/50 group-hover:text-[#FAFAFA] transition-colors duration-500">
                  <span className="w-full md:w-1/3">CAT: {project.category}</span>
                  <span className="w-full md:w-1/3">STS: {project.status}</span>
                  <span className="w-full md:w-1/3 flex justify-between items-center group-hover:text-[#B19F91] transition-colors duration-500">
                    AREA: {project.area}
                    <span className="text-2xl font-sans font-light transform group-hover:translate-x-4 transition-transform duration-500 text-[#FAFAFA]">
                      ↗
                    </span>
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0A0A0A] py-20 px-6 md:px-12 text-[#FAFAFA] relative z-10 border-t border-[#FAFAFA]/10">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="flex flex-col justify-center items-center md:items-start">
            <h2 className="text-2xl font-sans font-medium tracking-[0.2em] uppercase mb-2">Syed Mobin</h2>
            <p className="font-mono text-xs tracking-[0.2em] text-[#FAFAFA]/50">Architects</p>
          </div>
          <div className="flex flex-col justify-center items-center font-mono text-xs tracking-[0.2em] text-[#FAFAFA]/50">
            <a href="mailto:sma.mob.ngp@gmail.com" className="hover:text-[#B19F91] transition-colors duration-300 mb-2">
              SMA.MOB.NGP@GMAIL.COM
            </a>
            <p>NAGPUR, INDIA</p>
          </div>
          <div className="flex flex-col justify-center items-center md:items-end font-mono text-xs tracking-[0.2em] text-[#FAFAFA]/50">
            <p>© 2026</p>
            <p className="mt-2 text-[#FAFAFA]/30">ALL RIGHTS RESERVED</p>
          </div>
        </div>
      </footer>

      {/* MODAL 1: THE ELEMENTIS SLIDE-IN PANEL (From Gallery) */}
      <div 
        className={`fixed inset-0 z-[100] transition-all duration-[800ms] ${
          activeGalleryProject ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div 
          className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-pointer transition-opacity duration-[800ms]"
          onClick={() => setActiveGalleryProject(null)}
        ></div>

        <div 
          className={`absolute top-0 right-0 h-full w-full md:w-1/2 lg:w-[40%] bg-[#0A0A0A] border-l border-[#FAFAFA]/10 shadow-2xl flex flex-col transform transition-transform duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
            activeGalleryProject ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex justify-between items-center px-8 py-6 border-b border-[#FAFAFA]/10">
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#FAFAFA]/50">
              {activeGalleryProject?.category} | {activeGalleryProject?.loc}
            </span>
            <button 
              onClick={() => setActiveGalleryProject(null)}
              className="text-[#FAFAFA] font-mono text-xs tracking-[0.2em] uppercase hover:text-[#B19F91] transition-colors flex items-center gap-2"
            >
              Close ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto overflow-x-hidden p-8 md:p-12">
            {activeGalleryProject && (
              <div 
                className="w-full aspect-[4/3] bg-cover bg-center mb-10 border border-[#FAFAFA]/10"
                style={{ backgroundImage: `url('${activeGalleryProject.image}')` }}
              ></div>
            )}
            
            <h2 className="text-4xl md:text-5xl font-sans font-light tracking-tight text-[#FAFAFA] mb-8 leading-tight">
              {activeGalleryProject?.title}
            </h2>
            
            <p className="font-sans font-light text-[#FAFAFA]/70 text-lg leading-relaxed mb-12">
              {activeGalleryProject?.desc}
            </p>

            <div className="flex flex-col gap-6 font-mono text-xs tracking-[0.2em] uppercase text-[#FAFAFA]/50 border-t border-[#FAFAFA]/10 pt-8">
              <div className="flex justify-between">
                <span>Category</span>
                <span className="text-[#FAFAFA]">{activeGalleryProject?.category}</span>
              </div>
              <div className="flex justify-between">
                <span>Status</span>
                <span className="text-[#FAFAFA]">{activeGalleryProject?.status}</span>
              </div>
              <div className="flex justify-between">
                <span>Scale</span>
                <span className="text-[#FAFAFA]">{activeGalleryProject?.area}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL 2: THE FULL SCREEN BOTTOM-UP MODAL (From Archive) */}
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
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('${activeArchiveProject.image}')` }}
              ></div>
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

    </main>
  );
}