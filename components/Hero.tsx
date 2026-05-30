'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Bolt, LayoutList, ShieldCheck } from 'lucide-react'
import CurriculumModal from '@/components/CurriculumModal'

/* ─────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────── */
const C = {
  bg:       '#080B12',
  indigo:   '#6366f1',
  indigoHi: '#818cf8',
  teal:     '#34d399',
  amber:    '#f59e0b',
  textPri:  '#F0F2FA',
  textMid:  '#C8CEDF',
  textMut:  '#8E95AA',
  textDim:  '#4A5162',
  border:   'rgba(255,255,255,0.07)',
}

/* ─────────────────────────────────────────
   LEFT COLUMN DATA
───────────────────────────────────────── */
const STATS = [
  { num: '₹11.8L', label: 'Avg India CTC'   },
  { num: '₹19.2L', label: 'Avg Global CTC'  },
  { num: '88%',    label: 'Offer Conversion' },
]

/* ─────────────────────────────────────────
   RIGHT COLUMN DATA
───────────────────────────────────────── */
const COMPANIES = [
  'OpenAI','Razorpay','Zepto','CRED','Sarvam',
  'PhysicsWallah','Groww','Postman','Meesho','Slice',
]

/* ─────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────── */

/** Animated number counter triggered on scroll-into-view */
function Counter({
  to, prefix = '', suffix = '', duration = 1800,
}: {
  to: number; prefix?: string; suffix?: string; duration?: number
}) {
  const [val, setVal] = useState(0)
  const ref  = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  useEffect(() => {
    if (!inView) return
    let start: number | null = null
    const tick = (ts: number) => {
      if (!start) start = ts
      const p    = Math.min((ts - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(ease * to))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, to, duration])

  return <span ref={ref}>{prefix}{val}{suffix}</span>
}

/** Animated radial arc gauge */
function ArcMeter({
  pct, color, trackColor, size = 96, stroke = 6, delay = 0,
}: {
  pct: number; color: string; trackColor: string
  size?: number; stroke?: number; delay?: number
}) {
  const r    = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const arc  = circ - circ * 0.28             // 72% of circle visible
  const [offset, setOffset] = useState(arc)
  const ref    = useRef<SVGCircleElement>(null)
  const inView = useInView(ref as any, { once: true, margin: '-40px' })

  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => setOffset(arc - arc * (pct / 100)), delay)
    return () => clearTimeout(t)
  }, [inView, pct, arc, delay])

  const cx = size / 2, cy = size / 2
  const startDeg = 90 + 360 * 0.14

  return (
    <svg width={size} height={size} style={{ transform: `rotate(${startDeg}deg)` }} aria-hidden>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={trackColor} strokeWidth={stroke}
        strokeLinecap="round" strokeDasharray={`${arc} ${circ - arc}`} />
      <circle ref={ref} cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeLinecap="round" strokeDasharray={`${arc} ${circ - arc}`}
        strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 1.6s cubic-bezier(0.22,1,0.36,1)' }} />
    </svg>
  )
}

