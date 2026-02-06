'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Building2, Globe2, ShieldCheck, ArrowRight, MousePointer2, Lock, Unlock, Hand } from 'lucide-react';

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
        Loading Global Ecosystem...
      </p>
    </div>
  )
});

// --- REAL DATA: 52 Genuine Global Brands ---
const REAL_CLIENTS: Client[] = [
  // North America
  { id: 1, companyName: "Google", industry: "Tech", domain: "google.com", lat: 37.422, lng: -122.084, country: "USA", city: "Mountain View", stats: "Search Giant" },
  { id: 2, companyName: "Microsoft", industry: "Tech", domain: "microsoft.com", lat: 47.642, lng: -122.121, country: "USA", city: "Redmond", stats: "Cloud Azure" },
  { id: 3, companyName: "Apple", industry: "Consumer Electronics", domain: "apple.com", lat: 37.334, lng: -122.009, country: "USA", city: "Cupertino", stats: "Hardware" },
  { id: 4, companyName: "Amazon", industry: "E-Commerce", domain: "amazon.com", lat: 47.606, lng: -122.332, country: "USA", city: "Seattle", stats: "AWS Cloud" },
  { id: 5, companyName: "Tesla", industry: "Automotive", domain: "tesla.com", lat: 30.267, lng: -97.743, country: "USA", city: "Austin", stats: "EV Leader" },
  { id: 6, companyName: "JPMorgan Chase", industry: "Finance", domain: "jpmorganchase.com", lat: 40.712, lng: -74.006, country: "USA", city: "New York", stats: "Banking" },
  { id: 7, companyName: "Goldman Sachs", industry: "Finance", domain: "goldmansachs.com", lat: 40.714, lng: -74.014, country: "USA", city: "New York", stats: "Investment" },
  { id: 8, companyName: "Coca-Cola", industry: "Beverage", domain: "coca-colacompany.com", lat: 33.749, lng: -84.388, country: "USA", city: "Atlanta", stats: "FMCG" },
  { id: 9, companyName: "Nike", industry: "Apparel", domain: "nike.com", lat: 45.515, lng: -122.678, country: "USA", city: "Beaverton", stats: "Retail" },
  { id: 10, companyName: "Pfizer", industry: "Pharma", domain: "pfizer.com", lat: 40.750, lng: -73.973, country: "USA", city: "New York", stats: "Biotech" },
  { id: 11, companyName: "Salesforce", industry: "SaaS", domain: "salesforce.com", lat: 37.792, lng: -122.397, country: "USA", city: "San Francisco", stats: "CRM" },
  { id: 12, companyName: "Adobe", industry: "Software", domain: "adobe.com", lat: 37.338, lng: -121.885, country: "USA", city: "San Jose", stats: "Creative" },
  { id: 13, companyName: "Intel", industry: "Semiconductors", domain: "intel.com", lat: 37.386, lng: -121.963, country: "USA", city: "Santa Clara", stats: "Chips" },
  { id: 14, companyName: "Shopify", industry: "E-Commerce", domain: "shopify.com", lat: 45.421, lng: -75.697, country: "Canada", city: "Ottawa", stats: "Retail Tech" },
  { id: 15, companyName: "RBC", industry: "Banking", domain: "rbc.com", lat: 43.653, lng: -79.383, country: "Canada", city: "Toronto", stats: "Finance" },
  
  // South America
  { id: 16, companyName: "Petrobras", industry: "Energy", domain: "petrobras.com.br", lat: -22.906, lng: -43.172, country: "Brazil", city: "Rio de Janeiro", stats: "Oil & Gas" },
  { id: 17, companyName: "Nubank", industry: "Fintech", domain: "nubank.com.br", lat: -23.550, lng: -46.633, country: "Brazil", city: "Sao Paulo", stats: "Digital Bank" },
  { id: 18, companyName: "Mercado Libre", industry: "E-Commerce", domain: "mercadolibre.com", lat: -34.603, lng: -58.381, country: "Argentina", city: "Buenos Aires", stats: "Retail" },

  // Europe
  { id: 19, companyName: "Volkswagen", industry: "Automotive", domain: "volkswagen.com", lat: 52.422, lng: 10.786, country: "Germany", city: "Wolfsburg", stats: "Auto Mfg" },
  { id: 20, companyName: "SAP", industry: "Software", domain: "sap.com", lat: 49.293, lng: 8.641, country: "Germany", city: "Walldorf", stats: "Enterprise" },
  { id: 21, companyName: "Siemens", industry: "Industrial", domain: "siemens.com", lat: 48.135, lng: 11.582, country: "Germany", city: "Munich", stats: "Engineering" },
  { id: 22, companyName: "Shell", industry: "Energy", domain: "shell.com", lat: 51.507, lng: -0.127, country: "UK", city: "London", stats: "Energy" },
  { id: 23, companyName: "HSBC", industry: "Banking", domain: "hsbc.com", lat: 51.505, lng: -0.016, country: "UK", city: "London", stats: "Global Bank" },
  { id: 24, companyName: "Unilever", industry: "FMCG", domain: "unilever.com", lat: 51.511, lng: -0.105, country: "UK", city: "London", stats: "Consumer" },
  { id: 25, companyName: "LVMH", industry: "Luxury", domain: "lvmh.com", lat: 48.866, lng: 2.305, country: "France", city: "Paris", stats: "Fashion" },
  { id: 26, companyName: "Airbus", industry: "Aerospace", domain: "airbus.com", lat: 43.610, lng: 1.363, country: "France", city: "Toulouse", stats: "Aviation" },
  { id: 27, companyName: "Nestlé", industry: "Food", domain: "nestle.com", lat: 46.462, lng: 6.841, country: "Switzerland", city: "Vevey", stats: "F&B" },
  { id: 28, companyName: "Spotify", industry: "Streaming", domain: "spotify.com", lat: 59.329, lng: 18.068, country: "Sweden", city: "Stockholm", stats: "Music" },
  { id: 29, companyName: "Nokia", industry: "Telecom", domain: "nokia.com", lat: 60.169, lng: 24.938, country: "Finland", city: "Espoo", stats: "5G Tech" },
  { id: 30, companyName: "ASML", industry: "Semiconductors", domain: "asml.com", lat: 51.441, lng: 5.469, country: "Netherlands", city: "Veldhoven", stats: "Lithography" },

  // Asia
  { id: 31, companyName: "Tata Group", industry: "Conglomerate", domain: "tata.com", lat: 18.922, lng: 72.834, country: "India", city: "Mumbai", stats: "Global Tech" },
  { id: 32, companyName: "Reliance", industry: "Energy/Tech", domain: "ril.com", lat: 19.076, lng: 72.877, country: "India", city: "Mumbai", stats: "Jio Network" },
  { id: 33, companyName: "Infosys", industry: "IT Services", domain: "infosys.com", lat: 12.971, lng: 77.594, country: "India", city: "Bengaluru", stats: "Consulting" },
  { id: 34, companyName: "Toyota", industry: "Automotive", domain: "toyota-global.com", lat: 35.082, lng: 137.156, country: "Japan", city: "Toyota City", stats: "Mfg Leader" },
  { id: 35, companyName: "Sony", industry: "Electronics", domain: "sony.com", lat: 35.627, lng: 139.757, country: "Japan", city: "Tokyo", stats: "Entertainment" },
  { id: 36, companyName: "Samsung", industry: "Tech", domain: "samsung.com", lat: 37.263, lng: 127.028, country: "South Korea", city: "Suwon", stats: "Mobile" },
  { id: 37, companyName: "Alibaba", industry: "E-Commerce", domain: "alibabagroup.com", lat: 30.274, lng: 120.155, country: "China", city: "Hangzhou", stats: "Cloud" },
  { id: 38, companyName: "Tencent", industry: "Tech", domain: "tencent.com", lat: 22.543, lng: 113.957, country: "China", city: "Shenzhen", stats: "Social" },
  { id: 39, companyName: "TSMC", industry: "Semiconductors", domain: "tsmc.com", lat: 24.781, lng: 121.006, country: "Taiwan", city: "Hsinchu", stats: "Chip Fabs" },
  { id: 40, companyName: "DBS Bank", industry: "Banking", domain: "dbs.com", lat: 1.290, lng: 103.851, country: "Singapore", city: "Singapore", stats: "Finance" },
  { id: 41, companyName: "Grab", industry: "Tech", domain: "grab.com", lat: 1.280, lng: 103.850, country: "Singapore", city: "Singapore", stats: "Superapp" },

  // Middle East & Africa
  { id: 42, companyName: "Saudi Aramco", industry: "Energy", domain: "aramco.com", lat: 26.236, lng: 50.032, country: "Saudi Arabia", city: "Dhahran", stats: "Oil Giant" },
  { id: 43, companyName: "Emirates", industry: "Aviation", domain: "emirates.com", lat: 25.253, lng: 55.365, country: "UAE", city: "Dubai", stats: "Airline" },
  { id: 44, companyName: "Naspers", industry: "Internet", domain: "naspers.com", lat: -33.918, lng: 18.423, country: "South Africa", city: "Cape Town", stats: "Investing" },

  // Oceania
  { id: 45, companyName: "BHP", industry: "Mining", domain: "bhp.com", lat: -37.813, lng: 144.963, country: "Australia", city: "Melbourne", stats: "Resources" },
  { id: 46, companyName: "Canva", industry: "Software", domain: "canva.com", lat: -33.886, lng: 151.211, country: "Australia", city: "Sydney", stats: "Design AI" },
  { id: 47, companyName: "Atlassian", industry: "Software", domain: "atlassian.com", lat: -33.868, lng: 151.209, country: "Australia", city: "Sydney", stats: "Dev Ops" },
  { id: 48, companyName: "Xero", industry: "Fintech", domain: "xero.com", lat: -41.286, lng: 174.776, country: "New Zealand", city: "Wellington", stats: "Accounting" },
  
  // Others
  { id: 49, companyName: "Maersk", industry: "Logistics", domain: "maersk.com", lat: 55.676, lng: 12.568, country: "Denmark", city: "Copenhagen", stats: "Shipping" },
  { id: 50, companyName: "IKEA", industry: "Retail", domain: "ikea.com", lat: 52.160, lng: 4.497, country: "Netherlands", city: "Leiden", stats: "Furniture" },
  { id: 51, companyName: "Red Bull", industry: "Beverage", domain: "redbull.com", lat: 47.219, lng: 13.264, country: "Austria", city: "Fuschl", stats: "Energy" },
  { id: 52, companyName: "Lego", industry: "Toys", domain: "lego.com", lat: 55.731, lng: 9.115, country: "Denmark", city: "Billund", stats: "Creative" }
];

