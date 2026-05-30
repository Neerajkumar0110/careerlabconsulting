'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import {
  ArrowRight, ArrowLeft, ArrowRightCircle, X, ChevronRight,
  Award, Globe, Zap, Shield, TrendingUp, Users, BookOpen,
  Cpu, Layers, Rocket, Brain, Star, Lock, BadgeCheck,
  Building2, Calendar, Check, Target, Clock, GitBranch,
  Workflow, BarChart3, Mail, Phone, MapPin, Send,
  Smartphone, Monitor, Maximize, PlayCircle, RotateCcw,
  AlertCircle, ChevronDown, Link2, Briefcase, Bot,
  Code2, Database, Server, Sparkles,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Slide01 } from '@/components/presentation/Slide01'
import { Slide02 } from '@/components/presentation/Slide02'
import { Slide03 } from '@/components/presentation/Slide03'
import { Slide04 } from '@/components/presentation/Slide04'
import { Slide05 } from '@/components/presentation/Slide05'
import { Slide06 } from '@/components/presentation/Slide06'
import { Slide07 } from '@/components/presentation/Slide07'
import { Slide08 } from '@/components/presentation/Slide08'

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
// Refined palette: fewer accents, used with intention
const T = {
  // Surfaces — strict 3-layer depth system
  base:    '#020408',        // deepest background
  surface: '#080D18',        // card / slide bg
  raised:  '#0E1525',        // elevated element
  border:  'rgba(255,255,255,0.07)',
  borderHi:'rgba(255,255,255,0.13)',

  // Primary accent — violet, used sparingly
  violet:  '#7C3AED',
  violetMid:'#9B6BF7',
  violetHi:'#C4A8FF',
  violetBg:'rgba(124,58,237,0.08)',
  violetRim:'rgba(124,58,237,0.22)',

  // Secondary accent — emerald green (replaces "mint" — more premium)
  emerald: '#10B981',
  emeraldHi:'#34D399',
  emeraldBg:'rgba(16,185,129,0.07)',
  emeraldRim:'rgba(16,185,129,0.20)',

  // Tertiary — amber (used only for Elite/warnings)
  amber:   '#D97706',
  amberHi: '#FBBF24',
  amberBg: 'rgba(217,119,6,0.08)',
  amberRim:'rgba(217,119,6,0.22)',

  // Rose (danger/highlights only)
  rose:    '#F43F5E',
  roseBg:  'rgba(244,63,94,0.08)',

  // Typography scale — 4 levels
  t1: '#F4F6FF',   // Primary headings
  t2: '#BCC4DC',   // Subheadings / supporting
  t3: '#6C7693',   // Body / descriptive
  t4: '#3A4160',   // Ghost / disabled

  // Misc
  white10: 'rgba(255,255,255,0.10)',
  white04: 'rgba(255,255,255,0.04)',
}

// ─── TYPOGRAPHY SCALE (in rem, relative to 16px base) ────────────────────────
// Used via inline fontSize. Everything scales via clamp() for viewport flexibility.
// display: 3–5rem | h1: 2–3rem | h2: 1.4–2rem | h3: 1–1.3rem
// body-lg: 0.95rem | body: 0.825rem | small: 0.7rem | mono: 0.65rem

