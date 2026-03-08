'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Building2, GraduationCap, Users, BarChart3, Calendar,
  ArrowRight, Play, Shield, Globe, Zap, BookOpen,
  CheckCircle2, Database, Layers, Settings, Bell
} from 'lucide-react';
import Navbar from "@/components/product/Navbar";
const Footer = dynamic(() => import("@/components/product/Footer"));
import PricingSection from '@/components/product/B2BPricingSection';
import CTAModal from '@/components/product/CTAModel';
import dynamic from 'next/dynamic';
import WhatsAppButton from '@/components/product/WhatsAppButton';

function Counter({ to, suffix = '', duration = 5000 }: { to: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0; const step = to / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(timer); } else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, to, duration]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const MODULES = [
  { icon: BookOpen, label: 'LMS', desc: 'Immersive AI learning', color: '#4f46e5' },
  { icon: Database, label: 'ERP', desc: 'Finance & operations', color: '#0891b2' },
  { icon: Users, label: 'CRM', desc: 'Admissions & alumni', color: '#059669' },
  { icon: Bell, label: 'Communication', desc: 'Omnichannel AI', color: '#d97706' },
  { icon: BarChart3, label: 'Analytics', desc: 'Institutional insights', color: '#7c3aed' },
  { icon: Settings, label: 'Admin OS', desc: 'Staff & operations', color: '#dc2626' },
];

const FEATURES = [
  {
    icon: Layers,
    title: "Unified Institutional ERP",
    desc: "Manage fees, payroll, procurement, and budgets through a single AI-powered financial command center. Automated reconciliation, GST compliance, and real-time P&L dashboards built specifically for educational institutions.",
    accent: "#4f46e5"
  },
  {
    icon: Users,
    title: "AI-Powered Admissions CRM",
    desc: "From application submission to enrollment, EduX automates every admissions touchpoint. Lead scoring for prospective students, personalized follow-up sequences, counselor dashboards, and conversion analytics all in one place.",
    accent: "#0891b2"
  },
  {
    icon: BookOpen,
    title: "Integrated LMS & Attendance",
    desc: "Full-featured AI learning management with AR/VR course delivery, automated attendance tracking via facial recognition, timetable management, and exam scheduling — seamlessly connected to academic records.",
    accent: "#059669"
  },
  {
    icon: Globe,
    title: "Omnichannel Communication Hub",
    desc: "Connect with students, parents, and faculty via WhatsApp, email, SMS, and push notifications from a unified AI communication center. Automated fee reminders, event alerts, and personalized academic updates.",
    accent: "#d97706"
  },
  {
    icon: BarChart3,
    title: "Institutional Analytics",
    desc: "Real-time dashboards for leadership covering enrollment trends, academic performance, financial health, and operational efficiency. Predictive models flag at-risk students and forecast enrollment 12 months ahead.",
    accent: "#7c3aed"
  },
  {
    icon: Shield,
    title: "Compliance & Accreditation",
    desc: "Automated report generation for NAAC, UGC, AICTE, and other regulatory bodies. Document management, audit trails, and policy compliance monitoring ensure your institution is always accreditation-ready.",
    accent: "#dc2626"
  }
];

const STATS = [
  { value: 800, suffix: '+', label: 'Institutions', sub: 'Schools, colleges & universities' },
  { value: 3.2, suffix: 'M+', label: 'Students', sub: 'Active on EduX platform' },
  { value: 68, suffix: '%', label: 'Ops Cost Reduction', sub: 'vs. fragmented tools' },
  { value: 99.8, suffix: '%', label: 'Uptime SLA', sub: 'Always-on for institutions' },
];

