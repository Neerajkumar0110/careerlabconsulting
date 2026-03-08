// app/hirex/documentation/page.tsx
'use client';

import React, { useState } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import { 
  BookOpen, Layers, Zap, ShieldCheck, Terminal, BrainCircuit, 
  ChevronRight, Server, Globe, Shield, CheckCircle2, 
  Copy, Check, X, Loader2, Send, Code2, Database, Workflow, Lock
} from 'lucide-react';

export default function DocumentationPage() {
  const [copied, setCopied] = useState(false);
  
  // Popup States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });

  const copyCode = () => {
    const code = `// Initialize AI-Adaptive Logic Engine
import { HireX } from '@hirex/node-sdk';

const hireX = new HireX({
  apiKey: process.env.HIREX_SECRET_KEY,
  engine: "gemini-3-flash",
  mode: "strict-proctoring"
});

const session = await hireX.sessions.create({
  roleId: "req-9901",
  candidateEmail: "candidate@email.com"
});`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Simulate API call for the demo
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitted(true);
      setTimeout(() => {
          setIsModalOpen(false);
          setSubmitted(false);
          setFormData({ name: '', email: '', company: '', message: '' });
      }, 2500);
    } catch (err) {
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#020617] text-white selection:bg-blue-500/30">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-full md:w-[800px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-full md:w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full -translate-x-1/4 translate-y-1/4" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <Navbar />

      <div className="relative z-10 pt-28 pb-16 md:pt-40 md:pb-24">
        
        {/* SECTION 1: Developer Hero */}
        <section className="px-4 sm:px-6 lg:px-8 mb-20 md:mb-32 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] md:text-xs font-mono uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
            <BookOpen className="w-3.5 h-3.5 md:w-4 md:h-4" /> Docs v2.5.0
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Blueprint</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Integrate the world's most advanced autonomous interviewing engine into your ATS. Explore our architecture, secure webhooks, and flexible API endpoints.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <a href="#quickstart" className="bg-white text-slate-900 px-8 py-3.5 rounded-xl font-bold hover:bg-slate-200 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
              Start Building <Terminal className="w-4 h-4" />
            </a>
            <a href="#architecture" className="bg-white/5 border border-white/10 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              Explore Architecture
            </a>
          </div>
        </section>

        {/* SECTION 2: System Architecture */}
        <section id="architecture" className="px-4 sm:px-6 lg:px-8 mb-20 md:mb-32 max-w-7xl mx-auto scroll-mt-24">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">System Architecture</h2>
            <p className="text-slate-400 text-center max-w-2xl">How HireX orchestrates high-fidelity AI models, distributed databases, and your infrastructure in milliseconds.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-slate-900/80 transition-colors duration-300">
              <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                <BrainCircuit className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Neural Evaluator</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Powered by state-of-the-art LLMs, the engine adapts question difficulty in real-time based on the candidate's previous responses.
              </p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-slate-900/80 transition-colors duration-300">
              <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center mb-6">
                <Database className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Distributed TiDB</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Handles high-concurrency interview sessions globally with zero latency. Ensures ACID compliance for all grading parameters and test states.
              </p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-slate-900/80 transition-colors duration-300">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center mb-6">
                <Workflow className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Real-time Webhooks</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Receive instant JSON payloads the second an interview concludes. Sync 360-reports directly into Workday, Lever, or Greenhouse.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: Interactive Quickstart Terminal */}
        <section id="quickstart" className="px-4 sm:px-6 lg:px-8 mb-20 md:mb-32 max-w-5xl mx-auto scroll-mt-24">
          <div className="bg-gradient-to-b from-blue-900/20 to-slate-900/50 border border-blue-500/20 rounded-[2rem] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
              <div className="w-full md:w-[45%]">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Node.js Quickstart</h2>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  Initialize the HireX SDK in your backend to programmatically generate secure AI interview sessions for your candidates.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-mono text-slate-300">npm install @hirex/node-sdk</span>
                </div>
              </div>

              {/* Terminal UI */}
              <div className="w-full md:w-[55%]">
                <div className="bg-[#0b0f1f] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                  {/* MacOS Window Header */}
                  <div className="bg-slate-900/80 px-4 py-3 flex items-center justify-between border-b border-white/5">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <div className="text-xs font-mono text-slate-500">index.ts</div>
                    <button onClick={copyCode} className="text-slate-400 hover:text-white transition-colors" title="Copy Code">
                      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  {/* Code Body */}
                  <div className="p-5 overflow-x-auto">
                    <pre className="text-sm font-mono leading-relaxed">
                      <code className="text-slate-300">
                        <span className="text-slate-500">// Initialize AI-Adaptive Logic Engine</span><br/>
                        <span className="text-purple-400">import</span> {'{ HireX }'} <span className="text-purple-400">from</span> <span className="text-emerald-400">'@hirex/node-sdk'</span>;<br/><br/>
                        <span className="text-blue-400">const</span> hireX = <span className="text-blue-400">new</span> HireX({'{'}<br/>
                        {'  '}apiKey: process.env.<span className="text-yellow-200">HIREX_SECRET_KEY</span>,<br/>
                        {'  '}engine: <span className="text-emerald-400">"gemini-3-flash"</span>,<br/>
                        {'  '}mode: <span className="text-emerald-400">"strict-proctoring"</span><br/>
                        {'}'});<br/><br/>
                        <span className="text-blue-400">const</span> session = <span className="text-purple-400">await</span> hireX.sessions.<span className="text-yellow-200">create</span>({'{'}<br/>
                        {'  '}roleId: <span className="text-emerald-400">"req-9901"</span>,<br/>
                        {'  '}candidateEmail: <span className="text-emerald-400">"candidate@email.com"</span><br/>
                        {'}'});
                      </code>
                    </pre>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 4: Core Capabilities Grid */}
        <section className="px-4 sm:px-6 lg:px-8 mb-20 md:mb-32 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">Core Capabilities</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Advanced features built out-of-the-box for enterprise engineering teams.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 flex items-start gap-5 hover:bg-slate-900/60 transition-colors">
              <div className="bg-blue-500/10 p-3 rounded-xl border border-blue-500/20 shrink-0">
                <Code2 className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Custom Grading Rubrics</h4>
                <p className="text-sm text-slate-400 leading-relaxed">Define exact weights for system design, logic, and clean code. The AI aligns its scoring strictly to your rubric JSON.</p>
              </div>
            </div>
            
            <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 flex items-start gap-5 hover:bg-slate-900/60 transition-colors">
              <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20 shrink-0">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Bias Mitigation Engine</h4>
                <p className="text-sm text-slate-400 leading-relaxed">Identity-blind evaluation. Candidates are judged 100% on output, completely removing pedigree or background bias.</p>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 flex items-start gap-5 hover:bg-slate-900/60 transition-colors">
              <div className="bg-purple-500/10 p-3 rounded-xl border border-purple-500/20 shrink-0">
                <Globe className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Global Auto-Scaling</h4>
                <p className="text-sm text-slate-400 leading-relaxed">Assess 10 or 10,000 candidates simultaneously. Built on TiDB, our infrastructure scales effortlessly during hiring drives.</p>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 flex items-start gap-5 hover:bg-slate-900/60 transition-colors">
              <div className="bg-yellow-500/10 p-3 rounded-xl border border-yellow-500/20 shrink-0">
                <Server className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Idempotent Endpoints</h4>
                <p className="text-sm text-slate-400 leading-relaxed">Safely retry requests without side effects. Our REST APIs are designed for maximum reliability in distributed systems.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Enterprise Security */}
        <section id="security" className="px-4 sm:px-6 lg:px-8 mb-20 md:mb-32 max-w-7xl mx-auto scroll-mt-24">
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-400 to-blue-500"></div>
            
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="md:w-1/3 flex justify-center">
                <div className="w-32 h-32 bg-emerald-500/10 rounded-full border border-emerald-500/30 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                  <Lock className="w-12 h-12 text-emerald-400" />
                </div>
              </div>
              <div className="md:w-2/3 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Enterprise Grade Security</h2>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  Data privacy and assessment integrity are hardcoded into HireX. All candidate data is encrypted in transit and at rest using AES-256. We are fully compliant with global data protection regulations.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold tracking-wider uppercase text-slate-300">SOC 2 Type II</span>
                  <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold tracking-wider uppercase text-slate-300">GDPR Compliant</span>
                  <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold tracking-wider uppercase text-slate-300">E2E Encryption</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Support Hub CTA */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <div className="p-8 md:p-12 rounded-[2rem] bg-gradient-to-br from-blue-600 to-indigo-900 border border-blue-400/30 shadow-2xl shadow-blue-900/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Need Integration Support?</h2>
              <p className="text-blue-100 mb-8 max-w-lg mx-auto">
                Our solutions engineering team is ready to help you map your custom tech stack to our AI engine.
              </p>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-slate-100 transition-all flex items-center justify-center gap-2 mx-auto shadow-xl hover:scale-105 duration-300"
              >
                Contact Solutions Team <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

      </div>

      {/* SUPPORT HUB MODAL (Remains similar but polished) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg bg-[#0b0f1f] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            <button onClick={() => !isSubmitting && setIsModalOpen(false)} className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-6 sm:p-8">
              {submitted ? (
                <div className="py-10 text-center animate-in zoom-in duration-300">
                  <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-white">Transmission Sent</h3>
                  <p className="text-slate-400">Our engineering team will contact you shortly.</p>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold flex items-center gap-2 text-white">
                        <Terminal className="text-blue-400 w-6 h-6" /> Developer Support
                    </h3>
                    <p className="text-slate-400 text-sm mt-1">Open a ticket with our solutions architecture team.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Full Name</label>
                          <input 
                              required type="text" placeholder="John Doe"
                              className="bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:border-blue-500 outline-none w-full text-white"
                              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Work Email</label>
                          <input 
                              required type="email" placeholder="john@company.com"
                              className="bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:border-blue-500 outline-none w-full text-white"
                              value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                          />
                        </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Company Name</label>
                      <input 
                          required type="text" placeholder="Acme Corp"
                          className="bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:border-blue-500 outline-none w-full text-white"
                          value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Technical Query</label>
                      <textarea 
                          required placeholder="Describe your integration requirements..." rows={4}
                          className="bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:border-blue-500 outline-none w-full resize-none text-white"
                          value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                      />
                    </div>
                    <button 
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] mt-2"
                    >
                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /> Initialize Ticket</>}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}