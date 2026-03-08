// app/freelancex/events/page.tsx

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Zap, Globe, ArrowRight, 
  Users, X, Loader2, 
  ShieldCheck, ChevronRight,
  Mail, PlayCircle, Radio, 
  MessageSquare} from 'lucide-react';

import Navbar from '@/components/freelancex/layout/HomeNavbar';
import Footer from '@/components/freelancex/landing/Footer';

const CATEGORIES = ["All Events", "Masterclass", "Live Sprints", "Workshops"];

const UPCOMING_EVENTS = [
  {
    id: 1,
    title: "Next.js 16 & Distributed Nodes",
    category: "Masterclass",
    date: "March 15, 2026",
    attendees: "1.2k",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop",
    icon: Zap,
    status: "Trending"
  },
  {
    id: 2,
    title: "AI Engineering Summit 2026",
    category: "Workshops",
    date: "March 22, 2026",
    attendees: "5k+",
    image: "https://img.freepik.com/free-photo/futuristic-scene-with-high-tech-robot-used-construction-industry_23-2151329506.jpg?t=st=1772979909~exp=1772983509~hmac=5d516cf77f765f9767cdb69673f945c6123d831298af6f17a814eca99ac85595&w=1480",
    icon: Globe,
    status: "Limited"
  },
  {
    id: 3,
    title: "The Gig Economy Manifesto",
    category: "Live Sprints",
    date: "April 05, 2026",
    attendees: "800",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop",
    icon: Radio,
    status: "Open"
  }
];

