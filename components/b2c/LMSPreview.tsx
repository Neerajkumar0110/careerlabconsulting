'use client';

import React, { useState } from 'react';
import { 
  Layout, Cpu, Globe, Shield, Zap, CheckCircle, 
  Activity, Terminal, Code2, Cpu as CpuIcon, Lock, Eye
} from 'lucide-react';

const stats = [
  { label: 'Neural Training', value: '85%', icon: Cpu, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { label: 'Project Nodes', value: '12 Active', icon: Globe, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { label: 'Security Clearance', value: 'Lvl 4', icon: Shield, color: 'text-purple-500', bg: 'bg-purple-500/10' },
];

export default function LMSPreview() {
  const [activeView, setActiveView] = useState('ai'); 

  return (
    <section className="py-12 md:py-32 bg-[#020617] border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[400px] bg-blue-600/5 blur-[80px] md:blur-[120px] rounded-full z-0" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <Zap className="w-3 h-3 text-blue-400 fill-blue-400" />
              <span className="text-blue-400 text-[10px] font-black uppercase tracking-widest">Internal Infrastructure</span>
            </div>
            
            <h2 className="text-3xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-tight uppercase">
              Hybrid <span className="italic text-slate-500">Intelligence</span> <br className="hidden md:block"/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
                Learning Ecosystem
              </span>
            </h2>
            
            <p className="text-slate-400 text-sm md:text-lg mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Don't settle for static videos. Enter a live deployment environment where your code meets neural protocols. Our LMS is a <span className="text-white font-bold">real-time command center</span> for your internship.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="group p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-blue-500/30 transition-all duration-500 flex items-center lg:block gap-4">
                  <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center lg:mb-4 group-hover:scale-110 transition-transform`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div className="text-left">
                    <div className="text-xl md:text-2xl font-black text-white tracking-tight">{stat.value}</div>
                    <div className="text-[9px] text-slate-500 uppercase font-black tracking-widest">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group order-1 lg:order-2">
            <div className="absolute -inset-4 bg-blue-600/10 rounded-[3rem] blur-3xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
            
            <div className="relative bg-[#0a0f1d] border border-white/10 rounded-2xl md:rounded-[2.5rem] p-2 md:p-4 shadow-2xl backdrop-blur-md overflow-hidden">
              
              <div className="flex items-center gap-2 mb-3 px-4 py-2 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-red-500/40" />
                  <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-amber-500/40" />
                  <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-emerald-500/40" />
                </div>
                <div className="mx-auto bg-white/5 px-4 py-1 rounded-lg text-[9px] text-slate-500 font-mono truncate max-w-[150px] md:max-w-none">
                  internx-terminal.cloud/session_042/{activeView}-node
                </div>
              </div>

              <div className="flex gap-2 md:gap-4 min-h-[400px] md:min-h-[480px]">
                <div className="w-12 md:w-16 bg-white/[0.03] rounded-xl md:rounded-3xl flex flex-col items-center py-6 gap-6 border border-white/5">
                  {[
                    { id: 'ai', icon: Activity },
                    { id: 'layout', icon: Layout },
                    { id: 'terminal', icon: Terminal },
                    { id: 'code', icon: Code2 },
                    { id: 'security', icon: Shield }
                  ].map((item) => (
                    <button 
                      key={item.id}
                      onClick={() => setActiveView(item.id)}
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        activeView === item.id 
                        ? 'bg-blue-600 shadow-lg shadow-blue-600/40 text-white scale-110' 
                        : 'text-slate-500 hover:text-blue-400'
                      }`}
                    >
                      <item.icon className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  ))}
                </div>

                <div className="flex-1 space-y-4 pr-1 md:pr-2 overflow-hidden">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                       <span className="text-[10px] font-mono text-emerald-500 font-bold uppercase tracking-widest">Live {activeView} Session</span>
                    </div>
                  </div>

                  <div className="h-full">
                    {activeView === 'ai' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="h-44 md:h-56 bg-gradient-to-br from-blue-600/10 border border-blue-500/20 rounded-[2rem] p-5">
                          <div className="flex justify-between items-start mb-6 text-white">
                            <div>
                              <div className="text-[9px] text-blue-400 font-black uppercase">Model Status</div>
                              <div className="text-sm font-bold uppercase italic">Neural-Llama-v3</div>
                            </div>
                            <CpuIcon className="w-4 h-4 text-blue-500" />
                          </div>
                          <div className="space-y-4">
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden"><div className="h-full w-[92%] bg-blue-500" /></div>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden"><div className="h-full w-[98%] bg-cyan-400" /></div>
                            <div className="h-8 bg-blue-500/10 rounded-xl border border-blue-500/20 flex items-center justify-center gap-2 mt-4">
                              <CheckCircle className="w-3 h-3 text-blue-400" />
                              <span className="text-[8px] font-black text-blue-400 uppercase">Optimized</span>
                            </div>
                          </div>
                        </div>
                        <div className="h-44 md:h-56 bg-black/40 border border-white/10 rounded-[2rem] p-5 font-mono text-[9px] text-slate-400 space-y-2">
                          <div className="text-slate-500 font-black uppercase border-b border-white/5 pb-2 mb-2">System Logs</div>
                          <div className="flex gap-2"><span className="text-emerald-500">[OK]</span> Handshake established</div>
                          <div className="flex gap-2"><span className="text-blue-500">[AI]</span> Injecting neural weights...</div>
                          <div className="flex gap-2"><span className="text-amber-500">[!]</span> Latency peak: 14ms</div>
                        </div>
                      </div>
                    )}

                    {activeView === 'terminal' && (
                      <div className="h-44 md:h-80 bg-black/60 border border-white/10 rounded-2xl p-4 font-mono text-emerald-400 text-[10px] space-y-2 animate-in fade-in zoom-in-95">
                        <div className="flex items-center gap-2 opacity-50 mb-4 border-b border-white/5 pb-2">
                          <Terminal className="w-3 h-3" /> System Shell v2.0
                        </div>
                        <div>$ internx --deploy neural-net</div>
                        <div className="text-slate-400 italic">{`> Initializing node cluster...`}</div>
                        <div className="text-white font-bold">● CLUSTER_STABLE: 104.22.x.x</div>
                        <div className="text-blue-400">√ Security clearance verified (Lvl 4)</div>
                        <div className="flex gap-1 animate-pulse"><span className="w-2 h-4 bg-emerald-500/50" /></div>
                      </div>
                    )}

                    {activeView === 'code' && (
                      <div className="h-44 md:h-80 bg-[#050505] border border-white/10 rounded-2xl p-4 font-mono text-[10px] animate-in fade-in slide-in-from-bottom-4">
                        <div className="flex justify-between mb-4 border-b border-white/5 pb-2">
                          <span className="text-slate-500">model_trainer.py</span>
                          <Code2 className="w-3 h-3 text-blue-500" />
                        </div>
                        <div className="space-y-1">
                          <div><span className="text-purple-400">import</span> tensorflow <span className="text-purple-400">as</span> tf</div>
                          <div><span className="text-purple-400">def</span> <span className="text-blue-400">train_neural_node</span>():</div>
                          <div className="pl-4 text-slate-400">weights = tf.neural.load_weights(<span className="text-emerald-400">'v3_core'</span>)</div>
                          <div className="pl-4 text-slate-400"><span className="text-purple-400">return</span> weights.optimize(learning_rate=<span className="text-amber-400">0.001</span>)</div>
                          <div className="flex gap-1 animate-pulse mt-2"><span className="w-2 h-4 bg-blue-500" /></div>
                        </div>
                      </div>
                    )}

                    {activeView === 'security' && (
                      <div className="h-44 md:h-80 bg-red-500/5 border border-red-500/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center animate-in zoom-in-95">
                        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                           <Lock className="w-8 h-8 text-red-500 animate-pulse" />
                        </div>
                        <div className="text-red-500 font-black text-xs uppercase tracking-widest mb-1">Firewall Active</div>
                        <div className="text-slate-500 text-[10px] font-mono">ENCRYPTED_TUNNEL: AES-256</div>
                      </div>
                    )}

                    {activeView === 'layout' && (
                      <div className="h-44 md:h-80 border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center opacity-40">
                         <Eye className="w-10 h-10 text-slate-500 mb-2" />
                         <span className="text-[10px] font-mono uppercase">Previewing Deployment UI...</span>
                      </div>
                    )}
                  </div>

                  <div className="p-3 md:p-4 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                      <span className="text-[8px] md:text-[9px] text-slate-400 font-mono truncate max-w-[80px]">STABLE: 104.22</span>
                    </div>
                    <div className="flex items-center gap-2 md:gap-4">
                       <div className="text-[8px] md:text-[9px] font-mono text-slate-500">PING: 24ms</div>
                       <div className="h-1.5 w-12 md:w-24 bg-blue-500/10 rounded-full overflow-hidden">
                          <div className="h-full w-3/4 bg-blue-500 animate-pulse" />
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-2 md:-top-6 md:-right-4 bg-[#1e293b] border border-white/10 px-3 py-2 md:px-4 md:py-3 rounded-xl md:rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce duration-[5000ms] z-20">
               <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center"><Activity className="w-4 h-4 text-emerald-400" /></div>
               <div><div className="text-[8px] text-slate-500 font-bold uppercase">Cloud Uptime</div><div className="text-[10px] md:text-xs font-black text-white italic">99.9% LIVE</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}