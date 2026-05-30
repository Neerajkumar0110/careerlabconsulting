'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useAnimationFrame } from 'framer-motion'

/* ═══════════════════════════════════════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════════════════════════════════════ */
const T = {
  void:    '#03040A',
  hi:      '#F0F2FF',
  mid:     '#A9AFCA',
  muted:   '#6B7194',
  ghost:   '#3E4460',
  glass:   'rgba(255,255,255,0.03)',
  line:    'rgba(255,255,255,0.07)',
  display: "'Syne', sans-serif",
  body:    "'DM Sans', sans-serif",
  mono:    "'DM Mono', monospace",
  violet:  '#7C3AED',
  mint:    '#10F5A0',
  gold:    '#F0A500',
  cyan:    '#06B6D4',
  purple:  '#A855F7',
}

/* ═══════════════════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════════════════ */
export const ECO_NODES = [
  {
    id: 'training',
    icon: null,
    svgIcon: 'graduation',
    name: 'Training & Internships',
    tag: 'InternX · AI',
    scheme: 'violet' as const,
    pos: { left: '3%', top: '8%' },
    desc: 'The talent factory. Students build real projects, minting verified credentials that flow into HireX and FreelanceX.',
  },
  {
    id: 'hirex',
    icon: null,
    svgIcon: 'building',
    name: 'HireX',
    tag: 'Placement Portal',
    scheme: 'mint' as const,
    pos: { right: '0%', top: '8%' },
    desc: '120+ global companies source AI talent here. Graduate placements fund the training cycle and validate AI Consulting quality.',
  },
  {
    id: 'consult',
    icon: null,
    svgIcon: 'circuit',
    name: 'AI Consulting & Dev',
    tag: 'Enterprise AI',
    scheme: 'red' as const,
    pos: { left: '1%', top: '40%' },
    desc: 'Enterprise briefs become live student projects. Real client problems strengthen the curriculum and generate SaaS product ideas.',
  },
  {
    id: 'freelance',
    icon: null,
    svgIcon: 'briefcase',
    name: 'FreelanceX',
    tag: 'Earn While Learning',
    scheme: 'gold' as const,
    pos: { left: '3%', bottom: '6%' },
    desc: 'Learners earn from real freelance AI work — offsetting fees while delivering projects that inform consulting and SaaS arms.',
  },
  {
    id: 'saas',
    icon: null,
    svgIcon: 'cube',
    name: 'SaaS Products',
    tag: 'HireX',
    scheme: 'cyan' as const,
    pos: { right: '0%', bottom: '6%' },
    desc: 'HireX portal, AigenX Coach — built from consulting insights and used by the training arm, closing every loop.',
  },
]

