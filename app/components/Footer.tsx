// app/components/Footer.tsx
"use client";

import { useEffect, useState } from 'react';

export default function Footer() {
  // A brutalist flex: A live running clock of the firm's local time
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false }) + ' IST');
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full bg-[#0A0A0A] text-[#FAFAFA] border-t border-[#FAFAFA]/10">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 2xl:px-0">
        
        {/* STRICT BLUEPRINT GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#FAFAFA]/10 border-l border-r border-[#FAFAFA]/10">
          
          {/* Cell 1: Firm Identity */}
          <div className="flex flex-col justify-between p-6 md:p-8 min-h-[120px]">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#FAFAFA]/40 uppercase mb-4">Firm</span>
            <span className="font-sans font-medium tracking-wide uppercase text-sm md:text-base">
              Syed Mobin<br />Architecture
            </span>
          </div>

          {/* Cell 2: Registration / Legal */}
          <div className="flex flex-col justify-between p-6 md:p-8 min-h-[120px]">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#FAFAFA]/40 uppercase mb-4">Registration</span>
            <span className="font-mono text-xs tracking-widest uppercase text-[#FAFAFA]/80">
              COA: CA/20XX/XXXXX<br />
              EST. 2005
            </span>
          </div>

          {/* Cell 3: Live Telemetry (Local Time) */}
          <div className="flex flex-col justify-between p-6 md:p-8 min-h-[120px]">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#FAFAFA]/40 uppercase mb-4">Local Telemetry</span>
            <span className="font-mono text-xs tracking-widest uppercase text-[#FAFAFA]/80">
              NAGPUR, INDIA<br />
              {time || "LOADING..."}
            </span>
          </div>

          {/* Cell 4: System Data */}
          <div className="flex flex-col justify-between p-6 md:p-8 min-h-[120px]">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#FAFAFA]/40 uppercase mb-4">System</span>
            <span className="font-mono text-xs tracking-widest uppercase text-[#FAFAFA]/80">
              V. 1.0.0<br />
              © {new Date().getFullYear()} SMA
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
}