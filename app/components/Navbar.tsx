// app/components/Navbar.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';



const navLinks = [
  { num: "01", label: "HOME", href: "/" },
  { num: "02", label: "PROFILE", href: "/profile" },
  { num: "03", label: "PROJECTS", href: "/projects" },
  { num: "04", label: "STUDIO", href: "/studio" },
  { num: "05", label: "CONTACT", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';

    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <>
      {/* 1. FIXED TOP BAR */}
      <header className="fixed top-0 left-0 w-full z-[100] px-6 md:px-12 2xl:px-24 py-8 flex justify-between items-center mix-blend-difference text-[#FAFAFA] pointer-events-none">
        <Link href="/" className="pointer-events-auto text-xl md:text-2xl font-bold tracking-[0.2em] uppercase">
          SMA.
        </Link>
        <button 
          onClick={() => setIsOpen(true)}
          className="pointer-events-auto font-mono text-xs tracking-[0.2em] uppercase hover:text-[#B19F91] transition-colors"
        >
          [ MENU ]
        </button>
      </header>

      {/* 2. FULL SCREEN OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
           transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] as any }}
            // UPGRADED: h-[100dvh] prevents mobile scrolling issues
            className="fixed top-0 left-0 w-full h-[100dvh] z-[200] bg-[#0A0A0A] flex flex-col justify-between px-6 md:px-12 py-8"
          >
            {/* Overlay Header */}
            <div className="flex justify-between items-center text-[#FAFAFA]">
              <Link 
                href="/" 
                onClick={() => setIsOpen(false)}
                className="text-xl md:text-2xl font-bold tracking-[0.2em] uppercase"
              >
                SMA.
              </Link>
              <button 
                onClick={() => setIsOpen(false)}
                className="font-mono text-xs tracking-[0.2em] uppercase hover:text-[#B19F91] transition-colors"
              >
                [ CLOSE ]
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col justify-center h-full max-w-screen-2xl mx-auto w-full mt-12 md:mt-0">
              <motion.ul 
                initial="initial"
                animate="animate"
                exit="exit"
                variants={{
                  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
                  exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                }}
                className="flex flex-col space-y-4 md:space-y-6"
              >
                {navLinks.map((link) => (
                  <div key={link.num} className="overflow-hidden">
                    <motion.li
                      variants={{
                        initial: { y: "100%" },
                        animate: { y: "0%", transition: { duration: 1, ease: customEase } },
                        exit: { y: "100%", transition: { duration: 0.6, ease: customEase } }
                      }}
                    >
                      <Link 
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="group flex items-end gap-6 text-[#FAFAFA] hover:text-[#B19F91] transition-colors duration-500 w-fit"
                      >
                        <span className="font-mono text-sm md:text-base tracking-[0.2em] mb-2 md:mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
                          {link.num}
                        </span>
                        {/* Perfected 6rem size */}
                        <span className="text-5xl md:text-7xl lg:text-[6rem] font-sans font-medium tracking-tighter uppercase leading-none">
                          {link.label}
                        </span>
                      </Link>
                    </motion.li>
                  </div>
                ))}
              </motion.ul>
            </nav>

            {/* Overlay Footer */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex justify-between items-end text-[#FAFAFA] font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase opacity-50"
            >
              <p>NAGPUR, IN</p>
              <a href="mailto:sma.mob.ngp@gmail.com" className="hover:text-[#B19F91] transition-colors">
                SMA.MOB.NGP@GMAIL.COM
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}