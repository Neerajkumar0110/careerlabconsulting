import React from 'react'
import { Check } from 'lucide-react'
import { T, FONT_DISPLAY, FONT_BODY, FONT_MONO } from './tokens'

export interface UserProfile {
  name: string
  city: string
  email: string
  phone: string
  profile: string
}

export interface SlideProps {
  user: UserProfile
  slideIndex: number
  totalSlides: number
}

// ─── GLOW ─────────────────────────────────────────────────────────────────────
export function Glow({ x, y, color, size = 480, opacity = 0.09 }: {
  x: string; y: string; color: string; size?: number; opacity?: number
}) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      width: size, height: size,
      background: `radial-gradient(circle, ${color} 0%, transparent 68%)`,
      opacity, pointerEvents: 'none',
      transform: 'translate(-50%,-50%)', zIndex: 0, filter: 'blur(2px)',
    }} />
  )
}

// ─── GRADIENT TEXT ────────────────────────────────────────────────────────────
export function G({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      backgroundImage: `linear-gradient(125deg, ${T.violetHi} 0%, #D8B4FE 45%, ${T.emeraldHi} 100%)`,
      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
    }}>
      {children}
    </span>
  )
}

// ─── EYEBROW ──────────────────────────────────────────────────────────────────
export function Eyebrow({ children, color = T.emeraldHi }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      fontFamily: FONT_MONO, fontSize: 'clamp(0.45rem, 0.9vw, 0.6rem)',
      fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase',
      color, marginBottom: 10,
    }}>
      <div style={{ width: 18, height: 1, background: color, opacity: 0.7 }} />
      {children}
    </div>
  )
}

// ─── BADGE ────────────────────────────────────────────────────────────────────
export function Badge({ children, color = T.violet, bg = T.violetBg, rim = T.violetRim }: {
  children: React.ReactNode; color?: string; bg?: string; rim?: string
}) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      fontFamily: FONT_MONO, fontSize: 'clamp(0.44rem, 0.75vw, 0.58rem)', fontWeight: 500,
      letterSpacing: '0.05em', padding: '3px 9px', borderRadius: 100,
      background: bg, color, border: `1px solid ${rim}`,
      whiteSpace: 'nowrap',
    }}>
      {children}
    </span>
  )
}

// ─── CHECK ROW ────────────────────────────────────────────────────────────────
export function CheckRow({ text, color = T.emeraldHi }: { text: string; color?: string }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '3px 0' }}>
      <div style={{
        flexShrink: 0, width: 14, height: 14, borderRadius: '50%',
        background: `${color}15`, border: `1px solid ${color}35`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1,
      }}>
        <Check size={7} color={color} strokeWidth={3} />
      </div>
      <span style={{ fontFamily: FONT_BODY, fontSize: 'clamp(0.55rem, 1vw, 0.7rem)', color: T.t2, lineHeight: 1.5 }}>{text}</span>
    </div>
  )
}

// ─── STAT CARD ────────────────────────────────────────────────────────────────
export function StatCard({ value, label, icon }: { value: string; label: string; icon?: React.ReactNode }) {
  return (
    <div style={{
      background: T.raised, border: `1px solid ${T.border}`,
      borderRadius: 10, padding: 'clamp(10px,1.8vw,16px) clamp(8px,1.4vw,14px)',
      textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
    }}>
      {icon && <div style={{ marginBottom: 2 }}>{icon}</div>}
      <div style={{
        fontFamily: FONT_DISPLAY, fontSize: 'clamp(1rem, 2vw, 1.6rem)',
        fontWeight: 700, lineHeight: 1,
        backgroundImage: `linear-gradient(90deg, ${T.violetHi}, ${T.emeraldHi})`,
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      }}>{value}</div>
      <div style={{ fontFamily: FONT_MONO, fontSize: 'clamp(0.42rem, 0.7vw, 0.55rem)', color: T.t3, textTransform: 'uppercase', letterSpacing: '0.09em' }}>{label}</div>
    </div>
  )
}

// ─── DIVIDER ──────────────────────────────────────────────────────────────────
export function Divider({ mt = 0, mb = 0 }: { mt?: number; mb?: number }) {
  return <div style={{ width: '100%', height: 1, background: T.border, margin: `${mt}px 0 ${mb}px` }} />
}

