"use client"; 

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  ShieldCheck,
  Cpu,
  ArrowRight,
  ExternalLink,
  MessageCircle
} from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: 'AI Transformation Strategy',
    message: ''
  });

  const handleWhatsAppRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    
    const text = `*New Project Inquiry*%0A%0A` +
                 `*Name:* ${formData.name}%0A` +
                 `*Email:* ${formData.email}%0A` +
                 `*Interest:* ${formData.interest}%0A` +
                 `*Message:* ${formData.message}`;
    
    const whatsappNumber = "918700236923";
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-600/30 font-sans">
      <Navbar />

      <section className="relative pt-32 pb-12 md:pt-48 md:pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(37,99,235,0.15)_0%,_transparent_50%)] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/5 border border-blue-500/10 mb-6 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400/80">Available for Global Deployment</span>
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase mb-8 italic leading-[0.8]">
            Direct <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500">Command.</span>
          </h1>
          <p className="max-w-xl mx-auto text-slate-400 text-sm md:text-lg font-light leading-relaxed">
            Skip the inbox. Transmit your project requirements directly to our lead engineering node via encrypted signal.
          </p>
        </div>
      </section>

      <section className="pb-32 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="p-10 rounded-[3rem] bg-gradient-to-br from-slate-900/50 to-black border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Cpu size={120} />
                </div>
                
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-12">HQ_Credentials</h3>
                
                <div className="space-y-10 relative z-10">
                  <div className="flex gap-6">
                    <MapPin className="text-blue-500 shrink-0" size={24} />
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Location</h4>
                      <p className="text-base md:text-lg text-slate-200 font-bold leading-tight">
                        DLF Cyber City, 5th Floor, <br />
                        Cyber Green-2, Sec-25, <br />
                        Gurugram, HR - 122002
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <Phone className="text-blue-500 shrink-0" size={24} />
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Voice / Signal</h4>
                      <p className="text-xl md:text-2xl text-white font-black tracking-tighter">
                        +91 870023 6923
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <Mail className="text-blue-500 shrink-0" size={24} />
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">General Inquiry</h4>
                      <p className="text-base text-slate-200 font-bold">
                        info@careerlabconsulting.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-[2rem] bg-blue-600/5 border border-blue-500/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageCircle className="text-blue-500" size={18} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Average Response: 12m</span>
                </div>
                <div className="h-1 w-12 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-3/4"></div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="p-8 md:p-12 rounded-[3.5rem] bg-white/[0.01] border border-white/10 backdrop-blur-2xl shadow-inner shadow-white/5">
                <form onSubmit={handleWhatsAppRedirect} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Operator Name</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="John Doe" 
                        className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-blue-500/50 focus:bg-white/[0.07] transition-all text-sm font-medium" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Email Address</label>
                      <input 
                        required
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="john@firm.com" 
                        className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-blue-500/50 focus:bg-white/[0.07] transition-all text-sm font-medium" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Deployment Area</label>
                    <select 
                      value={formData.interest}
                      onChange={(e) => setFormData({...formData, interest: e.target.value})}
                      className="w-full bg-[#050a18] border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-blue-500/50 transition-all text-sm font-medium text-slate-300 appearance-none cursor-pointer"
                    >
                      <option>AI Transformation Strategy</option>
                      <option>Custom SaaS Development</option>
                      <option>Machine Learning Operations</option>
                      <option>Career Consulting (Individual)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Mission Brief</label>
                    <textarea 
                      required
                      rows={5} 
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Describe the neural requirements..." 
                      className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-6 outline-none focus:border-blue-500/50 focus:bg-white/[0.07] transition-all text-sm resize-none font-medium"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full group bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all hover:translate-y-[-2px] shadow-lg shadow-blue-600/20"
                  >
                    Open Secure WhatsApp Channel <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>

                  <div className="flex items-center justify-center gap-6 pt-4 opacity-30">
                    <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest">
                      <ShieldCheck size={14} /> SOC2 Compliant
                    </div>
                    <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest">
                      <Cpu size={14} /> Signal Encrypted
                    </div>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="pb-32 px-6">
        <div className="max-w-6xl mx-auto group">
          <div className="relative rounded-[3.5rem] overflow-hidden h-96 border border-white/5 shadow-2xl">
            <img 
              src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-1000"
              alt="Gurugram Hub"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
               <button 
                 onClick={() => window.open('https://maps.google.com', '_blank')}
                 className="bg-white text-black px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all shadow-2xl"
               >
                 Navigate to Node <ExternalLink size={14} />
               </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ContactPage;