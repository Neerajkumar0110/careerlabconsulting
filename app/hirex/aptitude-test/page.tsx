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

const fallbackQuestions: Question[] = [
  { id: 1, question: "What is the time complexity of searching in a perfectly balanced Binary Search Tree?", options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"], answer: "O(log n)", difficulty: "hard" },
  { id: 2, question: "Which algorithm finds the shortest path considering negative edge weights?", options: ["Dijkstra's", "Bellman-Ford", "A*", "Prim's"], answer: "Bellman-Ford", difficulty: "hard" },
  { id: 3, question: "What is the primary function of a B-Tree in databases?", options: ["Sort data in memory", "Reduce disk I/O operations", "Encrypt stored procedures", "Manage user sessions"], answer: "Reduce disk I/O operations", difficulty: "hard" },
  { id: 4, question: "In a microservices architecture, what pattern handles distributed transactions?", options: ["Singleton", "Saga Pattern", "MVC Pattern", "Observer"], answer: "Saga Pattern", difficulty: "hard" },
  { id: 5, question: "Which of these is NOT a characteristic of ACID properties in SQL?", options: ["Atomicity", "Consistency", "Isolation", "Distribution"], answer: "Distribution", difficulty: "hard" },
  { id: 6, question: "What is 'Thrashing' in Operating Systems?", options: ["High CPU utilization", "Excessive disk swapping over processing", "Memory leak", "Network packet loss"], answer: "Excessive disk swapping over processing", difficulty: "hard" },
  { id: 7, question: "In Python, what is the Global Interpreter Lock (GIL) primarily responsible for?", options: ["Garbage collection", "Managing multi-processing", "Preventing multiple native threads from executing Python bytecodes at once", "Optimizing database queries"], answer: "Preventing multiple native threads from executing Python bytecodes at once", difficulty: "hard" },
  { id: 8, question: "Which design pattern ensures only one instance of a class exists?", options: ["Factory", "Observer", "Decorator", "Singleton"], answer: "Singleton", difficulty: "hard" },
  { id: 9, question: "What is the worst-case time complexity of QuickSort?", options: ["O(n log n)", "O(n)", "O(n^2)", "O(log n)"], answer: "O(n^2)", difficulty: "hard" },
  { id: 10, question: "Which HTTP status code signifies 'Forbidden'?", options: ["401", "403", "404", "500"], answer: "403", difficulty: "hard" },
  { id: 11, question: "In Node.js, how does the Event Loop handle asynchronous operations?", options: ["Multi-threading", "Single-threaded non-blocking I/O", "Synchronous blocking", "Parallel processing"], answer: "Single-threaded non-blocking I/O", difficulty: "hard" },
  { id: 12, question: "What is 'Hoisting' in JavaScript?", options: ["Lifting heavy data", "Moving variable declarations to the top", "Removing undefined variables", "Compiling code faster"], answer: "Moving variable declarations to the top", difficulty: "hard" },
  { id: 13, question: "Which normal form in RDBMS ensures no transitive dependencies?", options: ["1NF", "2NF", "3NF", "BCNF"], answer: "3NF", difficulty: "hard" },
  { id: 14, question: "What does the CAP theorem stand for in distributed systems?", options: ["Consistency, Availability, Partition tolerance", "Compute, API, Performance", "Cache, Access, Process", "None of the above"], answer: "Consistency, Availability, Partition tolerance", difficulty: "hard" },
  { id: 15, question: "Which sorting algorithm is most efficient for sorting a nearly sorted array?", options: ["Merge Sort", "Quick Sort", "Insertion Sort", "Heap Sort"], answer: "Insertion Sort", difficulty: "hard" },
  { id: 16, question: "What is a 'Race Condition' in concurrent programming?", options: ["When threads run at the same speed", "When system behavior depends on the sequence or timing of uncontrollable events", "A network latency issue", "A type of memory leak"], answer: "When system behavior depends on the sequence or timing of uncontrollable events", difficulty: "hard" },
  { id: 17, question: "Which data structure is best for implementing a priority queue?", options: ["Linked List", "Stack", "Heap", "Array"], answer: "Heap", difficulty: "hard" },
  { id: 18, question: "What is the purpose of a Reverse Proxy?", options: ["To block incoming traffic", "To direct client requests to the appropriate backend server", "To store cache locally", "To encrypt passwords"], answer: "To direct client requests to the appropriate backend server", difficulty: "hard" },
  { id: 19, question: "In Git, what is a 'detached HEAD' state?", options: ["A corrupted branch", "Not checked out to any specific branch, just a commit", "A deleted repository", "A failed merge"], answer: "Not checked out to any specific branch, just a commit", difficulty: "hard" },
  { id: 20, question: "What is the primary use of JWT (JSON Web Tokens)?", options: ["Database indexing", "Data compression", "Securely transmitting information between parties as a JSON object", "Rendering HTML elements"], answer: "Securely transmitting information between parties as a JSON object", difficulty: "hard" },
  { id: 21, question: "Which OSI layer is responsible for routing and logical addressing?", options: ["Data Link Layer", "Network Layer", "Transport Layer", "Application Layer"], answer: "Network Layer", difficulty: "hard" },
  { id: 22, question: "What is 'Deadlock' in operating systems?", options: ["A system crash", "When two or more processes are unable to proceed because each is waiting for the other", "A full hard drive", "A frozen UI"], answer: "When two or more processes are unable to proceed because each is waiting for the other", difficulty: "hard" },
  { id: 23, question: "Which AWS service is commonly used as a highly scalable message queuing service?", options: ["Amazon EC2", "Amazon S3", "Amazon SQS", "Amazon RDS"], answer: "Amazon SQS", difficulty: "hard" },
  { id: 24, question: "What does CORS stand for?", options: ["Cross-Origin Resource Sharing", "Central Object Retrieval System", "Code Origin Request Security", "None of the above"], answer: "Cross-Origin Resource Sharing", difficulty: "hard" },
  { id: 25, question: "Which concept allows a subclass to provide a specific implementation of a method already provided by its superclass?", options: ["Overloading", "Overriding", "Encapsulation", "Abstraction"], answer: "Overriding", difficulty: "hard" }
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

  const generateQuiz = async (retryCount = 0) => {
    setStep('loading');
    
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
        console.warn("API Key missing, using fallback.");
        setTimeout(() => {
            setQuestions(fallbackQuestions);
            setStep('quiz');
        }, 1500);
        return;
    }

    try {
        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash", 
            generationConfig: { responseMimeType: "application/json" }
        });

        const timestamp = Date.now();
        const randomSeed = Math.floor(Math.random() * 9999999);
        const techKeywords = ['Data Structures', 'Algorithms', 'System Design', 'Cloud Architecture', 'Databases', 'Networking', 'Cybersecurity', 'Machine Learning'];
        
        const randomTopics = techKeywords.sort(() => 0.5 - Math.random()).slice(0, 3).join(', ');

        const prompt = `You are an expert technical interviewer. Create a HIGHLY UNIQUE College Hiring Aptitude Test. 
        IMPORTANT: This must be a completely new set of questions. Do not repeat previous generations.
        
        Candidate Context:
        - Name: ${userDetails.name}
        - Qualification: ${userDetails.qualification || 'Computer Science Engineering'}
        - Special Focus Topics for this specific test: ${randomTopics}
        - Randomizer Hash: ${timestamp}-${randomSeed} (Use this to ensure 100% unique output).
        
        You MUST generate EXACTLY 25 multiple choice questions.
        
        The composition MUST strictly be:
        - ALL 25 questions MUST be of difficulty "hard". 
        - They must test advanced engineering logic, problem-solving, and the special focus topics mentioned above.
        
        Format requirement: Return ONLY a valid JSON Array of exactly 25 objects. 
        Keys: id (number 1 to 25), question (string), options (array of exactly 4 strings), answer (string matching one option), difficulty (string "hard").`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text().replace(/```json/g, '').replace(/```/g, '').trim();
        
        const firstBracket = text.indexOf('[');
        const lastBracket = text.lastIndexOf(']');
        if (firstBracket !== -1 && lastBracket !== -1) {
            text = text.substring(firstBracket, lastBracket + 1);
        }

        const data: Question[] = JSON.parse(text);
        
        if (!Array.isArray(data) || data.length !== 25) {
            throw new Error("Invalid question count from AI");
        }

        const shuffledData = data.sort(() => 0.5 - Math.random()).map((q, i) => ({...q, id: i + 1}));

        setQuestions(shuffledData); 
        setStep('quiz');

    } catch (error: any) {
        console.warn(`Attempt ${retryCount + 1} Failed:`, error?.message);
        
        if (retryCount < 1 && error?.message?.includes('429')) {
            setTimeout(() => {
                generateQuiz(retryCount + 1);
            }, 2500); 
            return;
        }

        const shuffledFallback = [...fallbackQuestions].sort(() => 0.5 - Math.random()).map((q, i) => ({...q, id: i + 1}));
        setQuestions(shuffledFallback);
        setStep('quiz');
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
                    <Briefcase className="text-purple-400" /> College Hiring Aptitude
                </h3>
                
                {step === 'quiz' ? (
                    <div className={`flex items-center gap-2 font-mono text-lg font-bold px-4 py-1.5 rounded-full border transition-colors duration-500 ${timeLeft < 60 ? 'bg-red-500/10 text-red-500 border-red-500/30 animate-pulse' : 'bg-purple-500/10 text-purple-400 border-purple-500/30'}`}>
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
                    <div className="space-y-6 flex flex-col justify-center h-full my-auto">
                        <div className="text-center mb-4">
                            <h4 className="text-3xl font-black text-white mb-2">InternX <span className="text-purple-500">Hiring</span> Assessment</h4>
                            <p className="text-slate-400 text-sm max-w-md mx-auto">
                                <span className="block mt-2 text-slate-500 text-xs font-medium">
                                    Strict proctoring enabled. Ensure a stable connection before proceeding.
                                </span>
                            </p>
                        </div>

                        <div className="space-y-4">
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Full Name</label>
                                    <input 
                                        type="text" placeholder="John Doe" 
                                        className="w-full bg-black/20 border border-white/10 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                                        value={userDetails.name} onChange={(e) => setUserDetails({...userDetails, name: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Email Address</label>
                                    <div className="relative">
                                        <input 
                                            type="email" placeholder="john@example.com" 
                                            disabled={otpVerified || otpSent}
                                            className={`w-full bg-black/20 border rounded-xl p-3.5 pr-28 text-sm text-white focus:outline-none transition-colors ${otpVerified ? 'border-green-500/50 text-green-400' : 'border-white/10 focus:border-purple-500'}`}
                                            value={userDetails.email} onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}
                                        />
                                        <div className="absolute right-1.5 top-1.5 bottom-1.5">
                                            {otpVerified ? (
                                                <div className="h-full px-3 flex items-center gap-1.5 bg-green-500/10 text-green-400 rounded-lg text-[10px] font-bold border border-green-500/20">
                                                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                                                </div>
                                            ) : (
                                                !otpSent && (
                                                    <button 
                                                        onClick={handleSendOtp}
                                                        disabled={!userDetails.email || !userDetails.name || otpLoading}
                                                        className="h-full px-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-[10px] font-bold transition-all disabled:opacity-50 flex items-center justify-center min-w-[70px]"
                                                    >
                                                        {otpLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin"/> : "Verify OTP"}
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {otpSent && !otpVerified && (
                                <div className="flex gap-2 animate-in slide-in-from-top-2">
                                    <input 
                                        type="text" placeholder="Enter 6-digit OTP" maxLength={6}
                                        className="flex-grow bg-black/40 border border-white/20 rounded-xl p-3 text-white text-center tracking-widest font-mono text-sm focus:border-purple-500 outline-none"
                                        value={userOtpInput} onChange={(e) => setUserOtpInput(e.target.value)}
                                    />
                                    <button onClick={handleVerifyOtp} className="px-6 bg-green-600 hover:bg-green-500 text-white rounded-xl text-sm font-bold transition-colors">
                                        Submit
                                    </button>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Phone Number</label>
                                    <div className="flex gap-2 h-[46px]">
                                        <div className="relative w-28 shrink-0 h-full">
                                            <select 
                                                value={userDetails.countryCode}
                                                onChange={(e) => setUserDetails({...userDetails, countryCode: e.target.value})}
                                                className="w-full h-full appearance-none bg-black/20 border border-white/10 rounded-xl pl-3 pr-6 text-white focus:outline-none focus:border-purple-500 cursor-pointer text-sm"
                                            >
                                                {countryList.map((country) => (
                                                    <option key={country.name} value={country.code} className="bg-[#0b0f1f]">
                                                        {country.flag} {country.code}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                                <ChevronDown className="w-3 h-3" />
                                            </div>
                                        </div>
                                        <input 
                                            type="tel" placeholder="98765 43210" 
                                            className="flex-grow h-full bg-black/20 border border-white/10 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                                            value={userDetails.phone} onChange={(e) => setUserDetails({...userDetails, phone: e.target.value})}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Highest Qualification</label>
                                    <div className="relative h-[46px]">
                                        <select 
                                            value={userDetails.qualification}
                                            onChange={(e) => setUserDetails({...userDetails, qualification: e.target.value})}
                                            className="w-full h-full appearance-none bg-black/20 border border-white/10 rounded-xl pl-4 pr-8 text-white focus:outline-none focus:border-purple-500 cursor-pointer text-sm"
                                        >
                                            <option value="" disabled className="bg-[#0b0f1f] text-slate-500">Select Qualification</option>
                                            <option value="B.Tech/BE" className="bg-[#0b0f1f]">B.Tech/B.E.</option>
                                            <option value="BCA" className="bg-[#0b0f1f]">BCA</option>
                                            <option value="B.Sc" className="bg-[#0b0f1f]">B.Sc (Computer Science/IT)</option>
                                            <option value="MCA" className="bg-[#0b0f1f]">MCA</option>
                                            <option value="M.Tech/ME" className="bg-[#0b0f1f]">M.Tech/M.E.</option>
                                            <option value="Diploma" className="bg-[#0b0f1f]">Diploma</option>
                                            <option value="Other" className="bg-[#0b0f1f]">Other</option>
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                            <ChevronDown className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">College / University Name</label>
                                <div className="relative">
                                    <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input 
                                        type="text" placeholder="Enter your college name" 
                                        className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                                        value={userDetails.collegeName} onChange={(e) => setUserDetails({...userDetails, collegeName: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">City</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                        <input 
                                            type="text" placeholder="e.g. New Delhi" 
                                            className="w-full bg-black/20 border border-white/10 rounded-xl pl-9 pr-4 py-3.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                                            value={userDetails.city} onChange={(e) => setUserDetails({...userDetails, city: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">State</label>
                                    <input 
                                        type="text" placeholder="e.g. Delhi" 
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                                        value={userDetails.state} onChange={(e) => setUserDetails({...userDetails, state: e.target.value})}
                                    />
                                </div>
                            </div>

                        </div>

                        <div className="pt-2">
                            <button 
                                onClick={() => generateQuiz(0)}
                                disabled={!isFormValid}
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 shadow-lg shadow-purple-900/20"
                            >
                                {!otpVerified ? (
                                    <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Verify Email to Start</span>
                                ) : !isFormValid ? (
                                    <span className="flex items-center gap-2">Fill all details to proceed</span>
                                ) : (
                                    <>Start Assessment <ChevronRight className="w-5 h-5" /></>
                                )}
                            </button>
                        </div>
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
                    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="flex justify-between items-center mb-8">
                            <div className="text-sm text-slate-400">
                                Question <span className="text-white font-bold text-lg">{currentQuestionIndex + 1}</span> / {questions.length}
                            </div>
                            <span className="uppercase font-bold text-[10px] px-3 py-1 rounded-full border bg-red-500/10 text-red-400 border-red-500/20">HARD</span>
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
                                        ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-900/20 transform scale-[1.01]' 
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
                                    className="px-8 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-500 transition-colors shadow-lg shadow-green-900/20 flex items-center gap-2"
                                >
                                    Submit Test <CheckCircle2 className="w-4 h-4"/>
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
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-2">Assessment Completed</h2>
                        <p className="text-slate-400 mb-8">Your test has been successfully submitted for review.</p>
                        
                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mb-8 inline-block mx-auto min-w-[200px]">
                            <div className="text-xs text-slate-500 uppercase font-bold mb-2">Final Score</div>
                            <div className="text-4xl font-black text-white">{score}<span className="text-xl text-slate-500">/{questions.length * 2}</span></div>
                        </div>

                        <p className="text-sm text-slate-500 max-w-md mx-auto">Our recruitment team will review your detailed technical report and contact you shortly regarding the next steps in the hiring process.</p>
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
                            You are not eligible for hiring at this time.
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

export default function AptitudeTestPage() {
  return (
    <Suspense fallback={
        <div className="min-h-screen bg-[#020617] flex items-center justify-center">
            <Loader2 className="animate-spin text-purple-500 w-10 h-10" />
        </div>
    }>
        <AptitudeTestContent />
    </Suspense>
  );
}