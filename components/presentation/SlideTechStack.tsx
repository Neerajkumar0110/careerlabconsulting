'use client'

/**
 * SLIDE 5 — Tech Stack
 * Optimized for 1280 × 720
 * Consistent with landing page
 * Symmetrical spacing
 * Removed no-code section
 */

import { motion } from 'framer-motion'
import { Workflow } from 'lucide-react'

const T = {
  void: '#03040A',
  glass: 'rgba(255,255,255,0.030)',
  line: 'rgba(255,255,255,0.055)',

  violet: '#7C3AED',
  violetLo: 'rgba(124,58,237,0.12)',
  violetB: 'rgba(124,58,237,0.30)',

  mint: '#10F5A0',
  mintLo: 'rgba(16,245,160,0.08)',
  mintB: 'rgba(16,245,160,0.22)',

  gold: '#F0A500',
  goldLo: 'rgba(240,165,0,0.10)',
  goldB: 'rgba(240,165,0,0.25)',

  cyan: '#06B6D4',
  cyanLo: 'rgba(6,182,212,0.10)',
  cyanB: 'rgba(6,182,212,0.25)',

  hi: '#ECEEF8',
  mid: '#A9AFCA',
  muted: '#5E6580',
  ghost: '#2E3348',

  display: "'Clash Display', 'Syne', sans-serif",
  body: "'DM Sans', 'Plus Jakarta Sans', sans-serif",
  mono: "'DM Mono', 'JetBrains Mono', monospace",
}

/* 18 tools for perfect 6×3 balanced grid */
const TECH_TOOLS = [
  {
    name: 'Python',
    color: '#3572A5',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/250px-Python-logo-notext.svg.png'
  },
  {
    name: 'FastAPI',
    color: '#059669',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/FastAPI_logo.svg/1280px-FastAPI_logo.svg.png'
  },
  {
    name: 'LangChain',
    color: '#1C78E5',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/60/LangChain_Logo.svg'
  },
  {
    name: 'LangGraph',
    color: '#7C3AED',
    logo: 'https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/langgraph-color.png'
  },
  {
    name: 'CrewAI',
    color: '#FF4B4B',
    logo: 'https://images.seeklogo.com/logo-png/61/2/crew-ai-logo-png_seeklogo-619843.png'
  },
  {
    name: 'AutoGen',
    color: '#8B5CF6',
    logo: 'https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/microsoft-color.png'
  },
  {
    name: 'ChromaDB',
    color: '#F47B20',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Chroma-logo-bu.png'
  },
  {
    name: 'FAISS',
    color: '#0467DF',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/FIS_logo.svg/3840px-FIS_logo.svg.png'
  },
  {
    name: 'Pinecone',
    color: '#0ABAB5',
    logo: 'https://vectorseek.com/wp-content/uploads/2023/09/Pinecone-Icon-Logo-Vector.svg-.png'
  },
  {
    name: 'Redis',
    color: '#DC382D',
    logo: 'https://cdn.worldvectorlogo.com/logos/redis.svg'
  },
  {
    name: 'Docker',
    color: '#2496ED',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Docker-svgrepo-com.svg/1280px-Docker-svgrepo-com.svg.png'
  },
  {
    name: 'Kubernetes',
    color: '#326CE5',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Kubernetes_logo_without_workmark.svg'
  },
]

const AGENT_STEPS = [
  { label:'Research Agent', sub:'SERP + collection', color:T.violet },
  { label:'Reasoning Layer', sub:'LLMs + tools', color:'#A855F7' },
  { label:'RAG Pipeline', sub:'Embeddings + retrieval', color:T.mint },
  { label:'AI Generation', sub:'Structured outputs', color:T.gold },
  { label:'Workflow Engine', sub:'Agent orchestration', color:'#06B6D4' },
  { label:'Deploy & Monitor', sub:'Cloud + observability', color:'#F43F5E' },
]

