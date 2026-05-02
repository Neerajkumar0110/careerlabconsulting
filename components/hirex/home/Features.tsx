'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Cpu, Layers, Globe, Zap, Activity, ShieldCheck, Github, Linkedin, Code2 } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

// ── Types ─────────────────────────────────────────────────────────────────────
interface FeatureItem {
  title: string; description: string; icon: string;
  stats: string; border: string; bgImage: string;
}

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const DEFAULT_FEATURES: FeatureItem[] = [
  { title: 'Autonomous Skill Testing',  description: 'Our Manee Pro 2.5 engine generates real-time MCQ challenges for every skill update, ensuring instant verification.', icon: 'Cpu',    stats: '10-Quest Cycles', border: 'border-blue-500/30',   bgImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop' },
  { title: '360° Report Generation',    description: 'Synchronize deep metrics from all active projects into a single, employer-ready technical dossier.',                  icon: 'Layers', stats: 'Live Data Feed',   border: 'border-indigo-500/30', bgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop' },
  { title: 'Ecosystem Integration',     description: 'One-click synchronization with GitHub and LinkedIn to maintain a living, breathing career profile.',                   icon: 'Globe',  stats: 'Real-time Sync',   border: 'border-cyan-500/30',   bgImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop' },
];

const DEFAULT_TRUST_LABELS = ['Skill Scan', 'Identity Verified', 'Trust Protocols'];

const ICON_MAP: Record<string, React.ElementType> = { Cpu, Layers, Globe };
function resolveIcon(name: string): React.ElementType { return ICON_MAP[name] ?? Cpu; }

// ── Space Background ──────────────────────────────────────────────────────────
const FeatureSpaceBackground = ({ accentColor }: { accentColor: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const words = ['SQL', 'Next.js', 'AI', 'GitHub', '360°', 'Node', 'Verified'];
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false }); if (!ctx) return;
    let animId: number;
    let stars: { x: number; y: number; z: number; text?: string }[] = [];
    const setup = () => {
      canvas.width = window.innerWidth; canvas.height = canvas.parentElement?.offsetHeight || 1000;
      stars = Array.from({ length: 200 }, (_, i) => ({ x: Math.random() * canvas.width - canvas.width / 2, y: Math.random() * canvas.height - canvas.height / 2, z: Math.random() * canvas.width, text: i % 40 === 0 ? words[Math.floor(Math.random() * words.length)] : undefined }));
    };
    const draw = () => {
      ctx.fillStyle = '#020617'; ctx.fillRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2; const cy = canvas.height / 2;
      stars.forEach(s => {
        s.z -= 0.8; if (s.z <= 0) { s.z = canvas.width; s.x = Math.random() * canvas.width - cx; s.y = Math.random() * canvas.height - cy; }
        const x = (s.x / s.z) * cx + cx; const y = (s.y / s.z) * cy + cy;
        const size = (1 - s.z / canvas.width) * 1.5; const opacity = 1 - s.z / canvas.width;
        if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
          if (s.text) { ctx.font = `${Math.floor(size * 12)}px Arial`; ctx.fillStyle = `${accentColor}${Math.floor(opacity * 0.5 * 255).toString(16).padStart(2, '0')}`; ctx.fillText(s.text, x, y); }
          else { ctx.beginPath(); ctx.fillStyle = `rgba(255,255,255,${opacity * 0.3})`; ctx.arc(x, y, size, 0, Math.PI * 2); ctx.fill(); }
        }
      });
      animId = requestAnimationFrame(draw);
    };
    setup(); draw();
    window.addEventListener('resize', setup);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', setup); };
  }, [accentColor]);
  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function Features() {
  const { get } = usePageContent('hirex-home');

  const accentColor   = get('features', 'accent_color',  '#3b82f6');
  const badgeText     = get('features', 'badge_text',     'Intelligence Layer Active');
  const headline1     = get('features', 'headline_1',     'Command Your');
  const headline2     = get('features', 'headline_2',     'HireX Empire.');
  const nodeTitle     = get('features', 'node_title',     'Autonomous Verification Node');
  const nodeBody      = get('features', 'node_body',      'Our agent executes a point-to-point sync in 14ms. Verified GitHub DNA and LinkedIn Neural Path.');
  const nodeImage     = get('features', 'node_image',     'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop');
  const featuresRaw   = get('features', 'items_json',     '[]');
  const trustRaw      = get('features', 'trust_labels_json', '[]');
  const featureItems  = safeParse<FeatureItem[]>(featuresRaw, DEFAULT_FEATURES);
  const trustLabels   = safeParse<string[]>(trustRaw, DEFAULT_TRUST_LABELS);

  return (
    <section id="features" className="relative py-32 bg-[#020617] overflow-hidden border-t border-white/5">
      <FeatureSpaceBackground accentColor={accentColor} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-24">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-6 backdrop-blur-xl">
            <Zap size={14} className="animate-pulse" style={{ color: accentColor, fill: accentColor }} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: accentColor }}>{badgeText}</span>
          </motion.div>
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.9] uppercase italic">
            {headline1} <br /> <span style={{ color: accentColor }}>{headline2}</span>
          </h2>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {featureItems.map((feature, idx) => {
            const Icon = resolveIcon(feature.icon);
            return (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                className={`group relative bg-slate-900/40 py-8 px-8 rounded-[2.5rem] border ${feature.border} backdrop-blur-3xl hover:bg-slate-900/60 transition-all duration-500 overflow-hidden min-h-[300px] flex flex-col justify-end`}>
                <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                  <Image src={feature.bgImage} alt={feature.title} fill className="object-cover mix-blend-overlay" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />
                </div>
                <div className="relative z-20">
                  <div className="flex justify-between items-start mb-10">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-blue-500/50 transition-colors">
                      <Icon className="w-6 h-6" style={{ color: accentColor }} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border"
                      style={{ color: accentColor, background: `${accentColor}1a`, borderColor: `${accentColor}33` }}>
                      {feature.stats}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4 tracking-tight uppercase">{feature.title}</h3>
                  <p className="text-slate-300 leading-relaxed text-sm md:text-[16px] mb-4 font-medium">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Verification Node card */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-white/[0.03] to-transparent rounded-[3.5rem] p-8 md:p-16 border border-white/10 relative overflow-hidden group shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: accentColor }}>
                  <Activity className="text-white w-6 h-6" />
                </div>
                <h4 className="text-[18px] md:text-4xl font-black text-white tracking-tighter uppercase italic leading-none">{nodeTitle}</h4>
              </div>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">{nodeBody}</p>
              <div className="flex flex-wrap gap-4">
                {trustLabels.map((label, i) => (
                  <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                    <ShieldCheck size={14} className="text-green-500" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-[350px] flex items-center justify-center bg-black/20 rounded-[3rem] border border-white/5 backdrop-blur-md overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <Image src={nodeImage} alt="Security Tech" fill className="object-cover" />
              </div>
              <div className="relative z-10 flex items-center gap-8 md:gap-16">
                <div className="flex flex-col gap-8">
                  <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center animate-pulse"><Github className="w-8 h-8 text-white" /></div>
                  <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center animate-pulse delay-75"><Linkedin className="w-8 h-8" style={{ color: accentColor }} /></div>
                </div>
                <div className="relative">
                  <div className="absolute -inset-8 blur-[50px] rounded-full animate-pulse" style={{ background: `${accentColor}33` }} />
                  <div className="w-28 h-28 md:w-36 md:h-36 rounded-[2.5rem] p-[2px] shadow-2xl" style={{ background: `linear-gradient(135deg, ${accentColor}, #6366f1)` }}>
                    <div className="w-full h-full bg-[#020617] rounded-[2.3rem] flex items-center justify-center relative overflow-hidden">
                      <Code2 size={48} className="text-white relative z-10 animate-pulse" />
                      <div className="absolute top-0 left-0 w-full h-[3px] animate-[scan_2s_ease-in-out_infinite]" style={{ background: accentColor, boxShadow: `0 0 20px ${accentColor}` }} />
                    </div>
                  </div>
                </div>
                <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center">
                  <ShieldCheck size={32} className="text-green-500" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes scan { 0% { transform: translateY(-100%); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(400px); opacity: 0; } }
      `}</style>
    </section>
  );
}