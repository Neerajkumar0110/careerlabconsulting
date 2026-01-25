import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { 
  Package, 
  Truck, 
  BarChart3, 
  Zap, 
  Warehouse, 
  Search, 
  ArrowRight,
  Boxes,
  ClipboardCheck
} from 'lucide-react';

const RetailInventoryPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 mb-8 backdrop-blur-md">
            <Warehouse className="w-4 h-4 text-teal-400" />
            <span className="text-teal-400 text-xs font-bold uppercase tracking-widest">Autonomous Inventory & Supply Ops</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight uppercase">
            LIQUID <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-400 to-blue-500 italic">
              LOGISTICS
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            Eliminate dead stock and stockouts with surgical precision. We build 
            AI-driven inventory engines that synchronize global supply chains 
            with real-time consumer demand.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-teal-600 hover:bg-teal-700 rounded-2xl font-bold transition-all shadow-xl shadow-teal-500/20 flex items-center justify-center gap-2 text-white">
              Optimize My Stock <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Demand Sensing AI", 
              desc: "Beyond historical averages—AI that ingests weather, social trends, and local events to predict SKU-level demand with 95% accuracy.",
              icon: <Zap className="w-8 h-8 text-teal-400" /> 
            },
            { 
              title: "Automated Replenishment", 
              desc: "Self-correcting supply chains that automatically trigger purchase orders based on lead times and predicted surges.",
              icon: <Truck className="w-8 h-8 text-teal-400" /> 
            },
            { 
              title: "Computer Vision Audits", 
              desc: "Deploying edge AI to monitor warehouse shelves and retail floors, detecting low-stock or misplaced items in real-time.",
              icon: <Search className="w-8 h-8 text-teal-400" /> 
            }
          ].map((item, i) => (
            <div key={i} className="group p-10 rounded-[2.5rem] bg-teal-950/5 border border-white/5 hover:border-teal-500/30 transition-all">
              <div className="mb-6 p-4 bg-teal-500/10 rounded-2xl inline-block group-hover:bg-teal-600 transition-all">
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
          
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Zero-Waste <br/>Fulfillment</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              We bridge the "Phygital" gap. By integrating with your ERP and 
              WMS (SAP, NetSuite, Manhattan), we transform static inventory data 
              into a dynamic, predictive asset that reduces holding costs by up to 30%.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
               <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 group hover:border-teal-500/30 transition-all">
                  <Boxes className="text-teal-400 shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-widest">Multi-Node Sync</span>
               </div>
               <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 group hover:border-teal-500/30 transition-all">
                  <ClipboardCheck className="text-teal-400 shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-widest">Lead Time Prediction</span>
               </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 bg-teal-500/5 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#020a08] border border-white/10 rounded-[3rem] p-10 shadow-2xl overflow-hidden font-mono">
               <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-teal-400" />
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest">Stock_Optimizer_X1</span>
                  </div>
                  <div className="text-[10px] text-teal-400 animate-pulse font-bold tracking-[0.2em]">HEALTH_CHECK_OK</div>
               </div>

               <div className="space-y-6">
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                     <p className="text-[10px] text-gray-500 uppercase mb-3">Inventory Health Score</p>
                     <div className="flex items-center gap-4">
                        <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-teal-500 w-[94%]"></div>
                        </div>
                        <span className="text-xs font-bold">94%</span>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 rounded-xl bg-teal-500/5 border border-teal-500/10">
                        <p className="text-[8px] text-gray-500 uppercase mb-1">Overstock Risk</p>
                        <p className="text-xl font-bold text-emerald-400">0.02%</p>
                     </div>
                     <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <p className="text-[8px] text-gray-500 uppercase mb-1">Fill Rate</p>
                        <p className="text-xl font-bold">99.8%</p>
                     </div>
                  </div>
               </div>

               <div className="mt-8 p-4 bg-teal-950/20 rounded-xl border border-dashed border-teal-500/20 text-[10px] text-teal-200">
                  <p className="font-bold mb-1 uppercase tracking-widest">Decision Engine:</p>
                  <p className="italic">"Regional surge detected in NCR Zone. Re-routing 500 units from Warehouse_A to Micro-Hub_4 to minimize last-mile latency."</p>
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
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-teal-950/40 to-black border border-teal-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Sync Your <br/>Operations</h2>
            <p className="text-teal-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our supply chain engineers at DLF Cyber City are building the 
              nervous system of modern commerce.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-teal-950 px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl">
                START OPERATIONS AUDIT
              </button>
              <div className="text-teal-400 font-mono text-sm tracking-widest uppercase">Ops Center: Gurugram, India</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default RetailInventoryPage;