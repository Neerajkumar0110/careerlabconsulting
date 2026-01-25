'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ServicesTabs = () => {
  const [activeTab, setActiveTab] = useState('engineering');
  const [isMobile, setIsMobile] = useState(false);

  // Fix for Hydration Error
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const services = {
    engineering: {
      title: "AI Engineering",
      description: "As a full end-to-end partner, we deliver advanced tailored autonomous AI systems and Agentic solutions. We automate processes through deep practical expertise in all fields, from orchestrating frameworks to engineering unique components.",
      image: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg",
      accent: "from-blue-500 to-cyan-400"
    },
    consulting: {
      title: "AI Consulting & Advisory",
      description: "We uniquely blend strategy, advisory services, and LLM technologies to help organizations achieve operational scalability and high ROI through tailored AI Agents and deep technical understanding.",
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
      accent: "from-red-500 to-orange-400"
    }
  };

  return (
    <section className="py-20 px-4 md:px-12 bg-[#020617] relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-8">
            Agentic AI company
          </h2>
          
          {/* Enhanced Tab Switcher */}
          <div className="inline-flex bg-white/5 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
            {Object.keys(services).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl text-sm md:text-base font-bold transition-all duration-300 ${
                  activeTab === tab 
                    ? 'bg-white text-black shadow-xl' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab === 'engineering' ? 'AI Engineering' : 'AI Consulting & Advisory'}
              </button>
            ))}
          </div>
        </div>

        {/* Content Display */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center bg-white/[0.03] border border-white/10 rounded-[2rem] md:rounded-[3.5rem] p-8 md:p-20 backdrop-blur-3xl shadow-2xl"
            >
              {/* Left Side: Copy */}
              <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
                <div className={`h-1.5 w-20 rounded-full bg-gradient-to-r ${services[activeTab].accent}`} />
                <h3 className="text-3xl md:text-5xl font-black text-white leading-tight">
                  {services[activeTab].title}
                </h3>
                <p className="text-slate-400 text-lg md:text-xl leading-relaxed font-medium">
                  {services[activeTab].description}
                </p>
                <button className="group flex items-center gap-3 text-white font-bold text-lg">
                  Learn more 
                  <span className={`w-10 h-10 rounded-full flex items-center justify-center border border-white/20 group-hover:bg-white group-hover:text-black transition-all`}>
                    →
                  </span>
                </button>
              </div>

              {/* Right Side: Visual */}
              <div className="relative order-1 lg:order-2">
                <div className="relative aspect-video lg:aspect-square rounded-2xl overflow-hidden group">
                  <div className={`absolute inset-0 bg-gradient-to-tr ${services[activeTab].accent} opacity-20 group-hover:opacity-30 transition-opacity`} />
                  <img 
                    src={services[activeTab].image} 
                    alt={services[activeTab].title}
                    className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                  />
                  <div className="absolute inset-0 border-[20px] border-black/10 pointer-events-none" />
                </div>
                
                <div className="absolute -bottom-4 -right-4 bg-white backdrop-blur-xl p-6 rounded-2xl border border-white/20 hidden md:block">
                  <div className="flex gap-4 items-center">
                    <div className={`w-3 h-3 rounded-full animate-pulse bg-gradient-to-r ${services[activeTab].accent}`} />
                    <span className="text-black text-sm font-bold tracking-widest uppercase">Active Systems</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ServicesTabs;