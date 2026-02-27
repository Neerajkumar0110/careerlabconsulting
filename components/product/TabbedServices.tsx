'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { driveToImage } from '@/utils/driveToImage';

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  accent: string;
}

const servicesData: Record<string, Service[]> = {
  engineering: [
    { 
      id: 'ai-eng',
      title: "AI & Agentic Systems Engineering", 
      description: "End-to-end autonomous systems and Agentic solutions built for enterprise scale and high-performance operations.",
      image: "https://drive.google.com/file/d/1EmmEuXmLi78a_Wa_eVtJBUTBvkhbMKf2/view?usp=drive_link",
      accent: "from-blue-500 to-cyan-400"
    }
  ],
  apps: [
    {
      id: 'app-dev',
      title: "Intelligent Application Development",
      description: "Building next-gen platforms with embedded intelligence and seamless user experiences for modern digital ecosystems.",
      image: "https://drive.google.com/file/d/1eVHc7mJT8A7XceegEdZb_txfikqg8uF4/view?usp=drive_link",
      accent: "from-indigo-500 to-purple-400"
    }
  ],
  consulting: [
    { 
      id: 'advisory',
      title: "AI & Digital Transformation Consulting", 
      description: "Strategic advisory, ROI modeling, and roadmap creation for operational scalability and corporate tech adoption.",
      image: "https://drive.google.com/file/d/10_PQLdz9t0ZO-oVYageuWPn0bMJCsH2R/view?usp=drive_link",
      accent: "from-red-500 to-orange-400"
    }
  ],
  blockchain: [
    {
      id: 'web3',
      title: "Blockchain & Web3 Services",
      description: "Decentralized solutions and smart contract engineering for secure, transparent, and distributed financial operations.",
      image: "https://drive.google.com/file/d/1Ja-DZHOBgTxoXg643tro35ZW880nuRHA/view?usp=drive_link",
      accent: "from-yellow-500 to-amber-400"
    }
  ],
  compliance: [
    {
      id: 'security',
      title: "Quality, Security & Compliance",
      description: "Ensuring your AI systems are responsible, secure, and compliant with global enterprise-grade security standards.",
      image: "https://drive.google.com/file/d/16UjCqY4GyHbcIqMibJLKFtn7dTlzVEf9/view?usp=drive_link",
      accent: "from-emerald-500 to-teal-400"
    }
  ],
  operations: [
    {
      id: 'managed-ops',
      title: "Managed AI & Tech Operations",
      description: "Continuous monitoring, fine-tuning, and maintenance of your AI infrastructure and model performance 24/7.",
      image: "https://drive.google.com/file/d/1tlLmdK0X834QCb7g_72CC-96LhuLWJc8/view?usp=drive_link",
      accent: "from-pink-500 to-rose-400"
    }
  ],
  talent: [
    {
      id: 'talent-teams',
      title: "Talent & Dedicated Teams",
      description: "Access to elite AI researchers and engineers to accelerate your internal R&D projects and innovation goals.",
      image: "https://drive.google.com/file/d/1lUxcL4nRWnEz_6z2OIfd9Rdro2016vnT/view?usp=drive_link",
      accent: "from-violet-500 to-fuchsia-400"
    }
  ]
};

const tabs = [
  { id: 'all', label: 'All Services' },
  { id: 'consulting', label: 'Consulting' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'apps', label: 'App Development' },
  { id: 'blockchain', label: 'Blockchain' },
  { id: 'compliance', label: 'Security' },
  { id: 'operations', label: 'Operations' },
  { id: 'talent', label: 'Talent' },
] as const;

const ServicesTabs = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredServices = useMemo(() => {
    if (activeTab === 'all') return Object.values(servicesData).flat();
    return servicesData[activeTab] || [];
  }, [activeTab]);

  return (
    <section 
      className="py-24 px-4 md:px-12 bg-[#020617] relative overflow-hidden"
      aria-labelledby="services-heading"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "AI & Digital Transformation Services",
            "provider": { "@type": "Organization", "name": "CareerLab Consulting" },
            "description": "Leading provider of Agentic AI, Blockchain, and Digital Transformation services."
          })
        }}
      />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="text-center mb-16">
          <h2 id="services-heading" className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-10">
            Our Service <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Categories</span>
          </h2>
          
          <nav role="tablist" aria-label="Service categories" className="flex flex-wrap justify-center gap-3 mb-16">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all duration-300 border focus:ring-2 focus:ring-blue-500/50 outline-none ${
                  activeTab === tab.id 
                    ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                    : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/30 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </header>

        <div className="min-h-[600px] md:min-h-[450px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              id={`panel-${activeTab}`}
              role="tabpanel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "linear" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {filteredServices.map((service, idx) => (
                <article 
                  key={service.id}
                  className="group relative bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 md:p-10 backdrop-blur-3xl overflow-hidden hover:border-blue-500/30 transition-all duration-500"
                >
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6 order-2 md:order-1">
                      <div className={`h-1.5 w-16 rounded-full bg-gradient-to-r ${service.accent}`} aria-hidden="true" />
                      <h3 className="text-xl md:text-2xl font-black text-white leading-tight">{service.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed font-medium">{service.description}</p>
                      <button 
                        aria-label={`Explore ${service.title}`}
                        className="flex items-center gap-2 text-white text-sm font-bold hover:text-blue-400 transition-all group/btn"
                      >
                        Explore Service <span className="group-hover/btn:translate-x-2 transition-transform" aria-hidden="true">→</span>
                      </button>
                    </div>

                    <div className="relative order-1 md:order-2">
                      <div className="aspect-square rounded-2xl overflow-hidden relative bg-slate-900 shadow-2xl">
                        <Image 
                          src={driveToImage(service.image)} 
                          alt={service.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 400px"
                          priority={idx < 2} 
                          loading={idx < 2 ? "eager" : "lazy"}
                          decoding="async"
                          className="object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ServicesTabs;