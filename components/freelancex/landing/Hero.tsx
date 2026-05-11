'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap, Search } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMemo } from 'react';
import { SmartGigSearchBox } from '../SmartGigSearchBox';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const DEFAULT_FEATURE_WORDS = JSON.stringify([
  "Project posting", "Gig listings", "Freelancer profiles", "Client dashboard",
  "Freelancer dashboard", "Proposal submission", "Bid management", "Milestone tracking",
  "Escrow system", "Secure payments", "Hourly contracts", "Fixed-price contracts",
  "Time tracking", "Work diary", "File sharing", "Real-time messaging",
  "Video conferencing", "Contract management", "Invoice generation", "Payment history",
  "Withdrawal options", "Dispute resolution", "Ratings and reviews", "Skill verification",
  "Portfolio showcase", "Earnings analytics", "Job recommendations", "Talent search",
  "Advanced filters", "Saved projects"
]);

const DEFAULT_PARTNERS = JSON.stringify([
  { name: "GitHub", logo: "https://www.vectorlogo.zone/logos/github/github-tile.svg" },
  { name: "LinkedIn", logo: "https://www.vectorlogo.zone/logos/linkedin/linkedin-icon.svg" },
  { name: "Facebook", logo: "https://www.vectorlogo.zone/logos/facebook/facebook-official.svg" },
  { name: "Tailwind", logo: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" }
]);

const SpaceBackground = ({ featureWords }: { featureWords: string[] }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let stars: { x: number; y: number; z: number; text?: string }[] = [];
    const numStars = 300;
    const speed = 1.2;

    const setup = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * window.innerWidth - window.innerWidth / 2,
          y: Math.random() * window.innerHeight - window.innerHeight / 2,
          z: Math.random() * window.innerWidth,
          text: i % 45 === 0 ? featureWords[Math.floor(Math.random() * featureWords.length)] : undefined
        });
      }
    };

    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const cx = width / 2;
      const cy = height / 2;
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, width, height);
      stars.forEach((star) => {
        star.z -= speed;
        if (star.z <= 0) {
          star.z = width;
          star.x = Math.random() * width - width / 2;
          star.y = Math.random() * height - height / 2;
        }
        const x = (star.x / star.z) * cx + cx;
        const y = (star.y / star.z) * cy + cy;
        const size = (1 - star.z / width) * 2;
        const opacity = Math.max(0, 1 - star.z / width);
        if (x >= 0 && x < width && y >= 0 && y < height) {
          if (star.text) {
            const dynamicFontSize = Math.floor(size * 14);
            ctx.font = `500 ${dynamicFontSize}px sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.shadowBlur = 8;
            ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
            ctx.globalAlpha = opacity;
            ctx.fillStyle = "#FFFFFF";
            ctx.fillText(star.text, x, y);
            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1.0;
          } else {
            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    setup();
    draw();
    window.addEventListener('resize', setup);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setup);
    };
  }, [featureWords]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full" />
    </div>
  );
};

export default function Hero() {
  const { get } = usePageContent('f_hero-section');

  const badgePulseLabel   = get('hero', 'badge_pulse_label',   'AI-Autonomous Project Matching Engine');
  const headline1         = get('hero', 'headline_1',          'Scale');
  const headline1Accent   = get('hero', 'headline_1_accent',   'Your,');
  const headline2         = get('hero', 'headline_2',          'Digital');
  const headline2Accent   = get('hero', 'headline_2_accent',   'Ambition.');
  const subtext           = get('hero', 'subtext',             'Connecting businesses in need to freelancers who deliver GitHub, LinkedIn, and AI assessments.');
  const searchPlaceholder = get('hero', 'search_placeholder',  'Search skills, developers, or projects...');
  const primaryBtnLabel   = get('hero', 'primary_btn_label',   'Discover Matches');
  const secondaryBtnLabel = get('hero', 'secondary_btn_label', 'Hire with AI');
  const partnerDivLabel   = get('hero', 'partner_div_label',   'Deep Integration Ecosystem');
  const accentColor       = get('hero', 'accent_color',        '#3b82f6');
  const accentColor2      = get('hero', 'accent_color_2',      '#818cf8');

  const featureWordsRaw   = get('hero', 'feature_words_json',  DEFAULT_FEATURE_WORDS);
  // const featureWords      = safeParse<string[]>(featureWordsRaw, ["Project posting", "Gig listings"]);
  const featureWords = useMemo(() => {
    return safeParse<string[]>(featureWordsRaw, [
      "Project posting",
      "Gig listings"
    ]);
  }, [featureWordsRaw]);

  const partnersRaw       = get('hero', 'partners_json',       DEFAULT_PARTNERS);
  const partners          = safeParse<{ name: string; logo: string }[]>(partnersRaw, []);

  const router = useRouter();

  const [query, setQuery] = useState('');
  const [user, setUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('https://clc-products-real-backend.vercel.app/api/freelancex/auth/me', {
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
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, []);

  const handleSearch = () => {
    if (loadingUser) return; // avoid race condition

    // 🚨 Not logged in
    if (!user) {
      return router.push('/freelancex/login');
    }

    const params = new URLSearchParams();
    if (query.trim()) params.append('q', query);

    // 🎯 Role-based routing
    if (user.role === 'CLIENT') {
      router.push(
        query.trim()
          ? `/freelancex/freelancers?${params.toString()}`
          : `/freelancex/freelancers`
      );
    } else if (user.role === 'FREELANCER') {
      router.push(
        query.trim()
          ? `/freelancex/gigs?${params.toString()}`
          : `/freelancex/gigs`
      );
    }
  };

  const handlePrimaryAction = () => {
    if (loadingUser) return;

    if (!user) {
      return router.push('/freelancex/login');
    }

    if (user.role === 'FREELANCER') {
      router.push('/freelancex/gigs');
    } else if (user.role === 'CLIENT') {
      router.push('/freelancex/freelancers');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-4 overflow-hidden bg-[#020617]">
      <SpaceBackground featureWords={featureWords} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-7xl mx-auto text-center mb-15 mt-8 md:mt-0 w-full"
      >
        <div className="inline-flex items-center gap-2 bg-white px-4 py-2.5 rounded-full shadow-2xl shadow-blue-500/30 mb-5 border border-blue-100"
          style={{ color: accentColor }}>
          <Zap size={14} fill="currentColor" className="animate-pulse" />
          <span className="tracking-widest uppercase md:text-[11px] text-[8px] font-black">{badgePulseLabel}</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-5 md:leading-[1.2] leading-[1.1] uppercase italic">
          {headline1} <span className="italic" style={{ color: accentColor }}>{headline1Accent}</span> <br />
          {headline2} <span style={{ color: accentColor2 }}>{headline2Accent}</span>
        </h1>

        <p className="text-[14px] md:text-[17px] text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed font-medium"
          dangerouslySetInnerHTML={{ __html: subtext }} />

        {/* <div className="max-w-3xl mx-auto mb-10 relative z-20">
  <div className="flex flex-col sm:flex-row items-center gap-2 bg-white/[0.03] border border-white/10 rounded-[1.5rem] p-2 backdrop-blur-md transition-all hover:border-white/20 focus-within:border-blue-500/50 shadow-2xl">

    <div className="pl-4 hidden sm:block text-slate-400">
      <Search size={20} />
    </div>

    <input
      type="text"
      placeholder={searchPlaceholder}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      className="w-full sm:flex-1 bg-transparent border-none outline-none text-white text-[15px] placeholder:text-slate-500 py-3 px-4 sm:px-2"
    />

    <button
      onClick={handleSearch}
      className="w-full sm:w-auto text-white px-8 py-3 rounded-[1rem] text-xs font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 disabled:opacity-50"
      style={{ background: accentColor }}
      disabled={loadingUser}
    >
      Search
    </button>

  </div>
        </div> */}

        <SmartGigSearchBox
          query={query}
          onQueryChange={setQuery}
          onSearch={handleSearch}
          onQueryClear={() => {
            setQuery('');
          }}
        />

        <div className="flex flex-col sm:flex-row justify-center gap-5 mb-10 relative z-10">
          <button className="flex items-center justify-center gap-3 text-white px-10 py-5 rounded-[1.5rem] text-sm font-black uppercase tracking-widest transition-all shadow-xl active:scale-95"
            onClick={handlePrimaryAction}
            style={{ background: accentColor }}>
            {primaryBtnLabel}<ArrowRight size={18} />
          </button>
          <button className="flex items-center justify-center gap-3 bg-white/[0.03] border border-white/10 text-white px-10 py-5 rounded-[1.5rem] text-sm font-black uppercase tracking-widest hover:bg-white/10 backdrop-blur-md transition-all active:scale-95">
            {secondaryBtnLabel} <ShieldCheck size={18} />
          </button>
        </div>

        <div className="relative mb-10">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-white/10 opacity-30"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-8 text-xs font-black uppercase tracking-[0.4em] text-slate-500 italic">{partnerDivLabel}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center justify-items-center opacity-90">
          {partners.map((partner) => (
            <div key={partner.name} className="flex items-center gap-4 group cursor-pointer bg-white/[0.03] px-6 py-3 rounded-2xl border border-white/5 hover:border-blue-500/30 hover:bg-white/[0.05] transition-all">
              <div className="relative h-7 w-7">
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