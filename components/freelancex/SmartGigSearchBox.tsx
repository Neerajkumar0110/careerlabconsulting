'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  Search, ArrowRight, TrendingUp, X, Briefcase,
  Flame, TrendingDown, Zap, Star, DollarSign,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────────────────────────────────────

const API_BASE = process.env.NEXT_PUBLIC_FREELANCEX_API_BASE ?? 'https://clc-products-real-backend.vercel.app';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

interface TrendingGigItem {
  label: string;
  proposals: number;
  tag: 'hot' | 'trending' | 'rising';
}

interface GigAutocompleteResult {
  titles: string[];
  skills: string[];
  clients: string[];
}

type GigItem =
  | { kind: 'trending'; data: TrendingGigItem }
  | { kind: 'suggestion'; value: string }
  | { kind: 'skill'; value: string }
  | { kind: 'client'; value: string };

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const TAG_STYLES: Record<string, { text: string; bg: string; border: string }> = {
  trending: { text: '#f59e0b', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)' },
  hot:      { text: '#ef4444', bg: 'rgba(239,68,68,0.12)',  border: 'rgba(239,68,68,0.3)'  },
  rising:   { text: '#10b981', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)' },
};

const TAG_ICONS: Record<string, React.ElementType> = {
  hot: Flame, trending: TrendingUp, rising: TrendingDown,
};

const SKILL_COLOR = '#a78bfa';

// ─────────────────────────────────────────────────────────────────────────────
// IN-MEMORY CACHE
// ─────────────────────────────────────────────────────────────────────────────

const _cache = new Map<string, { data: unknown; ts: number }>();

function cacheGet<T>(key: string, ttlMs: number): T | null {
  const hit = _cache.get(key);
  if (hit && Date.now() - hit.ts < ttlMs) return hit.data as T;
  return null;
}
function cacheSet(key: string, data: unknown) {
  _cache.set(key, { data, ts: Date.now() });
}

// ─────────────────────────────────────────────────────────────────────────────
// HIGHLIGHT
// ─────────────────────────────────────────────────────────────────────────────

