'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, Phone, MapPin, Send, 
  MessageSquare, User, Map, Users
} from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // Standard styles

import B2CHeader from '@/components/b2c/B2CHeader';
import Footer from '@/components/b2c/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    persona: 'Student/Fresher',
    protocol: 'Data Analytics Protocol',
    message: ''
  });

  const OWNER_PHONE = "918700236923"; 

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const text = `*New Enrollment Inquiry - CLC Website*%0A%0A` +
                 `*👤 Name:* ${formData.name}%0A` +
                 `*📧 Email:* ${formData.email}%0A` +
                 `*📞 Phone:* ${formData.phone}%0A` +
                 `*📍 City:* ${formData.city}%0A` +
                 `*🎭 Persona:* ${formData.persona}%0A` +
                 `*📚 Protocol:* ${formData.protocol}%0A` +
                 `*💬 Message:* ${formData.message}`;

    const whatsappUrl = `https://wa.me/${OWNER_PHONE}?text=${text}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col selection:bg-blue-500/30">
      <B2CHeader />

      {/* Custom styles for Phone Input to match your UI */}
      <style jsx global>{`
        .react-tel-input .form-control {
          width: 100% !important;
          background: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 1rem !important;
          height: 60px !important;
          color: white !important;
          padding-left: 58px !important;
          font-size: 16px !important;
        }
        .react-tel-input .flag-dropdown {
          background: transparent !important;
          border: none !important;
          border-radius: 1rem 0 0 1rem !important;
          padding-left: 8px !important;
        }
        .react-tel-input .selected-flag:hover, 
        .react-tel-input .selected-flag:focus {
          background: rgba(255, 255, 255, 0.05) !important;
        }
        .react-tel-input .country-list {
          background: #0f172a !important;
          color: white !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 12px !important;
        }
        .react-tel-input .country-list .country:hover {
          background: rgba(59, 130, 246, 0.2) !important;
        }
        .react-tel-input .country-list .country.highlight {
          background: #3b82f6 !important;
        }
      `}</style>

      <main className="flex-grow pt-32 pb-20">
        <section className="px-4 max-w-7xl mx-auto text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <MessageSquare size={14} /> Admissions Open 2026
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none mb-6">
            Get In <span className="text-blue-500">Touch.</span>
          </h1>
        </section>

        <section className="px-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 bg-white/[0.02] border border-white/10 rounded-[48px] p-6 md:p-12 shadow-3xl backdrop-blur-md relative"
          >
            <h3 className="text-3xl font-black mb-10 italic uppercase tracking-tighter">
              Enrollment <span className="text-blue-500 underline decoration-4 underline-offset-8">Inquiry</span>
            </h3>
            
            <form className="space-y-6" onSubmit={handleWhatsAppSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-500 ml-1 tracking-[0.2em]">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 z-10" size={18} />
                    <input required type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-blue-500 focus:bg-white/[0.07] transition-all" onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-500 ml-1 tracking-[0.2em]">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 z-10" size={18} />
                    <input required type="email" placeholder="john@example.com" className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-blue-500 focus:bg-white/[0.07] transition-all" onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Updated Phone Field with Flag */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-500 ml-1 tracking-[0.2em]">Phone Number</label>
                  <div className="relative phone-container">
                    <PhoneInput
                      country={'in'}
                      value={formData.phone}
                      onChange={(phone) => setFormData({...formData, phone: phone})}
                      inputProps={{
                        required: true,
                        name: 'phone'
                      }}
                      containerClass="!w-full"
                      buttonClass="!bg-transparent !border-none"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-500 ml-1 tracking-[0.2em]">Current City</label>
                  <div className="relative">
                    <Map className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 z-10" size={18} />
                    <input required type="text" placeholder="e.g. Gurugram" className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-blue-500 focus:bg-white/[0.07] transition-all" onChange={(e) => setFormData({...formData, city: e.target.value})} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-500 ml-1 tracking-[0.2em]">Your Persona</label>
                  <div className="relative">
                    <Users className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 z-10" size={18} />
                    <select 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-blue-500 appearance-none cursor-pointer" 
                      onChange={(e) => setFormData({...formData, persona: e.target.value})}
                      value={formData.persona}
                    >
                      <option className="bg-[#020617]" value="Student/Fresher">Student/Fresher</option>
                      <option className="bg-[#020617]" value="Tech Professional">Tech Professional</option>
                      <option className="bg-[#020617]" value="Non Tech Professional">Non Tech Professional</option>
                      <option className="bg-[#020617]" value="Housewife">Housewife</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-500 ml-1 tracking-[0.2em]">Choose Protocol</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 appearance-none cursor-pointer" onChange={(e) => setFormData({...formData, protocol: e.target.value})}>
                    <option className="bg-[#020617]">Data Analytics Protocol</option>
                    <option className="bg-[#020617]">Full Stack Engineering</option>
                    <option className="bg-[#020617]">Cyber Security Protocol</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-500 ml-1 tracking-[0.2em]">Message</label>
                <textarea rows={3} placeholder="Tell us about your career goals..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 resize-none shadow-inner" onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
              </div>

              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-4 transition-all shadow-2xl shadow-blue-600/30 uppercase tracking-widest text-[14px]">
                Confirm Enrollment via WhatsApp <Send size={20} />
              </button>
            </form>
          </motion.div>

          {/* Right Column (Info Card & Map) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white/5 border border-white/10 p-8 rounded-[40px] space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="text-blue-500 shrink-0" size={24} />
                <p className="text-sm font-bold text-slate-300 italic">5th Floor, Cyber Green Part-1, DLF Building No -2, Sector 25, Gurugram, Haryana 122002</p>
              </div>
              <div className="h-px bg-white/10" />
              <a href={`tel:${OWNER_PHONE}`} className="flex items-center gap-4 text-slate-300 hover:text-blue-500 transition-colors">
                <Phone className="text-blue-500" /> +91 8700236923
              </a>
              <a href="mailto:support@careerlabconsulting.com" className="flex items-center gap-4 text-slate-300 hover:text-blue-500 transition-colors">
                <Mail className="text-blue-500" size={20} /> support@careerlabconsulting.com
              </a>
            </div>

            <div className="rounded-[40px] overflow-hidden border border-white/10 h-[350px] shadow-3xl relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.034568600125!2d77.08630717616186!3d28.478479691689212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d191630000001%3A0xf69f06a928956e17!2sDLF%20Cyber%20City%2C%20Gurugram!5e0!3m2!1sen!2sin!4v1700000000000" 
                width="100%" height="100%" 
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.7)' }} 
                allowFullScreen loading="lazy"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}