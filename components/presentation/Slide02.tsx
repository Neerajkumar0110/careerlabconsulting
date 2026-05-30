import React from 'react'
import { T, FONT_DISPLAY, FONT_BODY, FONT_MONO } from './tokens'
import { Slide, Glow, G, Eyebrow } from './primitives'
import type { SlideProps } from './primitives'

// ─── STAT BAR CHART — horizontal bars, editorial style ───────────────────────
function StatBars() {
  const bars = [
    { label: 'Placement Rate',  value: 88, color: T.emeraldHi, track: T.emeraldBg },
    { label: 'Learner Sat.',    value: 96, color: T.violetHi,  track: T.violetBg  },
    { label: 'Employer Trust',  value: 92, color: T.cyanHi,    track: T.cyanBg    },
    { label: 'Global Reach',    value: 78, color: T.amberHi,   track: T.amberBg   },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(8px,1.4vh,14px)', width: '100%' }}>
      {bars.map(({ label, value, color, track }) => (
        <div key={label}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            marginBottom: 5,
          }}>
            <span style={{
              fontFamily: FONT_MONO,
              fontSize: 'clamp(0.38rem,0.58vw,0.48rem)',
              color: T.t4, letterSpacing: '0.10em', textTransform: 'uppercase',
            }}>{label}</span>
            <span style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 'clamp(0.75rem,1.3vw,1.05rem)',
              fontWeight: 700, color, letterSpacing: '-0.03em',
            }}>{value}%</span>
          </div>
          <div style={{
            height: 'clamp(5px,0.8vh,8px)', borderRadius: 100,
            background: track, overflow: 'hidden', position: 'relative',
          }}>
            <div style={{
              position: 'absolute', inset: 0, right: `${100 - value}%`,
              background: color, borderRadius: 100,
              animation: `barGrow 1.2s cubic-bezier(0.22,1,0.36,1) both`,
            }} />
          </div>
        </div>
      ))}
      <style>{`
        @keyframes barGrow {
          from { right: 100%; }
          to   { right: var(--bar-right, 0%); }
        }
      `}</style>
    </div>
  )
}

