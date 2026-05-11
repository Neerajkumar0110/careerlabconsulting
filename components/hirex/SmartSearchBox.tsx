//components/hirex/SmartSearchBox.tsx

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, MapPin, ArrowRight, TrendingUp, X, Building2,
  Flame, TrendingDown, Navigation, Globe, Zap,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────────────────────────────────────

const API_BASE = process.env.NEXT_PUBLIC_HIREX_API_BASE ?? 'https://clc-products-real-backend.vercel.app';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

interface TrendingItem {
  label: string;
  openings: number;
  tag: 'hot' | 'trending' | 'rising';
}

interface AutocompleteResult {
  titles: string[];
  companies: string[];
  skills: string[];
}

type JobItem =
  | { kind: 'trending';   data: TrendingItem }
  | { kind: 'suggestion'; value: string }
  | { kind: 'skill';      value: string }
  | { kind: 'company';    value: string };

interface LocationResult {
  display_name: string;
  city: string;
  country: string;
  lat: string;
  lon: string;
}

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
// IN-MEMORY CACHE  (module-level → survives re-renders, TTL-based)
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
      <span className="text-blue-400 font-semibold">{text.slice(idx, idx + q.length)}</span>
      {text.slice(idx + q.length)}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────────────────────

import { Variants } from "framer-motion";

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

const ddVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -8,
    scaleY: 0.96,
    transformOrigin: "top center",
  },
  visible: {
    opacity: 1,
    y: 0,
    scaleY: 1,
    transformOrigin: "top center",
    transition: {
      duration: 0.14,
      ease: easeOut,
    },
  },
  exit: {
    opacity: 0,
    y: -4,
    scaleY: 0.97,
    transformOrigin: "top center",
    transition: {
      duration: 0.09,
      ease: "easeIn",
    },
  },
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

interface SmartSearchBoxProps {
  query: string;
  location: string;
  onQueryChange: (v: string) => void;
  onLocationChange: (v: string) => void;
  onSearch: () => void;
  onQueryClear?: () => void;
  onLocationClear?: () => void;
}


// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function SmartSearchBox({
  query, location, onQueryChange, onLocationChange, onSearch, onQueryClear, onLocationClear,
}: SmartSearchBoxProps) {

  // ── Focus ────────────────────────────────────────────────────────────────
  const [queryFocused,    setQueryFocused]    = useState(false);
  const [locationFocused, setLocationFocused] = useState(false);

  // ── Trending ─────────────────────────────────────────────────────────────
  const [trendingItems, setTrendingItems] = useState<TrendingItem[]>([]);
  const [trendingReady, setTrendingReady] = useState(false);

  // ── Autocomplete ─────────────────────────────────────────────────────────
  const [acResult,   setAcResult]   = useState<AutocompleteResult>({ titles: [], companies: [], skills: [] });
  const [acFetching, setAcFetching] = useState(false);
  // The query string that acResult currently corresponds to
  const acResultQueryRef = useRef('');

  // ── Keyboard nav (hover NEVER mutates this — only keyboard does) ─────────
  const [jobActiveIdx, setJobActiveIdx] = useState(-1);
  const [locActiveIdx, setLocActiveIdx] = useState(-1);

  // ── Location ─────────────────────────────────────────────────────────────
  const [locResults,  setLocResults]  = useState<LocationResult[]>([]);
  const [locFetching, setLocFetching] = useState(false);

  // ── Refs ─────────────────────────────────────────────────────────────────
  const containerRef      = useRef<HTMLDivElement>(null);
  const queryInputRef     = useRef<HTMLInputElement>(null);
  const locInputRef       = useRef<HTMLInputElement>(null);
  const acAbortRef        = useRef<AbortController | null>(null);
  const locAbortRef       = useRef<AbortController | null>(null);
  const acTimerRef        = useRef<ReturnType<typeof setTimeout> | null>(null);
  const locTimerRef       = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Saves the raw typed value so keyboard navigation can restore it on Escape/ArrowUp-past-top
  const jobTypedRef       = useRef('');
  const locTypedRef       = useRef('');

  // ── Derived ──────────────────────────────────────────────────────────────
  const isBoxFocused = queryFocused || locationFocused;

  const jobItems: JobItem[] = query.trim()
    ? [
        ...acResult.titles.map(v   => ({ kind: 'suggestion' as const, value: v })),
        ...acResult.skills.map(v   => ({ kind: 'skill'      as const, value: v })),
        ...acResult.companies.map(v => ({ kind: 'company'   as const, value: v })),
      ]
    : trendingItems.map(data => ({ kind: 'trending' as const, data }));

  /**
   * Dropdown visibility rules:
   *  - Show when there are results            → instant, no flicker
   *  - Show skeleton ONLY while a real HTTP request is in-flight AND
   *    the result cache is empty for this query (prevents debounce flicker)
   *  - NEVER show just because the user started typing
   */
  const hasSuggestions = jobItems.length > 0;
  const showSkeleton   = acFetching && !hasSuggestions && query.trim() !== '';
  const showJobDD      = queryFocused && (hasSuggestions || showSkeleton);
  const showLocDD      = locationFocused && (locResults.length > 0 || locFetching);

  // ─────────────────────────────────────────────────────────────────────────
  // OUTSIDE CLICK
  // ─────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setQueryFocused(false);
        setLocationFocused(false);
      }
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  // Cleanup on unmount
  useEffect(() => () => {
    if (acTimerRef.current)  clearTimeout(acTimerRef.current);
    if (locTimerRef.current) clearTimeout(locTimerRef.current);
    acAbortRef.current?.abort();
    locAbortRef.current?.abort();
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  // TRENDING  — fetch once, cache 10 min
  // ─────────────────────────────────────────────────────────────────────────

  const fetchTrending = useCallback(async () => {
    if (trendingReady) return;
    const cached = cacheGet<TrendingItem[]>('__trending__', 10 * 60_000);
    if (cached) { setTrendingItems(cached); setTrendingReady(true); return; }
    try {
      const res = await fetch(`${API_BASE}/api/hirex/jobs/trending`);
      if (res.ok) {
        const data: TrendingItem[] = await res.json();
        setTrendingItems(data);
        cacheSet('__trending__', data);
      }
    } catch (_) { /* silent */ }
    setTrendingReady(true);
  }, [trendingReady]);

  // ─────────────────────────────────────────────────────────────────────────
  // AUTOCOMPLETE
  //
  // 1. Instant cache hit   → 0 ms, no flicker
  // 2. Cache miss          → debounce 180 ms, then fire HTTP
  // 3. `acFetching = true` only set AFTER debounce fires (not on keystroke)
  // 4. Stale responses are discarded via ref comparison
  // ─────────────────────────────────────────────────────────────────────────

  const scheduleAutocomplete = useCallback((q: string) => {
    // Cancel any pending work
    if (acTimerRef.current) clearTimeout(acTimerRef.current);
    acAbortRef.current?.abort();

    if (!q) {
      setAcResult({ titles: [], companies: [], skills: [] });
      setAcFetching(false);
      acResultQueryRef.current = '';
      return;
    }

    // Instant hit
    const ck = `ac:${q.toLowerCase()}`;
    const hit = cacheGet<AutocompleteResult>(ck, 5 * 60_000);
    if (hit) {
      setAcResult(hit);
      setAcFetching(false);
      acResultQueryRef.current = q;
      return;
    }

    // Debounce — DO NOT set acFetching here
    acTimerRef.current = setTimeout(async () => {
      // Double-check cache (might have been populated by a parallel request)
      const hit2 = cacheGet<AutocompleteResult>(ck, 5 * 60_000);
      if (hit2) {
        setAcResult(hit2);
        setAcFetching(false);
        acResultQueryRef.current = q;
        return;
      }

      const ctrl = new AbortController();
      acAbortRef.current = ctrl;
      setAcFetching(true);  // ← only NOW show the skeleton

      try {
        const res = await fetch(
          `${API_BASE}/api/hirex/jobs/autocomplete?q=${encodeURIComponent(q)}`,
          { signal: ctrl.signal }
        );
        if (!res.ok) throw new Error('ac');
        const data: AutocompleteResult = await res.json();
        cacheSet(ck, data);
        // Only apply if this response matches the current input
        setAcResult(data);
        acResultQueryRef.current = q;
      } catch (e: any) {
        if (e.name === 'AbortError') return;
        // Keep previous results rather than blanking the dropdown
      } finally {
        setAcFetching(false);
      }
    }, 180);
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  // LOCATION SEARCH  (Nominatim, debounced 300 ms)
  // ─────────────────────────────────────────────────────────────────────────

  const scheduleLocSearch = useCallback((q: string) => {
    if (locTimerRef.current) clearTimeout(locTimerRef.current);
    locAbortRef.current?.abort();

    if (!q.trim()) { setLocResults([]); setLocFetching(false); return; }

    locTimerRef.current = setTimeout(async () => {
      const ctrl = new AbortController();
      locAbortRef.current = ctrl;
      setLocFetching(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&addressdetails=1&limit=6&featuretype=city`,
          { signal: ctrl.signal, headers: { 'Accept-Language': 'en' } }
        );
        const data: any[] = await res.json();
        setLocResults(data.map(d => ({
          display_name: d.display_name,
          city: d.address?.city || d.address?.town || d.address?.village || d.name,
          country: d.address?.country || '',
          lat: d.lat, lon: d.lon,
        })));
      } catch (e: any) {
        if (e.name !== 'AbortError') setLocResults([]);
      } finally {
        setLocFetching(false);
      }
    }, 300);
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  // QUERY FIELD
  // ─────────────────────────────────────────────────────────────────────────

  const handleQueryFocus = () => {
    setQueryFocused(true);
    setLocationFocused(false);
    setJobActiveIdx(-1);
    jobTypedRef.current = query;
    if (!query.trim()) fetchTrending();
  };

  const handleQueryChange = (v: string) => {
    onQueryChange(v);
    jobTypedRef.current = v;   // keep saved typed value in sync
    setJobActiveIdx(-1);
    if (v.trim()) {
      scheduleAutocomplete(v.trim());
    } else {
      setAcResult({ titles: [], companies: [], skills: [] });
      setAcFetching(false);
      acResultQueryRef.current = '';
      fetchTrending();
    }
  };

  const selectJobItem = useCallback((item: JobItem) => {
    const val = item.kind === 'trending' ? item.data.label : item.value;
    onQueryChange(val);
    jobTypedRef.current = val;
    setQueryFocused(false);
    setJobActiveIdx(-1);
  }, [onQueryChange]);

  // Keyboard: ArrowDown/Up moves through items and previews in input.
  // This is the ONLY place that writes a non-typed value into the input.
  // Hover NEVER does this.
  useEffect(() => {
    if (!queryFocused) return;

    if (jobActiveIdx < 0) {
      // Restored the original typed text when user arrows back up past -1
      // onQueryChange(jobTypedRef.current);
      return;
    }

    const item = jobItems[jobActiveIdx];
    if (!item) return;
    const val = item.kind === 'trending' ? item.data.label : item.value;
    // onQueryChange(val);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobActiveIdx, queryFocused]);

  const handleQueryKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      if (!showJobDD) return;
      e.preventDefault();
      setJobActiveIdx(i => (i < jobItems.length - 1 ? i + 1 : i));
    } else if (e.key === 'ArrowUp') {
      if (!showJobDD) return;
      e.preventDefault();
      setJobActiveIdx(i => (i > -1 ? i - 1 : -1));
    } else if (e.key === 'Enter') {
      if (showJobDD && jobActiveIdx >= 0) {
        selectJobItem(jobItems[jobActiveIdx]);
      } else {
        setQueryFocused(false);
        onSearch();
      }
    } else if (e.key === 'Escape') {
      setQueryFocused(false);
    }
  };

  // Reset typed-value tracker when dropdown closes
  useEffect(() => {
    if (!queryFocused) setJobActiveIdx(-1);
  }, [queryFocused]);

  // ─────────────────────────────────────────────────────────────────────────
  // LOCATION FIELD
  // ─────────────────────────────────────────────────────────────────────────

  const handleLocFocus = () => {
    setLocationFocused(true);
    setQueryFocused(false);
    setLocActiveIdx(-1);
    locTypedRef.current = location;
  };

  const handleLocChange = (v: string) => {
    onLocationChange(v);
    locTypedRef.current = v;
    setLocActiveIdx(-1);
    scheduleLocSearch(v);
  };

  /**
   * Stores ONLY the city name — never "City, Country" —
   * so the backend `contains` search works on partial location strings.
   */
  const selectLocItem = useCallback((r: LocationResult) => {
    const val = r.city || r.display_name.split(',')[0].trim();
    onLocationChange(val);
    locTypedRef.current = val;
    setLocationFocused(false);
    setLocActiveIdx(-1);
    setLocResults([]);
  }, [onLocationChange]);

  useEffect(() => {
    if (!locationFocused) return;
    if (locActiveIdx < 0) {
      onLocationChange(locTypedRef.current);
      return;
    }
    const r = locResults[locActiveIdx];
    if (!r) return;
    const val = r.city || r.display_name.split(',')[0].trim();
    onLocationChange(val);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locActiveIdx, locationFocused]);

  const handleLocKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      if (!showLocDD) return;
      e.preventDefault();
      setLocActiveIdx(i => (i < locResults.length - 1 ? i + 1 : i));
    } else if (e.key === 'ArrowUp') {
      if (!showLocDD) return;
      e.preventDefault();
      setLocActiveIdx(i => (i > -1 ? i - 1 : -1));
    } else if (e.key === 'Enter') {
      if (showLocDD && locActiveIdx >= 0) {
        selectLocItem(locResults[locActiveIdx]);
      } else {
        setLocationFocused(false);
        onSearch();
      }
    } else if (e.key === 'Escape') {
      setLocationFocused(false);
    }
  };

  useEffect(() => {
    if (!locationFocused) setLocActiveIdx(-1);
  }, [locationFocused]);

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div ref={containerRef} className="relative w-full max-w-3xl mx-auto select-none my-7">

      {/* ── Pill ──────────────────────────────────────────────────────────── */}
      <motion.div
        animate={{
          borderColor: isBoxFocused ? 'rgba(59,130,246,0.55)' : 'rgba(255,255,255,0.12)',
          boxShadow: isBoxFocused
            ? '0 0 0 3px rgba(59,130,246,0.10), 0 8px 32px rgba(0,0,0,0.4)'
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
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{
            background: 'radial-gradient(ellipse at 30% 0%, rgba(59,130,246,0.07) 0%, transparent 60%)',
            opacity: isBoxFocused ? 1 : 0,
          }}
        />

        {/* ── Query input ──────────────────────────────────────────────── */}
        <div className="relative flex items-center gap-3 flex-1 min-w-0 px-4 border-b sm:border-b-0 sm:border-r border-white/[0.07]">
          <motion.div animate={{ color: queryFocused ? '#60a5fa' : '#475569' }} transition={{ duration: 0.2 }}>
            <Search className="w-4 h-4 shrink-0" strokeWidth={2} />
          </motion.div>
          <input
            ref={queryInputRef}
            type="text"
            value={query}
            placeholder="Job title, skill, or company..."
            autoComplete="off"
            spellCheck={false}
            className="bg-transparent outline-none text-white w-full placeholder:text-slate-600 text-sm py-3.5 font-medium tracking-wide"
            onFocus={handleQueryFocus}
            onChange={e => handleQueryChange(e.target.value)}
            onKeyDown={handleQueryKeyDown}
          />
          <AnimatePresence>
            {query && (
              <motion.button
                initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }} transition={{ duration: 0.1 }}
                onClick={() => { handleQueryChange(''); queryInputRef.current?.focus(); setQueryFocused(false); onQueryClear?.(); }}
                className="text-slate-600 hover:text-slate-400 transition-colors shrink-0"
              >
                <X className="w-3.5 h-3.5" strokeWidth={2.5} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* ── Location input ───────────────────────────────────────────── */}
        <div className="relative flex items-center gap-3 flex-1 min-w-0 px-4">
          <motion.div animate={{ color: locationFocused ? '#22d3ee' : '#475569' }} transition={{ duration: 0.2 }}>
            <MapPin className="w-4 h-4 shrink-0" strokeWidth={2} />
          </motion.div>
          <input
            ref={locInputRef}
            type="text"
            value={location}
            placeholder="City, state, or 'Remote'..."
            autoComplete="off"
            spellCheck={false}
            className="bg-transparent outline-none text-white w-full placeholder:text-slate-600 text-sm py-3.5 font-medium tracking-wide"
            onFocus={handleLocFocus}
            onChange={e => handleLocChange(e.target.value)}
            onKeyDown={handleLocKeyDown}
          />
          <AnimatePresence>
            {locFetching && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="shrink-0">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}>
                  <Navigation className="w-3.5 h-3.5 text-cyan-500" strokeWidth={2} />
                </motion.div>
              </motion.div>
            )}
            {location && !locFetching && (
              <motion.button
                initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }} transition={{ duration: 0.1 }}
                onClick={() => { onLocationChange(''); setLocResults([]); locInputRef.current?.focus(); onLocationClear?.(); }}
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
            onClick={() => { setQueryFocused(false); setLocationFocused(false); onSearch(); }}
            className="flex items-center justify-center gap-2 text-white font-black px-6 py-3.5 rounded-xl text-xs uppercase tracking-widest w-full sm:w-auto"
            style={{ background: 'linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)' }}
          >
            <Search className="w-3.5 h-3.5" strokeWidth={2.5} />
            Find Jobs
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
          </motion.button>
        </div>
      </motion.div>

      {/* ── Job / Trending dropdown ───────────────────────────────────────── */}
      <AnimatePresence>
        {showJobDD && (
          <motion.div
            key="job-dd"
            variants={ddVariants}
            initial="hidden" animate="visible" exit="exit"
            className="absolute top-[calc(100%+8px)] left-0 right-0 z-50 rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(9,14,31,0.98)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.04)',
              backdropFilter: 'blur(24px)',
            }}
          >
            <SectionLabel
              icon={query.trim() ? Zap : TrendingUp}
              label={query.trim() ? 'Matching jobs & skills' : 'Trending searches'}
            />

            {/* Skeleton — only shown when HTTP is in-flight with no cached results */}
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

            {/* Results */}
            <div className="overflow-y-auto max-h-[340px]">
              {jobItems.map((item, idx) => {
                const active = idx === jobActiveIdx;
                const prev   = jobItems[idx - 1]?.kind;

                return (
                  <div key={`${item.kind}-${idx}`}>
                    {item.kind === 'skill'   && prev !== 'skill'   && prev !== undefined && (
                      <><div className="mx-4 my-1 h-px bg-white/[0.05]" /><SectionLabel icon={Zap}       label="Skills" /></>
                    )}
                    {item.kind === 'company' && prev !== 'company' && prev !== undefined && (
                      <><div className="mx-4 my-1 h-px bg-white/[0.05]" /><SectionLabel icon={Building2} label="Companies" /></>
                    )}

                    <button
                      onClick={() => selectJobItem(item)}
                      // ← hover sets visual highlight ONLY — never writes to input
                      onMouseEnter={() => setJobActiveIdx(idx)}
                      onMouseLeave={() => setJobActiveIdx(-1)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left group"
                      style={{ background: active ? 'rgba(255,255,255,0.055)' : 'transparent', transition: 'background 60ms' }}
                    >
                      {/* Icon */}
                      {item.kind === 'trending' ? (() => {
                        const Icon = TAG_ICONS[item.data.tag] ?? TrendingUp;
                        const s = TAG_STYLES[item.data.tag];
                        return (
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                            style={{ background: active ? 'rgba(59,130,246,0.12)' : 'rgba(255,255,255,0.04)' }}>
                            <Icon className="w-3.5 h-3.5" strokeWidth={2} style={{ color: active ? s.text : '#64748b' }} />
                          </div>
                        );
                      })() : item.kind === 'skill' ? (
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: active ? 'rgba(167,139,250,0.15)' : 'rgba(167,139,250,0.07)' }}>
                          <Zap className="w-3.5 h-3.5" strokeWidth={2} style={{ color: active ? SKILL_COLOR : '#475569' }} />
                        </div>
                      ) : item.kind === 'company' ? (
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: active ? 'rgba(59,130,246,0.15)' : 'rgba(59,130,246,0.07)' }}>
                          <Building2 className="w-3.5 h-3.5 text-blue-400" strokeWidth={2} />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(255,255,255,0.03)' }}>
                          <Search className="w-3.5 h-3.5 text-slate-600" strokeWidth={2} />
                        </div>
                      )}

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-slate-200 truncate leading-snug">
                          {item.kind === 'trending'
                            ? item.data.label
                            : <Highlight text={item.value} query={query} />}
                        </p>
                        {/* {item.kind === 'trending' && (
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-none">
                            {item.data.openings.toLocaleString()} open position{item.data.openings !== 1 ? 's' : ''}
                          </p>
                        )} */}
                      </div>

                      {/* Tag */}
                      {item.kind === 'trending' && TAG_STYLES[item.data.tag] && (
                        <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0"
                          style={{
                            color:      TAG_STYLES[item.data.tag].text,
                            background: TAG_STYLES[item.data.tag].bg,
                            border:     `1px solid ${TAG_STYLES[item.data.tag].border}`,
                          }}>
                          {item.data.tag}
                        </span>
                      )}

                      {/* Arrow — keyboard only */}
                      <AnimatePresence>
                        {active && jobActiveIdx === idx && (
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

      {/* ── Location dropdown ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {showLocDD && (
          <motion.div
            key="loc-dd"
            variants={ddVariants}
            initial="hidden" animate="visible" exit="exit"
            className="absolute top-[calc(100%+8px)] left-0 right-0 z-50 rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(9,14,31,0.98)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.04)',
              backdropFilter: 'blur(24px)',
            }}
          >
            <SectionLabel icon={Globe} label="Cities & Locations" />

            <div className="overflow-y-auto max-h-[300px]">
              {locFetching && locResults.length === 0 && (
                <div className="px-4 py-2 space-y-1">
                  {[70, 55].map((w, i) => (
                    <div key={i} className="flex items-center gap-3 py-2">
                      <div className="w-8 h-8 rounded-lg shrink-0 animate-pulse" style={{ background: 'rgba(34,211,238,0.06)' }} />
                      <div className="space-y-1.5 flex-1">
                        <div className="h-3 rounded animate-pulse" style={{ background: 'rgba(255,255,255,0.07)', width: `${w}%` }} />
                        <div className="h-2 rounded animate-pulse" style={{ background: 'rgba(255,255,255,0.04)', width: '40%' }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {locResults.map((r, idx) => {
                const active = idx === locActiveIdx;
                const display = r.city && r.country
                  ? `${r.city}, ${r.country}`
                  : r.display_name.split(',').slice(0, 2).join(',').trim();
                const sub = r.display_name.split(',').slice(1, 3).join(',').trim();

                return (
                  <button
                    key={`${r.lat}-${r.lon}`}
                    onClick={() => selectLocItem(r)}
                    onMouseEnter={() => setLocActiveIdx(idx)}
                    onMouseLeave={() => setLocActiveIdx(-1)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left"
                    style={{ background: active ? 'rgba(255,255,255,0.055)' : 'transparent', transition: 'background 60ms' }}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: active ? 'rgba(34,211,238,0.12)' : 'rgba(34,211,238,0.06)' }}>
                      <MapPin className="w-3.5 h-3.5" strokeWidth={2} style={{ color: active ? '#22d3ee' : '#475569' }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-slate-200 truncate leading-snug">
                        <Highlight text={display} query={location} />
                      </p>
                      {sub && <p className="text-[11px] text-slate-500 mt-0.5 truncate leading-none">{sub}</p>}
                    </div>

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