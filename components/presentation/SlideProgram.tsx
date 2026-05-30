'use client'

/**
 * SLIDE 4 — Program / Curriculum
 * Fully optimized for 1280 × 720
 * Proper 2-column layout
 * Reduced font sizes + tighter spacing
 * No overflow
 */

import { motion } from 'framer-motion'
import {
  Star,
  Rocket,
  Calendar,
  Layers,
} from 'lucide-react'

const T = {
  void: '#03040A',
  ink: '#070B15',
  glass: 'rgba(255,255,255,0.03)',
  line: 'rgba(255,255,255,0.055)',

  violet: '#7C3AED',
  violetLo: 'rgba(124,58,237,0.12)',
  violetB: 'rgba(124,58,237,0.30)',
  violetHi: '#A78BFA',

  mint: '#10F5A0',
  mintLo: 'rgba(16,245,160,0.08)',
  mintB: 'rgba(16,245,160,0.22)',

  gold: '#F0A500',
  goldLo: 'rgba(240,165,0,0.10)',
  goldB: 'rgba(240,165,0,0.25)',

  hi: '#ECEEF8',
  mid: '#A9AFCA',
  muted: '#5E6580',
  ghost: '#2E3348',

  display: "'Clash Display', 'Syne', sans-serif",
  body: "'DM Sans', 'Plus Jakarta Sans', sans-serif",
  mono: "'DM Mono', 'JetBrains Mono', monospace",
}

const TECH_CUR = [
  {
    period: 'Months 1–3',
    ext: false,
    title: 'AI Engineering Foundations',
    desc: 'Python, APIs, automation and practical engineering workflows.',
    tags: ['Python', 'REST APIs', 'Automation', 'Pandas'],
  },

  {
    period: 'Months 4–6',
    ext: false,
    title: 'LLMs, RAG & AI Agents',
    desc: 'RAG pipelines, vector search and agent orchestration.',
    tags: ['LLMs', 'RAG', 'FAISS', 'LangChain'],
  },

  {
    period: 'Months 7–9',
    ext: true,
    title: 'Advanced AI Infrastructure',
    desc: 'Transformers, FastAPI services and scalable inference systems.',
    tags: ['Transformers', 'FastAPI', 'AWS', 'Inference'],
  },

  {
    period: 'Months 10–12',
    ext: true,
    title: 'Enterprise AI & MLOps',
    desc: 'Production AI deployment with Kubernetes and CI/CD.',
    tags: ['Kubernetes', 'Docker', 'CI/CD', 'MLOps'],
  },
]

const DOMAINS = [
  'FinTech',
  'EdTech',
  'HealthTech',
  'HRTech',
  'AI SaaS',
  'LLM Systems',
]

const SCH = [
  ['Sessions', '8–10 PM IST · Mon–Sat'],
  ['Mode', '100% Online'],
  ['Format', 'Live + Practical'],
  ['Mentorship', 'Weekly 1:1'],
]

