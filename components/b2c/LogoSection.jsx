'use client';

import React from 'react';
import { motion } from 'framer-motion';

const alumniCompanies = [
  { name: "IBM", url: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
  { name: "Oracle", url: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" },
  { name: "Microsoft", url: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
  { name: "Netflix", url: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
  { name: "Google", url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" }
];

export default function AlumniSuccess() {
  const duplicatedLogos = [...alumniCompanies, ...alumniCompanies, ...alumniCompanies, ...alumniCompanies];

  return (
    <section className="relative py-12 md:py-24 bg-[#020617] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] bg-blue-600/5 blur-[100px] md:blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10 md:mb-16 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
              CLC<span className="align-top text-[10px] md:text-sm not-italic ml-1">®</span> 
              <span className="text-blue-500 ml-3">ALUMNI SUCCESS</span>
            </h2>
            <div className="flex items-center justify-center gap-3 md:gap-4 mt-4">
              <div className="h-[1px] w-6 md:w-16 bg-gradient-to-r from-transparent to-blue-500" />
              <p className="text-slate-400 text-[8px] md:text-xs font-bold uppercase tracking-[0.3em] md:tracking-[0.4em]">
                Global Placement Partners
              </p>
              <div className="h-[1px] w-6 md:w-16 bg-gradient-to-l from-transparent to-blue-500" />
            </div>
          </motion.div>
        </div>

        {/* Logo Slider Container */}
        <div className="relative w-full flex items-center overflow-hidden">
          {/* FIX: Client mentioned logos turning black on left/right. 
              Removed heavy dark gradients and replaced with subtle transparency.
          */}
          <div className="absolute inset-y-0 left-0 w-10 md:w-32 bg-gradient-to-r from-[#020617] to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-10 md:w-32 bg-gradient-to-l from-[#020617] to-transparent z-20 pointer-events-none" />

          <motion.div 
            className="flex whitespace-nowrap items-center py-6"
            animate={{ x: ["0%", "-50%"] }} // Adjusted for duplicated array size
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 20, // Slightly faster for a modern feel
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <div 
                key={index} 
                className="flex items-center justify-center px-6 md:px-12 min-w-[140px] md:min-w-[240px]"
              >
                <img 
                  src={logo.url} 
                  alt={logo.name} 
                  // Pure original colors with no filters
                  className="h-6 md:h-10 w-auto object-contain transition-transform duration-300 hover:scale-110" 
                  loading={index < 8 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="mt-8 flex justify-center md:hidden px-4">
          <div className="px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5">
             <p className="text-[7px] text-blue-400 font-bold tracking-[0.2em] uppercase">Infinite Career Network</p>
          </div>
        </div>
      </div>
    </section>
  );
}