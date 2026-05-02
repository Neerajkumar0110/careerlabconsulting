// app/b2c/internx-smart-mobility-engineer/page.tsx
'use client';

import Link from "next/link";
import { Car, Cpu, Brain, MapPin, Activity, Settings, ArrowRight } from "lucide-react";
import B2CHeader from "@/components/b2c/B2CHeader";
import Footer from "@/components/b2c/Footer";
import { usePageContent } from "@/hooks/usePageContent";

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const ICON_MAP: Record<string, React.ElementType> = { Car, Cpu, Brain, MapPin, Activity, Settings, ArrowRight };

const DEFAULT_CHIPS = JSON.stringify([
  { icon: 'Car',      label: 'Autonomous Vehicles'   },
  { icon: 'Brain',    label: 'AI Decision Systems'   },
  { icon: 'MapPin',   label: 'Navigation & Mapping'  },
  { icon: 'Activity', label: 'Traffic Intelligence'  },
]);
const DEFAULT_LEARN_ITEMS = JSON.stringify([
  'Smart mobility architecture & systems',
  'Autonomous vehicle fundamentals',
  'Sensor fusion & perception systems',
  'AI-based navigation & path planning',
  'Traffic prediction & optimization',
  'Connected vehicle ecosystems',
  'V2X communication basics',
  'Simulation & testing environments',
  'Safety & regulatory considerations',
  'Deployment of smart mobility platforms',
]);
const DEFAULT_WHY_CARDS = JSON.stringify([
  { icon: 'Car',      title: 'Future Transportation',   desc: 'Smart mobility is reshaping how people and goods move across cities.'    },
  { icon: 'Brain',    title: 'AI-Driven Decisions',     desc: 'AI enables perception, prediction, and autonomous control.'              },
  { icon: 'Settings', title: 'System-Level Engineering',desc: 'Integrate vehicles, infrastructure, and cloud intelligence.'             },
]);
const DEFAULT_EXP_CARDS = JSON.stringify([
  { icon: 'Activity', title: 'Smart Mobility Projects', desc: 'Hands-on work with intelligent transport and vehicle systems.'           },
  { icon: 'Cpu',      title: 'AI Integration',          desc: 'Combine perception, control, and cloud intelligence.'                    },
  { icon: 'ArrowRight', title: 'Career Readiness',      desc: 'Portfolio projects, interview prep, and mobility career guidance.'       },
]);
const DEFAULT_STATS = JSON.stringify([
  { label: 'Weeks',            value: '16+' },
  { label: 'Mobility Projects',value: '8+'  },
  { label: 'AI Systems',       value: '10+' },
  { label: 'Career Support',   value: '100%'},
]);

interface Chip     { icon: string; label: string }
interface Card     { icon: string; title: string; desc: string }
interface StatItem { label: string; value: string }