// ─── CSS INJECTION ────────────────────────────────────────────────────────────
const CSS_INJECT = `
@import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=dm-sans@300,400,500&f[]=dm-mono@400,500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body { overflow: hidden; background: ${T.base}; }

.pres-root {
  font-family: 'DM Sans', sans-serif;
  background: ${T.base};
  color: ${T.t1};
  user-select: none;
}

/* ── Transitions ── */
.slide-enter-right { animation: slideInR 0.5s cubic-bezier(0.22,1,0.36,1) both; }
.slide-enter-left  { animation: slideInL 0.5s cubic-bezier(0.22,1,0.36,1) both; }
.slide-exit-left   { animation: slideOutL 0.4s cubic-bezier(0.55,0,1,0.45) both; }
.slide-exit-right  { animation: slideOutR 0.4s cubic-bezier(0.55,0,1,0.45) both; }

@keyframes slideInR  { from{transform:translateX(6%);opacity:0} to{transform:translateX(0);opacity:1} }
@keyframes slideInL  { from{transform:translateX(-6%);opacity:0} to{transform:translateX(0);opacity:1} }
@keyframes slideOutL { from{transform:translateX(0);opacity:1}   to{transform:translateX(-4%);opacity:0} }
@keyframes slideOutR { from{transform:translateX(0);opacity:1}   to{transform:translateX(4%);opacity:0} }

/* ── Stagger reveal ── */
@keyframes revealUp  { from{transform:translateY(16px);opacity:0} to{transform:translateY(0);opacity:1} }
@keyframes revealFade{ from{opacity:0} to{opacity:1} }
@keyframes scaleIn   { from{transform:scale(0.96);opacity:0} to{transform:scale(1);opacity:1} }
@keyframes pulseDot  { 0%,100%{opacity:1} 50%{opacity:0.35} }
@keyframes rotDevice { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(90deg)} }
@keyframes spinRing  { to{transform:rotate(360deg)} }
@keyframes barGrow   { from{width:0} to{width:var(--w)} }
@keyframes orbitRing { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

.r1 { animation: revealUp 0.55s cubic-bezier(0.22,1,0.36,1) 0.05s both; }
.r2 { animation: revealUp 0.55s cubic-bezier(0.22,1,0.36,1) 0.14s both; }
.r3 { animation: revealUp 0.55s cubic-bezier(0.22,1,0.36,1) 0.23s both; }
.r4 { animation: revealUp 0.55s cubic-bezier(0.22,1,0.36,1) 0.32s both; }
.r5 { animation: revealUp 0.55s cubic-bezier(0.22,1,0.36,1) 0.41s both; }
.r6 { animation: revealUp 0.55s cubic-bezier(0.22,1,0.36,1) 0.50s both; }
.rf { animation: revealFade 0.5s ease 0.08s both; }
.si { animation: scaleIn 0.45s cubic-bezier(0.22,1,0.36,1) both; }

/* ── Interactive states ── */
.lift { transition: transform 0.18s ease, box-shadow 0.18s ease; cursor: default; }
.lift:hover { transform: translateY(-2px); }

button { cursor: pointer; font-family: 'DM Sans', sans-serif; }

/* ── Scrollbar ── */
::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: ${T.violet}50; border-radius: 2px; }

/* ── Portrait lock ── */
@media (orientation: portrait) and (max-width: 768px) {
  .portrait-lock { display: flex !important; }
  .pres-content  { display: none !important; }
}
@media (orientation: landscape), (min-width: 769px) {
  .portrait-lock { display: none !important; }
  .pres-content  { display: flex !important; }
}

input, select, textarea { font-family: 'DM Sans', sans-serif; outline: none; }
input::placeholder, textarea::placeholder { color: ${T.t3}; }
`

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface UserProfile {
  name: string
  city: string
  email: string
  phone: string
  profile: string
}

interface SlideProps {
  user: UserProfile
  slideIndex: number
  totalSlides: number
}

// ─── DESIGN PRIMITIVES ────────────────────────────────────────────────────────

/** Subtle ambient glow — used very sparingly (1–2 per slide max) */
function Glow({ x, y, color, size = 480, opacity = 0.09 }: { x: string; y: string; color: string; size?: number; opacity?: number }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      width: size, height: size,
      background: `radial-gradient(circle, ${color} 0%, transparent 68%)`,
      opacity, pointerEvents: 'none',
      transform: 'translate(-50%,-50%)', zIndex: 0,
      filter: 'blur(1px)',
    }} />
  )
}

/** Eyebrow label — small mono uppercase marker above headings */
function Eyebrow({ children, color = T.emeraldHi }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      fontFamily: "'DM Mono', monospace", fontSize: '0.6rem',
      fontWeight: 500, letterSpacing: '0.20em', textTransform: 'uppercase',
      color, marginBottom: 12,
    }}>
      <div style={{ width: 20, height: 1, background: color, opacity: 0.6 }} />
      {children}
    </div>
  )
}