export default function SlideProgram() {
  return (
    <div
      style={{
        width: 1280,
        height: 720,
        position: 'relative',
        overflow: 'hidden',
        background: T.ink,
        fontFamily: T.body,
      }}
    >
      {/* GRID BG */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(${T.line} 1px, transparent 1px),
            linear-gradient(90deg, ${T.line} 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          opacity: 0.28,
          maskImage:
            'radial-gradient(ellipse 80% 70% at 50% 50%, black 35%, transparent 100%)',
        }}
      />

      {/* GLOW */}
      <div
        style={{
          position: 'absolute',
          top: '14%',
          right: '-5%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${T.violet} 0%, transparent 70%)`,
          opacity: 0.08,
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: 280,
          height: 280,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${T.mint} 0%, transparent 70%)`,
          opacity: 0.05,
        }}
      />

      {/* MAIN */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          padding: '28px 42px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* CONTENT */}
<div
  style={{
    position: 'relative',
    zIndex: 2,
    height: '100%',
    padding: '28px 42px',
    display: 'grid',
    gridTemplateColumns: '1.1fr 0.9fr',
    gap: 24,
  }}
>
  {/* LEFT COLUMN */}
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0,
    }}
  >
    {/* HEADER */}
    <div style={{ marginBottom: 18 }}>
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
          Curriculum · 6 & 12 Month Program
        </span>
        <div
          style={{
            width: 18,
            height: 1,
            background: T.mint,
          }}
        />
      </div>

      <h2
        style={{
          fontFamily: T.display,
          fontSize: 32,
          fontWeight: 600,
          lineHeight: 1.02,
          letterSpacing: '-0.03em',
          color: T.hi,
          marginBottom: 10,
          maxWidth: 560,
        }}
      >
        One Journey.{' '}
        <span
          style={{
            backgroundImage:
              'linear-gradient(135deg,#7C3AED 0%,#A855F7 40%,#10F5A0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Infinite Outcomes.
        </span>
      </h2>

      <p
        style={{
          fontSize: 11.5,
          lineHeight: 1.6,
          color: T.mid,
          maxWidth: 560,
          marginBottom: 12,
        }}
      >
        AI engineering journey covering software foundations,
        autonomous agents and enterprise AI systems.
      </p>

      <div
        style={{
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
        }}
      >
        {[
          ['violet', '234 hrs · Core Program'],
          ['gold', '468 hrs · Advanced Track'],
          ['mint', 'Live Practical Projects'],
        ].map(([scheme, label]) => {
          const col =
            scheme === 'violet'
              ? T.violet
              : scheme === 'gold'
              ? T.gold
              : T.mint

          const colLo =
            scheme === 'violet'
              ? T.violetLo
              : scheme === 'gold'
              ? T.goldLo
              : T.mintLo

          const colB =
            scheme === 'violet'
              ? T.violetB
              : scheme === 'gold'
              ? T.goldB
              : T.mintB

          return (
            <span
              key={label}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                background: colLo,
                color: col,
                border: `0.5px solid ${colB}`,
                borderRadius: 999,
                padding: '5px 10px',
                fontSize: 8.5,
                fontFamily: T.mono,
                letterSpacing: '0.04em',
              }}
            >
              {label}
            </span>
          )
        })}
      </div>
    </div>

    {/* LEARNING PATH */}
    <motion.div
      initial={{ opacity: 0, x: -18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        minHeight: 0,
      }}
    >
      {TECH_CUR.map((u, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            gap: 14,
            position: 'relative',
          }}
        >
          {i < TECH_CUR.length - 1 && (
            <div
              style={{
                position: 'absolute',
                left: 14,
                top: 34,
                bottom: -14,
                width: 1,
                background: u.ext
                  ? `linear-gradient(${T.gold}90, transparent)`
                  : `linear-gradient(${T.violet}90, transparent)`,
              }}
            />
          )}

          {/* NODE */}
          <div
            style={{
              width: 28,
              height: 28,
              flexShrink: 0,
              borderRadius: '50%',
              background: u.ext
                ? `linear-gradient(135deg,${T.gold},${T.violet})`
                : T.violetLo,
              border: u.ext
                ? 'none'
                : `1px solid ${T.violetB}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
            }}
          >
            <span
              style={{
                fontFamily: T.mono,
                fontSize: 10,
                color: u.ext ? '#fff' : T.violetHi,
              }}
            >
              {i + 1}
            </span>
          </div>

          {/* CONTENT */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                marginBottom: 4,
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  fontFamily: T.mono,
                  fontSize: 8,
                  letterSpacing: '0.10em',
                  textTransform: 'uppercase',
                  color: u.ext ? T.gold : T.muted,
                }}
              >
                {u.period}
              </span>

              {u.ext && (
                <span
                  style={{
                    fontFamily: T.mono,
                    fontSize: 7,
                    padding: '2px 6px',
                    borderRadius: 999,
                    background: T.goldLo,
                    border: `0.5px solid ${T.goldB}`,
                    color: T.gold,
                  }}
                >
                  Advanced
                </span>
              )}
            </div>

            <div
              style={{
                fontFamily: T.display,
                fontSize: 13.5,
                fontWeight: 600,
                color: T.hi,
                marginBottom: 4,
                lineHeight: 1.25,
              }}
            >
              {u.title}
            </div>

            <div
              style={{
                fontSize: 10.5,
                color: T.mid,
                lineHeight: 1.55,
                marginBottom: 7,
              }}
            >
              {u.desc}
            </div>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 5,
              }}
            >
              {u.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: T.mono,
                    fontSize: 7,
                    padding: '3px 6px',
                    borderRadius: 999,
                    background: 'rgba(255,255,255,0.04)',
                    border: `0.5px solid ${T.ghost}`,
                    color: T.muted,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  </div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              minHeight: 0,
            }}
          >
            {/* CAPSTONE */}
            <div
              style={{
                borderRadius: 14,
                border: `0.5px solid ${T.violetB}`,
                padding: '14px 16px',
                background: `linear-gradient(135deg,${T.violetLo} 0%,rgba(255,255,255,0.02) 100%)`,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    background: T.violetLo,
                    border: `0.5px solid ${T.violetB}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Rocket size={14} color={T.violetHi} />
                </div>

                <div>
                  <div
                    style={{
                      fontFamily: T.display,
                      fontSize: 13,
                      color: T.hi,
                    }}
                  >
                    Capstone Project
                  </div>

                  <div
                    style={{
                      fontFamily: T.mono,
                      fontSize: 7.5,
                      color: T.violetHi,
                      letterSpacing: '0.05em',
                    }}
                  >
                    Autonomous SEO AI Agent
                  </div>
                </div>
              </div>

              <p
                style={{
                  fontSize: 10.5,
                  lineHeight: 1.6,
                  color: T.mid,
                  margin: '0 0 10px',
                }}
              >
                Build and deploy a production-ready AI agent with live demo,
                GitHub deployment and cloud infrastructure.
              </p>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 5,
                }}
              >
                {[
                  'Live Demo',
                  'GitHub Verified',
                  'Cloud Deployment',
                ].map((t) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: T.mono,
                      fontSize: 7,
                      padding: '3px 7px',
                      borderRadius: 999,
                      background: T.violetLo,
                      border: `0.5px solid ${T.violetB}`,
                      color: T.violetHi,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* PROJECT DOMAINS */}
            <div
              style={{
                background: T.glass,
                border: `0.5px solid ${T.line}`,
                borderRadius: 14,
                padding: '14px 16px',
                borderLeft: `1.5px solid ${T.mint}`,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                  marginBottom: 10,
                  fontFamily: T.display,
                  fontSize: 11.5,
                  color: T.hi,
                }}
              >
                <Layers size={12} color={T.mint} />
                Project Domains
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 6,
                }}
              >
                {DOMAINS.map((p) => (
                  <div
                    key={p}
                    style={{
                      background: 'rgba(16,245,160,0.04)',
                      border: `0.5px solid ${T.line}`,
                      borderRadius: 7,
                      padding: '6px 8px',
                      fontSize: 9.5,
                      color: T.mid,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
                    }}
                  >
                    <div
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: '50%',
                        background: T.mint,
                        flexShrink: 0,
                      }}
                    />
                    {p}
                  </div>
                ))}
              </div>
            </div>

            {/* SCHEDULE */}
            <div
              style={{
                background: T.glass,
                border: `0.5px solid ${T.line}`,
                borderRadius: 14,
                padding: '14px 16px',
                borderLeft: `1.5px solid ${T.gold}`,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                  marginBottom: 10,
                  fontFamily: T.display,
                  fontSize: 11.5,
                  color: T.gold,
                }}
              >
                <Calendar size={12} color={T.gold} />
                Schedule & Format
              </div>

              {SCH.map(([k, v], i) => (
                <div
                  key={k}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '6px 0',
                    borderBottom:
                      i < SCH.length - 1
                        ? `0.5px solid ${T.line}`
                        : 'none',
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      color: T.muted,
                    }}
                  >
                    {k}
                  </span>

                  <span
                    style={{
                      fontSize: 10,
                      color: T.mid,
                      fontWeight: 500,
                    }}
                  >
                    {v}
                  </span>
                </div>
              ))}
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  )
}