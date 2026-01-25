import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { Target, TrendingUp, Users, Zap, CheckCircle2, BarChart } from 'lucide-react';

const SalesSuitePage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Revenue Acceleration</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              Close Deals <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                With AI Precision
              </span>
            </h1>
            
            <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Supercharge your sales cycle. From lead scoring to automated follow-ups, 
              our Sales Suite turns every interaction into a conversion opportunity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-10 py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20 hover:-translate-y-1">
                Start Selling Smarter
              </button>
              <button className="px-10 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-bold transition-all">
                Request Demo
              </button>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative rounded-[2rem] overflow-hidden border border-white/10 bg-[#03081a]">
              <img 
                src="https://images.pexels.com/photos/3182811/pexels-photo-3182811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Sales Performance" 
                className="w-full h-auto object-cover opacity-80"
              />
              <div className="absolute top-6 right-6 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl">
                <div className="text-blue-400 text-xs font-bold uppercase mb-1">Conversion Rate</div>
                <div className="text-2xl font-bold">+42.8%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 italic">The Sales Engine</h2>
            <p className="text-gray-500">Every tool you need to outperform your quota.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Predictive Prospecting", 
                desc: "Identify buyers ready to purchase using deep-learning intent signals.",
                icon: <Target className="w-8 h-8 text-blue-400" /> 
              },
              { 
                title: "Hyper-Personalization", 
                desc: "Generate custom outreach scripts for every lead in seconds.",
                icon: <Users className="w-8 h-8 text-blue-400" /> 
              },
              { 
                title: "Cycle Automation", 
                desc: "Automate boring tasks so your team can focus on closing.",
                icon: <Zap className="w-8 h-8 text-blue-400" /> 
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all group">
                <div className="mb-6 p-4 bg-blue-500/10 rounded-2xl inline-block group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-y border-white/5 bg-gradient-to-r from-transparent via-blue-900/5 to-transparent">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <div className="text-4xl font-black text-blue-400 mb-2">2.5x</div>
            <div className="text-gray-500 text-sm font-medium uppercase tracking-widest">Pipeline Growth</div>
          </div>
          <div>
            <div className="text-4xl font-black text-blue-400 mb-2">60%</div>
            <div className="text-gray-500 text-sm font-medium uppercase tracking-widest">Faster Closing</div>
          </div>
          <div>
            <div className="text-4xl font-black text-blue-400 mb-2">90%</div>
            <div className="text-gray-500 text-sm font-medium uppercase tracking-widest">Lead Accuracy</div>
          </div>
          <div>
            <div className="text-4xl font-black text-blue-400 mb-2">24/7</div>
            <div className="text-gray-500 text-sm font-medium uppercase tracking-widest">AI Prospecting</div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold mb-8">Data-Driven Wins</h2>
            <div className="space-y-6">
              {[
                "Real-time CRM Integration",
                "Behavioral Intent Tracking",
                "Automated Multi-channel Outreach",
                "Dynamic Pricing Intelligence"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <CheckCircle2 className="text-blue-500 w-6 h-6" />
                  <span className="text-xl text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/2 bg-blue-900/10 p-8 rounded-3xl border border-blue-500/20">
             <BarChart className="w-full h-48 text-blue-500/50" />
             <div className="text-center mt-4 text-gray-400 italic font-medium">Predictive Performance Analytics</div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-600 to-indigo-900 rounded-[3rem] p-12 md:p-24 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic">READY TO DOMINATE?</h2>
            <p className="text-blue-100 text-lg md:text-xl mb-12 max-w-xl mx-auto">
              Join the future of enterprise sales. No more cold calls, just warm conversions.
            </p>
            <button className="bg-white text-blue-900 px-12 py-5 rounded-full font-black text-xl hover:scale-110 transition-all shadow-xl">
              Get Sales Suite Access
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default SalesSuitePage;