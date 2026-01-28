'use client';

import React, { useState } from 'react';
import { Plus, Minus, HelpCircle, ArrowRight } from 'lucide-react';

const faqs = [
  {
    question: "How long does it take to deploy an AI agent?",
    answer: "Our standard deployment cycle typically takes 2 to 4 weeks. This includes deep discovery, custom neural training, and seamless integration with your existing tech stack."
  },
  {
    question: "Is my business data secure with your agents?",
    answer: "Absolutely. We employ enterprise-grade AES-256 encryption and are SOC2 Type II compliant. Your data is never used to train public LLMs and remains strictly within your secure environment."
  },
  {
    question: "Which industries do you specialize in?",
    answer: "We specialize in high-impact sectors including Fintech, Healthcare, Logistics, and E-commerce where accuracy and 24/7 reliability are mission-critical."
  },
  {
    question: "Do I need technical expertise to manage the agents?",
    answer: "No. We provide a fully managed service. Our engineering team handles the setup and maintenance, while you get an intuitive dashboard for real-time performance analytics."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section 
      className="py-24 bg-[#020617] relative overflow-hidden" 
      aria-labelledby="faq-heading"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        <header className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <HelpCircle className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Support Center</span>
          </div>
          <h2 
            id="faq-heading"
            className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter"
          >
            Common Enquiries<span className="text-blue-500">.</span>
          </h2>
          <p className="text-slate-500 text-lg md:text-xl">
            Detailed answers to our most frequent technical questions.
          </p>
        </header>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className={`group rounded-[2rem] border transition-all duration-500 ${
                openIndex === idx 
                ? 'bg-white/[0.04] border-blue-500/40 shadow-2xl' 
                : 'bg-transparent border-white/5 hover:border-white/15'
              }`}
            >
              <h3>
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  aria-expanded={openIndex === idx}
                  aria-controls={`faq-answer-${idx}`}
                  className="w-full px-8 py-7 md:py-9 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-[2rem]"
                >
                  <span className={`text-lg md:text-xl font-bold transition-colors duration-300 ${
                    openIndex === idx ? 'text-white' : 'text-slate-300 group-hover:text-white'
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                    openIndex === idx 
                    ? 'bg-blue-500 text-white rotate-180' 
                    : 'bg-white/5 text-slate-500 group-hover:bg-white/10'
                  }`}>
                    {openIndex === idx ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>
              </h3>
              
              <div 
                id={`faq-answer-${idx}`}
                role="region"
                aria-labelledby={`faq-question-${idx}`}
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  openIndex === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-8 pb-9 pt-2">
                   <div className="w-full h-px bg-white/5 mb-8"></div>
                   <p className="text-slate-400 leading-relaxed text-base md:text-lg max-w-3xl">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-slate-500 mb-8 font-medium">
            Still have questions? Our engineers are here to help.
          </p>
          <button 
            aria-label="Contact our expert engineers"
            className="group relative px-10 py-5 bg-transparent text-blue-400 font-black uppercase text-xs tracking-widest border border-blue-500/30 rounded-2xl hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all flex items-center gap-3 mx-auto active:scale-95"
          >
            Speak to an Expert
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}