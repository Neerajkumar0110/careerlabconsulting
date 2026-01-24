import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import FeatureGrid from '@/components/sections/FeatureGrid';
import { 
  Building2, 
  ShieldCheck, 
  Workflow, 
  Users2, 
  Lock, 
  Settings2, 
  ArrowRight,
  Database,
  BarChart3
} from 'lucide-react';

const EnterpriseAIAppsPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-md">
            <Building2 className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Internal Ecosystem Engineering</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            ENTERPRISE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-600 italic">
              AI SOLUTIONS
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            Turn your internal data into an operational advantage. We build private, 
            high-security AI applications that streamline departmental workflows 
            without exposing your data to the public web.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2">
              Start Enterprise Audit <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-bold transition-all">
              Security Protocol
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "AI Decision Support", 
              desc: "Custom BI tools that use predictive modeling to assist C-suite and managers in real-time strategy.",
              icon: <BarChart3 className="w-8 h-8 text-blue-400" /> 
            },
            { 
              title: "Internal Knowledge Bases", 
              desc: "Proprietary RAG systems that allow employees to query HR, Legal, and Tech docs instantly.",
              icon: <Database className="w-8 h-8 text-blue-400" /> 
            },
            { 
              title: "Workflow Copilots", 
              desc: "Embedded assistants for Sales, Ops, and Support teams that automate 80% of routine CRM tasks.",
              icon: <Workflow className="w-8 h-8 text-blue-400" /> 
            }
          ].map((item, i) => (
            <div key={i} className="group p-10 rounded-[2.5rem] bg-blue-900/5 border border-white/5 hover:border-blue-500/30 transition-all">
              <div className="mb-6 p-4 bg-blue-500/10 rounded-2xl inline-block group-hover:bg-blue-600 group-hover:text-white transition-all">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="order-2 lg:order-1 relative">
            <div className="absolute -inset-10 bg-blue-600/5 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#03081a] border border-white/10 rounded-[3rem] p-10 shadow-2xl overflow-hidden group">
               <div className="flex items-center gap-3 mb-8">
                  <ShieldCheck className="text-blue-400 w-6 h-6" />
                  <span className="font-mono text-xs tracking-[0.2em] text-blue-400 uppercase">Secure_Vault_Deployment</span>
               </div>
               
               <div className="space-y-4">
                  {[
                    { label: "VPC Isolation", status: "Enabled" },
                    { label: "SSO/SAML Integration", status: "Active" },
                    { label: "Data Encryption at Rest", status: "AES-256" }
                  ].map((row, idx) => (
                    <div key={idx} className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-sm font-bold text-gray-300">{row.label}</span>
                      <span className="text-[10px] font-mono font-bold text-blue-400">{row.status}</span>
                    </div>
                  ))}
               </div>
               
               <div className="mt-8 flex justify-center">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-[#03081a] bg-blue-900/40 flex items-center justify-center">
                        <Users2 className="w-4 h-4 text-blue-300" />
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter">Private. <br/>Portable. <br/>Powerful.</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Our enterprise applications are built to coexist with your current 
              security stack. Whether it's on-premise, private cloud, or air-gapped 
              environments, we ensure your AI is as secure as your core business.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <Lock className="text-blue-400 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold">Zero Data Leaks</h4>
                  <p className="text-xs text-gray-500">No training on your proprietary inputs.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Settings2 className="text-blue-400 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold">SSO/IAM Ready</h4>
                  <p className="text-xs text-gray-500">Seamless integration with Azure AD/Okta.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-y border-white/5">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold italic">Enterprise AI Stack</h2>
          <p className="text-gray-500 mt-4">Standardized frameworks for global organizations.</p>
        </div>

        <div className="mt-20">
          <ExecutionFlow />
        </div>
      </section>

      <FeatureGrid />

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-900/40 to-indigo-950/40 border border-blue-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Empower Your <br/>Workforce</h2>
            <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our enterprise consultants at DLF Cyber City are ready to design 
              your private AI landscape.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-blue-950 px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl">
                BOOK STRATEGY SESSION
              </button>
              <div className="text-blue-400 font-mono text-sm tracking-widest uppercase">+91 870023 6923</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default EnterpriseAIAppsPage;