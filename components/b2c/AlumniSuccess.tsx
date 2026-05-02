'use client';

import React from 'react';
import { ArrowUpRight, BadgeCheck, Code2 } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

// ── Helpers ───────────────────────────────────────────────────────────────────
function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

interface ReviewCard {
  name:  string;
  role:  string;
  image: string;
  quote: string;
  hike:  string;
  stack: string[];
}

const DEFAULT_REVIEWS: ReviewCard[] = [
  {
    name:  'Arjun Mehta',
    role:  'Full Stack Dev @ Cred',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=100&auto=format&fit=crop',
    quote: "The LMS environment is insane. I wasn't just watching videos; I was deploying actual microservices. The code reviews from FAANG mentors changed how I write Python.",
    hike:  '140%',
    stack: ['Next.js', 'Docker'],
  },
  {
    name:  'Sarah Jen',
    role:  'AI Engineer @ Fractal',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
    quote: "InternX isn't a course, it's a simulation of a high-pressure tech job. My 'Industry Navigator' helped me negotiate my offer letter. Worth every cent.",
    hike:  '210%',
    stack: ['PyTorch', 'AWS'],
  },
  {
    name:  'Vikram S.',
    role:  'SDE-2 @ Microsoft',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop',
    quote: 'I failed my first 3 mock interviews here. That failure was necessary. By the time I sat for the actual Microsoft interview, it felt like easy mode.',
    hike:  'Top 1%',
    stack: ['System Design', 'Rust'],
  },
];

export default function AlumniSuccessSection() {
  const { get } = usePageContent('alumni_success');

  // ── CMS values ────────────────────────────────────────────────────────────
  const badgeText     = get('alumni_success', 'badge_text',      'Verified Deployments');
  const headPlain     = get('alumni_success', 'headline_plain',  'ALUMNI');
  const headAccent    = get('alumni_success', 'headline_accent', 'HALL OF FAME');
  const subheading    = get('alumni_success', 'subheading',      "We don't optimize for 'certificates completion'. We optimize for offer letters.");
  const verifiedLabel = get('alumni_success', 'verified_label',  'Verified');
  const hikeLabel     = get('alumni_success', 'hike_label',      'Salary Hike');
  const stackLabel    = get('alumni_success', 'stack_label',     'Tech Stack');
  const reviewsRaw    = get('alumni_success', 'reviews_json',    '');
  const reviews       = safeParse<ReviewCard[]>(reviewsRaw, DEFAULT_REVIEWS);
  const accentFrom    = get('alumni_success', 'accent_from',     '#a855f7');
  const accentTo      = get('alumni_success', 'accent_to',       '#3b82f6');

  return (
    <section className="py-16 md:py-24 bg-[#020617] relative overflow-hidden border-t border-white/5">
      {/* Top shimmer line */}
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{ background: `linear-gradient(to right, transparent, ${accentFrom}33, transparent)` }}
      />
      {/* Right glow */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ background: `${accentFrom}0d`, filter: 'blur(100px)' }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-6"
            style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33` }}
          >
            <BadgeCheck className="w-3 h-3" style={{ color: accentFrom }} />
            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: accentFrom }}>
              {badgeText}
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter leading-tight">
            {headPlain}{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})` }}
            >
              {headAccent}
            </span>
          </h2>

          <p className="text-slate-400 text-sm md:text-lg leading-relaxed">{subheading}</p>
        </div>

        {/* ── Cards ──────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="group relative bg-[#0a0f1d] border border-white/10 p-6 md:p-8 rounded-2xl md:rounded-3xl transition-all duration-300 flex flex-col h-full"
              onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentFrom}4d`)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
            >
              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                style={{ background: `linear-gradient(to bottom, ${accentFrom}0d, transparent)` }}
              />

              {/* Header */}
              <div className="relative flex justify-between items-start mb-6">
                <div className="flex gap-4">
                  <div
                    className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 group-hover:border-opacity-50 transition-colors"
                    style={{ '--hover-border': `${accentFrom}80` } as React.CSSProperties}
                  >
                    <img src={review.image} alt={review.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base leading-tight">{review.name}</h4>
                    <p className="text-slate-500 text-xs mt-1">{review.role}</p>
                  </div>
                </div>
                <div
                  className="text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wider border"
                  style={{ background: '#10b9811a', borderColor: '#10b98133', color: '#10b981' }}
                >
                  {verifiedLabel}
                </div>
              </div>

              {/* Quote */}
              <div className="relative flex-1 mb-8">
                <div className="absolute -top-2 -left-2 text-white/5">
                  <Code2 className="w-8 h-8 rotate-180" />
                </div>
                <p className="text-slate-300 text-sm leading-relaxed relative z-10">
                  "{review.quote}"
                </p>
              </div>

              {/* Footer */}
              <div className="relative pt-6 border-t border-white/5 flex items-end justify-between mt-auto">
                <div className="space-y-2">
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{stackLabel}</p>
                  <div className="flex gap-2">
                    {review.stack.map(tech => (
                      <span
                        key={tech}
                        className="px-2 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] text-slate-300 font-medium font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className="text-[10px] uppercase font-bold tracking-wider mb-0.5 flex items-center justify-end gap-1"
                    style={{ color: accentFrom }}
                  >
                    {hikeLabel} <ArrowUpRight className="w-3 h-3" />
                  </div>
                  <div className="text-xl font-black text-white tracking-tight">{review.hike}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}