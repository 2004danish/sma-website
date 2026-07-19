// app/contact/page.tsx
"use client";

import { motion } from 'framer-motion';

const customEase = [0.76, 0, 0.24, 1];

export default function ContactPage() {
  return (
    <main className="relative min-h-[100dvh] w-full bg-[#0A0A0A] flex flex-col justify-between px-6 md:px-12 2xl:px-0 max-w-screen-2xl mx-auto pt-32 pb-12 overflow-hidden">
      
      {/* Global Background Grid Lines for Architectural Feel */}
      <div className="fixed inset-0 pointer-events-none z-0 flex justify-between px-6 md:px-12 max-w-screen-2xl mx-auto opacity-[0.03]">
        <div className="h-full w-[1px] bg-white"></div>
        <div className="h-full w-[1px] bg-white hidden md:block"></div>
        <div className="h-full w-[1px] bg-white hidden lg:block"></div>
        <div className="h-full w-[1px] bg-white hidden md:block"></div>
        <div className="h-full w-[1px] bg-white"></div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center w-full">
        <div className="flex flex-col mb-16 md:mb-24">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="font-mono text-xs md:text-sm tracking-[0.2em] uppercase text-[#FAFAFA]/50 mb-8"
          >
            // Direct Inquiry
          </motion.p>
          
          {/* MASSIVE INTERACTIVE EMAIL */}
          <div className="overflow-hidden">
            <motion.a 
              href="mailto:sma.mob.ngp@gmail.com"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
              className="group relative inline-block text-[11vw] md:text-[8vw] 2xl:text-[120px] font-sans font-medium tracking-tighter text-[#FAFAFA] leading-[0.85] hover:text-[#B19F91] transition-colors duration-500"
            >
              SMA.MOB.NGP
              <br />
              @GMAIL.COM
            </motion.a>
          </div>
        </div>

        {/* METADATA GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pt-12 border-t border-[#FAFAFA]/10">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
            className="flex flex-col gap-4"
          >
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#FAFAFA]/40 uppercase">Headquarters</span>
            <div className="text-[#FAFAFA] font-sans font-light text-lg leading-relaxed">
              Nagpur, Maharashtra<br />
              India
            </div>
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#FAFAFA]/40 uppercase mt-2">21.1458° N, 79.0882° E</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
            className="flex flex-col gap-4"
          >
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#FAFAFA]/40 uppercase">Social Archive</span>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-[#FAFAFA] font-sans font-light text-lg hover:text-[#B19F91] transition-colors w-fit">Instagram ↗</a>
              <a href="#" className="text-[#FAFAFA] font-sans font-light text-lg hover:text-[#B19F91] transition-colors w-fit">LinkedIn ↗</a>
              <a href="#" className="text-[#FAFAFA] font-sans font-light text-lg hover:text-[#B19F91] transition-colors w-fit">Behance ↗</a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
            className="flex flex-col gap-4 md:items-end md:text-right"
          >
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#FAFAFA]/40 uppercase">Press & Media</span>
            <div className="text-[#FAFAFA] font-sans font-light text-lg leading-relaxed hover:text-[#B19F91] transition-colors cursor-pointer">
              media@syedmobin.in
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}