'use client';

import React, { useState } from 'react';
import { Plus, Minus, HelpCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePageContent } from '@/hooks/usePageContent';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

interface FaqItem { question: string; answer: string }

const DEFAULT_FAQS: FaqItem[] = [
  { question: 'How long does it take to deploy an AI product?', answer: 'Our standard deployment cycle is 2 to 4 weeks per product. This includes system integration, custom AI configuration, and seamless setup with your existing business processes.' },
  { question: 'Is my business data secure with your AI products?', answer: 'Absolutely. All data is encrypted with AES-256 and stored securely. We are SOC2 Type II compliant and your data never leaves your environment for external AI training.' },
  { question: 'Do I need technical expertise to use the products?', answer: 'No. All our products are plug-and-play and fully autonomous. We provide intuitive dashboards for monitoring, while the AI handles the operations independently.' },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { get } = usePageContent('faq');

  // ── CMS values ──────────────────────────────────────────────────────────────
  const badgeText      = get('faq', 'badge_text',       'Support Center');
  const headline       = get('faq', 'headline',         'Common Enquiries');
  const subheading     = get('faq', 'subheading',       'Detailed answers to our most frequent technical questions.');
  const ctaPromptText  = get('faq', 'cta_prompt_text',  'Still have questions? Our engineers are here to help.');
  const ctaBtnLabel    = get('faq', 'cta_btn_label',    'Speak to an Expert');
  const whatsappNumber = get('faq', 'whatsapp_number',  '918700236923');
  const whatsappMsg    = get('faq', 'whatsapp_message', 'I have a technical question about AI agents.');
  const faqsRaw        = get('faq', 'faqs_json',        JSON.stringify(DEFAULT_FAQS));
  const accentColor    = get('faq', 'accent_color',     '#3b82f6');

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
    <section className="py-24 pt-12 bg-[#020617] relative overflow-hidden" aria-labelledby="faq-heading">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none will-change-transform"
        style={{ background: `${accentColor}0d` }} />

      <div className="max-w-4xl mx-auto px-6 relative z-10">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <header className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6"
            style={{ background: `${accentColor}1a`, borderColor: `${accentColor}33` }}>
            <HelpCircle className="w-3.5 h-3.5" style={{ color: accentColor }} aria-hidden="true" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: accentColor }}>{badgeText}</span>
          </div>
          <h2 id="faq-heading" className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">
            {headline}<span style={{ color: accentColor }}>.</span>
          </h2>
          <p className="text-slate-500 text-lg md:text-xl">{subheading}</p>
        </header>

        {/* ── FAQ list ────────────────────────────────────────────────────── */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx}
                className="group rounded-[2rem] border transition-all duration-500"
                style={{
                  background: isOpen ? 'rgba(255,255,255,0.04)' : 'transparent',
                  borderColor: isOpen ? `${accentColor}66` : 'rgba(255,255,255,0.05)',
                  boxShadow: isOpen ? `0 25px 50px -12px ${accentColor}1a` : 'none',
                }}
              >
                <h3>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                    className="w-full px-8 py-7 md:py-9 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 rounded-[2rem]"
                    style={{ ['--tw-ring-color' as any]: `${accentColor}80` }}
                  >
                    <span className="text-lg md:text-xl font-bold transition-colors duration-300"
                      style={{ color: isOpen ? '#fff' : '#cbd5e1' }}>
                      {faq.question}
                    </span>
                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500"
                      style={{
                        background: isOpen ? accentColor : 'rgba(255,255,255,0.05)',
                        color: isOpen ? '#fff' : '#64748b',
                        transform: isOpen ? 'rotate(180deg)' : 'none',
                      }}>
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
                        <p className="text-slate-400 leading-relaxed text-base md:text-lg max-w-3xl">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* ── Bottom CTA ──────────────────────────────────────────────────── */}
        <div className="mt-20 text-center">
          <p className="text-slate-500 mb-8 font-medium">{ctaPromptText}</p>
          <button
            aria-label="Contact our expert engineers via WhatsApp"
            onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`, '_blank')}
            className="group relative px-10 py-5 bg-transparent font-black uppercase text-xs tracking-widest border rounded-2xl transition-all flex items-center gap-3 mx-auto active:scale-95"
            style={{ color: accentColor, borderColor: `${accentColor}4d` }}
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
            {ctaBtnLabel}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}