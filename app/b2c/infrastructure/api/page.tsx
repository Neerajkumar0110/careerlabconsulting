'use client';

import React, { useState } from 'react';
import { 
  Terminal, Lock, Copy, Check, Code2, 
  AlertCircle, Hash, ExternalLink, Play, 
  ChevronRight, Database, Globe, Cpu
} from 'lucide-react';
import B2CHeader from '@/components/b2c/B2CHeader';
import Footer from '@/components/b2c/Footer';

const ENDPOINTS = [
  {
    id: "get-sessions",
    method: "GET",
    path: "/v1/sessions",
    description: "List all upcoming mentorship sessions with real-time availability.",
    auth: "Required",
    params: ["limit (int)", "offset (int)"],
    sampleResponse: {
      status: "success",
      data: [
        { id: "sess_01", expert: "Dr. Smith", time: "2024-10-25T10:00:00Z", available: true }
      ]
    }
  },
  {
    id: "post-booking",
    method: "POST",
    path: "/v1/bookings/create",
    description: "Initialize a new booking transaction and lock the expert slot.",
    auth: "Required",
    params: ["expert_id (uuid)", "slot_id (uuid)"],
    sampleResponse: {
      status: "pending",
      booking_id: "book_9921",
      message: "Transaction initialized. Awaiting payment."
    }
  }
];

export default function APIDocs() {
  const [copied, setCopied] = useState<string | null>(null);
  const [activeConsole, setActiveConsole] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleTestApi = (id: string) => {
    setLoading(true);
    setActiveConsole(id);
    // Simulating API Call
    setTimeout(() => setLoading(false), 800);
  };

  return (
    <main className="min-h-screen bg-[#020617] text-slate-300 selection:bg-emerald-500/30">
      <B2CHeader />

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-16 px-6 border-b border-white/5 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
              <Terminal size={20} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">Live API Playground</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter mb-6 leading-none">
            Tech <span className="text-slate-500 font-light">Stack</span> Documentation
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl font-medium italic">
            Automate your mentorship workflows with our high-performance REST endpoints.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* --- MAIN CONTENT --- */}
        <div className="lg:col-span-8 space-y-20">
          
          {/* AUTH SECTION */}
          <section className="space-y-6">
            <div className="flex items-center gap-4 mb-2">
              <Lock className="text-emerald-500" size={24} />
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tight">Security Protocol</h2>
            </div>
            <p className="text-slate-400 font-medium">Use Bearer Authentication to access protected resources.</p>
            <div className="bg-black/50 border border-white/10 rounded-3xl p-6 relative group">
              <pre className="text-xs font-mono text-emerald-500 overflow-x-auto">
                <code>Authorization: Bearer {'<YOUR_SECRET_KEY>'}</code>
              </pre>
            </div>
          </section>

          {/* ENDPOINTS SECTION */}
          <section className="space-y-12">
            <h2 className="text-3xl font-black text-white uppercase italic">Available Endpoints</h2>
            
            <div className="space-y-10">
              {ENDPOINTS.map((api) => (
                <div key={api.id} className="group border-l-2 border-white/5 hover:border-emerald-500 pl-6 md:pl-10 transition-all">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${api.method === 'GET' ? 'bg-blue-500/10 text-blue-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                      {api.method}
                    </span>
                    <code className="text-lg font-bold text-white tracking-tight">{api.path}</code>
                  </div>
                  
                  <p className="text-slate-400 italic mb-8 max-w-xl leading-relaxed">{api.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Console & Schema */}
                    <div className="space-y-6">
                      <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Interactive Console</span>
                          <button 
                            onClick={() => handleTestApi(api.id)}
                            className="flex items-center gap-2 text-[10px] font-black uppercase text-emerald-500 hover:text-emerald-400 transition-all"
                          >
                            <Play size={12} fill="currentColor" /> Try It
                          </button>
                        </div>
                        
                        <div className="bg-black/40 rounded-xl p-4 min-h-[100px] border border-white/5">
                          {activeConsole === api.id ? (
                            <pre className="text-[11px] font-mono text-slate-400 animate-in fade-in duration-500">
                              {loading ? (
                                <span className="animate-pulse">Fetching data from cluster...</span>
                              ) : (
                                JSON.stringify(api.sampleResponse, null, 2)
                              )}
                            </pre>
                          ) : (
                            <div className="h-full flex items-center justify-center text-[10px] text-slate-600 uppercase font-black tracking-widest italic">
                              Click "Try It" to see response
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Parameters Table */}
                    <div className="bg-black/20 p-6 rounded-3xl border border-white/5">
                      <h5 className="text-[10px] font-black uppercase text-slate-500 mb-4 tracking-widest">Parameters</h5>
                      <div className="space-y-3">
                        {api.params.map(p => (
                          <div key={p} className="flex items-center justify-between border-b border-white/5 pb-2">
                            <code className="text-xs text-emerald-500 font-bold">{p.split(' ')[0]}</code>
                            <span className="text-[10px] text-slate-600 font-black uppercase italic">{p.split(' ')[1]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* --- SIDEBAR TOOLS --- */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="sticky top-32 space-y-6">
            <div className="p-8 bg-emerald-500/5 border border-emerald-500/10 rounded-[2.5rem] relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Code2 size={120} />
              </div>
              <h4 className="text-white font-black uppercase italic mb-6">Resources</h4>
              <div className="space-y-3">
                {[
                  { label: "Postman Collection", icon: ExternalLink },
                  { label: "SDK Documentation", icon: ChevronRight },
                  { label: "Webhooks Guide", icon: Hash }
                ].map((item, i) => (
                  <button key={i} className="w-full flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-emerald-500 hover:text-white transition-all text-[11px] font-black uppercase tracking-tighter group">
                    {item.label}
                    <item.icon size={14} className="opacity-50 group-hover:opacity-100" />
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4">
               <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-500 tracking-widest">
                  <AlertCircle size={14} /> Global Limits
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-black/40 rounded-xl">
                    <p className="text-lg font-black text-white italic">100/m</p>
                    <p className="text-[9px] text-slate-500 uppercase font-black">Free Tier</p>
                  </div>
                  <div className="text-center p-3 bg-emerald-500/10 rounded-xl">
                    <p className="text-lg font-black text-emerald-500 italic">∞/m</p>
                    <p className="text-[9px] text-slate-500 uppercase font-black tracking-tight">Enterprise</p>
                  </div>
               </div>
            </div>
          </div>
        </aside>

      </div>

      <Footer />
    </main>
  );
}