/** Gradient headline span */
function G({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      backgroundImage: `linear-gradient(125deg, ${T.violetHi} 0%, #D8B4FE 45%, ${T.emeraldHi} 100%)`,
      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
    }}>
      {children}
    </span>
  )
}

/** Pill badge */
function Badge({ children, color = T.violet, bg = T.violetBg, rim = T.violetRim }: {
  children: React.ReactNode; color?: string; bg?: string; rim?: string
}) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      fontFamily: "'DM Mono', monospace", fontSize: '0.58rem', fontWeight: 500,
      letterSpacing: '0.06em', padding: '4px 10px', borderRadius: 100,
      background: bg, color, border: `1px solid ${rim}`,
      whiteSpace: 'nowrap',
    }}>
      {children}
    </span>
  )
}

/** Thin divider */
function Divider({ mt = 0, mb = 0 }: { mt?: number; mb?: number }) {
  return <div style={{ width: '100%', height: 1, background: T.border, margin: `${mt}px 0 ${mb}px` }} />
}

/** Stat card — for key metric callouts */
function StatCard({ value, label, color = T.violetHi }: { value: string; label: string; color?: string }) {
  return (
    <div style={{
      background: T.raised, border: `1px solid ${T.border}`,
      borderRadius: 12, padding: '16px 18px', textAlign: 'center',
    }}>
      <div style={{
        fontFamily: "'Clash Display', sans-serif",
        fontSize: 'clamp(1.1rem, 2.2vw, 1.7rem)',
        fontWeight: 700, color, lineHeight: 1, marginBottom: 6,
        backgroundImage: `linear-gradient(90deg, ${T.violetHi}, ${T.emeraldHi})`,
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      }}>{value}</div>
      <div style={{
        fontFamily: "'DM Mono', monospace", fontSize: '0.55rem',
        color: T.t3, textTransform: 'uppercase', letterSpacing: '0.09em',
      }}>{label}</div>
    </div>
  )
}

/** Check row for feature lists */
function CheckRow({ text, color = T.emeraldHi }: { text: string; color?: string }) {
  return (
    <div style={{ display: 'flex', gap: 9, alignItems: 'flex-start', padding: '5px 0' }}>
      <div style={{
        flexShrink: 0, width: 16, height: 16, borderRadius: '50%',
        background: `${color}15`, border: `1px solid ${color}35`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1,
      }}>
        <Check size={8} color={color} strokeWidth={2.5} />
      </div>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', color: T.t2, lineHeight: 1.55 }}>{text}</span>
    </div>
  )
}

