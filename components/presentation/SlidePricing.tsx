'use client'

/**
 * SLIDE 7 — Pricing & Plans
 * Canvas: 1280 × 720 px. No scroll.
 */

import { motion } from 'framer-motion'
import { Check, Shield, Sparkles, ArrowRight, Building2, Target } from 'lucide-react'

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
  cyan:     '#06B6D4',
  cyanLo:   'rgba(6,182,212,0.10)',
  cyanB:    'rgba(6,182,212,0.25)',
  hi:       '#ECEEF8',
  mid:      '#A9AFCA',
  muted:    '#5E6580',
  display:  "'Clash Display', 'Syne', sans-serif",
  body:     "'DM Sans', 'Plus Jakarta Sans', sans-serif",
  mono:     "'DM Mono', 'JetBrains Mono', monospace",
}

const PLANS = [
  {
    name: 'Accelerator',
    price: '₹1,00,000',
    usd: '~$1200',
    emi: '₹10,000 / month',
    tag: 'Most Popular',
    featured: false,
    accent: T.violet,
    accentLo: T.violetLo,
    accentB: T.violetB,
    accentHi: T.violetHi,
    ctcTarget: '₹15–20 LPA',
    desc: 'Build a strong AI portfolio, gain placement support, and accelerate your journey into high-paying tech roles.',
    features: [
      '6-Month Program + Extensions',
      '2 Real Agentic AI Projects',
      'Hosted GitHub Portfolio',
      'Verified Career Portfolio + LinkedIn Sync',
      'Monthly 1:1 Mentorship',
      'HireX Entry Listings',
      '1 AI Mock Interview',
      'FreelanceX Access — EMI Coverage',
    ]
  },
  {
    name: 'Elite',
    price: '₹2,00,000',
    usd: '~$2,100',
    emi: '₹20,000 / month',
    tag: 'Job Guaranteed',
    featured: true,
    accent: T.gold,
    accentLo: T.goldLo,
    accentB: T.goldB,
    accentHi: T.gold,
    ctcTarget: '₹30–50+ LPA',
    desc: 'Legal placement guarantee, enterprise projects, international opportunities, and weekly expert mentoring.',
    features: [
      'Full 12-Month Advanced Program',
      '3 Real AI Projects + Enterprise Capstone',
      'Premium GitHub Showcase',
      'Verified Career Portfolio + CTC Ladder',
      'Weekly 1:1 Expert Mentoring',
      'HireX Priority Shortlisting',
      '3 AI Mock Interviews + Feedback',
      'Legal Job Agreement — Signed',
      'Fixed Date of Joining in Offer Letter',
      'International Placement (Germany, UAE, SG)',
    ]
  },
]

const FINANCE = ['ICICI Bank', 'HDFC Bank', 'Axis Bank', 'Bajaj Finance', 'IDFC First', 'Kotak', 'SBI']

const LEGAL_POINTS = [
  'Signed legal agreement with Career Lab Consulting',
  'Fixed date of joining guaranteed in offer letter',
  'Full fee refund if conditions met and not placed',
  'Eligibility: 90% attendance + 90% assessment score',
]

function Tag({ children, accent, accentLo, accentB }: {
  children: React.ReactNode; accent: string; accentLo: string; accentB: string
}) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      background: accentLo, color: accent, border: `0.5px solid ${accentB}`,
      fontSize: 9.5, fontWeight: 500, fontFamily: T.mono,
      letterSpacing: '0.06em', padding: '3px 9px', borderRadius: 100, whiteSpace: 'nowrap',
    }}>{children}</span>
  )
}

