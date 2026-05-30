'use client'

/**
 * SLIDE 3 — Ecosystem Overview (Interactive Ecosystem Diagram)
 * 1280 × 720 Presentation Canvas
 */

import { useEffect, useRef, useState } from 'react'
import { motion, useAnimationFrame } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const T = {
  void: '#03040A',
  hi: '#ECEEF8',
  mid: '#A9AFCA',
  muted: '#5E6580',
  glass: 'rgba(255,255,255,0.03)',
  line: 'rgba(255,255,255,0.055)',

  violet: '#7C3AED',
  mint: '#10F5A0',
  gold: '#F0A500',
  cyan: '#06B6D4',
  red: '#EF4444',
  purple: '#A855F7',

  display: "'Clash Display', 'Syne', sans-serif",
  body: "'DM Sans', 'Plus Jakarta Sans', sans-serif",
  mono: "'DM Mono', 'JetBrains Mono', monospace",
}

/* ════════════════════════════════════════════════════════════════════
   ECOSYSTEM NODES
════════════════════════════════════════════════════════════════════ */
const ECO_NODES = [
  {
    id: 'internx',
    svgIcon: 'graduation',
    name: 'InternX–AI',
    tag: 'Core Accelerator',
    scheme: 'violet' as const,
    pos: { left: '15%', top: '0%' },
  },
  {
    id: 'hirex',
    svgIcon: 'building',
    name: 'HireX Portal',
    tag: 'Global Hiring',
    scheme: 'mint' as const,
    pos: { right: '13%', top: '0%' },
  },
  {
    id: 'enterprise',
    svgIcon: 'circuit',
    name: 'Enterprise SaaS',
    tag: 'Real Client Work',
    scheme: 'red' as const,
    pos: { left: '0%', top: '30%' },
  },
  {
    id: 'freelance',
    svgIcon: 'briefcase',
    name: 'FreelanceX',
    tag: 'Earn While Learning',
    scheme: 'gold' as const,
    pos: { left: '15%', bottom: '0%' },
  },
  {
    id: 'products',
    svgIcon: 'cube',
    name: 'Verified Career Portfolio + AigenX',
    tag: 'Blockchain + AI',
    scheme: 'cyan' as const,
    pos: { right: '9%', bottom: '0%' },
  },
]

const SCHEME = {
  violet: {
    bg: 'rgba(124,58,237,0.08)',
    border: 'rgba(124,58,237,0.30)',
    glow: 'rgba(124,58,237,0.45)',
    accent: '#7C3AED',
    iconBg: 'rgba(124,58,237,0.12)',
    iconBorder: 'rgba(124,58,237,0.28)',
    tag: '#A78BFA',
  },

  mint: {
    bg: 'rgba(16,245,160,0.06)',
    border: 'rgba(16,245,160,0.25)',
    glow: 'rgba(16,245,160,0.40)',
    accent: '#10F5A0',
    iconBg: 'rgba(16,245,160,0.10)',
    iconBorder: 'rgba(16,245,160,0.22)',
    tag: '#10F5A0',
  },

  gold: {
    bg: 'rgba(240,165,0,0.07)',
    border: 'rgba(240,165,0,0.28)',
    glow: 'rgba(240,165,0,0.42)',
    accent: '#F0A500',
    iconBg: 'rgba(240,165,0,0.12)',
    iconBorder: 'rgba(240,165,0,0.22)',
    tag: '#FCD34D',
  },

  cyan: {
    bg: 'rgba(6,182,212,0.07)',
    border: 'rgba(6,182,212,0.28)',
    glow: 'rgba(6,182,212,0.40)',
    accent: '#06B6D4',
    iconBg: 'rgba(6,182,212,0.10)',
    iconBorder: 'rgba(6,182,212,0.22)',
    tag: '#67E8F9',
  },

  red: {
    bg: 'rgba(239,68,68,0.07)',
    border: 'rgba(239,68,68,0.25)',
    glow: 'rgba(239,68,68,0.40)',
    accent: '#EF4444',
    iconBg: 'rgba(239,68,68,0.10)',
    iconBorder: 'rgba(239,68,68,0.20)',
    tag: '#FCA5A5',
  },
}

/* ════════════════════════════════════════════════════════════════════
   SVG CONNECTION PATHS
════════════════════════════════════════════════════════════════════ */
const NODE_PATHS: Record<
  string,
  { d: string; color: string; label: string; labelPos: { x: number; y: number } }
