'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ArrowRight, Loader2, User, Building2,
  Github, Linkedin, Briefcase, Globe, Users, CheckCircle2
} from 'lucide-react';

/* ── Types ── */
interface MeResponse {
  id: string;
  email: string;
  role: 'CANDIDATE' | 'RECRUITER';
  isVerified: boolean;
  candidateProfile: {
    fullName: string;
    headline?: string;
    skills: string[];
    githubUrl?: string;
    linkedinUrl?: string;
    experienceYears?: number;
  } | null;
  recruiterProfile: {
    companyName: string;
    companySize?: string;
    website?: string;
  } | null;
}

interface CandidateFields {
  headline: string;
  skills: string;        // comma-separated input, split on save
  githubUrl: string;
  linkedinUrl: string;
  experienceYears: string;
}

interface RecruiterFields {
  companySize: string;
  website: string;
}

const API_BASE = process.env.NEXT_PUBLIC_HIREX_API_URL || 'https://clc-products-real-backend.vercel.app';

/* ── Helpers ── */
const isProfileIncomplete = (me: MeResponse) => {
  if (me.role === 'CANDIDATE') {
    const p = me.candidateProfile;
    return !p || !p.headline || !p.skills?.length || !p.experienceYears;
  }
  if (me.role === 'RECRUITER') {
    const p = me.recruiterProfile;
    return !p || !p.companySize || !p.website;
  }
  return false;
};

/* ── Animation variants ── */
const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25, delay: 0.1 } },
};

const modal = {
  hidden: { opacity: 0, scale: 0.94, y: 24 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { opacity: 0, scale: 0.96, y: 16, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as const } }),
};

const stagger = { visible: { transition: { staggerChildren: 0.07 } } };

