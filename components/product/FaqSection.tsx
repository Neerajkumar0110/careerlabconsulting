'use client';

import React, { useState } from 'react';
import { Plus, Minus, HelpCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "How long does it take to deploy an AI product?",
    answer: "Our standard deployment cycle is 2 to 4 weeks per product. This includes system integration, custom AI configuration, and seamless setup with your existing business processes."
  },
  {
    question: "Is my business data secure with your AI products?",
    answer: "Absolutely. All data is encrypted with AES-256 and stored securely. We are SOC2 Type II compliant and your data never leaves your environment for external AI training."
  },
  {
    question: "Do I need technical expertise to use the products?",
    answer: "No. All our products are plug-and-play and fully autonomous. We provide intuitive dashboards for monitoring, while the AI handles the operations independently."
  },
  {
    question: "Can your AI products integrate with our current systems?",
    answer: "Yes. Each product supports API-first architecture and can integrate with existing CRM, ERP, LMS, HR, or finance systems for seamless workflow automation."
  },
  {
    question: "Which industries can use these products?",
    answer: "Our AI products serve multiple sectors including Fintech, E-commerce, Healthcare, Education, and Enterprises requiring scalable and autonomous operations."
  },
  {
    question: "How do your AI products improve operational efficiency?",
    answer: "By automating repetitive tasks, managing communication, analyzing data, and generating insights autonomously, they reduce overhead costs and accelerate business growth."
  },
  {
    question: "Are the products customizable for my business needs?",
    answer: "Yes. Each AI product can be tailored to your workflows, KPIs, and compliance requirements, ensuring maximum impact and alignment with your operations."
  },
  {
    question: "What level of support do you provide after deployment?",
    answer: "We offer continuous monitoring, performance optimization, and dedicated support to ensure your AI products evolve with your business requirements."
  },
  {
    question: "Can the AI products scale as my business grows?",
    answer: "Yes. Our architecture supports horizontal scaling. Whether you expand to new teams, users, or locations, the AI handles increasing workloads without compromising performance."
  },
  {
    question: "Can I combine multiple AI products?",
    answer: "Absolutely. You can deploy individual products or combine up to 5 modules for All-in-One automation. The integration is seamless and fully autonomous."
  },
  {
    question: "Do your AI products require cloud infrastructure?",
    answer: "Not necessarily. They can be deployed in cloud, on-premise, or hybrid environments depending on your data policies and operational preferences."
  },
  {
    question: "Are the AI products multilingual?",
    answer: "Yes. All products support 95+ global and regional languages with native-level accuracy for communication, reporting, and user interaction."
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
      className="py-24 pt-12 bg-[#020617] relative overflow-hidden" 
      aria-labelledby="faq-heading"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full pointer-events-none will-change-transform" />

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
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className={`group rounded-[2rem] border transition-all duration-500 ${
                  isOpen 
                  ? 'bg-white/[0.04] border-blue-500/40 shadow-2xl' 
                  : 'bg-transparent border-white/5 hover:border-white/15'
                }`}
              >
                <h3>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                    className="w-full px-8 py-7 md:py-9 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 rounded-[2rem]"
                  >
                    <span className={`text-lg md:text-xl font-bold transition-colors duration-300 ${
                      isOpen ? 'text-white' : 'text-slate-300 group-hover:text-white'
                    }`}>
                      {faq.question}
                    </span>
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isOpen 
                      ? 'bg-blue-500 text-white rotate-180' 
                      : 'bg-white/5 text-slate-500 group-hover:bg-white/10'
                    }`}>
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
                      animate={{ height: "auto", opacity: 1 }}
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

        <div className="mt-20 text-center">
          <p className="text-slate-500 mb-8 font-medium">
            Still have questions? Our engineers are here to help.
          </p>
          <button 
            aria-label="Contact our expert engineers via WhatsApp"
            onClick={() => window.open(`https://wa.me/918700236923?text=I have a technical question about AI agents.`, '_blank')}
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