export const SCHEME_TOKENS = {
  violet: { bg: 'rgba(124,58,237,0.08)', border: 'rgba(124,58,237,0.35)', iconBg: 'rgba(124,58,237,0.15)', iconBorder: 'rgba(124,58,237,0.3)', tag: '#A78BFA', tagBg: 'rgba(124,58,237,0.10)', tagBorder: 'rgba(124,58,237,0.35)', glow: 'rgba(124,58,237,0.50)', accent: '#7C3AED', cardLeft: '#7C3AED', particle: '#A78BFA' },
  mint:   { bg: 'rgba(16,245,160,0.06)', border: 'rgba(16,245,160,0.28)', iconBg: 'rgba(16,245,160,0.10)', iconBorder: 'rgba(16,245,160,0.25)', tag: '#10F5A0', tagBg: 'rgba(16,245,160,0.08)', tagBorder: 'rgba(16,245,160,0.30)', glow: 'rgba(16,245,160,0.40)', accent: '#10F5A0', cardLeft: '#10F5A0', particle: '#10F5A0' },
  purple: { bg: 'rgba(168,85,247,0.07)', border: 'rgba(168,85,247,0.30)', iconBg: 'rgba(168,85,247,0.12)', iconBorder: 'rgba(168,85,247,0.28)', tag: '#C4B5FD', tagBg: 'rgba(168,85,247,0.08)', tagBorder: 'rgba(168,85,247,0.32)', glow: 'rgba(168,85,247,0.45)', accent: '#A855F7', cardLeft: '#A855F7', particle: '#C4B5FD' },
  gold:   { bg: 'rgba(240,165,0,0.07)', border: 'rgba(240,165,0,0.28)', iconBg: 'rgba(240,165,0,0.12)', iconBorder: 'rgba(240,165,0,0.25)', tag: '#F0A500', tagBg: 'rgba(240,165,0,0.08)', tagBorder: 'rgba(240,165,0,0.30)', glow: 'rgba(240,165,0,0.45)', accent: '#F0A500', cardLeft: '#F0A500', particle: '#FCD34D' },
  cyan:   { bg: 'rgba(6,182,212,0.07)', border: 'rgba(6,182,212,0.28)', iconBg: 'rgba(6,182,212,0.10)', iconBorder: 'rgba(6,182,212,0.25)', tag: '#06B6D4', tagBg: 'rgba(6,182,212,0.08)', tagBorder: 'rgba(6,182,212,0.30)', glow: 'rgba(6,182,212,0.45)', accent: '#06B6D4', cardLeft: '#06B6D4', particle: '#22D3EE' },
  orange: { bg: 'rgba(240,165,0,0.06)', border: 'rgba(240,165,0,0.25)', iconBg: 'rgba(240,165,0,0.10)', iconBorder: 'rgba(240,165,0,0.20)', tag: '#FCD34D', tagBg: 'rgba(240,165,0,0.08)', tagBorder: 'rgba(240,165,0,0.30)', glow: 'rgba(240,165,0,0.40)', accent: '#F0A500', cardLeft: '#F0A500', particle: '#FCD34D' },
  blue:  { bg: 'rgba(6,182,212,0.06)', border: 'rgba(6,182,212,0.25)', iconBg: 'rgba(6,182,212,0.10)', iconBorder: 'rgba(6,182,212,0.20)', tag: '#22D3EE', tagBg: 'rgba(6,182,212,0.08)', tagBorder: 'rgba(6,182,212,0.30)', glow: 'rgba(6,182,212,0.40)', accent: '#06B6D4', cardLeft: '#06B6D4', particle: '#22D3EE' },
  red:   { bg: 'rgba(255,0,0,0.06)', border: 'rgba(255,0,0,0.25)', iconBg: 'rgba(255,0,0,0.10)', iconBorder: 'rgba(255,0,0,0.20)', tag: '#F87171', tagBg: 'rgba(255,0,0,0.08)', tagBorder: 'rgba(255,0,0,0.30)', glow: 'rgba(255,0,0,0.40)', accent: '#EF4444', cardLeft: '#EF4444', particle: '#F87171' },
}

/* ═══════════════════════════════════════════════════════════════════════════
   NODE → CENTER BEZIER PATHS (viewBox 900×540)
   Each node card sits in a 150px wide column on left/right at specific Y.
   Center hub is at (450, 270).
═══════════════════════════════════════════════════════════════════════════ */
const NODE_PATHS: Record<string, { d: string; color: string; label: string; labelPos: { x: number; y: number }; reverse?: boolean }> = {
  // Training (left, top) → center
  training: {
    d: 'M 72 90 C 240 90 300 200 450 270',
    color: '#7C3AED',
    label: 'Trained talent',
    labelPos: { x: 245, y: 145 },
  },
  // HireX (right, top) → center
  hirex: {
    d: 'M 848 90 C 660 90 600 200 450 270',
    color: '#10F5A0',
    label: 'Placed graduates',
    labelPos: { x: 590, y: 145 },
  },
  // Consult (left, mid) → center
  consult: {
    d: 'M 52 270 C 260 270 350 270 450 270',
    color: '#ff0000',
    label: 'Live projects',
    labelPos: { x: 265, y: 250 },
  },
  // Freelance (left, bottom) → center
  freelance: {
    d: 'M 72 450 C 240 450 300 340 450 270',
    color: '#F0A500',
    label: 'Freelance output',
    labelPos: { x: 245, y: 395 },
  },
  // SaaS (right, bottom) → center
  saas: {
    d: 'M 848 450 C 660 450 600 340 450 270',
    color: '#06B6D4',
    label: 'Product insights',
    labelPos: { x: 585, y: 395 },
  },
}

