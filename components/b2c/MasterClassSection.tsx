'use client';

import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, Users, ArrowRight } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

// ── Helpers ───────────────────────────────────────────────────────────────────
function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const DEFAULT_AVATARS = JSON.stringify([
  'https://i.pravatar.cc/100?img=11',
  'https://i.pravatar.cc/100?img=12',
  'https://i.pravatar.cc/100?img=13',
]);

export default function MasterClassSection() {
  const { get } = usePageContent('masterclass_hero');

  // ── CMS values ────────────────────────────────────────────────────────────
  const badgeText      = get('masterclass_hero', 'badge_text',        'Live Masterclass');
  const headlineLine1  = get('masterclass_hero', 'headline_line1',    'EXPLORE FREE');
  const headlineLine2  = get('masterclass_hero', 'headline_line2',    'MASTER CLASSES');
  const bodyText       = get('masterclass_hero', 'body_text',         'Unlock industry secrets with our expert-led sessions. Start your professional journey with CLC today, at zero cost.');
  const btnLabel       = get('masterclass_hero', 'btn_label',         'Start For Free');
  const btnHref        = get('masterclass_hero', 'btn_href',          '/masterclass/live');
  const socialProof    = get('masterclass_hero', 'social_proof_text', '12k+ Students Joined');
  const avatarsRaw     = get('masterclass_hero', 'avatar_urls_json',  DEFAULT_AVATARS);
  const avatars        = safeParse<string[]>(avatarsRaw, [
    'https://i.pravatar.cc/100?img=11',
    'https://i.pravatar.cc/100?img=12',
    'https://i.pravatar.cc/100?img=13',
  ]);
  const instructorImg  = get('masterclass_hero', 'instructor_image',  'https://img.freepik.com/free-photo/medium-shot-smiley-woman-typing_23-2148924729.jpg');
  const card1Title     = get('masterclass_hero', 'floating_card_1_title', 'Introduction to AI');
  const card1Sub       = get('masterclass_hero', 'floating_card_1_sub',   '45:00 Mins • Live');
  const card2Title     = get('masterclass_hero', 'floating_card_2_title', 'Active Learners');
  const card2Sub       = get('masterclass_hero', 'floating_card_2_sub',   '842 watching now');
  const accentFrom     = get('masterclass_hero', 'accent_from',        '#1d4ed8');
  const accentTo       = get('masterclass_hero', 'accent_to',          '#4338ca');
  const accentHL       = get('masterclass_hero', 'accent_highlight',   '#f97316');

  return (
    <section className="py-20 px-4 bg-[#02040a]">
      <div className="max-w-7xl mx-auto">
        <div
          className="relative overflow-hidden rounded-[40px] shadow-2xl"
          style={{
            background: `linear-gradient(135deg, ${accentFrom}, ${accentTo})`,
          }}
        >
          {/* Background glows */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 blur-[100px] rounded-full pointer-events-none"
            style={{ background: `${accentFrom}33` }} />

          <div className="relative z-10 flex flex-col md:flex-row items-stretch">

            {/* ── LEFT ─────────────────────────────────────────────────── */}
            <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                      style={{ background: accentHL }} />
                    <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: accentHL }} />
                  </span>
                  {badgeText}
                </motion.div>

                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9]">
                  {headlineLine1}<br />
                  <span
                    className="text-transparent bg-clip-text"
                    style={{ backgroundImage: `linear-gradient(to right, ${accentHL === '#f97316' ? '#fed7aa' : accentHL}, #fff)` }}
                  >
                    {headlineLine2}
                  </span>
                </h2>
              </div>

              <p className="text-blue-50/80 text-lg md:text-xl max-w-md leading-relaxed font-medium">
                {bodyText}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <Link href={btnHref}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group text-white font-black py-5 px-10 rounded-2xl text-sm uppercase tracking-wider flex items-center gap-3 transition-all"
                    style={{ background: accentHL, boxShadow: `0 20px 25px -5px ${accentHL}66` }}
                  >
                    {btnLabel}
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                  </motion.button>
                </Link>

                <div className="flex -space-x-3 items-center ml-2">
                  {avatars.map((src, i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 overflow-hidden bg-slate-200"
                      style={{ borderColor: accentFrom }}>
                      <img src={src} alt={`User ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <p className="pl-5 text-blue-100 text-sm font-bold">{socialProof}</p>
                </div>
              </div>
            </div>

            {/* ── RIGHT ────────────────────────────────────────────────── */}
            <div className="w-full md:w-1/2 relative p-8 md:p-12 flex items-center justify-center min-h-[400px]">
              <div className="relative w-full h-full">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="relative z-10 w-full h-full rounded-[32px] overflow-hidden aspect-[4/3] md:aspect-auto"
                  style={{ border: '8px solid rgba(255,255,255,0.05)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}
                >
                  <img
                    src={instructorImg}
                    alt="Master Class Instructor"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${accentTo}66, transparent)` }} />
                </motion.div>

                {/* Floating card 1 */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="hidden lg:flex absolute top-10 -left-10 z-20 bg-white p-4 rounded-2xl shadow-xl items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `${accentHL}1a`, color: accentHL }}>
                    <PlayCircle size={28} />
                  </div>
                  <div>
                    <p className="text-slate-900 font-bold text-sm">{card1Title}</p>
                    <p className="text-slate-500 text-xs">{card1Sub}</p>
                  </div>
                </motion.div>

                {/* Floating card 2 */}
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 5 }}
                  className="hidden lg:flex absolute bottom-10 -right-6 z-20 p-4 rounded-2xl border border-white/10 shadow-xl items-center gap-4 backdrop-blur-xl"
                  style={{ background: `${accentTo}cc` }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-blue-300"
                    style={{ background: 'rgba(59,130,246,0.2)' }}>
                    <Users size={28} />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{card2Title}</p>
                    <p className="text-blue-200 text-xs">{card2Sub}</p>
                  </div>
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}