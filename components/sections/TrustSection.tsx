'use client';

import React from 'react';
import { Shield, Lock, CheckCircle2, ArrowRight, TrendingUp, Users, Zap } from 'lucide-react';

export default function TrustSection() {
  return (
    <section className="py-15 md:py-15 bg-[#020617] relative overflow-hidden font-sans">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full -mr-64 -mt-64"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 blur-[130px] rounded-full -ml-48 -mb-48"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="space-y-8 order-2 lg:order-1">
            <div>
              <span className="bg-blue-500/10 text-blue-400 text-[11px] font-bold px-4 py-1.5 rounded-full border border-blue-500/20 uppercase tracking-widest">
                Max Efficiency
              </span>
              <h2 className="text-5xl md:text-7xl font-black text-white mt-6 leading-[1] tracking-tight">
                Secure more. <br />
                <span className="text-blue-500">Earn more.</span>
              </h2>
              <p className="text-slate-400 text-lg mt-6 max-w-lg leading-relaxed">
                Humara platform sirf data protect nahi karta, balki workflows ko optimize karke aapki <span className="text-white font-semibold">operational cost 35% tak kam</span> kar deta hai.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: <Zap className="w-5 h-5 text-yellow-400" />, title: "Instant Setup", desc: "Start in 5 minutes" },
                { icon: <Users className="w-5 h-5 text-green-400" />, title: "Multi-User Scale", desc: "Unlimited agents" },
              ].map((item, i) => (
                <div key={i} className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl flex items-start gap-4">
                  <div className="p-2 bg-white/5 rounded-lg">{item.icon}</div>
                  <div>
                    <h4 className="text-white font-bold text-sm">{item.title}</h4>
                    <p className="text-slate-500 text-xs mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              <button className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2 group">
                Maximize Your Profit
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="absolute -inset-10 bg-blue-500/10 blur-[80px] rounded-full animate-pulse"></div>
            
            <div className="relative bg-[#0b0f1a] border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-3xl">
              <div className="space-y-10">
                <div className="flex justify-between items-center text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-blue-500" />
                    </div>
                    <span className="font-bold tracking-tight text-lg">Auto-Shield v3.0</span>
                  </div>
                  <div className="h-3 w-3 rounded-full bg-green-500 animate-ping"></div>
                </div>

                <div className="bg-gradient-to-br from-white/[0.08] to-transparent p-6 rounded-3xl border border-white/10">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-slate-400 text-xs font-medium uppercase tracking-widest mb-2">Estimated ROI</p>
                      <h3 className="text-white text-4xl font-black tracking-tight">+248%</h3>
                    </div>
                    <TrendingUp className="w-10 h-10 text-green-400 mb-1" />
                  </div>
                  <div className="mt-6 h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[85%] rounded-full shadow-[0_0_15px_rgba(34,197,94,0.5)]"></div>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { label: "Data Encryption", status: "Active", color: "text-blue-400" },
                    { label: "IP Masking", status: "Enabled", color: "text-blue-400" },
                    { label: "Threat Detection", status: "No threats", color: "text-green-400" }
                  ].map((log, i) => (
                    <div key={i} className="flex justify-between items-center text-[11px] font-mono py-2 border-b border-white/5 last:border-0">
                      <span className="text-slate-500">{log.label}</span>
                      <span className={`${log.color} font-bold`}>{log.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}