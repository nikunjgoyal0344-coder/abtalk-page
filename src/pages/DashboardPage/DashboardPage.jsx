import React, { useState, useEffect, useRef } from 'react';
import './DashboardPage.css';
import {
  LayoutDashboard, Flame, Target, BookOpen, Gamepad2,
  Timer as TimerIcon, Trophy, Settings, LogOut, Menu,
  ChevronsLeft, ChevronsRight, CheckCircle2, Circle,
  Play, Pause, RotateCcw, Coffee, Zap, TrendingUp,
  ArrowRight, Plus, Trash2, Clock, Activity, RefreshCw,
  CalendarCheck, Star, Award, Sparkles,
} from 'lucide-react';

// ─── Custom SVG icons ────────────────────────────────
const GithubIcon = ({ size = 16, ...p }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);
const LinkedinIcon = ({ size = 16, ...p }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
  </svg>
);

// ─── Static data ─────────────────────────────────────
const NAV = [
  { id: 'home',      label: 'Dashboard',     icon: LayoutDashboard },
  { id: 'challenge', label: 'Challenge Day',  icon: CalendarCheck },
  { id: 'today',     label: "Today's Task",  icon: Target },
  { id: 'pomo',      label: 'Pomodoro',      icon: TimerIcon },
  { id: 'games',     label: 'Mind Games',    icon: Gamepad2 },
  { id: 'study',     label: 'Study Log',     icon: BookOpen },
  { id: 'ach',       label: 'Achievements',  icon: Trophy },
];

const INIT_TASKS = [
  { id: 1, title: 'Implement Binary Search in Python', topic: 'Algorithms', diff: 'Easy',   pts: 10, done: false },
  { id: 2, title: 'Push code with a meaningful commit message', topic: 'GitHub', diff: 'Easy', pts: 5, done: false },
  { id: 3, title: 'Write a LinkedIn learning post', topic: 'LinkedIn', diff: 'Easy', pts: 5, done: false },
  { id: 4, title: 'Solve Linked List Cycle detection', topic: 'Data Structures', diff: 'Medium', pts: 15, done: false },
  { id: 5, title: 'Read: Big-O Time Complexity cheatsheet', topic: 'Theory', diff: 'Easy', pts: 5, done: false },
];

const INIT_LOGS = [
  { id: 1, title: 'Studied Linked Lists and pointers', duration: '45 min', topic: 'DSA',              date: 'Today',     color: 'red'  },
  { id: 2, title: 'Solved 3 LeetCode problems (Easy)',  duration: '30 min', topic: 'Problem Solving', date: 'Today',     color: 'cyan' },
  { id: 3, title: 'Watched OS scheduling lecture',      duration: '60 min', topic: 'OS Concepts',     date: 'Yesterday', color: 'grn'  },
  { id: 4, title: 'Revised DBMS normalization',         duration: '40 min', topic: 'DBMS',            date: 'Yesterday', color: 'amb'  },
];

const ACHIEVEMENTS = [
  { id: 1, emoji: '🔥', name: 'First Flame',     desc: 'Complete Day 1',          pts: 50,   unlocked: true  },
  { id: 2, emoji: '⚡', name: 'Week Warrior',    desc: '7-day streak',            pts: 200,  unlocked: true  },
  { id: 3, emoji: '💻', name: 'Code Committer',  desc: '7 GitHub commits',        pts: 150,  unlocked: true  },
  { id: 4, emoji: '📢', name: 'LinkedIn Legend', desc: '7 posts on LinkedIn',     pts: 100,  unlocked: true  },
  { id: 5, emoji: '🏆', name: 'Milestone 15',    desc: 'Reach Day 15',           pts: 400,  unlocked: false },
  { id: 6, emoji: '🚀', name: 'Launch Ready',    desc: 'Reach Day 30',           pts: 600,  unlocked: false },
  { id: 7, emoji: '🧠', name: 'Deep Learner',    desc: '20 study log entries',   pts: 300,  unlocked: false },
  { id: 8, emoji: '👑', name: 'Top 10%',         desc: 'Rank in top 10%',        pts: 500,  unlocked: false },
  { id: 9, emoji: '💎', name: 'Diamond Coder',   desc: 'Complete all 60 days',   pts: 1000, unlocked: false },
];

const EMOJIS = ['🚀', '💡', '🔥', '⚡', '🎯', '🏆', '💻', '🧠'];

function mkCards() {
  return [...EMOJIS, ...EMOJIS]
    .sort(() => Math.random() - 0.5)
    .map((e, i) => ({ id: i, emoji: e, flipped: false, matched: false }));
}

function greet() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function standingInfo(rank, total) {
  const p = rank / total;
  if (p <= 0.10) return { label: '🥇 Top 10%',  cls: 'st-gold'   };
  if (p <= 0.25) return { label: '🥈 Top 25%',  cls: 'st-silver' };
  if (p <= 0.50) return { label: '⬆️ Rising',    cls: 'st-rise'   };
  return               { label: '🌱 Building', cls: 'st-new'    };
}