// ─── SLIDE WRAPPER ────────────────────────────────────────────────────────────
export function Slide({ children, bg = T.base }: { children: React.ReactNode; bg?: string }) {
  return (
    <div style={{
      width: '100%', height: '100%', background: bg,
      position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Grid texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 30%, transparent 100%)',
      }} />
      <div style={{ position: 'relative', zIndex: 2, width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  )
}

// ─── INFOGRAPHIC: ORBIT RING ──────────────────────────────────────────────────
export function OrbitRing({ size = 120, color = T.violet, children }: { size?: number; color?: string; children?: React.ReactNode }) {
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg viewBox="0 0 100 100" width={size} height={size} style={{ position: 'absolute', inset: 0 }}>
        <circle cx="50" cy="50" r="46" fill="none" stroke={color} strokeWidth="0.8" strokeOpacity="0.25" strokeDasharray="4 3" />
        <circle cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth="0.5" strokeOpacity="0.15" />
        <circle cx="50" cy="4" r="3.5" fill={color} opacity="0.9" style={{ animation: 'orbitRing 8s linear infinite', transformOrigin: '50px 50px' }} />
        <circle cx="96" cy="50" r="2.5" fill={color} opacity="0.5" style={{ animation: 'orbitRing 5s linear infinite reverse', transformOrigin: '50px 50px' }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </div>
    </div>
  )
}

// ─── INFOGRAPHIC: PROGRESS ARC ────────────────────────────────────────────────
export function ProgressArc({ value, max = 100, color, size = 80, label }: {
  value: number; max?: number; color: string; size?: number; label: string
}) {
  const pct = value / max
  const r = 36, cx = 50, cy = 50
  const circ = 2 * Math.PI * r
  const dash = circ * pct
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={T.raised} strokeWidth="8" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round"
          strokeDashoffset={circ * 0.25} transform="rotate(0)" />
        <text x="50" y="54" textAnchor="middle" fill={color} fontSize="18" fontFamily="'Clash Display',sans-serif" fontWeight="700">{value}</text>
      </svg>
      <div style={{ fontFamily: FONT_MONO, fontSize: '0.5rem', color: T.t3, textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'center' }}>{label}</div>
    </div>
  )
}

// ─── INFOGRAPHIC: BAR CHART ───────────────────────────────────────────────────
export function BarChart({ bars }: { bars: { label: string; value: number; color: string; prefix?: string }[] }) {
  const max = Math.max(...bars.map(b => b.value))
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: '100%' }}>
      {bars.map((b, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 1 }}>
          <div style={{ fontFamily: FONT_MONO, fontSize: '0.5rem', color: b.color, fontWeight: 600, whiteSpace: 'nowrap' }}>
            {b.prefix}{b.value}
          </div>
          <div style={{ width: '100%', borderRadius: '4px 4px 0 0', background: `${b.color}20`, border: `1px solid ${b.color}35`, overflow: 'hidden', height: 80 }}>
            <div style={{
              width: '100%', background: `linear-gradient(to top, ${b.color}, ${b.color}80)`,
              height: `${(b.value / max) * 100}%`, borderRadius: '4px 4px 0 0',
              marginTop: 'auto', display: 'block',
              animation: 'barGrow 1s cubic-bezier(0.22,1,0.36,1) both',
              transformOrigin: 'bottom',
            }} />
          </div>
          <div style={{ fontFamily: FONT_MONO, fontSize: '0.44rem', color: T.t3, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 1.2 }}>{b.label}</div>
        </div>
      ))}
    </div>
  )
}

// ─── PIPELINE NODE ────────────────────────────────────────────────────────────
export function PipelineNode({ label, sub, color, index }: { label: string; sub: string; color: string; index: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, flexShrink: 0 }}>
      <div style={{
        background: T.surface, border: `1px solid ${T.border}`,
        borderRadius: 8, padding: 'clamp(8px,1.4vw,12px) clamp(8px,1.2vw,12px)',
        textAlign: 'center', minWidth: 'clamp(70px,10vw,100px)', position: 'relative',
        transition: 'border-color 0.2s',
      }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = color)}
        onMouseLeave={e => (e.currentTarget.style.borderColor = T.border)}
      >
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: color, margin: '0 auto 6px', boxShadow: `0 0 10px ${color}` }} />
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(0.5rem, 0.9vw, 0.65rem)', fontWeight: 600, color: T.t1, marginBottom: 2 }}>{label}</div>
        <div style={{ fontFamily: FONT_MONO, fontSize: 'clamp(0.38rem, 0.65vw, 0.48rem)', color: T.t3 }}>{sub}</div>
        <div style={{ position: 'absolute', top: 4, right: 6, fontFamily: FONT_MONO, fontSize: '0.42rem', color: T.t4 }}>0{index + 1}</div>
      </div>
    </div>
  )
}