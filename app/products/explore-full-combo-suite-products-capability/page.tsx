import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { Mail, MapPin, Phone, ArrowRight, Shield, ShieldCheck, Zap, Globe } from 'lucide-react';

const ComboSuitePage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter">
            THE FULL <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">COMBO SUITE</span>
          </h1>
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            Experience the ultimate synergy of Business, Growth, Education, and Operations Suites. 
            A unified ecosystem designed for global enterprises ready to lead the AI revolution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20">
              Inquire Full Access
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-bold transition-all">
              View Capability Deck
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Global Scale", desc: "Deploy across continents with localized AI models.", icon: <Globe className="w-8 h-8 text-blue-400" /> },
            { title: "Fortified Security", desc: "Enterprise-grade encryption and data sovereignty.", icon: <Shield className="w-8 h-8 text-blue-400" /> },
            { title: "Real-time Sync", desc: "Zero-latency data transfer between all suite modules.", icon: <Zap className="w-8 h-8 text-blue-400" /> }
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-3xl bg-blue-900/10 border border-white/5 hover:border-blue-500/30 transition-all">
              <div className="mb-6">{item.icon}</div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact-hub" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            <div className="space-y-12">
              <div>
                <h2 className="text-4xl md:text-6xl font-extrabold mb-6">Contact Hub</h2>
                <p className="text-gray-400 text-lg">
                  Ready to integrate the Full Combo Suite? Reach out to our regional 
                  headquarters for a custom architectural roadmap.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">Our Location</h4>
                    <p className="text-gray-400 leading-relaxed">
                      DLF Cyber City, 5th Floor, Cyber Green-2,<br />
                      Sec-25, Gurugram, Haryana - 122002
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">Call Support</h4>
                    <p className="text-gray-400 text-lg">+91 870023 6923</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">Email Us</h4>
                    <p className="text-gray-400 text-lg">info@careerlabconsulting.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] blur opacity-20 transition duration-1000"></div>
              <div className="relative bg-[#03081a] border border-white/10 rounded-[2rem] p-8 md:p-12 backdrop-blur-xl">
                <h3 className="text-2xl font-bold mb-8">Direct Inquiry</h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" placeholder="Your Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-blue-500 outline-none transition-all" />
                    <input type="email" placeholder="Work Email" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-blue-500 outline-none transition-all" />
                  </div>
                  <input type="text" placeholder="Company Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-blue-500 outline-none transition-all" />
                  <textarea rows={4} placeholder="Tell us about your requirements..." className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-blue-500 outline-none transition-all resize-none"></textarea>
                  <button className="w-full py-5 bg-blue-600 hover:bg-blue-700 rounded-xl font-black text-lg transition-all flex items-center justify-center gap-2">
                    Submit Request <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto rounded-[3rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border border-white/10 shadow-2xl">
          <img 
            src="https://images.pexels.com/photos/3183186/pexels-photo-3183186.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Gurugram Cyber City Corporate" 
            className="w-full h-[400px] object-cover"
          />
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-t from-blue-600 to-indigo-600 rounded-[4rem] p-1 md:p-[1px]">
          <div className="bg-[#020617] rounded-[3.9rem] p-12 md:p-24 text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
             
             <div className="relative z-10">
                <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter">ONE SUITE. TOTAL CONTROL.</h2>
                <p className="text-blue-100/60 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light">
                  Join the elite enterprises running on the Career Lab Unified Stack. 
                  Based in Gurugram, scaling globally.
                </p>
                
                <div className="flex flex-col items-center gap-8">
                  <button className="bg-white text-blue-950 px-20 py-7 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                    REQUEST ARCHITECTURE
                  </button>
                  
                  <div className="flex flex-wrap justify-center gap-10 opacity-50">
                    <div className="flex items-center gap-2 font-mono text-sm tracking-widest">
                       <ShieldCheck className="w-4 h-4" /> SECURE_CORE
                    </div>
                    <div className="flex items-center gap-2 font-mono text-sm tracking-widest">
                       <Zap className="w-4 h-4" /> HIGH_LATENCY
                    </div>
                    <div className="flex items-center gap-2 font-mono text-sm tracking-widest">
                       <Globe className="w-4 h-4" /> GLOBAL_READY
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ComboSuitePage;