'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Building2, ArrowRight, Lock, Unlock, Hand } from 'lucide-react';

// --- Types ---
interface Client {
  id: number;
  companyName: string;
  industry: string;
  domain: string;
  lat: number;
  lng: number;
  country: string;
  city: string;
  stats: string;
}

// --- Dynamic Globe Import ---
const Globe = dynamic(() => import('react-globe.gl'), { 
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#00050a] flex flex-col items-center justify-center space-y-4">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-blue-500 font-bold tracking-[0.3em] uppercase text-xs animate-pulse">
        Loading Global Enterprise Network...
      </p>
    </div>
  )
});

// --- HELPER: INTELLIGENT LAND DISTRIBUTION ---
const generateRealClients = (): Client[] => {
  
  const regions = [
    // --- INDIA ---
    { 
      city: "Bangalore", country: "India", lat: 12.9716, lng: 77.5946, 
      // Bangalore is inland, safe to spread all around but slight bias to North
      spreadLat: 0.8, spreadLng: 0.8, latBias: 0.1, lngBias: 0,
      domains: ["infosys.com", "wipro.com", "flipkart.com", "swiggy.com", "ola.cabs", "zerodha.com"] 
    },
    { 
      city: "Mumbai", country: "India", lat: 19.0760, lng: 72.8777, 
      // MUMBAI FIX: Push East (positive Lng) and North to avoid Arabian Sea
      spreadLat: 0.8, spreadLng: 0.6, latBias: 0.3, lngBias: 0.8, 
      domains: ["tcs.com", "ril.com", "hdfcbank.com", "sbi.co.in", "tatamotors.com", "mahindra.com"] 
    },
    { 
      city: "Delhi/NCR", country: "India", lat: 28.6139, lng: 77.2090, 
      // Delhi is safe inland
      spreadLat: 0.6, spreadLng: 0.6, latBias: 0, lngBias: 0,
      domains: ["paytm.com", "zomato.com", "airtel.in", "lenskart.com"] 
    },
    
    // --- USA ---
    { 
      city: "San Francisco", country: "USA", lat: 37.7749, lng: -122.4194, 
      // SF FIX: Push East (positive) to avoid Pacific Ocean
      spreadLat: 1.0, spreadLng: 1.2, latBias: -0.2, lngBias: 0.8,
      domains: ["google.com", "apple.com", "meta.com", "netflix.com", "uber.com", "airbnb.com"] 
    },
    { 
      city: "New York", country: "USA", lat: 40.7128, lng: -74.0060, 
      // NY FIX: Push West (negative) to avoid Atlantic Ocean
      spreadLat: 0.8, spreadLng: 1.0, latBias: 0.1, lngBias: -1.5,
      domains: ["jpmorganchase.com", "goldmansachs.com", "bloomberg.com", "pfizer.com"] 
    },
    { 
      city: "Austin", country: "USA", lat: 30.2672, lng: -97.7431, 
      spreadLat: 0.5, spreadLng: 0.5, latBias: 0, lngBias: 0,
      domains: ["dell.com", "tesla.com", "oracle.com"] 
    },

    // --- EUROPE ---
    { 
      city: "London", country: "UK", lat: 51.5074, lng: -0.1278, 
      spreadLat: 0.4, spreadLng: 0.6, latBias: 0.1, lngBias: -0.2,
      domains: ["hsbc.com", "bp.com", "unilever.com", "vodafone.com"] 
    },
    { 
      city: "Berlin", country: "Germany", lat: 52.5200, lng: 13.4050, 
      spreadLat: 0.5, spreadLng: 0.8, latBias: 0, lngBias: 0,
      domains: ["siemens.com", "sap.com", "bmw.com", "adidas.com"] 
    },
    { 
      city: "Paris", country: "France", lat: 48.8566, lng: 2.3522, 
      spreadLat: 0.4, spreadLng: 0.4, latBias: 0, lngBias: 0,
      domains: ["loreal.com", "lvmh.com", "axa.com", "airbus.com"] 
    },

    // --- ASIA ---
    { 
      city: "Tokyo", country: "Japan", lat: 35.6762, lng: 139.6503, 
      // Japan is thin. Spread North/South mainly.
      spreadLat: 1.5, spreadLng: 0.3, latBias: 0.2, lngBias: -0.2,
      domains: ["sony.com", "toyota.com", "softbank.jp", "nintendo.com"] 
    },
    { 
      city: "Singapore", country: "Singapore", lat: 1.3521, lng: 103.8198, 
      // Very small island, keep tight
      spreadLat: 0.1, spreadLng: 0.1, latBias: 0.1, lngBias: 0,
      domains: ["shopee.com", "grab.com", "singtel.com"] 
    },
    { 
      city: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093, 
      // Sydney is East coast. Push West (Inland)
      spreadLat: 0.5, spreadLng: 0.8, latBias: 0, lngBias: -1.0,
      domains: ["atlassian.com", "canva.com", "bhp.com"] 
    },
    
    // --- OTHERS ---
    { 
      city: "Dubai", country: "UAE", lat: 25.2048, lng: 55.2708, 
      // Coast is North/West. Push South/East.
      spreadLat: 0.3, spreadLng: 0.3, latBias: -0.5, lngBias: 0.5,
      domains: ["emirates.com", "emaar.com"] 
    },
    { 
      city: "Sao Paulo", country: "Brazil", lat: -23.5505, lng: -46.6333, 
      spreadLat: 0.5, spreadLng: 0.5, latBias: 0, lngBias: 0,
      domains: ["nubank.com.br", "petrobras.com.br"] 
    }
  ];

  let clientList: Client[] = [];
  let idCounter = 1;

  regions.forEach(region => {
    region.domains.forEach((domain, index) => {
      // --- LOGIC FIX: DETERMINISTIC SCATTERING ---
      // Instead of a spiral, we use a calculated grid-like offset based on the index.
      // This ensures they never overlap and respect the coastline bias.
      
      const offsetMultiplier = (index + 1) * 0.4; // Distance between nodes
      
      // Calculate alternating offsets so they don't form a straight line
      const dirLat = index % 2 === 0 ? 1 : -1; 
      const dirLng = index % 3 === 0 ? 1 : -1;

      // Apply the "Land Bias" (Pushing away from water)
      // We calculate a spread that adds the Bias to the Random direction
      let latOffset = (dirLat * region.spreadLat * offsetMultiplier * 0.5) + (region.latBias * offsetMultiplier);
      let lngOffset = (dirLng * region.spreadLng * offsetMultiplier * 0.5) + (region.lngBias * offsetMultiplier);

      // Random jitter to break perfect lines (makes it look organic)
      latOffset += (Math.random() - 0.5) * 0.1;
      lngOffset += (Math.random() - 0.5) * 0.1;

      clientList.push({
        id: idCounter++,
        companyName: domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1),
        industry: "Global Partner",
        domain: domain,
        lat: region.lat + latOffset,
        lng: region.lng + lngOffset,
        country: region.country,
        city: region.city,
        stats: "Enterprise Node"
      });
    });
  });

  return clientList;
};

