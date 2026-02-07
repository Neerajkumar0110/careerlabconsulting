'use client';

import React, { useState } from 'react';
import { 
  Calendar, Clock, User, Mail, Phone, MessageSquare, 
  Loader2, CheckCircle2, ChevronLeft, ArrowRight 
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BookDemoPage() {
  const router = useRouter();
  
  const [step, setStep] = useState<'calendar' | 'form' | 'success'>('calendar');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const getNextDays = () => {
    const dates = [];
    for (let i = 0; i < 6; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i + 1); 
      dates.push(d);
    }
    return dates;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
        const response = await fetch('/api/book-demo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...formData,
                selectedDate,
                selectedTime
            })
        });

        if (response.ok) {
            const ownerPhone = "918700236923";
            const message = `*New Demo Booking!* 📅%0A%0A*Name:* ${formData.name}%0A*Date:* ${selectedDate}%0A*Time:* ${selectedTime}%0A*Phone:* ${formData.phone}%0A*Email:* ${formData.email}`;
            const whatsappUrl = `https://wa.me/${ownerPhone}?text=${message}`;
            window.open(whatsappUrl, '_blank');
            
            setStep('success');
        } else {
            alert("Failed to book demo. Please try again.");
        }
    } catch (error) {
        console.error("Booking Error:", error);
        alert("An error occurred. Please check your connection.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 bg-[#0f172a] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
        
        <div className="bg-blue-600 p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
           <div className="absolute bottom-[-50px] right-[-50px] w-64 h-64 bg-blue-400/30 rounded-full blur-3xl"></div>
           
           <div className="relative z-10">
              <button onClick={() => router.back()} className="flex items-center gap-2 text-blue-100 hover:text-white text-xs font-bold uppercase tracking-widest mb-10 transition-colors">
                  <ChevronLeft className="w-4 h-4" /> Back
              </button>
              
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-6">
                 Career <br/> <span className="text-blue-200">Consultation</span>
              </h1>
              <p className="text-blue-100 text-sm leading-relaxed max-w-xs">
                 Book a 1-on-1 session with our AI career architects. We'll analyze your profile and map your path to a high-paying AI role.
              </p>
           </div>

           <div className="relative z-10 mt-10 space-y-4">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                 </div>
                 <div>
                    <div className="text-xs text-blue-200 uppercase font-bold">Duration</div>
                    <div className="font-bold">30 Minutes</div>
                 </div>
              </div>
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                 </div>
                 <div>
                    <div className="text-xs text-blue-200 uppercase font-bold">Format</div>
                    <div className="font-bold">Google Meet</div>
                 </div>
              </div>
           </div>
        </div>

        <div className="p-8 md:p-12 bg-[#0f172a] flex flex-col justify-center min-h-[600px]">
           
           {step === 'calendar' && (
             <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                   <span className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm">1</span>
                   Select Date & Time
                </h2>
                
                <div className="space-y-8">
                   <div>
                      <h3 className="text-xs font-bold uppercase text-slate-500 mb-4 ml-1">Available Dates</h3>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                         {getNextDays().map((date, idx) => {
                            const dateStr = date.toDateString();
                            const isSelected = selectedDate === dateStr;
                            return (
                               <button 
                                 key={idx}
                                 onClick={() => setSelectedDate(dateStr)}
                                 className={`p-3 rounded-2xl border text-center transition-all cursor-pointer hover:scale-105 active:scale-95 ${isSelected ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/25' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:border-white/20'}`}
                               >
                                  <div className="text-[10px] uppercase font-bold text-opacity-80">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                                  <div className="text-xl font-black">{date.getDate()}</div>
                               </button>
                            )
                         })}
                      </div>
                   </div>

                   <div>
                      <h3 className="text-xs font-bold uppercase text-slate-500 mb-4 ml-1">Available Slots</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                         {['10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM', '08:00 PM'].map((time) => (
                            <button
                               key={time}
                               onClick={() => setSelectedTime(time)}
                               disabled={!selectedDate}
                               className={`py-3 rounded-xl border text-xs font-bold transition-all ${selectedTime === time ? 'bg-green-600 border-green-500 text-white shadow-lg shadow-green-500/25' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed'}`}
                            >
                               {time}
                            </button>
                         ))}
                      </div>
                   </div>

                   <button 
                      disabled={!selectedDate || !selectedTime}
                      onClick={() => setStep('form')}
                      className="w-full py-4 bg-white text-slate-900 hover:bg-slate-200 font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                   >
                      Next Step <ArrowRight className="w-4 h-4" />
                   </button>
                </div>
             </div>
           )}

           {step === 'form' && (
             <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <button onClick={() => setStep('calendar')} className="text-xs text-slate-500 hover:text-white mb-6 flex items-center gap-1 transition-colors">
                   <ChevronLeft className="w-3 h-3" /> Change Date
                </button>

                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                   <span className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm">2</span>
                   Your Details
                </h2>
                <p className="text-slate-400 text-sm mb-8 ml-10">
                   Booking for <span className="text-white font-bold">{selectedDate}</span> at <span className="text-white font-bold">{selectedTime}</span>
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                   <div className="relative">
                      <User className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                      <input 
                         required type="text" name="name" placeholder="Full Name"
                         value={formData.name} onChange={handleInputChange}
                         className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                      />
                   </div>
                   <div className="relative">
                      <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                      <input 
                         required type="email" name="email" placeholder="Email Address"
                         value={formData.email} onChange={handleInputChange}
                         className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                      />
                   </div>
                   <div className="relative">
                      <Phone className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                      <input 
                         required type="tel" name="phone" placeholder="Phone Number"
                         value={formData.phone} onChange={handleInputChange}
                         className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                      />
                   </div>
                   <div className="relative">
                      <MessageSquare className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                      <input 
                         type="text" name="message" placeholder="Topics to discuss (Optional)"
                         value={formData.message} onChange={handleInputChange}
                         className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                      />
                   </div>

                   <button 
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg flex justify-center items-center gap-2 mt-6 disabled:opacity-70"
                   >
                      {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Confirm Booking'}
                   </button>
                </form>
             </div>
           )}

           {step === 'success' && (
             <div className="text-center animate-in zoom-in duration-500 flex flex-col items-center justify-center h-full">
                <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                   <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tight mb-4">Booking Confirmed!</h2>
                <p className="text-slate-400 max-w-xs mx-auto mb-8">
                   We have scheduled your demo on <br/>
                   <span className="text-white font-bold">{selectedDate}</span> at <span className="text-white font-bold">{selectedTime}</span>.
                </p>
                <p className="text-sm text-slate-500 mb-8">
                   A calendar invitation has been sent to <strong>{formData.email}</strong>.
                </p>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 mb-6 w-full max-w-sm mx-auto">
                    <p className="text-[10px] uppercase text-slate-500 font-bold mb-1">Meeting Link</p>
                    <code className="text-blue-300 text-sm select-all">https://meet.google.com/ysb-pxcw-tpj</code>
                </div>
                <button 
                   onClick={() => router.push('/')}
                   className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-bold transition-all"
                >
                   Return to Home
                </button>
             </div>
           )}

        </div>
      </div>
    </div>
  );
}