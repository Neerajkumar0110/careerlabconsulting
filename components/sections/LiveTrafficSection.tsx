"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Globe, Activity, TrendingUp, LucideIcon } from 'lucide-react';

// TypeScript Interface for Props
interface StatCardProps {
  title: string;
  value: React.ReactNode;
  subtitle: string;
  icon: LucideIcon;
  colorClass: string;
  delay: number;
}

const LiveCounter: React.FC = () => {
  const [liveUsers, setLiveUsers] = useState<number>(152);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUsers((prev) => {
        const fluctuation = Math.floor(Math.random() * 7) - 3;
        const nextValue = prev + fluctuation;
        return nextValue > 120 ? nextValue : 125;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={liveUsers}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        className="tabular-nums inline-block"
      >
        {liveUsers}
      </motion.span>
    </AnimatePresence>
  );
};

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon: Icon, colorClass, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="relative group p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.07] transition-all overflow-hidden"
  >
    {/* Background Glow Effect */}
    <div className={`absolute -right-4 -top-4 w-24 h-24 blur-3xl opacity-20 transition-opacity group-hover:opacity-40 ${colorClass}`} />
    
    <div className="flex items-start justify-between mb-8">
      <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
        <Icon className="w-5 h-5 text-blue-400" />
      </div>
      {title === "Real-Time Traffic" && (
        <div className="flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Live</span>
        </div>
      )}
    </div>

    <div className="relative z-10">
      <p className="text-slate-400 text-xs font-semibold uppercase tracking-[0.15em] mb-1">{title}</p>
      <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
        {value}
      </h3>
      <p className="mt-2 text-slate-500 text-sm font-medium leading-relaxed">{subtitle}</p>
    </div>
  </motion.div>
);

const LiveTrafficSection: React.FC = () => {
  return (
    // Background changed to a Rich Dark Blue/Midnight color
    <section className="py-24 bg-[#020617] text-white overflow-hidden selection:bg-blue-500/30">
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
            <p className="text-slate-400 text-lg leading-relaxed">
              Empowering the next generation of businesses with high-performance AI infrastructure and real-time data analytics.
            </p>
          </div>
          
          <div className="flex items-center gap-6 bg-white/[0.03] p-4 rounded-2xl border border-white/5">
             <div className="text-left">
                <p className="text-3xl font-bold text-blue-400">99.9%</p>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">System Uptime</p>
             </div>
             <div className="h-10 w-[1px] bg-white/10" />
             <div className="text-left">
                <p className="text-3xl font-bold text-emerald-400">24/7</p>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Active Monitoring</p>
             </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard 
            title="Global Footprint"
            value="100K+"
            subtitle="Monthly unique visitors exploring our platform."
            icon={Globe}
            colorClass="bg-blue-600"
            delay={0.1}
          />
          <StatCard 
            title="Real-Time Traffic"
            value={<LiveCounter />}
            subtitle="Active sessions currently being processed."
            icon={Activity}
            colorClass="bg-emerald-600"
            delay={0.2}
          />
          <StatCard 
            title="Total Requests"
            value="1.2M"
            subtitle="API calls handled by our global edge network."
            icon={TrendingUp}
            colorClass="bg-purple-600"
            delay={0.3}
          />
          <StatCard 
            title="Client Base"
            value="500+"
            subtitle="Trusted by industry leaders worldwide."
            icon={Users}
            colorClass="bg-orange-600"
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
};

export default LiveTrafficSection;