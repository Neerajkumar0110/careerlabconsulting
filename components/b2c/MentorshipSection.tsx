'use client';

import React from 'react';
import { MessageSquare, Briefcase, Zap, ShieldCheck, Globe } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

// ── Helpers ───────────────────────────────────────────────────────────────────
function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

interface FeatureCard { icon: string; title: string; desc: string; accent: string }
interface PartnerLogo { name: string; logo: string }

const ICON_MAP: Record<string, React.ElementType> = {
  MessageSquare, Briefcase, Globe, Zap,
};

const DEFAULT_FEATURE_CARDS: FeatureCard[] = [
  { icon: 'MessageSquare', title: '1-on-1 Debugging',  desc: 'Direct access to senior neural engineers.', accent: '#3b82f6' },
  { icon: 'Briefcase',     title: 'Hiring Network',     desc: 'Fast-track to 200+ global partners.',       accent: '#10b981' },
  { icon: 'Globe',         title: 'Global Standards',   desc: 'Silicon Valley aligned protocols.',          accent: '#a855f7' },
];

const DEFAULT_CHECKLIST = [
  'Weekly live sync-ups with CTOs & Lead Architects',
  'Personalized GitHub portfolio optimization',
  'Mock interviews with FAANG engineers',
  'Exclusive access to "Under-the-radar" job board',
];

const DEFAULT_MENTORS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=100&auto=format&fit=crop',
];

const DEFAULT_PARTNER_LOGOS: PartnerLogo[] = [
  { name: 'Google',    logo: 'https://www.vectorlogo.zone/logos/google/google-ar21.svg' },
  { name: 'Microsoft', logo: 'https://www.vectorlogo.zone/logos/microsoft/microsoft-ar21.svg' },
  { name: 'AWS',       logo: 'https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-ar21.svg' },
  { name: 'NVIDIA',    logo: 'https://www.vectorlogo.zone/logos/nvidia/nvidia-ar21.svg' },
];

