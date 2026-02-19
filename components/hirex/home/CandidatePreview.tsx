'use client';

import React, { useEffect, useState } from 'react'; 
import { motion } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Award, 
  Activity, 
  ExternalLink, 
  ShieldCheck, 
  Terminal,
  Layers,
  Code2
} from 'lucide-react'; 

const PROJECTS = [
  { 
    name: "Enterprise AI MySQL", 
    tech: ["Next.js", "Node.js", "MySQL"], 
    status: "Production",
    commits: 124,
    lastUpdate: "2m ago",
    link: "#"
  },
  { 
    name: "Career Lab Consulting Dashboard", 
    tech: ["Tailwind", "Prisma", "Socket.io"], 
    status: "Beta",
    commits: 89,
    lastUpdate: "5h ago",
    link: "#"
  },
  { 
    name: "Global Network Viz", 
    tech: ["Three.js", "Framer Motion"], 
    status: "Live",
    commits: 45,
    lastUpdate: "1d ago",
    link: "#"
  }
];

const SKILLS = [
  { name: "Fullstack Architecture", level: "Expert", score: 95 },
  { name: "Real-time Systems", level: "Advanced", score: 88 },
  { name: "Database Design", level: "Expert", score: 92 },
];

export default function StudentDashboard() {
  const [time, setTime] = useState<string | null>(null);
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(new Date().toLocaleTimeString());
    
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null; 

  return (
    <section id="student-report" className="relative py-24 bg-[#020617] text-white overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400">
                System Live: {time || "INITIALIZING..."}
              </span>
            </div>
            <h2 className="text-2xl md:text-5xl font-black tracking-tighter uppercase italic">
              Student <span className="text-blue-500">Performance</span> Dossier
            </h2>
          </div>
          
          <div className="flex gap-2">
             <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-blue-500/10 hover:border-blue-500/50 transition-all group">
                <Github size={18} className="text-slate-400 group-hover:text-white" />
                <span className="text-[10px] md:text-xs font-bold">GITHUB_PROFILE</span>
             </button>
             <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 rounded-xl hover:bg-blue-500 shadow-lg shadow-blue-500/20 transition-all">
                <Linkedin size={18} />
                <span className="text-xs font-bold">LINKEDIN_SYNC</span>
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-b from-white/[0.05] to-transparent p-8 rounded-[2.5rem] border border-white/10"
            >
              <div className="flex items-center gap-6 mb-8">
                <div className="relative group">
                  <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                  <div className="relative w-24 h-24 rounded-3xl overflow-hidden border-2 border-blue-500/50">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS__66dz9bkkZKnfqNVTrcU_vmux1yQjCNbag&s" alt="Student" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div>
                  <h3 className="text-[17px] font-black italic uppercase">Deepanshu Joshi</h3>
                  <p className="text-blue-400 text-[10px] font-bold tracking-widest uppercase mt-1">Full-Stack Developer</p>
                  <div className="mt-3 flex items-center gap-2 px-2 py-1 bg-green-500/10 border border-green-500/20 rounded-md w-fit">
                    <ShieldCheck size={12} className="text-green-500" />
                    <span className="text-[9px] font-black text-green-500">IDENTITY VERIFIED</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {SKILLS.map((skill) => (
                  <div key={skill.name} className="p-4 bg-black/40 rounded-2xl border border-white/5">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{skill.name}</span>
                      <span className="text-[10px] font-black text-blue-400">{skill.level}</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} 
                        whileInView={{ width: `${skill.score}%` }}
                        className="h-full bg-blue-500" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="bg-blue-600 rounded-[2.5rem] p-8 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest mb-1">Overall Grade</p>
                <h4 className="text-5xl font-black italic tracking-tighter">A+ </h4>
              </div>
              <Award size={48} className="text-white/20" />
            </div>
          </div>

          <div className="lg:col-span-8">
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 h-full"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Layers size={20} className="text-blue-400" />
                  </div>
                  <h4 className="font-black uppercase tracking-tight italic text-xl">Verified Project Repository</h4>
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase">3 Total Projects</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PROJECTS.map((project, idx) => (
                  <motion.div 
                    key={project.name}
                    whileHover={{ y: -5 }}
                    className="p-6 bg-white/[0.03] border border-white/10 rounded-3xl hover:border-blue-500/50 transition-all group"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-black/50 rounded-2xl border border-white/5 group-hover:border-blue-500/30">
                        <Terminal size={20} className="text-blue-500" />
                      </div>
                      <div className="text-right">
                        <span className="block text-[9px] font-black text-slate-500 uppercase">Last Commit</span>
                        <span className="text-[10px] font-bold text-blue-400">{project.lastUpdate}</span>
                      </div>
                    </div>
                    
                    <h5 className="text-lg font-black uppercase mb-2">{project.name}</h5>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map(t => (
                        <span key={t} className="text-[9px] font-bold px-2 py-1 bg-white/5 rounded-md text-slate-400">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Activity size={14} className="text-green-500" />
                        <span className="text-[10px] font-black uppercase text-slate-400">{project.commits} Commits</span>
                      </div>
                      <ExternalLink size={14} className="text-slate-500 group-hover:text-white transition-colors" />
                    </div>
                  </motion.div>
                ))}

                <div className="p-6 border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center text-center opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                   <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
                      <Code2 size={24} />
                   </div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Connect New Repository</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}