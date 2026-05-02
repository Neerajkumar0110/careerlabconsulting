'use client';
// EmployerGrades.tsx — CMS-enabled

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Star, Activity, Zap, Search, Globe, Building2, Users } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

interface GradeItem { rank: string; title: string; metrics: Record<string,string>; color: string; description: string; logos: { name: string; url: string }[] }
interface StatGridItem { label: string; val: string; icon: string }

function safeParse<T>(raw: string, fallback: T): T { try { return JSON.parse(raw) as T; } catch { return fallback; } }

const DEFAULT_GRADES: GradeItem[] = [
  { rank:'A+', title:'Elite Partners',   metrics:{ response:'< 12h', accuracy:'99.2%', ctc:'Market Top' }, color:'from-blue-400 to-cyan-400',   description:'Fortune 500 & Unicorns with autonomous hiring pipelines.',         logos:[{ name:'Freepik', url:'https://cdn-front.freepik.com/favicons/favicon-96x96.png' },{ name:'Flaticon', url:'https://media.flaticon.com/dist/min/img/apple-icon-58x58.png' }] },
  { rank:'A',  title:'Verified Growth',  metrics:{ response:'< 24h', accuracy:'96.5%', ctc:'Competitive' }, color:'from-indigo-400 to-purple-400', description:'Series B+ startups with verified digital footprints.',             logos:[{ name:'Clerk', url:'https://clerk.com/v2/favicon.ico' },{ name:'Supabase', url:'https://www.vectorlogo.zone/logos/supabase/supabase-icon.svg' }] },
  { rank:'B',  title:'Standard',         metrics:{ response:'< 48h', accuracy:'92.0%', ctc:'Standard' },    color:'from-slate-400 to-slate-500',   description:'Emerging companies undergoing identity synchronization.',           logos:[{ name:'GitLab', url:'https://www.vectorlogo.zone/logos/gitlab/gitlab-icon.svg' },{ name:'DigitalOcean', url:'https://www.vectorlogo.zone/logos/digitalocean/digitalocean-icon.svg' }] },
];
const DEFAULT_STATS_GRID: StatGridItem[] = [
  { label:'JD Accuracy', val:'98.4%', icon:'ShieldCheck' }, { label:'Avg. Response', val:'< 12h', icon:'Activity' },
  { label:'Candidate Sat.', val:'4.8/5', icon:'Star' }, { label:'Digital Footprint', val:'AI-V', icon:'Globe' },
];
const STAT_ICON_MAP: Record<string, React.ElementType> = { ShieldCheck, Activity, Star, Globe };

const NeuralBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    let animId: number;
    let particles: { x: number; y: number; vx: number; vy: number }[] = [];
    const setup = () => {
      canvas.width = window.innerWidth; canvas.height = canvas.parentElement?.offsetHeight || 800;
      particles = Array.from({ length: 40 }, () => ({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5 }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.strokeStyle = 'rgba(59,130,246,0.1)'; ctx.lineWidth = 0.5;
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1; if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        particles.slice(i + 1).forEach(p2 => {
          const dx = p.x - p2.x; const dy = p.y - p2.y; const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 150) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y); ctx.stroke(); }
        });
      });
      animId = requestAnimationFrame(draw);
    };
    setup(); draw(); window.addEventListener('resize', setup);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', setup); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-30" />;
};

