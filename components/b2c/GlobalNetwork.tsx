'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Globe as GlobeIcon, Compass } from 'lucide-react';

interface GlobeMethods {
  controls: () => {
    autoRotate: boolean;
    autoRotateSpeed: number;
    enableZoom: boolean;
  };
  pointOfView: (pov: { lat: number; lng: number; altitude: number }, transitionMs?: number) => void;
}

const Globe = dynamic(() => import('react-globe.gl'), { 
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-blue-500 font-bold tracking-widest uppercase text-xs">Loading Earth Engine...</p>
    </div>
  )
});

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
  const globeRef = useRef<any>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && globeRef.current) {
      const timer = setTimeout(() => {
        const controls = globeRef.current.controls();
        if (controls) {
          controls.autoRotate = true;
          controls.autoRotateSpeed = 0.5;
          controls.enableZoom = true;
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [mounted]);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    if (globeRef.current) {
      globeRef.current.pointOfView({ 
        lat: user.lat, 
        lng: user.lng, 
        altitude: 0.5 
      }, 1200);
    }
  };

  if (!mounted) return <div className="min-h-screen bg-black" />;

  return (
    <div className="relative w-full h-screen bg-[#00050a] overflow-hidden">
      
      <div className="absolute top-10 left-0 right-0 z-20 text-center pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 mb-2 px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em]">Global Network Active</span>
        </motion.div>
        <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter">
          WORLD <span className="text-blue-500">STUDENT</span> HUB
        </h2>
      </div>

      <div className="w-full h-full">
        <Globe
          ref={globeRef}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          
          rendererConfig={{ 
            antialias: true, 
            alpha: true,
            precision: 'highp' 
          }}
          
          htmlElementsData={lmsUsers}
          htmlElement={(user: any) => {
            const el = document.createElement('div');
            el.innerHTML = `
              <div class="relative group">
                <div class="w-12 h-12 rounded-2xl border-2 border-blue-500 bg-black overflow-hidden shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all transform hover:scale-150 hover:border-white">
                  <img src="${user.img}" class="w-full h-full object-cover" />
                </div>
                <div class="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-black"></div>
              </div>
            `;
            el.style.cursor = 'pointer';
            el.onclick = () => handleUserClick(user);
            return el;
          }}
          
          atmosphereColor="#3a4497"
          atmosphereAltitude={0.25}
        />
      </div>

      <div className="absolute bottom-10 left-10 z-20 hidden lg:flex">
         <div className="flex items-center gap-3 text-white/40 text-[10px] font-bold uppercase tracking-widest bg-black/40 p-4 rounded-2xl border border-white/10 backdrop-blur-xl">
            <Compass className="text-blue-500" />
            <span>Scroll to Zoom • Drag to Rotate • Right Click to Tilt</span>
         </div>
      </div>

      <AnimatePresence>
        {selectedUser && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 50 }}
            className="absolute top-1/2 -translate-y-1/2 right-4 md:right-10 z-50 w-full max-w-[340px]"
          >
            <div className="bg-[#0f172a]/90 backdrop-blur-3xl border border-blue-500/30 p-8 rounded-[3rem] shadow-[0_0_60px_rgba(0,0,0,0.7)] relative">
              <button 
                onClick={() => setSelectedUser(null)} 
                className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="relative inline-block mb-6">
                <img src={selectedUser.img} className="w-24 h-24 rounded-[2rem] border-4 border-blue-600 shadow-2xl object-cover" alt={selectedUser.name} />
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 w-6 h-6 rounded-full border-4 border-[#0f172a]" />
              </div>

              <h4 className="text-white font-black text-3xl mb-1 leading-tight tracking-tighter">{selectedUser.name}</h4>
              <p className="text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-6">{selectedUser.course}</p>
              
              <div className="space-y-4 border-t border-white/10 pt-6">
                <div className="flex items-center gap-3 text-slate-300">
                  <MapPin size={20} className="text-red-500" />
                  <span className="font-bold text-sm uppercase tracking-wide">{selectedUser.city}, {selectedUser.country}</span>
                </div>
                
                <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl transition-all uppercase text-[10px] tracking-[0.2em] shadow-lg shadow-blue-500/20 active:scale-95">
                  View Full Profile
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}