/** Thin animated progress bar */
function SlimBar({
  pct, gradient, delay = 0,
}: { pct: number; gradient: string; delay?: number }) {
  const [w, setW]  = useState(0)
  const ref        = useRef<HTMLDivElement>(null)
  const inView     = useInView(ref as any, { once: true, margin: '-40px' })

  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => setW(pct), delay)
    return () => clearTimeout(t)
  }, [inView, pct, delay])

  return (
    <div ref={ref} style={{ height: 3, borderRadius: 99, background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
      <div style={{
        height: '100%', width: `${w}%`, borderRadius: 99,
        background: gradient,
        transition: 'width 1.6s cubic-bezier(0.22,1,0.36,1)',
      }} />
    </div>
  )
}

/* ─────────────────────────────────────────
   MAIN HERO COMPONENT
───────────────────────────────────────── */
export default function Hero() {
  const [openCurriculum, setOpenCurriculum] = useState(false)

  return (
    <section
      id="hero"
      style={{
        paddingTop: 60,
        background: C.bg,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* ── Global styles & keyframes ── */}
      <style>{`

        @keyframes pulse-dot {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:.4; transform:scale(.7); }
        }
        @keyframes pulse-ring {
          0%,100% { opacity:.7; transform:translate(-50%,-50%) scale(1); }
          50%      { opacity:.25; transform:translate(-50%,-50%) scale(1.22); }
        }
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .ticker-wrap  { overflow:hidden; padding:10px 0;
          mask-image: linear-gradient(90deg,transparent,black 10%,black 90%,transparent);
          -webkit-mask-image: linear-gradient(90deg,transparent,black 10%,black 90%,transparent);
        }
        .ticker-track { display:flex; gap:8px; width:max-content;
          animation: ticker 24s linear infinite;
        }
        .ticker-track:hover { animation-play-state:paused; }

        /* metric 2×2 grid */
        .hr-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(8px,1.5vw,14px);
        }
        .hr-card {
          background: rgba(255,255,255,0.028);
          border: 0.5px solid rgba(255,255,255,0.07);
          border-radius: clamp(10px,1.5vw,14px);
          padding: clamp(14px,2vw,20px);
          display: flex; flex-direction: column; gap: 4px;
        }
        .hr-metric {
          font-size: clamp(22px,3vw,32px);
          font-weight: 700; line-height:1; letter-spacing:-0.02em;
        }
        .hr-label {
          font-size: clamp(9px,1vw,11px);
          text-transform:uppercase; letter-spacing:0.07em;
          color:${C.textDim}; font-weight:500; margin-top:4px;
        }

        /* two-column hero layout */
        .hero-inner {
          display: grid;
          grid-template-columns: 1fr clamp(280px, 36%, 420px);
          min-height: 540px;
        }

        /* ── RESPONSIVE BREAKPOINTS ── */
        @media (max-width: 900px) {
          .hero-inner {
            grid-template-columns: 1fr;
          }
          .hero-right {
            border-left: none !important;
            border-top: 0.5px solid rgba(255,255,255,0.07) !important;
          }
        }
        @media (max-width: 600px) {
          .hr-grid { grid-template-columns: 1fr 1fr; }
          .hero-left-pad { padding: 36px 0 28px !important; }
          .hero-h1 { font-size: clamp(36px, 10vw, 56px) !important; }
          .hero-stats { grid-template-columns: repeat(2,1fr) !important; max-width: 100% !important; }
        }
        @media (max-width: 380px) {
          .hr-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── Grid texture ── */}
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none',
        backgroundImage:
          'linear-gradient(rgba(100,120,200,0.045) 1px,transparent 1px),' +
          'linear-gradient(90deg,rgba(100,120,200,0.045) 1px,transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      {/* ── Glow blobs ── */}
      <div style={{ position:'absolute', width:520, height:340, right:-80, top:20,
        background:'radial-gradient(ellipse,rgba(99,102,241,0.15) 0%,transparent 70%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', width:300, height:240, left:-60, bottom:0,
        background:'radial-gradient(ellipse,rgba(16,185,129,0.09) 0%,transparent 70%)', pointerEvents:'none' }} />

      {/* ── Container ── */}
      <div className="container" style={{ position:'relative', zIndex:2 }}>
        <div className="hero-inner">

          {/* ════════════════════════════
              LEFT COLUMN
          ════════════════════════════ */}
          <div
            className="hero-left-pad"
            style={{
              padding: 'clamp(36px,5vw,64px) clamp(16px,3vw,40px) clamp(36px,5vw,64px) 0',
              display:'flex', flexDirection:'column', justifyContent:'center',
            }}
          >
            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.5 }}
              style={{
                display:'inline-flex', alignItems:'center', gap:8,
                background:'rgba(99,102,241,0.12)',
                border:'0.5px solid rgba(99,102,241,0.35)',
                padding:'6px 14px', borderRadius:100,
                fontSize:11, fontWeight:500, color:C.indigoHi,
                letterSpacing:'0.06em', textTransform:'uppercase',
                marginBottom: 'clamp(16px,2.5vw,26px)', width:'fit-content',
              }}
            >
              <span style={{
                width:6, height:6, borderRadius:'50%',
                background:C.indigo, display:'inline-block',
                animation:'pulse-dot 2s infinite',
              }} />
              InternX · AI Program 2025–26
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="hero-h1"
              initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.6, delay:0.1 }}
              style={{
                fontFamily:'Syne, sans-serif',
                fontSize:'clamp(40px, 5.5vw, 64px)',
                fontWeight:800, lineHeight:1.06,
                letterSpacing:'-0.01em',
                color:C.textPri, margin:'0 0 8px',
              }}
            >
              Don't just learn AI.<br />
              <span style={{
                background:'linear-gradient(90deg,#818cf8 0%,#34d399 100%)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
              }}>
                Build. Prove.<br />Get Hired.
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.6, delay:0.2 }}
              style={{
                fontSize:'clamp(13px,1.4vw,15px)', lineHeight:1.7,
                color:C.textMut, maxWidth:460,
                margin:'clamp(12px,2vw,18px) 0 clamp(20px,3vw,32px)',
                fontWeight:300,
              }}
            >
              India's only <strong style={{ color:C.textMid, fontWeight:500 }}>
                6+12 month Agentic AI accelerator
              </strong> with a legal job guarantee,
              and exclusive access to HireX &amp; FreelanceX —
              for both tech and non-tech learners.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.6, delay:0.3 }}
              style={{
                display:'flex', gap:12, alignItems:'center', flexWrap:'wrap',
                marginBottom:'clamp(24px,3.5vw,40px)',
              }}
            >
              <button
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior:'smooth' })}
                style={{
                  display:'inline-flex', alignItems:'center', gap:8,
                  background:C.indigo, color:'#fff',
                  fontFamily:"'DM Sans',sans-serif",
                  fontSize:14, fontWeight:500,
                  padding:'12px 22px', borderRadius:8,
                  border:'none', cursor:'pointer',
                  transition:'background 0.2s, transform 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background='#4f46e5'; e.currentTarget.style.transform='translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.background=C.indigo;   e.currentTarget.style.transform='translateY(0)' }}
              >
                <Bolt size={14} />
                Secure Your Seat
                <ArrowRight size={14} />
              </button>

              <button
                // onClick={() => document.getElementById('program')?.scrollIntoView({ behavior:'smooth' })}
                onClick={() => setOpenCurriculum(true)}
                style={{
                  display:'inline-flex', alignItems:'center', gap:6,
                  background:'transparent', color:C.textMut,
                  fontFamily:"'DM Sans',sans-serif",
                  fontSize:14, padding:'12px 20px', borderRadius:8,
                  border:'0.5px solid rgba(255,255,255,0.1)', cursor:'pointer',
                  transition:'color 0.2s, border-color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color=C.textMid; e.currentTarget.style.borderColor='rgba(255,255,255,0.2)' }}
                onMouseLeave={e => { e.currentTarget.style.color=C.textMut; e.currentTarget.style.borderColor='rgba(255,255,255,0.1)' }}
              >
                <LayoutList size={14} />
                View Curriculum
              </button>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              className="hero-stats"
              initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.6, delay:0.45 }}
              style={{
                display:'grid', gridTemplateColumns:'repeat(3,1fr)',
                border:'0.5px solid rgba(255,255,255,0.07)',
                borderRadius:12, overflow:'hidden',
                maxWidth:480,
              }}
            >
              {STATS.map((s, i) => (
                <div key={s.label} style={{
                  padding:'clamp(10px,1.5vw,16px) clamp(10px,1.5vw,16px)',
                  borderRight: i < 3 ? '0.5px solid rgba(255,255,255,0.07)' : 'none',
                }}>
                  <div style={{
                    fontFamily:'Syne,sans-serif',
                    fontSize:'clamp(16px,2.2vw,22px)',
                    fontWeight:700, lineHeight:1, marginBottom:4,
                    background:'linear-gradient(90deg,#818cf8,#34d399)',
                    WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
                  }}>
                    {s.num}
                  </div>
                  <div style={{
                    fontSize:'clamp(8px,0.9vw,10px)', color:C.textDim,
                    textTransform:'uppercase', letterSpacing:'0.07em', fontWeight:500,
                  }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ════════════════════════════
              RIGHT COLUMN — redesigned
          ════════════════════════════ */}
          <div
            className="hero-right"
            style={{
              display:'flex', flexDirection:'column',
              gap:'clamp(10px,1.4vw,13px)',
              padding:'clamp(24px,3vw,40px) clamp(16px,2.5vw,28px)',
              borderLeft:`0.5px solid ${C.border}`,
              background:'rgba(9,12,22,0.65)',
              position:'relative', overflow:'hidden',
              justifyContent:'center',
            }}
          >
            {/* Ambient glows */}
            <div style={{ position:'absolute', top:-60, right:-60, width:240, height:240, borderRadius:'50%',
              background:'radial-gradient(circle,rgba(99,102,241,0.13) 0%,transparent 70%)', pointerEvents:'none' }} />
            <div style={{ position:'absolute', bottom:30, left:-40, width:160, height:160, borderRadius:'50%',
              background:'radial-gradient(circle,rgba(52,211,153,0.08) 0%,transparent 70%)', pointerEvents:'none' }} />

            {/* ── PRIMARY FOCAL CARD: Arc + CTC ── */}
            <motion.div
              initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }}
              transition={{ duration:0.6, delay:0.2 }}
              style={{
                background:'rgba(99,102,241,0.06)',
                border:'0.5px solid rgba(99,102,241,0.2)',
                borderRadius:'clamp(12px,1.8vw,16px)',
                padding:'clamp(16px,2.2vw,24px)',
                display:'flex', alignItems:'center',
                gap:'clamp(14px,2vw,20px)',
                position:'relative',
              }}
            >
              {/* Arc gauge */}
              <div style={{ position:'relative', flexShrink:0 }}>
                <ArcMeter pct={88} size={92} stroke={6}
                  color={C.indigoHi}
                  trackColor="rgba(99,102,241,0.12)"
                  delay={600} />
                {/* Pulse ring */}
                <div style={{
                  position:'absolute', top:'50%', left:'50%',
                  width:28, height:28, borderRadius:'50%',
                  background:'rgba(99,102,241,0.22)',
                  animation:'pulse-ring 2.4s ease-in-out infinite',
                }} />
                {/* Core dot */}
                <div style={{
                  position:'absolute', top:'50%', left:'50%',
                  transform:'translate(-50%,-50%)',
                  width:13, height:13, borderRadius:'50%',
                  background:C.indigo,
                }} />
                {/* % label */}
                <div style={{
                  position:'absolute', bottom:7, left:'50%', transform:'translateX(-50%)',
                  fontSize:12, fontWeight:700, color:C.indigoHi, whiteSpace:'nowrap',
                }}>
                  <Counter to={88} suffix="%" duration={1600} />
                </div>
              </div>

              {/* CTC text */}
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{
                  fontSize:'clamp(10px,1.1vw,11px)', color:C.textDim,
                  textTransform:'uppercase', letterSpacing:'0.08em', fontWeight:500, marginBottom:5,
                }}>
                  Offer Conversion
                </div>
                <div style={{
                  fontSize:'clamp(24px,3.5vw,34px)', fontWeight:800,
                  letterSpacing:'-0.03em', lineHeight:1, color:C.textPri, marginBottom:7,
                }}>
                  ₹<Counter to={14} duration={1800} />L
                  <span style={{ fontSize:'clamp(11px,1.3vw,13px)', fontWeight:400, color:C.textMut, marginLeft:5 }}>
                    avg. CTC
                  </span>
                </div>
                <SlimBar pct={88} gradient={`linear-gradient(90deg,${C.indigo},${C.indigoHi})`} delay={700} />
                <div style={{ fontSize:10, color:C.textDim, marginTop:5 }}>
                  ₹6L —&nbsp;
                  <span style={{ color:C.indigoHi }}>₹35L</span>
                  &nbsp;range · 2024 cohort
                </div>
              </div>
            </motion.div>

            {/* ── METRIC 2×2 GRID ── */}
            <motion.div
              className="hr-grid"
              initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }}
              transition={{ duration:0.6, delay:0.3 }}
            >
              {/* Global CTC */}
              <div className="hr-card">
                <div className="hr-label">Global CTC</div>
                <div className="hr-metric" style={{
                  background:`linear-gradient(135deg,${C.indigoHi},#a5b4fc)`,
                  WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
                }}>
                  ₹<Counter to={19} duration={1600} />L
                </div>
                <div style={{ fontSize:10, color:C.textDim, marginTop:2 }}>avg. package</div>
              </div>

              {/* Hiring Partners */}
              <div className="hr-card">
                <div className="hr-label">Hiring Partners</div>
                <div className="hr-metric" style={{
                  background:`linear-gradient(135deg,${C.teal},#6ee7b7)`,
                  WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
                }}>
                  <Counter to={120} duration={1800} suffix="+" />
                </div>
                <div style={{ fontSize:10, color:C.textDim, marginTop:2 }}>startups &amp; cos.</div>
              </div>

              {/* Live Projects */}
              <div className="hr-card">
                <div className="hr-label">Live Projects</div>
                <div className="hr-metric" style={{
                  background:`linear-gradient(135deg,${C.amber},#fde68a)`,
                  WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
                }}>
                  <Counter to={18} duration={1400} suffix="+" />
                </div>
                <div style={{ fontSize:10, color:C.textDim, marginTop:2 }}>portfolio-ready</div>
              </div>

              {/* Seats (urgency) */}
              <div className="hr-card" style={{ background:'rgba(245,158,11,0.05)', borderColor:'rgba(245,158,11,0.15)' }}>
                <div className="hr-label" style={{ color:C.amber }}>Seats Left</div>
                <div className="hr-metric" style={{ color:C.amber }}>
                  <Counter to={9} duration={1000} />
                </div>
                <SlimBar pct={30} gradient={`linear-gradient(90deg,${C.amber},#ef4444)`} delay={900} />
              </div>
            </motion.div>

            {/* ── HIREX / FREELANCEX CHIPS ── */}
            <motion.div
              initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }}
              transition={{ duration:0.6, delay:0.5 }}
              style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(8px,1.2vw,12px)' }}
            >
              {[
                { name:'HireX',      sub:'Exclusive job board',  color:C.indigoHi, bg:'rgba(99,102,241,0.08)', border:'rgba(99,102,241,0.2)'  },
                { name:'FreelanceX', sub:'Global gigs network',  color:C.teal,     bg:'rgba(52,211,153,0.07)', border:'rgba(52,211,153,0.18)' },
              ].map(item => (
                <div key={item.name} style={{
                  background:item.bg, border:`0.5px solid ${item.border}`,
                  borderRadius:'clamp(8px,1.2vw,12px)',
                  padding:'clamp(10px,1.4vw,14px)',
                  display:'flex', flexDirection:'column', gap:3,
                }}>
                  <div style={{
                    fontSize:'clamp(13px,1.4vw,15px)',
                    fontWeight:700, color:item.color, letterSpacing:'-0.01em',
                  }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize:10, color:C.textDim, textTransform:'uppercase', letterSpacing:'0.06em', fontWeight:500 }}>
                    {item.sub}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* ── JOB GUARANTEE STRIP ── */}
            <motion.div
              initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }}
              transition={{ duration:0.6, delay:0.58 }}
              style={{
                display:'flex', alignItems:'center', gap:12,
                background:'rgba(52,211,153,0.05)',
                border:'0.5px solid rgba(52,211,153,0.18)',
                borderRadius:'clamp(8px,1.2vw,12px)',
                padding:'clamp(10px,1.5vw,14px) clamp(12px,1.8vw,18px)',
              }}
            >
              <ShieldCheck size={20} color={C.teal} style={{ flexShrink:0 }} />
              <div style={{ display:'flex', flexDirection:'column', gap:1, minWidth:0 }}>
                <span style={{ fontSize:'clamp(12px,1.3vw,13px)', fontWeight:600, color:C.teal, whiteSpace:'nowrap' }}>
                  Legal Job Guarantee
                </span>
                <span style={{ fontSize:10, color:'rgba(52,211,153,0.45)', letterSpacing:'0.03em' }}>
                  Contractual · or full refund
                </span>
              </div>
            </motion.div>

          </div>
          {/* end right column */}

        </div>
      </div>
      {openCurriculum && (
        <CurriculumModal
          open={openCurriculum}
          setOpen={setOpenCurriculum}
        />
      )}
    </section>
  )
}