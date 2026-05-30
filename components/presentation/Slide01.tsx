import React from 'react'
import { Award, Globe, Zap, Shield } from 'lucide-react'
import { T, FONT_DISPLAY, FONT_BODY, FONT_MONO } from './tokens'
import { Slide, Glow, G, Eyebrow, Badge } from './primitives'
import type { SlideProps } from './primitives'

// ─── ANIMATED SVG HERO GRAPHIC ───────────────────────────────────────────────
function HeroOrb() {
  return (
    <svg
      viewBox="0 0 420 420"
      width="100%"
      height="100%"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <radialGradient id="orbGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={T.violet} stopOpacity="0.18" />
          <stop offset="100%" stopColor={T.violet} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={T.violetMid} stopOpacity="0.35" />
          <stop offset="60%" stopColor={T.violet} stopOpacity="0.12" />
          <stop offset="100%" stopColor={T.violet} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={T.violetHi} stopOpacity="0.7" />
          <stop offset="100%" stopColor={T.emeraldHi} stopOpacity="0.3" />
        </linearGradient>
        <filter id="glow1">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Outer ambient fill */}
      <circle cx="210" cy="210" r="200" fill="url(#orbGrad)" />

      {/* Ring 1 — outermost, slow spin */}
      <g style={{ transformOrigin: '210px 210px', animation: 'spin1 28s linear infinite' }}>
        <circle cx="210" cy="210" r="185" fill="none" stroke={T.violetHi} strokeWidth="0.6"
          strokeDasharray="3 18" opacity="0.3" />
        <circle cx="210" cy="25" r="4" fill={T.violetHi} opacity="0.9" filter="url(#glow1)" />
        <circle cx="395" cy="210" r="3" fill={T.emeraldHi} opacity="0.8" />
      </g>

      {/* Ring 2 — mid, counter-spin */}
      <g style={{ transformOrigin: '210px 210px', animation: 'spin2 18s linear infinite' }}>
        <circle cx="210" cy="210" r="148" fill="none" stroke={T.emeraldHi} strokeWidth="0.5"
          strokeDasharray="2 12" opacity="0.25" />
        <circle cx="210" cy="62" r="5" fill={T.emeraldHi} opacity="0.85" filter="url(#glow1)" />
        <circle cx="358" cy="210" r="3.5" fill={T.amberHi} opacity="0.75" />
      </g>

      {/* Ring 3 — inner, fast */}
      <g style={{ transformOrigin: '210px 210px', animation: 'spin3 12s linear infinite' }}>
        <circle cx="210" cy="210" r="108" fill="none" stroke={T.amberHi} strokeWidth="0.5"
          strokeDasharray="2 8" opacity="0.22" />
        <circle cx="210" cy="102" r="4" fill={T.amberHi} opacity="0.8" filter="url(#glow1)" />
      </g>

      {/* Core glow */}
      <circle cx="210" cy="210" r="72" fill="url(#coreGrad)" />
      <circle cx="210" cy="210" r="48" fill={T.surface} stroke={T.violetRim} strokeWidth="1" />

      {/* Core logo mark */}
      <text x="210" y="200" textAnchor="middle" fill={T.violetHi}
        fontSize="13" fontFamily="'DM Mono',monospace" letterSpacing="0.12em" opacity="0.9">
        INTERN
      </text>
      <text x="210" y="218" textAnchor="middle" fill={T.emeraldHi}
        fontSize="18" fontFamily="'Clash Display','DM Sans',sans-serif" fontWeight="700" letterSpacing="-0.02em">
        X–AI
      </text>
      <text x="210" y="234" textAnchor="middle" fill={T.t4}
        fontSize="8" fontFamily="'DM Mono',monospace" letterSpacing="0.16em">
        ACCELERATOR
      </text>

      {/* Floating stat nodes */}
      {/* Node: 88% */}
      <g style={{ animation: 'floatA 4s ease-in-out infinite' }}>
        <rect x="32" y="148" width="72" height="40" rx="8"
          fill={T.surface} stroke={T.violetRim} strokeWidth="0.8" />
        <text x="68" y="167" textAnchor="middle" fill={T.violetHi}
          fontSize="12" fontFamily="'Clash Display','DM Sans',sans-serif" fontWeight="700">88%</text>
        <text x="68" y="181" textAnchor="middle" fill={T.t4}
          fontSize="6.5" fontFamily="'DM Mono',monospace" letterSpacing="0.08em">HIRED</text>
      </g>

      {/* Node: 120+ */}
      <g style={{ animation: 'floatB 5s ease-in-out infinite' }}>
        <rect x="318" y="95" width="80" height="40" rx="8"
          fill={T.surface} stroke={T.emeraldRim} strokeWidth="0.8" />
        <text x="358" y="114" textAnchor="middle" fill={T.emeraldHi}
          fontSize="12" fontFamily="'Clash Display','DM Sans',sans-serif" fontWeight="700">120+</text>
        <text x="358" y="128" textAnchor="middle" fill={T.t4}
          fontSize="6.5" fontFamily="'DM Mono',monospace" letterSpacing="0.08em">EMPLOYERS</text>
      </g>

      {/* Node: 27 countries */}
      <g style={{ animation: 'floatC 6s ease-in-out infinite' }}>
        <rect x="290" y="290" width="90" height="40" rx="8"
          fill={T.surface} stroke={T.amberRim} strokeWidth="0.8" />
        <text x="335" y="309" textAnchor="middle" fill={T.amberHi}
          fontSize="12" fontFamily="'Clash Display','DM Sans',sans-serif" fontWeight="700">27</text>
        <text x="335" y="323" textAnchor="middle" fill={T.t4}
          fontSize="6.5" fontFamily="'DM Mono',monospace" letterSpacing="0.08em">COUNTRIES</text>
      </g>

      {/* Connector lines to core */}
      <line x1="104" y1="168" x2="162" y2="200" stroke="url(#lineGrad1)"
        strokeWidth="0.5" strokeDasharray="3 5" opacity="0.4" />
      <line x1="318" y1="115" x2="258" y2="170" stroke={T.emeraldHi}
        strokeWidth="0.5" strokeDasharray="3 5" opacity="0.3" />
      <line x1="305" y1="302" x2="255" y2="240" stroke={T.amberHi}
        strokeWidth="0.5" strokeDasharray="3 5" opacity="0.3" />

      <style>{`
        @keyframes spin1 { to { transform: rotate(360deg); } }
        @keyframes spin2 { to { transform: rotate(-360deg); } }
        @keyframes spin3 { to { transform: rotate(360deg); } }
        @keyframes floatA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes floatB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes floatC { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
      `}</style>
    </svg>
  )
}

