'use client';
// Testimonials.tsx — CMS-enabled

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Quote, ShieldCheck, Globe, CheckCircle2, Building2, Users, ArrowRight } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

interface Testimonial { name: string; role: string; country: string; flag: string; image: string; text: string; rating: number }
interface ReviewStat  { label: string; val: string; icon: string }

function safeParse<T>(raw: string, fallback: T): T { try { return JSON.parse(raw) as T; } catch { return fallback; } }

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { name:'Dr. Raheel Khan', role:'Senior Enterprise Partner', country:'United Arab Emirates', flag:'🇦🇪', image:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&q=80', text:'The point-to-point synchronization between GitHub activity and the HireX score is revolutionary.', rating:5 },
  { name:'Neeraj Kumar',    role:'Full Stack Lead',           country:'India',                flag:'🇮🇳', image:'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&q=80', text:'Manee Pro 2.5 flash tests are incredibly accurate. As a developer, having my skills verified autonomously adds massive value.', rating:5 },
  { name:'Deepanshu Joshi', role:'AI Architecture Lead',     country:'United States',        flag:'🇺🇸', image:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&q=80', text:"We've built a 360-degree reporting system that finally makes resumes obsolete. HireX is the future.",  rating:5 },
  { name:'Sarah Chen',      role:'Cloud Operations Head',    country:'Singapore',            flag:'🇸🇬', image:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&q=80', text:'The integration speed is unmatched. We saw a 40% increase in candidate quality within the first month.', rating:5 },
  { name:'Marcus Thorne',   role:'VP of Engineering',        country:'United Kingdom',       flag:'🇬🇧', image:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&q=80', text:'Finally, a platform that understands technical depth. The AI-driven verification is a game changer.',   rating:5 },
];
const DEFAULT_REVIEW_STATS: ReviewStat[] = [
  { label:'Google Reviews', val:'4.9/5', icon:'Globe'     },
  { label:'Glassdoor',      val:'4.8/5', icon:'Building2' },
  { label:'Verified Nodes', val:'1.5K+', icon:'Users'     },
];
const REVIEW_ICON_MAP: Record<string, React.ElementType> = { Globe, Building2, Users };

export default function Testimonials() {
  const { get } = usePageContent('hirex-home');
  const accentColor        = get('testimonials', 'accent_color',       '#3b82f6');
  const badgeText          = get('testimonials', 'badge_text',         'Verified Global Reputation');
  const headline1          = get('testimonials', 'headline_1',         'Trusted by the');
  const headline2          = get('testimonials', 'headline_2',         'AI Empire.');
  const googleReviewLink   = get('testimonials', 'google_review_link', 'https://www.google.com/search?q=career+lab+consulting');
  const ctaLabel           = get('testimonials', 'cta_label',          'Explore All Reviews');
  const testimonialsRaw    = get('testimonials', 'testimonials_json',  '[]');
  const reviewStatsRaw     = get('testimonials', 'review_stats_json',  '[]');
  const testimonials       = safeParse<Testimonial[]>(testimonialsRaw, DEFAULT_TESTIMONIALS);
  const reviewStats        = safeParse<ReviewStat[]>(reviewStatsRaw, DEFAULT_REVIEW_STATS);
  const scrollItems        = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="relative py-24 bg-[#020617] overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] blur-[120px] rounded-full pointer-events-none" style={{ background:`${accentColor}0d` }} />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10 text-center mb-10">
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] mb-8 backdrop-blur-xl"
          style={{ color:accentColor }}>
          <Globe size={12} className="animate-spin" style={{ animationDuration:'8s' }} /> {badgeText}
        </motion.div>
        <h2 className="text-4xl md:text-8xl font-black text-white tracking-tighter leading-[0.85] uppercase italic">
          {headline1} <br /> <span style={{ color:accentColor }}>{headline2}</span>
        </h2>
      </div>

      {/* Scrolling testimonials */}
      <div className="relative w-full mb-10 py-10 overflow-hidden">
        <motion.div className="flex gap-8 px-4" animate={{ x:[0, -2140] }} transition={{ duration:40, repeat:Infinity, ease:'linear' }}>
          {scrollItems.map((t, idx) => (
            <div key={idx} className="w-[400px] shrink-0 relative bg-white/[0.03] backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/5 hover:border-blue-500/30 transition-all duration-500 group shadow-2xl flex flex-col">
              <div className="absolute -top-5 -right-4 w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl rotate-12 group-hover:rotate-0 transition-transform z-30" style={{ background:accentColor }}>
                <Quote size={20} className="text-white fill-white" />
              </div>
              <div className="flex items-start gap-4 mb-8">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-white/10 bg-slate-800 shrink-0">
                  <Image src={t.image} alt={t.name} fill sizes="56px" className="object-cover" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white uppercase tracking-tight italic">{t.name}</h4>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color:accentColor }}>{t.role}</p>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <span className="text-sm">{t.flag}</span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider">{t.country}</span>
                  </div>
                </div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed font-medium italic mb-8">"{t.text}"</p>
              <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                <div className="flex gap-1">{[...Array(t.rating)].map((_,i) => <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />)}</div>
                <div className="flex items-center gap-2" style={{ color:accentColor }}>
                  <ShieldCheck size={14} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Verified Review</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Stats row */}
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }}
          className="bg-white/[0.02] border border-white/10 rounded-[3rem] p-4 md:p-2 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
            {reviewStats.map((stat, i) => {
              const Icon = REVIEW_ICON_MAP[stat.icon] ?? Globe;
              return (
                <div key={i} className="flex-1 flex justify-center border-b md:border-b-0 md:border-r border-white/5 w-full py-4">
                  <div className="flex items-center gap-5 p-2">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center border" style={{ background:`${accentColor}1a`, borderColor:`${accentColor}33` }}>
                      <Icon size={24} style={{ color:accentColor }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl md:text-3xl font-black text-white italic tracking-tighter">{stat.val}</span>
                        <CheckCircle2 size={16} className="text-green-500" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] font-black text-white uppercase tracking-wider">{stat.label}</span>
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">Verified</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="flex-1 flex justify-center w-full py-6 px-8">
              <a href={googleReviewLink} target="_blank" rel="noopener noreferrer"
                className="group relative w-full overflow-hidden rounded-2xl bg-white px-8 py-4 text-center transition-all hover:opacity-90">
                <div className="relative z-10 flex items-center justify-center gap-3" style={{ color:'#0f172a' }}>
                  <span className="text-[11px] font-black uppercase tracking-[0.2em]">{ctaLabel}</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-all" />
                </div>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}