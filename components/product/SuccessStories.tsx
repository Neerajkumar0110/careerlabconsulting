'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { usePageContent } from '@/hooks/usePageContent';

// ── Helpers ───────────────────────────────────────────────────────────────────

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const driveToImage = (url: string): string => {
  if (!url || !url.includes('drive.google.com')) return url;
  const id = url.match(/[-\w]{25,}/);
  return id ? `https://lh3.googleusercontent.com/d/${id[0]}` : url;
};

// ── Types ─────────────────────────────────────────────────────────────────────

interface Story {
  id: number;
  title: string;
  description: string;
  metric1: { value: string; label: string };
  metric2: { value: string; label: string };
  image: string;
  videoUrl: string;
}

// ── Default fallback data (mirrors the seed) ──────────────────────────────────

const DEFAULT_STORIES: Story[] = [
  {
    id: 3,
    title: 'AI Resume Screening System',
    description: 'Implemented machine learning tools to automatically screen and rank candidates, enabling recruiters to focus on interviewing the best matches.',
    metric1: { value: '60%', label: 'faster shortlisting time' },
    metric2: { value: '92%', label: 'improved hiring accuracy' },
    image: 'https://drive.google.com/file/d/1sA9-0wK1WUXz3OVOK3v4n6COKzW9LxxV/view?usp=drive_link',
    videoUrl: 'https://www.youtube.com/watch?v=VvkHeufGQV0',
  },
  {
    id: 4,
    title: 'Smart CRM Integration for Enterprises',
    description: 'Integrated AI-driven CRM workflows that automated customer follow-ups and improved client retention strategies.',
    metric1: { value: '38%', label: 'increase in customer retention' },
    metric2: { value: '2.8x', label: 'sales team productivity' },
    image: 'https://drive.google.com/file/d/1d7iRwW9Fox85ESwgLyaiPAMgGndPy0_9/view?usp=drive_link',
    videoUrl: 'https://www.youtube.com/watch?v=XO5JaG1e5m0',
  },
  {
    id: 5,
    title: 'Campus-to-Corporate Placement Program',
    description: 'Launched an AI-backed training and placement pipeline connecting students directly with hiring partners.',
    metric1: { value: '85%', label: 'placement success rate' },
    metric2: { value: '50+', label: 'corporate hiring partners' },
    image: 'https://drive.google.com/file/d/1JkRSzKIyovObjet3kvH9WPGf8kdIjq_U/view?usp=drive_link',
    videoUrl: 'https://www.youtube.com/watch?v=XO5JaG1e5m0',
  },
  {
    id: 6,
    title: 'Automated Interview Scheduling Bot',
    description: 'Developed a scheduling bot that automates interview bookings and reduces manual coordination time.',
    metric1: { value: '70%', label: 'reduction in coordination time' },
    metric2: { value: '99%', label: 'scheduling accuracy' },
    image: 'https://drive.google.com/file/d/179C-uK-yWwWsOai6Od-IyhKQeHhSNtzB/view?usp=drive_link',
    videoUrl: 'https://www.youtube.com/watch?v=VvkHeufGQV0',
  },
  {
    id: 7,
    title: 'AI Analytics for Workforce Planning',
    description: 'Provided predictive workforce analytics to forecast hiring needs and optimize team structures for scaling companies.',
    metric1: { value: '30%', label: 'cost optimization' },
    metric2: { value: '4x', label: 'faster decision making' },
    image: 'https://drive.google.com/file/d/149cWEL0CI3wy-OIUlO-jaIrGUA4Qb5K0/view?usp=drive_link',
    videoUrl: 'https://www.youtube.com/shorts/_ldApQJPT8U',
  },
  {
    id: 8,
    title: 'Digital Onboarding Automation',
    description: 'Created an automated onboarding workflow reducing paperwork and accelerating employee integration into systems.',
    metric1: { value: '55%', label: 'faster onboarding process' },
    metric2: { value: '96%', label: 'new hire satisfaction' },
    image: 'https://drive.google.com/file/d/1NsFkfE9B6_galGwaDbXZ8wIIMtwbGx2_/view?usp=drive_link',
    videoUrl: 'https://www.youtube.com/watch?v=VvkHeufGQV0',
  },
  {
    id: 9,
    title: 'AI Chatbot for Candidate Support',
    description: 'Built an AI chatbot answering candidate queries 24/7, improving engagement throughout the hiring lifecycle.',
    metric1: { value: '80%', label: 'query resolution rate' },
    metric2: { value: '3x', label: 'candidate engagement' },
    image: 'https://drive.google.com/file/d/1XfqHt8ZcNUqRs-562JkCiPBurakvqyQK/view?usp=drive_link',
    videoUrl: 'https://www.youtube.com/watch?v=VvkHeufGQV0',
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function SuccessStories() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // ── CMS ──────────────────────────────────────────────────────────────────
  const { get } = usePageContent('success-stories');

  const badgeText        = get('header', 'badge_text',  'Success Stories');
  const headline1        = get('header', 'headline_1',  'Real Impact,');
  const headline2        = get('header', 'headline_2',  'Measured.');
  const storiesRaw       = get('stories', 'stories_json', JSON.stringify(DEFAULT_STORIES));
  const whatsappNumber   = get('stories', 'whatsapp_number', '918700236923');
  const slideDurationRaw = get('stories', 'auto_slide_duration', '5000');

  const stories: Story[]   = safeParse<Story[]>(storiesRaw, DEFAULT_STORIES);
  const slideDuration: number = parseInt(slideDurationRaw, 10) || 5000;

  // ── Auto-slide ────────────────────────────────────────────────────────────

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, slideDuration, stories.length]);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev === stories.length - 1 ? 0 : prev + 1));
    }, slideDuration);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const nextSlide = () =>
    setCurrent((prev) => (prev === stories.length - 1 ? 0 : prev + 1));

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? stories.length - 1 : prev - 1));

  const handleWatchVideo = (url: string) =>
    window.open(url, '_blank', 'noopener,noreferrer');

  const story = stories[current] ?? stories[0];
  if (!story) return null;

  const totalLabel = stories.length < 10
    ? `0${stories.length}`
    : `${stories.length}`;
  const currentLabel = current + 1 < 10
    ? `0${current + 1}`
    : `${current + 1}`;

  return (
    <section className="bg-[#020617] py-20 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-3 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-blue-500" />
              {badgeText}
            </h3>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
              {headline1}{' '}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent italic">
                {headline2}
              </span>
            </h2>
          </motion.div>

          {/* Navigation controls */}
          <div className="flex items-center gap-4 sm:gap-6 bg-white/5 p-2 rounded-full border border-white/10 self-start md:self-auto">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full hover:bg-white/10 text-white transition-all active:scale-90"
              aria-label="Previous story"
            >
              <ChevronLeft size={22} />
            </button>
            <div className="text-white font-mono text-sm tracking-tighter">
              <span className="text-blue-500">{currentLabel}</span> / {totalLabel}
            </div>
            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-lg shadow-blue-600/30 active:scale-90"
              aria-label="Next story"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* ── Card ── */}
        <div
          className="relative bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 rounded-[2rem] sm:rounded-[3rem] overflow-hidden backdrop-blur-md"
          onMouseEnter={stopAutoSlide}
          onMouseLeave={startAutoSlide}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-2"
            >
              {/* ── Left: content ── */}
              <div className="p-8 sm:p-12 md:p-16 flex flex-col justify-center">
                <h2 className="text-2xl sm:text-4xl font-bold text-white mb-6 leading-snug">
                  {story.title}
                </h2>
                <p className="text-slate-400 text-base sm:text-lg mb-8 leading-relaxed">
                  {story.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-6 py-8 border-y border-white/10 mb-8">
                  <div className="space-y-1">
                    <div className="text-3xl sm:text-4xl font-black text-white">
                      {story.metric1.value}
                    </div>
                    <div className="text-[10px] sm:text-xs text-blue-400 uppercase font-bold tracking-widest">
                      {story.metric1.label}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-3xl sm:text-4xl font-black text-white">
                      {story.metric2.value}
                    </div>
                    <div className="text-[10px] sm:text-xs text-blue-400 uppercase font-bold tracking-widest">
                      {story.metric2.label}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-wrap gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      window.open(
                        `https://wa.me/${whatsappNumber}?text=I am interested in the ${story.title} case study`,
                        '_blank',
                      )
                    }
                    className="group relative inline-flex items-center justify-between gap-4 px-8 py-4 bg-white text-black font-bold rounded-2xl transition-all hover:bg-blue-50 w-fit"
                  >
                    <span className="flex items-center gap-2">
                      Read Case Study
                      <ArrowUpRight
                        size={18}
                        className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                      />
                    </span>
                  </motion.button>
                </div>
              </div>

              {/* ── Right: image + play button ── */}
              <div
                className="relative min-h-[400px] lg:h-auto group overflow-hidden cursor-pointer"
                onClick={() => handleWatchVideo(story.videoUrl)}
              >
                <Image
                  src={driveToImage(story.image)}
                  alt={story.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-70 group-hover:opacity-40 transition-all duration-500" />

                <motion.div
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute bottom-6 right-6 flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-3 rounded-2xl shadow-xl opacity-90 group-hover:opacity-100 transition-all"
                >
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                    <Play fill="#020617" className="text-[#020617] ml-0.5 size-5" />
                  </div>
                  <span className="text-white text-sm font-semibold hidden sm:block">
                    Watch Video
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Dot navigation ── */}
        <div className="flex justify-center gap-2 mt-6">
          {stories.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to story ${i + 1}`}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? 'w-6 h-2 bg-blue-500'
                  : 'w-2 h-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}