// app/hirex/360-reports/page.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import {
  Search, Filter, Download, UserCheck, ShieldCheck,
  BrainCircuit, Code2, GitMerge, MessageSquare,
  X, ChevronRight, Activity, Zap, Terminal, Users, TrendingUp, Clock,
  MapPin, Phone, Mail, PieChart, MessageCircle, ExternalLink, Blocks, Star
} from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

const PAGE_KEY = 'hirex-360-reports';

// ── Icon Map ──────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  Search, Filter, Download, UserCheck, ShieldCheck,
  BrainCircuit, Code2, GitMerge, MessageSquare,
  X, ChevronRight, Activity, Zap, Terminal, Users, TrendingUp, Clock,
  MapPin, Phone, Mail, PieChart, MessageCircle, ExternalLink, Blocks, Star,
};

// ── Types ─────────────────────────────────────────────────────────────────────
interface Candidate {
  id: string; name: string; role: string; location: string; matchScore: number;
  avatar: string; skills: string[]; metrics: { technical: number; logic: number; systemDesign: number; communication: number };
  aiNotes: string; githubImpact: string; status: string;
  theme: { text: string; bg: string; bgSubtle: string; border: string; glow: string };
}
interface DashboardStat { value: string; label: string; icon: string; color: string; }
interface WhyItem { title: string; description: string; icon: string; color: string; }
interface Testimonial { quote: string; name: string; role: string; avatar: string; }
interface ContactItem { type: string; label: string; value: string; icon: string; color: string; }
interface MetricItem { label: string; key: keyof Candidate['metrics']; icon: string; color: string; bg: string; }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_CANDIDATES = JSON.stringify([
  { id: 'HX-IND-9921', name: 'Pooja Mehta', role: 'Full Stack Developer', location: 'Bangalore, India', matchScore: 94, avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop', skills: ['React.js', 'Next.js', 'Node.js', 'Socket.io'], metrics: { technical: 96, logic: 92, systemDesign: 88, communication: 95 }, aiNotes: 'Candidate demonstrates exceptional understanding of React Server Components and real-time syncing via Socket.io. Code structure is highly modular.', githubImpact: 'High (1.2k+ contributions this year)', status: 'Ready for Interview', theme: { text: 'text-blue-400', bg: 'bg-blue-500', bgSubtle: 'bg-blue-500/10', border: 'border-blue-500/20', glow: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]' } },
  { id: 'HX-IND-8832', name: 'Rahul Sharma', role: 'TiDB & MySQL Architect', location: 'Pune, India', matchScore: 88, avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop', skills: ['TiDB Cloud', 'MySQL', 'Distributed Systems', 'AWS'], metrics: { technical: 94, logic: 85, systemDesign: 90, communication: 82 }, aiNotes: 'Deep knowledge of ACID compliance and distributed SQL. Struggled slightly with one edge-case in high-concurrency simulation but recovered well.', githubImpact: 'Medium (Custom ORM projects)', status: 'Shortlisted', theme: { text: 'text-cyan-400', bg: 'bg-cyan-500', bgSubtle: 'bg-cyan-500/10', border: 'border-cyan-500/20', glow: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]' } },
  { id: 'HX-IND-7745', name: 'Sneha Iyer', role: 'Generative AI Engineer', location: 'Hyderabad, India', matchScore: 97, avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop', skills: ['Gemini API', 'Python', 'RAG Pipelines', 'LangChain'], metrics: { technical: 98, logic: 96, systemDesign: 94, communication: 98 }, aiNotes: 'Outstanding performance. Built a fully functional autonomous agent during the simulation. Excellent prompt engineering skills and handling of API rate limits.', githubImpact: 'Very High (Active open-source AI contributor)', status: 'Fast-Tracked', theme: { text: 'text-purple-400', bg: 'bg-purple-500', bgSubtle: 'bg-purple-500/10', border: 'border-purple-500/20', glow: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]' } },
  { id: 'HX-IND-6654', name: 'Aman Gupta', role: 'DevOps Engineer', location: 'Delhi NCR, India', matchScore: 82, avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop', skills: ['Docker', 'Kubernetes', 'CI/CD', 'Terraform'], metrics: { technical: 85, logic: 80, systemDesign: 84, communication: 80 }, aiNotes: 'Solid understanding of containerization. Deployment scripts were functional but could be optimized for faster execution. Good fundamental knowledge.', githubImpact: 'Low (Mostly private repositories)', status: 'Under Review', theme: { text: 'text-emerald-400', bg: 'bg-emerald-500', bgSubtle: 'bg-emerald-500/10', border: 'border-emerald-500/20', glow: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]' } },
]);

