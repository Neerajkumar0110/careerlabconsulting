'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight, CheckCircle2, TrendingUp, ChevronRight,
} from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

// ── Helpers ───────────────────────────────────────────────────────────────────

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface StepTag {
  label: string;
  color: string;
  bg: string;
  border: string;
}

interface Step {
  id: string;
  title: string;
  desc: string;
  gradient: string;
  glow: string;
  border: string;
  hoverBorder: string;
  accent: string;
  tag: StepTag;
}

// ── Default fallback data (mirrors the seed) ──────────────────────────────────

const DEFAULT_STEPS: Step[] = [
  {
    id: '01',
    title: 'Discovery & Context',
    desc: 'Business data aur requirements analyze karke AI agent ka blueprint taiyar hota hai.',
    gradient: 'from-blue-600 to-cyan-400',
    glow: 'rgba(59,130,246,0.15)',
    border: 'rgba(59,130,246,0.25)',
    hoverBorder: 'rgba(59,130,246,0.55)',
    accent: '#60a5fa',
    tag: { label: 'Eliminates Guesswork', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  },
  {
    id: '02',
    title: 'Neural Training',
    desc: 'Agent ko aapke specific knowledge base par train kiya jata hai high accuracy ke liye.',
    gradient: 'from-indigo-600 to-purple-400',
    glow: 'rgba(99,102,241,0.15)',
    border: 'rgba(99,102,241,0.25)',
    hoverBorder: 'rgba(99,102,241,0.55)',
    accent: '#a78bfa',
    tag: { label: '99% Accuracy', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  },
  {
    id: '03',
    title: 'Integration',
    desc: 'AI modules ko aapke existing CRM aur ERP tools ke saath connect kiya jata hai.',
    gradient: 'from-cyan-600 to-blue-400',
    glow: 'rgba(6,182,212,0.15)',
    border: 'rgba(6,182,212,0.25)',
    hoverBorder: 'rgba(6,182,212,0.55)',
    accent: '#22d3ee',
    tag: { label: 'Zero Downtime', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  },
  {
    id: '04',
    title: 'Autonomous Launch',
    desc: 'Aapka workforce live ho jata hai, jo 24/7 bina human intervention ke perform karta hai.',
    gradient: 'from-emerald-600 to-teal-400',
    glow: 'rgba(16,185,129,0.15)',
    border: 'rgba(16,185,129,0.25)',
    hoverBorder: 'rgba(16,185,129,0.55)',
    accent: '#34d399',
    tag: { label: 'Instant ROI', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  },
];

// ── SVG Illustrations (unchanged — purely decorative, no CMS needed) ──────────

const DiscoveryIllustration = () => (
  <svg viewBox="0 0 80 80" className="w-full h-full illus-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="disc-grid" width="8" height="8" patternUnits="userSpaceOnUse">
        <path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(59,130,246,0.1)" strokeWidth="0.5"/>
      </pattern>
      <radialGradient id="disc-bg" cx="55%" cy="55%" r="50%">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.18"/>
        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
      </radialGradient>
      <clipPath id="disc-clip"><rect width="80" height="80"/></clipPath>
    </defs>
    <rect width="80" height="80" fill="url(#disc-grid)" clipPath="url(#disc-clip)"/>
    <rect width="80" height="80" fill="url(#disc-bg)"/>
    <rect x="10" y="10" width="32" height="42" rx="3" fill="rgba(15,23,42,0.92)" stroke="#1e3a5f" strokeWidth="1.2"/>
    <rect x="10" y="10" width="32" height="8" rx="3" fill="#1e3a5f"/>
    <circle cx="16" cy="14" r="1.2" fill="#3b82f6" opacity="0.7"/>
    <circle cx="20" cy="14" r="1.2" fill="#60a5fa" opacity="0.5"/>
    <circle cx="24" cy="14" r="1.2" fill="#93c5fd" opacity="0.4"/>
    <line x1="14" y1="24" x2="37" y2="24" stroke="#3b82f6" strokeWidth="1.1" strokeLinecap="round" className="illus-dash" opacity="0.85"/>
    <line x1="14" y1="28" x2="32" y2="28" stroke="#60a5fa" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
    <line x1="14" y1="32" x2="34" y2="32" stroke="#60a5fa" strokeWidth="1" strokeLinecap="round" opacity="0.45"/>
    <line x1="14" y1="36" x2="28" y2="36" stroke="#3b82f6" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
    <rect x="14" y="42" width="3" height="4" rx="0.8" fill="#1d4ed8" opacity="0.8"/>
    <rect x="19" y="40" width="3" height="6" rx="0.8" fill="#3b82f6" opacity="0.85"/>
    <rect x="24" y="41" width="3" height="5" rx="0.8" fill="#1d4ed8" opacity="0.7"/>
    <rect x="29" y="39" width="3" height="7" rx="0.8" fill="#60a5fa" opacity="0.9"/>
    <rect x="34" y="43" width="3" height="3" rx="0.8" fill="#3b82f6" opacity="0.6"/>
    <circle cx="51" cy="51" r="17" fill="rgba(59,130,246,0.06)" stroke="#1e3a5f" strokeWidth="0.8" className="illus-pulse"/>
    <circle cx="51" cy="51" r="12.5" fill="rgba(30,58,138,0.28)" stroke="#3b82f6" strokeWidth="1.8"/>
    <circle cx="51" cy="51" r="9" fill="rgba(59,130,246,0.08)" stroke="#60a5fa" strokeWidth="0.8"/>
    <line x1="51" y1="43" x2="51" y2="45.5" stroke="#93c5fd" strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="51" y1="56.5" x2="51" y2="59" stroke="#93c5fd" strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="43" y1="51" x2="45.5" y2="51" stroke="#93c5fd" strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="56.5" y1="51" x2="59" y2="51" stroke="#93c5fd" strokeWidth="1.2" strokeLinecap="round"/>
    <circle cx="51" cy="51" r="2.2" fill="#3b82f6" className="illus-blink"/>
    <line x1="44" y1="49" x2="58" y2="49" stroke="#22d3ee" strokeWidth="0.9" className="illus-dash" opacity="0.7"/>
    <line x1="60" y1="60" x2="69" y2="69" stroke="#1e40af" strokeWidth="3.5" strokeLinecap="round"/>
    <line x1="60" y1="60" x2="69" y2="69" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="70" cy="12" r="2.2" fill="#1e40af" stroke="#3b82f6" strokeWidth="0.8"/>
    <circle cx="8" cy="60" r="1.8" fill="#1e40af" stroke="#60a5fa" strokeWidth="0.8"/>
    <circle cx="73" cy="36" r="1.2" fill="#60a5fa" opacity="0.5" className="illus-blink"/>
  </svg>
);

const NeuralIllustration = () => (
  <svg viewBox="0 0 80 80" className="w-full h-full illus-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="neural-bg" cx="50%" cy="45%" r="52%">
        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#6366f1" stopOpacity="0"/>
      </radialGradient>
    </defs>
    <rect width="80" height="80" fill="url(#neural-bg)"/>
    <path d="M24 46 C16 43 12 35 14 27 C16 19 23 15 30 17 C31 13 36 11 39 14" fill="none" stroke="#6366f1" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M41 14 C44 11 49 13 50 17 C57 15 64 19 66 27 C68 35 64 43 56 46" fill="none" stroke="#818cf8" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M24 46 C24 53 29 57 33 57 C34 60 37 61 40 60 C43 61 46 60 47 57 C51 57 56 53 56 46" fill="rgba(79,70,229,0.08)" stroke="#6366f1" strokeWidth="1.2"/>
    <line x1="40" y1="14" x2="40" y2="46" stroke="#818cf8" strokeWidth="0.7" strokeDasharray="2 2" opacity="0.4"/>
    <path d="M30 22 C29 28 31 35 29 42" fill="none" stroke="#818cf8" strokeWidth="0.9" opacity="0.5" strokeLinecap="round"/>
    <path d="M40 17 C39 24 41 32 40 42" fill="none" stroke="#a78bfa" strokeWidth="0.9" opacity="0.4" strokeLinecap="round"/>
    <path d="M50 22 C51 28 49 35 51 42" fill="none" stroke="#818cf8" strokeWidth="0.9" opacity="0.5" strokeLinecap="round"/>
    <circle cx="27" cy="29" r="3" fill="#312e81" stroke="#818cf8" strokeWidth="1.2"/>
    <circle cx="40" cy="24" r="3.5" fill="#3730a3" stroke="#a78bfa" strokeWidth="1.2"/>
    <circle cx="53" cy="29" r="3" fill="#312e81" stroke="#818cf8" strokeWidth="1.2"/>
    <circle cx="32" cy="44" r="2.5" fill="#4338ca" stroke="#c084fc" strokeWidth="1"/>
    <circle cx="48" cy="44" r="2.5" fill="#4338ca" stroke="#c084fc" strokeWidth="1"/>
    <circle cx="40" cy="38" r="5" fill="#3730a3" stroke="#a78bfa" strokeWidth="1.5" className="illus-pulse"/>
    <circle cx="40" cy="38" r="2.5" fill="#6366f1"/>
    <line x1="27" y1="29" x2="40" y2="24" stroke="#818cf8" strokeWidth="0.9" strokeDasharray="2 2" className="illus-flow" opacity="0.7"/>
    <line x1="40" y1="24" x2="53" y2="29" stroke="#818cf8" strokeWidth="0.9" strokeDasharray="2 2" className="illus-flow" opacity="0.7" style={{animationDirection:'reverse'}}/>
    <line x1="27" y1="29" x2="40" y2="38" stroke="#c084fc" strokeWidth="0.9" opacity="0.55"/>
    <line x1="53" y1="29" x2="40" y2="38" stroke="#c084fc" strokeWidth="0.9" opacity="0.55"/>
    <line x1="32" y1="44" x2="40" y2="38" stroke="#a78bfa" strokeWidth="0.9" opacity="0.65"/>
    <line x1="48" y1="44" x2="40" y2="38" stroke="#a78bfa" strokeWidth="0.9" opacity="0.65"/>
    <rect x="18" y="63" width="44" height="5" rx="2.5" fill="rgba(79,70,229,0.15)" stroke="#4338ca" strokeWidth="0.8"/>
    <rect x="18" y="63" width="35" height="5" rx="2.5" fill="#6366f1" style={{filter:'drop-shadow(0 0 4px #6366f1)'}}/>
    <text x="40" y="75" textAnchor="middle" fontSize="5.5" fill="#a78bfa" fontFamily="monospace" opacity="0.85">Training 80%</text>
    <circle cx="12" cy="20" r="1.5" fill="#c084fc" opacity="0.6" className="illus-blink"/>
    <circle cx="70" cy="16" r="1.5" fill="#818cf8" opacity="0.5" className="illus-blink" style={{animationDelay:'0.4s'}}/>
    <circle cx="68" cy="56" r="1" fill="#a78bfa" opacity="0.5"/>
  </svg>
);

const IntegrationIllustration = () => (
  <svg viewBox="0 0 80 80" className="w-full h-full illus-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="int-bg" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.14"/>
        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0"/>
      </radialGradient>
      <pattern id="int-grid" width="8" height="8" patternUnits="userSpaceOnUse">
        <path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(6,182,212,0.07)" strokeWidth="0.5"/>
      </pattern>
    </defs>
    <rect width="80" height="80" fill="url(#int-grid)"/>
    <rect width="80" height="80" fill="url(#int-bg)"/>
    <rect x="3" y="8" width="22" height="17" rx="2.5" fill="rgba(2,6,23,0.93)" stroke="#0e7490" strokeWidth="1.2"/>
    <rect x="3" y="8" width="22" height="6" rx="2.5" fill="rgba(8,145,178,0.45)"/>
    <text x="14" y="14.5" textAnchor="middle" fontSize="5" fill="#67e8f9" fontFamily="monospace" fontWeight="bold">CRM</text>
    <line x1="6" y1="20" x2="22" y2="20" stroke="#06b6d4" strokeWidth="0.9" strokeLinecap="round" opacity="0.7"/>
    <line x1="6" y1="23" x2="17" y2="23" stroke="#06b6d4" strokeWidth="0.9" strokeLinecap="round" opacity="0.4"/>
    <rect x="55" y="8" width="22" height="17" rx="2.5" fill="rgba(2,6,23,0.93)" stroke="#0e7490" strokeWidth="1.2"/>
    <rect x="55" y="8" width="22" height="6" rx="2.5" fill="rgba(8,145,178,0.45)"/>
    <text x="66" y="14.5" textAnchor="middle" fontSize="5" fill="#67e8f9" fontFamily="monospace" fontWeight="bold">ERP</text>
    <line x1="58" y1="20" x2="74" y2="20" stroke="#06b6d4" strokeWidth="0.9" strokeLinecap="round" opacity="0.7"/>
    <line x1="58" y1="23" x2="70" y2="23" stroke="#06b6d4" strokeWidth="0.9" strokeLinecap="round" opacity="0.4"/>
    <rect x="3" y="55" width="22" height="17" rx="2.5" fill="rgba(2,6,23,0.93)" stroke="#0891b2" strokeWidth="1.2"/>
    <rect x="3" y="55" width="22" height="6" rx="2.5" fill="rgba(8,145,178,0.35)"/>
    <text x="14" y="61.5" textAnchor="middle" fontSize="5" fill="#67e8f9" fontFamily="monospace" fontWeight="bold">API</text>
    <line x1="6" y1="66" x2="22" y2="66" stroke="#22d3ee" strokeWidth="0.9" strokeLinecap="round" opacity="0.55"/>
    <line x1="6" y1="69" x2="16" y2="69" stroke="#22d3ee" strokeWidth="0.9" strokeLinecap="round" opacity="0.35"/>
    <rect x="55" y="55" width="22" height="17" rx="2.5" fill="rgba(2,6,23,0.93)" stroke="#0891b2" strokeWidth="1.2"/>
    <rect x="55" y="55" width="22" height="6" rx="2.5" fill="rgba(8,145,178,0.35)"/>
    <text x="66" y="61.5" textAnchor="middle" fontSize="5" fill="#67e8f9" fontFamily="monospace" fontWeight="bold">DB</text>
    <ellipse cx="66" cy="68" rx="6" ry="2" fill="none" stroke="#22d3ee" strokeWidth="0.9" opacity="0.6"/>
    <ellipse cx="66" cy="70.5" rx="6" ry="2" fill="none" stroke="#22d3ee" strokeWidth="0.7" opacity="0.35"/>
    <line x1="60" y1="68" x2="60" y2="70.5" stroke="#22d3ee" strokeWidth="0.7" opacity="0.4"/>
    <line x1="72" y1="68" x2="72" y2="70.5" stroke="#22d3ee" strokeWidth="0.7" opacity="0.4"/>
    <circle cx="40" cy="40" r="13" fill="rgba(6,182,212,0.1)" stroke="#06b6d4" strokeWidth="1.5"/>
    <circle cx="40" cy="40" r="8.5" fill="rgba(6,182,212,0.18)" stroke="#22d3ee" strokeWidth="1" className="illus-pulse"/>
    <circle cx="40" cy="40" r="4" fill="#0e7490"/>
    <circle cx="40" cy="40" r="2" fill="#06b6d4"/>
    <text x="40" y="57" textAnchor="middle" fontSize="4" fill="#67e8f9" fontFamily="monospace" opacity="0.7">HUB</text>
    <path d="M25 17 Q40 17 28 32" fill="none" stroke="#06b6d4" strokeWidth="1.1" strokeDasharray="3 2" className="illus-dash"/>
    <path d="M55 17 Q42 17 52 32" fill="none" stroke="#06b6d4" strokeWidth="1.1" strokeDasharray="3 2" className="illus-dash" style={{animationDirection:'reverse'}}/>
    <path d="M25 63 Q40 63 28 48" fill="none" stroke="#0891b2" strokeWidth="1.1" strokeDasharray="3 2" className="illus-dash"/>
    <path d="M55 63 Q42 63 52 48" fill="none" stroke="#0891b2" strokeWidth="1.1" strokeDasharray="3 2" className="illus-dash" style={{animationDirection:'reverse'}}/>
    <circle cx="32" cy="27" r="1.8" fill="#22d3ee" className="illus-blink"/>
    <circle cx="48" cy="27" r="1.8" fill="#22d3ee" className="illus-blink" style={{animationDelay:'0.6s'}}/>
    <circle cx="32" cy="53" r="1.5" fill="#67e8f9" className="illus-blink" style={{animationDelay:'0.3s'}}/>
    <circle cx="48" cy="53" r="1.5" fill="#67e8f9" className="illus-blink" style={{animationDelay:'0.9s'}}/>
  </svg>
);

const LaunchIllustration = () => (
  <svg viewBox="0 0 80 80" className="w-full h-full illus-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="launch-bg" cx="50%" cy="70%" r="55%">
        <stop offset="0%" stopColor="#10b981" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#10b981" stopOpacity="0"/>
      </radialGradient>
      <linearGradient id="flame-a" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f97316" stopOpacity="0.95"/>
        <stop offset="55%" stopColor="#fbbf24" stopOpacity="0.7"/>
        <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
      </linearGradient>
      <linearGradient id="flame-b" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.7"/>
        <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
      </linearGradient>
    </defs>
    <rect width="80" height="80" fill="url(#launch-bg)"/>
    {[[7,8],[20,5],[61,7],[73,14],[70,30],[14,36],[65,48]].map(([cx,cy],i) => (
      <circle key={i} cx={cx} cy={cy} r={i%2===0?1:0.7} fill="white" opacity={0.4+i*0.05} className="illus-blink" style={{animationDelay:`${i*0.25}s`}}/>
    ))}
    <ellipse cx="40" cy="46" rx="30" ry="8" fill="none" stroke="#059669" strokeWidth="0.9" strokeDasharray="4 3" opacity="0.3" className="illus-dash"/>
    <path d="M37 67 Q38 74 40 77 Q42 74 43 67" fill="url(#flame-a)" className="illus-float"/>
    <path d="M38 65 Q39 70 40 73 Q41 70 42 65" fill="url(#flame-b)" className="illus-float" style={{animationDelay:'0.18s'}}/>
    <path d="M39 64 Q40 67 40 70 Q40.5 67 41 64" fill="rgba(251,191,36,0.5)" className="illus-float" style={{animationDelay:'0.08s'}}/>
    <rect x="26" y="66" width="28" height="3.5" rx="1.5" fill="#064e3b" stroke="#059669" strokeWidth="0.9"/>
    <rect x="31" y="69.5" width="3.5" height="7" rx="1" fill="#065f46"/>
    <rect x="45" y="69.5" width="3.5" height="7" rx="1" fill="#065f46"/>
    <line x1="28" y1="74" x2="52" y2="74" stroke="#059669" strokeWidth="0.8" opacity="0.4"/>
    <line x1="30" y1="66" x2="28" y2="62" stroke="#059669" strokeWidth="0.8" opacity="0.5"/>
    <line x1="50" y1="66" x2="52" y2="62" stroke="#059669" strokeWidth="0.8" opacity="0.5"/>
    <path d="M40 9 L33 38 L47 38 Z" fill="rgba(52,211,153,0.15)" stroke="#34d399" strokeWidth="1.6"/>
    <path d="M40 9 L37 31 L40 38" fill="rgba(52,211,153,0.07)"/>
    <rect x="33" y="38" width="14" height="15" rx="2" fill="rgba(6,78,59,0.55)" stroke="#10b981" strokeWidth="1.2"/>
    <circle cx="40" cy="30" r="5" fill="rgba(52,211,153,0.2)" stroke="#6ee7b7" strokeWidth="1.3"/>
    <circle cx="40" cy="30" r="2.8" fill="rgba(110,231,183,0.35)" stroke="#a7f3d0" strokeWidth="0.8"/>
    <circle cx="38.5" cy="28.5" r="1" fill="rgba(255,255,255,0.3)"/>
    <line x1="36" y1="43" x2="44" y2="43" stroke="#34d399" strokeWidth="0.9" strokeLinecap="round" opacity="0.6"/>
    <line x1="36" y1="46" x2="44" y2="46" stroke="#34d399" strokeWidth="0.9" strokeLinecap="round" opacity="0.4"/>
    <path d="M33 46 L22 60 L33 57" fill="rgba(5,150,105,0.3)" stroke="#10b981" strokeWidth="1.1"/>
    <path d="M47 46 L58 60 L47 57" fill="rgba(5,150,105,0.3)" stroke="#10b981" strokeWidth="1.1"/>
    <path d="M35 53 Q40 56.5 45 53" fill="#042f2e" stroke="#10b981" strokeWidth="1.1"/>
    <ellipse cx="40" cy="53" rx="5" ry="1.5" fill="#064e3b" opacity="0.8"/>
    <rect x="54" y="36" width="22" height="12" rx="3" fill="rgba(6,78,59,0.85)" stroke="#10b981" strokeWidth="0.9"/>
    <text x="65" y="44.5" textAnchor="middle" fontSize="6" fill="#34d399" fontFamily="monospace" fontWeight="bold">24/7</text>
    <rect x="4" y="36" width="22" height="11" rx="2.5" fill="rgba(2,6,23,0.85)" stroke="#059669" strokeWidth="0.9"/>
    <circle cx="9.5" cy="41.5" r="2" fill="#10b981" className="illus-blink"/>
    <text x="23" y="44.5" textAnchor="end" fontSize="5" fill="#34d399" fontFamily="monospace" fontWeight="bold">AUTO</text>
  </svg>
);

// Map step id → illustration component
const ILLUSTRATION_MAP: Record<string, React.FC> = {
  '01': DiscoveryIllustration,
  '02': NeuralIllustration,
  '03': IntegrationIllustration,
  '04': LaunchIllustration,
};

// ── Counter ───────────────────────────────────────────────────────────────────

interface CounterProps {
  to: number;
  suffix?: string;
  duration?: number;
}

function Counter({ to, suffix = '', duration = 1600 }: CounterProps) {
  const [val, setVal] = useState<number>(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * to));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to, duration]);

  return <span ref={ref}>{val}{suffix}</span>;
}

// ── Connector ─────────────────────────────────────────────────────────────────

const Connector = ({ color }: { color: string }) => (
  <div className="hidden lg:flex items-center justify-center w-8 shrink-0 mt-[-40px]">
    <ChevronRight className="w-5 h-5" style={{ color }} opacity={0.45} />
  </div>
);

// ── Component ─────────────────────────────────────────────────────────────────

export default function ExecutionFlow() {
  const { get } = usePageContent('execution-flow');

  // ── CMS values ────────────────────────────────────────────────────────────
  const badgeText    = get('header', 'badge_text',  'Strategic Framework');
  const headline1    = get('header', 'headline_1',  'Transforming Data into');
  const headline2    = get('header', 'headline_2',  'Digital Assets.');
  const stepsRaw     = get('steps',  'steps_json',  JSON.stringify(DEFAULT_STEPS));

  // USP banner
  const uspLiveLabel = get('usp_banner', 'live_label',   'Verified Result');
  const uspPctRaw    = get('usp_banner', 'percentage',   '40');
  const uspHeadline  = get('usp_banner', 'metric_label', 'Cost Reduction');
  const uspSubtext   = get('usp_banner', 'description',  'Average enterprise saving across 200+ deployments');
  const stat1Value   = get('usp_banner', 'stat_1_value', '200+');
  const stat1Label   = get('usp_banner', 'stat_1_label', 'Deployments');
  const stat2Value   = get('usp_banner', 'stat_2_value', '99.97%');
  const stat2Label   = get('usp_banner', 'stat_2_label', 'Uptime');

  const steps: Step[]  = safeParse<Step[]>(stepsRaw, DEFAULT_STEPS);
  const uspPct: number = parseInt(uspPctRaw, 10) || 40;

  return (
    <section className="py-16 md:py-24 bg-[#020617] relative overflow-hidden">
      {/* ambient glows */}
      <div className="absolute top-[5%] left-[3%] w-[350px] h-[350px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[280px] h-[280px] bg-emerald-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">

        {/* ── Header row ── */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-6 md:mb-8">

          {/* Title */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-blue-500 font-mono text-[10px] tracking-[0.3em] uppercase mb-4"
            >
              <span className="w-6 h-px bg-blue-500" />
              {badgeText}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tighter"
            >
              {headline1}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">
                {headline2}
              </span>
            </motion.h2>
          </div>

          {/* USP Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="relative lg:shrink-0 lg:w-[280px]"
          >
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-amber-400/40 via-yellow-500/20 to-amber-600/30 blur-[2px]" />
            <div
              className="relative rounded-2xl border border-amber-400/30 overflow-hidden"
              style={{ background: 'linear-gradient(135deg,rgba(120,53,15,0.45),rgba(2,6,23,0.95))' }}
            >
              <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />
              <div className="p-5 sm:p-6">
                {/* live pill */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-amber-400 font-mono text-[10px] uppercase tracking-[0.25em] font-bold">
                    {uspLiveLabel}
                  </span>
                </div>
                {/* big number */}
                <div className="flex items-start gap-1 mb-1">
                  <span className="text-4xl md:text-5xl font-black text-white leading-none tracking-tighter">
                    <Counter to={uspPct} suffix="%" duration={1800} />
                  </span>
                  <div className="mt-2 flex items-center gap-1 bg-amber-500/15 border border-amber-400/25 rounded-full px-2 py-0.5">
                    <TrendingUp className="w-3 h-3 text-amber-400" />
                    <span className="text-amber-400 text-[9px] font-bold">AVG</span>
                  </div>
                </div>
                <p className="text-white font-bold text-base mb-0.5">{uspHeadline}</p>
                <p className="text-slate-400 text-xs leading-relaxed">{uspSubtext}</p>
                {/* mini bar */}
                <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(to right,#f59e0b,#fbbf24)', boxShadow: '0 0 10px #f59e0b' }}
                    initial={{ width: '0%' }}
                    whileInView={{ width: `${Math.min(uspPct * 1.5, 100)}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.6, delay: 0.4, ease: 'easeOut' }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[9px] text-slate-600 font-mono">0%</span>
                  <span className="text-[9px] text-amber-400 font-mono font-bold">{uspPct}%</span>
                  <span className="text-[9px] text-slate-600 font-mono">100%</span>
                </div>
                {/* secondary stats */}
                <div className="mt-4 pt-4 border-t border-white/[0.06] grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-white text-center md:text-left font-black text-xl md:text-lg leading-none">{stat1Value}</p>
                    <p className="text-slate-500 text-center md:text-left text-[12px] md:text-[10px] mt-0.5">{stat1Label}</p>
                  </div>
                  <div>
                    <p className="text-white text-center md:text-left font-black text-xl md:text-lg leading-none">{stat2Value}</p>
                    <p className="text-slate-500 text-center md:text-left text-[12px] md:text-[10px] mt-0.5">{stat2Label}</p>
                  </div>
                </div>
              </div>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* ── Step cards ── */}
        <div className="flex flex-col lg:flex-row lg:items-stretch gap-4 lg:gap-0">
          {steps.map((step, idx) => {
            const IllustrationComponent = ILLUSTRATION_MAP[step.id] ?? DiscoveryIllustration;
            return (
              <React.Fragment key={step.id}>
                <motion.article
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: idx * 0.1 }}
                  className="group relative flex-1 flex flex-col rounded-2xl overflow-hidden cursor-default transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: 'linear-gradient(160deg,rgba(255,255,255,0.04) 0%,rgba(255,255,255,0.01) 100%)',
                    border: `1px solid ${step.border}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.border = `1px solid ${step.hoverBorder}`;
                    e.currentTarget.style.boxShadow = `0 8px 32px ${step.glow}, 0 0 0 1px ${step.hoverBorder}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.border = `1px solid ${step.border}`;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* top gradient line */}
                  <div className={`h-[2px] w-full bg-gradient-to-r ${step.gradient}`} />

                  <div className="flex flex-col flex-1 p-5 sm:p-6">
                    {/* illustration */}
                    <div
                      className="relative w-full h-28 sm:h-32 mb-5 rounded-xl overflow-hidden flex items-center justify-center"
                      style={{ background: `radial-gradient(ellipse at 50% 50%, ${step.glow.replace('0.15', '0.3')}, rgba(2,6,23,0.6))` }}
                    >
                      <div
                        className="absolute inset-0 opacity-[0.07]"
                        style={{
                          backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.3) 1px,transparent 1px)',
                          backgroundSize: '16px 16px',
                        }}
                      />
                      <div className="relative w-32 h-32">
                        <IllustrationComponent />
                      </div>
                      <span
                        className="absolute top-2 left-2.5 text-[18px] md:text-[24px] font-mono font-black opacity-30"
                        style={{ color: step.accent }}
                      >
                        {step.id}
                      </span>
                    </div>

                    {/* tag */}
                    <div className={`self-start flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-bold mb-3 ${step.tag.color} ${step.tag.bg} ${step.tag.border}`}>
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      {step.tag.label}
                    </div>

                    {/* title */}
                    <h3 className="text-white font-black text-base sm:text-lg leading-snug mb-2 tracking-tight">
                      {step.title}
                    </h3>

                    {/* desc */}
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed flex-1">
                      {step.desc}
                    </p>

                    {/* bottom arrow */}
                    <div className="mt-4 flex items-center justify-between opacity-40 group-hover:opacity-100 transition-all duration-300">
                      <div
                        className="h-px w-6 group-hover:w-10 transition-all duration-300 rounded-full"
                        style={{ background: step.accent }}
                      />
                      <ArrowRight className="w-4 h-4 transition-colors duration-300" style={{ color: step.accent }} />
                    </div>
                  </div>
                </motion.article>

                {idx < steps.length - 1 && <Connector color={step.accent} />}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}