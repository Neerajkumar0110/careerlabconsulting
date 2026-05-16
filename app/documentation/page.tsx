'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { usePageContent } from '@/hooks/usePageContent';
import {
  Terminal, Book, Code2, Cpu, Lock, Braces, Copy,
  ChevronRight, Blocks, Zap, Globe,
} from 'lucide-react';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

interface SidebarItem   { label: string }
interface EndpointItem  { method: string; path: string; color: string }
interface FeatureCard   { title: string; desc: string; icon: string; color: string }
interface TocItem       { label: string; active?: boolean }

const ICON_MAP: Record<string, React.ElementType> = { Zap, Lock, Cpu, Globe, Code2, Terminal, Blocks };

const DEFAULT_SIDEBAR_NAV = JSON.stringify([
  { label: 'Introduction' }, { label: 'Architecture Overview' }, { label: 'API Authentication' }, { label: 'Rate Limits' },
], null, 2);
const DEFAULT_ENDPOINTS = JSON.stringify([
  { method: 'POST', path: '/v1/chat/completions', color: '#10b981' },
  { method: 'POST', path: '/v1/embeddings',       color: '#3b82f6' },
  { method: 'GET',  path: '/v1/models/weights',   color: '#8b5cf6' },
], null, 2);
const DEFAULT_FEATURE_CARDS = JSON.stringify([
  { title: 'Sub-100ms TTFT', desc: 'Optimized speculative decoding for near-instant first token generation.', icon: 'Zap',  color: '#6366f1' },
  { title: 'SOC2 Data Guard', desc: 'Automated compliance mapping for every inference call made to the model.', icon: 'Lock', color: '#8b5cf6' },
], null, 2);
const DEFAULT_TOC = JSON.stringify([
  { label: 'Quick Start', active: true }, { label: 'Integration Guide' }, { label: 'Inference Parameters' }, { label: 'Error Handling' }, { label: 'SDK Roadmap' },
], null, 2);

