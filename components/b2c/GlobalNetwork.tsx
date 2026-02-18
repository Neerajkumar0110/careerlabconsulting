'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Hand, GraduationCap } from 'lucide-react';

// --- GEOGRAPHIC DATA ---
const MAJOR_COUNTRIES = [
  { name: "United States", city: "New York", lat: 40.7128, lng: -74.0060 },
  { name: "United Kingdom", city: "London", lat: 51.5074, lng: -0.1278 },
  { name: "India", city: "Bangalore", lat: 12.9716, lng: 77.5946 },
  { name: "Germany", city: "Berlin", lat: 52.5200, lng: 13.4050 },
  { name: "Japan", city: "Tokyo", lat: 35.6762, lng: 139.6503 },
  { name: "Australia", city: "Sydney", lat: -33.8688, lng: 151.2093 },
  { name: "Brazil", city: "São Paulo", lat: -23.5505, lng: -46.6333 },
  { name: "Canada", city: "Toronto", lat: 43.6532, lng: -79.3832 },
  { name: "UAE", city: "Dubai", lat: 25.2048, lng: 55.2708 },
  { name: "France", city: "Paris", lat: 48.8566, lng: 2.3522 },
  { name: "Singapore", city: "Singapore", lat: 1.3521, lng: 103.8198 },
  { name: "Nigeria", city: "Lagos", lat: 6.5244, lng: 3.3792 },
];

const COURSES = ["Full Stack Development", "AI & Machine Learning", "Data Science", "UI/UX Design", "Cyber Security", "Cloud Computing"];
const NAMES = ["Arjun", "Emma", "Liam", "Yuki", "Sofia", "Amara", "Lucas", "Zainab", "Mateo", "Chloe"];

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

const generateGlobalStudents = (): User[] => {
  const students: User[] = [];
  for (let i = 0; i < 100; i++) {
    const countryBase = MAJOR_COUNTRIES[i % MAJOR_COUNTRIES.length];
    const latNoise = (Math.random() - 0.5) * 6; // Thoda spread badhaya hai taaki clutter na ho
    const lngNoise = (Math.random() - 0.5) * 6;
    const gender = Math.random() > 0.5 ? 'men' : 'women';
    const photoId = i % 99; // Unique photos for each

    students.push({
      id: i,
      name: `${NAMES[Math.floor(Math.random() * NAMES.length)]} ${String.fromCharCode(65 + (i % 26))}.`,
      course: COURSES[Math.floor(Math.random() * COURSES.length)],
      img: `https://randomuser.me/api/portraits/${gender}/${photoId}.jpg`,
      lat: countryBase.lat + latNoise,
      lng: countryBase.lng + lngNoise,
      country: countryBase.name,
      city: countryBase.city
    });
  }
  return students;
};

const Globe = dynamic(() => import('react-globe.gl'), { 
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#00050a] flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-blue-400 font-mono text-xs animate-pulse">GENERATING GLOBAL NETWORK...</p>
    </div>
  )
});

export default function GlobalLmsNetwork() {
  const globeRef = useRef<any>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  const userList = useMemo(() => generateGlobalStudents(), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && globeRef.current) {
      const controls = globeRef.current.controls();
      if (controls) {
        controls.autoRotate = !isInteracting;
        controls.autoRotateSpeed = 0.6;
        controls.enableZoom = true;
        controls.minDistance = 150;
        controls.maxDistance = 400;
      }
    }
  }, [isInteracting, mounted]);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setIsInteracting(true);
    if (globeRef.current) {
      globeRef.current.pointOfView({ lat: user.lat, lng: user.lng, altitude: 0.6 }, 1000);
    }
  };

  if (!mounted) return null;

  return (
    <div className="relative w-full h-screen bg-[#00050a] overflow-hidden group font-sans">
      
      {/* Interaction Prompt */}
      {!isInteracting && (
        <div 
          className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer bg-black/20 backdrop-blur-[2px]"
          onClick={() => setIsInteracting(true)}
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 px-10 py-5 rounded-3xl flex flex-col items-center gap-3 shadow-2xl"
          >
            <Hand className="text-blue-400 animate-bounce" size={32} />
            <span className="text-white font-black tracking-[0.3em] text-xs uppercase">Click to Explore Network</span>
          </motion.div>
        </div>
      )}

      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        
        htmlElementsData={userList}
        htmlElement={(user: any) => {
          const el = document.createElement('div');
          // Important: Fixed size prevents the 'white line' issue
          el.style.width = '30px'; 
          el.style.height = '30px';
          
          el.innerHTML = `
            <div class="relative group cursor-pointer">
              <div class="absolute inset-0 rounded-full bg-blue-500/40 animate-ping"></div>
              
              <div class="relative w-8 h-8 rounded-full border-2 border-white shadow-lg overflow-hidden transition-transform duration-300 group-hover:scale-125 group-hover:border-blue-400 z-10">
                <img src="${user.img}" class="w-full h-full object-cover" />
              </div>

              <div class="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 bg-black/80 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <p class="text-[8px] text-white whitespace-nowrap font-bold uppercase">${user.name}</p>
              </div>
            </div>
          `;
          
          el.onclick = () => handleUserClick(user);
          return el;
        }}
        
        atmosphereColor="#2563eb"
        atmosphereAltitude={0.2}
      />

      {/* Floating Info Card */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div 
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-full max-w-[340px] z-50 pointer-events-auto"
          >
            <div className="bg-[#0f172a]/95 backdrop-blur-3xl border border-blue-500/30 p-8 rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] relative">
              <button 
                onClick={() => setSelectedUser(null)} 
                className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center">
                <div className="relative mb-6">
                   <img src={selectedUser.img} className="w-28 h-28 rounded-[2rem] object-cover border-4 border-blue-600 shadow-2xl" alt="" />
                   <div className="absolute -bottom-2 -right-2 bg-emerald-500 w-6 h-6 rounded-full border-4 border-[#0f172a] flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                   </div>
                </div>

                <h2 className="text-white text-3xl font-black mb-1 tracking-tight text-center">{selectedUser.name}</h2>
                
                <div className="flex items-center gap-2 mb-8 text-blue-400">
                  <GraduationCap size={16} />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em]">{selectedUser.course}</p>
                </div>

                <div className="w-full space-y-4 border-t border-white/10 pt-6">
                  <div className="flex items-center gap-4 text-slate-300 bg-white/5 p-4 rounded-2xl">
                    <MapPin className="text-emerald-500" size={24} />
                    <div>
                      <p className="text-white/40 text-[9px] uppercase font-bold tracking-widest">Current Location</p>
                      <p className="text-white text-sm font-bold uppercase">{selectedUser.city}, {selectedUser.country}</p>
                    </div>
                  </div>

                  <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl transition-all uppercase text-[10px] tracking-[0.2em] shadow-lg shadow-blue-500/20 active:scale-95 mt-4">
                    View Success Story
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats HUD */}
      <div className="absolute bottom-10 left-6 md:left-10 z-30 pointer-events-none">
        <div className="flex flex-col gap-4">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-black/40 backdrop-blur-xl border border-white/10 p-5 rounded-2xl flex items-center gap-4"
          >
            <div className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_15px_#3b82f6] animate-pulse" />
            <div className="flex flex-col">
              <span className="text-white text-lg font-black leading-none">100+</span>
              <span className="text-white/50 text-[9px] font-bold uppercase tracking-widest leading-none mt-1">Global Alumni</span>
            </div>
          </motion.div>
        </div>
      </div>

    </div>
  );
}