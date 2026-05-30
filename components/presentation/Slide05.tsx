import React from 'react'
import { Zap, TrendingUp, Shield, Check } from 'lucide-react'
import { T, FONT_DISPLAY, FONT_BODY, FONT_MONO } from './tokens'
import { Slide, Glow, G, Eyebrow, Badge, CheckRow } from './primitives_old'
import type { SlideProps } from './primitives'

export function Slide05({ user }: SlideProps) {
  const steps = [
    { n: '01', title: 'Complete Program',  desc: '100% curriculum + projects at 90%+ score', color: T.violetHi },
    { n: '02', title: 'Get Certified',     desc: 'Industry cert + Verified Career Portfolio',      color: '#A78BFA' },
    { n: '03', title: 'Profile Built',     desc: 'GitHub + LinkedIn AI-optimised',             color: '#8B5CF6' },
    { n: '04', title: 'Access HireX',      desc: '120+ global remote-first AI companies',      color: T.cyan },
    { n: '05', title: 'Interview Prep',    desc: 'AI mock interviews + AigenX coaching',       color: T.emeraldHi },
    { n: '06', title: 'Legal Offer',       desc: 'Fixed date of joining, legally guaranteed',  color: T.amberHi },
  ]

  const partners = ['OpenAI','Anthropic','Google','Microsoft','AWS','Docker','HubSpot','Zapier','Salesforce','Freshworks']
  const partnerLogos: Record<string, string> = {
    'OpenAI':     'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/OpenAI_logo_2025_%28symbol%29.svg/120px-OpenAI_logo_2025_%28symbol%29.svg.png',
    'Anthropic':  'https://cdn.simpleicons.org/anthropic',
    'Google':     'https://cdn.simpleicons.org/google',
    'Microsoft':  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/3840px-Microsoft_logo.svg.png',
    'AWS':        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/960px-Amazon_Web_Services_Logo.svg.png',
    'Docker':     'https://cdn.simpleicons.org/docker',
    'HubSpot':    'https://cdn.simpleicons.org/hubspot',
    'Zapier':     'https://cdn.simpleicons.org/zapier',
    'Salesforce': 'https://cdn.simpleicons.org/salesforce',
    'Freshworks': 'https://cdn.simpleicons.org/freshworks',
  }

  // Funnel SVG infographic
  const FunnelSVG = () => (
    <svg viewBox="0 0 200 120" width="100%" height="clamp(60px,9vh,90px)" style={{ display: 'block' }}>
      {[
        { y: 5,  w: 190, h: 22, color: T.violetBg, rim: T.violetRim, label: '15,000+ Applicants', fontSize: 7 },
        { y: 32, w: 140, h: 22, color: T.violetBg, rim: T.violetHi,  label: '5,000 Enrolled',     fontSize: 7 },
        { y: 59, w: 95,  h: 22, color: T.emeraldBg, rim: T.emeraldRim, label: '3,200 Completed',   fontSize: 7 },
        { y: 86, w: 55,  h: 24, color: T.amberBg, rim: T.amberRim,   label: '2,816 Hired (88%)', fontSize: 7 },
      ].map((f, i) => (
        <g key={i}>
          <rect x={(200 - f.w) / 2} y={f.y} width={f.w} height={f.h} rx="3" fill={f.color} stroke={f.rim} strokeWidth="0.7" />
          <text x="100" y={f.y + f.h / 2 + 3} textAnchor="middle" fill={i === 3 ? T.amberHi : T.t2} fontSize={f.fontSize} fontFamily="'DM Mono',monospace">{f.label}</text>
        </g>
      ))}
    </svg>
  )

  return (
    <Slide bg={T.base}>
      <Glow x="88%" y="22%" color={T.violet} size={450} opacity={0.07} />
      <Glow x="5%"  y="78%" color={T.emerald} size={350} opacity={0.05} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 'clamp(14px,2.5vw,32px) clamp(20px,4vw,56px)', gap: 'clamp(8px,1.4vh,14px)' }}>

        <div className="r1" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <div>
            <Eyebrow>Hiring Partners &amp; Job Roadmap</Eyebrow>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(1.1rem,2.6vw,2.2rem)', fontWeight: 700, letterSpacing: '-0.025em', color: T.t1, lineHeight: 1.05 }}>
              Your Path to <G>Getting Hired.</G>
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 7 }}>
            <Badge color={T.amberHi} bg={T.amberBg} rim={T.amberRim}><TrendingUp size={8} />&nbsp;88% Job Conversion</Badge>
            <Badge color={T.violetHi} bg={T.violetBg} rim={T.violetRim}><Shield size={8} />&nbsp;Legal Agreement</Badge>
          </div>
        </div>

        {/* Roadmap — 6 steps horizontal */}
        <div className="r2" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
          {steps.map((step, i) => (
            <div key={i} style={{ position: 'relative', textAlign: 'center', padding: '0 4px' }}>
              {i < steps.length - 1 && (
                <div style={{
                  position: 'absolute', top: 'clamp(16px,3.2vw,22px)', left: '50%', right: '-50%',
                  height: 1, background: `linear-gradient(90deg, ${step.color}50, transparent)`, zIndex: 0,
                }} />
              )}
              <div style={{
                width: 'clamp(34px,5vw,44px)', height: 'clamp(34px,5vw,44px)', borderRadius: '50%',
                background: `${step.color}12`, border: `1.5px solid ${step.color}45`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto clamp(6px,1.2vh,10px)', position: 'relative', zIndex: 1,
                boxShadow: `0 0 16px ${step.color}18`,
              }}>
                <span style={{ fontFamily: FONT_MONO, fontSize: 'clamp(0.5rem,0.9vw,0.65rem)', fontWeight: 600, color: step.color }}>{step.n}</span>
              </div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(0.55rem,0.9vw,0.68rem)', fontWeight: 600, color: T.t1, marginBottom: 3, lineHeight: 1.2 }}>{step.title}</div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 'clamp(0.44rem,0.72vw,0.58rem)', color: T.t3, lineHeight: 1.4 }}>{step.desc}</div>
            </div>
          ))}
        </div>

        {/* Three column: HireX | Funnel Viz | FreelanceX */}
        <div className="r3" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 10, flex: 1, minHeight: 0 }}>
          {/* HireX */}
          <div style={{
            background: `linear-gradient(140deg, ${T.violetBg} 0%, ${T.surface} 100%)`,
            border: `1px solid ${T.violetRim}`, borderRadius: 10, padding: 'clamp(10px,1.8vw,16px)',
            display: 'flex', flexDirection: 'column', gap: 7,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: T.violetBg, border: `1px solid ${T.violetRim}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Zap size={13} color={T.violetHi} />
              </div>
              <div>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(0.65rem,1.1vw,0.8rem)', fontWeight: 600, color: T.t1 }}>HireX Portal</div>
                <Badge color={T.violetHi} bg={T.violetBg} rim={T.violetRim}>Exclusive · CLC Only</Badge>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['Legal job guarantee + signed agreement','Fixed date of joining in offer letter','India + International remote roles','Permanent AI roles: Germany, UAE, SG','88% job offer conversion rate','Lifetime access — never expires'].map(f => <CheckRow key={f} text={f} color={T.violetHi} />)}
            </div>
          </div>

          {/* Funnel visualization */}
          <div style={{
            background: T.surface, border: `1px solid ${T.border}`, borderRadius: 10,
            padding: 'clamp(10px,1.8vw,16px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 8, width: 'clamp(130px,18vw,200px)', flexShrink: 0,
          }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 'clamp(0.4rem,0.65vw,0.52rem)', color: T.t3, textTransform: 'uppercase', letterSpacing: '0.10em', marginBottom: 4 }}>Conversion Funnel</div>
            <FunnelSVG />
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(1rem,2vw,1.5rem)', fontWeight: 700, color: T.amberHi }}>88%</div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 'clamp(0.4rem,0.65vw,0.52rem)', color: T.t3, textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'center' }}>Offer Conversion Rate</div>
          </div>

          {/* FreelanceX */}
          <div style={{
            background: `linear-gradient(140deg, ${T.cyanBg} 0%, ${T.surface} 100%)`,
            border: `1px solid ${T.cyanRim}`, borderRadius: 10, padding: 'clamp(10px,1.8vw,16px)',
            display: 'flex', flexDirection: 'column', gap: 7,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: T.cyanBg, border: `1px solid ${T.cyanRim}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <TrendingUp size={13} color={T.cyan} />
              </div>
              <div>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(0.65rem,1.1vw,0.8rem)', fontWeight: 600, color: T.t1 }}>FreelanceX Portal</div>
                <Badge color={T.cyan} bg={T.cyanBg} rim={T.cyanRim}>Exclusive · CLC Only</Badge>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['Freelance earnings cover monthly EMIs','AI chatbots: ₹5,000–₹15,000 / project','Research agents: ₹10,000–₹30,000','Enterprise RAG: ₹50,000–₹2,00,000','Multi-agent workflow projects available','Lifetime access to FreelanceX platform'].map(f => <CheckRow key={f} text={f} color={T.cyan} />)}
            </div>
          </div>
        </div>

        {/* Partner logos */}
        <div className="r4" style={{ display: 'flex', gap: 7, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontFamily: FONT_MONO, fontSize: 'clamp(0.4rem,0.65vw,0.52rem)', color: T.t3, letterSpacing: '0.10em', textTransform: 'uppercase', flexShrink: 0 }}>120+ Partners incl.:</span>
          {partners.map(p => (
            <div key={p} style={{ background: 'rgba(255,255,255,0.88)', borderRadius: 6, padding: 'clamp(3px,0.5vw,5px) clamp(6px,1vw,10px)', display: 'flex', alignItems: 'center', gap: 4 }}>
              <img src={partnerLogos[p]} alt={p} style={{ width: 12, height: 12, objectFit: 'contain' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
              <span style={{ fontFamily: FONT_BODY, fontSize: 'clamp(0.4rem,0.62vw,0.5rem)', color: '#111', fontWeight: 500 }}>{p}</span>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  )
}