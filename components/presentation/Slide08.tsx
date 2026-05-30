import React, { useState } from 'react'
import { ArrowRight, ChevronRight, Rocket, Lock, Shield, Zap, Globe, BadgeCheck, Send, X } from 'lucide-react'
import { T, FONT_DISPLAY, FONT_BODY, FONT_MONO } from './tokens'
import { Slide, Glow, G } from './primitives'
import type { SlideProps } from './primitives'

export function Slide08({ user }: SlideProps) {
  const first = user.name ? user.name.split(' ')[0] : null
  const [sharing, setSharing] = useState(false)
  const [shared, setShared] = useState(false)

  const handleShare = () => {
    setSharing(true)
    setTimeout(() => { setSharing(false); setShared(true) }, 1800)
  }

  const waMsg = encodeURIComponent(`Hi! I just watched the InternX-AI presentation. Please share the detailed PPT and program details.\nName: ${user.name}\nEmail: ${user.email}\nCity: ${user.city}\nProfile: ${user.profile}`)
  const waLink = `https://wa.me/918700236923?text=${waMsg}`

  // Trust seal SVG
  const TrustSeal = () => (
    <svg viewBox="0 0 60 60" width={52} height={52}>
      <polygon points="30,4 37,16 51,16 41,25 45,39 30,31 15,39 19,25 9,16 23,16" fill={T.amberBg} stroke={T.amberRim} strokeWidth="1" />
      <text x="30" y="32" textAnchor="middle" fill={T.amberHi} fontSize="8" fontFamily="'DM Mono',monospace" fontWeight="700">ISO</text>
    </svg>
  )

  const trustItems = [
    { icon: <Lock size={11} color={T.emeraldHi} />,    text: '100% Money Back',   sub: 'if not placed' },
    { icon: <Shield size={11} color={T.amberHi} />,    text: 'Legal Agreement',   sub: 'signed by Director' },
    { icon: <Zap size={11} color={T.violetHi} />,      text: 'Start in 48 Hours', sub: 'instant onboarding' },
    { icon: <Globe size={11} color={T.t2} />,           text: '100% Remote',       sub: 'India + 26 countries' },
    { icon: <BadgeCheck size={11} color={T.emeraldHi}/>,text:'Lifetime Access',    sub: 'HireX + FreelanceX' },
  ]

  return (
    <Slide bg={T.base}>
      <Glow x="20%" y="40%" color={T.violet} size={700} opacity={0.10} />
      <Glow x="80%" y="55%" color={T.emerald} size={500} opacity={0.07} />
      <Glow x="55%" y="10%" color={T.amber}   size={350} opacity={0.05} />

      {/* Stronger grid on closing slide */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        backgroundImage: `linear-gradient(${T.border} 1px, transparent 1px), linear-gradient(90deg, ${T.border} 1px, transparent 1px)`,
        backgroundSize: '52px 52px', opacity: 0.6,
      }} />

      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(20px,4vw,48px) clamp(40px,10vw,140px)',
        textAlign: 'center', position: 'relative', zIndex: 2,
        gap: 'clamp(10px,1.8vh,18px)',
      }}>

        {/* Urgency badge */}
        <div className="r1">
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: T.roseBg, border: `1px solid ${T.roseRim}`,
            borderRadius: 100, padding: 'clamp(4px,0.8vh,7px) clamp(14px,2.5vw,20px)',
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: T.rose, boxShadow: `0 0 8px ${T.rose}`, animation: 'pulseDot 1.2s infinite' }} />
            <span style={{ fontFamily: FONT_MONO, fontSize: 'clamp(0.44rem,0.8vw,0.6rem)', color: '#FB7185', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Next Batch: Sat &amp; Sun · 11 AM IST · Limited Seats Remaining
            </span>
          </div>
        </div>

        {/* CTA headline — personalized */}
        <div className="r2" style={{ maxWidth: 680 }}>
          <h2 style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 'clamp(1.6rem,4.5vw,3.8rem)',
            fontWeight: 700, lineHeight: 1.0, letterSpacing: '-0.03em', color: T.t1,
          }}>
            {first ? `${first}, one decision` : 'One Decision.'}<br />
            <G>Your Entire Career Changes.</G>
          </h2>
        </div>

        {/* Personalised subtext */}
        <div className="r3" style={{ maxWidth: 480 }}>
          <p style={{ fontFamily: FONT_BODY, fontSize: 'clamp(0.62rem,1.2vw,0.85rem)', lineHeight: 1.8, color: T.t3, fontWeight: 300 }}>
            {user.city ? `Join ${user.city}'s growing cohort of` : 'Join'} 15,000+ learners from 27 countries who have already started their AI journey with CLC.{user.profile ? ` As a ${user.profile}, the AI job market rewards early movers.` : ' The AI job market rewards early movers.'}
          </p>
        </div>

        {/* Primary CTAs */}
        <div className="r4" style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: `linear-gradient(135deg, ${T.violet}, #5B21B6)`,
            border: 'none', borderRadius: 12,
            padding: 'clamp(10px,1.8vh,14px) clamp(18px,3vw,28px)',
            fontFamily: FONT_DISPLAY, fontSize: 'clamp(0.65rem,1.2vw,0.85rem)', fontWeight: 600, color: '#fff',
            cursor: 'pointer', transition: 'transform 0.18s, box-shadow 0.18s',
            boxShadow: `0 4px 24px ${T.violet}30`,
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = `0 8px 32px ${T.violet}45` }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = `0 4px 24px ${T.violet}30` }}
          >
            <Rocket size={14} /> Enrol Now — Secure Your Spot <ArrowRight size={13} />
          </button>
          <a href={waLink} target="_blank" rel="noopener noreferrer" style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'rgba(37,211,102,0.10)', border: '1px solid rgba(37,211,102,0.28)',
            borderRadius: 12, padding: 'clamp(10px,1.8vh,14px) clamp(16px,2.5vw,22px)',
            fontFamily: FONT_DISPLAY, fontSize: 'clamp(0.6rem,1.1vw,0.78rem)', fontWeight: 500, color: '#25D366',
            textDecoration: 'none', transition: 'opacity 0.18s',
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            Book Free Career Call <ChevronRight size={12} />
          </a>
        </div>

        {/* Trust badges row */}
        <div className="r5" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 'clamp(10px,2vw,24px)' }}>
          {trustItems.map((b, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 'clamp(22px,3.5vw,28px)', height: 'clamp(22px,3.5vw,28px)', borderRadius: 7, background: T.surface, border: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{b.icon}</div>
              <div>
                <div style={{ fontFamily: FONT_BODY, fontSize: 'clamp(0.5rem,0.85vw,0.66rem)', fontWeight: 500, color: T.t2, lineHeight: 1.2 }}>{b.text}</div>
                <div style={{ fontFamily: FONT_MONO, fontSize: 'clamp(0.38rem,0.6vw,0.48rem)', color: T.t3, letterSpacing: '0.06em' }}>{b.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact row */}
        <div className="r6" style={{ display: 'flex', gap: 7, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            ['Website', 'careerlabconsulting.com'],
            ['Email',   'info@careerlabconsulting.com'],
            ['Phone',   '+91-8700236923'],
            ['HQ',      'DLF Cyber City, Gurugram'],
          ].map(([l, v]) => (
            <div key={l} style={{
              fontFamily: FONT_MONO, fontSize: 'clamp(0.4rem,0.65vw,0.52rem)', color: T.t3,
              padding: 'clamp(4px,0.7vh,6px) clamp(8px,1.4vw,12px)', borderRadius: 6,
              background: T.surface, border: `1px solid ${T.border}`, letterSpacing: '0.04em',
            }}>
              <span style={{ color: T.emeraldHi, marginRight: 5 }}>{l}:</span>{v}
            </div>
          ))}
        </div>
      </div>

      {/* Watermark */}
      <div style={{
        position: 'absolute', bottom: '2%', left: '50%', transform: 'translateX(-50%)',
        fontFamily: FONT_DISPLAY, fontSize: 'clamp(4rem,14vw,14rem)',
        fontWeight: 700, color: 'rgba(255,255,255,0.012)', letterSpacing: '-0.04em',
        whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none', zIndex: 0,
      }}>INTERNX</div>
    </Slide>
  )
}