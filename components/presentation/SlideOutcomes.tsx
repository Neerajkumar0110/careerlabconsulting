'use client'

/**
 * SLIDE 8 — Outcomes
 * File: SlideOutcomes.tsx
 * Canvas: 1280 × 720 px
 * Optimized compact layout with testimonials
 */

import { motion } from 'framer-motion'
import {
  Briefcase,
  Rocket,
  BrainCircuit,
  Globe,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowUpRight,
  BadgeIndianRupee,
} from 'lucide-react'

const T = {
  void: '#03040A',
  glass: 'rgba(255,255,255,0.03)',
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

  display: "'Clash Display', 'Syne', sans-serif",
  body: "'DM Sans', 'Plus Jakarta Sans', sans-serif",
  mono: "'DM Mono', 'JetBrains Mono', monospace",
}

const STATS = [
  ['12 Months', 'Advanced AI Track'],
  ['6+ Projects', 'Production Systems'],
  ['1:1 Mentorship', 'Expert Guidance'],
  ['Lifetime Access', 'HireX + FreelanceX'],
]

const FEATURES = [
  'Production-grade AI portfolio',
  'Enterprise capstone project',
  'Cloud deployment experience',
  'Resume + LinkedIn optimisation',
  'AI mock interviews',
  'Freelancing opportunities',
]

const TESTIMONIALS = [
  {
    quote:
      'Went from ₹6 LPA to ₹18 LPA in 8 months. The capstone project was what got me the interview at Freshworks. Real projects beat any certificate.',
    name: 'Arjun Sharma',
    role: 'AI Engineer, Freshworks',
    loc: 'Delhi',
    ctc: '₹18 LPA',
    img: 'https://res.cloudinary.com/dguj1vqqb/image/upload/v1778936014/ChatGPT_Image_May_14_2026_08_33_14_PM_wk2pqg.png',
    color: T.violet,
  },
  {
    quote:
      "I'm from a commerce background — zero coding. After the No-Code track, I built an autonomous content agent and got hired as AI Developer at ₹14 LPA.",
    name: 'Priya Menon',
    role: 'No-Code AI Developer, Remote',
    loc: 'Bangalore',
    ctc: '₹14 LPA',
    img: 'https://res.cloudinary.com/dguj1vqqb/image/upload/v1778935726/main-sample.png',
    color: T.mint,
  },
  {
    quote:
      'FreelanceX alone paid my EMIs. I earned ₹45,000 from 3 client projects while still enrolled. By the time I graduated, I had zero outstanding fee.',
    name: 'Rahul Gupta',
    role: 'Freelance AI Developer',
    loc: 'Mumbai',
    ctc: '₹45K/mo',
    img: 'https://res.cloudinary.com/dguj1vqqb/image/upload/v1778935887/ChatGPT_Image_May_14_2026_08_34_53_PM_umfssj.png',
    color: T.gold,
  },
]

export default function SlideOutcomes() {
  return (
    <div
      style={{
        width: 1280,
        height: 720,
        background: T.void,
        position: 'relative',
        overflow: 'hidden',
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
            'radial-gradient(ellipse 80% 70% at 50% 50%, black 35%, transparent 100%)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: '82%',
          top: '18%',
          width: 380,
          height: 380,
          background: `radial-gradient(circle, ${T.gold} 0%, transparent 72%)`,
          opacity: 0.06,
          transform: 'translate(-50%,-50%)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: '10%',
          top: '75%',
          width: 320,
          height: 320,
          background: `radial-gradient(circle, ${T.violet} 0%, transparent 72%)`,
          opacity: 0.06,
          transform: 'translate(-50%,-50%)',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '22px 48px 22px',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 16,
          }}
        >
          <div style={{ maxWidth: 700 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                marginBottom: 6,
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
                  fontSize: 9.5,
                  fontWeight: 500,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: T.mint,
                }}
              >
                Career Outcomes
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
                margin: '0 0 8px',
                fontFamily: T.display,
                fontSize: 32,
                lineHeight: 1.04,
                fontWeight: 600,
                color: T.hi,
                letterSpacing: '-0.03em',
              }}
            >
              Become A{' '}
              <span
                style={{
                  backgroundImage:
                    'linear-gradient(135deg,#7C3AED 0%,#A855F7 35%,#10F5A0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Production AI Engineer.
              </span>
            </h2>

            <p
              style={{
                margin: 0,
                maxWidth: 620,
                color: T.mid,
                fontSize: 13,
                lineHeight: 1.7,
                fontWeight: 300,
              }}
            >
              Learn to architect, deploy and scale modern AI systems using
              multi-agent workflows, RAG pipelines and cloud-native AI
              infrastructure.
            </p>
          </div>

          {/* Tags */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'flex-end',
              gap: 6,
              maxWidth: 280,
            }}
          >
            {[
              ['Placement Support', T.violet, T.violetLo, T.violetB],
              ['Enterprise Projects', T.gold, T.goldLo, T.goldB],
              ['Global Opportunities', T.mint, T.mintLo, T.mintB],
            ].map(([label, c, lo, b]) => (
              <span
                key={label}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  padding: '5px 10px',
                  borderRadius: 999,
                  background: lo as string,
                  border: `0.5px solid ${b}`,
                  color: c as string,
                  fontSize: 8.5,
                  fontFamily: T.mono,
                  letterSpacing: '0.05em',
                  whiteSpace: 'nowrap',
                }}
              >
                <Sparkles size={9} />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Main Layout */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            flex: 1,
            minHeight: 0,
          }}
        >
          {/* Left Side */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              minHeight: 0,
            }}
          >
            {/* Testimonials */}
