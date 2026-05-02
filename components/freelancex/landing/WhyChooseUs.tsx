"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Shield, Search, Users, ArrowRight, Star, X, Loader2, CheckCircle } from "lucide-react";
import { useState, FormEvent } from "react";
import { usePageContent } from '@/hooks/usePageContent';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const ICON_MAP: Record<string, React.ElementType> = { Rocket, Shield, Search, Users };

const DEFAULT_FEATURES = JSON.stringify([
  { icon: "Rocket",  title: "Instant Onboarding",  desc: "Deploy developers to your stack in under 24 hours with pre-signed NDAs.",                                  tag: "Speed",    color: "from-blue-500 to-cyan-400"       },
  { icon: "Shield",  title: "Escrow Protection",    desc: "Smart-contract based payments ensure talent gets paid and milestones are met.",                             tag: "Security", color: "from-indigo-500 to-purple-500"   },
  { icon: "Search",  title: "AI Vetting",            desc: "Every freelancer passes a live coding & communication audit by our AI agent.",                              tag: "Quality",  color: "from-emerald-500 to-teal-400"    },
  { icon: "Users",   title: "Talent Pods",           desc: "Hire pre-assembled teams (Dev + PM + QA) that have worked together before.",                               tag: "Scale",    color: "from-orange-500 to-rose-500"     },
]);

const DEFAULT_AVATARS = JSON.stringify([
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=100&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
]);

function FeatureCard({ feature, onOpenModal }: {
  feature: { icon: string; title: string; desc: string; tag: string; color: string };
  index: number;
  onOpenModal: () => void;
}) {
  const Icon = ICON_MAP[feature.icon] ?? Rocket;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={onOpenModal}
      className="group relative p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 hover:border-indigo-500/30 transition-all duration-500 flex flex-col h-full cursor-pointer overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} p-0.5 mb-8 group-hover:rotate-6 transition-transform shadow-lg`}>
          <div className="w-full h-full bg-[#030712] rounded-[calc(1rem-2px)] flex items-center justify-center">
            <Icon className="text-white" size={24} />
          </div>
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500">{feature.tag}</span>
        <h4 className="text-xl font-bold mt-2 mb-4 group-hover:text-white transition-colors">{feature.title}</h4>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">{feature.desc}</p>
        <div className="mt-auto flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
          <span className="text-xs font-bold flex items-center gap-2 text-indigo-400 group-hover:text-indigo-300">
            Learn More <ArrowRight size={14} />
          </span>
          <CheckCircle size={18} className="text-emerald-500" />
        </div>
      </div>
    </motion.div>
  );
}

