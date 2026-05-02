// app/hirex/job-inventory/page.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import {
  Search, MapPin, DollarSign,
  Activity, Star, Zap, Terminal, Building2,
  ChevronRight, CheckCircle2, Clock,
  ArrowRight, X, Loader2, BrainCircuit, Code2,
  Target, Users, ShieldCheck, Mail, Phone,
  Sparkles,
} from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

// ── Icon maps ─────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  Target, BrainCircuit, CheckCircle2, ShieldCheck, Code2, Users,
  MapPin, Phone, Mail, Sparkles, Zap,
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Default JSON ──────────────────────────────────────────────────────────────
const DEFAULT_JOB_LISTINGS = JSON.stringify([
  {
    id: 'REQ-9901',
    title: 'Principal Next.js Engineer',
    company: 'FinTech Global',
    logo: 'FG',
    location: 'Remote (India)',
    type: 'Full-Time',
    salary: '₹35L - ₹50L',
    category: 'Frontend',
    requiredGrade: 'S-Tier',
    matchScore: 94,
    isHot: true,
    skills: ['Next.js', 'React 19', 'System Design', 'AWS'],
    postedAt: '2 hours ago',
    theme: { text: 'text-blue-400', bg: 'bg-blue-500', bgSubtle: 'bg-blue-500/10', border: 'border-blue-500/20', glow: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]' },
  },
  {
    id: 'REQ-8842',
    title: 'TiDB & MySQL Architect',
    company: 'Nexus Commerce',
    logo: 'NC',
    location: 'Gurugram, Hybrid',
    type: 'Full-Time',
    salary: '₹40L - ₹60L',
    category: 'Database',
    requiredGrade: 'A-Tier',
    matchScore: 88,
    isHot: false,
    skills: ['TiDB Cloud', 'MySQL', 'Distributed SQL', 'Kubernetes'],
    postedAt: '5 hours ago',
    theme: { text: 'text-cyan-400', bg: 'bg-cyan-500', bgSubtle: 'bg-cyan-500/10', border: 'border-cyan-500/20', glow: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]' },
  },
  {
    id: 'REQ-7723',
    title: 'Generative AI Developer',
    company: 'HealthAI Systems',
    logo: 'HA',
    location: 'Bengaluru, On-site',
    type: 'Full-Time',
    salary: '₹45L - ₹70L',
    category: 'AI & Data',
    requiredGrade: 'S-Tier',
    matchScore: 97,
    isHot: true,
    skills: ['Gemini API', 'LangChain', 'Python', 'RAG Pipelines'],
    postedAt: '1 day ago',
    theme: { text: 'text-purple-400', bg: 'bg-purple-500', bgSubtle: 'bg-purple-500/10', border: 'border-purple-500/20', glow: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]' },
  },
  {
    id: 'REQ-6614',
    title: 'Senior Node.js Backend Lead',
    company: 'CloudWorks Inc',
    logo: 'CW',
    location: 'Pune, Hybrid',
    type: 'Contract',
    salary: '$60 - $80 / hr',
    category: 'Backend',
    requiredGrade: 'B-Tier',
    matchScore: 82,
    isHot: false,
    skills: ['Node.js', 'Socket.io', 'Redis', 'Microservices'],
    postedAt: '2 days ago',
    theme: { text: 'text-emerald-400', bg: 'bg-emerald-500', bgSubtle: 'bg-emerald-500/10', border: 'border-emerald-500/20', glow: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]' },
  },
]);

const DEFAULT_HOW_IT_WORKS = JSON.stringify([
  { step: '1', title: 'Find Your Match',   description: 'Browse top-tier roles matched perfectly to your specific skill set and seniority.',                          icon: 'Target',       color: 'blue'    },
  { step: '2', title: 'Take AI Interview', description: 'No recruiter screens. Proceed directly to our autonomous technical evaluation.',                              icon: 'BrainCircuit', color: 'purple'  },
  { step: '3', title: 'Direct Offer',      description: 'Pass the benchmark grade and get your profile instantly sent to the hiring manager.',                         icon: 'CheckCircle2', color: 'emerald' },
]);

