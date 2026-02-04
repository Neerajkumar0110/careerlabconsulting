// components/b2c/GlobalNetwork.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Compass } from 'lucide-react';

// --- Types ---
interface GlobeMethods {
  controls: () => {
    autoRotate: boolean;
    autoRotateSpeed: number;
    enableZoom: boolean;
  };
  pointOfView: (pov: { lat: number; lng: number; altitude: number }, transitionMs?: number) => void;
}

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

// --- Dynamic Import ---
const Globe = dynamic(() => import('react-globe.gl'), { 
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-blue-500 font-bold tracking-widest uppercase text-xs">Loading Earth Engine...</p>
    </div>
  )
});

// --- Dummy Data ---
const lmsUsers: User[] = [
  { id: 1, name: "Arjun Mehta", course: "Full Stack Dev", img: "https://i.pravatar.cc/150?u=1", lat: 28.61, lng: 77.20, country: "India", city: "New Delhi" },
  { id: 2, name: "Yuki Tanaka", course: "AI & ML", img: "https://i.pravatar.cc/150?u=2", lat: 35.67, lng: 139.65, country: "Japan", city: "Tokyo" },
  { id: 3, name: "Emma Lou", course: "AI Engineering", img: "https://i.pravatar.cc/150?u=3", lat: -33.86, lng: 151.20, country: "Australia", city: "Sydney" },
  { id: 4, name: "Chen Wei", course: "Data Science", img: "https://i.pravatar.cc/150?u=4", lat: 31.23, lng: 121.47, country: "China", city: "Shanghai" },
  { id: 5, name: "Priya Das", course: "UI/UX Design", img: "https://i.pravatar.cc/150?u=5", lat: 19.07, lng: 72.87, country: "India", city: "Mumbai" },
  { id: 6, name: "Siti Nur", course: "Cyber Security", img: "https://i.pravatar.cc/150?u=6", lat: 3.13, lng: 101.68, country: "Malaysia", city: "Kuala Lumpur" },
  { id: 7, name: "Min-jun Kim", course: "Web3 Dev", img: "https://i.pravatar.cc/150?u=7", lat: 37.56, lng: 126.97, country: "South Korea", city: "Seoul" },
  { id: 8, name: "James Wilson", course: "Cyber Security", img: "https://i.pravatar.cc/150?u=34", lat: 51.50, lng: -0.12, country: "UK", city: "London" },
  { id: 9, name: "Lucas Müller", course: "Cloud Arch", img: "https://i.pravatar.cc/150?u=33", lat: 52.52, lng: 13.40, country: "Germany", city: "Berlin" },
  { id: 10, name: "Elena Rossi", course: "Python Dev", img: "https://i.pravatar.cc/150?u=10", lat: 41.90, lng: 12.49, country: "Italy", city: "Rome" },
  { id: 11, name: "Sophie Martin", course: "Frontend", img: "https://i.pravatar.cc/150?u=11", lat: 48.85, lng: 2.35, country: "France", city: "Paris" },
  { id: 12, name: "Viktor Petrov", course: "Backend", img: "https://i.pravatar.cc/150?u=12", lat: 55.75, lng: 37.61, country: "Russia", city: "Moscow" },
  { id: 13, name: "Ana Silva", course: "Full Stack", img: "https://i.pravatar.cc/150?u=13", lat: 38.72, lng: -9.13, country: "Portugal", city: "Lisbon" },
  { id: 14, name: "Sarah Chen", course: "Data Science", img: "https://i.pravatar.cc/150?u=14", lat: 40.71, lng: -74.00, country: "USA", city: "New York" },
  { id: 15, name: "Carlos Gomes", course: "Mobile App Dev", img: "https://i.pravatar.cc/150?u=35", lat: -23.55, lng: -46.63, country: "Brazil", city: "Sao Paulo" },
  { id: 16, name: "Liam Smith", course: "DevOps", img: "https://i.pravatar.cc/150?u=16", lat: 43.65, lng: -79.38, country: "Canada", city: "Toronto" },
  { id: 17, name: "Maria Garcia", course: "AI Engineer", img: "https://i.pravatar.cc/150?u=17", lat: 19.43, lng: -99.13, country: "Mexico", city: "Mexico City" },
  { id: 18, name: "John Doe", course: "SRE", img: "https://i.pravatar.cc/150?u=18", lat: 34.05, lng: -118.24, country: "USA", city: "Los Angeles" },
  { id: 19, name: "Mateo Ruiz", course: "Data Analyst", img: "https://i.pravatar.cc/150?u=19", lat: -34.60, lng: -58.38, country: "Argentina", city: "Buenos Aires" },
  { id: 20, name: "Chloe Jones", course: "Product Design", img: "https://i.pravatar.cc/150?u=20", lat: 47.60, lng: -122.33, country: "USA", city: "Seattle" },
  { id: 21, name: "Fatima Al-Sayed", course: "UI/UX Design", img: "https://i.pravatar.cc/150?u=21", lat: 25.20, lng: 55.27, country: "UAE", city: "Dubai" },
  { id: 22, name: "Abebe Bikila", course: "Software Eng", img: "https://i.pravatar.cc/150?u=22", lat: 9.03, lng: 38.74, country: "Ethiopia", city: "Addis Ababa" },
  { id: 23, name: "Zainab Yusuf", course: "ML Engineer", img: "https://i.pravatar.cc/150?u=23", lat: 6.52, lng: 3.37, country: "Nigeria", city: "Lagos" },
  { id: 24, name: "Omar Hassan", course: "Security", img: "https://i.pravatar.cc/150?u=24", lat: 30.04, lng: 31.23, country: "Egypt", city: "Cairo" },
  { id: 25, name: "Thabo Mbeki", course: "Cloud Specialist", img: "https://i.pravatar.cc/150?u=25", lat: -26.20, lng: 28.04, country: "South Africa", city: "Johannesburg" },
  { id: 26, name: "Hassan Ali", course: "Web Dev", img: "https://i.pravatar.cc/150?u=26", lat: 24.71, lng: 46.67, country: "Saudi Arabia", city: "Riyadh" },
  { id: 27, name: "Isabella Wang", course: "Blockchain", img: "https://i.pravatar.cc/150?u=27", lat: 1.35, lng: 103.81, country: "Singapore", city: "Singapore" },
  { id: 28, name: "Niklas Berg", course: "QA Engineer", img: "https://i.pravatar.cc/150?u=28", lat: 59.32, lng: 18.06, country: "Sweden", city: "Stockholm" },
  { id: 29, name: "Ravi Kumar", course: "Data Scientist", img: "https://i.pravatar.cc/150?u=29", lat: 12.97, lng: 77.59, country: "India", city: "Bangalore" },
  { id: 30, name: "Elena Fischer", course: "Marketing Tech", img: "https://i.pravatar.cc/150?u=30", lat: 47.37, lng: 8.54, country: "Switzerland", city: "Zurich" },
];

