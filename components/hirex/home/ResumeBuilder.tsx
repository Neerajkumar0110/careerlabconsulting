'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Sparkles, User, Briefcase, Code, Send, Eye, 
  Activity, Zap, Mail, Phone, GraduationCap, MapPin, X, Loader2,
  Search, Camera, ShieldCheck, LayoutDashboard
} from 'lucide-react';
import html2canvas from 'html2canvas';

export default function ResumeBuilder() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [resumeData, setResumeData] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const resumeRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleAction = (type: 'generate' | 'analyze') => {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    
    if (type === 'generate') {
      setIsGenerating(true);
      setTimeout(() => {
        setResumeData({
          name: formData.get('name'),
          title: formData.get('title'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          location: formData.get('location'),
          skills: formData.get('skills'),
          summary: formData.get('summary'),
          experience: formData.get('experience'),
          education: formData.get('education'),
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
        scale: 2, 
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false
      });
      const imgData = canvas.toDataURL('image/png');
      setPreviewImage(imgData);
      setShowPreview(true);
    } catch (err) {
      console.error("Preview Generation Failed", err);
    }
  };

  return (
    <section id="resume" className="relative py-32 bg-[#020617] overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-400 text-[8px] font-black uppercase tracking-[0.3em] mb-6 backdrop-blur-xl"
          >
            <Sparkles size={12} className="animate-pulse" />
            Autonomous Resume Protocol V2.5
          </motion.div>
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] uppercase italic">
            Orchestrate <br /> <span className="text-blue-500">Empire Resume.</span>
          </h2>
          <p className="mt-4 text-slate-400 text-[14px] max-w-2xl mx-auto font-medium">
            Fill your neural parameters. Manee Pro 2.5 Flash will orchestrate a professional A4-standard resume synced with your 360° metrics.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-stretch">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl flex flex-col justify-between h-full"
          >
            <form ref={formRef} onSubmit={(e) => e.preventDefault()} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input name="name" type="text" placeholder="Deepanshu Joshi" className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-white focus:border-blue-500 outline-none transition-all font-medium text-sm" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Job Title</label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input name="title" type="text" placeholder="Full Stack Developer" className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-white focus:border-blue-500 outline-none transition-all font-medium text-sm" required />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input name="email" type="email" placeholder="dev@hirex.ai" className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-white focus:border-blue-500 outline-none transition-all font-medium text-sm" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input name="phone" type="text" placeholder="+91 98765 43210" className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-white focus:border-blue-500 outline-none transition-all font-medium text-sm" required />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <input name="location" type="text" placeholder="Delhi, India" className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-white focus:border-blue-500 outline-none transition-all font-medium text-sm" required />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Core Skills</label>
                <div className="relative">
                  <Code className="absolute left-4 top-4 text-slate-500" size={16} />
                  <textarea name="skills" placeholder="Next.js, React, Node.js, TypeScript, SQL, Prisma..." className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-white h-20 focus:border-blue-500 outline-none transition-all font-medium text-sm resize-none" required />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Professional Summary</label>
                <textarea name="summary" placeholder="A high-performance developer building AI-Native architectures..." className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 px-6 text-white h-24 focus:border-blue-500 outline-none transition-all font-medium text-sm resize-none" required />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Experience & Projects</label>
                <textarea name="experience" placeholder="• Built an autonomous hiring platform using Next.js&#10;• Reduced latency by 40% using Edge Functions" className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 px-6 text-white h-24 focus:border-blue-500 outline-none transition-all font-medium text-sm resize-none" required />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Education</label>
                <div className="relative">
                  <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <input name="education" type="text" placeholder="B.Tech in Computer Science, IIT Delhi" className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-white focus:border-blue-500 outline-none transition-all font-medium text-sm" required />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <button 
                  onClick={() => handleAction('generate')}
                  disabled={isGenerating}
                  className="py-5 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isGenerating ? <Activity className="animate-spin" size={18} /> : <>Orchestrate Resume <Send size={16} /></>}
                </button>
                
                <button 
                  onClick={() => handleAction('analyze')}
                  disabled={isAnalyzing}
                  className="py-5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isAnalyzing ? <Loader2 className="animate-spin text-blue-400" size={18} /> : <>Resume Analyzer <Search size={16} /></>}
                </button>
              </div>
            </form>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex flex-col h-full"
          >
            <div className="relative flex-grow bg-white/[0.02] border border-white/10 rounded-[3rem] p-8 overflow-hidden backdrop-blur-md shadow-2xl flex flex-col">
              
              <div className="absolute top-6 right-6 z-20 flex items-center gap-2 px-3 py-1 bg-black/40 rounded-full border border-blue-500/20 backdrop-blur-md">
                <Zap size={10} className="text-yellow-400 fill-yellow-400 animate-pulse" />
                <span className="text-[9px] font-black text-white uppercase tracking-widest">Manee Pro 2.5 Flash</span>
              </div>

              <div className="fixed top-0 left-0 -z-50 opacity-0 pointer-events-none">
                  <div ref={resumeRef} className="w-[210mm] min-h-[297mm] bg-white text-gray-900 shadow-lg font-sans">
                      <div className="bg-[#0f172a] text-white p-10 flex items-center gap-8">
                          <div className="w-32 h-32 rounded-2xl bg-slate-800 border-4 border-white/10 flex items-center justify-center overflow-hidden">
                              <User size={60} className="text-slate-600" />
                          </div>
                          <div>
                            <h1 className="text-4xl font-black uppercase tracking-tight mb-2">{resumeData?.name || "YOUR NAME"}</h1>
                            <p className="text-blue-400 font-bold text-lg uppercase tracking-widest mb-4">{resumeData?.title || "JOB TITLE"}</p>
                            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-300 font-medium">
                                {resumeData?.email && <div className="flex items-center gap-2"><Mail size={12} /> {resumeData.email}</div>}
                                {resumeData?.phone && <div className="flex items-center gap-2"><Phone size={12} /> {resumeData.phone}</div>}
                                {resumeData?.location && <div className="flex items-center gap-2"><MapPin size={12} /> {resumeData.location}</div>}
                            </div>
                          </div>
                      </div>
                      <div className="p-10 grid grid-cols-12 gap-8">
                          <div className="col-span-4 space-y-8 border-r border-gray-100 pr-6">
                              <div>
                                  <h3 className="text-xs font-black uppercase tracking-widest text-blue-600 mb-3 border-b-2 border-blue-100 pb-1">Skills</h3>
                                  <div className="flex flex-wrap gap-2">
                                      {(resumeData?.skills || "React, Next.js").split(',').map((skill: string, i: number) => (
                                          <span key={i} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-[10px] font-bold uppercase">{skill.trim()}</span>
                                      ))}
                                  </div>
                              </div>
                              <div>
                                  <h3 className="text-xs font-black uppercase tracking-widest text-blue-600 mb-3 border-b-2 border-blue-100 pb-1">Education</h3>
                                  <p className="font-bold text-sm text-gray-800">{resumeData?.education || "University Name"}</p>
                              </div>
                          </div>
                          <div className="col-span-8 space-y-8">
                              <div>
                                  <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3 border-b border-gray-200 pb-1">Professional Profile</h3>
                                  <p className="text-sm leading-relaxed text-gray-700 font-medium">{resumeData?.summary || "Summary..."}</p>
                              </div>
                              <div>
                                  <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3 border-b border-gray-200 pb-1">Experience</h3>
                                  <div className="prose prose-sm text-gray-700 whitespace-pre-line leading-relaxed">{resumeData?.experience || "Experience details..."}</div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              <div className="relative w-full h-full bg-white rounded-2xl shadow-inner overflow-hidden flex flex-col">
                {!resumeData ? (
                  <div className="absolute inset-0 bg-[#0f172a] flex flex-col items-center justify-center p-8 text-center z-10">
                      <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
                        <FileText className="text-blue-500 animate-pulse" size={40} />
                      </div>
                      <span className="text-white font-black uppercase tracking-widest text-xs">Live Preview Node</span>
                      <p className="text-slate-500 text-[10px] mt-3 uppercase font-bold tracking-tighter">Enter Details to Sync with Manee Pro 2.5 Flash</p>
                  </div>
                ) : (
                  <div className="flex flex-col h-full bg-white text-black overflow-y-auto custom-scrollbar">
                     <div className="bg-[#0f172a] text-white p-6 shrink-0 flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg bg-slate-800 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                           <Camera size={24} className="text-slate-600" />
                        </div>
                        <div>
                          <h2 className="text-lg font-black uppercase tracking-tight leading-none">{resumeData.name}</h2>
                          <p className="text-blue-400 font-bold text-[9px] uppercase tracking-widest mt-1">{resumeData.title}</p>
                        </div>
                     </div>
                     <div className="p-6 space-y-6">
                        {atsScore && (
                          <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <ShieldCheck className="text-blue-600" size={16} />
                              <span className="text-[10px] font-black uppercase text-blue-900">ATS Optimization Score</span>
                            </div>
                            <span className="text-lg font-black text-blue-600">{atsScore}%</span>
                          </div>
                        )}
                        <div>
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 border-b border-gray-100 pb-1">Profile Summary</p>
                           <p className="text-[11px] text-gray-700 leading-relaxed font-medium">{resumeData.summary}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div>
                              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Key Skills</p>
                              <div className="flex flex-wrap gap-1">
                                  {resumeData.skills.split(',').map((s: string, i: number) => (
                                    <span key={i} className="px-2 py-1 bg-gray-100 border border-gray-200 rounded text-[8px] font-bold text-gray-600 uppercase">{s.trim()}</span>
                                  ))}
                              </div>
                           </div>
                           <div>
                              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Education</p>
                              <p className="text-[10px] font-bold text-gray-800 leading-tight">{resumeData.education}</p>
                           </div>
                        </div>
                     </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6">
               {resumeData ? (
                 <button onClick={handleViewPDF} className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-black uppercase text-xs tracking-widest rounded-2xl shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all flex items-center justify-center gap-3 active:scale-95">
                   <Eye size={18} /> View Professional PDF
                 </button>
               ) : (
                 <div className="w-full py-4 bg-white/5 border border-white/5 text-slate-500 font-black uppercase text-xs tracking-widest rounded-2xl flex items-center justify-center gap-2 cursor-not-allowed">
                   <LayoutDashboard size={16} className="animate-pulse" /> Awaiting Data Protocol
                 </div>
               )}
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {showPreview && previewImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex justify-center items-center p-4 sm:p-8">
            <div className="relative w-full max-w-4xl h-full flex flex-col">
              <div className="flex justify-between items-center mb-4 px-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg"><FileText className="text-white" size={16} /></div>
                  <div>
                    <h3 className="text-white font-bold text-sm tracking-wide italic">EMPIRE_RESUME_SYNC.pdf</h3>
                    <p className="text-slate-400 text-[10px] font-medium uppercase tracking-widest">A4 Standard Preview</p>
                  </div>
                </div>
                <button onClick={() => setShowPreview(false)} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"><X size={20} /></button>
              </div>
              <div className="flex-grow bg-[#525659] rounded-2xl overflow-hidden shadow-2xl relative flex justify-center p-8 overflow-y-auto custom-scrollbar">
                <div className="shadow-2xl shadow-black/50"><img src={previewImage} alt="Resume Preview" className="w-full max-w-[210mm] h-auto bg-white" /></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}