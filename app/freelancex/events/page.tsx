'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Zap, Globe, Star, ArrowRight, Play, 
  MapPin, Clock, Users, X, Loader2, CheckCircle2,
  Video, Laptop, ShieldCheck, ChevronRight,
  Mail, Youtube, PlayCircle
} from 'lucide-react';
import Link from 'next/link';

import Navbar from '@/components/freelancex/layout/HomeNavbar';
import Footer from '@/components/freelancex/landing/Footer';

const EVENT_CATEGORIES = ["All Sessions", "Masterclass", "Workshops", "Networking"];

const EVENTS = [
  {
    id: 1,
    title: "Next.js 16 & Server Actions Deep Dive",
    category: "Masterclass",
    date: "March 15, 2026",
    time: "10:00 AM IST",
    location: "Virtual Node 01",
    attendees: "1.2k+",
    image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=600",
    status: "Upcoming",
    icon: Zap
  },
  {
    id: 2,
    title: "Global AI Engineering Summit",
    category: "Workshops",
    date: "March 22, 2026",
    time: "08:00 PM IST",
    location: "Global Stream",
    attendees: "5k+",
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600",
    status: "Filling Fast",
    icon: Globe
  },
  {
    id: 3,
    title: "Freelance Economy & High-Ticket Sprints",
    category: "Networking",
    date: "April 05, 2026",
    time: "06:00 PM IST",
    location: "Private Hub",
    attendees: "800",
    image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=600",
    status: "Open",
    icon: Star
  }
];