> = {
  internx: {
    d: 'M 95 90 C 250 90 320 190 450 270',
    color: '#7C3AED',
    label: 'Training Flow',
    labelPos: { x: 250, y: 145 },
  },

  hirex: {
    d: 'M 805 90 C 650 90 580 190 450 270',
    color: '#10F5A0',
    label: 'Placement Flow',
    labelPos: { x: 590, y: 145 },
  },

  enterprise: {
    d: 'M -120 270 C 250 270 340 270 450 270',
    color: '#EF4444',
    label: 'Enterprise Projects',
    labelPos: { x: 150, y: 248 },
  },

  freelance: {
    d: 'M 95 450 C 250 450 320 350 450 270',
    color: '#F0A500',
    label: 'Freelance Revenue',
    labelPos: { x: 250, y: 398 },
  },

  products: {
    d: 'M 875 450 C 650 450 580 350 450 270',
    color: '#06B6D4',
    label: 'AI Product Insights',
    labelPos: { x: 575, y: 398 },
  },
}

/* ════════════════════════════════════════════════════════════════════
   ICONS
════════════════════════════════════════════════════════════════════ */
function NodeIcon({
  type,
  color,
  size = 18,
}: {
  type: string
  color: string
  size?: number
}) {
  const s = {
    width: size,
    height: size,
    strokeWidth: 1.6,
    stroke: color,
    fill: 'none',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  switch (type) {
    case 'graduation':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3.333 1.667 8.667 1.667 12 0v-5" />
        </svg>
      )

    case 'building':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 22V12h6v10M9 7h1M14 7h1M9 11h1M14 11h1" />
        </svg>
      )

    case 'circuit':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <rect x="9" y="9" width="6" height="6" rx="1" />
          <path d="M3 12h6M15 12h6M12 3v6M12 15v6" />
        </svg>
      )

    case 'briefcase':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        </svg>
      )

    case 'cube':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <path d="m3.27 6.96 8.73 5.05 8.73-5.05" />
        </svg>
      )

    default:
      return null
  }
}

/* ════════════════════════════════════════════════════════════════════
   PARTICLES
════════════════════════════════════════════════════════════════════ */
function useParticles(count = 5, speed = 0.0014) {
  const [particles, setParticles] = useState(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      progress: i / count,
      speed: speed + Math.random() * speed * 0.4,
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

function getPointOnPath(
  path: SVGPathElement | null,
  progress: number
): { x: number; y: number } | null {
  if (!path) return null

  try {
    const len = path.getTotalLength()
    const pt = path.getPointAtLength(progress * len)
    return { x: pt.x, y: pt.y }
  } catch {
    return null
  }
}

function Particles({
  pathEl,
  color,
  active,
}: {
  pathEl: SVGPathElement | null
  color: string
  active: boolean
}) {
  const particles = useParticles()

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
            r={2.7}
            fill={color}
            opacity={0.85}
            style={{
              filter: `drop-shadow(0 0 4px ${color})`,
            }}
          />
        )
      })}
    </>
  )
}

