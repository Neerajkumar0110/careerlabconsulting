'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ExternalLink, Send, User, CheckCircle2 } from 'lucide-react';
import B2CHeader from '@/components/b2c/B2CHeader';
import Footer from '@/components/b2c/Footer';

const staticReviews = [
  { id: 1, name: "Manish GUPTA", rating: 5, date: "3 weeks ago", text: "I joined InternX with the hope of upgrading my skills and getting proper career guidance. The training was well structured.", initial: "M", color: "bg-orange-600" },
  { id: 2, name: "Dushyant Singh", rating: 5, date: "1 month ago", text: "Very nice Infrastructure and Supportive Staff. The trainers are highly experienced.", initial: "D", color: "bg-blue-600" },
  { id: 3, name: "Sandeep Kumar", rating: 5, date: "2 months ago", text: "Excellent learning environment. The placement support is outstanding.", initial: "S", color: "bg-emerald-600" },
  { id: 4, name: "Priya Sharma", rating: 5, date: "3 months ago", text: "The best part about Career Lab Consulting is their practical approach. Professional team.", initial: "P", color: "bg-purple-600" }
];

export default function CLCReviewPage() {
  const [formData, setFormData] = useState({ name: '', text: '', rating: 5 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [userIp, setUserIp] = useState('');

  const GMB_REVIEW_URL = "https://www.google.com/search?q=career+lab+consulting#lrd=0x390ce5b02b6f908d:0x3f9da383c70066be,3,,,";
  const MAP_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.4468254719614!2d77.0854491!3d28.4961817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5b02b6f908d%3A0x3f9da383c70066be!2sCareer%20Lab%20Consulting%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin";

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setUserIp(data.ip))
      .catch(() => console.error("IP fetch failed"));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const hasSubmitted = localStorage.getItem(`submitted_${userIp}`);
    if (hasSubmitted) {
      alert("Notice: You have already submitted a review from this IP.");
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');

    try {
      const response = await fetch('/api/send-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          review: formData.text,
          rating: formData.rating,
          ip: userIp,
          to: "info@careerlabconsulting.com",
          bcc: "mr.deepanshujoshi@gmail.com"
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('success');
        localStorage.setItem(`submitted_${userIp}`, 'true');
        setFormData({ name: '', text: '', rating: 5 });
      } else {
        throw new Error(result.error || "Failed to send");
      }
    } catch (error: any) {
      console.error("Submission Error:", error);
      setStatus('error');
      alert(`Submission Error: ${error.message}. Please check your server console.`);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col selection:bg-blue-500/30">
      <B2CHeader />

      <main className="flex-grow pt-24 pb-16 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/5 blur-[120px] pointer-events-none" />
        <section className="px-4 max-w-7xl mx-auto text-center mb-12 relative z-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold mb-6 uppercase tracking-widest">
            <Star size={16} className="fill-blue-400" /> Verified Reviews
          </motion.div>
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-4 uppercase italic leading-none">
            Student <span className="text-blue-500">Reviews</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Your feedback matters to us. <br className="hidden md:block"/>
            Registered IP: <span className="text-blue-400 font-mono font-bold">{userIp || 'Detecting...'}</span>
          </p>
        </section>

        <section className="px-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20 relative z-10">
          <div className="lg:col-span-5">
            <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/10 p-8 rounded-[32px] shadow-2xl sticky top-28">
              <h3 className="text-2xl font-black text-white uppercase italic mb-6">Write a Review</h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Deepanshu Joshi"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-blue-500 outline-none transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Rating</label>
                  <div className="flex gap-2 bg-white/5 p-4 rounded-2xl border border-white/10 justify-center">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <Star 
                        key={num}
                        size={32}
                        className={`cursor-pointer transition-all hover:scale-110 ${num <= formData.rating ? 'fill-yellow-500 text-yellow-500' : 'text-slate-700'}`}
                        onClick={() => setFormData({...formData, rating: num})}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Your Message</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="Tell us about your training experience..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-blue-500 outline-none transition-all resize-none"
                    value={formData.text}
                    onChange={(e) => setFormData({...formData, text: e.target.value})}
                  />
                </div>

                <button 
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all uppercase tracking-widest shadow-xl shadow-blue-600/30 active:scale-[0.98]"
                >
                  {isSubmitting ? 'Sending...' : 'Submit Review'} <Send size={18} />
                </button>
              </form>

              {status === 'success' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3 text-emerald-400 text-sm font-bold">
                  <CheckCircle2 size={18} /> Success! Your review has been sent.
                </motion.div>
              )}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {staticReviews.map((r) => (
                <div key={r.id} className="bg-white/5 border border-white/10 p-6 rounded-[24px] hover:border-blue-500/30 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${r.color} flex items-center justify-center text-white font-bold shadow-lg`}>{r.initial}</div>
                      <div>
                        <h4 className="text-white text-[13px] font-bold uppercase">{r.name}</h4>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={10} className="fill-yellow-500 text-yellow-500" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">{r.date}</span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed italic group-hover:text-slate-300 transition-colors">"{r.text}"</p>
                </div>
              ))}
            </div>

            <div className="rounded-[40px] overflow-hidden border border-white/10 h-[380px] relative shadow-2xl group">
              <iframe 
                src={MAP_EMBED} 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.9)' }} 
                allowFullScreen 
                loading="lazy" 
              />
              <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur px-5 py-2 rounded-full border border-white/10 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-white text-[10px] font-bold uppercase tracking-widest">Visit our Gurugram HQ</span>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[50px] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl shadow-blue-900/20">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase italic">Help us grow on Google</h2>
              <button 
                onClick={() => window.open(GMB_REVIEW_URL, '_blank')}
                className="bg-white text-blue-600 font-black px-12 py-5 rounded-2xl hover:scale-105 transition-all uppercase tracking-widest shadow-xl flex items-center gap-3 mx-auto"
              >
                Official Google Profile <ExternalLink size={20} />
              </button>
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}