// ─── SLIDE WRAPPER ────────────────────────────────────────────────────────────
function Slide({ children, bg = T.base }: { children: React.ReactNode; bg?: string }) {
  return (
    <div style={{
      width: '100%', height: '100%', background: bg,
      position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Subtle grid texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `linear-gradient(${T.white04} 1px, transparent 1px),
                          linear-gradient(90deg, ${T.white04} 1px, transparent 1px)`,
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)',
      }} />
      <div style={{ position: 'relative', zIndex: 2, width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  )
}

// ─── INTAKE MODAL ─────────────────────────────────────────────────────────────
function IntakeModal({ onComplete }: { onComplete: (u: UserProfile) => void }) {
  const [form, setForm] = useState<UserProfile>({ name: '', city: '', email: '', phone: '', profile: '' })
  const [errors, setErrors] = useState<Partial<UserProfile>>({})
  const [loading, setLoading] = useState(false)

const profiles = [
  'Fresher',
  'Software Developer',
  'Frontend / Backend Developer',
  'Data Analyst',
  'Data Scientist',
  'AI / ML Professional',
  'QA / Test Engineer',
  'Business Analyst',
  'Marketing Professional',
  'Sales Professional',
  'HR Professional',
  'Operations Professional',
  'Finance Professional',
  'Teacher / Educator',
  'Freelancer',
  'Entrepreneur',
  'Non-Tech Professional',
  'Other'
]
  const validate = () => {
    const e: Partial<UserProfile> = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required'
    if (!form.phone.match(/^\+?[\d\s-]{7,15}$/)) e.phone = 'Valid phone required'
    if (!form.city.trim()) e.city = 'Required'
    if (!form.profile) e.profile = 'Select your profile'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = () => {
    if (!validate()) return
    setLoading(true)
    setTimeout(() => { setLoading(false); onComplete(form) }, 900)
  }

  const field = (id: keyof UserProfile): React.CSSProperties => ({
    width: '100%', background: T.raised, border: `1px solid ${errors[id] ? T.rose : T.border}`,
    borderRadius: 10, padding: '11px 14px', color: T.t1,
    fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem',
    transition: 'border-color 0.18s',
  })

  const label: React.CSSProperties = {
    fontFamily: "'DM Mono', monospace", fontSize: '0.55rem', color: T.emeraldHi,
    letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6, display: 'block',
  }

  const errMsg = (id: keyof UserProfile) => errors[id]
    ? <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.5rem', color: T.rose, marginTop: 4, display: 'block' }}>{errors[id]}</span>
    : null

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(2,4,8,0.97)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999, backdropFilter: 'blur(24px)', padding: '4%',
    }}>
      <Glow x="20%" y="30%" color={T.violet} size={500} opacity={0.09} />
      <Glow x="80%" y="70%" color={T.emerald} size={400} opacity={0.07} />

      <div style={{
        width: '100%', maxWidth: 520,
        background: T.surface, border: `1px solid ${T.borderHi}`,
        borderRadius: 20, padding: 'clamp(22px, 4%, 36px)',
        position: 'relative', zIndex: 2,
        animation: 'scaleIn 0.4s cubic-bezier(0.22,1,0.36,1) both',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '5%' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: T.emeraldBg, border: `1px solid ${T.emeraldRim}`, borderRadius: 100, padding: '5px 14px', marginBottom: '4%' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: T.emeraldHi, animation: 'pulseDot 2s infinite' }} />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.55rem', color: T.emeraldHi, letterSpacing: '0.12em', textTransform: 'uppercase' }}>InternX–AI · Personalized Presentation</span>
          </div>
          <h2 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 'clamp(1.2rem, 3vw, 1.9rem)', fontWeight: 700, color: T.t1, lineHeight: 1.1, marginBottom: '2.5%' }}>
            Let's <G>Personalize Your Experience</G>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.73rem', color: T.t3, lineHeight: 1.65 }}>
            Share a few details so we can tailor this presentation to your career goals.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div>
            <label style={label}>Full Name *</label>
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your full name" style={field('name')}
              onFocus={e => (e.target.style.borderColor = T.violet)} onBlur={e => (e.target.style.borderColor = errors.name ? T.rose : T.border)} />
            {errMsg('name')}
          </div>
          <div>
            <label style={label}>City *</label>
            <input value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} placeholder="Your city" style={field('city')}
              onFocus={e => (e.target.style.borderColor = T.violet)} onBlur={e => (e.target.style.borderColor = errors.city ? T.rose : T.border)} />
            {errMsg('city')}
          </div>
          <div>
            <label style={label}>Email Address *</label>
            <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@example.com" style={field('email')}
              onFocus={e => (e.target.style.borderColor = T.violet)} onBlur={e => (e.target.style.borderColor = errors.email ? T.rose : T.border)} />
            {errMsg('email')}
          </div>
          <div>
            <label style={label}>WhatsApp Number *</label>
            <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+91 98765 43210" style={field('phone')}
              onFocus={e => (e.target.style.borderColor = T.violet)} onBlur={e => (e.target.style.borderColor = errors.phone ? T.rose : T.border)} />
            {errMsg('phone')}
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={label}>Your Current Profile *</label>
            <select value={form.profile} onChange={e => setForm(f => ({ ...f, profile: e.target.value }))} style={{ ...field('profile'), cursor: 'pointer' }}
              onFocus={e => (e.target.style.borderColor = T.violet)} onBlur={e => (e.target.style.borderColor = errors.profile ? T.rose : T.border)}>
              <option value="" style={{ background: T.surface, color: T.t3 }}>Select your profile…</option>
              {profiles.map(p => <option key={p} value={p} style={{ background: T.surface, color: T.t1 }}>{p}</option>)}
            </select>
            {errMsg('profile')}
          </div>
        </div>

        <button onClick={submit} disabled={loading} style={{
          width: '100%', marginTop: '5%', padding: '13px',
          borderRadius: 12, background: `linear-gradient(135deg, ${T.violet}, #5B21B6)`,
          border: 'none', fontFamily: "'Clash Display', sans-serif", fontSize: '0.88rem',
          fontWeight: 600, color: '#fff', cursor: loading ? 'wait' : 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s, transform 0.18s',
        }}
          onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = 'scale(1.02)' }}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {loading ? (
            <><div style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spinRing 0.8s linear infinite' }} /> Personalizing your presentation…</>
          ) : (
            <><PlayCircle size={16} /> Start My Personalized Presentation <ArrowRight size={14} /></>
          )}
        </button>

        <p style={{ textAlign: 'center', fontFamily: "'DM Mono', monospace", fontSize: '0.5rem', color: T.t4, marginTop: '3.5%', letterSpacing: '0.06em' }}>
          Your information is secure · We'll also send a copy of this presentation to your email
        </p>
      </div>

      <style>{`@keyframes spinRing { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

// ─── PORTRAIT LOCK ────────────────────────────────────────────────────────────
function PortraitLock() {
  return (
    <div className="portrait-lock" style={{
      position: 'fixed', inset: 0, background: T.base,
      alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', zIndex: 10000, padding: 32,
    }}>
      <Glow x="50%" y="42%" color={T.violet} size={300} opacity={0.12} />
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <div style={{
          width: 64, height: 64, borderRadius: 16,
          background: T.violetBg, border: `1px solid ${T.violetRim}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px', animation: 'rotDevice 2s ease-in-out infinite',
        }}>
          <Smartphone size={28} color={T.violetHi} />
        </div>
        <h3 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 22, fontWeight: 700, color: T.t1, marginBottom: 10 }}>Rotate Your Device</h3>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: T.t3, lineHeight: 1.6, maxWidth: 270, margin: '0 auto 18px' }}>
          This presentation is optimized for landscape mode. Please rotate your device for the best experience.
        </p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <RotateCcw size={13} color={T.emeraldHi} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: T.emeraldHi, letterSpacing: '0.10em', textTransform: 'uppercase' }}>Landscape Mode Required</span>
        </div>
      </div>
    </div>
  )
}

