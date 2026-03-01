// app/hirex/support/page.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import { 
  HelpCircle, MessageSquare, ShieldCheck, Zap, 
  Search, Mail, Phone, MapPin, ChevronRight, 
  Send, Loader2, CheckCircle2, X, Plus, Minus
} from 'lucide-react';

const FAQ_DATA = [
  {
    category: "Assessments",
    questions: [
      { q: "How does the AI determine my skill score?", a: "Our engine analyzes logic consistency, time complexity of code, and architectural decisions using Manee 2.5 Flash API." },
      { q: "Can I retake a failed assessment?", a: "Standard policy allows a retake after 30 days to ensure skill progression." }
    ]
  },
  {
    category: "Integrations",
    questions: [
      { q: "Does HireX sync with GitHub?", a: "Yes, our autonomous agents scan public repositories to quantify repository impact and technical depth." },
      { q: "Can we integrate HireX with our ATS?", a: "Enterprise partners can use our custom API endpoints to sync candidate reports directly." }
    ]
  }
];

export default function SupportPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'technical', message: '' });
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/hirex-support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, company: 'Support Center Inquiry' }),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: 'technical', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (err) {
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#020617] text-white selection:bg-blue-500/30">
      
      {/* Dynamic Background Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-full md:w-[800px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-full md:w-[600px] h-[400px] bg-purple-600/5 blur-[100px] rounded-full -translate-x-1/4 translate-y-1/4" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <Navbar />

      <div className="relative z-10 pt-28 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <div className="max-w-4xl mx-auto text-center mb-12 md:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] md:text-xs font-mono uppercase tracking-widest mb-6">
              <HelpCircle className="w-4 h-4" /> 24/7 Global Support
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
              How can we <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">help you?</span>
            </h1>
            <p className="text-sm md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Find technical documentation, manage your enterprise account, or initialize a direct transmission to our support engineering team.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Col: Contact Info & FAQs */}
            <div className="lg:col-span-7 space-y-12">
              
              {/* Contact Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900/40 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
                   <Phone className="text-blue-400 w-6 h-6 mb-4" />
                   <h4 className="font-bold text-white mb-1">Call Center</h4>
                   <p className="text-sm text-slate-400">+91 870023 6923</p>
                </div>
                <div className="bg-slate-900/40 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
                   <Mail className="text-purple-400 w-6 h-6 mb-4" />
                   <h4 className="font-bold text-white mb-1">Email Support</h4>
                   <p className="text-sm text-slate-400">info@careerlabconsulting.com</p>
                </div>
              </div>

              {/* FAQ Accordion */}
              <div>
                <h3 className="text-2xl font-bold mb-8">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {FAQ_DATA.map((cat, i) => (
                    <div key={i} className="space-y-4">
                      <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">{cat.category}</p>
                      {cat.questions.map((item, qIdx) => (
                        <div key={qIdx} className="bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden">
                          <button 
                            onClick={() => setOpenFaq(openFaq === item.q ? null : item.q)}
                            className="w-full p-4 flex justify-between items-center text-left hover:bg-white/5 transition-colors"
                          >
                            <span className="text-sm font-medium text-slate-200">{item.q}</span>
                            {openFaq === item.q ? <Minus className="w-4 h-4 text-blue-400" /> : <Plus className="w-4 h-4 text-slate-500" />}
                          </button>
                          {openFaq === item.q && (
                            <div className="px-4 pb-4 text-xs md:text-sm text-slate-400 animate-in slide-in-from-top-2 duration-300">
                              {item.a}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Col: Support Form */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/60 border border-white/10 rounded-[2.5rem] p-8 md:p-10 sticky top-32 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full" />
                
                <h3 className="text-2xl font-bold mb-2">Direct Transmission</h3>
                <p className="text-slate-400 text-sm mb-8">Average response time: &lt; 2 hours</p>

                {submitted ? (
                  <div className="py-20 text-center animate-in zoom-in duration-300">
                    <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Message Received</h3>
                    <p className="text-slate-400 text-sm leading-relaxed px-6">Our support engineers have received your transmission and are reviewing the logs.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Full Name</label>
                      <input 
                        required type="text" placeholder="John Doe"
                        className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-blue-500 outline-none transition-all mt-1"
                        value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Work Email</label>
                      <input 
                        required type="email" placeholder="john@enterprise.com"
                        className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-blue-500 outline-none transition-all mt-1"
                        value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Support Category</label>
                      <select 
                        className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-blue-500 outline-none transition-all mt-1 appearance-none"
                        value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}
                      >
                        <option value="technical" className="bg-[#0b0f1f]">Technical Issue</option>
                        <option value="enterprise" className="bg-[#0b0f1f]">Enterprise Sales</option>
                        <option value="billing" className="bg-[#0b0f1f]">Billing Inquiry</option>
                        <option value="other" className="bg-[#0b0f1f]">Other Inquiry</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Message Detail</label>
                      <textarea 
                        required rows={4} placeholder="Describe your bottleneck..."
                        className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-blue-500 outline-none transition-all mt-1 resize-none"
                        value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                      />
                    </div>
                    
                    <button 
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 mt-6 transition-all"
                    >
                      {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /> Send Transmission</>}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}