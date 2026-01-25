import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { 
  Layout, 
  Sparkles, 
  Users, 
  Zap, 
  MousePointer2, 
  Layers, 
  ArrowRight,
  Code2,
  Settings2
} from 'lucide-react';

const TechSaaSIndustryPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-md">
            <Layout className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">SaaS Transformation Vertical</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            INTELLIGENT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-600 italic">
              PRODUCT DNA
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            Don't just add a chatbot. We help SaaS founders re-architect their products 
            around AI, from semantic search and automated workflows to 
            generative UI and predictive user insights.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2 text-white">
              AI-Enable Your SaaS <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Generative Workflows", 
              desc: "Moving beyond forms—enable users to generate complex outputs, reports, and designs via natural language.",
              icon: <Sparkles className="w-8 h-8 text-blue-400" /> 
            },
            { 
              title: "Semantic Discovery", 
              desc: "Replace rigid filters with AI search that understands user intent and deep-links to relevant content.",
              icon: <MousePointer2 className="w-8 h-8 text-blue-400" /> 
            },
            { 
              title: "Predictive Churn AI", 
              desc: "Analyze user behavior patterns to predict and prevent churn before it happens with automated interventions.",
              icon: <Users className="w-8 h-8 text-blue-400" /> 
            }
          ].map((item, i) => (
            <div key={i} className="group p-10 rounded-[2.5rem] bg-blue-900/5 border border-white/5 hover:border-blue-500/30 transition-all">
              <div className="mb-6 p-4 bg-blue-500/10 rounded-2xl inline-block group-hover:bg-blue-600 transition-all">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="relative">
            <div className="absolute -inset-10 bg-blue-500/10 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#03081a] border border-white/10 rounded-3xl p-6 shadow-2xl">
               <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                  <span className="ml-4 text-[10px] font-mono text-gray-500">nexus_dashboard_v2.ai</span>
               </div>
               
               <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="h-20 rounded-xl bg-white/5 animate-pulse"></div>
                  <div className="h-20 rounded-xl bg-white/5"></div>
                  <div className="h-20 rounded-xl bg-white/5"></div>
               </div>

               <div className="p-4 rounded-xl bg-blue-600/10 border border-blue-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-3 h-3 text-blue-400" />
                    <span className="text-[10px] font-bold text-blue-400 uppercase">AI Suggestion</span>
                  </div>
                  <p className="text-xs text-gray-300">Based on user retention trends, we recommend enabling the "Automated Onboarding" agent for users in the EMEA region.</p>
               </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase">From SaaS <br/>to AI-as-a-Service</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              We help you monetize your data. By building proprietary fine-tuned 
              models on your platform's specific datasets, you can offer 
              premium AI features that your competitors can't match.
            </p>
            
            <div className="space-y-4">
               {[
                 { t: "Multi-tenant AI Architectures", i: <Layers /> },
                 { t: "API-First AI Integration", i: <Code2 /> },
                 { t: "Usage-based AI Billing Logic", i: <Settings2 /> }
               ].map((item, idx) => (
                 <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-default">
                    <div className="text-blue-400">{item.i}</div>
                    <span className="font-bold">{item.t}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 border-y border-white/5">
        <ExecutionFlow />
      </div>

      <SuccessStories />

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-900/40 to-indigo-950/40 border border-blue-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Future-Proof <br/>Your Product</h2>
            <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our SaaS consultants at DLF Cyber City are ready to build your next 
              competitive advantage.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-blue-950 px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl uppercase">
                Audit My SaaS
              </button>
              <div className="text-blue-400 font-mono text-sm tracking-widest uppercase tracking-widest">+91 870023 6923</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default TechSaaSIndustryPage;