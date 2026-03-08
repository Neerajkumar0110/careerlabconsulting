// app/hirex/audit-logs/page.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import { 
  FileSignature, Search, CheckCircle2, 
  Database, Lock, Activity, Download, Terminal, 
  Globe, Key, UserCog, FileOutput, 
  X, Send, Building, Clock, 
  ShieldCheck, FileCheck, HardDrive, Cpu, Fingerprint,
  Link,
  Zap
} from 'lucide-react';

const ADMIN_WHATSAPP = "918700236923";

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
  }
];

const FILTER_TAGS = ["All Events", "Security", "Access", "Compliance", "Configuration", "System"];

export default function AuditLogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Events");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', timeframe: 'Last 30 Days' });

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*HireX Audit Export Request*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Company:* ${formData.company}%0A*Audit Timeframe:* ${formData.timeframe}%0A%0A_Requesting secure CSV/PDF export of system audit logs._`;
    window.open(`https://wa.me/${ADMIN_WHATSAPP}?text=${message}`, '_blank');
    setIsModalOpen(false);
  };

  const filteredLogs = AUDIT_EVENTS.filter(log => {
    const matchesSearch = log.actor.toLowerCase().includes(searchQuery.toLowerCase()) || log.action.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "All Events" || log.type.toLowerCase() === activeFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <main className="min-h-screen relative bg-[#020617] text-white selection:bg-amber-500/30 font-sans">
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] md:w-[800px] h-[500px] bg-amber-600/5 blur-[120px] rounded-full translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] md:w-[600px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full -translate-x-1/4 translate-y-1/4" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />
      </div>

      <Navbar />

      <div className="relative z-10 pt-32 pb-16 md:pt-40 md:pb-24">
        
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-20">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] md:text-xs font-mono uppercase tracking-widest mb-6">
              <FileSignature className="w-3.5 h-3.5" /> Immutable Audit Infrastructure
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
              System <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Audit Trail</span>
            </h1>
            <p className="text-base md:text-lg text-slate-400 leading-relaxed">
              Real-time cryptographic logging of every administrative action. satisfing SOC2, GDPR, and ISO 27001 requirements for enterprise data governance.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: "Events Recorded", value: "14.2M+", icon: Activity, color: "text-blue-400" },
              { label: "Retention Policy", value: "7 Years", icon: Database, color: "text-amber-400" },
              { label: "Sync Latency", value: "< 2ms", icon: Zap, color: "text-emerald-400" },
              { label: "Export Readiness", value: "Verified", icon: Download, color: "text-purple-400" }
            ].map((stat, i) => (
              <div key={i} className="bg-slate-900/60 backdrop-blur-xl border border-white/10 p-5 md:p-6 rounded-2xl md:rounded-3xl hover:border-amber-500/30 transition-all group">
                <stat.icon className={`w-6 h-6 mb-3 ${stat.color} group-hover:scale-110 transition-transform`} />
                <h3 className="text-2xl md:text-3xl font-black text-white">{stat.value}</h3>
                <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-20 md:mb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/[0.02] border border-white/10 p-8 rounded-3xl hover:bg-white/[0.04] transition-colors group">
              <ShieldCheck className="w-10 h-10 text-blue-400 mb-6 group-hover:animate-pulse" />
              <h3 className="text-xl font-bold mb-2 text-white">SOC 2 Type II</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Continuous monitoring and logging of all organizational security practices and data access.</p>
            </div>
            <div className="bg-white/[0.02] border border-white/10 p-8 rounded-3xl hover:bg-white/[0.04] transition-colors group">
              <FileCheck className="w-10 h-10 text-emerald-400 mb-6 group-hover:animate-pulse" />
              <h3 className="text-xl font-bold mb-2 text-white">GDPR Compliance</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Automated audit trails for all Data Erasure (Right to be Forgotten) and Portability requests.</p>
            </div>
            <div className="bg-white/[0.02] border border-white/10 p-8 rounded-3xl hover:bg-white/[0.04] transition-colors group">
              <HardDrive className="w-10 h-10 text-purple-400 mb-6 group-hover:animate-pulse" />
              <h3 className="text-xl font-bold mb-2 text-white">ISO 27001</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Systematic logging of information security risks and administrative configuration changes.</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-20 md:mb-32 scroll-mt-24" id="log-explorer">
          <div className="bg-slate-900/60 backdrop-blur-3xl border border-white/10 rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col">
            
            <div className="p-6 md:p-10 border-b border-white/5 flex flex-col lg:flex-row gap-6 items-center justify-between bg-black/40">
              <div className="relative w-full lg:w-[450px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Filter by Actor Email, IP Address, or Action..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm text-white focus:border-amber-500 outline-none transition-all placeholder:text-slate-600"
                />
              </div>
              <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto no-scrollbar pb-1 lg:pb-0">
                {FILTER_TAGS.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setActiveFilter(tag)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border whitespace-nowrap ${
                      activeFilter === tag 
                      ? 'bg-amber-500 border-amber-500 text-slate-900 shadow-lg' 
                      : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden lg:grid grid-cols-12 gap-6 px-10 py-5 bg-black/60 border-b border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              <div className="col-span-3">Timestamp & Type</div>
              <div className="col-span-3">Origin (Actor / IP)</div>
              <div className="col-span-5">Audit Description</div>
              <div className="col-span-1 text-right">Integrity</div>
            </div>

            <div className="p-6 md:p-10 space-y-4">
              {filteredLogs.length === 0 ? (
                <div className="py-20 text-center text-slate-500 flex flex-col items-center">
                  <Terminal className="w-12 h-12 mb-4 opacity-20" />
                  <p className="text-lg font-medium italic">No audit records match your current security parameters.</p>
                </div>
              ) : (
                filteredLogs.map((log) => (
                  <div key={log.id} className="group bg-white/[0.02] border border-white/5 hover:border-amber-500/30 hover:bg-white/[0.04] p-6 rounded-2xl transition-all lg:grid lg:grid-cols-12 lg:gap-6 lg:items-center flex flex-col gap-4 relative">
                    <div className="lg:col-span-3 flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-2xl ${log.bg} border ${log.border} flex items-center justify-center shrink-0`}>
                        <log.icon className={`w-6 h-6 ${log.color}`} />
                      </div>
                      <div>
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-black tracking-widest ${log.bg} ${log.color} mb-1.5`}>{log.type}</span>
                        <p className="text-xs text-slate-400 font-mono flex items-center gap-1.5"><Clock className="w-3 h-3" /> {log.timestamp.split(' ')[1]}</p>
                      </div>
                    </div>
                    <div className="lg:col-span-3">
                      <p className="text-sm font-bold text-white mb-1 truncate">{log.actor}</p>
                      <p className="text-xs text-slate-500 font-mono flex items-center gap-1.5"><Globe className="w-3 h-3" /> {log.ip}</p>
                    </div>
                    <div className="lg:col-span-5">
                      <p className="text-sm text-slate-300 leading-relaxed">{log.action}</p>
                      <p className="text-[10px] text-slate-600 font-mono mt-2 uppercase tracking-tighter">Event_ID: {log.id}</p>
                    </div>
                    <div className="lg:col-span-1 flex lg:justify-end">
                      <div className={`w-2 h-2 rounded-full ${log.status === 'critical' ? 'bg-rose-500 animate-pulse shadow-[0_0_10px_#f43f5e]' : 'bg-emerald-500 shadow-[0_0_10px_#10b981]'}`} />
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-8 md:p-10 border-t border-white/5 bg-black/40 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-white font-bold flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Database Integrity Verified</p>
                <p className="text-xs text-slate-500 mt-1">Showing latest system events. SHA-256 Checksum Active.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-10 py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-2xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] flex items-center justify-center gap-2 hover:-translate-y-1"
              >
                <Download className="w-5 h-5" /> Request Secure Export
              </button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-20 md:mb-32">
          <div className="bg-slate-900/50 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row items-stretch shadow-2xl">
            <div className="lg:w-1/2 relative min-h-[300px] lg:min-h-full">
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
                alt="Cryptographic Hashing Visualization"
                className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-[50%]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#020617] hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent lg:hidden" />
            </div>
            <div className="lg:w-1/2 p-8 md:p-16 flex flex-col justify-center relative z-10">
              <Fingerprint className="w-12 h-12 text-amber-500 mb-6" />
              <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">SHA-256 Neural Hashing</h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                Data tampering is prevented through automatic cryptographic hashing. Every log entry is hashed against the previous block, creating an unbreakable chain of evidence for audits.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/20"><CheckCircle2 className="w-4 h-4 text-amber-400" /></div>
                  <p className="text-sm text-slate-300">Point-in-time Recovery</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/20"><CheckCircle2 className="w-4 h-4 text-amber-400" /></div>
                  <p className="text-sm text-slate-300">Verifiable Action History</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-amber-600 to-orange-900 p-8 md:p-16 rounded-[2.5rem] md:rounded-[3.5rem] relative overflow-hidden shadow-2xl flex flex-col items-center text-center">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 pointer-events-none" />
            <div className="absolute -top-1/2 left-0 w-full h-full bg-white/5 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl">
              <Cpu className="w-16 h-16 text-white/40 mx-auto mb-8 animate-pulse" />
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Request Enterprise Audit Access</h2>
              <p className="text-amber-100 text-lg mb-10 leading-relaxed">
                Connect with our compliance engineering team to discuss log forwarding, custom retention policies, and high-frequency audit reports.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto px-10 py-5 bg-white text-black font-black rounded-2xl hover:scale-105 transition-transform shadow-[0_10px_40px_rgba(0,0,0,0.3)] flex items-center justify-center gap-3 group"
                >
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" /> Contact Compliance Hub
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>

      <Footer />

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg bg-slate-900 border border-amber-500/20 rounded-[2rem] overflow-hidden shadow-[0_0_80px_rgba(245,158,11,0.2)]">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors bg-white/5 rounded-full z-10">
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-8 md:p-10 relative">
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />
              
              <div className="mb-8 text-center relative z-10">
                <div className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-500/20 shadow-xl">
                  <FileOutput className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Export Audit Data</h3>
                <p className="text-slate-400 text-sm mt-1 leading-relaxed">Securely extract logs for organizational compliance.</p>
              </div>

              <form onSubmit={handleWhatsAppSubmit} className="space-y-4 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input 
                    required type="text" placeholder="Admin Name"
                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-amber-500 outline-none w-full transition-all"
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                  <input 
                    required type="email" placeholder="Corporate Email"
                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-amber-500 outline-none w-full transition-all"
                    value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="relative">
                  <Building className="absolute left-4 top-4 w-4 h-4 text-slate-500" />
                  <input 
                    required type="text" placeholder="Organization / Agency Name"
                    className="bg-white/5 border border-white/10 rounded-xl p-4 pl-12 text-sm text-white focus:border-amber-500 outline-none w-full transition-all"
                    value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})}
                  />
                </div>
                <select 
                  className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-slate-300 focus:border-amber-500 outline-none w-full appearance-none transition-all"
                  value={formData.timeframe} onChange={e => setFormData({...formData, timeframe: e.target.value})}
                >
                  <option value="Last 24 Hours" className="bg-slate-900">Last 24 Hours</option>
                  <option value="Last 7 Days" className="bg-slate-900">Last 7 Days</option>
                  <option value="Last 30 Days" className="bg-slate-900">Last 30 Days</option>
                </select>
                
                <button 
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 mt-6"
                >
                  Send Encrypted Request <Send className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-center text-slate-500 uppercase tracking-widest font-mono mt-6 border-t border-white/5 pt-4">
                  Destination: Audit_Comms_IND (+91 870023 6923)
                </p>
              </form>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(245, 158, 11, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(245, 158, 11, 0.6);
        }
      `}</style>

    </main>
  );
}