const VAULT_VIDEOS = [
  { id: "dQw4w9WgXcQ", img: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg", title: "Scale with AI" },
  { id: "L_o_O7v1h3A", img: "https://images.pexels.com/photos/7688151/pexels-photo-7688151.jpeg", title: "Clean Architecture" },
  { id: "fLeJJPxua3E", img: "https://images.pexels.com/photos/7688460/pexels-photo-7688460.jpeg", title: "Cloud Ops V2" },
  { id: "6v2L2UGZJAM", img: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg", title: "Neural Sync" }
];

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("All Sessions");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const filteredEvents = activeTab === "All Sessions" 
    ? EVENTS 
    : EVENTS.filter(event => event.category === activeTab);

  const handleRegister = (event: any) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/referral', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, eventTitle: selectedEvent.title })
      });

      if (res.ok) {
        const ownerPhone = "918700236923";
        const msg = `*New Event Registration*%0A*Name:* ${formData.name}%0A*Event:* ${selectedEvent.title}`;
        window.open(`https://wa.me/${ownerPhone}?text=${msg}`, '_blank');
        setIsModalOpen(false);
      }
    } catch (err) {
      alert("Registration failed. Retry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-24 md:pt-32 pb-16 relative">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-0">
          <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-indigo-600/10 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-600/10 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16 md:space-y-32">
          
          <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden group border border-white/5 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#020617] via-[#020617]/90 md:via-[#020617]/70 to-transparent z-10" />
            <img 
              src="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 md:opacity-40 group-hover:scale-105 transition-transform duration-[3s]"
              alt="Featured Event"
            />
            
            <div className="relative z-20 p-6 sm:p-10 md:p-20 max-w-3xl space-y-6 md:space-y-8 text-center md:text-left">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-white">Live Masterclass Series</span>
              </motion.div>
              
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-tight">
                Mastering the <br className="hidden sm:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">AI Sprint Cycle.</span>
              </h1>
              
              <p className="text-slate-400 text-sm md:text-xl font-medium max-w-lg leading-relaxed mx-auto md:mx-0">
                Join our Lead AI Architect for an exclusive session on deploying autonomous database nodes. 
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 pt-4 justify-center md:justify-start">
                <button onClick={() => handleRegister({title: "AI Sprint Cycle Masterclass"})} className="w-full sm:w-auto px-8 py-4 md:px-10 md:py-5 bg-white text-black font-black uppercase tracking-widest rounded-xl md:rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-xl flex items-center justify-center gap-3">
                  Claim Your Invite <ArrowRight size={20} />
                </button>
                <div className="flex items-center gap-3 text-slate-400">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-[#020617] bg-slate-800" alt="user" />)}
                  </div>
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">+1.2k Registered</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-10 md:space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
              <div className="space-y-3 text-center md:text-left">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight">Explore <span className="text-blue-400">Sessions.</span></h2>
                <p className="text-slate-500 text-sm md:text-base font-medium">Curated technical knowledge for the top 1%.</p>
              </div>
              
              <div className="flex p-1 bg-white/5 rounded-xl border border-white/10 overflow-x-auto no-scrollbar mx-auto md:mx-0">
                {EVENT_CATEGORIES.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={`px-4 py-2 md:px-6 md:py-2.5 rounded-lg text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === cat ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <AnimatePresence mode="popLayout">
                {filteredEvents.map((event) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={event.id}
                    className="bg-[#0a0f1d]/60 border border-white/5 hover:border-blue-500/30 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden backdrop-blur-xl group transition-all"
                  >
                    <div className="relative h-48 md:h-56 overflow-hidden">
                      <img src={event.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={event.title} />
                      <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-2">
                        <event.icon size={12} className="text-blue-400" />
                        <span className="text-[9px] font-black uppercase tracking-widest">{event.category}</span>
                      </div>
                    </div>
                    
                    <div className="p-6 md:p-8 space-y-5 md:space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[9px] md:text-[10px] uppercase tracking-widest">
                          <CheckCircle2 size={12} /> {event.status}
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-500 text-[9px] md:text-[10px] font-bold">
                          <Users size={12} /> {event.attendees}
                        </div>
                      </div>
                      
                      <h3 className="text-lg md:text-xl font-black leading-tight text-white group-hover:text-blue-400 transition-colors line-clamp-2 h-12 md:h-14">{event.title}</h3>
                      
                      <div className="grid grid-cols-1 gap-2 pt-4 border-t border-white/5">
                        <div className="flex items-center gap-3 text-slate-400 text-xs font-medium">
                          <Calendar size={14} className="text-indigo-400" /> {event.date}
                        </div>
                        <div className="flex items-center gap-3 text-slate-400 text-xs font-medium">
                          <Clock size={14} className="text-indigo-400" /> {event.time}
                        </div>
                      </div>

                      <button 
                        onClick={() => handleRegister(event)}
                        className="w-full py-4 bg-white/5 hover:bg-white text-white hover:text-black font-black uppercase tracking-[0.2em] text-[9px] md:text-[10px] rounded-xl md:rounded-2xl transition-all flex items-center justify-center gap-2 border border-white/10"
                      >
                        Secure Spot <ChevronRight size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          <div className="bg-[#0a0f1d]/40 border border-white/5 rounded-[2rem] md:rounded-[3rem] p-6 md:p-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 md:mb-12 text-center md:text-left">
              <div>
                <h2 className="text-2xl md:text-4xl font-black mb-2 uppercase tracking-tight">On-Demand <span className="text-indigo-400">Vault.</span></h2>
                <p className="text-slate-500 text-xs md:text-sm font-medium">Access encrypted recordings of past high-ticket sessions.</p>
              </div>
              <button className="w-full md:w-auto px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all">Browse All</button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {VAULT_VIDEOS.map((item, i) => (
                <div 
                  key={i} 
                  onClick={() => setActiveVideo(item.id)}
                  className="relative aspect-video rounded-2xl md:rounded-3xl overflow-hidden group cursor-pointer border border-white/5"
                >
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-all z-10" />
                  <img src={item.img} className="w-full h-full object-cover" alt="Past Event" />
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center text-black shadow-2xl">
                      <Play fill="currentColor" size={20} />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 z-20">
                    <p className="text-[8px] md:text-[9px] font-black uppercase text-white/70 tracking-[0.2em] mb-1">Session 0{i+1}</p>
                    <p className="text-xs md:text-sm font-bold text-white">{item.title}</p>
                  </div>
                  <div className="absolute top-4 right-4 z-20">
                    <Youtube size={16} className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center py-6 border-t border-white/5 text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">
            <ShieldCheck size={14} className="text-emerald-500" /> 
            <span>Verified Protocol Event Network</span>
            <span className="hidden md:inline text-slate-700">|</span>
            <span>End-to-End Encrypted Sessions</span>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-10">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setActiveVideo(null)} 
              className="absolute inset-0 bg-black/98 backdrop-blur-2xl" 
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(0,0,0,1)] bg-black z-[10000]"
            >
              <button 
                onClick={() => setActiveVideo(null)} 
                className="absolute top-4 right-4 md:top-6 md:right-6 text-white/50 hover:text-white transition-all z-[10001] p-3 bg-white/5 hover:bg-red-500 rounded-full"
              >
                <X size={24} />
              </button>
              
              <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0&modestbranding=1&showinfo=0`} 
                title="Protocol Video Vault" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 sm:px-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/95 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative bg-[#0a0f1d] border border-white/10 p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] max-w-xl w-full shadow-3xl overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none" />
               <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-full text-slate-500 hover:text-white transition-all"><X size={20} /></button>
               
               <div className="mb-8 text-center md:text-left">
                  <span className="text-[9px] font-black uppercase text-blue-400 tracking-[0.3em] mb-2 block">Secure Node Access</span>
                  <h3 className="text-xl md:text-2xl font-black mb-2 tracking-tight leading-tight">Register for Session</h3>
                  <p className="text-slate-400 text-xs italic line-clamp-1">{selectedEvent?.title}</p>
               </div>

               <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                  <div className="relative group">
                     <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={16} />
                     <input required type="text" placeholder="Your Identity Name" className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-4 pl-12 pr-6 text-sm outline-none focus:border-blue-500 transition-all text-white placeholder:text-slate-600" onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="relative group">
                     <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={16} />
                     <input required type="email" placeholder="Communication Email" className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-4 pl-12 pr-6 text-sm outline-none focus:border-blue-500 transition-all text-white placeholder:text-slate-600" onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div className="relative group">
                     <Video className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={16} />
                     <input required type="tel" placeholder="WhatsApp Hub" className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-4 pl-12 pr-6 text-sm outline-none focus:border-blue-500 transition-all text-white placeholder:text-slate-600" onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>

                  <button disabled={isSubmitting} type="submit" className="w-full py-4 md:py-5 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-[0.2em] rounded-xl md:rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 mt-4 text-[10px] md:text-xs">
                    {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <>Initialize Registration <ChevronRight size={16} /></>}
                  </button>
                  <p className="text-[8px] md:text-[9px] text-center text-slate-500 uppercase tracking-widest mt-4">Node-to-Node Secure Confirmation</p>
               </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}