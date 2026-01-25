'use client';

import React, { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShieldCheck, Award, Calendar, User, Download, ExternalLink, AlertCircle } from 'lucide-react';
import B2CHeader from '@/components/b2c/B2CHeader';
import Footer from '@/components/b2c/Footer';

interface CertificateResult {
  studentName: string;
  courseName: string;
  issueDate: string;
  status: string;
  id: string;
}

const InfoItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex gap-4">
    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 text-blue-500">
      {icon}
    </div>
    <div>
      <p className="text-[10px] uppercase font-bold tracking-[0.15em] text-slate-500 mb-1">{label}</p>
      <p className="text-slate-200 font-semibold leading-tight">{value}</p>
    </div>
  </div>
);

export default function VerifyCertificate() {
  const [certId, setCertId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<CertificateResult | null>(null);

  const handleVerify = (e: FormEvent) => {
    e.preventDefault();
    if (!certId) return;
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResult({
        studentName: "Arjun Mehta",
        courseName: "Executive Post Graduate Programme in Data Science",
        issueDate: "October 12, 2025",
        status: "Verified",
        id: certId
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col selection:bg-blue-500/30 pt-20">
      <B2CHeader />

      <main className="flex-grow relative py-20 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center justify-center p-3 bg-blue-600/10 rounded-2xl border border-blue-500/20 mb-6"
            >
              <ShieldCheck className="text-blue-500 w-8 h-8" />
            </motion.div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic text-white">
              Verify <span className="text-blue-500">Certificate</span>
            </h1>
            <p className="mt-4 text-slate-400 text-sm md:text-base font-medium max-w-lg mx-auto leading-relaxed">
              Validate the authenticity of BIA® credentials. Enter the unique certificate ID found at the bottom of the document.
            </p>
          </div>

          {/* Search Box */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/50 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-[32px] shadow-2xl"
          >
            <form onSubmit={handleVerify} className="relative group">
              <div className="relative">
                <input
                  type="text"
                  value={certId}
                  onChange={(e) => setCertId(e.target.value)}
                  placeholder="Enter Certificate ID (e.g. BIA-DS-2025-089)"
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 md:py-5 pl-12 pr-32 md:pr-40 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm md:text-base"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={20} />
                
                <button 
                  type="submit"
                  disabled={loading}
                  className="absolute right-2 top-2 bottom-2 px-4 md:px-8 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-bold rounded-xl transition-all flex items-center gap-2 text-xs md:text-sm uppercase tracking-wider shadow-lg shadow-blue-600/20"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Verify <span className="hidden md:inline">Now</span></>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 flex items-start gap-3 px-2">
              <AlertCircle className="text-slate-600 shrink-0 mt-0.5" size={16} />
              <p className="text-[11px] md:text-xs text-slate-500 leading-relaxed italic">
                Certification validity can be checked by employers and institutions. Please ensure the ID is exactly as printed on the certificate.
              </p>
            </div>
          </motion.div>

          {/* Verification Results */}
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mt-8 overflow-hidden"
              >
                <div className="bg-gradient-to-b from-blue-600/20 to-transparent p-[1px] rounded-[32px]">
                  <div className="bg-[#0f172a] p-6 md:p-10 rounded-[31px]">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b border-white/5 pb-8">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <span className="text-green-500 font-bold text-xs uppercase tracking-widest">Officially Verified</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">Certificate Authenticated</h2>
                      </div>
                      <div className="flex gap-3 w-full md:w-auto">
                        <button className="flex-1 md:flex-none p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10 text-white flex items-center justify-center" aria-label="Download">
                          <Download size={20} />
                        </button>
                        <button className="flex-1 md:flex-none p-3 bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors shadow-lg shadow-blue-600/20 text-white flex items-center justify-center" aria-label="Open">
                          <ExternalLink size={20} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                      <InfoItem icon={<User size={18}/>} label="Student Name" value={result.studentName} />
                      <InfoItem icon={<Award size={18}/>} label="Course / Program" value={result.courseName} />
                      <InfoItem icon={<Calendar size={18}/>} label="Issue Date" value={result.issueDate} />
                      <InfoItem icon={<ShieldCheck size={18}/>} label="Credential ID" value={result.id} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}