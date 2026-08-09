import React, { useState, useEffect, useRef } from 'react';
import './DashboardPage.css';
import {
  LayoutDashboard, Flame, Target, BookOpen, Gamepad2,
  Timer as TimerIcon, Trophy, Settings, LogOut, Menu,
  ChevronsLeft, ChevronsRight, CheckCircle2, Circle,
  Play, Pause, RotateCcw, Coffee, Zap, TrendingUp,
  ArrowRight, Plus, Trash2, Clock, Activity, RefreshCw,
  CalendarCheck, Star, Award,
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
  { id: 'home',  label: 'Dashboard',    icon: LayoutDashboard },
  { id: 'today', label: "Today's Task", icon: Target },
  { id: 'pomo',  label: 'Pomodoro',     icon: TimerIcon },
  { id: 'games', label: 'Mind Games',   icon: Gamepad2 },
  { id: 'study', label: 'Study Log',    icon: BookOpen },
  { id: 'ach',   label: 'Achievements', icon: Trophy },
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
function HomeDashboard({ streak, bestStreak, dayNum, totalDays, rank, totalStudents, tasks, setTasks, onNavigate, userSession }) {
  const pct = Math.round((dayNum / totalDays) * 100);
  const std = standingInfo(rank, totalStudents);
  const doneTasks = tasks.filter(t => t.done).length;
  const earnedPts = tasks.filter(t => t.done).reduce((s, t) => s + t.pts, 0);
  const firstName = userSession?.name?.split(' ')[0] || 'Coder';

  return (
    <div>
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
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 52, fontWeight: 700, color: 'var(--t1)', lineHeight: 1 }}>{pct}</span>
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
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 40, fontWeight: 700, color: 'var(--cyan)', lineHeight: 1 }}>#{rank}</div>
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
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: 'var(--t1)' }}>{val}</div>
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
          <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 24, fontWeight: 700, color: pct === 100 ? 'var(--green)' : 'var(--red-l)' }}>{pct}%</span>
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
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700, color: 'var(--t1)', marginBottom: 4 }}>All tasks done!</div>
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

function Games() {
  const [activeTab, setActiveTab] = useState('memory');

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
          { id: 'quiz',   label: 'JS Scope Quiz' }
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
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 700, color: 'var(--t1)' }}>{cards.filter(c => c.matched).length / 2}</div>
              <div style={{ fontSize: 11, color: 'var(--t3)' }}>Pairs Found</div>
            </div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 700, color: 'var(--t1)' }}>{moves}</div>
              <div style={{ fontSize: 11, color: 'var(--t3)' }}>Moves</div>
            </div>
            <button type="button" className="db-btn btn-ghost" style={{ padding: '6px 12px', fontSize: 12 }} onClick={restartMemory}>
              <RefreshCw size={13} />Reset
            </button>
          </div>

          {won ? (
            <div style={{ textAlign: 'center', padding: '28px 0' }}>
              <div style={{ fontSize: 50 }}>🎉</div>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: 'var(--t1)', margin: '12px 0 6px' }}>You won!</div>
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
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700, color: 'var(--red-l)' }}>[{low} - {high}]</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: 'var(--t3)' }}>Optimal Next Guess</div>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700, color: 'var(--cyan)' }}>{Math.floor((low + high) / 2)}</div>
            </div>
            <button type="button" className="db-btn btn-ghost" style={{ padding: '6px 12px', fontSize: 12 }} onClick={restartBinary}>
              <RefreshCw size={13} />Reset
            </button>
          </div>

          {wonSearch ? (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div style={{ fontSize: 44 }}>🏆</div>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700, color: 'var(--t1)', margin: '8px 0' }}>Correct! Secret number was {targetNum}</div>
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
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700, color: 'var(--t1)', margin: '8px 0' }}>Perfect Match!</div>
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
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700, color: 'var(--t1)', margin: '8px 0' }}>Quiz Complete!</div>
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
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 46, fontWeight: 700, color: 'var(--red-l)', lineHeight: 1 }}>{totalPts}</div>
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
          <div style={{ width: 54, height: 54, borderRadius: 14, background: 'var(--red-glow)', border: '1px solid var(--red-bdr)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 20, color: 'var(--red-l)' }}>{initials}</div>
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
export default function Dashboard({ userSession, onLogOut, theme, onToggleTheme }) {
  const [page,      setPage]      = useState('home');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen,setMobileOpen]= useState(false);
  const [tasks,     setTasks]     = useState(INIT_TASKS);
  const [logs,      setLogs]      = useState(INIT_LOGS);

  // Demo student data
  const streak       = 7;
  const bestStreak   = 12;
  const dayNum       = 7;
  const totalDays    = 60;
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