/* ════════════════════════════════════════════════════════════════════
   CENTER HUB
════════════════════════════════════════════════════════════════════ */
function CenterHub({ hovered }: { hovered: string | null }) {
  const [angle, setAngle] = useState(0)

  useAnimationFrame((_, delta) => {
    setAngle(a => (a + delta * 0.04) % 360)
  })

  return (
    <div style={{ position: 'relative', width: 132, height: 132 }}>
      <div
        style={{
          position: 'absolute',
          inset: -3,
          borderRadius: '50%',
          background: `conic-gradient(from ${angle}deg,#7C3AED,#10F5A0,#06B6D4,#F0A500,#7C3AED)`,
          padding: 2,
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: '#070B15',
          }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background:
            'linear-gradient(145deg,#0F0A1E 0%,#090611 50%,#050913 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 5,
          boxShadow: hovered
            ? '0 0 70px rgba(124,58,237,0.5)'
            : '0 0 34px rgba(124,58,237,0.28)',
          transition: 'all .35s ease',
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
        <div
          style={{
            fontFamily: T.display,
            fontSize: 11,
            fontWeight: 700,
            lineHeight: 1.25,
            textAlign: 'center',
            color: T.hi,
            letterSpacing: '0.02em',
          }}
        >
          CLC
          <br />
          Ecosystem
        </div>

        <div
          style={{
            fontFamily: T.mono,
            fontSize: 7.5,
            letterSpacing: '0.12em',
            color: 'rgba(255,255,255,0.42)',
            textTransform: 'uppercase',
          }}
        >
          Core Engine
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════
   MAIN SLIDE
════════════════════════════════════════════════════════════════════ */
export default function SlideEcosystem() {
  const [hovered, setHovered] = useState<string | null>(null)

  const pathRefs = useRef<Record<string, SVGPathElement | null>>({})
  const [pathEls, setPathEls] = useState<Record<string, SVGPathElement | null>>(
    {}
  )

  useEffect(() => {
    setPathEls({ ...pathRefs.current })
  }, [])

  useEffect(() => {
    const style = document.createElement('style')

    style.innerHTML = `
      @keyframes eco-dash {
        from { stroke-dashoffset: 180; }
        to { stroke-dashoffset: 0; }
      }

      @keyframes pulse-ring {
        0% {
          transform: translate(-50%, -50%) scale(1);
          opacity: .7;
        }
        100% {
          transform: translate(-50%, -50%) scale(1.5);
          opacity: 0;
        }
      }
    `

    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <div
      style={{
        width: 1280,
        height: 720,
        background: T.void,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: T.body,
      }}
    >
      {/* Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: `
            linear-gradient(${T.line} 1px, transparent 1px),
            linear-gradient(90deg, ${T.line} 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: '15%',
          top: '40%',
          width: 520,
          height: 520,
          background: `radial-gradient(circle,${T.violet} 0%,transparent 70%)`,
          opacity: 0.08,
          transform: 'translate(-50%,-50%)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          right: '10%',
          top: '45%',
          width: 420,
          height: 420,
          background: `radial-gradient(circle,${T.cyan} 0%,transparent 70%)`,
          opacity: 0.07,
          transform: 'translate(50%,-50%)',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          padding: '28px 52px 18px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 14 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 10,
            }}
          >
            <div
              style={{
                width: 18,
                height: 1,
                background: T.mint,
              }}
            />

            <span
              style={{
                fontFamily: T.mono,
                fontSize: 9,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: T.mint,
              }}
            >
              The CLC Ecosystem · Interconnected AI Career Infrastructure
            </span>

            <div
              style={{
                width: 18,
                height: 1,
                background: T.mint,
              }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: T.display,
                  fontSize: 38,
                  fontWeight: 600,
                  lineHeight: 1.04,
                  letterSpacing: '-0.03em',
                  color: T.hi,
                  margin: 0,
                }}
              >
                One Ecosystem.{' '}
                <span
                  style={{
                    background:
                      'linear-gradient(135deg,#7C3AED 0%,#A855F7 35%,#10F5A0 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Infinite Career Flywheel.
                </span>
              </h2>

              <p
                style={{
                  marginTop: 10,
                  color: T.mid,
                  fontSize: 13,
                  lineHeight: 1.7,
                  maxWidth: 640,
                }}
              >
                Every division feeds the others — training, hiring, freelance
                revenue, enterprise projects and AI products compound together
                into one self-reinforcing ecosystem.
              </p>
            </div>

          </div>
        </div>

        {/* Diagram */}
        <div
          style={{
            flex: 1,
            position: 'relative',
            marginTop: 8,
          }}
        >
          {/* SVG CONNECTIONS */}
          <svg
            viewBox="0 0 900 540"
            preserveAspectRatio="xMidYMid meet"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              zIndex: 1,
            }}
          >
            <defs>
              {Object.entries(NODE_PATHS).map(([id, p]) => (
                <marker
                  key={id}
                  id={`arrow-${id}`}
                  viewBox="0 0 10 10"
                  refX="9"
                  refY="5"
                  markerWidth="5"
                  markerHeight="5"
                  orient="auto"
                >
                  <path
                    d="M2 1L8 5L2 9"
                    fill="none"
                    stroke={p.color}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </marker>
              ))}
            </defs>

            {Object.entries(NODE_PATHS).map(([id, p]) => {
              const active = true

              return (
                <g key={id}>
                  {/* Glow */}
                  <path
                    d={p.d}
                    fill="none"
                    stroke={p.color}
                    strokeWidth={6}
                    opacity={active ? 0.18 : 0}
                    style={{
                      transition: 'opacity .3s ease',
                      filter: 'blur(6px)',
                    }}
                  />

                  {/* Main path */}
                  <path
                    ref={el => {
                      pathRefs.current[id] = el
                    }}
                    d={p.d}
                    fill="none"
                    stroke={p.color}
                    strokeWidth={active ? 1.8 : 1}
                    opacity={active ? 0.95 : 0.45}
                    strokeDasharray={active ? 'none' : '6 5'}
                    markerEnd={`url(#arrow-${id})`}
                    style={{
                      transition: 'all .3s ease',
                      animation: active
                        ? 'none'
                        : 'eco-dash 3s linear infinite',
                    }}
                  />

                  {/* Labels */}
                  <g
                    style={{
                      opacity: active ? 1 : 0,
                      transition: 'opacity .3s ease',
                    }}
                  >
                    <rect
                      x={p.labelPos.x - 8}
                      y={p.labelPos.y - 17}
                      width={p.label.length * 8.3 + 37}
                      height={24}
                      rx={9}
                      fill="rgba(3,4,10,0.92)"
                      stroke={p.color}
                      strokeWidth={0.6}
                    />

                    <text
                      x={p.labelPos.x}
                      y={p.labelPos.y}
                      fill={p.color}
                      fontFamily={T.mono}
                      fontSize={16}
                      letterSpacing="0.06em"
                    >
                      {p.label}
                    </text>
                  </g>
                </g>
              )
            })}

            {/* Particles */}
            {Object.entries(NODE_PATHS).map(([id, p]) => (
              <Particles
                key={id}
                pathEl={pathEls[id] ?? null}
                color={p.color}
                active={true}
              />
            ))}
          </svg>

          {/* CENTER HUB */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%,-50%)',
              zIndex: 10,
            }}
          >
            <CenterHub hovered={hovered} />
          </div>

          {/* NODE CARDS */}
          {ECO_NODES.map(node => {
            const s = SCHEME[node.scheme]
            const active = true

            return (
              <motion.div
                key={node.id}
                onHoverStart={() => setHovered(node.id)}
                onHoverEnd={() => setHovered(null)}
                whileHover={{ scale: 1.06 }}
                transition={{
                  duration: 0.28,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  position: 'absolute',
                  zIndex: 5,
                  cursor: 'pointer',
                  ...node.pos,
                }}
              >
                <div
                  style={{
                    width: 175,
                    padding: '16px 14px',
                    borderRadius: 18,
                    background: active
                      ? `linear-gradient(145deg, ${s.bg}, rgba(0,0,0,0.3))`
                      : s.bg,
                    border: `0.5px solid ${
                      active ? s.accent : s.border
                    }`,
                    backdropFilter: 'blur(12px)',
                    boxShadow: active
                      ? `0 0 0 1px ${s.accent}40, 0 12px 42px ${s.glow}`
                      : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 9,
                    textAlign: 'center',
                    transition:
                      'all .25s ease',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  {/* glow */}
                  {active && (
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: 18,
                        background: `radial-gradient(circle at 50% 100%, ${s.accent}25, transparent 60%)`,
                        pointerEvents: 'none',
                      }}
                    />
                  )}

                  {/* icon */}
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 13,
                      background: s.iconBg,
                      border: `0.5px solid ${s.iconBorder}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: active
                        ? `0 0 18px ${s.glow}`
                        : 'none',
                    }}
                  >
                    <NodeIcon
                      type={node.svgIcon}
                      color={active ? s.accent : s.tag}
                      size={18}
                    />
                  </div>

                  {/* title */}
                  <div
                    style={{
                      fontFamily: T.display,
                      fontSize: 13,
                      fontWeight: 600,
                      color: T.hi,
                      lineHeight: 1.3,
                    }}
                  >
                    {node.name}
                  </div>

                  {/* tag */}
                  <span
                    style={{
                      fontFamily: T.mono,
                      fontSize: 8,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      padding: '4px 9px',
                      borderRadius: 999,
                      background: 'rgba(255,255,255,0.03)',
                      border: `0.5px solid ${s.border}`,
                      color: s.tag,
                    }}
                  >
                    {node.tag}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4,1fr)',
            gap: 10,
            marginTop: 14,
          }}
        >
          {[
            {
              val: '15,000+',
              label: 'Students Trained',
              color: T.violet,
            },
            {
              val: '3,500+',
              label: 'AI Projects Delivered',
              color: T.mint,
            },
            {
              val: '270+',
              label: 'Hiring Partners',
              color: T.gold,
            },
            {
              val: '88%',
              label: 'Placement Conversion',
              color: T.cyan,
            },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.45 + i * 0.05,
              }}
              style={{
                background: T.glass,
                border: `0.5px solid ${T.line}`,
                borderRadius: 12,
                padding: '11px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 4,
                  height: 30,
                  borderRadius: 3,
                  background: s.color,
                }}
              />

              <div>
                <div
                  style={{
                    fontFamily: T.display,
                    fontSize: 20,
                    fontWeight: 700,
                    lineHeight: 1,
                    color: T.hi,
                  }}
                >
                  {s.val}
                </div>

                <div
                  style={{
                    marginTop: 3,
                    fontFamily: T.mono,
                    fontSize: 8,
                    color: T.muted,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  {s.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}