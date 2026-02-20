// app/scholarship-test/page.tsx

'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { 
  Loader2, ChevronRight, Trophy, Mail, GraduationCap, X, 
  CheckCircle2, ArrowRight, Globe, ShieldCheck, ChevronDown,
  Timer, AlertTriangle, Ban
} from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string; 
  difficulty: 'easy' | 'medium' | 'hard';
}

interface UserDetails {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
}

const countryList = [
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+1", flag: "🇺🇸", name: "USA" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+1", flag: "🇨🇦", name: "Canada" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+81", flag: "🇯🇵", name: "Japan" },
  { code: "+86", flag: "🇨🇳", name: "China" },
  { code: "+7", flag: "🇷🇺", name: "Russia" },
  { code: "+55", flag: "🇧🇷", name: "Brazil" },
];

const fallbackQuestions: Question[] = [
  { id: 1, question: "Which programming language is known as the backbone of AI?", options: ["Java", "Python", "C++", "Swift"], answer: "Python", difficulty: "easy" },
  { id: 2, question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Tool Multi Language", "None"], answer: "Hyper Text Markup Language", difficulty: "easy" },
  { id: 3, question: "Which of these is a JavaScript library for building UIs?", options: ["React", "Laravel", "Django", "Flask"], answer: "React", difficulty: "easy" },
  { id: 4, question: "What is the full form of SQL?", options: ["Structured Query Language", "Simple Query Logic", "System Query Language", "None"], answer: "Structured Query Language", difficulty: "easy" },
  { id: 5, question: "Which company developed ChatGPT?", options: ["OpenAI", "Google", "Microsoft", "Meta"], answer: "OpenAI", difficulty: "easy" },
  { id: 6, question: "What is 2 + 2?", options: ["3", "4", "5", "22"], answer: "4", difficulty: "easy" },
  { id: 7, question: "Which symbol is used for single-line comments in Python?", options: ["//", "/*", "#", "--"], answer: "#", difficulty: "easy" },
  { id: 8, question: "What is the output of print(10 % 3)?", options: ["3", "1", "10", "0"], answer: "1", difficulty: "easy" },
  { id: 9, question: "Which data structure follows LIFO principle?", options: ["Queue", "Stack", "Array", "Tree"], answer: "Stack", difficulty: "medium" },
  { id: 10, question: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"], answer: "O(log n)", difficulty: "medium" },
];

function ScholarshipTestContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
   
  const planName = searchParams.get('plan') as 'Foundation' | 'Elite' || 'Foundation';

  const [step, setStep] = useState<'details' | 'loading' | 'quiz' | 'result' | 'disqualified'>('details');
  const [userDetails, setUserDetails] = useState<UserDetails>({ name: '', email: '', phone: '', countryCode: '+91' });
  
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [serverOtp, setServerOtp] = useState('');
  const [userOtpInput, setUserOtpInput] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [score, setScore] = useState(0);
  const [generatedCode, setGeneratedCode] = useState('');
  const [isInternational, setIsInternational] = useState(false);

  const [timeLeft, setTimeLeft] = useState(900); 
  const [warnings, setWarnings] = useState(0);
  const [showWarningModal, setShowWarningModal] = useState(false);

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

  useEffect(() => {
    const checkLocation = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000); 

        const response = await fetch('https://ipapi.co/json/', { 
            signal: controller.signal 
        });
        
        clearTimeout(timeoutId);

        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        if (data && data.country_code !== 'IN') {
          setIsInternational(true);
          const found = countryList.find(c => c.code === data.country_calling_code);
          if(found) setUserDetails(prev => ({...prev, countryCode: found.code}));
        }
      } catch (error) {
        console.warn("Location detection blocked. Defaulting to India.", error);
        setIsInternational(false);
      }
    };
    checkLocation();
  }, []);

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
        if (document.hidden) {
            handleCheatAttempt("switched tabs or minimized the window");
        }
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

      fetch('https://cms-tau-ivory.vercel.app/api/monitoring/alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            studentName: userDetails.name || "Unknown Student", 
            action: actionType 
        }),
      }).catch(err => console.error("Alert Sync Failed", err));

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

      fetch('https://cms-tau-ivory.vercel.app/api/monitoring/alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            studentName: userDetails.name || "Unknown Student", 
            action: "was DISQUALIFIED for repeated cheating attempts" 
        }),
      }).catch(err => console.error("Alert Sync Failed", err));
      
      fetch('/api/scholarship-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            status: 'disqualified', 
            name: userDetails.name,
            email: userDetails.email,
            phone: fullPhoneNumber,
            planName: planName
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
      } else {
        alert("Failed to send OTP. Please check your email address.");
      }
    } catch (e) {
      console.error(e);
      alert("Error sending OTP. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = () => {
    if(userOtpInput === serverOtp) {
      setOtpVerified(true);
      setOtpSent(false); 
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const generateQuiz = async () => {
    setStep('loading');
    try {
        if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
            console.warn("API Key missing, using fallback.");
            await new Promise(r => setTimeout(r, 1500)); 
            setQuestions(fallbackQuestions);
            setStep('quiz');
            return;
        }

        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash", 
            generationConfig: { responseMimeType: "application/json" }
        });

        const prompt = `Generate 25 multiple choice questions on General Aptitude, Basic Programming Logic, and AI awareness. 
        Structure: 
        - 10 Very Easy
        - 5 Medium
        - 10 Hard
        Format: JSON Array of objects with keys: id (number), question (string), options (array of 4 strings), answer (string), difficulty (string).`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();
        
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const firstBracket = text.indexOf('[');
        const lastBracket = text.lastIndexOf(']');
        if (firstBracket !== -1 && lastBracket !== -1) {
            text = text.substring(firstBracket, lastBracket + 1);
        }

        const data: Question[] = JSON.parse(text);
        if (!Array.isArray(data) || data.length === 0) throw new Error("Invalid data format");

        setQuestions(data); 
        setStep('quiz');
    } catch (error) {
        console.error("AI Generation Failed, using fallback", error);
        setQuestions(fallbackQuestions);
        setStep('quiz');
    }
  };

  const submitQuiz = async () => {
     let calculatedScore = 0;
     const marksPerQuestion = 2; 

     questions.forEach(q => {
         if(answers[q.id] === q.answer) {
             calculatedScore += marksPerQuestion; 
         }
     });
     
     setScore(calculatedScore);
     
     const randomChars = Math.random().toString(36).substring(2, 5).toUpperCase();
     const randomDigits = Math.floor(1000 + Math.random() * 9000);
     const formattedCode = `SCH${randomChars}/${randomDigits}`;
     setGeneratedCode(formattedCode);

     const maxScholarship = planName === 'Foundation' ? 30 : 40;
     const totalPossibleScore = questions.length * 2; 
     const rawPercentage = (calculatedScore / totalPossibleScore) * maxScholarship;
     const discountPercent = Math.min(Math.round(rawPercentage), maxScholarship);

     const fullPhoneNumber = `${userDetails.countryCode} ${userDetails.phone}`;

     fetch('/api/scholarship-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            status: 'passed', 
            name: userDetails.name,
            email: userDetails.email,
            phone: fullPhoneNumber,
            score: calculatedScore,
            totalQuestions: questions.length,
            scholarshipCode: formattedCode,
            discount: discountPercent,
            planName: planName 
        })
     }).catch(err => console.error("Failed to send scholarship email", err));

     setStep('result');
  };

  const calculateScholarshipPercent = () => {
     const maxScholarship = planName === 'Foundation' ? 30 : 40;
     const totalPossibleScore = questions.length * 2; 
     const percentage = (score / totalPossibleScore) * maxScholarship;
     return Math.min(Math.round(percentage), maxScholarship);
  };

  const getGrade = () => {
     const percentage = (score / (questions.length * 2)) * 100;
     if (percentage >= 90) return 'A+';
     if (percentage >= 75) return 'A';
     if (percentage >= 60) return 'B';
     if (percentage >= 40) return 'C';
     return 'D';
  };

  const handleClaimAndProceed = () => {
     const discountPercent = calculateScholarshipPercent();
     
     let baseINR = planName === 'Foundation' ? 14999900 : 24999900; 
     let baseUSD = planName === 'Foundation' ? 199900 : 349900; 

     const multiplier = (100 - discountPercent) / 100;
     const finalINR = Math.round(baseINR * multiplier);
     const finalUSD = Math.round(baseUSD * multiplier);

     const priceDisplay = isInternational 
       ? `$${(finalUSD / 100).toLocaleString()}`
       : `₹${(finalINR / 100).toLocaleString('en-IN')}`;

     const params = new URLSearchParams({
       planId: planName.toLowerCase(),
       planName: planName,
       priceDisplay: priceDisplay,
       rawAmountINR: finalINR.toString(),
       rawAmountUSD: finalUSD.toString(),
       intl: isInternational ? 'true' : 'false',
       scholarshipCode: generatedCode,
       discount: discountPercent.toString()
     });

     router.push(`/checkout/b2c?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-4 md:p-8 font-sans">
        
        {showWarningModal && (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-300">
                <div className="bg-[#1e1e2f] border-2 border-yellow-500 rounded-2xl p-8 max-w-md text-center shadow-2xl shadow-yellow-500/20 transform scale-100 transition-transform">
                    <div className="bg-yellow-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <AlertTriangle className="w-10 h-10 text-yellow-500 animate-pulse" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Warning: Tab Switch Detected</h2>
                    <p className="text-slate-300 mb-6 text-sm leading-relaxed">
                        We detected that you navigated away from the test window. This is your <span className="text-yellow-400 font-bold underline">first and last warning</span>.
                        <br/><br/>
                        If you switch tabs or minimize the window again, you will be <strong>disqualified</strong> immediately.
                    </p>
                    <button 
                        onClick={() => setShowWarningModal(false)}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-yellow-500/20"
                    >
                        I Understand, Resume Test
                    </button>
                </div>
            </div>
        )}

        <div className="relative bg-[#0b0f1f] border border-white/10 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col min-h-[600px]">
            
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#020617]/50 backdrop-blur-md sticky top-0 z-20">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <GraduationCap className="text-blue-400" /> Scholarship Test
                </h3>
                
                {step === 'quiz' ? (
                    <div className={`flex items-center gap-2 font-mono text-lg font-bold px-4 py-1.5 rounded-full border transition-colors duration-500 ${timeLeft < 60 ? 'bg-red-500/10 text-red-500 border-red-500/30 animate-pulse' : 'bg-blue-500/10 text-blue-400 border-blue-500/30'}`}>
                        <Timer className="w-4 h-4" />
                        {formatTime(timeLeft)}
                    </div>
                ) : (
                    <button onClick={() => router.back()} className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors">
                        <X />
                    </button>
                )}
            </div>

            <div className="p-8 overflow-y-auto custom-scrollbar flex-grow flex flex-col">
                
                {step === 'details' && (
                    <div className="space-y-8 flex flex-col justify-center h-full my-auto">
                        <div className="text-center">
                            <h4 className="text-3xl font-black text-white mb-2">Apply for <span className="text-blue-500">{planName}</span> Scholarship</h4>
                            <p className="text-slate-400 text-sm max-w-md mx-auto">
                                <span className="block mt-2 text-slate-500 text-xs font-medium">
                                    Scholarship Upto 50,000/- INR For Indian Students Only.
                                </span>
                            </p>
                        </div>

                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Full Name</label>
                                <input 
                                    type="text" placeholder="John Doe" 
                                    className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    value={userDetails.name} onChange={(e) => setUserDetails({...userDetails, name: e.target.value})}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email Address</label>
                                <div className="relative">
                                    <input 
                                        type="email" placeholder="john@example.com" 
                                        disabled={otpVerified || otpSent}
                                        className={`w-full bg-black/20 border rounded-xl p-4 pr-28 text-white focus:outline-none transition-colors ${otpVerified ? 'border-green-500/50 text-green-400' : 'border-white/10 focus:border-blue-500'}`}
                                        value={userDetails.email} onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}
                                    />
                                    <div className="absolute right-2 top-1.5 bottom-1.5">
                                        {otpVerified ? (
                                            <div className="h-full px-4 flex items-center gap-2 bg-green-500/10 text-green-400 rounded-lg text-xs font-bold border border-green-500/20">
                                                <CheckCircle2 className="w-4 h-4" /> Verified
                                            </div>
                                        ) : (
                                            !otpSent && (
                                                <button 
                                                    onClick={handleSendOtp}
                                                    disabled={!userDetails.email || !userDetails.name || otpLoading}
                                                    className="h-full px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[80px]"
                                                >
                                                    {otpLoading ? <Loader2 className="w-4 h-4 animate-spin"/> : "Verify OTP"}
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>
                                
                                {otpSent && !otpVerified && (
                                    <div className="mt-3 flex gap-2 animate-in slide-in-from-top-2">
                                        <input 
                                            type="text" placeholder="Enter 6-digit OTP" maxLength={6}
                                            className="flex-grow bg-black/40 border border-white/20 rounded-xl p-3 text-white text-center tracking-widest font-mono text-lg focus:border-blue-500 outline-none"
                                            value={userOtpInput} onChange={(e) => setUserOtpInput(e.target.value)}
                                        />
                                        <button 
                                            onClick={handleVerifyOtp}
                                            className="px-6 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold transition-colors"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Phone Number</label>
                                <div className="flex gap-2 h-14">
                                    <div className="relative w-36 shrink-0 h-full">
                                        <select 
                                            value={userDetails.countryCode}
                                            onChange={(e) => setUserDetails({...userDetails, countryCode: e.target.value})}
                                            className="w-full h-full appearance-none bg-black/20 border border-white/10 rounded-xl pl-3 pr-8 text-white focus:outline-none focus:border-blue-500 cursor-pointer text-sm"
                                        >
                                            {countryList.map((country) => (
                                                <option key={country.name} value={country.code} className="bg-[#0b0f1f]">
                                                    {country.flag} {country.code}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                            <ChevronDown className="w-4 h-4" />
                                        </div>
                                    </div>
                                    <input 
                                        type="tel" placeholder="98765 43210" 
                                        className="flex-grow h-full bg-black/20 border border-white/10 rounded-xl px-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                        value={userDetails.phone} onChange={(e) => setUserDetails({...userDetails, phone: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={generateQuiz}
                            disabled={!userDetails.name || !otpVerified || !userDetails.phone}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 shadow-lg shadow-blue-900/20"
                        >
                            {!otpVerified ? (
                                <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Verify Email to Start</span>
                            ) : (
                                <>Start Assessment <ChevronRight className="w-5 h-5" /></>
                            )}
                        </button>
                    </div>
                )}

                {step === 'loading' && (
                    <div className="flex flex-col items-center justify-center h-full my-auto py-12">
                        <Loader2 className="w-16 h-16 text-blue-500 animate-spin mb-6" />
                        <h2 className="text-2xl font-bold text-white mb-2">Generating Questions...</h2>
                        <p className="text-slate-500 text-sm">Curating 25 questions based on your profile.</p>
                    </div>
                )}

                {step === 'quiz' && questions.length > 0 && (
                    <div className="flex flex-col h-full">
                        <div className="flex justify-between items-center mb-8">
                            <div className="text-sm text-slate-400">
                                Question <span className="text-white font-bold">{currentQuestionIndex + 1}</span> / {questions.length}
                            </div>
                            <span className={`uppercase font-bold text-[10px] px-3 py-1 rounded-full border ${
                                questions[currentQuestionIndex].difficulty === 'easy' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                questions[currentQuestionIndex].difficulty === 'medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                'bg-red-500/10 text-red-400 border-red-500/20'
                            }`}>
                                {questions[currentQuestionIndex].difficulty === 'easy' ? 'Easy' : questions[currentQuestionIndex].difficulty}
                            </span>
                        </div>

                        <h4 className="text-xl md:text-2xl font-bold text-white mb-8 leading-relaxed">
                            {questions[currentQuestionIndex].question}
                        </h4>

                        <div className="space-y-3 mb-8">
                            {questions[currentQuestionIndex].options.map((opt, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => setAnswers({...answers, [questions[currentQuestionIndex].id]: opt})}
                                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                                        answers[questions[currentQuestionIndex].id] === opt 
                                        ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/20 transform scale-[1.02]' 
                                        : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10 hover:border-white/20'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${answers[questions[currentQuestionIndex].id] === opt ? 'border-white' : 'border-slate-500'}`}>
                                            {answers[questions[currentQuestionIndex].id] === opt && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                                        </div>
                                        {opt}
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="mt-auto flex justify-between pt-6 border-t border-white/10">
                            <button 
                                disabled={currentQuestionIndex === 0}
                                onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                                className="px-6 py-3 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed font-bold text-sm"
                            >
                                Previous
                            </button>
                            {currentQuestionIndex < questions.length - 1 ? (
                                <button 
                                    onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                                    className="px-8 py-3 rounded-xl bg-white text-black font-bold hover:bg-slate-200 transition-colors shadow-lg"
                                >
                                    Next Question
                                </button>
                            ) : (
                                <button 
                                    onClick={submitQuiz}
                                    className="px-8 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-500 transition-colors shadow-lg shadow-green-900/20"
                                >
                                    Submit Test
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {step === 'result' && (
                    <div className="text-center py-6 h-full flex flex-col justify-center animate-in fade-in zoom-in-95 duration-500">
                        <div className="inline-flex justify-center items-center w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-black mb-6 shadow-2xl shadow-orange-500/20 mx-auto">
                            <Trophy className="w-12 h-12" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-2">Congratulations!</h2>
                        <p className="text-slate-400 mb-8">You have successfully qualified for the scholarship.</p>

                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                                <div className="text-xs text-slate-500 uppercase font-bold mb-1">Score</div>
                                <div className="text-2xl font-black text-white">{score}/{questions.length * 2}</div>
                            </div>
                            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                                <div className="text-xs text-slate-500 uppercase font-bold mb-1">Grade</div>
                                <div className="text-2xl font-black text-blue-400">{getGrade()}</div>
                            </div>
                            <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 p-4 rounded-2xl border border-green-500/30 relative overflow-hidden">
                                <div className="absolute inset-0 bg-green-500/10 animate-pulse"></div>
                                <div className="relative z-10">
                                    <div className="text-xs text-green-400 uppercase font-bold mb-1">Discount</div>
                                    <div className="text-2xl font-black text-white">{calculateScholarshipPercent()}%</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-black/40 p-6 rounded-xl border border-dashed border-slate-700 mb-8 relative group cursor-pointer hover:border-blue-500/50 transition-colors">
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-2 font-bold">Scholarship Code Generated</p>
                            <div className="text-3xl font-mono font-black text-blue-400 tracking-wider">{generatedCode}</div>
                            <p className="text-xs text-slate-500 mt-3 flex items-center justify-center gap-1">
                                <Mail className="w-3 h-3" /> Sent to <span className="text-white">{userDetails.email}</span>
                            </p>
                        </div>

                        <button 
                            onClick={handleClaimAndProceed}
                            className="w-full bg-white text-black font-black uppercase tracking-widest py-5 rounded-xl hover:bg-slate-200 transition-all shadow-xl flex items-center justify-center gap-2 group"
                        >
                            Claim & Register Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        
                        <p className="text-xs text-slate-500 mt-4">
                            Discount will be automatically applied at checkout.
                        </p>
                    </div>
                )}

                {step === 'disqualified' && (
                    <div className="text-center py-6 h-full flex flex-col justify-center animate-in fade-in zoom-in-95">
                        <div className="inline-flex justify-center items-center w-24 h-24 rounded-full bg-red-500/10 text-red-500 mb-6 border-4 border-red-500/20 mx-auto animate-pulse">
                            <Ban className="w-12 h-12" />
                        </div>
                        <h2 className="text-3xl font-black text-white mb-4">Test Disqualified</h2>
                        <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-xl mb-8">
                            <p className="text-red-300 font-bold mb-2 uppercase tracking-wide">Reason: Anti-Cheating Violation</p>
                            <p className="text-slate-400 text-sm">
                                You switched tabs or minimized the window multiple times despite warnings. 
                                <br/>Our system has automatically flagged and terminated this session.
                            </p>
                        </div>
                        <p className="text-slate-500 text-xs mb-8">
                            A report has been sent to our administration team.<br/>
                            You are not eligible for the scholarship at this time.
                        </p>
                        <button onClick={() => router.push('/')} className="w-full bg-white/5 border border-white/10 text-white font-bold py-4 rounded-xl hover:bg-white/10 transition-all">
                            Return to Home
                        </button>
                    </div>
                )}

            </div>
        </div>
    </div>
  );
}

export default function ScholarshipTestPage() {
  return (
    <Suspense fallback={
        <div className="min-h-screen bg-[#020617] flex items-center justify-center">
            <Loader2 className="animate-spin text-blue-500 w-10 h-10" />
        </div>
    }>
        <ScholarshipTestContent />
    </Suspense>
  );
}