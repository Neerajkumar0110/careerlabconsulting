'use client'

/**
 * SLIDE 1 — Hero + StatBar
 * Canvas: 1280 × 720 px
 * Now accepts optional `userName` prop for personalized greeting.
 */

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Award, GitBranch, Zap, Globe, Lock,
  ShieldCheck, Rocket, ChevronRight, Sparkles,
} from 'lucide-react'

/* ── tokens ─────────────────────────────────────────────────────────────────── */
const T = {
  void:     '#03040A',
  lift:     '#0C1120',
  glass:    'rgba(255,255,255,0.030)',
  line:     'rgba(255,255,255,0.055)',
  violet:   '#7C3AED',
  violetLo: 'rgba(124,58,237,0.12)',
  violetB:  'rgba(124,58,237,0.30)',
  violetHi: '#A78BFA',
  mint:     '#10F5A0',
  mintLo:   'rgba(16,245,160,0.08)',
  mintB:    'rgba(16,245,160,0.22)',
  gold:     '#F0A500',
  goldLo:   'rgba(240,165,0,0.10)',
  goldB:    'rgba(240,165,0,0.25)',
  cyan:     '#06B6D4',
  cyanLo:   'rgba(6,182,212,0.10)',
  cyanB:    'rgba(6,182,212,0.25)',
  hi:       '#ECEEF8',
  mid:      '#A9AFCA',
  muted:    '#5E6580',
  display:  "'Clash Display', 'Syne', sans-serif",
  body:     "'DM Sans', 'Plus Jakarta Sans', sans-serif",
  mono:     "'DM Mono', 'JetBrains Mono', monospace",
}

/* ── counter ─────────────────────────────────────────────────────────────────── */
function Counter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const ran = useRef(false)
  useEffect(() => {
    if (ran.current) return
    ran.current = true
    const dur = 1600; let start: number | null = null
    const tick = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / dur, 1)
      setVal(Math.floor((1 - Math.pow(1 - p, 3)) * end))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [end])
  return <>{val.toLocaleString()}{suffix}</>
}

/* ── tag chip ─────────────────────────────────────────────────────────────────── */
function Tag({ children, accent, accentLo, accentB, icon }: {
  children: React.ReactNode
  accent: string; accentLo: string; accentB: string
  icon?: React.ReactNode
}) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: accentLo, color: accent, border: `0.5px solid ${accentB}`,
      fontSize: 10, fontWeight: 500, fontFamily: T.mono,
      letterSpacing: '0.06em', padding: '3px 10px', borderRadius: 100,
      whiteSpace: 'nowrap',
    }}>
      {icon}{children}
    </span>
  )
}

/* ── props ───────────────────────────────────────────────────────────────────── */
interface Props {
  userName?: string
}

