"use client";

import Link from "next/link";
import { motion, useScroll, useSpring, useMotionValue, useTransform } from "framer-motion";
import { Search, UserCheck, Rocket, ArrowRight, Sparkles } from "lucide-react";
import { useRef, useState } from "react";

const HOW_IT_WORKS = {
  client: {
    title: "Hire Elite Talent",
    subtitle: "From precision matching to secure deployment in three phases.",
    cta: { label: "Launch a Project", href: "/hire" },
    steps: [
      {
        icon: Search,
        title: "Define Your Scope",
        desc: "Outline your technical requirements and timeline. Our AI parses your needs instantly.",
        color: "#3b82f6", 
      },
      {
        icon: UserCheck,
        title: "Neural Matching",
        desc: "Our engine filters the top 1% of verified experts to find your perfect technical match.",
        color: "#6366f1", 
      },
      {
        icon: Rocket,
        title: "Secure Onboarding",
        desc: "Start collaborating immediately with integrated payments and IP protection.",
        color: "#a855f7", 
      },
    ],
  },
};

export default function HowItWorks() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeColor, setActiveColor] = useState("#6366f1");
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const role = "client";
  const content = HOW_IT_WORKS[role];

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
  });

  return (
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[11px] font-bold uppercase tracking-[0.4em] mb-8"
          >
            <Sparkles size={14} /> The Protocol
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-[1.1]"
          >
            {content.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed"
          >
            {content.subtitle}
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
            {content.steps.map((step, i) => {
              const Icon = step.icon;
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
                          className={`absolute -top-3 -right-3 w-10 h-10 rounded-2xl text-white flex items-center justify-center font-black text-sm border-4 border-[#020617] shadow-xl`}
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
          <div 
            className="relative bg-[#020617] rounded-[2.95rem] overflow-hidden px-12 py-20 md:py-28 flex flex-col items-center text-center transition-all duration-500"
          >
            <div 
              className="absolute inset-0 z-0 opacity-40 group-hover:scale-110 transition-transform duration-[2s] ease-out bg-cover bg-center bg-no-repeat"
              style={{ 
                backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')`,
              }}
            />
            
            <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#020617]/80 via-[#020617]/40 to-[#020617]/90" />
            <div className="absolute inset-0 z-[1] bg-radial-gradient from-transparent to-[#020617] opacity-60" />

            <div className="relative z-10 max-w-3xl">
              <h4 className="text-4xl md:text-6xl font-black text-white mb-10 tracking-tighter leading-none">
                Ready to experience the <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 animate-gradient-x">
                  future of work?
                </span>
              </h4>

              <Link
                href={content.cta.href}
                className="group relative inline-flex px-12 py-6 bg-white text-black hover:scale-105 active:scale-95 rounded-full font-black text-sm uppercase tracking-[0.2em] transition-all items-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.2)] overflow-hidden"
              >
                <span className="relative z-10">{content.cta.label}</span>
                <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}