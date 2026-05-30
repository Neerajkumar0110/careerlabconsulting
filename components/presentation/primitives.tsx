import React from 'react'
import { Check } from 'lucide-react'
import { T, FONT_DISPLAY, FONT_BODY, FONT_MONO } from './tokens'

// ─── TYPES ──────────────────────────────────────────────────────────────────
export interface UserProfile {
  name: string
  city: string
  email: string
  phone: string
  profile: string
}

export interface SlideProps {
  user: UserProfile
  slideIndex?: number
  totalSlides?: number
}

// ─── SLIDE WRAPPER ───────────────────────────────────────────────────────────
export function Slide({ children, bg = T.base }: { children: React.ReactNode; bg?: string }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: bg, position: 'relative',
      overflow: 'hidden', display: 'flex', flexDirection: 'column',
    }}>
      {/* Architectural grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `
          linear-gradient(${T.white02} 1px, transparent 1px),
          linear-gradient(90deg, ${T.white02} 1px, transparent 1px)
        `,
        backgroundSize: '72px 72px',
        maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 25%, transparent 100%)',
      }} />
      <div style={{
        position: 'relative', zIndex: 2,
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
      }}>
        {children}
      </div>
    </div>
  )
}

// ─── AMBIENT GLOW ────────────────────────────────────────────────────────────
export function Glow({
  x, y, color, size = 480, opacity = 0.08
}: { x: string; y: string; color: string; size?: number; opacity?: number }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      width: size, height: size,
      background: `radial-gradient(circle, ${color} 0%, transparent 65%)`,
      opacity, pointerEvents: 'none',
      transform: 'translate(-50%,-50%)', zIndex: 0,
      filter: 'blur(2px)',
    }} />
  )
}

// ─── EYEBROW LABEL ───────────────────────────────────────────────────────────
export function Eyebrow({
  children, color = T.emeraldHi
}: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      fontFamily: FONT_MONO, fontSize: 'clamp(0.42rem,0.65vw,0.54rem)',
      letterSpacing: '0.22em', textTransform: 'uppercase',
      color, marginBottom: 8,
    }}>
      <div style={{ width: 18, height: 1, background: color, opacity: 0.7 }} />
      {children}
    </div>
  )
}

// ─── GRADIENT TEXT ───────────────────────────────────────────────────────────
export function G({ children, from = T.violetHi, to = T.emeraldHi }: {
  children: React.ReactNode; from?: string; to?: string
}) {
  return (
    <span style={{
      backgroundImage: `linear-gradient(120deg, ${from} 0%, ${to} 100%)`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    }}>
      {children}
    </span>
  )
}

// ─── PILL BADGE ──────────────────────────────────────────────────────────────
export function Badge({
  children, color = T.violetHi, bg = T.violetBg, rim = T.violetRim
}: { children: React.ReactNode; color?: string; bg?: string; rim?: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      fontFamily: FONT_MONO,
      fontSize: 'clamp(0.34rem,0.52vw,0.44rem)',
      letterSpacing: '0.08em',
      padding: 'clamp(3px,0.4vh,5px) clamp(7px,1vw,11px)',
      borderRadius: 100,
      background: bg, color, border: `1px solid ${rim}`,
      whiteSpace: 'nowrap',
    }}>
      {children}
    </span>
  )
}

// ─── CHECK ROW ───────────────────────────────────────────────────────────────
export function CheckRow({ text, color = T.emeraldHi }: { text: string; color?: string }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '4px 0' }}>
      <div style={{
        flexShrink: 0, width: 14, height: 14, borderRadius: '50%',
        background: `${color}15`, border: `1px solid ${color}35`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1,
      }}>
        <Check size={7} color={color} strokeWidth={2.5} />
      </div>
      <span style={{ fontFamily: FONT_BODY, fontSize: 'clamp(0.48rem,0.75vw,0.6rem)', color: T.t2, lineHeight: 1.55 }}>{text}</span>
    </div>
  )
}

// ─── DIVIDER ─────────────────────────────────────────────────────────────────
export function Divider() {
  return <div style={{ width: '100%', height: 1, background: T.border }} />
}

// ─── STAT BLOCK ──────────────────────────────────────────────────────────────
export function StatBlock({ value, label, color = T.violetHi, sub }: {
  value: string; label: string; color?: string; sub?: string
}) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        fontFamily: FONT_DISPLAY,
        fontSize: 'clamp(1.4rem,2.5vw,2.2rem)',
        fontWeight: 700, letterSpacing: '-0.04em',
        backgroundImage: `linear-gradient(135deg, ${color}, ${T.t1})`,
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        lineHeight: 1,
      }}>{value}</div>
      <div style={{
        fontFamily: FONT_MONO,
        fontSize: 'clamp(0.34rem,0.52vw,0.44rem)',
        color: T.t4, letterSpacing: '0.12em',
        textTransform: 'uppercase', marginTop: 4,
      }}>{label}</div>
      {sub && <div style={{
        fontFamily: FONT_MONO,
        fontSize: 'clamp(0.3rem,0.46vw,0.38rem)',
        color: color, letterSpacing: '0.08em', marginTop: 2,
      }}>{sub}</div>}
    </div>
  )
}

// ─── PROGRESS ARC ────────────────────────────────────────────────────────────
export function ProgressArc({ value, color, size = 64, label }: {
  value: number; color: string; size?: number; label: string
}) {
  const r = 26
  const circumference = 2 * Math.PI * r
  const offset = circumference - (value / 100) * circumference

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <svg width={size} height={size} viewBox="0 0 60 60" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="30" cy="30" r={r} fill="none" stroke={`${color}18`} strokeWidth="3" />
        <circle cx="30" cy="30" r={r} fill="none" stroke={color} strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1)' }}
        />
      </svg>
      <div style={{ textAlign: 'center', marginTop: -size * 0.72, marginBottom: size * 0.6 }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(0.6rem,1.1vw,0.85rem)', fontWeight: 700, color, lineHeight: 1 }}>{value}%</div>
        <div style={{ fontFamily: FONT_MONO, fontSize: 'clamp(0.3rem,0.44vw,0.36rem)', color: T.t4, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 2 }}>{label}</div>
      </div>
    </div>
  )
}

// ─── NOISE TEXTURE SVG ────────────────────────────────────────────────────────
export function NoiseBg({ opacity = 0.03 }: { opacity?: number }) {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity, pointerEvents: 'none', zIndex: 1 }} xmlns="http://www.w3.org/2000/svg">
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  )
}

// ─── HEXAGON ICON ─────────────────────────────────────────────────────────────
export function HexIcon({ color, children, size = 36 }: { color: string; children: React.ReactNode; size?: number }) {
  return (
    <div style={{
      width: size, height: size,
      background: `${color}15`,
      border: `1px solid ${color}35`,
      borderRadius: size * 0.28,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
      boxShadow: `0 0 12px ${color}20`,
    }}>
      {children}
    </div>
  )
}

// ─── ANIMATED COUNTER ────────────────────────────────────────────────────────
export function AnimCounter({ value, suffix = '', color = T.t1 }: {
  value: number; suffix?: string; color?: string
}) {
  const [displayed, setDisplayed] = React.useState(0)
  React.useEffect(() => {
    let start = 0
    const duration = 1400
    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayed(Math.floor(eased * value))
      if (progress < 1) requestAnimationFrame(step)
    }
    const raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [value])
  return (
    <span style={{ color, fontFamily: FONT_DISPLAY, fontWeight: 700 }}>
      {displayed}{suffix}
    </span>
  )
}