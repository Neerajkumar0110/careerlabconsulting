// app/aptitude-test/page.tsx

'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { 
  Loader2, ChevronRight, Trophy, Mail, GraduationCap, X, 
  CheckCircle2, ArrowRight, ShieldCheck, ChevronDown,
  Timer, AlertTriangle, Ban, Building2, MapPin,
  Briefcase
} from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string; 
  difficulty: 'hard';
}

interface UserDetails {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  qualification: string;
  collegeName: string;
  city: string;
  state: string;
}

const countryList = [
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+1", flag: "🇺🇸", name: "USA" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+1", flag: "🇨🇦", name: "Canada" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
];

function AptitudeTestContent() {
  const router = useRouter();

  const [step, setStep] = useState<'details' | 'loading' | 'quiz' | 'result' | 'disqualified'>('details');
  const [userDetails, setUserDetails] = useState<UserDetails>({ 
      name: '', email: '', phone: '', countryCode: '+91',
      qualification: '', collegeName: '', city: '', state: '' 
  });
  
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [serverOtp, setServerOtp] = useState('');
  const [userOtpInput, setUserOtpInput] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [score, setScore] = useState(0);

  const [timeLeft, setTimeLeft] = useState(900); 
  const [warnings, setWarnings] = useState(0);
  const [showWarningModal, setShowWarningModal] = useState(false);

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

  useEffect(() => {
    if (step === 'quiz' && timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else if (step === 'quiz' && timeLeft === 0) {
      submitQuiz(); 
    }
  }, [step, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    if (step !== 'quiz') return;

    const handleVisibilityChange = () => {
        if (document.hidden) handleCheatAttempt("switched tabs or minimized the window");
    };

    const handleBlur = () => {
        handleCheatAttempt("unfocused the test window");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);

    return () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        window.removeEventListener("blur", handleBlur);
    };
  }, [step, warnings, userDetails.name]);

  const handleCheatAttempt = (actionType: string) => {
      if (step !== 'quiz') return;
      if (warnings === 0) {
          setWarnings(1);
          setShowWarningModal(true);
      } else if (warnings === 1) {
          handleDisqualification();
      }
  };

  const handleDisqualification = () => {
      setStep('disqualified');
      const fullPhoneNumber = `${userDetails.countryCode} ${userDetails.phone}`;
      
      fetch('https://cms-tau-ivory.vercel.app/api/scholarship-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            status: 'disqualified', 
            name: userDetails.name,
            email: userDetails.email,
            phone: fullPhoneNumber,
            planName: 'College Hiring Aptitude',
            testType: 'aptitude', 
            cheatWarnings: warnings,
            qualification: userDetails.qualification,
            collegeName: userDetails.collegeName,
            city: userDetails.city,
            state: userDetails.state,
        })
      }).catch(err => console.error("Failed to send DQ email", err));
  };

  const handleSendOtp = async () => {
    if(!userDetails.email || !userDetails.name) {
        alert("Please enter your Full Name and Email Address first.");
        return;
    }
    setOtpLoading(true);
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setServerOtp(code);

    try {
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userDetails.email, otp: code, name: userDetails.name })
      });
      if(res.ok) {
        setOtpSent(true);
        alert(`OTP Verification Code sent to ${userDetails.email}`);
      } else alert("Failed to send OTP. Please check your email address.");
    } catch (e) { alert("Error sending OTP. Please try again."); } 
    finally { setOtpLoading(false); }
  };

  const handleVerifyOtp = () => {
    if(userOtpInput === serverOtp) {
      setOtpVerified(true);
      setOtpSent(false); 
    } else alert("Invalid OTP. Please try again.");
  };

  const generateQuiz = async () => {
    setStep('loading');
    try {
        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash", 
            generationConfig: { responseMimeType: "application/json" }
        });

        const randomSeed = Math.floor(Math.random() * 10000);
        const prompt = `You are an expert technical interviewer creating a College Hiring Aptitude Test. 
        This is for a student with a background in: ${userDetails.qualification || 'General Technology'}.
        Seed ID: ${randomSeed}.
        
        You MUST generate EXACTLY 25 multiple choice questions.
        
        The composition MUST strictly be:
        - ALL 25 questions MUST be of difficulty "hard". 
        - Topics should include: Advanced Data Structures, Algorithms, System Design, Logical Reasoning, and Complex Math.
        
        Format requirement: Return ONLY a valid JSON Array of exactly 25 objects. 
        Keys: id (1-25), question (string), options (array of exactly 4 strings), answer (string), difficulty (string "hard").`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text().replace(/```json/g, '').replace(/```/g, '').trim();
        
        const firstBracket = text.indexOf('[');
        const lastBracket = text.lastIndexOf(']');
        if (firstBracket !== -1 && lastBracket !== -1) text = text.substring(firstBracket, lastBracket + 1);

        const data: Question[] = JSON.parse(text);
        if (!Array.isArray(data) || data.length !== 25) throw new Error("Invalid question count from AI");

        setQuestions(data); 
        setStep('quiz');
    } catch (error) {
        console.error("AI Generation Failed", error);
        alert("Server is currently busy generating tests. Please try again in a few moments.");
        setStep('details');
    }
  };

  const submitQuiz = async () => {
     let calculatedScore = 0;
     const marksPerQuestion = 2; 

     const formattedResponses = questions.map(q => {
         const isCorrect = answers[q.id] === q.answer;
         if(isCorrect) calculatedScore += marksPerQuestion; 
         return {
             question: q.question,
             userAnswer: answers[q.id] || "Skipped/Not Answered",
             correctAnswer: q.answer,
             isCorrect: isCorrect
         };
     });
     
     setScore(calculatedScore);
     const fullPhoneNumber = `${userDetails.countryCode} ${userDetails.phone}`;

     fetch('https://cms-tau-ivory.vercel.app/api/scholarship-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            status: 'passed', 
            name: userDetails.name,
            email: userDetails.email,
            phone: fullPhoneNumber,
            score: calculatedScore,
            totalQuestions: questions.length, 
            planName: 'College Hiring Aptitude',
            testType: 'aptitude', 
            cheatWarnings: warnings,
            testResponses: formattedResponses,
            qualification: userDetails.qualification,
            collegeName: userDetails.collegeName,
            city: userDetails.city,
            state: userDetails.state,
            discount: 0 
        })
     }).catch(err => console.error("Failed to send results", err));

     setStep('result');
  };

  const isFormValid = userDetails.name && otpVerified && userDetails.phone && userDetails.qualification && userDetails.collegeName && userDetails.city && userDetails.state;

  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-4 md:p-8 font-sans">
        
        {showWarningModal && (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-300">
                <div className="bg-[#1e1e2f] border-2 border-yellow-500 rounded-2xl p-8 max-w-md text-center">
                    <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4 animate-pulse" />
                    <h2 className="text-2xl font-bold text-white mb-2">Warning: Tab Switch Detected</h2>
                    <p className="text-slate-300 mb-6">This is your first and last warning. Another switch will disqualify you.</p>
                    <button onClick={() => setShowWarningModal(false)} className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-xl">I Understand</button>
                </div>
            </div>
        )}

        <div className="relative bg-[#0b0f1f] border border-white/10 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col min-h-[600px]">
            
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#020617]/50 backdrop-blur-md sticky top-0 z-20">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Briefcase className="text-purple-400" /> College Hiring Aptitude
                </h3>
                
                {step === 'quiz' ? (
                    <div className={`flex items-center gap-2 font-mono text-lg font-bold px-4 py-1.5 rounded-full border ${timeLeft < 60 ? 'bg-red-500/10 text-red-500 border-red-500/30 animate-pulse' : 'bg-purple-500/10 text-purple-400 border-purple-500/30'}`}>
                        <Timer className="w-4 h-4" /> {formatTime(timeLeft)}
                    </div>
                ) : (
                    <button onClick={() => router.back()} className="text-slate-400 hover:text-white"><X /></button>
                )}
            </div>

            <div className="p-8 overflow-y-auto custom-scrollbar flex-grow flex flex-col">
                
                {step === 'details' && (
                    <div className="space-y-6 flex flex-col justify-center h-full my-auto">
                        <div className="text-center mb-4">
                            <h4 className="text-3xl font-black text-white mb-2">InternX <span className="text-purple-500">Hiring</span> Assessment</h4>
                            <p className="text-slate-400 text-xs">Strict proctoring enabled. Ensure a stable connection before proceeding.</p>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Full Name</label>
                                    <input type="text" className="w-full bg-black/20 border border-white/10 rounded-xl p-3.5 text-sm focus:border-purple-500 outline-none" value={userDetails.name} onChange={(e) => setUserDetails({...userDetails, name: e.target.value})}/>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Email Address</label>
                                    <div className="relative">
                                        <input type="email" disabled={otpVerified || otpSent} className="w-full bg-black/20 border border-white/10 rounded-xl p-3.5 pr-28 text-sm focus:border-purple-500 outline-none" value={userDetails.email} onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}/>
                                        <div className="absolute right-1.5 top-1.5 bottom-1.5">
                                            {otpVerified ? <div className="h-full px-3 flex items-center gap-1.5 bg-green-500/10 text-green-400 rounded-lg text-[10px] font-bold"><CheckCircle2 className="w-3.5 h-3.5" /> Verified</div> : !otpSent && <button onClick={handleSendOtp} disabled={!userDetails.email || !userDetails.name || otpLoading} className="h-full px-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-[10px] font-bold text-white">{otpLoading ? <Loader2 className="animate-spin w-3.5 h-3.5"/> : "Verify OTP"}</button>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {otpSent && !otpVerified && (
                                <div className="flex gap-2">
                                    <input type="text" placeholder="OTP" maxLength={6} className="flex-grow bg-black/40 border border-white/20 rounded-xl p-3 text-center tracking-widest font-mono text-sm focus:border-purple-500 outline-none" value={userOtpInput} onChange={(e) => setUserOtpInput(e.target.value)}/>
                                    <button onClick={handleVerifyOtp} className="px-6 bg-green-600 text-white rounded-xl text-sm font-bold">Submit</button>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Phone Number</label>
                                    <div className="flex gap-2 h-[46px]">
                                        <select value={userDetails.countryCode} onChange={(e) => setUserDetails({...userDetails, countryCode: e.target.value})} className="w-24 shrink-0 bg-black/20 border border-white/10 rounded-xl pl-3 pr-2 outline-none text-sm"><option value="+91">🇮🇳 +91</option></select>
                                        <input type="tel" className="flex-grow bg-black/20 border border-white/10 rounded-xl px-4 text-sm focus:border-purple-500 outline-none" value={userDetails.phone} onChange={(e) => setUserDetails({...userDetails, phone: e.target.value})}/>
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Course / Qualification</label>
                                    <select value={userDetails.qualification} onChange={(e) => setUserDetails({...userDetails, qualification: e.target.value})} className="w-full h-[46px] bg-black/20 border border-white/10 rounded-xl px-4 text-sm focus:border-purple-500 outline-none">
                                        <option value="" disabled className="bg-[#0b0f1f]">Select Qualification</option>
                                        <option value="B.Tech/BE" className="bg-[#0b0f1f]">B.Tech/B.E.</option>
                                        <option value="BCA" className="bg-[#0b0f1f]">BCA</option>
                                        <option value="MCA" className="bg-[#0b0f1f]">MCA</option>
                                        <option value="Other" className="bg-[#0b0f1f]">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">College Name</label>
                                <div className="relative">
                                    <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input type="text" className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-sm focus:border-purple-500 outline-none" value={userDetails.collegeName} onChange={(e) => setUserDetails({...userDetails, collegeName: e.target.value})}/>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">City</label>
                                    <input type="text" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:border-purple-500 outline-none" value={userDetails.city} onChange={(e) => setUserDetails({...userDetails, city: e.target.value})}/>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">State</label>
                                    <input type="text" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:border-purple-500 outline-none" value={userDetails.state} onChange={(e) => setUserDetails({...userDetails, state: e.target.value})}/>
                                </div>
                            </div>
                        </div>

                        <button onClick={generateQuiz} disabled={!isFormValid} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 mt-4">
                            {otpVerified ? "Start Assessment" : "Verify Email to Start"}
                        </button>
                    </div>
                )}

                {step === 'loading' && (
                    <div className="flex flex-col items-center justify-center h-full my-auto py-12">
                        <Loader2 className="w-16 h-16 text-purple-500 animate-spin mb-6" />
                        <h2 className="text-2xl font-bold text-white mb-2">Generating Technical Assessment...</h2>
                        <p className="text-slate-500 text-sm">Compiling 25 advanced questions based on your profile.</p>
                    </div>
                )}

                {step === 'quiz' && questions.length > 0 && (
                    <div className="flex flex-col h-full">
                        <div className="flex justify-between items-center mb-8">
                            <div className="text-sm text-slate-400">Question <span className="text-white font-bold text-lg">{currentQuestionIndex + 1}</span> / {questions.length}</div>
                            <span className="uppercase font-bold text-[10px] px-3 py-1 rounded-full border bg-red-500/10 text-red-400 border-red-500/20">HARD</span>
                        </div>

                        <h4 className="text-xl md:text-2xl font-bold text-white mb-8 leading-relaxed">{questions[currentQuestionIndex].question}</h4>

                        <div className="space-y-3 mb-8">
                            {questions[currentQuestionIndex].options.map((opt, idx) => (
                                <button key={idx} onClick={() => setAnswers({...answers, [questions[currentQuestionIndex].id]: opt})} className={`w-full text-left p-4 rounded-xl border-2 transition-all ${answers[questions[currentQuestionIndex].id] === opt ? 'bg-purple-600 border-purple-500 text-white' : 'bg-white/5 border-white/5 text-slate-300'}`}>
                                    {opt}
                                </button>
                            ))}
                        </div>

                        <div className="mt-auto flex justify-between pt-6 border-t border-white/10">
                            <button disabled={currentQuestionIndex === 0} onClick={() => setCurrentQuestionIndex(prev => prev - 1)} className="px-6 py-3 rounded-xl bg-white/5 text-slate-400 disabled:opacity-30">Previous</button>
                            {currentQuestionIndex < questions.length - 1 ? (
                                <button onClick={() => setCurrentQuestionIndex(prev => prev + 1)} className="px-8 py-3 rounded-xl bg-white text-black font-bold">Next</button>
                            ) : (
                                <button onClick={submitQuiz} className="px-8 py-3 rounded-xl bg-green-600 text-white font-bold">Submit Assessment</button>
                            )}
                        </div>
                    </div>
                )}

                {step === 'result' && (
                    <div className="text-center py-6 h-full flex flex-col justify-center">
                        <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                        <h2 className="text-3xl font-black text-white mb-2">Assessment Completed</h2>
                        <p className="text-slate-400 mb-8">Your test has been successfully submitted for review.</p>
                        
                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mb-8 inline-block mx-auto min-w-[200px]">
                            <div className="text-xs text-slate-500 uppercase font-bold mb-2">Final Score</div>
                            <div className="text-4xl font-black text-white">{score}<span className="text-xl text-slate-500">/50</span></div>
                        </div>

                        <p className="text-sm text-slate-500 max-w-md mx-auto">Our recruitment team will review your detailed MCQ report and contact you shortly regarding the next steps.</p>
                    </div>
                )}
                
                {step === 'disqualified' && (
                    <div className="text-center py-6 h-full flex flex-col justify-center">
                        <Ban className="w-16 h-16 text-red-500 mx-auto mb-4 animate-pulse" />
                        <h2 className="text-3xl font-black text-white mb-4">Test Disqualified</h2>
                        <p className="text-slate-400 text-sm">Session terminated due to multiple tab switches. A report has been sent to the hiring team.</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}

export default function AptitudeTestPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#020617]"><Loader2 className="animate-spin text-purple-500" /></div>}>
        <AptitudeTestContent />
    </Suspense>
  );
}