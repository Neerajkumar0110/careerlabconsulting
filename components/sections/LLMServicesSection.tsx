'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Sparkles, BrainCircuit, Layers, Settings2 } from 'lucide-react';

const services = [
  {
    title: "RAG Engineering",
    icon: <BrainCircuit className="w-8 h-8 text-blue-400" aria-hidden="true" />,
    description: "Expert Retrieval-Augmented Generation (RAG) implementation to connect LLMs with your private data for accurate, hallucination-free AI responses.",
    image: "https://images.pexels.com/photos/29393022/pexels-photo-29393022.jpeg",
    alt: "Diagram of RAG Engineering and AI data processing"
  },
  {
    title: "AI Strategy Consulting",
    icon: <Sparkles className="w-8 h-8 text-purple-400" aria-hidden="true" />,
    description: "Enterprise AI roadmaps that identify high-ROI use cases, model selection strategy, and seamless integration workflows.",
    image: "https://images.pexels.com/photos/8438958/pexels-photo-8438958.jpeg",
    alt: "Business professionals discussing AI strategy"
  },
  {
    title: "LangChain Development",
    icon: <Layers className="w-8 h-8 text-cyan-400" aria-hidden="true" />,
    description: "Building complex AI agents and multi-step chains using LangChain and LlamaIndex for advanced cognitive automation.",
    image: "https://images.pexels.com/photos/4974912/pexels-photo-4974912.jpeg",
    alt: "Software engineer coding LangChain applications"
  },
  {
    title: "LLMOps & Monitoring",
    icon: <Settings2 className="w-8 h-8 text-emerald-400" aria-hidden="true" />,
    description: "End-to-end lifecycle management, including fine-tuning, latency optimization, and continuous evaluation of production models.",
    image: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg",
    alt: "Monitoring dashboard for LLM performance"
  }
];

const LLMServices = () => {
  return (
    <section 
      className="py-24 px-4 md:px-12 bg-[#020617] relative overflow-hidden" 
      aria-labelledby="services-title"
    >
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none will-change-[filter]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/5 blur-[120px] rounded-full pointer-events-none will-change-[filter]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-20 text-center">
          <span className="text-blue-400 font-mono text-xs tracking-[0.4em] uppercase mb-4 block">
            Enterprise Solutions
          </span>
          <h2 
            id="services-title"
            className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-6"
          >
            Our LLM <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">Services.</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Scaling intelligence with precision-engineered AI solutions built for <span className="text-white font-medium">accuracy and speed.</span>
          </p>
        </header>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 list-none p-0">
          {services.map((service, index) => (
            <li key={index} className="group">
              <article 
                className="relative h-full bg-slate-900/30 border border-slate-800/60 rounded-[2.5rem] p-6 md:p-10 hover:bg-slate-800/40 hover:border-blue-500/30 transition-all duration-500 overflow-hidden"
              >
                <div className="relative w-full h-64 md:h-72 mb-10 overflow-hidden rounded-[1.5rem] bg-slate-950">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-40 group-hover:opacity-100"
                    loading={index < 2 ? "eager" : "lazy"}
                    onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                </div>

                <div className="flex items-center gap-5 mb-6">
                  <div className="p-4 bg-slate-950 border border-white/5 rounded-2xl group-hover:border-blue-500/50 transition-colors duration-500 shadow-inner">
                    {service.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-white tracking-tight">
                    {service.title}
                  </h3>
                </div>

                <p className="text-slate-400 text-lg leading-relaxed mb-10 group-hover:text-slate-300 transition-colors">
                  {service.description}
                </p>

                <button 
                  aria-label={`Learn more about ${service.title}`}
                  className="flex items-center gap-3 text-blue-400 font-black uppercase text-xs tracking-widest group/btn hover:text-blue-200 transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
                >
                  Learn more 
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                </button>

                <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-blue-500/5 blur-3xl group-hover:bg-blue-500/15 transition-all" aria-hidden="true" />
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default LLMServices;