/* ═══════════════════════════════════════════════════════════════════════════
   LEGEND
═══════════════════════════════════════════════════════════════════════════ */
const LEGEND = [
  { color: '#7C3AED', label: 'Talent flow' },
  { color: '#10F5A0', label: 'Placement flow' },
  { color: '#A855F7', label: 'Project flow' },
  { color: '#F0A500', label: 'Revenue flow' },
  { color: '#06B6D4', label: 'Product insights' },
]

/* ═══════════════════════════════════════════════════════════════════════════
   SVG ICONS (no emojis)
═══════════════════════════════════════════════════════════════════════════ */
function NodeIcon({ type, color, size = 18 }: { type: string; color: string; size?: number }) {
  const s = { width: size, height: size, strokeWidth: 1.6, stroke: color, fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  switch (type) {
    case 'graduation':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3.333 1.667 8.667 1.667 12 0v-5"/>
        </svg>
      )
    case 'building':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 22V12h6v10M9 7h1M14 7h1M9 11h1M14 11h1"/>
        </svg>
      )
    case 'circuit':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <rect x="9" y="9" width="6" height="6" rx="1"/><path d="M3 12h6M15 12h6M12 3v6M12 15v6M6 6l3 3M15 15l3 3M15 9l3-3M6 18l3-3"/>
        </svg>
      )
    case 'briefcase':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M12 12v.01M8 12h8"/>
        </svg>
      )
    case 'cube':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="m3.27 6.96 8.73 5.05 8.73-5.05M12 22.08V12"/>
        </svg>
      )
    default:
      return null
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   ANIMATED PARTICLES ALONG SVG PATH
═══════════════════════════════════════════════════════════════════════════ */
interface Particle {
  id: number
  progress: number
  speed: number
  size: number
  opacity: number
}

function useParticles(count = 4, speed = 0.0012) {
  const [particles, setParticles] = useState<Particle[]>(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      progress: i / count,
      speed: speed + Math.random() * speed * 0.5,
      size: 2.5 + Math.random() * 1.5,
      opacity: 0.6 + Math.random() * 0.4,
    }))
  )

  useAnimationFrame(() => {
    setParticles(prev =>
      prev.map(p => ({
        ...p,
        progress: p.progress >= 1 ? 0 : p.progress + p.speed,
      }))
    )
  })

  return particles
}

function getPointOnPath(svgRef: SVGPathElement | null, progress: number): { x: number; y: number } | null {
  if (!svgRef) return null
  try {
    const len = svgRef.getTotalLength()
    const pt = svgRef.getPointAtLength(progress * len)
    return { x: pt.x, y: pt.y }
  } catch {
    return null
  }
}

