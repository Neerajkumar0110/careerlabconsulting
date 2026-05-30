'use client'

/**
 * SLIDE 9 — CTA
 * Canvas: 1280 × 720 px
 * Optimized compact presentation layout
 */

import { ReactNode, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

import {
  Rocket,
  ArrowRight,
  ChevronRight,
  Lock,
  Shield,
  Zap,
  Globe,
  BadgeCheck,
  Clock3,
} from 'lucide-react'
import { FadeIn, Grad } from '../HPOC'
import { T } from './slide_tokens'


/* ─── PRIMITIVES ─────────────────────────────────────────────────────────────── */
function Noise() {
  return (
    <svg style={{ position:'absolute',inset:0,width:'100%',height:'100%',opacity:0.016,pointerEvents:'none',zIndex:0 }} aria-hidden>
      <filter id="n2"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
      <rect width="100%" height="100%" filter="url(#n2)"/>
    </svg>
  )
}

interface ContainerProps {
  children: ReactNode
}

function Container({
  children,
}: ContainerProps) {
  return (
    <div
    style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        maxWidth: 1120,
        margin: '0 auto',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 10,
    }}
    >
      {children}
    </div>
  )
}


/* ══════════════════════════════════════════════════════════════════════════════
   CTA
══════════════════════════════════════════════════════════════════════════════ */

interface CTAProps {
  userName?: string
  profession?: string
}

export default function CTA({
  userName = 'Future AI Engineer',
  profession = 'Professional',
}: CTAProps) {

  const ref = useRef(null)
  const router = useRouter()

  return (
    <section
      id="cta"
      ref={ref}
      style={{
        position: 'relative',
        background: T.void,
        overflow: 'hidden',
        height: 720,
        padding: '42px 0 34px',
      }}
    >
      <Noise />

      {/* Background gradients */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          backgroundImage: `
            radial-gradient(ellipse 80% 50% at 50% 0%,${T.violetLo} 0%,transparent 60%),
            radial-gradient(ellipse 60% 40% at 20% 100%,${T.mintLo} 0%,transparent 60%),
            radial-gradient(ellipse 50% 40% at 80% 100%,${T.goldLo} 0%,transparent 60%)
          `,
          pointerEvents: 'none',
        }}
      />

      {/* Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          backgroundImage: `
            linear-gradient(${T.line} 1px,transparent 1px),
            linear-gradient(90deg,${T.line} 1px,transparent 1px)
          `,
          backgroundSize: '48px 48px',
          opacity: 0.55,
        }}
      />

      {/* Giant text */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          fontFamily: T.display,
          fontSize: '140px',
          fontWeight: 700,
          color: 'rgba(255,255,255,0.015)',
          letterSpacing: '-0.04em',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.7,
        }}
      >
        INTERNX
      </div>

      <Container>
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            maxWidth: 1080,
            margin: '0 auto',
          }}
        >
<FadeIn>
{/* Top Section */}
<div
  style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 920,
    margin: '0 auto',
  }}
>
  {/* Urgency Badge */}
  <motion.div
    animate={{
      scale: [1, 1.015, 1],
    }}
    transition={{
      duration: 2.2,
      repeat: Infinity,
    }}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      background: `
        linear-gradient(
          135deg,
          rgba(244,63,94,0.16),
          rgba(244,63,94,0.04)
        )
      `,
      border: `1px solid rgba(244,63,94,0.30)`,
      borderRadius: 999,
      padding: '8px 18px',
      marginBottom: 24,
      fontFamily: T.mono,
      fontSize: 8.5,
      color: '#FB7185',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 0 30px rgba(244,63,94,0.12)',
    }}
  >
    <Clock3 size={11} />

    Final Seats Closing Soon · Next Batch Starts This Weekend
  </motion.div>

{/* Personalized Heading */}
<h2
  style={{
    fontFamily: T.display,
    fontSize: 58,
    fontWeight: 700,
    lineHeight: 0.95,
    letterSpacing: '-0.02em',
    color: T.hi,
    margin: '0 0 18px',
    textAlign: 'center',
    maxWidth: 920,
  }}
>
  {userName.split(' ')[0]},
  <br />

  <Grad>
    Your AI Career Starts Now.
  </Grad>
</h2>

{/* Personalized Career Line */}
<div
  style={{
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 22,
    padding: '12px 18px',
    borderRadius: 16,
    background: 'rgba(255,255,255,0.035)',
    border: `0.5px solid ${T.line}`,
    backdropFilter: 'blur(10px)',
  }}
