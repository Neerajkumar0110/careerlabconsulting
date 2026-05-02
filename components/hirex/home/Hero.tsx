'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap, Search, MapPin } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';
import { useRouter } from 'next/navigation';

// ── Types ─────────────────────────────────────────────────────────────────────
interface Partner { name: string; logo: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_PARTNERS: Partner[] = [
  { name: 'GitHub',   logo: 'https://www.vectorlogo.zone/logos/github/github-tile.svg'           },
  { name: 'LinkedIn', logo: 'https://www.vectorlogo.zone/logos/linkedin/linkedin-icon.svg'       },
  { name: 'Facebook', logo: 'https://www.vectorlogo.zone/logos/facebook/facebook-official.svg'   },
  { name: 'Tailwind', logo: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg' },
];

// ── Space Background (unchanged logic) ───────────────────────────────────────
const SpaceBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const featureWords = ["Job posting","Resume upload","Resume builder","Candidate dashboard","Employer dashboard","Advanced search","Job alerts","AI matching","Social media integration","Mobile app","Resume parsing","Skill endorsements","Company reviews","Talent pool management","Python","Java","JavaScript","React","Node.js","SQL","Accounting","Financial analysis","Sales","Customer service"];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;
    let animId: number;
    let stars: { x: number; y: number; z: number; text?: string }[] = [];
    const numStars = 300; const speed = 1.2;

    const setup = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr; canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`; canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push({ x: Math.random() * window.innerWidth - window.innerWidth / 2, y: Math.random() * window.innerHeight - window.innerHeight / 2, z: Math.random() * window.innerWidth, text: i % 45 === 0 ? featureWords[Math.floor(Math.random() * featureWords.length)] : undefined });
      }
    };
    const draw = () => {
      const W = window.innerWidth; const H = window.innerHeight;
      ctx.fillStyle = '#020617'; ctx.fillRect(0, 0, W, H);
      stars.forEach(s => {
        s.z -= speed;
        if (s.z <= 0) { s.z = W; s.x = Math.random() * W - W / 2; s.y = Math.random() * H - H / 2; }
        const x = (s.x / s.z) * (W / 2) + W / 2; const y = (s.y / s.z) * (H / 2) + H / 2;
        const size = (1 - s.z / W) * 2; const opacity = Math.max(0, 1 - s.z / W);
        if (x >= 0 && x < W && y >= 0 && y < H) {
          if (s.text) {
            ctx.font = `500 ${Math.floor(size * 14)}px sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.shadowBlur = 8; ctx.shadowColor = 'rgba(255,255,255,0.5)';
            ctx.globalAlpha = opacity; ctx.fillStyle = '#FFFFFF'; ctx.fillText(s.text, x, y);
            ctx.shadowBlur = 0; ctx.globalAlpha = 1;
          } else {
            ctx.beginPath(); ctx.fillStyle = `rgba(255,255,255,${opacity * 0.8})`; ctx.arc(x, y, size, 0, Math.PI * 2); ctx.fill();
          }
        }
      });
      animId = requestAnimationFrame(draw);
    };
    setup(); draw();
    window.addEventListener('resize', setup);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', setup); };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full" />
    </div>
  );
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function Hero() {
  const { get } = usePageContent('hirex-home');

  const accentColor1     = get('hero', 'accent_color_1',       '#3b82f6');
  const accentColor2     = get('hero', 'accent_color_2',       '#818cf8');
  const badgeText        = get('hero', 'badge_text',           'AI-Autonomous Job Matching Engine');
  const headline1        = get('hero', 'headline_1',           'Your Career, Quantified.');
  const headlineAccent1  = get('hero', 'headline_accent_1',    'Quantified.');
  const headline2        = get('hero', 'headline_2',           'Hiring, Automated.');
  const headlineAccent2  = get('hero', 'headline_accent_2',    'Automated.');
  const bodyText         = get('hero', 'body_text',            'The first 360-degree career ecosystem syncing GitHub, LinkedIn, and AI assessments.');
  const searchPlaceholder   = get('hero', 'search_placeholder', 'Job title, skills, or company...');
  const locationPlaceholder = get('hero', 'location_placeholder', 'Location or Remote');
  const btnCandidateLabel   = get('hero', 'btn_candidate_label', 'Join as Candidate');
  const btnEmployerLabel    = get('hero', 'btn_employer_label',  'Hire with AI');
  const dividerText         = get('hero', 'divider_text',        'Deep Integration Ecosystem');
  const partnersRaw         = get('hero', 'partners_json',       '[]');
  const partners            = safeParse<Partner[]>(partnersRaw, DEFAULT_PARTNERS);


  const router = useRouter();

  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('https://clc-products-real-backend.vercel.app/api/hirex/auth/me', {
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const handleSearch = () => {
    const hasQuery = query.trim() || location.trim();

    if (hasQuery) {
      const params = new URLSearchParams();

      if (query.trim()) params.append('q', query);
      if (location.trim()) params.append('location', location);

      router.push(`/hirex/jobs?${params.toString()}`);
    } else {
      router.push('/hirex/jobs'); // recommended/latest
    }
  };

  const handleCandidateClick = () => {
    if (!user) {
      router.push('/hirex/login');
    } else {
      router.push('/hirex/jobs');
    }
  };

  // Build headline replacing accent word with styled span
  const renderHeadline = (full: string, accent: string, color: string) => {
    if (!accent || !full.includes(accent)) return <span>{full}</span>;
    const before = full.slice(0, full.indexOf(accent));
    return <>{before}<span style={{ color }}>{accent}</span></>;
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-4 overflow-hidden bg-[#020617]">
      <SpaceBackground />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-7xl mx-auto text-center mt-12 md:mt-0"
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white px-4 py-2.5 rounded-full text-blue-600 shadow-2xl shadow-blue-500/30 mb-4 border border-blue-100">
          <Zap size={16} fill="currentColor" className="animate-pulse" />
          <span className="tracking-widest uppercase md:text-[11px] text-[8px] font-black">{badgeText}</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4 md:leading-[1.1] leading-[1.1] uppercase italic">
          {renderHeadline(headline1, headlineAccent1, accentColor1)} <br />
          {renderHeadline(headline2, headlineAccent2, accentColor2)}
        </h1>

        {/* Body */}
        <p className="text-[14px] md:text-[18px] text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
          {bodyText}
        </p>

        {/* Search bar */}
        <div className="max-w-4xl mx-auto mb-10 px-2">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-2 md:p-3 rounded-3xl md:rounded-full flex flex-col md:flex-row items-center gap-3 shadow-2xl">
            <div className="flex items-center gap-3 flex-1 w-full px-4 border-b md:border-b-0 md:border-r border-white/10 pb-3 md:pb-0">
              <Search className="shrink-0" size={20} style={{ color: accentColor1 }} />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-white w-full placeholder:text-slate-500 text-sm md:text-base py-2"
              />
            </div>
            <div className="flex items-center gap-3 flex-1 w-full px-4">
              <MapPin className="shrink-0" size={20} style={{ color: accentColor2 }} />
              <input
                type="text"
                placeholder={locationPlaceholder}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-transparent border-none outline-none text-white w-full placeholder:text-slate-500 text-sm md:text-base py-2"
              />
            </div>
            <button
              onClick={handleSearch}
              className="w-full md:w-auto text-white font-black px-8 py-4 rounded-2xl md:rounded-full transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-2"
              style={{ background: accentColor1 }}
            >
              Find Jobs <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-5 mb-16">
          <button
            onClick={handleCandidateClick}
            className="flex items-center justify-center gap-3 text-white px-10 py-5 rounded-[1.5rem] text-sm font-black uppercase tracking-widest transition-all shadow-xl active:scale-95"
            style={{ background: accentColor1, boxShadow: `0 20px 40px ${accentColor1}40` }}
          >
            {btnCandidateLabel} <ArrowRight size={18} />
          </button>
          <button className="flex items-center justify-center gap-3 bg-white/[0.03] border border-white/10 text-white px-10 py-5 rounded-[1.5rem] text-sm font-black uppercase tracking-widest hover:bg-white/10 backdrop-blur-md transition-all active:scale-95">
            {btnEmployerLabel} <ShieldCheck size={18} />
          </button>
        </div>

        {/* Divider */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-white/10 opacity-30" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-8 text-xs font-black uppercase tracking-[0.4em] text-slate-500 italic">{dividerText}</span>
          </div>
        </div>

        {/* Partners */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 items-center justify-items-center opacity-90">
          {partners.map(partner => (
            <div key={partner.name} className="w-full md:w-auto flex items-center gap-4 group cursor-pointer bg-white/[0.03] px-6 py-3 rounded-2xl border border-white/5 hover:border-blue-500/30 hover:bg-white/[0.05] transition-all">
              <div className="relative h-7 w-7 shrink-0">
                <Image src={partner.logo} alt={partner.name} fill sizes="28px" className="object-contain" />
              </div>
              <span className="text-sm font-black text-white tracking-widest uppercase italic">{partner.name}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}