// app/components/Reveal.tsx
"use client";

import { motion } from 'framer-motion';

const customEase = [0.76, 0, 0.24, 1];

export default function Reveal({ 
  children, 
  delay = 0 
}: { 
  children: React.ReactNode, 
  delay?: number 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] as any, delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}