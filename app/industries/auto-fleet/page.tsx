import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { 
  Truck, 
  MapPin, 
  ShieldAlert, 
  BarChart3, 
  Zap, 
  Clock, 
  ArrowRight,
  TrendingDown,
  Navigation
} from 'lucide-react';

const FleetManagementPage = () => {
  const fleetKPIs = [
    { label: "Fuel Efficiency", value: "+18%", detail: "AI Route Optimization" },
    { label: "Idle Time", value: "-24%", detail: "Dynamic Scheduling" },
    { label: "Accident Rate", value: "-40%", detail: "ADAS Monitoring" },
    { label: "Fleet Uptime", value: "99.2%", detail: "Predictive Maintenance" },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 text-center">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-8 backdrop-blur-md">
            <Truck className="w-4 h-4 text-amber-500" />
            <span className="text-amber-500 text-xs font-bold uppercase tracking-widest">Fleet Intelligence & Asset Ops</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter leading-none uppercase">
            ORCHESTRATED <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-orange-700 italic">
              LOGISTICS
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            Turn your fleet into a self-optimizing network. We deploy AI engines that 
            process millions of data points—from driver behavior to port congestion—to 
            maximize asset utilization and minimize carbon footprints.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
            {fleetKPIs.map((kpi, i) => (
              <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-3xl text-left hover:border-amber-500/30 transition-all group">
                <TrendingDown className="w-5 h-5 text-amber-500 mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-2xl font-black mb-1">{kpi.value}</p>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{kpi.label}</p>
                <p className="text-[9px] text-amber-500/60 italic mt-2">{kpi.detail}</p>
              </div>
            ))}
          </div>
          
          <button className="px-12 py-6 bg-amber-600 hover:bg-amber-700 rounded-2xl font-black transition-all shadow-2xl shadow-amber-500/20 flex items-center gap-3 mx-auto text-white">
            OPTIMIZE MY FLEET <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Predictive Dispatch", 
              desc: "Algorithms that predict order surges and pre-position vehicles to reduce wait times by up to 35%.",
              icon: <Clock className="w-8 h-8 text-amber-500" /> 
            },
            { 
              title: "Behavioral Safety AI", 
              desc: "On-edge computer vision to monitor driver fatigue and distraction, providing real-time in-cab coaching.",
              icon: <ShieldAlert className="w-8 h-8 text-amber-500" /> 
            },
            { 
              title: "Dynamic Routing", 
              desc: "Beyond GPS—AI that adapts to weather, road-wear, and real-time fuel pricing to find the 'True-Cost' path.",
              icon: <Navigation className="w-8 h-8 text-amber-500" /> 
            }
          ].map((item, i) => (
            <div key={i} className="p-10 rounded-[3rem] bg-zinc-900/40 border border-white/5 hover:border-amber-500/30 transition-all">
              <div className="mb-6">{item.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div>
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight text-amber-500">Global <br/>Visibility</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              We provide more than just location tracking. Our **Fleet Control Towers** integrate telematics with financial data, giving C-suite executives a 
              real-time view of the cost-per-mile across their entire global operation.
            </p>

            <div className="space-y-4 mt-8">
               <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
                  <BarChart3 className="text-amber-500" />
                  <span className="text-xs font-bold uppercase tracking-widest italic">TCO Reduction Engine Active</span>
               </div>
               <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
                  <Zap className="text-amber-500" />
                  <span className="text-xs font-bold uppercase tracking-widest italic">EV Transition Simulation v2.0</span>
               </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 bg-amber-500/5 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#050301] border border-amber-500/20 rounded-[3rem] p-10 shadow-2xl font-mono overflow-hidden">
               <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
                  <div className="flex items-center gap-2 text-amber-500">
                    <MapPin className="w-4 h-4 animate-bounce" />
                    <span className="text-[10px] uppercase font-black">Fleet_Commander_Terminal</span>
                  </div>
                  <div className="text-[10px] text-gray-500">HUB_EAST_04</div>
               </div>

               <div className="space-y-6">
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-[10px] text-gray-500 uppercase mb-4 text-center">Active Fleet Health</p>
                    <div className="flex justify-between items-end gap-2 h-20">
                      {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                        <div key={i} className="flex-1 bg-amber-500/20 rounded-t-md relative group">
                          <div 
                            className="absolute bottom-0 w-full bg-amber-500 rounded-t-md transition-all duration-1000 group-hover:bg-amber-400" 
                            style={{ height: `${h}%` }}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                        <p className="text-[8px] text-gray-500 uppercase mb-1 font-bold">Risk Score</p>
                        <p className="text-xl font-black text-emerald-400 italic">LOW [1.2]</p>
                     </div>
                     <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <p className="text-[8px] text-gray-500 uppercase mb-1 font-bold">Active Re-Routes</p>
                        <p className="text-xl font-black">14</p>
                     </div>
                  </div>
               </div>

               <div className="mt-8 p-4 bg-amber-950/20 rounded-xl border border-dashed border-amber-500/30 text-[9px] text-amber-200">
                  <p className="font-bold uppercase mb-1 tracking-widest">Logic_Core:</p>
                  <p className="italic">"Traffic anomaly detected on Highway-12. Adjusting dispatch for 18 units. Fuel impact: -2.1%."</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 border-y border-white/5">
        <ExecutionFlow />
      </div>

      <SuccessStories />

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-amber-950/40 to-black border border-amber-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-8xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Master The <br/>Movement</h2>
            <p className="text-amber-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our fleet architects at DLF Cyber City are ready to build the 
              central brain for your logistics empire.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-amber-950 px-16 py-6 rounded-2xl font-black text-2xl hover:scale-105 transition-all shadow-2xl">
                START OPERATIONS AUDIT
              </button>
              <div className="text-amber-500 font-mono text-sm tracking-widest uppercase italic">Logistics Hub: Gurugram, India</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default FleetManagementPage;