const DEFAULT_DASHBOARD_STATS = JSON.stringify([
  { value: '124', label: 'Total Verified', icon: 'Users',      color: 'blue'   },
  { value: '28',  label: 'Fast-Tracked',  icon: 'Zap',        color: 'purple' },
  { value: '89%', label: 'Avg Logic Score',icon: 'TrendingUp', color: 'emerald'},
  { value: '12',  label: 'Pending Review', icon: 'Clock',      color: 'orange' },
]);

const DEFAULT_WHY_ITEMS = JSON.stringify([
  { title: 'Deep Tech Evaluation', description: 'Our AI Engine evaluates code modularity, best practices, and runtime performance in real-time.', icon: 'Code2', color: 'blue' },
  { title: 'Behavioral Breakdown', description: 'Understand how candidates approach logic puzzles, edge cases, and high-pressure scenarios.', icon: 'PieChart', color: 'purple' },
  { title: 'GitHub Integration', description: 'Automatically scan their open-source contributions to verify real-world project impact.', icon: 'GitMerge', color: 'emerald' },
]);

const DEFAULT_TESTIMONIALS = JSON.stringify([
  { quote: 'The deep AI logic evaluation saved our engineering team dozens of hours per week. We only interview candidates who are actually ready.', name: 'Sarah Jenkins', role: 'VP of Engineering, TechFlow', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop' },
  { quote: 'Having the GitHub impact perfectly summarized alongside their test scores gave us a true 360-degree view. Brilliant platform.', name: 'Raj Patel', role: 'Lead Architect, InnovateAI', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop' },
]);

const DEFAULT_CONTACT_ITEMS = JSON.stringify([
  { type: 'location', label: 'Location', value: 'DLF Cyber City, 5th Floor,\nCyber Green-2, Sec-25,\nGurugram, India', icon: 'MapPin', color: 'blue' },
  { type: 'phone',    label: 'Phone',    value: '+91 870023 6923',              icon: 'Phone',  color: 'emerald' },
  { type: 'email',    label: 'Email',    value: 'info@careerlabconsulting.com', icon: 'Mail',   color: 'purple'  },
]);

const METRIC_ITEMS: MetricItem[] = [
  { label: 'Tech Proficiency',       key: 'technical',    icon: 'Code2',        color: 'text-blue-400',    bg: 'bg-blue-500'    },
  { label: 'Logic & Problem Solving',key: 'logic',        icon: 'BrainCircuit', color: 'text-purple-400',  bg: 'bg-purple-500'  },
  { label: 'System Design',          key: 'systemDesign', icon: 'Terminal',     color: 'text-cyan-400',    bg: 'bg-cyan-500'    },
  { label: 'Communication',          key: 'communication',icon: 'MessageSquare',color: 'text-emerald-400', bg: 'bg-emerald-500' },
];

export default function Reports360Page() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const { get } = usePageContent(PAGE_KEY);

  // ── CMS Values ─────────────────────────────────────────────────────────────
  const heroBadgeText    = get('hero', 'badge_text',      'Employer Dashboard');
  const heroHeadlinePl   = get('hero', 'headline_plain',  '360°');
  const heroHeadlineAcc  = get('hero', 'headline_accent', 'Insights Matrix');
  const heroAccentFrom   = get('hero', 'accent_from',     '#60a5fa');
  const heroAccentTo     = get('hero', 'accent_to',       '#67e8f9');
  const heroBody         = get('hero', 'body_text',       'Deep dive into AI-generated evaluations. Review technical depth, logical reasoning, and GitHub impact before scheduling the final culture-fit round.');
  const adminWhatsapp    = get('hero', 'admin_whatsapp',  '918700236923');

  const dashboardStats   = safeParse<DashboardStat[]>(get('dashboard', 'stats_json', DEFAULT_DASHBOARD_STATS), []);
  const candidates       = safeParse<Candidate[]>(get('candidates', 'items_json', DEFAULT_CANDIDATES), []);

  const whyHeadline      = get('why_reports', 'headline',   'Why use 360° Reports?');
  const whySubhead       = get('why_reports', 'subheading', 'Comprehensive AI analysis that goes beyond basic skill matching.');
  const whyItems         = safeParse<WhyItem[]>(get('why_reports', 'items_json', DEFAULT_WHY_ITEMS), []);

  const integrationTitle = get('integration', 'headline',    'Seamless Enterprise Integration');
  const integrationBody  = get('integration', 'body_text',   'Connect HireX 360° Reports directly with your existing ATS, Slack, or MS Teams to streamline your hiring pipeline.');
  const integrationBtn   = get('integration', 'btn_label',   'View API Docs');

  const testimonialsHead = get('testimonials', 'headline',   'Trusted by Technical Leads');
  const testimonials     = safeParse<Testimonial[]>(get('testimonials', 'items_json', DEFAULT_TESTIMONIALS), []);

  const contactHeadline  = get('contact', 'headline',   'Get In Touch');
  const contactSubhead   = get('contact', 'subheading', 'Need support regarding candidate reports or enterprise integrations? Our team at Career Lab Consulting is here to help.');
  const contactItems     = safeParse<ContactItem[]>(get('contact', 'items_json', DEFAULT_CONTACT_ITEMS), []);

  const filteredCandidates = candidates.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openWhatsApp = (action: string) => {
    if (!selectedCandidate) return;
    const text = encodeURIComponent(`Hi, I'm interested to ${action} with candidate ${selectedCandidate.name} (${selectedCandidate.id}) for the ${selectedCandidate.role} role.`);
    window.open(`https://wa.me/${adminWhatsapp.replace('+', '')}?text=${text}`, '_blank');
  };

  const colorMap: Record<string, { bg: string; hoverBorder: string; icon: string; statBg: string; statBorder: string; statGlow: string }> = {
    blue:    { bg: 'bg-blue-500/10',    hoverBorder: 'hover:border-blue-500/50',    icon: 'text-blue-400',    statBg: 'bg-blue-500/10',    statBorder: 'border-blue-500/20',    statGlow: 'shadow-[0_0_15px_rgba(59,130,246,0.2)]'    },
    purple:  { bg: 'bg-purple-500/10',  hoverBorder: 'hover:border-purple-500/50',  icon: 'text-purple-400',  statBg: 'bg-purple-500/10',  statBorder: 'border-purple-500/20',  statGlow: 'shadow-[0_0_15px_rgba(168,85,247,0.2)]'    },
    emerald: { bg: 'bg-emerald-500/10', hoverBorder: 'hover:border-emerald-500/50', icon: 'text-emerald-400', statBg: 'bg-emerald-500/10', statBorder: 'border-emerald-500/20', statGlow: 'shadow-[0_0_15px_rgba(16,185,129,0.2)]'    },
    orange:  { bg: 'bg-orange-500/10',  hoverBorder: 'hover:border-orange-500/50',  icon: 'text-orange-400',  statBg: 'bg-orange-500/10',  statBorder: 'border-orange-500/20',  statGlow: 'shadow-[0_0_15px_rgba(249,115,22,0.2)]'    },
    cyan:    { bg: 'bg-cyan-500/10',    hoverBorder: 'hover:border-cyan-500/50',    icon: 'text-cyan-400',    statBg: 'bg-cyan-500/10',    statBorder: 'border-cyan-500/20',    statGlow: 'shadow-[0_0_15px_rgba(6,182,212,0.2)]'     },
  };

  return (
    <main className="min-h-screen relative overflow-hidden selection:bg-blue-500/30 selection:text-blue-200 text-white bg-[#020617]">

      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-600/10 blur-[120px] rounded-full -translate-x-1/3 translate-y-1/3" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <Navbar />

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-12 z-10 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-widest mb-4">
                <ShieldCheck className="w-4 h-4" /> {heroBadgeText}
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-lg">
                {heroHeadlinePl}{' '}
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${heroAccentFrom}, ${heroAccentTo})` }}>
                  {heroHeadlineAcc}
                </span>
              </h1>
              <p className="mt-4 text-slate-400 text-base md:text-lg leading-relaxed">{heroBody}</p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 w-full lg:w-auto">
              <div className="relative w-full sm:w-[280px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search candidates..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="bg-slate-900/50 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all w-full shadow-lg backdrop-blur-md placeholder:text-slate-500"
                />
              </div>
              <button className="flex items-center justify-center gap-2 bg-slate-900/50 border border-white/10 px-5 py-3.5 rounded-2xl hover:bg-white/5 transition-colors text-slate-300 hover:text-white shadow-lg backdrop-blur-md">
                <Filter className="w-4 h-4" />
                <span className="sm:hidden text-sm font-medium">Filters</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── DASHBOARD STATS ─────────────────────────────────────────────────── */}
      <section className="relative py-12 z-10 border-b border-white/5 bg-slate-900/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {dashboardStats.map((stat, i) => {
              const Icon = ICON_MAP[stat.icon] ?? Users;
              const c = colorMap[stat.color] ?? colorMap['blue'];
              return (
                <div key={i} className={`bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-transform hover:-translate-y-1 duration-300`}>
                  <div className={`w-12 h-12 rounded-2xl ${c.statBg} flex items-center justify-center border ${c.statBorder} ${c.statGlow}`}>
                    <Icon className={`w-6 h-6 ${c.icon}`} />
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-black text-white">{stat.value}</p>
                    <p className="text-[10px] sm:text-xs uppercase font-bold text-slate-500 tracking-wider mt-0.5">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CANDIDATE GRID ──────────────────────────────────────────────────── */}
      <section className="relative py-16 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {filteredCandidates.map(candidate => (
              <div
                key={candidate.id}
                onClick={() => setSelectedCandidate(candidate)}
                className={`group relative bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 cursor-pointer hover:-translate-y-2 transition-all duration-300 shadow-lg ${candidate.theme.glow} hover:border-white/20 flex flex-col`}
              >
                <div className="absolute top-0 right-0 p-4">
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${candidate.theme.bgSubtle} ${candidate.theme.border} border`}>
                    <Activity className={`w-3 h-3 ${candidate.theme.text}`} />
                    <span className={`text-[10px] font-bold ${candidate.theme.text}`}>{candidate.matchScore}% Match</span>
                  </div>
                </div>
                <div className="relative w-16 h-16 mb-5">
                  <div className={`absolute inset-0 ${candidate.theme.bg} rounded-2xl blur-md opacity-20 group-hover:opacity-40 transition-opacity`} />
                  <img src={candidate.avatar} alt={candidate.name} className="relative w-full h-full object-cover rounded-2xl border border-white/10 grayscale-[20%] group-hover:grayscale-0 transition-all shadow-xl" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-100 transition-colors">{candidate.name}</h3>
                <p className="text-xs text-slate-400 mb-5">{candidate.role}</p>
                <div className="flex flex-wrap gap-1.5 mb-6 flex-grow">
                  {candidate.skills.slice(0, 3).map(skill => (
                    <span key={skill} className="px-2 py-1 bg-white/5 border border-white/5 text-slate-300 text-[10px] font-medium tracking-wide rounded-lg">{skill}</span>
                  ))}
                  {candidate.skills.length > 3 && (
                    <span className="px-2 py-1 bg-white/5 border border-white/5 text-slate-500 text-[10px] font-medium tracking-wide rounded-lg">+{candidate.skills.length - 3}</span>
                  )}
                </div>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                  <span className={`text-xs font-bold ${candidate.status === 'Fast-Tracked' ? 'text-purple-400' : candidate.status === 'Ready for Interview' ? 'text-blue-400' : 'text-slate-400'}`}>
                    {candidate.status}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY REPORTS ─────────────────────────────────────────────────────── */}
      <section className="relative py-16 z-10 border-t border-white/5 bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">{whyHeadline}</h2>
            <p className="text-slate-400">{whySubhead}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {whyItems.map((item, i) => {
              const Icon = ICON_MAP[item.icon] ?? Code2;
              const c = colorMap[item.color] ?? colorMap['blue'];
              return (
                <div key={i} className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 text-center hover:bg-white/[0.04] transition-colors">
                  <div className={`w-14 h-14 mx-auto ${c.statBg} rounded-2xl flex items-center justify-center mb-6 border ${c.statBorder}`}>
                    <Icon className={`w-7 h-7 ${c.icon}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── INTEGRATION ─────────────────────────────────────────────────────── */}
      <section className="relative py-16 z-10 border-t border-white/5 bg-white/[0.01]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="md:w-1/2 relative z-10">
              <h2 className="text-3xl font-bold text-white mb-4">{integrationTitle}</h2>
              <p className="text-slate-400 mb-8 leading-relaxed">{integrationBody}</p>
              <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 rounded-xl transition-colors font-medium">
                {integrationBtn} <ExternalLink className="w-4 h-4" />
              </button>
            </div>
            <div className="md:w-1/2 relative z-10 flex justify-center">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 w-32 h-32 rounded-2xl flex flex-col items-center justify-center gap-3 backdrop-blur-sm animate-[bounce_3s_infinite]">
                  <Blocks className="w-8 h-8 text-blue-400" />
                  <span className="text-xs font-bold text-slate-300">ATS Connect</span>
                </div>
                <div className="bg-white/5 border border-white/10 w-32 h-32 rounded-2xl flex flex-col items-center justify-center gap-3 backdrop-blur-sm animate-[bounce_4s_infinite] translate-y-6">
                  <MessageSquare className="w-8 h-8 text-purple-400" />
                  <span className="text-xs font-bold text-slate-300">Slack Alerts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────────────────── */}
      <section className="relative py-16 z-10 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-12">{testimonialsHead}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 text-left">
                <div className="flex gap-1 mb-4 text-yellow-400">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-slate-300 italic mb-6 leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-white/10" />
                  <div>
                    <h4 className="text-sm font-bold text-white">{t.name}</h4>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────────────────── */}
      <section className="relative py-16 z-10 border-t border-white/5 bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">{contactHeadline}</h2>
            <p className="text-slate-400">{contactSubhead}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {contactItems.map((item, i) => {
              const Icon = ICON_MAP[item.icon] ?? MapPin;
              const c = colorMap[item.color] ?? colorMap['blue'];
              return (
                <div key={i} className={`group flex flex-col items-center p-8 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl text-center hover:-translate-y-1 ${c.hoverBorder} transition-all duration-300`}>
                  <div className={`w-14 h-14 ${c.bg} rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 ${c.icon}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{item.label}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">{item.value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />

      {/* ── CANDIDATE MODAL ─────────────────────────────────────────────────── */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-8">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setSelectedCandidate(null)} />
          <div className="relative w-full max-w-5xl bg-[#0b0f1f] border border-white/10 rounded-2xl sm:rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300">

            {/* Modal Header */}
            <div className="flex-shrink-0 p-4 sm:p-6 md:p-8 border-b border-white/10 flex justify-between items-start bg-slate-900/90 backdrop-blur-xl relative z-20">
              <div className="flex items-center gap-4 sm:gap-6 relative z-10 w-[85%] sm:w-auto">
                <img src={selectedCandidate.avatar} alt="Avatar" className="w-15 h-20 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl object-cover border border-white/20 shadow-2xl flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg sm:text-3xl font-black text-white mb-0.5 sm:mb-1 truncate">{selectedCandidate.name}</h2>
                  <p className="text-xs sm:text-sm text-slate-400 mb-1 truncate">{selectedCandidate.role}</p>
                  <p className="text-[10px] font-mono text-slate-500 hidden sm:block">{selectedCandidate.id} • {selectedCandidate.location}</p>
                </div>
              </div>
              <div className="flex items-start sm:items-center gap-4 relative z-10">
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">HireX Match</p>
                  <p className={`text-3xl sm:text-4xl font-black ${selectedCandidate.theme.text}`}>{selectedCandidate.matchScore}%</p>
                </div>
                <button onClick={() => setSelectedCandidate(null)} className="p-2 sm:p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-slate-400 hover:text-white transition-all shadow-lg">
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
              {/* Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {METRIC_ITEMS.map((metric, idx) => {
                  const Icon = ICON_MAP[metric.icon] ?? Code2;
                  const val = selectedCandidate.metrics[metric.key];
                  return (
                    <div key={idx} className="bg-slate-900/40 border border-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-5 hover:bg-slate-900/60 transition-colors">
                      <div className="flex justify-between items-start mb-3 sm:mb-4">
                        <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${metric.color}`} />
                        <span className="text-base sm:text-xl font-bold text-white">{val}</span>
                      </div>
                      <p className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-500 mb-2 sm:mb-3 line-clamp-1">{metric.label}</p>
                      <div className="w-full h-1 sm:h-1.5 bg-black/50 rounded-full overflow-hidden">
                        <div className={`h-full ${metric.bg} rounded-full`} style={{ width: `${val}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                  {/* AI Notes */}
                  <div className="bg-slate-900/40 border border-white/5 rounded-2xl sm:rounded-[2rem] p-5 sm:p-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-yellow-400 to-orange-500 rounded-l-2xl sm:rounded-l-[2rem]" />
                    <div className="flex items-center gap-3 mb-4 sm:mb-5">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
                        <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300">AI Analysis</h3>
                    </div>
                    <p className="text-slate-300/90 leading-relaxed text-xs sm:text-sm md:text-base font-light">"{selectedCandidate.aiNotes}"</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* Skills */}
                    <div className="bg-slate-900/40 border border-white/5 rounded-2xl sm:rounded-[2rem] p-5 sm:p-8">
                      <div className="flex items-center gap-3 mb-4 sm:mb-5">
                        <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                        <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300">Verified Stack</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedCandidate.skills.map(skill => (
                          <span key={skill} className={`px-2.5 sm:px-3 py-1 sm:py-1.5 ${selectedCandidate.theme.bgSubtle} ${selectedCandidate.theme.border} ${selectedCandidate.theme.text} border text-[10px] sm:text-xs rounded-lg sm:rounded-xl font-medium`}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* GitHub */}
                    <div className="bg-slate-900/40 border border-white/5 rounded-2xl sm:rounded-[2rem] p-5 sm:p-8 relative overflow-hidden group">
                      <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <GitMerge className="w-24 h-24 sm:w-32 sm:h-32 text-white" />
                      </div>
                      <div className="flex items-center gap-3 mb-4 sm:mb-5 relative z-10">
                        <GitMerge className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                        <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300">GitHub Impact</h3>
                      </div>
                      <p className="text-lg sm:text-xl md:text-2xl font-bold text-emerald-400 relative z-10">{selectedCandidate.githubImpact}</p>
                      <p className="text-[10px] sm:text-xs text-slate-500 mt-1.5 sm:mt-2 relative z-10">Analyzed via auto-repo scanning.</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-4">
                  <div className="bg-gradient-to-b from-blue-900/30 to-slate-900/60 border border-blue-500/20 rounded-2xl sm:rounded-[2rem] p-5 sm:p-8 text-center shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50" />
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/30 mb-4 sm:mb-5">
                      <UserCheck className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
                    </div>
                    <h3 className="text-white font-bold text-base sm:text-lg mb-1.5 sm:mb-2">Ready to move forward?</h3>
                    <p className="text-[10px] sm:text-xs text-slate-400 mb-6 sm:mb-8 leading-relaxed">Candidate is verified and actively seeking offers.</p>
                    <button onClick={() => openWhatsApp('schedule a final round')} className="w-full bg-[#25D366] hover:bg-[#1ebd5c] text-white font-bold py-3 sm:py-3.5 rounded-xl transition-all mb-3 flex items-center justify-center gap-2 text-sm sm:text-base">
                      <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" /> Chat on WhatsApp
                    </button>
                    <button onClick={() => openWhatsApp('extend a direct offer')} className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-3 sm:py-3.5 rounded-xl transition-all text-sm sm:text-base">
                      Request Direct Offer
                    </button>
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white font-semibold py-3.5 sm:py-4 rounded-xl sm:rounded-[1.5rem] transition-all hover:bg-white/10 group text-sm sm:text-base">
                    <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" /> Export 360° PDF Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}