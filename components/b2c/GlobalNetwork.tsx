'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Compass, Lock, Unlock, Hand, GraduationCap } from 'lucide-react';

// --- Types ---
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

// --- Dynamic Globe Import ---
const Globe = dynamic(() => import('react-globe.gl'), { 
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#00050a] flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-blue-500 font-bold tracking-widest uppercase text-xs">Initializing Student Network...</p>
    </div>
  )
});

// --- HELPER: Generate 1200+ WIDELY SCATTERED Students ---
const generateStudents = (): User[] => {
  // Broad Regions with HUGE spread to avoid "Blue Blobs"
  const regions = [
    { name: "North America", lat: 38, lng: -95, spread: 25, country: "USA" }, // Spread across entire US
    { name: "Europe", lat: 50, lng: 15, spread: 15, country: "Europe" },
    { name: "India", lat: 20, lng: 78, spread: 10, country: "India" }, // Spread across India
    { name: "South East Asia", lat: 10, lng: 105, spread: 18, country: "SE Asia" },
    { name: "East Asia", lat: 35, lng: 135, spread: 10, country: "Japan/Korea" },
    { name: "Australia", lat: -25, lng: 135, spread: 18, country: "Australia" },
    { name: "South America", lat: -15, lng: -55, spread: 20, country: "Brazil/Arg" },
    { name: "Africa", lat: 0, lng: 20, spread: 25, country: "Africa" },
    { name: "Middle East", lat: 25, lng: 45, spread: 12, country: "UAE/Saudi" }
  ];

  const courses = ["Full Stack", "AI/ML", "Data Sci", "Design", "CyberSec", "DevOps", "Cloud", "Marketing"];
  const names = ["Alex", "Sam", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Jamie", "Quinn", "Avery", "Priya", "Rahul", "Wei", "Chen", "Yuki", "Hiro", "Fatima", "Omar"];

  const students: User[] = [];
  const totalStudents = 1200; 

  for (let i = 0; i < totalStudents; i++) {
    const region = regions[Math.floor(Math.random() * regions.length)];
    
    // MAX SCATTER: Spread dots far apart
    const latNoise = (Math.random() - 0.5) * region.spread * 2; 
    const lngNoise = (Math.random() - 0.5) * region.spread * 2;

    const avatarId = Math.floor(Math.random() * 70); 

    students.push({
      id: i,
      name: `${names[Math.floor(Math.random() * names.length)]} ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}.`,
      course: courses[Math.floor(Math.random() * courses.length)],
      img: `https://i.pravatar.cc/150?u=${avatarId}`,
      lat: region.lat + latNoise,
      lng: region.lng + lngNoise,
      country: region.country,
      city: region.name
    });
  }

  return students;
};

const ALL_USERS = generateStudents();

export default function GlobalLmsNetwork() {
  const globeRef = useRef<any>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false); 
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // --- GLOBE CONTROLS (SUPER ZOOM ENABLED) ---
  useEffect(() => {
    if (mounted && globeRef.current) {
      const controls = globeRef.current.controls();
      if (controls) {
        controls.minDistance = 101; // Allow viewing from ground level
        controls.maxDistance = 500; 
        controls.zoomSpeed = 1.2;
        
        if (isInteracting) {
            controls.autoRotate = false;
            controls.enableZoom = true;
            controls.enableRotate = true;
        } else {
            controls.autoRotate = true;
            controls.autoRotateSpeed = 0.5;
            controls.enableZoom = false; 
            controls.enableRotate = false;
        }
      }
    }
  }, [isInteracting, mounted]);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setIsInteracting(true);
    if (globeRef.current) {
      globeRef.current.pointOfView({ 
        lat: user.lat, 
        lng: user.lng, 
        altitude: 0.3 // Zoom very close to user
      }, 1500);
    }
  };

  const closeOverlay = () => {
    setSelectedUser(null);
  };

  const userList = useMemo(() => ALL_USERS, []);

  if (!mounted) return <div className="min-h-screen bg-[#00050a]" />;

  return (
    <div 
        className="relative w-full h-screen bg-[#00050a] overflow-hidden font-sans group"
        onMouseLeave={() => setIsInteracting(false)}
    >
      
      {/* SEO Hidden Content */}
      <h1 className="sr-only">Global Student Community - 1000+ Active Learners</h1>

      {/* Hero Text */}
      <div className="absolute top-10 left-0 right-0 z-20 text-center pointer-events-none px-4">
        <motion.div
           animate={{ 
             opacity: isZoomed || selectedUser ? 0 : 1, 
             y: isZoomed || selectedUser ? -50 : 0,
             filter: isZoomed || selectedUser ? "blur(10px)" : "blur(0px)" 
           }}
           transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <motion.div 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 mb-2 px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em]">Live Community</span>
          </motion.div>
          <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter">
            WORLD <span className="text-blue-500">STUDENT</span> HUB
          </h2>
          <p className="text-white/40 text-xs mt-2 font-bold tracking-[0.2em] uppercase">
            Connecting {ALL_USERS.length}+ Learners Worldwide
          </p>
        </motion.div>
      </div>

      {/* --- SCROLL SHIELD LAYER --- */}
      {!isInteracting && (
        <div 
            className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
            onClick={() => setIsInteracting(true)}
            title="Click to interact"
        >
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 flex items-center gap-3">
                <Hand size={18} className="text-blue-400 animate-pulse" />
                <span className="text-white text-xs font-bold uppercase tracking-widest">Click to Explore Students</span>
            </div>
        </div>
      )}

      {/* Globe */}
      <div className="w-full h-full">
        <Globe
          ref={globeRef}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          
          onZoom={(zoom: { altitude: number }) => {
            if (zoom.altitude < 1.8) {
              if (!isZoomed) setIsZoomed(true);
            } else {
              if (isZoomed) setIsZoomed(false);
            }
          }}

          rendererConfig={{ antialias: true, alpha: true }}
          
          htmlElementsData={userList}
          htmlElement={(user: any) => {
            const el = document.createElement('div');
            
            // --- FIX FOR "BLUE BLOB" ISSUE ---
            // Solution: Use a TINY dot (2px) by default.
            // Only show the Image/Avatar on HOVER.
            // This creates a clean "Starry Night" look instead of a messy blob.
            
            el.innerHTML = `
              <div class="relative group cursor-pointer flex items-center justify-center">
                <div class="w-1 h-1 md:w-1.5 md:h-1.5 bg-blue-400/60 rounded-full group-hover:hidden transition-all"></div>

                <div class="hidden group-hover:block absolute z-50 transform transition-all duration-300 scale-0 group-hover:scale-100">
                    <div class="w-8 h-8 rounded-full border-2 border-blue-500 bg-black overflow-hidden shadow-[0_0_15px_rgba(59,130,246,1)]">
                        <img src="${user.img}" class="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div class="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 bg-black/80 border border-white/10 rounded text-[8px] text-white whitespace-nowrap">
                        ${user.name}
                    </div>
                </div>
              </div>
            `;
            
            el.onclick = () => handleUserClick(user);
            return el;
          }}
          
          atmosphereColor="#3a4497"
          atmosphereAltitude={0.25}
        />
      </div>

      {/* Interaction Hints */}
      <div className="absolute bottom-10 left-6 md:left-10 z-20 pointer-events-none">
        <div className="flex flex-col gap-3">
           <div className="hidden lg:flex items-center gap-3 text-white/40 text-[10px] font-bold uppercase tracking-widest bg-black/40 p-4 rounded-2xl border border-white/10 backdrop-blur-xl">
               <Compass className="text-blue-500" size={16} />
               <span>Live Student Activity Map</span>
           </div>
           
           <div className="flex items-center gap-2 text-white/40 text-[10px] uppercase tracking-wider pl-2 transition-all">
              {isInteracting ? (
                 <>
                    <Unlock size={12} className="text-blue-400" />
                    <span className="text-blue-400 font-bold">Zoom Unlocked (Deep Zoom)</span>
                 </>
              ) : (
                 <>
                    <Lock size={12} />
                    <span>Scroll to move page • Click map to interact</span>
                 </>
              )}
           </div>
        </div>
      </div>

      {/* Student Detail Modal */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 50 }}
            className="absolute top-1/2 -translate-y-1/2 right-4 md:right-10 z-50 w-full max-w-[340px] pointer-events-auto"
          >
            <div className="bg-[#0f172a]/95 backdrop-blur-3xl border border-blue-500/30 p-8 rounded-[3rem] shadow-[0_0_60px_rgba(0,0,0,0.7)] relative">
              <button 
                onClick={closeOverlay} 
                className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="relative inline-block mb-6">
                <img src={selectedUser.img} className="w-24 h-24 rounded-[2rem] border-4 border-blue-600 shadow-2xl object-cover" alt={selectedUser.name} />
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 w-6 h-6 rounded-full border-4 border-[#0f172a] flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
              </div>

              <h4 className="text-white font-black text-3xl mb-1 leading-tight tracking-tighter">{selectedUser.name}</h4>
              
              <div className="flex items-center gap-2 mb-6">
                <GraduationCap size={14} className="text-blue-400" />
                <p className="text-blue-400 text-xs font-black uppercase tracking-[0.2em]">{selectedUser.course}</p>
              </div>
              
              <div className="space-y-4 border-t border-white/10 pt-6">
                <div className="flex items-center gap-3 text-slate-300">
                  <MapPin size={20} className="text-emerald-500" />
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