'use client';

import React from 'react';
import Image from 'next/image';
import { Phone, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { usePageContent } from '@/hooks/usePageContent';

// ── Utility: convert Google Drive share links → direct image URLs ─────────────
const driveToImage = (url: string): string => {
  if (!url || !url.includes('drive.google.com')) return url;
  const id = url.match(/[-\w]{25,}/);
  return id ? `https://lh3.googleusercontent.com/d/${id[0]}` : url;
};

const FoundersVision = () => {
  const router = useRouter();
  const { get } = usePageContent('founders-vision');

  // ── CMS values ──────────────────────────────────────────────────────────────
  const badgeText       = get('founders_vision', 'badge_text',         "Founder's Vision");
  const headline        = get('founders_vision', 'headline',           '"Powering the future of the Autonomous Enterprise through a unified, 24/7 AI Infrastructure"');
  const headlineAccent  = get('founders_vision', 'headline_accent_word', '24/7');
  const bodyPara1       = get('founders_vision', 'body_paragraph_1',   'At Career Lab Consulting, we are engineering the future of the Autonomous Enterprise.');
  const bodyPara2       = get('founders_vision', 'body_paragraph_2',   "Our mission is to provide a unified AI Infrastructure that runs your entire business—operations, sales, and support—24/7 on one intelligent layer. We don't just build tools; we build the Autonomous Ecosystem that empowers global scale.");
  const companyName     = get('founders_vision', 'company_name',       'Career Lab Consulting');
  const accentTerm      = get('founders_vision', 'accent_term',        'Autonomous Enterprise');
  const primaryBtnLabel = get('founders_vision', 'primary_btn_label',  'Explore AI Business Suite');
  const primaryBtnLink  = get('founders_vision', 'primary_btn_link',   '/products/business-suite');
  const phoneDisplay    = get('founders_vision', 'phone_display',      '+91 870023 6923');
  const phoneHref       = get('founders_vision', 'phone_href',         '+918700236923');
  const ecosystemText   = get('founders_vision', 'ecosystem_status_text', 'Deploying 9 Unified AI Modules for 2026-27');
  const founderImageUrl = get('founders_vision', 'founder_image_url',  'https://drive.google.com/file/d/12KxHfzJBYIbBQ6DR_asSTQoYRMRxcxr7/view?usp=drive_link');
  const awardBadgeText  = get('founders_vision', 'award_badge_text',   'Innovation');
  const awardBadgeYear  = get('founders_vision', 'award_badge_year',   'Leaders 2026');
  const verifiedText    = get('founders_vision', 'verified_badge_text', 'Verified Stack');
  const verifiedDesc    = get('founders_vision', 'verified_badge_desc', 'Powering the first unified Autonomous AI Ecosystem.');
  const accentColor     = get('founders_vision', 'accent_color',       '#3b82f6');
  const gradientFrom    = get('founders_vision', 'gradient_from',      '#60a5fa');
  const gradientVia     = get('founders_vision', 'gradient_via',       '#818cf8');
  const gradientTo      = get('founders_vision', 'gradient_to',        '#22d3ee');

  // Build headline with accent word highlighted
  const renderHeadline = () => {
    if (!headlineAccent || !headline.includes(headlineAccent)) {
      return <>{headline}</>;
    }
    const parts = headline.split(headlineAccent);
    return (
      <>
        {parts[0]}
        <span
          className="text-transparent bg-clip-text"
          style={{ backgroundImage: `linear-gradient(to right, ${gradientFrom}, ${gradientVia}, ${gradientTo})` }}
        >
          {headlineAccent}
        </span>
        {parts[1]}
      </>
    );
  };

  // Build body paragraph 1 with company name bolded and accent term colored
  const renderPara1 = () => {
    let text = bodyPara1;
    const parts: React.ReactNode[] = [];
    let remaining = text;

    const insertBold = (str: string, match: string, element: React.ReactNode): React.ReactNode[] => {
      const idx = str.indexOf(match);
      if (idx === -1) return [str];
      return [str.slice(0, idx), element, str.slice(idx + match.length)];
    };

    // naive inline highlight — works for single occurrences
    if (companyName && remaining.includes(companyName)) {
      const idx = remaining.indexOf(companyName);
      parts.push(remaining.slice(0, idx));
      parts.push(<strong key="company" className="text-white font-bold">{companyName}</strong>);
      remaining = remaining.slice(idx + companyName.length);
    }
    if (accentTerm && remaining.includes(accentTerm)) {
      const idx = remaining.indexOf(accentTerm);
      parts.push(remaining.slice(0, idx));
      parts.push(<span key="accent" style={{ color: accentColor }} className="font-medium">{accentTerm}</span>);
      remaining = remaining.slice(idx + accentTerm.length);
    }
    parts.push(remaining);
    return <>{parts}</>;
  };

  return (
    <section className="relative py-24 px-6 md:px-12 bg-transparent overflow-hidden" style={{ contain: 'layout' }}>
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[120px] -z-10 hidden md:block"
        style={{ background: `${accentColor}1a` }} />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">

        {/* ── Image column ─────────────────────────────────────────────────── */}
        <div className="relative w-full lg:w-1/2 group">
          <div className="relative z-10 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]">
            <Image
              src={driveToImage(founderImageUrl)}
              alt="Career Lab Consulting Founder's Vision"
              width={800}
              height={1000}
              className="w-full h-[450px] md:h-[550px] object-cover brightness-[0.8] transition-all duration-700 group-hover:brightness-100"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          </div>

          {/* Award overlay badge */}
          <div className="absolute -top-6 -left-4 z-20 bg-[#0f172a]/80 backdrop-blur-xl p-5 rounded-2xl border border-white/20 shadow-2xl flex items-center gap-4 animate-bounce-slow">
            <div className="p-2 rounded-full ring-4" style={{ background: `${accentColor}33`, color: accentColor }} aria-hidden="true">
              <Award size={28} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold" style={{ color: accentColor }}>{awardBadgeText}</p>
              <p className="text-sm font-bold text-white">{awardBadgeYear}</p>
            </div>
          </div>

          {/* Verified stack badge */}
          <div className="absolute -bottom-8 -right-4 z-20 bg-slate-900/90 backdrop-blur-2xl text-white p-6 rounded-[1.5rem] border shadow-xl max-w-[240px]"
            style={{ borderColor: `${accentColor}4d` }}>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 size={18} className="text-emerald-400" aria-hidden="true" />
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: accentColor }}>{verifiedText}</span>
            </div>
            <p className="text-sm font-semibold leading-snug">{verifiedDesc}</p>
          </div>
        </div>

        {/* ── Content column ───────────────────────────────────────────────── */}
        <div className="w-full lg:w-1/2 space-y-10">
          <header className="space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border"
              style={{ background: `${accentColor}1a`, borderColor: `${accentColor}33` }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: accentColor }} />
              <span className="font-bold tracking-[0.2em] text-xs uppercase font-mono" style={{ color: accentColor }}>{badgeText}</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-white leading-[1.1] tracking-tight">
              {renderHeadline()}
            </h2>
          </header>

          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full" style={{ background: `${accentColor}80` }} />
            <div className="pl-8 space-y-4">
              <p className="text-slate-300 text-lg md:text-xl leading-relaxed">{renderPara1()}</p>
              <p className="text-slate-400 text-base md:text-lg leading-relaxed">{bodyPara2}</p>
            </div>
          </div>

          <div className="pt-6 space-y-8">
            <div className="flex flex-col sm:flex-row gap-5">
              <button
                className="group flex items-center justify-center gap-2 text-white px-8 py-5 rounded-2xl font-bold transition-all shadow-lg"
                style={{ background: accentColor, boxShadow: `0 10px 30px ${accentColor}40` }}
                onClick={() => router.push(primaryBtnLink)}
              >
                {primaryBtnLabel}
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </button>

              <a
                href={`tel:${phoneHref}`}
                className="group flex items-center justify-center gap-3 px-8 py-5 border border-white/10 hover:border-opacity-40 bg-white/5 rounded-2xl font-bold text-white transition-all"
                style={{ ['--hover-border' as any]: accentColor }}
              >
                <Phone size={20} className="group-hover:rotate-12 transition-transform" style={{ color: accentColor }} />
                <span className="text-lg">{phoneDisplay}</span>
              </a>
            </div>

            <div className="flex items-center gap-4 text-slate-400 bg-white/[0.03] w-fit px-5 py-3 rounded-xl border border-white/5">
              <div className="flex -space-x-2" aria-hidden="true">
                {['M', 'C', 'L'].map((char, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full border-2 border-slate-900 flex items-center justify-center text-[10px] font-black`}
                    style={{ background: i === 0 ? accentColor : '#1e293b', color: i === 0 ? '#fff' : accentColor }}>
                    {char}
                  </div>
                ))}
              </div>
              <p className="text-xs md:text-sm font-medium">
                <span className="text-emerald-400 font-bold uppercase text-[10px] block">Ecosystem Status</span>
                {ecosystemText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundersVision;