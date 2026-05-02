'use client';
// StudentDashboard.tsx — CMS-enabled

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Award, Activity, ExternalLink, ShieldCheck, Terminal, Layers, Code2, Globe } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

interface SkillItem    { name: string; level: string; score: number }
interface ProjectItem  { name: string; tech: string[]; status: string; commits: number; lastUpdate: string; image: string }

function safeParse<T>(raw: string, fallback: T): T { try { return JSON.parse(raw) as T; } catch { return fallback; } }

const DEFAULT_SKILLS: SkillItem[] = [
  { name:'Fullstack Architecture', level:'Expert',  score:95 },
  { name:'Real-time Systems',      level:'Advanced', score:88 },
  { name:'Database Design',        level:'Expert',  score:92 },
];
const DEFAULT_PROJECTS: ProjectItem[] = [
  { name:'Enterprise AI MySQL',              tech:['Next.js','Node.js','MySQL'],       status:'Production', commits:124, lastUpdate:'2m ago', image:'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=500&auto=format&fit=crop' },
  { name:'Career Lab Consulting Dashboard',  tech:['Tailwind','Prisma','Socket.io'],   status:'Beta',       commits:89,  lastUpdate:'5h ago', image:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=500&auto=format&fit=crop' },
  { name:'Global Network Viz',               tech:['Three.js','Framer Motion'],        status:'Live',       commits:45,  lastUpdate:'1d ago', image:'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=500&auto=format&fit=crop' },
];

export default function StudentDashboard() {
  const [time, setTime] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [activePackets, setActivePackets] = useState(0);

  const { get } = usePageContent('hirex-home');

  const accentColor    = get('student_dashboard', 'accent_color',    '#3b82f6');
  const headline1      = get('student_dashboard', 'headline_1',      'Student');
  const headlineAccent = get('student_dashboard', 'headline_accent',  'Performance');
  const headline2      = get('student_dashboard', 'headline_2',      'Dossier');
  const studentName    = get('student_dashboard', 'student_name',    'Deepanshu Joshi');
  const studentTitle   = get('student_dashboard', 'student_title',   'Full-Stack Developer');
  const studentImage   = get('student_dashboard', 'student_image',   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS__66dz9bkkZKnfqNVTrcU_vmux1yQjCNbag&s');
  const studentCountry = get('student_dashboard', 'student_country', 'India (IST)');
  const studentFlag    = get('student_dashboard', 'student_flag',    'https://flagcdn.com/w40/in.png');
  const studentGrade   = get('student_dashboard', 'student_grade',   'A+');
  const skillsRaw      = get('student_dashboard', 'skills_json',     '[]');
  const projectsRaw    = get('student_dashboard', 'projects_json',   '[]');
  const skills         = safeParse<SkillItem[]>(skillsRaw, DEFAULT_SKILLS);
  const projects       = safeParse<ProjectItem[]>(projectsRaw, DEFAULT_PROJECTS);

  useEffect(() => {
    setMounted(true); setTime(new Date().toLocaleTimeString());
    const t = setInterval(() => { setTime(new Date().toLocaleTimeString()); setActivePackets(Math.floor(Math.random() * 50) + 10); }, 1000);
    return () => clearInterval(t);
  }, []);

  if (!mounted) return null;

  return (
    <section id="student-report" className="relative py-24 bg-[#020617] text-white overflow-hidden font-sans">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: accentColor }}>
                  Uplink: {time || 'INITIALIZING...'}
                </span>
              </div>
              <div className="h-4 w-px bg-white/10" />
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                <Activity size={12} className="animate-pulse" style={{ color: accentColor }} />
                {activePackets} DATA_PACKETS/S
              </div>
            </div>
            <h2 className="text-3xl md:text-6xl font-black tracking-tighter uppercase italic leading-none">
              {headline1} <span style={{ color: accentColor }}>{headlineAccent}</span> {headline2}
            </h2>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl hover:border-blue-500/50 transition-all group">
              <Github size={18} className="text-slate-400 group-hover:text-white" />
              <span className="text-[10px] md:text-xs font-bold">GITHUB_PROFILE</span>
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all" style={{ background: accentColor }}>
              <Linkedin size={18} />
              <span className="text-xs font-bold">LINKEDIN_SYNC</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Profile card */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-b from-white/[0.05] to-transparent p-8 rounded-[2.5rem] border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10"><Globe size={120} /></div>
              <div className="flex items-center gap-6 mb-8 relative z-10">
                <div className="relative group">
                  <div className="absolute inset-0 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" style={{ background: accentColor }} />
                  <div className="relative w-24 h-24 rounded-3xl overflow-hidden border-2" style={{ borderColor: `${accentColor}80` }}>
                    <img src={studentImage} alt={studentName} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div>
                  <h3 className="text-[19px] font-black italic uppercase leading-tight">{studentName}</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest mt-1" style={{ color: accentColor }}>{studentTitle}</p>
                  <div className="flex items-center gap-2 mt-2 text-slate-400">
                    <img src={studentFlag} alt="flag" className="w-4 h-3 object-cover rounded-sm grayscale" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">{studentCountry}</span>
                  </div>
                  <div className="mt-3 flex items-center gap-2 px-2 py-1 bg-green-500/10 border border-green-500/20 rounded-md w-fit">
                    <ShieldCheck size={12} className="text-green-500" />
                    <span className="text-[9px] font-black text-green-500 tracking-tighter">IDENTITY VERIFIED</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                {skills.map(skill => (
                  <div key={skill.name} className="p-4 bg-black/40 rounded-2xl border border-white/5 group hover:border-blue-500/20 transition-all">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{skill.name}</span>
                      <span className="text-[10px] font-black" style={{ color: accentColor }}>{skill.level}</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.score}%` }} transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full relative" style={{ background: accentColor }}>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="rounded-[2.5rem] p-8 flex items-center justify-between relative overflow-hidden group" style={{ background: accentColor }}>
              <div className="relative z-10">
                <p className="text-[10px] font-black text-white/70 uppercase tracking-widest mb-1">Overall Grade</p>
                <h4 className="text-6xl font-black italic tracking-tighter">{studentGrade}</h4>
              </div>
              <Award size={64} className="text-white/20 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500" />
            </div>
          </div>

          {/* Projects */}
          <div className="lg:col-span-8">
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 h-full">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg" style={{ background: `${accentColor}1a` }}><Layers size={20} style={{ color: accentColor }} /></div>
                  <h4 className="font-black uppercase tracking-tight italic text-xl">Verified Project Repository</h4>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Live Sync Active</span>
                  <span className="text-[12px] font-black" style={{ color: accentColor }}>{projects.length} TOTAL_UNITS</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, idx) => (
                  <motion.div key={project.name} whileHover={{ y: -8 }}
                    className="group relative bg-black/40 border border-white/10 rounded-[2rem] overflow-hidden hover:border-blue-500/50 transition-all duration-500">
                    <div className="h-32 w-full relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
                      <img src={project.image} alt={project.name} className="w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700" />
                      <div className="absolute top-4 left-4 z-20">
                        <div className="p-2 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 group-hover:border-blue-500/50 transition-all">
                          <Terminal size={16} style={{ color: accentColor }} />
                        </div>
                      </div>
                    </div>
                    <div className="p-6 relative z-10">
                      <h5 className="text-lg font-black uppercase leading-tight group-hover:transition-colors mb-2">{project.name}</h5>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map(t => (
                          <span key={t} className="text-[8px] font-black px-2 py-1 border rounded-md uppercase" style={{ background: `${accentColor}1a`, borderColor: `${accentColor}33`, color: accentColor }}>{t}</span>
                        ))}
                      </div>
                      <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1.5">
                            <Activity size={12} className="text-green-500 animate-pulse" />
                            <span className="text-[10px] font-black uppercase text-slate-400">{project.commits} Commits</span>
                          </div>
                          <div className="text-[10px] font-bold text-slate-500 italic">{project.lastUpdate}</div>
                        </div>
                        <div className="p-2 rounded-full hover:bg-white/10 transition-all">
                          <ExternalLink size={14} className="text-slate-500 group-hover:text-white transition-colors" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                <div className="p-6 border-2 border-dashed border-white/10 rounded-[2rem] flex flex-col items-center justify-center text-center group hover:bg-white/[0.02] hover:border-blue-500/30 transition-all cursor-pointer min-h-[280px]">
                  <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-500">
                    <Code2 size={28} className="text-slate-500 group-hover:text-blue-400" />
                  </div>
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-white transition-colors">Connect New Unit</p>
                  <p className="text-[9px] font-bold text-slate-600 mt-2">SECURE_TUNNEL_ID: 882-AX</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}