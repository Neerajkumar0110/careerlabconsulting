'use client'

import { useEffect, useState } from 'react'
import {
  LayoutList,
  X,
  Clock3,
  CalendarDays,
  Layers3,
  ChevronRight,
  Brain,
  Code2,
  ServerCog,
  Database,
  Rocket,
  ShieldCheck,
  Workflow,
  Cpu,
  Cloud,
  ScrollText,
} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

type Unit = {
  num: string
  name: string
  sub: string
  hrs: string
}

type PhaseProps = {
  tag: string
  title: string
  badge: string
  units: Unit[]
  accent: string
  accentSoft: string
  icon: React.ReactNode
}

const T = {
  bg: '#070B15',
  card: 'rgba(255,255,255,0.03)',
  line: 'rgba(255,255,255,0.08)',

  hi: '#F3F4F6',
  mid: '#B3B8CF',
  muted: '#6B728A',

  violet: '#7C3AED',
  violetSoft: 'rgba(124,58,237,0.10)',

  mint: '#10F5A0',
  mintSoft: 'rgba(16,245,160,0.08)',

  cyan: '#06B6D4',
  cyanSoft: 'rgba(6,182,212,0.10)',

  gold: '#F0A500',
  goldSoft: 'rgba(240,165,0,0.10)',

  body: "'DM Sans', 'Inter', sans-serif",
}

const units1: Unit[] = [
  {
    num: 'U1',
    name: 'Python Programming Foundations',
    sub: 'Variables, OOP, APIs, async, web scraping, Pandas and backend engineering fundamentals.',
    hrs: '27 hrs',
  },
  {
    num: 'U2',
    name: 'NLP Fundamentals',
    sub: 'Embeddings, tokenisation, prompt engineering, sentiment analysis and LLM internals.',
    hrs: '18 hrs',
  },
  {
    num: 'U3',
    name: 'LLM APIs & Prompt Engineering',
    sub: 'OpenAI, Anthropic, Gemini APIs, LangChain, RAG pipelines and vector databases.',
    hrs: '27 hrs',
  },
  {
    num: 'U4',
    name: 'AI Agent Architecture',
    sub: 'ReAct loops, tool calling, LangGraph workflows, memory systems and observability.',
    hrs: '36 hrs',
  },
  {
    num: 'U5',
    name: 'SEO Domain & Feature Engineering',
    sub: 'SERP APIs, automation pipelines, CMS publishing, alerts and workflow orchestration.',
    hrs: '45 hrs',
  },
  {
    num: 'U6',
    name: 'Productionisation & Capstone',
    sub: 'Docker, FastAPI, deployment pipelines and full SEO AI agent capstone project.',
    hrs: '63 hrs',
  },
]

const units2: Unit[] = [
  {
    num: 'U7',
    name: 'ML Engineering for Agent Features',
    sub: 'LoRA fine-tuning, SHAP explainability, RLHF basics and custom ML pipelines.',
    hrs: '36 hrs',
  },
  {
    num: 'U8',
    name: 'System Design for AI Systems',
    sub: 'Microservices, messaging queues, scalability, security and enterprise architecture.',
    hrs: '45 hrs',
  },
  {
    num: 'U9',
    name: 'Cloud, MLOps & DevOps',
    sub: 'Kubernetes, Terraform, AWS, MLflow, observability and CI/CD automation.',
    hrs: '45 hrs',
  },
  {
    num: 'U10',
    name: 'AI Research Skills',
    sub: 'Reading papers, implementing research techniques and technical documentation.',
    hrs: '36 hrs',
  },
  {
    num: 'U11',
    name: 'Product & Business of AI Agents',
    sub: 'AI SaaS models, compliance, monetisation and multi-tenant product systems.',
    hrs: '36 hrs',
  },
  {
    num: 'U12',
    name: 'Enterprise Capstone',
    sub: 'Enterprise multi-agent SaaS with dashboards, orchestration and cloud deployment.',
    hrs: '36 hrs',
  },
]

const pills = [
  {
    label: 'LoRA Fine-Tuning',
    icon: <Brain size={13} />,
  },
  {
    label: 'Kubernetes + Terraform',
    icon: <Cloud size={13} />,
  },
  {
    label: 'System Design',
    icon: <Layers3 size={13} />,
  },
  {
    label: 'Research Papers',
    icon: <ScrollText size={13} />,
  },
  {
    label: 'AI SaaS Engineering',
    icon: <Rocket size={13} />,
  },
  {
    label: 'Enterprise Agents',
    icon: <Workflow size={13} />,
  },
]
type Props = {
  open: boolean
  setOpen: (value: boolean) => void
}