export default function SlideTechStack() {
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
      {/* BG */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: `
            linear-gradient(${T.line} 1px,transparent 1px),
            linear-gradient(90deg,${T.line} 1px,transparent 1px)
          `,
          backgroundSize: '64px 64px',
          opacity: 0.28,
          maskImage:
            'radial-gradient(ellipse 80% 70% at 50% 50%,black 30%,transparent 100%)',
        }}
      />

      {/* ORBS */}
      <div
        style={{
          position: 'absolute',
          left: '84%',
          top: '62%',
          width: 380,
          height: 380,
          background: `radial-gradient(circle,${T.gold} 0%,transparent 70%)`,
          opacity: 0.06,
          transform: 'translate(-50%,-50%)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: '14%',
          top: '28%',
          width: 340,
          height: 340,
          background: `radial-gradient(circle,${T.violet} 0%,transparent 70%)`,
          opacity: 0.07,
          transform: 'translate(-50%,-50%)',
        }}
      />

      {/* CONTENT */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '28px 44px 24px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* HEADER */}
        <div style={{ marginBottom: 18 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              marginBottom: 8,
            }}
          >
            <div
              style={{
                width: 16,
                height: 1,
                background: T.mint,
                opacity: 0.7,
              }}
            />

            <span
              style={{
                fontFamily: T.mono,
                fontSize: 9,
                fontWeight: 500,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: T.mint,
              }}
            >
              AI Engineering Stack
            </span>

            <div
              style={{
                width: 16,
                height: 1,
                background: T.mint,
                opacity: 0.7,
              }}
            />
          </div>

          <h2
            style={{
              fontFamily: T.display,
              fontSize: 34,
              fontWeight: 600,
              lineHeight: 1.04,
              letterSpacing: '-0.03em',
              color: T.hi,
              margin: 0,
              marginBottom: 10,
            }}
          >
            Production AI Tools,{' '}
            <span
              style={{
                backgroundImage:
                  'linear-gradient(135deg,#7C3AED 0%,#A855F7 35%,#10F5A0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Used By Modern Teams.
            </span>
          </h2>

          <p
            style={{
              fontSize: 12.5,
              lineHeight: 1.7,
              color: T.mid,
              fontWeight: 300,
              maxWidth: 760,
              margin: '0 0 16px',
            }}
          >
           Master AI engineering — backend systems, LLM orchestration, vector databases, agents, and deployment.
          </p>

          {/* TAGS */}
          <div
            style={{
              display: 'flex',
              gap: 8,
              flexWrap: 'wrap',
            }}
          >
            {[
              ['violet', 'LLM Engineering'],
              ['mint', 'Multi-Agent Systems'],
              ['gold', 'Cloud Deployment'],
              ['cyan', 'Production AI'],
            ].map(([scheme, label]) => {
              const col =
                scheme === 'violet'
                  ? T.violet
                  : scheme === 'mint'
                  ? T.mint
                  : scheme === 'gold'
                  ? T.gold
                  : T.cyan

              const bg =
                scheme === 'violet'
                  ? T.violetLo
                  : scheme === 'mint'
                  ? T.mintLo
                  : scheme === 'gold'
                  ? T.goldLo
                  : T.cyanLo

              const border =
                scheme === 'violet'
                  ? T.violetB
                  : scheme === 'mint'
                  ? T.mintB
                  : scheme === 'gold'
                  ? T.goldB
                  : T.cyanB

              return (
                <span
                  key={label}
                  style={{
                    fontFamily: T.mono,
                    fontSize: 8.5,
                    padding: '5px 11px',
                    borderRadius: 999,
                    background: bg,
                    color: col,
                    border: `0.5px solid ${border}`,
                  }}
                >
                  {label}
                </span>
              )
            })}
          </div>
        </div>

        {/* TOOL GRID */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: 10,
            marginBottom: 8,
          }}
        >
          {TECH_TOOLS.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, scale: 0.9, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                delay: i * 0.025,
                duration: 0.35,
              }}
              style={{
                background: T.glass,
                border: `0.5px solid ${T.line}`,
                borderRadius: 14,
                padding: '13px 8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 7,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  bottom: -8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 46,
                  height: 22,
                  background: `radial-gradient(${tool.color}50,transparent 70%)`,
                }}
              />

              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 11,
                  background: 'rgba(255,255,255,0.88)',
                  border: `1px solid ${tool.color}25`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={tool.logo}
                  alt={tool.name}
                  style={{
                    width: 25,
                    height: 25,
                    objectFit: 'contain',
                  }}
                />
              </div>

              <div
                style={{
                  fontFamily: T.mono,
                  fontSize: 11,
                  fontWeight: 500,
                  color: 'white',
                  textAlign: 'center',
                  lineHeight: 1.25,
                  minHeight: 20,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {tool.name}
              </div>

              <div
                style={{
                  width: 18,
                  height: 2,
                  borderRadius: 1,
                  background: tool.color,
                  opacity: 0.6,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* PIPELINE */}
        <div
          style={{
            borderRadius: 18,
            overflow: 'hidden',
            border: `0.5px solid ${T.mintB}`,
            background:
              'linear-gradient(135deg,rgba(16,245,160,0.05) 0%,rgba(124,58,237,0.05) 100%)',
            padding: '18px 18px 16px',
          }}
        >
          {/* TOP */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 16,
            }}
          >
            <Workflow size={14} color={T.mint} />

            <span
              style={{
                fontFamily: T.display,
                fontSize: 14,
                fontWeight: 600,
                color: T.hi,
              }}
            >
              AI Agent Pipeline You'll Engineer
            </span>

            <div style={{ flex: 1 }} />

            {[
              ['mint', 'LangGraph Stateful'],
              ['violet', 'ReAct Architecture'],
              ['gold', 'Cloud Deployed'],
            ].map(([c, label]) => {
              const col =
                c === 'mint'
                  ? T.mint
                  : c === 'violet'
                  ? T.violet
                  : T.gold

              const bg =
                c === 'mint'
                  ? T.mintLo
                  : c === 'violet'
                  ? T.violetLo
                  : T.goldLo

              const border =
                c === 'mint'
                  ? T.mintB
                  : c === 'violet'
                  ? T.violetB
                  : T.goldB

              return (
                <span
                  key={label}
                  style={{
                    fontFamily: T.mono,
                    fontSize: 9,
                    padding: '3px 9px',
                    borderRadius: 999,
                    background: bg,
                    color: col,
                    border: `0.5px solid ${border}`,
                  }}
                >
                  {label}
                </span>
              )
            })}
          </div>

          {/* STEPS */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 0,
            }}
          >
            {AGENT_STEPS.map((s, i) => (
              <div
                key={s.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                <div
                  style={{
                    flex: 1,
                    background: T.glass,
                    border: `0.5px solid ${T.line}`,
                    borderRadius: 12,
                    padding: '11px 10px',
                    textAlign: 'center',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 6,
                      right: 8,
                      fontFamily: T.mono,
                      fontSize: 10,
                      color: T.ghost,
                    }}
                  >
                    0{i + 1}
                  </div>

                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: s.color,
                      margin: '0 auto 7px',
                      boxShadow: `0 0 8px ${s.color}`,
                    }}
                  />

                  <div
                    style={{
                      fontFamily: T.display,
                      fontSize: 13,
                      fontWeight: 600,
                      color: T.hi,
                      marginBottom: 3,
                    }}
                  >
                    {s.label}
                  </div>

                  <div
                    style={{
                      fontFamily: T.mono,
                      fontSize: 9,
                      color: T.muted,
                      letterSpacing: '0.03em',
                    }}
                  >
                    {s.sub}
                  </div>
                </div>

                {i < AGENT_STEPS.length - 1 && (
                  <div
                    style={{
                      padding: '0 4px',
                      opacity: 0.5,
                      flexShrink: 0,
                    }}
                  >
                    <svg width="16" height="9" viewBox="0 0 16 9">
                      <path
                        d="M0 4.5h10M7 1l3 3.5-3 3"
                        stroke={T.mint}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          <p
            style={{
              marginTop: 14,
              fontSize: 10.5,
              color: T.muted,
              lineHeight: 1.65,
            }}
          >
            Build enterprise-grade AI systems with autonomous agents,
            RAG pipelines, memory layers, cloud deployment and scalable
            orchestration workflows used in modern AI products.
          </p>
        </div>
      </div>
    </div>
  )
}