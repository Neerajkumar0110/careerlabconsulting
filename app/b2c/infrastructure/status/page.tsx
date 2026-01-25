'use client';

import React, { useState } from 'react';
import { 
  CheckCircle2, AlertCircle, Clock, RefreshCw, 
  Globe, Database, Shield, Zap, CreditCard, 
  MessageSquare, Mail, X 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';
import B2CHeader from '@/components/b2c/B2CHeader';
import Footer from '@/components/b2c/Footer';

// --- MOCK DATA ---
const LATENCY_DATA = [
  { time: '12:00', ms: 45 }, { time: '12:10', ms: 52 }, { time: '12:20', ms: 48 },
  { time: '12:30', ms: 61 }, { time: '12:40', ms: 55 }, { time: '12:50', ms: 42 },
  { time: '13:00', ms: 44 }, { time: '13:10', ms: 50 }, { time: '13:20', ms: 85 },
  { time: '13:30', ms: 49 }, { time: '13:40', ms: 46 }, { time: '13:50', ms: 43 },
];

const SERVICES = [
  { id: 1, name: "Core API Gateway", status: "operational", uptime: "99.99%", icon: Globe },
  { id: 2, name: "Booking Engine", status: "operational", uptime: "99.95%", icon: Zap },
  { id: 3, name: "User Auth Service", status: "operational", uptime: "100%", icon: Shield },
  { id: 4, name: "Main PostgreSQL DB", status: "degraded", uptime: "98.2%", icon: Database },
  { id: 5, name: "Payment Webhooks", status: "operational", uptime: "99.98%", icon: CreditCard },
  { id: 6, name: "Notification Pub/Sub", status: "operational", uptime: "99.90%", icon: MessageSquare }
];

export default function SystemStatus() {
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");

  const refreshStatus = () => {
    setLastUpdated(new Date().toLocaleTimeString());
  };

  return (
    <main className="min-h-screen bg-[#020617] text-slate-300 selection:bg-emerald-500/30 overflow-x-hidden">
      <B2CHeader />

      {/* --- HERO SECTION --- */}
      <section className="pt-24 md:pt-32 pb-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-emerald-500">
              Global Infrastructure Live
            </span>
          </div>
          
          <h1 className="text-4xl md:text-8xl font-black text-white italic uppercase tracking-tighter mb-6 leading-tight">
            System <span className="text-slate-500 font-light italic">Status</span>
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
             <button 
               onClick={() => setShowModal(true)}
               className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 text-black text-[10px] md:text-[11px] font-black uppercase tracking-tighter rounded-xl hover:bg-white transition-all shadow-lg"
             >
               <Mail size={14} /> Subscribe
             </button>
             <div className="w-full sm:w-auto px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase flex items-center justify-center gap-3">
                <Clock size={14} className="text-slate-500" /> 
                Refreshed: {lastUpdated}
                <RefreshCw size={12} className="text-emerald-500 cursor-pointer active:rotate-180 transition-transform" onClick={refreshStatus} />
             </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 md:px-6 pb-20 space-y-8 md:y-12">
        
        {/* --- LATENCY CHART --- */}
        <section className="bg-white/[0.02] border border-white/5 rounded-[1.5rem] md:rounded-[2.5rem] p-5 md:p-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl md:text-2xl font-black text-white uppercase italic">Latency</h2>
              <p className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">Global response time (ms)</p>
            </div>
            <div className="sm:text-right">
              <span className="text-2xl md:text-3xl font-black text-emerald-500 italic">48ms</span>
              <p className="text-[9px] font-black text-emerald-500/50 uppercase tracking-widest">Optimized</p>
            </div>
          </div>
          
          <div className="h-[200px] md:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={LATENCY_DATA}>
                <defs>
                  <linearGradient id="colorMs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="time" stroke="#475569" fontSize={9} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={9} tickLine={false} axisLine={false} width={25} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '12px', fontSize: '10px' }}
                  itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="ms" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorMs)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* --- SERVICE STATUS GRID --- */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service) => (
            <div key={service.id} className="bg-black/40 border border-white/5 p-5 md:p-6 rounded-2xl md:rounded-3xl hover:border-emerald-500/20 transition-all group">
              <div className="flex justify-between items-start mb-4 md:mb-6">
                <div className={`p-2.5 md:p-3 rounded-xl md:rounded-2xl ${service.status === 'operational' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                  <service.icon size={20} className="md:w-6 md:h-6" />
                </div>
                <div className={`w-2 h-2 rounded-full ${service.status === 'operational' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`} />
              </div>
              <h3 className="text-white font-black uppercase italic text-xs md:text-sm tracking-tight">{service.name}</h3>
              <div className="mt-3 md:mt-4 flex items-center justify-between text-[9px] md:text-[10px] font-black uppercase tracking-widest">
                <span className="text-slate-600">Uptime: {service.uptime}</span>
                <span className={service.status === 'operational' ? 'text-emerald-500' : 'text-amber-500'}>
                  {service.status}
                </span>
              </div>
            </div>
          ))}
        </section>

      </div>

      {/* --- MOBILE OPTIMIZED SUBSCRIPTION MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-[#0f172a] border border-white/10 w-full max-w-md rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 shadow-2xl animate-in zoom-in-95 fade-in duration-300">
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors">
              <X size={20} />
            </button>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Mail size={32} />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white uppercase italic mb-2">Subscribe</h2>
              <p className="text-slate-400 text-xs md:text-sm font-medium italic mb-8 leading-relaxed">Get real-time alerts on your email during incidents.</p>
              
              <div className="space-y-3">
                <input 
                  type="email" 
                  placeholder="name@email.com" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white text-sm focus:border-emerald-500 transition-all outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="w-full py-3.5 bg-emerald-500 text-black font-black uppercase text-[10px] rounded-xl hover:bg-white transition-all shadow-lg">
                  Activate Alerts
                </button>
              </div>
              <p className="mt-6 text-[8px] md:text-[9px] text-slate-600 font-black uppercase tracking-widest">No spam. Critical updates only.</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}