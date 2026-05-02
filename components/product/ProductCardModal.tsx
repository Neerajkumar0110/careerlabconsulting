'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  X, ShieldCheck, Calendar as CalendarIcon,
  ChevronLeft, ChevronRight, Clock, Send, CheckCircle2,
  Loader2, ArrowRight, Building2, User, Mail, Phone,
  FileText, MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CONTACT_NUMBER = "918700236923";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Product {
  id: string;
  name: string;
  tagline: string;
  features: string[];
  icon: React.ElementType;
}

interface ProductCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  defaultMode?: ModalMode;
}

type ModalMode = 'select' | 'form' | 'calendar';
type CalendarStep = 'date' | 'details' | 'success';

// ─── Field validation ─────────────────────────────────────────────────────────
function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validatePhone(phone: string) {
  return /^[+]?[\d\s\-()]{7,15}$/.test(phone.trim());
}

// ─── Shared Input ─────────────────────────────────────────────────────────────
function Field({
  label, icon: Icon, type = 'text', placeholder, value, onChange, error,
}: {
  label: string; icon: React.ElementType; type?: string;
  placeholder: string; value: string;
  onChange: (v: string) => void; error?: string;
}) {
  return (
    <div className="group space-y-1.5">
      <label className="text-[10px] font-black text-slate-500 uppercase ml-1 tracking-widest">{label}</label>
      <div className="relative">
        <Icon className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${error ? 'text-red-400' : 'text-slate-500 group-focus-within:text-blue-500'}`} />
        <input
          required type={type} placeholder={placeholder} value={value}
          onChange={e => onChange(e.target.value)}
          className={`w-full bg-white/[0.03] border p-3 pl-10 md:p-4 md:pl-12 rounded-xl text-white outline-none transition-all text-xs md:text-sm placeholder:text-slate-700
            ${error ? 'border-red-500/60 bg-red-500/5' : 'border-white/10 focus:border-blue-500 focus:bg-blue-500/5'}`}
        />
      </div>
      {error && <p className="text-[10px] text-red-400 ml-1 font-semibold">{error}</p>}
    </div>
  );
}

// ─── Modal Header ─────────────────────────────────────────────────────────────
function ModalHeader({
  product, mode, onClose, onBack,
}: {
  product: Product | null; mode: ModalMode; onClose: () => void; onBack?: () => void;
}) {
  const subtitles: Record<ModalMode, string> = {
    select: 'Choose how to proceed',
    form: 'Fill in your details',
    calendar: 'Schedule a consultation',
  };
  return (
    <div className="flex items-center justify-between p-4 md:p-6 lg:px-10 border-b border-white/5 bg-white/[0.02]">
      <div className="flex items-center gap-2 md:gap-4 min-w-0">
        {mode !== 'select' && onBack && (
          <button onClick={onBack} className="shrink-0 p-2 bg-white/5 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-all border border-white/10">
            <ChevronLeft size={16} />
          </button>
        )}
        <div className="hidden sm:flex shrink-0 p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20 text-blue-500">
          <ShieldCheck size={22} />
        </div>
        <div className="min-w-0">
          <h3 className="text-white text-sm md:text-lg lg:text-xl font-black uppercase tracking-tight truncate">
            {product?.name} <span className="text-blue-500">— {product?.tagline}</span>
          </h3>
          <p className="text-slate-500 text-[9px] md:text-[10px] uppercase font-bold tracking-[0.15em] md:tracking-[0.2em]">
            {subtitles[mode]}
          </p>
        </div>
      </div>
      <button onClick={onClose} className="shrink-0 ml-2 p-2 md:p-2.5 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all border border-white/10 active:scale-90">
        <X size={18} />
      </button>
    </div>
  );
}

// ─── Mode Selector ────────────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.1,
    },
  },
  exit: { opacity: 0, y: -15, transition: { duration: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 }
};

export function ModeSelector({ product, onSelect }: { product: any | null; onSelect: (m: ModalMode) => void }) {
  const Icon = product?.icon;

  return (
    <motion.div
      key="select"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="p-4 md:p-8 lg:p-12 flex flex-col gap-5 md:gap-10"
    >
      {/* Product Summary Card */}
      <div className="relative group overflow-hidden flex items-center gap-3 md:gap-5 p-4 md:p-6 rounded-2xl md:rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-sm">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl opacity-50" />
        
         {Icon && (
          <div className="shrink-0 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl backdrop-blur-md border border-white/20" style={{ backgroundColor: `#2563eb60` }}>
            <Icon size={18} color="white" />
          </div>
        )}

        <div className="relative z-10 min-w-0">
          <h3 className="text-white font-black text-sm md:text-lg uppercase tracking-tight leading-none truncate">
            {product?.name || "Select a Product"}
          </h3>
          <p className="text-slate-400 text-[11px] md:text-xs mt-1 md:mt-1.5 font-medium tracking-wide">
            {product?.tagline || "Please choose an option to continue"}
          </p>
          
          <div className="flex flex-wrap gap-1 md:gap-1.5 mt-2 md:mt-3">
            {product?.features?.map((f: string) => (
              <span key={f} className="text-[9px] md:text-[10px] font-bold px-2 py-0.5 md:px-2.5 md:py-1 rounded-md border border-blue-500/20 bg-blue-500/5 text-blue-400/80 uppercase tracking-wider">
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4 md:space-y-6">
        <p className="text-center text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
          How would you like to connect with us?
        </p>

        <div className="grid grid-cols-2 gap-3 md:gap-5">
          <OptionButton 
            title="Fill a Form"
            description="Send us your details and we'll reach out within 24–48 hrs"
            icon={FileText}
            onClick={() => onSelect('form')}
            label="Get Started"
          />
          <OptionButton 
            title="Book a Call"
            description="Pick a date & time and schedule a live consultation"
            icon={CalendarIcon}
            onClick={() => onSelect('calendar')}
            label="Check Slots"
          />
        </div>
      </div>
    </motion.div>
  );
}

function OptionButton({ title, description, icon: Icon, onClick, label }: any) {
  return (
    <motion.button
      variants={itemVariants}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group relative flex flex-col items-center gap-3 md:gap-5 p-4 md:p-8 rounded-2xl md:rounded-[2rem] border border-slate-200 bg-white hover:border-blue-400/50 transition-all duration-300 shadow-sm hover:shadow-[0_20px_50px_-12px_rgba(59,130,246,0.25)]"
    >
      {/* Icon Container */}
      <div className="z-10 w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-blue-600 border border-blue-700/10 group-hover:border-blue-300 flex items-center justify-center text-white transition-all duration-300 shadow-lg group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
        <Icon size={20} strokeWidth={1.5} className="md:hidden" />
        <Icon size={30} strokeWidth={1.5} className="hidden md:block" />
      </div>
      
      {/* Text Content */}
      <div className="z-10 text-center">
        <p className="text-slate-900 font-black text-[11px] md:text-[14px] uppercase tracking-[0.1em] md:tracking-[0.15em] mb-1 md:mb-3 transition-colors leading-none">
          {title}
        </p>
        <p className="text-slate-600 text-[10px] md:text-[12px] font-medium leading-relaxed max-w-[160px] md:max-w-[200px] mx-auto group-hover:text-slate-800 transition-colors hidden sm:block">
          {description}
        </p>
      </div>

      {/* Hover Label */}
      <div className="z-10 hidden md:flex items-center gap-2 text-[11px] font-black text-blue-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
        {label} <ArrowRight size={14} />
      </div>
    </motion.button>
  );
}


// ─── Form Section ─────────────────────────────────────────────────────────────
function FormSection({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const f = (k: keyof typeof form) => (v: string) => setForm(p => ({ ...p, [k]: v }));

  function validate() {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.company.trim()) e.company = 'Company is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!validateEmail(form.email)) e.email = 'Enter a valid email address';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    else if (!validatePhone(form.phone)) e.phone = 'Enter a valid phone number';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  const errs = validate();
  if (Object.keys(errs).length) {
    setErrors(errs);
    return;
  }

  setErrors({});
  setSubmitting(true);

  const waMsg = encodeURIComponent(
    `*NEW PRODUCT INQUIRY*\n` +
    `────────────────────────\n\n` +
    `*Product*\n` +
    `${product?.name}\n` +
    `${product?.tagline}\n\n` +
    `*Contact Information*\n` +
    `Name: ${form.name}\n` +
    `Company: ${form.company}\n` +
    `Email: ${form.email}\n` +
    `Phone: ${form.phone}\n\n` +
    `*Inquiry*\n` +
    `${form.message}\n\n` +
    `_Source: Website_`
  );

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${CONTACT_NUMBER}&text=${waMsg}`;

  window.open(whatsappUrl, '_blank');

  fetch('https://clc-products-backend.vercel.app/api/product-inquiry/inquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: form.name,
      company: form.company,
      email: form.email,
      phone: form.phone,
      message: form.message,
      productName: product?.name || '',
      productTagline: product?.tagline || '',
    }),
  }).catch(err => console.error(err))
    .finally(() => {
      setSubmitting(false);
      setDone(true);
    });
}

  if (done) {
    return (
      <motion.div
        key="form-success"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-10 md:py-16 px-5 md:px-8"
      >
        <div className="w-16 h-16 md:w-24 md:h-24 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-5 md:mb-8 shadow-[0_0_50px_rgba(34,197,94,0.2)]">
          <CheckCircle2 className="w-8 h-8 md:w-12 md:h-12 text-green-500" />
        </div>
        <h4 className="text-2xl md:text-4xl font-black text-white mb-3 md:mb-4 tracking-tighter uppercase">Details Sent!</h4>
        <p className="text-slate-400 max-w-sm mx-auto mb-7 md:mb-10 text-xs md:text-sm leading-relaxed">
          Your inquiry about <span className="text-blue-400 font-bold">{product?.name}</span> has been received. Our team will reach out on <span className="text-green-500 font-bold italic">WhatsApp</span> shortly.
        </p>
        <button onClick={onClose} className="px-8 md:px-12 py-3 md:py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all text-white">
          Close
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      key="form-step"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-4 md:p-6 lg:p-10"
    >
      {/* Product badge */}
      <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-5 md:mb-8">
        <MessageSquare size={12} className="text-blue-500 shrink-0" />
        <span className="text-blue-400 text-[8px] md:text-[10px] font-bold uppercase tracking-widest truncate">
          Inquiry for: {product?.name} — {product?.tagline}
        </span>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-3 md:space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <Field label="Full Name" icon={User} placeholder="John Doe" value={form.name} onChange={f('name')} error={errors.name} />
          <Field label="Company" icon={Building2} placeholder="Acme Corp" value={form.company} onChange={f('company')} error={errors.company} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <Field label="Work Email" icon={Mail} type="email" placeholder="john@company.com" value={form.email} onChange={f('email')} error={errors.email} />
          <Field label="WhatsApp Number" icon={Phone} type="tel" placeholder="+91 999 999 9999" value={form.phone} onChange={f('phone')} error={errors.phone} />
        </div>

        {/* Message */}
        <div className="group space-y-1.5">
          <label className="text-[10px] font-black text-slate-500 uppercase ml-1 tracking-widest">Message</label>
          <textarea
            required rows={3} placeholder="Tell us about your requirements..."
            value={form.message} onChange={e => f('message')(e.target.value)}
            className={`w-full bg-white/[0.03] border p-3 md:p-4 rounded-xl text-white outline-none transition-all text-xs md:text-sm placeholder:text-slate-700 resize-none
              ${errors.message ? 'border-red-500/60 bg-red-500/5' : 'border-white/10 focus:border-blue-500 focus:bg-blue-500/5'}`}
          />
          {errors.message && <p className="text-[10px] text-red-400 ml-1 font-semibold">{errors.message}</p>}
        </div>

        <div className="pt-2 md:pt-4">
          <button
            type="submit" disabled={submitting}
            className="w-full py-4 md:py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] md:text-[11px] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-2"
          >
            {submitting ? <Loader2 className="animate-spin" size={16} /> : <><Send size={14} /> Submit Inquiry</>}
          </button>
        </div>
      </form>
    </motion.div>
  );
}

// ─── Calendar Section ─────────────────────────────────────────────────────────
function CalendarSection({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const [step, setStep] = useState<CalendarStep>('date');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', phone: '' });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = ["10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"];

  const daysInMonth = useMemo(() => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const days: (Date | null)[] = [];
    for (let i = 0; i < firstDay.getDay(); i++) days.push(null);
    const lastDay = new Date(year, month + 1, 0);
    for (let d = 1; d <= lastDay.getDate(); d++) days.push(new Date(year, month, d));
    return days;
  }, [selectedDate]);

  const changeMonth = (offset: number) => {
    const nd = new Date(selectedDate);
    nd.setMonth(nd.getMonth() + offset);
    setSelectedDate(nd);
  };

  function validateCalendarForm() {
    const e: Partial<typeof formData> = {};
    if (!formData.name.trim()) e.name = 'Name is required';
    if (!formData.company.trim()) e.company = 'Company is required';
    if (!formData.email.trim()) e.email = 'Email is required';
    else if (!validateEmail(formData.email)) e.email = 'Enter a valid email';
    if (!formData.phone.trim()) e.phone = 'Phone is required';
    else if (!validatePhone(formData.phone)) e.phone = 'Enter a valid phone number';
    return e;
  }

  async function handleBooking(e: React.FormEvent) {
  e.preventDefault();

  const errs = validateCalendarForm();
  if (Object.keys(errs).length) {
    setErrors(errs);
    return;
  }

  if (!selectedSlot) {
    setErrors(prev => ({ ...prev }));
    return;
  }

  setErrors({});
  setIsSubmitting(true);

  const dateStr = selectedDate.toDateString();

  const waMsg = encodeURIComponent(
    `*CONSULTATION BOOKING*\n` +
    `────────────────────────\n\n` +
    `*Product*\n` +
    `${product?.name}\n` +
    `${product?.tagline}\n\n` +
    `*Contact Information*\n` +
    `Name: ${formData.name}\n` +
    `Company: ${formData.company}\n` +
    `Email: ${formData.email}\n` +
    `Phone: ${formData.phone}\n\n` +
    `*Schedule*\n` +
    `Date: ${dateStr}\n` +
    `Time Slot: ${selectedSlot} IST\n\n` +
    `_Source: Website_`
  );

  const whatsappUrl =
    `https://api.whatsapp.com/send?phone=${CONTACT_NUMBER}&text=${waMsg}`;

  window.open(whatsappUrl, "_blank");

  fetch("https://clc-products-backend.vercel.app/api/product-inquiry/booking", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: formData.name,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      date: dateStr,
      slot: selectedSlot,
      productName: product?.name || "",
      productTagline: product?.tagline || "",
    }),
  })
    .catch((err) => console.error("Booking API error:", err))
    .finally(() => {
      setIsSubmitting(false);
      setStep("success");
    });
}

  return (
    <AnimatePresence mode="wait">

      {step === 'date' && (
        <motion.div
          key="cal-date"
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-10 p-4 md:p-6 lg:p-10"
        >
          {/* Calendar */}
          <div className="bg-white/[0.02] p-4 md:p-6 rounded-2xl md:rounded-[2rem] border border-white/5">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h4 className="text-white font-black text-[10px] md:text-xs uppercase tracking-widest flex items-center gap-2">
                <CalendarIcon className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-500" /> Select Date
              </h4>
              <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/5">
                <button onClick={() => changeMonth(-1)} className="p-1 md:p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white"><ChevronLeft size={14} /></button>
                <span className="text-white text-[9px] md:text-[10px] font-black uppercase w-20 md:w-24 text-center">
                  {selectedDate.toLocaleString('default', { month: 'short', year: 'numeric' })}
                </span>
                <button onClick={() => changeMonth(1)} className="p-1 md:p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white"><ChevronRight size={14} /></button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-0.5 md:gap-1 text-center text-[8px] md:text-[9px] text-slate-500 font-black mb-3 md:mb-4">
              {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => <div key={d}>{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1 md:gap-2">
              {daysInMonth.map((date, i) => {
                if (!date) return <div key={`e-${i}`} />;
                const isSel = date.toDateString() === selectedDate.toDateString();
                const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
                return (
                  <button key={i} disabled={isPast} onClick={() => setSelectedDate(date)}
                    className={`aspect-square rounded-lg md:rounded-xl text-[10px] md:text-xs font-bold transition-all flex items-center justify-center border
                      ${isSel ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)] scale-110 z-90'
                        : isPast ? 'text-slate-800 border-transparent cursor-not-allowed opacity-30'
                          : 'bg-white/[0.03] border-white/5 text-slate-300 hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-white'}`}
                  >{date.getDate()}</button>
                );
              })}
            </div>
          </div>

          {/* Slots */}
          <div className="flex flex-col justify-between gap-4 md:gap-0">
            <div className="space-y-3 md:space-y-6">
              <h4 className="text-white font-black text-[10px] md:text-xs uppercase tracking-widest flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-500" /> Select Time (IST)
              </h4>
              <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-2 gap-2 md:gap-3">
                {timeSlots.map(slot => (
                  <button key={slot} onClick={() => setSelectedSlot(slot)}
                    className={`p-2.5 md:p-4 rounded-xl md:rounded-2xl border text-[9px] md:text-[10px] font-black uppercase tracking-wider md:tracking-widest transition-all
                      ${selectedSlot === slot ? 'border-blue-500 bg-blue-500/20 text-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.1)]'
                        : 'border-white/5 bg-white/[0.02] text-slate-500 hover:border-white/20 hover:text-white'}`}
                  >{slot}</button>
                ))}
              </div>
            </div>
            <button
              disabled={!selectedSlot} onClick={() => setStep('details')}
              className="w-full mt-4 md:mt-10 py-4 md:py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-[0.15em] md:tracking-[0.2em] text-[9px] md:text-[10px] disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-2 group"
            >
              Next: Contact Details <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      )}

      {step === 'details' && (
        <motion.div
          key="cal-details"
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
          className="p-4 md:p-6 lg:p-10 max-w-xl mx-auto w-full"
        >
          <div className="text-center mb-6 md:mb-10">
            <h4 className="text-xl md:text-3xl font-black text-white uppercase tracking-tighter mb-1 md:mb-2">Final Step</h4>
            <p className="text-slate-400 text-xs md:text-sm">Booking a consultation for</p>
            <div className="mt-2 inline-flex items-center gap-2 px-3 md:px-4 py-1 md:py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
              <CalendarIcon size={11} className="text-blue-500 shrink-0" />
              <span className="text-blue-400 text-[9px] md:text-[10px] font-bold uppercase tracking-widest">
                {product?.name} · {selectedDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} @ {selectedSlot}
              </span>
            </div>
          </div>

          <form onSubmit={handleBooking} noValidate className="space-y-3 md:space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <Field label="Full Name" icon={User} placeholder="John Doe"
                value={formData.name} onChange={v => setFormData(p => ({ ...p, name: v }))} error={errors.name} />
              <Field label="Company" icon={Building2} placeholder="Acme Corp"
                value={formData.company} onChange={v => setFormData(p => ({ ...p, company: v }))} error={errors.company} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <Field label="Work Email" icon={Mail} type="email" placeholder="john@company.com"
                value={formData.email} onChange={v => setFormData(p => ({ ...p, email: v }))} error={errors.email} />
              <Field label="WhatsApp Number" icon={Phone} type="tel" placeholder="+91 999 999 9999"
                value={formData.phone} onChange={v => setFormData(p => ({ ...p, phone: v }))} error={errors.phone} />
            </div>
            <div className="flex gap-3 md:gap-4 pt-3 md:pt-6">
              <button type="button" onClick={() => setStep('date')}
                className="flex-1 py-3.5 md:py-4 bg-white/5 rounded-xl font-bold uppercase text-[10px] tracking-widest border border-white/5 hover:bg-white/10 transition-all text-white">
                Back
              </button>
              <button type="submit" disabled={isSubmitting}
                className="flex-[2] py-3.5 md:py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-black uppercase text-[10px] tracking-[0.15em] md:tracking-[0.2em] text-white flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/30 disabled:opacity-40">
                {isSubmitting ? <Loader2 className="animate-spin" size={15} /> : <><Send size={13} /> Confirm Booking</>}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {step === 'success' && (
        <motion.div
          key="cal-success"
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="text-center py-10 md:py-16 px-5 md:px-8"
        >
          <div className="w-16 h-16 md:w-24 md:h-24 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-5 md:mb-8 shadow-[0_0_50px_rgba(34,197,94,0.2)]">
            <CheckCircle2 className="w-8 h-8 md:w-12 md:h-12 text-green-500" />
          </div>
          <h4 className="text-2xl md:text-4xl font-black text-white mb-3 md:mb-4 tracking-tighter uppercase">Booking Confirmed!</h4>
          <p className="text-slate-400 max-w-sm mx-auto mb-7 md:mb-10 text-xs md:text-sm leading-relaxed">
            Your consultation for <span className="text-blue-400 font-bold">{product?.name}</span> is booked. Our solution architect will confirm on <span className="text-green-500 font-bold italic">WhatsApp</span> shortly.
          </p>
          <button onClick={onClose} className="px-8 md:px-12 py-3 md:py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all text-white">
            Close
          </button>
        </motion.div>
      )}

    </AnimatePresence>
  );
}

// ─── Main Modal ────────────────────────────────────────────────────────────────
export default function ProductCardModal({
  isOpen,
  onClose,
  product,
  defaultMode = 'select'
}: ProductCardModalProps){
  
  const [mode, setMode] = useState<'select' | 'form' | 'calendar'>('select');

  useEffect(() => {
    if (isOpen) {
      setMode(defaultMode || 'select');
    }
  }, [isOpen, defaultMode]);

  const handleClose = () => {
    onClose();
    setTimeout(() => setMode('select'), 300);
  };

  const showBack = mode !== 'select';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-3 md:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-[#020617]/95 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl mt-0 md:mt-20 bg-[#0B1121] border border-white/10 rounded-2xl md:rounded-[2.5rem] shadow-[0_0_50px_rgba(37,99,235,0.15)] overflow-hidden flex flex-col max-h-[60vh] md:max-h-[100vh]"
          >
            <ModalHeader
              product={product} mode={mode} onClose={handleClose}
              onBack={showBack ? () => setMode('select') : undefined}
            />

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <AnimatePresence mode="wait">
                {mode === 'select' && (
                  <ModeSelector key="select" product={product} onSelect={setMode} />
                )}
                {mode === 'form' && (
                  <FormSection key="form" product={product} onClose={handleClose} />
                )}
                {mode === 'calendar' && (
                  <CalendarSection key="calendar" product={product} onClose={handleClose} />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}