export default function GlobalB2BSection() {
  const globeRef = useRef<any>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false); 
  
  // New State: Controls whether the user is interacting with the globe map
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // --- GLOBE CONTROLS LOGIC ---
  useEffect(() => {
    if (mounted && globeRef.current) {
      const controls = globeRef.current.controls();
      if (controls) {
        controls.minDistance = 150;
        controls.maxDistance = 600;
        controls.dampingFactor = 0.1;

        if (isInteracting) {
            // Unlocked: User can Zoom/Rotate
            controls.autoRotate = false;
            controls.enableZoom = true;
            controls.enableRotate = true;
        } else {
            // Locked: Auto-rotate only, No Zoom/Rotate
            controls.autoRotate = true;
            controls.autoRotateSpeed = 0.6;
            controls.enableZoom = false; 
            controls.enableRotate = false;
        }
      }
    }
  }, [isInteracting, mounted]);

  const handleClientClick = (client: Client) => {
    setSelectedClient(client);
    // Force interaction mode so user can look around after clicking a client
    setIsInteracting(true);
    if (globeRef.current) {
      globeRef.current.pointOfView({ 
        lat: client.lat, 
        lng: client.lng, 
        altitude: 0.8 
      }, 1500);
    }
  };

  const closeOverlay = () => {
    setSelectedClient(null);
    // Do NOT disable interaction immediately, let user decide when to leave
  };

  const clientList = useMemo(() => REAL_CLIENTS, []);

  if (!mounted) return <div className="min-h-screen bg-[#00050a]" />;

  return (
    <div 
        className="relative w-full h-screen bg-[#00050a] overflow-hidden font-sans group"
        // When mouse leaves the SECTION, reset interaction to allow scrolling again
        onMouseLeave={() => setIsInteracting(false)}
    >
      
      {/* SEO Hidden Content */}
      <h1 className="sr-only">Global Enterprise Partners and Network</h1>
      <div className="sr-only">
        <h2>Our Trusted Partners</h2>
        <ul>
          {clientList.map((client) => (
            <li key={client.id}>
              {client.companyName} - {client.industry} Leader in {client.city}, {client.country}.
            </li>
          ))}
        </ul>
      </div>

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
          <p className="text-white/40 text-xs mt-4 tracking-[0.2em] uppercase font-medium">
            Powering {REAL_CLIENTS.length}+ Fortune 500 Enterprises
          </p>
        </motion.div>
      </div>

      {/* --- SCROLL SHIELD LAYER (The Fix) --- */}
      {/* This invisible div covers the globe. When you scroll, you scroll this div (and the page). 
          When you click it, it disappears, unlocking the globe. */}
      {!isInteracting && (
        <div 
            className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
            onClick={() => setIsInteracting(true)}
            title="Click to interact with the globe"
        >
            {/* Optional Hint in the center (visible on hover) */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 flex items-center gap-3">
                <Hand size={18} className="text-blue-400 animate-pulse" />
                <span className="text-white text-xs font-bold uppercase tracking-widest">Click to Explore</span>
            </div>
        </div>
      )}

      {/* 3D Globe Container */}
      <div className="w-full h-full">
        <Globe
          ref={globeRef}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          
          onZoom={(zoom: { altitude: number }) => {
            if (zoom.altitude < 1.8 && !isZoomed) setIsZoomed(true);
            if (zoom.altitude >= 1.8 && isZoomed) setIsZoomed(false);
          }}

          htmlElementsData={clientList}
          htmlElement={(client: any) => {
            const el = document.createElement('div');
            
            // LOGO LOGIC & FAST LOADING
            const clearbitUrl = `https://logo.clearbit.com/${client.domain}`;
            const googleUrl = `https://www.google.com/s2/favicons?domain=${client.domain}&sz=128`;
            
            el.innerHTML = `
              <div class="relative group flex flex-col items-center justify-center transform transition-transform duration-300 hover:scale-125 hover:z-50">
                
                <div class="relative w-8 h-8 md:w-12 md:h-12 p-1.5 rounded-full border border-blue-500/30 bg-white shadow-[0_0_15px_rgba(59,130,246,0.4)] flex items-center justify-center overflow-hidden">
                  <img 
                       src="${clearbitUrl}" 
                       alt="${client.companyName}" 
                       loading="eager" 
                       decoding="async"
                       fetchpriority="high"
                       class="w-full h-full object-contain object-center" 
                       onerror="this.onerror=null; this.src='${googleUrl}';" 
                  />
                </div>
                
                <div class="absolute inset-0 rounded-full bg-blue-500/20 animate-ping group-hover:animate-none"></div>

                <div class="absolute top-full mt-2 px-3 py-1.5 bg-gray-900/90 backdrop-blur-md border border-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none transform translate-y-2 group-hover:translate-y-0">
                  <p class="text-[10px] text-white font-bold whitespace-nowrap tracking-wide">${client.companyName}</p>
                </div>
              </div>
            `;
            el.style.cursor = 'pointer';
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
           <div className="hidden lg:flex items-center gap-3 text-white/50 text-[10px] font-bold uppercase tracking-widest bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-xl">
               <ShieldCheck size={16} className="text-blue-500" />
               <span>Enterprise Grade Encryption</span>
           </div>
           
           {/* Scroll Status Indicator */}
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

      {/* Detail Overlay */}
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
              
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full" />
              <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0f1a] to-transparent pointer-events-none" />

              <button 
                onClick={closeOverlay} 
                className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-all z-10"
              >
                <X size={20} />
              </button>

              <div className="mt-4">
                <div className="w-20 h-20 bg-white p-4 rounded-2xl shadow-xl flex items-center justify-center mb-6">
                  {/* Modal Image Logic */}
                  <img 
                    src={`https://logo.clearbit.com/${selectedClient.domain}`}
                    className="w-full h-full object-contain" 
                    alt={selectedClient.companyName}
                    loading="eager"
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
                    <p className="text-[10px] text-white/30 uppercase font-black tracking-tighter">Headquarters</p>
                    <p className="text-white font-bold text-lg">{selectedClient.city}, {selectedClient.country}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-blue-500/50 transition-colors">
                    <Globe2 size={20} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/30 uppercase font-black tracking-tighter">Deployment</p>
                    <p className="text-white font-bold text-lg">{selectedClient.stats}</p>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-white/10">
                <button className="group relative w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all uppercase text-[11px] tracking-[0.2em] overflow-hidden shadow-lg shadow-blue-900/20">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    View Case Study <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
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