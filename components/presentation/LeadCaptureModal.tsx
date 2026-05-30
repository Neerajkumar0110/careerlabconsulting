'use client'

/**
 * LeadCaptureModal.tsx
 * Shown on first entry to the presentation.
 * Collects: name, email, WhatsApp, profession.
 * Displays the CLC logo.
 */

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Mail, Phone, Briefcase, ArrowRight, Sparkles, House, LockKeyholeIcon } from 'lucide-react'

const profiles = [
  'Fresher',
  'Software Developer',
  'Frontend / Backend Developer',
  'Data Analyst',
  'Data Scientist',
  'AI / ML Professional',
  'QA / Test Engineer',
  'Business Analyst',
  'Marketing Professional',
  'Sales Professional',
  'HR Professional',
  'Operations Professional',
  'Finance Professional',
  'Teacher / Educator',
  'Freelancer',
  'Entrepreneur',
  'Non-Tech Professional',
  'Other',
]

export interface LeadData {
  name: string
  email: string
  whatsapp: string
  profession: string
}

interface Props {
  onSubmit: (data: LeadData) => void
}

const T = {
  void:     '#03040A',
  lift:     '#0C1120',
  glass:    'rgba(255,255,255,0.030)',
  line:     'rgba(255,255,255,0.06)',
  violet:   '#7C3AED',
  violetLo: 'rgba(124,58,237,0.12)',
  violetB:  'rgba(124,58,237,0.35)',
  violetHi: '#A78BFA',
  mint:     '#10F5A0',
  mintLo:   'rgba(16,245,160,0.08)',
  hi:       '#ECEEF8',
  mid:      '#A9AFCA',
  muted:    '#5E6580',
  display:  "'Clash Display','Syne',sans-serif",
  body:     "'DM Sans','Plus Jakarta Sans',sans-serif",
  mono:     "'DM Mono','JetBrains Mono',monospace",
}

