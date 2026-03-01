// app/hirex/audit-logs/page.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import { 
  FileSignature, Search, ShieldAlert, CheckCircle2, 
  Database, Lock, Activity, Download, Terminal, 
  Globe, Key, UserCog, FileOutput, Server,
  X, Send, Mail, Building, Clock, Filter
} from 'lucide-react';

// Mock Data for System Audit Logs
const AUDIT_EVENTS = [
  {
    id: "LOG-992-SEC",
    timestamp: "2026-03-01 14:32:05 UTC",
    actor: "admin@careerlab.com",
    ip: "192.168.1.4",
    type: "SECURITY",
    action: "Generated new Enterprise API Key for Greenhouse Integration.",
    status: "success",
    icon: Key,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20"
  },
  {
    id: "LOG-991-CMP",
    timestamp: "2026-03-01 12:15:22 UTC",
    actor: "system_core_dpo",
    ip: "Internal Network",
    type: "COMPLIANCE",
    action: "Executed GDPR Data Erasure request for candidate HX-5521.",
    status: "success",
    icon: FileOutput,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20"
  },
  {
    id: "LOG-990-ACC",
    timestamp: "2026-03-01 10:05:11 UTC",
    actor: "hr_director@client.co",
    ip: "45.22.19.88",
    type: "ACCESS",
    action: "Failed SSO Login attempt. Reason: Invalid SAML Assertion.",
    status: "critical",
    icon: Lock,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20"
  },
  {
    id: "LOG-989-CFG",
    timestamp: "2026-03-01 09:45:00 UTC",
    actor: "tech_lead@client.co",
    ip: "112.44.55.12",
    type: "CONFIGURATION",
    action: "Updated AI Assessment Matrix rigor from 'Standard' to 'Extreme'.",
    status: "info",
    icon: UserCog,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20"
  },
  {
    id: "LOG-988-SYS",
    timestamp: "2026-03-01 08:30:15 UTC",
    actor: "TiDB_Serverless",
    ip: "us-east-1a",
    type: "SYSTEM",
    action: "Automated database snapshot and cross-region backup completed.",
    status: "success",
    icon: Database,
    color: "text-slate-400",
    bg: "bg-slate-500/10",
    border: "border-slate-500/20"
  }
];

const FILTER_TAGS = ["All Events", "Security", "Access", "Compliance", "Configuration", "System"];

