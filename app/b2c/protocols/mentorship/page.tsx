'use client';

import React, { useState, useMemo, useEffect } from 'react';
import B2CHeader from '@/components/b2c/B2CHeader';
import Footer from '@/components/b2c/Footer';
import { 
  Star, Search, X, ChevronRight, CheckCircle2, ArrowUpRight, Clock, Wifi, AlertCircle, Check
} from 'lucide-react';

// --- MENTOR DATA ---
const MENTORS_DATA = [
  {
    id: 1,
    name: "Arjun Mehta",
    role: "Senior AI Architect",
    company: "Google",
    expertise: "AI/ML",
    rating: "5.0",
    reviews: 48,
    image: "https://i.pravatar.cc/150?u=arjun",
    highlights: ["LLM Fine-tuning", "Neural Networks", "Career Pivot"],
    isLive: true,
    nextSlot: "Today, 07:00 PM"
  },
  {
    id: 2,
    name: "Sanya Iyer",
    role: "Blockchain Lead",
    company: "Polygon",
    expertise: "Web3",
    rating: "4.9",
    reviews: 32,
    image: "https://i.pravatar.cc/150?u=sanya",
    highlights: ["Solidity", "Smart Contracts", "dApp Scaling"],
    isLive: false,
    nextSlot: "Tomorrow, 10:00 AM"
  },
  {
    id: 3,
    name: "Vikram Singh",
    role: "VP Engineering",
    company: "Zomato",
    expertise: "System Design",
    rating: "5.0",
    reviews: 94,
    image: "https://i.pravatar.cc/150?u=vikram",
    highlights: ["Distributed Systems", "Scalability", "Leadership"],
    isLive: true,
    nextSlot: "Today, 09:30 PM"
  },
  {
    id: 4,
    name: "Riya Sharma",
    role: "Staff Frontend Eng",
    company: "Meta",
    expertise: "Frontend",
    rating: "4.8",
    reviews: 56,
    image: "https://i.pravatar.cc/150?u=riya",
    highlights: ["React Performance", "Design Systems", "Interview Prep"],
    isLive: false,
    nextSlot: "Jan 20, 02:00 PM"
  }
];

const CATEGORIES = ["All", "AI/ML", "Web3", "System Design", "Frontend"];

const REVIEWS = [
  { id: 1, name: "Rohan D.", text: "Arjun helped me crack my Google interview in just 3 sessions!", role: "SDE-2 @ Amazon" },
  { id: 2, name: "Priya M.", text: "The system design insights from Vikram are gold standard.", role: "Backend Dev" },
  { id: 3, name: "Ankit S.", text: "Best Web3 mentorship out there. Sanya knows her stuff.", role: "Blockchain Intern" },
];

