// app/hirex/support/page.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import Link from 'next/link';
import { 
  HelpCircle, MessageSquare, ShieldCheck, Zap, 
  Search, Mail, Phone, MapPin, ChevronRight, 
  Send, Loader2, CheckCircle2, Plus, Minus,
  Activity, Server, Users, Terminal, 
  ArrowRight, Building2
} from 'lucide-react';

const FAQ_DATA = [
  {
    category: "AI Assessments",
    questions: [
      { q: "How does the AI determine my skill score?", a: "Our engine analyzes logic consistency, time complexity of code, and architectural decisions using state-of-the-art LLMs. It looks beyond just 'getting the right answer' to how you approach the problem." },
      { q: "Can I retake a failed assessment?", a: "Standard policy allows a retake after 30 days. This cool-down period ensures candidates have time to upskill before re-attempting the rigorous evaluation." },
      { q: "Is the assessment recorded?", a: "Yes, enterprise-grade proctoring captures screen, audio, and code-editor activity to ensure 100% integrity for hiring managers." }
    ]
  },
  {
    category: "Enterprise Integrations",
    questions: [
      { q: "Does HireX sync with our existing ATS?", a: "Yes. Enterprise partners can use our custom API webhooks to push 360-reports directly into Workday, Greenhouse, or Lever." },
      { q: "How do we customize the grading rubric?", a: "Account admins can access the 'Benchmarks' dashboard to adjust the specific weights for logic, system design, and communication for each open role." }
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
      // Simulated API Call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: 'technical', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const CONTACT_NODES = [
    {
      title: "Direct Comm-Link",
      value: "+91 870023 6923",
      subtext: "Available Mon-Fri, 9AM-6PM IST",
      icon: Phone,
      valueAction: "tel:+918700236923",
      action: "https://wa.me/918700236923",
      actionText: "Open WhatsApp"
    },
    {
      title: "Global Inbox",
      value: "info@careerlabconsulting.com",
      subtext: "Average response time: < 2 hours",
      icon: Mail,
      valueAction: "mailto:info@careerlabconsulting.com",
      action: "mailto:info@careerlabconsulting.com",
      actionText: "Send Email"
    },
    {
      title: "HQ Coordinates",
      value: "Gurugram, India",
      subtext: "DLF Cyber City, 5th Floor, Cyber Green-2, Sec-25",
      icon: MapPin,
      valueAction: "https://www.google.com/maps/search/?api=1&query=DLF+Cyber+City,+5th+Floor,+Cyber+Green-2,+Sec-25,+Gurugram,+India",
      action: "https://www.google.com/maps/search/?api=1&query=DLF+Cyber+City,+5th+Floor,+Cyber+Green-2,+Sec-25,+Gurugram,+India",
      actionText: "Open in Google Maps"
    }
  ];

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#020617] text-white selection:bg-blue-500/30">
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full -translate-x-1/3 translate-y-1/3" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <Navbar />

      <div className="relative z-10 pt-28 pb-16 md:pt-40 md:pb-24">
        
        <section className="px-4 sm:px-6 lg:px-8 mb-20 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] md:text-xs font-mono uppercase tracking-widest mb-6">
            <HelpCircle className="w-4 h-4" /> 24/7 Global Support
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
            How can we <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">help you?</span>
          </h1>
          <p className="text-sm sm:text-base md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10">
            Find technical documentation, manage your enterprise account, or initialize a direct transmission to our support engineering team.
          </p>

          <div className="relative max-w-2xl mx-auto group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative flex items-center bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl">
              <Search className="w-6 h-6 text-slate-400 ml-4" />
              <input 
                type="text" 
                placeholder="Search for articles, guides, or API endpoints..." 
                className="w-full bg-transparent border-none px-4 py-3 text-white focus:outline-none placeholder:text-slate-500"
              />
              <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl transition-all hidden sm:block">
                Search
              </button>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 mb-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 hover:bg-slate-900/60 transition-colors group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Terminal className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Technical API Support</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">Integration help, webhook configuration, and ATS syncing issues.</p>
              <div className="flex items-center text-blue-400 text-sm font-bold gap-2">Read Docs <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></div>
            </div>

            <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 hover:bg-slate-900/60 transition-colors group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Candidate Help</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">Assessment resets, proctoring issues, or skill report clarifications.</p>
              <div className="flex items-center text-emerald-400 text-sm font-bold gap-2">View Guide <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></div>
            </div>

            <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 hover:bg-slate-900/60 transition-colors group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Building2 className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Enterprise Sales</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">Upgrade plans, custom AI models, and volume-based hiring.</p>
              <div className="flex items-center text-purple-400 text-sm font-bold gap-2">Contact Sales <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></div>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 mb-24 max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-emerald-900/20 to-slate-900/40 border border-emerald-500/20 rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full"></div>
            
            <div className="flex items-center gap-6 relative z-10 w-full md:w-auto">
              <div className="relative flex h-12 w-12 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-20"></span>
                <span className="relative inline-flex rounded-full h-12 w-12 bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-emerald-400" />
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">All Systems Operational</h3>
                <p className="text-sm text-slate-400">HireX AI Evaluator and TiDB clusters are running optimally.</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 w-full md:w-auto relative z-10">
              <div className="bg-black/30 border border-white/5 px-4 py-2 rounded-xl flex items-center gap-3">
                <Server className="w-4 h-4 text-slate-400" />
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">API Uptime</p>
                  <p className="text-sm font-mono text-emerald-400 font-bold">99.99%</p>
                </div>
              </div>
              <div className="bg-black/30 border border-white/5 px-4 py-2 rounded-xl flex items-center gap-3">
                <Zap className="w-4 h-4 text-slate-400" />
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Avg Latency</p>
                  <p className="text-sm font-mono text-emerald-400 font-bold">42ms</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 mb-24 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            <div className="lg:col-span-7 space-y-10">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                {CONTACT_NODES.slice(0,2).map((node, index) => (
                  <div key={index} className="bg-slate-900/40 border border-white/10 p-6 rounded-2xl backdrop-blur-md hover:border-blue-500/30 transition-colors">
                    <node.icon className="text-blue-400 w-6 h-6 mb-4" />
                    <h4 className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-2">{node.title}</h4>
                    <a 
                      href={node.valueAction} 
                      className="text-lg font-bold text-white hover:text-blue-400 transition-colors inline-block mb-1 break-all"
                    >
                      {node.value}
                    </a>
                  </div>
                ))}
                
                <div className="sm:col-span-2 bg-slate-900/40 border border-white/10 p-6 rounded-2xl backdrop-blur-md hover:border-blue-500/30 transition-colors">
                  <MapPin className="text-blue-400 w-6 h-6 mb-4" />
                  <h4 className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-2">{CONTACT_NODES[2].title}</h4>
                  <a 
                    href={CONTACT_NODES[2].valueAction} 
                    target="_blank"
                    className="text-base sm:text-lg font-bold text-white hover:text-blue-400 transition-colors inline-block"
                  >
                    {CONTACT_NODES[2].subtext}, {CONTACT_NODES[2].value}
                  </a>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-4">Knowledge Base</h2>
                <p className="text-slate-400 mb-8">Browse our most frequently asked questions before submitting a ticket.</p>
                
                <div className="space-y-6">
                  {FAQ_DATA.map((cat, i) => (
                    <div key={i} className="space-y-4">
                      <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] ml-2">{cat.category}</p>
                      {cat.questions.map((item, qIdx) => (
                        <div key={qIdx} className="bg-slate-900/40 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300">
                          <button 
                            onClick={() => setOpenFaq(openFaq === item.q ? null : item.q)}
                            className="w-full p-5 flex justify-between items-center text-left hover:bg-white/5 transition-colors"
                          >
                            <span className="text-sm md:text-base font-bold text-slate-200">{item.q}</span>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${openFaq === item.q ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-slate-400'}`}>
                              {openFaq === item.q ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                            </div>
                          </button>
                          {openFaq === item.q && (
                            <div className="px-5 pb-5 text-sm text-slate-400 leading-relaxed animate-in slide-in-from-top-2 duration-300 border-t border-white/5 pt-4 mt-1">
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

            <div className="lg:col-span-5">
              <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 sticky top-32 shadow-[0_0_50px_rgba(0,0,0,0.3)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />
                
                <h3 className="text-2xl font-bold mb-2 relative z-10">Direct Transmission</h3>
                <p className="text-slate-400 text-sm mb-8 relative z-10">Average human response time: &lt; 2 hours</p>

                {submitted ? (
                  <div className="py-20 text-center animate-in zoom-in duration-300 relative z-10">
                    <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Message Received</h3>
                    <p className="text-slate-400 text-sm leading-relaxed px-6">Our support engineers have received your transmission and are reviewing the logs.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1 mb-2 block">Full Name</label>
                      <input 
                        required type="text" placeholder="John Doe"
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-blue-500 outline-none transition-all placeholder:text-slate-600"
                        value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1 mb-2 block">Work Email</label>
                      <input 
                        required type="email" placeholder="john@enterprise.com"
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-blue-500 outline-none transition-all placeholder:text-slate-600"
                        value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1 mb-2 block">Support Category</label>
                      <select 
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
                        value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundPosition: `right 1rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em` }}
                      >
                        <option value="technical" className="bg-slate-900">Technical Issue</option>
                        <option value="enterprise" className="bg-slate-900">Enterprise Sales</option>
                        <option value="billing" className="bg-slate-900">Billing Inquiry</option>
                        <option value="other" className="bg-slate-900">Other Inquiry</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1 mb-2 block">Message Detail</label>
                      <textarea 
                        required rows={4} placeholder="Describe your bottleneck..."
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-blue-500 outline-none transition-all resize-none placeholder:text-slate-600"
                        value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                      />
                    </div>
                    
                    <button 
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] mt-2 transition-all"
                    >
                      {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /> Initialize Ticket</>}
                    </button>
                    <p className="text-[10px] text-center text-slate-500 uppercase tracking-widest font-mono mt-4">Secure End-to-End Encryption</p>
                  </form>
                )}
              </div>
            </div>

          </div>
        </section>

      </div>

      <Footer />
      
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  );
}