// ─── ANIMATED TRUST TICKER ───────────────────────────────────────────────────
function TrustTicker() {
  const items = [
    'ISO 27001 Certified',
    '₹11.8L Avg India CTC',
    '₹19.2L Avg Global CTC',
    '15,000+ Learners Placed',
    '88% Offer Conversion',
    '120+ Hiring Partners',
    '27 Countries Active',
    'Est. 2019 · MNC Status',
  ]
  const repeated = [...items, ...items]

  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      height: 'clamp(28px,4vh,36px)',
      background: `linear-gradient(90deg, ${T.violet}18, ${T.emerald}10)`,
      borderTop: `1px solid ${T.border}`,
      overflow: 'hidden', display: 'flex', alignItems: 'center',
      zIndex: 5,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 0,
        animation: 'tickerScroll 30s linear infinite',
        whiteSpace: 'nowrap',
      }}>
        {repeated.map((item, i) => (
          <React.Fragment key={i}>
            <span style={{
              fontFamily: FONT_MONO,
              fontSize: 'clamp(0.38rem,0.6vw,0.5rem)',
              color: T.t3,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '0 clamp(16px,3vw,28px)',
            }}>{item}</span>
            <span style={{ color: T.t5, fontSize: '0.5rem' }}>·</span>
          </React.Fragment>
        ))}
      </div>
      <style>{`@keyframes tickerScroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }`}</style>
    </div>
  )
}