export default function DocumentationPage() {
  const { get } = usePageContent('home-documentation');

  const accentFrom     = get('hero', 'accent_from',     '#6366f1');
  const accentTo       = get('hero', 'accent_to',       '#8b5cf6');
  const docVersion     = get('hero', 'doc_version',     'Developer Reference v2.4.0');
  const heroPl         = get('hero', 'headline_plain',  'The');
  const heroAcc        = get('hero', 'headline_accent', 'Neural SDK.');
  const heroBody       = get('hero', 'body_text',       'Connect your legacy enterprise systems to high-performance private LLMs. Our SDK handles the complex orchestration of vector retrieval, prompt safety, and token efficiency automatically.');
  const heroImageUrl   = get('hero', 'hero_image_url',  'https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
  const heroImgCaption = get('hero', 'image_caption',   'Distributed Inference Architecture');
  const heroImgBody    = get('hero', 'image_body',      'Our global edge network reduces LLM latency by processing non-sensitive tokens at the nearest node.');

  const sidebarNav     = safeParse<SidebarItem[]>(get('sidebar', 'nav_json', DEFAULT_SIDEBAR_NAV), []);
  const endpoints      = safeParse<EndpointItem[]>(get('sidebar', 'endpoints_json', DEFAULT_ENDPOINTS), []);
  const sidebarStatus  = get('sidebar', 'status_label', 'All Clusters Operational');
  const installHeading = get('installation', 'heading',         '01. Integration');
  const installBody    = get('installation', 'body_text',       'Install the core library using your preferred package manager:');
  const installCmd     = get('installation', 'install_command', '$ npm install @gurugram-ai/core-sdk');
  const inferenceHead  = get('inference', 'heading',       '02. Secure Inference');
  const inferenceFile  = get('inference', 'file_label',    'Inference_Request.ts');
  const inferenceCode  = get('inference', 'code_snippet',  `const response = await ai.chat.completions.create({
  model: "gurugram-ultra-v1",
  messages: [{ role: "user", content: "Analyze market debt." }],
  security: {
    pii_redaction: true,
    adversarial_check: true
  },
  stream: true
});`);

  const featureCards   = safeParse<FeatureCard[]>(get('features', 'items_json', DEFAULT_FEATURE_CARDS), []);
  const tocItems       = safeParse<TocItem[]>(get('toc', 'items_json', DEFAULT_TOC), []);
  const tocPostmanNote = get('toc', 'postman_note',  'Download the postman collection for rapid testing.');
  const tocPostmanBtn  = get('toc', 'postman_btn',   'Download .JSON');
  const footerHeading  = get('footer_cta', 'heading', 'Ready for the deep end?');
  const footerBody     = get('footer_cta', 'body',    'Request a production API key for enterprise deployments.');
  const footerBtn      = get('footer_cta', 'btn_label','Get API Access');

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-indigo-500/30 font-mono">
      <Navbar />
      <div className="max-w-[1600px] mx-auto flex pt-24">

        {/* ── SIDEBAR LEFT ─────────────────────────────────────────────── */}
        <aside className="hidden lg:block w-80 h-[calc(100vh-6rem)] sticky top-24 border-r border-white/5 p-8 overflow-y-auto bg-[#020617]/50 backdrop-blur-md">
          <div className="mb-10">
            <h5 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 italic underline underline-offset-8 decoration-current/30"
              style={{ color: accentFrom }}>Getting Started</h5>
            <ul className="space-y-4">
              {sidebarNav.map(item => (
                <li key={item.label} className="text-sm text-slate-400 hover:text-white cursor-pointer transition-all flex items-center group">
                  <ChevronRight size={12} className="mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" style={{ color: accentFrom }} />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-10">
            <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6 italic">Model Endpoints</h5>
            <ul className="space-y-4">
              {endpoints.map((ep, i) => (
                <li key={i} className="text-[11px] text-slate-400 hover:text-white cursor-pointer flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold" style={{ background: `${ep.color}1a`, color: ep.color }}>{ep.method}</span>
                  {ep.path}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-6 rounded-2xl" style={{ background: `${accentFrom}0d`, border: `1px solid ${accentFrom}1a` }}>
            <p className="text-[10px] font-bold mb-2 uppercase tracking-widest" style={{ color: accentFrom }}>System Status</p>
            <div className="flex items-center gap-2 text-[10px] text-emerald-400">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> {sidebarStatus}
            </div>
          </div>
        </aside>

        {/* ── MAIN CONTENT ─────────────────────────────────────────────── */}
        <article className="flex-1 px-6 md:px-12 lg:px-20 py-12 scroll-smooth">
          <header className="mb-16">
            <div className="flex items-center gap-4 mb-6" style={{ color: accentFrom }}>
              <Book size={18} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">{docVersion}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 italic text-white">
              {heroPl} <span className="underline decoration-white/10 underline-offset-12" style={{ color: accentFrom }}>{heroAcc}</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-3xl font-sans font-light">{heroBody}</p>
          </header>

          {/* Hero image */}
          <section className="mb-20">
            <div className="relative aspect-video w-full rounded-[2.5rem] overflow-hidden border border-white/5 bg-slate-900/50 group">
              <img src={heroImageUrl} alt="Neural Network Architecture"
                className="w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-1000" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                <div className="p-4 rounded-full mb-6 border" style={{ background: `${accentFrom}20`, borderColor: `${accentFrom}33` }}>
                  <Globe className="animate-spin" style={{ color: accentFrom, animationDuration: '8s' }} />
                </div>
                <h4 className="text-2xl font-black uppercase italic mb-4">{heroImgCaption}</h4>
                <p className="max-w-md text-slate-400 text-sm font-sans">{heroImgBody}</p>
              </div>
            </div>
          </section>

          {/* Installation */}
          <section className="mb-20" id="installation">
            <h3 className="text-2xl font-black mb-8 flex items-center gap-3 uppercase italic">
              <Blocks size={24} style={{ color: accentFrom }} /> {installHeading}
            </h3>
            <p className="text-slate-400 mb-6 font-sans">{installBody}</p>
            <div className="bg-black/40 border border-white/5 rounded-2xl p-6 flex items-center justify-between group">
              <code className="text-sm" style={{ color: accentFrom }}>{installCmd}</code>
              <Copy size={16} className="text-slate-600 hover:text-white cursor-pointer transition-colors" />
            </div>
          </section>

          {/* Inference */}
          <section className="mb-20" id="inference">
            <h3 className="text-2xl font-black mb-8 flex items-center gap-3 uppercase italic">
              <Terminal size={24} style={{ color: accentFrom }} /> {inferenceHead}
            </h3>
            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <div className="bg-white/5 px-6 py-3 border-b border-white/5 flex justify-between items-center">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{inferenceFile}</span>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20" />
                </div>
              </div>
              <pre className="p-8 text-sm leading-relaxed overflow-x-auto bg-[#0b0e14]">
                <code className="text-slate-300">{inferenceCode}</code>
              </pre>
            </div>
          </section>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {featureCards.map((card, i) => {
              const Icon = ICON_MAP[card.icon] ?? Zap;
              return (
                <div key={i} className="p-8 rounded-[2rem]" style={{ background: `${card.color}0d`, border: `1px solid ${card.color}1a` }}>
                  <Icon className="mb-4" size={32} style={{ color: card.color }} />
                  <h4 className="font-black uppercase mb-2 italic">{card.title}</h4>
                  <p className="text-slate-500 text-sm font-sans">{card.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Footer CTA */}
          <footer className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
            <div>
              <h4 className="text-xl font-bold uppercase italic mb-2">{footerHeading}</h4>
              <p className="text-slate-500 text-sm font-sans">{footerBody}</p>
            </div>
            <button className="bg-white text-black px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">
              {footerBtn}
            </button>
          </footer>
        </article>

        {/* ── SIDEBAR RIGHT (TOC) ───────────────────────────────────────── */}
        <aside className="hidden xl:block w-72 h-[calc(100vh-6rem)] sticky top-24 p-8">
          <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-8 italic">Contents</h5>
          <ul className="space-y-4 text-[11px] text-slate-500 border-l border-white/5 pl-4 uppercase font-bold tracking-tighter">
            {tocItems.map((item, i) => (
              <li key={i} className="cursor-pointer transition-colors hover:text-white" style={item.active ? { color: accentFrom } : {}}>
                {item.label}
              </li>
            ))}
          </ul>
          <div className="mt-20 p-6 rounded-3xl bg-slate-900/50 border border-white/5">
            <Braces className="mb-4" size={20} style={{ color: accentFrom }} />
            <p className="text-[10px] text-slate-400 leading-relaxed font-sans mb-4">{tocPostmanNote}</p>
            <button className="text-[10px] font-black uppercase text-white underline underline-offset-4">{tocPostmanBtn}</button>
          </div>
        </aside>
      </div>
      <Footer />
    </main>
  );
}