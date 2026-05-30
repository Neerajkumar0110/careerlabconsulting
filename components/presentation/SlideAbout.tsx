'use client'

/**
 * SLIDE 2 — About Career Lab Consulting
 * Canvas: 1280 × 720 px. Two-column layout. No scroll.
 */

import { motion } from 'framer-motion'
import {
  Award, Globe, Zap, ShieldCheck, Layers,
  BookOpen, Briefcase, TrendingUp, Link2, Brain, Building2,
} from 'lucide-react'

const T = {
  void:     '#03040A',
  glass:    'rgba(255,255,255,0.030)',
  glassHi:  'rgba(255,255,255,0.055)',
  line:     'rgba(255,255,255,0.055)',
  violet:   '#7C3AED',
  violetLo: 'rgba(124,58,237,0.12)',
  violetB:  'rgba(124,58,237,0.30)',
  violetHi: '#A78BFA',
  mint:     '#10F5A0',
  mintLo:   'rgba(16,245,160,0.08)',
  mintB:    'rgba(16,245,160,0.22)',
  gold:     '#F0A500',
  goldLo:   'rgba(240,165,0,0.10)',
  goldB:    'rgba(240,165,0,0.25)',
  hi:       '#ECEEF8',
  mid:      '#A9AFCA',
  muted:    '#5E6580',
  ghost:    '#2E3348',
  display:  "'Clash Display', 'Syne', sans-serif",
  body:     "'DM Sans', 'Plus Jakarta Sans', sans-serif",
  mono:     "'DM Mono', 'JetBrains Mono', monospace",
}

const ECO = [
  { icon: BookOpen,   title: 'InternX–AI',     tag: 'Core Accelerator',    scheme: 'violet' as const },
  { icon: Briefcase,  title: 'HireX Portal',   tag: 'Exclusive · CLC',     scheme: 'mint'   as const },
  { icon: TrendingUp, title: 'FreelanceX',     tag: 'Earn While Learning', scheme: 'gold'   as const },
  { icon: Link2,      title: 'Verified Career Portfolio',      tag: 'temper-proof portfolio', scheme: 'violet' as const },
  { icon: Brain,      title: 'AigenX Coach',   tag: '24×7 AI Mentor',      scheme: 'mint'   as const },
  { icon: Building2,  title: 'Enterprise SaaS',tag: 'Real Client Work',    scheme: 'gold'   as const },
]

const DIVS = [
  { label: 'AI Learning Programs',   color: '#7C3AED' },
  { label: 'Internship Placements',  color: '#10F5A0' },
  { label: 'Enterprise AI Services', color: '#F0A500' },
  { label: 'SaaS Platforms',         color: '#06B6D4' },
  { label: 'Hiring Infrastructure',  color: '#F43F5E' },
  { label: 'Industry Partnerships',  color: '#8B5CF6' },
]

function Tag({ children, scheme }: { children: React.ReactNode; scheme: 'violet' | 'mint' | 'gold' }) {
  const s = { violet: [T.violetLo, T.violetHi, T.violetB], mint: [T.mintLo, T.mint, T.mintB], gold: [T.goldLo, T.gold, T.goldB] }[scheme]
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      background: s[0], color: s[1], border: `0.5px solid ${s[2]}`,
      fontSize: 9.5, fontWeight: 500, fontFamily: T.mono,
      letterSpacing: '0.06em', padding: '3px 9px', borderRadius: 100, whiteSpace: 'nowrap',
    }}>{children}</span>
  )
}

