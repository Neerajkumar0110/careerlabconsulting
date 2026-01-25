'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence, MotionValue } from 'framer-motion';
import { X, MapPin, Globe as GlobeIcon } from 'lucide-react';

interface User {
  id: number;
  name: string;
  course: string;
  img: string;
  lat: number;
  lng: number;
  country: string;
  city: string;
}

const lmsUsers: User[] = [
  { id: 1, name: "Arjun Mehta", course: "Full Stack Dev", img: "https://i.pravatar.cc/150?u=11", lat: 28.61, lng: 77.20, country: "India", city: "New Delhi" },
  { id: 2, name: "Sarah Chen", course: "Data Science", img: "https://i.pravatar.cc/150?u=12", lat: 40.71, lng: -74.00, country: "USA", city: "New York" },
  { id: 3, name: "James Wilson", course: "Cyber Security", img: "https://i.pravatar.cc/150?u=13", lat: 51.50, lng: -0.12, country: "UK", city: "London" },
  { id: 4, name: "Fatima Al-Sayed", course: "UI/UX Design", img: "https://i.pravatar.cc/150?u=14", lat: 25.20, lng: 55.27, country: "UAE", city: "Dubai" },
  { id: 5, name: "Yuki Tanaka", course: "AI & ML", img: "https://i.pravatar.cc/150?u=15", lat: 35.67, lng: 139.65, country: "Japan", city: "Tokyo" },
  { id: 6, name: "Carlos Gomes", course: "Mobile App Dev", img: "https://i.pravatar.cc/150?u=16", lat: -23.55, lng: -46.63, country: "Brazil", city: "Sao Paulo" },
  { id: 7, name: "Emma Lou", course: "AI Engineering", img: "https://i.pravatar.cc/150?u=19", lat: -33.86, lng: 151.20, country: "Australia", city: "Sydney" },
];

export default function GlobalLmsNetwork() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const isDragging = useRef(false);
  const isHovered = useRef(false);
  
  const dragX = useMotionValue(0);

  const rotation = useSpring(dragX, { 
    stiffness: 25, 
    damping: 35,
    restDelta: 0.001 
  });
  
  const backgroundPos = useTransform(rotation, (r) => `${(r / 15) % 100}% center`);

  useEffect(() => {
    setMounted(true);
    let controls: number;
    const speed = 0.08; 

    const step = () => {
      if (!isDragging.current && !isHovered.current && !selectedUser) {
        dragX.set(dragX.get() - speed);
      }
      controls = requestAnimationFrame(step);
    };

    controls = requestAnimationFrame(step);
    return () => cancelAnimationFrame(controls);
  }, [dragX, selectedUser]);

  if (!mounted) return <div className="min-h-screen bg-[#02040a]" />;

  return (
    <div className="bg-[#02040a] w-full min-h-screen overflow-hidden flex flex-col font-sans selection:bg-blue-500/30 py-20">
      <section className="relative flex-1 flex flex-col items-center justify-center p-4">
        
        <div className="text-center z-30 mb-12 select-none">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest">2.4k Students Online</span>
          </div>
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter"
          >
            GLOBAL <span className="text-blue-500 italic">STUDENT</span> MAP
          </motion.h2>
          <p className="text-slate-500 text-xs font-medium max-w-md mx-auto mt-4 leading-relaxed">
            Connecting high-performance engineers from across 40+ countries in a single unified neural network.
          </p>
        </div>

        <div 
          className="relative w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] md:w-[650px] md:h-[650px] flex items-center justify-center"
          onMouseEnter={() => isHovered.current = true}
          onMouseLeave={() => isHovered.current = false}
        >
          <motion.div 
            drag="x"
            onDragStart={() => isDragging.current = true}
            onDragEnd={() => isDragging.current = false}
            onDrag={(_, info) => dragX.set(dragX.get() + info.delta.x * 0.4)}
            className="absolute inset-0 rounded-full z-40 cursor-grab active:cursor-grabbing"
          />
          
          <div className="absolute inset-0 rounded-full z-10 overflow-hidden border border-white/10 shadow-[0_0_120px_rgba(30,64,175,0.3)] bg-[#000814]">
            <motion.div 
              className="absolute inset-0 w-full h-full pointer-events-none opacity-90"
              style={{ 
                backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Blue_Marble_2002.png/2560px-Blue_Marble_2002.png")', 
                backgroundSize: 'cover', 
                backgroundRepeat: 'repeat',
                backgroundPosition: backgroundPos,
                filter: 'brightness(1.1) contrast(1.1) saturate(1.3)'
              }} 
            />
            <div className="absolute inset-0 shadow-[inset_-60px_-30px_120px_rgba(0,0,0,1),inset_40px_30px_100px_rgba(255,255,255,0.08)] rounded-full pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-blue-500/10 pointer-events-none" />
          </div>

          <div className="absolute inset-0 z-20 pointer-events-none" style={{ perspective: '2000px' }}>
            {lmsUsers.map((user) => (
              <StudentPin 
                key={user.id} 
                user={user} 
                rotation={rotation} 
                onClick={() => setSelectedUser(user)} 
                active={selectedUser?.id === user.id} 
              />
            ))}
          </div>
        </div>

        <AnimatePresence>
          {selectedUser && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="absolute bottom-8 z-50 px-4 w-full max-w-md"
            >
                <div className="bg-[#0f172a]/95 backdrop-blur-3xl border border-white/20 p-5 rounded-[2rem] flex items-center gap-5 shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10"><GlobeIcon size={60} /></div>
                  
                  <img src={selectedUser.img} className="w-16 h-16 rounded-2xl border-2 border-blue-500 object-cover shadow-xl" alt="" />
                  
                  <div className="flex-1">
                    <h4 className="text-white font-black text-xl leading-tight">{selectedUser.name}</h4>
                    <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-1">{selectedUser.course}</p>
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold uppercase tracking-tighter">
                        <MapPin size={14} className="text-red-500" /> {selectedUser.city}, {selectedUser.country}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setSelectedUser(null)} 
                    className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors self-start"
                  >
                    <X size={18} className="text-slate-400" />
                  </button>
                </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}

