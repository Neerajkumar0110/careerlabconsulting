'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import HeroStatBar from '@/components/presentation/HeroStatBar'
import SlideAbout from '@/components/presentation/SlideAbout'
import SlideEcosystem from '@/components/presentation/SlideEcosystem'
import SlideProgram from '@/components/presentation/SlideProgram'
import SlideTechStack from '@/components/presentation/SlideTechStack'
import SlideHiring from '@/components/presentation/SlideHiring'
import SlidePricing from '@/components/presentation/SlidePricing'
import SlideOutcomes from '@/components/presentation/SlideOutcomes'
import CTA from '@/components/presentation/CTA'
import LeadCaptureModal, { LeadData } from '@/components/presentation/LeadCaptureModal'

// ─── Design canvas dimensions ─────────────────────────────────────────────────
const DESIGN_W = 1280
const DESIGN_H = 720
const TOPBAR_H = 56
const BOTTOM_H = 32
const CONTENT_H = DESIGN_H - TOPBAR_H - BOTTOM_H
const CONTENT_W = DESIGN_W

export default function PresentationPage() {
  const router = useRouter()

  // ── Lead state ───────────────────────────────────────────────────────────────
  const [lead, setLead]           = useState<LeadData | null>(null)
  const [showModal, setShowModal] = useState(true)
  const emailSentRef              = useRef(false)

  // ── Slide state ──────────────────────────────────────────────────────────────
  const [current, setCurrent] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  // Build slides dynamically so we can pass personalized props
  const SLIDES = lead ? [
    { id: 'hero-statbar', label: 'Home',       content: <HeroStatBar userName={lead.name} /> },
    { id: 'about',        label: 'About',      content: <SlideAbout /> },
    { id: 'ecosystem',    label: 'Ecosystem',  content: <SlideEcosystem /> },
    { id: 'program',      label: 'Program',    content: <SlideProgram /> },
    { id: 'techstack',    label: 'Tech Stack', content: <SlideTechStack /> },
    { id: 'hiring',       label: 'Hiring',     content: <SlideHiring /> },
    { id: 'pricing',      label: 'Pricing',    content: <SlidePricing /> },
    { id: 'outcomes',     label: 'Outcomes',   content: <SlideOutcomes /> },
    { id: 'cta',          label: 'CTA',        content: <CTA userName={lead.name} profession={lead.profession} /> },
  ] : []

  const TOTAL = SLIDES.length

  // ── Send email helper ────────────────────────────────────────────────────────
  /**
   * Fires exactly once per session — guarded by emailSentRef.
   * Uses `navigator.sendBeacon` first (survives page unload),
   * then falls back to a regular fetch if sendBeacon is unavailable.
   */
  const sendEmail = useCallback((leadData: LeadData) => {
    if (emailSentRef.current) return
    emailSentRef.current = true

    const payload = JSON.stringify(leadData)
    const url     = '/api/send-presentation-email'

    const sent = typeof navigator !== 'undefined' && navigator.sendBeacon
      ? navigator.sendBeacon(url, new Blob([payload], { type: 'application/json' }))
      : false

    if (!sent) {
      // fallback: keepalive fetch so it survives brief unloads
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      }).catch(err => console.error('[sendEmail]', err))
    }
  }, [])

  // ── Exit presentation ────────────────────────────────────────────────────────
  const exitPresentation = useCallback(async (leadData?: LeadData) => {
    const data = leadData ?? lead
    if (data) sendEmail(data)          // ← fire email (beacon / fetch)

    try {
      if (document.fullscreenElement) await document.exitFullscreen()
      setTimeout(() => router.push('/internship/internx-ai'), 180)
    } catch {
      router.push('/internship/internx-ai')
    }
  }, [lead, router, sendEmail])

  // ── Send email when user navigates away / closes tab ────────────────────────
  useEffect(() => {
    if (!lead) return

    const handleUnload = () => sendEmail(lead)

    // pagehide fires on tab close, back/forward navigation, and mobile Safari
    window.addEventListener('pagehide', handleUnload)
    // visibilitychange catches tab switching and minimising on most browsers
    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') sendEmail(lead)
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      window.removeEventListener('pagehide', handleUnload)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [lead, sendEmail])

  // ── Fullscreen listener ──────────────────────────────────────────────────────
  useEffect(() => {
    const onFsChange = () => {
      const active = !!document.fullscreenElement
      setIsFullscreen(active)
      if (!active && current < TOTAL - 1 && lead) {
        router.push('/internship/internx-ai')
      }
    }
    document.addEventListener('fullscreenchange', onFsChange)
    return () => document.removeEventListener('fullscreenchange', onFsChange)
  }, [router, current, TOTAL, lead])

  // ── Navigation ───────────────────────────────────────────────────────────────
  const goTo = useCallback((next: number) => {
    if (next < 0 || next > TOTAL) return
    if (next === TOTAL) { exitPresentation(); return }
    setCurrent(next)
  }, [TOTAL, exitPresentation])

  const goPrev = useCallback(() => goTo(current - 1), [current, goTo])
  const goNext = useCallback(() => goTo(current + 1), [current, goTo])

  // ── Keyboard ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!lead) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext()
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   goPrev()
      if (e.key === 'Escape') exitPresentation()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lead, goNext, goPrev, exitPresentation])

  // ── Touch ─────────────────────────────────────────────────────────────────────
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = e.changedTouches[0].clientY - touchStartY.current
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) dx < 0 ? goNext() : goPrev()
    touchStartX.current = null
    touchStartY.current = null
  }

  // ── Modal submit ─────────────────────────────────────────────────────────────
  const handleModalSubmit = (data: LeadData) => {
    setLead(data)
    setShowModal(false)
  }

  const slide = SLIDES[current]

  return (
    <>
      <style jsx global>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { width: 100%; height: 100%; overflow: hidden !important; background: #030712; -webkit-font-smoothing: antialiased; }

        .pres-root { position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; background: #030712; background-image: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.08) 0%, transparent 70%), repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.015) 39px, rgba(255,255,255,0.015) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.015) 39px, rgba(255,255,255,0.015) 40px); overflow: hidden; }

        .pres-stage { position: relative; width: min(100vw - 40px, (100vh - 40px) * 16 / 9); aspect-ratio: 16 / 9; background: #020617; border-radius: 12px; overflow: hidden; box-shadow: 0 0 0 1px rgba(99,179,237,0.10), 0 32px 80px rgba(0,0,0,0.7), 0 0 120px rgba(124,58,237,0.08); contain: strict; }

        .pres-canvas { position: absolute; width: ${DESIGN_W}px; height: ${DESIGN_H}px; top: 0; left: 0; overflow: hidden; }

        .pres-topbar { position: absolute; top: 0; left: 0; right: 0; height: ${TOPBAR_H}px; z-index: 200; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; background: linear-gradient(to bottom, rgba(2,6,23,0.96) 0%, rgba(2,6,23,0.7) 70%, transparent 100%); }

        .pres-logo { height: 28px; width: auto; cursor: pointer; opacity: 0.92; transition: opacity 0.2s; }
        .pres-logo:hover { opacity: 1; }
        .pres-topbar-right { display: flex; align-items: center; gap: 12px; }
        .pres-slide-label { font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(148,163,184,0.7); }
        .pres-counter { font-size: 11px; font-weight: 600; color: rgba(148,163,184,0.5); font-variant-numeric: tabular-nums; }
        .pres-end-btn { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: rgba(148,163,184,0.7); background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 999px; padding: 5px 12px; cursor: pointer; transition: all 0.2s; }
        .pres-end-btn:hover { color: white; background: rgba(239,68,68,0.15); border-color: rgba(239,68,68,0.3); }

        .pres-greeting { font-size: 11px; color: rgba(167,139,250,0.8); font-weight: 500; }

        .pres-content-zone { position: absolute; top: ${TOPBAR_H}px; left: 0; width: ${CONTENT_W}px; height: ${CONTENT_H}px; overflow: hidden; contain: layout paint; }

        .pres-slides-track { display: flex; height: 100%; will-change: transform; transition: transform 850ms cubic-bezier(0.22, 1, 0.36, 1); backface-visibility: hidden; transform-style: preserve-3d; }

        .pres-slide { position: relative; flex: 0 0 ${CONTENT_W}px; width: ${CONTENT_W}px; height: ${CONTENT_H}px; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px 60px 16px; contain: layout paint; backface-visibility: hidden; transform: translateZ(0); }
        .pres-slide > * { max-width: 100%; max-height: 100%; min-width: 0; min-height: 0; flex-shrink: 1; }

        .pres-bottom { position: absolute; bottom: 0; left: 0; right: 0; height: ${BOTTOM_H}px; z-index: 200; display: flex; align-items: center; justify-content: center; gap: 6px; background: linear-gradient(to top, rgba(2,6,23,0.8) 0%, transparent 100%); }

        .pres-progress { position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: rgba(255,255,255,0.05); }
        .pres-progress-fill { height: 100%; background: linear-gradient(90deg, #7c3aed, #60a5fa); transition: width 0.4s cubic-bezier(0.4,0,0.2,1); border-radius: 0 2px 2px 0; }

        .pres-dot { width: 5px; height: 5px; border-radius: 999px; background: rgba(255,255,255,0.2); cursor: pointer; transition: all 0.25s ease; border: none; padding: 0; }
        .pres-dot.active { background: #7c3aed; width: 20px; box-shadow: 0 0 8px rgba(124,58,237,0.6); }
        .pres-dot:hover:not(.active) { background: rgba(255,255,255,0.4); }

        .pres-arrow { position: absolute; top: 50%; transform: translateY(-50%); z-index: 200; display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.10); background: rgba(2,6,23,0.7); backdrop-filter: blur(8px); color: rgba(255,255,255,0.6); cursor: pointer; transition: all 0.2s; }
        .pres-arrow:hover { background: rgba(124,58,237,0.25); border-color: rgba(124,58,237,0.4); color: white; transform: translateY(-50%) scale(1.08); }
        .pres-arrow:disabled { opacity: 0.2; cursor: default; transform: translateY(-50%); }
        .pres-arrow-left { left: 14px; }
        .pres-arrow-right { right: 14px; }

        .pres-noise { position: absolute; inset: 0; z-index: 1; pointer-events: none; opacity: 0.018; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
        .pres-corner { position: absolute; width: 16px; height: 16px; pointer-events: none; }
        .pres-corner.tl { top:-1px; left:-1px; border-top:2px solid rgba(124,58,237,0.4); border-left:2px solid rgba(124,58,237,0.4); }
        .pres-corner.tr { top:-1px; right:-1px; border-top:2px solid rgba(124,58,237,0.4); border-right:2px solid rgba(124,58,237,0.4); }
        .pres-corner.bl { bottom:-1px; left:-1px; border-bottom:2px solid rgba(124,58,237,0.4); border-left:2px solid rgba(124,58,237,0.4); }
        .pres-corner.br { bottom:-1px; right:-1px; border-bottom:2px solid rgba(124,58,237,0.4); border-right:2px solid rgba(124,58,237,0.4); }

        .pres-stage, .pres-canvas, .pres-slide { backface-visibility: hidden; transform: translateZ(0); }
      `}</style>

      {/* ── Lead Capture Modal ── */}
      {showModal && <LeadCaptureModal onSubmit={handleModalSubmit} />}

      {/* ── Presentation (only rendered after modal is dismissed) ── */}
      {lead && (
        <div className="pres-root" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <div className="pres-stage" id="pres-stage">
            <CanvasScaler>
              <div className="pres-noise" />
              <div className="pres-corner tl" /><div className="pres-corner tr" />
              <div className="pres-corner bl" /><div className="pres-corner br" />

              {/* Topbar */}
              <div className="pres-topbar">
                <img src="/logo.png" alt="Career Lab Consulting" className="pres-logo" onClick={() => router.push('/')} />

                <span className="pres-slide-label">{slide?.label}</span>

                <div className="pres-topbar-right">
                  <span className="pres-counter">{current + 1} / {TOTAL}</span>
                  <button className="pres-end-btn" onClick={() => exitPresentation()}>
                    <X size={11} /> End
                  </button>
                </div>
              </div>

              {/* Content zone */}
              <div className="pres-content-zone">
                <div
                  className="pres-slides-track"
                  style={{ transform: `translate3d(-${current * CONTENT_W}px, 0, 0)` }}
                >
                  {SLIDES.map((s) => (
                    <section key={s.id} className="pres-slide">
                      {s.content}
                    </section>
                  ))}
                </div>
              </div>

              {/* Nav arrows */}
              <button className="pres-arrow pres-arrow-left" onClick={goPrev} disabled={current === 0} aria-label="Previous slide">
                <ChevronLeft size={18} />
              </button>
              <button className="pres-arrow pres-arrow-right" onClick={goNext} aria-label="Next slide">
                <ChevronRight size={18} />
              </button>

              {/* Bottom chrome */}
              <div className="pres-bottom">
                {SLIDES.map((s, i) => (
                  <button
                    key={s.id}
                    className={`pres-dot${i === current ? ' active' : ''}`}
                    onClick={() => goTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
                <div className="pres-progress">
                  <div className="pres-progress-fill" style={{ width: `${((current + 1) / TOTAL) * 100}%` }} />
                </div>
              </div>
            </CanvasScaler>
          </div>
        </div>
      )}
    </>
  )
}

// ── CanvasScaler ──────────────────────────────────────────────────────────────
export function CanvasScaler({ children }: { children: React.ReactNode }) {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const scaleX = (vw - 32) / DESIGN_W
      const scaleY = (vh - 32) / DESIGN_H
      setScale(Math.min(scaleX, scaleY))
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <div style={{ position:'fixed', inset:0, display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', background:'#000', transform:'translateZ(0)' }}>
      <div style={{ width:DESIGN_W, height:DESIGN_H, position:'relative', transform:`scale(${scale})`, transformOrigin:'center center', flexShrink:0, willChange:'transform', backfaceVisibility:'hidden' }}>
        {children}
      </div>
    </div>
  )
}