function ParticlesOnPath({ pathEl, color, active }: { pathEl: SVGPathElement | null; color: string; active: boolean }) {
  const particles = useParticles(5, 0.0015)

  if (!active) return null

  return (
    <>
      {particles.map(p => {
        const pt = getPointOnPath(pathEl, p.progress)
        if (!pt) return null
        return (
          <circle
            key={p.id}
            cx={pt.x}
            cy={pt.y}
            r={p.size}
            fill={color}
            opacity={p.opacity * (0.4 + p.progress * 0.6)}
            style={{ filter: `drop-shadow(0 0 4px ${color})` }}
          />
        )
      })}
    </>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   ROTATING GRADIENT BORDER HUB
═══════════════════════════════════════════════════════════════════════════ */
function RotatingHub({ hovered }: { hovered: string | null }) {
  const [angle, setAngle] = useState(0)
  useAnimationFrame((_, delta) => setAngle(a => (a + delta * 0.04) % 360))

  return (
    <div style={{ position: 'relative', width: 120, height: 120 }}>
      {/* Outer rotating gradient ring */}
      <div
        style={{
          position: 'absolute',
          inset: -3,
          borderRadius: '50%',
          background: `conic-gradient(from ${angle}deg, #7C3AED, #10F5A0, #06B6D4, #F0A500, #A855F7, #7C3AED)`,
          padding: 2,
        }}
      >
        <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#0A0B12' }} />
      </div>

      {/* Pulse rings */}
      {[0, 0.9].map((delay, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 140 + i * 30,
            height: 140 + i * 30,
            borderRadius: '50%',
            border: `1px solid rgba(124,58,237,${0.35 - i * 0.18})`,
            animation: `eco-pulse-ring 2.8s ease-out ${delay}s infinite`,
            pointerEvents: 'none',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Hub content */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: 'linear-gradient(145deg, #0F0A1E 0%, #0A0514 50%, #060A18 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
          boxShadow: hovered
            ? '0 0 60px rgba(124,58,237,0.5), inset 0 1px 0 rgba(255,255,255,0.1)'
            : '0 0 30px rgba(124,58,237,0.25), inset 0 1px 0 rgba(255,255,255,0.06)',
          transition: 'box-shadow 0.4s ease',
        }}
      >
        <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="url(#hubGrad)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <defs>
            <linearGradient id="hubGrad" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#A78BFA" /><stop offset="1" stopColor="#10F5A0" />
            </linearGradient>
          </defs>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
        <div style={{ fontFamily: T.display, fontSize: 9.5, fontWeight: 700, color: '#E8E8FF', letterSpacing: '0.04em', textAlign: 'center', lineHeight: 1.3 }}>
          Career Lab<br />Consulting
        </div>
        <div style={{ fontFamily: T.mono, fontSize: 7.5, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          Core Engine
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   MOBILE VERTICAL TIMELINE
═══════════════════════════════════════════════════════════════════════════ */
function MobileTimeline() {
  return (
    <div style={{ position: 'relative', padding: '0 20px' }}>
      {/* Vertical line */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: 0,
        bottom: 0,
        width: 1,
        background: 'linear-gradient(to bottom, transparent, rgba(124,58,237,0.5) 10%, rgba(6,182,212,0.5) 90%, transparent)',
        transform: 'translateX(-50%)',
      }} />

      {ECO_NODES.map((node, i) => {
        const s = SCHEME_TOKENS[node.scheme]
        const isLeft = i % 2 === 0
        return (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex',
              justifyContent: isLeft ? 'flex-start' : 'flex-end',
              marginBottom: 32,
              position: 'relative',
            }}
          >
            {/* Connector dot */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: 20,
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: s.accent,
              border: `2px solid ${T.void}`,
              boxShadow: `0 0 12px ${s.glow}`,
              transform: 'translateX(-50%)',
              zIndex: 2,
            }} />

            {/* Card */}
            <div style={{
              width: 'calc(50% - 20px)',
              background: s.bg,
              border: `0.5px solid ${s.border}`,
              borderRadius: 12,
              padding: '14px 16px',
              borderLeft: isLeft ? `2px solid ${s.cardLeft}` : undefined,
              borderRight: !isLeft ? `2px solid ${s.cardLeft}` : undefined,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 8,
                  background: s.iconBg, border: `0.5px solid ${s.iconBorder}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <NodeIcon type={node.svgIcon} color={s.accent} size={15} />
                </div>
                <div style={{ fontFamily: T.display, fontSize: 12, fontWeight: 600, color: T.hi, lineHeight: 1.25 }}>{node.name}</div>
              </div>
              <span style={{
                display: 'inline-block',
                fontFamily: T.mono, fontSize: 8, letterSpacing: '0.07em', textTransform: 'uppercase',
                padding: '2px 7px', borderRadius: 100,
                background: s.tagBg, color: s.tag, border: `0.5px solid ${s.tagBorder}`,
                marginBottom: 8,
              }}>{node.tag}</span>
              <div style={{ fontFamily: T.body, fontSize: 11.5, color: T.muted, lineHeight: 1.65 }}>{node.desc}</div>
            </div>
          </motion.div>
        )
      })}

      {/* Center hub (mobile) */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '-16px 0' }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 30px rgba(124,58,237,0.4)',
          zIndex: 3, position: 'relative',
        }}>
          <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="white" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   DESKTOP DIAGRAM
═══════════════════════════════════════════════════════════════════════════ */
function DesktopDiagram({ hovered, setHovered }: { hovered: string | null; setHovered: (id: string | null) => void }) {
  const pathRefs = useRef<Record<string, SVGPathElement | null>>({})
  const [pathEls, setPathEls] = useState<Record<string, SVGPathElement | null>>({})

  // After mount, sync refs to state so particles can use them
  useEffect(() => {
    setPathEls({ ...pathRefs.current })
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: 540 }}>

      {/* SVG layer: paths + particles */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', zIndex: 2 }}
        viewBox="0 0 900 540"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {Object.entries(NODE_PATHS).map(([id, p]) => (
            <marker key={id} id={`arr-${id}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M2 1L8 5L2 9" fill="none" stroke={p.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </marker>
          ))}
          <filter id="glow-sm">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Paths */}
        {Object.entries(NODE_PATHS).map(([id, p]) => {
          const isActive = true
          return (
            <g key={id}>
              {/* Glow path (visible when active) */}
              <path
                d={p.d}
                fill="none"
                stroke={p.color}
                strokeWidth={6}
                opacity={isActive ? 0.18 : 0}
                style={{ transition: 'opacity 0.3s ease', filter: 'blur(6px)' }}
              />
              {/* Main path */}
              <path
                ref={el => { pathRefs.current[id] = el }}
                d={p.d}
                fill="none"
                stroke={p.color}
                strokeWidth={isActive ? 1.8 : 1}
                strokeDasharray={isActive ? 'none' : '6 5'}
                opacity={isActive ? 0.9 : 0.45}
                markerEnd={`url(#arr-${id})`}
                style={{ transition: 'opacity 0.3s ease, stroke-width 0.3s ease', animation: isActive ? 'none' : `eco-dash 3s linear infinite` }}
              />
            </g>
          )
        })}

        {/* Particles (rendered on top) */}
        {Object.entries(NODE_PATHS).map(([id, p]) => (
          <ParticlesOnPath
            key={id}
            pathEl={pathEls[id] ?? null}
            color={p.color}
            active={true}
          />
        ))}

        {/* Flow labels */}
        {Object.entries(NODE_PATHS).map(([id, p]) => {
          const isActive = true
          return (
            <g key={`label-${id}`} style={{ opacity: isActive ? 1 : 0, transition: 'opacity 0.3s ease', pointerEvents: 'none' }}>
              <rect
                x={p.labelPos.x - 8}
                y={p.labelPos.y - 12}
                width={p.label.length * 6.2 + 8}
                height={18}
                rx={9}
                fill="rgba(3,4,10,0.9)"
                stroke={p.color}
                strokeWidth={0.5}
                strokeOpacity={0.6}
              />
              <text
                x={p.labelPos.x}
                y={p.labelPos.y}
                fontFamily={T.mono}
                fontSize={9}
                fill={p.color}
                letterSpacing="0.06em"
                textAnchor="start"
              >
                {p.label}
              </text>
            </g>
          )
        })}
      </svg>

      {/* Center Hub */}
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
        <RotatingHub hovered={hovered} />
      </div>

      {/* Division Node Cards */}
      {ECO_NODES.map(node => {
        const s = SCHEME_TOKENS[node.scheme]
        const isHov = true;
        return (
          <motion.div
            key={node.id}
            onHoverStart={() => setHovered(node.id)}
            onHoverEnd={() => setHovered(null)}
            whileHover={{ scale: 1.07 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'absolute', zIndex: 5, cursor: 'pointer', ...node.pos }}
          >
            <div style={{
              width: 148,
              padding: '16px 14px',
              borderRadius: 16,
              background: isHov
                ? `linear-gradient(145deg, ${s.bg}, rgba(0,0,0,0.3))`
                : s.bg,
              border: `0.5px solid ${isHov ? s.accent : s.border}`,
              boxShadow: isHov
                ? `0 0 0 1px ${s.accent}40, 0 8px 40px ${s.glow}, inset 0 1px 0 rgba(255,255,255,0.06)`
                : 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              transition: 'border-color 0.25s, box-shadow 0.25s, background 0.25s',
              backdropFilter: 'blur(12px)',
            }}>
              {/* Inner glow sweep */}
              {isHov && (
                <div style={{
                  position: 'absolute', inset: 0, borderRadius: 16,
                  background: `radial-gradient(ellipse at 50% 100%, ${s.accent}18, transparent 60%)`,
                  pointerEvents: 'none',
                }} />
              )}

              {/* Icon */}
              <div style={{
                width: 42, height: 42, borderRadius: 12,
                background: isHov ? s.iconBg : `${s.iconBg}88`,
                border: `0.5px solid ${isHov ? s.accent : s.iconBorder}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.25s, border-color 0.25s',
                boxShadow: isHov ? `0 0 16px ${s.glow}` : 'none',
              }}>
                <NodeIcon type={node.svgIcon} color={isHov ? s.accent : s.tag} size={18} />
              </div>

              {/* Name */}
              <div style={{ fontFamily: T.display, fontSize: 11.5, fontWeight: 600, color: T.hi, letterSpacing: '0.01em', lineHeight: 1.3 }}>
                {node.name}
              </div>

              {/* Tag */}
              <span style={{
                fontFamily: T.mono, fontSize: 8, letterSpacing: '0.07em', textTransform: 'uppercase',
                padding: '3px 8px', borderRadius: 100,
                background: isHov ? s.tagBg : 'rgba(255,255,255,0.03)',
                color: isHov ? s.tag : T.muted,
                border: `0.5px solid ${isHov ? s.tagBorder : 'rgba(255,255,255,0.08)'}`,
                transition: 'all 0.25s',
              }}>
                {node.tag}
              </span>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   GLOBAL KEYFRAMES
═══════════════════════════════════════════════════════════════════════════ */
const KEYFRAMES = `
  
  @keyframes eco-pulse-ring {
    0% { transform: translate(-50%,-50%) scale(1); opacity: .7 }
    100% { transform: translate(-50%,-50%) scale(1.55); opacity: 0 }
  }
  @keyframes eco-dash {
    from { stroke-dashoffset: 200 }
    to { stroke-dashoffset: 0 }
  }
  @keyframes eco-rotate {
    from { transform: rotate(0deg) }
    to { transform: rotate(360deg) }
  }
  @keyframes eco-float-in {
    from { opacity: 0; transform: translateY(24px) }
    to { opacity: 1; transform: translateY(0) }
  }
  @keyframes eco-shimmer {
    0%, 100% { opacity: .3 }
    50% { opacity: .7 }
  }
`

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════════════════════ */
export function Ecosystem() {
  const [hovered, setHovered] = useState<string | null>('null')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Inject keyframes once
  useEffect(() => {
    if (document.getElementById('eco-kf')) return
    const s = document.createElement('style')
    s.id = 'eco-kf'
    s.textContent = KEYFRAMES
    document.head.appendChild(s)
  }, [])

  return (
    <section
      id="ecosystem"
      style={{
        position: 'relative',
        background: T.void,
        overflow: 'hidden',
        padding: isMobile ? '80px 0 100px' : '110px 0 130px',
        fontFamily: T.body,
      }}
    >
      {/* Background orbs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', left: '8%', top: '20%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', right: '8%', top: '55%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,245,160,0.05) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', left: '40%', bottom: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(240,165,0,0.04) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        {/* Grid pattern */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        }} />
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 2 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: T.mono, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: T.muted, marginBottom: 20,
            padding: '6px 14px', borderRadius: 100,
            border: '0.5px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.03)',
          }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#7C3AED', boxShadow: '0 0 8px #7C3AED', animation: 'eco-shimmer 2s ease infinite' }} />
            Interdependent Business Ecosystem
          </div>

          <h2 style={{
            fontFamily: T.display, fontWeight: 800,
            fontSize: isMobile ? 36 : 56,
            lineHeight: 1.05, letterSpacing: '-0.02em',
            color: T.hi, margin: '0 0 20px',
          }}>
            Five Divisions.{' '}
            <span style={{
              background: 'linear-gradient(135deg, #7C3AED, #10F5A0 50%, #06B6D4)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              One Unified Engine.
            </span>
          </h2>

          <div style={{ width: 48, height: 2, background: 'linear-gradient(90deg, #7C3AED, #10F5A0)', borderRadius: 2, marginBottom: 24 }} />

          <p style={{
            fontFamily: T.body, fontSize: 15.5, lineHeight: 1.8,
            color: T.mid, fontWeight: 300, maxWidth: 520, margin: '0 0 56px',
          }}>
            Each division feeds the others — talent, revenue, products and proof-of-work flow across all five in a self-reinforcing cycle that compounds over time.
          </p>
        </motion.div>

        {/* Diagram — desktop or mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.65 }}
        >
          {isMobile ? (
            <MobileTimeline />
          ) : (
            <DesktopDiagram hovered={hovered} setHovered={setHovered} />
          )}
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.5 }}
          style={{
            display: 'flex', flexWrap: 'wrap', gap: 16,
            justifyContent: 'center', marginTop: 40,
          }}
        >
          {LEGEND.map(l => (
            <div key={l.label} style={{
              display: 'flex', alignItems: 'center', gap: 7,
              fontFamily: T.mono, fontSize: 10, color: T.muted, letterSpacing: '0.04em',
            }}>
              <div style={{ width: 20, height: 2, background: l.color, borderRadius: 1, flexShrink: 0, boxShadow: `0 0 6px ${l.color}80` }} />
              {l.label}
            </div>
          ))}
        </motion.div>

        {/* Description Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(5, 1fr)',
            gap: 10,
            marginTop: 48,
          }}
        >
          {ECO_NODES.map((node, i) => {
            const s = SCHEME_TOKENS[node.scheme]
            const isHov = true;
            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 + i * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                onHoverStart={() => setHovered(node.id)}
                onHoverEnd={() => setHovered(null)}
                style={{
                  background: isHov ? s.bg : 'rgba(255,255,255,0.02)',
                  border: `0.5px solid ${isHov ? s.border : T.line}`,
                  borderRadius: 12,
                  padding: '16px 16px',
                  borderLeft: `2px solid ${isHov ? s.cardLeft : 'transparent'}`,
                  cursor: 'default',
                  transition: 'all 0.25s ease',
                  boxShadow: isHov ? `0 4px 24px ${s.glow}40` : 'none',
                }}
              >
                <div style={{
                  fontFamily: T.display, fontSize: 12, fontWeight: 600,
                  color: isHov ? T.hi : T.mid,
                  marginBottom: 6,
                  display: 'flex', alignItems: 'center', gap: 8,
                  transition: 'color 0.25s',
                }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: 6,
                    background: s.iconBg, border: `0.5px solid ${s.iconBorder}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <NodeIcon type={node.svgIcon} color={s.accent} size={12} />
                  </div>
                  {node.name}
                </div>
                <div style={{ fontFamily: T.body, fontSize: 11, color: T.muted, lineHeight: 1.65 }}>
                  {node.desc}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}

export default Ecosystem