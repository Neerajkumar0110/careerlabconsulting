'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { usePageContent } from '@/hooks/usePageContent';

// ── Utility ───────────────────────────────────────────────────────────────────
const driveToImage = (url: string): string => {
  if (!url || !url.includes('drive.google.com')) return url;
  const id = url.match(/[-\w]{25,}/);
  return id ? `https://lh3.googleusercontent.com/d/${id[0]}` : url;
};

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface Award   { img: string; text: string; rating: number; reviews: number }
interface Article { title: string; category: string; readTime: string; img: string }

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_AWARDS: Award[] = [
  { img: 'https://quintagroup.com/blog/blog-images/clutch-badge.png/@@images/ddd091dd-4684-4302-ba86-b2931f9078f5.png', text: 'Top AI Development Firm 2019', rating: 4.6, reviews: 12786 },
  { img: 'https://www.catalyst2.com/wp-content/uploads/2018/01/Deloitte-fast-50-UK-technology-company.png', text: 'Deloitte Technology Fast 50 Winner', rating: 4.8, reviews: 9654 },
  { img: 'https://www.redeagle.tech/img/logo/partner/microsoftpartner-multiline-light.webp?v=F59uTJJDUIM0Wom_OXRUn4OTWKA4fQc8XEp7IYNfPns', text: 'Most Reviewed AI Partner', rating: 4.7, reviews: 32210 },
];
const DEFAULT_ARTICLES: Article[] = [
  { title: 'Autonomous AI Agents: The Shift from SaaS to Agent-as-Service', category: 'AI Strategy', readTime: '6 min', img: 'https://drive.google.com/file/d/1UzsxRuxsG3AgZqjfjnn9PoVM12Qw6KLw/view?usp=drive_link' },
  { title: 'Optimizing RAG Pipelines for Enterprise-Grade Accuracy', category: 'Technical', readTime: '8 min', img: 'https://drive.google.com/file/d/1uRWRa8SdFPA4bonNPQ9gXG_-OpMaQbJ5/view?usp=drive_link' },
  { title: 'Next-Gen SEO: Ranking in the Age of AI Search (SGE)', category: 'Marketing', readTime: '5 min', img: 'https://drive.google.com/file/d/1GP27PWh6eqHSmrMoX3idRMNnTIUA7TS2/view?usp=drive_link' },
];