const PAST_VAULT = [
  { id: "dQw4w9WgXcQ", title: "Autonomous DB Design", views: "12k", duration: "45:10", img: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: "L_o_O7v1h3A", title: "RAG Pipeline Scaling", views: "8k", duration: "52:00", img: "https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: "fLeJJPxua3E", title: "Escrow Logic v4", views: "15k", duration: "38:22", img: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: "6v2L2UGZJAM", title: "Neural Vetting Intro", views: "20k", duration: "1:05:12", img: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=400" }
];

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("All Events");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const handleRegisterClick = (event: any) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const adminPhone = "918700236923";
    const msg = `*🚀 Event RSVP*%0A*Event:* ${selectedEvent?.title}%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}`;
    setTimeout(() => {
        window.open(`https://wa.me/${adminPhone}?text=${msg}`, '_blank');
        setIsSubmitting(false);
        setIsModalOpen(false);
    }, 1500);
  };

  const filteredEvents = activeTab === "All Events" 
    ? UPCOMING_EVENTS 
    : UPCOMING_EVENTS.filter(event => event.category === activeTab);

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-24 lg:pt-32 pb-24 relative">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 md:mb-32">
          <div className="relative rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border border-white/5 shadow-3xl bg-slate-900/40 backdrop-blur-sm group">
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#020617] via-[#020617]/80 to-transparent z-10" />
            <img 
              src="https://img.freepik.com/free-photo/online-data_1098-16295.jpg?t=st=1772979865~exp=1772983465~hmac=fee9ac007105434ae8e31f28b3421fa6940a789a3b276eee1b77801919ad0ff6&w=1480" 
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:scale-105 transition-transform duration-[5s]" 
              alt="Conference Hall" 
            />
            
            <div className="relative z-20 p-8 md:p-24 max-w-4xl space-y-8">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
                <Radio size={14} className="text-blue-400 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Live Infrastructure Hub</span>
              </motion.div>
              
              <h1 className="text-4xl md:text-8xl font-black tracking-tighter leading-[0.9]">
                Technical <br className="hidden md:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 font-extrabold">Mastery.</span>
              </h1>
              <p className="text-slate-400 text-lg md:text-xl font-medium max-w-xl leading-relaxed">
                Connect your node to the source. Exclusive workshops and masterclasses for the global elite engineering network.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6 pt-6">
                <button 
                  onClick={() => handleRegisterClick({title: "Global Tech Mastery"})}
                  className="w-full sm:w-auto px-10 py-5 bg-white text-black font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95"
                >
                  Initialize RSVP <ArrowRight size={20} />
                </button>
                <div className="flex items-center gap-3 text-slate-400">
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => <img key={i} src={`https://i.pravatar.cc/100?img=${i+20}`} className="w-10 h-10 rounded-full border-4 border-[#020617]" alt="node" />)}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest">+1.4k Synced</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mb-20 md:mb-32 overflow-hidden">
            <div className="flex items-center gap-8 py-6 border-y border-white/5 whitespace-nowrap">
                {[1,2,3].map((_, i) => (
                    <div key={i} className="flex items-center gap-12 animate-marquee">
                        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
                            <Zap size={14} className="text-blue-500" /> Vetting Session Live
                        </div>
                        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
                            <Users size={14} className="text-emerald-500" /> 1240+ Active Viewers
                        </div>
                        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
                            <ShieldCheck size={14} className="text-indigo-500" /> Protocol Secure
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 md:mb-32 space-y-12">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase leading-tight">Upcoming <span className="text-indigo-400 italic">Syncs.</span></h2>
              <p className="text-slate-500 font-medium">Reserve your slot in the high-fidelity technical stream.</p>
            </div>
            <div className="flex p-1 bg-white/5 border border-white/10 rounded-2xl overflow-x-auto no-scrollbar">
              {CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === cat ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-500 hover:text-white'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <motion.div 
                key={event.id}
                whileHover={{ y: -10 }}
                className="group bg-[#0a0f1d]/60 border border-white/5 hover:border-blue-500/30 rounded-[2.5rem] overflow-hidden backdrop-blur-xl transition-all shadow-xl cursor-pointer"
                onClick={() => handleRegisterClick(event)}
              >
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                  <img src={event.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={event.title} />
                  <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 flex items-center gap-2">
                    <event.icon size={12} className="text-blue-400" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-200">{event.category}</span>
                  </div>
                  <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-black uppercase tracking-widest">
                    {event.status}
                  </div>
                </div>
                
                <div className="p-8 space-y-6">
                  <h3 className="text-xl font-bold leading-tight group-hover:text-blue-400 transition-colors h-14 line-clamp-2">{event.title}</h3>
                  <div className="flex items-center justify-between py-4 border-y border-white/5">
                    <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                      <Calendar size={14} className="text-indigo-400" /> {event.date}
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                      <Users size={14} className="text-blue-400" /> {event.attendees}
                    </div>
                  </div>
                  <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl font-black uppercase tracking-[0.2em] text-[9px] group-hover:bg-white group-hover:text-black transition-all flex items-center justify-center gap-2">
                    Secure Access <ChevronRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 md:mb-32">
          <div className="bg-[#0a0f1d] border border-white/10 rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full" />
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
               <div>
                  <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">On-Demand <span className="text-blue-400 italic">Vault.</span></h2>
                  <p className="text-slate-500 font-medium text-sm md:text-base mt-2">Access encrypted recordings of our highest-tier sessions.</p>
               </div>
               <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">Unlock All Sessions</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PAST_VAULT.map((v, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setActiveVideo(v.id)}
                  className="relative aspect-[16/10] rounded-3xl overflow-hidden cursor-pointer group border border-white/5 shadow-2xl"
                >
                  <img src={v.img} className="absolute inset-0 w-full h-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-110" alt="vault thumbnail" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                  <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all">
                    <PlayCircle size={48} className="text-white fill-white/20" />
                  </div>
                  <div className="absolute bottom-5 left-5 z-20">
                     <p className="text-[10px] font-black uppercase text-blue-400 tracking-widest mb-1">{v.views} Viewed</p>
                     <h4 className="text-sm font-bold text-white leading-tight">{v.title}</h4>
                  </div>
                  <div className="absolute top-4 right-4 z-20 px-2 py-1 rounded bg-black/60 text-[9px] font-mono text-white/70">
                    {v.duration}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 md:mb-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8">
               <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <MessageSquare className="text-indigo-400" size={32} />
               </div>
               <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight uppercase">Private Peer <br/> <span className="text-indigo-400 italic font-black">Networking.</span></h2>
               <p className="text-slate-400 text-lg leading-relaxed font-medium">
                  Protocol events are followed by private "Node Breakouts" where senior architects and leads discuss deployment strategies in a secure environment.
               </p>
               <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-md">
                     <p className="text-2xl font-black text-white mb-1">1:1</p>
                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Architect Sprints</p>
                  </div>
                  <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-md">
                     <p className="text-2xl font-black text-white mb-1">Global</p>
                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Node Connect</p>
                  </div>
               </div>
            </div>
            
            <div className="relative group">
               <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000" />
               <div className="relative bg-[#0a0f1d] border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-3xl">
                  <h3 className="text-2xl font-black mb-6 flex items-center gap-3 uppercase tracking-tighter"><Users className="text-blue-500" /> Active Connections</h3>
                  <div className="space-y-6">
                     {[1,2,3].map(i => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all cursor-default">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center font-black text-xs text-slate-500">Node</div>
                              <span className="text-sm font-bold text-slate-300 tracking-tight">Lead_Node_00{i+10}</span>
                           </div>
                           <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Ready
                           </div>
                        </div>
                     ))}
                  </div>
                  <button className="w-full mt-8 py-5 bg-blue-600 text-white font-black uppercase tracking-widest text-[11px] rounded-2xl shadow-xl hover:bg-blue-500 transition-all active:scale-95">Initialize Connection</button>
               </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="relative rounded-[3rem] md:rounded-[4rem] overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-indigo-900 p-12 md:p-24 text-center shadow-[0_0_80px_rgba(37,99,235,0.15)]">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
              <div className="relative z-10 max-w-3xl mx-auto space-y-10">
                 <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-tight uppercase">Sync With The Elite <br/> Global Pipeline.</h2>
                 <p className="text-blue-100/70 text-lg md:text-xl font-medium">Join the next protocol session and elevate your technical grade. Secure your node in the ecosystem.</p>
                 <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                    <button 
                      onClick={() => handleRegisterClick({title: "Full Ecosystem Access"})}
                      className="w-full sm:w-auto px-12 py-5 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:scale-105 transition-all shadow-[0_0_50px_rgba(255,255,255,0.2)] text-xs tracking-[0.2em] active:scale-95"
                    >
                      Join Protocol Now
                    </button>
                    <button className="w-full sm:w-auto px-12 py-5 bg-transparent border-2 border-white/20 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all text-xs tracking-[0.2em]">
                      View Session Catalog
                    </button>
                 </div>
              </div>
           </div>
        </section>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center py-20 text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] text-slate-600">
            <ShieldCheck size={14} className="text-emerald-500" /> 
            <span>Verified Protocol Event Network</span>
            <span className="hidden md:inline text-slate-800">|</span>
            <span>End-to-End Encrypted Sessions</span>
        </div>

      </main>

      <Footer />

      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-20">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveVideo(null)} className="absolute inset-0 bg-black/98 backdrop-blur-3xl" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-6xl aspect-video bg-black rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] border border-white/10">
              <button onClick={() => setActiveVideo(null)} className="absolute top-6 right-6 z-50 p-4 bg-white/5 hover:bg-red-500 rounded-full transition-all"><X size={24} /></button>
              <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${activeVideo}`} title="Event Recording" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/95 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 30 }} className="relative bg-[#0a0f1d] border border-white/10 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] max-w-lg w-full shadow-3xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl rounded-full" />
              <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 p-2 text-slate-500 hover:text-white transition-colors"><X size={24}/></button>
              
              <div className="mb-10 text-center md:text-left">
                 <p className="text-[10px] font-black uppercase text-blue-400 tracking-[0.3em] mb-3">Protocol Entry RSVP</p>
                 <h3 className="text-2xl font-black tracking-tight leading-tight uppercase text-white">{selectedEvent?.title}</h3>
              </div>

              <form onSubmit={handleRegistration} className="space-y-4">
                <div className="relative group">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-400" size={16} />
                    <input required type="text" placeholder="Identity Label (Full Name)" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 text-sm text-white focus:border-blue-500 outline-none transition-all placeholder:text-slate-700" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-400" size={16} />
                    <input required type="email" placeholder="Communication Email" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 text-sm text-white focus:border-blue-500 outline-none transition-all placeholder:text-slate-700" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <button disabled={isSubmitting} type="submit" className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 text-[10px] sm:text-xs active:scale-95">
                  {isSubmitting ? <Loader2 className="animate-spin" size={20}/> : <>Initialize Sync Protocol <ChevronRight size={18} /></>}
                </button>
                <p className="text-[8px] font-black text-center text-slate-600 uppercase tracking-widest mt-6 leading-relaxed border-t border-white/5 pt-4">Secure node authentication powered by Manee Pro 2.5</p>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 50s linear infinite;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}