// ─── HOME DASHBOARD ───────────────────────────────────
function HomeDashboard({ streak, bestStreak, dayNum, totalDays, rank, totalStudents, tasks, setTasks, onNavigate, userSession, onChallengeUpdate }) {
  const completedCount = getCompletedDaysCount();
  const pct = Math.round((completedCount / totalDays) * 100);
  const std = standingInfo(rank, totalStudents);
  const doneTasks = tasks.filter(t => t.done).length;
  const earnedPts = tasks.filter(t => t.done).reduce((s, t) => s + t.pts, 0);
  const firstName = userSession?.name?.split(' ')[0] || 'Coder';

  // Tour state
  const [onboardingDone, setOnboardingDone] = useState(() => {
    return localStorage.getItem("abtalks_onboarding_done") === "true";
  });
  
  // Vibe Pass state
  const [vibePasses, setVibePasses] = useState(() => {
    const saved = localStorage.getItem("abtalks_vibe_passes");
    return saved ? parseInt(saved) : 3;
  });
  
  // Yesterday completion check
  const [yesterdayMissed, setYesterdayMissed] = useState(false);
  useEffect(() => {
    if (dayNum > 1) {
      const yesterday = dayNum - 1;
      const isDone = isDayCompleted(yesterday);
      setYesterdayMissed(!isDone);
    } else {
      setYesterdayMissed(false);
    }
  }, [dayNum, streak]);

  // Profile handle sync states
  const [githubUser, setGithubUser] = useState(() => localStorage.getItem("abtalks_github_username") || '');
  const [linkedinUser, setLinkedinUser] = useState(() => localStorage.getItem("abtalks_linkedin_username") || '');
  const [profileSaved, setProfileSaved] = useState(() => !!(localStorage.getItem("abtalks_github_username") && localStorage.getItem("abtalks_linkedin_username")));

  const dismissOnboarding = () => {
    setOnboardingDone(true);
    localStorage.setItem("abtalks_onboarding_done", "true");
  };

  const activateVibePass = () => {
    if (vibePasses <= 0 || dayNum <= 1) return;
    const yesterday = dayNum - 1;
    
    // deduct vibe pass
    const nextPasses = vibePasses - 1;
    setVibePasses(nextPasses);
    localStorage.setItem("abtalks_vibe_passes", nextPasses.toString());
    
    // complete yesterday in localStorage
    const yesterdayState = {};
    DEFAULT_CHECKLIST_ITEMS.forEach(item => {
      yesterdayState[item.key] = true;
    });
    localStorage.setItem("abtalks_checklist_day_" + yesterday, JSON.stringify(yesterdayState));
    
    // add mock timing log
    const now = new Date().toISOString();
    const timing = { startedAt: now, completedAt: now };
    localStorage.setItem("abtalks_checklist_timing_day_" + yesterday, JSON.stringify(timing));
    
    // trigger updates
    setYesterdayMissed(false);
    onChallengeUpdate && onChallengeUpdate();
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!githubUser.trim() || !linkedinUser.trim()) return;
    localStorage.setItem("abtalks_github_username", githubUser.trim());
    localStorage.setItem("abtalks_linkedin_username", linkedinUser.trim());
    setProfileSaved(true);
  };

  return (
    <div>
      {/* Onboarding Tour Card */}
      {!onboardingDone && (
        <div className="db-card db-card-red mb4 animate-fade-in" style={{ borderColor: 'var(--red-bdr)', background: 'var(--red-glow)', padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span className="db-pill" style={{ marginBottom: 8, fontSize: 10 }}><Sparkles size={10} />NEW MEMBER TOUR</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--t1)', marginBottom: 6 }}>
                Welcome to the ABtalks 60-Day Challenge! 🚀
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--t2)', lineHeight: 1.5, marginBottom: 12 }}>
                ABtalks is a verified proof-of-work coding portal. Here is how you build consistency and showcase your growth directly to recruiter networks:
              </p>
            </div>
            <button type="button" className="db-btn btn-ghost" style={{ padding: '3px 8px', fontSize: 10 }} onClick={dismissOnboarding}>
              Skip Tour
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 14 }}>
            <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--bdr)', padding: 10, borderRadius: 8 }}>
              <div style={{ fontWeight: 700, fontSize: 12, color: 'var(--t1)', marginBottom: 4 }}>1. Check Challenge Day</div>
              <div style={{ fontSize: 11, color: 'var(--t3)' }}>Read the coding instructions, specifications, and layout objectives daily.</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--bdr)', padding: 10, borderRadius: 8 }}>
              <div style={{ fontWeight: 700, fontSize: 12, color: 'var(--t1)', marginBottom: 4 }}>2. Complete & Verify</div>
              <div style={{ fontSize: 11, color: 'var(--t3)' }}>Check off build requirements as you code. Add/remove items to match your workflow.</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--bdr)', padding: 10, borderRadius: 8 }}>
              <div style={{ fontWeight: 700, fontSize: 12, color: 'var(--t1)', marginBottom: 4 }}>3. Submit Proof of Work</div>
              <div style={{ fontSize: 11, color: 'var(--t3)' }}>Submit your GitHub commit URL and LinkedIn learning post link to protect your streak before midnight.</div>
            </div>
          </div>
          <button type="button" className="db-btn btn-red" style={{ padding: '6px 12px', fontSize: 11 }} onClick={dismissOnboarding}>
            Start Daily Challenge →
          </button>
        </div>
      )}

      {/* Vibe Pass / Streak Restore Card */}
      {yesterdayMissed && (
        <div className="db-card mb4 animate-fade-in" style={{ borderColor: 'var(--amber)', background: 'var(--amb-glow)', padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <span style={{ fontSize: 24 }}>⚠️</span>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--t1)', fontSize: 13.5 }}>Yesterday's Streak Reset Warning</div>
                <div style={{ fontSize: 11.5, color: 'var(--t2)' }}>
                  You missed completing Day {dayNum - 1} challenge yesterday. Your streak was broken!
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: 'var(--t3)' }}>({vibePasses} Vibe Passes left)</span>
              <button type="button" className="db-btn" style={{ padding: '6px 12px', fontSize: 11, background: 'var(--amber)', color: '#000', border: 'none', fontWeight: 700 }}
                disabled={vibePasses <= 0}
                onClick={activateVibePass}>
                🔥 Restore Streak with Vibe Pass
              </button>
            </div>
          </div>
        </div>
      )}

      {/* First Day No Streak Banner */}
      {streak === 0 && (
        <div className="db-card mb4 animate-fade-in" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(6, 182, 212, 0.05) 100%)', border: '1px dashed var(--bdr-h)', padding: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🔥</div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--t1)', marginBottom: 6 }}>
            Set Your Coding Fire!
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--t2)', maxWidth: 460, margin: '0 auto 14px', lineHeight: 1.5 }}>
            You don't have an active streak yet. Complete today's requirements or submit your proof of work to start your unbroken 60-day streak!
          </p>
          <button type="button" className="db-btn btn-red" style={{ padding: '8px 16px', fontSize: 12 }} onClick={() => onNavigate('challenge')}>
            Go to Challenge Day {dayNum} →
          </button>
        </div>
      )}

      {/* Empty Profile Actions Card */}
      {!profileSaved && (
        <div className="db-card mb4 animate-fade-in" style={{ border: '1px solid var(--bdr)', background: 'var(--bg1)', padding: '16px' }}>
          <div className="db-sh" style={{ marginBottom: 6 }}><Settings size={14} />Complete Your Developer Profile</div>
          <p style={{ fontSize: '0.8rem', color: 'var(--t3)', marginBottom: 12 }}>
            Your profile is currently empty. Sync your handles to unlock streak automation, leaderboard rankings, and direct recruiter visibility.
          </p>
          <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <input className="db-inp" placeholder="GitHub username (e.g. johndoe)" value={githubUser}
                onChange={e => setGithubUser(e.target.value)} required />
              <input className="db-inp" placeholder="LinkedIn handle (e.g. in/johndoe)" value={linkedinUser}
                onChange={e => setLinkedinUser(e.target.value)} required />
            </div>
            <button type="submit" className="db-btn btn-red" style={{ alignSelf: 'flex-start', padding: '6px 14px', fontSize: 11 }}>
              Save & Sync Accounts
            </button>
          </form>
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div className="db-pill"><Flame size={11} />{streak} Day Streak 🔥</div>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 className="db-h1">{greet()}, {firstName}! 👋</h1>
            <p className="db-sub">Day {dayNum} of {totalDays} — Keep building. Keep committing.</p>
          </div>
          <div className={`db-standing ${std.cls}`}>{std.label}</div>
        </div>
      </div>

      {/* Stat row */}
      <div className="db-stats">
        {[
          { ico: <Flame size={15} />, cls: 'ico-red',  val: streak,   lbl: 'Day Streak',  chg: `Best: ${bestStreak}`,  up: true },
          { ico: <CalendarCheck size={15} />, cls: 'ico-cyan', val: dayNum,   lbl: `Day of ${totalDays}`, chg: `${totalDays - dayNum} days left`, up: false },
          { ico: <Activity size={15} />, cls: 'ico-grn',  val: `${pct}%`, lbl: 'Completion',  chg: '+1.7% today',  up: true  },
          { ico: <Trophy size={15} />, cls: 'ico-amb',  val: `#${rank}`,lbl: 'Your Rank',   chg: `of ${totalStudents}`, up: false },
        ].map(({ ico, cls, val, lbl, chg, up }, i) => (
          <div key={lbl} className={`db-stat d${i + 1}`}>
            <div className={`db-stat-ico ${cls}`}>{ico}</div>
            <div className="db-stat-val">{val}</div>
            <div className="db-stat-lbl">{lbl}</div>
            <div className={`db-stat-chg ${up ? 'chg-up' : 'chg-flat'}`}>
              {up && <TrendingUp size={10} />}{chg}
            </div>
          </div>
        ))}
      </div>

      {/* Progress + Today's tasks */}
      <div className="g2">
        {/* Challenge progress */}
        <div className="db-card db-card-red">
          <div className="db-sh"><Activity size={14} />Challenge Progress</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, marginBottom: 14 }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 52, fontWeight: 700, color: 'var(--t1)', lineHeight: 1 }}>{pct}</span>
            <span style={{ fontSize: 22, fontWeight: 700, color: 'var(--t3)', paddingBottom: 8 }}>%</span>
            <span style={{ fontSize: 13, color: 'var(--t3)', paddingBottom: 10, marginLeft: 4 }}>complete</span>
          </div>
          <div className="db-pb-wrap mb3" style={{ height: 8 }}>
            <div className="db-pb pb-red" style={{ '--pw': `${pct}%` }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--t3)', marginBottom: 14 }}>
            <span>Day {dayNum} / {totalDays}</span>
            <span>{totalDays - dayNum} remaining</span>
          </div>
          <hr className="db-hr" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'GitHub Commits', pw: '80%', cls: 'pb-red',  sub: '24 / 30 this month' },
              { label: 'LinkedIn Posts', pw: '71%', cls: 'pb-cyan', sub: '5 / 7 this week'    },
            ].map(({ label, pw, cls, sub }) => (
              <div key={label}>
                <div style={{ fontSize: 11, color: 'var(--t3)', marginBottom: 5 }}>{label}</div>
                <div className="db-pb-wrap"><div className={`db-pb ${cls}`} style={{ '--pw': pw }} /></div>
                <div style={{ fontSize: 11, color: 'var(--t3)', marginTop: 4 }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's tasks preview */}
        <div className="db-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div className="db-sh" style={{ margin: 0 }}><Target size={14} />Today's Tasks</div>
            <button type="button" className="db-btn btn-ghost" style={{ padding: '5px 12px', fontSize: 12 }} onClick={() => onNavigate('today')}>
              View All <ArrowRight size={13} />
            </button>
          </div>

          <div style={{ flex: 1 }}>
            {tasks.slice(0, 3).map(t => (
              <div key={t.id} className="db-ti" style={{ marginBottom: 7 }}>
                <button type="button" className={`db-ti-ck ${t.done ? 'ck-done' : 'ck-todo'}`}
                  onClick={() => setTasks(ts => ts.map(x => x.id === t.id ? { ...x, done: !x.done } : x))}>
                  {t.done ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                </button>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className={`ti-title${t.done ? ' done' : ''}`}>{t.title}</div>
                  <div className="ti-meta">{t.topic}</div>
                </div>
                <span className={`ti-badge diff-${t.diff[0].toLowerCase()}`}>{t.diff}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--bdr)', display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--t3)' }}>
            <span>{doneTasks}/{tasks.length} complete</span>
            <span style={{ color: 'var(--red-l)', fontWeight: 600 }}>{earnedPts} pts earned</span>
          </div>
        </div>
      </div>

      {/* Standing + Quick actions */}
      <div className="g2">
        {/* Student standing */}
        <div className="db-card db-card-cyan">
          <div className="db-sh"><Star size={14} />Student Standing</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 16 }}>
            <div style={{ textAlign: 'center', flexShrink: 0 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 700, color: 'var(--cyan)', lineHeight: 1 }}>#{rank}</div>
              <div style={{ fontSize: 11, color: 'var(--t3)', marginTop: 4 }}>Rank</div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>{std.label}</div>
              <div className="db-pb-wrap mb3">
                <div className="db-pb pb-cyan" style={{ '--pw': `${Math.round(((totalStudents - rank) / totalStudents) * 100)}%` }} />
              </div>
              <div style={{ fontSize: 12, color: 'var(--t3)' }}>
                Better than {Math.round(((totalStudents - rank) / totalStudents) * 100)}% of students
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, textAlign: 'center' }}>
            {[
              { val: streak,                                                    lbl: 'Streak' },
              { val: earnedPts + 150,                                           lbl: 'Points'  },
              { val: ACHIEVEMENTS.filter(a => a.unlocked).length,              lbl: 'Badges'  },
            ].map(({ val, lbl }) => (
              <div key={lbl} style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 10, padding: '10px 8px', border: '1px solid var(--bdr)' }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: 'var(--t1)' }}>{val}</div>
                <div style={{ fontSize: 11, color: 'var(--t3)' }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="db-card" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div className="db-sh"><Zap size={14} />Quick Actions</div>
          {[
            { lbl: 'Start Pomodoro',    sub: '25-min focus session',    icon: TimerIcon,   pg: 'pomo',  icoC: 'var(--red-l)',   icoBg: 'var(--red-glow)',  icoBdr: 'var(--red-bdr)'  },
            { lbl: 'Play Mind Game',    sub: 'Train your brain',         icon: Gamepad2,    pg: 'games', icoC: 'var(--cyan)',    icoBg: 'var(--cyan-glow)', icoBdr: 'var(--cyan-bdr)' },
            { lbl: 'Log Study Session', sub: 'Track your learning',      icon: BookOpen,    pg: 'study', icoC: 'var(--green)',   icoBg: 'var(--grn-glow)',  icoBdr: 'var(--grn-bdr)'  },
            { lbl: 'View Achievements', sub: `${ACHIEVEMENTS.filter(a=>a.unlocked).length} unlocked`, icon: Trophy, pg: 'ach', icoC: 'var(--amber)', icoBg: 'var(--amb-glow)', icoBdr: 'var(--amb-bdr)' },
          ].map(({ lbl, sub, icon: Icon, pg, icoC, icoBg, icoBdr }, i) => (
            <button key={pg} type="button" className={`qa-btn d${i + 1}`} onClick={() => onNavigate(pg)}>
              <div className="qa-ico" style={{ background: icoBg, color: icoC, borderColor: icoBdr }}><Icon size={15} /></div>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--t1)' }}>{lbl}</div>
                <div style={{ fontSize: 11.5, color: 'var(--t3)' }}>{sub}</div>
              </div>
              <ArrowRight size={14} style={{ marginLeft: 'auto', color: 'var(--t4)' }} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── TODAY'S TASK ─────────────────────────────────────
function TodayTask({ tasks, setTasks }) {
  const done = tasks.filter(t => t.done).length;
  const pct  = Math.round((done / tasks.length) * 100);

  return (
    <div>
      <div className="db-pill"><Target size={11} />Day 7 Tasks</div>
      <h1 className="db-h1">Today's Task</h1>
      <p className="db-sub">Complete all tasks to protect your streak</p>

      <div className="db-card mt4 mb4">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--t2)' }}>{done} of {tasks.length} completed</span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: pct === 100 ? 'var(--green)' : 'var(--red-l)' }}>{pct}%</span>
        </div>
        <div className="db-pb-wrap" style={{ height: 10 }}>
          <div className="db-pb pb-red" style={{ '--pw': `${pct}%` }} />
        </div>
      </div>

      {tasks.map((t, i) => (
        <div key={t.id} className="db-ti" style={{ animationDelay: `${i * 0.05}s` }}>
          <button type="button" className={`db-ti-ck ${t.done ? 'ck-done' : 'ck-todo'}`}
            onClick={() => setTasks(ts => ts.map(x => x.id === t.id ? { ...x, done: !x.done } : x))}>
            {t.done ? <CheckCircle2 size={22} /> : <Circle size={22} />}
          </button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className={`ti-title${t.done ? ' done' : ''}`}>{t.title}</div>
            <div className="ti-meta">{t.topic} · {t.pts} pts</div>
          </div>
          <span className={`ti-badge diff-${t.diff[0].toLowerCase()}`}>{t.diff}</span>
        </div>
      ))}

      {pct === 100 && (
          <div className="db-card db-card-red mt4" style={{ textAlign: 'center', padding: 28 }}>
            <div style={{ fontSize: 44, marginBottom: 10 }}>🎉</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: 'var(--t1)', marginBottom: 4 }}>All tasks done!</div>
            <div style={{ fontSize: 13, color: 'var(--t3)' }}>Your streak is safe. Back again tomorrow!</div>
          </div>
        )}
    </div>
  );
}

