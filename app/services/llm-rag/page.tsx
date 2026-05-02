// app/services/llm-rag/page.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Database, BrainCircuit, MessageSquare,
  ShieldCheck, Zap, ArrowRight, Link as LinkIcon,
  X, Loader2, ChevronRight, Mail, Users,
} from 'lucide-react';
import Navbar from '@/components/freelancex/layout/HomeNavbar';
import Footer from '@/components/freelancex/landing/Footer';
import { usePageContent } from '@/hooks/usePageContent';

// ── Helpers ───────────────────────────────────────────────────────────────────
function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface BulletItem  { text: string; icon: string }
interface StackCard   { title: string; desc: string; icon: string }

// ── Icon map ──────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  Search, Database, BrainCircuit, MessageSquare, ShieldCheck, Zap, LinkIcon,
};

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_BULLETS = JSON.stringify([
  { text: 'Sub-Second Semantic Retrieval',  icon: 'Search'      },
  { text: 'Zero-Data Training Policy',      icon: 'ShieldCheck' },
  { text: 'Multi-Source Data Ingestion',    icon: 'LinkIcon'    },
]);

const DEFAULT_STACK = JSON.stringify([
  { title: 'Vector Databases', desc: 'Expert deployment of Pinecone, Weaviate, and Milvus for lightning-fast embeddings.',                     icon: 'Database' },
  { title: 'Smart Chunking',   desc: 'Advanced semantic splitting of documents to ensure the LLM receives the most relevant context.',          icon: 'Zap'      },
  { title: 'Hybrid Search',    desc: 'Combining keyword search with semantic vector search for 99.9% accuracy.',                               icon: 'Search'   },
]);