// ─── SLIDE 01 ────────────────────────────────────────────────────────────────
export function Slide01({ user }: SlideProps) {
  const first = user?.name ? user.name.split(' ')[0] : null
  const city  = user?.city || null

  return (
    <Slide bg={T.base}>
      {/* Ambient glows */}
      <Glow x="8%"  y="45%" color={T.violet}  size={600} opacity={0.11} />
      <Glow x="72%" y="30%" color={T.emerald}  size={400} opacity={0.06} />

      {/* Thin top accent bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent 0%, ${T.violetHi} 30%, ${T.emeraldHi} 70%, transparent 100%)`,
        zIndex: 3, opacity: 0.6,
      }} />

      {/* Left vertical accent line */}
      <div style={{
        position: 'absolute', top: 'clamp(60px,10vh,90px)', bottom: 'clamp(60px,10vh,90px)',
        left: 'clamp(28px,4vw,52px)', width: 1,
        background: `linear-gradient(to bottom, transparent, ${T.violetHi}50, ${T.emeraldHi}30, transparent)`,
        zIndex: 3,
      }} />

      {/* ── MAIN LAYOUT ── */}
      <div style={{
        flex: 1, display: 'grid',
        gridTemplateColumns: '1fr clamp(260px,40%,480px)',
        gap: 0, overflow: 'hidden',
        paddingBottom: 'clamp(28px,4.5vh,40px)', // space for ticker
      }}>

        {/* LEFT — Content */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(40px,7vh,80px) clamp(28px,5vw,72px) clamp(20px,3vh,40px) clamp(44px,7vw,84px)',
          gap: 'clamp(14px,2.4vh,24px)',
        }}>

          {/* CLC pill */}
          <div className="r1" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: T.emeraldBg, border: `1px solid ${T.emeraldRim}`,
              borderRadius: 100, padding: 'clamp(4px,0.7vh,6px) clamp(10px,1.6vw,16px)',
            }}>
              <div style={{
                width: 6, height: 6, borderRadius: '50%',
                background: T.emeraldHi,
                boxShadow: `0 0 8px ${T.emeraldHi}`,
                animation: 'pulseDot 2s infinite',
              }} />
              <span style={{
                fontFamily: FONT_MONO, fontSize: 'clamp(0.4rem,0.65vw,0.52rem)',
                color: T.emeraldHi, letterSpacing: '0.15em', textTransform: 'uppercase',
              }}>Career Lab Consulting · ISO 27001 · Est. 2019</span>
            </div>
          </div>

          {/* Personalized greeting */}
          {first && (
            <div className="r1" style={{
              display: 'flex', alignItems: 'center', gap: 8,
              fontFamily: FONT_BODY, fontSize: 'clamp(0.6rem,1.1vw,0.8rem)',
              color: T.t3, fontWeight: 300,
            }}>
              <div style={{ width: 16, height: 1, background: T.t4 }} />
              Welcome{city ? ` from ${city}` : ''},{' '}
              <span style={{ color: T.t2, fontWeight: 500 }}>{first}</span>
              {user?.profile ? (
                <> · <span style={{ color: T.violetHi }}>{user.profile}</span></>
              ) : null}
            </div>
          )}

          {/* Primary headline */}
          <div className="r2">
            <h1 style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 'clamp(2rem,5.5vw,5rem)',
              fontWeight: 700,
              lineHeight: 1.0,
              letterSpacing: '-0.04em',
              color: T.t1,
              maxWidth: '13ch',
            }}>
              Build Projects.<br />
              <G from={T.violetHi} to={T.emeraldHi}>Show Proof.</G><br />
              Get Hired.<br />
              <span style={{ color: T.t2, fontWeight: 400, fontSize: '0.62em' }}>Globally.</span>
            </h1>
          </div>

          {/* Sub */}
          <div className="r3" style={{ maxWidth: 'clamp(260px,34ch,400px)' }}>
            <p style={{
              fontFamily: FONT_BODY,
              fontSize: 'clamp(0.6rem,1.1vw,0.82rem)',
              lineHeight: 1.8, color: T.t3, fontWeight: 300,
            }}>
              A <strong style={{ color: T.t2, fontWeight: 500 }}>6-month Real-World Agentic AI Internship Accelerator</strong> — not a course. Build verifiable proof-of-work that 120+ global employers actually trust.
            </p>
          </div>

          {/* Stats row */}
          <div className="r4" style={{
            display: 'flex', gap: 'clamp(20px,4vw,48px)', flexWrap: 'wrap',
          }}>
            {[
              { n: '₹11.8L', l: 'Avg India CTC',    c: T.violetHi },
              { n: '₹19.2L', l: 'Avg Global CTC',   c: T.emeraldHi },
              { n: '88%',    l: 'Offer Conversion',  c: T.amberHi },
              { n: '120+',   l: 'Hiring Partners',   c: T.cyanHi },
            ].map((s) => (
              <div key={s.l}>
                <div style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: 'clamp(1rem,2.2vw,1.8rem)',
                  fontWeight: 700, letterSpacing: '-0.03em',
                  color: s.c, lineHeight: 1,
                }}>{s.n}</div>
                <div style={{
                  fontFamily: FONT_MONO, fontSize: 'clamp(0.34rem,0.52vw,0.44rem)',
                  color: T.t4, letterSpacing: '0.10em',
                  textTransform: 'uppercase', marginTop: 4,
                }}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Badges */}
          <div className="r5" style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            <Badge color={T.violetHi} bg={T.violetBg} rim={T.violetRim}>
              <Award size={8} />&nbsp;Job Guarantee Elite
            </Badge>
            <Badge color={T.emeraldHi} bg={T.emeraldBg} rim={T.emeraldRim}>
              <Shield size={8} />&nbsp;Verified Career Portfolio
            </Badge>
            <Badge color={T.amberHi} bg={T.amberBg} rim={T.amberRim}>
              <Zap size={8} />&nbsp;88% Conversion Rate
            </Badge>
            <Badge color={T.t2} bg={T.white04} rim={T.border}>
              <Globe size={8} />&nbsp;27 Countries Active
            </Badge>
          </div>

          {/* Next batch */}
          <div className="r6">
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: T.amberBg, border: `1px solid ${T.amberRim}`,
              borderRadius: 100, padding: 'clamp(4px,0.6vh,6px) clamp(10px,1.6vw,16px)',
            }}>
              <div style={{
                width: 5, height: 5, borderRadius: '50%',
                background: T.amberHi, animation: 'pulseDot 1.5s infinite',
              }} />
              <span style={{
                fontFamily: FONT_MONO, fontSize: 'clamp(0.38rem,0.6vw,0.5rem)',
                color: T.amberHi, letterSpacing: '0.10em', textTransform: 'uppercase',
              }}>Next Batch · Sat &amp; Sun · 11:00 AM IST · Limited Seats</span>
            </div>
          </div>
        </div>

        {/* RIGHT — Animated orb */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 'clamp(20px,4vh,48px) clamp(16px,3vw,40px)',
          position: 'relative',
        }}>
          <div className="rf" style={{
            width: '100%', maxWidth: 'clamp(200px,36vw,420px)',
            aspectRatio: '1',
          }}>
            <HeroOrb />
          </div>
        </div>
      </div>

      {/* Ticker */}
      <TrustTicker />

      {/* Watermark */}
      <div style={{
        position: 'absolute', bottom: 'clamp(28px,5vh,50px)', right: 'clamp(28px,4vw,52px)',
        fontFamily: FONT_DISPLAY,
        fontSize: 'clamp(5rem,14vw,14rem)',
        fontWeight: 700, color: 'rgba(255,255,255,0.013)',
        letterSpacing: '-0.04em', whiteSpace: 'nowrap',
        pointerEvents: 'none', zIndex: 0, lineHeight: 1,
      }}>INTERNX</div>
    </Slide>
  )
}