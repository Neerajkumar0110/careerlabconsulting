// app/b2c/internx-program-finder/page.tsx
'use client';

import Link from "next/link";
import { Brain, Database, Cloud, ShieldCheck, Bot, Rocket, ArrowRight } from "lucide-react";
import B2CHeader from "@/components/b2c/B2CHeader";
import Footer from "@/components/b2c/Footer";
import { usePageContent } from "@/hooks/usePageContent";

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const ICON_MAP: Record<string, React.ElementType> = { Brain, Database, Cloud, ShieldCheck, Bot, Rocket, ArrowRight };

const DEFAULT_PROGRAMS = JSON.stringify([
  { title: 'AI & Data Engineering',   icon: 'Database',   desc: 'Build intelligent systems, scalable data pipelines, and AI-powered analytics.',              href: '/b2c/internx-data-engineer'             },
  { title: 'AI Product & Marketing',  icon: 'Brain',      desc: 'Work at the intersection of AI, business, users, and growth strategy.',                      href: '/b2c/internx-ai-marketing-specialist'   },
  { title: 'Cloud & AI Engineering',  icon: 'Cloud',      desc: 'Design cloud-native, scalable, and AI-ready infrastructure systems.',                        href: '/b2c/internx-cloud-ai-engineer'         },
  { title: 'Cyber Security Expert',   icon: 'ShieldCheck',desc: 'Protect applications, networks, and data using modern cybersecurity practices.',              href: '/b2c/internx-cyber-security-expert'     },
  { title: 'Robotics, IoT & Automation', icon: 'Bot',     desc: 'Build intelligent robots, IoT systems, and AI-driven automation solutions.',                 href: '/b2c/internx-robotics-engineer'         },
  { title: 'Advanced Future Tech',    icon: 'Rocket',     desc: 'Explore XR, humanoid robotics, smart mobility, and next-generation technologies.',           href: '/b2c/internx-xr-ai-developer'           },
]);

interface Program { title: string; icon: string; desc: string; href: string }

export default function InternXProgramFinderPage() {
  const { get } = usePageContent('internx-program-finder');

  // Hero
  const badgeText    = get('hero', 'badge_text',  'InternX Program Finder');
  const headline     = get('hero', 'headline',    'Find the Right InternX Program for You');
  const heroBody     = get('hero', 'body_text',   'Not sure where to start? Explore InternX programs designed to match your interests, skills, and long-term career goals.');
  const accentColor  = get('hero', 'accent_color','#3b82f6');

  // Programs grid
  const programsHeadline = get('programs', 'headline',      'Choose Your Career Path');
  const programs         = safeParse<Program[]>(get('programs', 'items_json', DEFAULT_PROGRAMS), []);

  // Guidance CTA
  const guidanceHeadline  = get('guidance', 'headline',           'Still Confused?');
  const guidanceBody      = get('guidance', 'body_text',          'Talk to our advisors and get personalized guidance for your career.');
  const guidanceTalkHref  = get('guidance', 'talk_href',          '/b2c/contact');
  const guidanceApplyHref = get('guidance', 'apply_href',         '/b2c/apply');
  const guidanceTalkLabel = get('guidance', 'talk_btn_label',     'Talk to Advisor');
  const guidanceApplyLabel= get('guidance', 'apply_btn_label',    'Apply Directly');

  const accentBg     = `${accentColor}1a`;
  const accentBorder = `${accentColor}30`;
  const accentShadow = `${accentColor}40`;

  return (
    <main className="bg-[#0a0a0a] text-white">
      <B2CHeader />

      {/* HERO */}
      <section className="pt-36 pb-24 border-b border-white/10">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <span className="inline-block mb-4 text-xs font-black uppercase tracking-widest" style={{ color: accentColor }}>
            {badgeText}
          </span>
          <h1 className="text-4xl md:text-5xl font-black">{headline}</h1>
          <p className="mt-6 text-lg text-slate-400">{heroBody}</p>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="py-28">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl font-black mb-14 text-center">{programsHeadline}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((p) => {
              const Icon = ICON_MAP[p.icon] ?? Bot;
              return (
                <Link key={p.title} href={p.href}
                  className="group p-8 rounded-2xl border border-white/10 bg-white/5 transition-all duration-300"
                  style={{ '--accent': accentColor } as any}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = accentBorder; (e.currentTarget as HTMLElement).style.background = accentBg; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; }}>
                  <Icon className="w-8 h-8 mb-5 group-hover:scale-110 transition-transform" style={{ color: accentColor }} />
                  <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                  <p className="text-sm text-slate-400 mb-6 leading-relaxed">{p.desc}</p>
                  <div className="flex items-center gap-2 text-sm font-bold" style={{ color: accentColor }}>
                    Explore Program <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* GUIDANCE CTA */}
      <section className="py-24 border-t border-white/10 bg-[#0d0d0d]">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black">{guidanceHeadline}</h2>
          <p className="mt-6 text-slate-400">{guidanceBody}</p>
          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <Link href={guidanceTalkHref}
              className="px-12 py-4 rounded-xl font-black text-xs uppercase tracking-widest text-white shadow-lg"
              style={{ background: accentColor, boxShadow: `0 10px 30px ${accentShadow}` }}>
              {guidanceTalkLabel}
            </Link>
            <Link href={guidanceApplyHref}
              className="border border-white/20 px-12 py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:border-white/40 transition-colors">
              {guidanceApplyLabel}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}