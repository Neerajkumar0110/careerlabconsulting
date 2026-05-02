"use client";

import { motion, useScroll, useSpring, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { Search, UserCheck, Rocket, ArrowRight, Sparkles, X, Loader2 } from "lucide-react";
import { useRef, useState, FormEvent } from "react";
import { usePageContent } from '@/hooks/usePageContent';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const ICON_MAP: Record<string, React.ElementType> = { Search, UserCheck, Rocket };

const DEFAULT_STEPS = JSON.stringify([
  { icon: "Search",    title: "Define Your Scope",    desc: "Outline your technical requirements and timeline. Our AI parses your needs instantly.",                         color: "#3b82f6" },
  { icon: "UserCheck", title: "Neural Matching",       desc: "Our engine filters the top 1% of verified experts to find your perfect technical match.",                       color: "#6366f1" },
  { icon: "Rocket",    title: "Secure Onboarding",     desc: "Start collaborating immediately with integrated payments and IP protection.",                                    color: "#a855f7" },
]);

export default function HowItWorks() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeColor, setActiveColor] = useState("#6366f1");
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", budget: "Not Sure Yet", description: "" });

  const { get } = usePageContent('f_how-it-works-section');

  const badgeLabel      = get('how_it_works', 'badge_label',       'The Protocol');
  const headline        = get('how_it_works', 'headline',          'Hire Elite Talent');
  const subtitle        = get('how_it_works', 'subtitle',          'From precision matching to secure deployment in three phases.');
  const ctaBtnLabel     = get('how_it_works', 'cta_btn_label',     'Launch a Project');
  const ctaHeadline     = get('how_it_works', 'cta_headline',      'Ready to experience the');
  const ctaHeadlineAccent = get('how_it_works', 'cta_headline_accent', 'future of work?');
  const ctaBgImage      = get('how_it_works', 'cta_bg_image',      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop');
  const whatsappNumber  = get('how_it_works', 'whatsapp_number',   '918700236923');
  const accentColor     = get('how_it_works', 'accent_color',      '#6366f1');

  const stepsRaw        = get('how_it_works', 'steps_json',        DEFAULT_STEPS);
  const steps           = safeParse<{ icon: string; title: string; desc: string; color: string }[]>(stepsRaw, []);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 80%", "end 20%"] });
  const scaleX = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const message = `*New Project Request!* %0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Budget:* ${formData.budget}%0A*Details:* ${formData.description}`;
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
        setFormData({ name: "", email: "", phone: "", budget: "Not Sure Yet", description: "" });
        setIsModalOpen(false);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error submitting form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative bg-[#020617] py-24 lg:py-40 overflow-hidden group/section"
      >
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover/section:opacity-100 transition-opacity duration-500 z-0"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, ${activeColor}15, transparent 80%)`
            ),
          }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-24 lg:mb-32">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold uppercase tracking-[0.4em] mb-8"
              style={{ color: accentColor }}
            >
              <Sparkles size={14} /> {badgeLabel}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-[1.1]"
            >
              {headline}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed"
            >
              {subtitle}
            </motion.p>
          </div>

          <div className="relative mb-32">
            <div className="hidden md:block absolute top-[48px] left-[10%] right-[10%] h-[2px] bg-white/5 z-0">
              <motion.div
                style={{ scaleX, transformOrigin: "left", backgroundColor: activeColor }}
                className="h-full shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-colors duration-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 relative z-10">
              {steps.map((step, i) => {
                const Icon = ICON_MAP[step.icon] ?? Search;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    onMouseEnter={() => setActiveColor(step.color)}
                    className="relative group"
                  >
                    <div className="flex flex-col items-center md:items-start">
                      <div className="relative mb-10">
                        <div className="w-24 h-24 rounded-3xl bg-slate-900/50 border border-white/10 flex items-center justify-center relative z-10 backdrop-blur-xl group-hover:scale-110 transition-transform duration-500">
                          <Icon size={32} style={{ color: step.color }} className="transition-transform duration-500 group-hover:rotate-12" />
                          <div
                            style={{ backgroundColor: step.color }}
                            className="absolute -top-3 -right-3 w-10 h-10 rounded-2xl text-white flex items-center justify-center font-black text-sm border-4 border-[#020617] shadow-xl"
                          >
                            {i + 1}
                          </div>
                        </div>
                      </div>
                      <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                          {step.title}
                        </h3>
                        <p className="text-gray-400 leading-relaxed font-normal opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative group overflow-hidden rounded-[3rem] p-[1px] bg-gradient-to-b from-white/20 to-transparent"
          >
            <div className="relative bg-[#020617] rounded-[2.95rem] overflow-hidden px-12 py-20 md:py-28 flex flex-col items-center text-center transition-all duration-500">
              <div className="absolute inset-0 z-0 opacity-40 group-hover:scale-110 transition-transform duration-[2s] ease-out bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${ctaBgImage}')` }} />
              <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#020617]/80 via-[#020617]/40 to-[#020617]/90" />
              <div className="relative z-10 max-w-3xl">
                <h4 className="text-4xl md:text-6xl font-black text-white mb-10 tracking-tighter leading-none">
                  {ctaHeadline} <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                    {ctaHeadlineAccent}
                  </span>
                </h4>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group relative inline-flex px-12 py-6 bg-white text-black hover:scale-105 active:scale-95 rounded-full font-black text-sm uppercase tracking-[0.2em] transition-all items-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.2)] overflow-hidden"
                >
                  <span className="relative z-10">{ctaBtnLabel}</span>
                  <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#0f172a] border border-white/10 rounded-3xl p-8 shadow-2xl z-10 overflow-hidden"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"><X size={24} /></button>
              <h3 className="text-3xl font-bold text-white mb-2">Launch a Project</h3>
              <p className="text-gray-400 mb-8 text-sm">Fill out the details below and we'll connect instantly.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input required type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                  <input required type="email" placeholder="Work Email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input required type="tel" placeholder="Phone / WhatsApp" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 appearance-none" value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })}>
                    <option value="Not Sure Yet" className="bg-[#0f172a]">Not Sure Yet</option>
                    <option value="<$5k" className="bg-[#0f172a]">Under $5,000</option>
                    <option value="$5k-$10k" className="bg-[#0f172a]">$5,000 - $10,000</option>
                    <option value="$10k+" className="bg-[#0f172a]">$10,000+</option>
                  </select>
                </div>
                <textarea required placeholder="Briefly describe your project requirements..." rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 resize-none" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                <button disabled={isSubmitting} type="submit" className="w-full text-white font-bold py-4 rounded-xl transition-colors flex justify-center items-center gap-2" style={{ background: accentColor }}>
                  {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : "Submit & Connect via WhatsApp"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}