export default function SlidePricing() {
  return (
    <div style={{
      width: 1280, height: 720,
      background: T.void,
      position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      fontFamily: T.body,
    }}>
      {/* BG */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: `linear-gradient(${T.line} 1px,transparent 1px),linear-gradient(90deg,${T.line} 1px,transparent 1px)`, backgroundSize: '64px 64px', maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%,black 30%,transparent 100%)' }} />
      <div style={{ position: 'absolute', left: '80%', top: '30%', width: 480, height: 480, background: `radial-gradient(circle,${T.gold} 0%,transparent 70%)`, opacity: 0.07, transform: 'translate(-50%,-50%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', left: '10%', top: '70%', width: 400, height: 400, background: `radial-gradient(circle,${T.violet} 0%,transparent 70%)`, opacity: 0.06, transform: 'translate(-50%,-50%)', pointerEvents: 'none' }} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '22px 48px 18px', position: 'relative', zIndex: 2 }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
              <div style={{ width: 16, height: 1, background: T.mint, opacity: 0.7 }} />
              <span style={{ fontFamily: T.mono, fontSize: 9.5, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: T.mint }}>Pricing &amp; Plans</span>
              <div style={{ width: 16, height: 1, background: T.mint, opacity: 0.7 }} />
            </div>
            <h2 style={{ fontFamily: T.display, fontSize: 32, fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.025em', color: T.hi, margin: '0 0 6px' }}>
              Zero-Risk Investment.{' '}
              <span style={{ backgroundImage: `linear-gradient(135deg,#7C3AED 0%,#A855F7 35%,#10F5A0 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Lifetime Returns.
              </span>
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
            <Tag accent={T.mint} accentLo={T.mintLo} accentB={T.mintB}>0% Interest EMI</Tag>
            <Tag accent={T.gold} accentLo={T.goldLo} accentB={T.goldB}>Job Guarantee Available</Tag>
            <Tag accent={T.violet} accentLo={T.violetLo} accentB={T.violetB}>Lifetime HireX + FreelanceX</Tag>
          </div>
        </div>

        {/* Main content — 3 columns: plan + plan + info */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 300px', gap: 12, flex: 1 }}>

          {/* ── Plan cards ── */}
          {PLANS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative', borderRadius: 18, overflow: 'hidden',
                background: p.featured
                  ? `linear-gradient(160deg,${T.goldLo} 0%,rgba(255,255,255,0.04) 50%,${T.violetLo} 100%)`
                  : `linear-gradient(180deg,${T.violetLo} 0%,rgba(255,255,255,0.02) 100%)`,
                border: p.featured ? `1px solid ${T.gold}55` : `1px solid ${T.violet}35`,
                padding: '18px 20px',
                display: 'flex', flexDirection: 'column',
              }}
            >
              {/* Glow */}
              {p.featured && <div style={{ position: 'absolute', top: -30, right: -30, width: 130, height: 130, background: `radial-gradient(${T.gold}40,transparent 70%)`, pointerEvents: 'none' }} />}

              {/* Tag */}
              <div style={{ marginBottom: 10 }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  background: p.featured ? T.goldLo : T.violetLo,
                  border: `0.5px solid ${p.featured ? T.goldB : T.violetB}`,
                  color: p.featured ? T.gold : T.violetHi,
                  fontFamily: T.mono, fontSize: 9, letterSpacing: '0.10em',
                  textTransform: 'uppercase', padding: '3px 9px', borderRadius: 100,
                }}>
                  {p.featured ? <Shield size={8} /> : <Sparkles size={8} />}
                  {p.tag}
                </span>
              </div>

              {/* Name + CTC */}
              <div style={{ fontFamily: T.display, fontSize: 18, fontWeight: 600, color: T.hi, marginBottom: 3 }}>{p.name}</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: 6, fontFamily: T.mono, fontSize: 9.5, color: p.accent }}>
                <Target size={9} />Target CTC: {p.ctcTarget}
              </div>
              <div style={{ fontFamily: T.body, fontSize: 11.5, color: T.muted, lineHeight: 1.55, marginBottom: 12 }}>{p.desc}</div>

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 3 }}>
                <span style={{ fontFamily: T.display, fontSize: 28, fontWeight: 700, color: T.hi, letterSpacing: '-0.025em' }}>{p.price}</span>
                <span style={{ fontFamily: T.mono, fontSize: 9, color: T.muted }}>+18% GST</span>
                <span style={{ fontFamily: T.mono, fontSize: 10, color: T.muted }}>{p.usd}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 12, fontFamily: T.mono, fontSize: 10, color: p.accent }}>
                <Check size={9} />0% EMI: {p.emi}
              </div>

              <div style={{ height: 1, background: T.line, marginBottom: 10 }} />

              {/* Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0, flex: 1 }}>
                {p.features.map(f => (
                  <div key={f} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '3px 0' }}>
                    <div style={{ flexShrink: 0, width: 14, height: 14, borderRadius: '50%', background: `${p.accent}18`, border: `0.5px solid ${p.accent}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>
                      <Check size={8} color={p.accent} />
                    </div>
                    <span style={{ fontFamily: T.body, fontSize: 11, color: T.mid, lineHeight: 1.5 }}>{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* ── Right info column ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

            {/* EMI partners */}
            <div style={{ background: T.glass, border: `0.5px solid ${T.mintB}`, borderRadius: 14, padding: '14px 16px', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: T.mintLo, border: `0.5px solid ${T.mintB}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Building2 size={13} color={T.mint} />
                </div>
                <div style={{ fontFamily: T.display, fontSize: 13, fontWeight: 600, color: T.hi }}>0% EMI Partners</div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {FINANCE.map(f => (
                  <span key={f} style={{ fontFamily: T.mono, fontSize: 9.5, padding: '3px 9px', borderRadius: 7, background: T.glass, border: `0.5px solid ${T.line}`, color: T.muted, letterSpacing: '0.04em' }}>{f}</span>
                ))}
              </div>
              <p style={{ fontFamily: T.body, fontSize: 11, color: T.muted, lineHeight: 1.6, marginTop: 10 }}>
                Approval in minutes. Start today and cover installments through FreelanceX earning opportunities.
              </p>
            </div>

            {/* Legal guarantee */}
            <div style={{ background: `linear-gradient(135deg,${T.goldLo},rgba(255,255,255,0.02))`, border: `0.5px solid ${T.goldB}`, borderRadius: 14, padding: '14px 16px', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: T.goldLo, border: `0.5px solid ${T.goldB}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Shield size={13} color={T.gold} />
                </div>
                <div style={{ fontFamily: T.display, fontSize: 13, fontWeight: 600, color: T.hi }}>Legal Job Agreement</div>
              </div>
              {LEGAL_POINTS.map(t => (
                <div key={t} style={{ display: 'flex', gap: 7, alignItems: 'flex-start', padding: '3.5px 0' }}>
                  <div style={{ flexShrink: 0, width: 14, height: 14, borderRadius: '50%', background: `${T.gold}18`, border: `0.5px solid ${T.gold}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>
                    <Check size={8} color={T.gold} />
                  </div>
                  <span style={{ fontFamily: T.body, fontSize: 11, color: T.mid, lineHeight: 1.5 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}