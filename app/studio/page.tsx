"use client";

import { motion } from 'framer-motion';
import BlueprintSlider from '../components/BlueprintSlider';

export default function StudioPage() {
  return (
    <main className="relative bg-[#0A0A0A] overflow-hidden">
      
      {/* --- 1. 3D ARCHITECTURAL PROJECTION HERO --- */}
      <section className="relative min-h-[100dvh] flex flex-col justify-center pt-32 pb-24 px-6 md:px-12">
        {/* 3D Grid Background */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-20">
          <motion.div 
            initial={{ rotateX: 70, scale: 0.8, opacity: 0 }}
            animate={{ rotateX: 60, scale: 2, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full"
            style={{ 
              backgroundImage: 'linear-gradient(rgba(250,250,250,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(250,250,250,0.2) 1px, transparent 1px)', 
              backgroundSize: '40px 40px',
              transformStyle: "preserve-3d"
            }}
          />
        </div>

        {/* 3D Projected Paper Plane */}
        <div className="max-w-screen-xl mx-auto w-full relative z-10" style={{ perspective: "1500px" }}>
          <motion.div
            initial={{ rotateX: 25, rotateY: -10, z: -200, opacity: 0, y: 100 }}
            animate={{ rotateX: 0, rotateY: 0, z: 0, opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            style={{ transformStyle: "preserve-3d" }}
            className="bg-[#FAFAFA] text-[#0A0A0A] p-8 md:p-16 lg:p-24 shadow-[0_40px_80px_rgba(0,0,0,0.9)] relative"
          >
            {/* Blueprint Border Line */}
            <div className="absolute inset-0 pointer-events-none border border-[#0A0A0A]/10 m-2 md:m-4"></div>
            
            <div className="flex flex-col gap-12 md:gap-20 relative z-10">
              
              <div className="flex justify-between items-start border-b border-[#0A0A0A]/20 pb-8">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter uppercase">
                  The Studio
                </h1>
                <span className="font-mono text-xs tracking-[0.2em] font-bold mt-2 hidden md:block uppercase">
                  [ Vol. 01 — Projection ]
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 font-sans text-lg md:text-2xl leading-relaxed font-medium">
                <p>
                  Syed Mobin Architects (SMA) is a multidisciplinary design practice. 
                  We believe in architectural expression that is raw, honest, and uncompromising in its structural integrity.
                </p>
                <p>
                  Our process is rooted in a deep understanding of materials, light, and spatial geometry. 
                  We approach each project as an opportunity to challenge conventions and create spaces that resonate on a primal level.
                </p>
              </div>

              <div className="border-t border-[#0A0A0A]/20 pt-8 grid grid-cols-1 md:grid-cols-3 gap-8 font-mono text-xs tracking-[0.2em] uppercase text-[#0A0A0A]/70">
                <div>
                  <span className="block mb-2 text-[#0A0A0A] font-bold">Location</span>
                  Nagpur, IN
                </div>
                <div>
                  <span className="block mb-2 text-[#0A0A0A] font-bold">Focus</span>
                  Architecture & Master Planning
                </div>
                <div>
                  <span className="block mb-2 text-[#0A0A0A] font-bold">Status</span>
                  Accepting Commissions
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* --- 2. BLUEPRINT SLIDER SECTION --- */}
      <section className="relative z-20 bg-[#0A0A0A] pb-32">
        <BlueprintSlider />
      </section>

    </main>
  );
}