export default function CurriculumModal({
  open,
  setOpen,
}: Props) {

  const handleEnroll = () => {
    setOpen(false)

    setTimeout(() => {
      const pricing = document.getElementById('pricing')

      if (pricing) {
        pricing.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    }, 120)
  }

  useEffect(() => {
  if (open) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }

  return () => {
    document.body.style.overflow = 'auto'
  }
}, [open])

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '12px 20px',
          borderRadius: 12,
          background: 'rgba(255,255,255,0.03)',
          border: `0.5px solid ${T.line}`,
          color: T.mid,
          fontFamily: T.body,
          fontSize: 14,
          cursor: 'pointer',
          transition: '0.25s ease',
        }}
      >
        <LayoutList size={15} />
        View Curriculum
      </button>

      {/* Modal */}
      <AnimatePresence mode="wait">
  {open && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false)
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,

        background: 'rgba(0,0,0,0.72)',
        backdropFilter: 'blur(10px)',

        overflowY: 'auto',

        paddingTop: 90,
        paddingBottom: 40,
        paddingLeft: 20,
        paddingRight: 20,

        WebkitOverflowScrolling: 'touch',
      }}
    >
      {/* CENTER WRAPPER */}
      <div
        style={{
          minHeight: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        {/* MODAL */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.96,
            y: 30,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.97,
            y: 20,
          }}
          transition={{
            duration: 0.34,
            ease: [0.16, 1, 0.3, 1],
          }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: 980,

            background: '#0B0D12',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 24,

            overflow: 'hidden',

            position: 'relative',

            boxShadow:
              '0 24px 90px rgba(0,0,0,0.45)',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 1080,
              margin: '0 auto',
              background: T.bg,
              border: `1px solid ${T.line}`,
              borderRadius: 28,
              overflow: 'hidden',
              fontFamily: T.body,
              position: 'relative',
              boxShadow: '0 30px 80px rgba(0,0,0,0.45)',
            }}
          >
            {/* Glow */}
            <div
              style={{
                position: 'absolute',
                top: -120,
                right: -100,
                width: 320,
                height: 320,
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(124,58,237,0.20) 0%, transparent 72%)',
                pointerEvents: 'none',
              }}
            />

            {/* Header */}
            <div
              style={{
                padding: '44px 46px 34px',
                borderBottom: `1px solid ${T.line}`,
                position: 'relative',
              }}
            >
              <button
                onClick={() => setOpen(false)}
                style={{
                  position: 'absolute',
                  top: 26,
                  right: 26,
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  border: `1px solid ${T.line}`,
                  background: 'rgba(255,255,255,0.03)',
                  color: T.mid,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <X size={16} />
              </button>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 12px',
                  borderRadius: 999,
                  background: T.violetSoft,
                  border: `1px solid rgba(124,58,237,0.22)`,
                  color: '#B998FF',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: 18,
                }}
              >
                <Cpu size={13} />
                Complete AI Engineering Curriculum
              </div>

              <h1
                style={{
                  fontSize: 40,
                  lineHeight: 1.08,
                  color: T.hi,
                  margin: '0 0 16px',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  maxWidth: 760,
                }}
              >
                Autonomous AI Agent Development Program
              </h1>

              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.8,
                  color: T.mid,
                  margin: 0,
                  maxWidth: 760,
                }}
              >
                Learn modern AI engineering from Python fundamentals to
                production-ready autonomous agent systems, cloud deployment,
                multi-agent orchestration and enterprise AI architecture.
              </p>
            </div>

            {/* Stats */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3,1fr)',
                borderBottom: `1px solid ${T.line}`,
              }}
            >
              {[
                {
                  val: '234 hrs',
                  lbl: '6-Month Track',
                  icon: <Clock3 size={15} />,
                },
                {
                  val: '468 hrs',
                  lbl: '12-Month Track',
                  icon: <CalendarDays size={15} />,
                },
                {
                  val: '6 Days/Week',
                  lbl: 'Live Sessions',
                  icon: <Layers3 size={15} />,
                },
              ].map((s) => (
                <div
                  key={s.lbl}
                  style={{
                    padding: '24px 20px',
                    borderRight: `1px solid ${T.line}`,
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginBottom: 10,
                      color: T.violet,
                    }}
                  >
                    {s.icon}
                  </div>

                  <div
                    style={{
                      fontSize: 28,
                      fontWeight: 700,
                      color: T.hi,
                    }}
                  >
                    {s.val}
                  </div>

                  <div
                    style={{
                      marginTop: 4,
                      fontSize: 11,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: T.muted,
                    }}
                  >
                    {s.lbl}
                  </div>
                </div>
              ))}
            </div>

            {/* Content */}
            <div
              style={{
                padding: '34px 40px 40px',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 22,
                  marginBottom: 26,
                }}
              >
                <Phase
                  tag='Months 1–6 · Foundation Track'
                  title='Build Your First Production AI Agent'
                  badge='234 hrs'
                  units={units1}
                  accent={T.violet}
                  accentSoft={T.violetSoft}
                  icon={<Code2 size={15} />}
                />

                <Phase
                  tag='Months 7–12 · Advanced Track'
                  title='Engineer Enterprise AI Systems'
                  badge='+234 hrs'
                  units={units2}
                  accent={T.cyan}
                  accentSoft={T.cyanSoft}
                  icon={<ServerCog size={15} />}
                />
              </div>

              {/* Bottom section */}
              <div
                style={{
                  background: T.card,
                  border: `1px solid ${T.line}`,
                  borderRadius: 22,
                  padding: '26px 28px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginBottom: 16,
                    color: T.gold,
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  <ShieldCheck size={15} />
                  Why Continue Beyond 6 Months?
                </div>

                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.9,
                    color: T.mid,
                    margin: '0 0 22px',
                  }}
                >
                  The first 6 months make you capable of building and deploying
                  AI agents. The advanced track transforms you into an
                  engineering-level AI professional capable of designing
                  enterprise architectures, managing production AI systems,
                  implementing MLOps workflows, fine-tuning models and building
                  scalable AI SaaS platforms.
                </p>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 10,
                  }}
                >
                  {pills.map((p) => (
                    <div
                      key={p.label}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '8px 14px',
                        borderRadius: 999,
                        background: T.violetSoft,
                        border: `1px solid rgba(124,58,237,0.22)`,
                        color: '#C4B5FD',
                        fontSize: 12,
                        fontWeight: 500,
                      }}
                    >
                      {p.icon}
                      {p.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div
              style={{
                padding: '22px 40px 30px',
                borderTop: `1px solid ${T.line}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 20,
                flexWrap: 'wrap',
              }}
            >
              <div
                style={{
                  fontSize: 12.5,
                  lineHeight: 1.8,
                  color: T.muted,
                }}
              >
                Live practical sessions · Industry-grade capstone projects ·
                Production deployment workflows · Enterprise AI architecture
              </div>

              <button
                onClick={handleEnroll}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '13px 22px',
                  borderRadius: 12,
                  border: 'none',
                  cursor: 'pointer',
                  background:
                    'linear-gradient(135deg,#7C3AED 0%,#A855F7 100%)',
                  color: '#fff',
                  fontFamily: T.body,
                  fontSize: 14,
                  fontWeight: 600,
                  boxShadow: '0 10px 30px rgba(124,58,237,0.35)',
                }}
              >
                Enrol Now
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>
        </div>
        </motion.div>
    
      )}
    </AnimatePresence>  
    </>
  )
}

function Phase({
  tag,
  title,
  badge,
  units,
  accent,
  accentSoft,
  icon,
}: PhaseProps) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: `1px solid rgba(255,255,255,0.08)`,
        borderRadius: 22,
        overflow: 'hidden',
        height: '100%',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '22px 22px 18px',
          borderBottom: `1px solid rgba(255,255,255,0.06)`,
          background: accentSoft,
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            padding: '5px 10px',
            borderRadius: 999,
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid rgba(255,255,255,0.08)`,
            color: accent,
            fontSize: 10.5,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: 14,
          }}
        >
          {icon}
          {tag}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 12,
            alignItems: 'flex-start',
          }}
        >
          <div
            style={{
              fontSize: 22,
              lineHeight: 1.25,
              color: T.hi,
              fontWeight: 700,
              maxWidth: 320,
            }}
          >
            {title}
          </div>

          <div
            style={{
              whiteSpace: 'nowrap',
              padding: '7px 12px',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.05)',
              border: `1px solid rgba(255,255,255,0.08)`,
              color: accent,
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {badge}
          </div>
        </div>
      </div>

      {/* Units */}
      <div
        style={{
          padding: '10px 22px 16px',
        }}
      >
        {units.map((u, i) => (
          <div
            key={u.num}
            style={{
              display: 'flex',
              gap: 14,
              padding: '16px 0',
              borderBottom:
                i < units.length - 1
                  ? '1px solid rgba(255,255,255,0.06)'
                  : 'none',
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                flexShrink: 0,
                borderRadius: 12,
                background: accentSoft,
                border: `1px solid rgba(255,255,255,0.08)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: accent,
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              {u.num}
            </div>

            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: T.hi,
                  lineHeight: 1.45,
                  marginBottom: 5,
                }}
              >
                {u.name}
              </div>

              <div
                style={{
                  fontSize: 12.5,
                  lineHeight: 1.7,
                  color: T.mid,
                }}
              >
                {u.sub}
              </div>
            </div>

            <div
              style={{
                whiteSpace: 'nowrap',
                fontSize: 11,
                color: T.muted,
                paddingTop: 2,
              }}
            >
              {u.hrs}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}