function StudentPin({ user, rotation, onClick, active }: { user: User, rotation: MotionValue<number>, onClick: () => void, active: boolean }) {
  const [radius, setRadius] = useState(325);
  
  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 640) setRadius(160);
      else if (window.innerWidth < 1024) setRadius(250);
      else setRadius(320);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const angleRad = useTransform(rotation, (rot) => {
    return (user.lng + (rot / 10) * 3.6 + 90) * (Math.PI / 180);
  });

  const x = useTransform(angleRad, (a) => Math.cos(a) * radius);
  const z = useTransform(angleRad, (a) => Math.sin(a) * radius);
  
  const y = Math.sin(user.lat * (Math.PI / 180)) * -radius;

  const opacity = useTransform(z, [-radius * 0.5, radius * 0.5], [0, 1]);
  const scale = useTransform(z, [0, radius], [0.6, active ? 1.4 : 1]);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 pointer-events-auto"
      style={{ x, y, opacity, scale, zIndex: active ? 100 : 40 }}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
    >
      <div className="relative -translate-x-1/2 -translate-y-1/2 cursor-pointer group">
        <div className={`absolute inset-0 rounded-full transition-all duration-700 animate-pulse ${active ? 'bg-blue-500/40 blur-2xl scale-150' : 'group-hover:bg-blue-400/20 blur-lg'}`} />
        
        <div className={`relative w-10 h-10 md:w-16 md:h-16 rounded-2xl border-2 transition-all duration-500 shadow-2xl overflow-hidden rotate-[10deg] group-hover:rotate-0 ${active ? 'border-blue-400 scale-110 shadow-blue-500/50' : 'border-white/20 bg-black/50 backdrop-blur-md group-hover:border-blue-500'}`}>
          <img src={user.img} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-[#02040a] z-50 shadow-lg" />
      </div>
    </motion.div>
  );
}