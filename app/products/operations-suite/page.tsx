import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ProductMatrix from '@/components/sections/ProductMatrix';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import FeatureGrid from '@/components/sections/FeatureGrid';

const OperationsSuitePage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative w-full pt-28 pb-16 md:pt-40 md:pb-32 px-6 lg:px-12">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Enterprise Operations</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-[1.1] tracking-tight">
              Precision <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
                Orchestration
              </span>
            </h1>
            
            <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Eliminate bottlenecks with AI-driven supply chain intelligence and automated internal workflows. 
              Engineered for high-scale global enterprises.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-[0_0_25px_rgba(37,99,235,0.3)] hover:-translate-y-1">
                Optimize Now
              </button>
              <button className="px-10 py-4 bg-white/5 border border-white/10 hover:bg-white/10 backdrop-blur-md rounded-2xl font-bold transition-all">
                System Overview
              </button>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative z-10 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-[#020617]">
              <img 
                src="https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Operations Intelligence" 
                className="w-full h-auto object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-blue-600/5 border-y border-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Efficiency Boost", value: "+300%" },
              { label: "Precision Rate", value: "99.9%" },
              { label: "Operating Costs", value: "-25%" },
              { label: "Uptime", value: "99.99%" }
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <h3 className="text-2xl md:text-4xl font-bold text-white">{stat.value}</h3>
                <p className="text-blue-400/80 text-xs md:text-sm font-medium uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="py-20 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-indigo-600/5 blur-[120px] -z-10"></div>
        <ExecutionFlow />
      </div>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Operational Mastery</h2>
              <p className="text-gray-400">Next-gen tools to manage complex logistics and high-speed data.</p>
            </div>
            <div className="hidden md:block h-[1px] flex-grow bg-white/10 mx-8 mb-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group relative p-1 rounded-[2rem] overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
               <div className="relative bg-white/5 p-8 md:p-12 rounded-[1.9rem] border border-white/10 h-full backdrop-blur-xl">
                 <h4 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors">Inventory Intelligence</h4>
                 <p className="text-gray-400 mb-8">Predictive stock management that eliminates overstocking using proprietary AI forecasting.</p>
                 <img src="https://images.pexels.com/photos/4481326/pexels-photo-4481326.jpeg?auto=compress&cs=tinysrgb&w=800" className="rounded-2xl w-full h-56 object-cover border border-white/5" alt="Inventory" />
               </div>
            </div>

            <div className="group relative p-1 rounded-[2rem] overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
               <div className="relative bg-white/5 p-8 md:p-12 rounded-[1.9rem] border border-white/10 h-full backdrop-blur-xl">
                 <h4 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors">Workflow Orchestration</h4>
                 <p className="text-gray-400 mb-8">Automate cross-departmental tasks with zero-latency triggers and real-time status tracking.</p>
                 <img src="https://images.pexels.com/photos/3183146/pexels-photo-3183146.jpeg?auto=compress&cs=tinysrgb&w=800" className="rounded-2xl w-full h-56 object-cover border border-white/5" alt="Workflow" />
               </div>
            </div>
          </div>
        </div>
      </section>

      <ProductMatrix />

      <FeatureGrid />

      <Footer />
    </main>
  );
};

export default OperationsSuitePage;