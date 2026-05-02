'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  MousePointer2, Settings2, Cpu, Rocket, ArrowRight, CheckCircle2, TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const ICON_MAP: Record<string, LucideIcon> = { MousePointer2, Settings2, Cpu, Rocket, TrendingUp };

interface FlowStep {
  id: string;
  title: string;
  desc: string;
  icon: string;
  color: string;   // tailwind gradient string e.g. "from-blue-600 to-cyan-400"
  benefit: string;
}

const DEFAULT_STEPS: FlowStep[] = [
  { id: '01', title: 'Discovery & Context', desc: 'Business data aur requirements analyze karke AI agent ka blueprint taiyar hota hai.', icon: 'MousePointer2', color: 'from-blue-600 to-cyan-400',    benefit: 'Eliminates Guesswork' },
  { id: '02', title: 'Neural Training',     desc: 'Agent ko aapke specific knowledge base par train kiya jata hai high accuracy ke liye.', icon: 'Settings2',    color: 'from-indigo-600 to-purple-400', benefit: '99% Accuracy'        },
  { id: '03', title: 'Integration',         desc: 'AI modules ko aapke existing CRM aur ERP tools ke saath connect kiya jata hai.',        icon: 'Cpu',          color: 'from-cyan-600 to-blue-400',   benefit: 'Zero Downtime'       },
  { id: '04', title: 'Autonomous Launch',   desc: 'Aapka workforce live ho jata hai, jo 24/7 bina human intervention ke perform karta hai.',icon: 'Rocket',       color: 'from-emerald-600 to-teal-400',benefit: 'Instant ROI'         },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function ExecutionFlow() {
  const { get } = usePageContent('execution-flow2');

  const eyebrowLabel  = get('execution_flow', 'eyebrow_label',  'Strategic Framework');
  const headlineLine1 = get('execution_flow', 'headline_line1', 'Transforming Data into');
  const headlineLine2 = get('execution_flow', 'headline_line2', 'Digital Assets.');
  const statValue     = get('execution_flow', 'stat_value',     '40% Cost Reduction');
  const statLabel     = get('execution_flow', 'stat_label',     'Average enterprise saving');
  const accentFrom    = get('execution_flow', 'accent_from',    '#3b82f6');
  const accentTo      = get('execution_flow', 'accent_to',      '#34d399');
  const stepsRaw      = get('execution_flow', 'steps_json',     '');
  const steps         = safeParse<FlowStep[]>(stepsRaw, DEFAULT_STEPS);

  return (
    <section className="py-20 md:py-32 bg-[#020617] relative overflow-hidden" style={{ contain: 'paint' }}>
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="hidden md:block absolute top-[10%] left-[5%] w-[400px] h-[400px] blur-[120px] rounded-full"
          style={{ backgroundColor: `${accentFrom}0d` }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 md:mb-24">
          <div className="max-w-3xl">
            <header>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 font-mono text-xs tracking-[0.3em] uppercase mb-4"
                style={{ color: accentFrom }}
              >
                <span className="w-8 h-[1px]" style={{ backgroundColor: accentFrom }} />
                {eyebrowLabel}
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-7xl font-black text-white leading-[1.05] tracking-tighter"
              >
                {headlineLine1} <br />
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})` }}>
                  {headlineLine2}
                </span>
              </motion.h2>
            </header>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="hidden md:flex flex-col gap-4 bg-white/[0.03] p-6 rounded-3xl border border-white/5 backdrop-blur-md"
          >
            <div className="flex items-center gap-4">
              <TrendingUp className="w-5 h-5 text-emerald-400" aria-hidden="true" />
              <div>
                <p className="text-white font-bold">{statValue}</p>
                <p className="text-slate-500 text-xs">{statLabel}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Step cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = ICON_MAP[step.icon] ?? Cpu;
            return (
              <article key={step.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="h-full relative p-8 rounded-[2.5rem] bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 hover:border-blue-500/40 transition-all duration-300 group"
                >
                  <div className="absolute top-6 right-6">
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> {step.benefit}
                    </span>
                  </div>

                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} p-[1px] mb-8`}>
                    <div className="w-full h-full bg-[#020617] rounded-[15px] flex items-center justify-center text-white">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold" style={{ color: `${accentFrom}99` }}>{step.id}</span>
                      <h3 className="text-xl font-bold text-white transition-colors">{step.title}</h3>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>

                  <div className="mt-6 flex items-center justify-between opacity-50 group-hover:opacity-100 transition-opacity">
                    <div className="h-[2px] w-8 group-hover:w-12 transition-all" style={{ backgroundColor: `${accentFrom}33` }} />
                    <ArrowRight className="w-5 h-5 text-white/10 group-hover:text-blue-500" />
                  </div>
                </motion.div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}