const DEFAULT_WHY_HIREX_POINTS = JSON.stringify([
  { text: 'Guaranteed response within 48 hours.',                   icon: 'ShieldCheck', color: 'emerald' },
  { text: 'Evaluated solely on your code, not your pedigree.',      icon: 'Code2',       color: 'blue'    },
  { text: 'Direct fast-track to the technical founders.',           icon: 'Users',       color: 'purple'  },
]);

const DEFAULT_CONTACT_ITEMS = JSON.stringify([
  { label: 'Location',     value: 'DLF Cyber City, 5th Floor, Cyber Green-2, Sec-25, Gurugram, India', icon: 'MapPin', color: 'blue'    },
  { label: 'Support Line', value: '+91 870023 6923',                                                     icon: 'Phone',  color: 'emerald' },
  { label: 'Email Us',     value: 'info@careerlabconsulting.com',                                        icon: 'Mail',   color: 'purple'  },
]);

// ── Types ─────────────────────────────────────────────────────────────────────
interface JobListing { id: string; title: string; company: string; logo: string; location: string; type: string; salary: string; category: string; requiredGrade: string; matchScore: number; isHot: boolean; skills: string[]; postedAt: string; theme: { text: string; bg: string; bgSubtle: string; border: string; glow: string } }
interface HowItWorksStep { step: string; title: string; description: string; icon: string; color: string }
interface WhyPoint { text: string; icon: string; color: string }
interface ContactItem { label: string; value: string; icon: string; color: string }

const COLOR_ICON_MAP: Record<string, string> = {
  blue: 'text-blue-400', purple: 'text-purple-400', emerald: 'text-emerald-400', yellow: 'text-yellow-400',
};
const COLOR_BG_MAP: Record<string, string> = {
  blue: 'bg-blue-500/10', purple: 'bg-purple-500/10', emerald: 'bg-emerald-500/10', yellow: 'bg-yellow-500/10',
};
const COLOR_BORDER_MAP: Record<string, string> = {
  blue: 'border-blue-500/20', purple: 'border-purple-500/20', emerald: 'border-emerald-500/20', yellow: 'border-yellow-500/20',
};
const COLOR_HOVER_BORDER_MAP: Record<string, string> = {
  blue: 'hover:border-blue-500/50', purple: 'hover:border-purple-500/50', emerald: 'hover:border-emerald-500/50',
};

const CATEGORIES = ['All Events', 'Frontend', 'Backend', 'Database', 'AI & Data'];