function Highlight({ text, query }: { text: string; query: string }) {
  const q = query.trim();
  if (!q) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <span className="text-indigo-400 font-semibold">{text.slice(idx, idx + q.length)}</span>
      {text.slice(idx + q.length)}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────────────────────

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

const ddVariants: Variants = {
  hidden:  { opacity: 0, y: -8,  scaleY: 0.96, transformOrigin: 'top center' },
  visible: { opacity: 1, y: 0,   scaleY: 1,    transformOrigin: 'top center', transition: { duration: 0.14, ease: easeOut } },
  exit:    { opacity: 0, y: -4,  scaleY: 0.97, transformOrigin: 'top center', transition: { duration: 0.09, ease: 'easeIn' } },
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION HEADER
// ─────────────────────────────────────────────────────────────────────────────

function SectionLabel({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-2 px-4 pt-3 pb-1.5">
      <Icon className="w-3 h-3 text-slate-500" strokeWidth={2} />
      <span className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">{label}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROPS
// ─────────────────────────────────────────────────────────────────────────────

interface SmartGigSearchBoxProps {
  query: string;
  onQueryChange: (v: string) => void;
  onSearch: () => void;
  onQueryClear?: () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function SmartGigSearchBox({
  query, onQueryChange, onSearch, onQueryClear,
}: SmartGigSearchBoxProps) {

  // ── Focus ────────────────────────────────────────────────────────────────
  const [queryFocused, setQueryFocused] = useState(false);

  // ── Trending ─────────────────────────────────────────────────────────────
  const [trendingItems, setTrendingItems] = useState<TrendingGigItem[]>([]);
  const [trendingReady, setTrendingReady] = useState(false);

  // ── Autocomplete ─────────────────────────────────────────────────────────
  const [acResult,   setAcResult]   = useState<GigAutocompleteResult>({ titles: [], skills: [], clients: [] });
  const [acFetching, setAcFetching] = useState(false);

  // ── Keyboard nav ─────────────────────────────────────────────────────────
  const [activeIdx, setActiveIdx] = useState(-1);

  // ── Refs ─────────────────────────────────────────────────────────────────
  const containerRef  = useRef<HTMLDivElement>(null);
  const inputRef      = useRef<HTMLInputElement>(null);
  const acAbortRef    = useRef<AbortController | null>(null);
  const acTimerRef    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typedRef      = useRef('');

  // ── Derived ──────────────────────────────────────────────────────────────
  const gigItems: GigItem[] = query.trim()
    ? [
        ...acResult.titles.map(v  => ({ kind: 'suggestion' as const, value: v })),
        ...acResult.skills.map(v  => ({ kind: 'skill'      as const, value: v })),
        ...acResult.clients.map(v => ({ kind: 'client'     as const, value: v })),
      ]
    : trendingItems.map(data => ({ kind: 'trending' as const, data }));

  const hasSuggestions = gigItems.length > 0;
  const showSkeleton   = acFetching && !hasSuggestions && query.trim() !== '';
  const showDD         = queryFocused && (hasSuggestions || showSkeleton);

  // ─────────────────────────────────────────────────────────────────────────
  // OUTSIDE CLICK
  // ─────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setQueryFocused(false);
      }
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  useEffect(() => () => {
    if (acTimerRef.current) clearTimeout(acTimerRef.current);
    acAbortRef.current?.abort();
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  // TRENDING  — fetch once, cache 10 min
  // ─────────────────────────────────────────────────────────────────────────

  const fetchTrending = useCallback(async () => {
    if (trendingReady) return;
    const cached = cacheGet<TrendingGigItem[]>('__gig_trending__', 10 * 60_000);
    if (cached) { setTrendingItems(cached); setTrendingReady(true); return; }
    try {
      const res = await fetch(`${API_BASE}/api/freelancex/gigs/trending`);
      if (res.ok) {
        const data: TrendingGigItem[] = await res.json();
        setTrendingItems(data);
        cacheSet('__gig_trending__', data);
      }
    } catch (_) { /* silent */ }
    setTrendingReady(true);
  }, [trendingReady]);

  // ─────────────────────────────────────────────────────────────────────────
  // AUTOCOMPLETE  (debounce 180 ms, instant cache hit)
  // ─────────────────────────────────────────────────────────────────────────

  const scheduleAutocomplete = useCallback((q: string) => {
    if (acTimerRef.current) clearTimeout(acTimerRef.current);
    acAbortRef.current?.abort();

    if (!q) {
      setAcResult({ titles: [], skills: [], clients: [] });
      setAcFetching(false);
      return;
    }

    // Instant cache hit
    const ck = `gig_ac:${q.toLowerCase()}`;
    const hit = cacheGet<GigAutocompleteResult>(ck, 5 * 60_000);
    if (hit) { setAcResult(hit); setAcFetching(false); return; }

    // Debounce
    acTimerRef.current = setTimeout(async () => {
      const hit2 = cacheGet<GigAutocompleteResult>(ck, 5 * 60_000);
      if (hit2) { setAcResult(hit2); setAcFetching(false); return; }

      const ctrl = new AbortController();
      acAbortRef.current = ctrl;
      setAcFetching(true);

      try {
        const res = await fetch(
          `${API_BASE}/api/freelancex/gigs/autocomplete?q=${encodeURIComponent(q)}`,
          { signal: ctrl.signal }
        );
        if (!res.ok) throw new Error('ac');
        const data: GigAutocompleteResult = await res.json();
        cacheSet(ck, data);
        setAcResult(data);
      } catch (e: any) {
        if (e.name === 'AbortError') return;
      } finally {
        setAcFetching(false);
      }
    }, 180);
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  // HANDLERS
  // ─────────────────────────────────────────────────────────────────────────

  const handleFocus = () => {
    setQueryFocused(true);
    setActiveIdx(-1);
    typedRef.current = query;
    if (!query.trim()) fetchTrending();
  };

  const handleChange = (v: string) => {
    onQueryChange(v);
    typedRef.current = v;
    setActiveIdx(-1);
    if (v.trim()) {
      scheduleAutocomplete(v.trim());
    } else {
      setAcResult({ titles: [], skills: [], clients: [] });
      setAcFetching(false);
      fetchTrending();
    }
  };

  const selectItem = useCallback((item: GigItem) => {
    const val = item.kind === 'trending' ? item.data.label : item.value;
    onQueryChange(val);
    typedRef.current = val;
    setQueryFocused(false);
    setActiveIdx(-1);
  }, [onQueryChange]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      if (!showDD) return;
      e.preventDefault();
      setActiveIdx(i => (i < gigItems.length - 1 ? i + 1 : i));
    } else if (e.key === 'ArrowUp') {
      if (!showDD) return;
      e.preventDefault();
      setActiveIdx(i => (i > -1 ? i - 1 : -1));
    } else if (e.key === 'Enter') {
      if (showDD && activeIdx >= 0) {
        selectItem(gigItems[activeIdx]);
      } else {
        setQueryFocused(false);
        onSearch();
      }
    } else if (e.key === 'Escape') {
      setQueryFocused(false);
    }
  };

  useEffect(() => {
    if (!queryFocused) setActiveIdx(-1);
  }, [queryFocused]);

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────

  return (
    // ⚠️  IMPORTANT: the wrapper must NOT have overflow:hidden on any ancestor
    //    for the dropdown to overlay content below. `overflow-visible` is set
    //    explicitly here; ensure parent containers do the same.
    <div ref={containerRef} className="relative w-full max-w-3xl mx-auto select-none my-7" style={{ overflow: 'visible' }}>
      {/* ── Pill ──────────────────────────────────────────────────────────── */}
      <motion.div
        animate={{
          borderColor: queryFocused ? 'rgba(99,102,241,0.55)' : 'rgba(255,255,255,0.12)',
          boxShadow: queryFocused
            ? '0 0 0 3px rgba(99,102,241,0.10), 0 8px 32px rgba(0,0,0,0.4)'
            : '0 4px 24px rgba(0,0,0,0.3)',
        }}
        transition={{ duration: 0.2 }}
        className="relative flex flex-col sm:flex-row items-stretch p-1.5 rounded-2xl"
        style={{
          background: 'rgba(255,255,255,0.045)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.12)',
        }}
      >
        {/* Radial glow on focus */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{
            background: 'radial-gradient(ellipse at 30% 0%, rgba(99,102,241,0.07) 0%, transparent 60%)',
            opacity: queryFocused ? 1 : 0,
          }}
        />

        {/* ── Query input ──────────────────────────────────────────────── */}
        <div className="relative flex items-center gap-3 flex-1 min-w-0 px-4">
          <motion.div animate={{ color: queryFocused ? '#818cf8' : '#475569' }} transition={{ duration: 0.2 }}>
            <Search className="w-4 h-4 shrink-0" strokeWidth={2} />
          </motion.div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            placeholder="Search gigs by title, skill, or keyword..."
            autoComplete="off"
            spellCheck={false}
            className="bg-transparent outline-none text-white w-full placeholder:text-slate-600 text-sm py-3.5 font-medium tracking-wide"
            onFocus={handleFocus}
            onChange={e => handleChange(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <AnimatePresence>
            {query && (
              <motion.button
                initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }} transition={{ duration: 0.1 }}
                onClick={() => {
                  handleChange('');
                  inputRef.current?.focus();
                  setQueryFocused(false);
                  onQueryClear?.();
                }}
                className="text-slate-600 hover:text-slate-400 transition-colors shrink-0"
              >
                <X className="w-3.5 h-3.5" strokeWidth={2.5} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* ── Search button ────────────────────────────────────────────── */}
        <div className="px-1.5 py-1.5 flex items-center shrink-0 w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }}
            onClick={() => { setQueryFocused(false); onSearch(); }}
            className="flex items-center justify-center gap-2 text-white font-black px-6 py-3.5 rounded-xl text-xs uppercase tracking-widest w-full sm:w-auto"
            style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' }}
          >
            <Search className="w-3.5 h-3.5" strokeWidth={2.5} />
            Find Gigs
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
          </motion.button>
        </div>
      </motion.div>

      {/* ── Dropdown ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showDD && (
          <motion.div
            key="gig-dd"
            variants={ddVariants}
            initial="hidden" animate="visible" exit="exit"
            className="absolute top-[calc(100%+8px)] left-0 right-0 rounded-2xl"
            style={{
              // Use a very high z-index so it floats above all sibling/parent content.
              // Do NOT use a Tailwind z-* class here — z-100 is non-standard and
              // ignored by most Tailwind configs without explicit customisation.
              zIndex: 9999,
              background: 'rgba(9,14,31,0.98)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.04)',
              backdropFilter: 'blur(24px)',
            }}
          >
            <SectionLabel
              icon={query.trim() ? Zap : TrendingUp}
              label={query.trim() ? 'Matching gigs & skills' : 'Trending gigs'}
            />

            {/* Skeleton */}
            {showSkeleton && (
              <div className="px-4 py-2 space-y-1">
                {[80, 65, 50].map((w, i) => (
                  <div key={i} className="flex items-center gap-3 py-2">
                    <div className="w-8 h-8 rounded-lg shrink-0 animate-pulse" style={{ background: 'rgba(255,255,255,0.06)' }} />
                    <div className="h-3 rounded animate-pulse" style={{ background: 'rgba(255,255,255,0.07)', width: `${w}%` }} />
                  </div>
                ))}
              </div>
            )}

            {/* Results — no max-height cap here; let content breathe.
                Add overflow-y-auto + a generous max-h only when you have
                many items and want internal scrolling rather than page growth. */}
            <div className="overflow-y-auto" style={{ maxHeight: '250px' }}>
              {gigItems.map((item, idx) => {
                const active = idx === activeIdx;
                const prev   = gigItems[idx - 1]?.kind;

                return (
                  <div key={`${item.kind}-${idx}`}>
                    {/* Section dividers */}
                    {item.kind === 'skill' && prev !== 'skill' && prev !== undefined && (
                      <><div className="mx-4 my-1 h-px bg-white/[0.05]" /><SectionLabel icon={Zap} label="Skills" /></>
                    )}
                    {item.kind === 'client' && prev !== 'client' && prev !== undefined && (
                      <><div className="mx-4 my-1 h-px bg-white/[0.05]" /><SectionLabel icon={DollarSign} label="Clients" /></>
                    )}

                    <button
                      onClick={() => selectItem(item)}
                      onMouseEnter={() => setActiveIdx(idx)}
                      onMouseLeave={() => setActiveIdx(-1)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left group"
                      style={{ background: active ? 'rgba(255,255,255,0.055)' : 'transparent', transition: 'background 60ms' }}
                    >
                      {/* Icon */}
                      {item.kind === 'trending' ? (() => {
                        const Icon = TAG_ICONS[item.data.tag] ?? TrendingUp;
                        const s = TAG_STYLES[item.data.tag];
                        return (
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                            style={{ background: active ? 'rgba(99,102,241,0.12)' : 'rgba(255,255,255,0.04)' }}>
                            <Icon className="w-3.5 h-3.5" strokeWidth={2} style={{ color: active ? s.text : '#64748b' }} />
                          </div>
                        );
                      })() : item.kind === 'skill' ? (
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: active ? 'rgba(167,139,250,0.15)' : 'rgba(167,139,250,0.07)' }}>
                          <Zap className="w-3.5 h-3.5" strokeWidth={2} style={{ color: active ? SKILL_COLOR : '#475569' }} />
                        </div>
                      ) : item.kind === 'client' ? (
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: active ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.07)' }}>
                          <Star className="w-3.5 h-3.5 text-indigo-400" strokeWidth={2} />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: 'rgba(255,255,255,0.03)' }}>
                          <Briefcase className="w-3.5 h-3.5 text-slate-600" strokeWidth={2} />
                        </div>
                      )}

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-slate-200 truncate leading-snug">
                          {item.kind === 'trending'
                            ? item.data.label
                            : <Highlight text={item.value} query={query} />}
                        </p>
                      </div>

                      {/* Tag */}
                      {item.kind === 'trending' && TAG_STYLES[item.data.tag] && (
                        <span
                          className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0"
                          style={{
                            color:      TAG_STYLES[item.data.tag].text,
                            background: TAG_STYLES[item.data.tag].bg,
                            border:     `1px solid ${TAG_STYLES[item.data.tag].border}`,
                          }}
                        >
                          {item.data.tag}
                        </span>
                      )}

                      {/* Arrow on hover/keyboard */}
                      <AnimatePresence>
                        {active && (
                          <motion.div
                            initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -4 }} transition={{ duration: 0.08 }}
                          >
                            <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" strokeWidth={2} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="h-2" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}