export default function EduXPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="bg-[#020617] min-h-screen font-sans overflow-x-hidden">
        <Navbar/>
      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 pb-12 px-5 sm:px-8 lg:px-12">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
          <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.6) 0%, transparent 70%)', filter: 'blur(80px)' }} />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, rgba(8,145,178,0.5) 0%, transparent 70%)', filter: 'blur(80px)' }} />
          <div className="absolute inset-0 opacity-[0.02]"
            style={{ backgroundImage: 'radial-gradient(rgba(165,180,252,1) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 my-6 md:my-4">
                <Building2 size={11} className="text-indigo-400" />
                <span className="text-indigo-400 text-[9px] font-black uppercase tracking-[0.3em]">Institutional AI Operating System</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="text-5xl sm:text-6xl xl:text-[8rem] font-black text-white leading-none tracking-wide mb-4">
                Edu
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-blue-400">X</span>
              </motion.h1>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
                className="text-xl md:text-3xl font-black uppercase tracking-tight mb-6">
                <span className="text-slate-400">One Platform.</span>{' '}<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r italic from-indigo-400 to-blue-400">Every Department.</span>
              </motion.div>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="text-slate-400 text-base md:text-lg leading-relaxed max-w-lg mb-10">
                EduX is the complete AI-powered operating system for educational institutions. It unifies ERP, CRM, LMS, and communications into one seamlessly integrated platform — built specifically for schools, colleges, and universities.
              </motion.p>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => setModalOpen(true)}
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all shadow-xl shadow-indigo-900/30">
                  Get EduX Demo <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href={`https://wa.me/919810984968?text=${encodeURIComponent(
                    "Hello! I'm interested in CRM-X and would like to Tour Platform."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-white/5 hover:bg-green-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all border border-white/10 hover:border-[#25D366]"
                >
                  {/* Original WhatsApp Logo */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                  </svg>

                  WhatsApp Demo
                </a>
              </motion.div>
            </div>

            {/* Right — Module Grid */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
              <div className="bg-[#0B1121] border border-white/10 rounded-3xl p-6 shadow-[0_0_60px_rgba(79,70,229,0.12)]">
                <p className="text-white font-black text-xs uppercase tracking-widest mb-5">Platform Modules</p>
                <div className="grid grid-cols-3 gap-3">
                  {MODULES.map((mod, i) => (
                    <motion.div key={mod.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + i * 0.08 }}
                      className="group flex flex-col items-center gap-2 p-4 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-opacity-50 transition-all cursor-pointer"
                      style={{ '--accent': mod.color } as React.CSSProperties}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = mod.color + '50')}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center border"
                        style={{ backgroundColor: mod.color + '15', borderColor: mod.color + '30' }}>
                        <mod.icon size={18} style={{ color: mod.color }} />
                      </div>
                      <p className="text-white font-black text-[11px] uppercase tracking-wider">{mod.label}</p>
                      <p className="text-slate-500 text-[10px] text-center leading-tight group-hover:text-slate-400 transition-colors">{mod.desc}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-5 p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-2xl">
                  <p className="text-indigo-400 text-[9px] font-black uppercase tracking-widest mb-1">All modules integrated</p>
                  <p className="text-slate-400 text-xs">Single sign-on · Shared data layer · Unified dashboard</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────────────── */}
      <section className="py-20 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center">
                <div className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white mb-2 tabular-nums">
                  <Counter to={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                <p className="text-slate-600 text-[10px]">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 px-5 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-[9px] font-black tracking-[0.3em] uppercase mb-6">
              <GraduationCap size={11} /> Platform Capabilities
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
              Everything an Institution<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400 italic">Could Ever Need</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
            {FEATURES.map((feat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group p-7 rounded-3xl bg-white/[0.02] border border-white/8 hover:border-indigo-500/30 transition-all duration-500 hover:-translate-y-2">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5 border"
                  style={{ backgroundColor: feat.accent + '15', borderColor: feat.accent + '40' }}>
                  <feat.icon size={20} style={{ color: feat.accent }} />
                </div>
                <h2 className="text-white font-black text-base mb-3 tracking-tight">{feat.title}</h2>
                <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-400 transition-colors">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 px-5 sm:px-8 lg:px-12 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-[9px] font-black tracking-[0.3em] uppercase mb-8">
                EduX Deployment
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-6">
                From fragmented tools<br />
                <span className="text-transparent bg-clip-text italic bg-gradient-to-r from-indigo-400 to-blue-400">to one unified OS.</span>
              </h2>
              <p className="text-slate-400 text-base leading-relaxed mb-6">
                Most institutions run 8–15 disconnected software tools — one for fees, one for attendance, one for admissions, one for communications. EduX replaces all of them with a single unified platform.
              </p>
              <p className="text-slate-400 text-base leading-relaxed mb-6">
                During onboarding, our implementation team migrates all historical data, configures workflows to match your institution's processes, and trains staff in under 2 weeks. The transition is seamless — no data loss, no downtime.
              </p>
              <p className="text-slate-400 text-base leading-relaxed">
                The result: administrative staff saves 30+ hours per week. Leadership gets real-time visibility across all departments. And students experience a seamless, modern digital campus.
              </p>
              <WhatsAppButton
                message="Hi, I'm interested in EduX and would like to explore it."
                buttonText="Book EduX Demo"
                gradientFrom="from-indigo-500"
                gradientTo="to-blue-500"
                hoverFrom="hover:from-indigo-400"
                hoverTo="hover:to-blue-400"
                shadowColor="shadow-[0_0_40px_rgba(79,70,229,0.3)]"
                hoverShadowColor="hover:shadow-[0_0_60px_rgba(79,70,229,0.5)]"
              />
            </div>
            <div className="space-y-4">
              {[
                { step: '01', title: 'Discovery & Data Migration', desc: 'Our team audits your existing tools and migrates all institutional data to the EduX platform securely.', color: '#4f46e5' },
                { step: '02', title: 'Workflow Configuration', desc: "EduX is configured to match your institution's admission process, fee structure, and academic calendar.", color: '#0891b2' },
                { step: '03', title: 'Staff Training & Go-Live', desc: 'Role-based training for admissions, finance, academic, and IT teams. Go-live in under 14 days.', color: '#059669' },
                { step: '04', title: 'AI Automation Activation', desc: 'Communication automations, lead scoring, attendance tracking, and analytics dashboards all go live simultaneously.', color: '#d97706' },
                { step: '05', title: 'Continuous Optimization', desc: 'Dedicated success manager reviews performance monthly and continuously optimizes processes for your institution.', color: '#7c3aed' },
              ].map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex gap-5 p-5 rounded-2xl bg-white/[0.02] border border-white/8 hover:border-white/15 transition-all group">
                  <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-[14px] font-black"
                    style={{ backgroundColor: step.color + '20', color: step.color, border: `1px solid ${step.color}40` }}>
                    {step.step}
                  </div>
                  <div>
                    <h4 className="text-white font-black text-sm mb-1">{step.title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PricingSection />

      <section className="py-24 px-5 sm:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative p-12 md:p-20 rounded-[2.5rem] bg-gradient-to-br from-indigo-600/10 via-blue-700/10 to-blue-900/10 border border-indigo-500/20 text-center overflow-hidden">
            <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] rounded-full opacity-20"
              style={{ background: 'radial-gradient(circle, #4f46e5 0%, transparent 70%)', filter: 'blur(60px)' }} />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
                Transform Your<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">Institution Today</span>
              </h2>
              <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
                Join 800+ institutions that have unified their operations, improved student outcomes, and reduced admin costs with EduX.
              </p>
              <button onClick={() => setModalOpen(true)}
                className="group inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.25em] transition-all shadow-2xl shadow-indigo-900/40">
                Request a Demo <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <CTAModal isOpen={modalOpen} onClose={() => setModalOpen(false)} productName="EduX" productTagline="Institutional AI Operating System" accentColor="#4f46e5" />
        <Footer/>
    </main>
  );
}