export default function GlobalLmsNetwork() {
  const globeRef = useRef<any>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false); // State to track zoom level

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
          // Set min/max distance if you want to restrict zoom
          controls.minDistance = 120;
          controls.maxDistance = 500;
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
      
      {/* --- TITLE SECTION --- */}
      <div className="absolute top-10 left-0 right-0 z-20 text-center pointer-events-none">
        {/* We use motion.div to fade out the title when zoomed in (isZoomed) */}
        <motion.div
           animate={{ 
             opacity: isZoomed ? 0 : 1, 
             y: isZoomed ? -50 : 0,
             filter: isZoomed ? "blur(10px)" : "blur(0px)" 
           }}
           transition={{ duration: 0.5, ease: "easeInOut" }}
        >
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
        </motion.div>
      </div>

      <div className="w-full h-full">
        <Globe
          ref={globeRef}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          
          // Trigger when user zooms
          onZoom={(zoom: { altitude: number }) => {
            // Default altitude is around 2.5. 
            // If user zooms in closer than 1.8, we consider it "Zoomed In"
            if (zoom.altitude < 1.8) {
              if (!isZoomed) setIsZoomed(true);
            } else {
              if (isZoomed) setIsZoomed(false);
            }
          }}

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
            // --- FIX 1: Centering the marker so it doesn't drift when zooming ---
            el.style.transform = 'translate(-50%, -50%)'; 
            
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