'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, ArrowUpRight } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

interface Story {
  id: number;
  title: string;
  description: string;
  metric1: { value: string; label: string };
  metric2: { value: string; label: string };
  image: string;
  videoUrl: string;
}

const DEFAULT_STORIES: Story[] = [
  {
    id: 1,
    title: 'AI-Powered Recruitment for Growth',
    description: 'Career Lab Consulting implemented an advanced filtering system for our corporate partners, streamlining the talent acquisition process and reducing hiring time by half.',
    metric1: { value: '45%',  label: 'reduction in hiring cost' },
    metric2: { value: '98.2%',label: 'client satisfaction rate' },
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80',
    videoUrl: 'https://www.youtube.com/shorts/pJnxRMXCMdk',
  },
  {
    id: 2,
    title: 'Automated Sales Funnel for Tech Firms',
    description: 'We deployed intelligent agents that handle initial outreach and lead qualification, allowing sales teams to focus only on closing high-value deals.',
    metric1: { value: '120%', label: 'increase in lead volume' },
    metric2: { value: '3.5x', label: 'ROI in first quarter'   },
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    videoUrl: 'https://www.youtube.com/shorts/_NIWQjjMvfw',
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function SuccessStories() {
  const { get } = usePageContent('success-stories2');

  const eyebrowLabel   = get('success_stories', 'eyebrow_label',   'Success Stories');
  const headlineLine1  = get('success_stories', 'headline_line1',  'Real Impact,');
  const headlineAccent = get('success_stories', 'headline_accent', 'Measured.');
  const ctaBtnLabel    = get('success_stories', 'cta_btn_label',   'Read Case Study');
  const whatsappNumber = get('success_stories', 'whatsapp_number', '918700236923');
  const accentFrom     = get('success_stories', 'accent_from',     '#3b82f6');
  const accentTo       = get('success_stories', 'accent_to',       '#6366f1');
  const storiesRaw     = get('success_stories', 'stories_json',    '');
  const stories        = safeParse<Story[]>(storiesRaw, DEFAULT_STORIES);

  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev === stories.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? stories.length - 1 : prev - 1));

  const handleWatchVideo = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');

  if (stories.length === 0) return null;
  const story = stories[current];

  return (
    <section className="bg-[#020617] py-20 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 className="font-bold tracking-widest uppercase text-xs mb-3 flex items-center gap-2" style={{ color: accentFrom }}>
              <span className="w-8 h-[1px]" style={{ backgroundColor: accentFrom }} />
              {eyebrowLabel}
            </h3>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
              {headlineLine1}{' '}
              <span className="bg-clip-text text-transparent italic"
                style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})` }}>
                {headlineAccent}
              </span>
            </h2>
          </motion.div>

          {/* Slide controls */}
          <div className="flex items-center gap-4 sm:gap-6 bg-white/5 p-2 rounded-full border border-white/10 self-start md:self-auto">
            <button onClick={prevSlide} className="p-3 rounded-full hover:bg-white/10 text-white transition-all active:scale-90">
              <ChevronLeft size={22} />
            </button>
            <div className="text-white font-mono text-sm tracking-tighter">
              <span style={{ color: accentFrom }}>0{current + 1}</span> / 0{stories.length}
            </div>
            <button onClick={nextSlide} className="p-3 rounded-full text-white transition-all active:scale-90"
              style={{ backgroundColor: accentFrom, boxShadow: `0 4px 20px ${accentFrom}4d` }}>
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* Slide card */}
        <div className="relative bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 rounded-[2rem] sm:rounded-[3rem] overflow-hidden backdrop-blur-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-2"
            >
              {/* Text side */}
              <div className="p-8 sm:p-12 md:p-16 flex flex-col justify-center">
                <h2 className="text-2xl sm:text-4xl font-bold text-white mb-6 leading-snug">{story.title}</h2>
                <p className="text-slate-400 text-base sm:text-lg mb-8 leading-relaxed">{story.description}</p>

                <div className="grid grid-cols-2 gap-6 py-8 border-y border-white/10 mb-8">
                  {[story.metric1, story.metric2].map((m, i) => (
                    <div key={i} className="space-y-1">
                      <div className="text-3xl sm:text-4xl font-black text-white">{m.value}</div>
                      <div className="text-[10px] sm:text-xs font-bold tracking-widest uppercase" style={{ color: accentFrom }}>{m.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`I am interested in the ${story.title} case study`)}`, '_blank')}
                    className="group relative inline-flex items-center justify-between gap-4 px-8 py-4 bg-white text-black font-bold rounded-2xl transition-all hover:bg-blue-50 w-fit"
                  >
                    <span className="flex items-center gap-2">
                      {ctaBtnLabel}
                      <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </span>
                  </motion.button>
                </div>
              </div>

              {/* Image / video side */}
              <div
                className="relative min-h-[400px] lg:h-auto group overflow-hidden cursor-pointer"
                onClick={() => handleWatchVideo(story.videoUrl)}
              >
                <img src={story.image} alt="Watch Success Story" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="relative w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center"
                  >
                    <div className="absolute inset-0 bg-blue-600/40 blur-2xl rounded-full animate-pulse" />
                    <div className="relative w-full h-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] flex items-center justify-center transition-all hover:bg-white/20">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
                        <Play fill="#020617" className="text-[#020617] ml-1 sm:size-8" />
                      </div>
                    </div>
                  </motion.div>
                  <p className="text-white font-bold tracking-wider text-sm uppercase bg-black/20 px-4 py-2 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                    Watch on YouTube
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}