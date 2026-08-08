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

// Custom inline logo "AB" lettermark styled directly from user image attachment
const ABLogo = ({ size = 28, ...props }) => (
  <svg viewBox="10 16 66 60" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path 
      d="M12 75 L38 18 H48 C62 18 72 23 72 32 C72 39 65 44 58 46 C67 48 74 53 74 62 C74 72 63 75 48 75 H12 Z M27 65 H46 C52 65 57 62 57 57 C57 52 52 49 46 49 H27 V65 Z M27 41 H44 C50 41 54 38 54 33 C54 28 50 26 44 26 H27 V41 Z" 
      fill="currentColor" 
      style={{ transform: 'skewX(-6deg)', transformOrigin: 'center' }} 
    />
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
    question: "What is a Vibe Pass / Streak Freeze?",
    answer: "Life happens! You get 3 'Vibe Pass' streak freezes to use during exams or emergencies. Just activate it in your dashboard to save your streak from resetting."
  },
  {
    question: "Do I get a certificate and rewards?",
    answer: "Yes! Completing the 60 days unlocks a Verified Proof-of-Work Certificate. In addition, reaching milestones unlocks developer badges, code reviews, and physical merch."
  }
];

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [studentCount, setStudentCount] = useState(15248);
  const [recentNotification, setRecentNotification] = useState(null);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isQuoteAnimating, setIsQuoteAnimating] = useState(false);
  const [particles, setParticles] = useState([]);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState({});

  // WhatsApp nudge state
  const [nudgeEnabled, setNudgeEnabled] = useState(false);
  const [showNudgePreview, setShowNudgePreview] = useState(false);

  // Streak freeze simulation
  const [vibePasses, setVibePasses] = useState(2);
  const [missedStreakRestored, setMissedStreakRestored] = useState(false);

  // Sync state variables
  const [gitSynced, setGitSynced] = useState(false);
  const [linkedinSynced, setLinkedinSynced] = useState(false);

  // Auth Modal states
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('signin'); // 'signin' or 'signup'
  const [userSession, setUserSession] = useState(null); 
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [theme]);

  // Scroll to top and observer initialization
  useEffect(() => {
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    }, { threshold: 0.01, rootMargin: '0px 0px 50px 0px' });

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Live count simulation
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

  // Confetti particles function
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

  const toggleWhatsAppNudge = (e) => {
    triggerParticles(e);
    const newVal = !nudgeEnabled;
    setNudgeEnabled(newVal);
    if (newVal) {
      setShowNudgePreview(true);
      setTimeout(() => {
        setShowNudgePreview(false);
      }, 6000);
    } else {
      setShowNudgePreview(false);
    }
  };

  const useVibePass = (e) => {
    triggerParticles(e);
    if (vibePasses > 0) {
      setVibePasses(prev => prev - 1);
      setMissedStreakRestored(true);
    }
  };

  const rollNewQuote = (e) => {
    triggerParticles(e);
    setIsQuoteAnimating(true);
    setTimeout(() => {
      setQuoteIndex(prev => (prev + 1) % MOTIVATIONAL_QUOTES.length);
      setIsQuoteAnimating(false);
    }, 300);
  };

  const handleFaqToggle = (index) => {
    setOpenFaq(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const nextTestimonial = () => {
    setTestimonialIdx(prev => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setTestimonialIdx(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleAuthSubmit = (e, email, name) => {
    e.preventDefault();
    triggerParticles(e);
    setAuthLoading(true);
    setTimeout(() => {
      setUserSession({
        name: name || 'Rohan Sharma',
        email: email || 'rohan@vit.edu'
      });
      setAuthLoading(false);
      setShowAuthModal(false);
    }, 1200);
  };

  const handleSignOut = (e) => {
    triggerParticles(e);
    setUserSession(null);
  };

  return (
    <div className="app-container">
      {/* Ambient background glowing blobs */}
      <div className="ambient-glow-1"></div>
      <div className="ambient-glow-2"></div>

      {/* RASPBERRY PI STYLE HEADER */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1.5px solid var(--border-color)',
        padding: '12px 0',
        background: 'rgba(var(--bg-main-rgb), 0.8)'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Logo with slanted hashtag logo */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            fontFamily: 'var(--font-sans)',
            fontWeight: 800,
            fontSize: '1.35rem',
            fontStyle: 'italic',
            letterSpacing: '-0.03em',
            cursor: 'default',
            userSelect: 'none'
          }}>
            <span style={{ color: '#BE123C', marginRight: '1px' }}>#</span>
            <span style={{ color: 'var(--text-primary)' }}>ABtalks</span>
            <span style={{ fontSize: '0.6rem', alignSelf: 'flex-start', marginLeft: '2px', color: 'var(--text-muted)' }}>®</span>
          </div>

          {/* Right controls - Switch options & Auth */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              style={{
                background: 'var(--bg-input)',
                border: '1.5px solid var(--border-color)',
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

            {userSession ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: 'var(--primary-glow)',
                  border: '1.5px solid var(--primary)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer'
                }} title={userSession.email}>
                  {userSession.name.split(' ').map(n => n[0]).join('')}
                </div>
                <button 
                  onClick={handleSignOut}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    textDecoration: 'underline',
                    padding: '4px'
                  }}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => {
                    setAuthModalTab('signin');
                    setShowAuthModal(true);
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    padding: '8px 12px',
                    transition: 'opacity 0.2s'
                  }}
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setAuthModalTab('signup');
                    setShowAuthModal(true);
                  }}
                  className="btn-primary"
                  style={{
                    padding: '8px 14px',
                    fontSize: '0.82rem',
                    borderRadius: '8px'
                  }}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* RASPBERRY PI STYLE HERO (SPLIT GRID) */}
      <section style={{ padding: '40px 0 24px 0', position: 'relative' }}>
        <div className="container">
          <div className="rpi-grid">
            
            {/* Left Content (col-7) */}
            <div className="col-7 reveal reveal-up" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span className="badge">
                <Flame size={12} className="animate-float" style={{ color: 'var(--primary)' }} />
                60-Day coding streak challenge
              </span>

              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2.5rem',
                fontWeight: 700,
                lineHeight: '1.1',
                letterSpacing: '-0.02em',
                marginBottom: '16px',
                background: 'linear-gradient(135deg, var(--text-primary) 50%, var(--primary) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                60 Days. 60 Builds.<br />Recruiter Eyes.
              </h1>

              <p style={{ 
                fontSize: '0.92rem', 
                color: 'var(--text-secondary)', 
                lineHeight: '1.45', 
                marginBottom: '24px',
                maxWidth: '520px'
              }}>
                ABTalks runs a 60-day challenge for Indian college students. Pick a track, build something every day, and maintain your public learning streak with a GitHub commit and LinkedIn post before midnight.
              </p>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <a href="#challenge-form" className="btn-primary" onClick={triggerParticles} style={{ position: 'relative' }}>
                  Accept Challenge
                  <ArrowRight size={16} />
                  
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
                </a>
                <a href="#tracks-section" className="btn-secondary">
                  Explore Milestones
                </a>
              </div>
            </div>

            {/* Right Interactive Card (col-5) */}
            <div className="col-5 reveal reveal-up delay-100" style={{ display: 'flex', alignItems: 'center' }}>
              <div className="glass-card" style={{ width: '100%', padding: '20px', border: '1.5px solid var(--border-color)' }}>
                
                {/* Simulated profile mockup */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'var(--primary-glow)',
                      border: '1.5px solid var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: 'var(--primary)'
                    }}>I</div>
                    <div>
                      <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>ideal_student</h4>
                      <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>AI & Software Track</p>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Flame size={12} className="animate-float" />
                    🔥 18 Days
                  </span>
                </div>

                <div style={{ background: 'var(--bg-input)', padding: '12px', borderRadius: '10px', marginBottom: '14px', border: '1px solid rgba(255,255,255,0.02)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    <span>Milestone 2/3: Day 30 Review</span>
                    <span>12 days left</span>
                  </div>
                  <div style={{ width: '100%', height: '5px', background: 'var(--bg-main)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: '60%', height: '100%', background: 'var(--primary)' }}></div>
                  </div>
                </div>

                {/* Submissions checklist */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.75rem', textAlign: 'left' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10B981' }}>
                    <CheckCircle2 size={14} />
                    <span>GitHub code commit synced</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10B981' }}>
                    <CheckCircle2 size={14} />
                    <span>LinkedIn post verified</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', border: '1.5px solid var(--text-muted)' }} />
                    <span>Next task unlocks tomorrow at 8:00 AM</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CORE TRACKS & ACHIEVEMENTS SECTION (3-COLUMN RASPBERRY PI GRID) */}
      <section id="tracks-section" style={{ padding: '36px 0', borderTop: '1.5px solid var(--border-color)' }}>
        <div className="container">
          
          <div className="reveal reveal-up" style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span className="badge badge-cyan">Tracks & Achievements</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.85rem', fontWeight: 700, marginBottom: '8px' }}>
              Core Tracks & Achievements
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '580px', margin: '0 auto' }}>
              Unlock specific community recognition and achievements through three core milestones:
            </p>
          </div>

          <div className="rpi-grid">
            
            {/* Track 1: 60-Day Challenge */}
            <div className="col-4 reveal reveal-up">
              <div className="rpi-card">
                <div>
                  <span className="rpi-card-tag">Coding Streak</span>
                  <h3 className="rpi-card-title">60-Day Challenge</h3>
                  <p className="rpi-card-body">
                    Complete one daily task across AI, Software Engineering, or Data Science to build an unbroken streak and unlock the developer leaderboard.
                  </p>
                </div>
                <div className="rpi-card-footer">
                  <Target size={14} />
                  <span>Unbroken Streak Milestone</span>
                </div>
              </div>
            </div>

            {/* Track 2: 60-Day Claude Track */}
            <div className="col-4 reveal reveal-up delay-100">
              <div className="rpi-card">
                <div>
                  <span className="rpi-card-tag">Agentic AI</span>
                  <h3 className="rpi-card-title">60-Day Claude Track</h3>
                  <p className="rpi-card-body">
                    Master advanced prompt-engineering, build agentic workflows, and unlock the prestigious Campus Ambassador achievement tier.
                  </p>
                </div>
                <div className="rpi-card-footer">
                  <Award size={14} />
                  <span>Campus Ambassador Badge</span>
                </div>
              </div>
            </div>

            {/* Track 3: 31-Day AI Cohort */}
            <div className="col-4 reveal reveal-up delay-200">
              <div className="rpi-card">
                <div>
                  <span className="rpi-card-tag">RAG Deployments</span>
                  <h3 className="rpi-card-title">31-Day AI Cohort</h3>
                  <p className="rpi-card-body">
                    Build and deploy a production-ready RAG AI chatbot to be showcased directly to tech recruiters and startup founders.
                  </p>
                </div>
                <div className="rpi-card-footer">
                  <Sparkles size={14} />
                  <span>Showcase Direct Recruiter Link</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* HOW IT WORKS & WHATSAPP REMINDER (SPLIT GRID) */}
      <section style={{ padding: '36px 0', borderTop: '1.5px solid var(--border-color)', background: 'rgba(var(--bg-main-rgb), 0.2)' }}>
        <div className="container">
          <div className="rpi-grid">
            
            {/* Left Card: 3-step loop (col-8) */}
            <div className="col-8 reveal reveal-up">
              <div className="glass-card" style={{ padding: '24px', border: '1.5px solid var(--border-color)', height: '100%', textAlign: 'left' }}>
                <span className="badge">Onboarding Loop</span>
                
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', fontWeight: 700, marginBottom: '16px' }}>
                  How the Challenge Works
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      background: 'rgba(139, 92, 246, 0.1)',
                      color: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      flexShrink: 0
                    }}>1</div>
                    <div>
                      <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>Choose Your Milestone Track</h4>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: '1.4' }}>
                        Select the 60-Day Challenge, Claude Track, or 31-Day AI Cohort depending on your learning goals.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      background: 'rgba(6, 182, 212, 0.1)',
                      color: 'var(--secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      flexShrink: 0
                    }}>2</div>
                    <div>
                      <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>Commit and Post Daily</h4>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: '1.4' }}>
                        Write code, push to GitHub, and share a summary post on LinkedIn before midnight to lock your daily verification.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      background: 'rgba(236, 72, 153, 0.1)',
                      color: 'var(--accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      flexShrink: 0
                    }}>3</div>
                    <div>
                      <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>Gain Verified Visibility</h4>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: '1.4' }}>
                        Unlock certification credentials, exclusive badges, and profile visibility shown directly to hiring startup teams.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Card: WhatsApp Nudge & Vibe Pass Simulator (col-4) */}
            <div className="col-4 reveal reveal-up delay-100">
              <div className="rpi-card" style={{ background: 'rgba(22, 17, 38, 0.5)' }}>
                <div>
                  <span className="badge badge-cyan">Empathetic UX</span>
                  <h3 className="rpi-card-title">Late-Night Nudge</h3>
                  <p className="rpi-card-body" style={{ fontSize: '0.76rem', marginBottom: '14px' }}>
                    Coding late after college is exhausting. Enable our streak checker to ping you at 10 PM if you forgot to commit today.
                  </p>

                  <button
                    onClick={toggleWhatsAppNudge}
                    className="btn-secondary"
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      fontSize: '0.78rem',
                      justifyContent: 'center',
                      borderColor: nudgeEnabled ? 'var(--primary)' : 'var(--border-color)',
                      background: nudgeEnabled ? 'var(--primary-glow)' : 'transparent',
                      color: nudgeEnabled ? 'var(--primary)' : 'var(--text-primary)',
                      marginBottom: '16px'
                    }}
                  >
                    <MessageSquare size={12} />
                    {nudgeEnabled ? "Nudge Simulation Active" : "Simulate 10PM Alert"}
                  </button>

                  {/* Vibe Pass simulation block */}
                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px', textAlign: 'left' }}>
                    <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                      Streak Reset Recovery:
                    </span>
                    {missedStreakRestored ? (
                      <div style={{ color: '#10B981', fontSize: '0.75rem', fontWeight: 600 }}>
                        ✓ Day 18 Streak Restored!
                      </div>
                    ) : (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.72rem', color: '#EF4444' }}>⚠️ Missed Day Reset</span>
                        <button 
                          onClick={useVibePass}
                          className="btn-primary"
                          style={{ padding: '6px 10px', fontSize: '0.68rem', background: 'linear-gradient(135deg, var(--accent) 0%, #F43F5E 100%)', boxShadow: 'none' }}
                        >
                          Use Vibe Pass ({vibePasses})
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* WhatsApp preview popup */}
                {showNudgePreview && (
                  <div style={{
                    position: 'fixed',
                    bottom: '24px',
                    left: '20px',
                    right: '20px',
                    zIndex: 200,
                    background: '#0B141A',
                    borderLeft: '4px solid #00A884',
                    borderRadius: '10px',
                    padding: '10px 12px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
                    animation: 'fadeInUp 0.3s ease forwards',
                    textAlign: 'left'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.68rem', color: '#00A884', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Smartphone size={10} />
                        ABTalks Streak Bot
                      </span>
                      <span style={{ fontSize: '0.6rem', color: '#8696A0' }}>10:00 PM</span>
                    </div>
                    <p style={{ fontSize: '0.74rem', color: '#E9EDEF', lineHeight: '1.3' }}>
                      Hey dev! 🚨 <strong>2 hours left</strong> to save your 18-day streak. Don't break the streak tonight! 💻🔥
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* OUTCOMES & RECRUITER LEADERBOARDS */}
      <section style={{ padding: '36px 0', borderTop: '1.5px solid var(--border-color)' }}>
        <div className="container">
          <div className="rpi-grid">
            
            {/* Live notification commits and stats (col-8) */}
            <div className="col-8 reveal reveal-up" style={{ textAlign: 'left' }}>
              <span className="badge badge-cyan">Live statistics</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', fontWeight: 700, marginBottom: '8px' }}>
                Your Coding Glow-up
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '18px', maxWidth: '600px' }}>
                Join thousands of Indian college students building proof of work daily. Secure consistency logs to stay on recruiters' radars.
              </p>

              {/* Stats card block */}
              <div className="glass-card" style={{ padding: '16px', background: 'var(--primary-glow)', border: '1.5px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <h4 style={{ fontSize: '1.85rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                    {studentCount.toLocaleString()}+
                  </h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Active Indian college student commits logged tonight.</p>
                </div>
                <div style={{ background: 'rgba(139, 92, 246, 0.2)', padding: '10px', borderRadius: '8px', color: 'var(--primary)' }}>
                  <Users size={24} />
                </div>
              </div>

              {/* Toast notifier simulator */}
              <div style={{ height: '36px', overflow: 'hidden', position: 'relative' }}>
                {recentNotification && (
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'var(--bg-card)',
                    border: '1.5px solid var(--border-color)',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '0.72rem',
                    color: 'var(--primary)',
                    animation: 'fadeInUp 0.3s ease forwards'
                  }}>
                    <Sparkles size={12} />
                    <span><strong>{recentNotification.name}</strong> ({recentNotification.city}) {recentNotification.action}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Hiring Partners (col-4) */}
            <div className="col-4 reveal reveal-up delay-100" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div className="rpi-card" style={{ justifyContent: 'center', background: 'rgba(22, 17, 38, 0.3)' }}>
                <span className="rpi-card-tag">Recruiter Network</span>
                <h3 className="rpi-card-title">Hiring Partners</h3>
                <p className="rpi-card-body" style={{ fontSize: '0.76rem' }}>
                  Top product companies and fast-growing Indian startups recruit directly from our 60-day cohort leaderboard directories.
                </p>
                
                {/* Simulated partner logos */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '10px', opacity: 0.65 }}>
                  {['Razorpay', 'CRED', 'Meesho', 'Groww', 'Postpe', 'Zepto'].map((partner, i) => (
                    <div key={i} style={{
                      background: 'var(--bg-input)',
                      border: '1.5px solid var(--border-color)',
                      padding: '6px',
                      borderRadius: '6px',
                      fontSize: '0.62rem',
                      fontWeight: 700,
                      color: 'var(--text-secondary)',
                      textAlign: 'center'
                    }}>
                      {partner}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* GEN Z MOTIVATIONAL INTERACTIVE SLIDER */}
      <section style={{ padding: '36px 0', borderTop: '1.5px solid var(--border-color)', background: 'var(--bg-card)' }}>
        <div className="container">
          <div className="reveal reveal-up" style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto' }}>
            <Quote size={24} style={{ color: 'var(--primary)', opacity: 0.5, marginBottom: '12px' }} />
            
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.15rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              lineHeight: '1.45',
              marginBottom: '16px',
              minHeight: '80px',
              transition: 'all 0.3s ease',
              opacity: isQuoteAnimating ? 0 : 1
            }}>
              "{MOTIVATIONAL_QUOTES[quoteIndex].text}"
            </p>

            <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700, display: 'block', marginBottom: '14px' }}>
              — {MOTIVATIONAL_QUOTES[quoteIndex].author}
            </span>

            <button 
              onClick={rollNewQuote} 
              className="btn-secondary" 
              style={{ padding: '6px 14px', fontSize: '0.74rem', gap: '4px' }}
            >
              <RefreshCw size={12} />
              Vibe Check Next Quote
            </button>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF / SUCCESS STORIES */}
      <section style={{ padding: '36px 0', borderTop: '1.5px solid var(--border-color)' }}>
        <div className="container">
          <div className="reveal reveal-up" style={{ textAlign: 'center', marginBottom: '28px' }}>
            <span className="badge badge-cyan">Wall of Consistency</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.85rem', fontWeight: 700, marginBottom: '6px' }}>
              Student Success Stories
            </h2>
          </div>

          {/* Testimonial slider card */}
          <div className="glass-card reveal reveal-up delay-100" style={{
            padding: '24px',
            border: '1.5px solid var(--border-color)',
            background: 'rgba(22, 17, 38, 0.4)',
            maxWidth: '750px',
            margin: '0 auto',
            textAlign: 'left'
          }}>
            <span style={{ fontSize: '0.65rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {TESTIMONIALS[testimonialIdx].days}
            </span>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: '12px 0 16px 0', fontStyle: 'italic' }}>
              "{TESTIMONIALS[testimonialIdx].quote}"
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {TESTIMONIALS[testimonialIdx].name}
                </h4>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {TESTIMONIALS[testimonialIdx].role}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={prevTestimonial}
                  style={{
                    background: 'var(--bg-input)',
                    border: '1.5px solid var(--border-color)',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-primary)',
                    cursor: 'pointer'
                  }}
                >
                  <ChevronLeft size={16} />
                </button>
                <button 
                  onClick={nextTestimonial}
                  style={{
                    background: 'var(--bg-input)',
                    border: '1.5px solid var(--border-color)',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-primary)',
                    cursor: 'pointer'
                  }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section style={{ padding: '36px 0', borderTop: '1.5px solid var(--border-color)', background: 'rgba(var(--bg-main-rgb), 0.2)' }}>
        <div className="container" style={{ maxWidth: '750px' }}>
          <div className="reveal reveal-up" style={{ textAlign: 'center', marginBottom: '28px' }}>
            <span className="badge">FAQ</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.85rem', fontWeight: 700 }}>
              Got Questions?
            </h2>
          </div>

          <div className="reveal reveal-up delay-100" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {FAQS.map((faq, index) => {
              const isOpen = !!openFaq[index];
              return (
                <div key={index} className="faq-item" style={{ textAlign: 'left' }}>
                  <div className="faq-header" onClick={() => handleFaqToggle(index)}>
                    <span>{faq.question}</span>
                    <ChevronDown 
                      size={18} 
                      style={{ 
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', 
                        transition: 'transform 0.25s ease',
                        color: isOpen ? 'var(--primary)' : 'var(--text-muted)'
                      }} 
                    />
                  </div>
                  <div 
                    className="faq-content" 
                    style={{ 
                      maxHeight: isOpen ? '160px' : '0px',
                      paddingBottom: isOpen ? '16px' : '0px'
                    }}
                  >
                    {faq.answer}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LEAD CAPTURE FORM */}
      <section id="challenge-form" style={{ padding: '40px 0', borderTop: '1.5px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '580px' }}>
          <div className="glass-card reveal reveal-up" style={{ padding: '28px', border: '1.5px solid var(--border-color)' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <span className="badge badge-cyan">Apply Today</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                Secure Cohort Spot
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Enter your details to join the upcoming 60-day streak challenges.
              </p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); alert("Thanks! Application submitted."); }} style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left' }}>
              <div>
                <label style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                  Your Full Name
                </label>
                <input type="text" placeholder="e.g. Rohan Sharma" className="glass-input" required />
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                  College Email Address
                </label>
                <input type="email" placeholder="e.g. rohan@vit.edu" className="glass-input" required />
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                  Select Track Milestone
                </label>
                <select className="glass-input" style={{ appearance: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236B7280\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px' }} required>
                  <option value="60day">60-Day Challenge (Software & AI)</option>
                  <option value="claude">60-Day Claude Track (Advanced Prompting)</option>
                  <option value="31day">31-Day AI Cohort (RAG Chatbots)</option>
                </select>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '8px' }}>
                <Zap size={16} />
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* RASPBERRY PI STYLE FOOTER */}
      <footer style={{
        padding: '32px 0',
        borderTop: '1.5px solid var(--border-color)',
        background: 'var(--bg-main)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '14px'
          }}>
            {/* Logo bottom */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              fontFamily: 'var(--font-sans)',
              fontWeight: 800,
              fontSize: '1.2rem',
              fontStyle: 'italic',
              letterSpacing: '-0.03em',
              cursor: 'default',
              userSelect: 'none'
            }}>
              <span style={{ color: '#BE123C', marginRight: '1px' }}>#</span>
              <span style={{ color: 'var(--text-primary)' }}>ABtalks</span>
              <span style={{ fontSize: '0.5rem', alignSelf: 'flex-start', marginLeft: '1px', color: 'var(--text-muted)' }}>®</span>
            </div>

            <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', maxWidth: '400px', lineHeight: '1.4' }}>
              Designed mobile-first. Building public consistency and recruiter visibility daily. © 2026 ABTalks Coding challenge. All rights reserved.
            </p>

            <div style={{ display: 'flex', gap: '16px', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              <a href="#tracks-section" style={{ color: 'inherit', textDecoration: 'none' }}>Milestones</a>
              <span>•</span>
              <a href="#challenge-form" style={{ color: 'inherit', textDecoration: 'none' }}>Apply</a>
              <span>•</span>
              <a href="https://github.com" style={{ color: 'inherit', textDecoration: 'none' }}>GitHub</a>
            </div>
          </div>
        </div>
      </footer>

      {/* AUTH MODAL OVERLAY */}
      {showAuthModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          animation: 'fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}>
          <div className="glass-card" style={{
            width: '100%',
            maxWidth: '360px',
            padding: '28px',
            border: '1.5px solid var(--border-color)',
            background: 'var(--bg-card)',
            textAlign: 'left',
            boxShadow: 'var(--shadow-lg)',
            position: 'relative'
          }}>
            {/* Modal Header tabs */}
            <div style={{ display: 'flex', borderBottom: '1.5px solid var(--border-color)', marginBottom: '20px' }}>
              <button
                type="button"
                onClick={() => setAuthModalTab('signin')}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  borderBottom: `2.5px solid ${authModalTab === 'signin' ? 'var(--primary)' : 'transparent'}`,
                  color: authModalTab === 'signin' ? 'var(--text-primary)' : 'var(--text-secondary)',
                  padding: '10px 0',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setAuthModalTab('signup')}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  borderBottom: `2.5px solid ${authModalTab === 'signup' ? 'var(--primary)' : 'transparent'}`,
                  color: authModalTab === 'signup' ? 'var(--text-primary)' : 'var(--text-secondary)',
                  padding: '10px 0',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                Sign Up
              </button>
            </div>

            {/* Modal close button */}
            <button
              type="button"
              onClick={() => setShowAuthModal(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                padding: '4px'
              }}
            >
              ✕
            </button>

            {/* Modal Forms */}
            <form onSubmit={(e) => {
              const email = e.currentTarget.elements.email.value;
              const name = authModalTab === 'signup' ? e.currentTarget.elements.name.value : '';
              handleAuthSubmit(e, email, name);
            }} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {authModalTab === 'signup' && (
                <div>
                  <label style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                    Full Name
                  </label>
                  <input type="text" name="name" placeholder="e.g. Rohan Sharma" className="glass-input" required />
                </div>
              )}

              <div>
                <label style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                  Email Address
                </label>
                <input type="email" name="email" placeholder="e.g. student@college.edu" className="glass-input" required />
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                  Password
                </label>
                <input type="password" placeholder="••••••••" className="glass-input" required />
              </div>

              <button type="submit" disabled={authLoading} className="btn-primary" style={{ width: '100%', marginTop: '6px' }}>
                {authLoading ? (
                  <>
                    <Clock size={16} className="animate-glow" />
                    Please wait...
                  </>
                ) : (
                  <>
                    <Zap size={16} />
                    {authModalTab === 'signin' ? 'Sign In' : 'Sign Up'}
                  </>
                )}
              </button>
            </form>

            {/* OAuth Separator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '18px 0' }}>
              <div style={{ flex: 1, height: '1.5px', background: 'var(--border-color)' }}></div>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>or continue with</span>
              <div style={{ flex: 1, height: '1.5px', background: 'var(--border-color)' }}></div>
            </div>

            <button
              type="button"
              onClick={(e) => handleAuthSubmit(e, 'github@oauth.com', 'GitHub User')}
              className="btn-secondary"
              style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '8px' }}
            >
              <GithubIcon size={16} />
              Continue with GitHub
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
