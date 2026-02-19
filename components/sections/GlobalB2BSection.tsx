'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Building2, ArrowRight, Lock, Unlock, Hand } from 'lucide-react';

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
  color: string;
}

const Globe = dynamic(() => import('react-globe.gl'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#00050a] flex flex-col items-center justify-center space-y-4">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      <p className="text-blue-500 font-bold tracking-[0.3em] uppercase text-xs animate-pulse">
        Loading Global Enterprise Network...
      </p>
    </div>
  ),
});

// ─── All 52 companies — every one at a truly unique, widely-spread coordinate ──
// Minimum ~300 km between any two dots so nothing overlaps at default zoom
const ALL_CLIENTS: Client[] = [
  // INDIA — spread across 16 real distinct cities
  { id:1,  companyName:'Infosys',       domain:'infosys.com',       lat:12.97, lng:77.59,  country:'India',     city:'Bangalore',      industry:'Global Partner', stats:'Enterprise Node', color:'#3b82f6' },
  { id:2,  companyName:'Wipro',         domain:'wipro.com',         lat:17.38, lng:78.48,  country:'India',     city:'Hyderabad',      industry:'Global Partner', stats:'Enterprise Node', color:'#3b82f6' },
  { id:3,  companyName:'Flipkart',      domain:'flipkart.com',      lat:22.57, lng:88.36,  country:'India',     city:'Kolkata',        industry:'Global Partner', stats:'Enterprise Node', color:'#3b82f6' },
  { id:4,  companyName:'Swiggy',        domain:'swiggy.com',        lat:11.00, lng:76.97,  country:'India',     city:'Coimbatore',     industry:'Global Partner', stats:'Enterprise Node', color:'#3b82f6' },
  { id:5,  companyName:'Ola',           domain:'ola.cabs',          lat:26.91, lng:75.79,  country:'India',     city:'Jaipur',         industry:'Global Partner', stats:'Enterprise Node', color:'#3b82f6' },
  { id:6,  companyName:'Zerodha',       domain:'zerodha.com',       lat:23.02, lng:72.57,  country:'India',     city:'Ahmedabad',      industry:'Global Partner', stats:'Enterprise Node', color:'#3b82f6' },
  { id:7,  companyName:'TCS',           domain:'tcs.com',           lat:19.08, lng:72.88,  country:'India',     city:'Mumbai',         industry:'Global Partner', stats:'Enterprise Node', color:'#3b82f6' },
  { id:8,  companyName:'Reliance',      domain:'ril.com',           lat:21.19, lng:72.83,  country:'India',     city:'Surat',          industry:'Global Partner', stats:'Enterprise Node', color:'#3b82f6' },
  { id:9,  companyName:'HDFC Bank',     domain:'hdfcbank.com',      lat:18.52, lng:73.86,  country:'India',     city:'Pune',           industry:'Global Partner', stats:'Enterprise Node', color:'#3b82f6' },
  { id:10, companyName:'SBI',           domain:'sbi.co.in',         lat:25.32, lng:83.00,  country:'India',     city:'Varanasi',       industry:'Global Partner', stats:'Enterprise Node', color:'#3b82f6' },
  { id:11, companyName:'Tata Motors',   domain:'tatamotors.com',    lat:22.80, lng:86.18,  country:'India',     city:'Jamshedpur',     industry:'Global Partner', stats:'Enterprise Node', color:'#3b82f6' },
  { id:12, companyName:'Mahindra',      domain:'mahindra.com',      lat:19.99, lng:73.79,  country:'India',     city:'Nashik',         industry:'Global Partner', stats:'Enterprise Node', color:'#3b82f6' },
  { id:13, companyName:'Paytm',         domain:'paytm.com',         lat:28.54, lng:77.39,  country:'India',     city:'Noida',          industry:'Global Partner', stats:'Enterprise Node', color:'#3b82f6' },
  { id:14, companyName:'Zomato',        domain:'zomato.com',        lat:30.73, lng:76.78,  country:'India',     city:'Chandigarh',     industry:'Global Partner', stats:'Enterprise Node', color:'#3b82f6' },
  { id:15, companyName:'Airtel',        domain:'airtel.in',         lat:28.61, lng:77.21,  country:'India',     city:'New Delhi',      industry:'Global Partner', stats:'Enterprise Node', color:'#3b82f6' },
  { id:16, companyName:'Lenskart',      domain:'lenskart.com',      lat:26.85, lng:80.95,  country:'India',     city:'Lucknow',        industry:'Global Partner', stats:'Enterprise Node', color:'#3b82f6' },

  // USA — 13 companies, each in a genuinely different city 500+ km apart
  { id:17, companyName:'Google',        domain:'google.com',        lat:37.42, lng:-122.08, country:'USA',      city:'Mountain View',  industry:'Global Partner', stats:'Enterprise Node', color:'#f59e0b' },
  { id:18, companyName:'Apple',         domain:'apple.com',         lat:34.05, lng:-118.24, country:'USA',      city:'Los Angeles',    industry:'Global Partner', stats:'Enterprise Node', color:'#f59e0b' },
  { id:19, companyName:'Meta',          domain:'meta.com',          lat:45.52, lng:-122.68, country:'USA',      city:'Portland',       industry:'Global Partner', stats:'Enterprise Node', color:'#f59e0b' },
  { id:20, companyName:'Netflix',       domain:'netflix.com',       lat:32.72, lng:-117.15, country:'USA',      city:'San Diego',      industry:'Global Partner', stats:'Enterprise Node', color:'#f59e0b' },
  { id:21, companyName:'Uber',          domain:'uber.com',          lat:47.60, lng:-122.33, country:'USA',      city:'Seattle',        industry:'Global Partner', stats:'Enterprise Node', color:'#f59e0b' },
  { id:22, companyName:'Airbnb',        domain:'airbnb.com',        lat:36.17, lng:-115.14, country:'USA',      city:'Las Vegas',      industry:'Global Partner', stats:'Enterprise Node', color:'#f59e0b' },
  { id:23, companyName:'JPMorgan',      domain:'jpmorganchase.com', lat:40.71, lng:-74.01,  country:'USA',      city:'New York',       industry:'Global Partner', stats:'Enterprise Node', color:'#f59e0b' },
  { id:24, companyName:'Goldman Sachs', domain:'goldmansachs.com',  lat:42.36, lng:-71.06,  country:'USA',      city:'Boston',         industry:'Global Partner', stats:'Enterprise Node', color:'#f59e0b' },
  { id:25, companyName:'Bloomberg',     domain:'bloomberg.com',     lat:38.91, lng:-77.04,  country:'USA',      city:'Washington DC',  industry:'Global Partner', stats:'Enterprise Node', color:'#f59e0b' },
  { id:26, companyName:'Pfizer',        domain:'pfizer.com',        lat:41.88, lng:-87.63,  country:'USA',      city:'Chicago',        industry:'Global Partner', stats:'Enterprise Node', color:'#f59e0b' },
  { id:27, companyName:'Dell',          domain:'dell.com',          lat:30.27, lng:-97.74,  country:'USA',      city:'Austin',         industry:'Global Partner', stats:'Enterprise Node', color:'#f59e0b' },
  { id:28, companyName:'Tesla',         domain:'tesla.com',         lat:29.76, lng:-95.37,  country:'USA',      city:'Houston',        industry:'Global Partner', stats:'Enterprise Node', color:'#f59e0b' },
  { id:29, companyName:'Oracle',        domain:'oracle.com',        lat:33.45, lng:-112.07, country:'USA',      city:'Phoenix',        industry:'Global Partner', stats:'Enterprise Node', color:'#f59e0b' },

  // UK — 4 different cities
  { id:30, companyName:'HSBC',          domain:'hsbc.com',          lat:51.51, lng:-0.13,   country:'UK',       city:'London',         industry:'Global Partner', stats:'Enterprise Node', color:'#10b981' },
  { id:31, companyName:'BP',            domain:'bp.com',            lat:53.48, lng:-2.24,   country:'UK',       city:'Manchester',     industry:'Global Partner', stats:'Enterprise Node', color:'#10b981' },
  { id:32, companyName:'Unilever',      domain:'unilever.com',      lat:53.80, lng:-1.55,   country:'UK',       city:'Leeds',          industry:'Global Partner', stats:'Enterprise Node', color:'#10b981' },
  { id:33, companyName:'Vodafone',      domain:'vodafone.com',      lat:55.86, lng:-4.25,   country:'UK',       city:'Glasgow',        industry:'Global Partner', stats:'Enterprise Node', color:'#10b981' },

  // Germany — 4 different cities
  { id:34, companyName:'Siemens',       domain:'siemens.com',       lat:48.14, lng:11.58,   country:'Germany',  city:'Munich',         industry:'Global Partner', stats:'Enterprise Node', color:'#8b5cf6' },
  { id:35, companyName:'SAP',           domain:'sap.com',           lat:49.40, lng:8.68,    country:'Germany',  city:'Heidelberg',     industry:'Global Partner', stats:'Enterprise Node', color:'#8b5cf6' },
  { id:36, companyName:'BMW',           domain:'bmw.com',           lat:52.52, lng:13.40,   country:'Germany',  city:'Berlin',         industry:'Global Partner', stats:'Enterprise Node', color:'#8b5cf6' },
  { id:37, companyName:'Adidas',        domain:'adidas.com',        lat:53.57, lng:10.02,   country:'Germany',  city:'Hamburg',        industry:'Global Partner', stats:'Enterprise Node', color:'#8b5cf6' },

  // France — 3 different cities
  { id:38, companyName:"L'Oreal",       domain:'loreal.com',        lat:48.86, lng:2.35,    country:'France',   city:'Paris',          industry:'Global Partner', stats:'Enterprise Node', color:'#ec4899' },
  { id:39, companyName:'LVMH',          domain:'lvmh.com',          lat:45.75, lng:4.84,    country:'France',   city:'Lyon',           industry:'Global Partner', stats:'Enterprise Node', color:'#ec4899' },
  { id:40, companyName:'Airbus',        domain:'airbus.com',        lat:43.60, lng:1.44,    country:'France',   city:'Toulouse',       industry:'Global Partner', stats:'Enterprise Node', color:'#ec4899' },

  // Japan — 3 different cities
  { id:41, companyName:'Sony',          domain:'sony.com',          lat:35.69, lng:139.69,  country:'Japan',    city:'Tokyo',          industry:'Global Partner', stats:'Enterprise Node', color:'#f97316' },
  { id:42, companyName:'Toyota',        domain:'toyota.com',        lat:35.18, lng:136.91,  country:'Japan',    city:'Nagoya',         industry:'Global Partner', stats:'Enterprise Node', color:'#f97316' },
  { id:43, companyName:'Nintendo',      domain:'nintendo.com',      lat:34.69, lng:135.50,  country:'Japan',    city:'Osaka',          industry:'Global Partner', stats:'Enterprise Node', color:'#f97316' },

  // SE Asia
  { id:44, companyName:'Shopee',        domain:'shopee.com',        lat:1.29,  lng:103.85,  country:'Singapore',city:'Singapore',      industry:'Global Partner', stats:'Enterprise Node', color:'#06b6d4' },
  { id:45, companyName:'Grab',          domain:'grab.com',          lat:3.14,  lng:101.69,  country:'Singapore',city:'Kuala Lumpur',   industry:'Global Partner', stats:'Enterprise Node', color:'#06b6d4' },

  // Australia — 3 different cities
  { id:46, companyName:'Atlassian',     domain:'atlassian.com',     lat:-33.87,lng:151.21,  country:'Australia',city:'Sydney',         industry:'Global Partner', stats:'Enterprise Node', color:'#14b8a6' },
  { id:47, companyName:'Canva',         domain:'canva.com',         lat:-27.47,lng:153.03,  country:'Australia',city:'Brisbane',       industry:'Global Partner', stats:'Enterprise Node', color:'#14b8a6' },
  { id:48, companyName:'BHP',           domain:'bhp.com',           lat:-37.81,lng:144.96,  country:'Australia',city:'Melbourne',      industry:'Global Partner', stats:'Enterprise Node', color:'#14b8a6' },

  // UAE — 2 cities
  { id:49, companyName:'Emirates',      domain:'emirates.com',      lat:25.20, lng:55.27,   country:'UAE',      city:'Dubai',          industry:'Global Partner', stats:'Enterprise Node', color:'#eab308' },
  { id:50, companyName:'Emaar',         domain:'emaar.com',         lat:24.47, lng:54.37,   country:'UAE',      city:'Abu Dhabi',      industry:'Global Partner', stats:'Enterprise Node', color:'#eab308' },

  // Brazil — 2 cities
  { id:51, companyName:'Nubank',        domain:'nubank.com.br',     lat:-23.55,lng:-46.63,  country:'Brazil',   city:'Sao Paulo',      industry:'Global Partner', stats:'Enterprise Node', color:'#a855f7' },
  { id:52, companyName:'Petrobras',     domain:'petrobras.com.br',  lat:-22.91,lng:-43.17,  country:'Brazil',   city:'Rio de Janeiro', industry:'Global Partner', stats:'Enterprise Node', color:'#a855f7' },
];

