// app/home/insights/page.tsx
'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import {
  TrendingUp,
  BookOpen,
  Calendar,
  User,
  ArrowRight,
  Search,
  Filter,
  Sparkles,
} from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface FeaturedPost  { category: string; title: string; excerpt: string; author: string; date: string; image: string }
interface SidePost      { category: string; title: string; date: string }
interface RecentPost    { title: string; excerpt: string; readTime: string }

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_FEATURED_POSTS = JSON.stringify([
  {
    category: 'Technical',
    title:    'The Rise of Agentic Swarms in Supply Chain Management',
    excerpt:  'How multi-agent systems are outperforming traditional linear AI in complex logistics routing.',
    author:   'Technical Lead',
    date:     'Jan 12, 2026',
    image:    'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
], null, 2);

const DEFAULT_SIDE_POSTS = JSON.stringify([
  { category: 'Strategy', title: 'Private LLMs: The New Standard for Data Sovereignty',     date: 'Jan 08, 2026' },
  { category: 'Future',   title: 'Predictive Maintenance 2.0: Beyond Sensors',              date: 'Jan 03, 2026' },
], null, 2);

const DEFAULT_RECENT_POSTS = JSON.stringify([
  { title: 'Implementing Multimodal RAG with Vector Architectures', excerpt: 'Deep dive into embedding videos and images for better context retrieval.',         readTime: '7 Min Read' },
  { title: 'The Engineering Behind Sub-10ms Inference at Scale',    excerpt: 'Hardware-software co-design patterns for ultra-low latency LLM serving.',          readTime: '9 Min Read' },
  { title: 'Autonomous Agents & the Future of DevOps Pipelines',    excerpt: 'How LLM-based agents are replacing traditional CI/CD orchestration logic.',        readTime: '6 Min Read' },
  { title: 'Tokenomics of Fine-tuning: Real Cost Breakdown',        excerpt: 'Breaking down compute costs of LoRA, QLoRA, and full fine-tune at different scales.',readTime: '5 Min Read' },
], null, 2);

export default function InsightsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { get } = usePageContent('home-insights');

  // ── Hero ─────────────────────────────────────────────────────────────────
  const accentColor      = get('hero', 'accent_color',    '#3b82f6');
  const badgeText        = get('hero', 'badge_text',      'Neural Perspectives');
  const heroPl           = get('hero', 'headline_plain',  'Intel &');
  const heroAcc          = get('hero', 'headline_accent', 'Insights.');
  const searchPlaceholder= get('hero', 'search_placeholder','Search intel...');

  // ── Featured Posts ────────────────────────────────────────────────────────
  const featuredPosts    = safeParse<FeaturedPost[]>(get('featured', 'posts_json', DEFAULT_FEATURED_POSTS), []);
  const sidePosts        = safeParse<SidePost[]>(get('featured', 'side_posts_json', DEFAULT_SIDE_POSTS), []);

  // ── Recent Log ────────────────────────────────────────────────────────────
  const recentHl         = get('recent', 'headline_plain',  'Recent');
  const recentAcc        = get('recent', 'headline_accent', 'Log.');
  const archiveLabel     = get('recent', 'archive_label',   'View Archive +');
  const recentPosts      = safeParse<RecentPost[]>(get('recent', 'posts_json', DEFAULT_RECENT_POSTS), []);

  // ── Newsletter CTA ────────────────────────────────────────────────────────
  const ctaHl            = get('newsletter', 'headline',          'Stay Ahead of The Curve.');
  const ctaBody          = get('newsletter', 'body_text',         'Join 2,000+ engineers receiving our weekly brief on the state of production AI.');
  const ctaBtnLabel      = get('newsletter', 'btn_label',         'Subscribe');
  const ctaEmailLabel    = get('newsletter', 'email_placeholder', 'Your Signal (Email)');

  const filteredFeatured = featuredPosts.filter(p =>
    !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-600/30 font-sans">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 md:pt-52 md:pb-32 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(37,99,235,0.07)_0%,_transparent_60%)] -z-10" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-8">
              <Sparkles style={{ color: accentColor }} className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]" style={{ color: `${accentColor}cc` }}>{badgeText}</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.85] mb-0">
              {heroPl} <br />
              <span className="italic text-transparent bg-clip-text"
                style={{ backgroundImage: `linear-gradient(to right, #93c5fd, ${accentColor}, #6366f1)` }}>
                {heroAcc}
              </span>
            </h1>
          </div>
          <div className="w-full md:w-auto flex items-center gap-4 bg-white/5 border border-white/10 p-2 rounded-2xl backdrop-blur-xl">
            <div className="flex items-center gap-3 px-4 py-2 border-r border-white/10">
              <Search size={16} className="text-slate-500" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none text-sm font-medium w-40"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest text-slate-400">
              <Filter size={14} /> Sort By
            </button>
          </div>
        </div>
      </section>

      {/* ── FEATURED GRID ────────────────────────────────────────────────── */}
      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main featured */}
          {filteredFeatured.map((post, i) => (
            <div key={i} className="lg:col-span-8 group cursor-pointer relative overflow-hidden rounded-[3rem] border border-white/5 bg-slate-900/40 aspect-[16/10] md:aspect-auto">
              <img
                src={post.image}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:scale-105 group-hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full">
                <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 inline-block"
                  style={{ background: `${accentColor}33`, border: `1px solid ${accentColor}4d`, color: '#93c5fd' }}>
                  {post.category}
                </span>
                <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 transition-colors leading-none group-hover:text-blue-400">
                  {post.title}
                </h2>
                <p className="max-w-xl text-slate-400 text-lg font-light mb-8 group-hover:text-slate-200 transition-colors">{post.excerpt}</p>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    <User size={14} style={{ color: accentColor }} /> {post.author}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    <Calendar size={14} style={{ color: accentColor }} /> {post.date}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Side posts */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {sidePosts.map((post, i) => (
              <div key={i} className="flex-1 group cursor-pointer p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/20 transition-all flex flex-col justify-between overflow-hidden relative">
                <div className="relative z-10">
                  <span className="text-[10px] font-black uppercase tracking-widest mb-4 inline-block" style={{ color: accentColor }}>{post.category}</span>
                  <h3 className="text-xl font-black uppercase italic tracking-tight leading-tight group-hover:text-blue-400 transition-colors">{post.title}</h3>
                </div>
                <div className="mt-8 flex items-center justify-between relative z-10">
                  <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{post.date}</div>
                  <div className="p-3 bg-white/5 rounded-full group-hover:bg-blue-600 transition-all">
                    <ArrowRight size={16} />
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 blur-[80px] group-hover:opacity-100 opacity-0 transition-all"
                  style={{ background: `${accentColor}0d` }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECENT LOG ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-2xl font-black italic uppercase tracking-tighter">
              {recentHl} <span style={{ color: accentColor }}>{recentAcc}</span>
            </h2>
            <button className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">{archiveLabel}</button>
          </div>
          <div className="space-y-12">
            {recentPosts.map((post, i) => (
              <div key={i} className="group flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-12 cursor-pointer">
                <div className="flex gap-8 items-center">
                  <span className="text-xs font-mono text-slate-700">0{i + 1}</span>
                  <div>
                    <h4 className="text-xl font-bold group-hover:text-blue-500 transition-colors">{post.title}</h4>
                    <p className="text-slate-500 text-sm mt-1">{post.excerpt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">{post.readTime}</span>
                  <ArrowRight size={20} className="text-slate-800 group-hover:text-white transition-all group-hover:translate-x-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER CTA ───────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto p-12 md:p-24 rounded-[4rem] text-center relative overflow-hidden"
          style={{ background: `linear-gradient(to bottom right, ${accentColor}1a, transparent)`, border: `1px solid ${accentColor}33` }}>
          <div className="absolute top-0 right-0 w-64 h-64 blur-[120px]" style={{ background: `${accentColor}1a` }} />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-8 leading-none">
              {ctaHl.split(' ').slice(0, -1).join(' ')} <br />
              <span style={{ color: accentColor, textDecoration: 'underline', textDecorationColor: 'rgba(255,255,255,0.1)', textUnderlineOffset: 8 }}>
                {ctaHl.split(' ').at(-1)}
              </span>
            </h2>
            <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto">{ctaBody}</p>
            <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder={ctaEmailLabel}
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none text-sm font-medium transition-all"
                style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                onFocus={e => (e.target.style.borderColor = `${accentColor}80`)}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
              />
              <button className="bg-white text-black px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">
                {ctaBtnLabel}
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}