export default function SlideAbout() {
  return (
    <div style={{
      width: 1280, height: 720,
      background: T.void,
      position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      fontFamily: T.body,
    }}>
      {/* BG */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: `linear-gradient(${T.line} 1px,transparent 1px),linear-gradient(90deg,${T.line} 1px,transparent 1px)`, backgroundSize: '64px 64px', maskImage: 'radial-gradient(ellipse 85% 70% at 50% 50%,black 30%,transparent 100%)' }} />
      <div style={{ position: 'absolute', left: '80%', top: '30%', width: 500, height: 500, background: `radial-gradient(circle,${T.violet} 0%,transparent 70%)`, opacity: 0.06, transform: 'translate(-50%,-50%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', left: '10%', top: '70%', width: 360, height: 360, background: `radial-gradient(circle,${T.mint} 0%,transparent 70%)`, opacity: 0.05, transform: 'translate(-50%,-50%)', pointerEvents: 'none' }} />

      {/* ── Content ── */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, padding: '28px 48px', position: 'relative', zIndex: 2 }}>

        {/* ── LEFT COLUMN ── */}
        <div style={{ paddingRight: 36, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* Header */}
          <div>
            {/* Section label */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, marginBottom: 10 }}>
              <div style={{ width: 16, height: 1, background: T.mint, opacity: 0.7 }} />
              <span style={{ fontFamily: T.mono, fontSize: 9.5, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: T.mint }}>About Career Lab Consulting</span>
              <div style={{ width: 16, height: 1, background: T.mint, opacity: 0.7 }} />
            </div>

            <h2 style={{ fontFamily: T.display, fontSize: 40, fontWeight: 600, lineHeight: 1.06, letterSpacing: '-0.025em', color: T.hi, margin: '0 0 8px' }}>
              India's Premier<br />
              <span style={{ backgroundImage: `linear-gradient(135deg,#7C3AED 0%,#A855F7 35%,#10F5A0 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                AI Career Engine
              </span>
            </h2>

            <div style={{ width: 36, height: 2, background: `linear-gradient(90deg,${T.violet},${T.mint})`, borderRadius: 2, margin: '10px 0 12px' }} />

            <p style={{ fontFamily: T.body, fontSize: 13, lineHeight: 1.75, color: T.mid, fontWeight: 300, marginBottom: 12 }}>
              Career Lab Consulting is an <strong style={{ color: T.hi, fontWeight: 500 }}>ISO 27001 Certified MNC</strong> operating across{' '}
              <strong style={{ color: T.hi, fontWeight: 500 }}>27 countries</strong> since 2019. We manufacture{' '}
              <strong style={{ color: T.hi, fontWeight: 500 }}>verifiable proof-of-work</strong> that global employers trust.
            </p>

            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 12 }}>
              <Tag scheme="violet"><Award size={8} style={{ marginRight: 3 }} />ISO 27001 Certified</Tag>
              <Tag scheme="mint"><Globe size={8} style={{ marginRight: 3 }} />27 Countries</Tag>
              <Tag scheme="gold"><Zap size={8} style={{ marginRight: 3 }} />MNC Since 2019</Tag>
            </div>
          </div>

          {/* Quote */}
          <div style={{ position: 'relative', padding: '14px 18px', borderLeft: `2px solid ${T.violet}`, background: 'linear-gradient(135deg,rgba(124,58,237,0.07) 0%,transparent 100%)', borderRadius: '0 10px 10px 0', marginBottom: 10 }}>
            <div style={{ position: 'absolute', top: 10, left: 18, fontFamily: T.display, fontSize: 44, lineHeight: 1, color: T.violet, opacity: 0.15, userSelect: 'none' }}>"</div>
            <p style={{ fontFamily: T.display, fontSize: 13, fontWeight: 500, lineHeight: 1.55, color: T.mid, margin: '0 0 8px', fontStyle: 'italic', position: 'relative', zIndex: 1 }}>
              If AI can do the work, your proof of work must speak louder than your résumé.
            </p>
            <div style={{ fontFamily: T.mono, fontSize: 10, color: T.violetHi, letterSpacing: '0.08em' }}>— Career Lab Consulting</div>
          </div>

          {/* CIN */}
          <div style={{ padding: '9px 14px', background: T.glass, border: `0.5px solid ${T.line}`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ fontFamily: T.mono, fontSize: 8.5, color: T.muted, letterSpacing: '0.1em', textTransform: 'uppercase' }}>CIN No.</div>
            <div style={{ fontFamily: T.mono, fontSize: 10, color: T.mint, letterSpacing: '0.07em' }}>U80903HR2019PTC084310</div>
            <ShieldCheck size={12} color={T.mint} />
          </div>

          {/* Business Divisions */}
          <div style={{ background: T.glass, border: `0.5px solid ${T.line}`, borderRadius: 12, padding: '12px 16px', marginTop: 8 }}>
            <div style={{ fontFamily: T.display, fontSize: 11, fontWeight: 600, color: T.hi, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Layers size={11} color={T.mint} /> Complete Business Ecosystem
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
              {DIVS.map(d => (
                <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: T.body, fontSize: 11, color: T.mid }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: d.color, flexShrink: 0, boxShadow: `0 0 4px ${d.color}` }} />
                  {d.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div style={{ paddingLeft: 36, borderLeft: `0.5px solid ${T.line}`, display: 'flex', flexDirection: 'column', gap: 8, justifyContent: 'space-between' }}>
          {/* Eco grid — 3 × 2 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {ECO.map((b, i) => {
              const Icon = b.icon
              const scheme = b.scheme
              const accent = scheme === 'violet' ? T.violet : scheme === 'mint' ? T.mint : T.gold
              const accentLo = scheme === 'violet' ? T.violetLo : scheme === 'mint' ? T.mintLo : T.goldLo
              const accentB = scheme === 'violet' ? T.violetB : scheme === 'mint' ? T.mintB : T.goldB
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.45 }}
                  style={{
                    background: T.glass, border: `0.5px solid ${T.line}`,
                    minHeight: 120,
                    borderRadius: 12, padding: '12px 14px', position: 'relative', overflow: 'hidden',
                  }}
                >
                  <div style={{ position: 'absolute', bottom: -10, right: -10, width: 55, height: 55, background: `radial-gradient(circle,${accent} 0%,transparent 70%)`, opacity: 0.12, pointerEvents: 'none' }} />
                  <div style={{ width: 28, height: 28, borderRadius: 7, background: accentLo, border: `0.5px solid ${accentB}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                    <Icon size={14} color={accent} />
                  </div>
                  <div style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: '0.10em', textTransform: 'uppercase', color: accent, opacity: 0.85, marginBottom: 8 }}>{b.tag}</div>
                  <div style={{ fontFamily: T.display, fontSize: 18, fontWeight: 600, color: T.hi }}>{b.title}</div>
                </motion.div>
              )
            })}
          </div>
            
          {/* Stats strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
            {[['15K+', 'Students'], ['88%', 'Hired'], ['27', 'Countries']].map(([n, l]) => (
              <div key={l} style={{ background: T.glass, border: `0.5px solid ${T.line}`, borderRadius: 10, padding: '12px', textAlign: 'center' }}>
                <div style={{ fontFamily: T.display, fontSize: 26, fontWeight: 600, color: T.hi, letterSpacing: '-0.02em', lineHeight: 1 }}>{n}</div>
                <div style={{ fontFamily: T.mono, fontSize: 8.5, color: T.muted, letterSpacing: '0.10em', textTransform: 'uppercase', marginTop: 3 }}>{l}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}