/* ────────────────────────────────────────────────────────────
   MAIN COMPONENT
──────────────────────────────────────────────────────────── */
export default function HirexProfileCompleteModal() {
  const [me, setMe] = useState<MeResponse | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [candidateFields, setCandidateFields] = useState<CandidateFields>({
    headline: '', skills: '', githubUrl: '', linkedinUrl: '', experienceYears: '',
  });
  const [recruiterFields, setRecruiterFields] = useState<RecruiterFields>({
    companySize: '', website: '',
  });

  /* ── Fetch /me on mount ── */
  const fetchMe = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/hirex/auth/me`, { credentials: 'include' });
      if (!res.ok) return;
      const data: MeResponse = await res.json();
      setMe(data);
      if (data.isVerified && isProfileIncomplete(data)) {
        // Pre-fill whatever already exists
        if (data.role === 'CANDIDATE' && data.candidateProfile) {
          const p = data.candidateProfile;
          setCandidateFields({
            headline: p.headline || '',
            skills: p.skills?.join(', ') || '',
            githubUrl: p.githubUrl || '',
            linkedinUrl: p.linkedinUrl || '',
            experienceYears: p.experienceYears?.toString() || '',
          });
        }
        if (data.role === 'RECRUITER' && data.recruiterProfile) {
          const p = data.recruiterProfile;
          setRecruiterFields({ companySize: p.companySize || '', website: p.website || '' });
        }
        // Small delay so dashboard renders first, then modal slides in
        setTimeout(() => setOpen(true), 600);
      }
    } catch { /* silent */ }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchMe(); }, [fetchMe]);

  /* ── Save profile ── */
  const saveProfile = async () => {
    if (!me) return;
    setSaving(true); setError('');

    try {
      let body: Record<string, unknown> = {};

      if (me.role === 'CANDIDATE') {
        const skillsArr = candidateFields.skills
          .split(',').map(s => s.trim()).filter(Boolean);
        if (!candidateFields.headline.trim()) throw new Error('Headline is required.');
        if (!skillsArr.length) throw new Error('Please add at least one skill.');
        if (!candidateFields.experienceYears) throw new Error('Years of experience is required.');
        body = {
          headline: candidateFields.headline,
          skills: skillsArr,
          githubUrl: candidateFields.githubUrl || undefined,
          linkedinUrl: candidateFields.linkedinUrl || undefined,
          experienceYears: parseInt(candidateFields.experienceYears, 10),
        };
      } else {
        body = {
          companySize: recruiterFields.companySize || undefined,
          website: recruiterFields.website || undefined,
        };
      }

      const endpoint = me.role === 'CANDIDATE'
        ? `${API_BASE}/api/hirex/candidate/profile`
        : `${API_BASE}/api/hirex/recruiter/profile`;

      const res = await fetch(endpoint, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to save profile.');

      setSuccess(true);
      setTimeout(() => setOpen(false), 1800);
    } catch (err: any) { setError(err.message); }
    finally { setSaving(false); }
  };

  const dismiss = () => setOpen(false);

  /* ── Render nothing until modal is open ── */
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6"
          variants={backdrop} initial="hidden" animate="visible" exit="exit"
        >
          {/* Backdrop blur */}
          <div
            className="absolute inset-0 bg-[#020617]/80 backdrop-blur-md"
            onClick={dismiss}
          />

          {/* Modal card */}
          <motion.div
            className="relative w-full max-w-lg bg-[#070f1f] border border-white/10 rounded-[2rem] shadow-[0_32px_80px_rgba(0,0,0,0.6)] overflow-hidden"
            variants={modal} initial="hidden" animate="visible" exit="exit"
          >
            {/* Top accent bar */}
            <div className={`h-1 w-full ${me?.role === 'CANDIDATE' ? 'bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500' : 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500'}`} />

            {/* Glow */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 blur-[80px] opacity-20 pointer-events-none ${me?.role === 'CANDIDATE' ? 'bg-emerald-500' : 'bg-blue-500'}`} />

            <div className="relative p-6 sm:p-8">

              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest mb-3 ${
                    me?.role === 'CANDIDATE'
                      ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                      : 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                  }`}>
                    {me?.role === 'CANDIDATE' ? <User className="w-3 h-3" /> : <Building2 className="w-3 h-3" />}
                    {me?.role === 'CANDIDATE' ? 'Candidate' : 'Recruiter'} Profile
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
                    Complete your profile
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">
                    {me?.role === 'CANDIDATE'
                      ? 'Help recruiters discover you with a strong profile.'
                      : 'Add details about your company to attract top talent.'}
                  </p>
                </motion.div>

                <button onClick={dismiss}
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all flex-shrink-0 ml-4"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginBottom: 20 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-red-500/20 border border-red-500/40 p-3 rounded-xl text-xs text-red-300 overflow-hidden"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── Success state ── */}
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div key="success"
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-10 gap-4 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                      className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center"
                    >
                      <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                    </motion.div>
                    <div>
                      <p className="text-white font-bold text-lg">Profile saved!</p>
                      <p className="text-slate-400 text-sm mt-1">Your profile is now live.</p>
                    </div>
                  </motion.div>

                ) : (
                  /* ── Form ── */
                  <motion.div key="form" variants={stagger} initial="hidden" animate="visible" className="space-y-4">

                    {/* ────── CANDIDATE FIELDS ────── */}
                    {me?.role === 'CANDIDATE' && (
                      <>
                        {/* Headline */}
                        <motion.div variants={fadeUp} custom={1} className="space-y-1.5 group">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-emerald-400 transition-colors">
                            Professional Headline <span className="text-red-400">*</span>
                          </label>
                          <input type="text" placeholder="e.g. Full-Stack Engineer · React · Node"
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-slate-700"
                            value={candidateFields.headline}
                            onChange={e => setCandidateFields(p => ({ ...p, headline: e.target.value }))}
                          />
                        </motion.div>

                        {/* Skills */}
                        <motion.div variants={fadeUp} custom={2} className="space-y-1.5 group">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-emerald-400 transition-colors">
                            Skills <span className="text-red-400">*</span>
                            <span className="text-slate-600 normal-case tracking-normal ml-1">(comma separated)</span>
                          </label>
                          <input type="text" placeholder="React, TypeScript, Node.js, PostgreSQL"
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-slate-700"
                            value={candidateFields.skills}
                            onChange={e => setCandidateFields(p => ({ ...p, skills: e.target.value }))}
                          />
                          {/* Skill pills preview */}
                          {candidateFields.skills && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {candidateFields.skills.split(',').map(s => s.trim()).filter(Boolean).map(skill => (
                                <span key={skill} className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          )}
                        </motion.div>

                        {/* Experience */}
                        <motion.div variants={fadeUp} custom={3} className="space-y-1.5 group">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-emerald-400 transition-colors">
                            Years of Experience <span className="text-red-400">*</span>
                          </label>
                          <div className="relative">
                            <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input type="number" min="0" max="50" placeholder="3"
                              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-sm text-white focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-slate-700"
                              value={candidateFields.experienceYears}
                              onChange={e => setCandidateFields(p => ({ ...p, experienceYears: e.target.value }))}
                            />
                          </div>
                        </motion.div>

                        {/* GitHub + LinkedIn — 2-col */}
                        <motion.div variants={fadeUp} custom={4} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1.5 group">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-emerald-400 transition-colors">
                              GitHub <span className="text-slate-600 normal-case tracking-normal">(optional)</span>
                            </label>
                            <div className="relative">
                              <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                              <input type="url" placeholder="github.com/you"
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-3 text-sm text-white focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-slate-700"
                                value={candidateFields.githubUrl}
                                onChange={e => setCandidateFields(p => ({ ...p, githubUrl: e.target.value }))}
                              />
                            </div>
                          </div>
                          <div className="space-y-1.5 group">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-emerald-400 transition-colors">
                              LinkedIn <span className="text-slate-600 normal-case tracking-normal">(optional)</span>
                            </label>
                            <div className="relative">
                              <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                              <input type="url" placeholder="linkedin.com/in/you"
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-3 text-sm text-white focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-slate-700"
                                value={candidateFields.linkedinUrl}
                                onChange={e => setCandidateFields(p => ({ ...p, linkedinUrl: e.target.value }))}
                              />
                            </div>
                          </div>
                        </motion.div>
                      </>
                    )}

                    {/* ────── RECRUITER FIELDS ────── */}
                    {me?.role === 'RECRUITER' && (
                      <>
                        {/* Company Size */}
                        <motion.div variants={fadeUp} custom={1} className="space-y-1.5 group">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-blue-400 transition-colors">
                            Company Size
                          </label>
                          <div className="relative">
                            <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <select
                              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-sm text-white focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all appearance-none"
                              value={recruiterFields.companySize}
                              onChange={e => setRecruiterFields(p => ({ ...p, companySize: e.target.value }))}
                            >
                              <option value="" className="bg-[#070f1f]">Select size…</option>
                              {['1–10', '11–50', '51–200', '201–500', '500–1000', '1000+'].map(s => (
                                <option key={s} value={s} className="bg-[#070f1f]">{s} employees</option>
                              ))}
                            </select>
                          </div>
                        </motion.div>

                        {/* Website */}
                        <motion.div variants={fadeUp} custom={2} className="space-y-1.5 group">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-blue-400 transition-colors">
                            Company Website
                          </label>
                          <div className="relative">
                            <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input type="url" placeholder="https://yourcompany.com"
                              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-sm text-white focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all placeholder:text-slate-700"
                              value={recruiterFields.website}
                              onChange={e => setRecruiterFields(p => ({ ...p, website: e.target.value }))}
                            />
                          </div>
                        </motion.div>
                      </>
                    )}

                    {/* ── CTA Buttons ── */}
                    <motion.div variants={fadeUp} custom={5} className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button onClick={dismiss}
                        className="flex-1 py-3 rounded-xl text-sm font-bold text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                      >
                        Skip for now
                      </button>
                      <motion.button onClick={saveProfile} disabled={saving}
                        whileHover={!saving ? { scale: 1.015 } : {}}
                        whileTap={!saving ? { scale: 0.985 } : {}}
                        className={`flex-1 py-3 rounded-xl text-sm font-black flex items-center justify-center gap-2 transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed ${
                          me?.role === 'CANDIDATE'
                            ? 'bg-emerald-600 hover:bg-emerald-500 text-[#020617] shadow-emerald-600/20'
                            : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20'
                        }`}
                      >
                        {saving
                          ? <Loader2 className="w-4 h-4 animate-spin" />
                          : <><span>Save Profile</span><ArrowRight className="w-4 h-4" /></>
                        }
                      </motion.button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}