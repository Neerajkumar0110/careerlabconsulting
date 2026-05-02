'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Globe, Zap, FolderKanban, LucideIcon } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

// ── Helpers ───────────────────────────────────────────────────────────────────
function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Icon registry ─────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, LucideIcon> = { Globe, Users, Zap, FolderKanban };

// ── Types ─────────────────────────────────────────────────────────────────────
interface StatCardData {
  title: string;
  subtitle: string;
  icon: string;
  colorClass: string;
  initialValue: number;
  min: number;
  max: number;
  suffix: string;
  intervalMs: number;
}

interface HighlightPill { value: string; label: string; color: string; }

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_STAT_CARDS: StatCardData[] = [
  { title: 'Global Visitors',  subtitle: 'Active users exploring from across the globe.',          icon: 'Globe',        colorClass: 'bg-blue-600',    initialValue: 8420, min: 8000, max: 9900, suffix: '+',  intervalMs: 1000 },
  { title: 'Indian Visitors',  subtitle: 'Real-time traffic originating from India.',              icon: 'Users',        colorClass: 'bg-orange-500',  initialValue: 3150, min: 3000, max: 4200, suffix: '',   intervalMs: 1800 },
  { title: 'API Requests',     subtitle: 'Current requests being processed by our edge.',         icon: 'Zap',          colorClass: 'bg-purple-600',  initialValue: 142,  min: 120,  max: 180,  suffix: '/s', intervalMs: 1200 },
  { title: 'Active Projects',  subtitle: 'Ongoing enterprise projects powered by AI.',            icon: 'FolderKanban', colorClass: 'bg-emerald-600', initialValue: 512,  min: 510,  max: 525,  suffix: '',   intervalMs: 2000 },
];

const DEFAULT_HIGHLIGHTS: HighlightPill[] = [
  { value: '99.9%', label: 'Uptime',     color: 'text-blue-400'    },
  { value: '24/7',  label: 'Monitoring', color: 'text-emerald-400' },
];

// ── DynamicCounter ────────────────────────────────────────────────────────────
interface CounterProps { initialValue: number; min: number; max: number; intervalMs?: number; suffix?: string; }

const DynamicCounter: React.FC<CounterProps> = ({ initialValue, min, max, intervalMs = 3000, suffix = '' }) => {
  const [count, setCount] = useState<number>(initialValue);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const updateNumber = () => {
      setCount((prev) => {
        const range = max - min;
        const proximityToMax = (prev - min) / range;
        const chance = Math.random();
        let change = 0;
        if (chance > 0.65) {
          change = Math.floor(Math.random() * (range * 0.05)) + Math.floor(range * 0.05);
        } else {
          change = Math.floor(Math.random() * (range * 0.03)) + 1;
        }
        const direction = Math.random() < proximityToMax ? -1 : 1;
        let nextValue = prev + change * direction;
        if (nextValue <= min) return min;
        if (nextValue >= max) return max;
        return nextValue;
      });
      const nextTick = intervalMs + (Math.random() * 400 - 200);
      timeoutId = setTimeout(updateNumber, nextTick);
    };
    timeoutId = setTimeout(updateNumber, intervalMs);
    return () => clearTimeout(timeoutId);
  }, [min, max, intervalMs]);

  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={count}
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -5, opacity: 0 }}
        transition={{ duration: 0.15, ease: 'easeInOut' }}
        className="tabular-nums inline-block min-w-[1ch]"
      >
        {count.toLocaleString()}{suffix}
      </motion.span>
    </AnimatePresence>
  );
};

// ── StatCard ──────────────────────────────────────────────────────────────────
interface StatCardProps { data: StatCardData; delay: number; liveBadgeLabel: string; accentColor: string; }

const StatCard: React.FC<StatCardProps> = ({ data, delay, liveBadgeLabel, accentColor }) => {
  const Icon = ICON_MAP[data.icon] ?? Globe;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="relative group p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.07] transition-all overflow-hidden"
    >
      <div className={`absolute -right-4 -top-4 w-24 h-24 blur-3xl opacity-10 transition-opacity group-hover:opacity-30 ${data.colorClass}`} />

      <div className="flex items-start justify-between mb-8">
        <div className="p-2.5 rounded-xl border" style={{ background: `${accentColor}1a`, borderColor: `${accentColor}33` }}>
          <Icon className="w-5 h-5" style={{ color: accentColor }} />
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border" style={{ background: '#10b98133', borderColor: '#10b98133' }}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">{liveBadgeLabel}</span>
        </div>
      </div>

      <div className="relative z-10">
        <p className="text-slate-400 text-xs font-semibold uppercase tracking-[0.15em] mb-1">{data.title}</p>
        <h3 className="text-4xl font-bold text-white tracking-tight">
          <DynamicCounter initialValue={data.initialValue} min={data.min} max={data.max} suffix={data.suffix} intervalMs={data.intervalMs} />
        </h3>
        <p className="mt-2 text-slate-500 text-sm font-medium leading-relaxed">{data.subtitle}</p>
      </div>
    </motion.div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
const LiveTrafficSection: React.FC = () => {
  const { get } = usePageContent('live-traffic2');

  // ── CMS values ─────────────────────────────────────────────────────────────
  const headlineLine1   = get('live_traffic', 'headline_line1',   'Global Scale.');
  const headlineLine2   = get('live_traffic', 'headline_line2',   'Real-time Impact.');
  const bodyText        = get('live_traffic', 'body_text',        'Monitoring global operations and infrastructure performance in real-time.');
  const highlightsRaw   = get('live_traffic', 'highlights_json',  JSON.stringify(DEFAULT_HIGHLIGHTS));
  const statCardsRaw    = get('live_traffic', 'stat_cards_json',  JSON.stringify(DEFAULT_STAT_CARDS));
  const accentColor     = get('live_traffic', 'accent_color',     '#3b82f6');
  const liveBadgeLabel  = get('live_traffic', 'live_badge_label', 'Live');

  const highlights = safeParse<HighlightPill[]>(highlightsRaw, DEFAULT_HIGHLIGHTS);
  const statCards  = safeParse<StatCardData[]>(statCardsRaw,   DEFAULT_STAT_CARDS);

  return (
    <section className="py-24 bg-[#020617] text-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* ── Header row ────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-xl">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6"
            >
              {headlineLine1}
              <br />
              <span style={{ color: accentColor }}>{headlineLine2}</span>
            </motion.h2>
            <p className="text-slate-400 text-lg">{bodyText}</p>
          </div>

          {/* Highlight pills */}
          <div className="flex items-center gap-6 bg-white/[0.03] p-4 rounded-2xl border border-white/5">
            {highlights.map((pill, i) => (
              <React.Fragment key={pill.label}>
                {i > 0 && <div className="h-10 w-[1px] bg-white/10" />}
                <div>
                  <p className={`text-3xl font-bold ${pill.color}`}>{pill.value}</p>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{pill.label}</p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ── Stat cards ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {statCards.map((card, i) => (
            <StatCard key={card.title} data={card} delay={(i + 1) * 0.1} liveBadgeLabel={liveBadgeLabel} accentColor={accentColor} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default LiveTrafficSection;