export default function MentorshipLMS() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedMentor, setSelectedMentor] = useState<any>(null);
  const [step, setStep] = useState(1); 
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({ userName: '', experience: '', targetRole: '' });
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');

  // --- TIMER STATE ---
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 2 && timeLeft > 0 && !isSuccess) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, timeLeft, isSuccess]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const nextSevenDays = useMemo(() => {
    const days = [];
    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push({
        full: date.toDateString(),
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        date: date.getDate(),
      });
    }
    return days;
  }, []);

  const timeSlots = ["10:00 AM", "02:00 PM", "07:00 PM", "09:30 PM"];

  const filteredMentors = MENTORS_DATA.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.expertise.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || m.expertise === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleFinalBooking = async () => {
    const msg = `*NEW BOOKING* 🎓\n- Name: ${formData.userName}\n- Mentor: ${selectedMentor.name}\n- Slot: ${selectedDate} @ ${selectedSlot}`;
    window.open(`https://wa.me/919810984968?text=${encodeURIComponent(msg)}`, '_blank');
    setIsSuccess(true);
  };

  const closePortal = () => {
    setSelectedMentor(null);
    setStep(1);
    setIsSuccess(false);
    setSelectedDate('');
    setSelectedSlot('');
    setFormData({ userName: '', experience: '', targetRole: '' });
    setTimeLeft(300);
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-emerald-500/30">
      <B2CHeader />

      {/* --- HERO --- */}
      <section className="pt-32 pb-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4">
            <h1 className="text-6xl font-black italic uppercase tracking-tighter">
              Expert <span className="text-emerald-500 underline decoration-emerald-500/30">Connect</span>
            </h1>
            <p className="text-slate-400 font-medium text-lg italic">Learn from those who have built what you use.</p>
          </div>
          <div className="w-full md:w-80 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" placeholder="Search expertise..." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-4 outline-none focus:border-emerald-500 transition-all text-sm"
            />
          </div>
        </div>
      </section>

      {/* --- FILTERS --- */}
      <section className="px-6 pb-12">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${
                activeCategory === cat 
                ? 'bg-emerald-500 border-emerald-500 text-white' 
                : 'bg-white/5 border-white/10 text-slate-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* --- GRID --- */}
      <section className="py-6 px-6 max-w-7xl mx-auto min-h-[400px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredMentors.map((mentor) => (
            <div key={mentor.id} className="bg-[#0a0f1d] border border-white/5 rounded-[2.5rem] p-8 hover:scale-[1.02] transition-all duration-500 relative overflow-hidden group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-emerald-500/20">
                  <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col items-end gap-2">
                  {mentor.isLive && (
                    <span className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-[9px] font-black uppercase animate-pulse">
                      <Wifi size={10} /> Live Now
                    </span>
                  )}
                  <span className="flex items-center gap-1.5 bg-white/5 text-slate-400 px-3 py-1 rounded-full text-[9px] font-black uppercase">
                    <Clock size={10} /> {mentor.nextSlot}
                  </span>
                </div>
              </div>
              <h3 className="text-2xl font-black uppercase italic tracking-tight">{mentor.name}</h3>
              <p className="text-emerald-500 text-[10px] font-black uppercase tracking-widest mb-4">{mentor.role} @ {mentor.company}</p>
              <div className="space-y-3 mb-8">
                {mentor.highlights.map((h, i) => (
                  <div key={i} className="text-[11px] text-slate-400 flex items-center gap-2 font-bold uppercase">
                    <CheckCircle2 size={14} className="text-emerald-500" /> {h}
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setSelectedMentor(mentor)}
                className="w-full py-4 bg-white text-black hover:bg-emerald-500 hover:text-white transition-all rounded-2xl font-black uppercase text-[10px] flex items-center justify-center gap-2"
              >
                Book 1:1 Session <ArrowUpRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* --- WALL OF LOVE --- */}
      <section className="py-20 border-y border-white/5 bg-white/[0.01] overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-8">
          {[...REVIEWS, ...REVIEWS].map((rev, i) => (
            <div key={i} className="inline-block w-80 bg-white/5 border border-white/10 p-6 rounded-3xl whitespace-normal">
              <div className="flex text-emerald-500 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
              </div>
              <p className="text-slate-300 text-sm font-medium mb-4 italic">"{rev.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px] font-bold">{rev.name[0]}</div>
                <div>
                  <h4 className="text-xs font-black uppercase">{rev.name}</h4>
                  <p className="text-[10px] text-slate-500 font-bold">{rev.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- MODAL --- */}
      {selectedMentor && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#020617]/95 backdrop-blur-2xl" onClick={closePortal} />
          <div className="relative w-full max-w-xl bg-[#0a0f1d] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl">
            {!isSuccess ? (
              <div className="p-10">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-black uppercase italic text-emerald-500">Step {step} of 2</h3>
                  <X className="cursor-pointer text-slate-500 hover:text-white" onClick={closePortal} />
                </div>

                {/* TIMER - STEP 2 ONLY */}
                {step === 2 && (
                  <div className="mb-8 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-4">
                    <div className="flex justify-between items-center mb-2 text-[10px] font-black uppercase tracking-widest">
                      <div className="flex items-center gap-2 text-emerald-500"><AlertCircle size={14} /> Slot Reserved</div>
                      <div className={timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-white'}>{formatTime(timeLeft)}</div>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${(timeLeft/300)*100}%` }} />
                    </div>
                  </div>
                )}

                {step === 1 ? (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-500 ml-1">Full Name</label>
                      <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 outline-none focus:border-emerald-500" placeholder="John Doe" value={formData.userName} onChange={(e)=>setFormData({...formData, userName:e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-500 ml-1">Experience</label>
                        <select className="w-full bg-[#0a0f1d] border border-white/10 rounded-xl py-4 px-5 outline-none focus:border-emerald-500 appearance-none" value={formData.experience} onChange={(e)=>setFormData({...formData, experience:e.target.value})}>
                          <option value="">Select</option>
                          <option value="Fresher">Fresher</option>
                          <option value="1-3 Years">1-3 Years</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-500 ml-1">Target Role</label>
                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 outline-none focus:border-emerald-500" placeholder="SDE-2" value={formData.targetRole} onChange={(e)=>setFormData({...formData, targetRole:e.target.value})} />
                      </div>
                    </div>
                    <button onClick={()=>setStep(2)} disabled={!formData.userName || !formData.experience} className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase text-xs hover:bg-emerald-500 hover:text-white disabled:opacity-20 transition-all">Next: Choose Slot</button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="space-y-3">
                      <p className="text-[10px] font-black uppercase text-emerald-500">Select Date</p>
                      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                        {nextSevenDays.map((d, i) => (
                          <button key={i} onClick={() => setSelectedDate(d.full)} className={`flex-shrink-0 w-20 h-24 rounded-2xl border flex flex-col items-center justify-center gap-1 transition-all ${selectedDate === d.full ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white/5 border-white/10 text-slate-400'}`}>
                            <span className="text-[10px] font-black uppercase">{d.day}</span>
                            <span className="text-2xl font-black">{d.date}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <p className="text-[10px] font-black uppercase text-emerald-500">Time (IST)</p>
                      <div className="grid grid-cols-2 gap-3">
                        {timeSlots.map(s => (
                          <button key={s} onClick={() => setSelectedSlot(s)} className={`py-4 rounded-xl border text-[10px] font-black uppercase transition-all ${selectedSlot === s ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 text-slate-400'}`}>{s}</button>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button onClick={()=>setStep(1)} className="px-8 py-5 bg-white/5 rounded-2xl font-black uppercase text-xs">Back</button>
                      <button onClick={handleFinalBooking} disabled={!selectedDate || !selectedSlot || timeLeft === 0} className="flex-1 py-5 bg-emerald-600 rounded-2xl font-black uppercase text-xs shadow-xl shadow-emerald-600/20 disabled:opacity-20">Confirm & WhatsApp</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-16 flex flex-col items-center text-center space-y-6">
                <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/40 animate-bounce">
                  <Check size={40} strokeWidth={4} />
                </div>
                <h2 className="text-3xl font-black uppercase italic">Booking Sent!</h2>
                <p className="text-slate-400 text-sm max-w-xs">WhatsApp shared with **{selectedMentor.name}**. Finish the chat to finalize.</p>
                <button onClick={closePortal} className="px-12 py-4 bg-white/5 border border-white/10 rounded-full font-black text-[10px] uppercase hover:bg-white/10 transition-all">Done</button>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { display: flex; width: fit-content; animation: marquee 30s linear infinite; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  );
}