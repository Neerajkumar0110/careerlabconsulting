import React, { useState } from 'react'
import { Rocket, Calendar, CheckCircle, Target } from 'lucide-react'
import { T, FONT_DISPLAY, FONT_BODY, FONT_MONO } from './tokens'
import { Slide, Glow, G, Eyebrow, Badge } from './primitives'
import type { SlideProps } from './primitives'

// ─── SVG ANIMATED JOURNEY TIMELINE ───────────────────────────────────────────
function JourneyPath({ phases, activeTrack }: {
  phases: { period: string; color: string }[]
  activeTrack: string
}) {
  const points = phases.map((p, i) => ({
    x: 30 + i * 62,
    y: i % 2 === 0 ? 30 : 62,
    color: p.color,
    period: p.period,
  }))

  return (
    <svg viewBox="0 0 260 100" width="100%" height="60" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="pathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={T.violetHi} stopOpacity="0.6" />
          <stop offset="100%" stopColor={T.cyanHi} stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* Connector path */}
      {points.slice(0, -1).map((pt, i) => {
        const next = points[i + 1]
        return (
          <path key={i}
            d={`M ${pt.x} ${pt.y} Q ${(pt.x + next.x) / 2} ${pt.y} ${next.x} ${next.y}`}
            fill="none" stroke="url(#pathGrad)" strokeWidth="1"
            strokeDasharray="3 4" opacity="0.5"
          />
        )
      })}

      {/* Nodes */}
      {points.map((pt, i) => (
        <g key={i}>
          <circle cx={pt.x} cy={pt.y} r="10" fill={T.surface} stroke={pt.color} strokeWidth="1.2" opacity="0.9" />
          <text x={pt.x} y={pt.y + 3.5} textAnchor="middle"
            fill={pt.color} fontSize="7.5" fontFamily="'DM Mono',monospace" fontWeight="600">
            0{i + 1}
          </text>
          <text x={pt.x} y={pt.y + (i % 2 === 0 ? -14 : 22)} textAnchor="middle"
            fill={T.t4} fontSize="6" fontFamily="'DM Mono',monospace" letterSpacing="0.06em">
            {pt.period}
          </text>
        </g>
      ))}
    </svg>
  )
}

// ─── OUTCOME SVG GRAPHIC ─────────────────────────────────────────────────────
function OutcomeGraph() {
  const bars = [
    { label: 'India CTC', value: 59, max: 100, color: T.violetHi, n: '₹11.8L' },
    { label: 'Global CTC', value: 96, max: 100, color: T.emeraldHi, n: '₹19.2L' },
    { label: 'Hire Rate', value: 88, max: 100, color: T.amberHi, n: '88%' },
    { label: 'Satisfaction', value: 96, max: 100, color: T.cyanHi, n: '96%' },
  ]

  return (
    <svg viewBox="0 0 200 140" width="100%" height="100%">
      {bars.map((b, i) => {
        const barH = 14, gap = 20
        const y = i * (barH + gap) + 8
        const barW = (b.value / 100) * 130

        return (
          <g key={i}>
            {/* Label */}
            <text x="0" y={y + 10} fill={T.t4}
              fontSize="7" fontFamily="'DM Mono',monospace" letterSpacing="0.06em">
              {b.label}
            </text>
            {/* Track */}
            <rect x="0" y={y + 14} width="130" height="4" rx="2" fill={T.raised} />
            {/* Bar */}
            <rect x="0" y={y + 14} width={barW} height="4" rx="2" fill={b.color} opacity="0.85"
              style={{ animation: `barGrow${i} 1.2s cubic-bezier(0.22,1,0.36,1) ${i * 0.12}s both` }} />
            {/* Value */}
            <text x="136" y={y + 19} fill={b.color}
              fontSize="8" fontFamily="'Clash Display','DM Sans',sans-serif" fontWeight="700">
              {b.n}
            </text>
            <style>{`
              @keyframes barGrow${i} {
                from { width: 0; }
                to { width: ${barW}px; }
              }
            `}</style>
          </g>
        )
      })}
    </svg>
  )
}