export default function InternXSmartMobilityEngineerPage() {
  const { get } = usePageContent('internx-smart-mobility');

  // Hero
  const badgeText    = get('hero', 'badge_text',     'InternX Program');
  const headline     = get('hero', 'headline',       'Smart Mobility Engineer Internship');
  const heroBody     = get('hero', 'body_text',      'Design intelligent mobility systems of the future. Work on AI-powered autonomous vehicles, traffic intelligence, smart transportation networks, and connected mobility platforms used in smart cities worldwide.');
  const heroImageUrl = get('hero', 'hero_image_url', 'https://img.freepik.com/free-photo/futuristic-technology-concept_23-2151908113.jpg');
  const accentColor  = get('hero', 'accent_color',   '#3b82f6');
  const applyHref    = get('hero', 'apply_href',     '/b2c/apply');
  const finderHref   = get('hero', 'finder_href',    '/b2c/program-finder');
  const chips        = safeParse<Chip[]>(get('hero', 'chips_json', DEFAULT_CHIPS), []);

  // Stats
  const stats = safeParse<StatItem[]>(get('stats', 'items_json', DEFAULT_STATS), []);

  // Why
  const whyHeadline = get('why', 'headline',   'Why Smart Mobility Engineering?');
  const whyCards    = safeParse<Card[]>(get('why', 'cards_json', DEFAULT_WHY_CARDS), []);

  // Learn
  const learnHeadline = get('learn', 'headline',    'What You Will Learn');
  const learnItems    = safeParse<string[]>(get('learn', 'items_json', DEFAULT_LEARN_ITEMS), []);

  // Experience
  const expHeadline = get('experience', 'headline',    'Internship Experience');
  const expCards    = safeParse<Card[]>(get('experience', 'cards_json', DEFAULT_EXP_CARDS), []);

  // CTA
  const ctaHeadline  = get('cta', 'headline',  'Engineer the Future of Mobility');
  const ctaBody      = get('cta', 'body_text', 'Build intelligent systems that power autonomous and smart transportation.');
  const ctaApplyHref = get('cta', 'apply_href', '/b2c/apply');
  const ctaTalkHref  = get('cta', 'talk_href',  '/b2c/contact');

  const accentBg     = `${accentColor}1a`;
  const accentBorder = `${accentColor}30`;
  const accentShadow = `${accentColor}40`;

  return (
    <main className="bg-[#0a0a0a] text-white">
      <B2CHeader />

      {/* HERO */}
      <section className="relative pt-36 pb-28 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0" style={{ background: `radial-gradient(circle at top, ${accentColor}2e, transparent 60%)` }} />
        <div className="relative max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <span className="inline-flex items-center gap-2 mb-5 px-4 py-1 rounded-full border text-xs font-black uppercase tracking-widest"
              style={{ borderColor: accentBorder, background: accentBg, color: accentColor }}>
              {badgeText}
            </span>
            <h1 className="text-2xl md:text-4xl font-black leading-tight">{headline}</h1>
            <p className="mt-6 text-sm text-slate-400 max-w-xl">{heroBody}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              {chips.map((chip, i) => {
                const Icon = ICON_MAP[chip.icon] ?? Car;
                return (
                  <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300">
                    <span style={{ color: accentColor }}><Icon className="w-4 h-4" /></span>
                    <span>{chip.label}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-12 flex flex-wrap gap-4">
              <Link href={applyHref}
                className="px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl text-white"
                style={{ background: accentColor, boxShadow: `0 20px 40px ${accentShadow}` }}>
                Apply Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href={finderHref}
                className="border border-white/20 px-10 py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:border-white/40 transition-colors">
                Find My Program
              </Link>
            </div>
          </div>
          <div className="relative hidden md:flex justify-end">
            <img src={heroImageUrl} alt={headline} className="drop-shadow-2xl rounded-2xl" />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 border-b border-white/10 bg-[#0d0d0d]">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i}>
              <div className="text-3xl font-black" style={{ color: accentColor }}>{stat.value}</div>
              <div className="mt-2 text-sm text-slate-400 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY */}
      <section className="py-28 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-16">{whyHeadline}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {whyCards.map((card, i) => {
              const Icon = ICON_MAP[card.icon] ?? Car;
              return (
                <div key={i} className="p-8 rounded-2xl border border-white/10 bg-white/5 transition"
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = accentBorder; (e.currentTarget as HTMLElement).style.background = accentBg; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; }}>
                  <Icon className="w-7 h-7 mb-5" style={{ color: accentColor }} />
                  <h3 className="font-bold text-lg mb-3">{card.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LEARN */}
      <section className="py-28 border-b border-white/10 bg-[#0d0d0d]">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-16">{learnHeadline}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {learnItems.map((item, i) => (
              <div key={i} className="p-5 rounded-xl border border-white/10 bg-white/5 transition cursor-default"
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = accentBorder; (e.currentTarget as HTMLElement).style.background = accentBg; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="py-28 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-16">{expHeadline}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {expCards.map((card, i) => {
              const Icon = ICON_MAP[card.icon] ?? Car;
              return (
                <div key={i} className="p-8 rounded-2xl border border-white/10 bg-white/5 transition"
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = accentBorder; (e.currentTarget as HTMLElement).style.background = accentBg; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; }}>
                  <Icon className="w-7 h-7 mb-5" style={{ color: accentColor }} />
                  <h3 className="font-bold text-lg mb-3">{card.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top right, ${accentColor}33, transparent)` }} />
        <div className="relative max-w-[900px] mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black">{ctaHeadline}</h2>
          <p className="mt-6 text-slate-400">{ctaBody}</p>
          <div className="mt-14 flex justify-center gap-4 flex-wrap">
            <Link href={ctaApplyHref}
              className="px-14 py-5 rounded-xl font-black text-xs uppercase tracking-widest text-white shadow-xl"
              style={{ background: accentColor, boxShadow: `0 20px 40px ${accentShadow}` }}>
              Apply Now
            </Link>
            <Link href={ctaTalkHref}
              className="border border-white/20 px-14 py-5 rounded-xl font-bold text-xs uppercase tracking-widest hover:border-white/40 transition-colors">
              Talk to Advisor
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}