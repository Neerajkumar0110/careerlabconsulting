import { useState, useEffect, useRef, ReactNode } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  Check, ArrowRight, ExternalLink, IndianRupee,
  Award, Briefcase, Shield, Zap, Globe, Users,
  Star, TrendingUp, Lock, BadgeCheck, Rocket,
  ChevronRight, Building2, Sparkles, BookOpen,
  Cpu, GitBranch, Layers, Target, Clock, MapPin,
  Linkedin,
  ChevronLeft,
  CheckCircle,
  Network,
  FileText,
  Github,
  Handshake,
  HeartHandshake,
  Languages,
  ShieldCheck,
  UserCheck,
  Wallet,
  MessageCircle,
  Plus,
  ClockFading,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

/* ─── DESIGN SYSTEM ────────────────────────────────────────────────────────── */
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

/* ─── FONT INJECT ───────────────────────────────────────────────────────────── */
if (typeof document !== 'undefined' && !document.getElementById('clc-fonts')) {
  const link = document.createElement('link')
  link.id = 'clc-fonts'
  link.rel = 'stylesheet'
  link.href = 'https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=dm-sans@300,400,500&f[]=dm-mono@400,500&display=swap'
  document.head.appendChild(link)
  const style = document.createElement('style')
  style.textContent = `
    *{box-sizing:border-box;margin:0;padding:0}
    :root{--clc-void:${T.void};--clc-ink:${T.ink};--clc-lift:${T.lift}}
    @media(max-width:768px){
      .clc-grid-2{grid-template-columns:1fr!important}
      .clc-grid-3{grid-template-columns:1fr!important}
      .clc-hide-mob{display:none!important}
      .clc-stack{flex-direction:column!important}
    }
    @media(max-width:480px){
      .clc-grid-auto{grid-template-columns:1fr 1fr!important}
    }
  `
  document.head.appendChild(style)
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

interface OrbProps {
  color: string
  x: string
  y: string
  size?: number
  opacity?: number
}

function Orb({
  color,
  x,
  y,
  size = 400,
  opacity = 0.1,
}: OrbProps) {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        background: `radial-gradient(circle,${color} 0%,transparent 70%)`,
        opacity,
        pointerEvents: 'none',
        transform: 'translate(-50%,-50%)',
        zIndex: 0,
      }}
    />
  )
}

interface FadeInProps {
  children: ReactNode
  delay?: number
  y?: number
}

const FadeIn = ({
  children,
  delay = 0,
  y = 24,
}: FadeInProps) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-70px' }}
    transition={{
      duration: 0.65,
      delay,
      ease: [0.16, 1, 0.3, 1],
    }}
  >
    {children}
  </motion.div>
)

interface SectionLabelProps {
  children: ReactNode
}

function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 18,
        fontFamily: T.mono,
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: T.mint,
      }}
    >
      <div
        style={{
          width: 18,
          height: 1,
          background: T.mint,
          opacity: 0.7,
        }}
      />
      {children}
      <div
        style={{
          width: 18,
          height: 1,
          background: T.mint,
          opacity: 0.7,
        }}
      />
    </div>
  )
}

interface DisplayProps {
  children: ReactNode
  size?: 'large' | 'medium'
}

function Display({
  children,
  size = 'large',
}: DisplayProps) {
  const fs =
    size === 'large'
      ? 'clamp(34px,4.5vw,56px)'
      : 'clamp(28px,3.5vw,44px)'

  return (
    <h2
      style={{
        fontFamily: T.display,
        fontSize: fs,
        fontWeight: 600,
        lineHeight: 1.06,
        letterSpacing: '-0.022em',
        color: T.hi,
        margin: '0 0 6px',
      }}
    >
      {children}
    </h2>
  )
}

interface GradProps {
  children: ReactNode
}