export default function LeadCaptureModal({ onSubmit }: Props) {
  const [name, setName]         = useState('')
  const [city, setCity]         = useState('')
  const [email, setEmail]       = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [profession, setProfession] = useState('')
  const [errors, setErrors]     = useState<Record<string, string>>({})
  const [loading, setLoading]   = useState(false)
  const [visible, setVisible]   = useState(false)

  useEffect(() => {
    // slight delay so modal fades in after page mounts
    const t = setTimeout(() => setVisible(true), 180)
    return () => clearTimeout(t)
  }, [])

  const validate = () => {
    const e: Record<string, string> = {}
    if (!name.trim())       e.name      = 'Please enter your name'
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) e.email = 'Valid email required'
    if (!whatsapp.trim() || !/^\+?[\d\s\-]{7,15}$/.test(whatsapp)) e.whatsapp = 'Valid WhatsApp number required'
    if (!profession)        e.profession = 'Please select your profession'
    return e
  }

  const handleSubmit = () => {
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length > 0) return
    setLoading(true)
    setTimeout(() => {
      onSubmit({ name: name.trim(), email: email.trim(), whatsapp: whatsapp.trim(), profession })
    }, 600)
  }

  const inputStyle = (field: string): React.CSSProperties => ({
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: `1px solid ${errors[field] ? 'rgba(239,68,68,0.5)' : T.line}`,
    borderRadius: 12,
    padding: '11px 14px 11px 40px',
    color: T.hi,
    fontFamily: T.body,
    fontSize: 13,
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  })

  const selectStyle: React.CSSProperties = {
    width: '100%',
    background: '#0C1020',
    border: `1px solid ${errors.profession ? 'rgba(239,68,68,0.5)' : T.line}`,
    borderRadius: 12,
    padding: '11px 14px 11px 40px',
    color: profession ? T.hi : T.muted,
    fontFamily: T.body,
    fontSize: 13,
    outline: 'none',
    appearance: 'none',
    cursor: 'pointer',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: T.mono,
    fontSize: 10,
    color: T.muted,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: 6,
    display: 'block',
  }

  const errorStyle: React.CSSProperties = {
    fontFamily: T.body,
    fontSize: 10,
    color: '#F87171',
    marginTop: 4,
  }

  const iconWrap: React.CSSProperties = {
    position: 'absolute',
    left: 13,
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9000,
              background: 'rgba(2,4,14,0.82)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
            }}
          />

          {/* ── Modal card ── */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9001,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px 16px',
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: 460,
                background: 'linear-gradient(160deg,#0D1225 0%,#080E1A 100%)',
                border: `1px solid ${T.violetB}`,
                borderRadius: 24,
                overflow: 'hidden',
                boxShadow: `0 0 0 1px rgba(124,58,237,0.08), 0 40px 100px rgba(0,0,0,0.7), 0 0 80px rgba(124,58,237,0.12)`,
              }}
            >
              {/* Top accent bar */}
              <div style={{ height: 3, background: 'linear-gradient(90deg,#7C3AED,#A855F7,#10F5A0)' }} />

              <div style={{ padding: '28px 32px 32px' }}>
                {/* Logo */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                  <img
                    src="/logo.png"
                    alt="Career Lab Consulting"
                    style={{ height: 36, width: 'auto' }}
                  />
                </div>

                {/* Badge */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    background: T.violetLo,
                    border: `0.5px solid ${T.violetB}`,
                    borderRadius: 999,
                    padding: '4px 14px',
                    fontFamily: T.mono,
                    fontSize: 9,
                    color: T.violetHi,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}>
                    <Sparkles size={9} />
                    Personalised AI Presentation
                  </span>
                </div>

                {/* Heading */}
                <h2 style={{
                  fontFamily: T.display,
                  fontSize: 26,
                  fontWeight: 700,
                  color: T.hi,
                  textAlign: 'center',
                  margin: '0 0 6px',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                }}>
                  Let's Personalise
                  <br />
                  <span style={{
                    backgroundImage: 'linear-gradient(135deg,#7C3AED,#A855F7 50%,#10F5A0)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    Your Experience
                  </span>
                </h2>

                <p style={{
                  fontFamily: T.body,
                  fontSize: 12,
                  color: T.muted,
                  textAlign: 'center',
                  margin: '0 0 24px',
                  lineHeight: 1.6,
                }}>
                  Quick intro so we can tailor this session just for you.
                  <br />We'll also send the full deck to your email after.
                </p>

                {/* ── Fields ── */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

                  {/* Name */}
                  <div>
                    <label style={labelStyle}>Your Name</label>
                    <div style={{ position: 'relative' }}>
                      <span style={iconWrap}><User size={14} color={T.muted} /></span>
                      <input
                        type="text"
                        placeholder="e.g. Priya Sharma"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                        style={inputStyle('name')}
                      />
                    </div>
                    {errors.name && <div style={errorStyle}>{errors.name}</div>}
                  </div>

                  {/* Email */}
                  <div>
                    <label style={labelStyle}>Email Address</label>
                    <div style={{ position: 'relative' }}>
                      <span style={iconWrap}><Mail size={14} color={T.muted} /></span>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                        style={inputStyle('email')}
                      />
                    </div>
                    {errors.email && <div style={errorStyle}>{errors.email}</div>}
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label style={labelStyle}>WhatsApp Number</label>
                    <div style={{ position: 'relative' }}>
                      <span style={iconWrap}><Phone size={14} color={T.muted} /></span>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                        style={inputStyle('whatsapp')}
                      />
                    </div>
                    {errors.whatsapp && <div style={errorStyle}>{errors.whatsapp}</div>}
                  </div>

                  {/* City */}
                  <div>
                    <label style={labelStyle}>Your City</label>
                    <div style={{ position: 'relative' }}>
                      <span style={iconWrap}><House size={14} color={T.muted} /></span>
                      <input
                        type="text"
                        placeholder="e.g. Noida, Jaipur, etc"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                        style={inputStyle('city')}
                      />
                    </div>
                    {errors.city && <div style={errorStyle}>{errors.city}</div>}
                  </div>

                  {/* Profession */}
                  <div>
                    <label style={labelStyle}>Current Profession</label>
                    <div style={{ position: 'relative' }}>
                      <span style={iconWrap}><Briefcase size={14} color={T.muted} /></span>
                      <select
                        value={profession}
                        onChange={e => setProfession(e.target.value)}
                        style={selectStyle}
                      >
                        <option value="" disabled>Select your profile…</option>
                        {profiles.map(p => (
                          <option key={p} value={p} style={{ background: '#0D1225', color: T.hi }}>
                            {p}
                          </option>
                        ))}
                      </select>
                      {/* chevron */}
                      <span style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%)', pointerEvents:'none', color:T.muted }}>
                        ▾
                      </span>
                    </div>
                    {errors.profession && <div style={errorStyle}>{errors.profession}</div>}
                  </div>

                  {/* Submit */}
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: `0 0 36px ${T.violet}55` }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSubmit}
                    disabled={loading}
                    style={{
                      marginTop: 4,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 10,
                      width: '100%',
                      padding: '14px 24px',
                      background: loading
                        ? 'rgba(124,58,237,0.4)'
                        : 'linear-gradient(135deg,#7C3AED,#6D28D9)',
                      border: 'none',
                      borderRadius: 14,
                      color: '#fff',
                      fontFamily: T.display,
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: loading ? 'not-allowed' : 'pointer',
                      boxShadow: `0 10px 32px ${T.violet}30`,
                      transition: 'background 0.2s',
                    }}
                  >
                    {loading ? (
                      <>
                        <span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor:'#fff', borderRadius:'50%', display:'inline-block', animation:'spin 0.7s linear infinite' }} />
                        Personalising…
                      </>
                    ) : (
                      <>
                        Start My Presentation
                        <ArrowRight size={15} />
                      </>
                    )}
                  </motion.button>

                </div>

                {/* Footer note */}
                <p
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    fontFamily: T.mono,
                    fontSize: 9,
                    color: T.muted,
                    textAlign: 'center',
                    marginTop: 16,
                    letterSpacing: '0.05em',
                  }}
                >
                  <LockKeyholeIcon size={11} />
                  <span>Your info is private &amp; used only to personalise this session</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* keyframe for spinner */}
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </>
      )}
    </AnimatePresence>
  )
}