// ─── SLIDE 03 ────────────────────────────────────────────────────────────────
export function Slide03({ user }: SlideProps) {
  const [track, setTrack] = useState<'tech' | 'nocode'>('tech')
  const first = user?.name ? user.name.split(' ')[0] : null

  const phases: Record<string, {
    period: string; title: string; tags: string[];
    color: string; outcome: string; advanced: boolean
  }[]> = {
    tech: [
      {
        period: 'M 1–3', title: 'Python Engineering Foundations',
        tags: ['Python', 'OOP', 'REST APIs', 'Pandas', 'NumPy'],
        color: T.violetHi, advanced: false,
        outcome: 'Ship production-ready Python APIs & data pipelines',
      },
      {
        period: 'M 4–6', title: 'NLP, RAG & Autonomous Agents',
        tags: ['NLP', 'RAG', 'FAISS', 'LangChain', 'LangGraph'],
        color: T.emeraldHi, advanced: false,
        outcome: 'Deploy a functional RAG pipeline with memory & retrieval',
      },
      {
        period: 'M 7–9', title: 'Advanced AI Engineering',
        tags: ['HuggingFace', 'LoRA', 'FastAPI', 'AWS', 'GCP'],
        color: T.amberHi, advanced: true,
        outcome: 'Fine-tune & serve custom LLMs on cloud infrastructure',
      },
      {
        period: 'M 10–12', title: 'Enterprise AI & MLOps',
        tags: ['Kubernetes', 'MLOps', 'LangSmith', 'CI/CD'],
        color: T.cyanHi, advanced: true,
        outcome: 'Run production MLOps with monitoring and CI/CD pipelines',
      },
    ],
    nocode: [
      {
        period: 'M 1–3', title: 'AI Productivity & Prompt Engineering',
        tags: ['ChatGPT', 'Claude', 'Gemini', 'Prompt Eng.'],
        color: T.violetHi, advanced: false,
        outcome: 'Automate your entire workflow with advanced AI prompting',
      },
      {
        period: 'M 4–6', title: 'Automation & AI Agent Systems',
        tags: ['n8n', 'Make.com', 'Zapier', 'Relevance AI'],
        color: T.emeraldHi, advanced: false,
        outcome: 'Ship end-to-end automation workflows for real clients',
      },
      {
        period: 'M 7–9', title: 'No-Code SaaS & Client Delivery',
        tags: ['Webflow', 'Softr', 'Stripe', 'Looker Studio'],
        color: T.amberHi, advanced: true,
        outcome: 'Launch a live SaaS product with paying customers',
      },
      {
        period: 'M 10–12', title: 'AI Agency & Business Scaling',
        tags: ['Agency', 'SaaS', 'Strategy', 'Global Clients'],
        color: T.cyanHi, advanced: true,
        outcome: 'Scale an AI agency generating $5K–$20K/month',
      },
    ],
  }

  const current = phases[track]

  return (
    <Slide bg={T.base}>
      <Glow x="85%" y="20%" color={T.emerald} size={380} opacity={0.06} />
      <Glow x="8%"  y="75%" color={T.violet}  size={320} opacity={0.06} />

      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        padding: 'clamp(16px,3vh,32px) clamp(24px,5vw,64px)',
        gap: 'clamp(8px,1.5vh,14px)',
      }}>

        {/* Header */}
        <div className="r1" style={{
          display: 'flex', alignItems: 'flex-end',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: 10,
        }}>
          <div>
            <Eyebrow>Curriculum · 6 &amp; 12 Month Programs</Eyebrow>
            <h2 style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 'clamp(1.1rem,2.6vw,2.1rem)',
              fontWeight: 700, letterSpacing: '-0.03em',
              color: T.t1, lineHeight: 1.04, marginTop: 4,
            }}>
              {first ? `${first}'s ` : ''}Learning Journey.{' '}
              <G from={T.violetHi} to={T.cyanHi}>Infinite Outcomes.</G>
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <Badge color={T.violetHi} bg={T.violetBg} rim={T.violetRim}>234 hrs · 6 months</Badge>
            <Badge color={T.amberHi}  bg={T.amberBg}  rim={T.amberRim}>468 hrs · 12 months</Badge>
          </div>
        </div>

        {/* Track toggle */}
        <div className="r2" style={{
          display: 'inline-flex',
          background: T.surface, border: `1px solid ${T.border}`,
          borderRadius: 9, padding: 3, gap: 3, alignSelf: 'flex-start',
        }}>
          {(['tech', 'nocode'] as const).map(t => (
            <button key={t} onClick={() => setTrack(t)} style={{
              padding: 'clamp(5px,0.9vh,8px) clamp(14px,2.2vw,22px)',
              borderRadius: 7, border: 'none', cursor: 'pointer',
              fontFamily: FONT_BODY,
              fontSize: 'clamp(0.52rem,0.9vw,0.68rem)',
              fontWeight: track === t ? 500 : 400,
              background: track === t
                ? `linear-gradient(135deg, ${T.violet}90, ${T.violetMid}70)`
                : 'transparent',
              color: track === t ? T.t1 : T.t4,
              boxShadow: track === t ? `0 2px 8px ${T.violet}30` : 'none',
              transition: 'all 0.22s ease',
            }}>
              {t === 'tech' ? '⟨/⟩  Technical Track' : '⬡  No-Code Track'}
            </button>
          ))}
        </div>

        {/* SVG Journey path */}
        <div className="r2" style={{ paddingLeft: 8, paddingRight: 8 }}>
          <JourneyPath phases={current} activeTrack={track} />
        </div>

        {/* Phase cards */}
        <div className="r3" style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'clamp(6px,1vw,10px)', flex: 1, minHeight: 0,
        }}>
          {current.map((p, i) => (
            <div key={`${track}-${i}`} style={{
              background: T.surface,
              border: `1px solid ${p.advanced ? T.amberRim : T.border}`,
              borderRadius: 10,
              padding: 'clamp(10px,1.8vw,16px) clamp(10px,1.5vw,14px)',
              position: 'relative', overflow: 'hidden',
              display: 'flex', flexDirection: 'column', gap: 6,
              transition: 'transform 0.18s, box-shadow 0.18s',
              cursor: 'default',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = `0 8px 24px ${p.color}15`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Top color bar */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, ${p.color}, transparent)`,
                opacity: 0.7,
              }} />

              {/* Phase badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  background: `${p.color}12`,
                  border: `1px solid ${p.color}25`,
                  borderRadius: 100,
                  padding: '2px 8px',
                }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: p.color }} />
                  <span style={{
                    fontFamily: FONT_MONO,
                    fontSize: 'clamp(0.34rem,0.52vw,0.44rem)',
                    color: p.color, letterSpacing: '0.10em', textTransform: 'uppercase',
                  }}>{p.period}</span>
                </div>
                {p.advanced && (
                  <span style={{
                    fontFamily: FONT_MONO,
                    fontSize: 'clamp(0.3rem,0.46vw,0.38rem)',
                    color: T.amberHi, background: T.amberBg,
                    border: `1px solid ${T.amberRim}`,
                    padding: '1px 5px', borderRadius: 4,
                    letterSpacing: '0.08em',
                  }}>ADV</span>
                )}
              </div>

              {/* Title */}
              <div style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 'clamp(0.58rem,0.98vw,0.74rem)',
                fontWeight: 600, color: T.t1, lineHeight: 1.3,
              }}>{p.title}</div>

              {/* Accent line */}
              <div style={{
                width: 'clamp(16px,2.5vw,24px)', height: 2,
                background: p.color, borderRadius: 1, opacity: 0.7,
              }} />

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                {p.tags.map(tag => (
                  <span key={tag} style={{
                    fontFamily: FONT_MONO,
                    fontSize: 'clamp(0.32rem,0.5vw,0.4rem)',
                    padding: '2px 6px', borderRadius: 4,
                    background: T.raised, border: `1px solid ${T.border}`,
                    color: T.t4, letterSpacing: '0.04em',
                  }}>{tag}</span>
                ))}
              </div>

              {/* Outcome */}
              <div style={{
                marginTop: 'auto', paddingTop: 6,
                borderTop: `1px solid ${T.border}`,
              }}>
                <div style={{
                  display: 'flex', alignItems: 'flex-start', gap: 5,
                }}>
                  <Target size={9} color={p.color} style={{ marginTop: 2, flexShrink: 0 }} />
                  <p style={{
                    fontFamily: FONT_BODY,
                    fontSize: 'clamp(0.48rem,0.78vw,0.6rem)',
                    color: T.t3, lineHeight: 1.5,
                  }}>{p.outcome}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom row: Capstone + Outcome Graph + Schedule */}
        <div className="r4" style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr 1fr',
          gap: 'clamp(6px,1vw,10px)',
        }}>
          {/* Capstone */}
          <div style={{
            background: `linear-gradient(135deg, ${T.violetBg} 0%, ${T.surface} 100%)`,
            border: `1px solid ${T.violetRim}`, borderRadius: 10,
            padding: 'clamp(8px,1.4vh,12px) clamp(10px,1.6vw,14px)',
            display: 'flex', alignItems: 'flex-start', gap: 10,
          }}>
            <div style={{
              width: 'clamp(28px,4vw,36px)', height: 'clamp(28px,4vw,36px)',
              borderRadius: 8, background: T.violetBg,
              border: `1px solid ${T.violetRim}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Rocket size={13} color={T.violetHi} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: FONT_MONO,
                fontSize: 'clamp(0.34rem,0.52vw,0.42rem)',
                color: T.violetHi, letterSpacing: '0.10em',
                textTransform: 'uppercase', marginBottom: 2,
              }}>Capstone Project</div>
              <div style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 'clamp(0.58rem,0.95vw,0.72rem)',
                fontWeight: 600, color: T.t1,
              }}>Autonomous SEO Agent System</div>
              <p style={{
                fontFamily: FONT_BODY,
                fontSize: 'clamp(0.46rem,0.75vw,0.58rem)',
                color: T.t4, lineHeight: 1.5, marginTop: 3,
              }}>
                Keyword research → content generation → CMS auto-publishing → rank monitoring. Docker + cloud deployed, GitHub verified.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 5 }}>
                <Badge color={T.violetHi} bg={T.violetBg} rim={T.violetRim}>Live Demo</Badge>
                <Badge color={T.emeraldHi} bg={T.emeraldBg} rim={T.emeraldRim}>GitHub Verified</Badge>
                <Badge color={T.amberHi} bg={T.amberBg} rim={T.amberRim}>Verified Career Portfolio</Badge>
              </div>
            </div>
          </div>

          {/* Outcome graph */}
          <div style={{
            background: T.surface, border: `1px solid ${T.border}`,
            borderRadius: 10, padding: 'clamp(8px,1.4vh,12px) clamp(10px,1.6vw,14px)',
            display: 'flex', flexDirection: 'column', gap: 6,
          }}>
            <div style={{
              fontFamily: FONT_MONO,
              fontSize: 'clamp(0.34rem,0.52vw,0.42rem)',
              color: T.emeraldHi, letterSpacing: '0.10em', textTransform: 'uppercase',
            }}>Outcome Metrics</div>
            <div style={{ flex: 1, minHeight: 0 }}>
              <OutcomeGraph />
            </div>
          </div>

          {/* Schedule */}
          <div style={{
            background: T.surface, border: `1px solid ${T.border}`,
            borderRadius: 10, padding: 'clamp(8px,1.4vh,12px) clamp(10px,1.6vw,14px)',
            display: 'flex', flexDirection: 'column', gap: 0,
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8,
            }}>
              <Calendar size={11} color={T.amberHi} />
              <span style={{
                fontFamily: FONT_MONO,
                fontSize: 'clamp(0.34rem,0.52vw,0.42rem)',
                color: T.amberHi, letterSpacing: '0.10em', textTransform: 'uppercase',
              }}>Schedule</span>
            </div>
            {[
              ['Sessions',   '8 PM – 10 PM IST · Mon–Sat'],
              ['Mode',       '100% Online · Remote-First'],
              ['Mentorship', 'Weekly 1:1 (Elite Plan)'],
              ['Pass Score', '65–70% Minimum'],
              ['Demo Batch', 'Sat & Sun · 11 AM IST'],
            ].map(([k, v], i, arr) => (
              <div key={k} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: 'clamp(3px,0.6vh,5px) 0',
                borderBottom: i < arr.length - 1 ? `1px solid ${T.border}` : 'none',
                gap: 6,
              }}>
                <span style={{
                  fontFamily: FONT_BODY,
                  fontSize: 'clamp(0.44rem,0.72vw,0.56rem)',
                  color: T.t4, flexShrink: 0,
                }}>{k}</span>
                <span style={{
                  fontFamily: FONT_BODY,
                  fontSize: 'clamp(0.44rem,0.72vw,0.56rem)',
                  fontWeight: 500, color: T.t2, textAlign: 'right',
                }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  )
}