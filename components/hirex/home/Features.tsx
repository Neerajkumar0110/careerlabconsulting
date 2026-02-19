'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Globe, 
  ShieldCheck, 
  Github, 
  Linkedin, 
  Zap,
  Activity,
  Layers,
  Code2, 
  Cpu
} from 'lucide-react';

const FEATURES = [
  {
    title: "Autonomous Skill Testing",
    description: "Our Manee Pro 2.5 engine generates real-time MCQ challenges for every skill update, ensuring instant verification.",
    icon: <Cpu className="w-6 h-6 text-blue-400" />,
    stats: "10-Quest Cycles",
    border: "border-blue-500/30",
    bgImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "360° Report Generation",
    description: "Synchronize deep metrics from all active projects into a single, employer-ready technical dossier.",
    icon: <Layers className="w-6 h-6 text-indigo-400" />,
    stats: "Live Data Feed",
    border: "border-indigo-500/30",
    bgImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Ecosystem Integration",
    description: "One-click synchronization with GitHub and LinkedIn to maintain a living, breathing career profile.",
    icon: <Globe className="w-6 h-6 text-cyan-400" />,
    stats: "Real-time Sync",
    border: "border-cyan-500/30",
    bgImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
  }
];

const FeatureSpaceBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const featureWords = ["SQL", "Next.js", "AI", "GitHub", "360°", "Node", "Verified"];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let stars: { x: number; y: number; z: number; text?: string }[] = [];
    const numStars = 200;
    const speed = 0.8;

    const setup = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight || 1000;
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width - canvas.width / 2,
          y: Math.random() * canvas.height - canvas.height / 2,
          z: Math.random() * canvas.width,
          text: i % 40 === 0 ? featureWords[Math.floor(Math.random() * featureWords.length)] : undefined
        });
      }
    };

    const draw = () => {
      ctx.fillStyle = '#020617'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      stars.forEach((star) => {
        star.z -= speed;
        if (star.z <= 0) {
          star.z = canvas.width;
          star.x = Math.random() * canvas.width - canvas.width / 2;
          star.y = Math.random() * canvas.height - canvas.height / 2;
        }
        
        const x = (star.x / star.z) * cx + cx;
        const y = (star.y / star.z) * cy + cy;
        const size = (1 - star.z / canvas.width) * 1.5;
        const opacity = 1 - star.z / canvas.width;

        if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
          if (star.text) {
            ctx.font = `${Math.floor(size * 12)}px Arial`;
            ctx.fillStyle = `rgba(59, 130, 246, ${opacity * 0.5})`; 
            ctx.fillText(star.text, x, y);
          } else {
            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    setup();
    draw();
    window.addEventListener('resize', setup);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setup);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

export default function Features() {
  return (
    <section id="features" className="relative py-32 bg-[#020617] overflow-hidden border-t border-white/5">
      <FeatureSpaceBackground />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-6 backdrop-blur-xl"
          >
            <Zap size={14} className="text-blue-400 fill-blue-400 animate-pulse" />
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Intelligence Layer Active</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.9] uppercase italic">
            Command Your <br /> <span className="text-blue-500">HireX Empire.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {FEATURES.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`group relative bg-slate-900/40 py-8 px-8 rounded-[2.5rem] border ${feature.border} backdrop-blur-3xl hover:bg-slate-900/60 transition-all duration-500 overflow-hidden min-h-[300px] flex flex-col justify-end`}
            >
              <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                <Image 
                  src={feature.bgImage} 
                  alt={feature.title}
                  fill
                  className="object-cover mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />
              </div>

              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent -translate-y-full group-hover:animate-[scan_4s_linear_infinite] z-10" />
              
              <div className="relative z-20">
                <div className="flex justify-between items-start mb-10">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-blue-500/50 transition-colors">
                    {feature.icon}
                  </div>
                  <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                    {feature.stats}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-white mb-4 tracking-tight uppercase">{feature.title}</h3>
                <p className="text-slate-300 leading-relaxed text-sm md:text-[16px] mb-4 font-medium">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-white/[0.03] to-transparent rounded-[3.5rem] p-8 md:p-16 border border-white/10 relative overflow-hidden group shadow-2xl"
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                  <Activity className="text-white w-6 h-6" />
                </div>
                <h4 className="text-[18px] md:text-4xl font-black text-white tracking-tighter uppercase italic leading-none">
                  Autonomous <br /> Verification Node
                </h4>
              </div>
              <p className="text-slate-400 text-xm font-medium leading-relaxed">
                Our agent executes a point-to-point sync in 14ms. Verified 
                <span className="text-white font-bold underline decoration-blue-500/50 ml-1">GitHub DNA</span> and 
                <span className="text-white font-bold underline decoration-indigo-500/50 ml-1">LinkedIn Neural Path.</span>
              </p>
              
              <div className="flex flex-wrap gap-4">
                {["Skill Scan", "Identity Verified", "Trust Protocols"].map((label, i) => (
                  <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                    <ShieldCheck size={14} className="text-green-500" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-[350px] flex items-center justify-center bg-black/20 rounded-[3rem] border border-white/5 backdrop-blur-md overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                  <Image 
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
                    alt="Security Tech"
                    fill
                    className="object-cover"
                  />
              </div>
              
              <div className="relative z-10 flex items-center gap-8 md:gap-16">
                <div className="flex flex-col gap-8">
                  <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center animate-pulse">
                    <Github className="w-8 h-8 text-white" />
                  </div>
                  <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center animate-pulse delay-75">
                    <Linkedin className="w-8 h-8 text-blue-400" />
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -inset-8 bg-blue-600/20 blur-[50px] rounded-full animate-pulse" />
                  <div className="w-28 h-28 md:w-36 md:h-36 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-[2px] shadow-[0_0_50px_rgba(37,99,235,0.4)]">
                    <div className="w-full h-full bg-[#020617] rounded-[2.3rem] flex items-center justify-center relative overflow-hidden">
                       <Code2 size={48} className="text-white relative z-10 animate-pulse" />
                       <div className="absolute top-0 left-0 w-full h-[3px] bg-blue-400 shadow-[0_0_20px_#3b82f6] animate-[scan_2s_ease-in-out_infinite]" />
                    </div>
                  </div>
                </div>

                <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center">
                  <ShieldCheck size={32} className="text-green-500" />
                </div>
              </div>

              <div className="absolute top-1/2 left-[25%] w-2 h-2 bg-blue-400 rounded-full animate-[flow_2s_linear_infinite]" />
              <div className="absolute top-[40%] left-[25%] w-2 h-2 bg-indigo-400 rounded-full animate-[flow_2s_linear_infinite_0.5s]" />
              <div className="absolute top-1/2 right-[25%] w-2 h-2 bg-green-400 rounded-full animate-[flow_2s_linear_infinite_1s]" />
            </div>

          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(400px); opacity: 0; }
        }
        @keyframes flow {
          0% { transform: translateX(0) scale(1); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(150px) scale(0.5); opacity: 0; }
        }
      `}</style>
    </section>
  );
}