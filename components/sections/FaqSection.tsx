'use client';

import React, { useState } from 'react';
import { Plus, Minus, HelpCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePageContent } from '@/hooks/usePageContent';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

interface FaqItem { question: string; answer: string; }

const DEFAULT_FAQS: FaqItem[] = [
  { question: 'How long does it take to deploy an AI agent?',       answer: 'Our standard deployment cycle typically takes 2 to 4 weeks. This includes deep discovery, custom neural training, and seamless integration with your existing tech stack.' },
  { question: 'Is my business data secure with your agents?',       answer: 'Absolutely. We employ enterprise-grade AES-256 encryption and are SOC2 Type II compliant. Your data is never used to train public LLMs.' },
  { question: 'Which industries do you specialize in?',             answer: 'We specialize in high-impact sectors including Fintech, Healthcare, Logistics, and E-commerce where accuracy and 24/7 reliability are mission-critical.' },
  { question: 'Do I need technical expertise to manage the agents?', answer: 'No. We provide a fully managed service. Our engineering team handles setup and maintenance, while you get an intuitive dashboard for real-time analytics.' },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const { get } = usePageContent('home');

  // ── CMS values ─────────────────────────────────────────────────────────────
  const accentColor      = get('faq', 'accent_color',      '#3b82f6');
  const badgeText        = get('faq', 'badge_text',        'Support Center');
  const headline         = get('faq', 'headline',          'Common Enquiries');
  const subheading       = get('faq', 'subheading',        'Detailed answers to our most frequent technical questions.');
  const footerText       = get('faq', 'footer_text',       'Still have questions? Our engineers are here to help.');
  const ctaLabel         = get('faq', 'cta_label',         'Speak to an Expert');
  const whatsappNumber   = get('faq', 'whatsapp_number',   '918700236923');
  const whatsappMessage  = get('faq', 'whatsapp_message',  'I have a technical question about AI agents.');
  const faqsRaw          = get('faq', 'faqs_json',         JSON.stringify(DEFAULT_FAQS));

  const faqs = safeParse<FaqItem[]>(faqsRaw, DEFAULT_FAQS);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <section
      className="py-24 bg-[#020617] relative overflow-hidden"
      aria-labelledby="faq-heading"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] blur-[100px] rounded-full pointer-events-none will-change-transform"
        style={{ background: `${accentColor}0d` }}
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10">

        {/* ── Header ────────────────────────────────────────────────────── */}
        <header className="text-center mb-16 md:mb-20">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6"
            style={{ background: `${accentColor}1a`, borderColor: `${accentColor}33` }}
          >
            <HelpCircle className="w-3.5 h-3.5" style={{ color: accentColor }} aria-hidden="true" />
            <span
              className="text-[10px] font-black uppercase tracking-[0.2em]"
              style={{ color: accentColor }}
            >
              {badgeText}
            </span>
          </div>
          <h2 id="faq-heading" className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">
            {headline}
            <span style={{ color: accentColor }}>.</span>
          </h2>
          <p className="text-slate-500 text-lg md:text-xl">{subheading}</p>
        </header>

        {/* ── FAQ Items ─────────────────────────────────────────────────── */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="group rounded-[2rem] border transition-all duration-500"
                style={
                  isOpen
                    ? { background: 'rgba(255,255,255,0.04)', borderColor: `${accentColor}66`, boxShadow: '0 25px 50px rgba(0,0,0,0.3)' }
                    : { background: 'transparent', borderColor: 'rgba(255,255,255,0.05)' }
                }
                onMouseEnter={e => { if (!isOpen) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
                onMouseLeave={e => { if (!isOpen) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; }}
              >
                <h3>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                    className="w-full px-8 py-7 md:py-9 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 rounded-[2rem]"
                    style={{ ['--tw-ring-color' as string]: `${accentColor}80` }}
                  >
                    <span
                      className="text-lg md:text-xl font-bold transition-colors duration-300"
                      style={{ color: isOpen ? '#fff' : '#cbd5e1' }}
                    >
                      {faq.question}
                    </span>
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500"
                      style={
                        isOpen
                          ? { background: accentColor, color: '#fff', transform: 'rotate(180deg)' }
                          : { background: 'rgba(255,255,255,0.05)', color: '#64748b' }
                      }
                    >
                      {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </div>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${idx}`}
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="px-8 pb-9 pt-2">
                        <div className="w-full h-px bg-white/5 mb-8" />
                        <p className="text-slate-400 leading-relaxed text-base md:text-lg max-w-3xl">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* ── Footer CTA ────────────────────────────────────────────────── */}
        <div className="mt-20 text-center">
          <p className="text-slate-500 mb-8 font-medium">{footerText}</p>
          <button
            aria-label="Contact our expert engineers via WhatsApp"
            onClick={() =>
              window.open(
                `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
                '_blank',
              )
            }
            className="group relative px-10 py-5 font-black uppercase text-xs tracking-widest border rounded-2xl transition-all flex items-center gap-3 mx-auto active:scale-95"
            style={{ color: accentColor, borderColor: `${accentColor}4d`, background: 'transparent' }}
            onMouseEnter={e => {
              e.currentTarget.style.background = accentColor;
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.borderColor = accentColor;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = accentColor;
              e.currentTarget.style.borderColor = `${accentColor}4d`;
            }}
          >
            {ctaLabel}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}