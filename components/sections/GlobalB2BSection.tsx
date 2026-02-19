'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Building2, ArrowRight, Lock, Unlock, Hand } from 'lucide-react';

interface Client {
  companyName: string;
  domain: string;
  lat: number;
  lng: number;
  country: string;
  city: string;
  color: string;
  id: number;
  staggerDelay: number;
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

// ─── 500 companies across the globe ──────────────────────────────────────────
const RAW_COMPANIES = [
  // INDIA (80)
  { companyName:"Infosys", domain:"infosys.com", lat:12.97, lng:77.59, country:"India", city:"Bangalore", color:"#3b82f6" },
  { companyName:"Wipro", domain:"wipro.com", lat:12.85, lng:77.71, country:"India", city:"Bangalore", color:"#3b82f6" },
  { companyName:"Flipkart", domain:"flipkart.com", lat:13.02, lng:77.58, country:"India", city:"Bangalore", color:"#3b82f6" },
  { companyName:"Swiggy", domain:"swiggy.com", lat:12.93, lng:77.49, country:"India", city:"Bangalore", color:"#3b82f6" },
  { companyName:"Ola Cabs", domain:"ola.cabs", lat:13.06, lng:77.6, country:"India", city:"Bangalore", color:"#3b82f6" },
  { companyName:"Zerodha", domain:"zerodha.com", lat:12.88, lng:77.45, country:"India", city:"Bangalore", color:"#3b82f6" },
  { companyName:"Byju\'s", domain:"byjus.com", lat:12.8, lng:77.67, country:"India", city:"Bangalore", color:"#3b82f6" },
  { companyName:"Razorpay", domain:"razorpay.com", lat:13.1, lng:77.55, country:"India", city:"Bangalore", color:"#3b82f6" },
  { companyName:"Meesho", domain:"meesho.com", lat:12.76, lng:77.55, country:"India", city:"Bangalore", color:"#3b82f6" },
  { companyName:"PhonePe", domain:"phonepe.com", lat:12.95, lng:77.4, country:"India", city:"Bangalore", color:"#3b82f6" },
  { companyName:"Tech Mahindra", domain:"techmahindra.com", lat:17.43, lng:78.35, country:"India", city:"Hyderabad", color:"#3b82f6" },
  { companyName:"Dr Reddys", domain:"drreddys.com", lat:17.25, lng:78.55, country:"India", city:"Hyderabad", color:"#3b82f6" },
  { companyName:"ICICI Bank", domain:"icicibank.com", lat:17.5, lng:78.47, country:"India", city:"Hyderabad", color:"#3b82f6" },
  { companyName:"MakeMyTrip", domain:"makemytrip.com", lat:17.37, lng:78.6, country:"India", city:"Hyderabad", color:"#3b82f6" },
  { companyName:"Cyient", domain:"cyient.com", lat:17.2, lng:78.4, country:"India", city:"Hyderabad", color:"#3b82f6" },
  { companyName:"TCS", domain:"tcs.com", lat:19.08, lng:72.88, country:"India", city:"Mumbai", color:"#3b82f6" },
  { companyName:"Reliance", domain:"ril.com", lat:19.22, lng:72.95, country:"India", city:"Mumbai", color:"#3b82f6" },
  { companyName:"HDFC Bank", domain:"hdfcbank.com", lat:19.0, lng:73.02, country:"India", city:"Mumbai", color:"#3b82f6" },
  { companyName:"Kotak Mahindra", domain:"kotak.com", lat:18.95, lng:72.82, country:"India", city:"Mumbai", color:"#3b82f6" },
  { companyName:"Godrej", domain:"godrej.com", lat:19.15, lng:72.75, country:"India", city:"Mumbai", color:"#3b82f6" },
  { companyName:"Bajaj Finance", domain:"bajajfinserv.in", lat:19.3, lng:72.88, country:"India", city:"Mumbai", color:"#3b82f6" },
  { companyName:"Axis Bank", domain:"axisbank.com", lat:18.88, lng:72.98, country:"India", city:"Mumbai", color:"#3b82f6" },
  { companyName:"L&T", domain:"larsentoubro.com", lat:19.1, lng:73.1, country:"India", city:"Mumbai", color:"#3b82f6" },
  { companyName:"Paytm", domain:"paytm.com", lat:28.54, lng:77.39, country:"India", city:"Noida", color:"#3b82f6" },
  { companyName:"Zomato", domain:"zomato.com", lat:28.47, lng:77.03, country:"India", city:"Gurgaon", color:"#3b82f6" },
  { companyName:"Airtel", domain:"airtel.in", lat:28.61, lng:77.21, country:"India", city:"New Delhi", color:"#3b82f6" },
  { companyName:"Lenskart", domain:"lenskart.com", lat:28.4, lng:77.31, country:"India", city:"Faridabad", color:"#3b82f6" },
  { companyName:"IndiGo", domain:"goindigo.in", lat:28.65, lng:77.12, country:"India", city:"New Delhi", color:"#3b82f6" },
  { companyName:"HCL Tech", domain:"hcltech.com", lat:28.73, lng:77.1, country:"India", city:"Noida", color:"#3b82f6" },
  { companyName:"Snapdeal", domain:"snapdeal.com", lat:28.57, lng:77.32, country:"India", city:"New Delhi", color:"#3b82f6" },
  { companyName:"Info Edge", domain:"infoedge.in", lat:28.49, lng:77.42, country:"India", city:"Noida", color:"#3b82f6" },
  { companyName:"Persistent", domain:"persistent.com", lat:18.52, lng:73.86, country:"India", city:"Pune", color:"#3b82f6" },
  { companyName:"Cummins India", domain:"cummins.com", lat:18.43, lng:73.95, country:"India", city:"Pune", color:"#3b82f6" },
  { companyName:"Thermax", domain:"thermax.com", lat:18.6, lng:73.78, country:"India", city:"Pune", color:"#3b82f6" },
  { companyName:"SBI", domain:"sbi.co.in", lat:25.32, lng:83.0, country:"India", city:"Varanasi", color:"#3b82f6" },
  { companyName:"Tata Motors", domain:"tatamotors.com", lat:22.8, lng:86.18, country:"India", city:"Jamshedpur", color:"#3b82f6" },
  { companyName:"Mahindra", domain:"mahindra.com", lat:19.99, lng:73.79, country:"India", city:"Nashik", color:"#3b82f6" },
  { companyName:"Coal India", domain:"coalindia.in", lat:22.57, lng:88.36, country:"India", city:"Kolkata", color:"#3b82f6" },
  { companyName:"ONGC", domain:"ongcindia.com", lat:23.02, lng:72.57, country:"India", city:"Ahmedabad", color:"#3b82f6" },
  { companyName:"Adani Ports", domain:"adaniports.com", lat:22.3, lng:70.8, country:"India", city:"Mundra", color:"#3b82f6" },
  { companyName:"Titan", domain:"titanworld.com", lat:11.0, lng:76.96, country:"India", city:"Coimbatore", color:"#3b82f6" },
  { companyName:"TVS Motor", domain:"tvsmotor.com", lat:10.8, lng:78.69, country:"India", city:"Tiruchirappalli", color:"#3b82f6" },
  { companyName:"Mphasis", domain:"mphasis.com", lat:12.7, lng:77.78, country:"India", city:"Bangalore", color:"#3b82f6" },
  { companyName:"Hexaware", domain:"hexaware.com", lat:19.35, lng:72.83, country:"India", city:"Mumbai", color:"#3b82f6" },
  { companyName:"Mindtree", domain:"mindtree.com", lat:12.83, lng:77.5, country:"India", city:"Bangalore", color:"#3b82f6" },
  { companyName:"Freshworks", domain:"freshworks.com", lat:13.08, lng:80.27, country:"India", city:"Chennai", color:"#3b82f6" },
  { companyName:"Zoho", domain:"zoho.com", lat:12.82, lng:80.21, country:"India", city:"Chennai", color:"#3b82f6" },
  { companyName:"Delhivery", domain:"delhivery.com", lat:28.55, lng:77.23, country:"India", city:"Gurgaon", color:"#3b82f6" },
  { companyName:"Nykaa", domain:"nykaa.com", lat:19.12, lng:72.92, country:"India", city:"Mumbai", color:"#3b82f6" },
  { companyName:"PolicyBazaar", domain:"policybazaar.com", lat:28.5, lng:77.37, country:"India", city:"Gurgaon", color:"#3b82f6" },
  { companyName:"Cars24", domain:"cars24.com", lat:28.42, lng:77.05, country:"India", city:"Gurgaon", color:"#3b82f6" },
  { companyName:"Oyo Rooms", domain:"oyorooms.com", lat:28.63, lng:77.17, country:"India", city:"New Delhi", color:"#3b82f6" },
  { companyName:"Dream11", domain:"dream11.com", lat:19.05, lng:72.82, country:"India", city:"Mumbai", color:"#3b82f6" },
  { companyName:"CRED", domain:"cred.club", lat:12.92, lng:77.65, country:"India", city:"Bangalore", color:"#3b82f6" },
  { companyName:"BharatPe", domain:"bharatpe.com", lat:28.58, lng:77.2, country:"India", city:"New Delhi", color:"#3b82f6" },
  { companyName:"Groww", domain:"groww.in", lat:12.9, lng:77.68, country:"India", city:"Bangalore", color:"#3b82f6" },
  { companyName:"Vedantu", domain:"vedantu.com", lat:12.96, lng:77.48, country:"India", city:"Bangalore", color:"#3b82f6" },
  { companyName:"Unacademy", domain:"unacademy.com", lat:13.03, lng:77.54, country:"India", city:"Bangalore", color:"#3b82f6" },
  { companyName:"UpGrad", domain:"upgrad.com", lat:19.17, lng:72.85, country:"India", city:"Mumbai", color:"#3b82f6" },
  { companyName:"Simplilearn", domain:"simplilearn.com", lat:12.88, lng:77.62, country:"India", city:"Bangalore", color:"#3b82f6" },
  { companyName:"Practo", domain:"practo.com", lat:12.79, lng:77.53, country:"India", city:"Bangalore", color:"#3b82f6" },
  { companyName:"1mg", domain:"1mg.com", lat:28.46, lng:77.1, country:"India", city:"Gurgaon", color:"#3b82f6" },
  { companyName:"Pharmeasy", domain:"pharmeasy.in", lat:19.19, lng:72.97, country:"India", city:"Mumbai", color:"#3b82f6" },
  { companyName:"ShareChat", domain:"sharechat.com", lat:12.78, lng:77.6, country:"India", city:"Bangalore", color:"#3b82f6" },
  { companyName:"InMobi", domain:"inmobi.com", lat:12.95, lng:77.55, country:"India", city:"Bangalore", color:"#3b82f6" },
  { companyName:"Ather Energy", domain:"atherenergy.com", lat:13.05, lng:77.57, country:"India", city:"Bangalore", color:"#3b82f6" },
  { companyName:"Ola Electric", domain:"olaelectric.com", lat:12.72, lng:77.63, country:"India", city:"Bangalore", color:"#3b82f6" },
  { companyName:"Urban Company", domain:"urbancompany.com", lat:28.44, lng:77.08, country:"India", city:"Gurgaon", color:"#3b82f6" },
  { companyName:"Dunzo", domain:"dunzo.com", lat:13.0, lng:77.65, country:"India", city:"Bangalore", color:"#3b82f6" },
  { companyName:"Rapido", domain:"rapido.bike", lat:12.74, lng:77.57, country:"India", city:"Bangalore", color:"#3b82f6" },
  { companyName:"Porter", domain:"porter.in", lat:12.84, lng:77.65, country:"India", city:"Bangalore", color:"#3b82f6" },
  { companyName:"BlackBuck", domain:"blackbuck.com", lat:12.82, lng:77.72, country:"India", city:"Bangalore", color:"#3b82f6" },
  { companyName:"Rivigo", domain:"rivigo.com", lat:28.45, lng:77.09, country:"India", city:"Gurgaon", color:"#3b82f6" },
  { companyName:"Moglix", domain:"moglix.com", lat:28.52, lng:77.41, country:"India", city:"Noida", color:"#3b82f6" },
  { companyName:"Udaan", domain:"udaan.com", lat:12.87, lng:77.56, country:"India", city:"Bangalore", color:"#3b82f6" },
  { companyName:"Juspay", domain:"juspay.in", lat:12.99, lng:77.62, country:"India", city:"Bangalore", color:"#3b82f6" },
  { companyName:"Clevertap", domain:"clevertap.com", lat:19.13, lng:72.94, country:"India", city:"Mumbai", color:"#3b82f6" },
  { companyName:"Postman", domain:"postman.com", lat:12.86, lng:77.69, country:"India", city:"Bangalore", color:"#3b82f6" },

  // USA (100)
  { companyName:"Google", domain:"google.com", lat:37.42, lng:-122.08, country:"USA", city:"Mountain View", color:"#f59e0b" },
  { companyName:"Apple", domain:"apple.com", lat:37.33, lng:-122.01, country:"USA", city:"Cupertino", color:"#f59e0b" },
  { companyName:"Meta", domain:"meta.com", lat:37.48, lng:-122.15, country:"USA", city:"Menlo Park", color:"#f59e0b" },
  { companyName:"Netflix", domain:"netflix.com", lat:37.26, lng:-121.96, country:"USA", city:"Los Gatos", color:"#f59e0b" },
  { companyName:"Salesforce", domain:"salesforce.com", lat:37.79, lng:-122.4, country:"USA", city:"San Francisco", color:"#f59e0b" },
  { companyName:"Uber", domain:"uber.com", lat:37.77, lng:-122.42, country:"USA", city:"San Francisco", color:"#f59e0b" },
  { companyName:"Airbnb", domain:"airbnb.com", lat:37.75, lng:-122.43, country:"USA", city:"San Francisco", color:"#f59e0b" },
  { companyName:"Twitter", domain:"x.com", lat:37.78, lng:-122.39, country:"USA", city:"San Francisco", color:"#f59e0b" },
  { companyName:"Stripe", domain:"stripe.com", lat:37.8, lng:-122.44, country:"USA", city:"San Francisco", color:"#f59e0b" },
  { companyName:"Lyft", domain:"lyft.com", lat:37.76, lng:-122.41, country:"USA", city:"San Francisco", color:"#f59e0b" },
  { companyName:"Dropbox", domain:"dropbox.com", lat:37.74, lng:-122.45, country:"USA", city:"San Francisco", color:"#f59e0b" },
  { companyName:"Palantir", domain:"palantir.com", lat:37.72, lng:-122.4, country:"USA", city:"San Francisco", color:"#f59e0b" },
  { companyName:"Twilio", domain:"twilio.com", lat:37.7, lng:-122.42, country:"USA", city:"San Francisco", color:"#f59e0b" },
  { companyName:"Cloudflare", domain:"cloudflare.com", lat:37.68, lng:-122.44, country:"USA", city:"San Francisco", color:"#f59e0b" },
  { companyName:"Pinterest", domain:"pinterest.com", lat:37.66, lng:-122.43, country:"USA", city:"San Francisco", color:"#f59e0b" },
  { companyName:"Slack", domain:"slack.com", lat:37.64, lng:-122.41, country:"USA", city:"San Francisco", color:"#f59e0b" },
  { companyName:"DocuSign", domain:"docusign.com", lat:37.62, lng:-122.39, country:"USA", city:"San Francisco", color:"#f59e0b" },
  { companyName:"Okta", domain:"okta.com", lat:37.60, lng:-122.43, country:"USA", city:"San Francisco", color:"#f59e0b" },
  { companyName:"Zoom", domain:"zoom.us", lat:37.37, lng:-122.03, country:"USA", city:"San Jose", color:"#f59e0b" },
  { companyName:"Cisco", domain:"cisco.com", lat:37.35, lng:-121.99, country:"USA", city:"San Jose", color:"#f59e0b" },
  { companyName:"Adobe", domain:"adobe.com", lat:37.33, lng:-121.89, country:"USA", city:"San Jose", color:"#f59e0b" },
  { companyName:"eBay", domain:"ebay.com", lat:37.4, lng:-121.97, country:"USA", city:"San Jose", color:"#f59e0b" },
  { companyName:"PayPal", domain:"paypal.com", lat:37.38, lng:-122.05, country:"USA", city:"San Jose", color:"#f59e0b" },
  { companyName:"AMD", domain:"amd.com", lat:37.32, lng:-121.97, country:"USA", city:"Santa Clara", color:"#f59e0b" },
  { companyName:"Intel", domain:"intel.com", lat:37.39, lng:-121.96, country:"USA", city:"Santa Clara", color:"#f59e0b" },
  { companyName:"Nvidia", domain:"nvidia.com", lat:37.37, lng:-122.04, country:"USA", city:"Santa Clara", color:"#f59e0b" },
  { companyName:"HP", domain:"hp.com", lat:37.39, lng:-122.09, country:"USA", city:"Palo Alto", color:"#f59e0b" },
  { companyName:"Tesla", domain:"tesla.com", lat:37.3, lng:-122.05, country:"USA", city:"Fremont", color:"#f59e0b" },
  { companyName:"ServiceNow", domain:"servicenow.com", lat:37.52, lng:-122.03, country:"USA", city:"Santa Clara", color:"#f59e0b" },
  { companyName:"Workday", domain:"workday.com", lat:37.54, lng:-122.06, country:"USA", city:"Pleasanton", color:"#f59e0b" },
  { companyName:"Amazon", domain:"amazon.com", lat:47.6, lng:-122.33, country:"USA", city:"Seattle", color:"#f59e0b" },
  { companyName:"Microsoft", domain:"microsoft.com", lat:47.64, lng:-122.13, country:"USA", city:"Redmond", color:"#f59e0b" },
  { companyName:"Boeing", domain:"boeing.com", lat:47.55, lng:-122.34, country:"USA", city:"Seattle", color:"#f59e0b" },
  { companyName:"Starbucks", domain:"starbucks.com", lat:47.58, lng:-122.37, country:"USA", city:"Seattle", color:"#f59e0b" },
  { companyName:"Expedia", domain:"expedia.com", lat:47.62, lng:-122.35, country:"USA", city:"Seattle", color:"#f59e0b" },
  { companyName:"Zillow", domain:"zillow.com", lat:47.65, lng:-122.39, country:"USA", city:"Seattle", color:"#f59e0b" },
  { companyName:"T-Mobile", domain:"t-mobile.com", lat:47.67, lng:-122.31, country:"USA", city:"Bellevue", color:"#f59e0b" },
  { companyName:"Snap", domain:"snap.com", lat:34.03, lng:-118.47, country:"USA", city:"Santa Monica", color:"#f59e0b" },
  { companyName:"Hulu", domain:"hulu.com", lat:34.01, lng:-118.49, country:"USA", city:"Santa Monica", color:"#f59e0b" },
  { companyName:"SpaceX", domain:"spacex.com", lat:33.93, lng:-118.33, country:"USA", city:"Hawthorne", color:"#f59e0b" },
  { companyName:"Disney", domain:"disney.com", lat:33.81, lng:-117.92, country:"USA", city:"Anaheim", color:"#f59e0b" },
  { companyName:"Qualcomm", domain:"qualcomm.com", lat:32.88, lng:-117.22, country:"USA", city:"San Diego", color:"#f59e0b" },
  { companyName:"Riot Games", domain:"riotgames.com", lat:34.08, lng:-118.39, country:"USA", city:"Los Angeles", color:"#f59e0b" },
  { companyName:"Activision", domain:"activision.com", lat:34.06, lng:-118.36, country:"USA", city:"Los Angeles", color:"#f59e0b" },
  { companyName:"JPMorgan", domain:"jpmorganchase.com", lat:40.71, lng:-74.01, country:"USA", city:"New York", color:"#f59e0b" },
  { companyName:"Goldman Sachs", domain:"goldmansachs.com", lat:40.75, lng:-74.02, country:"USA", city:"New York", color:"#f59e0b" },
  { companyName:"Morgan Stanley", domain:"morganstanley.com", lat:40.76, lng:-73.98, country:"USA", city:"New York", color:"#f59e0b" },
  { companyName:"Citigroup", domain:"citi.com", lat:40.72, lng:-74.0, country:"USA", city:"New York", color:"#f59e0b" },
  { companyName:"Bloomberg", domain:"bloomberg.com", lat:40.78, lng:-73.97, country:"USA", city:"New York", color:"#f59e0b" },
  { companyName:"Pfizer", domain:"pfizer.com", lat:40.77, lng:-73.96, country:"USA", city:"New York", color:"#f59e0b" },
  { companyName:"IBM", domain:"ibm.com", lat:40.8, lng:-74.04, country:"USA", city:"New York", color:"#f59e0b" },
  { companyName:"Verizon", domain:"verizon.com", lat:40.73, lng:-74.03, country:"USA", city:"New York", color:"#f59e0b" },
  { companyName:"Etsy", domain:"etsy.com", lat:40.69, lng:-73.99, country:"USA", city:"Brooklyn", color:"#f59e0b" },
  { companyName:"Datadog", domain:"datadoghq.com", lat:40.75, lng:-73.97, country:"USA", city:"New York", color:"#f59e0b" },
  { companyName:"Compass", domain:"compass.com", lat:40.71, lng:-74.02, country:"USA", city:"New York", color:"#f59e0b" },
  { companyName:"Peloton", domain:"onepeloton.com", lat:40.74, lng:-74.0, country:"USA", city:"New York", color:"#f59e0b" },
  { companyName:"Warby Parker", domain:"warbyparker.com", lat:40.73, lng:-74.0, country:"USA", city:"New York", color:"#f59e0b" },
  { companyName:"Betterment", domain:"betterment.com", lat:40.72, lng:-73.97, country:"USA", city:"New York", color:"#f59e0b" },
  { companyName:"Oscar Health", domain:"hioscar.com", lat:40.73, lng:-74.02, country:"USA", city:"New York", color:"#f59e0b" },
  { companyName:"HubSpot", domain:"hubspot.com", lat:42.37, lng:-71.1, country:"USA", city:"Boston", color:"#f59e0b" },
  { companyName:"Akamai", domain:"akamai.com", lat:42.35, lng:-71.05, country:"USA", city:"Cambridge", color:"#f59e0b" },
  { companyName:"Wayfair", domain:"wayfair.com", lat:42.34, lng:-71.08, country:"USA", city:"Boston", color:"#f59e0b" },
  { companyName:"Boston Dynamics", domain:"bostondynamics.com", lat:42.36, lng:-71.06, country:"USA", city:"Waltham", color:"#f59e0b" },
  { companyName:"Capital One", domain:"capitalone.com", lat:38.91, lng:-77.23, country:"USA", city:"McLean", color:"#f59e0b" },
  { companyName:"Booz Allen", domain:"boozallen.com", lat:38.9, lng:-77.04, country:"USA", city:"McLean", color:"#f59e0b" },
  { companyName:"Leidos", domain:"leidos.com", lat:38.88, lng:-77.18, country:"USA", city:"Reston", color:"#f59e0b" },
  { companyName:"McDonald's", domain:"mcdonalds.com", lat:41.88, lng:-87.63, country:"USA", city:"Chicago", color:"#f59e0b" },
  { companyName:"Motorola", domain:"motorola.com", lat:41.86, lng:-87.67, country:"USA", city:"Chicago", color:"#f59e0b" },
  { companyName:"Groupon", domain:"groupon.com", lat:41.89, lng:-87.64, country:"USA", city:"Chicago", color:"#f59e0b" },
  { companyName:"Walgreens", domain:"walgreens.com", lat:42.0, lng:-87.9, country:"USA", city:"Deerfield", color:"#f59e0b" },
  { companyName:"United Airlines", domain:"united.com", lat:41.98, lng:-87.91, country:"USA", city:"Chicago", color:"#f59e0b" },
  { companyName:"Dell", domain:"dell.com", lat:30.27, lng:-97.74, country:"USA", city:"Austin", color:"#f59e0b" },
  { companyName:"Indeed", domain:"indeed.com", lat:30.27, lng:-97.71, country:"USA", city:"Austin", color:"#f59e0b" },
  { companyName:"AT&T", domain:"att.com", lat:32.77, lng:-96.8, country:"USA", city:"Dallas", color:"#f59e0b" },
  { companyName:"Southwest Air", domain:"southwest.com", lat:32.75, lng:-97.06, country:"USA", city:"Dallas", color:"#f59e0b" },
  { companyName:"Texas Instruments", domain:"ti.com", lat:32.88, lng:-96.77, country:"USA", city:"Dallas", color:"#f59e0b" },
  { companyName:"ExxonMobil", domain:"exxonmobil.com", lat:29.76, lng:-95.37, country:"USA", city:"Houston", color:"#f59e0b" },
  { companyName:"ConocoPhillips", domain:"conocophillips.com", lat:29.78, lng:-95.4, country:"USA", city:"Houston", color:"#f59e0b" },
  { companyName:"Schlumberger", domain:"slb.com", lat:29.8, lng:-95.39, country:"USA", city:"Houston", color:"#f59e0b" },
  { companyName:"Walmart", domain:"walmart.com", lat:36.35, lng:-94.21, country:"USA", city:"Bentonville", color:"#f59e0b" },
  { companyName:"FedEx", domain:"fedex.com", lat:35.22, lng:-89.85, country:"USA", city:"Memphis", color:"#f59e0b" },
  { companyName:"Carvana", domain:"carvana.com", lat:33.5, lng:-112.12, country:"USA", city:"Phoenix", color:"#f59e0b" },
  { companyName:"Charles Schwab", domain:"schwab.com", lat:39.73, lng:-104.98, country:"USA", city:"Denver", color:"#f59e0b" },
  { companyName:"Oracle", domain:"oracle.com", lat:30.25, lng:-97.77, country:"USA", city:"Austin", color:"#f59e0b" },
  { companyName:"Robinhood", domain:"robinhood.com", lat:37.44, lng:-122.17, country:"USA", city:"Menlo Park", color:"#f59e0b" },
  { companyName:"Coinbase", domain:"coinbase.com", lat:37.81, lng:-122.47, country:"USA", city:"San Francisco", color:"#f59e0b" },
  { companyName:"DoorDash", domain:"doordash.com", lat:37.83, lng:-122.46, country:"USA", city:"San Francisco", color:"#f59e0b" },
  { companyName:"Instacart", domain:"instacart.com", lat:37.85, lng:-122.44, country:"USA", city:"San Francisco", color:"#f59e0b" },
  { companyName:"Plaid", domain:"plaid.com", lat:37.74, lng:-122.44, country:"USA", city:"San Francisco", color:"#f59e0b" },
  { companyName:"Brex", domain:"brex.com", lat:37.72, lng:-122.46, country:"USA", city:"San Francisco", color:"#f59e0b" },
  { companyName:"Chime", domain:"chime.com", lat:37.70, lng:-122.45, country:"USA", city:"San Francisco", color:"#f59e0b" },
  { companyName:"Discord", domain:"discord.com", lat:37.68, lng:-122.43, country:"USA", city:"San Francisco", color:"#f59e0b" },
  { companyName:"Figma", domain:"figma.com", lat:37.66, lng:-122.41, country:"USA", city:"San Francisco", color:"#f59e0b" },
  { companyName:"Notion", domain:"notion.so", lat:37.64, lng:-122.39, country:"USA", city:"San Francisco", color:"#f59e0b" },

  // UK (30)
  { companyName:"HSBC", domain:"hsbc.com", lat:51.51, lng:-0.13, country:"UK", city:"London", color:"#10b981" },
  { companyName:"BP", domain:"bp.com", lat:51.49, lng:-0.18, country:"UK", city:"London", color:"#10b981" },
  { companyName:"Unilever", domain:"unilever.com", lat:51.52, lng:-0.07, country:"UK", city:"London", color:"#10b981" },
  { companyName:"GSK", domain:"gsk.com", lat:51.54, lng:-0.2, country:"UK", city:"London", color:"#10b981" },
  { companyName:"AstraZeneca", domain:"astrazeneca.com", lat:51.53, lng:-0.12, country:"UK", city:"London", color:"#10b981" },
  { companyName:"Barclays", domain:"barclays.com", lat:51.51, lng:-0.09, country:"UK", city:"London", color:"#10b981" },
  { companyName:"Lloyds Bank", domain:"lloydsbank.com", lat:51.5, lng:-0.1, country:"UK", city:"London", color:"#10b981" },
  { companyName:"NatWest", domain:"natwest.com", lat:51.48, lng:-0.11, country:"UK", city:"London", color:"#10b981" },
  { companyName:"Rolls Royce", domain:"rolls-royce.com", lat:51.55, lng:-0.15, country:"UK", city:"London", color:"#10b981" },
  { companyName:"BAE Systems", domain:"baesystems.com", lat:51.46, lng:-0.16, country:"UK", city:"London", color:"#10b981" },
  { companyName:"Sky", domain:"sky.com", lat:51.5, lng:-0.22, country:"UK", city:"London", color:"#10b981" },
  { companyName:"BT Group", domain:"bt.com", lat:51.52, lng:-0.06, country:"UK", city:"London", color:"#10b981" },
  { companyName:"Arm Holdings", domain:"arm.com", lat:52.21, lng:0.09, country:"UK", city:"Cambridge", color:"#10b981" },
  { companyName:"Darktrace", domain:"darktrace.com", lat:52.19, lng:0.1, country:"UK", city:"Cambridge", color:"#10b981" },
  { companyName:"Vodafone", domain:"vodafone.com", lat:51.38, lng:-1.3, country:"UK", city:"Newbury", color:"#10b981" },
  { companyName:"Dyson", domain:"dyson.com", lat:51.4, lng:-2.36, country:"UK", city:"Bristol", color:"#10b981" },
  { companyName:"EasyJet", domain:"easyjet.com", lat:51.88, lng:-0.37, country:"UK", city:"Luton", color:"#10b981" },
  { companyName:"ASOS", domain:"asos.com", lat:51.56, lng:-0.11, country:"UK", city:"London", color:"#10b981" },
  { companyName:"Deliveroo", domain:"deliveroo.co.uk", lat:51.44, lng:-0.14, country:"UK", city:"London", color:"#10b981" },
  { companyName:"Monzo", domain:"monzo.com", lat:51.53, lng:-0.1, country:"UK", city:"London", color:"#10b981" },
  { companyName:"Revolut", domain:"revolut.com", lat:51.42, lng:-0.09, country:"UK", city:"London", color:"#10b981" },
  { companyName:"Wise", domain:"wise.com", lat:51.45, lng:-0.11, country:"UK", city:"London", color:"#10b981" },
  { companyName:"Ocado", domain:"ocado.com", lat:51.75, lng:-0.23, country:"UK", city:"Hatfield", color:"#10b981" },
  { companyName:"Just Eat", domain:"just-eat.co.uk", lat:53.48, lng:-2.24, country:"UK", city:"Manchester", color:"#10b981" },
  { companyName:"AutoTrader", domain:"autotrader.co.uk", lat:53.47, lng:-2.26, country:"UK", city:"Manchester", color:"#10b981" },
  { companyName:"OVO Energy", domain:"ovoenergy.com", lat:51.45, lng:-2.6, country:"UK", city:"Bristol", color:"#10b981" },
  { companyName:"Featurespace", domain:"featurespace.com", lat:52.22, lng:0.15, country:"UK", city:"Cambridge", color:"#10b981" },
  { companyName:"Interactive Investor", domain:"ii.co.uk", lat:53.47, lng:-2.23, country:"UK", city:"Manchester", color:"#10b981" },
  { companyName:"Starling Bank", domain:"starlingbank.com", lat:51.47, lng:-0.13, country:"UK", city:"London", color:"#10b981" },
  { companyName:"OakNorth", domain:"oaknorth.com", lat:51.43, lng:-0.12, country:"UK", city:"London", color:"#10b981" },

  // Germany (25)
  { companyName:"Siemens", domain:"siemens.com", lat:48.14, lng:11.58, country:"Germany", city:"Munich", color:"#8b5cf6" },
  { companyName:"BMW", domain:"bmw.com", lat:48.17, lng:11.55, country:"Germany", city:"Munich", color:"#8b5cf6" },
  { companyName:"Allianz", domain:"allianz.com", lat:48.12, lng:11.62, country:"Germany", city:"Munich", color:"#8b5cf6" },
  { companyName:"SAP", domain:"sap.com", lat:49.3, lng:8.64, country:"Germany", city:"Walldorf", color:"#8b5cf6" },
  { companyName:"Deutsche Bank", domain:"db.com", lat:50.11, lng:8.68, country:"Germany", city:"Frankfurt", color:"#8b5cf6" },
  { companyName:"Commerzbank", domain:"commerzbank.com", lat:50.13, lng:8.66, country:"Germany", city:"Frankfurt", color:"#8b5cf6" },
  { companyName:"Lufthansa", domain:"lufthansa.com", lat:50.03, lng:8.57, country:"Germany", city:"Frankfurt", color:"#8b5cf6" },
  { companyName:"Volkswagen", domain:"volkswagen.com", lat:52.43, lng:10.79, country:"Germany", city:"Wolfsburg", color:"#8b5cf6" },
  { companyName:"Porsche", domain:"porsche.com", lat:48.83, lng:9.15, country:"Germany", city:"Stuttgart", color:"#8b5cf6" },
  { companyName:"Mercedes-Benz", domain:"mercedes-benz.com", lat:48.78, lng:9.18, country:"Germany", city:"Stuttgart", color:"#8b5cf6" },
  { companyName:"Bosch", domain:"bosch.com", lat:48.75, lng:9.1, country:"Germany", city:"Stuttgart", color:"#8b5cf6" },
  { companyName:"Delivery Hero", domain:"deliveryhero.com", lat:52.5, lng:13.42, country:"Germany", city:"Berlin", color:"#8b5cf6" },
  { companyName:"Zalando", domain:"zalando.com", lat:52.54, lng:13.38, country:"Germany", city:"Berlin", color:"#8b5cf6" },
  { companyName:"HelloFresh", domain:"hellofresh.com", lat:52.48, lng:13.44, country:"Germany", city:"Berlin", color:"#8b5cf6" },
  { companyName:"N26", domain:"n26.com", lat:52.55, lng:13.36, country:"Germany", city:"Berlin", color:"#8b5cf6" },
  { companyName:"FlixBus", domain:"flixbus.com", lat:48.16, lng:11.5, country:"Germany", city:"Munich", color:"#8b5cf6" },
  { companyName:"Adidas", domain:"adidas.com", lat:49.56, lng:10.88, country:"Germany", city:"Herzogenaurach", color:"#8b5cf6" },
  { companyName:"Puma", domain:"puma.com", lat:49.55, lng:10.9, country:"Germany", city:"Herzogenaurach", color:"#8b5cf6" },
  { companyName:"Otto Group", domain:"ottogroup.com", lat:53.57, lng:10.02, country:"Germany", city:"Hamburg", color:"#8b5cf6" },
  { companyName:"Hapag-Lloyd", domain:"hapag-lloyd.com", lat:53.53, lng:9.98, country:"Germany", city:"Hamburg", color:"#8b5cf6" },
  { companyName:"Xing", domain:"xing.com", lat:53.55, lng:10.0, country:"Germany", city:"Hamburg", color:"#8b5cf6" },
  { companyName:"Celonis", domain:"celonis.com", lat:48.12, lng:11.6, country:"Germany", city:"Munich", color:"#8b5cf6" },
  { companyName:"TeamViewer", domain:"teamviewer.com", lat:48.42, lng:9.96, country:"Germany", city:"Goppingen", color:"#8b5cf6" },
  { companyName:"Personio", domain:"personio.com", lat:48.15, lng:11.57, country:"Germany", city:"Munich", color:"#8b5cf6" },
  { companyName:"Wirecard", domain:"wirecard.com", lat:48.11, lng:11.64, country:"Germany", city:"Munich", color:"#8b5cf6" },

  // France (20)
  { companyName:"L'Oreal", domain:"loreal.com", lat:48.86, lng:2.35, country:"France", city:"Paris", color:"#ec4899" },
  { companyName:"LVMH", domain:"lvmh.com", lat:48.88, lng:2.38, country:"France", city:"Paris", color:"#ec4899" },
  { companyName:"Hermes", domain:"hermes.com", lat:48.85, lng:2.3, country:"France", city:"Paris", color:"#ec4899" },
  { companyName:"BNP Paribas", domain:"bnpparibas.com", lat:48.87, lng:2.33, country:"France", city:"Paris", color:"#ec4899" },
  { companyName:"AXA", domain:"axa.com", lat:48.84, lng:2.32, country:"France", city:"Paris", color:"#ec4899" },
  { companyName:"TotalEnergies", domain:"totalenergies.com", lat:48.9, lng:2.29, country:"France", city:"Paris", color:"#ec4899" },
  { companyName:"Renault", domain:"renault.com", lat:48.83, lng:2.37, country:"France", city:"Boulogne", color:"#ec4899" },
  { companyName:"Orange", domain:"orange.com", lat:48.91, lng:2.4, country:"France", city:"Paris", color:"#ec4899" },
  { companyName:"Capgemini", domain:"capgemini.com", lat:48.89, lng:2.42, country:"France", city:"Paris", color:"#ec4899" },
  { companyName:"Dassault", domain:"dassault-aviation.com", lat:48.93, lng:2.47, country:"France", city:"Paris", color:"#ec4899" },
  { companyName:"Thales", domain:"thalesgroup.com", lat:48.8, lng:2.36, country:"France", city:"Paris", color:"#ec4899" },
  { companyName:"Sanofi", domain:"sanofi.com", lat:48.95, lng:2.3, country:"France", city:"Paris", color:"#ec4899" },
  { companyName:"Michelin", domain:"michelin.com", lat:45.78, lng:3.08, country:"France", city:"Clermont", color:"#ec4899" },
  { companyName:"Danone", domain:"danone.com", lat:48.97, lng:2.32, country:"France", city:"Paris", color:"#ec4899" },
  { companyName:"Carrefour", domain:"carrefour.com", lat:48.82, lng:2.45, country:"France", city:"Boulogne", color:"#ec4899" },
  { companyName:"Airbus", domain:"airbus.com", lat:43.6, lng:1.44, country:"France", city:"Toulouse", color:"#ec4899" },
  { companyName:"Safran", domain:"safran-group.com", lat:43.62, lng:1.47, country:"France", city:"Toulouse", color:"#ec4899" },
  { companyName:"Criteo", domain:"criteo.com", lat:48.78, lng:2.34, country:"France", city:"Paris", color:"#ec4899" },
  { companyName:"Doctolib", domain:"doctolib.fr", lat:48.76, lng:2.36, country:"France", city:"Paris", color:"#ec4899" },
  { companyName:"BlaBlaCar", domain:"blablacar.com", lat:48.74, lng:2.33, country:"France", city:"Paris", color:"#ec4899" },

  // Japan (25)
  { companyName:"Sony", domain:"sony.com", lat:35.69, lng:139.69, country:"Japan", city:"Tokyo", color:"#f97316" },
  { companyName:"SoftBank", domain:"softbank.jp", lat:35.72, lng:139.71, country:"Japan", city:"Tokyo", color:"#f97316" },
  { companyName:"NTT", domain:"ntt.co.jp", lat:35.68, lng:139.75, country:"Japan", city:"Tokyo", color:"#f97316" },
  { companyName:"Fujitsu", domain:"fujitsu.com", lat:35.65, lng:139.78, country:"Japan", city:"Tokyo", color:"#f97316" },
  { companyName:"Hitachi", domain:"hitachi.com", lat:35.71, lng:139.73, country:"Japan", city:"Tokyo", color:"#f97316" },
  { companyName:"Recruit", domain:"recruit.co.jp", lat:35.67, lng:139.72, country:"Japan", city:"Tokyo", color:"#f97316" },
  { companyName:"Rakuten", domain:"rakuten.co.jp", lat:35.64, lng:139.7, country:"Japan", city:"Tokyo", color:"#f97316" },
  { companyName:"Mercari", domain:"mercari.com", lat:35.66, lng:139.76, country:"Japan", city:"Tokyo", color:"#f97316" },
  { companyName:"Line Corp", domain:"linecorp.com", lat:35.7, lng:139.68, country:"Japan", city:"Tokyo", color:"#f97316" },
  { companyName:"DeNA", domain:"dena.com", lat:35.63, lng:139.74, country:"Japan", city:"Tokyo", color:"#f97316" },
  { companyName:"Bandai Namco", domain:"bandainamco.co.jp", lat:35.75, lng:139.69, country:"Japan", city:"Tokyo", color:"#f97316" },
  { companyName:"Konami", domain:"konami.com", lat:35.73, lng:139.72, country:"Japan", city:"Tokyo", color:"#f97316" },
  { companyName:"Square Enix", domain:"square-enix.com", lat:35.74, lng:139.65, country:"Japan", city:"Tokyo", color:"#f97316" },
  { companyName:"Toyota", domain:"toyota.com", lat:35.08, lng:137.15, country:"Japan", city:"Toyota City", color:"#f97316" },
  { companyName:"Denso", domain:"denso.com", lat:35.05, lng:137.18, country:"Japan", city:"Kariya", color:"#f97316" },
  { companyName:"Nintendo", domain:"nintendo.com", lat:34.69, lng:135.5, country:"Japan", city:"Osaka", color:"#f97316" },
  { companyName:"Panasonic", domain:"panasonic.com", lat:34.73, lng:135.49, country:"Japan", city:"Kadoma", color:"#f97316" },
  { companyName:"Sharp", domain:"sharp.co.jp", lat:34.75, lng:135.52, country:"Japan", city:"Osaka", color:"#f97316" },
  { companyName:"Kyocera", domain:"kyocera.com", lat:34.96, lng:135.76, country:"Japan", city:"Kyoto", color:"#f97316" },
  { companyName:"Murata", domain:"murata.com", lat:35.0, lng:135.79, country:"Japan", city:"Kyoto", color:"#f97316" },
  { companyName:"Honda", domain:"honda.com", lat:35.57, lng:139.65, country:"Japan", city:"Minato", color:"#f97316" },
  { companyName:"Yamaha", domain:"yamaha.com", lat:34.71, lng:137.73, country:"Japan", city:"Hamamatsu", color:"#f97316" },
  { companyName:"Fujifilm", domain:"fujifilm.com", lat:35.61, lng:139.67, country:"Japan", city:"Tokyo", color:"#f97316" },
  { companyName:"Canon", domain:"canon.com", lat:35.62, lng:139.72, country:"Japan", city:"Tokyo", color:"#f97316" },
  { companyName:"Nikon", domain:"nikon.com", lat:35.60, lng:139.66, country:"Japan", city:"Tokyo", color:"#f97316" },

  // China (30)
  { companyName:"Alibaba", domain:"alibaba.com", lat:30.27, lng:120.15, country:"China", city:"Hangzhou", color:"#ef4444" },
  { companyName:"Tencent", domain:"tencent.com", lat:22.55, lng:114.05, country:"China", city:"Shenzhen", color:"#ef4444" },
  { companyName:"Huawei", domain:"huawei.com", lat:22.58, lng:114.1, country:"China", city:"Shenzhen", color:"#ef4444" },
  { companyName:"DJI", domain:"dji.com", lat:22.6, lng:114.08, country:"China", city:"Shenzhen", color:"#ef4444" },
  { companyName:"BYD", domain:"byd.com", lat:22.62, lng:114.12, country:"China", city:"Shenzhen", color:"#ef4444" },
  { companyName:"OPPO", domain:"oppo.com", lat:22.64, lng:114.07, country:"China", city:"Dongguan", color:"#ef4444" },
  { companyName:"Meituan", domain:"meituan.com", lat:39.91, lng:116.39, country:"China", city:"Beijing", color:"#ef4444" },
  { companyName:"Baidu", domain:"baidu.com", lat:39.98, lng:116.31, country:"China", city:"Beijing", color:"#ef4444" },
  { companyName:"JD.com", domain:"jd.com", lat:39.95, lng:116.38, country:"China", city:"Beijing", color:"#ef4444" },
  { companyName:"ByteDance", domain:"bytedance.com", lat:39.9, lng:116.42, country:"China", city:"Beijing", color:"#ef4444" },
  { companyName:"Xiaomi", domain:"mi.com", lat:40.0, lng:116.33, country:"China", city:"Beijing", color:"#ef4444" },
  { companyName:"NetEase", domain:"netease.com", lat:23.12, lng:113.32, country:"China", city:"Guangzhou", color:"#ef4444" },
  { companyName:"Pinduoduo", domain:"pinduoduo.com", lat:31.23, lng:121.47, country:"China", city:"Shanghai", color:"#ef4444" },
  { companyName:"NIO", domain:"nio.com", lat:31.2, lng:121.44, country:"China", city:"Shanghai", color:"#ef4444" },
  { companyName:"Li Auto", domain:"lixiang.com", lat:39.93, lng:116.35, country:"China", city:"Beijing", color:"#ef4444" },
  { companyName:"Xpeng", domain:"xiaopeng.com", lat:23.17, lng:113.28, country:"China", city:"Guangzhou", color:"#ef4444" },
  { companyName:"CATL", domain:"catl.com", lat:26.08, lng:119.3, country:"China", city:"Ningde", color:"#ef4444" },
  { companyName:"Ant Group", domain:"antgroup.com", lat:30.25, lng:120.16, country:"China", city:"Hangzhou", color:"#ef4444" },
  { companyName:"Trip.com", domain:"trip.com", lat:31.22, lng:121.45, country:"China", city:"Shanghai", color:"#ef4444" },
  { companyName:"Ping An", domain:"pingan.com", lat:22.51, lng:113.93, country:"China", city:"Shenzhen", color:"#ef4444" },
  { companyName:"China Mobile", domain:"chinamobile.com", lat:39.88, lng:116.4, country:"China", city:"Beijing", color:"#ef4444" },
  { companyName:"Didi", domain:"didiglobal.com", lat:39.96, lng:116.37, country:"China", city:"Beijing", color:"#ef4444" },
  { companyName:"iQIYI", domain:"iqiyi.com", lat:40.02, lng:116.29, country:"China", city:"Beijing", color:"#ef4444" },
  { companyName:"Kuaishou", domain:"kuaishou.com", lat:40.03, lng:116.32, country:"China", city:"Beijing", color:"#ef4444" },
  { companyName:"Lenovo", domain:"lenovo.com", lat:39.94, lng:116.32, country:"China", city:"Beijing", color:"#ef4444" },
  { companyName:"Weibo", domain:"weibo.com", lat:31.25, lng:121.5, country:"China", city:"Shanghai", color:"#ef4444" },
  { companyName:"Mango TV", domain:"mgtv.com", lat:28.22, lng:112.94, country:"China", city:"Changsha", color:"#ef4444" },
  { companyName:"Geely", domain:"geely.com", lat:30.29, lng:120.16, country:"China", city:"Hangzhou", color:"#ef4444" },
  { companyName:"Vivo", domain:"vivo.com", lat:22.57, lng:114.15, country:"China", city:"Dongguan", color:"#ef4444" },
  { companyName:"OnePlus", domain:"oneplus.com", lat:22.50, lng:113.98, country:"China", city:"Shenzhen", color:"#ef4444" },

  // SE Asia (20)
  { companyName:"Shopee", domain:"shopee.com", lat:1.29, lng:103.85, country:"Singapore", city:"Singapore", color:"#06b6d4" },
  { companyName:"Grab", domain:"grab.com", lat:1.32, lng:103.88, country:"Singapore", city:"Singapore", color:"#06b6d4" },
  { companyName:"Sea Limited", domain:"sea.com", lat:1.27, lng:103.81, country:"Singapore", city:"Singapore", color:"#06b6d4" },
  { companyName:"Lazada", domain:"lazada.com", lat:1.3, lng:103.9, country:"Singapore", city:"Singapore", color:"#06b6d4" },
  { companyName:"Razer", domain:"razer.com", lat:1.28, lng:103.83, country:"Singapore", city:"Singapore", color:"#06b6d4" },
  { companyName:"Gojek", domain:"gojek.com", lat:-6.21, lng:106.85, country:"Indonesia", city:"Jakarta", color:"#06b6d4" },
  { companyName:"Tokopedia", domain:"tokopedia.com", lat:-6.18, lng:106.83, country:"Indonesia", city:"Jakarta", color:"#06b6d4" },
  { companyName:"Traveloka", domain:"traveloka.com", lat:-6.22, lng:106.82, country:"Indonesia", city:"Jakarta", color:"#06b6d4" },
  { companyName:"Bukalapak", domain:"bukalapak.com", lat:-6.2, lng:106.81, country:"Indonesia", city:"Jakarta", color:"#06b6d4" },
  { companyName:"VNG", domain:"vng.com.vn", lat:10.76, lng:106.7, country:"Vietnam", city:"Ho Chi Minh", color:"#06b6d4" },
  { companyName:"Momo Vietnam", domain:"momo.vn", lat:10.73, lng:106.68, country:"Vietnam", city:"Ho Chi Minh", color:"#06b6d4" },
  { companyName:"True Money", domain:"truemoney.com", lat:13.75, lng:100.52, country:"Thailand", city:"Bangkok", color:"#06b6d4" },
  { companyName:"Carsome", domain:"carsome.com", lat:3.12, lng:101.65, country:"Malaysia", city:"Kuala Lumpur", color:"#06b6d4" },
  { companyName:"Ninja Van", domain:"ninjavan.com", lat:1.35, lng:103.82, country:"Singapore", city:"Singapore", color:"#06b6d4" },
  { companyName:"PropertyGuru", domain:"propertyguru.com.sg", lat:1.26, lng:103.8, country:"Singapore", city:"Singapore", color:"#06b6d4" },
  { companyName:"Kredivo", domain:"kredivo.com", lat:-6.17, lng:106.86, country:"Indonesia", city:"Jakarta", color:"#06b6d4" },
  { companyName:"Xendit", domain:"xendit.co", lat:-6.23, lng:106.88, country:"Indonesia", city:"Jakarta", color:"#06b6d4" },
  { companyName:"Kopi Kenangan", domain:"kenangan.com", lat:-6.24, lng:106.80, country:"Indonesia", city:"Jakarta", color:"#06b6d4" },
  { companyName:"Akulaku", domain:"akulaku.com", lat:-6.16, lng:106.87, country:"Indonesia", city:"Jakarta", color:"#06b6d4" },
  { companyName:"Shopback", domain:"shopback.com", lat:1.31, lng:103.86, country:"Singapore", city:"Singapore", color:"#06b6d4" },

  // Australia (15)
  { companyName:"Atlassian", domain:"atlassian.com", lat:-33.87, lng:151.21, country:"Australia", city:"Sydney", color:"#14b8a6" },
  { companyName:"Canva", domain:"canva.com", lat:-33.89, lng:151.19, country:"Australia", city:"Sydney", color:"#14b8a6" },
  { companyName:"Afterpay", domain:"afterpay.com", lat:-33.85, lng:151.23, country:"Australia", city:"Sydney", color:"#14b8a6" },
  { companyName:"WiseTech", domain:"wisetechglobal.com", lat:-33.83, lng:151.2, country:"Australia", city:"Sydney", color:"#14b8a6" },
  { companyName:"REA Group", domain:"realestate.com.au", lat:-37.81, lng:144.96, country:"Australia", city:"Melbourne", color:"#14b8a6" },
  { companyName:"SEEK", domain:"seek.com.au", lat:-37.83, lng:144.98, country:"Australia", city:"Melbourne", color:"#14b8a6" },
  { companyName:"BHP", domain:"bhp.com", lat:-37.79, lng:144.95, country:"Australia", city:"Melbourne", color:"#14b8a6" },
  { companyName:"Rio Tinto", domain:"riotinto.com", lat:-31.95, lng:115.86, country:"Australia", city:"Perth", color:"#14b8a6" },
  { companyName:"Fortescue", domain:"fmgl.com.au", lat:-31.97, lng:115.83, country:"Australia", city:"Perth", color:"#14b8a6" },
  { companyName:"CSL Limited", domain:"csl.com", lat:-37.77, lng:144.94, country:"Australia", city:"Melbourne", color:"#14b8a6" },
  { companyName:"Macquarie", domain:"macquarie.com", lat:-33.86, lng:151.22, country:"Australia", city:"Sydney", color:"#14b8a6" },
  { companyName:"Medibank", domain:"medibank.com.au", lat:-37.85, lng:144.97, country:"Australia", city:"Melbourne", color:"#14b8a6" },
  { companyName:"Cochlear", domain:"cochlear.com", lat:-33.77, lng:151.11, country:"Australia", city:"Sydney", color:"#14b8a6" },
  { companyName:"Zip Co", domain:"zip.co", lat:-33.91, lng:151.25, country:"Australia", city:"Sydney", color:"#14b8a6" },
  { companyName:"Zip Pay", domain:"zippay.com.au", lat:-33.93, lng:151.26, country:"Australia", city:"Sydney", color:"#14b8a6" },

  // South Korea (15)
  { companyName:"Samsung", domain:"samsung.com", lat:37.51, lng:127.06, country:"South Korea", city:"Seoul", color:"#a855f7" },
  { companyName:"LG Electronics", domain:"lg.com", lat:37.53, lng:126.96, country:"South Korea", city:"Seoul", color:"#a855f7" },
  { companyName:"SK Hynix", domain:"skhynix.com", lat:37.55, lng:127.08, country:"South Korea", city:"Seoul", color:"#a855f7" },
  { companyName:"Hyundai", domain:"hyundai.com", lat:37.49, lng:126.98, country:"South Korea", city:"Seoul", color:"#a855f7" },
  { companyName:"Kia", domain:"kia.com", lat:37.47, lng:127.02, country:"South Korea", city:"Seoul", color:"#a855f7" },
  { companyName:"Kakao", domain:"kakao.com", lat:37.39, lng:127.1, country:"South Korea", city:"Seongnam", color:"#a855f7" },
  { companyName:"Naver", domain:"naver.com", lat:37.36, lng:127.1, country:"South Korea", city:"Seongnam", color:"#a855f7" },
  { companyName:"Coupang", domain:"coupang.com", lat:37.57, lng:126.98, country:"South Korea", city:"Seoul", color:"#a855f7" },
  { companyName:"Krafton", domain:"krafton.com", lat:37.4, lng:127.13, country:"South Korea", city:"Seongnam", color:"#a855f7" },
  { companyName:"NCsoft", domain:"ncsoft.com", lat:37.36, lng:127.04, country:"South Korea", city:"Seongnam", color:"#a855f7" },
  { companyName:"Netmarble", domain:"netmarble.com", lat:37.52, lng:126.89, country:"South Korea", city:"Seoul", color:"#a855f7" },
  { companyName:"Posco", domain:"posco.com", lat:36.01, lng:129.36, country:"South Korea", city:"Pohang", color:"#a855f7" },
  { companyName:"Lotte", domain:"lotte.co.kr", lat:37.5, lng:127.1, country:"South Korea", city:"Seoul", color:"#a855f7" },
  { companyName:"Doosan", domain:"doosan.com", lat:37.53, lng:127.02, country:"South Korea", city:"Seoul", color:"#a855f7" },
  { companyName:"Krafton PUBG", domain:"pubg.com", lat:37.41, lng:127.14, country:"South Korea", city:"Seongnam", color:"#a855f7" },

  // Middle East & Africa (20)
  { companyName:"Emirates", domain:"emirates.com", lat:25.2, lng:55.27, country:"UAE", city:"Dubai", color:"#eab308" },
  { companyName:"Emaar", domain:"emaar.com", lat:25.18, lng:55.25, country:"UAE", city:"Dubai", color:"#eab308" },
  { companyName:"ADNOC", domain:"adnoc.ae", lat:24.47, lng:54.37, country:"UAE", city:"Abu Dhabi", color:"#eab308" },
  { companyName:"Etisalat", domain:"etisalat.com", lat:24.42, lng:54.43, country:"UAE", city:"Abu Dhabi", color:"#eab308" },
  { companyName:"DP World", domain:"dpworld.com", lat:25.22, lng:55.28, country:"UAE", city:"Dubai", color:"#eab308" },
  { companyName:"Noon", domain:"noon.com", lat:25.15, lng:55.22, country:"UAE", city:"Dubai", color:"#eab308" },
  { companyName:"Careem", domain:"careem.com", lat:25.17, lng:55.24, country:"UAE", city:"Dubai", color:"#eab308" },
  { companyName:"Aramco", domain:"aramco.com", lat:26.43, lng:49.99, country:"Saudi Arabia", city:"Dhahran", color:"#eab308" },
  { companyName:"STC", domain:"stc.com.sa", lat:24.69, lng:46.72, country:"Saudi Arabia", city:"Riyadh", color:"#eab308" },
  { companyName:"Al Rajhi Bank", domain:"alrajhibank.com.sa", lat:24.72, lng:46.69, country:"Saudi Arabia", city:"Riyadh", color:"#eab308" },
  { companyName:"MTN", domain:"mtn.com", lat:-26.2, lng:28.04, country:"South Africa", city:"Johannesburg", color:"#eab308" },
  { companyName:"Naspers", domain:"naspers.com", lat:-33.92, lng:18.42, country:"South Africa", city:"Cape Town", color:"#eab308" },
  { companyName:"Jumia", domain:"jumia.com", lat:6.45, lng:3.4, country:"Nigeria", city:"Lagos", color:"#eab308" },
  { companyName:"Flutterwave", domain:"flutterwave.com", lat:6.43, lng:3.43, country:"Nigeria", city:"Lagos", color:"#eab308" },
  { companyName:"Paystack", domain:"paystack.com", lat:6.46, lng:3.39, country:"Nigeria", city:"Lagos", color:"#eab308" },
  { companyName:"Andela", domain:"andela.com", lat:0.31, lng:32.58, country:"Uganda", city:"Kampala", color:"#eab308" },
  { companyName:"M-Pesa", domain:"safaricom.co.ke", lat:-1.29, lng:36.82, country:"Kenya", city:"Nairobi", color:"#eab308" },
  { companyName:"Twiga Foods", domain:"twiga.com", lat:-1.27, lng:36.84, country:"Kenya", city:"Nairobi", color:"#eab308" },
  { companyName:"Wave Mobile", domain:"wave.com", lat:14.72, lng:-17.45, country:"Senegal", city:"Dakar", color:"#eab308" },
  { companyName:"OPay", domain:"opayweb.com", lat:6.44, lng:3.38, country:"Nigeria", city:"Lagos", color:"#eab308" },

  // LatAm (15)
  { companyName:"Nubank", domain:"nubank.com.br", lat:-23.55, lng:-46.63, country:"Brazil", city:"Sao Paulo", color:"#6366f1" },
  { companyName:"Mercado Libre", domain:"mercadolibre.com", lat:-34.61, lng:-58.37, country:"Argentina", city:"Buenos Aires", color:"#6366f1" },
  { companyName:"iFood", domain:"ifood.com.br", lat:-23.57, lng:-46.65, country:"Brazil", city:"Sao Paulo", color:"#6366f1" },
  { companyName:"Totvs", domain:"totvs.com", lat:-23.53, lng:-46.67, country:"Brazil", city:"Sao Paulo", color:"#6366f1" },
  { companyName:"Loft", domain:"loft.com.br", lat:-23.51, lng:-46.64, country:"Brazil", city:"Sao Paulo", color:"#6366f1" },
  { companyName:"QuintoAndar", domain:"quintoandar.com.br", lat:-23.56, lng:-46.66, country:"Brazil", city:"Sao Paulo", color:"#6366f1" },
  { companyName:"Petrobras", domain:"petrobras.com.br", lat:-22.91, lng:-43.17, country:"Brazil", city:"Rio de Janeiro", color:"#6366f1" },
  { companyName:"BTG Pactual", domain:"btgpactual.com", lat:-23.52, lng:-46.68, country:"Brazil", city:"Sao Paulo", color:"#6366f1" },
  { companyName:"Rappi", domain:"rappi.com", lat:4.71, lng:-74.07, country:"Colombia", city:"Bogota", color:"#6366f1" },
  { companyName:"Bancolombia", domain:"bancolombia.com", lat:6.24, lng:-75.57, country:"Colombia", city:"Medellin", color:"#6366f1" },
  { companyName:"Cornershop", domain:"cornershopapp.com", lat:-33.45, lng:-70.67, country:"Chile", city:"Santiago", color:"#6366f1" },
  { companyName:"Falabella", domain:"falabella.com", lat:-33.47, lng:-70.65, country:"Chile", city:"Santiago", color:"#6366f1" },
  { companyName:"Kavak", domain:"kavak.com", lat:19.43, lng:-99.13, country:"Mexico", city:"Mexico City", color:"#6366f1" },
  { companyName:"Kueski", domain:"kueski.com", lat:20.68, lng:-103.35, country:"Mexico", city:"Guadalajara", color:"#6366f1" },
  { companyName:"Clip", domain:"clip.mx", lat:19.42, lng:-99.17, country:"Mexico", city:"Mexico City", color:"#6366f1" },

  // Canada (15)
  { companyName:"Shopify", domain:"shopify.com", lat:45.42, lng:-75.69, country:"Canada", city:"Ottawa", color:"#22d3ee" },
  { companyName:"Hootsuite", domain:"hootsuite.com", lat:49.3, lng:-123.1, country:"Canada", city:"Vancouver", color:"#22d3ee" },
  { companyName:"Lightspeed", domain:"lightspeedhq.com", lat:45.5, lng:-73.57, country:"Canada", city:"Montreal", color:"#22d3ee" },
  { companyName:"Element AI", domain:"elementai.com", lat:45.52, lng:-73.59, country:"Canada", city:"Montreal", color:"#22d3ee" },
  { companyName:"OpenText", domain:"opentext.com", lat:43.47, lng:-80.53, country:"Canada", city:"Waterloo", color:"#22d3ee" },
  { companyName:"BlackBerry", domain:"blackberry.com", lat:43.48, lng:-80.52, country:"Canada", city:"Waterloo", color:"#22d3ee" },
  { companyName:"RBC", domain:"rbc.com", lat:43.65, lng:-79.38, country:"Canada", city:"Toronto", color:"#22d3ee" },
  { companyName:"TD Bank", domain:"td.com", lat:43.67, lng:-79.4, country:"Canada", city:"Toronto", color:"#22d3ee" },
  { companyName:"Scotiabank", domain:"scotiabank.com", lat:43.63, lng:-79.37, country:"Canada", city:"Toronto", color:"#22d3ee" },
  { companyName:"Wealthsimple", domain:"wealthsimple.com", lat:43.64, lng:-79.39, country:"Canada", city:"Toronto", color:"#22d3ee" },
  { companyName:"FreshBooks", domain:"freshbooks.com", lat:43.66, lng:-79.41, country:"Canada", city:"Toronto", color:"#22d3ee" },
  { companyName:"Coveo", domain:"coveo.com", lat:46.81, lng:-71.22, country:"Canada", city:"Quebec City", color:"#22d3ee" },
  { companyName:"ApplyBoard", domain:"applyboard.com", lat:43.46, lng:-80.52, country:"Canada", city:"Waterloo", color:"#22d3ee" },
  { companyName:"Ritual", domain:"ritual.co", lat:43.64, lng:-79.42, country:"Canada", city:"Toronto", color:"#22d3ee" },
  { companyName:"Properly", domain:"properly.ca", lat:43.68, lng:-79.38, country:"Canada", city:"Toronto", color:"#22d3ee" },

  // Netherlands / Nordics (15)
  { companyName:"ASML", domain:"asml.com", lat:51.44, lng:5.47, country:"Netherlands", city:"Eindhoven", color:"#84cc16" },
  { companyName:"Booking.com", domain:"booking.com", lat:52.38, lng:4.9, country:"Netherlands", city:"Amsterdam", color:"#84cc16" },
  { companyName:"Philips", domain:"philips.com", lat:51.43, lng:5.46, country:"Netherlands", city:"Eindhoven", color:"#84cc16" },
  { companyName:"Adyen", domain:"adyen.com", lat:52.37, lng:4.89, country:"Netherlands", city:"Amsterdam", color:"#84cc16" },
  { companyName:"Shell", domain:"shell.com", lat:52.4, lng:4.92, country:"Netherlands", city:"Amsterdam", color:"#84cc16" },
  { companyName:"Spotify", domain:"spotify.com", lat:59.33, lng:18.07, country:"Sweden", city:"Stockholm", color:"#84cc16" },
  { companyName:"Klarna", domain:"klarna.com", lat:59.35, lng:18.06, country:"Sweden", city:"Stockholm", color:"#84cc16" },
  { companyName:"King", domain:"king.com", lat:59.31, lng:18.05, country:"Sweden", city:"Stockholm", color:"#84cc16" },
  { companyName:"Mojang", domain:"minecraft.net", lat:59.3, lng:18.08, country:"Sweden", city:"Stockholm", color:"#84cc16" },
  { companyName:"Ericsson", domain:"ericsson.com", lat:59.32, lng:18.07, country:"Sweden", city:"Stockholm", color:"#84cc16" },
  { companyName:"Maersk", domain:"maersk.com", lat:55.65, lng:12.58, country:"Denmark", city:"Copenhagen", color:"#84cc16" },
  { companyName:"Novo Nordisk", domain:"novonordisk.com", lat:55.67, lng:12.54, country:"Denmark", city:"Copenhagen", color:"#84cc16" },
  { companyName:"Nokia", domain:"nokia.com", lat:60.17, lng:24.93, country:"Finland", city:"Helsinki", color:"#84cc16" },
  { companyName:"Supercell", domain:"supercell.com", lat:60.16, lng:24.95, country:"Finland", city:"Helsinki", color:"#84cc16" },
  { companyName:"Wolt", domain:"wolt.com", lat:60.18, lng:24.92, country:"Finland", city:"Helsinki", color:"#84cc16" },

  // Switzerland (10)
  { companyName:"Nestle", domain:"nestle.com", lat:46.52, lng:6.63, country:"Switzerland", city:"Vevey", color:"#fb923c" },
  { companyName:"Novartis", domain:"novartis.com", lat:47.55, lng:7.6, country:"Switzerland", city:"Basel", color:"#fb923c" },
  { companyName:"Roche", domain:"roche.com", lat:47.56, lng:7.59, country:"Switzerland", city:"Basel", color:"#fb923c" },
  { companyName:"ABB", domain:"abb.com", lat:47.38, lng:8.54, country:"Switzerland", city:"Zurich", color:"#fb923c" },
  { companyName:"UBS", domain:"ubs.com", lat:47.37, lng:8.55, country:"Switzerland", city:"Zurich", color:"#fb923c" },
  { companyName:"Logitech", domain:"logitech.com", lat:46.53, lng:6.65, country:"Switzerland", city:"Lausanne", color:"#fb923c" },
  { companyName:"Swatch", domain:"swatch.com", lat:47.14, lng:7.24, country:"Switzerland", city:"Biel", color:"#fb923c" },
  { companyName:"Ikea", domain:"ikea.com", lat:55.59, lng:13.0, country:"Sweden", city:"Malmo", color:"#84cc16" },
  { companyName:"Swisscom", domain:"swisscom.ch", lat:47.39, lng:8.53, country:"Switzerland", city:"Zurich", color:"#fb923c" },
  { companyName:"Temenos", domain:"temenos.com", lat:46.20, lng:6.14, country:"Switzerland", city:"Geneva", color:"#fb923c" },
];

// Assign IDs and stagger delays
const REGION_ORDER = [
  'India', 'USA', 'UK', 'Germany', 'France', 'Japan', 'China',
  'Singapore', 'Indonesia', 'Vietnam', 'Thailand', 'Malaysia',
  'Australia', 'South Korea', 'UAE', 'Saudi Arabia', 'South Africa',
  'Nigeria', 'Uganda', 'Kenya', 'Senegal',
  'Brazil', 'Argentina', 'Colombia', 'Chile', 'Mexico',
  'Canada', 'Netherlands', 'Sweden', 'Denmark', 'Finland', 'Switzerland',
];

const ALL_CLIENTS: Client[] = (() => {
  const grouped: Record<string, typeof RAW_COMPANIES> = {};
  REGION_ORDER.forEach(r => { grouped[r] = []; });
  RAW_COMPANIES.forEach(c => {
    if (!grouped[c.country]) grouped[c.country] = [];
    grouped[c.country].push(c);
  });

  const result: Client[] = [];
  let base = 0;
  let id = 0;
  REGION_ORDER.forEach(region => {
    const clients = grouped[region] ?? [];
    clients.forEach((c, i) => {
      result.push({ ...c, id: ++id, staggerDelay: base + i * 120 });
    });
    if (clients.length > 0) base += clients.length * 120 + 400;
  });
  return result;
})();

// ─────────────────────────────────────────────────────────────────────────────

export default function GlobalB2BSection() {
  const globeRef            = useRef<any>(null);
  const [selectedClient,   setSelectedClient]   = useState<Client | null>(null);
  const [mounted,          setMounted]           = useState(false);
  const [isInteracting,    setIsInteracting]     = useState(false);
  const [visibleIds,       setVisibleIds]        = useState<Set<number>>(new Set());

  useEffect(() => { setMounted(true); }, []);

  // Stagger timers — each dot appears at its scheduled time
  useEffect(() => {
    if (!mounted) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    ALL_CLIENTS.forEach(c => {
      const t = setTimeout(() => {
        setVisibleIds(prev => new Set([...prev, c.id]));
      }, c.staggerDelay);
      timers.push(t);
    });
    return () => timers.forEach(clearTimeout);
  }, [mounted]);

  // Initial camera — show full globe centred on Europe/Africa
  useEffect(() => {
    if (!mounted || !globeRef.current) return;
    globeRef.current.pointOfView({ lat: 20, lng: 15, altitude: 1.8 }, 0);
  }, [mounted]);

  // Globe controls — AUTO-ROTATE ON by default, disabled when user interacts
  useEffect(() => {
    if (!mounted || !globeRef.current) return;
    const ctrl = globeRef.current.controls();
    if (!ctrl) return;
    ctrl.minDistance     = 101;
    ctrl.maxDistance     = 1400;
    ctrl.dampingFactor   = 0.08;
    ctrl.autoRotate      = !isInteracting;   // ← rotates by default
    ctrl.autoRotateSpeed = 0.6;              // ← slow, cinematic speed
    ctrl.enableZoom      = isInteracting;
    ctrl.enableRotate    = isInteracting;
  }, [isInteracting, mounted]);

  const handlePointClick = (point: any) => {
    const client = point as Client;
    setSelectedClient(client);
    setIsInteracting(true);
    globeRef.current?.pointOfView({ lat: client.lat, lng: client.lng, altitude: 0.55 }, 1200);
  };

  const closeOverlay = () => {
    setSelectedClient(null);
    globeRef.current?.pointOfView({ altitude: 1.8 }, 1200);
  };

  const visiblePoints = useMemo(
    () => ALL_CLIENTS.filter(c => visibleIds.has(c.id)),
    [visibleIds]
  );

  if (!mounted) return <div className="min-h-screen bg-[#00050a]" />;

  return (
    <div
      className="relative w-full h-screen bg-[#00050a] overflow-hidden font-sans group"
      onMouseLeave={() => { if (!selectedClient) setIsInteracting(false); }}
    >
      {/* Interact hint — shown when not interacting */}
      {!isInteracting && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
          onClick={() => setIsInteracting(true)}
        >
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 flex items-center gap-3 mt-48">
            <Hand size={18} className="text-blue-400 animate-pulse" />
            <span className="text-white text-xs font-bold uppercase tracking-widest">Click to Explore</span>
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
          width={typeof window !== 'undefined' ? window.innerWidth : 1000}
          height={typeof window !== 'undefined' ? window.innerHeight : 800}

          // WebGL points — always stick to globe surface
          pointsData={visiblePoints}
          pointLat="lat"
          pointLng="lng"
          pointColor={(d: any) => d.color}
          pointRadius={0.38}
          pointAltitude={0.015}
          pointResolution={10}
          onPointClick={handlePointClick}
          pointLabel={(d: any) => `
            <div style="
              background:rgba(3,7,22,0.95);
              border:1px solid ${d.color}80;
              border-radius:10px;
              padding:10px 16px;
              font-family:system-ui,sans-serif;
              box-shadow:0 0 24px ${d.color}60;
            ">
              <div style="color:${d.color};font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:4px;">
                ${d.country}
              </div>
              <div style="color:#fff;font-size:14px;font-weight:700;margin-bottom:2px;">
                ${d.companyName}
              </div>
              <div style="color:#94a3b8;font-size:11px;">
                📍 ${d.city}
              </div>
            </div>
          `}

          // Animated pulse rings — also WebGL
          ringsData={visiblePoints}
          ringLat="lat"
          ringLng="lng"
          ringColor={(d: any) => (t: number) =>
            `${d.color}${Math.floor((1 - t) * 180).toString(16).padStart(2, '0')}`
          }
          ringMaxRadius={3.2}
          ringPropagationSpeed={1.8}
          ringRepeatPeriod={2000}

          atmosphereColor="#3b82f6"
          atmosphereAltitude={0.18}
          backgroundColor="#00050a"
        />
      </div>

      {/* Bottom hint */}
      <div className="absolute bottom-8 left-8 z-20 pointer-events-none">
        <div className="flex items-center gap-2 text-white/40 text-[10px] uppercase tracking-wider">
          {isInteracting
            ? <><Unlock size={12} className="text-blue-400" /><span className="text-blue-400 font-bold">Interactive — Click any dot for details</span></>
            : <><Lock size={12} /><span>Globe rotating • Click to interact</span></>
          }
        </div>
      </div>

      {/* Company count badge */}
      <div className="absolute top-6 right-6 z-20 pointer-events-none">
        <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-2 text-center">
          <div className="text-blue-400 font-black text-xl">{visibleIds.size}</div>
          <div className="text-white/40 text-[9px] uppercase tracking-widest">Partners Online</div>
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
            className="absolute top-0 right-0 h-full z-50 w-full md:w-[420px] p-4 md:p-6 flex items-center justify-end pointer-events-none"
          >
            <div className="pointer-events-auto bg-[#060c1a]/96 backdrop-blur-3xl border border-white/10 h-full md:h-[88vh] w-full rounded-3xl p-8 relative shadow-2xl overflow-y-auto flex flex-col">
              <button
                onClick={closeOverlay}
                className="absolute top-5 right-5 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-all"
              >
                <X size={18} />
              </button>

              <div className="mt-3">
                <div className="w-18 h-18 w-[72px] h-[72px] bg-white p-3 rounded-2xl shadow-xl flex items-center justify-center mb-5">
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

                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-lg mb-4 border"
                  style={{
                    background: `${selectedClient.color}15`,
                    borderColor: `${selectedClient.color}40`,
                  }}
                >
                  <Building2 size={11} style={{ color: selectedClient.color }} />
                  <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: selectedClient.color }}>
                    Global Partner
                  </span>
                </div>

                <h4 className="text-white font-black text-3xl md:text-4xl mb-2 tracking-tight leading-tight">
                  {selectedClient.companyName}
                </h4>
                <p className="text-white/40 text-sm leading-relaxed">
                  Part of our global enterprise network, leveraging cutting-edge infrastructure for next-generation operations.
                </p>
              </div>

              <div className="py-8">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                    <MapPin size={18} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/30 uppercase font-black tracking-tighter">Headquarters</p>
                    <p className="text-white font-bold">{selectedClient.city}, {selectedClient.country}</p>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-5 border-t border-white/10">
                <button
                  className="group relative w-full py-4 text-white font-bold rounded-xl transition-all uppercase text-[11px] tracking-[0.2em] overflow-hidden shadow-lg"
                  style={{ background: selectedClient.color }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    View Partner Profile
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
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