<div
  style={{
    background: `
      linear-gradient(
        135deg,
        rgba(124,58,237,0.08),
        rgba(16,245,160,0.04)
      )
    `,
    border: `0.5px solid ${T.line}`,
    borderRadius: 18,
    padding: '14px 16px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  }}
>
  <div style={{ marginBottom: 12 }}>
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        marginBottom: 4,
      }}
    >
      <div
        style={{
          width: 14,
          height: 1,
          background: T.mint,
          opacity: 0.7,
        }}
      />

      <span
        style={{
          fontFamily: T.mono,
          fontSize: 8,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: T.mint,
        }}
      >
        Success Stories & Real Results
      </span>
    </div>

    <div
      style={{
        fontFamily: T.display,
        fontSize: 17,
        lineHeight: 1.1,
        fontWeight: 600,
        color: T.hi,
      }}
    >
      Real Graduates.
      <br />
      <span
        style={{
          backgroundImage:
            'linear-gradient(135deg,#7C3AED 0%,#A855F7 40%,#10F5A0 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Verified Outcomes.
      </span>
    </div>
  </div>

  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: 10,
      flex: 1,
    }}
  >
    {TESTIMONIALS.map((t, i) => (
      <motion.div
        key={t.name}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.12 + i * 0.06,
          duration: 0.35,
        }}
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 14,
          border: `0.5px solid ${t.color}35`,
          background: 'rgba(255,255,255,0.025)',
          padding: '12px 13px',
          display: 'flex',
          gap: 12,
          alignItems: 'flex-start',
          minHeight: 108,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -30,
            right: -30,
            width: 90,
            height: 90,
            background: `radial-gradient(${t.color}25,transparent 72%)`,
            pointerEvents: 'none',
          }}
        />

        {/* User Image */}
        <div
          style={{
            width: 54,
            height: 54,
            borderRadius: '50%',
            overflow: 'hidden',
            flexShrink: 0,
            border: `2px solid ${t.color}`,
            boxShadow: `0 0 18px ${t.color}35`,
          }}
        >
          <img
            src={t.img}
            alt={t.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 10,
              alignItems: 'flex-start',
              marginBottom: 6,
            }}
          >
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontFamily: T.display,
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: T.hi,
                  marginBottom: 2,
                }}
              >
                {t.name}
                {' '}
              <span
                style={{
                  fontSize: 9,
                  fontStyle:'italic',
                  color: T.mid,
                  lineHeight: 1.4,
                }}
              >
                {t.role}
              </span>
              </div>


              <div
                style={{
                  fontSize: 8.5,
                  color: T.muted,
                  marginTop: 2,
                }}
              >
                {t.loc}
              </div>
            </div>

            <div
              style={{
                padding: '4px 8px',
                borderRadius: 999,
                background: `${t.color}18`,
                border: `0.5px solid ${t.color}55`,
                fontFamily: T.mono,
                fontSize: 8,
                color: t.color,
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {t.ctc}
            </div>
          </div>

          <p
            style={{
              margin: 0,
              fontSize: 9.6,
              lineHeight: 1.58,
              color: T.mid,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {t.quote}
          </p>

          <div
            style={{
              marginTop: 7,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              fontSize: 7.8,
              color: t.color,
              fontFamily: T.mono,
              letterSpacing: '0.05em',
            }}
          >
            <CheckCircle2 size={9} />
            VERIFIED OUTCOME
          </div>
        </div>
      </motion.div>
    ))}
  </div>
</div>
          </div>
        </div>
      </div>
    </div>
  )
}