import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Award, 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  ShieldCheck, 
  Quote, 
  Flame, 
  Clock, 
  Compass, 
  Check, 
  Gift, 
  Target, 
  Zap, 
  FileCode, 
  AlertTriangle,
  Lock,
  LogIn,
  AlertCircle,
  HelpCircle,
  Smartphone,
  CheckCircle2,
  RefreshCw,
  Bell,
  MessageSquare,
  Sun,
  Moon
} from 'lucide-react';

// Custom inline SVG icons for GitHub and LinkedIn to prevent Lucide package failures
const GithubIcon = ({ size = 16, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = ({ size = 16, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Quotes bank for Gen Z developers
const MOTIVATIONAL_QUOTES = [
  {
    text: "Tutorial hell is cozy, but building real repositories is how you glow up. Write code tonight. No cap.",
    author: "Developer Vibe Check"
  },
  {
    text: "Green boxes on GitHub don't lie. Build consistent proof of work, post it, and watch recruiters slide into your DMs.",
    author: "Career Accelerator"
  },
  {
    text: "Your tech stack is top-tier, but if it's not public, it doesn't exist. Stop gatekeeping your commits.",
    author: "Open Source Era"
  },
  {
    text: "A 60-day challenge is a contract with your future self. 15 minutes of building after college is the ultimate compound interest.",
    author: "Streak Architects"
  },
  {
    text: "They said programming is about genius. We say it's just committing and posting daily for 60 days. You got this, bestie.",
    author: "Commit Club"
  }
];

// Names and Indian cities for simulating live student signups
const STUDENT_NAMES = ["Rohan", "Ananya", "Dev", "Priya", "Aarav", "Tanvi", "Kabir", "Neha", "Aditya", "Ishita", "Rahul", "Anjali", "Siddharth", "Riya"];
const CITIES = ["Mumbai", "Bengaluru", "Delhi NCR", "Pune", "Hyderabad", "Chennai", "Kolkata", "Ahmedabad", "Jaipur", "Indore", "Lucknow", "Patna"];

// Testimonials data
const TESTIMONIALS = [
  {
    name: "Aarav Sharma",
    role: "B.Tech CSE, VIT Vellore",
    quote: "Honestly, I was stuck in tutorial hell. Committing code and posting on LinkedIn daily for 60 days forced me to actually build. On Day 45, a startup recruiter saw my streak and reached out. Got a remote internship! No cap.",
    days: "60/60 Days Completed"
  },
  {
    name: "Tanvi Rao",
    role: "IT Student, PES University Bengaluru",
    quote: "Working after college was tough, but the live counter and group chat kept me accountable. My LinkedIn network grew by 400% during the streak. Git commits are now muscle memory.",
    days: "60/60 Days Completed"
  },
  {
    name: "Kabir Mehta",
    role: "ECE Student, DTU Delhi",
    quote: "The milestone rewards are awesome, but the real prize is the portfolio. Having 60 public repositories proved to recruiters that I can write production code. Best decision of my college life.",
    days: "60/60 Days Completed"
  }
];

// FAQs data
const FAQS = [
  {
    question: "What do I need to submit daily?",
    answer: "To maintain your streak, you must submit two things before midnight: (1) A GitHub commit showing your code changes, and (2) A LinkedIn post sharing what you built today. It takes 15 minutes."
  },
  {
    question: "How do recruiters see my progress?",
    answer: "Every student gets a public ABTalks Profile showing their live GitHub commit calendar and LinkedIn logs. We share the top streak lists directly with hiring partners weekly."
  },
  {
    question: "What if I break my streak?",
    answer: "Life happens! You get 3 'Vibe Pass' streak freezes to use during exams or emergencies. Just activate it in your dashboard to save your streak."
  },
  {
    question: "Do I get a certificate and rewards?",
    answer: "Yes! Completing the 60 days unlocks a Verified Proof-of-Work Certificate. In addition, reaching milestones (7d, 30d, 60d) unlocks developer badges, code reviews, and physical merch."
  }
];

// Daily Coding Prompts based on selected Track
const SIMULATOR_PROMPTS = {
  frontend: {
    prompt: "Build a glassmorphic night-mode code editor interface optimized for 390px screens.",
    checklist: ["Clean CSS variables structure", "Smooth dark-toggle click transition", "Perfect mobile wrap layouts"]
  },
  backend: {
    prompt: "Write an Express.js API middleware to throttle spam submissions to the leaderboard.",
    checklist: ["Implements memory cache storage", "Sends correct 429 Too Many Requests status", "Includes clean error responses"]
  },
  ai: {
    prompt: "Write a Python script using LLM APIs to automatically generate git commits from your diffs.",
    checklist: ["Parses git diff outputs cleanly", "Generates concise semantic messages", "Handles error fallback modes"]
  }
};

export default function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [theme]);

  const [studentCount, setStudentCount] = useState(15248);
  const [recentNotification, setRecentNotification] = useState(null);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isQuoteAnimating, setIsQuoteAnimating] = useState(false);
  const [particles, setParticles] = useState([]);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState({});

  // Auth Gate states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isDashLoggedIn, setIsDashLoggedIn] = useState(false);
  const [isDashLoggingIn, setIsDashLoggingIn] = useState(false);

  // Simulator states
  const [simTrack, setSimTrack] = useState('frontend');
  const [simState, setSimState] = useState('idle'); // idle -> submitting -> verified
  const [simProgress, setSimProgress] = useState(0);
  const [gitChecked, setGitChecked] = useState(false);
  const [linkedinChecked, setLinkedinChecked] = useState(false);

  // Milestone rewards state
  const [activeMilestone, setActiveMilestone] = useState(7);

  // Sandbox Edge-Case states
  const [activeEdgeCase, setActiveEdgeCase] = useState('active'); // active -> empty -> fresh -> missed
  const [vibePasses, setVibePasses] = useState(2);
  const [missedStreakRestored, setMissedStreakRestored] = useState(false);
  const [gitSynced, setGitSynced] = useState(false);
  const [linkedinSynced, setLinkedinSynced] = useState(false);

  // Thoughtful feature state: WhatsApp nudge
  const [nudgeEnabled, setNudgeEnabled] = useState(false);
  const [showNudgePreview, setShowNudgePreview] = useState(false);

  // IntersectionObserver for scroll-reveal animations
  useEffect(() => {
    // Force scroll to top on load/refresh
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          // Remove class when exiting viewport to make animations repeat on reverse scrolling
          entry.target.classList.remove('visible');
        }
      });
    }, { threshold: 0.01, rootMargin: '0px 0px 50px 0px' });

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Simulating live signup increments & alerts
  useEffect(() => {
    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * 2) + 1;
      setStudentCount(prev => prev + increment);

      const randomName = STUDENT_NAMES[Math.floor(Math.random() * STUDENT_NAMES.length)];
      const randomCity = CITIES[Math.floor(Math.random() * CITIES.length)];
      setRecentNotification({
        name: randomName,
        city: randomCity,
        action: "just committed code for Day 18!"
      });

      setTimeout(() => {
        setRecentNotification(null);
      }, 4000);

    }, 7500);

    return () => clearInterval(interval);
  }, []);

  // Custom particle effect on buttons (Confetti)
  const triggerParticles = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newParticles = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      x: x,
      y: y,
      color: ['#8B5CF6', '#06B6D4', '#EC4899', '#10B981', '#F59E0B'][Math.floor(Math.random() * 5)],
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.7) * 8 - 3,
    }));

    setParticles(prev => [...prev, ...newParticles]);

    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 1200);
  };

  // Simulated Login Handlers
  const handleGitHubLogin = (e) => {
    triggerParticles(e);
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      setIsLoggingIn(false);
    }, 1200);
  };

  const handleDashLogin = (e) => {
    triggerParticles(e);
    setIsDashLoggingIn(true);
    setTimeout(() => {
      setIsDashLoggedIn(true);
      setIsDashLoggingIn(false);
    }, 1200);
  };

  // Run Submission Simulator
  const startSimulatorSubmission = (e) => {
    if (!gitChecked || !linkedinChecked) {
      alert("⚠️ You must check off both GitHub Commit and LinkedIn Post to submit your daily proof-of-work!");
      return;
    }
    triggerParticles(e);
    setSimState('submitting');
    setSimProgress(0);

    let progress = 0;
    const timer = setInterval(() => {
      progress += 10;
      setSimProgress(progress);
      if (progress >= 100) {
        clearInterval(timer);
        setSimState('verified');
      }
    }, 120);
  };

  const resetSimulator = () => {
    setSimState('idle');
    setSimProgress(0);
    setGitChecked(false);
    setLinkedinChecked(false);
  };

  // Restore Missed Streak with Vibe Pass
  const useVibePass = (e) => {
    triggerParticles(e);
    if (vibePasses > 0) {
      setVibePasses(prev => prev - 1);
      setMissedStreakRestored(true);
    }
  };

  // Enable WhatsApp reminder Nudge
  const toggleWhatsAppNudge = (e) => {
    triggerParticles(e);
    const newVal = !nudgeEnabled;
    setNudgeEnabled(newVal);
    if (newVal) {
      setShowNudgePreview(true);
      // Auto-hide preview after 6 seconds
      setTimeout(() => {
        setShowNudgePreview(false);
      }, 7000);
    } else {
      setShowNudgePreview(false);
    }
  };

  // Animate custom quote engine change
  const rollNewQuote = (e) => {
    triggerParticles(e);
    setIsQuoteAnimating(true);
    setTimeout(() => {
      setQuoteIndex(prev => (prev + 1) % MOTIVATIONAL_QUOTES.length);
      setIsQuoteAnimating(false);
    }, 300);
  };

  const handleFaqToggle = (index) => {
    setOpenFaq(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const nextTestimonial = () => {
    setTestimonialIdx(prev => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setTestimonialIdx(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <div className="app-container">
      {/* Ambient background glowing blobs */}
      <div className="ambient-glow-1"></div>
      <div className="ambient-glow-2"></div>

      {/* HEADER SECTION */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-color)',
        padding: '12px 0',
        background: 'rgba(var(--bg-main-rgb), 0.75)'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Logo */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1.25rem',
            color: 'var(--text-primary)'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '1.1rem'
            }}>AB</div>
            <span>ABTalks</span>
          </div>

          {/* Right controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              style={{
                background: 'var(--bg-input)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <a href="#challenge-form" className="btn-primary" style={{
              padding: '10px 16px',
              fontSize: '0.85rem',
              borderRadius: '8px',
              boxShadow: 'none'
            }}>
              Start Streak
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section style={{ padding: '36px 0 20px 0', position: 'relative' }}>
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <span className="badge animate-fade-in-up delay-100">
              <Flame size={12} className="animate-float" />
              60-Day coding streak challenge
            </span>
            
            <h1 className="animate-fade-in-up delay-200" style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2.25rem',
              fontWeight: 700,
              lineHeight: '1.15',
              letterSpacing: '-0.02em',
              marginBottom: '16px',
              background: 'linear-gradient(135deg, var(--text-primary) 30%, var(--primary) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              60 Days. 60 Builds. Recruiter Eyes.
            </h1>
            
            <p className="section-subtitle animate-fade-in-up delay-300" style={{ fontSize: '0.95rem', marginBottom: '24px' }}>
              Build consistency daily after college. Maintain your public streak with a **GitHub commit** and a **LinkedIn post** before midnight. Ditch tutorial hell.
            </p>

            {/* Main Interactive CTA Button */}
            <div className="animate-fade-in-up delay-400" style={{ position: 'relative', display: 'inline-block', marginBottom: '32px' }}>
              <a 
                href="#challenge-form" 
                className="btn-primary"
                onClick={triggerParticles}
                style={{ width: '100%', maxWidth: '300px' }}
              >
                Accept 60-Day Challenge
                <ArrowRight size={18} />
              </a>
              {/* Confetti particles element */}
              {particles.map(p => (
                <div 
                  key={p.id}
                  className="confetti-particle"
                  style={{
                    backgroundColor: p.color,
                    left: `${p.x}px`,
                    top: `${p.y}px`,
                    transform: `translate(${p.vx * 10}px, ${p.vy * 10}px)`
                  }}
                />
              ))}
            </div>

            {/* Live Student Counter Banner */}
            <div className="glass-card animate-fade-in-up delay-500 pulse-glow-active" style={{
              padding: '16px',
              borderRadius: '16px',
              borderLeft: '4px solid var(--primary)',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div>
                <span style={{
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary)',
                    display: 'inline-block',
                    boxShadow: '0 0 8px var(--primary-glow)'
                  }} />
                  Active Indian Student Streaks
                </span>
                
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.65rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  margin: '4px 0'
                }}>
                  {studentCount.toLocaleString()}+
                </h3>
                
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Students committing and shipping code tonight.
                </p>
              </div>
              <div style={{
                background: 'var(--primary-glow)',
                padding: '12px',
                borderRadius: '12px',
                color: 'var(--primary)'
              }}>
                <Users size={28} />
              </div>
            </div>

            {/* Live Popups Notification Toast */}
            <div style={{
              height: '40px',
              marginTop: '12px',
              position: 'relative'
            }}>
              {recentNotification && (
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'var(--border-color)',
                  border: '1px solid var(--border-color-active)',
                  borderRadius: '12px',
                  padding: '8px 16px',
                  fontSize: '0.75rem',
                  color: 'var(--primary)',
                  animation: 'float 0.3s ease-out forwards',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <Sparkles size={12} />
                  <span><strong>{recentNotification.name}</strong> from <strong>{recentNotification.city}</strong> {recentNotification.action}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION (Simple 3-step loop for new students) */}
      <section style={{ padding: '20px 0', borderTop: '1px solid rgba(255,255,255,0.02)' }}>
        <div className="container">
          <div className="reveal reveal-up" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span className="badge badge-cyan">New to ABTalks?</span>
            <h2 className="section-title">How the Challenge Works</h2>
            <p className="section-subtitle">
              A simple daily feedback loop that transforms your engineering profile.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Step 1 */}
            <div className="glass-card reveal reveal-up" style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '16px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(139, 92, 246, 0.1)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                flexShrink: 0
              }}>1</div>
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>Choose Your Track</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>
                  Select Frontend (React/CSS), Backend (Node/API), or AI engineering tracks based on your tech stack interest.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="glass-card reveal reveal-up delay-100" style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '16px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(6, 182, 212, 0.1)',
                color: 'var(--secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                flexShrink: 0
              }}>2</div>
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>Commit & Share Daily</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>
                  Write code and push a GitHub commit before midnight daily. Then, share a short learning post on LinkedIn to verify your proof of work.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="glass-card reveal reveal-up delay-200" style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '16px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(236, 72, 153, 0.1)',
                color: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                flexShrink: 0
              }}>3</div>
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>Get Verified & Hired</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>
                  Maintain a streak for 60 consecutive days to unlock a certified badge and enter the Recruiter Leaderboard accessed by 80+ top startups.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THOUGHTFUL STUDENT EXPERIENCE FEATURE: WHATSAPP REMINDER */}
      <section style={{ padding: '20px 0', position: 'relative' }}>
        <div className="container">
          <div className="glass-card reveal reveal-up" style={{
            padding: '20px',
            border: '1.5px dashed var(--border-color)',
            background: 'rgba(11, 8, 19, 0.4)',
            borderRadius: '20px',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Bell size={18} style={{ color: 'var(--primary)' }} />
              <span style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Thoughtful Student Feature
              </span>
            </div>

            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px' }}>
              Late-Night WhatsApp Nudge
            </h4>
            
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '14px' }}>
              Coding after college is tiring. Enable our streak checker to ping your WhatsApp at 10:00 PM if your GitHub commit hasn't been logged yet.
            </p>

            <button
              onClick={toggleWhatsAppNudge}
              className="btn-secondary"
              style={{
                width: '100%',
                padding: '10px 14px',
                fontSize: '0.8rem',
                gap: '8px',
                borderColor: nudgeEnabled ? 'var(--primary)' : 'var(--border-color)',
                background: nudgeEnabled ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
                color: nudgeEnabled ? 'var(--primary)' : 'var(--text-primary)',
                transition: 'all 0.3s ease'
              }}
            >
              <MessageSquare size={14} />
              {nudgeEnabled ? "✓WhatsApp Reminder Active" : "Simulate WhatsApp 10PM Reminder"}
            </button>

            {/* WhatsApp floating message mockup */}
            {showNudgePreview && (
              <div style={{
                position: 'fixed',
                bottom: '100px',
                left: '20px',
                right: '20px',
                zIndex: 200,
                background: '#0B141A', /* WhatsApp Dark Mode Background */
                borderLeft: '4px solid #00A884', /* WhatsApp green */
                borderRadius: '12px',
                padding: '12px 14px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.8)',
                animation: 'fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                textAlign: 'left'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.7rem', color: '#00A884', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Smartphone size={10} />
                    ABTalks Streak Bot
                  </span>
                  <span style={{ fontSize: '0.65rem', color: '#8696A0' }}>10:00 PM</span>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#E9EDEF', lineHeight: '1.35' }}>
                  Hey dev! 🚨 <strong>2 hours left</strong> to save your 18-day code streak. Your track today requires a commit on: <em>"Build glassmorphic editor"</em>. Don't break the streak! 💻🔥
                </p>
              </div>
            )}
          </div>
        </div>
      </section>



      {/* OUTCOMES (YOUR CODING GLOW-UP) */}
      <section style={{ padding: '30px 0', overflow: 'hidden' }}>
        <div className="container">
          <div className="reveal reveal-up" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span className="badge badge-cyan">The Outcomes</span>
            <h2 className="section-title">Your Coding Glow-up</h2>
            <p className="section-subtitle">
              Here is exactly what you learn, what you build, and how recruiters see you.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Card 1: What you master */}
            <div className="glass-card reveal reveal-up" style={{ 
              padding: '20px', 
              borderLeft: '4px solid var(--primary)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'rgba(139, 92, 246, 0.1)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Target size={18} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700 }}>
                  What You Master
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>⚡ Habit-Loop Consistency</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: '1.35' }}>
                    Escape tutorial hell. Write, debug, and commit clean code every single night after college lectures.
                  </p>
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '10px' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>📈 Portfolio Proof of Work</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: '1.35' }}>
                    Walk away with 60 public GitHub repositories demonstrating your daily progression in real software builds.
                  </p>
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '10px' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>🗣_ Personal Dev Brand</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: '1.35' }}>
                    Learn to communicate your engineering journey. Attract recruiter messages organically by sharing updates on LinkedIn.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: What you get */}
            <div className="glass-card reveal reveal-up" style={{ 
              padding: '20px', 
              borderLeft: '4px solid var(--secondary)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'rgba(6, 182, 212, 0.1)',
                  color: 'var(--secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Zap size={18} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700 }}>
                  What You Get
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>🎓 Verified Streak Certificate</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: '1.35' }}>
                    A unique, cryptographic proof-of-work credential showcasing your 60-day code commits, shareable on LinkedIn.
                  </p>
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '10px' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>🤝 Tech Leaderboard & Recruiter Access</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: '1.35' }}>
                    Students with active 60-day streaks get featured on our Recruiter Dashboard, accessed directly by startup partners.
                  </p>
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '10px' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>💬 Indian Developer Community</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: '1.35' }}>
                    Access private Discord & WhatsApp study groups containing 10K+ Indian students reviewing and testing code together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MILESTONE REWARDS TRACKER */}
      <section style={{ padding: '30px 0', position: 'relative' }}>
        <div className="container">
          <div className="reveal reveal-up" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span className="badge">Gamified Milestones</span>
            <h2 className="section-title">Milestone Rewards</h2>
            <p className="section-subtitle" style={{ marginBottom: '20px' }}>
              Coding daily unlocks special rewards. Click on a milestone to preview.
            </p>
          </div>

          <div className="glass-card reveal reveal-up delay-100" style={{ padding: '24px 20px', textAlign: 'center' }}>
            {/* Milestone slider links */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              position: 'relative',
              marginBottom: '28px',
              padding: '0 20px'
            }}>
              {/* Progress Line */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '20px',
                right: '20px',
                height: '2px',
                background: 'var(--border-color)',
                zIndex: 0,
                transform: 'translateY(-50%)'
              }} />
              
              {/* Active Milestone Progress Line */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '20px',
                width: activeMilestone === 7 ? '0%' : activeMilestone === 30 ? '50%' : '100%',
                height: '2px',
                background: 'var(--primary)',
                zIndex: 0,
                transform: 'translateY(-50%)',
                transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
              }} />

              {[7, 30, 60].map((day) => (
                <button
                  key={day}
                  onClick={() => setActiveMilestone(day)}
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: activeMilestone === day ? 'var(--primary)' : 'var(--bg-input)',
                    color: activeMilestone === day ? '#FFFFFF' : 'var(--text-secondary)',
                    border: activeMilestone === day ? '2px solid var(--primary)' : '2px solid var(--border-color)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    fontFamily: 'var(--font-display)'
                  }}
                >
                  {day}d
                </button>
              ))}
            </div>

            {/* Display active reward card */}
            <div style={{
              background: 'var(--bg-input)',
              padding: '20px',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.02)',
              textAlign: 'left',
              minHeight: '120px',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Gift size={16} style={{ color: 'var(--primary)' }} />
                <span style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Unlocked at Day {activeMilestone}
                </span>
              </div>

              {activeMilestone === 7 && (
                <div style={{ animation: 'fadeInUp 0.4s ease forwards' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>🔥 Git Committer Badge</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>
                    Unlocks custom dev flair on the public leaderboards and showcases your initial streak consistency on your developer profile card.
                  </p>
                </div>
              )}

              {activeMilestone === 30 && (
                <div style={{ animation: 'fadeInUp 0.4s ease forwards' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>💻 Portfolio Code Review</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>
                    Get your repositories reviewed 1-on-1 by a senior software engineer from top tech firms, highlighting optimizations and architecture tips.
                  </p>
                </div>
              )}

              {activeMilestone === 60 && (
                <div style={{ animation: 'fadeInUp 0.4s ease forwards' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>⚡ ABTalks Champion Hoodie</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>
                    The ultimate physical flex. Heavyweight developer streetwear shipped directly to your hostel/dorm upon completing the 60-day challenge.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* STATS & SCORECARD */}
      <section style={{ padding: '20px 0', overflow: 'hidden' }}>
        <div className="container">
          <div className="reveal reveal-up" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span className="badge badge-cyan">Challenge Stats</span>
            <h2 className="section-title">ABTalks by the Numbers</h2>
            <p className="section-subtitle" style={{ marginBottom: '16px' }}>
              Consistency builds credibility. Track the student community impact.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px'
          }}>
            {/* Card 1 */}
            <div className="glass-card achievement-card reveal reveal-up">
              <div className="achievement-icon-wrapper">
                <Flame size={20} />
              </div>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.35rem',
                fontWeight: 700,
                color: 'var(--text-primary)'
              }}>1.2M+</span>
              <span style={{
                fontSize: '0.72rem',
                color: 'var(--text-secondary)',
                marginTop: '4px'
              }}>GitHub Commits</span>
            </div>

            {/* Card 2 */}
            <div className="glass-card achievement-card reveal reveal-up">
              <div className="achievement-icon-wrapper" style={{
                background: 'rgba(6, 182, 212, 0.1)',
                color: 'var(--secondary)',
                border: '1px solid rgba(6, 182, 212, 0.2)'
              }}>
                <Award size={20} />
              </div>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.35rem',
                fontWeight: 700,
                color: 'var(--text-primary)'
              }}>80+</span>
              <span style={{
                fontSize: '0.72rem',
                color: 'var(--text-secondary)',
                marginTop: '4px'
              }}>Hiring Companies</span>
            </div>

            {/* Card 3 */}
            <div className="glass-card achievement-card reveal reveal-up delay-100">
              <div className="achievement-icon-wrapper" style={{
                background: 'rgba(236, 72, 153, 0.1)',
                color: 'var(--accent)',
                border: '1px solid rgba(236, 72, 153, 0.2)'
              }}>
                <Compass size={20} />
              </div>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.35rem',
                fontWeight: 700,
                color: 'var(--text-primary)'
              }}>420K+</span>
              <span style={{
                fontSize: '0.72rem',
                color: 'var(--text-secondary)',
                marginTop: '4px'
              }}>Projects Shipped</span>
            </div>

            {/* Card 4 */}
            <div className="glass-card achievement-card reveal reveal-up delay-100">
              <div className="achievement-icon-wrapper" style={{
                background: 'rgba(16, 185, 129, 0.1)',
                color: '#10B981',
                border: '1px solid rgba(16, 185, 129, 0.2)'
              }}>
                <TrendingUp size={20} />
              </div>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.35rem',
                fontWeight: 700,
                color: 'var(--text-primary)'
              }}>88.5%</span>
              <span style={{
                fontSize: '0.72rem',
                color: 'var(--text-secondary)',
                marginTop: '4px'
              }}>Streak Success Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* DEV MOTIVATION ENGINE */}
      <section style={{ padding: '20px 0' }}>
        <div className="container">
          <div className="glass-card quote-box reveal reveal-up" style={{
            padding: '24px 20px',
            border: '1px solid var(--border-color)',
            borderRadius: '24px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '16px',
              opacity: 0.1,
              color: 'var(--primary)'
            }}>
              <Quote size={40} />
            </div>

            <span className="badge" style={{
              fontSize: '0.7rem',
              padding: '4px 10px',
              marginBottom: '14px'
            }}>
              Dev Vibe Check
            </span>

            <div style={{
              minHeight: '120px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              transition: 'opacity 0.3s ease',
              opacity: isQuoteAnimating ? 0 : 1
            }}>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.05rem',
                fontWeight: 500,
                lineHeight: '1.5',
                color: 'var(--text-primary)',
                marginBottom: '16px',
                fontStyle: 'italic'
              }}>
                "{MOTIVATIONAL_QUOTES[quoteIndex].text}"
              </p>
              
              <span style={{
                fontSize: '0.8rem',
                color: 'var(--primary)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                — {MOTIVATIONAL_QUOTES[quoteIndex].author}
              </span>
            </div>

            {/* Interactive Vibe Roller Button */}
            <div style={{ marginTop: '20px', position: 'relative' }}>
              <button 
                onClick={rollNewQuote} 
                className="btn-secondary"
                style={{
                  fontSize: '0.85rem',
                  padding: '10px 20px',
                  borderRadius: '10px',
                  gap: '6px',
                  borderStyle: 'dashed',
                  borderWidth: '1.5px',
                  borderColor: 'var(--primary)',
                  transition: 'all 0.3s ease'
                }}
              >
                <Sparkles size={14} className="animate-float" />
                Roll New Quote
              </button>
              {/* Confetti particles element specifically for Quote Box */}
              {particles.map(p => (
                <div 
                  key={p.id}
                  className="confetti-particle"
                  style={{
                    backgroundColor: p.color,
                    left: `${p.x}px`,
                    top: `${p.y}px`,
                    transform: `translate(${p.vx * 8}px, ${p.vy * 8}px)`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ROADMAP TIMELINE */}
      <section style={{ padding: '20px 0', overflow: 'hidden' }}>
        <div className="container">
          <div className="reveal reveal-up" style={{ textAlign: 'center', marginBottom: '28px' }}>
            <span className="badge">The Route</span>
            <h2 className="section-title">The 60-Day Journey</h2>
            <p className="section-subtitle">
              Three distinct phases to construct your engineering portfolio from scratch.
            </p>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            position: 'relative',
            paddingLeft: '16px',
            borderLeft: '2px dashed var(--border-color)'
          }}>
            {/* Step 1 */}
            <div style={{ position: 'relative' }}>
              {/* Dot marker */}
              <div style={{
                position: 'absolute',
                left: '-26px',
                top: '4px',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: 'var(--primary)',
                border: '4px solid var(--bg-main)',
                boxShadow: '0 0 10px var(--primary-glow)'
              }} />
              
              <div className="glass-card reveal reveal-up" style={{ padding: '18px' }}>
                <span style={{
                  fontSize: '0.75rem',
                  color: 'var(--primary)',
                  fontWeight: 700,
                  fontFamily: 'var(--font-display)'
                }}>DAYS 1 - 20</span>
                
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  margin: '4px 0 8px 0',
                  color: 'var(--text-primary)'
                }}>Syntax & Core Foundations</h4>
                
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  Master key syntax, DOM interactions, basic API consumption, and local file operations. Build daily utilities.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div style={{ position: 'relative' }}>
              {/* Dot marker */}
              <div style={{
                position: 'absolute',
                left: '-26px',
                top: '4px',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: 'var(--secondary)',
                border: '4px solid var(--bg-main)',
                boxShadow: '0 0 10px var(--secondary-glow)'
              }} />
              
              <div className="glass-card reveal reveal-up" style={{ padding: '18px' }}>
                <span style={{
                  fontSize: '0.75rem',
                  color: 'var(--secondary)',
                  fontWeight: 700,
                  fontFamily: 'var(--font-display)'
                }}>DAYS 21 - 40</span>
                
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  margin: '4px 0 8px 0',
                  color: 'var(--text-primary)'
                }}>Fullstack Integration</h4>
                
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  Connect client components to database tables, secure user auth schemas, and configure web socket triggers for live interactions.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div style={{ position: 'relative' }}>
              {/* Dot marker */}
              <div style={{
                position: 'absolute',
                left: '-26px',
                top: '4px',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: 'var(--accent)',
                border: '4px solid var(--bg-main)',
                boxShadow: '0 0 10px rgba(244, 63, 94, 0.4)'
              }} />
              
              <div className="glass-card reveal reveal-up" style={{ padding: '18px' }}>
                <span style={{
                  fontSize: '0.75rem',
                  color: 'var(--accent)',
                  fontWeight: 700,
                  fontFamily: 'var(--font-display)'
                }}>DAYS 41 - 60</span>
                
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  margin: '4px 0 8px 0',
                  color: 'var(--text-primary)'
                }}>Production Capstones</h4>
                
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  Deploy clean code onto cloud instances, scale databases, handle error telemetry logs, and present your code live to startup tech leads.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SLIDER */}
      <section style={{ padding: '20px 0' }}>
        <div className="container">
          <div className="reveal reveal-up" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span className="badge badge-cyan">Student Stories</span>
            <h2 className="section-title">Cohort Breakthroughs</h2>
            <p className="section-subtitle">
              Proof that consistency beats intensity. Read how Indian students got placed.
            </p>
          </div>

          <div className="glass-card reveal reveal-up delay-100" style={{
            position: 'relative',
            padding: '24px',
            borderRadius: '24px',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px'
            }}>
              {/* Avatar circle with initials */}
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.95rem'
              }}>
                {TESTIMONIALS[testimonialIdx].name.substring(0, 2)}
              </div>
              
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {TESTIMONIALS[testimonialIdx].name}
                </h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  {TESTIMONIALS[testimonialIdx].role}
                </p>
              </div>
            </div>

            <p style={{
              fontSize: '0.88rem',
              lineHeight: '1.5',
              color: 'var(--text-secondary)',
              fontStyle: 'italic',
              marginBottom: '20px',
              minHeight: '80px',
              transition: 'opacity 0.3s ease'
            }}>
              "{TESTIMONIALS[testimonialIdx].quote}"
            </p>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid var(--border-color)',
              paddingTop: '14px'
            }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.75rem',
                color: 'var(--primary)',
                fontWeight: 700
              }}>
                <CheckCircle size={14} />
                {TESTIMONIALS[testimonialIdx].days}
              </span>

              {/* Slider Arrow controls */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={prevTestimonial}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    width: '32px',
                    height: '32px',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <ChevronLeft size={16} />
                </button>
                <button 
                  onClick={nextTestimonial}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    width: '32px',
                    height: '32px',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEAD CAPTURE FORM SECTION */}
      <section id="challenge-form" style={{ padding: '20px 0 60px 0' }}>
        <div className="container">
          <div className="glass-card reveal reveal-up" style={{
            padding: '30px 20px',
            borderRadius: '24px',
            border: '1px solid var(--border-color)',
            background: 'linear-gradient(180deg, var(--bg-card) 0%, rgba(18, 16, 24, 0.4) 100%)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <span className="badge">Streak Season</span>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.65rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '8px'
              }}>Lock in Your Spot</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Commit to the 60-day coding streak challenge. Build muscle memory, track commits, and unlock recruiter catalogs.
              </p>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              alert("🎉 Welcome to the cohort! Your coding glow-up starts tonight. Check your email for onboarding details!");
              setStudentCount(prev => prev + 1);
            }} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <div>
                <label style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  display: 'block',
                  marginBottom: '6px'
                }}>Your Name</label>
                <input 
                  type="text" 
                  className="glass-input" 
                  placeholder="e.g. Rohan Patel" 
                  required
                />
              </div>

              <div>
                <label style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  display: 'block',
                  marginBottom: '6px'
                }}>Your Student Email</label>
                <input 
                  type="email" 
                  className="glass-input" 
                  placeholder="e.g. rohan@university.edu" 
                  required
                />
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '4px'
              }}>
                <input 
                  type="checkbox" 
                  id="agree-terms" 
                  style={{
                    accentColor: 'var(--primary)',
                    width: '16px',
                    height: '16px'
                  }}
                  required
                />
                <label htmlFor="agree-terms" style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary)'
                }}>
                  I commit to committing code and posting on LinkedIn daily for 60 days.
                </label>
              </div>

              <button 
                type="submit" 
                className="btn-primary" 
                style={{ width: '100%', marginTop: '8px' }}
              >
                Accept Challenge & Start Streak
                <ArrowRight size={18} />
              </button>
            </form>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
              marginTop: '20px',
              fontSize: '0.75rem',
              color: 'var(--text-muted)'
            }}>
              <ShieldCheck size={14} style={{ color: '#10B981' }} />
              <span>100% Free Coding Cohort. Run by ABTalks.</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQS SECTION (Accordion) */}
      <section style={{ padding: '20px 0 80px 0' }}>
        <div className="container">
          <div className="reveal reveal-up" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span className="badge">Got Questions?</span>
            <h2 className="section-title">Clarify the Vibe</h2>
            <p className="section-subtitle">
              Everything you need to know before locking in your streak.
            </p>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {FAQS.map((faq, idx) => (
              <div 
                key={idx} 
                className="glass-card reveal reveal-up" 
                style={{ 
                  padding: '16px', 
                  borderRadius: '16px',
                  cursor: 'pointer',
                  border: openFaq[idx] ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onClick={() => handleFaqToggle(idx)}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <h4 style={{ 
                    fontSize: '0.88rem', 
                    fontWeight: 700, 
                    color: 'var(--text-primary)',
                    transition: 'color 0.3s ease'
                  }}>
                    {faq.question}
                  </h4>
                  <div style={{ color: 'var(--text-secondary)', transition: 'transform 0.3s' }}>
                    {openFaq[idx] ? <ChevronDown size={18} style={{ transform: 'rotate(180deg)' }} /> : <ChevronDown size={18} />}
                  </div>
                </div>

                {openFaq[idx] && (
                  <p style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)',
                    marginTop: '12px',
                    lineHeight: '1.4',
                    animation: 'fadeInUp 0.3s ease forwards'
                  }}>
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: '1px solid var(--border-color)',
        padding: '30px 0 110px 0', 
        textAlign: 'center',
        background: 'rgba(0,0,0,0.02)'
      }}>
        <div className="container">
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} ABTalks. Made by developers, for Indian student developers.
          </p>
        </div>
      </footer>

      {/* STICKY BOTTOM MOBILE CTA */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '16px 20px',
        background: 'rgba(var(--bg-main-rgb), 0.8)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid var(--border-color)',
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 -4px 15px rgba(0, 0, 0, 0.15)'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: 700 }}>
            Next Cohort Starting
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={12} />
            In 3 Days
          </span>
        </div>
        
        <a href="#challenge-form" className="btn-primary" style={{
          padding: '12px 20px',
          fontSize: '0.9rem',
          borderRadius: '10px'
        }}>
          Start Streak
          <ArrowRight size={16} />
        </a>
      </div>
    </div>
  );
}
