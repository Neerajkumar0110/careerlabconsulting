'use client';

import React from 'react';
import { ArrowRight, Sparkles, BrainCircuit, Layers, Settings2 } from 'lucide-react';

const LLMServices = () => {
  const services = [
    {
      title: "RAG Engineering",
      icon: <BrainCircuit className="w-8 h-8 text-blue-400" />,
      description: "We implement tailored RAG pipelines using state-of-the-art techniques to automate complex processes while eliminating hallucinations.",
      image: "https://img.freepik.com/free-photo/woman-working-with-big-ruler-pen-table_23-2148039879.jpg"
    },
    {
      title: "AI Consulting",
      icon: <Sparkles className="w-8 h-8 text-purple-400" />,
      description: "Our strategy program identifies the best solutions for your business, optimizing processes with advanced language models.",
      image: "https://images.pexels.com/photos/669612/pexels-photo-669612.jpeg"
    },
    {
      title: "LangChain Dev",
      icon: <Layers className="w-8 h-8 text-cyan-400" />,
      description: "Our experts speed up project development using the LangChain framework to build Large Language Models more efficiently.",
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
    },
    {
      title: "LLMOps",
      icon: <Settings2 className="w-8 h-8 text-emerald-400" />,
      description: "Efficient optimization, scaling, and management of your models using tailored LLM solutions and monitoring tools.",
      image: "https://img.freepik.com/free-photo/hand-using-laptop-computer-with-virtual-screen-document-online-approve-paperless-quality-assurance-erp-management-concept_616485-61.jpg"
    }
  ];

  return (
    <section className="py-24 px-4 md:px-12 bg-[#020617] relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
            Our LLM <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Development Services</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Scaling intelligence with precision-engineered AI solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group relative bg-slate-900/40 border border-slate-800 rounded-3xl p-6 md:p-8 hover:bg-slate-800/40 transition-all duration-500 overflow-hidden"
            >
              {/* Image Container with Hover Effect */}
              <div className="relative w-full h-52 md:h-64 mb-8 overflow-hidden rounded-2xl">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
              </div>

              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-slate-800 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  {service.title}
                </h3>
              </div>

              <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-8">
                {service.description}
              </p>

              <button className="flex items-center gap-2 text-blue-400 font-semibold group/btn hover:text-blue-300 transition-colors">
                Learn more 
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
              </button>

              <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-blue-500/10 blur-2xl group-hover:bg-blue-500/20 transition-all" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LLMServices;