import React from 'react'
import { TrendingUp, BadgeCheck, Star } from 'lucide-react'
import { T, FONT_DISPLAY, FONT_BODY, FONT_MONO } from './tokens'
import { Slide, Glow, G, Eyebrow, Badge, ProgressArc } from './primitives_old'
import type { SlideProps } from './primitives'

export function Slide07({ user }: SlideProps) {
  const testimonials = [
    {
      quote: 'Went from ₹6 LPA to ₹18 LPA in 8 months. The capstone project was what got me the Freshworks interview. Real projects beat any certificate.',
      name: 'Arjun Sharma', role: 'AI Engineer, Freshworks', ctc: '₹18 LPA',
      img: 'https://res.cloudinary.com/dguj1vqqb/image/upload/v1778936014/ChatGPT_Image_May_14_2026_08_33_14_PM_wk2pqg.png',
      color: T.violetHi, from: '₹6 LPA',
    },
    {
      quote: "Commerce background — zero coding. After the No-Code track, I built an autonomous content agent and got hired as AI Developer at ₹14 LPA.",
      name: 'Priya Menon', role: 'No-Code AI Developer, Remote', ctc: '₹14 LPA',
      img: 'https://res.cloudinary.com/dguj1vqqb/image/upload/v1778935726/main-sample.png',
      color: T.emeraldHi, from: '₹4 LPA',
    },
    {
      quote: 'FreelanceX alone paid my EMIs. I earned ₹45,000 from 3 client projects while still enrolled. By graduation, zero outstanding fee.',
      name: 'Rahul Gupta', role: 'Freelance AI Developer', ctc: '₹45K/mo',
      img: 'https://res.cloudinary.com/dguj1vqqb/image/upload/v1778935887/ChatGPT_Image_May_14_2026_08_34_53_PM_umfssj.png',
      color: T.amberHi, from: '₹0',
    },
  ]

  const comparison = [
    { feat: 'Real Startup Projects',     clc: 'Blockchain NFT + GitHub',   others: 'Simulated / Partial' },
    { feat: 'Legal Job Guarantee',       clc: 'Elite Plan (signed)',        others: 'Conditional / No' },
    { feat: 'HireX Exclusive Portal',    clc: 'CLC Candidates Only',        others: 'Not Available' },
    { feat: 'FreelanceX — Earn & Learn', clc: 'EMI coverage included',      others: 'Not Available' },
    { feat: 'International Placement',   clc: 'Germany / UAE / Singapore',  others: 'Not Available' },
    { feat: 'Multi-Agent Capstone',      clc: 'Full build + cloud deploy',  others: 'Limited / No' },
  ]

  const metrics = [
    { value: 88, label: 'Hired %',    color: T.emeraldHi },
    { value: 27, label: 'Countries',  color: T.violetHi  },
    { value: 92, label: 'Satisfied',  color: T.amberHi   },
  ]

  return (
    <Slide bg={T.base}>
      <Glow x="8%"  y="22%" color={T.emerald} size={380} opacity={0.05} />
      <Glow x="92%" y="75%" color={T.violet}  size={380} opacity={0.06} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 'clamp(14px,2.5vw,32px) clamp(20px,4vw,56px)', gap: 'clamp(8px,1.4vh,14px)' }}>

        <div className="r1" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <div>
            <Eyebrow>Success Stories &amp; Real Results</Eyebrow>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(1.1rem,2.6vw,2.2rem)', fontWeight: 700, letterSpacing: '-0.025em', color: T.t1, lineHeight: 1.05 }}>
              Real Graduates. <G>Verified Outcomes.</G>
            </h2>
          </div>
          {/* Metric arcs */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            {metrics.map(m => <ProgressArc key={m.label} value={m.value} color={m.color} size={60} label={m.label} />)}
          </div>
        </div>

        {/* Testimonials */}
        <div className="r2" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{
              background: T.surface, border: `1px solid ${T.border}`,
              borderRadius: 12, padding: 'clamp(12px,2vw,16px)',
              position: 'relative', overflow: 'hidden',
              transition: 'border-color 0.2s', cursor: 'default',
            }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = `${t.color}40`)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = T.border)}
            >
              {/* Color accent stripe */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${t.color}, transparent)` }} />

              {/* Avatar + name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 9 }}>
                <div style={{ position: 'relative', width: 'clamp(34px,5vw,44px)', height: 'clamp(34px,5vw,44px)', flexShrink: 0 }}>
                  <img src={t.img} alt={t.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${t.color}50` }} />
                  <div style={{ position: 'absolute', right: -2, bottom: -2, width: 14, height: 14, borderRadius: '50%', background: T.base, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <BadgeCheck size={10} color={T.emeraldHi} />
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(0.6rem,1vw,0.76rem)', fontWeight: 600, color: T.t1 }}>{t.name}</div>
                  <div style={{ fontFamily: FONT_BODY, fontSize: 'clamp(0.48rem,0.78vw,0.6rem)', color: T.t3 }}>{t.role}</div>
                </div>
              </div>

              {/* CTC before/after */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 7 }}>
                <span style={{ fontFamily: FONT_MONO, fontSize: 'clamp(0.44rem,0.72vw,0.56rem)', color: T.t4, textDecoration: 'line-through' }}>{t.from}</span>
                <svg width="12" height="8" viewBox="0 0 12 8"><path d="M0 4h8M5 1l4 3-4 3" stroke={t.color} strokeWidth="1.2" fill="none" strokeLinecap="round" /></svg>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: T.emeraldBg, border: `1px solid ${T.emeraldRim}`, color: T.emeraldHi, borderRadius: 100, padding: '2px 8px' }}>
                  <TrendingUp size={8} />
                  <span style={{ fontFamily: FONT_MONO, fontSize: 'clamp(0.44rem,0.72vw,0.56rem)', fontWeight: 600 }}>{t.ctc}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 2, marginBottom: 7 }}>
                {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={9} fill={T.amberHi} color={T.amberHi} />)}
              </div>

              <p style={{ fontFamily: FONT_BODY, fontSize: 'clamp(0.55rem,0.88vw,0.66rem)', color: T.t2, lineHeight: 1.65 }}>"{t.quote}"</p>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="r3" style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 10, overflow: 'hidden', flex: 1, minHeight: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 'clamp(8px,1.4vw,12px) clamp(10px,1.8vw,16px)', borderBottom: `1px solid ${T.border}`, background: T.raised }}>
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(0.65rem,1.1vw,0.8rem)', fontWeight: 600, color: T.t1 }}>InternX–AI vs The Rest</span>
            <Badge color={T.violetHi} bg={T.violetBg} rim={T.violetRim}>Objective Comparison</Badge>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: `${T.raised}80` }}>
                {['Feature', 'InternX–AI', 'Scaler / Springboard', 'Others'].map((h, i) => (
                  <th key={h} style={{
                    padding: 'clamp(5px,0.9vh,8px) clamp(8px,1.4vw,14px)', textAlign: i === 0 ? 'left' : 'center',
                    fontFamily: FONT_MONO, fontSize: 'clamp(0.38rem,0.62vw,0.5rem)', letterSpacing: '0.10em',
                    textTransform: 'uppercase', fontWeight: 500,
                    color: i === 1 ? T.emeraldHi : T.t3,
                    borderBottom: `1px solid ${T.border}`, width: i === 0 ? '34%' : 'auto',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : `${T.raised}60` }}>
                  <td style={{ padding: 'clamp(4px,0.8vh,7px) clamp(8px,1.4vw,14px)', fontFamily: FONT_BODY, fontSize: 'clamp(0.5rem,0.82vw,0.65rem)', fontWeight: 500, color: T.t2, borderBottom: `1px solid ${T.border}` }}>{row.feat}</td>
                  <td style={{ padding: 'clamp(4px,0.8vh,7px) clamp(8px,1.4vw,14px)', textAlign: 'center', borderBottom: `1px solid ${T.border}` }}>
                    <span style={{ fontFamily: FONT_MONO, fontSize: 'clamp(0.4rem,0.65vw,0.52rem)', padding: '2px 7px', borderRadius: 100, background: T.emeraldBg, color: T.emeraldHi, border: `1px solid ${T.emeraldRim}` }}>✓ {row.clc}</span>
                  </td>
                  {[row.others, 'No'].map((v, j) => (
                    <td key={j} style={{ padding: 'clamp(4px,0.8vh,7px) clamp(8px,1.4vw,14px)', textAlign: 'center', borderBottom: `1px solid ${T.border}` }}>
                      <span style={{ fontFamily: FONT_MONO, fontSize: 'clamp(0.4rem,0.65vw,0.52rem)', padding: '2px 7px', borderRadius: 100, background: T.roseBg, color: T.rose }}>{v}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Slide>
  )
}