export default function MentorshipSection() {
  const { get } = usePageContent('mentorship');

  // ── CMS values ────────────────────────────────────────────────────────────
  const badgeText       = get('mentorship', 'badge_text',          'Industry Navigator Program');
  const headLine1       = get('mentorship', 'headline_line1',      'NOT JUST A COURSE.');
  const headLine2       = get('mentorship', 'headline_line2',      'A CAREER UPGRADE.');
  const bodyText        = get('mentorship', 'body_text',           "Every InternX student is paired with a dedicated Industry Navigator. We don't just teach you how to build; we show you how to dominate the AI job market.");
  const placementRate   = get('mentorship', 'placement_rate',      '88%');
  const placementLabel  = get('mentorship', 'placement_label',     'Placement Rate');
  const extraCount      = get('mentorship', 'mentor_extra_count',  '+12');
  const alumniLabel     = get('mentorship', 'alumni_label',        'Our Alumni Work At');
  const featureCardsRaw = get('mentorship', 'feature_cards_json',  '');
  const checklistRaw    = get('mentorship', 'checklist_json',      '');
  const mentorAvatarsRaw= get('mentorship', 'mentor_avatars_json', '');
  const partnerLogosRaw = get('mentorship', 'partner_logos_json',  '');
  const accentFrom      = get('mentorship', 'accent_from',         '#3b82f6');
  const accentTo        = get('mentorship', 'accent_to',           '#06b6d4');
  const accentGreen     = get('mentorship', 'accent_green',        '#10b981');

  const featureCards  = safeParse<FeatureCard[]>(featureCardsRaw,   DEFAULT_FEATURE_CARDS);
  const checklist     = safeParse<string[]>(checklistRaw,           DEFAULT_CHECKLIST);
  const mentorAvatars = safeParse<string[]>(mentorAvatarsRaw,       DEFAULT_MENTORS);
  const partnerLogos  = safeParse<PartnerLogo[]>(partnerLogosRaw,   DEFAULT_PARTNER_LOGOS);

  // Split feature cards: first 2 go in left col (staggered), last goes in right col
  const col1Cards = featureCards.slice(0, Math.ceil(featureCards.length / 2));
  const col2Cards = featureCards.slice(Math.ceil(featureCards.length / 2));

  return (
    <section className="py-16 md:py-24 bg-[#020617] relative overflow-hidden">
      {/* BG glow */}
      <div
        className="absolute bottom-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full pointer-events-none translate-x-1/2 translate-y-1/2"
        style={{ background: `${accentFrom}0d`, filter: 'blur(100px)' }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT: Feature cards grid ─────────────────────────────────── */}
          <div className="order-2 lg:order-1 relative">
            <div className="grid grid-cols-2 gap-3 md:gap-6">

              {/* Column 1 – offset downward */}
              <div className="space-y-3 md:space-y-6 pt-8 md:pt-12">
                {col1Cards.map((card, i) => {
                  const Icon = ICON_MAP[card.icon] ?? Globe;
                  return (
                    <div
                      key={i}
                      className="bg-[#0a0f1d] border border-white/5 p-4 md:p-6 rounded-2xl md:rounded-[2rem] shadow-xl transition-colors group"
                      style={{ '--hover-border': `${card.accent}4d` } as React.CSSProperties}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = `${card.accent}4d`)}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}
                    >
                      <div
                        className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform"
                        style={{ background: `${card.accent}1a` }}
                      >
                        <Icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: card.accent }} />
                      </div>
                      <h4 className="text-white font-bold mb-1 md:mb-2 text-xs md:text-sm uppercase tracking-tight">{card.title}</h4>
                      <p className="text-slate-500 text-[10px] md:text-xs leading-relaxed">{card.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* Column 2 */}
              <div className="space-y-3 md:space-y-6">
                {/* Stat hero card */}
                <div
                  className="p-5 md:p-8 rounded-2xl md:rounded-[2.5rem] shadow-2xl relative overflow-hidden group border"
                  style={{
                    background: `linear-gradient(135deg, ${accentFrom}33, ${accentTo}1a)`,
                    borderColor: `${accentFrom}33`,
                  }}
                >
                  <div className="absolute top-0 right-0 p-3 md:p-5">
                    <Zap className="w-4 h-4 md:w-5 md:h-5 animate-pulse" style={{ color: accentFrom }} />
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black text-white mb-1 tracking-tighter">{placementRate}</h3>
                  <p
                    className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]"
                    style={{ color: accentFrom }}
                  >
                    {placementLabel}
                  </p>

                  <div className="mt-6 md:mt-8 flex -space-x-2 md:-space-x-3">
                    {mentorAvatars.map((src, i) => (
                      <div
                        key={i}
                        className="relative w-8 h-8 md:w-10 md:h-10 rounded-full border-2 overflow-hidden bg-slate-800"
                        style={{ borderColor: '#020617' }}
                      >
                        <img src={src} className="w-full h-full object-cover" alt="Mentor" loading="lazy" />
                      </div>
                    ))}
                    <div
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center text-[9px] md:text-[10px] font-bold text-white"
                      style={{ borderColor: '#020617', background: accentFrom }}
                    >
                      {extraCount}
                    </div>
                  </div>
                </div>

                {/* Rest of col2 cards */}
                {col2Cards.map((card, i) => {
                  const Icon = ICON_MAP[card.icon] ?? Globe;
                  return (
                    <div
                      key={i}
                      className="bg-[#0a0f1d] border border-white/5 p-4 md:p-6 rounded-2xl md:rounded-[2rem] shadow-xl transition-colors group"
                      onMouseEnter={e => (e.currentTarget.style.borderColor = `${card.accent}4d`)}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}
                    >
                      <div
                        className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform"
                        style={{ background: `${card.accent}1a` }}
                      >
                        <Icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: card.accent }} />
                      </div>
                      <h4 className="text-white font-bold mb-1 md:mb-2 text-xs md:text-sm uppercase tracking-tight">{card.title}</h4>
                      <p className="text-slate-500 text-[10px] md:text-xs leading-relaxed">{card.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Content ───────────────────────────────────────────── */}
          <div className="order-1 lg:order-2">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-6"
              style={{ background: `${accentGreen}1a`, borderColor: `${accentGreen}33` }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accentGreen }} />
              <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: accentGreen }}>
                {badgeText}
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter leading-[1.1] uppercase">
              {headLine1}<br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo}, ${accentGreen})` }}
              >
                {headLine2}
              </span>
            </h2>

            <p className="text-slate-400 text-base md:text-lg mb-8 leading-relaxed max-w-xl"
              dangerouslySetInnerHTML={{
                __html: bodyText.replace(
                  'Industry Navigator',
                  `<span class="text-white font-semibold">Industry Navigator</span>`
                )
              }}
            />

            <div className="space-y-3 md:space-y-4 mb-10 md:mb-12">
              {checklist.map((item, idx) => (
                <div key={idx} className="flex items-start md:items-center gap-3 md:gap-4 text-slate-300 group">
                  <div
                    className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-lg flex items-center justify-center border transition-all mt-0.5 md:mt-0"
                    style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33` }}
                    onMouseEnter={e => { e.currentTarget.style.background = accentFrom; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = `${accentFrom}1a`; }}
                  >
                    <ShieldCheck className="w-3 h-3 md:w-3.5 md:h-3.5" />
                  </div>
                  <span className="text-sm font-medium tracking-tight">{item}</span>
                </div>
              ))}
            </div>

            {/* Partner logos */}
            <div className="pt-6 md:pt-8 border-t border-white/5">
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mb-6 md:mb-8">
                {alumniLabel}
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-4 md:gap-x-10 md:gap-y-6 items-center">
                {partnerLogos.map(p => (
                  <img
                    key={p.name}
                    src={p.logo}
                    alt={p.name}
                    className="bg-white py-2 px-2 h-10 w-auto rounded-[5px] transition-transform duration-300 hover:scale-110 cursor-help"
                    title={p.name}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}