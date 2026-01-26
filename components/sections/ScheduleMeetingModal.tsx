'use client';

import React, { useState, useMemo } from 'react';
import { 
  X, ShieldCheck, Calendar as CalendarIcon, 
  ChevronLeft, ChevronRight, Clock, Send, CheckCircle2,
  Loader2, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  planInfo: { category: string; tier: string } | null;
}

export default function ScheduleMeetingModal({ isOpen, onClose, planInfo }: ModalProps) {
  const [step, setStep] = useState<'date' | 'details' | 'success'>('date');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = ["10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"];

  const daysInMonth = useMemo(() => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const days = [];
    for (let i = 0; i < firstDay.getDay(); i++) days.push(null);
    const lastDay = new Date(year, month + 1, 0);
    for (let d = 1; d <= lastDay.getDate(); d++) days.push(new Date(year, month, d));
    return days;
  }, [selectedDate.getMonth(), selectedDate.getFullYear()]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      ...formData,
      date: selectedDate.toDateString(),
      slot: selectedSlot,
      category: planInfo?.category || 'General',
      tier: planInfo?.tier || 'Custom'
    };

    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const whatsappMsg = window.encodeURIComponent(
        `Hi CareerLab, I'm ${payload.name} from ${payload.company}. ` +
        `I've scheduled a ${payload.tier} (${payload.category}) consultation for ${payload.date} at ${payload.slot}.`
      );
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      window.open(`https://wa.me/918700236923?text=${whatsappMsg}`, '_blank');
      setStep('success');
    } catch (error) {
      console.error("Booking error:", error);
      setStep('success');
    } finally {
      setIsSubmitting(false);
    }
  };

  const changeMonth = (offset: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setSelectedDate(newDate);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl bg-[#0a0f1e] border border-white/10 rounded-[2rem] lg:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[95vh]"
          >
            
            <div className="flex items-center justify-between p-6 lg:px-10 border-b border-white/5 bg-[#0d1326]/50">
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20 text-blue-500">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="text-white text-lg lg:text-xl font-black uppercase tracking-tight">
                    {planInfo?.tier} <span className="text-blue-500">Consultation</span>
                  </h3>
                  <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">{planInfo?.category} Solution Design</p>
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="p-2.5 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all border border-white/10 active:scale-90"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar">
              <AnimatePresence mode="wait">
                {step === 'date' && (
                  <motion.div 
                    key="date-step"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-10"
                  >
                    <div className="bg-white/[0.02] p-6 rounded-[2rem] border border-white/5">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-white font-black text-xs uppercase tracking-widest flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4 text-blue-500" /> 01. Select Date
                        </h4>
                        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/5">
                          <button onClick={() => changeMonth(-1)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"><ChevronLeft size={16}/></button>
                          <span className="text-[10px] font-black uppercase w-24 text-center">
                            {selectedDate.toLocaleString('default', { month: 'short', year: 'numeric' })}
                          </span>
                          <button onClick={() => changeMonth(1)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"><ChevronRight size={16}/></button>
                        </div>
                      </div>

                      <div className="grid grid-cols-7 gap-1 text-center text-[9px] text-slate-600 font-black mb-4">
                        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => <div key={d}>{d}</div>)}
                      </div>
                      <div className="grid grid-cols-7 gap-2">
                        {daysInMonth.map((date, i) => {
                          if (!date) return <div key={`empty-${i}`} />;
                          const isSelected = date.toDateString() === selectedDate.toDateString();
                          const isPast = date < new Date(new Date().setHours(0,0,0,0));
                          return (
                            <button
                              key={i}
                              disabled={isPast}
                              onClick={() => setSelectedDate(date)}
                              className={`aspect-square rounded-xl text-xs font-bold transition-all flex items-center justify-center border ${
                                isSelected 
                                  ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/40 scale-110 z-10' 
                                  : isPast 
                                    ? 'text-slate-800 border-transparent cursor-not-allowed opacity-30' 
                                    : 'bg-white/[0.03] border-white/5 text-slate-300 hover:border-blue-500/50 hover:bg-blue-500/5'
                              }`}
                            >
                              {date.getDate()}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex flex-col justify-between">
                      <div className="space-y-6">
                        <h4 className="text-white font-black text-xs uppercase tracking-widest flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-500" /> 02. Select Time
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3">
                          {timeSlots.map(slot => (
                            <button
                              key={slot}
                              onClick={() => setSelectedSlot(slot)}
                              className={`p-4 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all ${
                                selectedSlot === slot 
                                  ? 'border-blue-500 bg-blue-500/20 text-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.1)]' 
                                  : 'border-white/5 bg-white/[0.02] text-slate-500 hover:border-white/20 hover:text-white'
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        disabled={!selectedSlot}
                        onClick={() => setStep('details')}
                        className="w-full mt-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-2 group"
                      >
                        Next: Contact Details <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 'details' && (
                  <motion.div 
                    key="details-step"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="max-w-xl mx-auto w-full"
                  >
                    <div className="text-center mb-8">
                      <h4 className="text-2xl font-black text-white uppercase tracking-tighter">Final Step</h4>
                      <p className="text-blue-500 text-[10px] font-bold uppercase tracking-widest mt-2 bg-blue-500/10 inline-block px-4 py-1 rounded-full border border-blue-500/20">
                        {selectedDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} @ {selectedSlot}
                      </p>
                    </div>
                    
                    <form onSubmit={handleBooking} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase ml-2 tracking-tighter">Full Name</label>
                        <input required type="text" placeholder="John Doe" className="w-full bg-white/[0.03] border border-white/10 p-4 rounded-xl text-white outline-none focus:border-blue-500 focus:bg-white/[0.05] transition-all text-sm" onChange={(e) => setFormData({...formData, name: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase ml-2 tracking-tighter">Business Email</label>
                        <input required type="email" placeholder="john@company.com" className="w-full bg-white/[0.03] border border-white/10 p-4 rounded-xl text-white outline-none focus:border-blue-500 focus:bg-white/[0.05] transition-all text-sm" onChange={(e) => setFormData({...formData, email: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase ml-2 tracking-tighter">Company Name</label>
                        <input required type="text" placeholder="Acme Corp" className="w-full bg-white/[0.03] border border-white/10 p-4 rounded-xl text-white outline-none focus:border-blue-500 focus:bg-white/[0.05] transition-all text-sm" onChange={(e) => setFormData({...formData, company: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase ml-2 tracking-tighter">WhatsApp Number</label>
                        <input required type="tel" placeholder="+91 XXXXX XXXXX" className="w-full bg-white/[0.03] border border-white/10 p-4 rounded-xl text-white outline-none focus:border-blue-500 focus:bg-white/[0.05] transition-all text-sm" onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                      </div>

                      <div className="md:col-span-2 flex gap-4 pt-6">
                        <button type="button" onClick={() => setStep('date')} className="flex-1 py-4 bg-white/5 rounded-xl font-bold uppercase text-[10px] tracking-widest border border-white/5 hover:bg-white/10 transition-all">Back</button>
                        <button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="flex-[2] py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/30"
                        >
                          {isSubmitting ? <Loader2 className="animate-spin" size={16}/> : <><Send size={14}/> Confirm Booking</>}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {step === 'success' && (
                  <motion.div 
                    key="success-step"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <div className="w-24 h-24 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                      <CheckCircle2 className="w-12 h-12 text-green-500" />
                    </div>
                    <h4 className="text-4xl font-black text-white mb-4 tracking-tighter uppercase">Request Sent!</h4>
                    <p className="text-slate-400 max-w-sm mx-auto mb-10 text-sm leading-relaxed">
                      We've received your consultation request. A solution architect will reach out on <span className="text-green-500 font-bold italic">WhatsApp</span> within 2 hours.
                    </p>
                    <button onClick={onClose} className="px-12 py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] transition-all">
                      Back to Pricing
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}