// ─── ECOSYSTEM NODE DIAGRAM — clean spoke layout ──────────────────────────────
function EcosystemSpoke() {
  const nodes = [
    { label: 'InternX–AI',     sub: 'Training Core',    color: T.violetHi,  rim: T.violetRim,  bg: T.violetBg,  x: 128, y: 52  },
    { label: 'HireX Portal',   sub: 'Job Placement',    color: T.emeraldHi, rim: T.emeraldRim, bg: T.emeraldBg, x: 252, y: 18  },
    { label: 'FreelanceX',     sub: 'Earn While Learn', color: T.amberHi,   rim: T.amberRim,   bg: T.amberBg,   x: 372, y: 52  },
    { label: 'Verified Career Portfolio',      sub: 'On-Chain Proof',   color: T.cyanHi,    rim: T.cyanRim,    bg: T.cyanBg,    x: 372, y: 162 },
    { label: 'AigenX Coach',   sub: 'AI Mentorship',    color: T.violetHi,  rim: T.violetRim,  bg: T.violetBg,  x: 252, y: 198 },
    { label: 'CLC Enterprise', sub: 'Real Clients',     color: T.emeraldHi, rim: T.emeraldRim, bg: T.emeraldBg, x: 128, y: 162 },
  ]
  const cx = 252, cy = 108, nodeW = 88, nodeH = 36

  return (
    <svg viewBox="0 0 500 224" width="100%" height="100%" style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={T.violet} stopOpacity="0.35" />
          <stop offset="100%" stopColor={T.violet} stopOpacity="0"    />
        </radialGradient>
      </defs>

      {/* Spokes */}
      {nodes.map((n, i) => (
        <line key={`spoke-${i}`}
          x1={cx} y1={cy}
          x2={n.x + nodeW / 2} y2={n.y + nodeH / 2}
          stroke={n.color} strokeWidth="0.6"
          strokeDasharray="3 4" opacity="0.30"
        />
      ))}

      {/* Outer orbit ring */}
      <ellipse cx={cx} cy={cy} rx="148" ry="104"
        fill="none" stroke={T.border} strokeWidth="0.5" strokeDasharray="2 8" />

      {/* Core glow blob */}
      <circle cx={cx} cy={cy} r="38" fill="url(#coreGlow)" />

      {/* Satellite nodes */}
      {nodes.map((n, i) => (
        <g key={i} style={{
          animation: `floatN${i} ${3.6 + i * 0.5}s ease-in-out infinite`,
          transformOrigin: `${n.x + nodeW / 2}px ${n.y + nodeH / 2}px`,
        }}>
          <rect x={n.x} y={n.y} width={nodeW} height={nodeH} rx="8"
            fill={n.bg} stroke={n.rim} strokeWidth="0.7" />
          <rect x={n.x} y={n.y} width="3" height={nodeH} rx="2"
            fill={n.color} opacity="0.8" />
          <text x={n.x + 9} y={n.y + 11}
            fontFamily={FONT_DISPLAY} fontSize="7.5" fontWeight="700"
            fill={n.color}>
            {n.label.split('–')[0].split(' ').slice(0, 2).join(' ')}
          </text>
          <text x={n.x + 9} y={n.y + 23}
            fontFamily={FONT_MONO} fontSize="5.5" letterSpacing="0.06em"
            fill={T.t4}>
            {n.sub}
          </text>
          <style>{`
            @keyframes floatN${i} {
              0%,100%{transform:translateY(0px)}
              50%{transform:translateY(${i % 2 === 0 ? '-3' : '3'}px)}
            }
          `}</style>
        </g>
      ))}

      {/* Core badge */}
      <circle cx={cx} cy={cy} r="26"
        fill={T.raised} stroke={T.violetRim} strokeWidth="0.8" />
      <circle cx={cx} cy={cy} r="26"
        fill="none" stroke={T.violetHi} strokeWidth="0.5"
        strokeDasharray="3 5" opacity="0.3"
        style={{ animation: 'spinCore 22s linear infinite', transformOrigin: `${cx}px ${cy}px` }} />
      <text x={cx} y={cy - 4} textAnchor="middle"
        fontFamily={FONT_DISPLAY} fontSize="10" fontWeight="700" fill={T.violetHi}>CLC</text>
      <text x={cx} y={cy + 8} textAnchor="middle"
        fontFamily={FONT_MONO} fontSize="5" letterSpacing="0.09em" fill={T.t4}>HUB</text>

      {/* Right legend strip */}
      <text x="432" y="20"
        fontFamily={FONT_MONO} fontSize="5.5" letterSpacing="0.10em"
        fill={T.t4} textAnchor="start">6 PLATFORMS</text>
      <text x="432" y="32"
        fontFamily={FONT_MONO} fontSize="5.5" letterSpacing="0.10em"
        fill={T.t5} textAnchor="start">1 OUTCOME</text>
      <line x1="432" y1="36" x2="492" y2="36"
        stroke={T.border} strokeWidth="0.5" />

      <style>{`@keyframes spinCore { to { transform: rotate(360deg); } }`}</style>
    </svg>
  )
}

// ─── BIG NUMBER TICKER ────────────────────────────────────────────────────────
function Ticker({ value, suffix = '', label, color }: {
  value: string; suffix?: string; label: string; color: string
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <div style={{
        fontFamily: FONT_DISPLAY,
        fontSize: 'clamp(1.4rem,2.8vw,2.6rem)',
        fontWeight: 700, letterSpacing: '-0.05em',
        color, lineHeight: 1,
      }}>
        {value}<span style={{ fontSize: '55%', opacity: 0.7 }}>{suffix}</span>
      </div>
      <div style={{
        fontFamily: FONT_MONO,
        fontSize: 'clamp(0.32rem,0.5vw,0.42rem)',
        color: T.t4, letterSpacing: '0.14em',
        textTransform: 'uppercase',
      }}>{label}</div>
    </div>
  )
}

