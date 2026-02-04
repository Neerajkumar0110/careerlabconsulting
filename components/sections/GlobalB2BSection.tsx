// components/sections/GlobalB2BSection.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Building2, Globe2, ShieldCheck, ArrowRight } from 'lucide-react';

interface Client {
  id: number;
  companyName: string;
  industry: string;
  logo: string;
  lat: number;
  lng: number;
  country: string;
  city: string;
  stats: string;
}

const Globe = dynamic(() => import('react-globe.gl'), { 
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#00050a] flex flex-col items-center justify-center space-y-4">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-blue-500 font-bold tracking-[0.3em] uppercase text-xs animate-pulse">
        Initializing Global Enterprise Network...
      </p>
    </div>
  )
});

const b2bClients: Client[] = [
  { id: 1, companyName: "Quantum Systems", industry: "Cloud Infrastructure", logo: "https://cdn-icons-png.flaticon.com/512/5968/5968322.png", lat: 28.61, lng: 77.20, country: "India", city: "New Delhi", stats: "500+ Nodes" },
  { id: 2, companyName: "CyberDyne JP", industry: "Robotics & AI", logo: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png", lat: 35.67, lng: 139.65, country: "Japan", city: "Tokyo", stats: "Tier 4 Security" },
  { id: 3, companyName: "Nordic FinTech", industry: "Digital Banking", logo: "https://cdn-icons-png.flaticon.com/512/5968/5968350.png", lat: 51.50, lng: -0.12, country: "UK", city: "London", stats: "99.9% Uptime" },
  { id: 4, companyName: "Stellar Dynamics", industry: "Aerospace", logo: "https://cdn-icons-png.flaticon.com/512/5969/5969250.png", lat: 37.77, lng: -122.41, country: "USA", city: "San Francisco", stats: "Global Partner" },
  { id: 5, companyName: "EuroLogix", industry: "Smart Logistics", logo: "https://cdn-icons-png.flaticon.com/512/281/281764.png", lat: 48.85, lng: 2.35, country: "France", city: "Paris", stats: "Carbon Neutral" },
  { id: 6, companyName: "Pacific Core", industry: "Data Centers", logo: "https://cdn-icons-png.flaticon.com/512/888/888857.png", lat: -33.86, lng: 151.20, country: "Australia", city: "Sydney", stats: "24/7 Support" },
  { id: 7, companyName: "Emirates Tech", industry: "Smart Cities", logo: "https://cdn-icons-png.flaticon.com/512/145/145802.png", lat: 25.20, lng: 55.27, country: "UAE", city: "Dubai", stats: "Govt Partner" },
  { id: 8, companyName: "Nexus Health", industry: "BioTech", logo: "https://cdn-icons-png.flaticon.com/512/3004/3004458.png", lat: 43.65, lng: -79.38, country: "Canada", city: "Toronto", stats: "AI Diagnostics" },
  { id: 9, companyName: "Berlin Auto", industry: "Automotive AI", logo: "https://cdn-icons-png.flaticon.com/512/741/741407.png", lat: 52.52, lng: 13.40, country: "Germany", city: "Berlin", stats: "Autonomous L4" },
  { id: 10, companyName: "Lion City Fin", industry: "HFT Trading", logo: "https://cdn-icons-png.flaticon.com/512/2165/2165061.png", lat: 1.35, lng: 103.82, country: "Singapore", city: "Singapore", stats: "Low Latency" },
  { id: 11, companyName: "Cape Mining", industry: "Industrial IoT", logo: "https://cdn-icons-png.flaticon.com/512/3061/3061341.png", lat: -33.92, lng: 18.42, country: "South Africa", city: "Cape Town", stats: "Safety AI" },
  { id: 12, companyName: "Gotham Ledger", industry: "DeFi", logo: "https://cdn-icons-png.flaticon.com/512/2474/2474450.png", lat: 40.71, lng: -74.00, country: "USA", city: "New York", stats: "Blockchain" },
  { id: 13, companyName: "Shanghai Chip", industry: "Semiconductors", logo: "https://cdn-icons-png.flaticon.com/512/900/900618.png", lat: 31.23, lng: 121.47, country: "China", city: "Shanghai", stats: "Nano Mfg" },
  { id: 14, companyName: "Samba Logistics", industry: "Supply Chain", logo: "https://cdn-icons-png.flaticon.com/512/759/759739.png", lat: -23.55, lng: -46.63, country: "Brazil", city: "Sao Paulo", stats: "Route Opt" },
];

export default function GlobalB2BSection() {
  const globeRef = useRef<any>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false); 

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
          controls.minDistance = 150;
          controls.maxDistance = 600;
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [mounted]);

  const handleClientClick = (client: Client) => {
    setSelectedClient(client);
    if (globeRef.current) {
      globeRef.current.pointOfView({ 
        lat: client.lat, 
        lng: client.lng, 
        altitude: 0.6 
      }, 1200);
    }
  };

  if (!mounted) return <div className="min-h-screen bg-[#00050a]" />;

  return (
    <div className="relative w-full h-screen bg-[#00050a] overflow-hidden font-sans">
      
      <div className="absolute top-12 left-0 right-0 z-20 text-center pointer-events-none">
        <motion.div
           animate={{ 
             opacity: isZoomed ? 0 : 1, 
             y: isZoomed ? -40 : 0,
             scale: isZoomed ? 0.95 : 1
           }}
           transition={{ duration: 0.6, ease: "circOut" }}
        >
          <div className="inline-flex items-center gap-2 mb-4 px-5 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/30 backdrop-blur-xl">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-blue-400 text-[11px] font-black uppercase tracking-[0.3em]">Corporate Ecosystem 2.0</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
            TRUSTED <span className="text-blue-600">GLOBALLY</span>
          </h2>
          <p className="text-white/40 text-xs mt-4 tracking-[0.2em] uppercase font-medium">Powering businesses across 40+ countries</p>
        </motion.div>
      </div>

      <div className="w-full h-full cursor-grab active:cursor-grabbing">
        <Globe
          ref={globeRef}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          
          onZoom={(zoom: { altitude: number }) => {
            if (zoom.altitude < 1.8 && !isZoomed) setIsZoomed(true);
            if (zoom.altitude >= 1.8 && isZoomed) setIsZoomed(false);
          } }

          htmlElementsData={b2bClients}
          htmlElement={(client: any) => {
            const el = document.createElement('div');
            el.innerHTML = `
              <div class="relative group flex flex-col items-center">
                <div class="w-16 h-16 p-3 rounded-2xl border-2 border-blue-500/40 bg-white shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300 transform group-hover:scale-125 group-hover:border-blue-400">
                  <img src="${client.logo}" class="w-full h-full object-contain" />
                </div>
                <div class="mt-2 px-3 py-1 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <p class="text-[10px] text-white font-bold whitespace-nowrap">${client.companyName}</p>
                </div>
              </div>
            `;
            el.style.cursor = 'pointer';
            el.onclick = () => handleClientClick(client);
            return el;
          }}
          
          atmosphereColor="#2563eb"
          atmosphereAltitude={0.15}
        />
      </div>

      <div className="absolute bottom-10 left-10 z-20 hidden lg:block">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 text-white/50 text-[10px] font-bold uppercase tracking-widest bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-xl">
               <ShieldCheck size={16} className="text-blue-500" />
               <span>Enterprise Grade Encryption Active</span>
            </div>
          </div>
      </div>

      <AnimatePresence>
        {selectedClient && (
          <motion.div 
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.95 }}
            className="absolute top-0 right-0 h-full z-50 w-full max-w-[420px] p-6 flex items-center"
          >
            <div className="bg-[#0a0f1a]/90 backdrop-blur-3xl border border-blue-500/20 h-[85vh] w-full rounded-[3rem] p-10 relative shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full" />
              
              <button 
                onClick={() => setSelectedClient(null)} 
                className="absolute top-8 right-8 p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all hover:rotate-90"
              >
                <X size={20} />
              </button>

              <div className="bg-white p-6 rounded-3xl inline-block mb-8 shadow-2xl self-start">
                <img src={selectedClient.logo} className="w-16 h-16 object-contain" alt={selectedClient.companyName} />
              </div>

              <div className="flex-1">
                <h4 className="text-white font-black text-4xl mb-2 tracking-tighter">
                  {selectedClient.companyName}
                </h4>
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg w-fit mb-8">
                    <Building2 size={14} className="text-blue-500" />
                    <span className="text-blue-400 text-[10px] font-black uppercase tracking-widest">{selectedClient.industry}</span>
                </div>
                
                <div className="space-y-6 border-t border-white/10 pt-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                      <MapPin size={20} className="text-blue-500" />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/30 uppercase font-black tracking-tighter">Regional HQ</p>
                      <p className="text-white font-bold text-lg">{selectedClient.city}, {selectedClient.country}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                      <Globe2 size={20} className="text-blue-500" />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/30 uppercase font-black tracking-tighter">Operations</p>
                      <p className="text-white font-bold text-lg">{selectedClient.stats}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <button className="group relative w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl transition-all uppercase text-[11px] tracking-[0.2em] overflow-hidden">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Explore Case Study <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}