export default function EmployerGrades() {
  const { get } = usePageContent('hirex-home');
  const accentColor    = get('employer_grades', 'accent_color',       '#3b82f6');
  const badgeText      = get('employer_grades', 'badge_text',         'Reputation Monitoring Active');
  const headline1      = get('employer_grades', 'headline_1',         'Verified');
  const headline2      = get('employer_grades', 'headline_2',         'Opportunities.');
  const trustCardTitle = get('employer_grades', 'trust_card_title',   'AI Trust Protocol');
  const trustCardBody  = get('employer_grades', 'trust_card_body',    'Our agent autonomously scrapes Glassdoor, LinkedIn, and social footprints to verify employer grade categories in real-time.');
  const gradesRaw      = get('employer_grades', 'grades_json',        '[]');
  const statsGridRaw   = get('employer_grades', 'stats_grid_json',    '[]');
  const grades         = safeParse<GradeItem[]>(gradesRaw, DEFAULT_GRADES);
  const statsGrid      = safeParse<StatGridItem[]>(statsGridRaw, DEFAULT_STATS_GRID);

  return (
    <section id="employers" className="relative py-32 bg-[#020617] overflow-hidden border-t border-white/5 font-sans">
      <NeuralBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-24">
          <div className="max-w-2xl text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] mb-8"
              style={{ background: `${accentColor}1a`, border: `1px solid ${accentColor}33`, color: accentColor }}>
              <Search size={14} className="animate-pulse" /> {badgeText}
            </motion.div>
            <h2 className="text-5xl md:text-8xl font-extrabold text-white tracking-tight leading-[0.85] uppercase">
              {headline1} <br /> <span className='italic' style={{ color: accentColor }}>{headline2}</span>
            </h2>
          </div>
          <div className="p-8 bg-white/[0.03] border border-white/10 rounded-[2.5rem] backdrop-blur-2xl max-w-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg" style={{ background: `${accentColor}1a` }}><Zap size={22} className="fill-current" style={{ color: accentColor }} /></div>
              <span className="text-sm font-bold text-white uppercase tracking-wider">{trustCardTitle}</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">{trustCardBody}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {grades.map((grade, idx) => (
            <motion.div key={grade.rank} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
              className="group relative bg-white/[0.02] border border-white/10 rounded-[3rem] p-10 hover:border-blue-500/30 transition-all duration-500">
              <div className="flex justify-between items-start mb-8">
                <div className={`text-8xl font-black bg-gradient-to-br ${grade.color} bg-clip-text text-transparent italic tracking-tighter pr-4 leading-none`}>{grade.rank}</div>
                <div className="flex flex-wrap gap-2 justify-end max-w-[120px]">
                  {grade.logos.map((logo, lIdx) => (
                    <div key={lIdx} className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-2.5">
                      <img src={logo.url} alt={logo.name} className="w-full h-full object-contain" />
                    </div>
                  ))}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 uppercase tracking-tight">{grade.title}</h3>
              <p className="text-slate-400 text-[13px] leading-relaxed mb-10 font-medium">{grade.description}</p>
              <div className="space-y-5 pt-8 border-t border-white/10">
                {Object.entries(grade.metrics).map(([key, val]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{key}</span>
                    <span className="text-sm font-bold text-white tabular-nums">{val}</span>
                  </div>
                ))}
              </div>
              <div className="mt-12 flex items-center justify-between">
                <div className="flex gap-1.5">{[1,2,3,4,5].map(s => <Star key={s} className={`w-3.5 h-3.5 ${idx === 0 ? 'fill-current' : 'text-slate-800'}`} style={idx === 0 ? { color: accentColor } : {}} />)}</div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tight">Live Auth</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats band */}
        <div className="relative group max-w-5xl mx-auto">
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-0 py-10 bg-[#0a0f1d]/60 border border-white/10 rounded-[2.5rem] backdrop-blur-3xl shadow-2xl overflow-hidden">
            {statsGrid.map((stat, i) => {
              const Icon = STAT_ICON_MAP[stat.icon] ?? Globe;
              return (
                <div key={i} className={`relative px-6 flex flex-col items-center justify-center ${i !== statsGrid.length - 1 ? 'md:border-r border-white/5' : ''}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="p-1.5 rounded-lg" style={{ background: `${accentColor}1a` }}><Icon className="w-5 h-5" style={{ color: accentColor }} /></span>
                    <span className="text-2xl md:text-3xl font-bold text-white tracking-tight tabular-nums">{stat.val}</span>
                  </div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.15em]">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}