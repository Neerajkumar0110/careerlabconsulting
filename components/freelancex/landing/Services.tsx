"use client";

import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue, AnimatePresence } from "framer-motion";
import {
  Code2, Palette, Brain, Megaphone, ShieldCheck, Clock,
  ArrowRight, Zap, X, Loader2
} from "lucide-react";
import { MouseEvent, useState } from "react";
import { usePageContent } from '@/hooks/usePageContent';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const ICON_MAP: Record<string, React.ElementType> = {
  Code2, Palette, Brain, Megaphone, ShieldCheck, Clock,
};

const DEFAULT_SERVICES = JSON.stringify([
  { icon: "Code2",      title: "Engineering",    desc: "Frontend, backend, and full-stack developers specialized in Next.js & AI.",             href: "/services/web",        color: "from-blue-500/20"    },
  { icon: "Palette",    title: "Product Design", desc: "Crafting high-conversion interfaces and premium branding experiences.",                  href: "/services/design",     color: "from-purple-500/20"  },
  { icon: "Brain",      title: "AI Integration", desc: "LLMs, workflow automation, and custom neural search implementation.",                    href: "/services/ai",         color: "from-indigo-500/20"  },
  { icon: "Megaphone",  title: "Growth Ops",     desc: "Performance marketing and SEO strategies for high-scale startups.",                      href: "/services/marketing",  color: "from-emerald-500/20" },
  { icon: "ShieldCheck","title": "Vetted Only",  desc: "Rigorous 5-step screening process ensures only the top 1% join.",                        href: "/how-it-works",        color: "from-orange-500/20"  },
  { icon: "Clock",      title: "Flash Hiring",   desc: "Our matching engine delivers qualified candidates in under 24 hours.",                   href: "/hire",                color: "from-rose-500/20"    },
]);

const DEFAULT_TRUST_AVATARS = JSON.stringify([
  "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
  "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150",
  "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=150",
]);

const DEFAULT_TRUST_BRANDS = JSON.stringify(["STRIPE", "AIRBNB", "LINEAR"]);

function ServiceCard({ service, onOpenModal }: {
  service: { icon: string; title: string; desc: string; href: string; color: string };
  index: number;
  onOpenModal: (title: string) => void;
}) {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);
  const Icon = ICON_MAP[service.icon] ?? Code2;

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="group relative h-full rounded-[32px] border border-white/10 bg-[#020617] p-8 overflow-hidden"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(79,70,229,0.15), transparent 80%)`,
        }}
      />
      <div className="relative z-10 flex flex-col h-full">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} to-transparent border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
          <Icon size={28} className="text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{service.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">{service.desc}</p>
        <button
          onClick={() => onOpenModal(service.title)}
          className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-indigo-400 group-hover:text-white transition-colors w-fit"
        >
          Explore expertise <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full" />
    </div>
  );
}

export default function Services() {
  const { get } = usePageContent('f_services-section');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // CMS values
  const badgeLabel      = get('services', 'badge_label',        'Capabilities');
  const headline        = get('services', 'headline',           'Elite Infrastructure for');
  const headlineAccent  = get('services', 'headline_accent',    'Modern Performance.');
  const viewNetworkLabel= get('services', 'view_network_label', 'View Network');
  const viewNetworkHref = get('services', 'view_network_href',  '/services');
  const trustLabel      = get('services', 'trust_label',        'Trusted by 2,500+ scale-ups');
  const trustSubLabel   = get('services', 'trust_sub_label',    'Global payment & compliance handled');
  const whatsappNumber  = get('services', 'whatsapp_number',    '918700236923');
  const accentColor     = get('services', 'accent_color',       '#6366f1');

  const servicesRaw     = get('services', 'services_json',      DEFAULT_SERVICES);
  const services        = safeParse<{ icon: string; title: string; desc: string; href: string; color: string }[]>(servicesRaw, []);

  const avatarsRaw      = get('services', 'trust_avatars_json', DEFAULT_TRUST_AVATARS);
  const trustAvatars    = safeParse<string[]>(avatarsRaw, []);

  const brandsRaw       = get('services', 'trust_brands_json',  DEFAULT_TRUST_BRANDS);
  const trustBrands     = safeParse<string[]>(brandsRaw, []);

  const openModal = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    data.service = selectedService;
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const text = `Hi, I have an enquiry for ${selectedService}.\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nCompany: ${data.company || "N/A"}\nDetails: ${data.message}`;
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
        setIsModalOpen(false);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error submitting the form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative bg-[#020617] py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] blur-[120px] rounded-full pointer-events-none"
        style={{ background: `${accentColor}0d` }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 lg:mb-24">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 font-black uppercase tracking-[0.3em] text-[10px] mb-4"
              style={{ color: accentColor }}
            >
              <Zap size={12} style={{ fill: accentColor }} />
              {badgeLabel}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9]"
            >
              {headline} <br />
              <span className="text-gray-500">{headlineAccent}</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href={viewNetworkHref}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl border border-white/10 bg-white/5 text-white font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              {viewNetworkLabel} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <ServiceCard service={service} index={i} onOpenModal={openModal} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-8 rounded-[40px] border border-white/5 flex flex-col lg:flex-row items-center justify-between gap-8"
          style={{ background: `linear-gradient(to right, ${accentColor}1a, transparent)` }}
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex -space-x-4">
              {trustAvatars.map((url, i) => (
                <div key={i} className="relative w-14 h-14 rounded-full border-4 border-[#020617] overflow-hidden bg-gray-800 hover:z-20 hover:scale-110 transition-all duration-300">
                  <img src={url} alt={`vetted expert ${i}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="text-center md:text-left">
              <p className="text-white font-bold text-lg">{trustLabel}</p>
              <p className="text-gray-500 text-xs uppercase tracking-widest font-semibold">{trustSubLabel}</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-10 opacity-30 hover:opacity-100 transition-opacity duration-500">
            {trustBrands.map((brand) => (
              <span key={brand} className="text-2xl font-black text-white italic tracking-tighter">{brand}</span>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-[#0f172a] border border-white/10 rounded-3xl p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
              <h3 className="text-2xl font-bold text-white mb-2">Request Expertise</h3>
              <p className="text-gray-400 text-sm mb-6">
                You are inquiring about <span className="font-semibold" style={{ color: accentColor }}>{selectedService}</span>.
              </p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block uppercase tracking-wider font-semibold">Full Name</label>
                    <input required name="name" type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block uppercase tracking-wider font-semibold">Company (Optional)</label>
                    <input name="company" type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all" placeholder="Acme Inc" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block uppercase tracking-wider font-semibold">Work Email</label>
                    <input required name="email" type="email" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all" placeholder="john@company.com" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block uppercase tracking-wider font-semibold">Phone / WhatsApp</label>
                    <input required name="phone" type="tel" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all" placeholder="+91 9876543210" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1.5 block uppercase tracking-wider font-semibold">Project Details</label>
                  <textarea required name="message" rows={4} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all resize-none" placeholder="Tell us about your requirements..."></textarea>
                </div>
                <button disabled={isSubmitting} type="submit" className="w-full text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 mt-2"
                  style={{ background: accentColor }}>
                  {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : "Submit Request"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}