// ── Star Rating Sub-component ─────────────────────────────────────────────────
const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1 mt-2">
    {Array.from({ length: 5 }).map((_, index) => {
      const fill = Math.min(Math.max(rating - index, 0), 1);
      return (
        <div key={index} className="relative w-6 h-6">
          <svg viewBox="0 0 24 24" className="absolute w-6 h-6 text-gray-300" fill="currentColor">
            <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.787 1.401 8.168L12 18.896l-7.335 3.87 1.401-8.168L.132 9.211l8.2-1.193z" />
          </svg>
          <svg viewBox="0 0 24 24" className="absolute w-6 h-6 text-yellow-400"
            style={{ clipPath: `inset(0 ${100 - fill * 100}% 0 0)` }} fill="currentColor">
            <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.787 1.401 8.168L12 18.896l-7.335 3.87 1.401-8.168L.132 9.211l8.2-1.193z" />
          </svg>
        </div>
      );
    })}
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────
const TrustAndArticles = () => {
  const { get } = usePageContent('trust-articles');

  // ── CMS values ──────────────────────────────────────────────────────────────
  const awardsHeading   = get('trust_awards',   'section_heading',  'Trusted Excellence');
  const googleLogoUrl   = get('trust_awards',   'google_logo_url',  'https://drive.google.com/file/d/14Svcgdcte3889QtGJaJv6sq8kTregl3z/view?usp=drive_link');
  const awardsRaw       = get('trust_awards',   'awards_json',      JSON.stringify(DEFAULT_AWARDS));

  const articlesLabel   = get('trust_articles', 'section_label',    'Knowledge Base');
  const articlesHeading = get('trust_articles', 'section_heading',  'Latest Insights.');
  const exploreBtnLabel = get('trust_articles', 'explore_btn_label', 'Explore All');
  const whatsappNumber  = get('trust_articles', 'whatsapp_number',  '918700236923');
  const articleAuthor   = get('trust_articles', 'article_author',   'Career Lab Consulting');
  const articlesRaw     = get('trust_articles', 'articles_json',    JSON.stringify(DEFAULT_ARTICLES));
  const accentColor     = get('trust_articles', 'accent_color',     '#dc2626');

  const awards   = safeParse<Award[]>(awardsRaw, DEFAULT_AWARDS);
  const articles = safeParse<Article[]>(articlesRaw, DEFAULT_ARTICLES);

  // ── Carousel ──────────────────────────────────────────────────────────────
  const trackRef        = useRef<HTMLDivElement>(null);
  const autoScrollRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPausedRef     = useRef(false);

  const scrollBy = useCallback((direction: 'left' | 'right') => {
    if (!trackRef.current) return;
    const el = trackRef.current;
    const firstCard = el.querySelector('article') as HTMLElement | null;
    if (!firstCard) return;
    const step = firstCard.offsetWidth + parseInt(window.getComputedStyle(el).columnGap || '32', 10);
    const maxScroll = el.scrollWidth - el.clientWidth;
    let next = el.scrollLeft + (direction === 'right' ? step : -step);
    if (next > maxScroll) next = 0;
    else if (next < 0) next = maxScroll;
    el.scrollTo({ left: next, behavior: 'smooth' });
  }, []);

  const startAutoScroll = useCallback(() => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    autoScrollRef.current = setInterval(() => {
      if (!isPausedRef.current) scrollBy('right');
    }, 4000);
  }, [scrollBy]);

  useEffect(() => {
    startAutoScroll();
    return () => { if (autoScrollRef.current) clearInterval(autoScrollRef.current); };
  }, [startAutoScroll]);

  const handleNav = (dir: 'left' | 'right') => {
    isPausedRef.current = true;
    scrollBy(dir);
    setTimeout(() => { isPausedRef.current = false; }, 2000);
  };

  const handleArticleClick = (title: string) => {
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi, I'm interested in learning more about: ${title}`)}`, '_blank');
  };

  return (
    <section className="bg-[#020617] py-16 md:py-24 px-4 sm:px-10 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* ── Awards heading ─────────────────────────────────────────────── */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter uppercase">{awardsHeading}</h2>
          <div className="h-1 w-20 mx-auto" style={{ background: accentColor }} aria-hidden="true" />
        </div>

        {/* ── Awards grid ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {awards.map((award, i) => (
            <div key={i} className="group relative flex flex-col items-center p-10 bg-gradient-to-br from-white to-gray-50 rounded-3xl border-2 border-gray-200 hover:border-yellow-400 transition-all hover:shadow-2xl hover:-translate-y-3 duration-500 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-100 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
              <div className="relative mb-8 transform group-hover:scale-110 transition-transform duration-500">
                <img src={award.img} alt={award.text} className="relative h-20 w-40 object-contain drop-shadow-lg" loading="lazy" />
              </div>
              <div className="relative z-10 mb-8">
                <h3 className="text-gray-900 text-center font-black text-xs md:text-sm tracking-wider uppercase bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-200 px-6 py-3 rounded-full shadow-lg border-2 border-yellow-400 whitespace-nowrap">
                  {award.text}
                </h3>
              </div>
              <div className="relative z-10 flex flex-col items-center space-y-2">
                <div className="flex items-center gap-2.5 bg-white px-4 py-2 rounded-full shadow-md border border-gray-200">
                  <Image src={driveToImage(googleLogoUrl)} alt="Google" width={24} height={24} className="object-contain" />
                  <span className="text-xl md:text-2xl font-bold text-gray-900">{award.rating.toFixed(1)}</span>
                </div>
                <StarRating rating={award.rating} />
                <p className="text-sm text-gray-600 font-medium">{award.reviews.toLocaleString()}+ reviews</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Articles header ─────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-10 gap-6">
          <div className="max-w-2xl">
            <span className="font-bold tracking-[0.3em] text-xs uppercase" style={{ color: accentColor }}>{articlesLabel}</span>
            <h2 className="text-4xl md:text-6xl font-black mt-2">{articlesHeading}</h2>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button className="text-xs font-bold py-3 px-6 border border-gray-800 rounded-full hover:bg-white hover:text-black transition-all uppercase tracking-widest">
              {exploreBtnLabel}
            </button>
            {(['left', 'right'] as const).map((dir) => (
              <button key={dir} onClick={() => handleNav(dir)} aria-label={`${dir === 'left' ? 'Previous' : 'Next'} articles`}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-700 transition-all duration-300 group"
                onMouseEnter={e => { e.currentTarget.style.borderColor = accentColor; e.currentTarget.style.background = `${accentColor}1a`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#374151'; e.currentTarget.style.background = 'transparent'; }}
              >
                <svg className="w-4 h-4 text-gray-400 transition-colors" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  {dir === 'left'
                    ? <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    : <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />}
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* ── Carousel ───────────────────────────────────────────────────── */}
        <div className="relative">
          <div ref={trackRef}
            onMouseEnter={() => { isPausedRef.current = true; }}
            onMouseLeave={() => { isPausedRef.current = false; }}
            onTouchStart={() => { isPausedRef.current = true; }}
            onTouchEnd={() => { isPausedRef.current = false; }}
            className="flex gap-8 overflow-x-auto pb-4 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {articles.map((art, i) => (
              <article key={i} onClick={() => handleArticleClick(art.title)}
                className="group cursor-pointer flex-shrink-0 w-[90vw] sm:w-[340px] md:w-[360px] lg:w-[380px] bg-slate-900/10 border border-gray-900 rounded-[2rem] overflow-hidden transition-all duration-500"
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${accentColor}66`;
                  e.currentTarget.style.boxShadow = `0 0 30px ${accentColor}1a`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#111827';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className="h-56 relative overflow-hidden">
                  <Image src={driveToImage(art.img)} alt={art.title} fill
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                    sizes="(max-width: 640px) 80vw, 380px" />
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">
                    {art.category}
                  </div>
                </div>
                <div className="p-7">
                  <div className="flex justify-between text-gray-500 text-[10px] font-bold uppercase tracking-tighter mb-4">
                    <span>{articleAuthor}</span>
                    <span>{art.readTime} Read</span>
                  </div>
                  <h3 className="text-lg font-bold leading-tight mb-4 line-clamp-2 transition-colors"
                    onMouseEnter={e => { e.currentTarget.style.color = accentColor; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#fff'; }}
                  >
                    {art.title}
                  </h3>
                  <div className="flex items-center text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: accentColor }}>
                    Read More
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default TrustAndArticles;