export default function AuditLogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Events");
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', timeframe: 'Last 30 Days' });

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = "918700236923";
    const message = `*HireX Audit Export Request*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Company:* ${formData.company}%0A*Audit Timeframe:* ${formData.timeframe}%0A%0A_Requesting secure CSV/PDF export of system audit logs._`;
    
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    setIsModalOpen(false);
    setFormData({ name: '', email: '', company: '', timeframe: 'Last 30 Days' });
  };

  const filteredLogs = AUDIT_EVENTS.filter(log => {
    const matchesSearch = log.actor.toLowerCase().includes(searchQuery.toLowerCase()) || log.action.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "All Events" || log.type.toLowerCase() === activeFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <main className="min-h-screen relative bg-[#020617] text-white selection:bg-amber-500/30 font-sans">
      
      {/* Subtle Background Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-amber-600/5 blur-[120px] rounded-full translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-slate-600/10 blur-[120px] rounded-full -translate-x-1/4 translate-y-1/4" />
      </div>

      <Navbar />

      <div className="relative z-10 pt-28 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] md:text-xs font-mono uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <FileSignature className="w-3.5 h-3.5 md:w-4 md:h-4" /> System Administration
            </div>
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4 leading-tight">
              Immutable <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Audit Logs</span>
            </h1>
            <p className="text-sm md:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Track every administrative action, data export, and security event. Built to satisfy SOC2, ISO 27001, and enterprise compliance reporting.
            </p>
          </div>

          {/* Quick Stats Panel */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
            {[
              { label: "Events Recorded (30d)", value: "14.2M", icon: Activity, color: "text-blue-400" },
              { label: "Log Retention Policy", value: "7 Years", icon: Database, color: "text-amber-400" },
              { label: "Critical Alerts", value: "0", icon: ShieldAlert, color: "text-emerald-400" },
              { label: "Export Readiness", value: "Active", icon: Download, color: "text-purple-400" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-5 md:p-6 flex flex-col justify-center shadow-lg transition-transform hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-2xl md:text-3xl font-black text-white">{stat.value}</p>
                <p className="text-[10px] md:text-xs uppercase font-bold text-slate-500 tracking-widest mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Log Explorer Interface */}
          <div className="bg-[#0b0f1f]/80 backdrop-blur-3xl border border-white/10 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col">
            
            {/* Toolbar: Search & Filters */}
            <div className="p-5 md:p-8 border-b border-white/5 flex flex-col lg:flex-row gap-4 items-center justify-between bg-black/20">
              
              <div className="relative w-full lg:w-[400px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Search actors, IPs, or events..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors placeholder:text-slate-600"
                />
              </div>
              
              <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto no-scrollbar touch-pan-x pb-1 lg:pb-0">
                <Filter className="w-4 h-4 text-slate-600 shrink-0 hidden md:block mr-2" />
                {FILTER_TAGS.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setActiveFilter(tag)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      activeFilter === tag 
                      ? 'bg-amber-500 text-slate-900 shadow-[0_0_10px_rgba(245,158,11,0.3)]' 
                      : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

            </div>

            {/* Desktop Table Header */}
            <div className="hidden lg:grid grid-cols-12 gap-6 px-8 py-4 bg-black/40 border-b border-white/5 text-[10px] font-black uppercase tracking-widest text-slate-500">
              <div className="col-span-3">Event & Timestamp</div>
              <div className="col-span-3">Actor / Origin IP</div>
              <div className="col-span-5">Audit Description</div>
              <div className="col-span-1 text-right">Status</div>
            </div>

            {/* Logs List Area */}
            <div className="p-4 md:p-6 space-y-4">
              {filteredLogs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                  <Search className="w-12 h-12 mb-4 opacity-20" />
                  <p className="text-sm md:text-base font-medium">No audit records found matching your query.</p>
                </div>
              ) : (
                filteredLogs.map((log) => (
                  <div 
                    key={log.id} 
                    className="group bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] p-5 rounded-2xl transition-all duration-300 lg:grid lg:grid-cols-12 lg:gap-6 lg:items-center flex flex-col gap-4"
                  >
                    
                    {/* Mobile: Top Row / Desktop: Col 1 (Event & Time) */}
                    <div className="lg:col-span-3 flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl ${log.bg} border ${log.border} flex items-center justify-center shrink-0`}>
                        <log.icon className={`w-5 h-5 ${log.color}`} />
                      </div>
                      <div>
                        <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider mb-1 ${log.bg} ${log.color}`}>
                          {log.type}
                        </span>
                        <div className="text-xs text-slate-300 font-mono flex items-center gap-1.5 mt-0.5">
                          <Clock className="w-3 h-3 text-slate-500" />
                          {log.timestamp.split(' ')[1]} UTC
                        </div>
                        <p className="text-[10px] text-slate-500 font-mono mt-1 hidden lg:block">{log.id}</p>
                      </div>
                    </div>

                    {/* Mobile: Mid Row / Desktop: Col 2 (Actor & IP) */}
                    <div className="lg:col-span-3 pt-4 border-t border-white/5 lg:pt-0 lg:border-none">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 lg:hidden">Actor Details</p>
                      <p className="text-sm font-bold text-white break-all">{log.actor}</p>
                      <p className="text-xs text-slate-400 font-mono mt-1 flex items-center gap-1.5">
                        <Globe className="w-3 h-3" /> {log.ip}
                      </p>
                    </div>

                    {/* Mobile: Bottom Row / Desktop: Col 3 (Action) */}
                    <div className="lg:col-span-5">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 lg:hidden">Action Taken</p>
                      <p className="text-sm text-slate-300 leading-relaxed">{log.action}</p>
                    </div>

                    {/* Mobile: Absolute Status / Desktop: Col 4 (Status) */}
                    <div className="lg:col-span-1 flex lg:justify-end absolute top-5 right-5 lg:static">
                      {log.status === 'critical' ? (
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)] animate-pulse" title="Critical Failure" />
                      ) : log.status === 'success' ? (
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" title="Success" />
                      ) : (
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" title="Info" />
                      )}
                    </div>

                  </div>
                ))
              )}
            </div>

            {/* Bottom Export Toolbar */}
            <div className="p-6 md:p-8 border-t border-white/5 bg-black/20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
              <div className="text-center sm:text-left">
                <p className="text-sm font-bold text-white">System is fully compliant</p>
                <p className="text-xs text-slate-500 font-mono mt-1">Showing latest 50 events. Total database size: 14.2M</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-sm font-bold transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-105"
              >
                <Download className="w-4 h-4" /> Export Report
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* EXPORT REQUEST MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg bg-[#0b0f1f] border border-amber-500/30 rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.15)]">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors bg-white/5 rounded-full z-10">
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-8 md:p-10 relative">
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-amber-500/20 blur-3xl rounded-full" />
              
              <div className="mb-8 text-center relative z-10">
                <div className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-500/20">
                  <Download className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold">Export Audit Data</h3>
                <p className="text-slate-400 text-sm mt-1">Securely extract system logs for compliance.</p>
              </div>

              <form onSubmit={handleWhatsAppSubmit} className="space-y-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <input 
                      required type="text" placeholder="Admin Name"
                      className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-amber-500 outline-none w-full"
                      value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="relative">
                    <input 
                      required type="email" placeholder="Admin Email"
                      className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-amber-500 outline-none w-full"
                      value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="relative">
                  <Building className="absolute left-4 top-4 w-4 h-4 text-slate-500" />
                  <input 
                    required type="text" placeholder="Organization Name"
                    className="bg-white/5 border border-white/10 rounded-xl p-4 pl-12 text-sm focus:border-amber-500 outline-none w-full"
                    value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})}
                  />
                </div>

                <div className="relative">
                  <select 
                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-slate-300 focus:border-amber-500 outline-none w-full appearance-none"
                    value={formData.timeframe} onChange={e => setFormData({...formData, timeframe: e.target.value})}
                  >
                    <option value="Last 24 Hours" className="bg-slate-900">Last 24 Hours</option>
                    <option value="Last 7 Days" className="bg-slate-900">Last 7 Days</option>
                    <option value="Last 30 Days" className="bg-slate-900">Last 30 Days</option>
                    <option value="Year to Date" className="bg-slate-900">Year to Date (YTD)</option>
                  </select>
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-500 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-900/40 mt-6"
                >
                  Request CSV / PDF Export <Send className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-center text-slate-500 uppercase tracking-widest font-mono mt-4">Routed securely to: +91 870023 6923</p>
              </form>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <Footer />
    </main>
  );
}