'use client';

import React, { useRef, useEffect, useState } from 'react';
import {
  Code2,
  Building2,
  Rocket,
  BarChart3,
  Layers,
  GraduationCap,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────────────────── */

const AUDIENCE = [
  {
    icon: Code2,
    title: 'Engineering Teams',
    description: 'Building LLM applications, RAG systems, and production AI infrastructure.',
    accent: '#3b82f6',
    glowRgb: '59,130,246',
  },
  {
    icon: Building2,
    title: 'Enterprise AI Teams',
    description: 'Driving internal AI adoption, automation, and digital transformation at scale.',
    accent: '#6366f1',
    glowRgb: '99,102,241',
  },
  {
    icon: Rocket,
    title: 'Startups',
    description: 'Moving fast on AI-first products and scaling intelligent systems from day one.',
    accent: '#8b5cf6',
    glowRgb: '139,92,246',
  },
  {
    icon: BarChart3,
    title: 'Data & Analytics Teams',
    description: 'Enhancing decision-making with AI-powered pipelines and intelligence systems.',
    accent: '#3b82f6',
    glowRgb: '59,130,246',
  },
  {
    icon: Layers,
    title: 'Product & Technology Leaders',
    description: 'Defining AI strategy, architecture standards, and implementation roadmaps.',
    accent: '#6366f1',
    glowRgb: '99,102,241',
  },
  {
    icon: GraduationCap,
    title: 'Institutions & Learning Teams',
    description: 'Designing AI education programs and structured technical upskilling pathways.',
    accent: '#8b5cf6',
    glowRgb: '139,92,246',
  },
] as const;

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`;

/* ─────────────────────────────────────────────────────────────────────────────
   INTERSECTION HOOK
───────────────────────────────────────────────────────────────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─────────────────────────────────────────────────────────────────────────────
   GLOBAL STYLES — injected once, hover entirely in CSS
   Using CSS custom properties per-card so one stylesheet handles all colours.
───────────────────────────────────────────────────────────────────────────── */
const CSS = `
  .aud-card {
    position: relative;
    cursor: default;
    border-radius: 1rem;
    padding: 1px;
    /* GPU layer from the start — no promotion on hover */
    will-change: transform;
    transform: translateZ(0);
    background: linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%);
    box-shadow: 0 2px 16px -4px rgba(0,0,0,0.5);
    transition:
      transform      0.3s cubic-bezier(0.22, 1, 0.36, 1),
      box-shadow     0.3s cubic-bezier(0.22, 1, 0.36, 1),
      background     0.3s ease;
  }

  .aud-card:hover {
    transform: translateY(-4px) translateZ(0);
    background: linear-gradient(145deg,
      rgba(var(--card-rgb), 0.55) 0%,
      rgba(255,255,255,0.08) 50%,
      rgba(var(--card-rgb), 0.22) 100%
    );
    box-shadow:
      0 0 0 1px rgba(var(--card-rgb), 0.18),
      0 16px 48px -8px rgba(var(--card-rgb), 0.28),
      0 6px 24px -6px rgba(0,0,0,0.7);
  }

  /* ── Card inner face ── */
  .aud-face {
    position: relative;
    border-radius: calc(1rem - 1px);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background: #050c1a;
    min-height: 230px;
    transition: background 0.3s ease;
  }

  .aud-card:hover .aud-face {
    background: #07101f;
  }

  /* ── Top specular edge ── */
  .aud-specular {
    position: absolute;
    top: 0; left: 2.5rem; right: 2.5rem;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent);
    transition: background 0.3s ease;
    pointer-events: none;
  }

  .aud-card:hover .aud-specular {
    background: linear-gradient(to right,
      transparent,
      rgba(var(--card-rgb), 0.6),
      rgba(255,255,255,0.35),
      rgba(var(--card-rgb), 0.6),
      transparent
    );
  }

  /* ── Top ambient glow ── */
  .aud-glow {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 55%;
    background: radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,255,255,0.018) 0%, transparent 80%);
    transition: background 0.35s ease;
    pointer-events: none;
  }

  .aud-card:hover .aud-glow {
    background: radial-gradient(ellipse 80% 55% at 50% 0%,
      rgba(var(--card-rgb), 0.17) 0%,
      transparent 80%
    );
  }

  /* ── Icon wrapper ── */
  .aud-icon-shell {
    position: relative;
    padding: 1px;
    border-radius: 14px;
    background: linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 100%);
    box-shadow: none;
    transition:
      background  0.3s ease,
      box-shadow  0.3s ease;
  }

  .aud-card:hover .aud-icon-shell {
    background: linear-gradient(145deg,
      rgba(var(--card-rgb), 0.75) 0%,
      rgba(255,255,255,0.1) 50%,
      rgba(var(--card-rgb), 0.35) 100%
    );
    box-shadow: 0 0 18px -4px rgba(var(--card-rgb), 0.45);
  }

  /* ── Icon face ── */
  .aud-icon-face {
    width: 48px; height: 48px;
    border-radius: 13px;
    display: flex; align-items: center; justify-content: center;
    overflow: hidden;
    position: relative;
    background: linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
    transition: background 0.3s ease;
  }

  .aud-card:hover .aud-icon-face {
    background: linear-gradient(145deg,
      rgba(var(--card-rgb), 0.2) 0%,
      rgba(5,13,28,0.95) 100%
    );
  }

  /* ── Icon SVG colour ── */
  .aud-icon {
    width: 20px; height: 20px;
    position: relative; z-index: 1;
    color: rgba(255,255,255,0.75);
    filter: none;
    transition: color 0.3s ease, filter 0.3s ease;
  }

  /* ── Icon glow blob behind ── */
  .aud-icon-glow {
    position: absolute;
    inset: -10px;
    border-radius: 50%;
    background: transparent;
    filter: blur(10px);
    transition: background 0.35s ease;
    pointer-events: none;
  }

  .aud-card:hover .aud-icon-glow {
    background: radial-gradient(circle,
      rgba(var(--card-rgb), 0.32) 0%,
      transparent 70%
    );
  }

  /* ── Title ── */
  .aud-title {
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: -0.015em;
    line-height: 1.25;
    color: rgba(226,232,240,0.85);
    text-align: center;
    transition: color 0.25s ease;
  }

  .aud-card:hover .aud-title {
    color: #ffffff;
  }

  /* ── Animated underline ── */
  .aud-rule {
    height: 1px;
    width: 64px;
    background: linear-gradient(to right, transparent, var(--card-accent), transparent);
    transition: width 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .aud-card:hover .aud-rule {
    width: 104px;
  }

  /* ── Description ── */
  .aud-desc {
    font-size: 0.8rem;
    line-height: 1.72;
    color: rgba(100,116,139,0.88);
    letter-spacing: 0.008em;
    text-align: center;
    max-width: 22ch;
    margin: 0 auto;
    transition: color 0.25s ease;
  }

  .aud-card:hover .aud-desc {
    color: rgba(148,163,184,0.82);
  }

  /* ── Scan-line texture ── */
  .aud-scanlines {
    position: absolute; inset: 0;
    pointer-events: none;
    background-image: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(255,255,255,0.006) 2px,
      rgba(255,255,255,0.006) 4px
    );
  }

  /* ── Bottom vignette ── */
  .aud-vignette {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 2.5rem;
    background: linear-gradient(to top, rgba(3,6,14,0.45), transparent);
    pointer-events: none;
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────────────────────────────────────── */
export default function WhoThisIsBuiltForSection2() {
  const { ref, inView } = useInView();

  return (
    <section
      className="relative overflow-hidden bg-[#030810]"
      style={{ padding: '8rem 0 9rem' }}
    >
      {/* Inject CSS once */}
      <style>{CSS}</style>

      {/* Background layers */}
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 90% 60% at -5% -10%, rgba(59,130,246,0.09) 0%, transparent 55%),
          radial-gradient(ellipse 60% 50% at 105% 110%, rgba(99,102,241,0.07) 0%, transparent 55%)
        `,
      }} />
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }} />
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-30"
        style={{ backgroundImage: NOISE_SVG, backgroundRepeat: 'repeat' }} />
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to bottom, #030810 0%, transparent 10%, transparent 90%, #030810 100%)',
      }} />

      {/* Content */}
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

        {/* Heading */}
        <div
          className="mb-16 flex flex-col items-center text-center"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.65s ease, transform 0.65s ease',
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8" style={{ background: 'linear-gradient(to right, #3b82f6, transparent)' }} />
            <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#3b82f6' }}>
              Audience
            </span>
            <div className="h-px w-8" style={{ background: 'linear-gradient(to left, #3b82f6, transparent)' }} />
          </div>

          <h2
            className="font-black text-white mb-5"
            style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.8rem)', letterSpacing: '-0.03em', lineHeight: 0.92 }}
          >
            Who This Is<br />
            <span style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #3b82f6 55%, #a78bfa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Built For
            </span>
          </h2>

          <p style={{
            fontSize: 'clamp(0.88rem, 1.35vw, 1.02rem)',
            color: 'rgba(148,163,184,0.68)',
            lineHeight: 1.75,
            maxWidth: '36rem',
            letterSpacing: '0.005em',
          }}>
            Designed for teams actively building, adopting, and scaling AI systems
            in production environments.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: '16px',
        }}>
          {AUDIENCE.map(({ icon: Icon, title, description, accent, glowRgb }, i) => (
            <div
              key={title}
              className="aud-card"
              style={{
                '--card-accent': accent,
                '--card-rgb': glowRgb,
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0) translateZ(0)' : 'translateY(18px) translateZ(0)',
                transition: `
                  opacity      0.55s ease ${i * 60}ms,
                  transform    0.55s ease ${i * 60}ms,
                  box-shadow   0.3s cubic-bezier(0.22, 1, 0.36, 1),
                  background   0.3s ease
                `,
              } as React.CSSProperties}
            >
              <div className="aud-face">
                <div className="aud-specular" />
                <div className="aud-glow" />
                <div className="aud-scanlines" />

                <div className="relative z-10 flex flex-col items-center gap-5 px-7 py-8 w-full">

                  {/* Icon */}
                  <div className="relative flex-shrink-0">
                    <div className="aud-icon-glow" />
                    <div className="aud-icon-shell">
                      <div className="aud-icon-face">
                        <div className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none"
                          style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.06), transparent)' }} />
                        <Icon className="aud-icon" />
                      </div>
                    </div>
                  </div>

                  {/* Text */}
                  <div className="flex flex-col items-center gap-2 w-full">
                    <h3 className="aud-title">{title}</h3>
                    <div className="aud-rule" />
                    <p className="aud-desc">{description}</p>
                  </div>

                </div>

                <div className="aud-vignette" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}