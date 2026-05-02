'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { usePageContent } from '@/hooks/usePageContent';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

interface Tab     { id: string; label: string; }
interface Service { id: string; category: string; title: string; description: string; image: string; accent: string; }

const DEFAULT_TABS: Tab[] = [
  { id: 'all',         label: 'All Services'    },
  { id: 'consulting',  label: 'Consulting'      },
  { id: 'engineering', label: 'Engineering'     },
  { id: 'apps',        label: 'App Development' },
  { id: 'blockchain',  label: 'Blockchain'      },
  { id: 'compliance',  label: 'Security'        },
  { id: 'operations',  label: 'Operations'      },
  { id: 'talent',      label: 'Talent'          },
];

const DEFAULT_SERVICES: Service[] = [
  { id: 'ai-eng',      category: 'engineering', title: 'AI & Agentic Systems Engineering',         description: 'End-to-end autonomous systems and Agentic solutions built for enterprise scale.',                        image: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg',                            accent: 'from-blue-500 to-cyan-400'     },
  { id: 'app-dev',     category: 'apps',        title: 'Intelligent Application Development',       description: 'Building next-gen platforms with embedded intelligence for modern digital ecosystems.',                   image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800',                        accent: 'from-indigo-500 to-purple-400' },
  { id: 'advisory',    category: 'consulting',  title: 'AI & Digital Transformation Consulting',    description: 'Strategic advisory, ROI modeling, and roadmap creation for operational scalability.',                    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',                           accent: 'from-red-500 to-orange-400'    },
  { id: 'web3',        category: 'blockchain',  title: 'Blockchain & Web3 Services',                description: 'Decentralized solutions and smart contract engineering for secure operations.',                          image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800',                     accent: 'from-yellow-500 to-amber-400'  },
  { id: 'security',    category: 'compliance',  title: 'Quality, Security & Compliance',            description: 'Ensuring your AI systems are responsible, secure, and globally compliant.',                              image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800',                        accent: 'from-emerald-500 to-teal-400'  },
  { id: 'managed-ops', category: 'operations',  title: 'Managed AI & Tech Operations',              description: 'Continuous monitoring, fine-tuning, and maintenance of your AI infrastructure 24/7.',                   image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800',                        accent: 'from-pink-500 to-rose-400'     },
  { id: 'talent-teams',category: 'talent',      title: 'Talent & Dedicated Teams',                  description: 'Access to elite AI researchers and engineers to accelerate your R&D goals.',                            image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800',                     accent: 'from-violet-500 to-fuchsia-400'},
];

const ServicesTabs = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const { get } = usePageContent('home');

  // ── CMS values ─────────────────────────────────────────────────────────────
  const accentColor    = get('services_tabs', 'accent_color',    '#3b82f6');
  const headlinePlain  = get('services_tabs', 'headline_plain',  'Our Service');
  const headlineAccent = get('services_tabs', 'headline_accent', 'Categories');
  const ctaLabel       = get('services_tabs', 'cta_label',       'Explore Service');
  const tabsRaw        = get('services_tabs', 'tabs_json',       JSON.stringify(DEFAULT_TABS));
  const servicesRaw    = get('services_tabs', 'services_json',   JSON.stringify(DEFAULT_SERVICES));

  const tabs     = safeParse<Tab[]>(tabsRaw,         DEFAULT_TABS);
  const services = safeParse<Service[]>(servicesRaw, DEFAULT_SERVICES);

  const filteredServices = useMemo(() => {
    if (activeTab === 'all') return services;
    return services.filter(s => s.category === activeTab);
  }, [activeTab, services]);

  return (
    <section
      className="py-24 px-4 md:px-12 bg-[#020617] relative overflow-hidden"
      aria-labelledby="services-heading"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'AI & Digital Transformation Services',
            provider: { '@type': 'Organization', name: 'CareerLab Consulting' },
            description: 'Leading provider of Agentic AI, Blockchain, and Digital Transformation services.',
          }),
        }}
      />

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none"
        style={{ background: `radial-gradient(circle at center, ${accentColor}08 0%, transparent 70%)` }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="text-center mb-16">
          <h2
            id="services-heading"
            className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-10"
          >
            {headlinePlain}{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: `linear-gradient(to right, ${accentColor}, #06b6d4)` }}
            >
              {headlineAccent}
            </span>
          </h2>

          <nav role="tablist" aria-label="Service categories" className="flex flex-wrap justify-center gap-3 mb-16">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className="px-6 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all duration-300 border focus:ring-2 outline-none"
                style={
                  activeTab === tab.id
                    ? { background: '#fff', color: '#000', borderColor: '#fff', boxShadow: '0 0 20px rgba(255,255,255,0.2)' }
                    : { background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', color: '#94a3b8' }
                }
                onMouseEnter={e => { if (activeTab !== tab.id) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = '#fff'; } }}
                onMouseLeave={e => { if (activeTab !== tab.id) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#94a3b8'; } }}
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
              transition={{ duration: 0.25, ease: 'linear' }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {filteredServices.map((service, idx) => (
                <article
                  key={service.id}
                  className="group relative bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 md:p-10 backdrop-blur-3xl overflow-hidden transition-all duration-500"
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentColor}4d`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}
                >
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6 order-2 md:order-1">
                      <div className={`h-1.5 w-16 rounded-full bg-gradient-to-r ${service.accent}`} aria-hidden="true" />
                      <h3 className="text-xl md:text-2xl font-black text-white leading-tight">{service.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed font-medium">{service.description}</p>
                      <button
                        aria-label={`Explore ${service.title}`}
                        className="flex items-center gap-2 text-sm font-bold transition-all group/btn"
                        style={{ color: accentColor }}
                        onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                      >
                        {ctaLabel}{' '}
                        <span className="group-hover/btn:translate-x-2 transition-transform" aria-hidden="true">→</span>
                      </button>
                    </div>

                    <div className="relative order-1 md:order-2">
                      <div className="aspect-square rounded-2xl overflow-hidden relative bg-slate-900 shadow-2xl">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 400px"
                          priority={idx < 2}
                          loading={idx < 2 ? 'eager' : 'lazy'}
                          decoding="async"
                          className="object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
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