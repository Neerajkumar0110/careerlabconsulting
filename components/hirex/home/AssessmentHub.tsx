'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, 
  Terminal, 
  Timer, 
  ChevronRight,
  BrainCircuit,
  Bot,
  Activity,
  Globe,
  Zap,
  FileCode,
  Layout,
  Cpu,
  Hash
} from 'lucide-react';

const SKILL_TESTS = [
  { name: "SQL Mastery", questions: 10, time: "15m", icon: <Database size={16} />, color: "text-blue-400", type: 'database' },
  { name: "Next.js Architecture", questions: 10, time: "20m", icon: <Terminal size={16} />, color: "text-indigo-400", type: 'framework' },
  { name: "AI Prompt Engineering", questions: 10, time: "12m", icon: <Bot size={16} />, color: "text-cyan-400", type: 'ai' },
];

export default function AssessmentHub() {
  const [activeUsers, setActiveUsers] = useState(1248);
  const [activeTab, setActiveTab] = useState(0);
  const [logs, setLogs] = useState([
    "System initialized...",
    "Neural weights loaded: 100%",
    "Waiting for user input..."
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const users = ["User_72", "Dev_X", "Alpha_Gen", "Coder_99"];
      const actions = ["started SQL test", "passed Next.js", "failed Logic-1", "synced profile"];
      const newLog = `[${new Date().toLocaleTimeString()}] ${users[Math.floor(Math.random() * users.length)]} ${actions[Math.floor(Math.random() * actions.length)]}`;
      
      setLogs(prev => [newLog, ...prev].slice(0, 5));
      setActiveUsers(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="test" className="relative py-20 bg-[#020617] overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono mb-8"
            >
              <Activity size={12} className="animate-pulse" />
              STATUS: STABLE // NODES: {activeUsers}
            </motion.div>

            <h2 className="text-4xl md:text-8xl font-black text-white tracking-tighter leading-[0.85] uppercase italic mb-8">
              Validate <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">Neural DNA.</span>
            </h2>

            <p className="text-slate-400 text-[14px] font-mono mb-10 max-w-xl">
              {">"} Executing logic-pattern analysis... <br />
              {">"} Bypassing traditional assessment vectors. <br />
              {">"} Syncing results to global decentralized ledger.
            </p>

            <div className="flex gap-4">
               <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  <Globe size={14} className="text-blue-500" /> Global Sync
               </div>
               <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  <Cpu size={14} className="text-indigo-500" /> AI Orchestrated
               </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-[#0b0f1a] border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[500px]"
          >
            <div className="bg-[#161b22] px-4 py-3 border-b border-white/5 flex items-center justify-between">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40" />
              </div>
              <div className="text-[10px] font-mono text-slate-500 tracking-widest uppercase">
                hirex_assessment_v2.5.exe
              </div>
              <div />
            </div>

            <div className="flex flex-1 overflow-hidden">
              <div className="w-12 md:w-16 bg-[#0d1117] border-r border-white/5 flex flex-col items-center py-4 gap-6">
                 <Layout size={20} className="text-slate-600 hover:text-blue-400 cursor-pointer" />
                 <FileCode size={20} className="text-blue-400 cursor-pointer" />
                 <BrainCircuit size={20} className="text-slate-600 hover:text-blue-400 cursor-pointer" />
              </div>

              <div className="flex-1 flex flex-col">
                <div className="flex bg-[#0d1117] text-[10px] font-mono text-slate-500">
                  {SKILL_TESTS.map((test, i) => (
                    <div 
                      key={i}
                      onClick={() => setActiveTab(i)}
                      className={`px-4 py-2 border-r border-white/5 cursor-pointer flex items-center gap-2 ${activeTab === i ? 'bg-[#0b0f1a] text-blue-400 border-t-2 border-t-blue-500' : ''}`}
                    >
                      <Hash size={10} /> {test.name.replace(" ", "_").toLowerCase()}.sh
                    </div>
                  ))}
                </div>

                <div className="flex-1 p-6 font-mono relative overflow-y-auto">
                  <div className="text-xs space-y-4">
                    <p className="text-blue-500">{"//"} INITIALIZING ASSESSMENT MODULE</p>
                    <div className="space-y-2">
                       <p className="text-slate-300 flex items-center gap-2">
                         <span className="text-indigo-400">const</span> assessment = <span className="text-yellow-200">"{SKILL_TESTS[activeTab].name}"</span>;
                       </p>
                       <p className="text-slate-300 flex items-center gap-2">
                         <span className="text-indigo-400">const</span> config = {"{"} 
                         <span className="text-cyan-400 pl-4">questions: {SKILL_TESTS[activeTab].questions},</span>
                         <span className="text-cyan-400 pl-4">duration: "{SKILL_TESTS[activeTab].time}"</span>
                         {"}"};
                       </p>
                    </div>

                    <button className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded font-bold transition-all flex items-center gap-3 group">
                      RUN_TEST.sh <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-md p-4 border-t border-white/10 h-32 overflow-hidden">
                    <p className="text-[10px] text-green-500 mb-2 font-bold uppercase tracking-tighter flex items-center gap-2">
                       <Terminal size={10} /> Live Output Console
                    </p>
                    <div className="space-y-1">
                      {logs.map((log, i) => (
                        <p key={i} className="text-[10px] text-slate-400 font-mono opacity-80">
                          {">"} {log}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-600 px-3 py-1 flex justify-between items-center text-[9px] font-bold text-white uppercase tracking-widest">
              <div className="flex items-center gap-3">
                <span>UTF-8</span>
                <span>Manee Pro 2.5</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1"><Zap size={8} /> Sync Active</span>
                <span className="bg-white/20 px-2 rounded">Ln 12, Col 42</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}