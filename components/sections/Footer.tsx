'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script'; // Optimized script loading
import { 
  Github, Twitter, Linkedin, Mail, ArrowUpRight, 
  Home, Box, Briefcase, Phone, X, Globe, MapPin, 
  Navigation, Facebook, Instagram, Youtube 
} from 'lucide-react';

// Static data moved outside component to optimize re-renders
const footerLinks = {
  "Solutions": [
    { name: 'AI Agents', href: '/ai-agents' },
    { name: 'Neural Training', href: '/neural-training' },
    { name: 'Custom LLMs', href: '/custom-llms' },
    { name: 'Security Protocol', href: '/security-protocol' },
  ],
  "Business Hub": [
    { name: 'AI Employers (Jobs)', href: '/ai-employers' },
    { name: 'Freelancer Platform', href: '/freelancer-platform' },
    { name: 'Project Development', href: '/project-development' },
    { name: 'Individual Projects', href: '/individual-projects' },
  ],
  "Infrastructure": [
    { name: 'About Us', href: '/about' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Documentation', href: '/documentation' },
    { name: 'Contact', href: '/contact' },
  ],
};

const socialLinks = [
  { Icon: Facebook, href: "https://www.facebook.com/careerlabconsultingofficial", color: "hover:bg-[#1877F2]", name: "Facebook" },
  { Icon: Twitter, href: "https://x.com/CareerLabConsul", color: "hover:bg-[#1DA1F2]", name: "Twitter" },
  { Icon: Instagram, href: "https://www.instagram.com/careerlabconsultingofficial", color: "hover:bg-[#E4405F]", name: "Instagram" },
  { Icon: Linkedin, href: "https://www.linkedin.com/company/38144534", color: "hover:bg-[#0A66C2]", name: "Linkedin" },
  { Icon: Youtube, href: "https://www.youtube.com/@careerlabconsulting4691", color: "hover:bg-[#FF0000]", name: "Youtube" },
];

const locations = [
  { country: "India (HQ)", city: "Gurugram", address: "5th Floor, Cyber Green Part-1, DLF Building No-2, Sector 25, Gurugram, 122002", phone: "+918700236923", lat: 28.4955, lng: 77.0829 },
  { country: "India (Branch)", city: "Bengaluru", address: "21, Raheja Towers, Mahatma Gandhi Rd, Ashok Nagar, Bengaluru, 560001", phone: "+918700236923", lat: 12.9716, lng: 77.5946 },
  { country: "USA", city: "San Francisco", address: "128 Geary St, San Francisco California 94108, United States", phone: "+12128146245", lat: 37.7875, lng: -122.4052 },
  { country: "UK", city: "London", address: "2nd Floor, 23 Great Portland Street, London", phone: "+447888873245", lat: 51.5194, lng: -0.1438 },
  { country: "UAE", city: "Dubai", address: "Office-403, Al Mankhool, Dubai, United Arab Emirates", phone: "+971524009232", lat: 25.2532, lng: 55.2865 },
  { country: "Singapore", city: "Singapore", address: "TripleOne Somerset, 111 Somerset Road, #04-01, 238164", phone: "+6568151432", lat: 1.3003, lng: 103.8387 },
  { country: "South Africa", city: "Cape Town", address: "3, Deneb House, 371 Browning Road, Cape Town, 7872", phone: "+278755063412", lat: -33.9886, lng: 18.6273 },
  { country: "Germany", city: "Berlin", address: "Grünberger Str. 54, 10245 Berlin, Germany", phone: "+493051588345", lat: 52.5117, lng: 13.4530 }
];


const productList = ["AI Voice", "AI CRM", "AI HRMS", "AI ERP", "AI LMS", "AI TwinX", "AI School Management", "AI University Management", "AI Legal", "AI Admin"];

export default function B2BFooter() {
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [currentYear, setCurrentYear] = useState(2025); 
  // const whatsappNumber = "919810984968";
  const whatsappNumber = "918700236923";
  

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <>
      <footer className="bg-[#020617] pt-20 pb-24 md:pb-12 border-t border-white/5 relative overflow-hidden" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">Career Lab Consulting - Enterprise AI Solutions</h2>
        
        {/* Ambient Background Effect */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[400px] bg-blue-600/5 blur-[120px] -z-10" />

        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            
            {/* Brand Column */}
            <div className="lg:col-span-3 flex flex-col items-start">
              <Link href="/" aria-label="Career Lab Home">
                <Image 
                  src="/logo.png" 
                  alt="Career Lab Consulting Logo" 
                  width={192} 
                  height={64}
                  className="w-48 h-auto mb-6 filter drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]" 
                />
              </Link>
              <p className="text-slate-400 text-sm leading-relaxed font-medium mb-10">
                Pioneering autonomous intelligence for global enterprises. Architecting the next generation of digital workforces through true cognitive independence.
              </p>
              
              <div className="flex flex-wrap gap-3">
                {socialLinks.map(({ Icon, href, color, name }, i) => (
                  <a 
                    key={i} 
                    href={href} 
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${name}`}
                    className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white ${color} hover:border-transparent transition-all duration-300 transform hover:scale-110`}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-8 pt-4">
              {Object.entries(footerLinks).map(([title, links]) => (
                <nav key={title} className="space-y-6" aria-label={title}>
                  <h3 className="text-white text-[11px] font-black uppercase tracking-[0.25em] opacity-80">{title}</h3>
                  <ul className="space-y-4 text-slate-400 text-sm font-semibold">
                    {links.map((link) => (
                      <li key={link.name}>
                        <Link href={link.href} className="hover:text-blue-400 transition-colors flex items-center gap-1 group">
                          {link.name} 
                          <ArrowUpRight className="w-3 h-3 text-blue-500/50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>

            {/* Contact Hub Column */}
            <div className="lg:col-span-4">
              <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/20 backdrop-blur-md">
                <h3 className="text-white text-[11px] font-black uppercase tracking-[0.25em] mb-6">Contact Hub</h3>
                <address className="not-italic space-y-5">
                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-blue-400" aria-hidden="true" />
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed font-bold">DLF Cyber City, 5th Floor, Cyber Green-2, Sec-25, Gurugram, India</p>
                  </div>
                  <a href="tel:+918700236923" className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors">
                      <Phone className="w-5 h-5 text-blue-400 group-hover:text-white" aria-hidden="true" />
                    </div>
                    <span className="text-slate-300 text-sm font-bold group-hover:text-blue-400 transition-colors">+91 870023 6923</span>
                  </a>
                  <a href="mailto:info@careerlabconsulting.com" className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors">
                      <Mail className="w-5 h-5 text-blue-400 group-hover:text-white" aria-hidden="true" />
                    </div>
                    <span className="text-slate-300 text-sm font-bold break-all group-hover:text-blue-400 transition-colors">info@careerlabconsulting.com</span>
                  </a>
                </address>
              </div>
            </div>
          </div>

          {/* Locations Section */}
          
          <section className="mb-20" aria-label="Global Locations">
  <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-6">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-500/30 shadow-lg shadow-blue-500/10">
        <Globe className="w-6 h-6 text-blue-400" aria-hidden="true" />
      </div>
      <div>
        <h3 className="text-white font-black text-base tracking-widest uppercase bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Global Presence</h3>
        <p className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider mt-1.5">Operating across 8 primary tech hubs worldwide</p>
      </div>
    </div>
  </div>
  
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {locations.map((loc, idx) => (
      <div 
        key={idx} 
        className="group relative bg-gradient-to-br from-slate-900/50 to-slate-800/30 hover:from-slate-800/70 hover:to-slate-900/50 border border-slate-700/50 hover:border-blue-500/60 rounded-3xl p-6 transition-all duration-700 flex flex-col h-full hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-500/20 backdrop-blur-sm overflow-hidden"
      >
        {/* Ambient Glow Effect */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Map Preview - Only Top Half */}
        <div className="absolute top-0 left-0 right-0 h-[56%] bg-gradient-to-br from-slate-950/98 via-slate-900/98 to-slate-950/98 backdrop-blur-xl rounded-t-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 z-10 overflow-hidden border-b-2 border-blue-500/40 shadow-xl shadow-blue-500/20">
          <div className="relative w-full h-full p-2">
            {/* Map Container with Enhanced Styling */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden ring-2 ring-blue-500/20 shadow-2xl">
              <img
                src={`https://tile.openstreetmap.org/14/${Math.floor((loc.lng + 180) / 360 * Math.pow(2, 14))}/${Math.floor((1 - Math.log(Math.tan(loc.lat * Math.PI / 180) + 1 / Math.cos(loc.lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, 14))}.png`}
                alt={`Map of ${loc.city}`}
                className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 will-change-transform"
                loading="lazy"
                style={{ filter: 'grayscale(0.4) brightness(0.6) contrast(1.3) saturate(0.8)' }}
              />
              
              {/* Animated Grid Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5" />
              
              {/* Enhanced Marker with Ripple Effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-10 h-10 flex items-center justify-center">
                  
                  {/* Outer Pulse */}
                  <div className="absolute left-1/2 top-1/2 w-20 h-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 animate-ping"
                    style={{ animationDuration: '2s' }}
                  />

                  {/* Inner Pulse */}
                  <div className="absolute left-1/2 top-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/30 animate-ping"
                    style={{ animationDuration: '2.5s', animationDelay: '0.3s' }}
                  />

                  {/* Marker */}
                  <div className="relative z-10 w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full border-4 border-white shadow-2xl flex items-center justify-center ring-4 ring-blue-500/30">
                    <div className="w-4 h-4 bg-white rounded-full shadow-inner" />
                  </div>

                </div>
              </div>
            </div>
            
            {/* Sophisticated Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-slate-950/90 rounded-2xl" />
            
            {/* Compact Location Label at Bottom */}
            <div className="absolute bottom-3 left-5 right-5 flex justify-center">
              <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-xl rounded-full px-3 py-1.5 border border-slate-700/50 shadow-lg w-fit max-w-full">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md shadow-blue-500/40">
                  <MapPin className="w-3 h-3 text-white" />
                </div>

                <div className="flex items-center gap-1 min-w-0">
                  <h4 className="font-bold text-sm text-white truncate">
                    {loc.city}
                  </h4>

                  <span className="text-[10px] text-blue-400 font-semibold uppercase tracking-wide whitespace-nowrap">
                    {loc.country}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Original Card Content - Enhanced */}
        <div className="relative z-[5] flex items-start justify-between mb-3">
          <div className="space-y-3 flex-1">
            {/* Country Badge with Gradient */}
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600/30 to-cyan-600/30 text-blue-300 font-black text-[10px] uppercase tracking-[0.15em] border border-blue-500/40 shadow-lg shadow-blue-500/10 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              {loc.country}
            </span>
            {/* City Name with Gradient Text */}
            <h4 className="text-white font-black text-xl tracking-tight bg-gradient-to-br from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
              {loc.city}
            </h4>
          </div>
          {/* Animated Map Icon */}
          <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:border-blue-500/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
            <MapPin className="w-5 h-5 text-slate-500 group-hover:text-blue-400 transition-all duration-500 group-hover:scale-110" aria-hidden="true" />
          </div>
        </div>

        {/* Address with Better Typography */}
        <p className="relative z-[5] text-slate-400 text-[13px] leading-relaxed mb-auto font-medium tracking-wide">
          {loc.address}
        </p>

        {/* Contact Section - Enhanced - Always Visible */}
        <div className="relative z-20 space-y-3 mt-6 pt-6 border-t border-slate-700/30">
          {/* Phone Link with Hover Effect */}
          <a 
            href={`tel:${loc.phone}`} 
            className="flex items-center gap-3 mb-2 text-slate-300 text-sm font-bold hover:text-blue-400 transition-all duration-300 group/phone p-2 -m-2 rounded-xl hover:bg-slate-800/50"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center group-hover/phone:bg-blue-500/20 group-hover/phone:border-blue-500/50 transition-all duration-300">
              <Phone className="w-4 h-4 text-blue-400 group-hover/phone:scale-110 transition-transform duration-300" aria-hidden="true" />
            </div>
            <span className="group-hover/phone:tracking-wide transition-all duration-300">{loc.phone}</span>
          </a>
          
          {/* Directions Button - Premium Style */}
          <a 
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address)}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="relative flex items-center justify-center gap-2.5 w-full py-4 bg-gradient-to-r from-slate-800/60 to-slate-700/60 group-hover:from-blue-600 group-hover:to-blue-500 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-500 border border-slate-700/50 group-hover:border-transparent shadow-lg group-hover:shadow-2xl group-hover:shadow-blue-500/30 overflow-hidden"
          >
            {/* Shine Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            <Navigation className="w-4 h-4 group-hover:rotate-45 transition-transform duration-500" aria-hidden="true" /> 
            <span className="relative">
              <span className="group-hover:hidden">Get Directions</span>
              <span className="hidden group-hover:inline">Open in Maps</span>
            </span>
          </a>
        </div>
      </div>
    ))}
  </div>
</section>

          {/* Copyright & Legal */}
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">© 2015 - {currentYear} Career Lab Consulting</span>
              {['Privacy Policy', 'Terms of Service', 'Refund Policy', 'Examination Policy', 'Escalation Policy'].map((item) => (
                <Link key={item} href={`/${item.toLowerCase().replace(/ /g, '-')}`} className="text-[10px] text-slate-500 font-bold uppercase tracking-widest hover:text-blue-400 transition-colors">
                  {item}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-3 px-5 py-2.5 bg-emerald-500/5 border border-emerald-500/10 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] text-emerald-500/90 font-black uppercase tracking-widest">Enterprise Systems Nominal</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Product Modal */}
      {isProductOpen && (
        <div className="md:hidden fixed inset-0 z-[110] flex items-end justify-center px-4 pb-24 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-[#0a0f1d] border border-white/10 rounded-[2.5rem] p-6 shadow-2xl overflow-hidden max-h-[70vh]">
             <div className="flex justify-between items-center mb-6">
              <h3 className="text-white font-black text-xs uppercase tracking-[0.2em]">Enterprise Products</h3>
              <button onClick={() => setIsProductOpen(false)} className="p-2 bg-white/5 rounded-full text-slate-400" aria-label="Close menu"><X className="w-6 h-6" /></button>
            </div>
            <div className="grid grid-cols-1 gap-1 overflow-y-auto max-h-[50vh] pr-2">
              {productList.map((item) => (
                <Link key={item} href={`/products/${item.toLowerCase().replace(/ /g, '-')}`} onClick={() => setIsProductOpen(false)} className="text-left text-slate-400 hover:text-blue-400 text-sm font-bold py-4 border-b border-white/5 transition-colors uppercase tracking-wider">{item}</Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation Dock */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md h-20 bg-[#0a0f1d]/90 backdrop-blur-xl border border-white/10 rounded-[2.5rem] z-[100] md:hidden shadow-2xl flex items-center justify-around px-2">
        <Link href="/" className="flex flex-col items-center justify-center min-w-[64px] h-full text-slate-500 hover:text-blue-400 transition-colors">
          <Home className="w-6 h-6 mb-1" aria-hidden="true" />
          <span className="text-[9px] font-black uppercase tracking-tighter">Home</span>
        </Link>
        <button onClick={() => setIsProductOpen(true)} className={`flex flex-col items-center justify-center min-w-[64px] h-full transition-colors ${isProductOpen ? 'text-blue-400' : 'text-slate-500'}`} aria-label="Open Products Menu">
          <Box className="w-6 h-6 mb-1" aria-hidden="true" />
          <span className="text-[9px] font-black uppercase tracking-tighter">Products</span>
        </button>
        <Link 
          href={`https://wa.me/${whatsappNumber}`} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Contact on WhatsApp"
          className="relative -top-7 w-16 h-16 bg-emerald-500 rounded-full border-[6px] border-[#020617] flex items-center justify-center shadow-2xl transition-transform active:scale-90"
        >
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-white fill-current" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.393 0 12.03c0 2.123.544 4.197 1.583 6.012L0 24l6.117-1.605a11.745 11.745 0 005.925 1.603h.005c6.635 0 12.028-5.391 12.032-12.027a11.812 11.812 0 00-3.476-8.513z"/>
          </svg>
        </Link>
        <Link href="/ai-employers" className="flex flex-col items-center justify-center min-w-[64px] h-full text-slate-500 hover:text-blue-400 transition-colors">
          <Briefcase className="w-6 h-6 mb-1" aria-hidden="true" />
          <span className="text-[9px] font-black uppercase tracking-tighter">Jobs</span>
        </Link>
        <Link href="/contact" className="flex flex-col items-center justify-center min-w-[64px] h-full text-slate-500 hover:text-blue-400 transition-colors">
          <Phone className="w-6 h-6 mb-1" aria-hidden="true" />
          <span className="text-[9px] font-black uppercase tracking-tighter">Support</span>
        </Link>
      </nav>
    </>
  );
}