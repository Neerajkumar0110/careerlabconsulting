'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

// ── Types ─────────────────────────────────────────────────────────────────────
interface NewsItem {
  id:     number;
  title:  string;
  source: string;
  logo:   string;
  desc:   string;
}

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_NEWS: NewsItem[] = [
  { id: 1, title: 'CLC Tops InternX Training Rankings:',   source: 'BW BUSINESSWORLD',  logo: 'https://static.businessworld.in/bw-main-logo.png',                                                                                                              desc: 'Recognized as a leader in Online Training Space.'                     },
  { id: 2, title: '119th Training AI Agents opens in india.', source: 'THE TIMES OF INDIA', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQps8ve-lA2zYqKa6DA_-em5XLdgScm0h24Q&s',                                                            desc: 'Strengthening nationwide presence for analytics education.'            },
  { id: 3, title: 'Footprint Expands to Middle East',       source: 'Hindustan Times',   logo: 'https://wp.logos-download.com/wp-content/uploads/2019/07/Hindustan_Times_Logo.png?dl',                                                                        desc: 'New Dubai Center to launch by August 2023.'                           },
  { id: 4, title: 'Curriculum Ranked Most Industry-Relevant', source: 'The Print',       logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/ThePrint_logo.png',                                                                                        desc: "IAF ranking testament to CLC's understanding of market demands."      },
  { id: 5, title: 'Global Recognition in Internships',      source: 'Business Standard', logo: 'https://yt3.googleusercontent.com/FQvVwa76pC2yYyQYatT9HsAtg1IfzFVFcuKL8r8oF03-pgJ7D7Gj_CEYPTeJOAeSp-C1fPjk=s900-c-k-c0x00ffffff-no-rj',                    desc: 'CLC recognized for world-class professional training modules.'         },
];
const DEFAULT_NEWS_JSON = JSON.stringify(DEFAULT_NEWS);

// ─────────────────────────────────────────────────────────────────────────────

export default function MediaPresence() {
  const { get } = usePageContent('media-presence');

  // ── CMS values ────────────────────────────────────────────────────────────
  const eyebrow      = get('header', 'eyebrow',          'Recognition');
  const headLine1    = get('header', 'headline_line_1',  'OUR MEDIA');
  const headLine2    = get('header', 'headline_line_2',  'PRESENCE');
  const accentColor  = get('header', 'accent_color',     '#2563eb');
  const scrollHint   = get('header', 'scroll_hint',      'Swipe to explore');

  const itemsRaw     = get('news', 'items_json',          DEFAULT_NEWS_JSON);
  const newsItems    = safeParse<NewsItem[]>(itemsRaw,    DEFAULT_NEWS);
  const intervalRaw  = get('news', 'auto_scroll_interval_ms', '4000');
  const autoInterval = parseInt(intervalRaw, 10) || 4000;

  // ── Scroll logic ──────────────────────────────────────────────────────────
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const offset = clientWidth > 768 ? 400 : 320;
    const scrollTo = direction === 'left' ? scrollLeft - offset : scrollLeft + offset;
    scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!scrollRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scroll('right');
      }
    }, autoInterval);
    return () => clearInterval(interval);
  }, [autoInterval]);

  return (
    <section className="py-20 px-4 bg-[#02040a] min-h-fit">
      <div className="max-w-7xl mx-auto">

        {/* Header row */}
        <div className="flex items-end justify-between mb-12">
          <div className="space-y-2">
            <p className="font-bold text-xs uppercase tracking-[0.3em]" style={{ color: accentColor }}>
              {eyebrow}
            </p>
            <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
              {headLine1} <br />
              <span className="text-slate-600/80">{headLine2}</span>
            </h3>
          </div>

          {/* Nav arrows */}
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => scroll('left')}
              className="p-4 rounded-full border border-white/10 text-white hover:bg-white/5 transition-all active:scale-95"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-4 rounded-full text-white transition-all shadow-lg active:scale-95 hover:brightness-110"
              style={{ background: accentColor, boxShadow: `0 8px 24px ${accentColor}50` }}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Cards scrollable row */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-12 no-scrollbar snap-x snap-mandatory touch-pan-x"
          style={{ scrollBehavior: 'smooth' }}
        >
          {newsItems.map((news) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="min-w-[280px] sm:min-w-[320px] md:min-w-[400px] snap-center bg-white p-8 md:p-10 rounded-[40px] flex flex-col justify-between h-[320px] md:h-[350px] shadow-2xl relative overflow-hidden group"
            >
              <div className="relative z-10">
                <Quote className="text-blue-600/10 mb-6 group-hover:text-blue-600/20 transition-colors" size={48} />
                <p className="text-slate-700 font-bold text-lg md:text-xl leading-snug line-clamp-4">
                  &ldquo;{news.title} {news.desc}&rdquo;
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 relative z-10 flex items-center h-12">
                <img
                  src={news.logo}
                  alt={news.source}
                  className="h-full max-w-[160px] object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <span className="sr-only">{news.source}</span>
              </div>

              <div
                className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `${accentColor}1a` }}
              />
            </motion.div>
          ))}
        </div>

        {/* Mobile swipe hint */}
        <div className="md:hidden flex flex-col items-center gap-2 mt-4">
          <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              animate={{ x: [-20, 20] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="w-6 h-full rounded-full"
              style={{ background: accentColor }}
            />
          </div>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{scrollHint}</p>
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}