// ─── PROGRESS BAR ─────────────────────────────────────────────────────────────
function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: T.border, zIndex: 50 }}>
      <div style={{
        height: '100%',
        width: `${((current + 1) / total) * 100}%`,
        background: `linear-gradient(90deg, ${T.violet}, ${T.emeraldHi})`,
        transition: 'width 0.5s cubic-bezier(0.22,1,0.36,1)',
      }} />
    </div>
  )
}

// ─── END SCREEN ──────────────────────────────────────────────────────────────
function EndScreen({ user, onClose }: { user: UserProfile; onClose: () => void }) {
  const [sharing, setSharing] = useState(false)
  const [shared, setShared] = useState(false)

  const handleShare = () => {
    setSharing(true)
    setTimeout(() => { setSharing(false); setShared(true) }, 1800)
  }

  const waMsg = encodeURIComponent(`Hi! I just watched the InternX-AI presentation. Please share the detailed PPT and program details. Name: ${user.name}, Email: ${user.email}`)
  const waLink = `https://wa.me/918700236923?text=${waMsg}`

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'rgba(2,4,8,0.97)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 9990, backdropFilter: 'blur(24px)',
    }}>
      <Glow x="25%" y="30%" color={T.violet} size={400} opacity={0.10} />
      <Glow x="75%" y="70%" color={T.emerald} size={350} opacity={0.08} />
      <Glow x="60%" y="18%" color={T.amber}   size={300} opacity={0.07} />

      <div style={{
        maxWidth: 460, width: '90%', textAlign: 'center',
        position: 'relative', zIndex: 2,
        animation: 'scaleIn 0.45s cubic-bezier(0.22,1,0.36,1) both',
      }}>
        {/* Check icon */}
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: `linear-gradient(135deg, ${T.violet}, ${T.emerald})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px', boxShadow: `0 0 48px ${T.violet}35`,
        }}>
          <Check size={30} color="#fff" strokeWidth={2.5} />
        </div>

        <h2 style={{
          fontFamily: "'Clash Display', sans-serif",
          fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
          fontWeight: 700, lineHeight: 1.1, color: T.t1, marginBottom: 12,
        }}>
          {user.name ? `Thank you, ${user.name.split(' ')[0]}!` : 'Thank You!'}
          <br /><G>You're One Step Closer.</G>
        </h2>

        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: T.t3, lineHeight: 1.75, marginBottom: 28 }}>
          "You're just one project away from a global AI career." We'll send you the full presentation deck to review at your own pace.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {!shared ? (
            <button onClick={handleShare} disabled={sharing} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              background: `linear-gradient(135deg, ${T.violet}, #5B21B6)`,
              border: 'none', borderRadius: 12, padding: '13px 24px',
              fontFamily: "'Clash Display', sans-serif", fontSize: '0.82rem', fontWeight: 600,
              color: '#fff', cursor: sharing ? 'wait' : 'pointer', opacity: sharing ? 0.7 : 1,
              transition: 'opacity 0.2s',
            }}>
              {sharing
                ? <><div style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spinRing 0.8s linear infinite' }} /> Sending to {user.email}…</>
                : <><Send size={14} /> Send PPT &amp; PDF to My Email + WhatsApp</>
              }
            </button>
          ) : (
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              background: T.emeraldBg, border: `1px solid ${T.emeraldRim}`,
              borderRadius: 12, padding: '13px 24px',
              fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: T.emeraldHi,
            }}>
              <BadgeCheck size={16} /> Sent to {user.email} &amp; WhatsApp!
            </div>
          )}

          <a href={waLink} target="_blank" rel="noopener noreferrer" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            background: 'rgba(37,211,102,0.10)', border: '1px solid rgba(37,211,102,0.28)',
            borderRadius: 12, padding: '12px 24px',
            fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', fontWeight: 500,
            color: '#25D366', textDecoration: 'none', transition: 'opacity 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat on WhatsApp · +91 8700236923
          </a>

          <a href="#pricing" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            background: `linear-gradient(135deg, ${T.amber}, #D97706)`,
            border: 'none', borderRadius: 12, padding: '12px 24px',
            fontFamily: "'Clash Display', sans-serif", fontSize: '0.8rem', fontWeight: 600,
            color: '#fff', textDecoration: 'none',
          }}>
            <Rocket size={14} /> Enrol Now — Claim Your Spot
          </a>
        </div>

        <button onClick={onClose} style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'none', border: `1px solid ${T.border}`,
          borderRadius: 8, padding: '8px 18px',
          fontFamily: "'DM Mono', monospace", fontSize: '0.55rem',
          color: T.t3, cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase',
          transition: 'border-color 0.18s',
        }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = T.borderHi)}
          onMouseLeave={e => (e.currentTarget.style.borderColor = T.border)}
        >
          <X size={11} /> Close Presentation
        </button>

        <style>{`@keyframes spinRing { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  )
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function InternXPresentation() {
  const [showIntake, setShowIntake] = useState(true)
  const [user, setUser] = useState<UserProfile>({ name: '', city: '', email: '', phone: '', profile: '' })
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
  const [animating, setAnimating] = useState(false)
  const [showEnd, setShowEnd] = useState(false)
  const [started, setStarted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const SLIDES = [Slide01, Slide02, Slide03, Slide04, Slide05, Slide06, Slide07, Slide08]
  const TITLES  = ['Cover','About CLC','Program','Tech Stack','Hiring','Pricing','Outcomes','Get Started']
  const TOTAL   = SLIDES.length

  // Inject CSS
  useEffect(() => {
    const id = 'internx-pres-css'
    if (!document.getElementById(id)) {
      const s = document.createElement('style')
      s.id = id; s.textContent = CSS_INJECT
      document.head.appendChild(s)
    }
    return () => { document.getElementById(id)?.remove() }
  }, [])

  // Keyboard
  useEffect(() => {
    if (!started) return
    const h = (e: KeyboardEvent) => {
      if (['ArrowRight','ArrowDown',' '].includes(e.key)) { e.preventDefault(); goNext() }
      if (['ArrowLeft','ArrowUp'].includes(e.key)) { e.preventDefault(); goPrev() }
      if (e.key === 'Escape') document.exitFullscreen?.()
      if (e.key === 'f' || e.key === 'F') { if (!isFullscreen) enterFullscreen() }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [started, currentSlide, animating, isFullscreen])

  // Touch swipe
  const touchX = useRef(0)
  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX }
  const onTouchEnd = (e: React.TouchEvent) => {
    const d = touchX.current - e.changedTouches[0].clientX
    if (Math.abs(d) > 48) d > 0 ? goNext() : goPrev()
  }

  const ANIM_DURATION = 500

  const goNext = useCallback(() => {
    if (animating) return
    if (currentSlide === TOTAL - 1) { setShowEnd(true); return }
    setAnimating(true)
    setDirection('forward')
    setTimeout(() => { setCurrentSlide(s => s + 1); setAnimating(false) }, ANIM_DURATION)
  }, [animating, currentSlide, TOTAL])

  const goPrev = useCallback(() => {
    if (animating || currentSlide === 0) return
    setAnimating(true)
    setDirection('backward')
    setTimeout(() => { setCurrentSlide(s => s - 1); setAnimating(false) }, ANIM_DURATION)
  }, [animating, currentSlide])

  const jumpTo = useCallback((i: number) => {
    if (animating || i === currentSlide) return
    setAnimating(true)
    setDirection(i > currentSlide ? 'forward' : 'backward')
    setTimeout(() => { setCurrentSlide(i); setAnimating(false) }, ANIM_DURATION)
  }, [animating, currentSlide])

  const enterFullscreen = useCallback(async () => {
    try { await containerRef.current?.requestFullscreen(); setIsFullscreen(true) } catch {}
  }, [])

  useEffect(() => {
    const h = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', h)
    return () => document.removeEventListener('fullscreenchange', h)
  }, [])

  const handleComplete = (u: UserProfile) => {
    setUser(u); setShowIntake(false); setStarted(true)
  }

  const CurrentSlide = SLIDES[currentSlide]
  const props: SlideProps = { user, slideIndex: currentSlide, totalSlides: TOTAL }
  const enterClass = direction === 'forward' ? 'slide-enter-right' : 'slide-enter-left'
  const exitClass  = direction === 'forward' ? 'slide-exit-left'   : 'slide-exit-right'

  if (showIntake) {
    return (
      <div className="pres-root" style={{ minHeight: '100vh', background: T.base }}>
        <style>{CSS_INJECT}</style>
        <PortraitLock />
        <IntakeModal onComplete={handleComplete} />
      </div>
    )
  }

  return (
    <div className="pres-root" style={{ width: '100vw', height: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <style>{CSS_INJECT}</style>
      <PortraitLock />

      {/* 16:9 viewport */}
      <div
        ref={containerRef}
        className="pres-content"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{
          width: '100%', height: '100%',
          aspectRatio: '16 / 9',
          maxWidth: 'min(100vw, 177.78vh)',
          maxHeight: 'min(100vh, 56.25vw)',
          position: 'relative', overflow: 'hidden',
          flexDirection: 'column',
        }}
      >
        {/* Slide area */}
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <div key={currentSlide} className={animating ? exitClass : enterClass} style={{ position: 'absolute', inset: 0 }}>
            <CurrentSlide {...props} />
          </div>
        </div>

        {/* ── TOP HUD ── */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1.2% 2.5%', zIndex: 40,
          background: 'linear-gradient(to bottom, rgba(2,4,8,0.72) 0%, transparent 100%)',
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <img src="./logo.png" alt="InternX-AI Logo" className='w-32' />
          </div>

          {/* Slide title */}
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.52rem', color: T.t3, letterSpacing: '0.10em', textTransform: 'uppercase' }}>
            {TITLES[currentSlide]}
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.52rem', color: T.t3 }}>
              {String(currentSlide + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
            </span>
            {!isFullscreen && (
              <button onClick={enterFullscreen} title="Fullscreen (F)" style={{
                background: T.surface, border: `1px solid ${T.border}`, borderRadius: 6,
                padding: '5px 7px', color: T.t3, display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'color 0.18s, border-color 0.18s',
              }}
                onMouseEnter={e => { e.currentTarget.style.color = T.emeraldHi; e.currentTarget.style.borderColor = T.emeraldRim }}
                onMouseLeave={e => { e.currentTarget.style.color = T.t3; e.currentTarget.style.borderColor = T.border }}
              >
                <Maximize size={11} />
              </button>
            )}
            <button onClick={router.back} title="Exit Presentation (Esc)" className='text-sm' style={{
              background: 'none', border: `1px solid ${T.border}`,
              borderRadius: 6, padding: '5px 7px', color: T.t3, display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'color 0.18s, border-color 0.18s',
            }}>Exit</button>
          </div>
        </div>

        {/* ── NAV DOTS ── */}
        <div style={{
          position: 'absolute', bottom: '2.2%', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: 6, zIndex: 40, alignItems: 'center',
        }}>
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => jumpTo(i)} style={{
              width: i === currentSlide ? 22 : 6, height: 6, borderRadius: 3,
              background: i === currentSlide ? T.emeraldHi : T.t4,
              border: 'none', transition: 'all 0.28s cubic-bezier(0.22,1,0.36,1)',
              cursor: 'pointer', padding: 0,
            }} />
          ))}
        </div>

        {/* ── PROGRESS ── */}
        <ProgressBar current={currentSlide} total={TOTAL} />

        {/* ── PREV ARROW ── */}
        {currentSlide > 0 && (
          <button onClick={goPrev} style={{
            position: 'absolute', left: '1.5%', top: '50%', transform: 'translateY(-50%)',
            background: T.surface, border: `1px solid ${T.border}`,
            borderRadius: '50%',
            width: 'clamp(28px, 4vw, 40px)', height: 'clamp(28px, 4vw, 40px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 40, cursor: 'pointer', transition: 'all 0.18s', backdropFilter: 'blur(8px)',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = T.raised; e.currentTarget.style.borderColor = T.borderHi }}
            onMouseLeave={e => { e.currentTarget.style.background = T.surface; e.currentTarget.style.borderColor = T.border }}
          >
            <ArrowLeft size={13} color={T.t2} />
          </button>
        )}

        {/* ── NEXT ARROW ── */}
        <button onClick={goNext} style={{
          position: 'absolute', right: '1.5%', top: '50%', transform: 'translateY(-50%)',
          background: currentSlide === TOTAL - 1 ? `linear-gradient(135deg, ${T.violet}, #5B21B6)` : T.surface,
          border: currentSlide === TOTAL - 1 ? 'none' : `1px solid ${T.border}`,
          borderRadius: '50%',
          width: 'clamp(28px, 4vw, 40px)', height: 'clamp(28px, 4vw, 40px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 40, cursor: 'pointer', transition: 'all 0.18s', backdropFilter: 'blur(8px)',
        }}
          onMouseEnter={e => { if (currentSlide !== TOTAL - 1) { e.currentTarget.style.background = T.raised; e.currentTarget.style.borderColor = T.borderHi } }}
          onMouseLeave={e => { if (currentSlide !== TOTAL - 1) { e.currentTarget.style.background = T.surface; e.currentTarget.style.borderColor = T.border } }}
        >
          {currentSlide === TOTAL - 1
            ? <ArrowRightCircle size={13} color="#fff" />
            : <ArrowRight size={13} color={T.t2} />
          }
        </button>

        {/* ── END SCREEN ── */}
        {showEnd && <EndScreen user={user} onClose={() => { setShowEnd(false); document.exitFullscreen?.() }} />}
      </div>
    </div>
  )
}