/* ── main component ────────────────────────────────────────────────────────────── */
export default function HeroStatBar({ userName }: Props) {
  const stats = [
    { n: 15000, s: '+', label: 'Students Trained',   sub: 'Past 12 Months' },
    { n: 3500, s: '+', label: 'Projects Delivered', sub: 'Real Client Work' },
    { n: 270,  s: '+', label: 'Hiring Companies',   sub: 'Worldwide' },
    { n: 27,   s: '+', label: 'Countries',           sub: 'Global Presence' },
  ]

  // Extract first name for a friendlier greeting
  const firstName = userName ? userName.split(' ')[0] : null

  return (
    <div style={{
      width: 1280, height: 720,
      background: T.void,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: T.body,
    }}>
      {/* ── Background layers ── */}
      <div style={{ position:'absolute',inset:0,pointerEvents:'none', backgroundImage:`linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)`, backgroundSize:'64px 64px', maskImage:'radial-gradient(ellipse 90% 80% at 50% 40%, black 30%, transparent 100%)' }} />
      <div style={{ position:'absolute',left:'18%',top:'30%',width:500,height:500,background:`radial-gradient(circle,${T.violet} 0%,transparent 70%)`,opacity:0.09,transform:'translate(-50%,-50%)',pointerEvents:'none' }} />
      <div style={{ position:'absolute',left:'80%',top:'55%',width:380,height:380,background:`radial-gradient(circle,${T.mint} 0%,transparent 70%)`,opacity:0.07,transform:'translate(-50%,-50%)',pointerEvents:'none' }} />
      <div style={{ position:'absolute',left:'60%',top:'15%',width:300,height:300,background:`radial-gradient(circle,${T.gold} 0%,transparent 70%)`,opacity:0.05,transform:'translate(-50%,-50%)',pointerEvents:'none' }} />
      <div style={{ position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',fontFamily:T.display,fontSize:220,fontWeight:700,color:'rgba(255,255,255,0.012)',letterSpacing:'-0.04em',whiteSpace:'nowrap',userSelect:'none',pointerEvents:'none' }}>INTERNX</div>

      {/* ── Hero content ── */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'16px 80px 0', position:'relative', zIndex:2, textAlign:'center' }}>

        {/* Logo */}
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }} style={{ display:'flex', justifyContent:'center', marginBottom: firstName ? 6 : 10 }}>
          <img src="/logo.png" alt="Career Lab Consulting" style={{ height:44, width:'auto' }} />
        </motion.div>

        {/* Eyebrow badge */}
        <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.05 }} style={{ marginBottom:14 }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:7, background:`linear-gradient(135deg,${T.violetLo},${T.mintLo})`, border:`0.5px solid ${T.violetB}`, borderRadius:100, padding:'2px 16px', marginTop:'10px', fontFamily:T.mono, fontSize:10, color:T.mint, letterSpacing:'0.12em', textTransform:'uppercase' }}>
            <span style={{ width:5, height:5, borderRadius:'50%', background:T.mint, boxShadow:`0 0 6px ${T.mint}` }} />
            ISO 27001 Certified · 27 Countries · MNC Since 2019
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.65, delay:0.1 }}
          style={{ fontFamily:T.display, fontSize:64, fontWeight:600, lineHeight:1.03, letterSpacing:'-0.03em', color:T.hi, margin:'0 0 6px' }}
        >
          <span></span>{firstName ? `${firstName}, Build Projects.` : 'Build Projects.'}{' '}<br/>
          <span style={{ backgroundImage:`linear-gradient(135deg,#7C3AED 0%,#A855F7 40%,#10F5A0 100%)`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
            Show Proof. Get Hired.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.18 }}
          style={{ fontFamily:T.body, fontSize:15, lineHeight:1.6, color:T.mid, fontWeight:300, maxWidth:560, margin:'0 auto 14px' }}
        >
          InternX–AI is a <strong style={{ color:T.hi, fontWeight:500 }}>6+12-month Real-World Agentic AI Internship Accelerator</strong> — not a course.
          Build verifiable proof-of-work that 270+ global employers trust.
        </motion.p>

        {/* Tags */}
        <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.24 }} style={{ display:'flex', gap:8, justifyContent:'center', flexWrap:'wrap', marginBottom:16 }}>
          <Tag accent={T.violetHi} accentLo={T.violetLo} accentB={T.violetB} icon={<Award size={9} />}>Job Guarantee (Elite)</Tag>
          <Tag accent={T.mint}     accentLo={T.mintLo}   accentB={T.mintB}   icon={<GitBranch size={9} />}>Verified Career Portfolio · GitHub Verified</Tag>
          <Tag accent={T.gold}     accentLo={T.goldLo}   accentB={T.goldB}   icon={<Zap size={9} />}>88% Job Conversion</Tag>
          <Tag accent={T.cyan}     accentLo={T.cyanLo}   accentB={T.cyanB}   icon={<Globe size={9} />}>27 Countries Active</Tag>
        </motion.div>

        {/* Trust row */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.5, delay:0.38 }} style={{ display:'flex', gap:22, justifyContent:'center', flexWrap:'wrap' }}>
          {[
            { icon:<Lock size={11} color={T.mint} />,      text:'100% Money Back if Not Placed' },
            { icon:<ShieldCheck size={11} color={T.gold} />, text:'Legal Signed Agreement' },
            { icon:<Zap size={11} color={T.violet} />,    text:'Start in 48 Hours' },
            { icon:<Globe size={11} color={T.cyan} />,    text:'100% Remote · Global' },
          ].map(b => (
            <div key={b.text} style={{ display:'flex', alignItems:'center', gap:6 }}>
              <div style={{ width:20, height:20, borderRadius:5, background:T.glass, border:`0.5px solid ${T.line}`, display:'flex', alignItems:'center', justifyContent:'center' }}>{b.icon}</div>
              <span style={{ fontFamily:T.body, fontSize:11, color:T.muted }}>{b.text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── StatBar ── */}
      <div style={{ height:120, background:T.lift, borderTop:`0.5px solid ${T.line}`, display:'grid', gridTemplateColumns:'repeat(4,1fr)', position:'relative', zIndex:2, flexShrink:0 }}>
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.45+i*0.07, duration:0.5 }}
            style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', borderRight:i<3?`0.5px solid ${T.line}`:'none', padding:'0 16px', position:'relative' }}
          >
            <div style={{ position:'absolute',top:0,left:'20%',right:'20%',height:1, background:`linear-gradient(90deg,transparent,${T.violet},transparent)` }} />
            <div style={{ fontFamily:T.display, fontSize:34, fontWeight:600, letterSpacing:'-0.03em', lineHeight:1, color:T.hi, marginBottom:4 }}>
              <Counter end={s.n} suffix={s.s} />
            </div>
            <div style={{ fontFamily:T.body, fontSize:11, color:T.hi, fontWeight:500, marginBottom:2 }}>{s.label}</div>
            <div style={{ fontFamily:T.mono, fontSize:8.5, color:T.muted, letterSpacing:'0.08em', textTransform:'uppercase' }}>{s.sub}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}