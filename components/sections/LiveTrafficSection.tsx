"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Globe, Zap, FolderKanban, LucideIcon } from 'lucide-react';

interface CounterProps {
  initialValue: number;
  min: number;
  max: number;
  intervalMs?: number;
  suffix?: string;
}

const DynamicCounter: React.FC<CounterProps> = ({ initialValue, min, max, intervalMs = 3000, suffix = "" }) => {
  const [count, setCount] = useState<number>(initialValue);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        // Logic for "Real" feel:
        // Kam, Medium aur Zyada fluctuation ka mixture
        const volatility = Math.random();
        let change = 0;

        if (volatility > 0.9) {
          // 10% Chance: Bada Spike (High Fluctuation: 20-35)
          change = Math.floor(Math.random() * 16) + 20; 
        } else if (volatility > 0.6) {
          // 30% Chance: Medium Fluctuation (6-19)
          change = Math.floor(Math.random() * 14) + 6;
        } else {
          // 60% Chance: Chhota Change (Low Fluctuation: 1-5)
          change = Math.floor(Math.random() * 5) + 1;
        }

        // 50% chance ki value badhegi ya ghategi
        const direction = Math.random() > 0.5 ? 1 : -1;
        
        const nextValue = prev + (change * direction);

        // Bounds check (Taaki min/max se bahar na jaye)
        if (nextValue < min) return min + Math.floor(Math.random() * 10);
        if (nextValue > max) return max - Math.floor(Math.random() * 10);
        
        return nextValue;
      });
    }, intervalMs);
    return () => clearInterval(interval);
  }, [min, max, intervalMs]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={count}
        initial={{ y: 10, opacity: 0, filter: "blur(5px)" }} // Thoda blur effect add kiya smooth feel ke liye
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        exit={{ y: -10, opacity: 0, filter: "blur(5px)" }}
        transition={{ duration: 0.3, ease: "easeOut" }} // Duration thoda tez kiya taaki lag na lage
        className="tabular-nums inline-block"
      >
        {count.toLocaleString()}{suffix}
      </motion.span>
    </AnimatePresence>
  );
};

// --- Baaki Components Same Rahenge ---

interface StatCardProps {
  title: string;
  value: React.ReactNode;
  subtitle: string;
  icon: LucideIcon;
  colorClass: string;
  delay: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon: Icon, colorClass, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="relative group p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.07] transition-all overflow-hidden"
  >
    <div className={`absolute -right-4 -top-4 w-24 h-24 blur-3xl opacity-10 transition-opacity group-hover:opacity-30 ${colorClass}`} />
    
    <div className="flex items-start justify-between mb-8">
      <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
        <Icon className="w-5 h-5 text-blue-400" />
      </div>
      <div className="flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Live</span>
      </div>
    </div>

    <div className="relative z-10">
      <p className="text-slate-400 text-xs font-semibold uppercase tracking-[0.15em] mb-1">{title}</p>
      <h3 className="text-4xl font-bold text-white tracking-tight">
        {value}
      </h3>
      <p className="mt-2 text-slate-500 text-sm font-medium leading-relaxed">{subtitle}</p>
    </div>
  </motion.div>
);

const LiveTrafficSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#020617] text-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6"
            >
              Global Scale. <br />
              <span className="text-blue-500">Real-time Impact.</span>
            </motion.h2>
            <p className="text-slate-400 text-lg">
              Monitoring global operations and infrastructure performance in real-time.
            </p>
          </div>
          
          <div className="flex items-center gap-6 bg-white/[0.03] p-4 rounded-2xl border border-white/5">
             <div>
                <p className="text-3xl font-bold text-blue-400">99.9%</p>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Uptime</p>
             </div>
             <div className="h-10 w-[1px] bg-white/10" />
             <div>
                <p className="text-3xl font-bold text-emerald-400">24/7</p>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Monitoring</p>
             </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Note: Interval change karke randomness feel badha di */}
          <StatCard 
            title="Global Visitors"
            value={<DynamicCounter initialValue={8420} min={8000} max={9500} suffix="+" intervalMs={3500} />}
            subtitle="Active users exploring from across the globe."
            icon={Globe}
            colorClass="bg-blue-600"
            delay={0.1}
          />

          <StatCard 
            title="Indian Visitors"
            value={<DynamicCounter initialValue={3150} min={3000} max={4000} intervalMs={2800} />}
            subtitle="Real-time traffic originating from India."
            icon={Users}
            colorClass="bg-orange-500"
            delay={0.2}
          />

          <StatCard 
            title="API Requests"
            value={<DynamicCounter initialValue={142} min={120} max={180} suffix="/s" intervalMs={2000} />}
            subtitle="Current requests being processed by our edge."
            icon={Zap}
            colorClass="bg-purple-600"
            delay={0.3}
          />

          <StatCard 
            title="Active Projects"
            value={<DynamicCounter initialValue={512} min={510} max={525} intervalMs={4500} />}
            subtitle="Ongoing enterprise projects powered by AI."
            icon={FolderKanban}
            colorClass="bg-emerald-600"
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
};

export default LiveTrafficSection;