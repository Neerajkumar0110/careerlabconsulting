import React from 'react'
import { ArrowRight, Shield, Sparkles, Lock, Building2, Check, Target } from 'lucide-react'
import { T, FONT_DISPLAY, FONT_BODY, FONT_MONO } from './tokens'
import { Slide, Glow, G, Eyebrow, Badge, CheckRow, Divider } from './primitives_old'
import type { SlideProps } from './primitives'

export function Slide06({ user }: SlideProps) {
  const plans = [
    {
      name: 'Essential',
      price: '₹50,000',
      emi: '₹5,000/mo',
      usd: '~$600',
      accent: T.t2, bg: T.white04, rim: T.border,
      btnBg: T.raised, btnColor: T.t2, btnBorder: T.border,
      isHighlight: false, isElite: false,
      tag: null, ctcTarget: '₹10–12 LPA',
      features: ['6-Month Program','1 Real AI Project','GitHub Portfolio','Verified Career Portfolio','Group Mentorship','HireX View Access','FreelanceX Access','AigenX AI Coach'],
    },
    {
      name: 'Accelerator',
      price: '₹75,000',
      emi: '₹7,500/mo',
      usd: '~$900',
      accent: T.violetHi, bg: T.violetBg, rim: T.violetRim,
      btnBg: T.violet, btnColor: '#fff', btnBorder: 'transparent',
      isHighlight: true, isElite: false,
      tag: 'Most Popular', ctcTarget: '₹15–20 LPA',
      features: ['6-Month + Extensions','2 Real AI Projects','Hosted GitHub Portfolio','Verified Career Portfolio','Monthly 1:1 Mentorship','HireX Entry Listings','AI Mock Interview','FreelanceX — EMI coverage'],
    },
    {
      name: 'Elite',
      price: '₹1,00,000',
      emi: '₹10,000/mo',
      usd: '~$1,200',
      accent: T.amberHi, bg: T.amberBg, rim: T.amberRim,
      btnBg: T.amber, btnColor: '#fff', btnBorder: 'transparent',
      isHighlight: false, isElite: true,
      tag: 'Job Guaranteed', ctcTarget: '₹30–50+ LPA',
      features: ['Full 12-Month Program','3 Projects + Capstone','Premium GitHub Showcase','Verified Career Portfolio + CTC Ladder','Weekly 1:1 Expert Mentoring','HireX Priority Shortlisting','Legal Job Agreement (signed)','Fixed Date of Joining','International Placement'],
    },
  ]

  const profile = user.profile?.toLowerCase() || ''
  const suggested = profile.includes('student') || profile.includes('fresher') ? 'Essential'
    : profile.includes('senior') || profile.includes('manager') || profile.includes('entrepreneur') ? 'Elite'
    : 'Accelerator'

  // ROI calculator SVG
  const RoiViz = ({ plan }: { plan: typeof plans[0] }) => {
    const ctcMax = plan.name === 'Elite' ? 50 : plan.name === 'Accelerator' ? 20 : 12
    const inv = plan.name === 'Elite' ? 10 : plan.name === 'Accelerator' ? 7.5 : 5
    const barH = Math.round((ctcMax / 50) * 40)
    return (
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 48, padding: '0 4px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <div style={{ width: 20, background: T.roseBg, border: `1px solid ${T.roseRim}`, height: 18, borderRadius: '3px 3px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: FONT_MONO, fontSize: '0.38rem', color: T.rose }}>{inv}k</span>
          </div>
          <div style={{ fontFamily: FONT_MONO, fontSize: '0.38rem', color: T.t4, textAlign: 'center' }}>Cost</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', paddingBottom: 12 }}>
          <svg width="14" height="10" viewBox="0 0 14 10"><path d="M0 5h10M7 1l4 4-4 4" stroke={plan.accent} strokeWidth="1.2" fill="none" strokeLinecap="round" /></svg>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <div style={{ width: 20, background: `${plan.accent}20`, border: `1px solid ${plan.accent}40`, height: barH, borderRadius: '3px 3px 0 0', animation: 'barGrow 1s ease both', transformOrigin: 'bottom' }} />
          <div style={{ fontFamily: FONT_MONO, fontSize: '0.38rem', color: plan.accent, textAlign: 'center' }}>CTC</div>
        </div>
      </div>
    )
  }

  return (
    <Slide bg={T.surface}>
      <Glow x="78%" y="28%" color={T.amber} size={450} opacity={0.07} />
      <Glow x="10%" y="72%" color={T.violet} size={400} opacity={0.06} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 'clamp(14px,2.5vw,32px) clamp(20px,4vw,56px)', gap: 'clamp(8px,1.4vh,14px)' }}>

        <div className="r1" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <div>
            <Eyebrow>Investment &amp; Plans</Eyebrow>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(1.1rem,2.6vw,2.2rem)', fontWeight: 700, letterSpacing: '-0.025em', color: T.t1, lineHeight: 1.05 }}>
              Zero-Risk Investment. <G>Lifetime Returns.</G>
            </h2>
          </div>
          {user.name && (
            <Badge color={T.emeraldHi} bg={T.emeraldBg} rim={T.emeraldRim}>
              <Sparkles size={8} />&nbsp;Recommended for {user.name.split(' ')[0]}: {suggested}
            </Badge>
          )}
        </div>

        <div className="r2" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, flex: 1, minHeight: 0 }}>
          {plans.map((plan) => {
            const isSuggested = plan.name === suggested
            return (
              <div key={plan.name} style={{
                background: plan.isElite
                  ? `linear-gradient(160deg, ${T.amberBg} 0%, ${T.raised} 100%)`
                  : T.raised,
                border: `1.5px solid ${plan.isElite ? T.amberRim : plan.isHighlight ? T.violetRim : isSuggested ? T.emeraldRim : T.border}`,
                borderRadius: 12, padding: 'clamp(12px,2vw,18px) clamp(10px,1.6vw,16px)',
                display: 'flex', flexDirection: 'column', gap: 8,
                position: 'relative', overflow: 'hidden',
                boxShadow: plan.isElite ? `0 0 40px ${T.amber}12` : plan.isHighlight ? `0 0 30px ${T.violet}10` : 'none',
              }}>

                {plan.isElite && <div style={{ position: 'absolute', top: -30, right: -30, width: 100, height: 100, background: `radial-gradient(${T.amberHi}30, transparent 70%)`, pointerEvents: 'none' }} />}
                {isSuggested && !plan.isHighlight && !plan.isElite && (
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${T.emerald}, ${T.emeraldHi})` }} />
                )}

                {plan.tag && (
                  <Badge color={plan.isElite ? T.amberHi : T.violetHi} bg={plan.isElite ? T.amberBg : T.violetBg} rim={plan.isElite ? T.amberRim : T.violetRim}>
                    {plan.isElite ? <Shield size={8} /> : <Sparkles size={8} />}&nbsp;{plan.tag}
                  </Badge>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(0.8rem,1.5vw,0.95rem)', fontWeight: 700, color: T.t1, marginBottom: 3 }}>{plan.name}</div>
                    <div style={{ fontFamily: FONT_MONO, fontSize: 'clamp(0.42rem,0.68vw,0.52rem)', color: plan.accent, display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Target size={8} /> {plan.ctcTarget}
                    </div>
                  </div>
                  <RoiViz plan={plan} />
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: 7 }}>
                  <span style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(1rem,2.2vw,1.6rem)', fontWeight: 700, color: T.t1 }}>{plan.price}</span>
                  <span style={{ fontFamily: FONT_MONO, fontSize: 'clamp(0.42rem,0.68vw,0.52rem)', color: T.t3 }}>{plan.usd}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: FONT_MONO, fontSize: 'clamp(0.44rem,0.72vw,0.56rem)', color: T.emeraldHi }}>
                  <Check size={8} strokeWidth={2.5} /> 0% EMI: {plan.emi}
                </div>

                <Divider />

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1, overflowY: 'auto' }}>
                  {plan.features.map(f => <CheckRow key={f} text={f} color={plan.accent} />)}
                </div>

                <button style={{
                  width: '100%', padding: 'clamp(8px,1.4vh,11px)', borderRadius: 9,
                  background: plan.isElite
                    ? `linear-gradient(135deg, ${T.amber}, #B45309)`
                    : plan.isHighlight
                      ? `linear-gradient(135deg, ${T.violet}, #5B21B6)`
                      : T.surface,
                  color: (plan.isElite || plan.isHighlight) ? '#fff' : T.t2,
                  border: (plan.isElite || plan.isHighlight) ? 'none' : `1px solid ${T.border}`,
                  fontFamily: FONT_DISPLAY, fontSize: 'clamp(0.55rem,0.95vw,0.7rem)', fontWeight: 600,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  transition: 'opacity 0.2s, transform 0.15s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'scale(1.02)' }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)' }}
                >
                  {plan.isElite ? 'Claim Job Guarantee' : plan.isHighlight ? 'Enrol Now' : 'Get Started'}
                  <ArrowRight size={12} />
                </button>
              </div>
            )
          })}
        </div>

        <div className="r3" style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
          <Badge color={T.emeraldHi} bg={T.emeraldBg} rim={T.emeraldRim}><Check size={8} />&nbsp;0% Interest EMI</Badge>
          <Badge color={T.amberHi} bg={T.amberBg} rim={T.amberRim}><Shield size={8} />&nbsp;Full Refund If Not Placed</Badge>
          <Badge color={T.violetHi} bg={T.violetBg} rim={T.violetRim}><Lock size={8} />&nbsp;Lifetime HireX + FreelanceX</Badge>
          <Badge color={T.t2} bg={T.white04} rim={T.border}><Building2 size={8} />&nbsp;ICICI · HDFC · Axis · Bajaj Finance</Badge>
        </div>
      </div>
    </Slide>
  )
}