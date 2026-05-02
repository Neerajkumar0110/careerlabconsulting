'use client';

import React, { useState, useMemo } from 'react';
import { Play, Star, ArrowRight, Download, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePageContent } from '@/hooks/usePageContent';

// ── Helpers ───────────────────────────────────────────────────────────────────
function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface Internship {
  title: string;
  id: string;
  href: string;
  videoId: string;
  image: string;
  brochureUrl?: string;
}

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_CATEGORIES = ["AI & Data","Cloud & Infra","Cybersecurity","Web3 & Blockchain","Product & Growth","Industry-Specific AI","Robotics & IoT","Future Tech"];

const DEFAULT_COURSES: Record<string, Internship[]> = {
  "AI & Data": [
    { title: "InternX-AI", id: "ai-dev", href: "/internship/internx-ai", videoId: "whqLvigQWoE", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800", brochureUrl: "https://drive.google.com/file/d/1NliWMlZnlgO_taABHlEKYQ93__sXtuvs/view?usp=sharing" },
    { title: "InternX-Data Engineer", id: "data-eng", href: "/internship/internx-data-engineer", videoId: "kriafQfqGZE", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800", brochureUrl: "#" },
    { title: "InternX-AI Quality & Safety Engineer", id: "ai-safety", href: "/internship/internx-ai-quality-safety-engineer", videoId: "vViMFjvVT9E", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800", brochureUrl: "#" },
  ],
  "Cloud & Infra": [
    { title: "InternX-Cloud & AI Engineer", id: "cloud-ai", href: "/internship/internx-cloud-ai-engineer", videoId: "kriafQfqGZE", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800", brochureUrl: "#" },
  ],
};

export default function CourseGrid() {
  const router = useRouter();
  const { get } = usePageContent('course-grid');

  // ── CMS values ─────────────────────────────────────────────────────────────
  const headline1          = get('header', 'headline_1',          'Explore All');
  const headline2          = get('header', 'headline_2',          'InternX Programs');
  const subheading         = get('header', 'subheading',          'Industry-leading certifications for the next generation of tech pioneers.');
  const accentColor        = get('header', 'accent_color',        '#3b82f6');

  const allTabLabel        = get('courses', 'all_tab_label',       'All Internships');
  const durationLabel      = get('courses', 'duration_label',      'Duration');
  const durationValue      = get('courses', 'duration_value',      '6 - 12 Months');
  const ratingLabel        = get('courses', 'rating_label',        'Rating');
  const ratingValue        = get('courses', 'rating_value',        '4.9/5');
  const viewDetailsText    = get('courses', 'view_details_text',   'View Program Details');
  const brochureBtnLabel   = get('courses', 'brochure_btn_label',  'Brochure');
  const enrollBtnLabel     = get('courses', 'enroll_btn_label',    'Enroll');
  const brochureUnavailMsg = get('courses', 'brochure_unavailable_msg', 'Brochure for this program will be available soon!');

  const categoriesRaw = get('courses', 'categories_json', JSON.stringify(DEFAULT_CATEGORIES));
  const coursesRaw    = get('courses', 'courses_json',    JSON.stringify(DEFAULT_COURSES));

  const categories    = safeParse<string[]>(categoriesRaw, DEFAULT_CATEGORIES);
  const allCourses    = safeParse<Record<string, Internship[]>>(coursesRaw, DEFAULT_COURSES);

  const [activeTab, setActiveTab] = useState<string>(allTabLabel);

  const tabs = useMemo(() => [allTabLabel, ...categories], [allTabLabel, categories]);

  const displayedCourses = useMemo(() => {
    if (activeTab === allTabLabel) return Object.values(allCourses).flat();
    return allCourses[activeTab] || [];
  }, [activeTab, allTabLabel, allCourses]);

  const handleTabClick = (tab: string, e: React.MouseEvent) => {
    setActiveTab(tab);
    (e.currentTarget as HTMLElement).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  const handleVideoRedirect = (videoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank', 'noopener,noreferrer');
  };

  const handleEnrollRedirect = (courseId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    router.push(`/checkout/b2c/enroll?programId=${courseId}`);
  };

  const handleBrochureDownload = (url: string | undefined, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      alert(brochureUnavailMsg);
    }
  };

  return (
    <section className="py-16 md:py-28 bg-[#020617] relative overflow-hidden text-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <header className="text-center mb-12 md:mb-20">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tighter uppercase leading-[0.9]">
            {headline1}{' '}
            <span style={{ color: accentColor }} className="italic">{headline2}</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base font-medium uppercase tracking-[0.2em]">
            {subheading}
          </p>
        </header>

        {/* Tabs */}
        <nav className="relative mb-12 group">
          <div className="flex items-center overflow-x-auto no-scrollbar gap-3 pb-6 touch-pan-x cursor-grab active:cursor-grabbing snap-x snap-mandatory">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={(e) => handleTabClick(tab, e)}
                className={`flex-shrink-0 px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300 border snap-start ${
                  activeTab === tab
                    ? 'text-white border-transparent scale-105 shadow-lg'
                    : 'border-white/10 text-slate-500 hover:border-white/30 hover:bg-white/5'
                }`}
                style={activeTab === tab ? { background: accentColor, boxShadow: `0 0 20px ${accentColor}4d` } : {}}
              >
                {tab}
              </button>
            ))}
          </div>
        </nav>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          <AnimatePresence mode="popLayout">
            {displayedCourses.map((course) => (
              <motion.article
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={course.id}
                className="group bg-[#0a1229] border border-white/5 rounded-[2.5rem] overflow-hidden transition-all duration-500 flex flex-col relative"
                style={{ '--hover-border': `${accentColor}4d` } as React.CSSProperties}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${accentColor}4d`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; }}
              >
                <Link href={course.href} className="flex flex-col h-full cursor-pointer">

                  {/* Image */}
                  <div className="relative aspect-video w-full overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1229] via-transparent to-transparent opacity-60" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        onClick={(e) => handleVideoRedirect(course.videoId, e)}
                        className="w-16 h-16 rounded-full flex items-center justify-center text-white backdrop-blur-md hover:scale-110 transition-all shadow-xl z-30"
                        style={{ background: `${accentColor}e6` }}
                      >
                        <Play className="w-6 h-6 fill-current translate-x-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-black text-white leading-tight italic uppercase min-h-[3.5rem] flex-1">
                        {course.title}
                      </h3>
                      <ExternalLink className="w-5 h-5 text-slate-500 transition-colors mt-1" style={{ color: 'inherit' }}
                        onMouseEnter={(e) => { (e.currentTarget as SVGElement).style.color = accentColor; }}
                        onMouseLeave={(e) => { (e.currentTarget as SVGElement).style.color = '#64748b'; }}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: accentColor }}>{durationLabel}</span>
                        <span className="text-xs font-black text-slate-200">{durationValue}</span>
                      </div>
                      <div className="flex flex-col gap-1 items-end">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{ratingLabel}</span>
                        <span className="flex items-center gap-1 text-xs font-black text-yellow-500">
                          <Star className="w-3 h-3 fill-current" /> {ratingValue}
                        </span>
                      </div>
                    </div>

                    <div className="mb-6 text-[10px] font-black uppercase flex items-center gap-2 tracking-[0.2em] transition-colors"
                      style={{ color: accentColor }}>
                      {viewDetailsText} <ArrowRight className="w-3 h-3" />
                    </div>

                    <div className="mt-auto flex gap-3 relative z-30">
                      <button
                        onClick={(e) => handleBrochureDownload(course.brochureUrl, e)}
                        className="flex-1 py-4 border border-white/10 rounded-2xl text-[10px] font-black uppercase text-slate-300 hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4" /> {brochureBtnLabel}
                      </button>
                      <button
                        onClick={(e) => handleEnrollRedirect(course.id, e)}
                        className="flex-1 py-4 rounded-2xl text-[10px] font-black uppercase text-white transition-all flex items-center justify-center gap-2"
                        style={{ background: accentColor, boxShadow: `0 4px 20px ${accentColor}33` }}
                      >
                        {enrollBtnLabel} <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}