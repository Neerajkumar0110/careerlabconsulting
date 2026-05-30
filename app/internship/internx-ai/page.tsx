'use client'

import { Fragment, useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight, Check, Star, Shield, Globe, Zap, TrendingUp, Users, Award, BookOpen, Target, Briefcase, ChevronRight, ExternalLink, Clock, IndianRupee, FileCheck, Layers, Fullscreen } from 'lucide-react'
import Hero from '@/components/Hero'
import {StatBar, About, Program, TechStack} from '@/components/SAPT'
import Ecosystem from '@/components/Ecosystem'
import { Hiring, Pricing, WhyChooseUs, Outcomes, CTA, FAQs, Footer } from '@/components/HPOC'
// import { WhyChooseUs } from '@/components/WhyChooseUs'
import { useRouter } from 'next/navigation'


const NAV_ITEMS = [
  { label: 'About', id: 'about' },
  { label: 'Program', id: 'program' },
  { label: 'Tech Stack', id: 'techstack' },
  { label: 'Hiring', id: 'hiring' },
  { label: 'Pricing', id: 'pricing' },
  { label: 'Outcomes', id: 'outcomes' },
]


function Nav({ activeSection }: { activeSection: string }) {
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  const scrollTo = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <img src="/logo.png" alt="Career Lab Consulting" className="nav-logo w-32" onClick={() => window.location.href = '/internship'}/>
        <div className={`nav-links ${open ? 'open' : ''}`}>
          {NAV_ITEMS.map(n => (
            <button key={n.id} className={`nav-link ${activeSection === n.id ? 'active' : ''}`} onClick={() => scrollTo(n.id)}>{n.label}</button>
          ))}
          {/* <button className="btn-primary nav-cta" onClick={() => scrollTo('pricing')} style={{fontSize:'13px',padding:'9px 20px'}}>
            Enroll Now <ArrowRight size={14}/>
          </button> */}
          <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
<button
  className="btn-secondary"
  onClick={async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen()
      }

      router.push('/internx-presentation')
    } catch (err) {
      console.error('Fullscreen failed:', err)
      router.push('/internx-presentation')
    }
  }}
  style={{
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    whiteSpace: 'nowrap',

    fontSize: '13px',
    padding: '9px 18px',
  }}
>
  <span>Presentation</span>
  <Fullscreen size={12}/>
</button>
            <button
                className="btn-primary nav-cta"
                onClick={() => scrollTo('pricing')}
                style={{
                fontSize:'13px',
                padding:'9px 20px'
                }}
            >
                Enroll Now
                <ArrowRight size={14}/>
            </button>
            </div>
        </div>
        <button className="nav-mobile-btn" onClick={() => setOpen(o => !o)}>
          {open ? <X size={22}/> : <Menu size={22}/>}
        </button>
      </div>
    </nav>
  )
}

export default function App() {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id)
        })
      },
      { threshold: 0.3 }
    )

    NAV_ITEMS.forEach((n) => {
      const el = document.getElementById(n.id)
      if (el) obs.observe(el)
    })

    return () => obs.disconnect()
  }, [])

  return (
    <>
      <style jsx global>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          background: #020617;
          color: #f0f6ff;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }

        .container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .noise {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }

        /* NAVBAR */

        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .nav.scrolled {
          background: rgba(2, 6, 23, 0.92);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(99, 179, 237, 0.12);
        }

        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          max-width: 1240px;
          margin: 0 auto;
        }

        .nav-logo {
          cursor: pointer;
          height: 36px;
          width: auto;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-link {
          color: #94a3b8;
          font-size: 13px;
          font-weight: 500;
          padding: 8px 14px;
          border-radius: 999px;
          cursor: pointer;
          border: none;
          background: transparent;
          transition: all 0.2s ease;
        }

        .nav-link:hover {
          color: white;
          background: rgba(255, 255, 255, 0.05);
        }

        .nav-link.active {
          color: #a78bfa;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #7c3aed;
          color: white;
          border: none;
          border-radius: 999px;
          cursor: pointer;
          font-weight: 700;
          transition: all 0.2s ease;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          background: #6d28d9;
        }

        .nav-mobile-btn {
          display: none;
          border: none;
          background: transparent;
          color: white;
          cursor: pointer;
        }

        /* FOOTER */

        .footer {
          background: #060f24;
          border-top: 1px solid rgba(99, 179, 237, 0.12);
          padding: 60px 0 36px;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 40px;
          margin-bottom: 48px;
        }

        .footer-col-title {
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #94a3b8;
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-links a {
          color: #64748b;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer-links a:hover {
          color: white;
        }

        .footer-bottom {
          border-top: 1px solid rgba(99, 179, 237, 0.12);
          padding-top: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .iso-badge {
          background: #0d1f3c;
          border: 1px solid rgba(99, 179, 237, 0.12);
          border-radius: 8px;
          padding: 6px 12px;
          font-size: 12px;
          color: #10b981;
        }

        @media (max-width: 820px) {
          .nav-links {
            display: none;
          }

          .nav-links.open {
            display: flex;
            flex-direction: column;
            position: fixed;
            top: 72px;
            left: 0;
            right: 0;
            background: rgba(2, 6, 23, 0.98);
            padding: 20px;
            border-bottom: 1px solid rgba(99, 179, 237, 0.12);
          }

          .nav-mobile-btn {
            display: block;
          }

          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 500px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="noise" />

      <Nav activeSection={activeSection} />

      <main>
        <Hero />
        <StatBar />
        <About />
        <Ecosystem />
        <Program />
        <TechStack />
        <Hiring />
        <Pricing />
        <WhyChooseUs />
        <Outcomes />

        <CTA />
        <FAQs />
      </main>

      <Footer />
    </>
  )
}