export default function ModernFreelanceSection() {
  const { get } = usePageContent('freelance-section');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [interestSource, setInterestSource] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", talentNeeded: "Full Stack Engineer", description: "" });

  // CMS values
  const badgeLabel        = get('freelance', 'badge_label',        'The Future of Remote Work');
  const headline          = get('freelance', 'headline',           'Hire the Top 1%');
  const headlineAccent    = get('freelance', 'headline_accent',    'Freelance Engineers.');
  const subtext           = get('freelance', 'subtext',            'Stop scrolling through thousands of resumes. Our engine matches you with vetted experts ready to commit to your sprint today.');
  const trustQuote        = get('freelance', 'trust_quote',        '"Best engineering hire we\'ve ever made."');
  const trustScore        = get('freelance', 'trust_score',        '5.0/5.0 Trust Score');
  const matchingLabel     = get('freelance', 'matching_label',     'Matching React Expert...');
  const matchScore        = get('freelance', 'match_score',        '98% Match');
  const sprintBtnLabel    = get('freelance', 'sprint_btn_label',   'START YOUR SPRINT');
  const avatarCount       = get('freelance', 'avatar_count',       '+2k');
  const whatsappNumber    = get('freelance', 'whatsapp_number',    '918700236923');
  const accentColor       = get('freelance', 'accent_color',       '#6366f1');

  const featuresRaw       = get('freelance', 'features_json',      DEFAULT_FEATURES);
  const features          = safeParse<{ icon: string; title: string; desc: string; tag: string; color: string }[]>(featuresRaw, []);

  const avatarsRaw        = get('freelance', 'avatars_json',       DEFAULT_AVATARS);
  const avatars           = safeParse<string[]>(avatarsRaw, []);

  const openModal = (source: string) => { setInterestSource(source); setIsModalOpen(true); };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/freelance-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: interestSource })
      });
      if (res.ok) {
        const message = `*New Lead: ${interestSource}* %0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Looking For:* ${formData.talentNeeded}%0A*Project Details:* ${formData.description}`;
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
        setFormData({ name: "", email: "", phone: "", talentNeeded: "Full Stack Engineer", description: "" });
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
      <section className="relative py-20 px-4 bg-[#030712] text-white overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] blur-[120px] rounded-full pointer-events-none"
          style={{ background: `${accentColor}1a` }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 md:mb-24">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase border rounded-full"
              style={{ color: accentColor, background: `${accentColor}1a`, borderColor: `${accentColor}33` }}
            >
              {badgeLabel}
            </motion.span>
            <h2 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent leading-tight">
              {headline} <br className="hidden md:block" /> {headlineAccent}
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">{subtext}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <FeatureCard key={idx} feature={feature} index={idx} onOpenModal={() => openModal(feature.title)} />
            ))}
          </div>

          <div className="mt-12 p-1 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent">
            <div className="bg-[#0f172a]/80 backdrop-blur-xl rounded-[2.4rem] p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="space-y-6 max-w-md">
                <div className="flex -space-x-4">
                  {avatars.map((url, i) => (
                    <motion.div key={i} whileHover={{ y: -5, zIndex: 10 }} className="relative w-14 h-14 rounded-full border-4 border-[#0f172a] overflow-hidden bg-gray-800 cursor-pointer transition-all">
                      <img src={url} alt="Dev Avatar" className="w-full h-full object-cover" />
                    </motion.div>
                  ))}
                  <div className="w-14 h-14 rounded-full border-4 border-[#0f172a] flex items-center justify-center text-xs font-bold shadow-xl"
                    style={{ background: accentColor }}>{avatarCount}</div>
                </div>
                <h3 className="text-3xl font-bold italic leading-snug text-gray-100">{trustQuote}</h3>
                <div className="flex items-center gap-2 text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={18} />)}
                  <span className="text-gray-400 ml-2 font-mono text-sm tracking-tighter">{trustScore}</span>
                </div>
              </div>

              <div className="w-full lg:w-[400px] space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                    <span className="text-sm font-medium text-gray-300">{matchingLabel}</span>
                  </div>
                  <span className="text-xs font-mono font-bold" style={{ color: accentColor }}>{matchScore}</span>
                </div>
                <motion.button
                  onClick={() => openModal("Start Your Sprint (Main CTA)")}
                  whileHover={{ scale: 1.02, backgroundColor: "#f8fafc" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-5 rounded-2xl bg-white text-black font-black flex items-center justify-center gap-3 transition-all shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                >
                  {sprintBtnLabel} <ArrowRight size={20} strokeWidth={3} />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/70 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-[#030712] border border-white/10 rounded-3xl p-8 shadow-2xl z-10 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 blur-[80px] rounded-full pointer-events-none"
                style={{ background: `${accentColor}1a` }} />
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors z-20"><X size={20} /></button>
              <h3 className="text-3xl font-bold text-white mb-2 relative z-10">Hire Top Talent</h3>
              <p className="font-medium mb-8 text-sm relative z-10" style={{ color: accentColor }}>
                You selected: <span className="text-white bg-white/10 px-2 py-1 rounded-md">{interestSource}</span>
              </p>
              <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input required type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-indigo-500 transition-colors" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                  <input required type="email" placeholder="Work Email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-indigo-500 transition-colors" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input required type="tel" placeholder="Phone / WhatsApp" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-indigo-500 transition-colors" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-indigo-500 appearance-none cursor-pointer transition-colors" value={formData.talentNeeded} onChange={(e) => setFormData({ ...formData, talentNeeded: e.target.value })}>
                    <option value="Full Stack Engineer" className="bg-[#0f172a]">Full Stack Engineer</option>
                    <option value="Frontend Engineer" className="bg-[#0f172a]">Frontend Engineer (React/Vue)</option>
                    <option value="Backend Engineer" className="bg-[#0f172a]">Backend Engineer (Node/Python)</option>
                    <option value="UI/UX Designer" className="bg-[#0f172a]">UI/UX Designer</option>
                    <option value="DevOps/Cloud" className="bg-[#0f172a]">DevOps / Cloud Expert</option>
                    <option value="Not Sure" className="bg-[#0f172a]">Not Sure Yet / Let's Discuss</option>
                  </select>
                </div>
                <textarea required placeholder="Tell us about your sprint or project requirements..." rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-indigo-500 resize-none transition-colors" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                <button disabled={isSubmitting} type="submit" className="w-full text-white font-bold py-4 rounded-xl transition-all flex justify-center items-center gap-2"
                  style={{ background: `linear-gradient(to right, ${accentColor}, #a855f7)` }}>
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