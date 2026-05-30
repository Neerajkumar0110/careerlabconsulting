'use client'

/**
 * SLIDE 6 — Hiring Partners & Job Roadmap
 * Canvas: 1280 × 720 px. No scroll.
 */

import { motion } from 'framer-motion'
import { Zap, TrendingUp, BadgeCheck, Check } from 'lucide-react'

const T = {
  void:     '#03040A',
  ink:      '#070B15',
  glass:    'rgba(255,255,255,0.030)',
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

const ROADMAP = [
  { n: '01', title: 'Complete Program',   desc: '90%+ score · all projects', color: T.violet },
  { n: '02', title: 'Get Certified',      desc: 'Cert + Verified Career Portfolio minted',   color: '#A855F7' },
  { n: '03', title: 'Profile Built',      desc: 'GitHub + LinkedIn + CV',    color: '#8B5CF6' },
  { n: '04', title: 'Access HireX',       desc: '270+ global companies',     color: T.cyan },
  { n: '05', title: 'Interview Prep',     desc: 'AI mock + coaching',        color: T.mint },
  { n: '06', title: 'Legal Offer',        desc: 'Signed · Fixed DOJ',        color: T.gold },
]

const HIREX_FEATURES = [
  'Legal job guarantee with signed agreement',
  'Fixed date of joining in offer letter',
  'India + International remote roles',
  'Permanent AI roles: Germany, UAE, Singapore',
  '88% job offer conversion rate',
]

const FREELANCEX_FEATURES = [
  'Freelance earnings cover monthly EMIs',
  'AI chatbots: ₹5,000 – ₹15,000 / project',
  'Research agents: ₹10,000 – ₹30,000 / project',
  'Enterprise RAG: ₹50,000 – ₹2,00,000',
  'Lifetime access to FreelanceX platform',
]

const PROFILES = [
  { name: 'Arjun Sharma',  ctc: '₹18 LPA', from: '₹6 LPA',    loc: 'AI Engineer, Freshworks',          color: T.violet, img: 'https://res.cloudinary.com/dguj1vqqb/image/upload/v1778936014/ChatGPT_Image_May_14_2026_08_33_14_PM_wk2pqg.png' },
  { name: 'Priya Menon',   ctc: '₹14 LPA', from: 'Non-Tech',   loc: 'No-Code AI Developer (Remote)',    color: T.mint,   img: 'https://res.cloudinary.com/dguj1vqqb/image/upload/v1778935726/main-sample.png' },
  { name: 'Rahul Gupta',   ctc: '₹45K/mo', from: '₹5 LPA',    loc: 'Freelance AI Developer',           color: T.gold,   img: 'https://res.cloudinary.com/dguj1vqqb/image/upload/v1778935887/ChatGPT_Image_May_14_2026_08_34_53_PM_umfssj.png' },
  { name: 'Sneha Iyer',    ctc: '₹16 LPA', from: '₹8 LPA',    loc: 'Prompt Engineer, Startup',         color: T.cyan,   img: 'https://res.cloudinary.com/dguj1vqqb/image/upload/v1778935868/ChatGPT_Image_May_16_2026_06_13_51_PM_qrsrgm.png' },
]

function Tag({ children, accent, accentLo, accentB }: { children: React.ReactNode; accent: string; accentLo: string; accentB: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: accentLo, color: accent, border: `0.5px solid ${accentB}`, fontSize: 9.5, fontWeight: 500, fontFamily: T.mono, letterSpacing: '0.06em', padding: '3px 9px', borderRadius: 100, whiteSpace: 'nowrap' }}>{children}</span>
  )
}