const ALL_CLIENTS = generateRealClients();

export default function GlobalB2BSection() {
  const globeRef = useRef<any>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false); 
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // --- 1. HUGE EARTH VIEW ---
  useEffect(() => {
    if (mounted && globeRef.current) {
      globeRef.current.pointOfView({
        lat: 25, 
        lng: 20, 
        altitude: 1.5 // Keeps the whole earth visible
      }, 0);
    }
  }, [mounted]);

  // --- GLOBE CONTROLS ---
  useEffect(() => {
    if (mounted && globeRef.current) {
      const controls = globeRef.current.controls();
      if (controls) {
        controls.minDistance = 100; 
        controls.maxDistance = 1000;
        controls.dampingFactor = 0.1;

        if (isInteracting) {
            controls.autoRotate = false;
            controls.enableZoom = true;
            controls.enableRotate = true;
        } else {
            controls.autoRotate = true;
            controls.autoRotateSpeed = 0.5; // Slower rotation for better viewing
            controls.enableZoom = false; 
            controls.enableRotate = false;
        }
      }
    }
  }, [isInteracting, mounted]);

  const handleClientClick = (client: Client) => {
    setSelectedClient(client);
    setIsInteracting(true);
    if (globeRef.current) {
      globeRef.current.pointOfView({ 
        lat: client.lat, 
        lng: client.lng, 
        altitude: 0.4 // Zoom closer when clicked
      }, 1500);
    }
  };

  const closeOverlay = () => {
    setSelectedClient(null);
    if (globeRef.current) {
        globeRef.current.pointOfView({ altitude: 1.5 }, 1500);
    }
  };

  const clientList = useMemo(() => ALL_CLIENTS, []);

  if (!mounted) return <div className="min-h-screen bg-[#00050a]" />;

  return (
    <div 
        className="relative w-full h-screen bg-[#00050a] overflow-hidden font-sans group"
        onMouseLeave={() => setIsInteracting(false)}
    >
      
      {/* Hero Text */}
      <div className="absolute top-12 left-0 right-0 z-20 text-center pointer-events-none px-4">
        <motion.div
           animate={{ 
             opacity: isZoomed || selectedClient ? 0 : 1, 
             y: isZoomed || selectedClient ? -40 : 0,
             scale: isZoomed || selectedClient ? 0.95 : 1
           }}
           transition={{ duration: 0.6, ease: "circOut" }}
        >
          <div className="inline-flex items-center gap-2 mb-4 px-5 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/30 backdrop-blur-xl">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-blue-400 text-[11px] font-black uppercase tracking-[0.3em]">Global Ecosystem</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none drop-shadow-[0_10px_40px_rgba(37,99,235,0.5)]">
            Trusted <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Globally</span>
          </h2>
        </motion.div>
      </div>

      {/* --- SCROLL SHIELD LAYER --- */}
      {!isInteracting && (
        <div 
            className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
            onClick={() => setIsInteracting(true)}
            title="Click to interact"
        >
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 flex items-center gap-3 mt-48">
                <Hand size={18} className="text-blue-400 animate-pulse" />
                <span className="text-white text-xs font-bold uppercase tracking-widest">Click to Explore Map</span>
            </div>
        </div>
      )}

      {/* 3D Globe Container */}
      <div className="w-full h-full flex items-center justify-center">
        <Globe
          ref={globeRef}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          
          width={typeof window !== 'undefined' ? window.innerWidth : 1000}
          height={typeof window !== 'undefined' ? window.innerHeight : 800}

          onZoom={(zoom: { altitude: number }) => {
            if (zoom.altitude < 1.0 && !isZoomed) setIsZoomed(true);
            if (zoom.altitude >= 1.0 && isZoomed) setIsZoomed(false);
          }}

          htmlElementsData={clientList}
          htmlElement={(client: any) => {
            const el = document.createElement('div');
            
            const clearbitUrl = `https://logo.clearbit.com/${client.domain}`;
            const googleUrl = `https://www.google.com/s2/favicons?domain=${client.domain}&sz=128`;
            
            el.innerHTML = `
              <div class="relative group flex flex-col items-center justify-center cursor-pointer hover:z-50">
                <div class="relative w-6 h-6 md:w-10 md:h-10 p-1 rounded-full border border-blue-500/40 bg-[#0a0f1a] shadow-[0_0_20px_rgba(59,130,246,0.4)] flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:scale-150 group-hover:border-blue-400">
                  <img 
                        src="${clearbitUrl}" 
                        alt="${client.companyName}" 
                        loading="lazy" 
                        class="w-full h-full object-contain object-center bg-white rounded-full p-0.5" 
                        onerror="this.onerror=null; this.src='${googleUrl}';" 
                  />
                </div>

                <div class="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div class="px-2 py-1 bg-blue-900/80 backdrop-blur-md border border-blue-500/30 rounded text-[9px] text-white font-bold uppercase tracking-wider whitespace-nowrap shadow-xl">
                        ${client.companyName}
                    </div>
                </div>
                
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full bg-blue-500/20 animate-ping pointer-events-none group-hover:hidden"></div>
              </div>
            `;
            el.onclick = () => handleClientClick(client);
            return el;
          }}
          
          atmosphereColor="#3b82f6"
          atmosphereAltitude={0.15}
          backgroundColor="#00050a"
        />
      </div>

      {/* Floating UI Hints */}
      <div className="absolute bottom-10 left-6 md:left-10 z-20 pointer-events-none">
        <div className="flex flex-col gap-3">
           <div className="flex items-center gap-2 text-white/40 text-[10px] uppercase tracking-wider pl-2 transition-all">
              {isInteracting ? (
                 <>
                    <Unlock size={12} className="text-blue-400" />
                    <span className="text-blue-400 font-bold">Zoom Unlocked</span>
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

      {/* 3. DETAIL OVERLAY */}
      <AnimatePresence>
        {selectedClient && (
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", damping: 20 }}
            className="absolute top-0 right-0 h-full z-50 w-full md:w-[450px] p-4 md:p-6 flex items-center justify-end pointer-events-none"
          >
            <div className="pointer-events-auto bg-[#0a0f1a]/95 backdrop-blur-3xl border border-white/10 h-full md:h-[90vh] w-full rounded-3xl p-8 relative shadow-2xl overflow-y-auto overflow-x-hidden flex flex-col">
              
              <button 
                onClick={closeOverlay} 
                className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-all z-10"
              >
                <X size={20} />
              </button>

              <div className="mt-4">
                <div className="w-20 h-20 bg-white p-4 rounded-2xl shadow-xl flex items-center justify-center mb-6">
                  <img 
                    src={`https://logo.clearbit.com/${selectedClient.domain}`}
                    className="w-full h-full object-contain" 
                    alt={selectedClient.companyName}
                    onError={(e) => {
                         (e.target as HTMLImageElement).src = `https://www.google.com/s2/favicons?domain=${selectedClient.domain}&sz=128`;
                    }} 
                  />
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg mb-4">
                    <Building2 size={12} className="text-blue-500" />
                    <span className="text-blue-400 text-[10px] font-black uppercase tracking-widest">{selectedClient.industry}</span>
                </div>

                <h4 className="text-white font-black text-4xl md:text-5xl mb-2 tracking-tighter leading-tight">
                  {selectedClient.companyName}
                </h4>
                <p className="text-white/50 text-sm leading-relaxed">
                    Leveraging our infrastructure for {selectedClient.stats} and next-gen operations.
                </p>
              </div>

              <div className="grid gap-6 py-10">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-blue-500/50 transition-colors">
                    <MapPin size={20} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/30 uppercase font-black tracking-tighter">Location</p>
                    <p className="text-white font-bold text-lg">{selectedClient.city}, {selectedClient.country}</p>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-white/10">
                <button className="group relative w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all uppercase text-[11px] tracking-[0.2em] overflow-hidden shadow-lg shadow-blue-900/20">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    View Partner Profile <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}