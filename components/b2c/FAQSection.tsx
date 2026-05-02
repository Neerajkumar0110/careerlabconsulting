'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronRight, Terminal, Cpu, Zap, MessageSquare } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

// ── Types ─────────────────────────────────────────────────────────────────────
interface FAQItem {
  icon: string;
  question: string;
  answer: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const ICON_MAP: Record<string, React.ElementType> = {
  Terminal,
  Cpu,
  Zap,
  MessageSquare,
};

function resolveIcon(name: string): React.ElementType {
  return ICON_MAP[name] ?? Terminal;
}

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_FAQS: FAQItem[] = [
  {
    icon: 'Terminal',
    question: 'Do I need a high-end PC to access the LMS?',
    answer: 'No. Our LMS is a cloud-integrated environment. All heavy neural training and code deployments happen on our proprietary servers. You only need a stable internet connection and a browser.',
  },
  {
    icon: 'Cpu',
    question: "Is the 'Industry Navigator' a real person or AI?",
    answer: 'You are paired with a real-world Senior Engineer (Navigator) from top tech firms. While we use AI to track your progress, your mock interviews and code reviews are conducted by humans.',
  },
  {
    icon: 'Zap',
    question: 'What kind of projects will I deploy?',
    answer: "You will build and deploy production-grade autonomous agents, Web3 audit protocols, and real-time neural interfaces. These aren't 'to-do' apps; these are scalable systems.",
  },
  {
    icon: 'Zap',
    question: 'How does the NFT certification work?',
    answer: 'Upon successful completion and deployment of your final capstone, a soul-bound NFT certificate is minted on the blockchain, serving as a permanent, tamper-proof proof of your skills.',
  },
];

const DEFAULT_FAQS_JSON = JSON.stringify(DEFAULT_FAQS);

// ── Component ─────────────────────────────────────────────────────────────────
export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const { get } = usePageContent('faq2');

  // ── CMS values ────────────────────────────────────────────────────────────
  const badgeText   = get('header', 'badge_text',    'System Protocols');
  const headline    = get('header', 'headline',      'HAVE');
  const headlineAlt = get('header', 'headline_alt',  'QUESTIONS?');
  const subtext     = get('header', 'subtext',       'Everything you need to know about the neural internship protocols and cloud deployment environment.');
  const accentColor = get('header', 'accent_color',  '#3b82f6');

  const faqsRaw = get('faqs', 'items_json', DEFAULT_FAQS_JSON);
  const faqs    = safeParse<FAQItem[]>(faqsRaw, DEFAULT_FAQS);

  const ctaTitle   = get('cta', 'title',       'STILL IN THE DARK?');
  const ctaBody    = get('cta', 'body_text',   "If your queries aren't listed in our protocols, connect with our neural support team for a direct uplink.");
  const ctaBtnLabel = get('cta', 'btn_label',  'Establish Connection');

  return (
    <section className="py-24 md:py-32 bg-[#020617] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent opacity-50 pointer-events-none" />
      <div className="absolute -left-24 top-1/2 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full" />
      <div className="absolute -right-24 bottom-1/2 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full" />

      <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm"
            style={{ background: `${accentColor}0d`, border: `1px solid ${accentColor}33` }}
          >
            <HelpCircle className="w-3.5 h-3.5" style={{ color: accentColor }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: accentColor }}>
              {badgeText}
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-none">
            {headline}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600 italic">
              {headlineAlt}
            </span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            {subtext}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="grid gap-4">
          {faqs.map((faq, i) => {
            const Icon = resolveIcon(faq.icon);
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`group transition-all duration-500 rounded-[2rem] border overflow-hidden ${
                  isOpen
                    ? 'bg-white/[0.03] shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)]'
                    : 'bg-[#0a0f1d]/50 hover:border-white/20'
                }`}
                style={{
                  borderColor: isOpen ? `${accentColor}66` : 'rgba(255,255,255,0.05)',
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-5 md:p-8 text-left"
                >
                  <div className="flex items-center gap-4 md:gap-6">
                    <div
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                        isOpen ? 'text-white rotate-[360deg]' : 'text-slate-500'
                      }`}
                      style={{
                        background: isOpen ? accentColor : 'rgba(255,255,255,0.05)',
                        boxShadow: isOpen ? `0 8px 24px ${accentColor}40` : 'none',
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`font-bold text-base md:text-xl tracking-tight transition-colors duration-300 ${
                        isOpen ? 'text-white' : 'text-slate-400'
                      }`}
                    >
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className={`p-2 rounded-full transition-all duration-300 ${isOpen ? 'rotate-90' : ''}`}
                    style={{
                      background: isOpen ? `${accentColor}33` : 'rgba(255,255,255,0.05)',
                    }}
                  >
                    <ChevronRight
                      className="w-5 h-5"
                      style={{ color: isOpen ? accentColor : '#4b5563' }}
                    />
                  </div>
                </button>

                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 md:px-8 pb-8 ml-0 md:ml-16">
                    <div
                      className="h-px w-full mb-6"
                      style={{ background: `linear-gradient(to right, ${accentColor}4d, transparent)` }}
                    />
                    <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Card */}
        <div className="mt-20 md:mt-28 relative group">
          <div
            className="absolute -inset-1 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"
            style={{ background: `linear-gradient(to right, ${accentColor}, #06b6d4)` }}
          />
          <div className="relative bg-[#0a0f1d] border border-white/10 rounded-[2.5rem] p-8 md:p-12 text-center overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <MessageSquare className="w-32 h-32 text-blue-500" />
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4 italic">{ctaTitle}</h3>
            <p className="text-slate-400 mb-8 max-w-md mx-auto text-sm md:text-base">{ctaBody}</p>
            <button
              className="relative inline-flex items-center gap-3 px-8 py-4 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all active:scale-95"
              style={{
                background: accentColor,
                boxShadow: `0 10px 20px -10px ${accentColor}80`,
              }}
            >
              {ctaBtnLabel}
              <Zap className="w-4 h-4 fill-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}