// ─── SLIDE 02 ────────────────────────────────────────────────────────────────
export function Slide02({ user }: SlideProps) {
  const first = user?.name ? user.name.split(' ')[0] : null

  return (
    <Slide bg={T.surface}>
      {/* Ambient glows — subtle, not neon */}
      <Glow x="72%" y="8%"  color={T.violet}  size={500} opacity={0.055} />
      <Glow x="12%" y="85%" color={T.emerald} size={380} opacity={0.045} />
      <Glow x="88%" y="70%" color={T.cyan}    size={280} opacity={0.035} />

      {/* Top 1px accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1, zIndex: 4,
        background: `linear-gradient(90deg,transparent 0%,${T.violetHi}50 30%,${T.emeraldHi}50 70%,transparent 100%)`,
      }} />

      {/*
        ─── MAIN LAYOUT: 3 columns
          [Left: brand story + stats]  |  [Mid: performance bars]  |  [Right: ecosystem]
        Proportions: 2fr | 1.6fr | 1.6fr  with dividers
      ──────────────────────────────────────────────────── */}
      <div style={{
        flex: 1, display: 'grid',
        gridTemplateColumns: '2fr 1px 1.55fr 1px 1.55fr',
        minHeight: 0, overflow: 'hidden',
      }}>

        {/* ──── COL 1: Brand story ──────────────────────────────────── */}
        <div style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          padding: 'clamp(18px,3.5vh,44px) clamp(18px,3.5vw,52px)',
          gap: 'clamp(10px,1.8vh,18px)',
        }}>

          {/* Top: Eyebrow + Headline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px,1.2vh,12px)' }}>
            <Eyebrow>About Career Lab Consulting</Eyebrow>
            <h2 style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 'clamp(1.25rem,2.6vw,2.3rem)',
              fontWeight: 700, lineHeight: 1.02,
              letterSpacing: '-0.035em', color: T.t1,
              margin: 0,
            }}>
              India's Premier<br />
              <G from={T.violetHi} to={T.emeraldHi}>AI Career Engine</G>
            </h2>

            {/* Personalised callout */}
            {first && (
              <div style={{
                fontFamily: FONT_BODY,
                fontSize: 'clamp(0.55rem,0.95vw,0.7rem)',
                color: T.t3, fontWeight: 300, lineHeight: 1.65,
                padding: 'clamp(7px,1.1vh,11px) clamp(10px,1.4vw,14px)',
                background: T.violetBg,
                border: `1px solid ${T.violetRim}`,
                borderLeft: `3px solid ${T.violetHi}`,
                borderRadius: '0 6px 6px 0',
              }}>
                {first}, here's why <strong style={{ color: T.t2, fontWeight: 500 }}>15,000+</strong> professionals chose CLC.
              </div>
            )}

            {/* Body copy */}
            <p style={{
              fontFamily: FONT_BODY,
              fontSize: 'clamp(0.56rem,0.95vw,0.72rem)',
              lineHeight: 1.75, color: T.t3, fontWeight: 300,
              margin: 0, maxWidth: '34ch',
            }}>
              Operating across <strong style={{ color: T.t2, fontWeight: 500 }}>27 countries</strong> since 2019 — we don't just teach AI; we manufacture verifiable, on-chain proof-of-work that global employers trust.
            </p>

            {/* Pull quote */}
            <blockquote style={{
              margin: 0,
              padding: 'clamp(8px,1.3vh,12px) clamp(12px,1.8vw,16px)',
              borderLeft: `2px solid ${T.violetHi}60`,
              background: `linear-gradient(90deg,${T.violetBg} 0%,transparent 100%)`,
              borderRadius: '0 6px 6px 0',
            }}>
              <p style={{
                fontFamily: FONT_BODY,
                fontSize: 'clamp(0.54rem,0.9vw,0.68rem)',
                fontStyle: 'italic', lineHeight: 1.6,
                color: T.t2, margin: 0,
              }}>
                "If AI can do the work, your proof of work must speak louder than your résumé."
              </p>
              <div style={{
                fontFamily: FONT_MONO,
                fontSize: 'clamp(0.36rem,0.54vw,0.44rem)',
                color: T.violetHi, letterSpacing: '0.09em',
                marginTop: 6,
              }}>— Career Lab Consulting</div>
            </blockquote>
          </div>

          {/* Bottom: 4 big numbers in 2×2 grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(8px,1.3vh,14px)',
          }}>
            {[
              { value: '15K', suffix: '+', label: 'Total Learners',  color: T.violetHi  },
              { value: '88',  suffix: '%', label: 'Placement Rate',  color: T.emeraldHi },
              { value: '27',  suffix: '',  label: 'Countries Served',color: T.amberHi   },
              { value: '5',   suffix: 'yr',label: 'Track Record',    color: T.cyanHi    },
            ].map((s) => (
              <div key={s.label} style={{
                padding: 'clamp(8px,1.3vh,13px) clamp(10px,1.5vw,14px)',
                background: T.raised,
                border: `1px solid ${T.border}`,
                borderRadius: 10,
                position: 'relative', overflow: 'hidden',
              }}>
                {/* left accent bar */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, bottom: 0,
                  width: 2.5, background: s.color, opacity: 0.7,
                  borderRadius: '2px 0 0 2px',
                }} />
                <Ticker {...s} />
              </div>
            ))}
          </div>

          {/* Trust badges row */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 5, alignItems: 'center',
          }}>
            {[
              { label: 'ISO 27001',   color: T.violetHi,  bg: T.violetBg,  rim: T.violetRim  },
              { label: 'MNC · 2019', color: T.amberHi,   bg: T.amberBg,   rim: T.amberRim   },
              { label: '15K+ Alumni',color: T.cyanHi,    bg: T.cyanBg,    rim: T.cyanRim    },
              { label: '27 Countries',color: T.emeraldHi, bg: T.emeraldBg, rim: T.emeraldRim },
            ].map(({ label, color, bg, rim }) => (
              <span key={label} style={{
                fontFamily: FONT_MONO,
                fontSize: 'clamp(0.32rem,0.5vw,0.42rem)',
                letterSpacing: '0.08em',
                padding: 'clamp(2px,0.35vh,4px) clamp(6px,0.9vw,10px)',
                borderRadius: 100,
                background: bg, color, border: `1px solid ${rim}`,
                whiteSpace: 'nowrap',
              }}>{label}</span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ background: T.border, alignSelf: 'stretch' }} />

        {/* ──── COL 2: Performance Bars ─────────────────────────────── */}
        <div style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: 'clamp(18px,3.5vh,44px) clamp(16px,3vw,36px)',
          gap: 'clamp(14px,2.5vh,28px)',
        }}>
          {/* Section label */}
          <div>
            <div style={{
              fontFamily: FONT_MONO,
              fontSize: 'clamp(0.34rem,0.52vw,0.44rem)',
              color: T.t4, letterSpacing: '0.16em',
              textTransform: 'uppercase', marginBottom: 4,
            }}>Performance Metrics</div>
            <div style={{
              width: 'clamp(20px,3vw,32px)', height: 1,
              background: `linear-gradient(90deg,${T.violetHi},transparent)`,
            }} />
          </div>

          {/* Bar chart */}
          <StatBars />

          {/* Footnote */}
          <div style={{
            fontFamily: FONT_MONO,
            fontSize: 'clamp(0.3rem,0.46vw,0.38rem)',
            color: T.t5, letterSpacing: '0.07em',
            lineHeight: 1.6,
          }}>
            Based on 15,000+ learner outcomes<br />
            across cohorts 2019–2024
          </div>

          {/* Divider line */}
          <div style={{ height: 1, background: T.border, opacity: 0.6 }} />

          {/* Mini milestone timeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px,1vh,10px)' }}>
            <div style={{
              fontFamily: FONT_MONO,
              fontSize: 'clamp(0.33rem,0.50vw,0.42rem)',
              color: T.t4, letterSpacing: '0.14em',
              textTransform: 'uppercase', marginBottom: 2,
            }}>Milestones</div>
            {[
              { year: '2019', event: 'Founded · 3 countries', color: T.emeraldHi },
              { year: '2021', event: '5K alumni · HireX launch', color: T.violetHi },
              { year: '2023', event: 'Verified Career Portfolio · 20 countries', color: T.amberHi },
              { year: '2024', event: '15K alumni · ISO certified', color: T.cyanHi },
            ].map(({ year, event, color }) => (
              <div key={year} style={{
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <div style={{
                  fontFamily: FONT_MONO,
                  fontSize: 'clamp(0.38rem,0.58vw,0.48rem)',
                  color, fontWeight: 500, minWidth: 'clamp(20px,2.4vw,28px)',
                  letterSpacing: '-0.01em',
                }}>{year}</div>
                <div style={{
                  width: 4, height: 4, borderRadius: '50%',
                  background: color, flexShrink: 0, opacity: 0.8,
                }} />
                <div style={{
                  fontFamily: FONT_BODY,
                  fontSize: 'clamp(0.42rem,0.65vw,0.54rem)',
                  color: T.t3, fontWeight: 300,
                }}>{event}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ background: T.border, alignSelf: 'stretch' }} />

        {/* ──── COL 3: Ecosystem spoke diagram ──────────────────────── */}
        <div style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          alignItems: 'center',
          padding: 'clamp(18px,3.5vh,44px) clamp(12px,2.5vw,28px)',
          gap: 'clamp(10px,1.8vh,18px)',
        }}>
          {/* Section label */}
          <div style={{ width: '100%' }}>
            <div style={{
              fontFamily: FONT_MONO,
              fontSize: 'clamp(0.34rem,0.52vw,0.44rem)',
              color: T.t4, letterSpacing: '0.16em',
              textTransform: 'uppercase', marginBottom: 4,
            }}>The CLC Ecosystem</div>
            <div style={{
              width: 'clamp(20px,3vw,32px)', height: 1,
              background: `linear-gradient(90deg,${T.emeraldHi},transparent)`,
            }} />
          </div>

          {/* SVG diagram */}
          <div style={{
            width: '100%', flex: 1, minHeight: 0,
            maxHeight: 'clamp(160px,28vh,260px)',
          }}>
            <EcosystemSpoke />
          </div>

          {/* Feature list */}
          <div style={{
            width: '100%', display: 'flex', flexDirection: 'column',
            gap: 'clamp(5px,0.9vh,8px)',
          }}>
            {[
              { icon: '◈', label: 'AI-first curriculum built for 2025+', color: T.violetHi },
              { icon: '◈', label: 'Blockchain-verified proof of work',    color: T.emeraldHi },
              { icon: '◈', label: 'Live enterprise project pipeline',     color: T.amberHi },
            ].map(({ icon, label, color }) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', gap: 7,
              }}>
                <span style={{
                  fontFamily: FONT_MONO, fontSize: 'clamp(0.5rem,0.8vw,0.62rem)',
                  color, flexShrink: 0,
                }}>{icon}</span>
                <span style={{
                  fontFamily: FONT_BODY,
                  fontSize: 'clamp(0.42rem,0.65vw,0.54rem)',
                  color: T.t3, fontWeight: 300, lineHeight: 1.5,
                }}>{label}</span>
              </div>
            ))}
          </div>

          {/* Bottom tagline */}
          <div style={{
            width: '100%',
            padding: 'clamp(7px,1.2vh,10px) clamp(10px,1.4vw,14px)',
            background: `linear-gradient(90deg,${T.emeraldBg} 0%,transparent 100%)`,
            border: `1px solid ${T.emeraldRim}`,
            borderLeft: `2.5px solid ${T.emeraldHi}`,
            borderRadius: '0 6px 6px 0',
          }}>
            <div style={{
              fontFamily: FONT_MONO,
              fontSize: 'clamp(0.35rem,0.54vw,0.46rem)',
              color: T.emeraldHi, letterSpacing: '0.08em',
              lineHeight: 1.55,
            }}>
              6 integrated platforms<br />
              <span style={{ color: T.t3, fontWeight: 300 }}>built around one career outcome</span>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  )
}