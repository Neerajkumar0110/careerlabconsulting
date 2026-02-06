'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Building2, Globe2, ShieldCheck, ArrowRight, Lock, Unlock, Hand } from 'lucide-react';

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

// --- HELPER: REAL DATA MAPPING (Spread Out Locations) ---
const generateRealClients = (): Client[] => {
  
  // Define Specific Hubs to prevent overlapping (Clumping Fix)
  const regions = [
    // --- INDIA (Split into cities to avoid single pile) ---
    { city: "Bangalore", country: "India", lat: 12.97, lng: 77.59, domains: ["infosys.com", "wipro.com", "flipkart.com", "swiggy.com", "ola.cabs", "zerodha.com", "myntra.com", "razorpay.com", "phonepe.com", "udaan.com", "cred.club", "bigbasket.com", "dunzo.com"] },
    { city: "Mumbai", country: "India", lat: 19.07, lng: 72.87, domains: ["tcs.com", "ril.com", "hdfcbank.com", "icicibank.com", "sbi.co.in", "tatamotors.com", "mahindra.com", "cipla.com", "sunpharma.com", "lntinfotech.com", "kotak.com", "axisbank.com", "nykaa.com", "bookmyshow.com", "dream11.com"] },
    { city: "Delhi/NCR", country: "India", lat: 28.61, lng: 77.20, domains: ["paytm.com", "zomato.com", "airtel.in", "makemytrip.com", "policybazaar.com", "zomato.com", "delhivery.com", "cars24.com", "lenskart.com", "urbancompany.com", "mobikwik.com", "snapdeal.com", "indigogein.com"] },
    { city: "Hyderabad", country: "India", lat: 17.38, lng: 78.48, domains: ["drreddys.com", "apollohospitals.com", "bharatbiotech.com", "meesho.com", "darwinbox.com"] },
    { city: "Pune", country: "India", lat: 18.52, lng: 73.85, domains: ["bajajauto.com", "techmahindra.com", "kpit.com", "force.com", "druva.com"] },

    // --- USA (Split into Coast/Central) ---
    { city: "California (Tech)", country: "USA", lat: 37.38, lng: -122.08, domains: ["google.com", "apple.com", "meta.com", "netflix.com", "tesla.com", "adobe.com", "intel.com", "nvidia.com", "cisco.com", "hp.com", "uber.com", "airbnb.com", "zoom.us", "paypal.com", "ebay.com", "intuit.com", "amd.com", "salesforce.com", "oracle.com", "linkedin.com", "twitter.com", "snapchat.com", "dropbox.com", "slack.com", "whatsapp.com"] },
    { city: "New York (Finance)", country: "USA", lat: 40.71, lng: -74.00, domains: ["jpmorganchase.com", "goldmansachs.com", "citigroup.com", "morganstanley.com", "americanexpress.com", "verizon.com", "pfizer.com", "pepsico.com", "metlife.com", "blackrock.com", "ibm.com", "deloitte.com", "bloomberg.com", "nytimes.com", "wsj.com", "mastercard.com", "viacomcbs.com", "hbo.com", "etsy.com", "squarespace.com"] },
    { city: "Seattle", country: "USA", lat: 47.60, lng: -122.33, domains: ["amazon.com", "microsoft.com", "starbucks.com", "costco.com", "boeing.com", "nordstrom.com", "expedia.com", "t-mobile.com", "tableau.com"] },
    { city: "Texas", country: "USA", lat: 30.26, lng: -97.74, domains: ["dell.com", "att.com", "americanairlines.com", "exxonmobil.com", "chevron.com", "oracle.com", "tesla.com", "sysco.com", "wholefoods.com"] },

    // --- EUROPE ---
    { city: "London", country: "UK", lat: 51.50, lng: -0.12, domains: ["hsbc.com", "barclays.com", "bp.com", "shell.com", "unilever.com", "gsk.com", "astrazeneca.com", "vodafone.com", "bt.com", "britishairways.com", "virgin.com", "revolut.com", "wise.com", "deliveroo.co.uk", "asos.com", "monzo.com"] },
    { city: "Germany", country: "Germany", lat: 52.52, lng: 13.40, domains: ["volkswagen.com", "bmw.com", "daimler.com", "siemens.com", "sap.com", "allianz.com", "adidas.com", "puma.com", "lufthansa.com", "basf.com", "bayer.com", "audi.com", "porsche.com", "zalando.com", "soundcloud.com", "trivago.com"] },
    { city: "Paris", country: "France", lat: 48.85, lng: 2.35, domains: ["loreal.com", "lvmh.com", "chanel.com", "axa.com", "airbus.com", "sanofi.com", "orange.com", "danone.com", "ubisoft.com", "renault.com", "deezer.com", "dailymotion.com"] },
    { city: "Nordics", country: "Europe", lat: 59.32, lng: 18.06, domains: ["spotify.com", "ikea.com", "hm.com", "ericsson.com", "nokia.com", "volvo.com", "lego.com", "maersk.com", "skype.com", "king.com", "supercell.com", "rovio.com"] },

    // --- ASIA PACIFIC ---
    { city: "Tokyo", country: "Japan", lat: 35.67, lng: 139.65, domains: ["toyota.com", "sony.com", "honda.com", "nissan.com", "softbank.jp", "panasonic.com", "canon.com", "nikon.com", "nintendo.com", "uniqlo.com", "7-eleven.com", "rakuten.co.jp", "line.me"] },
    { city: "China", country: "China", lat: 31.23, lng: 121.47, domains: ["alibaba.com", "tencent.com", "baidu.com", "jd.com", "byd.com", "huawei.com", "xiaomi.com", "tiktok.com", "dji.com", "shein.com", "trip.com", "bilibili.com", "oneplus.com", "oppo.com", "vivo.com"] },
    { city: "Singapore", country: "Singapore", lat: 1.35, lng: 103.81, domains: ["shopee.com", "grab.com", "razer.com", "singtel.com", "dbs.com", "singaporeair.com", "agoda.com", "l lazada.com"] },
    { city: "Australia", country: "Australia", lat: -33.86, lng: 151.20, domains: ["atlassian.com", "canva.com", "bhp.com", "qantas.com", "xero.com", "afterpay.com", "envato.com"] },

    // --- OTHERS ---
    { city: "Brazil", country: "Brazil", lat: -23.55, lng: -46.63, domains: ["nubank.com.br", "petrobras.com.br", "vale.com", "itau.com.br", "embraer.com"] },
    { city: "Canada", country: "Canada", lat: 43.65, lng: -79.38, domains: ["shopify.com", "rbc.com", "lululemon.com", "blackberry.com", "slack.com"] },
    { city: "UAE", country: "UAE", lat: 25.20, lng: 55.27, domains: ["emirates.com", "etihad.com", "dubaiholding.com", "emaar.com", "careem.com"] }
  ];

  let clientList: Client[] = [];
  let idCounter = 1;

  regions.forEach(region => {
    region.domains.forEach(domain => {
      // Increase spread (Noise) to 2.5 degrees so they don't look like a single dot
      const spreadFactor = 2.5; 
      const latOffset = (Math.random() - 0.5) * spreadFactor; 
      const lngOffset = (Math.random() - 0.5) * spreadFactor;

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

  // --- 1. SET GLOBE SIZE & INITIAL VIEW (SUPER ZOOMED) ---
  useEffect(() => {
    if (mounted && globeRef.current) {
      globeRef.current.pointOfView({
        lat: 22, 
        lng: 77, // Centered closer to India/Asia
        // ALTITUDE 0.6 = Very Big Earth (Zoomed In)
        altitude: 0.6 
      }, 0);
    }
  }, [mounted]);

  // --- GLOBE CONTROLS ---
  useEffect(() => {
    if (mounted && globeRef.current) {
      const controls = globeRef.current.controls();
      if (controls) {
        controls.minDistance = 100; // Allow getting very close
        controls.maxDistance = 500;
        controls.dampingFactor = 0.1;

        if (isInteracting) {
            controls.autoRotate = false;
            controls.enableZoom = true;
            controls.enableRotate = true;
        } else {
            controls.autoRotate = true;
            controls.autoRotateSpeed = 0.3; // Slower, majestic rotation
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
        altitude: 0.4 // Extreme closeup on click
      }, 1500);
    }
  };

  const closeOverlay = () => {
    setSelectedClient(null);
  };

  const clientList = useMemo(() => ALL_CLIENTS, []);

  if (!mounted) return <div className="min-h-screen bg-[#00050a]" />;

  return (
    <div 
        className="relative w-full h-screen bg-[#00050a] overflow-hidden font-sans group"
        onMouseLeave={() => setIsInteracting(false)}
    >
      
      {/* SEO Hidden Content */}
      <h1 className="sr-only">Global Enterprise Network - 300+ Genuine Partners</h1>
      
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
            Powering {ALL_CLIENTS.length}+ Fortune 500 Enterprises
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
                <span className="text-white text-xs font-bold uppercase tracking-widest">Click to Explore Map</span>
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
            
            const clearbitUrl = `https://logo.clearbit.com/${client.domain}`;
            const googleUrl = `https://www.google.com/s2/favicons?domain=${client.domain}&sz=128`;
            
            // --- CLEAN LOGO MARKER (No Title) ---
            el.innerHTML = `
              <div class="relative group flex flex-col items-center justify-center transform transition-transform duration-300 hover:scale-150 hover:z-50 cursor-pointer">
                
                <div class="relative w-5 h-5 md:w-7 md:h-7 p-0.5 rounded-full border border-blue-500/30 bg-white shadow-[0_0_10px_rgba(59,130,246,0.3)] flex items-center justify-center overflow-hidden">
                  <img 
                       src="${clearbitUrl}" 
                       alt="${client.companyName}" 
                       loading="eager" 
                       decoding="async"
                       class="w-full h-full object-contain object-center" 
                       onerror="this.onerror=null; this.src='${googleUrl}';" 
                  />
                </div>
                
                <div class="absolute inset-0 rounded-full bg-blue-500/20 animate-ping group-hover:animate-none"></div>
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
           <div className="hidden lg:flex items-center gap-3 text-white/50 text-[10px] font-bold uppercase tracking-widest bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-xl">
               <ShieldCheck size={16} className="text-blue-500" />
               <span>Enterprise Grade Encryption</span>
           </div>
           
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

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-blue-500/50 transition-colors">
                    <Globe2 size={20} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/30 uppercase font-black tracking-tighter">Status</p>
                    <p className="text-white font-bold text-lg">Active Enterprise Node</p>
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