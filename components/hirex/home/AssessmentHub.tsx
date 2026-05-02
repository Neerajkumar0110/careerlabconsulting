'use client';
// AssessmentHub.tsx — CMS-enabled

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, Terminal, Timer, ChevronRight, Bot, Activity, Globe, Zap, FileCode, Layout, Cpu, Hash, BrainCircuit } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

interface SkillTest { name: string; questions: number; time: string; icon: string; color: string }
function safeParse<T>(raw: string, fallback: T): T { try { return JSON.parse(raw) as T; } catch { return fallback; } }

const DEFAULT_TESTS: SkillTest[] = [
  { name:'SQL Mastery',           questions:10, time:'15m', icon:'Database', color:'text-blue-400'   },
  { name:'Next.js Architecture',  questions:10, time:'20m', icon:'Terminal', color:'text-indigo-400' },
  { name:'AI Prompt Engineering', questions:10, time:'12m', icon:'Bot',      color:'text-cyan-400'   },
];
const TEST_ICON_MAP: Record<string, React.ElementType> = { Database, Terminal, Bot, Timer };

export default function AssessmentHub() {
  const { get } = usePageContent('hirex-home');
  const accentColor  = get('assessment_hub', 'accent_color',  '#3b82f6');
  const badgePrefix  = get('assessment_hub', 'badge_prefix',  'STATUS: STABLE // NODES:');
  const headline1    = get('assessment_hub', 'headline_1',    'Validate');
  const headline2    = get('assessment_hub', 'headline_2',    'Neural DNA.');
  const bodyLine1    = get('assessment_hub', 'body_line_1',   'Executing logic-pattern analysis...');
  const bodyLine2    = get('assessment_hub', 'body_line_2',   'Bypassing traditional assessment vectors.');
  const bodyLine3    = get('assessment_hub', 'body_line_3',   'Syncing results to global decentralized ledger.');
  const appVersion   = get('assessment_hub', 'app_version',   'hirex_assessment_v2.5.exe');
  const engineLabel  = get('assessment_hub', 'engine_label',  'Manee Pro 2.5');
  const testsRaw     = get('assessment_hub', 'tests_json',    '[]');
  const tests        = safeParse<SkillTest[]>(testsRaw, DEFAULT_TESTS);

  const [activeUsers, setActiveUsers] = useState(1248);
  const [activeTab, setActiveTab] = useState(0);
  const [logs, setLogs] = useState(['System initialized...', 'Neural weights loaded: 100%', 'Waiting for user input...']);

  useEffect(() => {
    const interval = setInterval(() => {
      const users = ['User_72','Dev_X','Alpha_Gen','Coder_99'];
      const actions = ['started SQL test','passed Next.js','failed Logic-1','synced profile'];
      setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${users[Math.floor(Math.random()*users.length)]} ${actions[Math.floor(Math.random()*actions.length)]}`, ...prev].slice(0, 5));
      setActiveUsers(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentTest = tests[activeTab] ?? DEFAULT_TESTS[0];

  return (
    <section id="test" className="relative py-20 bg-[#020617] overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
        style={{ backgroundImage: `linear-gradient(${accentColor} 1px, transparent 1px), linear-gradient(90deg, ${accentColor} 1px, transparent 1px)`, backgroundSize:'50px 50px' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-[10px] font-mono mb-8"
              style={{ background:`${accentColor}1a`, border:`1px solid ${accentColor}33`, color:accentColor }}>
              <Activity size={12} className="animate-pulse" />
              {badgePrefix} {activeUsers}
            </motion.div>
            <h2 className="text-4xl md:text-8xl font-black text-white tracking-tighter leading-[0.85] uppercase italic mb-8">
              {headline1} <br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage:`linear-gradient(135deg, ${accentColor}, #6366f1)` }}>{headline2}</span>
            </h2>
            <p className="text-slate-400 text-[14px] font-mono mb-10 max-w-xl">
              {'>'} {bodyLine1} <br />{'>'} {bodyLine2} <br />{'>'} {bodyLine3}
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <Globe size={14} style={{ color:accentColor }} /> Global Sync
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <Cpu size={14} style={{ color:'#6366f1' }} /> AI Orchestrated
              </div>
            </div>
          </div>

          <motion.div initial={{ opacity:0, scale:0.95 }} whileInView={{ opacity:1, scale:1 }}
            className="bg-[#0b0f1a] border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[500px]">
            {/* Title bar */}
            <div className="bg-[#161b22] px-4 py-3 border-b border-white/5 flex items-center justify-between">
              <div className="flex gap-1.5">
                {['#ff5f57','#ffbd2e','#28c840'].map(c => <div key={c} className="w-3 h-3 rounded-full border" style={{ background:`${c}33`, borderColor:`${c}66` }} />)}
              </div>
              <div className="text-[10px] font-mono text-slate-500 tracking-widest uppercase">{appVersion}</div>
              <div />
            </div>

            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar icons */}
              <div className="w-12 md:w-16 bg-[#0d1117] border-r border-white/5 flex flex-col items-center py-4 gap-6">
                <Layout size={20} className="text-slate-600 hover:text-blue-400 cursor-pointer" />
                <FileCode size={20} className="cursor-pointer" style={{ color:accentColor }} />
                <BrainCircuit size={20} className="text-slate-600 hover:text-blue-400 cursor-pointer" />
              </div>

              <div className="flex-1 flex flex-col">
                {/* Tabs */}
                <div className="flex bg-[#0d1117] text-[10px] font-mono text-slate-500">
                  {tests.map((test, i) => (
                    <div key={i} onClick={() => setActiveTab(i)}
                      className="px-4 py-2 border-r border-white/5 cursor-pointer flex items-center gap-2"
                      style={activeTab===i ? { background:'#0b0f1a', color:accentColor, borderTop:`2px solid ${accentColor}` } : {}}>
                      <Hash size={10} /> {test.name.replace(' ','_').toLowerCase()}.sh
                    </div>
                  ))}
                </div>

                {/* Editor */}
                <div className="flex-1 p-6 font-mono relative overflow-y-auto">
                  <div className="text-xs space-y-4">
                    <p style={{ color:accentColor }}>{'//'} INITIALIZING ASSESSMENT MODULE</p>
                    <div className="space-y-2">
                      <p className="text-slate-300"><span className="text-indigo-400">const</span> assessment = <span className="text-yellow-200">"{currentTest.name}"</span>;</p>
                      <p className="text-slate-300"><span className="text-indigo-400">const</span> config = {'{'} <span className="text-cyan-400 pl-4">questions: {currentTest.questions},</span> <span className="text-cyan-400 pl-4">duration: "{currentTest.time}"</span> {'}'};</p>
                    </div>
                    <button className="mt-6 px-6 py-3 text-white rounded font-bold transition-all flex items-center gap-3 group"
                      style={{ background:accentColor }}>
                      RUN_TEST.sh <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                  {/* Console */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-md p-4 border-t border-white/10 h-32 overflow-hidden">
                    <p className="text-[10px] text-green-500 mb-2 font-bold uppercase tracking-tighter flex items-center gap-2">
                      <Terminal size={10} /> Live Output Console
                    </p>
                    <div className="space-y-1">
                      {logs.map((log, i) => <p key={i} className="text-[10px] text-slate-400 font-mono opacity-80">{'>'} {log}</p>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status bar */}
            <div className="px-3 py-1 flex justify-between items-center text-[9px] font-bold text-white uppercase tracking-widest" style={{ background:accentColor }}>
              <div className="flex items-center gap-3"><span>UTF-8</span><span>{engineLabel}</span></div>
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