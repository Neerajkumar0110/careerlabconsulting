'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Cpu, Zap } from 'lucide-react';

const Footer = dynamic(() => import('@/components/product/Footer'));
const Navbar = dynamic(() => import('@/components/product/Navbar'));

const ComingSoonPage = () => {
  return (
    <div className="relative w-full min-h-screen bg-[#020617] text-white flex flex-col overflow-hidden">
      
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="relative flex-1 flex flex-col items-center justify-center px-4 text-center overflow-hidden">
        
        {/* Futuristic Neon Holographic Panels */}
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full bg-gradient-to-tr from-blue-500/20 via-indigo-400/10 to-purple-500/10 blur-[180px] -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-gradient-to-br from-indigo-500/10 to-blue-500/5 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-gradient-to-tl from-purple-500/20 to-indigo-500/10 blur-[120px] animate-pulse" />

        {/* Holographic console */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="relative z-10 flex flex-col items-center justify-center mt-36 mb-24"
        >
          {/* Holographic CPU Panel */}
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="p-12 md:p-16 bg-gradient-to-br from-blue-400/10 via-indigo-400/10 to-purple-400/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex flex-col items-center"
          >
            <Cpu size={72} className="text-blue-400 animate-pulse mb-6" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
              Coming Soon
            </h1>
            <p className="text-slate-400 text-base sm:text-lg md:text-xl max-w-xl mx-auto mb-6">
              Our AI engineers are working in real-time to build this page. 
              Holographic systems, predictive analytics, and autonomous bots are configuring everything behind the scenes.
            </p>
            <div className="flex gap-4">
              <motion.div
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-400 to-indigo-500 font-bold shadow-lg shadow-blue-500/30 select-none"
                animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                🚧 Under Construction
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating holographic particles / bots */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, Math.random() * 40 - 20, 0],
              y: [0, Math.random() * 20 - 10, 0],
              rotate: [0, Math.random() * 10 - 5, 0],
            }}
            transition={{ repeat: Infinity, duration: 3 + i * 0.5, ease: 'easeInOut' }}
            className={`absolute w-10 h-10 md:w-12 md:h-12 ${i % 2 === 0 ? 'top-1/4 left-[10%]' : 'bottom-1/3 right-[15%]'} opacity-50`}
          >
            <Zap size={32} className="text-indigo-400 animate-pulse" />
          </motion.div>
        ))}

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ComingSoonPage;
