'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, PieChart, Activity, TrendingUp, 
  ArrowUpRight, ArrowDownRight, Briefcase, 
  DollarSign, Users, Calendar, Download, Filter,
  CheckCircle2, Clock, AlertCircle
} from 'lucide-react';

import Navbar from '@/components/freelancex/layout/HomeNavbar';
import Footer from '@/components/freelancex/landing/Footer';

const STATS_CARDS = [
  { label: "Total Revenue", value: "₹4,28,500", change: "+12.5%", trending: "up", icon: DollarSign, color: "text-emerald-400" },
  { label: "Active Projects", value: "12", change: "+2", trending: "up", icon: Briefcase, color: "text-blue-400" },
  { label: "Talent Network", value: "2.4k", change: "+145", trending: "up", icon: Users, color: "text-purple-400" },
  { label: "Avg. Sprint Velocity", value: "94%", change: "-2.1%", trending: "down", icon: Activity, color: "text-orange-400" },
];

const RECENT_PROJECTS = [
  { name: "AI CRM Integration", client: "Nexus AI", status: "In Progress", progress: 65, budget: "₹85,000", date: "Feb 24" },
  { name: "Mobile Banking UI", client: "Stark Ind.", status: "Completed", progress: 100, budget: "₹1,20,000", date: "Feb 20" },
  { name: "Neural Training Set", client: "Manee Lab", status: "Review", progress: 90, budget: "₹45,000", date: "Feb 18" },
  { name: "E-commerce Migration", client: "GlobalTech", status: "Delayed", progress: 30, budget: "₹2,10,000", date: "Feb 15" },
];

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative">
        {/* Background Ambient Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto space-y-10">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black tracking-tight mb-2">Reports & Analytics</h1>
              <p className="text-slate-500 font-medium">Real-time performance metrics and ecosystem insights.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
                <Filter size={16} /> Filter
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20">
                <Download size={16} /> Export CSV
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS_CARDS.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/[0.03] border border-white/5 rounded-3xl p-6 hover:border-white/10 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl bg-white/5 ${stat.color}`}>
                    <stat.icon size={20} />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-bold ${stat.trending === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {stat.trending === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {stat.change}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                  <h3 className="text-2xl font-black text-white">{stat.value}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* Left: Project Status (Bento Large) */}
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-[#0a0f1d] border border-white/10 rounded-[2.5rem] p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold flex items-center gap-3">
                    <BarChart3 className="text-blue-500" /> Active Project Velocity
                  </h3>
                  <div className="flex gap-2 p-1 bg-white/5 rounded-xl">
                    {['Week', 'Month', 'Quarter'].map(t => (
                      <button 
                        key={t}
                        onClick={() => setActiveTab(t)}
                        className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === t ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-white'}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mockup Chart Placeholder */}
                <div className="h-[300px] w-full flex items-end justify-between gap-2 px-2">
                  {[40, 70, 45, 90, 65, 80, 55, 95, 75, 60, 85, 100].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: i * 0.05, duration: 1 }}
                      className="w-full bg-gradient-to-t from-blue-600/20 to-blue-500 rounded-t-lg relative group"
                    >
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {h}%
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="flex justify-between mt-6 px-2">
                   {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                     <span key={m} className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{m}</span>
                   ))}
                </div>
              </div>

              {/* Project Table */}
              <div className="bg-[#0a0f1d] border border-white/10 rounded-[2.5rem] overflow-hidden">
                <div className="p-8 border-b border-white/5">
                  <h3 className="text-xl font-bold flex items-center gap-3">
                    <TrendingUp className="text-emerald-500" /> Recent Activity
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-white/[0.02] text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                        <th className="px-8 py-4">Project Name</th>
                        <th className="px-8 py-4">Status</th>
                        <th className="px-8 py-4">Progress</th>
                        <th className="px-8 py-4">Budget</th>
                        <th className="px-8 py-4 text-right">Timeline</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {RECENT_PROJECTS.map((project, i) => (
                        <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                          <td className="px-8 py-6">
                            <div className="font-bold text-white group-hover:text-blue-400 transition-colors">{project.name}</div>
                            <div className="text-xs text-slate-500">{project.client}</div>
                          </td>
                          <td className="px-8 py-6">
                             <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                               project.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                               project.status === 'Delayed' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                               'bg-blue-500/10 text-blue-400 border-blue-500/20'
                             }`}>
                               {project.status}
                             </span>
                          </td>
                          <td className="px-8 py-6">
                             <div className="flex items-center gap-3">
                               <div className="w-24 bg-white/5 rounded-full h-1.5">
                                 <div className={`h-1.5 rounded-full ${project.progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{ width: `${project.progress}%` }} />
                               </div>
                               <span className="text-xs font-mono font-bold text-slate-400">{project.progress}%</span>
                             </div>
                          </td>
                          <td className="px-8 py-6 font-bold text-slate-200">{project.budget}</td>
                          <td className="px-8 py-6 text-right text-xs font-bold text-slate-500 uppercase">{project.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right: Distribution & Alerts */}
            <div className="lg:col-span-4 space-y-8">
              {/* Vetting Distribution */}
              <div className="bg-[#0a0f1d] border border-white/10 rounded-[2.5rem] p-8">
                <h3 className="text-lg font-bold mb-8 flex items-center gap-3">
                   <PieChart className="text-purple-500" /> Talent Distribution
                </h3>
                <div className="space-y-6">
                  {[
                    { label: 'Full Stack', val: 45, color: 'bg-blue-500' },
                    { label: 'AI/ML Engineers', val: 30, color: 'bg-purple-500' },
                    { label: 'UI/UX Designers', val: 15, color: 'bg-emerald-500' },
                    { label: 'DevOps', val: 10, color: 'bg-orange-500' }
                  ].map(item => (
                    <div key={item.label} className="space-y-2">
                      <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
                        <span>{item.label}</span>
                        <span>{item.val}%</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-2">
                        <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.val}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Center */}
              <div className="bg-gradient-to-br from-indigo-600/20 to-transparent border border-indigo-500/20 rounded-[2.5rem] p-8">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-3">
                   <AlertCircle className="text-indigo-400" /> System Alerts
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex gap-4">
                     <CheckCircle2 className="text-emerald-500 shrink-0" size={18} />
                     <p className="text-xs text-slate-300 font-medium">Payment for <span className="text-white font-bold">Stark Ind.</span> has been successfully verified.</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex gap-4">
                     <Clock className="text-orange-400 shrink-0" size={18} />
                     <p className="text-xs text-slate-300 font-medium">New AI Audit pending for <span className="text-white font-bold">4 Candidates</span>.</p>
                  </div>
                </div>
                <button className="w-full mt-6 py-4 bg-white text-black font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-slate-200 transition-all">
                  Run Full Protocol Check
                </button>
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}