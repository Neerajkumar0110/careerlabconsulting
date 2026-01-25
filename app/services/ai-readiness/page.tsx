import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import FeatureGrid from '@/components/sections/FeatureGrid';
import { 
  ClipboardCheck, Database, ShieldAlert, Zap, 
  BarChart, HardDrive, LayoutDashboard, Target, 
  ArrowUpRight, Download, FileText 
} from 'lucide-react';

const AIReadinessPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-md">
            <ClipboardCheck className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Audit & Evaluation</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            AI READINESS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-600 italic">
              ASSESSMENT
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            Is your organization actually ready for AI? We perform deep-dive audits of your 
            data pipelines, security protocols, and technical debt to ensure a 
            frictionless transition to autonomous operations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2">
              Start Your Audit <ArrowUpRight className="w-5 h-5" />
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-bold transition-all">
              View Audit Metrics
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold italic">The Readiness Framework</h2>
            <p className="text-gray-500 mt-4">Evaluating enterprise readiness across four critical tech-layers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Data Maturity", desc: "Cleanliness, accessibility, and labeling quality.", icon: <Database className="text-blue-400" /> },
              { title: "Tech Stack", desc: "Cloud infrastructure and legacy system compatibility.", icon: <HardDrive className="text-blue-400" /> },
              { title: "Security Risk", desc: "Vulnerabilities in data privacy and AI guardrails.", icon: <ShieldAlert className="text-blue-400" /> },
              { title: "Scale Potential", desc: "Computational costs and performance bottlenecks.", icon: <Zap className="text-blue-400" /> }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-blue-900/5 border border-white/5 hover:border-blue-500/30 transition-all">
                <div className="mb-6 p-4 bg-blue-500/10 rounded-2xl inline-block">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter">Gap Analysis <br/>Report</h2>
            <p className="text-gray-400 mb-8 leading-relaxed text-lg">
              Our Readiness Audit concludes with a comprehensive **Gap Analysis Report**. 
              We don't just find problems; we provide the architectural blueprints 
              to fix them before they impact your ROI.
            </p>
            <div className="space-y-6 mb-10">
              {[
                "Data Silo Identification & Mapping",
                "Infrastructure Scalability Scoring",
                "Security & Governance Compliance",
                "Workforce Skill-Gap Matrix"
              ].map((point, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-600 transition-all">
                    <BarChart className="w-5 h-5 text-blue-400 group-hover:text-white" />
                  </div>
                  <span className="font-bold text-gray-200 text-xl">{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-blue-500/10 blur-3xl rounded-[4rem]"></div>
            <div className="relative bg-[#03081a] border border-white/10 rounded-[3rem] p-8 md:p-10 shadow-2xl">
              
              <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/5">
                <div>
                  <h3 className="text-2xl font-black text-blue-400">Readiness Score: 78%</h3>
                  <p className="text-xs text-gray-500 font-mono">ID: CLC-AUDIT-2026-X9</p>
                </div>
                <LayoutDashboard className="text-blue-500 w-8 h-8 opacity-50" />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: "Data Maturity", val: "75%", color: "bg-blue-500" },
                  { label: "Tech Stack", val: "High", color: "bg-indigo-500" },
                  { label: "Security Risk", val: "Med", color: "bg-yellow-500" },
                  { label: "Scale Cap", val: "92%", color: "bg-emerald-500" },
                ].map((stat, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">{stat.label}</p>
                    <div className="flex items-end justify-between">
                      <span className="text-xl font-bold">{stat.val}</span>
                      <div className={`w-2 h-2 rounded-full ${stat.color} animate-pulse`}></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative h-48 w-full bg-blue-950/20 rounded-2xl border border-blue-500/10 flex items-center justify-center overflow-hidden mb-8">
                  <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]"></div>
                  <div className="relative w-32 h-32 rounded-full border border-blue-500/30 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full border border-blue-400/50 animate-ping absolute"></div>
                    <Target className="w-10 h-10 text-blue-400" />
                    <div className="absolute -top-4 text-[10px] font-mono text-blue-400">DATA</div>
                    <div className="absolute -bottom-4 text-[10px] font-mono text-blue-400">SCALE</div>
                  </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 py-3 bg-blue-600/10 border border-blue-500/30 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-all">
                  <FileText className="w-4 h-4" /> VIEW RAW DATA
                </button>
                <button className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                  <Download className="w-4 h-4" /> DOWNLOAD PDF
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      <div className="py-12 border-y border-white/5">
        <ExecutionFlow />
      </div>

      <FeatureGrid />

      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-blue-900/40 to-[#020617] rounded-[3rem] p-12 md:p-24 text-center border border-white/10 backdrop-blur-3xl">
          <h2 className="text-4xl md:text-6xl font-black mb-8 italic">GET CERTIFIED READY.</h2>
          <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto">
            Schedule an initial technical audit with our engineers at our Gurugram Hub.
          </p>
          <div className="flex flex-col items-center gap-6">
            <button className="px-16 py-6 bg-white text-blue-900 rounded-full font-black text-xl hover:scale-110 transition-all shadow-2xl">
              REQUEST READINESS AUDIT
            </button>
            <div className="text-blue-400 font-mono text-sm tracking-widest">+91 870023 6923</div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AIReadinessPage;