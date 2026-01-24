import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import SuccessStories from '@/components/sections/SuccessStories';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import FeatureGrid from '@/components/sections/FeatureGrid';
import { Users, UserPlus, HeartHandshake, Microscope, Award, ShieldCheck } from 'lucide-react';

const PeopleSuitePage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-md">
            <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em]">Next-Gen HR & Talent</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            PEOPLE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">SUITE</span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            Architecting the future of human capital. Our AI-driven suite automates 
            talent acquisition, optimizes employee engagement, and streamlines 
            global workforce management.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20">
              Transform Your HR
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-bold transition-all">
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Autonomous Recruiting", 
              desc: "Identify top-tier talent with AI screening that removes bias and predicts cultural fit.",
              icon: <UserPlus className="w-8 h-8 text-blue-400" /> 
            },
            { 
              title: "Sentiment Analysis", 
              desc: "Real-time employee engagement monitoring to reduce churn and boost workplace morale.",
              icon: <HeartHandshake className="w-8 h-8 text-blue-400" /> 
            },
            { 
              title: "Compliance Shield", 
              desc: "Global payroll and labor law compliance automated across 150+ jurisdictions.",
              icon: <ShieldCheck className="w-8 h-8 text-blue-400" /> 
            }
          ].map((item, i) => (
            <div key={i} className="group p-10 rounded-[2.5rem] bg-blue-900/5 border border-white/5 hover:border-blue-500/30 transition-all">
              <div className="mb-6 p-4 bg-blue-500/10 rounded-2xl inline-block group-hover:bg-blue-600 group-hover:text-white transition-all">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="py-12 border-y border-white/5">
        <ExecutionFlow />
      </div>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative rounded-[3rem] overflow-hidden border border-white/10">
            <img 
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Team Collaboration" 
              className="w-full h-auto opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
          </div>
          
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 italic">Data-Driven Culture</h2>
            <div className="space-y-8">
              {[
                { t: "Predictive Attrition", d: "Identify high-risk churn before it happens with neural modeling.", i: <Microscope className="text-blue-400" /> },
                { t: "Automated L&D", d: "Personalized learning paths that evolve with your employee's career.", i: <Award className="text-blue-400" /> },
                { t: "Global Talent Pool", d: "Access a verified network of elite freelancers and experts instantly.", i: <Users className="text-blue-400" /> }
              ].map((point, idx) => (
                <div key={idx} className="flex gap-5">
                  <div className="mt-1">{point.i}</div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">{point.t}</h4>
                    <p className="text-gray-400">{point.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FeatureGrid />

      <SuccessStories />

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-900/40 to-[#020617] rounded-[3rem] p-12 md:p-24 text-center border border-white/10 relative overflow-hidden group">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter">REDEFINE TALENT</h2>
            <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Join leading global enterprises operating across 8 primary tech hubs 
              with Career Lab Consulting.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-blue-950 px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl">
                CONTACT HUB
              </button>
              <div className="text-blue-400 font-mono text-sm tracking-widest">+91 870023 6923</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default PeopleSuitePage;