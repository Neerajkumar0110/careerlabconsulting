// app/hirex/verification-api/page.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import { 
  ShieldCheck, Terminal, Key, Code2, 
  Zap, Database, CheckCircle2, Copy, 
  Check, ArrowRight, Lock, Server, 
  Activity, Fingerprint
} from 'lucide-react';

const ENDPOINT_URL = "https://api.hirex.careerlab/v1/verify/";

const CODE_EXAMPLES = {
  curl: `curl -X GET "${ENDPOINT_URL}{neural_hash}" \\
  -H "Authorization: Bearer sk_test_hirex_..." \\
  -H "Content-Type: application/json"`,
  
  node: `import { HireX } from '@hirex/sdk';

const hirex = new HireX('sk_test_hirex_...');

const verification = await hirex.verifyCandidate({
  neuralHash: '0x9f4ab21c...'
});

console.log(verification.status); // "VERIFIED"`,

  python: `import hirex

hirex.api_key = "sk_test_hirex_..."

verification = hirex.Candidate.verify(
    neural_hash="0x9f4ab21c..."
)

print(verification.scores.logic)`
};

const JSON_RESPONSE = `{
  "success": true,
  "data": {
    "candidate_id": "HX-IND-9921",
    "neural_hash": "0x9f4ab21cd3",
    "verification_status": "VERIFIED",
    "metrics": {
      "technical_score": 96,
      "logic_score": 92,
      "system_design": 88
    },
    "security": {
      "anti_cheat_flag": "CLEAN",
      "identity_match": true
    },
    "timestamp": "2026-03-01T14:00:00Z"
  }
}`;

export default function VerificationAPIPage() {
  const [activeLang, setActiveLang] = useState<'curl' | 'node' | 'python'>('node');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CODE_EXAMPLES[activeLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#020617] text-white selection:bg-emerald-500/30 font-sans">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-emerald-600/10 blur-[120px] rounded-full translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-blue-600/5 blur-[120px] rounded-full -translate-x-1/4 translate-y-1/4" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] opacity-30" />
      </div>

      <Navbar />

      <div className="relative z-10 pt-24 pb-16 md:pt-36 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <div className="max-w-4xl mx-auto text-center mb-12 md:mb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] md:text-xs font-mono uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <ShieldCheck className="w-3.5 h-3.5 md:w-4 md:h-4" /> Zero-Trust Verification
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight">
              Cryptographic <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Verification API</span>
            </h1>
            <p className="text-sm md:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Programmatically verify candidate skills, AI assessment scores, and anti-cheat records. Integrate HireX's immutable ledger directly into your HR tech stack.
            </p>
          </div>

          {/* Code Playground Section */}
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-20 md:mb-32 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            
            {/* Left Side: Request Builder */}
            <div className="bg-[#0b0f1f]/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 px-4 md:px-6 py-3 md:py-4 bg-black/40">
                <div className="flex gap-2 md:gap-4">
                  {(['curl', 'node', 'python'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setActiveLang(lang)}
                      className={`text-[10px] md:text-xs font-bold uppercase tracking-widest pb-1 border-b-2 transition-colors ${
                        activeLang === lang 
                        ? 'border-emerald-500 text-white' 
                        : 'border-transparent text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {lang === 'node' ? 'Node.js' : lang}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={handleCopy}
                  className="text-slate-400 hover:text-emerald-400 transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              
              <div className="p-6 md:p-8 flex-grow bg-black/20">
                <div className="mb-4 flex items-center gap-3 text-[10px] md:text-xs font-mono bg-black/40 p-3 rounded-lg border border-white/5">
                  <span className="text-emerald-400 font-bold">GET</span>
                  <span className="text-slate-300 overflow-x-auto no-scrollbar">{ENDPOINT_URL}<span className="text-purple-400">{'{neural_hash}'}</span></span>
                </div>
                <pre className="font-mono text-xs md:text-sm text-blue-200 overflow-x-auto custom-scrollbar leading-relaxed">
                  <code>{CODE_EXAMPLES[activeLang]}</code>
                </pre>
              </div>
            </div>

            {/* Right Side: Response Data */}
            <div className="bg-[#0b0f1f]/90 backdrop-blur-2xl border border-emerald-500/20 rounded-[2rem] shadow-[0_0_50px_rgba(16,185,129,0.1)] flex flex-col overflow-hidden relative">
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-500"></div>
              
              <div className="flex items-center justify-between border-b border-white/10 px-4 md:px-6 py-3 md:py-4 bg-black/40">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] md:text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">Response: 200 OK</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">application/json</span>
              </div>
              
              <div className="p-6 md:p-8 flex-grow overflow-y-auto custom-scrollbar">
                <pre className="font-mono text-[11px] md:text-sm text-emerald-100 leading-relaxed">
                  <code dangerouslySetInnerHTML={{ __html: JSON_RESPONSE.replace(/"(.*?)":/g, '<span class="text-slate-400">"$1":</span>').replace(/true|false/g, '<span class="text-blue-400">$&</span>').replace(/\d+/g, '<span class="text-purple-400">$&</span>').replace(/"VERIFIED"|"CLEAN"/g, '<span class="text-emerald-400">$&</span>') }} />
                </pre>
              </div>
            </div>

          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 md:mb-32">
            {[
              {
                icon: Fingerprint,
                title: "Neural Hash Validation",
                desc: "Every candidate assessment generates a unique cryptographic hash to ensure the scores cannot be tampered with.",
                color: "text-purple-400",
                bg: "bg-purple-500/10"
              },
              {
                icon: Lock,
                title: "Anti-Cheat Audit Trail",
                desc: "Retrieve real-time flags for tab-switching, secondary device usage, or logic inconsistencies directly via API.",
                color: "text-red-400",
                bg: "bg-red-500/10"
              },
              {
                icon: Activity,
                title: "High Throughput",
                desc: "Built on TiDB serverless architecture, ensuring sub-50ms response times even during high-volume enterprise hiring cycles.",
                color: "text-cyan-400",
                bg: "bg-cyan-500/10"
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-slate-900/40 border border-white/10 rounded-3xl p-8 hover:bg-slate-900/60 transition-colors">
                <div className={`w-12 h-12 rounded-2xl ${feature.bg} border border-white/5 flex items-center justify-center mb-6`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Call to Action Banner */}
          <div className="bg-gradient-to-r from-emerald-900/40 to-[#0b0f1f] border border-emerald-500/30 rounded-[2rem] md:rounded-[3rem] p-8 md:p-14 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 max-w-xl">
              <h2 className="text-2xl md:text-4xl font-black text-white mb-4">Ready to automate your hiring pipeline?</h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                Generate your API keys today and start verifying AI-assessed candidates in your existing ATS or custom HR platforms.
              </p>
            </div>
            
            <div className="relative z-10 w-full md:w-auto">
              <button className="w-full md:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center justify-center gap-3">
                <Key className="w-5 h-5" /> Generate API Keys
              </button>
            </div>
          </div>

        </div>
      </div>

      <Footer />

      {/* Scoped CSS for Terminal Scrollbar */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.6);
        }
      `}</style>
    </main>
  );
}