>
  <Zap size={14} color={T.gold} />

  <div
    style={{
      fontFamily: T.body,
      fontSize: 12,
      color: T.mid,
      fontWeight: 500,
      letterSpacing: '-0.01em',
      textAlign: 'left',
    }}
  >
    <span style={{ color: T.hi }}>
      {userName}
    </span>

    {profession && (
      <>
        {' '}— top {profession.toLowerCase()}s are already leveraging AI
        to accelerate their careers.
      </>
    )}
  </div>
</div>

{/* Personalized Description */}
<p
  style={{
    fontFamily: T.body,
    fontSize: 14,
    lineHeight: 1.8,
    color: T.mid,
    fontWeight: 300,
    maxWidth: 700,
    margin: '0 auto 30px',
    textAlign: 'center',
  }}
>
  This is your opportunity to move ahead before the market becomes saturated.

  <br />

  Thousands of learners have already transitioned into
  high-paying AI roles, freelance opportunities, and global
  remote careers through CLC's production-focused ecosystem.

  <br />

  <span
    style={{
      color: T.hi,
      fontWeight: 500,
    }}
  >
    The next successful AI transformation story could be yours,
    {` ${userName.split(' ')[0]}`}.
  </span>
</p>

  {/* Micro urgency cards */}
  <div
    style={{
      display: 'flex',
      gap: 14,
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginBottom: 34,
    }}
  >
    {[
      {
        title: `${profession || 'Career'} Growth`,
        sub: 'AI-powered career acceleration',
        color: T.violet,
      },
      {
        title: 'Live Projects',
        sub: 'Build production AI systems',
        color: T.gold,
      },
      {
        title: 'Placement Support',
        sub: 'Interview + hiring assistance',
        color: T.mint,
      },
    ].map((item) => (
      <div
        key={item.title}
        style={{
          padding: '12px 16px',
          borderRadius: 16,
          background: 'rgba(255,255,255,0.03)',
          border: `0.5px solid ${T.line}`,
          minWidth: 185,
          backdropFilter: 'blur(8px)',
        }}
      >
        <div
          style={{
            fontFamily: T.display,
            fontSize: 14,
            fontWeight: 600,
            color: item.color,
            marginBottom: 4,
          }}
        >
          {item.title}
        </div>

        <div
          style={{
            fontFamily: T.body,
            fontSize: 11,
            color: T.mid,
            lineHeight: 1.5,
          }}
        >
          {item.sub}
        </div>
      </div>
    ))}
  </div>

  {/* CTA Buttons */}
  <div
    style={{
      display: 'flex',
      gap: 16,
      justifyContent: 'center',
      flexWrap: 'wrap',
    }}
  >
    {/* Main CTA */}
    <motion.button
      whileHover={{
        scale: 1.03,
        boxShadow: `0 0 40px ${T.violet}50`,
      }}
      whileTap={{ scale: 0.97 }}
      onClick={() =>
        router.push('/internship/internx-ai#pricing')
      }
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        cursor: 'pointer',
        background: `
          linear-gradient(
            135deg,
            ${T.violet},
            #6D28D9
          )
        `,
        border: 'none',
        borderRadius: 18,
        padding: '16px 34px',
        fontFamily: T.display,
        fontSize: 15,
        fontWeight: 600,
        color: '#fff',
        boxShadow: `0 14px 40px ${T.violet}25`,
      }}
    >
      <Rocket size={16} />

      Start Your AI Journey, {userName.split(' ')[0]}

      <ArrowRight size={16} />
    </motion.button>

    {/* Secondary CTA */}
    <motion.a
      href="https://wa.me/918700236923?text=Hi%20CareerLab%20Team%2C%20I%20would%20like%20to%20book%20a%20free%20career%20consultation%20call.%20Please%20share%20the%20next%20steps."
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: 'rgba(255,255,255,0.03)',
        border: `0.5px solid ${T.line}`,
        borderRadius: 18,
        padding: '16px 28px',
        fontFamily: T.display,
        fontSize: 14,
        fontWeight: 500,
        color: T.mid,
        textDecoration: 'none',
        backdropFilter: 'blur(10px)',
      }}
    >
      Book Free Career Call

      <ChevronRight size={14} />
    </motion.a>
  </div>
</div>

</FadeIn>

        </div>
      </Container>
    </section>
  )
}