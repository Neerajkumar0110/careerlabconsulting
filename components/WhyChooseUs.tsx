import { motion } from "framer-motion"
import { Languages, Clock, Building2, Layers, Globe, TrendingUp, Wallet, BookOpen, Handshake, Github, FileText, UserCheck, HeartHandshake, ShieldCheck, Award, Container, CheckCircle, Network } from "lucide-react"
import { Orb, FadeIn, SectionLabel, Display, Grad } from "./HPOC"


const T = {
  void:    '#04050A',
  ink:     '#080C16',
  lift:    '#0D1220',
  surface: '#111827',
  glass:   'rgba(255,255,255,0.032)',
  glassHi: 'rgba(255,255,255,0.058)',
  line:    'rgba(255,255,255,0.06)',
  lineHi:  'rgba(255,255,255,0.12)',

  violet:  '#7C3AED',
  violetLo:'rgba(124,58,237,0.12)',
  violetB: 'rgba(124,58,237,0.30)',
  violetHi:'#A78BFA',
  mint:    '#10F5A0',
  mintLo:  'rgba(16,245,160,0.08)',
  mintB:   'rgba(16,245,160,0.22)',
  gold:    '#F0A500',
  goldLo:  'rgba(240,165,0,0.10)',
  goldB:   'rgba(240,165,0,0.25)',
  cyan:    '#06B6D4',
  cyanLo:  'rgba(6,182,212,0.10)',
  cyanB:   'rgba(6,182,212,0.25)',
  rose:    '#F43F5E',
  roseLo:  'rgba(244,63,94,0.10)',

  hi:      '#ECEEF8',
  mid:     '#A9AFCA',
  muted:   '#5E6580',
  ghost:   '#1E2338',

  display: "'Clash Display', 'Syne', sans-serif",
  body:    "'DM Sans', 'Plus Jakarta Sans', sans-serif",
  mono:    "'DM Mono', 'JetBrains Mono', monospace",
}



/* ─── PRIMITIVES ─────────────────────────────────────────────────────────────── */
function Noise() {
  return (
    <svg style={{ position:'absolute',inset:0,width:'100%',height:'100%',opacity:0.016,pointerEvents:'none',zIndex:0 }} aria-hidden>
      <filter id="n2"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
      <rect width="100%" height="100%" filter="url(#n2)"/>
    </svg>
  )
}

function GridLines() {
  return (
    <div style={{ position:'absolute',inset:0,pointerEvents:'none',zIndex:0,
      backgroundImage:`linear-gradient(${T.line} 1px,transparent 1px),linear-gradient(90deg,${T.line} 1px,transparent 1px)`,
      backgroundSize:'64px 64px',
      maskImage:'radial-gradient(ellipse 80% 70% at 50% 50%,black 30%,transparent 100%)',
    }}/>
  )
}

function Rule() {
  return <div style={{ width:36,height:2,background:`linear-gradient(90deg,${T.violet},${T.mint})`,borderRadius:2,margin:'16px 0 20px' }}/>
}