// ─── POMODORO ─────────────────────────────────────────
const MODES = [
  { id: 'focus', label: 'Focus',      dur: 25 * 60 },
  { id: 'short', label: 'Short Break', dur:  5 * 60, brk: true },
  { id: 'long',  label: 'Long Break',  dur: 15 * 60, brk: true },
];

function Pomodoro() {
  const [mIdx,    setMIdx]    = useState(0);
  const [left,    setLeft]    = useState(MODES[0].dur);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const timerRef = useRef(null);

  const mode = MODES[mIdx];
  const R     = 88;
  const CIRC  = 2 * Math.PI * R;
  const offset = CIRC * (1 - left / mode.dur);

  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => {
        setLeft(l => {
          if (l <= 1) {
            clearInterval(timerRef.current);
            setRunning(false);
            if (mIdx === 0) setSessions(s => s + 1);
            return 0;
          }
          return l - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [running, mIdx]);

  const switchMode = i => { setRunning(false); setMIdx(i); setLeft(MODES[i].dur); };
  const reset = () => { setRunning(false); setLeft(mode.dur); };

  const mm = String(Math.floor(left / 60)).padStart(2, '0');
  const ss = String(left % 60).padStart(2, '0');

  return (
    <div>
      <div className="db-pill"><TimerIcon size={11} />Focus Timer</div>
      <h1 className="db-h1">Pomodoro Timer</h1>
      <p className="db-sub">Focus deeply, break strategically, repeat</p>

      <div className="db-card mt5" style={{ maxWidth: 380, margin: '20px auto 0' }}>
        <div className="pm-wrap">
          {/* Mode tabs */}
          <div className="pm-tabs">
            {MODES.map((m, i) => (
              <button key={m.id} type="button"
                className={`pm-tab${mIdx === i ? ` db-on${m.brk ? ' brk' : ''}` : ''}`}
                onClick={() => switchMode(i)}>
                {m.label}
              </button>
            ))}
          </div>

          {/* SVG ring */}
          <div className="pm-ring-wrap">
            <svg className="pm-svg" width="200" height="200" viewBox="0 0 200 200">
              <circle className="pm-track" cx="100" cy="100" r={R} />
              <circle
                className={`pm-fill${mode.brk ? ' brk' : ''}`}
                cx="100" cy="100" r={R}
                strokeDasharray={CIRC}
                strokeDashoffset={offset}
              />
            </svg>
            <div className="pm-center">
              <div className="pm-time">{mm}:{ss}</div>
              <div className="pm-lbl">{mode.label}</div>
            </div>
          </div>

          {/* Controls */}
          <div className="pm-ctrls">
            <button type="button" className="db-btn btn-ghost"
              style={{ width: 44, height: 44, padding: 0, justifyContent: 'center', borderRadius: '50%' }}
              onClick={reset}><RotateCcw size={17} /></button>

            <button type="button" className="db-btn btn-red"
              style={{ width: 56, height: 56, padding: 0, justifyContent: 'center', borderRadius: '50%' }}
              onClick={() => setRunning(r => !r)}>
              {running ? <Pause size={22} /> : <Play size={22} />}
            </button>

            <button type="button" className="db-btn btn-ghost"
              style={{ width: 44, height: 44, padding: 0, justifyContent: 'center', borderRadius: '50%' }}
              onClick={() => switchMode(1)}><Coffee size={17} /></button>
          </div>

          {/* Session dots */}
          <div className="pm-sessions">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={`pm-dot${i < (sessions % 5) ? ' done' : ''}`} />
            ))}
          </div>
          <div style={{ fontSize: 12, color: 'var(--t3)', marginTop: 10, textAlign: 'center' }}>
            {sessions} session{sessions !== 1 ? 's' : ''} completed today
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MIND GAMES ───────────────────────────────────────
// ─── CODING STUDENT MIND GAMES ────────────────────────
const MATCH_PAIRS = [
  { id: 1, term: 'O(N log N)', def: 'Merge Sort Complexity' },
  { id: 2, term: 'JSX',        def: 'React XML-like Syntax' },
  { id: 3, term: 'Closure',    def: 'Lexical scoping function' },
  { id: 4, term: 'Docker',     def: 'Containerization engine' },
  { id: 5, term: 'DNS',        def: 'Maps domain names to IPs' },
];

const QUIZ_QUESTIONS = [
  {
    code: 'console.log(typeof []);',
    opts: ['"array"', '"object"', '"null"', '"undefined"'],
    ans: 1,
    desc: "In JavaScript, arrays are structural objects, so typeof [] returns 'object'."
  },
  {
    code: 'console.log(2 + "2");',
    opts: ['4', '"22"', 'NaN', 'TypeError'],
    ans: 1,
    desc: "When adding a number and a string, JS coerces the number into a string and concatenates them."
  },
  {
    code: `let a = [1, 2];
let b = a;
b.push(3);
console.log(a.length);`,
    opts: ['2', '3', 'undefined', 'ReferenceError'],
    ans: 1,
    desc: "Arrays are passed by reference, so modifying b also modifies a."
  },
  {
    code: 'console.log(0.1 + 0.2 === 0.3);',
    opts: ['true', 'false', 'undefined', 'TypeError'],
    ans: 1,
    desc: "Due to floating-point precision binary representation, 0.1 + 0.2 equals 0.30000000000000004."
  }
];

const TYPING_SNIPPETS = [
  {
    lang: "JavaScript",
    code: "const binarySearch = (arr, val) => {\n  let l = 0, r = arr.length - 1;\n  while (l <= r) {\n    const m = Math.floor((l + r) / 2);\n    if (arr[m] === val) return m;\n    if (arr[m] < val) l = m + 1;\n    else r = m - 1;\n  }\n  return -1;\n};"
  },
  {
    lang: "React Hook",
    code: "useEffect(() => {\n  const handler = setTimeout(() => {\n    setDebouncedValue(value);\n  }, delay);\n  return () => {\n    clearTimeout(handler);\n  };\n}, [value, delay]);"
  },
  {
    lang: "CSS Grid",
    code: ".card-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 20px;\n  align-items: stretch;\n}"
  }
];

function Games() {
  const [activeTab, setActiveTab] = useState('memory');

  // Game 5: Typing Speed Test
  const [typingIdx, setTypingIdx] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [typingStart, setTypingStart] = useState(null);
  const [typingTime, setTypingTime] = useState(0);
  const [typingDone, setTypingDone] = useState(false);
  const typingTimerRef = useRef(null);

  const activeSnippet = TYPING_SNIPPETS[typingIdx].code;

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, []);

  const handleTypingChange = (e) => {
    const val = e.target.value;
    if (typingDone) return;
    
    if (!typingStart && val.length > 0) {
      setTypingStart(Date.now());
      typingTimerRef.current = setInterval(() => {
        setTypingTime(t => t + 1);
      }, 1000);
    }
    
    setTypedText(val);

    if (val.length >= activeSnippet.length) {
      setTypingDone(true);
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    }
  };

  const restartTyping = () => {
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    setTypedText('');
    setTypingStart(null);
    setTypingTime(0);
    setTypingDone(false);
  };

  const changeSnippet = (nextIdx) => {
    setTypingIdx(nextIdx);
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    setTypedText('');
    setTypingStart(null);
    setTypingTime(0);
    setTypingDone(false);
  };

  const getTypingStats = () => {
    const minutes = typingTime > 0 ? (typingTime / 60) : (1 / 60);
    const charCount = typedText.length;
    let correct = 0;
    for (let i = 0; i < charCount; i++) {
      if (typedText[i] === activeSnippet[i]) correct++;
    }
    const accuracy = charCount > 0 ? Math.round((correct / charCount) * 100) : 100;
    const wpm = Math.round((correct / 5) / minutes);
    return { wpm, accuracy };
  };
  const { wpm: currentWpm, accuracy: currentAcc } = getTypingStats();

  // Game 1: Memory
  const [cards, setCards] = useState(mkCards);
  const [flipped, setFlipped] = useState([]);
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);
  const [won, setWon] = useState(false);

  const flip = id => {
    if (locked || won) return;
    const card = cards.find(c => c.id === id);
    if (!card || card.flipped || card.matched) return;

    const next = [...flipped, id];
    setCards(cs => cs.map(c => c.id === id ? { ...c, flipped: true } : c));

    if (next.length === 2) {
      setMoves(m => m + 1);
      setLocked(true);
      const [a, b] = next.map(fid => cards.find(c => c.id === fid));
      if (a.emoji === b.emoji) {
        setCards(cs => cs.map(c => next.includes(c.id) ? { ...c, matched: true } : c));
        setFlipped([]);
        setLocked(false);
        if (cards.filter(c => c.matched).length + 2 === cards.length) setWon(true);
      } else {
        setTimeout(() => {
          setCards(cs => cs.map(c => next.includes(c.id) ? { ...c, flipped: false } : c));
          setFlipped([]);
          setLocked(false);
        }, 820);
      }
    } else {
      setFlipped(next);
    }
  };
  const restartMemory = () => { setCards(mkCards()); setFlipped([]); setMoves(0); setLocked(false); setWon(false); };

  // Game 2: Binary Search Guessing
  const [targetNum, setTargetNum] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [low, setLow] = useState(1);
  const [high, setHigh] = useState(100);
  const [guessVal, setGuessVal] = useState('');
  const [guessHistory, setGuessHistory] = useState([]);
  const [wonSearch, setWonSearch] = useState(false);

  const submitGuess = e => {
    e.preventDefault();
    const val = parseInt(guessVal);
    if (isNaN(val) || val < 1 || val > 100) return;
    setGuessVal('');

    let res = '';
    if (val === targetNum) {
      res = 'Correct! Match found.';
      setWonSearch(true);
    } else if (val > targetNum) {
      res = 'Too high!';
      if (val - 1 < high) setHigh(val - 1);
    } else {
      res = 'Too low!';
      if (val + 1 > low) setLow(val + 1);
    }
    setGuessHistory(gh => [{ num: val, res }, ...gh]);
  };
  const restartBinary = () => {
    setTargetNum(Math.floor(Math.random() * 100) + 1);
    setLow(1);
    setHigh(100);
    setGuessHistory([]);
    setWonSearch(false);
  };

  // Game 3: Syntax Matcher
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [selectedDef, setSelectedDef] = useState(null);
  const [matchedIds, setMatchedIds] = useState([]);
  const [shuffledTerms, setShuffledTerms] = useState(() => [...MATCH_PAIRS].sort(() => Math.random() - 0.5));
  const [shuffledDefs, setShuffledDefs] = useState(() => [...MATCH_PAIRS].sort(() => Math.random() - 0.5));
  const [syntaxWon, setSyntaxWon] = useState(false);

  const selectTerm = termId => {
    if (matchedIds.includes(termId)) return;
    setSelectedTerm(termId);
    if (selectedDef) {
      checkMatch(termId, selectedDef);
    }
  };

  const selectDef = defId => {
    if (matchedIds.includes(defId)) return;
    setSelectedDef(defId);
    if (selectedTerm) {
      checkMatch(selectedTerm, defId);
    }
  };

  const checkMatch = (termId, defId) => {
    if (termId === defId) {
      const nextMatched = [...matchedIds, termId];
      setMatchedIds(nextMatched);
      if (nextMatched.length === MATCH_PAIRS.length) setSyntaxWon(true);
    }
    setTimeout(() => {
      setSelectedTerm(null);
      setSelectedDef(null);
    }, 400);
  };

  const restartSyntax = () => {
    setMatchedIds([]);
    setShuffledTerms([...MATCH_PAIRS].sort(() => Math.random() - 0.5));
    setShuffledDefs([...MATCH_PAIRS].sort(() => Math.random() - 0.5));
    setSelectedTerm(null);
    setSelectedDef(null);
    setSyntaxWon(false);
  };

  // Game 4: JS Scope Quiz
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  const submitQuizAns = () => {
    if (selectedOpt === null || quizSubmitted) return;
    const currentQ = QUIZ_QUESTIONS[quizIdx];
    if (selectedOpt === currentQ.ans) {
      setQuizScore(s => s + 1);
    }
    setQuizSubmitted(true);
  };

  const nextQuizQ = () => {
    setSelectedOpt(null);
    setQuizSubmitted(false);
    if (quizIdx + 1 < QUIZ_QUESTIONS.length) {
      setQuizIdx(quizIdx + 1);
    } else {
      setQuizDone(true);
    }
  };

  const restartQuiz = () => {
    setQuizIdx(0);
    setSelectedOpt(null);
    setQuizSubmitted(false);
    setQuizScore(0);
    setQuizDone(false);
  };

  return (
    <div>
      <div className="db-pill"><Gamepad2 size={11} />Brain Training</div>
      <h1 className="db-h1">Mind Games</h1>
      <p className="db-sub">Keep your brain sharp between coding sessions</p>

      {/* Main Game Selector Tabs */}
      <div className="pm-tabs mt4 mb4" style={{ justifyContent: 'center' }}>
        {[
          { id: 'memory', label: 'Memory Flip' },
          { id: 'binary', label: 'Binary Search Guess' },
          { id: 'syntax', label: 'Syntax Matcher' },
          { id: 'quiz',   label: 'JS Scope Quiz' },
          { id: 'typing', label: 'Speed Typist' }
        ].map(tab => (
          <button key={tab.id} type="button"
            className={`pm-tab${activeTab === tab.id ? ' db-on' : ''}`}
            onClick={() => setActiveTab(tab.id)}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Memory Flip Game */}
      {activeTab === 'memory' && (
        <div className="db-card" style={{ maxWidth: 440, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: 'var(--t1)' }}>{cards.filter(c => c.matched).length / 2}</div>
              <div style={{ fontSize: 11, color: 'var(--t3)' }}>Pairs Found</div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: 'var(--t1)' }}>{moves}</div>
              <div style={{ fontSize: 11, color: 'var(--t3)' }}>Moves</div>
            </div>
            <button type="button" className="db-btn btn-ghost" style={{ padding: '6px 12px', fontSize: 12 }} onClick={restartMemory}>
              <RefreshCw size={13} />Reset
            </button>
          </div>

          {won ? (
            <div style={{ textAlign: 'center', padding: '28px 0' }}>
              <div style={{ fontSize: 50 }}>🎉</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: 'var(--t1)', margin: '12px 0 6px' }}>You won!</div>
              <div style={{ fontSize: 13, color: 'var(--t3)', marginBottom: 18 }}>Completed in {moves} moves</div>
              <button type="button" className="db-btn btn-red" onClick={restartMemory}>Play Again</button>
            </div>
          ) : (
            <div className="mem-grid">
              {cards.map(card => (
                <div key={card.id}
                  className={`mem-card${card.flipped || card.matched ? ' mem-flip' : ''}${card.matched ? ' mem-match' : ''}`}
                  onClick={() => flip(card.id)}>
                  <div className="mem-inner">
                    <div className="mem-front">❓</div>
                    <div className="mem-back">{card.emoji}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Binary Search Guessing Game */}
      {activeTab === 'binary' && (
        <div className="db-card" style={{ maxWidth: 440, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 12, color: 'var(--t3)' }}>Optimal Range</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: 'var(--red-l)' }}>[{low} - {high}]</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: 'var(--t3)' }}>Optimal Next Guess</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: 'var(--cyan)' }}>{Math.floor((low + high) / 2)}</div>
            </div>
            <button type="button" className="db-btn btn-ghost" style={{ padding: '6px 12px', fontSize: 12 }} onClick={restartBinary}>
              <RefreshCw size={13} />Reset
            </button>
          </div>

          {wonSearch ? (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div style={{ fontSize: 44 }}>🏆</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: 'var(--t1)', margin: '8px 0' }}>Correct! Secret number was {targetNum}</div>
              <div style={{ fontSize: 13, color: 'var(--t3)', marginBottom: 18 }}>Found in {guessHistory.length} attempts</div>
              <button type="button" className="db-btn btn-red" onClick={restartBinary}>Play Again</button>
            </div>
          ) : (
            <div>
              <form onSubmit={submitGuess} style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
                <input type="number" min="1" max="100" className="db-inp" placeholder="Guess 1-100..."
                  value={guessVal} onChange={e => setGuessVal(e.target.value)} required />
                <button type="submit" className="db-btn btn-red">Submit</button>
              </form>

              <div style={{ maxHeight: 180, overflowY: 'auto', border: '1px solid var(--bdr)', borderRadius: 10, padding: 10, background: 'rgba(255,255,255,0.01)' }}>
                <div style={{ fontSize: 11, color: 'var(--t3)', borderBottom: '1px solid var(--bdr)', paddingBottom: 5, marginBottom: 5 }}>Guess History</div>
                {guessHistory.map((gh, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 13 }}>
                    <span style={{ fontWeight: 600, color: 'var(--t1)' }}>Attempt {guessHistory.length - idx}: {gh.num}</span>
                    <span style={{ color: gh.res.includes('Correct') ? 'var(--green)' : 'var(--red-l)' }}>{gh.res}</span>
                  </div>
                ))}
                {guessHistory.length === 0 && (
                  <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--t4)', padding: '20px 0' }}>No guesses yet. Guess the midpoint to partition optimally!</div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Syntax Matcher Game */}
      {activeTab === 'syntax' && (
        <div className="db-card" style={{ maxWidth: 460, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <div style={{ fontSize: 12, color: 'var(--t3)' }}>Click a Term then match it to its Definition!</div>
            <button type="button" className="db-btn btn-ghost" style={{ padding: '6px 12px', fontSize: 12 }} onClick={restartSyntax}>
              <RefreshCw size={13} />Reset
            </button>
          </div>

          {syntaxWon ? (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div style={{ fontSize: 44 }}>🎓</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: 'var(--t1)', margin: '8px 0' }}>Perfect Match!</div>
              <div style={{ fontSize: 13, color: 'var(--t3)', marginBottom: 18 }}>You matched all coding concepts correctly.</div>
              <button type="button" className="db-btn btn-red" onClick={restartSyntax}>Play Again</button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {/* Terms Column */}
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--t3)', marginBottom: 8, textTransform: 'uppercase' }}>Terms</div>
                {shuffledTerms.map(t => {
                  const isMatched = matchedIds.includes(t.id);
                  const isSelected = selectedTerm === t.id;
                  return (
                    <button key={t.id} type="button"
                      style={{
                        width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid',
                        borderColor: isMatched ? 'var(--grn-bdr)' : isSelected ? 'var(--red-bdr)' : 'var(--bdr)',
                        background: isMatched ? 'var(--grn-glow)' : isSelected ? 'var(--red-glow)' : 'var(--bg3)',
                        color: isMatched ? 'var(--green)' : isSelected ? 'var(--red-l)' : 'var(--t1)',
                        fontSize: 13, fontWeight: 600, textAlign: 'left', cursor: isMatched ? 'default' : 'pointer',
                        marginBottom: 6, transition: 'all 0.15s'
                      }}
                      onClick={() => selectTerm(t.id)}>
                      {t.term} {isMatched && '✓'}
                    </button>
                  );
                })}
              </div>

              {/* Definitions Column */}
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--t3)', marginBottom: 8, textTransform: 'uppercase' }}>Definitions</div>
                {shuffledDefs.map(d => {
                  const isMatched = matchedIds.includes(d.id);
                  const isSelected = selectedDef === d.id;
                  return (
                    <button key={d.id} type="button"
                      style={{
                        width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid',
                        borderColor: isMatched ? 'var(--grn-bdr)' : isSelected ? 'var(--red-bdr)' : 'var(--bdr)',
                        background: isMatched ? 'var(--grn-glow)' : isSelected ? 'var(--red-glow)' : 'var(--bg3)',
                        color: isMatched ? 'var(--green)' : isSelected ? 'var(--red-l)' : 'var(--t2)',
                        fontSize: 12, textAlign: 'left', cursor: isMatched ? 'default' : 'pointer',
                        marginBottom: 6, transition: 'all 0.15s', height: 'auto', minHeight: 42
                      }}
                      onClick={() => selectDef(d.id)}>
                      {d.def} {isMatched && '✓'}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* JS Scope Quiz */}
      {activeTab === 'quiz' && (
        <div className="db-card" style={{ maxWidth: 440, margin: '0 auto' }}>
          {quizDone ? (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div style={{ fontSize: 44 }}>💡</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: 'var(--t1)', margin: '8px 0' }}>Quiz Complete!</div>
              <div style={{ fontSize: 14, color: 'var(--t2)', marginBottom: 18 }}>You scored {quizScore} / {QUIZ_QUESTIONS.length}</div>
              <button type="button" className="db-btn btn-red" onClick={restartQuiz}>Try Again</button>
            </div>
          ) : (
            <div>
              {/* Progress */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--t3)', marginBottom: 8 }}>
                <span>Question {quizIdx + 1} of {QUIZ_QUESTIONS.length}</span>
                <span>Score: {quizScore}</span>
              </div>

              {/* Code display */}
              <pre className="db-inp" style={{
                fontFamily: 'monospace', fontSize: 12, background: 'rgba(0,0,0,0.4)',
                border: '1px solid var(--bdr)', padding: 12, borderRadius: 8,
                color: 'var(--red-xl)', whiteSpace: 'pre-wrap', marginBottom: 14
              }}>
                {QUIZ_QUESTIONS[quizIdx].code}
              </pre>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
                {QUIZ_QUESTIONS[quizIdx].opts.map((opt, oIdx) => {
                  const isSelected = selectedOpt === oIdx;
                  let borderC = isSelected ? 'var(--red-bdr)' : 'var(--bdr)';
                  let bgC = isSelected ? 'var(--red-glow)' : 'var(--bg3)';
                  let textC = isSelected ? 'var(--red-l)' : 'var(--t2)';

                  if (quizSubmitted) {
                    const isCorrectAnswer = oIdx === QUIZ_QUESTIONS[quizIdx].ans;
                    if (isCorrectAnswer) {
                      borderC = 'var(--grn-bdr)';
                      bgC = 'var(--grn-glow)';
                      textC = 'var(--green)';
                    } else if (isSelected) {
                      borderC = 'var(--red-bdr)';
                      bgC = 'var(--red-glow)';
                      textC = 'var(--red-l)';
                    }
                  }

                  return (
                    <button key={oIdx} type="button" disabled={quizSubmitted}
                      style={{
                        width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid',
                        borderColor: borderC, background: bgC, color: textC,
                        fontSize: 13.5, fontWeight: 550, textAlign: 'left', cursor: quizSubmitted ? 'default' : 'pointer',
                        transition: 'all 0.15s'
                      }}
                      onClick={() => setSelectedOpt(oIdx)}>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Explanation/Desc */}
              {quizSubmitted && (
                <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--bdr)', borderRadius: 8, padding: 10, fontSize: 12, color: 'var(--t2)', marginBottom: 14 }}>
                  <strong>{selectedOpt === QUIZ_QUESTIONS[quizIdx].ans ? 'Correct!' : 'Incorrect.'}</strong> {QUIZ_QUESTIONS[quizIdx].desc}
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                {!quizSubmitted ? (
                  <button type="button" className="db-btn btn-red" disabled={selectedOpt === null} onClick={submitQuizAns}>
                    Submit Answer
                  </button>
                ) : (
                  <button type="button" className="db-btn btn-red" onClick={nextQuizQ}>
                    {quizIdx + 1 === QUIZ_QUESTIONS.length ? 'Finish Quiz' : 'Next Question'}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Typing Speed Game */}
      {activeTab === 'typing' && (
        <div className="db-card" style={{ maxWidth: 550, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {TYPING_SNIPPETS.map((snip, sidx) => (
                <button key={sidx} type="button" 
                  className={`db-btn ${typingIdx === sidx ? 'btn-red' : 'btn-ghost'}`}
                  style={{ padding: '4px 10px', fontSize: 11 }}
                  onClick={() => changeSnippet(sidx)}>
                  {snip.lang}
                </button>
              ))}
            </div>
            <button type="button" className="db-btn btn-ghost" style={{ padding: '6px 12px', fontSize: 11 }} onClick={restartTyping}>
              <RefreshCw size={12} />Reset
            </button>
          </div>

          <div style={{ display: 'flex', gap: 20, marginBottom: 14, background: 'rgba(255,255,255,0.01)', border: '1px solid var(--bdr)', borderRadius: 8, padding: 12 }}>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--t1)' }}>
                {currentWpm}
              </div>
              <div style={{ fontSize: 10, color: 'var(--t3)', textTransform: 'uppercase' }}>Speed (WPM)</div>
            </div>
            <div style={{ flex: 1, textAlign: 'center', borderLeft: '1px solid var(--bdr)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--t1)' }}>
                {currentAcc}%
              </div>
              <div style={{ fontSize: 10, color: 'var(--t3)', textTransform: 'uppercase' }}>Accuracy</div>
            </div>
            <div style={{ flex: 1, textAlign: 'center', borderLeft: '1px solid var(--bdr)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--t1)' }}>
                {typingTime}s
              </div>
              <div style={{ fontSize: 10, color: 'var(--t3)', textTransform: 'uppercase' }}>Time</div>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <div className="typing-display-box" onClick={() => document.getElementById("typing-hidden-input").focus()}>
              {activeSnippet.split("").map((char, index) => {
                let colorClass = "char-untyped";
                if (index < typedText.length) {
                  colorClass = typedText[index] === char ? "char-correct" : "char-incorrect";
                } else if (index === typedText.length) {
                  colorClass = "char-cursor";
                }
                return (
                  <span key={index} className={colorClass}>
                    {char}
                  </span>
                );
              })}
            </div>

            <textarea
              id="typing-hidden-input"
              value={typedText}
              onChange={handleTypingChange}
              disabled={typingDone}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                opacity: 0,
                width: '100%',
                height: '100%',
                cursor: 'text',
                resize: 'none',
                zIndex: 2
              }}
              placeholder="Click here to focus and start typing..."
              autoFocus
            />
          </div>

          {typingDone && (
            <div className="success" style={{ marginTop: 14 }}>
              <div className="success-title">🎉 TYPING SPEED TEST COMPLETE</div>
              <div className="success-text">
                You finished with <strong>{currentWpm} WPM</strong> and <strong>{currentAcc}%</strong> accuracy. Outstanding job!
              </div>
            </div>
          )}

          {!typingStart && !typingDone && (
            <div style={{ fontSize: 11, color: 'var(--t3)', marginTop: 10, textAlign: 'center' }}>
              💡 Click the box above and start typing to begin the timer.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── STUDY LOG ────────────────────────────────────────
const LOG_COLORS = ['red', 'cyan', 'grn', 'amb'];

function StudyLog({ logs, setLogs }) {
  const [form, setForm] = useState({ title: '', topic: '', dur: '' });
  const add = e => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setLogs(ls => [{
      id: Date.now(),
      title: form.title,
      topic: form.topic || 'General',
      duration: form.dur || '?',
      date: 'Just now',
      color: LOG_COLORS[ls.length % 4],
    }, ...ls]);
    setForm({ title: '', topic: '', dur: '' });
  };

  return (
    <div>
      <div className="db-pill"><BookOpen size={11} />Daily Log</div>
      <h1 className="db-h1">Study Log</h1>
      <p className="db-sub">Track what you're learning every day</p>

      <div className="db-card mt4 mb4">
        <div className="db-sh"><Plus size={14} />Add Entry</div>
        <form onSubmit={add} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <input className="db-inp" placeholder="What did you study today?" value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <input className="db-inp" placeholder="Topic (e.g. DSA)" value={form.topic}
              onChange={e => setForm(f => ({ ...f, topic: e.target.value }))} />
            <input className="db-inp" placeholder="Duration (e.g. 45 min)" value={form.dur}
              onChange={e => setForm(f => ({ ...f, dur: e.target.value }))} />
          </div>
          <button type="submit" className="db-btn btn-red" style={{ alignSelf: 'flex-start' }}>
            <Plus size={14} />Add Log
          </button>
        </form>
      </div>

      <div className="db-card">
        <div className="db-sh"><Clock size={14} />Recent Sessions</div>
        {logs.map(log => (
          <div key={log.id} className="log-item">
            <div className={`log-dot ld-${log.color}`} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="log-title">{log.title}</div>
              <div className="log-meta">{log.topic} · {log.duration} · {log.date}</div>
            </div>
            <button type="button"
              style={{ background: 'transparent', border: 'none', color: 'var(--t4)', cursor: 'pointer', padding: 4, transition: 'color .13s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--red-l)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--t4)'}
              onClick={() => setLogs(ls => ls.filter(l => l.id !== log.id))}>
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        {logs.length === 0 && (
          <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--t3)', fontSize: 13 }}>
            No sessions yet. Add your first one above!
          </div>
        )}
      </div>
    </div>
  );
}

// ─── ACHIEVEMENTS ─────────────────────────────────────
function AchievementsPage({ streak, dayNum }) {
  const data = ACHIEVEMENTS.map(a => ({
    ...a,
    unlocked: a.id === 1 ? dayNum >= 1
      : a.id === 2 ? streak >= 7
      : a.unlocked,
  }));
  const totalPts = data.filter(a => a.unlocked).reduce((s, a) => s + a.pts, 0);
  const unlockedN = data.filter(a => a.unlocked).length;

  return (
    <div>
      <div className="db-pill"><Trophy size={11} />Your Progress</div>
      <h1 className="db-h1">Achievements</h1>
      <p className="db-sub">{unlockedN} of {data.length} unlocked · {totalPts} points</p>

      <div className="db-card db-card-red mt4 mb4">
        <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 46, fontWeight: 700, color: 'var(--red-l)', lineHeight: 1 }}>{totalPts}</div>
            <div style={{ fontSize: 12, color: 'var(--t3)', marginTop: 4 }}>Total Points</div>
          </div>
          <div style={{ flex: 1, minWidth: 180 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>
              {unlockedN} / {data.length} Achievements Unlocked
            </div>
            <div className="db-pb-wrap mb3" style={{ height: 8 }}>
              <div className="db-pb pb-red" style={{ '--pw': `${(unlockedN / data.length) * 100}%` }} />
            </div>
            <div style={{ fontSize: 12, color: 'var(--t3)' }}>{data.length - unlockedN} more to unlock</div>
          </div>
        </div>
      </div>

      <div className="ach-grid">
        {data.map((a, i) => (
          <div key={a.id} className={`ach-card${a.unlocked ? '' : ' locked'}`} style={{ animationDelay: `${i * 0.06}s` }}>
            <div className="ach-ico">{a.emoji}</div>
            <div className="ach-name">{a.name}</div>
            <div className="ach-desc">{a.desc}</div>
            <div className="ach-pts" style={{ color: a.unlocked ? 'var(--red-l)' : 'var(--t3)' }}>
              {a.unlocked ? `✓ ${a.pts} pts` : `🔒 ${a.pts} pts`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SETTINGS ────────────────────────────────────────
function SettingsPage({ userSession, onLogOut }) {
  const [notifs,   setNotifs]   = useState(true);
  const [streakAl, setStreakAl] = useState(true);
  const [gitConn,  setGitConn]  = useState(false);
  const [liConn,   setLiConn]   = useState(false);

  const initials = userSession?.name
    ? userSession.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'SD';

  return (
    <div>
      <div className="db-pill"><Settings size={11} />Account</div>
      <h1 className="db-h1">Settings</h1>
      <p className="db-sub">Manage your account and preferences</p>

      <div className="set-sec mt4">
        <div className="set-title">Profile</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 54, height: 54, borderRadius: 14, background: 'var(--red-glow)', border: '1px solid var(--red-bdr)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: 'var(--red-l)' }}>{initials}</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--t1)' }}>{userSession?.name || 'Student'}</div>
            <div style={{ fontSize: 13, color: 'var(--t3)' }}>{userSession?.email || 'student@email.com'}</div>
          </div>
        </div>
      </div>

      <div className="set-sec">
        <div className="set-title">Integrations</div>
        {[
          { icon: <GithubIcon size={15} />, label: 'GitHub',   sub: gitConn ? 'Connected · @yourusername' : 'Not connected', conn: gitConn, setConn: setGitConn },
          { icon: <LinkedinIcon size={15} />, label: 'LinkedIn', sub: liConn ? 'Connected · Posts synced' : 'Not connected', conn: liConn, setConn: setLiConn  },
        ].map(({ icon, label, sub, conn, setConn }) => (
          <div key={label} className="set-row">
            <div>
              <div className="set-lbl" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>{icon}{label}</div>
              <div className="set-desc" style={{ color: conn ? 'var(--green)' : undefined }}>{sub}</div>
            </div>
            <button type="button" className="db-btn btn-ghost" style={{ padding: '7px 14px', fontSize: 12 }}
              onClick={() => setConn(c => !c)}>
              {conn ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        ))}
      </div>

      <div className="set-sec">
        <div className="set-title">Preferences</div>
        {[
          { lbl: '10 PM Streak Reminder', desc: "Get pinged if you haven't committed today", val: notifs, set: setNotifs },
          { lbl: 'Streak Break Alert',    desc: 'Notify at 11:30 PM if streak is at risk',   val: streakAl, set: setStreakAl },
        ].map(({ lbl, desc, val, set }) => (
          <div key={lbl} className="set-row">
            <div>
              <div className="set-lbl">{lbl}</div>
              <div className="set-desc">{desc}</div>
            </div>
            <button type="button" className={`tog${val ? ' on' : ''}`} onClick={() => set(v => !v)}>
              <div className="tog-k" />
            </button>
          </div>
        ))}
      </div>

      <div className="set-sec" style={{ borderColor: 'var(--red-bdr)' }}>
        <div className="set-title" style={{ color: 'var(--red-l)' }}>Account</div>
        <div className="set-row">
          <div>
            <div className="set-lbl">Sign Out</div>
            <div className="set-desc">You'll need to sign in again to access your dashboard</div>
          </div>
          <button type="button" className="db-btn btn-red" style={{ padding: '7px 14px', fontSize: 12 }} onClick={onLogOut}>
            <LogOut size={14} />Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN EXPORT ─────────────────────────────────────

// ─── CHALLENGE DAY VIEWS & DATE HELPERS ────────────────
const CHALLENGE_START_DATE = "2026-07-28";
const TOTAL_DAYS = 60;
const WEEKDAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

const DEFAULT_CHECKLIST_ITEMS = [
  { key: "assignment", label: "Complete today's assigned challenge" },
  { key: "build", label: "Build and test your project" },
  { key: "github", label: "Push your work to GitHub" },
  { key: "linkedin", label: "Share your progress on LinkedIn" }
];

const CHALLENGE_DATA = {
  1: { title: "Git & GitHub Basics", description: "Initialize a local git repository, create your first repository on GitHub, commit your files, and push to remote. Write a short explanation of git branches." },
  2: { title: "Markdown Documentation", description: "Create a README.md file for your profile or project detailing your coding stack, design inspiration, and daily goals. Add formatting, tables, and images." },
  3: { title: "Responsive Layouts with CSS Flexbox", description: "Create a fully responsive landing page navigation bar and hero section using CSS Flexbox. Test alignment on 390px mobile viewports." },
  4: { title: "CSS Grid Dashboard", description: "Build a classic dashboard card grid layout using CSS Grid. Make sure columns wrap dynamically (e.g. repeat(auto-fit, minmax(280px, 1fr))) without media queries." },
  5: { title: "JavaScript DOM Manipulation", description: "Build a fully working interactive theme toggler or counter that stores state in local storage. Focus on clean event listeners." },
  6: { title: "API Fetch & Data Rendering", description: "Fetch public coder stats or a daily quote from an API (e.g., GitHub API) and display it cleanly on your web app with loading animations." },
  7: { title: "Algorithm: Binary Search implementation", description: "Write a clean binary search algorithm in your preferred language. Test boundaries, negative cases, and empty lists. Create a visualization page." },
  8: { title: "LinkedIn Developer Networking", description: "Write an educational post on LinkedIn sharing your learnings on binary search partition logic. Link to your GitHub code." },
  9: { title: "Memory Storage and Cookies", description: "Explain the differences between Cookies, SessionStorage, and LocalStorage. Write code to sync list data dynamically across tabs." },
  10: { title: "CSS Keyframe Animations", description: "Implement hardware-accelerated CSS animations (transform & opacity) for entry transitions, hover triggers, and active buttons." }
};

function parseDate(value) {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function addDays(date, amount) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + amount);
  return copy;
}

function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getDayFromDate(date) {
  const start = parseDate(CHALLENGE_START_DATE);
  const diff = Math.floor((date - start) / 86400000);
  if (diff < 0) return 1;
  return Math.min(TOTAL_DAYS, diff + 1);
}

function getChallengeMonths() {
  const start = parseDate(CHALLENGE_START_DATE);
  const end = addDays(start, TOTAL_DAYS - 1);
  const months = [];
  let cursor = new Date(start.getFullYear(), start.getMonth(), 1);
  const last = new Date(end.getFullYear(), end.getMonth(), 1);
  while (cursor <= last) {
    months.push({ year: cursor.getFullYear(), month: cursor.getMonth() });
    cursor = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1);
  }
  return months;
}

function getChallengeInfo(dayNumber) {
  return CHALLENGE_DATA[dayNumber] || {
    title: `Day ${dayNumber} Challenge`,
    description: "Read the challenge instructions carefully, build the required project, and submit proof of work when you're done."
  };
}

// ─── CHECKS COMPLETION ACROSS ALL PAGES ───────────────
function isDayCompleted(dayNumber, checklistItemsList) {
  const todayLocal = new Date();
  const currentDay = getDayFromDate(todayLocal);
  if (dayNumber > currentDay) return false;

  // Check checklist completion percentage
  try {
    const raw = localStorage.getItem("abtalks_checklist_day_" + dayNumber);
    if (raw) {
      const state = JSON.parse(raw);
      const items = checklistItemsList || DEFAULT_CHECKLIST_ITEMS;
      const total = items.length;
      const done = items.filter(item => state[item.key]).length;
      if (total > 0 && done === total) return true;
    }
  } catch (e) {}

  // Check proof submission
  try {
    const raw = localStorage.getItem("abtalks_proof_day_" + dayNumber);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.github && parsed.linkedin) return true;
    }
  } catch (e) {}

  return false;
}

function computeStreak(checklistItemsList) {
  const todayLocal = new Date();
  const currentDay = getDayFromDate(todayLocal);
  let count = 0;
  for (let d = currentDay; d >= 1; d--) {
    if (isDayCompleted(d, checklistItemsList)) count++;
    else break;
  }
  return count;
}

function getCompletedDaysCount(checklistItemsList) {
  let count = 0;
  for (let d = 1; d <= TOTAL_DAYS; d++) {
    if (isDayCompleted(d, checklistItemsList)) count++;
  }
  return count;
}

function computeDayCompletionPercent(dayNumber, checklistItemsList) {
  const todayLocal = new Date();
  const currentDay = getDayFromDate(todayLocal);
  if (dayNumber > currentDay) return null;
  try {
    const raw = localStorage.getItem("abtalks_checklist_day_" + dayNumber);
    if (raw) {
      const state = JSON.parse(raw);
      const items = checklistItemsList || DEFAULT_CHECKLIST_ITEMS;
      const total = items.length || 1;
      const done = items.filter(item => state[item.key]).length;
      return Math.round((done / total) * 100);
    }
  } catch (e) {}
  return 0;
}

// ─── CHALLENGE DAY REACT COMPONENT ────────────────────
function ChallengeDay({ userSession, onChallengeUpdate }) {
  const start = parseDate(CHALLENGE_START_DATE);
  const end = addDays(start, TOTAL_DAYS - 1);
  const todayLocal = new Date();
  const currentDay = getDayFromDate(todayLocal);

  const [viewedDay, setViewedDay] = useState(currentDay);
  const [calendarExpanded, setCalendarExpanded] = useState(false);
  const [monthIndex, setMonthIndex] = useState(() => {
    const date = addDays(start, currentDay - 1);
    const months = getChallengeMonths();
    const idx = months.findIndex(m => m.year === date.getFullYear() && m.month === date.getMonth());
    return idx === -1 ? 0 : idx;
  });

  const [dailyProgressShowFuture, setDailyProgressShowFuture] = useState(false);
  const [dayHistoryExpanded, setDayHistoryExpanded] = useState(false);
  const [expandedHistoryDays, setExpandedHistoryDays] = useState(new Set());
  const [proofViewExpanded, setProofViewExpanded] = useState(false);

  // Load checklist items definitions
  const [checklistItems, setChecklistItems] = useState(() => {
    try {
      const raw = localStorage.getItem("abtalks_checklist_items");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length) return parsed;
      }
    } catch (e) {}
    return DEFAULT_CHECKLIST_ITEMS.map(i => ({ ...i }));
  });
  const [isEditingChecklist, setIsEditingChecklist] = useState(false);

  // Active day checklist / proof states
  const [checklistState, setChecklistState] = useState({});
  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [triggerUpdate, setTriggerUpdate] = useState(0);

  // Load values whenever viewedDay changes
  useEffect(() => {
    try {
      const rawCheck = localStorage.getItem("abtalks_checklist_day_" + viewedDay);
      setChecklistState(rawCheck ? JSON.parse(rawCheck) : {});
    } catch (e) {
      setChecklistState({});
    }

    try {
      const rawProof = localStorage.getItem("abtalks_proof_day_" + viewedDay);
      if (rawProof) {
        const parsed = JSON.parse(rawProof);
        setGithubUrl(parsed.github || '');
        setLinkedinUrl(parsed.linkedin || '');
        setSubmittedSuccess(true);
      } else {
        setGithubUrl('');
        setLinkedinUrl('');
        setSubmittedSuccess(false);
      }
    } catch (e) {
      setGithubUrl('');
      setLinkedinUrl('');
      setSubmittedSuccess(false);
    }
  }, [viewedDay, triggerUpdate]);

  // Toggle checklist checkbox
  const toggleChecklistItem = (key) => {
    const nextState = { ...checklistState, [key]: !checklistState[key] };
    setChecklistState(nextState);
    localStorage.setItem("abtalks_checklist_day_" + viewedDay, JSON.stringify(nextState));

    // Update timing log
    let timing = { startedAt: null, completedAt: null };
    try {
      const raw = localStorage.getItem("abtalks_checklist_timing_day_" + viewedDay);
      if (raw) timing = JSON.parse(raw);
    } catch (e) {}

    const now = new Date().toISOString();
    const anyChecked = checklistItems.some(item => nextState[item.key]);
    const allChecked = checklistItems.length > 0 && checklistItems.every(item => nextState[item.key]);

    if (anyChecked && !timing.startedAt) timing.startedAt = now;
    if (!anyChecked) {
      timing.startedAt = null;
      timing.completedAt = null;
    } else if (allChecked && !timing.completedAt) {
      timing.completedAt = now;
    } else if (!allChecked) {
      timing.completedAt = null;
    }
    localStorage.setItem("abtalks_checklist_timing_day_" + viewedDay, JSON.stringify(timing));
    setTriggerUpdate(t => t + 1);
    onChallengeUpdate && onChallengeUpdate();
  };

  // Checklist editing callbacks
  const handleAddChecklistItem = () => {
    const key = "item_" + Date.now() + "_" + Math.random().toString(36).slice(2, 7);
    const updated = [...checklistItems, { key, label: "New task item" }];
    setChecklistItems(updated);
    localStorage.setItem("abtalks_checklist_items", JSON.stringify(updated));
    onChallengeUpdate && onChallengeUpdate();
  };
  const handleDeleteChecklistItem = (key) => {
    const updated = checklistItems.filter(i => i.key !== key);
    setChecklistItems(updated);
    localStorage.setItem("abtalks_checklist_items", JSON.stringify(updated));
    onChallengeUpdate && onChallengeUpdate();
  };
  const handleEditChecklistItem = (key, label) => {
    const updated = checklistItems.map(i => i.key === key ? { ...i, label } : i);
    setChecklistItems(updated);
    localStorage.setItem("abtalks_checklist_items", JSON.stringify(updated));
    onChallengeUpdate && onChallengeUpdate();
  };

  // Proof submit
  const handleProofSubmit = (e) => {
    e.preventDefault();
    if (!githubUrl.trim() || !linkedinUrl.trim()) {
      alert("Please submit both your GitHub and LinkedIn links.");
      return;
    }
    const proof = {
      github: githubUrl.trim(),
      linkedin: linkedinUrl.trim(),
      submittedAt: new Date().toISOString()
    };
    localStorage.setItem("abtalks_proof_day_" + viewedDay, JSON.stringify(proof));
    setSubmittedSuccess(true);
    setTriggerUpdate(t => t + 1);
    onChallengeUpdate && onChallengeUpdate();
  };

  // Calculated overall stats
  const streakCount = computeStreak(checklistItems);
  const completedCount = getCompletedDaysCount(checklistItems);
  const progressPercent = Math.round((completedCount / TOTAL_DAYS) * 100);
  const viewedChallenge = getChallengeInfo(viewedDay);
  const doneChecklistNum = checklistItems.filter(item => checklistState[item.key]).length;

  // Calendar cells builder
  const challengeMonths = getChallengeMonths();
  const currentMonthObj = challengeMonths[monthIndex] || challengeMonths[0];
  const daysInCurrentMonth = daysInMonth(currentMonthObj.year, currentMonthObj.month);
  const startWeekday = new Date(currentMonthObj.year, currentMonthObj.month, 1).getDay();

  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInCurrentMonth; d++) cells.push(new Date(currentMonthObj.year, currentMonthObj.month, d));
  while (cells.length % 7 !== 0) cells.push(null);

  // Time logging helper
  const getDayTimeInfo = (d) => {
    try {
      const raw = localStorage.getItem("abtalks_checklist_timing_day_" + d);
      if (raw) {
        const timing = JSON.parse(raw);
        if (!timing.startedAt) return { label: "Not started", cls: "" };
        const startT = new Date(timing.startedAt);
        if (timing.completedAt) {
          const took = new Date(timing.completedAt) - startT;
          const mins = Math.round(took / 60000);
          return { label: `⏱ ${mins < 1 ? "<1m" : mins + "m"}`, cls: "done" };
        }
        const elapsed = Date.now() - startT;
        const mins = Math.round(elapsed / 60000);
        return { label: `⏱ ${mins < 1 ? "<1m" : mins + "m"} so far`, cls: "progress" };
      }
    } catch (e) {}
    return { label: "Not started", cls: "" };
  };

  const toggleHistoryDay = (d) => {
    const nextSet = new Set(expandedHistoryDays);
    if (nextSet.has(d)) nextSet.delete(d);
    else nextSet.add(d);
    setExpandedHistoryDays(nextSet);
  };

  return (
    <div>
      {/* Top Navigation Row */}
      <div style={{ marginBottom: 20 }}>
        <div className="db-pill"><Target size={11} />Day Challenge View</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div className="day-nav" style={{ margin: 0 }}>
            <button className="day-nav-btn" disabled={viewedDay <= 1} onClick={() => setViewedDay(viewedDay - 1)}>‹</button>
            <button className="ch-badge" style={{ margin: 0 }} onClick={() => setCalendarExpanded(e => !e)}>
              DAY <strong>{viewedDay}</strong> / {TOTAL_DAYS} <span className="db-hint" style={{ fontSize: 9, opacity: 0.7 }}>· toggle calendar</span>
            </button>
            <button className="day-nav-btn" disabled={viewedDay >= currentDay} onClick={() => setViewedDay(viewedDay + 1)}>›</button>
          </div>
          
          <div className="dh-pct full" style={{ fontSize: 11, fontWeight: 700 }}>
            {isDayCompleted(viewedDay, checklistItems) ? "✓ COMPLETED" : viewedDay === currentDay ? "● IN PROGRESS" : "○ INCOMPLETE"}
          </div>
        </div>
      </div>

      {/* Viewing Banner */}
      {viewedDay !== currentDay && (
        <div className="viewing-banner">
          <span>Viewing Day {viewedDay} (Past Day Challenge)</span>
          <button className="viewing-banner-btn" onClick={() => setViewedDay(currentDay)}>Back to Today</button>
        </div>
      )}

      {/* Overall Progress Tracker */}
      <div className="db-card mb4">
        <div className="progress-info" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--t3)', fontWeight: 700, marginBottom: 8 }}>
          <span>CHALLENGE PROGRESS</span>
          <span>{completedCount} / {TOTAL_DAYS} Days Completed</span>
        </div>
        <div className="db-pb-wrap" style={{ height: 8 }}>
          <div className="db-pb pb-red" style={{ '--pw': `${progressPercent}%` }} />
        </div>
      </div>

      {/* Streak Calendar Card (Collapsible) */}
      <div className="db-card mb4">
        <div className="calendar-head">
          <div>
            <div className="calendar-title">Streak Calendar</div>
            <div className="calendar-subtitle">
              {CHALLENGE_START_DATE} → {formatDate(end)} · Day {currentDay} of {TOTAL_DAYS}
            </div>
          </div>
          <div className="calendar-head-right" style={{ display: 'flex', gap: 8 }}>
            <div className="calendar-streak">🔥 {streakCount} DAYS</div>
            <button type="button" className={`calendar-toggle-btn${calendarExpanded ? ' open' : ''}`} onClick={() => setCalendarExpanded(e => !e)}>
              <span>{calendarExpanded ? "Hide" : "Show"} Calendar</span>
              <span className="chev">▾</span>
            </button>
          </div>
        </div>

        {calendarExpanded && (
          <div className="calendar-body">
            <div className="month-nav">
              <button type="button" className="month-nav-btn" disabled={monthIndex === 0} onClick={() => setMonthIndex(m => m - 1)}>‹</button>
              <div className="month-nav-label">
                {new Date(currentMonthObj.year, currentMonthObj.month, 1).toLocaleString("en-US", { month: "long", year: "numeric" })}
              </div>
              <button type="button" className="month-nav-btn" disabled={monthIndex === challengeMonths.length - 1} onClick={() => setMonthIndex(m => m + 1)}>›</button>
            </div>

            <div className="calendar-grid">
              {WEEKDAY_LABELS.map((lbl, idx) => (
                <div key={`${lbl}-${idx}`} className="calendar-weekday">{lbl}</div>
              ))}
              {cells.map((cell, idx) => {
                if (!cell) return <div key={`empty-${idx}`} className="calendar-day empty" />;
                const inRange = cell >= start && cell <= end;
                const dNum = getDayFromDate(cell);
                const isDone = isDayCompleted(dNum, checklistItems);
                
                let classes = "calendar-day";
                if (!inRange) classes += " outside";
                else {
                  if (isDone) classes += " completed";
                  if (dNum === currentDay) classes += " current";
                  if (dNum > currentDay) classes += " future";
                  if (dNum <= currentDay) classes += " editable";
                }

                return (
                  <button key={`cell-${idx}`} type="button" className={classes}
                    disabled={!inRange || dNum > currentDay}
                    onClick={() => setViewedDay(dNum)}>
                    {cell.getDate()}
                  </button>
                );
              })}
            </div>

            <div className="calendar-legend">
              <div className="legend-item"><div className="legend-dot done" /><span>Completed</span></div>
              <div className="legend-item"><div className="legend-dot today" /><span>Today</span></div>
              <div className="legend-item"><div className="legend-dot" /><span>Upcoming</span></div>
            </div>
          </div>
        )}
      </div>

      {/* Stats row */}
      <div className="db-stats" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: 16 }}>
        <div className="db-stat" style={{ padding: '12px 14px' }}>
          <div className="db-stat-val">{viewedDay}</div>
          <div className="db-stat-lbl">Viewing Day</div>
        </div>
        <div className="db-stat" style={{ padding: '12px 14px' }}>
          <div className="db-stat-val">{streakCount}🔥</div>
          <div className="db-stat-lbl">Day Streak</div>
        </div>
        <div className="db-stat" style={{ padding: '12px 14px' }}>
          <div className="db-stat-val">{progressPercent}%</div>
          <div className="db-stat-lbl">Completed</div>
        </div>
      </div>

      {/* Today's task detail description card */}
      <div className="db-card mb4">
        <div className="card-label" style={{ fontSize: 10, letterSpacing: 1.2, color: 'var(--red-l)', marginBottom: 6 }}>// CHALLENGE INSTRUCTIONS</div>
        <h2 className="db-h1" style={{ fontSize: 20, marginBottom: 8 }}>{viewedChallenge.title}</h2>
        <p className="db-sub" style={{ fontSize: 13, color: 'var(--t2)', lineHeight: 1.6 }}>{viewedChallenge.description}</p>
      </div>

      {/* Checklist Card */}
      <div className="db-card mb4">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div>
            <div className="card-label" style={{ fontSize: 10, letterSpacing: 1.2, color: 'var(--red-l)', marginBottom: 4 }}>// WHAT TO BUILD</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--t1)' }}>Requirements Checklist</h3>
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <span className="checklist-progress">{doneChecklistNum} / {checklistItems.length} done</span>
            <button className={`edit-toggle-btn${isEditingChecklist ? ' active' : ''}`} onClick={() => setIsEditingChecklist(!isEditingChecklist)}>
              {isEditingChecklist ? "Done" : "Edit"}
            </button>
          </div>
        </div>

        <div className="requirements" style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
          {checklistItems.map(item => {
            const isChecked = checklistState[item.key] || false;
            return (
              <div key={item.key}>
                {isEditingChecklist ? (
                  <div className="requirement editing" style={{ display: 'flex', gap: 10, padding: 8 }}>
                    <input className="item-edit-input" value={item.label} onChange={(e) => handleEditChecklistItem(item.key, e.target.value)} />
                    <button type="button" className="item-delete-btn" onClick={() => handleDeleteChecklistItem(item.key)}>✕</button>
                  </div>
                ) : (
                  <button type="button" className={`requirement${isChecked ? ' checked' : ''}`} style={{ width: '100%' }} onClick={() => toggleChecklistItem(item.key)}>
                    <div className="check">✓</div>
                    <span className="item-text">{item.label}</span>
                  </button>
                )}
              </div>
            );
          })}

          {isEditingChecklist && (
            <button className="add-item-btn" onClick={handleAddChecklistItem}>+ Add checklist task item</button>
          )}
        </div>
        <div style={{ fontSize: 11, color: 'var(--t3)' }}>
          {isEditingChecklist ? "Rename tasks, remove ones you don't need, or add new ones." : "Mark items done as you build. A day counts toward your streak automatically when all items are checked."}
        </div>
      </div>

      {/* Proof of Work Card */}
      <div className="db-card mb4">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div>
            <div className="card-label" style={{ fontSize: 10, letterSpacing: 1.2, color: 'var(--red-l)', marginBottom: 4 }}>// PROOF OF WORK</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--t1)' }}>Submit Your Proof</h3>
          </div>
          <button className={`calendar-toggle-btn${proofViewExpanded ? ' open' : ''}`} onClick={() => setProofViewExpanded(!proofViewExpanded)}>
            <span>Submitted proof</span>
            <span className="chev">▾</span>
          </button>
        </div>

        <p className="db-sub" style={{ fontSize: 12, color: 'var(--t3)', marginBottom: 14 }}>
          Submit links proving you completed the day's challenge. Both GitHub and LinkedIn proof links are required.
        </p>

        <form onSubmit={handleProofSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="field">
            <label htmlFor="github"><span className="icon">GH</span> GitHub Repository / Commit URL</label>
            <input id="github" type="url" className="db-inp" placeholder="https://github.com/.../commit/..." value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} required />
          </div>

          <div className="field">
            <label htmlFor="linkedin"><span className="icon">in</span> LinkedIn Post URL</label>
            <input id="linkedin" type="url" className="db-inp" placeholder="https://linkedin.com/posts/..." value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} required />
          </div>

          <button type="submit" className="db-btn btn-red" style={{ alignSelf: 'flex-start' }}>
            {submittedSuccess ? "✓ Proof Submitted" : `Submit Day ${viewedDay} Challenge →`}
          </button>
        </form>

        {submittedSuccess && (
          <div className="success">
            <div className="success-title">✓ CHALLENGE WORK RECEIVED</div>
            <div className="success-text">Your proof links have been saved. Your streak is protected.</div>
          </div>
        )}

        {proofViewExpanded && (
          <div className="dh-links" style={{ marginTop: 14, borderTop: '1px solid var(--bdr)', paddingTop: 12 }}>
            <div style={{ fontSize: 11, color: 'var(--t3)', marginBottom: 6 }}>Submitted Links:</div>
            {githubUrl ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="dh-link" style={{ alignSelf: 'flex-start' }}>GitHub Commit Link ↗</a>
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="dh-link" style={{ alignSelf: 'flex-start' }}>LinkedIn Post Link ↗</a>
              </div>
            ) : (
              <div style={{ fontSize: 12, color: 'var(--t4)' }}>No proof submitted for this day yet.</div>
            )}
          </div>
        )}
      </div>

      {/* Daily Progress & Day History Dropdowns */}
      <div className="g2">
        {/* Daily progress bar chart */}
        <div className="daily-progress-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div>
              <div className="calendar-title">Daily Progress</div>
              <div className="daily-progress-subtitle">CHECKLIST COMPLETION OVER TIME</div>
            </div>
            <button className="calendar-toggle-btn" onClick={() => setDailyProgressShowFuture(!dailyProgressShowFuture)}>
              <span>{dailyProgressShowFuture ? "Hide" : "Show"} upcoming</span>
            </button>
          </div>

          <div className="daily-progress-chart">
            {Array.from({ length: 14 }).map((_, idx) => {
              const dNum = currentDay - 10 + idx;
              if (dNum < 1 || (!dailyProgressShowFuture && dNum > currentDay)) return null;
              
              const isFuture = dNum > currentDay;
              const pct = isFuture ? null : computeDayCompletionPercent(dNum, checklistItems);

              return (
                <div key={idx} className={`dp-col${dNum === currentDay ? ' dp-today' : ''}${isFuture ? ' dp-future' : pct === 0 ? ' dp-empty' : ''}`}
                  onClick={() => !isFuture && setViewedDay(dNum)}>
                  <div className="dp-bar-track">
                    {!isFuture && (
                      <div className="dp-bar" style={{ height: `${pct || 2}%` }} />
                    )}
                  </div>
                  <div className="dp-label">{dNum}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Day-by-Day history log */}
        <div className="daily-progress-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="calendar-title">Day-by-Day History</div>
              <div className="daily-progress-subtitle">COMPLETED REQUIREMENTS & LINKS</div>
            </div>
            <button className="calendar-toggle-btn" onClick={() => setDayHistoryExpanded(!dayHistoryExpanded)}>
              <span>{dayHistoryExpanded ? "Hide" : "Show"} history</span>
              <span className="chev">▾</span>
            </button>
          </div>

          {dayHistoryExpanded && (
            <div className="day-history-list">
              {Array.from({ length: currentDay }).map((_, idx) => {
                const d = currentDay - idx;
                const isExpanded = expandedHistoryDays.has(d);
                const pct = computeDayCompletionPercent(d, checklistItems);
                const proof = localStorage.getItem("abtalks_proof_day_" + d) ? JSON.parse(localStorage.getItem("abtalks_proof_day_" + d)) : null;
                const timeInfo = getDayTimeInfo(d);
                const dateForDay = addDays(start, d - 1);

                return (
                  <div key={d} className={`dh-row${isExpanded ? ' expanded' : ''}`}>
                    <button type="button" className="dh-row-header" onClick={() => toggleHistoryDay(d)}>
                      <div className="dh-row-left">
                        <span className="dh-day">Day {d}</span>
                        <span className="dh-date">{dateForDay.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                        <span className={`dh-time ${timeInfo.cls}`}>{timeInfo.label}</span>
                      </div>
                      <div className="dh-row-right">
                        <span className={`dh-pct ${pct >= 100 ? 'full' : pct > 0 ? 'partial' : 'none'}`}>{pct}%</span>
                        <span className="dh-chev">▾</span>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="dh-details">
                        <div className="dh-items">
                          {checklistItems.map(item => {
                            const dayCheckState = localStorage.getItem("abtalks_checklist_day_" + d) ? JSON.parse(localStorage.getItem("abtalks_checklist_day_" + d)) : {};
                            const isChecked = dayCheckState[item.key] || false;
                            return (
                              <span key={item.key} className={`dh-item${isChecked ? ' done' : ''}`}>
                                {isChecked ? "✓ " : ""}{item.label}
                              </span>
                            );
                          })}
                        </div>
                        
                        {proof && (
                          <div className="dh-links">
                            {proof.github && <a href={proof.github} target="_blank" rel="noopener noreferrer" className="dh-link">GitHub Commit ↗</a>}
                            {proof.linkedin && <a href={proof.linkedin} target="_blank" rel="noopener noreferrer" className="dh-link">LinkedIn Post ↗</a>}
                          </div>
                        )}

                        <button className="db-btn btn-ghost" style={{ padding: '4px 10px', fontSize: 11, marginTop: 8 }} onClick={() => setViewedDay(d)}>
                          Open Day {d}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Coming up next card at the bottom */}
      <div className="next-day mt4" style={{ cursor: viewedDay < TOTAL_DAYS ? 'pointer' : 'default' }}>
        <div className="next-day-row">
          <div>
            <div className="next-label">COMING UP NEXT</div>
            <div className="next-title">
              {viewedDay < TOTAL_DAYS ? getChallengeInfo(viewedDay + 1).title : "Challenge Day 60 reached!"}
            </div>
          </div>
          <button className="next-arrow" onClick={() => viewedDay < TOTAL_DAYS && setViewedDay(viewedDay + 1)}>
            →
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard({ userSession, onLogOut, theme, onToggleTheme }) {
  const [page,      setPage]      = useState('home');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen,setMobileOpen]= useState(false);
  const [tasks,     setTasks]     = useState(INIT_TASKS);
  const [logs,      setLogs]      = useState(INIT_LOGS);
  const [challengeTrigger, setChallengeTrigger] = useState(0);

  // Dynamic calculated student data to keep tabs synchronized
  const todayLocal = new Date();
  const currentDay = getDayFromDate(todayLocal);

  // Load checklist definitions
  const [checklistItemsDef] = useState(() => {
    try {
      const raw = localStorage.getItem("abtalks_checklist_items");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length) return parsed;
      }
    } catch(e){}
    return DEFAULT_CHECKLIST_ITEMS.map(i => ({ ...i }));
  });

  const streak       = computeStreak(checklistItemsDef);
  const bestStreak   = 12;
  const dayNum       = currentDay;
  const totalDays    = 60;
  
  // Rank calculations
  const rank         = 48;
  const totalStudents= 312;

  const initials = userSession?.name
    ? userSession.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'SD';

  const navigate = id => { setPage(id); setMobileOpen(false); };


  // Build nav buttons wired to navigate
  const wiredNav = NAV.map(item => ({
    ...item,
    // onClick handled in Sidebar via onNavigate prop below
  }));

  return (
    <div className="db">
      {/* Sidebar with proper nav wiring */}
      <SidebarWired
        page={page}
        onNavigate={navigate}
        streak={streak}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        onLogOut={onLogOut}
        userSession={userSession}
      />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden', background: 'var(--bg)' }}>
        {/* Mobile topbar */}
        <div className="db-tb">
          <button type="button" className="db-tb-btn" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu size={19} />
          </button>
          <div className="db-tb-brand"><em>#</em>ABtalks</div>
          <div className="db-tb-av">{initials}</div>
        </div>

        {/* Page content */}
        <div className="db-ct">
          {page === 'home' && (
            <HomeDashboard
              streak={streak} bestStreak={bestStreak}
              dayNum={dayNum} totalDays={totalDays}
              rank={rank} totalStudents={totalStudents}
              tasks={tasks} setTasks={setTasks}
              onNavigate={navigate}
              userSession={userSession}
              onChallengeUpdate={() => setChallengeTrigger(t => t + 1)}
            />
          )}
          {page === 'challenge' && (
            <ChallengeDay 
              userSession={userSession} 
              onChallengeUpdate={() => setChallengeTrigger(t => t + 1)} 
            />
          )}
          {page === 'today'    && <TodayTask tasks={tasks} setTasks={setTasks} />}
          {page === 'pomo'     && <Pomodoro />}
          {page === 'games'    && <Games />}
          {page === 'study'    && <StudyLog logs={logs} setLogs={setLogs} />}
          {page === 'ach'      && <AchievementsPage streak={streak} dayNum={dayNum} />}
          {page === 'settings' && <SettingsPage userSession={userSession} onLogOut={onLogOut} />}
        </div>
      </main>
    </div>
  );
}

// ─── SIDEBAR (properly wired) ─────────────────────────
function SidebarWired({ page, onNavigate, streak, collapsed, setCollapsed, mobileOpen, setMobileOpen, onLogOut, userSession }) {
  const initials = userSession?.name
    ? userSession.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'SD';

  const inner = (
    <aside className={`db-sb${collapsed ? ' db-cx' : ''}`}>
      <div className="db-sb-logo">
        <div className="db-logo-mark">#</div>
        <div className="db-logo-text">
          <div className="db-brand-name"><em>#</em>ABtalks</div>
          <div className="db-brand-sub">60-Day Challenge</div>
        </div>
      </div>

      {userSession && (
        <div className="db-sb-user">
          <div className="db-sb-u-av">{initials}</div>
          <div style={{ overflow: 'hidden' }}>
            <div className="db-sb-u-name">{userSession.name}</div>
            <div className="db-sb-u-day">Day 7 of 60</div>
          </div>
        </div>
      )}

      <nav className="db-nav">
        {NAV.map(({ id, label, icon: Icon }) => (
          <button key={id} type="button"
            className={`db-nb${page === id ? ' db-on' : ''}`}
            title={collapsed ? label : undefined}
            onClick={() => onNavigate(id)}>
            <span className="db-ni"><Icon size={17} /></span>
            <span className="db-nl">{label}</span>
          </button>
        ))}
      </nav>

      <div className="db-sb-streak" title={collapsed ? `${streak} day streak` : undefined}>
        <span className="db-sf">🔥</span>
        <div className="db-si">
          <div className="db-sv">{streak} day streak</div>
          <div className="db-ss">Don't break the chain!</div>
        </div>
      </div>

      <div className="db-sb-footer">
        <button type="button" className={`db-nb${page === 'settings' ? ' db-on' : ''}`}
          title={collapsed ? 'Settings' : undefined}
          onClick={() => onNavigate('settings')}>
          <span className="db-ni"><Settings size={16} /></span>
          <span className="db-nl">Settings</span>
        </button>
        <button type="button" className="db-nb" onClick={onLogOut}
          title={collapsed ? 'Log out' : undefined}>
          <span className="db-ni"><LogOut size={16} /></span>
          <span className="db-nl">Log out</span>
        </button>
        <button type="button" className="db-cx-btn" onClick={() => setCollapsed(c => !c)}>
          {collapsed
            ? <ChevronsRight size={15} />
            : <><ChevronsLeft size={15} /><span>Collapse</span></>}
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {inner}
      <div className={`db-ov${mobileOpen ? ' db-visible' : ''}`}>
        <button type="button" className="db-ov-bg" onClick={() => setMobileOpen(false)} aria-label="Close" />
        {mobileOpen && <div role="dialog" aria-modal="true">{inner}</div>}
      </div>
    </>
  );
}
