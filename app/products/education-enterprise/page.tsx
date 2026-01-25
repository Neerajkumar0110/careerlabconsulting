import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import MethodologySection from '@/components/sections/MethodologySection';
import FaqSection from '@/components/sections/FaqSection';
import FeatureGrid from '@/components/sections/FeatureGrid';

const EducationEnterprisePage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white">
      <Navbar />

      <section className="relative pt-28 pb-20 px-6 lg:px-12 bg-gradient-to-b from-indigo-950/20 to-transparent">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="z-10 order-2 lg:order-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Revolutionizing <br /> 
              <span className="text-indigo-400">Institutional Learning</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-xl mx-auto lg:mx-0">
              Transform your educational infrastructure with AI-driven curriculum 
              management, student analytics, and automated administrative workflows.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20">
                Partner With Us
              </button>
              <button className="px-8 py-4 border border-indigo-500/30 bg-indigo-500/5 hover:bg-indigo-500/10 rounded-xl font-bold transition-all">
                Download Whitepaper
              </button>
            </div>
          </div>

          <div className="relative order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-[3rem] overflow-hidden border-2 border-indigo-500/20 rotate-3 hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Education Technology" 
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-indigo-600/30 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center lg:text-left">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Enterprise-Grade Modules</h2>
            <div className="h-1.5 w-24 bg-indigo-500 mx-auto lg:mx-0 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Smart Curriculum AI", desc: "Automated lesson planning and resource mapping.", icon: "📚" },
              { title: "Student Predictive Analytics", desc: "Identify students at risk and track performance trends.", icon: "📊" },
              { title: "Admin Automation", desc: "Reduce manual workload by 60% with AI workflow engines.", icon: "⚙️" }
            ].map((module, i) => (
              <div key={i} className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-all duration-300">
                <div className="text-4xl mb-6">{module.icon}</div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-indigo-400 transition-colors">{module.title}</h3>
                <p className="text-gray-400 leading-relaxed">{module.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-indigo-950/10">
        <MethodologySection />
      </div>

      <FeatureGrid />

      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto bg-indigo-600/10 rounded-[2.5rem] p-8 md:p-16 border border-indigo-500/20 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to modernize your institution?</h2>
          <p className="text-gray-400 text-lg mb-10">
            Join the leading universities and schools that trust Career Lab Consulting for their digital transformation.
          </p>
          <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Enter institution email" 
              className="flex-grow bg-[#020617] border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-indigo-500"
            />
            <button className="bg-white text-black font-bold px-8 py-4 rounded-xl hover:bg-gray-200 transition-all">
              Book Call
            </button>
          </form>
        </div>
      </section>

      <FaqSection />

      <Footer />
    </main>
  );
};

export default EducationEnterprisePage;