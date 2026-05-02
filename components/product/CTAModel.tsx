'use client';
import React, { useState } from 'react';
import { X, Send, Loader2, CheckCircle2, User, Building2, Mail, Phone, MessageSquare, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CONTACT_NUMBER = "918700236923";

interface CTAModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productTagline: string;
  accentColor?: string;
}

function validateEmail(email: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
function validatePhone(phone: string) { return /^[+]?[\d\s\-()]{7,15}$/.test(phone.trim()); }

function Field({
  label,
  icon: Icon,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
}: {
  label: string;
  icon: any;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  type?: string;
}) {
  return (
    <div className="group space-y-1.5">
      <label className="text-[10px] font-black text-slate-500 uppercase ml-1 tracking-widest">
        {label}
      </label>

      <div className="relative">
        <Icon
          className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
            error ? "text-red-400" : "text-slate-500 group-focus-within:text-blue-500"
          }`}
        />

        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full bg-white/[0.03] border p-3 md:p-4 pl-11 md:pl-12 rounded-xl text-white outline-none transition-all text-xs md:text-sm placeholder:text-slate-700
            ${
              error
                ? "border-red-500/60 bg-red-500/5"
                : "border-white/10 focus:border-blue-500 focus:bg-blue-500/5"
            }`}
        />
      </div>

      {error && (
        <p className="text-[10px] text-red-400 ml-1 font-semibold">
          {error}
        </p>
      )}
    </div>
  );
}

export default function CTAModal({ isOpen, onClose, productName, productTagline, accentColor = '#2563eb' }: CTAModalProps) {
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
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setSubmitting(true);

    const waMsg = encodeURIComponent(
      `*NEW PRODUCT INQUIRY*\n` +
      `────────────────────────\n\n` +
      `*Product*\n` +
      `${productName}\n` +
      `${productTagline}\n\n` +
      `*Contact Information*\n` +
      `Name: ${form.name}\n` +
      `Company: ${form.company}\n` +
      `Email: ${form.email}\n` +
      `Phone: ${form.phone}\n\n` +
      `*Inquiry*\n` +
      `${form.message}\n\n` +
      `_Source: Website_`
    );
    window.open(`https://api.whatsapp.com/send?phone=${CONTACT_NUMBER}&text=${waMsg}`, '_blank');

    try {
      await fetch('https://clc-products-backend.vercel.app/api/product-inquiry/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, productName, productTagline }),
      });
    } catch (err) { console.error(err); }

    setSubmitting(false);
    setDone(true);
  }

  const handleClose = () => { 
    onClose(); 
    setTimeout(() => { 
      setDone(false); 
      setForm({ name: '', company: '', email: '', phone: '', message: '' }); 
    }, 300); 
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={handleClose} className="fixed inset-0 bg-[#020617]/95 backdrop-blur-sm" />

          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl mt-0 md:mt-24 flex flex-col max-h-[60vh] md:max-h-[100vh] bg-[#0B1121] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
            style={{ boxShadow: `0 0 80px ${accentColor}25` }}>

            {/* Header - Remains Fixed */}
            <div className="flex items-center justify-between p-6 border-b border-white/5 shrink-0 bg-[#0B1121]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl border border-blue-500/20 bg-blue-500/10">
                  <ShieldCheck size={18} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-black text-sm md:text-xl uppercase tracking-tight">
                    {productName} <span className="text-blue-400">Inquiry</span>
                  </h3>
                  <p className="text-slate-500 text-[9px] uppercase font-bold tracking-[0.2em]">{productTagline}</p>
                </div>
              </div>
              <button onClick={handleClose} className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all border border-white/10">
                <X size={16} />
              </button>
            </div>

            {/* Scrollable Content Area */}
            <div className="overflow-y-auto custom-scrollbar flex-1">
              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-5 md:py-16 px-5 md:px-8"
                  >
                    <div className="w-16 h-16 md:w-24 md:h-24 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-5 md:mb-8 shadow-[0_0_50px_rgba(34,197,94,0.2)]">
                      <CheckCircle2 className="w-8 h-8 md:w-12 md:h-12 text-green-500" />
                    </div>

                    <h4 className="text-2xl md:text-4xl font-black text-white mb-3 md:mb-4 tracking-tighter uppercase">
                      Details Sent!
                    </h4>

                    <p className="text-slate-400 max-w-sm mx-auto mb-7 md:mb-10 text-xs md:text-sm leading-relaxed">
                      Your inquiry about{" "}
                      <span className="text-blue-400 font-bold">{productName}</span>{" "}
                      has been received. Our team will reach out on{" "}
                      <span className="text-green-500 font-bold italic">WhatsApp</span> shortly.
                    </p>

                    <button
                      onClick={handleClose}
                      className="px-8 md:px-12 py-3 md:py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all text-white mb-6"
                    >
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                      key="form"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="p-4 md:p-6 lg:p-10"
                  >
                      {/* Product badge */}
                      <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-5 md:mb-8">
                        <MessageSquare size={12} className="text-blue-500 shrink-0" />
                        <span className="text-blue-400 text-[8px] md:text-[10px] font-bold uppercase tracking-widest truncate">
                          Inquiry for: {productName} — {productTagline}
                        </span>
                      </div>

                      <form onSubmit={handleSubmit} noValidate className="space-y-3 md:space-y-4 pb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                          <Field
                            label="Full Name"
                            icon={User}
                            placeholder="John Doe"
                            value={form.name}
                            onChange={f("name")}
                            error={errors.name}
                          />
                          <Field
                            label="Company"
                            icon={Building2}
                            placeholder="Acme Corp"
                            value={form.company}
                            onChange={f("company")}
                            error={errors.company}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                          <Field
                            label="Work Email"
                            icon={Mail}
                            type="email"
                            placeholder="john@company.com"
                            value={form.email}
                            onChange={f("email")}
                            error={errors.email}
                          />
                          <Field
                            label="WhatsApp Number"
                            icon={Phone}
                            type="tel"
                            placeholder="+91 999 999 9999"
                            value={form.phone}
                            onChange={f("phone")}
                            error={errors.phone}
                          />
                        </div>

                        {/* Message */}
                        <div className="group space-y-1.5">
                          <label className="text-[10px] font-black text-slate-500 uppercase ml-1 tracking-widest">
                            Message
                          </label>

                          <textarea
                            required
                            rows={4}
                            placeholder="Tell us about your requirements..."
                            value={form.message}
                            onChange={(e) => f("message")(e.target.value)}
                            className={`w-full bg-white/[0.03] border p-3 md:p-4 rounded-xl text-white outline-none transition-all text-xs md:text-sm placeholder:text-slate-700 resize-none
                              ${
                                errors.message
                                  ? "border-red-500/60 bg-red-500/5"
                                  : "border-white/10 focus:border-blue-500 focus:bg-blue-500/5"
                              }`}
                          />

                          {errors.message && (
                            <p className="text-[10px] text-red-400 ml-1 font-semibold">
                              {errors.message}
                            </p>
                          )}
                        </div>

                        <div className="pt-2 md:pt-4">
                          <button
                            type="submit"
                            disabled={submitting}
                            className="w-full py-4 md:py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] md:text-[11px] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-2"
                          >
                            {submitting ? (
                              <Loader2 className="animate-spin" size={16} />
                            ) : (
                              <>
                                <Send size={14} />
                                Submit Inquiry
                              </>
                            )}
                          </button>
                        </div>
                      </form>
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