export default function SlideHiring() {
  return (
    <div style={{
      width: 1280, height: 720,
      background: T.ink,
      position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      fontFamily: T.body,
    }}>
      {/* BG */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: `linear-gradient(${T.line} 1px,transparent 1px),linear-gradient(90deg,${T.line} 1px,transparent 1px)`, backgroundSize: '64px 64px', maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%,black 30%,transparent 100%)' }} />
      <div style={{ position: 'absolute', left: '90%', top: '20%', width: 450, height: 450, background: `radial-gradient(circle,${T.violet} 0%,transparent 70%)`, opacity: 0.07, transform: 'translate(-50%,-50%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', left: '5%', top: '75%', width: 380, height: 380, background: `radial-gradient(circle,${T.mint} 0%,transparent 70%)`, opacity: 0.05, transform: 'translate(-50%,-50%)', pointerEvents: 'none' }} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '22px 48px 18px', position: 'relative', zIndex: 2 }}>

        {/* Header */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
            <div style={{ width: 16, height: 1, background: T.mint, opacity: 0.7 }} />
            <span style={{ fontFamily: T.mono, fontSize: 9.5, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: T.mint }}>Hiring Partners &amp; Job Roadmap</span>
            <div style={{ width: 16, height: 1, background: T.mint, opacity: 0.7 }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
            <h2 style={{ fontFamily: T.display, fontSize: 36, fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.025em', color: T.hi, margin: 0 }}>
              Your Path to{' '}
              <span style={{ backgroundImage: `linear-gradient(135deg,#7C3AED 0%,#A855F7 35%,#10F5A0 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Getting Hired.</span>
            </h2>
            <div style={{ display: 'flex', gap: 6 }}>
              <Tag accent={T.gold} accentLo={T.goldLo} accentB={T.goldB}>88% Job Conversion</Tag>
              <Tag accent={T.mint} accentLo={T.mintLo} accentB={T.mintB}>Lifetime HireX + FreelanceX</Tag>
              <Tag accent={T.violet} accentLo={T.violetLo} accentB={T.violetB}>Legal Job Agreement</Tag>
            </div>
          </div>
        </div>

        {/* 6-step roadmap */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 2, marginBottom: 20, position: 'relative' }}>
          {ROADMAP.map((s, i) => (
            <div key={s.n} style={{ position: 'relative' }}>
              {i < ROADMAP.length - 1 && (
                <div style={{ position: 'absolute', top: 22, left: '50%', right: '-50%', height: 1, background: `linear-gradient(90deg,${s.color}70,transparent)`, zIndex: 0 }} />
              )}
              <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 4px' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: `linear-gradient(135deg,${s.color}28,${s.color}08)`, border: `1px solid ${s.color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', boxShadow: `0 0 14px ${s.color}20` }}>
                  <span style={{ fontFamily: T.mono, fontSize: 11, fontWeight: 500, color: s.color }}>{s.n}</span>
                </div>
                <div style={{ fontFamily: T.display, fontSize: 12, fontWeight: 600, color: T.hi, marginBottom: 3, lineHeight: 1.3 }}>{s.title}</div>
                <div style={{ fontFamily: T.body, fontSize: 10, color: T.muted, lineHeight: 1.45 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Two-column: HireX + FreelanceX */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
          {/* HireX */}
          <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 14, border: `0.5px solid ${T.violetB}`, padding: '14px 16px', background: `linear-gradient(135deg,${T.violetLo} 0%,rgba(255,255,255,0.02) 100%)` }}>
            <div style={{ position: 'absolute', top: -16, right: -16, width: 100, height: 100, background: `radial-gradient(${T.violet}40,transparent 70%)`, pointerEvents: 'none' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: T.violetLo, border: `0.5px solid ${T.violetB}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={14} color={T.violetHi} />
              </div>
              <div>
                <div style={{ fontFamily: T.display, fontSize: 16, fontWeight: 600, color: T.hi }}>HireX Portal</div>
                <span style={{ fontFamily: T.mono, fontSize: 8.5, background: T.violetLo, color: T.violetHi, border: `0.5px solid ${T.violetB}`, padding: '2px 7px', borderRadius: 100 }}>Exclusive · CLC Only</span>
              </div>
            </div>
            {HIREX_FEATURES.map(f => (
              <div key={f} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '3px 0' }}>
                <div style={{ flexShrink: 0, width: 14, height: 14, borderRadius: '50%', background: `${T.violetHi}18`, border: `0.5px solid ${T.violetHi}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>
                  <Check size={8} color={T.violetHi} />
                </div>
                <span style={{ fontFamily: T.body, fontSize: 13, color: T.mid, lineHeight: 1.5 }}>{f}</span>
              </div>
            ))}
          </div>

          {/* FreelanceX */}
          <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 14, border: `0.5px solid ${T.cyanB}`, padding: '14px 16px', background: `linear-gradient(135deg,${T.cyanLo} 0%,rgba(255,255,255,0.02) 100%)` }}>
            <div style={{ position: 'absolute', top: -16, right: -16, width: 100, height: 100, background: `radial-gradient(${T.cyan}40,transparent 70%)`, pointerEvents: 'none' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: T.cyanLo, border: `0.5px solid ${T.cyanB}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TrendingUp size={14} color={T.cyan} />
              </div>
              <div>
                <div style={{ fontFamily: T.display, fontSize: 18, fontWeight: 600, color: T.hi }}>FreelanceX Portal</div>
                <span style={{ fontFamily: T.mono, fontSize: 8.5, background: T.cyanLo, color: T.cyan, border: `0.5px solid ${T.cyanB}`, padding: '2px 7px', borderRadius: 100 }}>Exclusive · CLC Only</span>
              </div>
            </div>
            {FREELANCEX_FEATURES.map(f => (
              <div key={f} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '3px 0' }}>
                <div style={{ flexShrink: 0, width: 14, height: 14, borderRadius: '50%', background: `${T.cyan}18`, border: `0.5px solid ${T.cyan}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>
                  <Check size={8} color={T.cyan} />
                </div>
                <span style={{ fontFamily: T.body, fontSize: 13, color: T.mid, lineHeight: 1.5 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Placed profiles strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
          {PROFILES.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.07 }}
              style={{ background: T.glass, border: `0.5px solid ${p.color}25`, borderRadius: 12, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10, position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1.5, background: `linear-gradient(90deg,transparent,${p.color},transparent)` }} />
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <img src={p.img} alt={p.name} style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover', border: `1.5px solid ${p.color}` }} />
                <div style={{ position: 'absolute', right: -2, bottom: -2, width: 14, height: 14, borderRadius: '50%', background: T.ink, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <BadgeCheck size={10} color={T.mint} />
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: T.display, fontSize: 11.5, fontWeight: 600, color: T.hi, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                <div style={{ fontFamily: T.body, fontSize: 10, color: T.muted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.loc}</div>
                <div style={{ fontFamily: T.display, fontSize: 13, fontWeight: 700, color: T.mint, marginTop: 2 }}>{p.ctc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}