'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, BrainCircuit, Sparkles, Layers, Settings2, LucideIcon } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

interface ServiceItem {
  title: string;
  icon: string;
  iconColor: string;
  description: string;
  image: string;
  alt: string;
}

const ICON_MAP: Record<string, LucideIcon> = {
  BrainCircuit,
  Sparkles,
  Layers,
  Settings2,
};

const DEFAULT_SERVICES: ServiceItem[] = [
  { title: 'RAG Engineering',       icon: 'BrainCircuit', iconColor: 'text-blue-400',    description: 'Expert Retrieval-Augmented Generation (RAG) implementation to connect LLMs with your private data for accurate, hallucination-free AI responses.',   image: 'https://images.pexels.com/photos/29393022/pexels-photo-29393022.jpeg', alt: 'Diagram of RAG Engineering and AI data processing'  },
  { title: 'AI Strategy Consulting', icon: 'Sparkles',     iconColor: 'text-purple-400',  description: 'Enterprise AI roadmaps that identify high-ROI use cases, model selection strategy, and seamless integration workflows.',                              image: 'https://images.pexels.com/photos/8438958/pexels-photo-8438958.jpeg',   alt: 'Business professionals discussing AI strategy'        },
  { title: 'LangChain Development',  icon: 'Layers',       iconColor: 'text-cyan-400',    description: 'Building complex AI agents and multi-step chains using LangChain and LlamaIndex for advanced cognitive automation.',                                   image: 'https://images.pexels.com/photos/4974912/pexels-photo-4974912.jpeg',   alt: 'Software engineer coding LangChain applications'     },
  { title: 'LLMOps & Monitoring',    icon: 'Settings2',    iconColor: 'text-emerald-400', description: 'End-to-end lifecycle management, including fine-tuning, latency optimization, and continuous evaluation of production models.',                       image: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg',   alt: 'Monitoring dashboard for LLM performance'            },
];

const LLMServices = () => {
  const { get } = usePageContent('home');

  // ── CMS values ─────────────────────────────────────────────────────────────
  const accentColor    = get('llm_services', 'accent_color',    '#3b82f6');
  const badgeText      = get('llm_services', 'badge_text',      'Enterprise Solutions');
  const headlinePlain  = get('llm_services', 'headline_plain',  'Our LLM');
  const headlineAccent = get('llm_services', 'headline_accent', 'Services.');
  const bodyText       = get('llm_services', 'body_text',       'Scaling intelligence with precision-engineered AI solutions built for accuracy and speed.');
  const bodyAccent     = get('llm_services', 'body_accent',     'accuracy and speed.');
  const ctaLabel       = get('llm_services', 'cta_label',       'Learn more');
  const servicesRaw    = get('llm_services', 'services_json',   JSON.stringify(DEFAULT_SERVICES));

  const serviceItems = safeParse<ServiceItem[]>(servicesRaw, DEFAULT_SERVICES);

  const renderBody = () => {
    if (!bodyAccent || !bodyText.includes(bodyAccent)) return <>{bodyText}</>;
    const [before, after] = bodyText.split(bodyAccent);
    return (
      <>
        {before}
        <span className="text-white font-medium">{bodyAccent}</span>
        {after}
      </>
    );
  };

  return (
    <section
      className="py-24 px-4 md:px-12 bg-[#020617] relative overflow-hidden"
      aria-labelledby="services-title"
    >
      <div
        className="absolute top-0 left-1/4 w-96 h-96 blur-[120px] rounded-full pointer-events-none will-change-[filter]"
        style={{ background: `${accentColor}0d` }}
      />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 blur-[120px] rounded-full pointer-events-none will-change-[filter]"
        style={{ background: '#6366f10d' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-20 text-center">
          <span className="font-mono text-xs tracking-[0.4em] uppercase mb-4 block" style={{ color: accentColor }}>
            {badgeText}
          </span>
          <h2 id="services-title" className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-6">
            {headlinePlain}{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: `linear-gradient(to right, ${accentColor}, #06b6d4, #6366f1)` }}
            >
              {headlineAccent}
            </span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {renderBody()}
          </p>
        </header>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 list-none p-0">
          {serviceItems.map((service, index) => {
            const Icon = ICON_MAP[service.icon] ?? BrainCircuit;
            return (
              <li key={index} className="group">
                <article className="relative h-full bg-slate-900/30 border border-slate-800/60 rounded-[2.5rem] p-6 md:p-10 transition-all duration-500 overflow-hidden"
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(30,41,59,0.4)';
                    e.currentTarget.style.borderColor = `${accentColor}4d`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(15,23,42,0.3)';
                    e.currentTarget.style.borderColor = 'rgba(30,41,59,0.6)';
                  }}
                >
                  <div className="relative w-full h-64 md:h-72 mb-10 overflow-hidden rounded-[1.5rem] bg-slate-950">
                    <Image
                      src={service.image}
                      alt={service.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-40 group-hover:opacity-100"
                      loading={index < 2 ? 'eager' : 'lazy'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  </div>

                  <div className="flex items-center gap-5 mb-6">
                    <div
                      className="p-4 border rounded-2xl transition-colors duration-500 shadow-inner"
                      style={{ background: '#020617', borderColor: 'rgba(255,255,255,0.05)' }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentColor}80`)}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}
                    >
                      <Icon size={32} className={service.iconColor} />
                    </div>
                    <h3 className="text-3xl font-bold text-white tracking-tight">{service.title}</h3>
                  </div>

                  <p className="text-slate-400 text-lg leading-relaxed mb-10 group-hover:text-slate-300 transition-colors">
                    {service.description}
                  </p>

                  <button
                    aria-label={`Learn more about ${service.title}`}
                    className="flex items-center gap-3 font-black uppercase text-xs tracking-widest group/btn transition-all outline-none focus-visible:ring-2 rounded-lg"
                    style={{ color: accentColor }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  >
                    {ctaLabel}
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                  </button>

                  <div
                    className="absolute -bottom-12 -right-12 w-32 h-32 blur-3xl group-hover:opacity-100 transition-all opacity-0"
                    style={{ background: `${accentColor}0d` }}
                    aria-hidden="true"
                  />
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default LLMServices;