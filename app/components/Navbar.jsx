"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      <nav className="fixed top-0 w-full z-40 flex justify-between items-center px-6 md:px-12 py-8 text-white drop-shadow-lg pointer-events-none">
        <Link href="/" className="text-2xl font-light tracking-[0.2em] uppercase pointer-events-auto hover:opacity-70 transition-opacity">
          SMA<span className="font-bold text-[#B19F91]">.</span>
        </Link>
        
        <button 
          onClick={() => setIsOpen(true)}
          className="text-xs tracking-[0.3em] uppercase pointer-events-auto hover:text-[#B19F91] transition-colors"
        >
          [ Menu ]
        </button>
      </nav>

      <div 
        className={`fixed inset-0 bg-[#0A0A0A] text-white z-50 flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex justify-between items-center px-6 md:px-12 py-8 border-b border-white/10">
          <Link href="/" className="text-2xl font-light tracking-[0.2em] uppercase" onClick={() => setIsOpen(false)}>
            SMA<span className="font-bold text-[#B19F91]">.</span>
          </Link>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-xs tracking-[0.3em] uppercase hover:text-[#B19F91] transition-colors"
          >
            [ Close ]
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-center px-6 md:px-24 gap-6 md:gap-10">
          {['Home', 'Profile', 'Projects', 'Studio', 'Contact'].map((item, i) => (
            <div key={item} className="overflow-hidden">
              <Link 
                href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="text-5xl md:text-7xl font-light tracking-widest uppercase hover:pl-8 transition-all duration-500 flex items-center gap-8 group"
              >
                <span className="text-sm font-mono opacity-30 group-hover:text-[#B19F91] group-hover:opacity-100 transition-all">0{i + 1}</span>
                {item}
              </Link>
            </div>
          ))}
        </div>
        
        <div className="py-8 px-6 md:px-24 text-xs tracking-[0.2em] uppercase text-white/30 border-t border-white/10 flex justify-between font-mono">
          <span>NAGPUR, IN</span>
          <span className="hover:text-white transition-colors">SMA.MOB.NGP@GMAIL.COM</span>
        </div>
      </div>
    </>
  );
}