// ─── data ──────────────────────────────────────────────────────────────────────
const WHY_ITEMS = [
  { icon: <Languages size={22}/>,        color: T.mint,   label: 'Bilingual Program',          desc: 'Learn in Hindi or English — same curriculum, same outcomes, zero language barrier.' },
  { icon: <Clock size={22}/>,            color: T.violet, label: 'Flexible Timings',            desc: '8–10 PM IST Mon–Sat. Designed for working professionals and students alike.' },
  { icon: <Network size={22}/>,          color: T.gold,   label: 'Complete AI Ecosystem',       desc: 'HireX + FreelanceX + ResumeNFT + AigenX Coach — all five divisions working for you.' },
  { icon: <Building2 size={22}/>,        color: T.cyan,   label: 'In-House Hiring',             desc: 'Career Lab itself hires top graduates. Your first offer could come from your own program.' },
  { icon: <Layers size={22}/>,           color: T.mint,   label: 'Choice-Based Projects',       desc: 'Pick your domain — FinTech, HealthTech, EdTech, HRTech, AI SaaS, or your own startup idea.' },
  { icon: <Globe size={22}/>,            color: T.violet, label: 'Domestic + International',    desc: 'Placed in India, Germany, UAE, Singapore & more. 100% remote-first roles available.' },
  { icon: <TrendingUp size={22}/>,       color: T.gold,   label: 'Up to 120% CTC Hike',        desc: 'Experienced professionals see 30–120% hike on current CTC. Freshers start at ₹6–10 LPA.' },
  { icon: <Wallet size={22}/>,           color: T.cyan,   label: 'Freelance for Immediate Earn',desc: 'FreelanceX lets you earn ₹5K–₹2L per project while still enrolled — cover your own EMIs.' },
  { icon: <BookOpen size={22}/>,         color: T.mint,   label: 'Lifetime LMS Access',         desc: 'Content, recordings, and new modules added every cohort — yours forever, never expires.' },
  { icon: <Handshake size={22}/>,        color: T.violet, label: 'Lifetime Placement Support',  desc: 'HireX access never closes. Get re-placed, upskill, placed again — as many times as needed.' },
  { icon: <Github size={22}/>,           color: T.gold,   label: 'Verified GitHub Credentials', desc: 'Every commit is public, timestamped, and linked to your ResumeNFT — 100% tamper-proof.' },
  { icon: <FileText size={22}/>,         color: T.cyan,   label: 'ATS-Friendly Resume',         desc: 'AI-rewritten LinkedIn + résumé optimised to pass ATS filters at global tech companies.' },
  { icon: <UserCheck size={22}/>,        color: T.mint,   label: '1:1 Mentorship',              desc: 'Weekly personal sessions with a senior AI engineer — not group calls, real accountability.' },
  { icon: <HeartHandshake size={22}/>,   color: T.violet, label: 'Career Gap Welcome',          desc: 'Breaks of 1–10 years are fine. We rebuild your profile from scratch with proof-of-work.' },
  { icon: <ShieldCheck size={22}/>,      color: T.gold,   label: 'ISO Certified Company',       desc: 'ISO 27001 certified MNC. Your data, your credential, your career — enterprise-grade safe.' },
  { icon: <Award size={22}/>,            color: T.cyan,   label: 'MSME & Skill India Registered',desc: 'Government-recognised training partner. Eligible for MSME subsidies and Skill India benefits.' },
]

// ─── component ─────────────────────────────────────────────────────────────────
export function WhyChooseUs() {
  return (
    <section
      id="why-us"
      style={{ position: 'relative', background: T.ink, overflow: 'hidden', padding: 'clamp(64px,8vw,120px) 0' }}
    >
      <Noise/>
      <GridLines/>
      <Orb color={T.violet} x="15%"  y="20%" size={500} opacity={0.05}/>
      <Orb color={T.mint}   x="85%"  y="70%" size={480} opacity={0.05}/>

      <Container>
        {/* Header */}
        <FadeIn>
          <SectionLabel>Why Career Lab Consulting</SectionLabel>
          <Display>
            16 Reasons We're<br/>
            <Grad>India's #1 AI Accelerator.</Grad>
          </Display>
          <Rule/>
        </FadeIn>

        {/* Grid */}
        <FadeIn delay={0.1}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 16,
              marginTop: 48,
            }}
          >
            {WHY_ITEMS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.22 } }}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 18,
                  padding: '22px 24px',
                  background: 'linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))',
                  border: `1px solid ${item.color}30`,
                }}
              >
                {/* top accent */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(90deg,transparent,${item.color},transparent)`,
                }}/>
                {/* glow */}
                <div style={{
                  position: 'absolute', top: -40, right: -40, width: 120, height: 120,
                  borderRadius: '50%', background: `${item.color}10`,
                  filter: 'blur(30px)', pointerEvents: 'none',
                }}/>

                {/* icon */}
                <div style={{
                  width: 44, height: 44, borderRadius: 12, marginBottom: 14,
                  background: `${item.color}15`, border: `1px solid ${item.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: item.color,
                }}>
                  {item.icon}
                </div>

                <div style={{ fontFamily: T.display, fontSize: 14, fontWeight: 600, color: T.hi, marginBottom: 6 }}>
                  {item.label}
                </div>
                <div style={{ fontFamily: T.body, fontSize: 12.5, color: T.mid, lineHeight: 1.7 }}>
                  {item.desc}
                </div>

                {/* verified pill */}
                <div style={{
                  marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 5,
                  background: T.mintLo, border: `1px solid ${T.mintB}`,
                  color: T.mint, borderRadius: 999, padding: '3px 10px',
                  fontFamily: T.mono, fontSize: 10, fontWeight: 600,
                }}>
                  <CheckCircle size={10}/> Included
                </div>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}