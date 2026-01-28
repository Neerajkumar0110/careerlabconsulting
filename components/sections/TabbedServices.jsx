'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const servicesData = {
  engineering: [
    { 
      id: 'ai-eng',
      title: "AI & Agentic Systems Engineering", 
      description: "End-to-end autonomous systems and Agentic solutions built for scale.",
      image: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg",
      accent: "from-blue-500 to-cyan-400"
    }
  ],
  apps: [
    {
      id: 'app-dev',
      title: "Intelligent Application Development",
      description: "Building next-gen platforms with embedded intelligence and seamless user experiences.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
      accent: "from-indigo-500 to-purple-400"
    }
  ],
  consulting: [
    { 
      id: 'advisory',
      title: "AI & Digital Transformation Consulting", 
      description: "Strategic advisory, ROI modeling, and roadmap creation for operational scalability.",
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
      accent: "from-red-500 to-orange-400"
    }
  ],
  blockchain: [
    {
      id: 'web3',
      title: "Blockchain & Web3 Services",
      description: "Decentralized solutions and smart contract engineering for secure, transparent operations.",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800",
      accent: "from-yellow-500 to-amber-400"
    }
  ],
  compliance: [
    {
      id: 'security',
      title: "Quality, Security & Compliance",
      description: "Ensuring your AI systems are responsible, secure, and compliant with global standards.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800",
      accent: "from-emerald-500 to-teal-400"
    }
  ],
  operations: [
    {
      id: 'managed-ops',
      title: "Managed AI & Tech Operations",
      description: "Continuous monitoring, fine-tuning, and maintenance of your AI infrastructure.",
      image: "https://media.istockphoto.com/id/2256743848/photo/diverse-devops-team-brainstorming-ideas-and-analyzing-big-data-and-large-language-model.webp?a=1&b=1&s=612x612&w=0&k=20&c=TnN_dbWxqFbInn8PLWnMoq_4QTF3GZNBHISdeFaia-0=",
      accent: "from-pink-500 to-rose-400"
    }
  ],
  talent: [
    {
      id: 'talent-teams',
      title: "Talent & Dedicated Teams",
      description: "Access to elite AI researchers and engineers to accelerate your internal projects.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800",
      accent: "from-violet-500 to-fuchsia-400"
    }
  ]
};

const ServicesTabs = () => {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Services' },
    { id: 'consulting', label: 'Consulting' },
    { id: 'engineering', label: 'Engineering' },
    { id: 'apps', label: 'App Development' },
    { id: 'blockchain', label: 'Blockchain' },
    { id: 'compliance', label: 'Security' },
    { id: 'operations', label: 'Operations' },
    { id: 'talent', label: 'Talent' },
  ];

  const getFilteredServices = () => {
    if (activeTab === 'all') {
      return Object.values(servicesData).flat();
    }
    return servicesData[activeTab] || [];
  };

  return (
    <section className="py-24 px-4 md:px-12 bg-[#020617] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-10">
            Our Service <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Categories</span>
          </h2>
          
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all duration-300 border ${
                  activeTab === tab.id 
                    ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                    : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/30 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {getFilteredServices().map((service) => (
                <div 
                  key={service.id}
                  className="group relative bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 md:p-10 backdrop-blur-3xl overflow-hidden hover:border-white/20 transition-all"
                >
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6 order-2 md:order-1">
                      <div className={`h-1.5 w-16 rounded-full bg-gradient-to-r ${service.accent}`} />
                      <h3 className="text-xl md:text-2xl font-black text-white leading-tight">{service.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed font-medium">{service.description}</p>
                      <button className="flex items-center gap-2 text-white text-sm font-bold hover:gap-4 transition-all">
                        Learn More <span>→</span>
                      </button>
                    </div>

                    <div className="relative order-1 md:order-2">
                      <div className="aspect-square rounded-2xl overflow-hidden">
                        <img 
                          src={service.image} 
                          alt={service.title}
                          className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-100"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ServicesTabs;