function Grad({ children }: GradProps) {
  return (
    <span
      style={{
        backgroundImage: `linear-gradient(135deg,${T.violetHi} 0%,#C084FC 40%,${T.mint} 100%)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {children}
    </span>
  )
}

export { Orb, FadeIn, SectionLabel, Display, Grad }
function Rule() {
  return <div style={{ width:36,height:2,background:`linear-gradient(90deg,${T.violet},${T.mint})`,borderRadius:2,margin:'16px 0 20px' }}/>
}

type TagScheme =
  | 'violet'
  | 'mint'
  | 'gold'
  | 'cyan'
  | 'rose'

interface TagProps {
  children: ReactNode
  scheme?: TagScheme
}

function Tag({
  children,
  scheme = 'violet',
}: TagProps) {
  const map: Record<TagScheme, [string, string, string]> = {
    violet: [T.violetLo, T.violetHi, T.violetB],
    mint: [T.mintLo, T.mint, T.mintB],
    gold: [T.goldLo, T.gold, T.goldB],
    cyan: [T.cyanLo, T.cyan, T.cyanB],
    rose: [
      T.roseLo,
      '#FB7185',
      'rgba(244,63,94,0.25)',
    ],
  }

  const s = map[scheme]

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        background: s[0],
        color: s[1],
        border: `0.5px solid ${s[2]}`,
        fontSize: 10,
        fontWeight: 500,
        fontFamily: T.mono,
        letterSpacing: '0.06em',
        padding: '4px 10px',
        borderRadius: 100,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  )
}

interface CheckRowProps {
  text: string
  color?: string
}

function CheckRow({
  text,
  color = T.mint,
}: CheckRowProps) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 10,
        alignItems: 'flex-start',
        padding: '6px 0',
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: 18,
          height: 18,
          borderRadius: '50%',
          background: `${color}18`,
          border: `0.5px solid ${color}50`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 1,
        }}
      >
        <Check
          size={10}
          color={color}
        />
      </div>

      <span
        style={{
          fontFamily: T.body,
          fontSize: 13,
          color: T.mid,
          lineHeight: 1.6,
        }}
      >
        {text}
      </span>
    </div>
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
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 clamp(16px,4vw,40px)',
        position: 'relative',
        zIndex: 2,
      }}
    >
      {children}
    </div>
  )
}

export {
  Tag,
  CheckRow,
  Container,
}

/* ─── CLC LOGO ───────────────────────────────────────────────────────────────── */
function CLCLogo({ size=32 }) {
  return (
    <div style={{ display:'flex',alignItems:'center',gap:10 }}>
      {/* Colourful 'C' arc mimicking the CLC brand mark */}
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="18" stroke={`${T.mint}40`} strokeWidth="1"/>
        <path d="M20 4 A16 16 0 1 0 36 20" stroke={T.violet} strokeWidth="3.5" strokeLinecap="round" fill="none"/>
        <path d="M20 4 A16 16 0 0 1 36 20" stroke={T.mint} strokeWidth="3.5" strokeLinecap="round" fill="none"/>
        <circle cx="20" cy="20" r="5" fill={T.gold} opacity="0.9"/>
      </svg>
      <div>
        <div style={{ fontFamily:T.display,fontSize:13,fontWeight:700,color:T.hi,letterSpacing:'-0.01em',lineHeight:1 }}>CAREER LAB</div>
        <div style={{ fontFamily:T.mono,fontSize:9,color:T.mint,letterSpacing:'0.14em',textTransform:'uppercase',marginTop:1 }}>Consulting · CLC</div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════════
   HERO / INTRO  (new section — company introduction with logo + summary)
══════════════════════════════════════════════════════════════════════════════ */
const IMPACT_STATS = [
  { value:'15,000+', label:'Students Trained Globally' },
  { value:'3,500+',  label:'AI Projects Delivered' },
  { value:'120+',    label:'Hiring Partners Worldwide' },
  { value:'88%',     label:'Job Offer Conversion Rate' },
  { value:'27',      label:'Countries Active' },
  { value:'₹11.80 LPA', label:'Avg India CTC' },
]

const ECOSYSTEM_ITEMS = [
  { icon:<Zap size={16} color={T.mint}/>,      title:'InternX–AI',      desc:'6 & 12-month Agentic AI internship accelerator — real projects, real proof.' },
  { icon:<Globe size={16} color={T.cyan}/>,    title:'HireX Portal',    desc:'Exclusive job matching engine. CLC candidates only. 120+ global companies.' },
  { icon:<TrendingUp size={16} color={T.gold}/>, title:'FreelanceX',    desc:'Earn while you learn. Real client projects to cover your monthly EMI.' },
  {
    icon:<BadgeCheck size={16} color={T.violet}/>,
    title:'Verified Career Portfolio',
    desc:'Tamper-proof proof-of-work portfolio linked to GitHub and LinkedIn.'
  },
  { icon:<Cpu size={16} color='#A855F7'/>,     title:'AigenX Coach',    desc:'24×7 AI career mentor tracking progress, solving doubts, guiding interviews.' },
  { icon:<Building2 size={16} color={T.gold}/>,  title:'CLC Enterprise',  desc:'ISO 27001 certified MNC with offices across 27 countries globally.' },
]

export function Hero() {
  return (
    <section style={{ position:'relative',background:T.void,overflow:'hidden',
      padding:'clamp(64px,8vw,120px) 0 clamp(48px,6vw,96px)',
    }}>
      <Noise/>
      <GridLines/>
      <Orb color={T.violet} x="70%" y="20%" size={700} opacity={0.08}/>
      <Orb color={T.mint}   x="15%" y="80%" size={500} opacity={0.06}/>

      {/* ── Logo bar ── */}
      <Container>
        <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',
          marginBottom:56,flexWrap:'wrap',gap:16,
        }}>
          <CLCLogo size={36}/>
          <div style={{ display:'flex',gap:8,flexWrap:'wrap' }}>
            <Tag scheme="mint">ISO 27001 Certified</Tag>
            <Tag scheme="gold">27 Countries</Tag>
            <Tag scheme="violet">Est. 2019</Tag>
          </div>
        </div>

        {/* ── Hero headline ── */}
        <FadeIn>
          <SectionLabel>InternX–AI · Career Lab Consulting</SectionLabel>
          <h1 style={{ fontFamily:T.display,fontSize:'clamp(38px,5.5vw,76px)',fontWeight:700,
            lineHeight:1.04,letterSpacing:'-0.03em',color:T.hi,margin:'0 0 24px',maxWidth:820,
          }}>
            Don't Just Learn AI.<br/>
            <Grad>Prove It. Get Hired.</Grad>
          </h1>
          <p style={{ fontFamily:T.body,fontSize:'clamp(14px,1.6vw,17px)',lineHeight:1.8,
            color:T.mid,fontWeight:300,maxWidth:580,marginBottom:36,
          }}>
            Career Lab Consulting (CLC) is a global AI career engine powering learners from India
            and 26 other countries into verifiable, well-paying AI roles — through real projects,
            blockchain-backed credentials, and a legal job guarantee.
          </p>
          <div style={{ display:'flex',gap:10,flexWrap:'wrap',marginBottom:56 }}>
            <motion.button
              whileHover={{ scale:1.04,boxShadow:`0 0 40px ${T.violet}50` }}
              whileTap={{ scale:0.97 }}
              style={{ display:'flex',alignItems:'center',gap:8,cursor:'pointer',
                background:`linear-gradient(135deg,${T.violet},#6D28D9)`,
                border:'none',borderRadius:12,padding:'13px 28px',
                fontFamily:T.display,fontSize:14,fontWeight:600,color:'#fff',
              }}
            >
              <Rocket size={14}/> Enrol Now — Next Batch Sat & Sun 11 AM IST
            </motion.button>
            <motion.button
              whileHover={{ scale:1.02 }}
              style={{ display:'flex',alignItems:'center',gap:8,cursor:'pointer',
                background:T.glass,border:`0.5px solid ${T.line}`,borderRadius:12,
                padding:'13px 22px',fontFamily:T.display,fontSize:14,fontWeight:500,color:T.mid,
              }}
            >
              <Clock size={14}/> 8–10 PM IST · Flexible Batches
            </motion.button>
          </div>
        </FadeIn>

        {/* ── Impact stats ── */}
        <FadeIn delay={0.15}>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:10,marginBottom:64 }}>
            {IMPACT_STATS.map((s,i) => (
              <motion.div
                key={s.label}
                initial={{ opacity:0,y:16 }}
                whileInView={{ opacity:1,y:0 }}
                viewport={{ once:true }}
                transition={{ delay:i*0.07,duration:0.5 }}
                style={{ background:T.glass,border:`0.5px solid ${T.line}`,borderRadius:14,
                  padding:'16px 20px',textAlign:'center',
                }}
              >
                <div style={{ fontFamily:T.display,fontSize:'clamp(22px,2.5vw,28px)',fontWeight:700,
                  letterSpacing:'-0.025em',color:T.hi,
                  backgroundImage:`linear-gradient(135deg,${T.hi},${T.mid})`,
                  WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',
                }}>{s.value}</div>
                <div style={{ fontFamily:T.mono,fontSize:9,color:T.muted,letterSpacing:'0.10em',
                  textTransform:'uppercase',marginTop:4,
                }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* ── CLC Ecosystem overview ── */}
        <FadeIn delay={0.22}>
          <div style={{ marginBottom:16 }}>
            <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:20,flexWrap:'wrap' }}>
              <span style={{ fontFamily:T.display,fontSize:18,fontWeight:600,color:T.hi }}>
                The CLC Ecosystem
              </span>
              <Tag scheme="cyan">6 Integrated Platforms</Tag>
            </div>
            <div className="clc-grid-3" style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10 }}>
              {ECOSYSTEM_ITEMS.map((e,i) => (
                <motion.div
                  key={e.title}
                  initial={{ opacity:0,scale:0.95 }}
                  whileInView={{ opacity:1,scale:1 }}
                  viewport={{ once:true }}
                  transition={{ delay:i*0.07 }}
                  whileHover={{ y:-3,borderColor:T.lineHi }}
                  style={{ background:T.glass,border:`0.5px solid ${T.line}`,borderRadius:14,
                    padding:'18px 20px',position:'relative',overflow:'hidden',
                  }}
                >
                  <div style={{ display:'flex',alignItems:'center',gap:10,marginBottom:8 }}>
                    <div style={{ width:32,height:32,borderRadius:8,background:T.glass,
                      border:`0.5px solid ${T.line}`,display:'flex',alignItems:'center',justifyContent:'center',
                    }}>
                      {e.icon}
                    </div>
                    <span style={{ fontFamily:T.display,fontSize:13,fontWeight:600,color:T.hi }}>{e.title}</span>
                  </div>
                  <p style={{ fontFamily:T.body,fontSize:12,color:T.muted,lineHeight:1.6 }}>{e.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════════════════
   PROGRAM OVERVIEW  (6-month → 12-month journey)
══════════════════════════════════════════════════════════════════════════════ */
const TECH_TRACKS = [
  {
    track:'Track A1 — Tech (6 Month)',
    color:T.violet,
    units:[
      { unit:'Unit 1–2',  title:'Python & AI Foundations',       weeks:'Wk 1–8',   hrs:'48 hr',   topics:['Python basics, OOP, APIs','Prompt engineering fundamentals','GPT API integration'] },
      { unit:'Unit 3–4',  title:'LangChain & Agent Frameworks',  weeks:'Wk 9–16',  hrs:'48 hr',   topics:['LangChain agents & chains','Memory, tools & callbacks','RAG pipelines with vector DBs'] },
      { unit:'Unit 5–6',  title:'Multi-Agent Systems & Deploy',  weeks:'Wk 17–24', hrs:'48 hr',   topics:['Multi-agent communication','FastAPI backend for agents','Docker + cloud deployment'] },
      { unit:'S121–S144', title:'Capstone — Full Build Sprint',  weeks:'Wk 20–24', hrs:'36 hr',   topics:['Fully Autonomous SEO Agent','GitHub repo + README + API docs','Live 15-min demo to panel'] },
    ],
    capstone:'Fully Autonomous SEO Agent System — end-to-end without human intervention.',
  },
  {
    track:'Track B1 — No-Code (6 Month)',
    color:T.cyan,
    units:[
      { unit:'Unit 1–2',  title:'Digital Literacy & AI Basics',  weeks:'Wk 1–4',   hrs:'24 hr',   topics:['AI tools overview','Zapier & Make.com workflows','No-code foundations'] },
      { unit:'Unit 3–5',  title:'Agentic No-Code Workflows',     weeks:'Wk 5–20',  hrs:'72 hr',   topics:['Relevance AI agents','n8n orchestration','Airtable + LLM automation'] },
      { unit:'Unit 6',    title:'Agent Safety & Reporting',      weeks:'Wk 21–26', hrs:'36 hr',   topics:['Human-approval steps','Looker Studio dashboards','Automated PDF reporting'] },
      { unit:'S133–S156', title:'Capstone — No-Code Sprint',     weeks:'Wk 20–26', hrs:'36 hr',   topics:['Fully Autonomous SEO Agent (No-Code)','Voiceflow UI + Loom walkthrough','15-min panel demo'] },
    ],
    capstone:'Fully Autonomous SEO Agent System — built with zero code using Relevance AI + n8n.',
  },
]

const ADVANCED_TRACKS = [
  { label:'Track A2 — Tech 12-Month', color:T.violet, capstone:'Enterprise Multi-Agent SEO Platform — multi-tenant SaaS, Kubernetes, CI/CD, Prometheus + Grafana.' },
  { label:'Track B2 — No-Code 12-Month', color:T.cyan, capstone:'AI-Powered SEO Agency Platform — 5+ parallel campaigns, Stripe billing, React dashboard, client portal.' },
]

const PROJECT_DOMAINS = [
  { domain:'FinTech',            project:'Sales Campaign Automation',      outcome:'Lead segmentation + cold email bot (OpenAI + Sheets + Zapier)',   color:T.mint },
  { domain:'EdTech',             project:'Curriculum Mapping & Content Gen', outcome:'Multi-agent pipeline aligned with Bloom\'s Taxonomy',            color:T.violet },
  { domain:'HealthTech',         project:'Patient Query Resolution Agent', outcome:'LLM-based assistant auto-routing patient inquiries',              color:T.cyan },
  { domain:'HRTech',             project:'Automated JD Analyzer + CV Screener', outcome:'CV-vs-JD Agent Tool shortlisting high-fit candidates',       color:T.gold },
  { domain:'D2C & E-commerce',   project:'No-Code Customer Persona Segmenter', outcome:'Airtable + Zapier + LLM agents for automated tagging',        color:'#A855F7' },
  { domain:'NLP / LLM Eng.',     project:'PromptOps Testing & Eval Toolkit', outcome:'Benchmarks prompts across tasks using LLM metrics',            color:T.rose },
  { domain:'GovTech',            project:'Grievance Classifier & Routing Bot', outcome:'Classifies citizen complaints & assigns to departments',      color:T.cyan },
  { domain:'Analytics / Research', project:'AI-Based Survey Summarizer',   outcome:'RAG pipeline + LangChain summarizer for market insights',        color:T.gold },
  { domain:'Custom Track',       project:'Pitch Your Own Idea',            outcome:'Learners pitch project ideas aligned with their career path',     color:T.mint },
]

const TOOLS = [
  { name:'Python',           why:'Beginner-friendly AI & automation language',             color:'#3776AB' },
  { name:'OpenAI / GPT',     why:'Prompt engineering, task automation, AI chatbots',       color:'#10A37F' },
  { name:'LangChain',        why:'Intelligent LLM workflows — chaining, memory, context', color:'#1C3D5A' },
  { name:'GitHub',           why:'Proof-of-work portfolio visible to 100+ recruiters',     color:'#F5F5F5' },
  { name:'Zapier / Make',    why:'Build real tools without writing code — non-tech path',  color:'#FF4A00' },
  { name:'Relevance AI',     why:'No-code agent builder for autonomous workflows',         color:'#6366F1' },
  { name:'n8n',              why:'Open-source workflow automation & orchestration',        color:'#EA4B71' },
  { name:'Streamlit',        why:'Live project demos — instant web apps from Python',      color:'#FF4B4B' },
  { name:'Docker',           why:'Containerise agents for cloud deployment',               color:'#2496ED' },
  { name:'FastAPI',          why:'REST & WebSocket backend for agent invocation',          color:'#009688' },
]

export function Program() {
  const [activeTrack, setActiveTrack] = useState(0)

  return (
    <section id="program" style={{ position:'relative',background:T.ink,overflow:'hidden',
      padding:'clamp(64px,8vw,120px) 0',
    }}>
      <Noise/>
      <GridLines/>
      <Orb color={T.violet} x="10%" y="30%" size={500} opacity={0.06}/>
      <Orb color={T.cyan}   x="90%" y="70%" size={450} opacity={0.05}/>

      <Container>
        {/* header */}
        <FadeIn>
          <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:6,flexWrap:'wrap' }}>
            <CLCLogo size={28}/>
          </div>
          <SectionLabel>6-Month → 12-Month Advanced Journey</SectionLabel>
          <Display>Build. Prove. <Grad>Get Hired.</Grad></Display>
          <Rule/>
          <p style={{ fontFamily:T.body,fontSize:15,lineHeight:1.8,color:T.mid,fontWeight:300,maxWidth:560,margin:'0 0 12px' }}>
            The 6-month program is your launchpad. Upon completion, you seamlessly continue into the
            <strong style={{ color:T.hi,fontWeight:500 }}> 12-month advanced track</strong> — same ecosystem,
            deeper specialisation, enterprise capstone. One unified career journey, not two separate courses.
          </p>
          <div style={{ display:'flex',gap:8,flexWrap:'wrap',marginBottom:40 }}>
            <Tag scheme="mint">8–10 PM IST · Sat & Sun Live Sessions</Tag>
            <Tag scheme="gold">Choice-Based Projects</Tag>
            <Tag scheme="violet">Tech & No-Code Tracks</Tag>
          </div>
        </FadeIn>

        {/* track selector */}
        <FadeIn delay={0.1}>
          <div style={{ display:'flex',gap:8,marginBottom:24,flexWrap:'wrap' }}>
            {TECH_TRACKS.map((t,i) => (
              <button
                key={t.track}
                onClick={() => setActiveTrack(i)}
                style={{ fontFamily:T.display,fontSize:12,fontWeight:600,cursor:'pointer',
                  padding:'9px 18px',borderRadius:10,
                  background: activeTrack===i ? `linear-gradient(135deg,${t.color},${t.color}99)` : T.glass,
                  border: activeTrack===i ? 'none' : `0.5px solid ${T.line}`,
                  color: activeTrack===i ? '#fff' : T.muted,
                }}
              >
                {t.track}
              </button>
            ))}
          </div>

          {/* curriculum table */}
          <div style={{ background:T.glass,border:`0.5px solid ${T.line}`,borderRadius:20,
            overflow:'hidden',marginBottom:24,
          }}>
            <div style={{ overflowX:'auto' }}>
              <table style={{ width:'100%',minWidth:600,borderCollapse:'collapse' }}>
                <thead>
                  <tr style={{ background:`${TECH_TRACKS[activeTrack].color}12` }}>
                    {['Unit','Module','Timeline','Hours','Key Topics'].map(h => (
                      <th key={h} style={{ padding:'12px 16px',fontFamily:T.mono,fontSize:10,
                        color:TECH_TRACKS[activeTrack].color,letterSpacing:'0.10em',
                        textTransform:'uppercase',fontWeight:500,textAlign:'left',
                        borderBottom:`0.5px solid ${T.line}`,
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TECH_TRACKS[activeTrack].units.map((u,i) => (
                    <tr key={u.unit} style={{ background: i%2===0 ? 'transparent' : `${T.glass}` }}>
                      <td style={{ padding:'12px 16px',fontFamily:T.mono,fontSize:10,color:T.muted,borderBottom:`0.5px solid ${T.line}`,whiteSpace:'nowrap' }}>{u.unit}</td>
                      <td style={{ padding:'12px 16px',fontFamily:T.body,fontSize:13,fontWeight:500,color:T.hi,borderBottom:`0.5px solid ${T.line}` }}>{u.title}</td>
                      <td style={{ padding:'12px 16px',fontFamily:T.mono,fontSize:10,color:T.muted,borderBottom:`0.5px solid ${T.line}`,whiteSpace:'nowrap' }}>{u.weeks}</td>
                      <td style={{ padding:'12px 16px',borderBottom:`0.5px solid ${T.line}` }}>
                        <span style={{ fontFamily:T.mono,fontSize:10,padding:'3px 8px',borderRadius:6,
                          background:`${TECH_TRACKS[activeTrack].color}18`,color:TECH_TRACKS[activeTrack].color,
                        }}>{u.hrs}</span>
                      </td>
                      <td style={{ padding:'12px 16px',borderBottom:`0.5px solid ${T.line}` }}>
                        <div style={{ display:'flex',flexWrap:'wrap',gap:4 }}>
                          {u.topics.map(tp => (
                            <span key={tp} style={{ fontFamily:T.body,fontSize:11,color:T.muted,
                              background:T.glass,border:`0.5px solid ${T.line}`,
                              padding:'2px 8px',borderRadius:6,
                            }}>{tp}</span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* capstone callout */}
            <div style={{ padding:'18px 24px',borderTop:`0.5px solid ${T.line}`,
              background:`${TECH_TRACKS[activeTrack].color}08`,
            }}>
              <div style={{ display:'flex',alignItems:'flex-start',gap:12 }}>
                <Award size={16} color={T.gold} style={{ flexShrink:0,marginTop:2 }}/>
                <div>
                  <span style={{ fontFamily:T.display,fontSize:12,fontWeight:600,color:T.gold,
                    letterSpacing:'0.06em',textTransform:'uppercase',marginRight:8,
                  }}>Capstone Project</span>
                  <span style={{ fontFamily:T.body,fontSize:13,color:T.mid }}>{TECH_TRACKS[activeTrack].capstone}</span>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* 12-month advanced tracks */}
        <FadeIn delay={0.18}>
          <div style={{ marginBottom:40 }}>
            <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:16,flexWrap:'wrap' }}>
              <span style={{ fontFamily:T.display,fontSize:16,fontWeight:600,color:T.hi }}>
                Advanced Journey — 12-Month Tracks
              </span>
              <Tag scheme="gold">Starts Right After 6 Months</Tag>
            </div>
            <div className="clc-grid-2" style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:12 }}>
              {ADVANCED_TRACKS.map((a,i) => (
                <div key={a.label} style={{ background:T.glass,border:`0.5px solid ${a.color}40`,
                  borderRadius:14,padding:'20px 22px',
                }}>
                  <div style={{ display:'flex',alignItems:'center',gap:10,marginBottom:10 }}>
                    <Layers size={16} color={a.color}/>
                    <span style={{ fontFamily:T.display,fontSize:13,fontWeight:600,color:T.hi }}>{a.label}</span>
                  </div>
                  <p style={{ fontFamily:T.body,fontSize:12.5,color:T.muted,lineHeight:1.65 }}>{a.capstone}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* choice-based projects */}
        <FadeIn delay={0.22}>
          <div style={{ marginBottom:40 }}>
            <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:16,flexWrap:'wrap' }}>
              <span style={{ fontFamily:T.display,fontSize:16,fontWeight:600,color:T.hi }}>
                Choice-Based Project Tracks
              </span>
              <Tag scheme="mint">30+ Live Use Cases</Tag>
            </div>
            <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:10 }}>
              {PROJECT_DOMAINS.map((p,i) => (
                <motion.div
                  key={p.domain}
                  initial={{ opacity:0,y:12 }}
                  whileInView={{ opacity:1,y:0 }}
                  viewport={{ once:true }}
                  transition={{ delay:i*0.05 }}
                  whileHover={{ y:-2,borderColor:`${p.color}50` }}
                  style={{ background:T.glass,border:`0.5px solid ${T.line}`,borderRadius:12,padding:'16px 18px' }}
                >
                  <div style={{ display:'flex',alignItems:'center',gap:6,marginBottom:6 }}>
                    <div style={{ width:8,height:8,borderRadius:'50%',background:p.color,flexShrink:0,boxShadow:`0 0 6px ${p.color}` }}/>
                    <span style={{ fontFamily:T.mono,fontSize:9,color:p.color,letterSpacing:'0.08em',textTransform:'uppercase' }}>{p.domain}</span>
                  </div>
                  <div style={{ fontFamily:T.body,fontSize:12.5,fontWeight:500,color:T.hi,marginBottom:4 }}>{p.project}</div>
                  <div style={{ fontFamily:T.body,fontSize:11.5,color:T.muted,lineHeight:1.5 }}>{p.outcome}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* tools & tech stack */}
        <FadeIn delay={0.28}>
          <div>
            <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:16,flexWrap:'wrap' }}>
              <span style={{ fontFamily:T.display,fontSize:16,fontWeight:600,color:T.hi }}>
                Tools & Tech Stack
              </span>
              <Tag scheme="cyan">25+ Cutting-Edge Platforms</Tag>
            </div>
            <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:8 }}>
              {TOOLS.map((t,i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity:0,scale:0.92 }}
                  whileInView={{ opacity:1,scale:1 }}
                  viewport={{ once:true }}
                  transition={{ delay:i*0.04 }}
                  whileHover={{ borderColor:`${t.color}60`,y:-2 }}
                  style={{ background:T.glass,border:`0.5px solid ${T.line}`,borderRadius:10,
                    padding:'12px 16px',display:'flex',alignItems:'center',gap:12,
                  }}
                >
                  <div style={{ width:10,height:10,borderRadius:'50%',background:t.color,
                    flexShrink:0,boxShadow:`0 0 8px ${t.color}80`,
                  }}/>
                  <div>
                    <div style={{ fontFamily:T.body,fontSize:12.5,fontWeight:500,color:T.hi }}>{t.name}</div>
                    <div style={{ fontFamily:T.body,fontSize:11,color:T.muted,lineHeight:1.4 }}>{t.why}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════════════════
   HIRING  (job roadmap, HireX, FreelanceX, partners)
══════════════════════════════════════════════════════════════════════════════ */
const ROADMAP = [
  { n:'01', title:'Complete Program',   desc:'100% curriculum + all projects & capstone at 90%+ score',          color:T.violet },
  { n:'02', title:'Get Certified',      desc:'Industry cert + Verified Career Portfolio minted to profile', color:'#A855F7' },
  { n:'03', title:'Profile Built',      desc:'GitHub portfolio, LinkedIn AI-optimised, résumé AI-rewritten',       color:'#8B5CF6' },
  { n:'04', title:'Access HireX',       desc:'Exclusive portal — 120+ global remote-first AI companies',          color:T.cyan },
  { n:'05', title:'Interview Prep',     desc:'AI mock interviews, live technical sessions, AigenX coaching',       color:T.mint },
  { n:'06', title:'Legal Offer Letter', desc:'Fixed date of joining in offer letter — legally guaranteed',         color:T.gold },
]

const PARTNERS = [
  { name:'OpenAI', logo:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/OpenAI_logo_2025_%28symbol%29.svg/120px-OpenAI_logo_2025_%28symbol%29.svg.png' },
  { name:'Anthropic', logo:'https://cdn.simpleicons.org/anthropic' },
  { name:'Google', logo:'https://cdn.simpleicons.org/google' },
  { name:'Microsoft', logo:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/3840px-Microsoft_logo.svg.png' },
  { name:'AWS', logo:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/960px-Amazon_Web_Services_Logo.svg.png' },

  { name:'Docker', logo:'https://cdn.simpleicons.org/docker' },
  { name:'HubSpot', logo:'https://cdn.simpleicons.org/hubspot' },
  { name:'Zapier', logo:'https://cdn.simpleicons.org/zapier' },
  { name:'Notion', logo:'https://cdn.simpleicons.org/notion' },
  { name:'Monday', logo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNXXpkSJHzoiwup_zNh09cWj-Zq_boVw5tfg&s' },

  { name:'Freshworks', logo:'https://cdn.simpleicons.org/freshworks' },
  { name:'Salesforce', logo:'https://cdn.simpleicons.org/salesforce' },
  { name:'Databricks', logo:'https://cdn.simpleicons.org/databricks' },
  { name:'ServiceNow', logo:'https://images.icon-icons.com/2699/PNG/512/servicenow_logo_icon_168835.png' },
  { name:'Workday', logo:'https://images.seeklogo.com/logo-png/48/1/workday-logo-png_seeklogo-480431.png' },

  { name:'Retool', logo:'https://cdn.simpleicons.org/retool' },
  { name:'Coda', logo:'https://cdn.simpleicons.org/coda' },
  { name:'Loom', logo:'https://cdn.simpleicons.org/loom' },
  { name:'OutSystems', logo:'https://www.nuget.org/profiles/OutSystems/avatar?imageSize=512' },
  { name:'Turing', logo:'https://upload.wikimedia.org/wikipedia/en/8/8d/Turing_College_logo.jpeg' },
]
// const PLACED_PROFILES = [
//   { name:'Arjun Sharma',  role:'AI Engineer, Freshworks',          ctc:'₹18 LPA', from:'₹6 LPA',   loc:'Delhi',     init:'AS', color:T.violet },
//   { name:'Priya Menon',   role:'No-Code AI Developer (Remote)',     ctc:'₹14 LPA', from:'Non-Tech', loc:'Bangalore', init:'PM', color:T.mint },
//   { name:'Rahul Gupta',   role:'Freelance AI Developer',            ctc:'₹45K/mo via FreelanceX', from:'₹5 LPA', loc:'Mumbai',init:'RG', color:T.gold },
//   { name:'Sneha Iyer',    role:'Prompt Engineer, Startup (Remote)', ctc:'₹16 LPA', from:'₹8 LPA',   loc:'Chennai',   init:'SI', color:T.cyan },
// ]

const PROFILE_IMAGES = [
  'https://res.cloudinary.com/dguj1vqqb/image/upload/v1778936014/ChatGPT_Image_May_14_2026_08_33_14_PM_wk2pqg.png',
  'https://res.cloudinary.com/dguj1vqqb/image/upload/v1778935726/main-sample.png',
  'https://res.cloudinary.com/dguj1vqqb/image/upload/v1778935887/ChatGPT_Image_May_14_2026_08_34_53_PM_umfssj.png',
  'https://res.cloudinary.com/dguj1vqqb/image/upload/v1778935868/ChatGPT_Image_May_16_2026_06_13_51_PM_qrsrgm.png',
]

const PLACED_PROFILES = [
  {
    name:'Arjun Sharma',
    role:'AI Engineer, Freshworks',
    ctc:'₹18 LPA',
    from:'₹6 LPA',
    loc:'Delhi',
    img:PROFILE_IMAGES[0],
    color:T.violet,
  },
  {
    name:'Priya Menon',
    role:'No-Code AI Developer (Remote)',
    ctc:'₹14 LPA',
    from:'Non-Tech',
    loc:'Bangalore',
    img:PROFILE_IMAGES[1],
    color:T.mint,
  },
  {
    name:'Rahul Gupta',
    role:'Freelance AI Developer',
    ctc:'₹45K/mo',
    from:'₹5 LPA',
    loc:'Mumbai',
    img:PROFILE_IMAGES[2],
    color:T.gold,
  },
  {
    name:'Sneha Iyer',
    role:'Prompt Engineer',
    ctc:'₹16 LPA',
    from:'₹8 LPA',
    loc:'Chennai',
    img:PROFILE_IMAGES[3],
    color:T.cyan,
  },
]

export function Hiring() {
  return (
    <section id="hiring" style={{ position:'relative',background:T.ink,overflow:'hidden',padding:'clamp(64px,8vw,120px) 0' }}>
      <Noise/>
      <GridLines/>
      <Orb color={T.violet} x="90%" y="20%" size={600} opacity={0.07}/>
      <Orb color={T.mint}   x="5%"  y="75%" size={450} opacity={0.05}/>

      <Container>
        {/* logo on every page */}
        

        {/* header */}
        <FadeIn>
          <SectionLabel>Hiring Partners & Job Roadmap</SectionLabel>
          <Display>Your Path to <Grad>Getting Hired.</Grad></Display>
          <Rule/>
          <p style={{ fontFamily:T.body,fontSize:15,lineHeight:1.8,color:T.mid,fontWeight:300,maxWidth:560,margin:'0 0 12px' }}>
            HireX and FreelanceX are{' '}
            <strong style={{ color:T.hi,fontWeight:500 }}>exclusively available to CLC candidates only</strong>.
            120+ global remote-first companies actively source from our verified talent pool.
            88% of eligible candidates receive a job offer within the guarantee period.
          </p>
          <div style={{ display:'flex',gap:8,flexWrap:'wrap',marginBottom:48 }}>
            <Tag scheme="gold">88% Job Conversion Rate</Tag>
            <Tag scheme="mint">Lifetime Access — HireX & FreelanceX</Tag>
            <Tag scheme="violet">Legal Job Agreement</Tag>
          </div>
        </FadeIn>

        {/* roadmap */}
        <FadeIn delay={0.12}>
          <div style={{ marginBottom:56,overflowX:'auto',paddingBottom:8 }}>
            <div style={{ display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:2,minWidth:720 }}>
              {ROADMAP.map((s,i) => (
                <div key={s.n} style={{ position:'relative' }}>
                  {i < ROADMAP.length-1 && (
                    <div style={{ position:'absolute',top:28,left:'50%',right:'-50%',height:1,
                      background:`linear-gradient(90deg,${s.color}80,transparent)`,zIndex:0,
                    }}/>
                  )}
                  <div style={{ position:'relative',zIndex:1,padding:'0 6px' }}>
                    <div style={{ width:56,height:56,borderRadius:'50%',
                      background:`linear-gradient(135deg,${s.color}28,${s.color}08)`,
                      border:`1px solid ${s.color}50`,
                      display:'flex',alignItems:'center',justifyContent:'center',
                      margin:'0 auto 14px',boxShadow:`0 0 20px ${s.color}20`,
                    }}>
                      <span style={{ fontFamily:T.mono,fontSize:13,fontWeight:500,color:s.color }}>{s.n}</span>
                    </div>
                    <div style={{ fontFamily:T.display,fontSize:12,fontWeight:600,color:T.hi,textAlign:'center',marginBottom:6,lineHeight:1.3 }}>{s.title}</div>
                    <div style={{ fontFamily:T.body,fontSize:11,color:T.muted,textAlign:'center',lineHeight:1.5 }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* HireX + FreelanceX cards */}
        <FadeIn delay={0.2}>
          <div className="clc-grid-2" style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16 }}>
            {/* HireX */}
            <div style={{ position:'relative',overflow:'hidden',borderRadius:20,
              border:`0.5px solid ${T.violetB}`,padding:'28px',
              background:`linear-gradient(135deg,${T.violetLo} 0%,rgba(255,255,255,0.02) 100%)`,
            }}>
              <div style={{ position:'absolute',top:-20,right:-20,width:120,height:120,
                background:`radial-gradient(${T.violet}40,transparent 70%)`,pointerEvents:'none',
              }}/>
              <div style={{ display:'flex',alignItems:'center',gap:14,marginBottom:18 }}>
                <div style={{ width:44,height:44,borderRadius:12,background:T.violetLo,
                  border:`0.5px solid ${T.violetB}`,display:'flex',alignItems:'center',justifyContent:'center',
                }}>
                  <Zap size={20} color={T.violetHi}/>
                </div>
                <div>
                  <div style={{ fontFamily:T.display,fontSize:17,fontWeight:600,color:T.hi }}>HireX Portal</div>
                  <Tag scheme="violet">Exclusive · CLC Candidates Only</Tag>
                </div>
              </div>
              <p style={{ fontFamily:T.body,fontSize:13.5,color:T.mid,lineHeight:1.75,marginBottom:18 }}>
                Access 120+ remote-first global AI companies. Your Verified Career Portfolio is your profile —
                AI-matched shortlisting based on real project output, not just a resume.
              </p>
              {['Legal job guarantee with signed agreement','Fixed date of joining in offer letter','India + International remote roles','Permanent AI roles: Germany, UAE, Singapore','88% job offer conversion rate','Lifetime access — never expires'].map(f => (
                <CheckRow key={f} text={f} color={T.violetHi}/>
              ))}
            </div>

            {/* FreelanceX */}
            <div style={{ position:'relative',overflow:'hidden',borderRadius:20,
              border:`0.5px solid ${T.cyanB}`,padding:'28px',
              background:`linear-gradient(135deg,${T.cyanLo} 0%,rgba(255,255,255,0.02) 100%)`,
            }}>
              <div style={{ position:'absolute',top:-20,right:-20,width:120,height:120,
                background:`radial-gradient(${T.cyan}40,transparent 70%)`,pointerEvents:'none',
              }}/>
              <div style={{ display:'flex',alignItems:'center',gap:14,marginBottom:18 }}>
                <div style={{ width:44,height:44,borderRadius:12,background:T.cyanLo,
                  border:`0.5px solid ${T.cyanB}`,display:'flex',alignItems:'center',justifyContent:'center',
                }}>
                  <TrendingUp size={20} color={T.cyan}/>
                </div>
                <div>
                  <div style={{ fontFamily:T.display,fontSize:17,fontWeight:600,color:T.hi }}>FreelanceX Portal</div>
                  <Tag scheme="cyan">Exclusive · CLC Candidates Only</Tag>
                </div>
              </div>
              <p style={{ fontFamily:T.body,fontSize:13.5,color:T.mid,lineHeight:1.75,marginBottom:18 }}>
                Pay your monthly EMI through real freelance earnings before you even graduate.
                AI chatbots, research agents, enterprise RAG — real clients, serious payouts.
              </p>
              {['Freelance earnings directly cover monthly EMIs','AI chatbots: ₹5,000 – ₹15,000 / project','Research agents: ₹10,000 – ₹30,000 / project','Enterprise RAG systems: ₹50,000 – ₹2,00,000','Multi-agent workflow projects available','Lifetime access to FreelanceX platform'].map(f => (
                <CheckRow key={f} text={f} color={T.cyan}/>
              ))}
            </div>
          </div>
        </FadeIn>

<FadeIn delay={0.3}>
  <div style={{ marginTop: 50 }}>

    <div
      style={{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        gap:16,
        marginBottom:24,
        flexWrap:'wrap',
      }}
    >
      <div>
        <div
          style={{
            fontFamily:T.display,
            fontSize:18,
            fontWeight:600,
            color:T.hi,
            marginBottom:4,
          }}
        >
          Trusted By Global Hiring Partners
        </div>

        <div
          style={{
            fontFamily:T.body,
            fontSize:13,
            color:T.muted,
          }}
        >
          Remote-first startups, enterprise companies & AI-native businesses
        </div>
      </div>

      <div style={{ display:'flex', gap:8 }}>
        <Tag scheme="mint">120+ Companies</Tag>
        <Tag scheme="cyan">Global Hiring Network</Tag>
      </div>
    </div>
          <div
  style={{
    marginBottom:20,
    padding:'14px 18px',
    borderRadius:14,
    background:`linear-gradient(135deg,${T.mintLo},rgba(255,255,255,0.02))`,
    border:`1px solid ${T.mintB}`,
    display:'flex',
    alignItems:'center',
    gap:10,
    flexWrap:'wrap',
  }}
>
  <BadgeCheck
    size={16}
    color={T.mint}
  />

  <span
    style={{
      fontFamily:T.body,
      fontSize:13,
      color:T.mid,
    }}
  >
    Graduates have secured roles across AI startups,
    SaaS companies, enterprise organizations and
    remote-first teams worldwide.
  </span>
</div>
    <div
      style={{
        display:'grid',
        gridTemplateColumns:'repeat(5,minmax(0,1fr))',
        gap:14,
      }}
    >
      {PARTNERS.map((p,i) => (
        <motion.div
          key={p.name}
          initial={{ opacity:0,y:10 }}
          whileInView={{ opacity:1,y:0 }}
          viewport={{ once:true }}
          transition={{
            delay:i*0.03,
            duration:0.4,
          }}
          whileHover={{
            y:-4,
            scale:1.02,
          }}
          style={{
            position:'relative',
            overflow:'hidden',
            background:
              'linear-gradient(180deg,rgba(255,255,255,0.8),rgba(255,255,255,0.02))',
            border:`1px solid ${T.line}`,
            borderRadius:16,
            padding:'18px 14px',
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center',
            gap:10,
            minHeight:90,
          }}
        >
          <img
            src={p.logo}
            alt={p.name}
            style={{
              width:28,
              height:28,
              objectFit:'contain',
              opacity:0.9,
            }}
          />

          <span
            style={{
              fontFamily:T.body,
              fontSize:12,
              fontWeight:500,
              color:T.mid,
              textAlign:'center',
            }}
          >
            {p.name}
          </span>
        </motion.div>
      ))}
    </div>

  </div>
</FadeIn>

        {/* CTC chart */}
        <FadeIn delay={0.35}><CTCChart/></FadeIn>
      </Container>
    </section>
  )
}

/* ── CTC CHART ──────────────────────────────────────────────────────────────── */
function CTCChart() {
  const ref = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-60px' })

  const bars = [
    { label:'Before', val:7,  color:T.muted,  display:'₹5–8 LPA',    note:'Typical fresher / stuck professional' },
    { label:'Year 1', val:14, color:T.violet,  display:'₹12–15 LPA',  note:'Post-InternX breakthrough' },
    { label:'Year 2', val:19, color:'#8B5CF6', display:'₹15–20 LPA',  note:'No-Code AI Dev, PromptOps role' },
    { label:'Year 3', val:25, color:'#6D28D9', display:'₹20–25 LPA',  note:'Mid-senior AI/ML roles' },
    { label:'Year 4', val:35, color:'#5B21B6', display:'₹25–35 LPA',  note:'Team lead / international projects' },
    { label:'Year 5', val:50, color:T.cyan,    display:'₹35–50+ LPA', note:'Global AI Specialist 🚀' },
  ]
  const max = 50
  const barH = 200

  return (
    <div ref={ref} style={{ marginTop:48,background:T.glass,border:`0.5px solid ${T.line}`,
      borderRadius:20,padding:'clamp(20px,3vw,36px)',
    }}>
      <div style={{ display:'flex',flexWrap:'wrap',alignItems:'flex-start',justifyContent:'space-between',gap:16,marginBottom:32 }}>
        <div>
          <div style={{ fontFamily:T.display,fontSize:18,fontWeight:600,color:T.hi,marginBottom:4 }}>
            5-Year CTC Growth Trajectory
          </div>
          <div style={{ fontFamily:T.body,fontSize:12,color:T.muted }}>
            Freshers avg ₹6–10 LPA starting CTC · Experienced professionals: 30%–120% hike on current CTC
          </div>
        </div>
        <div style={{ display:'flex',gap:8,flexWrap:'wrap' }}>
          <Tag scheme="violet">Freshers ₹6–10 LPA</Tag>
          <Tag scheme="gold">Exp 30–120% hike</Tag>
          <Tag scheme="cyan">International ₹30–50+ LPA</Tag>
        </div>
      </div>

      <div style={{ display:'flex',alignItems:'flex-end',gap:8,height:`${barH + 40}px`,
        overflowX:'auto',paddingBottom:4,
      }}>
        {bars.map((b,i) => (
          <div key={b.label} style={{ flex:'1 0 60px',display:'flex',flexDirection:'column',alignItems:'center' }}>
            <motion.div
              initial={{ opacity:0 }}
              animate={inView ? { opacity:1 } : {}}
              transition={{ delay:i*0.12+0.7 }}
              style={{ fontFamily:T.mono,fontSize:10,color:b.color,fontWeight:500,
                marginBottom:6,letterSpacing:'0.04em',textAlign:'center',
              }}
            >{b.display}</motion.div>
            <motion.div
              style={{ width:'100%',borderRadius:'8px 8px 4px 4px',
                background:`linear-gradient(to top,${b.color},${b.color}66)`,
                boxShadow:`0 0 16px ${b.color}30`,
              }}
              initial={{ height:0 }}
              animate={inView ? { height:`${(b.val/max)*barH}px` } : { height:0 }}
              transition={{ delay:i*0.1,duration:0.85,ease:[0.34,1.4,0.64,1] }}
            />
            <div style={{ fontFamily:T.mono,fontSize:10,color:T.muted,marginTop:8,
              letterSpacing:'0.06em',textAlign:'center',
            }}>{b.label}</div>
          </div>
        ))}
      </div>

      <div className="clc-grid-3" style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,marginTop:24 }}>
        {[
          { label:'Freshers',      value:'₹6–10 LPA avg start',     color:T.violet },
          { label:'Experienced',   value:'30–120% hike on CTC',     color:T.gold },
          { label:'International', value:'₹30–50+ LPA remote',      color:T.cyan },
        ].map(r => (
          <div key={r.label} style={{ background:`${r.color}10`,border:`0.5px solid ${r.color}30`,
            borderRadius:10,padding:'12px 16px',
          }}>
            <div style={{ fontFamily:T.mono,fontSize:9,color:r.color,letterSpacing:'0.10em',
              textTransform:'uppercase',marginBottom:4,
            }}>{r.label}</div>
            <div style={{ fontFamily:T.body,fontSize:13,fontWeight:500,color:T.mid }}>{r.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════════
   PRICING - Needs to integrate payment gateway
══════════════════════════════════════════════════════════════════════════════ */
// const PLANS = [
//   {
//     name:'Essential',
//     price:'₹50,000',
//     usd:'~$600',
//     emi:'₹5,000 / month',
//     tag:null,
//     featured:false,
//     accent:T.mid,
//     accentLo:'rgba(169,175,202,0.08)',
//     accentB:'rgba(169,175,202,0.20)',
//     desc:'Build your first verifiable AI career asset with real projects, blockchain credentials, and HireX access.',
//     features:[
//       '6-Month Program (Tech or No-Code Track)',
//       '1 Real Agentic AI Project',
//       'GitHub Portfolio Setup',
//       '1 ResumeNFT Blockchain Credential',
//       'Group Mentorship Sessions',
//       'HireX View Access',
//       'Basic LinkedIn Optimisation',
//       'FreelanceX Access',
//       'AigenX 24×7 AI Coach',
//     ],
//     cta:'Get Started',
//     ctcTarget:'₹10–12 LPA',
//   },
//   {
//     name:'Accelerator',
//     price:'₹75,000',
//     usd:'~$900',
//     emi:'₹7,500 / month',
//     tag:'Most Popular',
//     featured:false,
//     accent:T.violet,
//     accentLo:T.violetLo,
//     accentB:T.violetB,
//     desc:'Guided growth with placement support, proof-of-work portfolio, and CTC ladder access.',
//     features:[
//       '6-Month Program + Extensions',
//       '2 Real Agentic AI Projects',
//       'Hosted GitHub Portfolio',
//       '2 ResumeNFTs + LinkedIn Sync',
//       'Monthly 1:1 Mentorship',
//       'HireX Entry Listings',
//       '1 AI Mock Interview',
//       '1 Bonus Project',
//       'FreelanceX Access — EMI coverage',
//     ],
//     cta:'Enrol Now',
//     ctcTarget:'₹15–20 LPA',
//   },
//   {
//     name:'Elite',
//     price:'₹1,00,000',
//     usd:'~$1,200',
//     emi:'₹10,000 / month',
//     tag:'Job Guaranteed',
//     featured:true,
//     accent:T.gold,
//     accentLo:T.goldLo,
//     accentB:T.goldB,
//     desc:'Legal job guarantee, weekly expert mentoring, international placement, enterprise capstone. Zero risk.',
//     features:[
//       'Full 12-Month Advanced Program',
//       '3 Real AI Projects + Capstone',
//       'Premium GitHub Showcase',
//       '3 ResumeNFTs + CTC Ladder',
//       'Weekly 1:1 Expert Mentoring',
//       'HireX Priority Shortlisting',
//       '3 AI Mock Interviews + Feedback',
//       '3 Bonus Internships',
//       'Legal Job Agreement — signed',
//       'Fixed Date of Joining in Offer Letter',
//       'FreelanceX Lifetime Access',
//       'International Placement (Germany, UAE, Singapore)',
//     ],
//     cta:'Claim Job Guarantee',
//     ctcTarget:'₹30–50+ LPA',
//   },
// ]

const PLANS = [
  {
    name:'Accelerator',
    price:'₹1,00,000',
    usd:'~$1200',
    emi:'₹10,00 / month',
    tag:'Most Popular',
    featured:false,
    accent:T.violet,
    accentLo:T.violetLo,
    accentB:T.violetB,
    desc:'Build a strong AI portfolio, gain placement support, and accelerate your journey into high-paying tech roles.',
    features:[
      '6-Month Program + Extensions',
      '2 Real Agentic AI Projects',
      'Hosted GitHub Portfolio',
      'Verified Career Portfolio + LinkedIn Sync',
      'Monthly 1:1 Mentorship',
      'HireX Entry Listings',
      '1 AI Mock Interview',
      '1 Bonus Project',
      'FreelanceX Access — EMI Coverage',
    ],
    cta:'Enrol Now',
    ctcTarget:'₹15–20 LPA',
  },
  {
    name:'Elite',
    price:'₹2,00,000',
    usd:'~$2,400',
    emi:'₹20,000 / month',
    tag:'Job Guaranteed',
    featured:true,
    accent:T.gold,
    accentLo:T.goldLo,
    accentB:T.goldB,
    desc:'Our flagship program with enterprise projects, legal placement guarantee, international opportunities, and weekly expert mentoring.',
    features:[
      'Full 12-Month Advanced Program',
      '3 Real AI Projects + Enterprise Capstone',
      'Premium GitHub Showcase',
      'Verified Career Portfolio + CTC Ladder',
      'Weekly 1:1 Expert Mentoring',
      'HireX Priority Shortlisting',
      '3 AI Mock Interviews + Feedback',
      '3 Bonus Internships',
      'Legal Job Agreement — Signed',
      'Fixed Date of Joining in Offer Letter',
      'FreelanceX Lifetime Access',
      'International Placement (Germany, UAE, Singapore)',
    ],
    cta:'Claim Job Guarantee',
    ctcTarget:'₹30–50+ LPA',
  },
]

const FINANCE = ['ICICI Bank','HDFC Bank','Axis Bank','Bajaj Finance','IDFC First','Kotak','SBI','Yes Bank']

export function Pricing() {
    const router = useRouter();

    const handleGetStarted = (plan: typeof PLANS[0]) => {
      const raw = parseInt(plan.price.replace(/[₹,]/g, '')) * 100;
      const params = new URLSearchParams({
        plan: plan.name,
        category: 'InternX AI',
        amount: raw.toString(),
        currency: 'INR',
      });
      // router.push(`/checkout?${params.toString()}`);
      window.location.href = `/checkout?${params.toString()}`;
    };


  return (
    <section id="pricing" style={{ position:'relative',background:T.void,overflow:'hidden',padding:'clamp(64px,8vw,120px) 0' }}>
      <Noise/>
      <GridLines/>
      <Orb color={T.gold}   x="80%" y="30%" size={600} opacity={0.06}/>
      <Orb color={T.violet} x="10%" y="70%" size={500} opacity={0.06}/>

      <Container>
        

        <FadeIn>
          <SectionLabel>Pricing & Plans</SectionLabel>
          <Display>Zero-Risk Investment.<br/><Grad>Lifetime Returns.</Grad></Display>
          <Rule/>
          <p
            style={{
              fontFamily:T.body,
              fontSize:13,
              color:T.muted,
              lineHeight:1.7,
              marginBottom:14,
            }}
          >
            EMI starts at just ₹7,500/month for Accelerator
            and ₹10,000/month for Elite. Approval in minutes.
            Start learning today and cover your installments
            through FreelanceX earning opportunities.
          </p>
          <div style={{ display:'flex',gap:8,flexWrap:'wrap',marginBottom:56 }}>
            <Tag scheme="mint">0% Interest EMI Available</Tag>
            <Tag scheme="violet">Placement Support Included</Tag>
            <Tag scheme="gold">Job Guarantee Available</Tag>
            <Tag scheme="violet">Lifetime HireX + FreelanceX Access</Tag>
          </div>
        </FadeIn>

        {/* pricing cards */}
        <FadeIn delay={0.12}>
          {/* <div className="clc-grid-3" style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16,marginBottom:24,alignItems:'start' }}>
           */}
           <div
              className="clc-grid-2"
              style={{
                display:'grid',
                gridTemplateColumns:'repeat(2,minmax(340px,520px))',
                justifyContent:'center',
                gap:'24px',
                marginBottom:32,
                alignItems:'stretch',
              }}
            >
            {PLANS.map((p,i) => (
              <motion.div
                key={p.name}
                initial={{ opacity:0,y:30,scale:0.97 }}
                whileInView={{ opacity:1,y:0,scale:1 }}
                viewport={{ once:true }}
                transition={{ delay:i*0.1,duration:0.6,ease:[0.16,1,0.3,1] }}
                style={{
                  position:'relative',
                  borderRadius:24,
                  overflow:'hidden',
                  minHeight:'100%',
                  background:p.featured
                    ? `linear-gradient(
                        160deg,
                        ${T.goldLo} 0%,
                        rgba(255,255,255,0.04) 50%,
                        ${T.violetLo} 100%
                      )`
                    : `linear-gradient(
                        180deg,
                        rgba(139,92,246,0.10) 0%,
                        rgba(255,255,255,0.02) 100%
                      )`,
                  border:p.featured
                    ? `1px solid ${T.gold}55`
                    : `1px solid ${T.violet}30`,
                  padding:'32px 28px 28px',
                  boxShadow:p.featured
                    ? `0 0 80px ${T.gold}18`
                    : `0 0 50px ${T.violet}12`,
                }}
              >
                {p.featured && (
                  <div style={{ position:'absolute',top:-40,right:-40,width:160,height:160,
                    background:`radial-gradient(${T.gold}40,transparent 70%)`,pointerEvents:'none',
                  }}/>
                )}

                {p.tag && (
                  <div style={{ marginBottom:14 }}>
                    <span style={{ display:'inline-flex',alignItems:'center',gap:4,
                      background: p.featured ? T.goldLo : T.violetLo,
                      border:`0.5px solid ${p.featured ? T.goldB : T.violetB}`,
                      color: p.featured ? T.gold : T.violetHi,
                      fontFamily:T.mono,fontSize:9.5,letterSpacing:'0.10em',
                      textTransform:'uppercase',padding:'4px 10px',borderRadius:100,
                    }}>
                      {p.featured ? <Shield size={9}/> : <Sparkles size={9}/>}
                      {p.tag}
                    </span>
                  </div>
                )}

                <div style={{ fontFamily:T.display,fontSize:20,fontWeight:600,color:T.hi,marginBottom:4 }}>{p.name}</div>
                {/* CTC target */}
                <div style={{ display:'inline-flex',alignItems:'center',gap:4,marginBottom:10,
                  fontFamily:T.mono,fontSize:10,color:p.accent,
                }}>
                  <Target size={9}/>
                  Target CTC: {p.ctcTarget}
                </div>
                <div style={{ fontFamily:T.body,fontSize:12.5,color:T.muted,lineHeight:1.6,marginBottom:18 }}>{p.desc}</div>

                <div style={{ display:'flex',alignItems:'baseline',gap:8,marginBottom:4 }}>
                  <span style={{ fontFamily:T.display,fontSize:'clamp(26px,3vw,34px)',fontWeight:700,
                    color:T.hi,letterSpacing:'-0.025em',
                  }}>{p.price}</span>
                  <span
                    style={{
                      fontFamily:T.body,
                      fontSize:11,
                      color:T.muted,
                      fontWeight:500,
                      marginTop:4,
                    }}
                  >
                    +18% GST
                  </span>
                  <span style={{ fontFamily:T.mono,fontSize:13,color:T.muted }}>{p.usd}</span>
                </div>
                <div style={{ display:'flex',alignItems:'center',gap:6,marginBottom:24,
                  fontFamily:T.mono,fontSize:11,color:p.accent,
                }}>
                  <Check size={10}/>
                  0% EMI: {p.emi}
                </div>

                <div style={{ height:1,background:T.line,marginBottom:20 }}/>

                <div style={{ display:'flex',flexDirection:'column',gap:2,marginBottom:24 }}>
                  {p.features.map(f => (
                    <div key={f} style={{ display:'flex',gap:10,alignItems:'flex-start',padding:'4px 0' }}>
                      <div style={{ flexShrink:0,width:16,height:16,borderRadius:'50%',
                        background:`${p.accent}18`,border:`0.5px solid ${p.accent}40`,
                        display:'flex',alignItems:'center',justifyContent:'center',marginTop:1,
                      }}>
                        <Check size={9} color={p.accent}/>
                      </div>
                      <span style={{ fontFamily:T.body,fontSize:12.5,color:T.mid,lineHeight:1.55 }}>{f}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  onClick={() => handleGetStarted(p)}
                  whileHover={{ scale:1.02 }}
                  whileTap={{ scale:0.98 }}
                  style={{ width:'100%',padding:'13px 20px',borderRadius:12,cursor:'pointer',
                    fontFamily:T.display,fontSize:14,fontWeight:600,
                    background: p.featured
                      ? `linear-gradient(135deg,${T.gold},#F59E0B)`
                      : p.name === 'Accelerator'
                        ? `linear-gradient(135deg,${T.violet},#6D28D9)`
                        : T.glass,
                    color: (p.featured || p.name === 'Accelerator') ? '#fff' : T.mid,
                    border: (p.featured || p.name === 'Accelerator') ? 'none' : `0.5px solid ${T.line}`,
                    display:'flex',alignItems:'center',justifyContent:'center',gap:8,
                  }}
                >
                  {p.cta}<ArrowRight size={15}/>
                </motion.button>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Finance + Legal */}
        <FadeIn delay={0.25}>
          <div style={{ borderRadius:20,border:`0.5px solid ${T.mintB}`,
            background:`linear-gradient(135deg,${T.mintLo} 0%,rgba(255,255,255,0.02) 100%)`,
            padding:'clamp(20px,3vw,36px)',
          }}>
            <div className="clc-grid-2" style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'clamp(20px,3vw,32px)' }}>
              {/* EMI finance */}
              <div>
                <div style={{ display:'flex',alignItems:'center',gap:10,marginBottom:14 }}>
                  <div style={{ width:36,height:36,borderRadius:10,background:T.mintLo,
                    border:`0.5px solid ${T.mintB}`,display:'flex',alignItems:'center',justifyContent:'center',
                  }}>
                    <Building2 size={16} color={T.mint}/>
                  </div>
                  <div style={{ fontFamily:T.display,fontSize:16,fontWeight:600,color:T.hi }}>
                    0% Interest EMI Partners
                  </div>
                </div>
                <p
                  style={{
                    fontFamily:T.body,
                    fontSize:15,
                    lineHeight:1.8,
                    color:T.mid,
                    fontWeight:300,
                    maxWidth:600,
                    margin:'0 0 12px'
                  }}
                >
                  Start your AI career with structured mentorship,
                  real-world projects, blockchain credentials,
                  placement support, and flexible 0% EMI options.
                  Choose the path that matches your career ambition.
                </p>
                <div style={{ display:'flex',flexWrap:'wrap',gap:7 }}>
                  {FINANCE.map(f => (
                    <span key={f} style={{ fontFamily:T.mono,fontSize:10,padding:'4px 10px',
                      borderRadius:8,background:T.glass,border:`0.5px solid ${T.line}`,
                      color:T.muted,letterSpacing:'0.04em',
                    }}>{f}</span>
                  ))}
                </div>
              </div>

              {/* Legal guarantee */}
              <div>
                <div style={{ display:'flex',alignItems:'center',gap:10,marginBottom:14 }}>
                  <div style={{ width:36,height:36,borderRadius:10,background:T.goldLo,
                    border:`0.5px solid ${T.goldB}`,display:'flex',alignItems:'center',justifyContent:'center',
                  }}>
                    <Shield size={16} color={T.gold}/>
                  </div>
                  <div style={{ fontFamily:T.display,fontSize:16,fontWeight:600,color:T.hi }}>
                    Legal Job Agreement
                  </div>
                </div>
                {[
                  'Signed legal agreement with Career Lab Consulting',
                  'Fixed date of joining guaranteed in offer letter',
                  'Full fee refund if all conditions met and not placed',
                  'Eligibility: 90% attendance + 90% assessment score',
                  'Guarantee period: 6 months post-program completion',
                  'India + International remote roles covered',
                  'Backed by InternX-AI Placement Agreement (signed by Director)',
                ].map(t => <CheckRow key={t} text={t} color={T.gold}/>)}
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
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


/* ══════════════════════════════════════════════════════════════════════════════
   OUTCOMES  (testimonials + competitor comparison + benefits)
══════════════════════════════════════════════════════════════════════════════ */
// const TESTIMONIALS = [
//   {
//     quote:'Went from ₹6 LPA to ₹18 LPA in 8 months. The capstone project was what got me the interview at Freshworks. Real projects beat any certificate.',
//     name:'Arjun Sharma',
//     role:'AI Engineer, Freshworks',
//     loc:'Delhi',
//     init:'AS',
//     color:T.violet,
//   },
//   {
//     quote:"I'm from a commerce background — zero coding. After the No-Code track, I built an autonomous content agent and got hired as AI Developer at ₹14 LPA.",
//     name:'Priya Menon',
//     role:'No-Code AI Developer, Remote',
//     loc:'Bangalore',
//     init:'PM',
//     color:T.mint,
//   },
//   {
//     quote:'FreelanceX alone paid my EMIs. I earned ₹45,000 from 3 client projects while still enrolled. By the time I graduated, I had zero outstanding fee.',
//     name:'Rahul Gupta',
//     role:'Freelance AI Developer',
//     loc:'Mumbai',
//     init:'RG',
//     color:T.gold,
//   },
// ]

const TESTIMONIALS = [
  {
    name: 'Dharamjeet Singh',
    role: 'AI Engineer',
    loc: 'India',
    ctc: '₹18 LPA',
    linkedin: 'https://www.linkedin.com/in/dharamjeet-singh-4bb338222/',
    img: 'https://media.licdn.com/dms/image/v2/D4D03AQE7H9iK9_jDcg/profile-displayphoto-scale_400_400/B4DZvru6LdHEAk-/0/1769186504763?e=1781740800&v=beta&t=e7R2LR8qRE4rgbVJnbLeePaovhtUP5PtEojhLgsIh5o',
    quote: 'Career Lab Consulting helped me land my dream AI role with a 3× salary jump. The structured curriculum and real-world projects gave me exactly what the industry looks for.',
    color: T.violet,
    barWidth: '80%',
  },
  {
    name: 'Sumit Goswami',
    role: 'AI Developer',
    loc: 'India',
    ctc: '₹22 LPA',
    linkedin: 'https://www.linkedin.com/in/sumit-goswami-8741b730/',
    img: 'https://media.licdn.com/dms/image/v2/D5635AQGUP-X88VyuJQ/profile-framedphoto-shrink_400_400/B56Z2LnhHqHkAc-/0/1776163885854?e=1780732800&v=beta&t=gMB64tlGYWaOf0fb6suUXBCr9iOIBb6xlrV-tuuqlZc',
    quote: 'The mentorship and real-world projects gave me the confidence to negotiate a 2.5× hike. I went from a generic developer to a sought-after AI specialist in just months.',
    color: T.mint,
    barWidth: '85%',
  },
  {
    name: 'Naman Mamodia',
    role: 'AI Consultant',
    loc: 'India',
    ctc: '₹24 LPA',
    linkedin: 'https://www.linkedin.com/in/naman-mamodia-184910176/',
    img: 'https://media.licdn.com/dms/image/v2/D5603AQHGdTPGbHU7YA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1718491638099?e=1781740800&v=beta&t=0G4mxn5qbgr8adqidczHGa7s7lZ0Hq5EFHl3-L5FoWM',
    quote: 'The placement support and portfolio reviews were game-changing for my consulting career. Career Lab gave me the tools to walk into senior client conversations with full confidence.',
    color: T.gold,
    barWidth: '88%',
  },
  {
    name: 'Vivek Saxena',
    role: 'Senior AI Architect',
    loc: 'India',
    ctc: '₹35 LPA',
    linkedin: 'https://www.linkedin.com/in/vivek-saxena-52b89616/',
    img: 'https://media.licdn.com/dms/image/v2/D5603AQH4M7H64XRZiQ/profile-displayphoto-scale_400_400/B56Z2giEQzHQAg-/0/1776514783670?e=1781740800&v=beta&t=GzmeChoytYBZKmlDGbRY8QXJtGhZ0JDk2LIPJKrLQoI',
    quote: 'Enterprise projects gave me the depth to crack senior architect interviews at top product companies. The system design sessions here are unlike anything else in the market.',
    color: T.violet,
    barWidth: '92%',
  },
  {
    name: 'Sankati Avinash',
    role: 'ML Engineer',
    loc: 'India',
    ctc: '₹28 LPA',
    linkedin: 'https://www.linkedin.com/in/sankati-avinash-9727ba43/',
    img: 'https://media.licdn.com/dms/image/v2/D4D35AQHgBpr3MVe5pQ/profile-framedphoto-shrink_400_400/B4DZ26vYvPKQAg-/0/1776954477879?e=1780732800&v=beta&t=O7EpWQU3vv9o9WFyJzycZuQSFJ8b-d1e2IuCe9CCRkE',
    quote: 'The real-world project experience and structured mentorship at Career Lab made all the difference. I went from struggling to crack interviews to landing my dream ML role with confidence.',
    color: T.mint,
    barWidth: '90%',
  },
]

const CMP = [
  { feat:'Real Startup Projects',    clc:'Blockchain NFT + GitHub',  scaler:'Simulated',   spring:'Partial',    intern:'No',    forage:'No' },
  { feat:'Legal Job Guarantee',      clc:'Elite Plan (signed)',       scaler:'Conditional', spring:'Yes',        intern:'No',    forage:'No' },
  { feat:'HireX Exclusive Portal',   clc:'CLC Candidates Only',      scaler:'No',          spring:'No',         intern:'No',    forage:'No' },
  { feat:'FreelanceX Access',        clc:'EMI coverage included',    scaler:'No',          spring:'No',         intern:'No',    forage:'No' },
  { feat:'Weekly 1:1 Mentorship',    clc:'Elite Plan',               scaler:'Yes',         spring:'Yes',        intern:'No',    forage:'No' },
  { feat:'No-Cost EMI',              clc:'₹5K–₹10K/month',          scaler:'₹6.5L+',      spring:'₹6L+',       intern:'₹2–5K', forage:'₹5L+' },
  { feat:'International Placement',  clc:'Germany/UAE/SG',           scaler:'No',          spring:'No',         intern:'No',    forage:'No' },
  { feat:'Multi-Agent Architecture', clc:'Capstone project',         scaler:'Limited',     spring:'No',         intern:'No',    forage:'No' },
]

const PILL_GOOD = `linear-gradient(135deg,${T.mintLo},rgba(16,245,160,0.04))`
const PILL_BAD  = `rgba(244,63,94,0.08)`
const PILL_MID  = `rgba(240,165,0,0.08)`

interface CmpCellProps {
  val: string
  isClc?: boolean
}

function CmpCell({
  val,
  isClc = false,
}: CmpCellProps) {
  const isGood =
    val !== 'No' &&
    !val.includes('₹6') &&
    !val.includes('₹6L') &&
    !val.includes('Conditional') &&
    !val.includes('Simulated') &&
    !val.includes('Partial') &&
    !val.includes('Limited')

  return (
    <td
      style={{
        padding: '10px 12px',
        borderBottom: `0.5px solid ${T.line}`,
        textAlign: 'center',
      }}
    >
      <span
        style={{
          fontFamily: T.mono,
          fontSize: 10,
          letterSpacing: '0.03em',
          padding: '3px 8px',
          borderRadius: 100,
          background: isClc
            ? PILL_GOOD
            : isGood
            ? PILL_MID
            : PILL_BAD,
          color: isClc
            ? T.mint
            : isGood
            ? T.gold
            : T.rose,
          border: isClc
            ? `0.5px solid ${T.mintB}`
            : 'none',
        }}
      >
        {isClc && '✓ '}
        {val}
      </span>
    </td>
  )
}

export function Outcomes() {
  const CLONE_COUNT = TESTIMONIALS.length
  const TOTAL       = TESTIMONIALS.length

  const [carouselIdx, setCarouselIdx] = useState(CLONE_COUNT) // start in the middle clone
  const isResetting  = useRef(false)
  const dragStart    = useRef(0)
  const dragDelta    = useRef(0)
  const isDragging   = useRef(false)
  const trackRef     = useRef<HTMLDivElement>(null)

  // tripled array: [clone | real | clone]
  const tripled = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS]

  const advance = () => setCarouselIdx(i => i + 1)

  // auto-play
  useEffect(() => {
    const id = setInterval(advance, 3500)
    return () => clearInterval(id)
  }, [])

  // silent reset: when we reach the last clone, jump back to the matching real card instantly
  useEffect(() => {
    if (carouselIdx >= CLONE_COUNT + TOTAL) {
      // wait for spring to finish (~400ms), then silently teleport
      const id = setTimeout(() => {
        isResetting.current = true
        setCarouselIdx(CLONE_COUNT)
      }, 420)
      return () => clearTimeout(id)
    }
    if (carouselIdx < CLONE_COUNT) {
      const id = setTimeout(() => {
        isResetting.current = true
        setCarouselIdx(CLONE_COUNT + TOTAL - 1)
      }, 420)
      return () => clearTimeout(id)
    }
  }, [carouselIdx])

  // after silent reset, re-enable animation on next frame
  useEffect(() => {
    if (isResetting.current) {
      requestAnimationFrame(() => { isResetting.current = false })
    }
  }, [carouselIdx])

  const nudge = (dir: 1 | -1) => setCarouselIdx(i => i + dir)

  const handleDragEnd = () => {
    isDragging.current = false
    if      (dragDelta.current < -50) nudge(1)
    else if (dragDelta.current >  50) nudge(-1)
    dragDelta.current = 0
  }
  return (
    <section id="outcomes" style={{ position:'relative',background:T.ink,overflow:'hidden',padding:'clamp(64px,8vw,120px) 0' }}>
      <Noise/>
      <GridLines/>
      <Orb color={T.mint}   x="10%" y="25%" size={500} opacity={0.05}/>
      <Orb color={T.violet} x="90%" y="70%" size={500} opacity={0.06}/>

      <Container>
        

        <FadeIn>
          <SectionLabel>Success Stories & Real Results</SectionLabel>
          <Display>Real Graduates.<br/><Grad>Verified Outcomes.</Grad></Display>
          <Rule/>
        </FadeIn>

        {/* testimonials */}
        <FadeIn delay={0.12}>
          <div style={{ position: 'relative', marginBottom:48 }}>

            {/* Prev arrow */}
            <button
              onClick={() => nudge(-1)}
              aria-label="Previous"
              style={{
                position: 'absolute', top: '50%', left: -20,
                transform: 'translateY(-50%)', zIndex: 10,
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)', border: `1px solid ${T.line}`,
                color: T.hi, display: 'flex', alignItems: 'center',
                justifyContent: 'center', cursor: 'pointer',
              }}
            >
              <ChevronLeft size={16} />
            </button>

            {/* Next arrow */}
            <button
              onClick={() => nudge(1)}
              aria-label="Next"
              style={{
                position: 'absolute', top: '50%', right: -20,
                transform: 'translateY(-50%)', zIndex: 10,
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)', border: `1px solid ${T.line}`,
                color: T.hi, display: 'flex', alignItems: 'center',
                justifyContent: 'center', cursor: 'pointer',
              }}
            >
              <ChevronRight size={16} />
            </button>

            {/* Track */}
            <div
              style={{ overflow: 'hidden' }}
              onMouseDown={e  => { dragStart.current = e.clientX; isDragging.current = true }}
              onMouseMove={e  => { if (isDragging.current) dragDelta.current = e.clientX - dragStart.current }}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={e => { dragStart.current = e.touches[0].clientX; isDragging.current = true }}
              onTouchMove={e  => { if (isDragging.current) dragDelta.current = e.touches[0].clientX - dragStart.current }}
              onTouchEnd={handleDragEnd}
            >
              <motion.div
                ref={trackRef}
                animate={{ x: `calc(-${carouselIdx} * (100% / 3 + 6px))` }}
                transition={isResetting.current
                  ? { duration: 0 }                                    // instant teleport on reset
                  : { type: 'spring', stiffness: 300, damping: 36 }   // spring on normal slides
                }
                style={{ display: 'flex', gap: 18, userSelect: 'none', willChange: 'transform' }}
              >
                {tripled.map((t, i) => (
                  <motion.div
                    key={`${t.name}-${i}`}
                    whileHover={{ y: -6, transition: { duration: 0.25 } }}
                    style={{
                      flex: '0 0 calc((100% - 36px) / 3)',
                      position: 'relative', overflow: 'hidden', borderRadius: 22,
                      padding: 24,
                      background: 'linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.02))',
                      border: `1px solid ${t.color}38`,
                    }}
                  >
                    {/* Top accent line */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                      background: `linear-gradient(90deg,transparent,${t.color},transparent)` }} />

                    {/* Glow */}
                    <div style={{ position: 'absolute', top: -50, right: -50, width: 140, height: 140,
                      borderRadius: '50%', background: `${t.color}10`, filter: 'blur(30px)', pointerEvents: 'none' }} />

                    {/* Profile */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                      <div style={{ position: 'relative', flexShrink: 0 }}>
                        <img src={t.img} alt={t.name}
                          style={{ width: 54, height: 54, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${t.color}` }} />
                        <div style={{ position: 'absolute', right: -2, bottom: -2, width: 18, height: 18,
                          borderRadius: '50%', background: T.ink, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <BadgeCheck size={12} color={T.mint} />
                        </div>
                      </div>
                      <div>
                        <div style={{ fontFamily: T.display, fontSize: 14, fontWeight: 600, color: T.hi }}>{t.name}</div>
                        <div style={{ fontFamily: T.body, fontSize: 11, color: T.muted }}>{t.role}</div>
                        <div style={{ fontFamily: T.body, fontSize: 11, color: T.muted }}>{t.loc}</div>
                      </div>
                    </div>

                    {/* CTC Badge */}
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6,
                      background: T.mintLo, border: `1px solid ${T.mintB}`, color: T.mint,
                      borderRadius: 999, padding: '5px 12px', fontFamily: T.mono, fontSize: 11, fontWeight: 600, marginBottom: 14 }}>
                      <TrendingUp size={12} />{t.ctc}
                    </div>

                    {/* Stars */}
                    <div style={{ display: 'flex', gap: 3, marginBottom: 12 }}>
                      {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={12} fill={T.gold} color={T.gold} />)}
                    </div>

                    {/* Quote */}
                    <p style={{ fontFamily: T.body, fontSize: 12.5, color: T.mid, lineHeight: 1.75,
                      margin: '0 0 16px', fontStyle: 'italic' }}>"{t.quote}"</p>

                    {/* Growth Bar */}
                    <div style={{ marginBottom: 18 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5,
                        fontFamily: T.mono, fontSize: 9, letterSpacing: '0.05em' }}>
                        <span style={{ color: T.muted }}>BEFORE</span>
                        <span style={{ color: T.mint }}>AFTER</span>
                      </div>
                      <div style={{ height: 7, borderRadius: 999, overflow: 'hidden', background: 'rgba(255,255,255,0.06)' }}>
                        <div style={{ width: t.barWidth ?? '88%', height: '100%', borderRadius: 999,
                          background: `linear-gradient(90deg,${t.color},${T.mint})` }} />
                      </div>
                    </div>

                    {/* Footer */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      borderTop: `1px solid ${T.line}`, paddingTop: 12 }}>
                      <Tag scheme="mint"><BadgeCheck size={10} /> Verified Graduate</Tag>
                      <a href={t.linkedin} target="_blank" rel="noopener noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 5,
                          background: 'rgba(0,119,181,0.12)', border: '1px solid rgba(0,119,181,0.3)',
                          color: '#60a8e0', borderRadius: 999, padding: '5px 11px',
                          fontFamily: T.mono, fontSize: 10, fontWeight: 600, textDecoration: 'none' }}>
                        <Linkedin size={12} /> LinkedIn
                      </a>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </FadeIn>

        {/* competitor table */}
        <FadeIn delay={0.2}>
          <div style={{ background:T.glass,border:`0.5px solid ${T.line}`,borderRadius:20,
            padding:'clamp(20px,3vw,32px)',marginBottom:48,overflowX:'auto',
          }}>
            <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:22,flexWrap:'wrap' }}>
              <span style={{ fontFamily:T.display,fontSize:18,fontWeight:600,color:T.hi }}>
                InternX–AI vs Competitors
              </span>
              <Tag scheme="violet">Objective Comparison</Tag>
            </div>
            <table style={{ width:'100%',minWidth:640,borderCollapse:'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding:'10px 12px',textAlign:'left',fontFamily:T.mono,fontSize:10,
                    color:T.muted,letterSpacing:'0.10em',textTransform:'uppercase',fontWeight:500,
                    borderBottom:`0.5px solid ${T.line}`,
                  }}>Feature</th>
                  {['InternX–AI','Scaler','Springboard','Internshala','Forage'].map((h,i) => (
                    <th key={h} style={{ padding:'10px 12px',fontFamily:T.mono,fontSize:10,
                      color: i === 0 ? T.mint : T.muted,
                      letterSpacing:'0.10em',textTransform:'uppercase',fontWeight:500,
                      borderBottom:`0.5px solid ${T.line}`,textAlign:'center',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CMP.map(row => (
                  <tr key={row.feat}>
                    <td style={{ padding:'10px 12px',fontFamily:T.body,fontSize:12.5,color:T.mid,
                      borderBottom:`0.5px solid ${T.line}`,fontWeight:500,
                    }}>{row.feat}</td>
                    <CmpCell val={row.clc} isClc/>
                    <CmpCell val={row.scaler}/>
                    <CmpCell val={row.spring}/>
                    <CmpCell val={row.intern}/>
                    <CmpCell val={row.forage}/>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>

        {/* benefit cards */}
        <FadeIn delay={0.28}>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:12 }}>
            {[
              { icon:<BadgeCheck size={20} color={T.mint}/>,  title:'Lifetime Access',     desc:'HireX & FreelanceX never expire. Get placed, upskill, placed again — forever.', color:T.mint },
              { icon:<Lock size={20} color={T.violet}/>,      title:'Verified Credentials', desc:'GitHub commits + LinkedIn + Verified Career Portfolio — 100% tamper-proof proof-of-work.', color:T.violet },
              { icon:<Globe size={20} color={T.cyan}/>,       title:'Global Reach',         desc:'India, Germany, UAE, Singapore, Kenya — permanent AI roles placed globally.', color:T.cyan },
              { icon:<Users size={20} color={T.gold}/>,       title:'Alumni Network',        desc:'27-country WhatsApp community, peer learning, and a hiring alumni referral loop.', color:T.gold },
            ].map((c,i) => (
              <motion.div
                key={c.title}
                initial={{ opacity:0,y:16 }}
                whileInView={{ opacity:1,y:0 }}
                viewport={{ once:true }}
                transition={{ delay:i*0.08,duration:0.5 }}
                whileHover={{ y:-3,borderColor:`${c.color}40` }}
                style={{
  position:'relative',
  overflow:'hidden',
  borderRadius:22,
  padding:'24px',
  background:
    'linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))',
  border:`1px solid ${T.line}`,
  backdropFilter:'blur(20px)',
}}
              >
                <div style={{ position:'absolute',bottom:-16,right:-16,width:80,height:80,
                  background:`radial-gradient(${c.color}30,transparent 70%)`,pointerEvents:'none',
                }}/>
                <div style={{ width:44,height:44,borderRadius:12,
                  background:`${c.color}14`,border:`0.5px solid ${c.color}30`,
                  display:'flex',alignItems:'center',justifyContent:'center',
                  margin:'0 auto 14px',
                }}>{c.icon}</div>
                <div style={{ fontFamily:T.display,fontSize:14,fontWeight:600,color:T.hi,marginBottom:8 }}>{c.title}</div>
                <div style={{ fontFamily:T.body,fontSize:12.5,color:T.muted,lineHeight:1.65 }}>{c.desc}</div>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════════════════
   CTA  (final call to action + thank you)
══════════════════════════════════════════════════════════════════════════════ */
export function CTA() {
  const ref = useRef(null)

  return (
    <section id="cta" ref={ref} style={{ position:'relative',background:T.void,overflow:'hidden',
      padding:'clamp(80px,10vw,140px) 0',
    }}>
      <Noise/>
      <div style={{ position:'absolute',inset:0,zIndex:0,
        backgroundImage:`
          radial-gradient(ellipse 80% 50% at 50% 0%,${T.violetLo} 0%,transparent 60%),
          radial-gradient(ellipse 60% 40% at 20% 100%,${T.mintLo} 0%,transparent 60%),
          radial-gradient(ellipse 50% 40% at 80% 100%,${T.goldLo} 0%,transparent 60%)
        `,
        pointerEvents:'none',
      }}/>
      <div style={{ position:'absolute',inset:0,pointerEvents:'none',zIndex:0,
        backgroundImage:`linear-gradient(${T.line} 1px,transparent 1px),linear-gradient(90deg,${T.line} 1px,transparent 1px)`,
        backgroundSize:'48px 48px',opacity:0.6,
      }}/>
      <div style={{ position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',
        fontFamily:T.display,fontSize:'clamp(80px,16vw,240px)',fontWeight:700,
        color:'rgba(255,255,255,0.012)',letterSpacing:'-0.04em',whiteSpace:'nowrap',
        userSelect:'none',pointerEvents:'none',zIndex:0,
      }}>INTERNX</div>

      <Container>
        <div style={{ position:'relative',zIndex:2,textAlign:'center' }}>
          <FadeIn>


            {/* headline */}
            <h2 style={{ fontFamily:T.display,fontSize:'clamp(36px,5vw,72px)',fontWeight:700,
              lineHeight:1.04,letterSpacing:'-0.03em',color:T.hi,margin:'0 0 24px',
            }}>
              One Decision.<br/>
              <Grad>Your Entire Career Changes.</Grad>
            </h2>

            <p style={{ fontFamily:T.body,fontSize:'clamp(14px,1.6vw,17px)',lineHeight:1.75,
              color:T.mid,fontWeight:300,maxWidth:560,margin:'0 auto 40px',
            }}>
              15,000+ learners from 27 countries have already started their AI journey with CLC.
              The AI job market rewards early movers — join before the next batch fills up.
            </p>

            {/* CTA buttons */}
            <div className="clc-stack" style={{ display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap',marginBottom:48 }}>
              <motion.button
                whileHover={{ scale:1.04,boxShadow:`0 0 40px ${T.violet}50` }}
                whileTap={{ scale:0.97 }}
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior:'smooth' })}
                style={{ display:'flex',alignItems:'center',gap:10,cursor:'pointer',
                  background:`linear-gradient(135deg,${T.violet},#6D28D9)`,
                  border:'none',borderRadius:14,padding:'16px 36px',
                  fontFamily:T.display,fontSize:16,fontWeight:600,color:'#fff',
                }}
              >
                <Rocket size={16}/>
                Enrol Now — Secure Your Spot
                <ArrowRight size={16}/>
              </motion.button>

              <motion.a
                href="https://wa.me/918700236923?text=Hi%20CareerLab%20Team%2C%20I%20would%20like%20to%20book%20a%20free%20career%20consultation%20call.%20Please%20share%20the%20next%20steps."
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: T.glass,
                  border: `0.5px solid ${T.line}`,
                  borderRadius: 14,
                  padding: '16px 28px',
                  fontFamily: T.display,
                  fontSize: 15,
                  fontWeight: 500,
                  color: T.mid,
                  textDecoration: 'none',
                  letterSpacing: '-0.01em'
                }}
              >
                Book Free Career Call <ChevronRight size={14} />
              </motion.a>
            </div>

            {/* trust badges */}
            <div style={{ display:'flex',justifyContent:'center',flexWrap:'wrap',gap:'clamp(16px,3vw,36px)' }}>
              {[
                { icon:<Lock size={13} color={T.mint}/>,      text:'100% Money Back',      sub:'if not placed' },
                { icon:<Shield size={13} color={T.gold}/>,    text:'Legal Agreement',      sub:'signed by Director' },
                { icon:<Zap size={13} color={T.violet}/>,     text:'Start in 48 Hours',    sub:'instant onboarding' },
                { icon:<Globe size={13} color={T.cyan}/>,     text:'100% Remote',          sub:'India + 26 countries' },
                { icon:<BadgeCheck size={13} color={T.mint}/>,text:'Lifetime Access',      sub:'HireX + FreelanceX' },
              ].map(b => (
                <div key={b.text} style={{ display:'flex',alignItems:'center',gap:8 }}>
                  <div style={{ width:28,height:28,borderRadius:8,background:T.glass,
                    border:`0.5px solid ${T.line}`,display:'flex',alignItems:'center',justifyContent:'center',
                  }}>{b.icon}</div>
                  <div>
                    <div style={{ fontFamily:T.body,fontSize:12.5,fontWeight:500,color:T.mid }}>{b.text}</div>
                    <div style={{ fontFamily:T.mono,fontSize:9,color:T.muted,letterSpacing:'0.06em' }}>{b.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}

// ─── data ──────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'Who is this program for — tech or non-tech?',
    a: 'Both. We have a dedicated No-Code AI track for non-tech learners (commerce, arts, BBA, MBA) and a full engineering track for developers. Priya Menon joined from a commerce background with zero coding and landed ₹14 LPA as an AI Developer.',
    color: T.mint,
  },
  {
    q: 'What exactly is the "Legal Job Guarantee"?',
    a: 'Elite plan enrollees sign a placement agreement with Career Lab Consulting (CIN U80903HR2019PTC084310). If you complete 90%+ attendance, 90%+ assessment score, and are not placed within 6 months post-completion, you receive a 100% fee refund. A fixed date of joining is written into your offer letter.',
    color: T.violet,
  },
  {
    q: 'Can I really earn while still enrolled?',
    a: 'Yes — FreelanceX is exclusive to CLC candidates. AI chatbot projects pay ₹5,000–₹15,000, research agents ₹10,000–₹30,000, and enterprise RAG systems ₹50,000–₹2,00,000. Many students cover their full EMI through freelance earnings before graduation.',
    color: T.gold,
  },
  {
    q: 'What are the batch timings and format?',
    a: 'Live sessions run 8:00–10:00 PM IST, Monday to Saturday. The format is live theory + hands-on implementation — not pre-recorded. Sessions are recorded and available on the LMS for lifetime replay. Weekend batches (Sat & Sun 11 AM IST) are also available.',
    color: T.mint,
  },
  {
    q: 'What is ResumeNFT and why does it matter?',
    a: 'ResumeNFT is a blockchain-minted credential linked to your GitHub portfolio and LinkedIn. It\'s tamper-proof and permanently visible to global recruiters. Unlike a PDF certificate, it cannot be faked — each commit, project, and milestone is on-chain and timestamped.',
    color: T.violet,
  },
  {
    q: 'I have a career gap of several years. Am I eligible?',
    a: 'Absolutely. Career gaps of 1–10 years are welcome. We rebuild your profile from scratch — ATS-optimised résumé, GitHub portfolio with real commits, ResumeNFT credential, and a LinkedIn rewrite. Recruiters on HireX evaluate your proof-of-work, not your gap.',
    color: T.gold,
  },
  {
    q: 'What is HireX and how is it different from LinkedIn job boards?',
    a: 'HireX is an exclusive portal accessible only to CLC graduates. 120+ global remote-first companies actively source from it. Shortlisting is AI-matched based on your real project output and ResumeNFT — not keyword spam. You get lifetime access, so you can return to it any time you want a new role.',
    color: T.mint,
  },
  {
    q: 'Is international placement actually possible from India?',
    a: 'Yes. We have placed graduates in Germany, UAE, Singapore, and Kenya in permanent AI roles. International roles typically range ₹30–50+ LPA equivalent. The Elite plan explicitly covers international placement and is part of the signed job agreement.',
    color: T.violet,
  },
  {
    q: 'What EMI options are available and what is the interest rate?',
    a: 'EMI starts at ₹7,500/month for Accelerator (₹75,000 total) and ₹10,000/month for Elite (₹1,00,000 total). All EMI plans are 0% interest via ICICI, HDFC, Axis, Bajaj Finance, IDFC First, Kotak, SBI, and Yes Bank. Approval takes minutes.',
    color: T.gold,
  },
  {
    q: 'What certifications will I receive?',
    a: 'You receive an industry certificate from Career Lab Consulting (ISO 27001 certified, MSME and Skill India registered), ResumeNFT blockchain credential, GitHub portfolio with verified commits, and a LinkedIn AI-optimised profile. Elite plan graduates also receive 3 ResumeNFTs across milestone stages.',
    color: T.mint,
  },
  {
    q: 'How does 1:1 mentorship work?',
    a: 'Elite plan students get weekly 1:1 sessions with a senior AI engineer — not group office hours. Accelerator plan includes monthly 1:1 mentorship. AigenX Coach (your AI mentor) tracks daily progress, answers doubts 24×7, and adapts pacing to your schedule between sessions.',
    color: T.violet,
  },
  {
    q: 'Is Career Lab Consulting a legitimate company?',
    a: 'Yes. CIN No. U80903HR2019PTC084310, ISO 27001 certified, MSME registered, Skill India registered, headquartered at DLF Cyber City, Gurugram, operating since 2019 across 27 countries. You can verify the CIN on the MCA portal. All placement agreements are signed by the Director.',
    color: T.gold,
  },
]

// ─── component ─────────────────────────────────────────────────────────────────
export function FAQs() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section
      id="faqs"
      style={{ position: 'relative', background: T.ink, overflow: 'hidden', padding: 'clamp(64px,8vw,120px) 0' }}
    >
      <Noise/>
      <GridLines/>
      <Orb color={T.mint}   x="5%"  y="30%" size={440} opacity={0.04}/>
      <Orb color={T.violet} x="95%" y="60%" size={440} opacity={0.05}/>

      <Container>
        {/* Header */}
        <FadeIn>
          <SectionLabel>Frequently Asked Questions</SectionLabel>
          <Display>
            Everything You<br/>
            <Grad>Need to Know.</Grad>
          </Display>
          <Rule/>
        </FadeIn>

        {/* Accordion */}
        <FadeIn delay={0.1}>
          <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.45 }}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 16,
                  background: 'linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))',
                  border: `1px solid ${open === i ? faq.color + '55' : faq.color + '25'}`,
                  transition: 'border-color 0.25s ease',
                }}
              >
                {/* top accent — only when open */}
                {open === i && (
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                    background: `linear-gradient(90deg,transparent,${faq.color},transparent)`,
                  }}/>
                )}

                {/* Question row */}
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', gap: 16,
                    padding: '20px 24px', background: 'none', border: 'none',
                    cursor: 'pointer', textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    {/* number badge */}
                    <div style={{
                      flexShrink: 0, width: 28, height: 28, borderRadius: 8,
                      background: open === i ? `${faq.color}20` : 'rgba(255,255,255,0.05)',
                      border: `1px solid ${open === i ? faq.color + '40' : 'rgba(255,255,255,0.08)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: T.mono, fontSize: 11, fontWeight: 600,
                      color: open === i ? faq.color : T.muted,
                      transition: 'all 0.25s ease',
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <span style={{
                      fontFamily: T.display, fontSize: 15, fontWeight: 600,
                      color: open === i ? T.hi : T.mid,
                      transition: 'color 0.25s ease',
                    }}>
                      {faq.q}
                    </span>
                  </div>

                  <motion.div
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.22 }}
                    style={{ flexShrink: 0, color: open === i ? faq.color : T.muted }}
                  >
                    <Plus size={18}/>
                  </motion.div>
                </button>

                {/* Answer — animated height */}
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{
                        padding: '0 24px 22px 66px',
                        fontFamily: T.body, fontSize: 13.5, color: T.mid, lineHeight: 1.8,
                      }}>
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Bottom CTA */}
        <FadeIn delay={0.2}>
          <div style={{
            marginTop: 56, textAlign: 'center',
            padding: '36px 32px', borderRadius: 20,
            background: 'linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))',
            border: `1px solid ${T.line}`,
          }}>
            <div style={{ fontFamily: T.display, fontSize: 26, fontWeight: 700, color: T.hi, marginBottom: 8 }}>
              Still have questions?
            </div>
            <div style={{ fontFamily: T.body, fontSize: 13.5, color: T.mid, marginBottom: 22 }}>
              Our team responds within 30 minutes on WhatsApp.
            </div>
            <a
              href="https://wa.me/918700236923?text=Hi%20CareerLab%20Team%2C%20I%20have%20a%20question%20about%20InternX-AI."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: T.mintLo, border: `1px solid ${T.mintB}`,
                color: T.mint, borderRadius: 999, padding: '10px 24px',
                fontFamily: T.mono, fontSize: 12, fontWeight: 600, textDecoration: 'none',
              }}
            >
              <MessageCircle size={14}/> Ask on WhatsApp
            </a>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}

export function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '50px 0 40px',
        borderTop: `1px solid ${T.line}`,
        background: `
          radial-gradient(circle at 15% 20%, rgba(139,92,246,0.14), transparent 35%),
          radial-gradient(circle at 85% 0%, rgba(16,185,129,0.12), transparent 40%),
          radial-gradient(circle at 50% 100%, rgba(6,182,212,0.08), transparent 45%),
          
        `,
      }}
    >
      <Orb color={T.violet} x="15%" y="20%" size={500} opacity={0.12}/>
      <Orb color={T.mint} x="85%" y="0%" size={450} opacity={0.08}/>

      <Container>

        {/* FOOTER GRID */}
        <div
          style={{
            display:'grid',
            gridTemplateColumns:'2.3fr 1fr 1fr',
            gap:40,
            marginBottom:50,
          }}
        >
          {/* BRAND */}
          <div>
            <img
              src="/logo.png"
              alt="Career Lab Consulting"
              style={{
                width:220,
                marginBottom:24,
              }}
            />

            <p
              style={{
                color:T.mid,
                fontSize:14,
                lineHeight:1.9,
                maxWidth:500,
                marginBottom:22,
              }}
            >
              Career Lab Consulting is an ISO 27001 Certified
              multinational organization helping students,
              professionals and enterprises adopt Artificial
              Intelligence through training, hiring,
              freelancing and enterprise transformation.
            </p>

            <div
              style={{
                display:'flex',
                gap:10,
                flexWrap:'wrap',
              }}
            >
              <Tag scheme="mint">ISO 27001</Tag>
              <Tag scheme="cyan">Global MNC</Tag>
              <Tag scheme="violet">AI Education</Tag>
              <Tag scheme="gold">Enterprise AI</Tag>
            </div>
          </div>

          {/* CONTACT HUB */}
          <div>
            <div
              style={{
                fontFamily:T.display,
                fontSize:18,
                fontWeight:600,
                color:T.hi,
                marginBottom:18,
              }}
            >
              Contact Hub
            </div>

            <div
              style={{
                display:'flex',
                flexDirection:'column',
                gap:16,
              }}
            >
              <div>
                <div style={{color:T.mint,fontSize:11}}>EMAIL</div>
                <div style={{color:T.mid,fontSize:14}}>
                  info@careerlabconsulting.com
                </div>
              </div>

              <div>
                <div style={{color:T.mint,fontSize:11}}>PHONE</div>
                <div style={{color:T.mid,fontSize:14}}>
                  +91 8700236923
                </div>
              </div>

              <div>
                <div style={{color:T.mint,fontSize:11}}>WEBSITE</div>
                <div style={{color:T.mid,fontSize:14}}>
                  careerlabconsulting.com
                </div>
              </div>
            </div>
          </div>

          {/* GLOBAL PRESENCE */}
          <div>
            <div
              style={{
                fontFamily:T.display,
                fontSize:18,
                fontWeight:600,
                color:T.hi,
                marginBottom:18,
              }}
            >
              Global Presence
            </div>

            <div
              style={{
                display:'grid',
                gap:14,
              }}
            >
              {[
                '🇮🇳 India',
                '🇺🇸 USA',
                '🇬🇧 United Kingdom',
                '🇸🇬 Singapore',
                '🇦🇪 UAE',
                '🇩🇪 Germany'
              ].map(c => (
                <div
                  key={c}
                  style={{
                    color:T.mid,
                    fontSize:13,
                  }}
                >
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>



        {/* BOTTOM BAR */}
        <div
          style={{
            borderTop:`1px solid ${T.line}`,
            paddingTop:24,
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
            flexWrap:'wrap',
            gap:16,
          }}
        >
          <div
            style={{
              color:T.muted,
              fontSize:12,
            }}
          >
            © 2026 Career Lab Consulting Pvt. Ltd. All Rights Reserved.
          </div>

          <div
            style={{
              display:'flex',
              gap:10,
              flexWrap:'wrap',
            }}
          >
            <Tag scheme="mint">
              ✓ ISO 27001 Certified
            </Tag>

            <Tag scheme="cyan">
              Enterprise Systems Operational
            </Tag>
          </div>
        </div>

      </Container>
    </footer>
  )
}