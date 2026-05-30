import React from 'react'
import { T, FONT_DISPLAY, FONT_BODY, FONT_MONO } from './tokens'
import { Slide, Eyebrow } from './primitives'
import type { SlideProps } from './primitives'

const TOOL_GROUPS = [
  {
    label: 'Foundation',
    color: T.violetHi,
    tools: [
      { name: 'Python', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/250px-Python-logo-notext.svg.png' },
      { name: 'FastAPI', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/FastAPI_logo.svg/1280px-FastAPI_logo.svg.png' },
      { name: 'Docker',  logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Docker-svgrepo-com.svg/1280px-Docker-svgrepo-com.svg.png' },
    ],
  },
  {
    label: 'AI & LLMs',
    color: T.emeraldHi,
    tools: [
      { name: 'OpenAI',      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/OpenAI_logo_2025_%28symbol%29.svg/120px-OpenAI_logo_2025_%28symbol%29.svg.png' },
      { name: 'HuggingFace', logo: 'https://huggingface.co/datasets/huggingface/brand-assets/resolve/0fd14cd6eca1024a487427db8d52ce5d10b3a321/hg-logo.png' },
      { name: 'LangChain',   logo: 'https://upload.wikimedia.org/wikipedia/commons/6/60/LangChain_Logo.svg' },
    ],
  },
  {
    label: 'Agents & Ops',
    color: T.amberHi,
    tools: [
      { name: 'LangGraph', logo: 'https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/langgraph-color.png' },
      { name: 'CrewAI',    logo: 'https://images.seeklogo.com/logo-png/61/2/crew-ai-logo-png_seeklogo-619843.png' },
      { name: 'LangSmith', logo: 'https://vectorseek.com/wp-content/uploads/2026/01/LangSmith-Logo-PNG-SVG-Vector-01.png' },
    ],
  },
  {
    label: 'Cloud & Data',
    color: T.cyan,
    tools: [
      { name: 'AWS',      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/960px-Amazon_Web_Services_Logo.svg.png' },
      { name: 'ChromaDB', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Chroma-logo-bu.png' },
      { name: 'Streamlit',logo: 'https://images.seeklogo.com/logo-png/44/2/streamlit-logo-png_seeklogo-441815.png' },
    ],
  },
]

const PIPELINE = [
  { label: 'Research',    sub: 'SerpAPI + web scraper',  color: T.violetHi,  icon: '🔍' },
  { label: 'NLP Parse',   sub: 'LLM + embeddings',       color: '#A78BFA',   icon: '🧠' },
  { label: 'Generate',    sub: 'GPT-4o templates',        color: T.emeraldHi, icon: '✍️' },
  { label: 'Score',       sub: 'vs. competitors',         color: T.amberHi,   icon: '📊' },
  { label: 'Publish',     sub: 'WordPress / CMS',         color: T.cyan,      icon: '🚀' },
  { label: 'Monitor',     sub: 'Slack + email alerts',    color: T.rose,      icon: '📡' },
]

export function Slide04({ user }: SlideProps) {
  return (
    <Slide bg={T.base}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '-15%', right: '-5%',
        width: '55%', height: '70%',
        background: `radial-gradient(ellipse at top right, ${T.emerald}0D 0%, transparent 65%)`,
        pointerEvents: 'none', zIndex: 1,
      }} />

      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        padding: 'clamp(20px,3.5vh,40px) clamp(36px,6vw,80px)',
        gap: 'clamp(10px,1.8vh,18px)',
        position: 'relative', zIndex: 2,
      }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <div>
            <Eyebrow>Tools &amp; Architecture</Eyebrow>
            <h2 style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 'clamp(1.2rem,2.8vw,2.4rem)',
              fontWeight: 700, letterSpacing: '-0.03em',
              color: T.t1, lineHeight: 1.05, marginTop: 4,
            }}>
              Industry Stack.{' '}
              <span style={{
                background: `linear-gradient(90deg, ${T.emeraldHi}, ${T.cyan})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>From Day One.</span>
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['12+ Enterprise Tools', 'Production-Grade Stack'].map(label => (
              <div key={label} style={{
                padding: '5px 12px',
                border: `1px solid ${T.border}`,
                borderRadius: 100,
                fontFamily: FONT_MONO,
                fontSize: 'clamp(0.38rem,0.6vw,0.5rem)',
                color: T.t4, letterSpacing: '0.08em',
              }}>{label}</div>
            ))}
          </div>
        </div>

        {/* Tool stack — grouped by category */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'clamp(6px,1vw,10px)',
        }}>
          {TOOL_GROUPS.map((group) => (
            <div
              key={group.label}
              style={{
                background: T.surface,
                border: `1px solid ${T.border}`,
                borderRadius: 10, overflow: 'hidden',
              }}
            >
              {/* Group header */}
              <div style={{
                padding: 'clamp(8px,1.2vw,12px) clamp(10px,1.5vw,14px)',
                borderBottom: `1px solid ${T.border}`,
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: group.color, flexShrink: 0 }} />
                <span style={{
                  fontFamily: FONT_MONO,
                  fontSize: 'clamp(0.36rem,0.56vw,0.46rem)',
                  color: group.color, letterSpacing: '0.12em', textTransform: 'uppercase',
                }}>{group.label}</span>
              </div>

              {/* Tool items */}
              <div style={{ padding: 'clamp(6px,1vw,8px)', display: 'flex', flexDirection: 'column', gap: 4 }}>
                {group.tools.map((tool) => (
                  <div
                    key={tool.name}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      padding: 'clamp(5px,0.8vw,8px) clamp(6px,0.9vw,10px)',
                      borderRadius: 6,
                      background: T.raised,
                      border: `1px solid transparent`,
                      transition: 'border-color 0.18s',
                      cursor: 'default',
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = `${group.color}30`}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
                  >
                    <div style={{
                      width: 'clamp(22px,3vw,28px)', height: 'clamp(22px,3vw,28px)',
                      borderRadius: 5, background: 'rgba(255,255,255,0.92)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <img
                        src={tool.logo} alt={tool.name}
                        style={{ width: '68%', height: '68%', objectFit: 'contain' }}
                        onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                      />
                    </div>
                    <span style={{
                      fontFamily: FONT_BODY,
                      fontSize: 'clamp(0.5rem,0.82vw,0.62rem)',
                      color: T.t2, fontWeight: 400,
                    }}>{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Architecture pipeline — the hero section */}
        <div style={{
          flex: 1,
          background: T.surface,
          border: `1px solid ${T.border}`,
          borderRadius: 12,
          padding: 'clamp(14px,2.2vw,20px) clamp(16px,2.5vw,24px)',
          display: 'flex', flexDirection: 'column',
          gap: 'clamp(10px,1.5vh,14px)',
          overflow: 'hidden', position: 'relative',
        }}>
          {/* Subtle emerald tint */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(135deg, ${T.emeraldBg} 0%, transparent 50%)`,
            opacity: 0.4, pointerEvents: 'none',
          }} />

          {/* Section header */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            flexWrap: 'wrap', position: 'relative', zIndex: 1,
          }}>
            <div>
              <div style={{
                fontFamily: FONT_MONO,
                fontSize: 'clamp(0.36rem,0.56vw,0.46rem)',
                color: T.emeraldHi, letterSpacing: '0.12em', textTransform: 'uppercase',
              }}>Capstone Architecture</div>
              <div style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 'clamp(0.7rem,1.2vw,0.9rem)',
                fontWeight: 600, color: T.t1, marginTop: 2,
              }}>Multi-Agent SEO Pipeline · LangGraph Stateful · ReAct Pattern</div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 5 }}>
              {['Production Deployed', 'GitHub Verified', 'Verified Career Portfolio'].map(label => (
                <div key={label} style={{
                  padding: '3px 8px',
                  border: `1px solid ${T.border}`,
                  borderRadius: 100,
                  fontFamily: FONT_MONO,
                  fontSize: 'clamp(0.33rem,0.5vw,0.4rem)',
                  color: T.t4, letterSpacing: '0.06em',
                }}>{label}</div>
              ))}
            </div>
          </div>

          {/* Pipeline flow */}
          <div style={{
            display: 'flex', alignItems: 'stretch',
            gap: 0, flex: 1, position: 'relative', zIndex: 1,
            overflowX: 'auto',
          }}>
            {PIPELINE.map((step, i) => (
              <React.Fragment key={i}>
                {/* Step node */}
                <div style={{
                  flex: 1, minWidth: 0,
                  background: T.raised,
                  border: `1px solid ${step.color}25`,
                  borderRadius: 8,
                  padding: 'clamp(8px,1.2vw,12px) clamp(8px,1.2vw,12px)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  gap: 5, textAlign: 'center',
                  position: 'relative', overflow: 'hidden',
                  transition: 'border-color 0.18s',
                  cursor: 'default',
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = `${step.color}60`}
                  onMouseLeave={e => e.currentTarget.style.borderColor = `${step.color}25`}
                >
                  {/* Bottom color bar */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
                    background: step.color, opacity: 0.5,
                  }} />

                  {/* Step number */}
                  <div style={{
                    fontFamily: FONT_MONO,
                    fontSize: 'clamp(0.5rem,0.7vw,0.56rem)',
                    color: step.color, fontWeight: 600,
                  }}>0{i + 1}</div>

                  <div style={{ fontSize: 'clamp(0.9rem,1.3vw,1.1rem)', lineHeight: 1 }}>{step.icon}</div>

                  <div style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: 'clamp(0.52rem,0.82vw,0.64rem)',
                    fontWeight: 600, color: T.t1,
                  }}>{step.label}</div>

                  <div style={{
                    fontFamily: FONT_MONO,
                    fontSize: 'clamp(0.34rem,0.52vw,0.42rem)',
                    color: T.t4, lineHeight: 1.4,
                  }}>{step.sub}</div>
                </div>

                {/* Arrow connector */}
                {i < PIPELINE.length - 1 && (
                  <div style={{
                    display: 'flex', alignItems: 'center',
                    padding: '0 clamp(3px,0.5vw,5px)', flexShrink: 0,
                  }}>
                    <svg width="14" height="10" viewBox="0 0 14 10">
                      <path d="M0 5h9M6 1l4 4-4 4" stroke={step.color} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.5" />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Slide counter */}
      <div style={{
        position: 'absolute', bottom: 'clamp(16px,2.5vh,28px)', right: 'clamp(36px,5.5vw,72px)',
        fontFamily: FONT_MONO, fontSize: 'clamp(0.38rem,0.55vw,0.46rem)',
        color: T.t5, letterSpacing: '0.08em', zIndex: 3,
      }}>04 / 04</div>
    </Slide>
  )
}