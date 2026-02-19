'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Sparkles, User, Briefcase, Code, Send, Eye, 
  Activity, Zap, Mail, Phone, GraduationCap, MapPin, X, Loader2
} from 'lucide-react';
import html2canvas from 'html2canvas';

export default function ResumeBuilder() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [resumeData, setResumeData] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    setTimeout(() => {
      const formData = new FormData(e.target as HTMLFormElement);
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
  };

  const handleViewPDF = async () => {
    if (!resumeRef.current) return;
    
    // Show Loading state if needed, or instant open
    try {
      // High-Scale capture for crisp text
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
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6 backdrop-blur-xl"
          >
            <Sparkles size={12} className="animate-pulse" />
            Autonomous Resume Protocol
          </motion.div>
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] uppercase italic">
            Orchestrate <br /> <span className="text-blue-500">Empire Resume.</span>
          </h2>
          <p className="mt-8 text-slate-400 text-lg max-w-2xl mx-auto font-medium">
            Fill your neural parameters. Manee Pro 2.5 Flash will orchestrate a professional A4-standard resume synced with your 360° metrics.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-stretch">
          
          {/* LEFT: INPUT FORM */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl flex flex-col justify-between h-full"
          >
            <form onSubmit={handleGenerate} className="space-y-5">
              
              {/* Row 1 */}
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

              {/* Row 2 - Contacts */}
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

              {/* Row 3 - Location */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <input name="location" type="text" placeholder="Delhi, India" className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-white focus:border-blue-500 outline-none transition-all font-medium text-sm" required />
                </div>
              </div>

              {/* Row 4 - Skills */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Core Skills</label>
                <div className="relative">
                  <Code className="absolute left-4 top-4 text-slate-500" size={16} />
                  <textarea name="skills" placeholder="Next.js, React, Node.js, TypeScript, SQL, Prisma..." className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-white h-20 focus:border-blue-500 outline-none transition-all font-medium text-sm resize-none" required />
                </div>
              </div>

              {/* Row 5 - Summaries */}
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

              <button 
                type="submit" 
                disabled={isGenerating}
                className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase text-xs tracking-[0.3em] rounded-2xl transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)] flex items-center justify-center gap-3 disabled:opacity-50 mt-4"
              >
                {isGenerating ? (
                  <Activity className="animate-spin" size={18} />
                ) : (
                  <>Orchestrate Resume <Send size={16} /></>
                )}
              </button>
            </form>
          </motion.div>

          {/* RIGHT: PREVIEW NODE */}
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

              {/* -------------------------------------------
                  REAL A4 PDF TEMPLATE (Hidden but Rendered) 
                  Fixed: Using fixed position behind everything
              -------------------------------------------- */}
              <div className="fixed top-0 left-0 -z-50 opacity-0 pointer-events-none">
                  <div ref={resumeRef} className="w-[210mm] min-h-[297mm] bg-white text-gray-900 shadow-lg font-sans">
                      {/* PDF Header */}
                      <div className="bg-[#0f172a] text-white p-10">
                          <h1 className="text-4xl font-black uppercase tracking-tight mb-2">{resumeData?.name || "YOUR NAME"}</h1>
                          <p className="text-blue-400 font-bold text-lg uppercase tracking-widest mb-6">{resumeData?.title || "JOB TITLE"}</p>
                          
                          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-300 font-medium">
                              {resumeData?.email && <div className="flex items-center gap-2"><Mail size={12} /> {resumeData.email}</div>}
                              {resumeData?.phone && <div className="flex items-center gap-2"><Phone size={12} /> {resumeData.phone}</div>}
                              {resumeData?.location && <div className="flex items-center gap-2"><MapPin size={12} /> {resumeData.location}</div>}
                          </div>
                      </div>

                      {/* PDF Body: Two Columns */}
                      <div className="p-10 grid grid-cols-12 gap-8">
                          {/* Left Column (35%) */}
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
                                  <div className="flex items-start gap-2">
                                    <GraduationCap size={14} className="text-gray-400 mt-0.5 shrink-0" />
                                    <p className="font-bold text-sm text-gray-800">{resumeData?.education || "University Name"}</p>
                                  </div>
                              </div>
                          </div>

                          {/* Right Column (65%) */}
                          <div className="col-span-8 space-y-8">
                              <div>
                                  <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3 border-b border-gray-200 pb-1">Professional Profile</h3>
                                  <p className="text-sm leading-relaxed text-gray-700 font-medium">
                                      {resumeData?.summary || "Summary of your professional background..."}
                                  </p>
                              </div>
                              <div>
                                  <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3 border-b border-gray-200 pb-1">Experience</h3>
                                  <div className="prose prose-sm text-gray-700 whitespace-pre-line leading-relaxed">
                                      {resumeData?.experience || "• Led development of..."}
                                  </div>
                              </div>
                          </div>
                      </div>

                      {/* Footer */}
                      <div className="p-10 mt-auto">
                        <div className="pt-4 border-t border-gray-200 flex justify-between items-center opacity-60">
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Verified by HireX Empire</span>
                            <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest">AI-Verified Score: A+</span>
                        </div>
                      </div>
                  </div>
              </div>

              {/* LIVE VISUAL PREVIEW */}
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
                     <div className="bg-[#0f172a] text-white p-6 shrink-0">
                        <h2 className="text-xl font-black uppercase tracking-tight">{resumeData.name}</h2>
                        <p className="text-blue-400 font-bold text-[10px] uppercase tracking-widest mt-1">{resumeData.title}</p>
                        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[9px] text-gray-400">
                           <span>{resumeData.email}</span>
                           <span>{resumeData.phone}</span>
                           <span>{resumeData.location}</span>
                        </div>
                     </div>
                     <div className="p-6 space-y-6">
                        <div>
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 border-b border-gray-100 pb-1">Profile</p>
                           <p className="text-[11px] text-gray-700 leading-relaxed font-medium">{resumeData.summary}</p>
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 border-b border-gray-100 pb-1">Experience</p>
                           <p className="text-[11px] text-gray-700 leading-relaxed font-medium whitespace-pre-line">{resumeData.experience}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div>
                              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Skills</p>
                              <div className="flex flex-wrap gap-1">
                                  {resumeData.skills.split(',').map((s: string, i: number) => (
                                    <span key={i} className="px-2 py-1 bg-gray-100 border border-gray-200 rounded text-[9px] font-bold text-gray-600 uppercase">{s.trim()}</span>
                                  ))}
                              </div>
                           </div>
                           <div>
                              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Education</p>
                              <p className="text-[10px] font-bold text-gray-800">{resumeData.education}</p>
                           </div>
                        </div>
                     </div>
                  </div>
                )}
              </div>
            </div>

            {/* ACTION BUTTON */}
            <div className="mt-6">
               {resumeData ? (
                 <button onClick={handleViewPDF} className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-black uppercase text-xs tracking-widest rounded-2xl shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all flex items-center justify-center gap-3 active:scale-95">
                   <Eye size={18} /> View Resume PDF
                 </button>
               ) : (
                 <div className="w-full py-4 bg-white/5 border border-white/5 text-slate-500 font-black uppercase text-xs tracking-widest rounded-2xl flex items-center justify-center gap-2 cursor-not-allowed">
                   <Activity size={16} className="animate-pulse" /> Awaiting Neural Data
                 </div>
               )}
            </div>
          </motion.div>

        </div>
      </div>

      {/* FULL SCREEN PDF VIEWER MODAL */}
      <AnimatePresence>
        {showPreview && previewImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex justify-center items-center p-4 sm:p-8"
          >
            <div className="relative w-full max-w-4xl h-full flex flex-col">
              {/* Toolbar */}
              <div className="flex justify-between items-center mb-4 px-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center shadow-lg">
                    <FileText className="text-white" size={16} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm tracking-wide">HireX_Resume_Preview.pdf</h3>
                    <p className="text-slate-400 text-[10px] font-medium uppercase tracking-widest">Read Only Mode</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowPreview(false)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* PDF Viewer Container */}
              <div className="flex-grow bg-[#525659] rounded-2xl overflow-hidden shadow-2xl relative flex justify-center p-8 overflow-y-auto custom-scrollbar">
                <div className="shadow-2xl shadow-black/50">
                  {/* The Generated Image displayed as a PDF Page */}
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