export default function LLMRAGPage() {
  const [isModalOpen,  setIsModalOpen]  = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData,     setFormData]     = useState({ name: '', email: '' });

  const { get } = usePageContent('services-llm-rag');

  // ── CMS values ────────────────────────────────────────────────────────────
  const accentFrom     = get('hero', 'accent_from',     '#6366f1');
  const accentTo       = get('hero', 'accent_to',       '#10b981');
  const badgeText      = get('hero', 'badge_text',      'Advanced RAG Architectures');
  const heroPl         = get('hero', 'headline_plain',  'PROPRIETARY');
  const heroAcc        = get('hero', 'headline_accent', 'LLM & RAG');
  const heroBody       = get('hero', 'body_text',       'Eliminate hallucinations. We build Retrieval-Augmented Generation systems that ground LLMs in your enterprise data, providing factually accurate, context-aware responses in milliseconds.');
  const heroBtnLabel   = get('hero', 'btn_label',       'Optimize Your Model');

  const ragPl          = get('rag_explainer', 'headline_plain',  'Your Data,');
  const ragAcc         = get('rag_explainer', 'headline_accent', "Their Brain.");
  const ragBody        = get('rag_explainer', 'body_text',       "Standard LLMs know the world, but they don't know your company. Our RAG pipelines create a secure Semantic Bridge between your private PDF, SQL, and Cloud data and the world's most powerful models.");
  const ragBullets     = safeParse<BulletItem[]>(get('rag_explainer', 'bullets_json', DEFAULT_BULLETS), []);
  const ragUserMsg     = get('rag_explainer', 'demo_user_msg',   '"What was our Q3 revenue in the North region?"');
  const ragScanLabel   = get('rag_explainer', 'scan_label',      'Vector_Search_Scanning...');
  const ragBotMsg      = get('rag_explainer', 'demo_bot_msg',    'Based on [Sales_Report_2025.pdf], Q3 North revenue was $4.2M.');

  const stackPl        = get('stack', 'headline_plain',   'The RAG');
  const stackAcc       = get('stack', 'headline_accent',  'Stack');
  const stackSub       = get('stack', 'subheading',       'We deploy the most robust infrastructure for LLM context management.');
  const stackCards     = safeParse<StackCard[]>(get('stack', 'cards_json', DEFAULT_STACK), []);

  const ctaHeadline    = get('cta', 'headline',          'Fact-Check Your AI');
  const ctaBody        = get('cta', 'body_text',         'Our RAG engineers are ready to transform your company knowledge into a conversational asset.');
  const ctaBtnLabel    = get('cta', 'btn_label',         'START RAG AUDIT');
  const ctaLocation    = get('cta', 'location_display',  'Location: Gurugram, HR');
  const ctaVerified    = get('cta', 'verified_label',    'Zero-Hallucination Guarantee');

  const modalBadge     = get('contact_modal', 'badge_label',     'RAG Inquiry');
  const modalBtn       = get('contact_modal', 'btn_label',       'Send via WhatsApp');
  const modalFooter    = get('contact_modal', 'footer_note',     'Secure inquiry powered by Manee Pro 2.5');
  const modalWa        = get('contact_modal', 'whatsapp_number', '918700236923');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const msg = `*🧠 RAG Inquiry*%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}`;
    setTimeout(() => {
      window.open(`https://wa.me/${modalWa}?text=${msg}`, '_blank');
      setIsSubmitting(false);
      setIsModalOpen(false);
    }, 1500);
  };

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden font-sans">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full -z-10 pointer-events-none"
          style={{ background: `${accentFrom}1a`, filter: 'blur(120px)' }} />
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{ background: `${accentFrom}1a`, border: `1px solid ${accentFrom}33` }}>
            <BrainCircuit className="w-4 h-4" style={{ color: accentFrom }} />
            <span className="text-xs font-black uppercase tracking-widest" style={{ color: accentFrom }}>{badgeText}</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            {heroPl}<br />
            <span className="italic" style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {heroAcc}
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            {heroBody}
          </motion.p>

          <button onClick={() => setIsModalOpen(true)}
            className="px-10 py-5 rounded-2xl font-bold transition-all shadow-xl flex items-center gap-2 mx-auto hover:scale-105 active:scale-95"
            style={{ background: accentFrom, boxShadow: `0 20px 40px ${accentFrom}40` }}>
            {heroBtnLabel} <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* ── RAG EXPLAINER ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter">{ragPl}<br />{ragAcc}</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">{ragBody}</p>
            <div className="space-y-4">
              {ragBullets.map((item, idx) => {
                const Icon = ICON_MAP[item.icon] ?? Zap;
                return (
                  <div key={idx} className="flex items-center gap-4 p-4 rounded-xl border border-white/5"
                    style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <Icon size={18} style={{ color: accentFrom }} />
                    <span className="font-bold text-gray-200">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Demo Chat */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-[4rem] blur opacity-20"
              style={{ background: `${accentFrom}` }} />
            <div className="relative bg-[#03081a] border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="p-4 rounded-2xl border border-white/5 text-sm font-mono"
                    style={{ background: 'rgba(255,255,255,0.05)', color: `${accentFrom}cc` }}>
                    {ragUserMsg}
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="h-8 w-px" style={{ background: `${accentFrom}80` }} />
                  <div className="px-4 py-2 rounded-full text-[10px] font-black tracking-widest uppercase text-white"
                    style={{ background: accentFrom }}>
                    {ragScanLabel}
                  </div>
                  <div className="h-8 w-px" style={{ background: `${accentFrom}80` }} />
                </div>
                <div className="flex gap-4 justify-end">
                  <div className="p-4 rounded-2xl border text-sm font-bold max-w-[80%]"
                    style={{ background: `${accentFrom}20`, borderColor: `${accentFrom}50` }}>
                    {ragBotMsg}
                  </div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: accentFrom }}>
                    <BrainCircuit className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STACK CARDS ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold italic">
            {stackPl} <span style={{ color: accentFrom }}>{stackAcc}</span>
          </h2>
          <p className="text-gray-500 mt-4">{stackSub}</p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {stackCards.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? Zap;
            return (
              <motion.div key={i} whileHover={{ y: -8 }}
                className="p-10 rounded-[2.5rem] border border-white/5 transition-all"
                style={{ background: `${accentFrom}08` }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentFrom}50`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                <div className="mb-6 p-4 rounded-2xl inline-block" style={{ background: `${accentFrom}1a` }}>
                  <Icon size={24} style={{ color: accentFrom }} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden"
          style={{ backgroundImage: `linear-gradient(to bottom right, ${accentFrom}66, ${accentTo}33)`, border: `1px solid ${accentFrom}33` }}>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">{ctaHeadline}</h2>
            <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button onClick={() => setIsModalOpen(true)}
                className="bg-white px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl"
                style={{ color: accentFrom }}>
                {ctaBtnLabel}
              </button>
              <div className="font-mono text-sm tracking-widest uppercase" style={{ color: accentFrom }}>{ctaLocation}</div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-3 mt-8">
          <ShieldCheck size={14} className="text-emerald-500" />
          <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">{ctaVerified}</span>
        </div>
      </section>

      <Footer />

      {/* ── CONTACT MODAL ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/95 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="relative bg-[#0a0f1d] border border-white/10 p-8 md:p-12 rounded-[2.5rem] max-w-lg w-full shadow-2xl">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 p-2 text-slate-500 hover:text-white transition-colors">
                <X size={24} />
              </button>
              <div className="mb-10 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-3" style={{ color: accentFrom }}>{modalBadge}</p>
                <h3 className="text-2xl font-black tracking-tight uppercase">Get In Touch</h3>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative group">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                  <input required type="text" placeholder="Your Full Name"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 text-sm text-white focus:border-indigo-500 outline-none transition-all placeholder:text-slate-700"
                    value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                  <input required type="email" placeholder="Your Email"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 text-sm text-white focus:border-indigo-500 outline-none transition-all placeholder:text-slate-700"
                    value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <button disabled={isSubmitting} type="submit"
                  className="w-full py-5 font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 text-xs active:scale-95"
                  style={{ background: accentFrom }}>
                  {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <>{modalBtn} <ChevronRight size={18} /></>}
                </button>
                <p className="text-[8px] font-black text-center text-slate-600 uppercase tracking-widest mt-6 border-t border-white/5 pt-4">{modalFooter}</p>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}