export default function JobInventoryPage() {
  const [searchQuery, setSearchQuery]   = useState('');
  const [activeCategory, setActiveCategory] = useState('All Events');
  const [selectedJob, setSelectedJob]   = useState<JobListing | null>(null);
  const [formData, setFormData]         = useState({ name: '', email: '', phone: '', portfolio: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; msg: string }>({ type: null, msg: '' });

  const { get } = usePageContent('hirex-job-inventory');

  // ── CMS values ────────────────────────────────────────────────────────────
  const heroBadge     = get('hero', 'badge_text',     'Live Talent Pipeline');
  const heroPlain     = get('hero', 'headline_plain', 'Autonomous');
  const heroAccent    = get('hero', 'headline_accent','Job Inventory');
  const heroBody      = get('hero', 'body_text',      'Explore highly-vetted enterprise roles. Your AI-verified skills automatically calculate your match score for each position. No resumes needed—just initialize the AI interview and get hired.');
  const accentFrom    = get('hero', 'accent_from',    '#60a5fa');
  const accentVia     = get('hero', 'accent_via',     '#67e8f9');
  const accentTo      = get('hero', 'accent_to',      '#34d399');
  const stat1Value    = get('hero', 'stat1_value',    '150+');
  const stat1Label    = get('hero', 'stat1_label',    'Active Roles');
  const stat2Value    = get('hero', 'stat2_value',    '24 Hrs');
  const stat2Label    = get('hero', 'stat2_label',    'Avg Hire Time');

  const howItWorksSteps = safeParse<HowItWorksStep[]>(get('how_it_works', 'items_json', DEFAULT_HOW_IT_WORKS), []);

  const waNumber    = get('job_listings', 'whatsapp_number', '918700236923');
  const jobListings = safeParse<JobListing[]>(get('job_listings', 'items_json', DEFAULT_JOB_LISTINGS), []);

  const whyHeadline  = get('why_hirex', 'headline',    'Why Apply Through HireX?');
  const whyBody      = get('why_hirex', 'body_text',   'Traditional hiring is broken. We replace biased resume screening with pure skill-based AI evaluation.');
  const whyCardTitle = get('why_hirex', 'card_headline','Build Your Profile Once');
  const whyCardBody  = get('why_hirex', 'card_body',   'Take the core AI assessment once and use your verified grade to apply instantly to multiple top-tier companies.');
  const whyPoints    = safeParse<WhyPoint[]>(get('why_hirex', 'points_json', DEFAULT_WHY_HIREX_POINTS), []);

  const contactHeadline = get('contact', 'headline',   'Need Help?');
  const contactBody     = get('contact', 'body_text',  'Having trouble with an AI assessment or finding the right role? Reach out to our candidate success team.');
  const contactItems    = safeParse<ContactItem[]>(get('contact', 'items_json', DEFAULT_CONTACT_ITEMS), []);

  const modalHeadline  = get('apply_modal', 'headline',    'Initialize AI Assessment');
  const modalSubhead   = get('apply_modal', 'subheading',  'Applying for');
  const modalBtnLabel  = get('apply_modal', 'btn_label',   'Send to AI Evaluator');
  const modalFooter    = get('apply_modal', 'footer_note', 'By continuing, you agree to our AI evaluation terms of service.');

  // ── Actions ───────────────────────────────────────────────────────────────
  const filteredJobs = jobListings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All Events' || job.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleApplyClick = (job: JobListing) => {
    setSelectedJob(job);
    setSubmitStatus({ type: null, msg: '' });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, msg: '' });
    try {
      const response = await fetch('/hirex/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, jobId: selectedJob?.id, jobTitle: selectedJob?.title, company: selectedJob?.company }),
      });
      if (response.ok) {
        setSubmitStatus({ type: 'success', msg: 'Application Initialized! Check your email for the AI Test link.' });
        setTimeout(() => setSelectedJob(null), 3000);
      } else {
        setSubmitStatus({ type: 'error', msg: 'Failed to initialize. Please try again.' });
      }
    } catch {
      setSubmitStatus({ type: 'error', msg: 'Network error. Please check your connection.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden selection:bg-blue-500/30 selection:text-blue-200 text-white bg-[#020617]">

      {/* Background Orbs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full -translate-x-1/3" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <Navbar />

      <div className="relative z-10 pt-24 sm:pt-32 pb-24">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="px-4 sm:px-6 lg:px-8 mb-20 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-6">
            <Activity className="w-4 h-4" /> {heroBadge}
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg mb-6 leading-tight">
            {heroPlain} <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentVia}, ${accentTo})` }}>
              {heroAccent}
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto">{heroBody}</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
            <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-3">
              <Building2 className="w-5 h-5 text-blue-400" />
              <div className="text-left">
                <p className="text-xl font-bold text-white leading-none">{stat1Value}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">{stat1Label}</p>
              </div>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-3">
              <Zap className="w-5 h-5 text-purple-400" />
              <div className="text-left">
                <p className="text-xl font-bold text-white leading-none">{stat2Value}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">{stat2Label}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
        <section className="px-4 sm:px-6 lg:px-8 mb-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 -translate-y-1/2 z-0" />
            {howItWorksSteps.map((step, idx) => {
              const Icon = ICON_MAP[step.icon] ?? Target;
              return (
                <div key={idx} className="bg-slate-900/80 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] text-center relative z-10 hover:-translate-y-2 transition-transform duration-300">
                  <div className={`w-14 h-14 mx-auto ${COLOR_BG_MAP[step.color] ?? 'bg-blue-500/10'} rounded-2xl flex items-center justify-center ${COLOR_BORDER_MAP[step.color] ?? 'border-blue-500/20'} border mb-6`}
                    style={{ boxShadow: `0 0 20px ${step.color === 'blue' ? 'rgba(59,130,246,0.2)' : step.color === 'purple' ? 'rgba(168,85,247,0.2)' : 'rgba(16,185,129,0.2)'}` }}>
                    <Icon className={`w-6 h-6 ${COLOR_ICON_MAP[step.color] ?? 'text-blue-400'}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.step}. {step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── SEARCH & FILTER ──────────────────────────────────────────────── */}
        <section className="px-4 sm:px-6 lg:px-8 mb-10 max-w-7xl mx-auto sticky top-24 z-40">
          <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-2xl sm:rounded-[2rem] p-3 sm:p-4 shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input type="text" placeholder="Search roles, companies..." value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-black/40 border border-white/5 rounded-xl sm:rounded-2xl pl-12 pr-4 py-3 sm:py-3.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors" />
            </div>
            <div className="hidden md:block w-px h-10 bg-white/10" />
            <div className="w-full md:w-auto flex-grow flex items-center gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-2 md:pb-0">
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 sm:py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── JOB LISTINGS ─────────────────────────────────────────────────── */}
        <section className="px-4 sm:px-6 lg:px-8 mb-24 max-w-7xl mx-auto">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-white/5">
              <Terminal className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No roles found</h3>
              <p className="text-slate-400">Try adjusting your search criteria or category filter.</p>
              <button onClick={() => { setSearchQuery(''); setActiveCategory('All Events'); }}
                className="mt-6 text-blue-400 hover:text-blue-300 text-sm font-bold underline underline-offset-4">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {filteredJobs.map(job => (
                <div key={job.id}
                  className={`group relative bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl sm:rounded-[2rem] p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 ${job.theme.glow} flex flex-col`}>
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center font-black text-xl text-white shadow-xl border border-white/10 group-hover:scale-105 transition-transform">
                        {job.logo}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-200 transition-colors leading-tight">{job.title}</h3>
                          {job.isHot && (
                            <span className="bg-red-500/20 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded border border-red-500/30 flex items-center gap-1 animate-pulse">
                              <Zap className="w-3 h-3" /> HOT
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-400 flex items-center gap-1.5"><Building2 className="w-4 h-4" /> {job.company}</p>
                      </div>
                    </div>
                    <div className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full ${job.theme.bgSubtle} ${job.theme.border} border`}>
                      <Activity className={`w-3.5 h-3.5 ${job.theme.text}`} />
                      <span className={`text-xs font-bold ${job.theme.text}`}>{job.matchScore}% Match</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 flex-grow">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-300 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                      <DollarSign className="w-3.5 h-3.5" /> {job.salary}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-purple-300 bg-purple-500/10 px-3 py-1.5 rounded-lg border border-purple-500/20">
                      <Star className="w-3.5 h-3.5" /> {job.requiredGrade} Req.
                    </div>
                  </div>
                  <div className="mb-6">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-3">Required Tech Stack</p>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map(skill => (
                        <span key={skill} className="px-2.5 py-1 text-[11px] font-medium text-slate-300 bg-black/40 border border-white/5 rounded-md">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
                    <div className="flex w-full sm:w-auto items-center justify-between sm:justify-start gap-2 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {job.postedAt}</span>
                      <span className={`sm:hidden flex items-center gap-1 ${job.theme.text}`}><Activity className="w-3 h-3" /> {job.matchScore}% Match</span>
                    </div>
                    <button onClick={() => handleApplyClick(job)}
                      className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-6 py-3 bg-white hover:bg-slate-200 text-slate-900 font-bold rounded-xl transition-all shadow-lg hover:shadow-xl">
                      Initialize AI Apply <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── WHY HIREX ────────────────────────────────────────────────────── */}
        <section className="px-4 sm:px-6 lg:px-8 mb-24 max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-blue-900/20 via-slate-900/60 to-purple-900/20 border border-white/10 rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="md:w-1/2">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{whyHeadline}</h2>
                <p className="text-slate-400 mb-8 leading-relaxed">{whyBody}</p>
                <ul className="space-y-4">
                  {whyPoints.map((pt, i) => {
                    const Icon = ICON_MAP[pt.icon] ?? ShieldCheck;
                    return (
                      <li key={i} className="flex items-center gap-3 text-slate-300">
                        <Icon className={`w-5 h-5 shrink-0 ${COLOR_ICON_MAP[pt.color] ?? 'text-emerald-400'}`} />
                        <span>{pt.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="md:w-1/2 flex justify-center w-full">
                <div className="bg-slate-950/50 backdrop-blur-md border border-white/10 p-6 rounded-3xl w-full max-w-sm text-center shadow-2xl">
                  <Sparkles className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
                  <h4 className="text-white font-bold text-lg mb-2">{whyCardTitle}</h4>
                  <p className="text-sm text-slate-400">{whyCardBody}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT ──────────────────────────────────────────────────────── */}
        <section className="relative px-4 sm:px-6 lg:px-8 border-t border-white/5 pt-20">
          <div className="mx-auto max-w-7xl">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">{contactHeadline}</h2>
              <p className="text-slate-400">{contactBody}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {contactItems.map((item, i) => {
                const Icon = ICON_MAP[item.icon] ?? MapPin;
                return (
                  <div key={i} className={`group flex flex-col items-center p-8 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl text-center hover:-translate-y-1 ${COLOR_HOVER_BORDER_MAP[item.color] ?? 'hover:border-blue-500/50'} transition-all duration-300`}>
                    <div className={`w-14 h-14 ${COLOR_BG_MAP[item.color] ?? 'bg-blue-500/10'} rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-6 h-6 ${COLOR_ICON_MAP[item.color] ?? 'text-blue-400'}`} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">{item.label}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.value}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* ── APPLY MODAL ──────────────────────────────────────────────────────── */}
      {selectedJob && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => !isSubmitting && setSelectedJob(null)} />
          <div className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl sm:rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
            <div className={`h-1.5 w-full ${selectedJob.theme.bg}`} />
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-start mb-8">
                <div className="pr-4">
                  <h2 className="text-2xl font-bold text-white mb-2">{modalHeadline}</h2>
                  <p className="text-sm text-slate-400 leading-relaxed">{modalSubhead} <span className="text-white font-semibold">{selectedJob.title}</span> at {selectedJob.company}</p>
                </div>
                <button onClick={() => !isSubmitting && setSelectedJob(null)} className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors shrink-0">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Full Name *</label>
                  <input required type="text" placeholder="e.g. John Doe"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
                    value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Email Address *</label>
                    <input required type="email" placeholder="john@example.com"
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
                      value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Phone Number *</label>
                    <input required type="tel" placeholder="+91 98765 43210"
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
                      value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">LinkedIn / GitHub URL *</label>
                  <input required type="url" placeholder="https://..."
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
                    value={formData.portfolio} onChange={e => setFormData({ ...formData, portfolio: e.target.value })} />
                </div>
                {submitStatus.type && (
                  <div className={`p-4 rounded-xl text-sm font-medium flex items-start gap-3 ${submitStatus.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                    {submitStatus.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <X className="w-5 h-5 shrink-0" />}
                    {submitStatus.msg}
                  </div>
                )}
                <div className="pt-4 mt-2 border-t border-white/10">
                  <button type="submit" disabled={isSubmitting}
                    className={`w-full flex justify-center items-center gap-2 ${selectedJob.theme.bg} hover:opacity-80 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 shadow-lg`}>
                    {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing Secure Link...</> : modalBtnLabel}
                  </button>
                  <p className="text-center text-[10px] text-slate-500 mt-4">{modalFooter}</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}