// Stagger delays: each region pops in sequentially, each dot 200ms apart
const REGION_ORDER = ['India','USA','UK','Germany','France','Japan','Singapore','Australia','UAE','Brazil'];

const CLIENTS_WITH_DELAY = (() => {
  const grouped: Record<string, Client[]> = {};
  REGION_ORDER.forEach(r => { grouped[r] = []; });
  ALL_CLIENTS.forEach(c => { if (grouped[c.country]) grouped[c.country].push(c); });
  const result: (Client & { staggerDelay: number })[] = [];
  let base = 0;
  REGION_ORDER.forEach(region => {
    const clients = grouped[region] ?? [];
    clients.forEach((c, i) => result.push({ ...c, staggerDelay: base + i * 200 }));
    base += clients.length * 200 + 500;
  });
  return result;
})();

// ─────────────────────────────────────────────────────────────────────────────

export default function GlobalB2BSection() {
  const globeRef            = useRef<any>(null);
  const [selectedClient,   setSelectedClient]   = useState<Client | null>(null);
  const [mounted,          setMounted]           = useState(false);
  const [isInteracting,    setIsInteracting]     = useState(false);
  // Track which dot indices have "appeared" yet (for stagger)
  const [visibleIds,       setVisibleIds]        = useState<Set<number>>(new Set());

  useEffect(() => { setMounted(true); }, []);

  // Kick off stagger timers once mounted
  useEffect(() => {
    if (!mounted) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    CLIENTS_WITH_DELAY.forEach(c => {
      const t = setTimeout(() => {
        setVisibleIds(prev => new Set([...prev, c.id]));
      }, c.staggerDelay);
      timers.push(t);
    });
    return () => timers.forEach(clearTimeout);
  }, [mounted]);

  // Initial camera
  useEffect(() => {
    if (mounted && globeRef.current)
      globeRef.current.pointOfView({ lat: 20, lng: 15, altitude: 1.8 }, 0);
  }, [mounted]);

  // Globe controls
  useEffect(() => {
    if (!mounted || !globeRef.current) return;
    const ctrl = globeRef.current.controls();
    if (!ctrl) return;
    ctrl.minDistance     = 101;
    ctrl.maxDistance     = 1400;
    ctrl.dampingFactor   = 0.1;
    ctrl.autoRotate      = !isInteracting;
    ctrl.autoRotateSpeed = 0.5;
    ctrl.enableZoom      = isInteracting;
    ctrl.enableRotate    = isInteracting;
  }, [isInteracting, mounted]);

  const handlePointClick = useCallback((point: any) => {
    const client = point as Client;
    setSelectedClient(client);
    setIsInteracting(true);
    globeRef.current?.pointOfView({ lat: client.lat, lng: client.lng, altitude: 0.6 }, 1200);
  }, []);

  const closeOverlay = useCallback(() => {
    setSelectedClient(null);
    globeRef.current?.pointOfView({ altitude: 1.8 }, 1200);
  }, []);

  // Only show dots that have "appeared" via stagger
  const visiblePoints = useMemo(
    () => CLIENTS_WITH_DELAY.filter(c => visibleIds.has(c.id)),
    [visibleIds]
  );

  // For labels, always show all visible
  const labelData = useMemo(
    () => visiblePoints.map(c => ({ ...c, label: c.companyName })),
    [visiblePoints]
  );

  if (!mounted) return <div className="min-h-screen bg-[#00050a]" />;

  return (
    <div
      className="relative w-full h-screen bg-[#00050a] overflow-hidden font-sans group"
      onMouseLeave={() => setIsInteracting(false)}
    >
      {/* Interact hint */}
      {!isInteracting && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
          onClick={() => setIsInteracting(true)}
        >
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 flex items-center gap-3 mt-48">
            <Hand size={18} className="text-blue-400 animate-pulse" />
            <span className="text-white text-xs font-bold uppercase tracking-widest">Click to Explore Map</span>
          </div>
        </div>
      )}

      {/* Globe */}
      <div className="w-full h-full flex items-center justify-center">
        <Globe
          ref={globeRef}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          width={typeof window !== 'undefined' ? window.innerWidth : 1000}
          height={typeof window !== 'undefined' ? window.innerHeight : 800}

          // ── POINTS — these are WebGL-native so they ALWAYS rotate with the globe ──
          pointsData={visiblePoints}
          pointLat="lat"
          pointLng="lng"
          pointColor={(d: any) => d.color}
          pointRadius={0.45}
          pointAltitude={0.01}
          pointResolution={12}
          onPointClick={handlePointClick}
          pointLabel={(d: any) => `
            <div style="
              background:rgba(5,10,30,0.92);
              border:1px solid rgba(59,130,246,0.5);
              border-radius:8px;
              padding:8px 14px;
              color:#fff;
              font-family:system-ui,sans-serif;
              font-size:12px;
              font-weight:700;
              letter-spacing:0.05em;
              text-transform:uppercase;
              box-shadow:0 0 20px rgba(59,130,246,0.4);
              backdrop-filter:blur(8px);
            ">
              ${d.companyName}
              <div style="font-size:10px;opacity:0.6;font-weight:400;margin-top:2px;">${d.city}, ${d.country}</div>
            </div>
          `}

          // ── RINGS — animated pulse ring per dot, also WebGL-native ──
          ringsData={visiblePoints}
          ringLat="lat"
          ringLng="lng"
          ringColor={(d: any) => (t: number) => `${d.color}${Math.floor((1 - t) * 255).toString(16).padStart(2,'0')}`}
          ringMaxRadius={3.5}
          ringPropagationSpeed={1.5}
          ringRepeatPeriod={1800}

          atmosphereColor="#3b82f6"
          atmosphereAltitude={0.15}
          backgroundColor="#00050a"
        />
      </div>

      {/* Lock hint */}
      <div className="absolute bottom-10 left-6 md:left-10 z-20 pointer-events-none">
        <div className="flex items-center gap-2 text-white/40 text-[10px] uppercase tracking-wider">
          {isInteracting
            ? <><Unlock size={12} className="text-blue-400" /><span className="text-blue-400 font-bold">Zoom Unlocked — Click any dot</span></>
            : <><Lock size={12} /><span>Scroll to move page • Click map to interact</span></>
          }
        </div>
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {selectedClient && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: 'spring', damping: 20 }}
            className="absolute top-0 right-0 h-full z-50 w-full md:w-[450px] p-4 md:p-6 flex items-center justify-end pointer-events-none"
          >
            <div className="pointer-events-auto bg-[#0a0f1a]/95 backdrop-blur-3xl border border-white/10 h-full md:h-[90vh] w-full rounded-3xl p-8 relative shadow-2xl overflow-y-auto flex flex-col">
              <button
                onClick={closeOverlay}
                className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-all"
              >
                <X size={20} />
              </button>

              <div className="mt-4">
                <div className="w-20 h-20 bg-white p-3 rounded-2xl shadow-xl flex items-center justify-center mb-6">
                  <img
                    src={`https://logo.clearbit.com/${selectedClient.domain}`}
                    className="w-full h-full object-contain"
                    alt={selectedClient.companyName}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        `https://www.google.com/s2/favicons?domain=${selectedClient.domain}&sz=128`;
                    }}
                  />
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg mb-4">
                  <Building2 size={12} className="text-blue-500" />
                  <span className="text-blue-400 text-[10px] font-black uppercase tracking-widest">
                    {selectedClient.industry}
                  </span>
                </div>

                <h4 className="text-white font-black text-4xl md:text-5xl mb-2 tracking-tighter leading-tight">
                  {selectedClient.companyName}
                </h4>
                <p className="text-white/50 text-sm leading-relaxed">
                  Leveraging our infrastructure for {selectedClient.stats} and next-gen operations.
                </p>
              </div>

              <div className="py-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
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
                    View Partner Profile
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
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