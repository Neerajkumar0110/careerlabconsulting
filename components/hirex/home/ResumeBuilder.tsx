'use client';
// ResumeBuilder.tsx — CMS-enabled

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Sparkles, User, Briefcase, Code, Send, Eye,
  Activity, Zap, Mail, Phone, GraduationCap, MapPin, X, Loader2,
  Search, Camera, ShieldCheck, LayoutDashboard
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { usePageContent } from '@/hooks/usePageContent';

export default function ResumeBuilder() {
  const { get } = usePageContent('hirex-home');

  // ── CMS Values ────────────────────────────────────────────────────────────
  const accentColor       = get('resume_builder', 'accent_color',              '#3b82f6');
  const badgeText         = get('resume_builder', 'badge_text',                'Autonomous Resume Protocol V2.5');
  const headline1         = get('resume_builder', 'headline_1',                'Orchestrate');
  const headline2         = get('resume_builder', 'headline_2',                'Empire Resume.');
  const bodyText          = get('resume_builder', 'body_text',                 'Fill your neural parameters. Manee Pro 2.5 Flash will orchestrate a professional A4-standard resume synced with your 360° metrics.');
  const modelBadgeLabel   = get('resume_builder', 'model_badge_label',         'Manee Pro 2.5 Flash');
  const generateBtnLabel  = get('resume_builder', 'generate_btn_label',        'Orchestrate Resume');
  const analyzeBtnLabel   = get('resume_builder', 'analyze_btn_label',         'Resume Analyzer');
  const pdfBtnLabel       = get('resume_builder', 'pdf_btn_label',             'View Professional PDF');
  const awaitingLabel     = get('resume_builder', 'awaiting_label',            'Awaiting Data Protocol');
  const atsScoreLabel     = get('resume_builder', 'ats_score_label',           'ATS Optimization Score');
  const pdfFilename       = get('resume_builder', 'pdf_filename',              'EMPIRE_RESUME_SYNC.pdf');
  const pdfSubtitle       = get('resume_builder', 'pdf_subtitle',              'A4 Standard Preview');

  // ── Field Labels ──────────────────────────────────────────────────────────
  const fieldNameLabel         = get('resume_builder', 'field_name_label',          'Full Name');
  const fieldNamePlaceholder   = get('resume_builder', 'field_name_placeholder',    'Deepanshu Joshi');
  const fieldTitleLabel        = get('resume_builder', 'field_title_label',         'Job Title');
  const fieldTitlePlaceholder  = get('resume_builder', 'field_title_placeholder',   'Full Stack Developer');
  const fieldEmailLabel        = get('resume_builder', 'field_email_label',         'Email');
  const fieldEmailPlaceholder  = get('resume_builder', 'field_email_placeholder',   'dev@hirex.ai');
  const fieldPhoneLabel        = get('resume_builder', 'field_phone_label',         'Phone');
  const fieldPhonePlaceholder  = get('resume_builder', 'field_phone_placeholder',   '+91 98765 43210');
  const fieldLocationLabel     = get('resume_builder', 'field_location_label',      'Location');
  const fieldLocationPH        = get('resume_builder', 'field_location_placeholder','Delhi, India');
  const fieldSkillsLabel       = get('resume_builder', 'field_skills_label',        'Core Skills');
  const fieldSkillsPH          = get('resume_builder', 'field_skills_placeholder',  'Next.js, React, Node.js, TypeScript, SQL, Prisma...');
  const fieldSummaryLabel      = get('resume_builder', 'field_summary_label',       'Professional Summary');
  const fieldSummaryPH         = get('resume_builder', 'field_summary_placeholder', 'A high-performance developer building AI-Native architectures...');
  const fieldExpLabel          = get('resume_builder', 'field_experience_label',    'Experience & Projects');
  const fieldExpPH             = get('resume_builder', 'field_experience_placeholder', '• Built an autonomous hiring platform using Next.js\n• Reduced latency by 40% using Edge Functions');
  const fieldEduLabel          = get('resume_builder', 'field_education_label',     'Education');
  const fieldEduPH             = get('resume_builder', 'field_education_placeholder','B.Tech in Computer Science, IIT Delhi');

  // ── Live preview section labels ───────────────────────────────────────────
  const previewNodeLabel       = get('resume_builder', 'preview_node_label',        'Live Preview Node');
  const previewNodeSubtitle    = get('resume_builder', 'preview_node_subtitle',     'Enter Details to Sync with');
  const previewSummaryLabel    = get('resume_builder', 'preview_summary_label',     'Profile Summary');
  const previewSkillsLabel     = get('resume_builder', 'preview_skills_label',      'Key Skills');
  const previewEduLabel        = get('resume_builder', 'preview_edu_label',         'Education');

  // ── State ─────────────────────────────────────────────────────────────────
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing]   = useState(false);
  const [resumeData, setResumeData]     = useState<any>(null);
  const [showPreview, setShowPreview]   = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [atsScore, setAtsScore]         = useState<number | null>(null);
  const resumeRef = useRef<HTMLDivElement>(null);
  const formRef   = useRef<HTMLFormElement>(null);

  const handleAction = (type: 'generate' | 'analyze') => {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    if (type === 'generate') {
      setIsGenerating(true);
      setTimeout(() => {
        setResumeData({
          name:       formData.get('name'),
          title:      formData.get('title'),
          email:      formData.get('email'),
          phone:      formData.get('phone'),
          location:   formData.get('location'),
          skills:     formData.get('skills'),
          summary:    formData.get('summary'),
          experience: formData.get('experience'),
          education:  formData.get('education'),
        });
        setIsGenerating(false);
      }, 2000);
    } else {
      setIsAnalyzing(true);
      setTimeout(() => {
        setAtsScore(Math.floor(Math.random() * (98 - 85 + 1) + 85));
        setIsAnalyzing(false);
      }, 2500);
    }
  };

  const handleViewPDF = async () => {
    if (!resumeRef.current) return;
    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2, useCORS: true, backgroundColor: '#ffffff', logging: false,
      });
      setPreviewImage(canvas.toDataURL('image/png'));
      setShowPreview(true);
    } catch (err) {
      console.error('Preview Generation Failed', err);
    }
  };

  return (
    <section id="resume" className="relative py-32 bg-[#020617] overflow-hidden border-t border-white/5">
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] blur-[120px] rounded-full pointer-events-none"
        style={{ background: `${accentColor}0d` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Header ── */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[8px] font-black uppercase tracking-[0.3em] mb-6 backdrop-blur-xl"
            style={{ color: accentColor }}
          >
            <Sparkles size={12} className="animate-pulse" />
            {badgeText}
          </motion.div>
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] uppercase italic">
            {headline1} <br />
            <span style={{ color: accentColor }}>{headline2}</span>
          </h2>
          <p className="mt-4 text-slate-400 text-[14px] max-w-2xl mx-auto font-medium">
            {bodyText}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-stretch">

          {/* ── LEFT: Form Card ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl flex flex-col justify-between h-full"
          >
            <form ref={formRef} onSubmit={(e) => e.preventDefault()} className="space-y-5">

              {/* Name + Title */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">{fieldNameLabel}</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input name="name" type="text" placeholder={fieldNamePlaceholder}
                      className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none transition-all font-medium text-sm"
                      style={{ '--tw-ring-color': accentColor } as any}
                      onFocus={e => (e.target.style.borderColor = accentColor)}
                      onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.05)')}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">{fieldTitleLabel}</label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input name="title" type="text" placeholder={fieldTitlePlaceholder}
                      className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none transition-all font-medium text-sm"
                      onFocus={e => (e.target.style.borderColor = accentColor)}
                      onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.05)')}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">{fieldEmailLabel}</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input name="email" type="email" placeholder={fieldEmailPlaceholder}
                      className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none transition-all font-medium text-sm"
                      onFocus={e => (e.target.style.borderColor = accentColor)}
                      onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.05)')}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">{fieldPhoneLabel}</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input name="phone" type="text" placeholder={fieldPhonePlaceholder}
                      className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none transition-all font-medium text-sm"
                      onFocus={e => (e.target.style.borderColor = accentColor)}
                      onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.05)')}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">{fieldLocationLabel}</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <input name="location" type="text" placeholder={fieldLocationPH}
                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none transition-all font-medium text-sm"
                    onFocus={e => (e.target.style.borderColor = accentColor)}
                    onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.05)')}
                    required
                  />
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">{fieldSkillsLabel}</label>
                <div className="relative">
                  <Code className="absolute left-4 top-4 text-slate-500" size={16} />
                  <textarea name="skills" placeholder={fieldSkillsPH}
                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-white h-20 focus:outline-none transition-all font-medium text-sm resize-none"
                    onFocus={e => (e.target.style.borderColor = accentColor)}
                    onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.05)')}
                    required
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">{fieldSummaryLabel}</label>
                <textarea name="summary" placeholder={fieldSummaryPH}
                  className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 px-6 text-white h-24 focus:outline-none transition-all font-medium text-sm resize-none"
                  onFocus={e => (e.target.style.borderColor = accentColor)}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.05)')}
                  required
                />
              </div>

              {/* Experience */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">{fieldExpLabel}</label>
                <textarea name="experience" placeholder={fieldExpPH}
                  className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 px-6 text-white h-24 focus:outline-none transition-all font-medium text-sm resize-none"
                  onFocus={e => (e.target.style.borderColor = accentColor)}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.05)')}
                  required
                />
              </div>

              {/* Education */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">{fieldEduLabel}</label>
                <div className="relative">
                  <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <input name="education" type="text" placeholder={fieldEduPH}
                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none transition-all font-medium text-sm"
                    onFocus={e => (e.target.style.borderColor = accentColor)}
                    onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.05)')}
                    required
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <button
                  onClick={() => handleAction('generate')}
                  disabled={isGenerating}
                  className="py-5 text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-50"
                  style={{ background: accentColor, boxShadow: `0 8px 24px ${accentColor}40` }}
                >
                  {isGenerating
                    ? <Activity className="animate-spin" size={18} />
                    : <>{generateBtnLabel} <Send size={16} /></>
                  }
                </button>
                <button
                  onClick={() => handleAction('analyze')}
                  disabled={isAnalyzing}
                  className="py-5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isAnalyzing
                    ? <Loader2 className="animate-spin" size={18} style={{ color: accentColor }} />
                    : <>{analyzeBtnLabel} <Search size={16} /></>
                  }
                </button>
              </div>
            </form>
          </motion.div>

          {/* ── RIGHT: Preview Card ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex flex-col h-full"
          >
            <div className="relative flex-grow bg-white/[0.02] border border-white/10 rounded-[3rem] p-8 overflow-hidden backdrop-blur-md shadow-2xl flex flex-col">

              {/* Model badge */}
              <div
                className="absolute top-6 right-6 z-20 flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-md"
                style={{ background: 'rgba(0,0,0,0.4)', border: `1px solid ${accentColor}33` }}
              >
                <Zap size={10} className="fill-yellow-400" style={{ color: '#facc15' }} />
                <span className="text-[9px] font-black text-white uppercase tracking-widest">{modelBadgeLabel}</span>
              </div>

              {/* Hidden A4 resume (used for html2canvas capture) */}
              <div className="fixed top-0 left-0 -z-50 opacity-0 pointer-events-none">
                <div ref={resumeRef} className="w-[210mm] min-h-[297mm] bg-white text-gray-900 shadow-lg font-sans">
                  <div className="bg-[#0f172a] text-white p-10 flex items-center gap-8">
                    <div className="w-32 h-32 rounded-2xl bg-slate-800 border-4 border-white/10 flex items-center justify-center overflow-hidden">
                      <User size={60} className="text-slate-600" />
                    </div>
                    <div>
                      <h1 className="text-4xl font-black uppercase tracking-tight mb-2">{resumeData?.name || 'YOUR NAME'}</h1>
                      <p className="font-bold text-lg uppercase tracking-widest mb-4" style={{ color: accentColor }}>{resumeData?.title || 'JOB TITLE'}</p>
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-300 font-medium">
                        {resumeData?.email    && <div className="flex items-center gap-2"><Mail size={12} /> {resumeData.email}</div>}
                        {resumeData?.phone    && <div className="flex items-center gap-2"><Phone size={12} /> {resumeData.phone}</div>}
                        {resumeData?.location && <div className="flex items-center gap-2"><MapPin size={12} /> {resumeData.location}</div>}
                      </div>
                    </div>
                  </div>
                  <div className="p-10 grid grid-cols-12 gap-8">
                    <div className="col-span-4 space-y-8 border-r border-gray-100 pr-6">
                      <div>
                        <h3 className="text-xs font-black uppercase tracking-widest mb-3 border-b-2 pb-1" style={{ color: accentColor, borderColor: `${accentColor}33` }}>{previewSkillsLabel}</h3>
                        <div className="flex flex-wrap gap-2">
                          {(resumeData?.skills || 'React, Next.js').split(',').map((skill: string, i: number) => (
                            <span key={i} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-[10px] font-bold uppercase">{skill.trim()}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xs font-black uppercase tracking-widest mb-3 border-b-2 pb-1" style={{ color: accentColor, borderColor: `${accentColor}33` }}>{previewEduLabel}</h3>
                        <p className="font-bold text-sm text-gray-800">{resumeData?.education || 'University Name'}</p>
                      </div>
                    </div>
                    <div className="col-span-8 space-y-8">
                      <div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3 border-b border-gray-200 pb-1">{previewSummaryLabel}</h3>
                        <p className="text-sm leading-relaxed text-gray-700 font-medium">{resumeData?.summary || 'Summary...'}</p>
                      </div>
                      <div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3 border-b border-gray-200 pb-1">Experience</h3>
                        <div className="prose prose-sm text-gray-700 whitespace-pre-line leading-relaxed">{resumeData?.experience || 'Experience details...'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visible preview panel */}
              <div className="relative w-full h-full bg-white rounded-2xl shadow-inner overflow-hidden flex flex-col">
                {!resumeData ? (
                  <div className="absolute inset-0 bg-[#0f172a] flex flex-col items-center justify-center p-8 text-center z-10">
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
                      <FileText size={40} className="animate-pulse" style={{ color: accentColor }} />
                    </div>
                    <span className="text-white font-black uppercase tracking-widest text-xs">{previewNodeLabel}</span>
                    <p className="text-slate-500 text-[10px] mt-3 uppercase font-bold tracking-tighter">
                      {previewNodeSubtitle} {modelBadgeLabel}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col h-full bg-white text-black overflow-y-auto custom-scrollbar">
                    <div className="bg-[#0f172a] text-white p-6 shrink-0 flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg bg-slate-800 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                        <Camera size={24} className="text-slate-600" />
                      </div>
                      <div>
                        <h2 className="text-lg font-black uppercase tracking-tight leading-none">{resumeData.name}</h2>
                        <p className="font-bold text-[9px] uppercase tracking-widest mt-1" style={{ color: accentColor }}>{resumeData.title}</p>
                      </div>
                    </div>
                    <div className="p-6 space-y-6">
                      {atsScore && (
                        <div className="border p-3 rounded-xl flex items-center justify-between" style={{ background: `${accentColor}0d`, borderColor: `${accentColor}33` }}>
                          <div className="flex items-center gap-2">
                            <ShieldCheck size={16} style={{ color: accentColor }} />
                            <span className="text-[10px] font-black uppercase" style={{ color: accentColor }}>{atsScoreLabel}</span>
                          </div>
                          <span className="text-lg font-black" style={{ color: accentColor }}>{atsScore}%</span>
                        </div>
                      )}
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 border-b border-gray-100 pb-1">{previewSummaryLabel}</p>
                        <p className="text-[11px] text-gray-700 leading-relaxed font-medium">{resumeData.summary}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: accentColor }}>{previewSkillsLabel}</p>
                          <div className="flex flex-wrap gap-1">
                            {resumeData.skills.split(',').map((s: string, i: number) => (
                              <span key={i} className="px-2 py-1 bg-gray-100 border border-gray-200 rounded text-[8px] font-bold text-gray-600 uppercase">{s.trim()}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: accentColor }}>{previewEduLabel}</p>
                          <p className="text-[10px] font-bold text-gray-800 leading-tight">{resumeData.education}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* PDF / Awaiting button */}
            <div className="mt-6">
              {resumeData ? (
                <button
                  onClick={handleViewPDF}
                  className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-black uppercase text-xs tracking-widest rounded-2xl transition-all flex items-center justify-center gap-3 active:scale-95"
                  style={{ boxShadow: '0 0 30px rgba(34,197,94,0.4)' }}
                >
                  <Eye size={18} /> {pdfBtnLabel}
                </button>
              ) : (
                <div className="w-full py-4 bg-white/5 border border-white/5 text-slate-500 font-black uppercase text-xs tracking-widest rounded-2xl flex items-center justify-center gap-2 cursor-not-allowed">
                  <LayoutDashboard size={16} className="animate-pulse" /> {awaitingLabel}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── PDF Preview Modal ── */}
      <AnimatePresence>
        {showPreview && previewImage && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex justify-center items-center p-4 sm:p-8"
          >
            <div className="relative w-full max-w-4xl h-full flex flex-col">
              <div className="flex justify-between items-center mb-4 px-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg" style={{ background: accentColor }}>
                    <FileText className="text-white" size={16} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm tracking-wide italic">{pdfFilename}</h3>
                    <p className="text-slate-400 text-[10px] font-medium uppercase tracking-widest">{pdfSubtitle}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPreview(false)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex-grow bg-[#525659] rounded-2xl overflow-hidden shadow-2xl relative flex justify-center p-8 overflow-y-auto custom-scrollbar">
                <div className="shadow-2xl shadow-black/50">
                  <img src={previewImage} alt="Resume Preview" className="w-full max-w-[210mm] h-auto bg-white" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}