import React, { useState, useEffect, useRef } from "react";

const RED   = '#D6182B'; // unified with --developing across the academy
const GOLD  = '#A83A0A'; // unified with --gold across the academy
const GREEN = '#16a34a'; // kept distinct: functional "active/on" status indicator only
const AMBER = '#A83A0A'; // unified with --gold across the academy

const CAT_COLORS = {
  Academics: '#2563eb', Training: RED, Fitness: '#f97316',
  Mindset: '#7c3aed', Faith: GOLD, Responsibilities: GREEN,
};

const USERS = [
  { id: 'marcus', name: 'Marcus', role: 'athlete', sport: 'Basketball', age: 16, emoji: '🏀', points: 2450, streak: 7, pin: '1234' },
  { id: 'jordan', name: 'Jordan', role: 'athlete', sport: 'Football',   age: 15, emoji: '🏈', points: 1870, streak: 3, pin: '5678' },
  { id: 'zion',   name: 'Zion',   role: 'athlete', sport: 'Track & Field', age: 14, emoji: '⚡', points: 3100, streak: 12, pin: '9012' },
  { id: 'parent', name: 'Parent', role: 'parent', sport: null,       emoji: '👨🏾‍💼', points: 0, streak: 0, pin: '0000' },
];

const DEVOS = [
  { ref: 'Philippians 4:13', verse: 'I can do all things through Christ who strengthens me.', msg: "Today isn't about feelings—it's about commitment. Your strength is bigger than you.", action: 'Complete your first task within 10 minutes of clocking in. No hesitation.' },
  { ref: 'Colossians 3:23',  verse: 'Whatever you do, work at it with all your heart, as working for the Lord.', msg: 'Half effort shows in results. School, sport, responsibilities—the standard is all your heart, every time.', action: 'Rate your effort honestly at the end of every task today.' },
  { ref: '2 Timothy 1:7',    verse: 'God has not given us a spirit of fear, but of power, love, and self-discipline.', msg: 'Self-discipline is a gift. It separates good from great. Use it today.', action: 'Do your morning routine for the first 30 minutes without your phone.' },
  { ref: 'James 1:2-3',      verse: 'Consider it pure joy when you face trials, for the testing of your faith produces perseverance.', msg: "Hard days are training days. When things are difficult, that's when you're being built.", action: 'Tackle your hardest task first today.' },
  { ref: 'Proverbs 27:17',   verse: 'As iron sharpens iron, so one person sharpens another.', msg: "Elite athletes don't get better alone. Your teammates and your family are watching.", action: 'Give 100% in your first training session today.' },
  { ref: 'Jeremiah 29:11',   verse: "For I know the plans I have for you—plans to prosper you, not to harm you.", msg: 'Your daily work is building toward a future already designed for greatness. Don\'t waste today.', action: 'Review your top goal and do ONE thing that moves you closer to it.' },
  { ref: 'Romans 8:28',      verse: 'In all things God works for the good of those who love him.', msg: 'Setbacks have purpose. A missed shot, a bad grade, a tough practice—it\'s all building something.', action: "Write one thing you're grateful for before starting your mission board." },
];

const DEFAULT_TASKS = [
  { id: 1, title: 'Complete Algebra — Chapter 5', cat: 'Academics',       priority: 'high',   time: '9:00 AM',  done: false, pts: 50 },
  { id: 2, title: '30 min ball handling drills',  cat: 'Training',        priority: 'high',   time: '3:00 PM',  done: false, pts: 75 },
  { id: 3, title: '15 min strength training',     cat: 'Fitness',         priority: 'high',   time: '4:00 PM',  done: false, pts: 60 },
  { id: 4, title: 'Read 20 pages',                cat: 'Mindset',         priority: 'medium', time: '7:00 PM',  done: false, pts: 30 },
  { id: 5, title: 'Evening prayer & reflection',  cat: 'Faith',           priority: 'medium', time: '9:00 PM',  done: false, pts: 25 },
  { id: 6, title: 'Clean room & do laundry',      cat: 'Responsibilities',priority: 'low',    time: '6:00 PM',  done: false, pts: 40 },
];

const DEFAULT_GOALS = [
  { id: 1, title: 'Make Varsity Team',    cat: 'Athletic',  deadline: '2025-09-01', progress: 65 },
  { id: 2, title: 'Raise GPA to 3.5',    cat: 'Academic',  deadline: '2025-06-15', progress: 40 },
  { id: 3, title: 'Bench Press 185 lbs', cat: 'Fitness',   deadline: '2025-07-01', progress: 75 },
  { id: 4, title: 'Read 12 Books',        cat: 'Personal',  deadline: '2025-12-31', progress: 25 },
];

const TRAINING_PLANS = {
  Basketball: [
    { type: 'Skill',        drills: ['Cone dribbling series (5 min)', 'Crossover & between-the-legs', 'Shooting off the catch — 50 reps', 'Pull-up jumper from elbow', 'Floater in traffic'], duration: '45 min' },
    { type: 'Strength',     drills: ['Squats 3×8', 'Vertical jumps 3×10', 'Single-leg RDL 3×8', 'Hip flexor stretch (2 min)', 'Core circuit (plank 3×45s)'], duration: '30 min' },
    { type: 'Conditioning', drills: ['Suicide runs ×4', '17s drill (2 sets)', 'Wall sits 3×45s', 'Box-to-box sprint ×6'], duration: '20 min' },
  ],
  Football: [
    { type: 'Skill',        drills: ['Route running — out routes', 'Footwork ladder (3 patterns)', 'Ball security drill (2 min)', 'Film study — 1 play breakdown', 'Release moves vs press'], duration: '45 min' },
    { type: 'Strength',     drills: ['Bench 3×5', 'Power cleans 3×5', 'Hip thrusts 3×10', 'RDL 3×8', 'Band resistance sprints'], duration: '40 min' },
    { type: 'Conditioning', drills: ['40-yard dash ×6', 'Pro agility ×5', '3-cone drill ×5', 'Hill sprint ×4'], duration: '25 min' },
  ],
  'Track & Field': [
    { type: 'Skill',        drills: ['Start block mechanics', 'Arm drive drill (20m)', 'Stride frequency work', 'High knee drill ×3', 'A/B skip series'], duration: '30 min' },
    { type: 'Strength',     drills: ['Front squats 4×6', 'Single-leg RDL 3×8', 'Box jumps 3×8', 'Calf raises 3×20', 'Hamstring curls 3×10'], duration: '35 min' },
    { type: 'Conditioning', drills: ['8×200m intervals', '4×400m tempo run', 'Easy 2-mile cooldown', 'Static stretch (10 min)'], duration: '55 min' },
  ],
  Soccer: [
    { type: 'Skill',        drills: ['Cone dribbling ×3 patterns', '1v1 defending work (10 min)', 'First-touch control drill', 'Crossing & finishing (20 reps)', 'Set pieces review'], duration: '45 min' },
    { type: 'Strength',     drills: ['Squats 3×10', 'Lateral lunges 3×8', 'Single-leg balance 3×30s', 'Core rotation 3×12', 'Hip flexor activation'], duration: '30 min' },
    { type: 'Conditioning', drills: ['5v5 small-sided game (10 min)', 'Interval sprints ×8', '3×300m run', 'Agility ladder 5 patterns'], duration: '30 min' },
  ],
};

const FILM_Qs = ['What did you notice first?', 'What was the right decision in that moment?', 'What would YOU do differently?', 'What does this clip teach you about your game?'];

const DEFAULT_FILMS = [
  { id: 1, title:'Elite Ball Handling — Curry Breakdown', url:'https://www.youtube.com/embed/HdRSPeL0wfQ', topic:'Skill Development' },
  { id: 2, title:'Mental Toughness — Mamba Mentality',   url:'https://www.youtube.com/embed/VwtCuDCVmEY', topic:'Mindset' },
  { id: 3, title:'Film Study: Reading the Defense',       url:'https://www.youtube.com/embed/dQw4w9WgXcQ', topic:'Film Study' },
];

const SPORTS = ['Basketball','Football','Track & Field','Soccer','Baseball','Volleyball','Wrestling','Swimming','Tennis','Cross Country'];
const EMOJIS = ['🏀','🏈','⚡','⚽','🎾','🏊','🤼','⚾','🏐','🎽','🔥','💪','🦁','🦅','🐆','⭐','🥇'];
const DEFAULT_CONFIG = { familyName: 'My Family', rewardPer: 5, adhdMode: true, allowYouTube: true, allowUpload: true };

import { Bar as BarBase, Card, Chip, Btn as BtnBase, Input, Select, Label, SectionTitle } from "../ui/primitives";

function Bar(props) { return <BarBase color={RED} {...props} />; }
function Btn(props) { return <BtnBase color={RED} {...props} />; }


/* ── STORAGE HOOK ─────────────────────────────────────────── */
function useLS(key, def) {
  // NOTE: localStorage is not available inside Claude artifacts, so this now behaves
  // as plain in-memory state (same signature, resets on reload). Real persistence for
  // this module still needs to be wired to window.storage, same pattern already used
  // in the Personal Development module.
  const [v, setV] = useState(def);
  return [v, setV];
}

/* ── SHARED UI ────────────────────────────────────────────── */
function FontLoader() {
  // Font unified with the rest of the academy: Verdana, no external font load needed.
  return (
    <style>{`
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
      @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: .4; } }
      @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
      .ll-fadein { animation: fadeIn 0.35s ease both; }
      .sidebar { display: block; } @media(max-width:768px){ .sidebar { display:none!important; } }
      .bottomnav { display:none; } @media(max-width:768px){ .bottomnav { display:flex!important; } }
      textarea, input, select { outline: none; }
      button { outline: none; }
    `}</style>
  );
}


/* ── LOGIN PAGE ───────────────────────────────────────────── */
function LoginPage({ S, onLogin, theme, setTheme, athletes, onBack }) {
  const [sel, setSel] = useState(null);
  const [pin, setPin] = useState('');
  const [err, setErr] = useState('');
  const roster = athletes && athletes.length > 0 ? athletes : USERS;

  const tap = (d) => {
    if (!sel) return;
    if (d === '⌫') { setPin(p => p.slice(0, -1)); setErr(''); return; }
    const np = pin + d;
    setPin(np);
    if (np.length === 4) {
      if (np === sel.pin) { onLogin(sel); }
      else { setErr('Wrong PIN — try again'); setPin(''); }
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: S.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "Verdana, Geneva, sans-serif", color: S.text, padding: 24, position: 'relative' }}>
      <FontLoader />
      <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
        style={{ position: 'absolute', top: 20, right: 20, background: 'transparent', border: `1px solid ${S.border}`, color: S.text, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13 }}>
        {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
      </button>
      {onBack && (
        <button onClick={onBack}
          style={{ position: 'absolute', top: 20, left: 20, background: 'transparent', border: `1px solid ${S.border}`, color: S.text, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13 }}>
          ← All subjects
        </button>
      )}

      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{ fontFamily: "Verdana, Geneva, sans-serif", fontSize: 58, color: RED, letterSpacing: 5, lineHeight: 1 }}>LEGACY LAB</div>
        <div style={{ color: GOLD, fontSize: 13, letterSpacing: 5, marginTop: 6, fontWeight: 600 }}>PERFORMANCE COMMAND CENTER</div>

      </div>

      {!sel ? (
        <>
          <div style={{ fontSize: 14, color: S.sub, marginBottom: 20, letterSpacing: 2 }}>WHO'S LOGGING IN?</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, width: '100%', maxWidth: 420 }}>
            {roster.map(u => (
              <button key={u.id} onClick={() => { setSel(u); setPin(''); setErr(''); }}
                style={{ background: S.card, border: `2px solid ${S.border}`, borderRadius: 16, padding: '22px 14px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s', color: S.text, fontFamily: 'inherit' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = RED}
                onMouseLeave={e => e.currentTarget.style.borderColor = S.border}>
                <div style={{ fontSize: 44, marginBottom: 8 }}>{u.emoji}</div>
                <div style={{ fontWeight: 700, fontSize: 17, letterSpacing: 1 }}>{u.name}</div>
                <div style={{ color: S.sub, fontSize: 12, marginTop: 4 }}>{u.sport || (u.role === 'parent' ? 'Parent Account' : 'Athlete')}</div>
                {u.role !== 'parent' && <div style={{ color: GOLD, fontSize: 12, marginTop: 4 }}>{u.streak||0}🔥 streak</div>}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div style={{ textAlign: 'center', width: '100%', maxWidth: 300 }}>
          <div style={{ fontSize: 52, marginBottom: 6 }}>{sel.emoji}</div>
          <div style={{ fontFamily: "Verdana, Geneva, sans-serif", fontSize: 30, letterSpacing: 2, marginBottom: 4 }}>{sel.name}</div>
          <div style={{ color: S.sub, fontSize: 14, marginBottom: 28 }}>Enter your 4-digit PIN</div>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginBottom: 28 }}>
            {[0,1,2,3].map(i => (
              <div key={i} style={{ width: 18, height: 18, borderRadius: '50%', background: i < pin.length ? RED : S.border, transition: 'background 0.2s' }} />
            ))}
          </div>
          {err && <div style={{ color: RED, fontSize: 13, marginBottom: 14, fontWeight: 600 }}>{err}</div>}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {['1','2','3','4','5','6','7','8','9','','0','⌫'].map((d, i) => (
              <button key={i} onClick={() => d && tap(d)}
                style={{ background: d ? S.card : 'transparent', border: d ? `1px solid ${S.border}` : 'none', borderRadius: 12, padding: '18px 0', fontSize: d === '⌫' ? 20 : 24, fontWeight: 700, cursor: d ? 'pointer' : 'default', color: S.text, fontFamily: 'inherit', transition: 'all 0.15s' }}
                onMouseEnter={e => { if(d) { e.currentTarget.style.background = RED; e.currentTarget.style.color = '#fff'; }}}
                onMouseLeave={e => { if(d) { e.currentTarget.style.background = S.card; e.currentTarget.style.color = S.text; }}}>
                {d}
              </button>
            ))}
          </div>
          <button onClick={() => { setSel(null); setPin(''); setErr(''); }}
            style={{ marginTop: 20, background: 'transparent', border: 'none', color: S.sub, cursor: 'pointer', fontSize: 14, fontFamily: 'inherit' }}>
            ← Back
          </button>
        </div>
      )}
      <div style={{ position: 'absolute', bottom: 16, color: S.muted, fontSize: 11, letterSpacing: 1, textAlign: 'center' }}>
        LEGACY LAB · {roster.length} account{roster.length !== 1 ? 's' : ''} configured
      </div>
    </div>
  );
}

/* ── TOP BAR ──────────────────────────────────────────────── */
function TopBar({ S, user, page, setPage, theme, setTheme, clockedIn, pct, onLogout, onBack }) {
  return (
    <div style={{ background: S.topbar, borderBottom: `1px solid ${S.border}`, height: 58, display: 'flex', alignItems: 'center', padding: '0 20px', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 200, backdropFilter: 'blur(8px)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div onClick={() => setPage('dashboard')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 8, height: 32, background: RED, borderRadius: 2 }} />
          <span style={{ fontFamily: "Verdana, Geneva, sans-serif", fontSize: 22, color: RED, letterSpacing: 3 }}>LEGACY LAB</span>
        </div>
        {onBack && (
          <button onClick={onBack} style={{ background: 'transparent', border: `1px solid ${S.border}`, borderRadius: 8, padding: '5px 10px', cursor: 'pointer', color: S.sub, fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>
            ← ALL SUBJECTS
          </button>
        )}
        {clockedIn && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', animation: 'pulse 2s infinite' }} />
            <span style={{ color: '#22c55e', fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>ACTIVE</span>
          </div>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        {user && <div style={{ textAlign: 'right', display: 'none' }} className="topbar-info">
          <div style={{ fontSize: 13, fontWeight: 700 }}>{user.name}</div>
          <div style={{ fontSize: 11, color: GOLD }}>{pct}% today</div>
        </div>}
        {user && <div style={{ fontSize: 26 }}>{user.emoji}</div>}
        <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
          style={{ background: S.card2, border: `1px solid ${S.border}`, borderRadius: 8, padding: '5px 10px', cursor: 'pointer', color: S.text, fontSize: 14 }}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <button onClick={onLogout}
          style={{ background: 'transparent', border: `1px solid ${S.border}`, borderRadius: 8, padding: '5px 12px', cursor: 'pointer', color: S.sub, fontSize: 12, fontFamily: "Verdana, Geneva, sans-serif", fontWeight: 700, letterSpacing: 1 }}>
          EXIT
        </button>
      </div>
    </div>
  );
}

/* ── SIDEBAR ──────────────────────────────────────────────── */
function Sidebar({ S, page, setPage, user }) {
  const links = user?.role === 'parent'
    ? [{ id:'parent',icon:'🎯',l:'Command'},{id:'family',icon:'📺',l:'Family Screen'},{id:'report',icon:'📊',l:'Reports'},{id:'journal',icon:'📓',l:'Journal'},{id:'setup',icon:'⚙️',l:'Setup'}]
    : [{id:'dashboard',icon:'⚡',l:"Now"},{id:'mission',icon:'①',l:'Today\'s Flow'},{id:'training',icon:'🏋🏾',l:'Training'},{id:'goals',icon:'🎯',l:'Goals'},{id:'coach',icon:'🧠',l:'AI Coach'},{id:'film',icon:'🎥',l:'Film Hub'},{id:'journal',icon:'📓',l:'Journal'},{id:'report',icon:'📊',l:'Report Card'},{id:'family',icon:'📺',l:'Family Screen'},{id:'setup',icon:'⚙️',l:'Setup'}];

  return (
    <div className="sidebar" style={{ width: 210, background: S.sidebar, borderRight: `1px solid ${S.border}`, padding: '12px 0', flexShrink: 0 }}>
      {links.map(lk => (
        <button key={lk.id} onClick={() => setPage(lk.id)}
          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 11, padding: '11px 18px', background: page === lk.id ? RED+'1a' : 'transparent', borderLeft: page === lk.id ? `1.5px solid ${RED}` : '1.5px solid transparent', border: 'none', borderRight: 'none', borderTop: 'none', borderBottom: 'none', cursor: 'pointer', color: page === lk.id ? RED : S.sub, fontFamily: "Verdana, Geneva, sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 1, textAlign: 'left', transition: 'all 0.15s' }}>
          <span style={{ fontSize: 17 }}>{lk.icon}</span>{lk.l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

/* ── BOTTOM NAV ───────────────────────────────────────────── */
function BottomNav({ S, page, setPage, user }) {
  const links = user?.role === 'parent'
    ? [{id:'parent',icon:'🎯'},{id:'family',icon:'📺'},{id:'report',icon:'📊'},{id:'journal',icon:'📓'},{id:'setup',icon:'⚙️'}]
    : [{id:'dashboard',icon:'⚡'},{id:'mission',icon:'①'},{id:'training',icon:'🏋🏾'},{id:'coach',icon:'🧠'},{id:'journal',icon:'📓'}];

  return (
    <div className="bottomnav" style={{ position:'fixed', bottom:0, left:0, right:0, background: S.topbar, borderTop:`1px solid ${S.border}`, zIndex:200, paddingBottom: 'env(safe-area-inset-bottom)' }}>
      {links.map(lk => (
        <button key={lk.id} onClick={() => setPage(lk.id)}
          style={{ flex:1, background:'transparent', border:'none', cursor:'pointer', padding:'10px 0', fontSize:22, opacity: page===lk.id ? 1 : 0.35, transition:'opacity 0.15s' }}>
          {lk.icon}
        </button>
      ))}
    </div>
  );
}

/* ── CLOCK IN/OUT PAGE ────────────────────────────────────── */
function ClockInPage({ S, user, clockedIn, onClockIn, onClockOut, focus, setFocus, pct, reflections }) {
  const [showOut, setShowOut] = useState(false);
  const [ref, setRef] = useState({ good: '', short: '', tomorrow: '' });

  if (!clockedIn) return (
    <div style={{ maxWidth: 520, margin: '0 auto' }}>
      <SectionTitle>START YOUR DAY</SectionTitle>
      <div style={{ color: S.sub, fontSize: 15, marginBottom: 32 }}>Clock in to activate your mission board</div>
      <Card S={S} style={{ marginBottom: 20 }}>
        <Label S={S}>What's your focus today?</Label>
        <textarea value={focus} onChange={e => setFocus(e.target.value)} placeholder="What's the ONE thing you want to accomplish today?"
          style={{ width: '100%', background: S.card2, border: `1px solid ${S.border}`, borderRadius: 8, padding: '12px 14px', color: S.text, fontFamily: "Verdana, Geneva, sans-serif", fontSize: 15, resize: 'none', height: 88 }} />
      </Card>
      <Btn full onClick={onClockIn} style={{ fontSize: 18, padding: 18, letterSpacing: 3 }}>⏱ CLOCK IN — START NOW</Btn>
      {reflections.length > 0 && (
        <Card S={S} style={{ marginTop: 28 }}>
          <Label S={S}>Last Session</Label>
          <div style={{ color: GREEN, fontSize: 15, fontWeight: 700 }}>✅ {reflections[reflections.length-1].pct}% completion</div>
          <div style={{ color: S.sub, fontSize: 13, marginTop: 4 }}>{new Date(reflections[reflections.length-1].date).toLocaleDateString('en-US',{weekday:'long',month:'short',day:'numeric'})}</div>
        </Card>
      )}
    </div>
  );

  return (
    <div style={{ maxWidth: 520, margin: '0 auto' }}>
      <SectionTitle>DAY IN PROGRESS</SectionTitle>
      <div style={{ color: '#22c55e', fontSize: 14, fontWeight: 700, marginBottom: 28, letterSpacing: 1 }}>● YOU'RE CLOCKED IN</div>
      <Card S={S} style={{ textAlign: 'center', marginBottom: 20 }}>
        <div style={{ fontFamily: "Verdana, Geneva, sans-serif", fontSize: 80, color: pct >= 70 ? GREEN : pct >= 40 ? AMBER : RED, lineHeight: 1 }}>{pct}%</div>
        <div style={{ color: S.sub, fontSize: 14, marginBottom: 16 }}>Completion Today</div>
        <Bar v={pct} color={pct>=70?GREEN:pct>=40?AMBER:RED} h={14} bg={S.card2} />
        <div style={{ marginTop: 12, fontSize: 13, color: S.sub }}>
          {pct>=70?'🟢 On track — keep pushing':pct>=40?'🟡 Getting there — pick up the pace':'🔴 Behind — focus up now'}
        </div>
      </Card>
      {focus && <Card S={S} style={{ marginBottom: 20, borderLeft: `1.5px solid ${GOLD}` }}>
        <Label S={S}>Today's Focus</Label>
        <div style={{ fontSize: 16 }}>{focus}</div>
      </Card>}
      {!showOut
        ? <Btn full outline color={RED} onClick={() => setShowOut(true)} style={{ fontSize: 16, padding: 16 }}>CLOCK OUT — END DAY</Btn>
        : (
          <Card S={S}>
            <div style={{ fontFamily: "Verdana, Geneva, sans-serif", fontSize: 22, letterSpacing: 2, marginBottom: 20 }}>END OF DAY REFLECTION</div>
            {[{k:'good',q:"What did you do well today?"},{k:'short',q:"Where did you fall short?"},{k:'tomorrow',q:"What needs to improve tomorrow?"}].map(({k,q}) => (
              <div key={k} style={{ marginBottom: 16 }}>
                <Label S={S}>{q}</Label>
                <textarea value={ref[k]} onChange={e => setRef(r => ({...r,[k]:e.target.value}))} placeholder="Be honest..."
                  style={{ width:'100%', background:S.card2, border:`1px solid ${S.border}`, borderRadius:8, padding:'12px 14px', color:S.text, fontFamily:"'Rajdhani',sans-serif", fontSize:14, resize:'none', height:68 }} />
              </div>
            ))}
            <Btn full onClick={() => onClockOut(ref)} style={{ marginTop: 8 }}>SUBMIT & CLOCK OUT</Btn>
          </Card>
        )
      }
    </div>
  );
}

/* ── DEVOTIONAL PAGE ──────────────────────────────────────── */
function DevotionalPage({ S, devo, onContinue }) {
  return (
    <div style={{ maxWidth: 580, margin: '0 auto', textAlign: 'center' }}>
      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 4, color: GOLD, marginBottom: 32 }}>✦ DAILY DEVOTIONAL ✦</div>
      <div style={{ background: `linear-gradient(135deg, ${RED}15, ${GOLD}15)`, border: `1px solid ${GOLD}44`, borderRadius: 18, padding: '40px 32px', marginBottom: 28 }}>
        <div style={{ fontSize: 12, color: GOLD, letterSpacing: 3, fontWeight: 700, marginBottom: 18 }}>{devo.ref}</div>
        <div style={{ fontFamily: "Verdana, Geneva, sans-serif", fontSize: 28, lineHeight: 1.35, letterSpacing: 1 }}>"{devo.verse}"</div>
      </div>
      <Card S={S} style={{ marginBottom: 16, textAlign: 'left' }}>
        <div style={{ fontSize: 12, color: RED, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>HERE'S WHAT THIS MEANS FOR YOU</div>
        <div style={{ fontSize: 16, lineHeight: 1.75 }}>{devo.msg}</div>
      </Card>
      <Card S={S} style={{ marginBottom: 32, textAlign: 'left', borderLeft: `4px solid ${GOLD}` }}>
        <div style={{ fontSize: 12, color: GOLD, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>WALK THIS OUT BY</div>
        <div style={{ fontSize: 16, lineHeight: 1.75, fontWeight: 600 }}>{devo.action}</div>
      </Card>
      <Btn full onClick={onContinue} style={{ fontSize: 18, padding: 18, letterSpacing: 3 }}>I'M READY — START MY DAY →</Btn>
    </div>
  );
}

/* ── DASHBOARD PAGE — Execution Engine ───────────────────── */
function DashboardPage({ S, user, tasks, goals, pct, completed, setPage, toggleTask, appConfig }) {
  const pending  = tasks.filter(t => !t.done);
  const next     = pending[0];
  const queue    = pending.slice(1, 4); // next 3 after current
  const hr       = new Date().getHours();
  const greet    = hr < 12 ? 'MORNING' : hr < 17 ? 'AFTERNOON' : 'EVENING';
  const allDone  = tasks.length > 0 && pending.length === 0;

  // Pulse animation for the active task card
  const pulseStyle = { animation: 'pulseGlow 2.5s ease-in-out infinite' };

  return (
    <div style={{ maxWidth: 560, margin: '0 auto' }}>
      <style>{`
        @keyframes pulseGlow {
          0%,100% { box-shadow: 0 0 0 0 ${RED}33; }
          50%      { box-shadow: 0 0 0 10px ${RED}00; }
        }
        @keyframes slideUp {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:none; }
        }
        .slide-up { animation: slideUp 0.35s ease both; }
      `}</style>

      {/* Compact header */}
      <div style={{ marginBottom: 20, display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:8 }}>
        <div>
          <div style={{ fontFamily:"'Bebas Neue'", fontSize:30, letterSpacing:2, lineHeight:1 }}>
            GOOD {greet}, {user?.name?.toUpperCase()}
          </div>
          <div style={{ color:S.sub, fontSize:13, marginTop:2 }}>
            {new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})}
          </div>
        </div>
        <div style={{ textAlign:'right' }}>
          <div style={{ fontFamily:"'Bebas Neue'", fontSize:36, color:pct>=70?GREEN:pct>=40?AMBER:RED, lineHeight:1 }}>{pct}%</div>
          <div style={{ fontSize:12, color:S.sub }}>{completed}/{tasks.length} done</div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ marginBottom: 24 }}>
        <Bar v={pct} color={pct>=70?GREEN:pct>=40?AMBER:RED} h={6} bg={S.card2} />
      </div>

      {/* ── ALL DONE STATE ── */}
      {allDone && (
        <div className="slide-up">
          <Card S={S} style={{ textAlign:'center', padding:'40px 24px', background:GREEN+'0d', borderColor:GREEN+'44', marginBottom:20 }}>
            <div style={{ fontSize:56, marginBottom:12 }}>🏆</div>
            <div style={{ fontFamily:"'Bebas Neue'", fontSize:36, color:GREEN, letterSpacing:2, marginBottom:8 }}>ALL TASKS DONE!</div>
            <div style={{ color:S.sub, fontSize:15, marginBottom:20 }}>That's the standard. Day complete.</div>
            <Btn onClick={()=>setPage('clockin')} outline color={GREEN}>CLOCK OUT & REFLECT</Btn>
          </Card>
        </div>
      )}

      {/* ── CURRENT TASK ── */}
      {next && (
        <div className="slide-up">
          {/* Section label */}
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:3, color:RED, marginBottom:10 }}>⚡ DO THIS RIGHT NOW</div>

          {/* Big task card */}
          <div style={{ background: S.card, border:`2px solid ${RED}`, borderRadius:16, padding:'28px 24px', marginBottom:16, ...pulseStyle }}>
            <div style={{ fontFamily:"'Bebas Neue'", fontSize:28, letterSpacing:1, lineHeight:1.2, marginBottom:14 }}>
              {next.title}
            </div>
            <div style={{ display:'flex', gap:10, flexWrap:'wrap', alignItems:'center', marginBottom:20 }}>
              <Chip label={next.cat} color={CAT_COLORS[next.cat]||RED} />
              {next.time && <span style={{ fontSize:13, color:S.sub, fontWeight:600 }}>⏰ {next.time}</span>}
              <span style={{ fontSize:13, color:GOLD, fontWeight:700 }}>+{next.pts} pts</span>
            </div>
            <Btn full onClick={() => toggleTask(next.id)}
              style={{ fontSize:17, padding:'16px 0', letterSpacing:2, borderRadius:10 }}>
              ✓ DONE — NEXT TASK
            </Btn>
          </div>
        </div>
      )}

      {/* ── COMING UP queue ── */}
      {queue.length > 0 && (
        <div style={{ marginBottom:20 }}>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:3, color:S.sub, marginBottom:10 }}>COMING UP</div>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {queue.map((t, i) => (
              <div key={t.id} style={{ background:S.card, border:`1px solid ${S.border}`, borderRadius:10, padding:'12px 16px', display:'flex', alignItems:'center', gap:12, opacity: 0.65 + i*0 }}>
                <div style={{ width:22, height:22, borderRadius:6, border:`2px solid ${S.border}`, flexShrink:0 }} />
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:14, fontWeight:600 }}>{t.title}</div>
                  <div style={{ fontSize:12, color:S.sub }}>{t.cat}{t.time ? ' · ' + t.time : ''}</div>
                </div>
                <span style={{ fontSize:12, color:GOLD, fontWeight:700 }}>+{t.pts}</span>
              </div>
            ))}
            {pending.length > 4 && (
              <div style={{ textAlign:'center', fontSize:12, color:S.sub, fontWeight:600, padding:'6px 0' }}>
                + {pending.length - 4} more task{pending.length-4!==1?'s':''} · <button onClick={()=>setPage('mission')} style={{ background:'none', border:'none', color:RED, cursor:'pointer', fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:12 }}>SEE ALL</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Quick links ── */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginTop:4 }}>
        {[
          {icon:'📋', label:'FULL LIST',  page:'mission'},
          {icon:'🏋🏾', label:'TRAINING', page:'training'},
          {icon:'🎯', label:'GOALS',      page:'goals'},
        ].map(({icon,label,page:p}) => (
          <button key={p} onClick={()=>setPage(p)}
            style={{ background:S.card, border:`1px solid ${S.border}`, borderRadius:10, padding:'12px 8px', cursor:'pointer', color:S.sub, fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:12, letterSpacing:1, textAlign:'center', transition:'all 0.15s' }}
            onMouseEnter={e=>e.currentTarget.style.borderColor=RED}
            onMouseLeave={e=>e.currentTarget.style.borderColor=S.border}>
            <div style={{ fontSize:22, marginBottom:4 }}>{icon}</div>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── TODAY'S FLOW (Mission Board) ────────────────────────── */
function MissionPage({ S, tasks, setTasks, toggleTask }) {
  const [quickTitle, setQuickTitle] = useState('');
  const [quickCat,   setQuickCat]   = useState('Academics');
  const [showFull,   setShowFull]   = useState(false); // toggle full list vs flow view
  const [editId,     setEditId]     = useState(null);

  const done    = tasks.filter(t => t.done);
  const pending = tasks.filter(t => !t.done);
  const currentIdx = tasks.findIndex(t => !t.done); // first undone

  const quickAdd = () => {
    if (!quickTitle.trim()) return;
    setTasks(p => [...p, {
      id: Date.now(), title: quickTitle.trim(), cat: quickCat,
      priority: 'medium', time: '', pts: 30, done: false,
    }]);
    setQuickTitle('');
  };

  const CATS = Object.keys(CAT_COLORS);
  const pct  = tasks.length > 0 ? Math.round((done.length / tasks.length) * 100) : 0;

  return (
    <div style={{ maxWidth: 600 }}>
      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:4 }}>
        <SectionTitle>TODAY'S FLOW</SectionTitle>
        <button onClick={()=>setShowFull(!showFull)}
          style={{ background:'transparent', border:`1px solid ${S.border}`, borderRadius:8, padding:'6px 14px', cursor:'pointer', color:S.sub, fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:12, letterSpacing:1 }}>
          {showFull ? '⚡ FLOW VIEW' : '☰ FULL LIST'}
        </button>
      </div>
      <div style={{ color:S.sub, fontSize:14, marginBottom:20 }}>
        {done.length} of {tasks.length} complete · {pct}%
      </div>

      {/* Progress */}
      <div style={{ marginBottom:24 }}>
        <Bar v={pct} color={pct>=70?GREEN:pct>=40?AMBER:RED} h={8} bg={S.card2} />
      </div>

      {/* ─── FLOW VIEW (default) ─── */}
      {!showFull && (
        <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:24 }}>
          {tasks.map((t, i) => {
            const isCurrent = i === currentIdx;
            const isNext    = !t.done && i > currentIdx && (i - currentIdx) <= 2;
            const isDimmed  = !t.done && !isCurrent && !isNext;
            const stepNum   = i + 1;

            return (
              <div key={t.id}
                className={isCurrent ? 'll-fadein' : ''}
                style={{
                  display:'flex', alignItems:'center', gap:14,
                  background: isCurrent ? S.card : 'transparent',
                  border: isCurrent ? `2px solid ${RED}` : `1px solid ${t.done ? 'transparent' : S.border}`,
                  borderRadius:12,
                  padding: isCurrent ? '18px 18px' : '11px 14px',
                  opacity: isDimmed ? 0.35 : 1,
                  transition:'all 0.25s',
                }}>
                {/* Step indicator / checkbox */}
                <button onClick={()=>toggleTask(t.id)}
                  style={{
                    width: isCurrent ? 34 : 28, height: isCurrent ? 34 : 28,
                    borderRadius:8, flexShrink:0,
                    border:`2px solid ${t.done ? GREEN : isCurrent ? RED : S.border}`,
                    background: t.done ? GREEN : 'transparent',
                    cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
                    fontFamily:"'Bebas Neue'", fontSize:14, color: t.done ? '#fff' : isCurrent ? RED : S.sub,
                    transition:'all 0.2s',
                  }}>
                  {t.done ? '✓' : stepNum}
                </button>

                {/* Task info */}
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize: isCurrent ? 18 : 15, fontWeight: isCurrent ? 700 : t.done ? 400 : 600, textDecoration:t.done?'line-through':'none', color: t.done ? S.sub : S.text, lineHeight:1.3 }}>
                    {t.title}
                  </div>
                  {(isCurrent || !t.done) && (
                    <div style={{ display:'flex', gap:8, marginTop:5, flexWrap:'wrap', alignItems:'center' }}>
                      <span style={{ fontSize:11, fontWeight:700, color:CAT_COLORS[t.cat]||RED, letterSpacing:1 }}>{t.cat.toUpperCase()}</span>
                      {t.time && <span style={{ fontSize:12, color:S.sub }}>⏰ {t.time}</span>}
                      <span style={{ fontSize:12, color:GOLD, fontWeight:700 }}>+{t.pts}pts</span>
                    </div>
                  )}
                </div>

                {/* Current: big action button */}
                {isCurrent && (
                  <Btn sm onClick={()=>toggleTask(t.id)} style={{ whiteSpace:'nowrap', letterSpacing:1 }}>
                    ✓ DONE
                  </Btn>
                )}

                {/* Delete */}
                {!isCurrent && (
                  <button onClick={()=>setTasks(p=>p.filter(x=>x.id!==t.id))}
                    style={{ background:'transparent', border:'none', cursor:'pointer', color:S.muted, fontSize:16, padding:'4px 6px', lineHeight:1, flexShrink:0 }}>×</button>
                )}
              </div>
            );
          })}

          {tasks.length === 0 && (
            <div style={{ textAlign:'center', padding:'48px 0', color:S.sub }}>
              <div style={{ fontSize:36, marginBottom:10 }}>📋</div>
              <div style={{ fontSize:15 }}>No tasks yet — add one below</div>
            </div>
          )}
        </div>
      )}

      {/* ─── FULL LIST VIEW ─── */}
      {showFull && (
        <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:24 }}>
          {tasks.map(t => (
            <div key={t.id} style={{ background:S.card, border:`1px solid ${S.border}`, borderLeft:`1.5px solid ${t.done?S.muted:CAT_COLORS[t.cat]||RED}`, borderRadius:12, padding:'14px 16px', display:'flex', alignItems:'flex-start', gap:12, opacity:t.done?0.5:1, transition:'all 0.2s' }}>
              <button onClick={()=>toggleTask(t.id)}
                style={{ width:26, height:26, borderRadius:6, border:`2px solid ${t.done?GREEN:CAT_COLORS[t.cat]||RED}`, background:t.done?GREEN:'transparent', cursor:'pointer', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', marginTop:1, transition:'all 0.2s' }}>
                {t.done && <span style={{ color:'#fff', fontSize:13 }}>✓</span>}
              </button>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:15, fontWeight:600, textDecoration:t.done?'line-through':'none', marginBottom:5 }}>{t.title}</div>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap', alignItems:'center' }}>
                  <Chip label={t.cat} color={CAT_COLORS[t.cat]||RED} />
                  {t.time && <span style={{ fontSize:12, color:S.sub }}>⏰ {t.time}</span>}
                  <span style={{ fontSize:12, color:GOLD, fontWeight:700 }}>+{t.pts}pts</span>
                </div>
              </div>
              <button onClick={()=>setTasks(p=>p.filter(x=>x.id!==t.id))}
                style={{ background:'transparent', border:'none', cursor:'pointer', color:S.muted, fontSize:18, lineHeight:1, padding:'2px 6px' }}>×</button>
            </div>
          ))}
        </div>
      )}

      {/* ─── QUICK-ADD BAR ─── */}
      <div style={{ background:S.card, border:`1px solid ${S.border}`, borderRadius:12, padding:'14px 16px' }}>
        <div style={{ fontSize:11, fontWeight:700, letterSpacing:2, color:S.sub, marginBottom:12 }}>+ QUICK ADD TASK</div>
        <div style={{ display:'flex', gap:10, marginBottom:10 }}>
          <input
            value={quickTitle}
            onChange={e=>setQuickTitle(e.target.value)}
            onKeyDown={e=>{ if(e.key==='Enter') quickAdd(); }}
            placeholder="What needs to get done?"
            style={{ flex:1, background:S.card2, border:`1px solid ${S.border}`, borderRadius:8, padding:'12px 14px', color:S.text, fontFamily:"'Rajdhani',sans-serif", fontSize:15 }}
          />
          <Btn sm onClick={quickAdd} disabled={!quickTitle.trim()}>ADD</Btn>
        </div>
        {/* Category chips */}
        <div style={{ display:'flex', gap:7, flexWrap:'wrap' }}>
          {CATS.map(c => (
            <button key={c} onClick={()=>setQuickCat(c)}
              style={{ padding:'5px 12px', background: quickCat===c ? CAT_COLORS[c]+'22' : 'transparent', color: quickCat===c ? CAT_COLORS[c] : S.sub, border:`1px solid ${quickCat===c ? CAT_COLORS[c] : S.border}`, borderRadius:20, cursor:'pointer', fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:11, letterSpacing:1, transition:'all 0.15s' }}>
              {c.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── TRAINING PAGE — Auto Daily ──────────────────────────── */
function TrainingPage({ S, user }) {
  const sport = user?.sport || 'Basketball';
  const [plans] = useLS('ll_training_plans', TRAINING_PLANS);
  const plan  = plans[sport] || plans.Basketball || TRAINING_PLANS.Basketball;

  // Auto-select today's block by day of week
  // Sun=0:Conditioning, Mon=1:Skill, Tue=2:Strength, Wed=3:Conditioning,
  // Thu=4:Skill, Fri=5:Strength, Sat=6:Conditioning
  const dayBlockMap = [2, 0, 1, 2, 0, 1, 2]; // index into plan array
  const todayIdx    = Math.min(dayBlockMap[new Date().getDay()], plan.length - 1);
  const DAY_NAMES   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const FOCUS_NAMES = ['CONDITIONING','SKILL WORK','STRENGTH'];
  const todayFocus  = FOCUS_NAMES[dayBlockMap[new Date().getDay()]] || plan[todayIdx]?.type?.toUpperCase();

  const [block, setBlock]    = useState(todayIdx);
  const [done, setDone]      = useState({});
  const [manualOverride, setManualOverride] = useState(false);

  const blockDone = Object.keys(done).filter(k=>k.startsWith(block+'-')).length;
  const total     = plan[block]?.drills?.length || 1;
  const allDone   = blockDone === total;

  // Reset done when block changes
  const switchBlock = (i) => { setBlock(i); setManualOverride(true); };

  return (
    <div>
      {/* Today's auto-assigned block header */}
      <div style={{ marginBottom:24 }}>
        <SectionTitle>TRAINING HUB</SectionTitle>
        {!manualOverride ? (
          <div style={{ marginTop:4 }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
              <Chip label={sport} color={RED} />
              <span style={{ color:GOLD, fontFamily:"'Bebas Neue'", fontSize:18, letterSpacing:2 }}>TODAY: {todayFocus}</span>
            </div>
            <div style={{ color:S.sub, fontSize:13 }}>
              Auto-selected for {DAY_NAMES[new Date().getDay()]} ·
              <button onClick={()=>setManualOverride(true)}
                style={{ background:'none', border:'none', color:RED, cursor:'pointer', fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:13, marginLeft:6 }}>
                SWITCH BLOCK ↓
              </button>
            </div>
          </div>
        ) : (
          <div style={{ color:S.sub, fontSize:13, marginTop:4 }}>
            Viewing {plan[block]?.type} ·
            <button onClick={()=>{ setBlock(todayIdx); setManualOverride(false); setDone({}); }}
              style={{ background:'none', border:'none', color:GOLD, cursor:'pointer', fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:13, marginLeft:6 }}>
              ↩ BACK TO TODAY'S PLAN
            </button>
          </div>
        )}
      </div>

      {/* Block tabs — only shown when override is active */}
      {manualOverride && (
        <div style={{ display:'grid', gridTemplateColumns:`repeat(${plan.length},1fr)`, gap:10, marginBottom:22 }}>
          {plan.map((p,i) => (
            <button key={i} onClick={()=>switchBlock(i)}
              style={{ background:block===i?RED:S.card, border:`1px solid ${block===i?RED:S.border}`, borderRadius:10, padding:'13px 6px', cursor:'pointer', color:block===i?'#fff':S.sub, fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:13, letterSpacing:1, transition:'all 0.2s', textAlign:'center' }}>
              {p.type.toUpperCase()}<br/><span style={{ fontSize:11, opacity:0.7 }}>{p.duration}</span>
            </button>
          ))}
        </div>
      )}

      {/* Drill card */}
      <Card S={S} style={{ marginBottom:18 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
          <div>
            <div style={{ fontFamily:"'Bebas Neue'", fontSize:26, letterSpacing:2 }}>{plan[block]?.type?.toUpperCase()}</div>
            <div style={{ color:S.sub, fontSize:13 }}>{plan[block]?.duration} · {sport}</div>
          </div>
          <div style={{ fontFamily:"'Bebas Neue'", fontSize:48, color:allDone?GREEN:RED, lineHeight:1 }}>{blockDone}/{total}</div>
        </div>
        <Bar v={(blockDone/total)*100} color={allDone?GREEN:RED} h={8} bg={S.card2} />

        {allDone && (
          <div style={{ background:GREEN+'0d', border:`1px solid ${GREEN}44`, borderRadius:8, padding:'12px 16px', marginTop:14, textAlign:'center' }}>
            <span style={{ color:GREEN, fontWeight:700, fontSize:15 }}>🏆 Block complete! Recovery below.</span>
          </div>
        )}

        <div style={{ marginTop:16 }}>
          {plan[block]?.drills?.map((d,i) => {
            const k=`${block}-${i}`, isDone=!!done[k];
            return (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:14, padding:'12px 0', borderBottom:`1px solid ${S.border}` }}>
                <button onClick={()=>setDone(p=>isDone?Object.fromEntries(Object.entries(p).filter(([x])=>x!==k)):{...p,[k]:true})}
                  style={{ width:26, height:26, borderRadius:7, border:`2px solid ${isDone?GREEN:RED}`, background:isDone?GREEN:'transparent', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all 0.2s' }}>
                  {isDone && <span style={{ color:'#fff', fontSize:13 }}>✓</span>}
                </button>
                <span style={{ fontSize:15, fontWeight:isDone?400:600, textDecoration:isDone?'line-through':'none', opacity:isDone?0.5:1, transition:'all 0.2s' }}>{d}</span>
              </div>
            );
          })}
        </div>
      </Card>

      <Card S={S} style={{ background:GOLD+'0d', borderColor:GOLD+'33' }}>
        <div style={{ fontSize:12, fontWeight:700, letterSpacing:2, color:GOLD, marginBottom:8 }}>🛠 RECOVERY REMINDER</div>
        <div style={{ fontSize:14, lineHeight:1.7 }}>Hydrate 32+ oz post-session · 10 min stretching · 7–9 hours sleep tonight · Ice any soreness</div>
      </Card>
    </div>
  );
}

/* ── GOALS PAGE ───────────────────────────────────────────── */
function GoalsPage({ S, goals, setGoals }) {
  const [adding, setAdding] = useState(false);
  const [ng, setNg] = useState({ title:'', cat:'Athletic', deadline:'', progress:0 });
  const catOpts = ['Athletic','Academic','Fitness','Personal','Faith'];

  const save = () => {
    if (!ng.title) return;
    setGoals(p=>[...p,{...ng,id:Date.now()}]);
    setNg({ title:'', cat:'Athletic', deadline:'', progress:0 });
    setAdding(false);
  };
  const adj = (id, delta) => setGoals(p=>p.map(g=>g.id===id?{...g,progress:Math.max(0,Math.min(100,g.progress+delta))}:g));

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
        <SectionTitle>GOAL TRACKER</SectionTitle>
        <Btn sm onClick={()=>setAdding(!adding)}>+ NEW GOAL</Btn>
      </div>
      <div style={{ color:S.sub, fontSize:14, marginBottom:22 }}>{goals.length} active goals</div>

      {adding && (
        <Card S={S} style={{ marginBottom:20, borderLeft:`1.5px solid ${GOLD}` }}>
          <Label S={S}>New Goal</Label>
          <div style={{ display:'grid', gap:10 }}>
            <Input value={ng.title} onChange={e=>setNg(p=>({...p,title:e.target.value}))} placeholder="Goal title..." S={S} />
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              <Select value={ng.cat} onChange={e=>setNg(p=>({...p,cat:e.target.value}))} options={catOpts} S={S} />
              <input type="date" value={ng.deadline} onChange={e=>setNg(p=>({...p,deadline:e.target.value}))}
                style={{ background:S.card2, border:`1px solid ${S.border}`, borderRadius:8, padding:'12px 14px', color:S.text, fontFamily:"'Rajdhani',sans-serif" }} />
            </div>
            <div style={{ display:'flex', gap:10 }}>
              <Btn sm onClick={save}>SAVE GOAL</Btn>
              <Btn sm outline onClick={()=>setAdding(false)}>CANCEL</Btn>
            </div>
          </div>
        </Card>
      )}

      <div style={{ display:'grid', gap:16 }}>
        {goals.map(g => {
          const on = g.progress >= 50;
          const color = on ? GREEN : g.progress >= 30 ? AMBER : RED;
          return (
            <Card key={g.id} S={S}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
                <div>
                  <div style={{ fontFamily:"'Bebas Neue'", fontSize:24, letterSpacing:1 }}>{g.title}</div>
                  <div style={{ display:'flex', gap:8, marginTop:6 }}>
                    <Chip label={g.cat} color={RED} />
                    {g.deadline && <span style={{ fontSize:12, color:S.sub }}>📅 {new Date(g.deadline).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</span>}
                  </div>
                </div>
                <div style={{ textAlign:'right' }}>
                  <div style={{ fontFamily:"'Bebas Neue'", fontSize:44, color, lineHeight:1 }}>{g.progress}%</div>
                  <div style={{ fontSize:11, color, fontWeight:700, letterSpacing:1 }}>{on?'ON TRACK':'NEEDS FOCUS'}</div>
                </div>
              </div>
              <Bar v={g.progress} color={color} h={10} bg={S.card2} />
              <div style={{ display:'flex', gap:8, marginTop:14, alignItems:'center' }}>
                <button onClick={()=>adj(g.id,-5)} style={{ background:S.card2, border:`1px solid ${S.border}`, borderRadius:6, padding:'7px 16px', cursor:'pointer', color:S.text, fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:16 }}>−5</button>
                <div style={{ fontSize:12, color:S.sub, flex:1, textAlign:'center' }}>ADJUST PROGRESS</div>
                <button onClick={()=>adj(g.id,5)}  style={{ background:S.card2, border:`1px solid ${S.border}`, borderRadius:6, padding:'7px 16px', cursor:'pointer', color:S.text, fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:16 }}>+5</button>
                <button onClick={()=>setGoals(p=>p.filter(x=>x.id!==g.id))} style={{ background:'transparent', border:'none', cursor:'pointer', color:S.muted, fontSize:20, padding:'4px 8px' }}>×</button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

/* ── AI COACH PAGE ────────────────────────────────────────── */
function CoachPage({ S, user, tasks, goals, reflections }) {
  const [effort, setEffort] = useState(7);
  const [note, setNote]     = useState('');
  const [fb, setFb]         = useState('');
  const [loading, setLoad]  = useState(false);
  const done = tasks.filter(t=>t.done);
  const pct  = tasks.length>0 ? Math.round((done.length/tasks.length)*100) : 0;

  const getCoach = async () => {
    setLoad(true); setFb('');
    try {
      const prompt = `You are a high-performance coach and mentor for a athlete named ${user?.name||'the athlete'} who plays ${user?.sport||'sports'}.

Today's stats:
- Task completion: ${pct}% (${done.length}/${tasks.length} tasks completed)
- Self-rated effort: ${effort}/10
- Athlete's note: "${note||'None'}"
- Completed: ${done.map(t=>t.title).join(', ')||'None'}
- Incomplete: ${tasks.filter(t=>!t.done).map(t=>t.title).join(', ')||'None'}
- Goals: ${goals.map(g=>`${g.title} at ${g.progress}%`).join(', ')}

Give coaching feedback. Rules:
- Speak directly to them by name
- Start with ONE specific acknowledgment (positive or real)  
- Give ONE direct, specific improvement for tomorrow
- End with a single powerful statement
- 4 sentences max. No bullet points. Sound like a real coach.
- Never use generic phrases like "Great job!" or "Keep it up!"
- Be firm but human. Supportive but direct.`;

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ model:'claude-sonnet-4-6', max_tokens:1000, messages:[{role:'user',content:prompt}] })
      });
      const data = await res.json();
      setFb(data.content?.map(c=>c.text||'').join('')||'Unable to load feedback. Check your network.');
    } catch {
      setFb("Network issue. But here's the truth: you already know what you need to do. Look at your incomplete tasks and get them done first thing tomorrow.");
    }
    setLoad(false);
  };

  return (
    <div style={{ maxWidth:580, margin:'0 auto' }}>
      <SectionTitle>AI COACH</SectionTitle>
      <div style={{ color:S.sub, fontSize:15, marginBottom:28 }}>Real feedback on your day — no fluff</div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:18 }}>
        <Card S={S} style={{ textAlign:'center', padding:18 }}>
          <div style={{ fontFamily:"'Bebas Neue'", fontSize:52, color:pct>=70?GREEN:pct>=40?AMBER:RED, lineHeight:1 }}>{pct}%</div>
          <div style={{ fontSize:12, color:S.sub, marginTop:4 }}>COMPLETION</div>
        </Card>
        <Card S={S} style={{ textAlign:'center', padding:18 }}>
          <div style={{ fontFamily:"'Bebas Neue'", fontSize:52, color:GOLD, lineHeight:1 }}>{done.length}</div>
          <div style={{ fontSize:12, color:S.sub, marginTop:4 }}>TASKS DONE</div>
        </Card>
      </div>

      <Card S={S} style={{ marginBottom:18 }}>
        <Label S={S}>Rate Your Effort Today</Label>
        <div style={{ textAlign:'center', marginBottom:12 }}>
          <div style={{ fontFamily:"'Bebas Neue'", fontSize:64, color:effort>=8?GREEN:effort>=5?AMBER:RED, lineHeight:1 }}>{effort}</div>
          <div style={{ color:S.sub, fontSize:13 }}>out of 10</div>
        </div>
        <input type="range" min="1" max="10" value={effort} onChange={e=>setEffort(Number(e.target.value))} style={{ width:'100%', accentColor:RED, height:4 }} />
        <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:S.sub, marginTop:6 }}>
          <span>NO EFFORT</span><span>GOOD</span><span>MAXED OUT</span>
        </div>
      </Card>

      <Card S={S} style={{ marginBottom:20 }}>
        <Label S={S}>Anything to add?</Label>
        <textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="What happened today? Challenges, wins, anything on your mind..."
          style={{ width:'100%', background:S.card2, border:`1px solid ${S.border}`, borderRadius:8, padding:'12px 14px', color:S.text, fontFamily:"'Rajdhani',sans-serif", fontSize:15, resize:'none', height:80 }} />
      </Card>

      <Btn full onClick={getCoach} disabled={loading} style={{ fontSize:17, padding:16, marginBottom:20 }}>
        {loading ? 'COACH IS THINKING...' : 'GET COACH FEEDBACK →'}
      </Btn>

      {loading && (
        <Card S={S} style={{ textAlign:'center', padding:40 }}>
          <div style={{ fontSize:36, marginBottom:12 }}>🧠</div>
          <div style={{ color:S.sub, fontSize:15 }}>Reviewing your day...</div>
        </Card>
      )}

      {fb && !loading && (
        <Card S={S} style={{ borderLeft:`4px solid ${RED}`, background:RED+'08' }} >
          <div style={{ fontSize:12, fontWeight:700, letterSpacing:2, color:RED, marginBottom:16 }}>COACH SAYS</div>
          <div style={{ fontSize:17, lineHeight:1.85, fontStyle:'italic' }}>"{fb}"</div>
        </Card>
      )}
    </div>
  );
}

/* ── FILM HUB ─────────────────────────────────────────────── */
function FilmPage({ S, user, films: filmsProp, appConfig, siteUser }) {
  const [resp, setResp]       = useState({});
  const [respLoaded, setRespLoaded] = useState(!siteUser);
  const [activeFilm, setActiveFilm] = useState(0);
  const [sourceTab, setSourceTab]   = useState('youtube');
  const [uploadedVids, setUploadedVids] = useState([]); // [{name, url, type}]
  const [activeUpload, setActiveUpload] = useState(0);
  const fileRef = useRef(null);

  // Real per-student film breakdown notes, replacing the old useLS/
  // localStorage-only version.
  useEffect(() => {
    if (!siteUser) return;
    (async () => {
      try {
        const res = await fetch("/api/athlete/film-notes", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setResp(data.notes || {});
        }
      } catch (e) {}
      setRespLoaded(true);
    })();
  }, [siteUser]);

  useEffect(() => {
    if (!siteUser || !respLoaded) return;
    const timeout = setTimeout(() => {
      fetch("/api/athlete/film-notes", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: resp }),
      }).catch(() => {});
    }, 800);
    return () => clearTimeout(timeout);
  }, [siteUser, respLoaded, resp]);

  const allowYT  = appConfig?.allowYouTube !== false;
  const allowUp  = appConfig?.allowUpload  !== false;
  const vids     = filmsProp && filmsProp.length > 0 ? filmsProp : DEFAULT_FILMS;
  const v        = vids[Math.min(activeFilm, vids.length - 1)];

  const getVideoId = (url) => {
    if (!url) return null;
    const em = url.match(/youtube(?:-nocookie)?\.com\/embed\/([a-zA-Z0-9_-]{11})/);
    if (em) return em[1];
    const wt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (wt) return wt[1];
    return null;
  };

  const makeEmbedUrl = (url) => {
    const id = getVideoId(url);
    if (!id) return url;
    return `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&iv_load_policy=3&controls=1&showinfo=0`;
  };

  const journalKey = sourceTab === 'upload'
    ? `up_${activeUpload}`
    : `yt_${activeFilm}`;
  const save = (q, txt) => setResp(p => ({ ...p, [journalKey]: { ...(p[journalKey]||{}), [q]: txt, _savedAt: new Date().toISOString(), _title: sourceTab === 'upload' ? uploadedVids[activeUpload]?.name : v?.title } }));

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setUploadedVids(prev => [...prev, { name: file.name, url, type: file.type }]);
    setActiveUpload(uploadedVids.length);
    setSourceTab('upload');
  };

  const curTab = (!allowYT && allowUp) ? 'upload' : (!allowUp && allowYT) ? 'youtube' : sourceTab;
  const uv = uploadedVids[activeUpload];

  return (
    <div>
      <SectionTitle>FILM & STUDY HUB</SectionTitle>
      <div style={{ color:S.sub, fontSize:15, marginBottom:20 }}>Watch. Analyze. Apply.</div>

      {/* Source tab bar */}
      {(allowYT && allowUp) && (
        <div style={{ display:'flex', gap:8, marginBottom:20 }}>
          {[{id:'youtube',label:'📹 YouTube Library'},{id:'upload',label:'📁 My Videos'}].map(t => (
            <button key={t.id} onClick={()=>setSourceTab(t.id)}
              style={{ padding:'9px 20px', background:curTab===t.id?RED:S.card, color:curTab===t.id?'#fff':S.sub, border:`1px solid ${curTab===t.id?RED:S.border}`, borderRadius:8, cursor:'pointer', fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:13, letterSpacing:1, transition:'all 0.18s' }}>
              {t.label.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {/* YOUTUBE TAB */}
      {curTab === 'youtube' && allowYT && (
        <>
          <div style={{ display:'flex', gap:10, marginBottom:16, overflowX:'auto' }}>
            {vids.map((vd,i) => (
              <button key={i} onClick={()=>setActiveFilm(i)}
                style={{ background:activeFilm===i?RED:S.card, border:`1px solid ${activeFilm===i?RED:S.border}`, borderRadius:10, padding:'9px 16px', cursor:'pointer', color:activeFilm===i?'#fff':S.sub, fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:12, whiteSpace:'nowrap', transition:'all 0.2s' }}>
                {vd.topic.toUpperCase()}
              </button>
            ))}
          </div>
          <Card S={S} style={{ marginBottom:20 }}>
            <div style={{ fontFamily:"'Bebas Neue'", fontSize:20, letterSpacing:1, marginBottom:12 }}>{v?.title}</div>
            <div style={{ borderRadius:10, overflow:'hidden', background:'#000', position:'relative', paddingTop:'56.25%' }}>
              <iframe
                key={activeFilm}
                src={makeEmbedUrl(v?.url)}
                title={v?.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                frameBorder="0"
                style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', display:'block' }}
              />
            </div>
            <div style={{ fontSize:12, color:S.sub, marginTop:8 }}>
              🔒 Video plays inside Legacy Lab — related content and external navigation are restricted.
            </div>
          </Card>
        </>
      )}

      {/* UPLOAD TAB */}
      {curTab === 'upload' && allowUp && (
        <>
          <div style={{ display:'flex', gap:10, marginBottom:16, flexWrap:'wrap', alignItems:'center' }}>
            {uploadedVids.map((uv,i) => (
              <button key={i} onClick={()=>setActiveUpload(i)}
                style={{ background:activeUpload===i?RED:S.card, border:`1px solid ${activeUpload===i?RED:S.border}`, borderRadius:10, padding:'9px 16px', cursor:'pointer', color:activeUpload===i?'#fff':S.sub, fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:12, maxWidth:180, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                📁 {uv.name.replace(/\.[^.]+$/, '')}
              </button>
            ))}
            <button onClick={()=>fileRef.current?.click()}
              style={{ padding:'9px 16px', background:GOLD+'22', color:GOLD, border:`1px solid ${GOLD}`, borderRadius:10, cursor:'pointer', fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:12, letterSpacing:1 }}>
              + UPLOAD VIDEO
            </button>
            <input ref={fileRef} type="file" accept="video/*" style={{ display:'none' }} onChange={handleFileUpload} />
          </div>
          {uv ? (
            <Card S={S} style={{ marginBottom:20 }}>
              <div style={{ fontFamily:"'Bebas Neue'", fontSize:18, letterSpacing:1, marginBottom:12 }}>{uv.name}</div>
              <video key={uv.url} controls style={{ width:'100%', borderRadius:10, background:'#000', display:'block', maxHeight:400 }}>
                <source src={uv.url} type={uv.type} />
              </video>
              <div style={{ fontSize:12, color:S.sub, marginTop:8 }}>⚠️ Uploaded videos stay available until you close the browser tab.</div>
            </Card>
          ) : (
            <Card S={S} style={{ marginBottom:20, textAlign:'center', padding:40 }}>
              <div style={{ fontSize:40, marginBottom:12 }}>📁</div>
              <div style={{ fontFamily:"'Bebas Neue'", fontSize:22, letterSpacing:1, marginBottom:8 }}>NO VIDEOS YET</div>
              <div style={{ color:S.sub, fontSize:14, marginBottom:20 }}>Upload an MP4, MOV, or other video file to watch and analyze it here.</div>
              <Btn onClick={()=>fileRef.current?.click()}>UPLOAD VIDEO FILE</Btn>
              <input ref={fileRef} type="file" accept="video/*" style={{ display:'none' }} onChange={handleFileUpload} />
            </Card>
          )}
        </>
      )}

      {/* Disabled notice */}
      {!allowYT && !allowUp && (
        <Card S={S} style={{ textAlign:'center', padding:40 }}>
          <div style={{ fontSize:40, marginBottom:12 }}>🔒</div>
          <div style={{ fontFamily:"'Bebas Neue'", fontSize:22, letterSpacing:1, marginBottom:8 }}>VIDEO DISABLED</div>
          <div style={{ color:S.sub, fontSize:14 }}>Video viewing has been turned off by your parent. You can still write film study notes below.</div>
        </Card>
      )}

      {/* Film Study Questions — always visible */}
      <Card S={S}>
        <Label S={S}>Film Study Journal</Label>
        <div style={{ color:S.sub, fontSize:13, marginBottom:16 }}>
          {sourceTab === 'upload' && uv ? `Analyzing: ${uv.name}` : v?.title || 'Write your observations below'}
        </div>
        {FILM_Qs.map((q,i) => (
          <div key={i} style={{ marginBottom:18 }}>
            <div style={{ fontSize:14, fontWeight:700, color:GOLD, marginBottom:8 }}>Q{i+1}: {q}</div>
            <textarea value={resp[journalKey]?.[i]||''} onChange={e=>save(i,e.target.value)} placeholder="Your answer..."
              style={{ width:'100%', background:S.card2, border:`1px solid ${S.border}`, borderRadius:8, padding:'10px 14px', color:S.text, fontFamily:"'Rajdhani',sans-serif", fontSize:14, resize:'none', height:64 }} />
          </div>
        ))}
        <div style={{ fontSize:12, color:S.sub }}>✅ Answers saved automatically</div>
      </Card>
    </div>
  );
}

/* ── REPORT CARD ──────────────────────────────────────────── */
function ReportPage({ S, tasks, goals, reflections, user }) {
  const pct   = tasks.length>0 ? Math.round((tasks.filter(t=>t.done).length/tasks.length)*100) : 0;
  const grade = pct>=90?'A':pct>=80?'B':pct>=70?'C':pct>=60?'D':'F';
  const gc    = pct>=80?GREEN:pct>=60?AMBER:RED;
  const cats  = ['Academics','Training','Fitness','Mindset','Faith','Responsibilities'];

  return (
    <div style={{ maxWidth:580, margin:'0 auto' }}>
      <SectionTitle>REPORT CARD</SectionTitle>
      <div style={{ color:S.sub, fontSize:15, marginBottom:24 }}>Week of {new Date().toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}</div>

      <Card S={S} style={{ textAlign:'center', marginBottom:20, background:gc+'0d', borderColor:gc+'44' }}>
        <div style={{ fontSize:12, letterSpacing:3, color:S.sub, marginBottom:6 }}>OVERALL WEEKLY GRADE</div>
        <div style={{ fontFamily:"'Bebas Neue'", fontSize:110, color:gc, lineHeight:1 }}>{grade}</div>
        <div style={{ color:S.sub, fontSize:14, marginTop:4 }}>{pct}% overall completion</div>
      </Card>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginBottom:20 }}>
        {[
          {l:'Completion',v:`${pct}%`,c:RED},
          {l:'Streak',v:`${user?.streak||0}🔥`,c:GOLD},
          {l:'Goals Active',v:goals.length,c:GREEN},
        ].map((s,i) => (
          <Card key={i} S={S} style={{ textAlign:'center', padding:14 }}>
            <div style={{ fontFamily:"'Bebas Neue'", fontSize:32, color:s.c }}>{s.v}</div>
            <div style={{ fontSize:10, color:S.sub, letterSpacing:1 }}>{s.l.toUpperCase()}</div>
          </Card>
        ))}
      </div>

      <Card S={S} style={{ marginBottom:20 }}>
        <Label S={S}>Category Breakdown</Label>
        {cats.map(cat => {
          const ct = tasks.filter(t=>t.cat===cat);
          const cp = ct.length>0 ? Math.round((ct.filter(t=>t.done).length/ct.length)*100) : 0;
          const cc = cp>=70?GREEN:cp>=40?AMBER:RED;
          return (
            <div key={cat} style={{ marginBottom:14 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                <span style={{ fontSize:14, fontWeight:600 }}>{cat}</span>
                <span style={{ fontSize:13, color:cc, fontWeight:700 }}>{cp}%</span>
              </div>
              <Bar v={cp} color={cc} h={7} bg={S.card2} />
            </div>
          );
        })}
      </Card>

      <Card S={S} style={{ borderLeft:`4px solid ${GOLD}` }}>
        <Label S={S}>Weekly Assessment</Label>
        <div style={{ fontSize:15, lineHeight:1.85 }}>
          {pct>=80
            ? `${user?.name||'Athlete'}, you had a strong week. Your consistency is building the foundation for something real. Don't let up — keep the standard.`
            : pct>=60
            ? `${user?.name||'Athlete'}, you showed up but left points on the board. The gap between where you are and where you want to be closes through discipline—not talent. Lock in.`
            : `${user?.name||'Athlete'}, this week didn't go as planned. Pick your most important task and make sure it gets done every single day next week. That's where you start.`}
        </div>
      </Card>
    </div>
  );
}

/* ── PARENT PAGE ──────────────────────────────────────────── */
function ParentPage({ S, tasks, setTasks, goals, setPage, rewards, setRewards, athletes: athletesProp, setAthletes }) {
  const [tab, setTab] = useState('overview');
  const roster   = athletesProp || USERS;
  const athletes = roster.filter(u => u.role !== 'parent');
  const pct      = tasks.length>0 ? Math.round((tasks.filter(t=>t.done).length/tasks.length)*100) : 0;

  const adjAthletes = (id, field, delta, min=0) =>
    setAthletes(p => p.map(a => a.id===id ? {...a, [field]: Math.max(min, (a[field]||0)+delta)} : a));

  const AdjBtn = ({ onClick, label, color }) => (
    <button onClick={onClick}
      style={{ background:color+'22', border:`1px solid ${color}`, borderRadius:7, padding:'6px 12px', cursor:'pointer', color, fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:13, lineHeight:1 }}>
      {label}
    </button>
  );

  const TABS = [{id:'overview',l:'Overview'},{id:'adjust',l:'Streak & Points'},{id:'rewards',l:'Rewards'},{id:'tasks',l:'Tasks'}];

  return (
    <div>
      <SectionTitle>PARENT COMMAND</SectionTitle>
      <div style={{ color:S.sub, fontSize:15, marginBottom:22 }}>Oversee all athletes</div>

      <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:24 }}>
        {TABS.map(t => (
          <button key={t.id} onClick={()=>setTab(t.id)}
            style={{ background:tab===t.id?RED:S.card, border:`1px solid ${tab===t.id?RED:S.border}`, borderRadius:20, padding:'7px 18px', cursor:'pointer', color:tab===t.id?'#fff':S.sub, fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:12, letterSpacing:1, transition:'all 0.15s', textTransform:'uppercase' }}>
            {t.l}
          </button>
        ))}
        <button onClick={()=>setPage('family')}
          style={{ background:GOLD+'1a', border:`1px solid ${GOLD}`, borderRadius:20, padding:'7px 18px', cursor:'pointer', color:GOLD, fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:12, letterSpacing:1 }}>
          📺 FAMILY SCREEN
        </button>
      </div>

      {tab==='overview' && (
        <div style={{ display:'grid', gap:16 }}>
          {athletes.map(t => (
            <Card key={t.id} S={S}>
              <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:14 }}>
                <div style={{ fontSize:44 }}>{t.emoji}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"'Bebas Neue'", fontSize:26, letterSpacing:1 }}>{t.name}</div>
                  <div style={{ color:S.sub, fontSize:13 }}>{t.sport}{t.age ? ` · Age ${t.age}` : ''}</div>
                </div>
                <div style={{ textAlign:'right' }}>
                  <div style={{ fontFamily:"'Bebas Neue'", fontSize:40, color:pct>=70?GREEN:pct>=40?AMBER:RED, lineHeight:1 }}>{pct}%</div>
                  <div style={{ fontSize:11, color:S.sub }}>today</div>
                </div>
              </div>
              <Bar v={pct} color={pct>=70?GREEN:pct>=40?AMBER:RED} h={10} bg={S.card2} />
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginTop:14 }}>
                {[{l:'STREAK',v:`${t.streak||0}🔥`,c:GOLD},{l:'POINTS',v:t.points||0,c:RED},{l:'EARNED',v:`$${rewards[t.id]||0}`,c:GREEN}].map((s,i)=>(
                  <div key={i} style={{ background:S.card2, borderRadius:8, padding:'8px 0', textAlign:'center' }}>
                    <div style={{ fontWeight:700, color:s.c, fontSize:16 }}>{s.v}</div>
                    <div style={{ fontSize:10, color:S.sub, letterSpacing:1 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab==='adjust' && (
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          <div style={{ color:S.sub, fontSize:13, marginBottom:4 }}>Manually adjust streak days and total points for each athlete.</div>
          {athletes.map(a => (
            <Card key={a.id} S={S}>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:18 }}>
                <div style={{ fontSize:36 }}>{a.emoji}</div>
                <div>
                  <div style={{ fontFamily:"'Bebas Neue'", fontSize:22, letterSpacing:1 }}>{a.name}</div>
                  <div style={{ color:S.sub, fontSize:13 }}>{a.sport}</div>
                </div>
              </div>

              {/* Streak */}
              <div style={{ marginBottom:16 }}>
                <div style={{ fontSize:11, fontWeight:700, letterSpacing:2, color:S.sub, marginBottom:10 }}>🔥 STREAK — {a.streak||0} DAYS</div>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <AdjBtn onClick={()=>adjAthletes(a.id,'streak',-7)} label="-7" color={RED} />
                  <AdjBtn onClick={()=>adjAthletes(a.id,'streak',-1)} label="-1" color={RED} />
                  <div style={{ background:S.card2, borderRadius:8, padding:'6px 18px', fontFamily:"'Bebas Neue'", fontSize:24, color:GOLD, letterSpacing:1, display:'flex', alignItems:'center' }}>{a.streak||0}</div>
                  <AdjBtn onClick={()=>adjAthletes(a.id,'streak',1)} label="+1" color={GREEN} />
                  <AdjBtn onClick={()=>adjAthletes(a.id,'streak',7)} label="+7" color={GREEN} />
                  <button onClick={()=>setAthletes(p=>p.map(x=>x.id===a.id?{...x,streak:0}:x))}
                    style={{ background:'transparent', border:`1px solid ${S.border}`, borderRadius:7, padding:'6px 12px', cursor:'pointer', color:S.sub, fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:12 }}>
                    RESET
                  </button>
                </div>
              </div>

              {/* Points */}
              <div>
                <div style={{ fontSize:11, fontWeight:700, letterSpacing:2, color:S.sub, marginBottom:10 }}>⭐ POINTS — {a.points||0}</div>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <AdjBtn onClick={()=>adjAthletes(a.id,'points',-500)} label="-500" color={RED} />
                  <AdjBtn onClick={()=>adjAthletes(a.id,'points',-100)} label="-100" color={RED} />
                  <AdjBtn onClick={()=>adjAthletes(a.id,'points',-10)} label="-10" color={RED} />
                  <div style={{ background:S.card2, borderRadius:8, padding:'6px 18px', fontFamily:"'Bebas Neue'", fontSize:24, color:RED, letterSpacing:1, display:'flex', alignItems:'center' }}>{a.points||0}</div>
                  <AdjBtn onClick={()=>adjAthletes(a.id,'points',10)} label="+10" color={GREEN} />
                  <AdjBtn onClick={()=>adjAthletes(a.id,'points',100)} label="+100" color={GREEN} />
                  <AdjBtn onClick={()=>adjAthletes(a.id,'points',500)} label="+500" color={GREEN} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab==='rewards' && (
        <Card S={S}>
          <Label S={S}>Weekly Earnings</Label>
          {athletes.map(t => (
            <div key={t.id} style={{ display:'flex', alignItems:'center', gap:14, padding:'16px 0', borderBottom:`1px solid ${S.border}` }}>
              <div style={{ fontSize:36 }}>{t.emoji}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, fontSize:16 }}>{t.name}</div>
                <div style={{ color:GOLD, fontSize:16, fontWeight:700 }}>${rewards[t.id]||0} earned</div>
              </div>
              <div style={{ display:'flex', gap:8 }}>
                <button onClick={()=>setRewards(r=>({...r,[t.id]:(r[t.id]||0)+5}))}
                  style={{ background:GREEN+'22', border:`1px solid ${GREEN}`, borderRadius:8, padding:'8px 14px', cursor:'pointer', color:GREEN, fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:14 }}>+$5</button>
                <button onClick={()=>setRewards(r=>({...r,[t.id]:Math.max(0,(r[t.id]||0)-5)}))}
                  style={{ background:RED+'22', border:`1px solid ${RED}`, borderRadius:8, padding:'8px 14px', cursor:'pointer', color:RED, fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:14 }}>−$5</button>
              </div>
            </div>
          ))}
        </Card>
      )}

      {tab==='tasks' && (
        <Card S={S}>
          <Label S={S}>Current Task Board</Label>
          {tasks.map(t => (
            <div key={t.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'11px 0', borderBottom:`1px solid ${S.border}` }}>
              <div style={{ width:10, height:10, borderRadius:'50%', background:t.done?GREEN:RED, flexShrink:0 }} />
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:600 }}>{t.title}</div>
                <div style={{ fontSize:12, color:S.sub }}>{t.cat} · {t.priority} priority · {t.pts} pts</div>
              </div>
              <div style={{ fontSize:12, color:t.done?GREEN:S.sub, fontWeight:t.done?700:400 }}>{t.done?'✅ Done':'⏳ Pending'}</div>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}

/* ── FAMILY DASHBOARD (TV MODE) ───────────────────────────── */
function FamilyPage({ S: appS, setPage, tasks, goals, theme: appTheme, setTheme, athletes: athletesProp, user }) {
  const [time, setTime]  = useState(new Date());
  const [famTheme, setFamTheme] = useState(appTheme); // own local theme toggle
  useEffect(() => { const t=setInterval(()=>setTime(new Date()),1000); return ()=>clearInterval(t); },[]);

  const dark = famTheme === 'dark';
  const C = {
    bg:       dark ? '#000000'   : '#f0ece4',
    card:     dark ? '#0f0f0f'   : '#ffffff',
    card2:    dark ? '#111111'   : '#e8e3da',
    border:   dark ? '#1a1a1a'   : '#c8c2b8',
    text:     dark ? '#ffffff'   : '#0a0a0a',
    sub:      dark ? '#555555'   : '#444444',
    subCard:  dark ? '#444444'   : '#666666',
    barBg:    dark ? '#1a1a1a'   : '#d4cfc7',
    lbBorder: dark ? GOLD+'33'   : GOLD+'66',
    lbRowSep: dark ? '#111111'   : '#ddd8d0',
    exitClr:  dark ? '#444444'   : '#555555',
    exitBrd:  dark ? '#222222'   : '#c8c2b8',
  };

  const athletes = (athletesProp || USERS).filter(u => u.role !== 'parent');
  const pct      = tasks.length>0 ? Math.round((tasks.filter(t=>t.done).length/tasks.length)*100) : 0;

  return (
    <div style={{ minHeight:'100vh', background:C.bg, color:C.text, fontFamily:"'Rajdhani',sans-serif", padding:'28px 32px', transition:'background 0.3s,color 0.3s' }}>
      <FontLoader />

      {/* Header Row */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:36 }}>
        <div>
          <div style={{ fontFamily:"'Bebas Neue'", fontSize:52, color:RED, letterSpacing:5, lineHeight:1 }}>LEGACY LAB</div>
          <div style={{ color:GOLD, fontSize:13, letterSpacing:5, fontWeight:700 }}>FAMILY COMMAND CENTER</div>
        </div>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:8 }}>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontFamily:"'Bebas Neue'", fontSize:60, letterSpacing:2, lineHeight:1 }}>
              {time.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'})}
            </div>
            <div style={{ color:C.sub, fontSize:14, fontWeight:600 }}>{time.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})}</div>
          </div>
          <button onClick={()=>setFamTheme(t=>t==='dark'?'light':'dark')}
            style={{ background:'transparent', border:`1px solid ${C.border}`, color:C.sub, borderRadius:8, padding:'6px 14px', cursor:'pointer', fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:12, letterSpacing:1 }}>
            {famTheme==='dark'?'☀️ LIGHT MODE':'🌙 DARK MODE'}
          </button>
        </div>
      </div>

      {/* Family Progress Bar */}
      <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:'20px 24px', marginBottom:28 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
          <div style={{ fontSize:14, fontWeight:700, letterSpacing:3, color:C.sub }}>FAMILY COMPLETION TODAY</div>
          <div style={{ fontFamily:"'Bebas Neue'", fontSize:40, color:pct>=70?GREEN:pct>=40?AMBER:RED }}>{pct}%</div>
        </div>
        <Bar v={pct} color={pct>=70?GREEN:pct>=40?AMBER:RED} h={18} bg={C.barBg} />
      </div>

      {/* Athlete Cards */}
      <div style={{ display:'grid', gridTemplateColumns:`repeat(${Math.min(athletes.length,4)},1fr)`, gap:22, marginBottom:28 }}>
        {athletes.map(t => {
          const tc = pct>=70?GREEN:pct>=40?AMBER:RED;
          return (
            <div key={t.id} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:16, padding:'24px 20px', textAlign:'center' }}>
              <div style={{ fontSize:64, marginBottom:10 }}>{t.emoji}</div>
              <div style={{ fontFamily:"'Bebas Neue'", fontSize:30, letterSpacing:2, marginBottom:4, color:C.text }}>{t.name.toUpperCase()}</div>
              <div style={{ color:C.sub, fontSize:14, marginBottom:20, fontWeight:600 }}>{t.sport}</div>
              <div style={{ fontFamily:"'Bebas Neue'", fontSize:72, color:tc, lineHeight:1 }}>{pct}%</div>
              <div style={{ color:C.subCard, fontSize:13, marginBottom:18, fontWeight:600 }}>completion</div>
              <Bar v={pct} color={tc} h={8} bg={C.barBg} />
              <div style={{ display:'flex', justifyContent:'center', gap:24, marginTop:20 }}>
                <div>
                  <div style={{ fontFamily:"'Bebas Neue'", fontSize:30, color:GOLD }}>{t.streak||0}🔥</div>
                  <div style={{ fontSize:11, color:C.sub, letterSpacing:1, fontWeight:700 }}>STREAK</div>
                </div>
                <div>
                  <div style={{ fontFamily:"'Bebas Neue'", fontSize:30, color:RED }}>{t.points||0}</div>
                  <div style={{ fontSize:11, color:C.sub, letterSpacing:1, fontWeight:700 }}>POINTS</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Leaderboard */}
      <div style={{ background:C.card, border:`1px solid ${C.lbBorder}`, borderRadius:14, padding:'20px 24px', marginBottom:24 }}>
        <div style={{ fontSize:13, fontWeight:700, letterSpacing:3, color:GOLD, marginBottom:18 }}>🏆 WEEKLY LEADERBOARD</div>
        {[...athletes].sort((a,b)=>(b.points||0)-(a.points||0)).map((t,i) => (
          <div key={t.id} style={{ display:'flex', alignItems:'center', gap:16, padding:'14px 0', borderBottom:`1px solid ${C.lbRowSep}` }}>
            <div style={{ fontSize:30, width:36, textAlign:'center' }}>{['🥇','🥈','🥉'][i]||'④'}</div>
            <div style={{ fontSize:36 }}>{t.emoji}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:"'Bebas Neue'", fontSize:26, letterSpacing:1, color:C.text }}>{t.name}</div>
              <div style={{ color:C.sub, fontSize:13, fontWeight:600 }}>{t.sport} · {t.streak||0}-day streak 🔥</div>
            </div>
            <div style={{ fontFamily:"'Bebas Neue'", fontSize:40, color:GOLD }}>{t.points||0}</div>
          </div>
        ))}
      </div>

      <button onClick={()=>setPage(user?.role==='parent'?'parent':'dashboard')}
        style={{ background:'transparent', border:`1px solid ${C.exitBrd}`, borderRadius:8, padding:'9px 22px', cursor:'pointer', color:C.exitClr, fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:13 }}>
        ← EXIT FAMILY VIEW
      </button>
    </div>
  );
}
/* ═══════════════════════════════════════════════════════════════
   JOURNAL PAGE — Calendar UI
═══════════════════════════════════════════════════════════════ */
function JournalPage({ S, user, reflections, athletes: athletesProp }) {
  const [filmData]      = useLS('ll_film', {});
  const [typeFilter, setTypeFilter] = useState('all');
  const [personFilter, setPersonFilter] = useState('all');
  const [calYear,  setCalYear]  = useState(new Date().getFullYear());
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState(null); // 'YYYY-MM-DD'
  const isParent = user?.role === 'parent';
  const roster   = athletesProp || USERS;
  const athletes = roster.filter(u => u.role !== 'parent');

  const getName = (userId) => {
    const a = roster.find(a => a.id === userId);
    return a ? a.name : userId || 'Unknown';
  };
  const getEmoji = (userId) => {
    const a = roster.find(a => a.id === userId);
    return a?.emoji || '👤';
  };

  // Build all entries
  const allReflections = (reflections || [])
    .filter(r => isParent || r.userId === user?.id)
    .map(r => ({
      type: 'reflection', date: r.date?.slice(0,10), fullDate: r.date,
      userId: r.userId, pct: r.pct, data: r.reflection,
    }));

  const allFilm = Object.entries(filmData)
    .filter(([k, v]) => v && typeof v === 'object')
    .map(([key, val]) => ({
      type: 'film', key,
      title: val._title || key,
      date: val._savedAt?.slice(0,10),
      savedAt: val._savedAt,
      answers: FILM_Qs.map((q,i) => ({ q, a: val[i] || '' })).filter(x => x.a),
    }))
    .filter(e => e.answers.length > 0);

  const allEntries = [...allReflections, ...allFilm];

  // Apply filters
  const filtered = allEntries.filter(e => {
    if (typeFilter === 'reflections' && e.type !== 'reflection') return false;
    if (typeFilter === 'film' && e.type !== 'film') return false;
    if (isParent && personFilter !== 'all' && e.type === 'reflection' && e.userId !== personFilter) return false;
    return true;
  });

  // Days with entries in current month
  const daysWithEntries = {};
  filtered.forEach(e => {
    if (!e.date) return;
    const d = new Date(e.date + 'T12:00:00');
    if (d.getFullYear() === calYear && d.getMonth() === calMonth) {
      const key = e.date;
      if (!daysWithEntries[key]) daysWithEntries[key] = [];
      daysWithEntries[key].push(e);
    }
  });

  // Calendar grid
  const firstDay  = new Date(calYear, calMonth, 1).getDay();
  const daysInMon = new Date(calYear, calMonth+1, 0).getDate();
  const cells     = [];
  for (let i=0; i<firstDay; i++) cells.push(null);
  for (let d=1; d<=daysInMon; d++) cells.push(d);

  const toKey = (d) => {
    const m = String(calMonth+1).padStart(2,'0');
    const dd = String(d).padStart(2,'0');
    return `${calYear}-${m}-${dd}`;
  };

  const monthName = new Date(calYear, calMonth, 1).toLocaleDateString('en-US',{month:'long',year:'numeric'});
  const todayKey  = new Date().toISOString().slice(0,10);
  const selEntries = selectedDate ? (filtered.filter(e => e.date === selectedDate)) : [];

  // Export PDF uses currently-filtered entries
  const exportPDF = () => {
    const toShow = selectedDate ? selEntries : filtered.sort((a,b)=>(b.date||'').localeCompare(a.date||''));
    const rows = toShow.map(e => {
      if (e.type === 'reflection') {
        const d = e.data || {};
        return `<div class="entry">
          <div class="entry-meta">${new Date((e.fullDate||e.date)+'T12:00:00').toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}${isParent ? ' · '+getName(e.userId) : ''} · ${e.pct}% completion</div>
          <div class="entry-type">END-OF-DAY REFLECTION</div>
          ${d.good  ? '<div class="qa"><strong>What went well:</strong> '+d.good+'</div>' : ''}
          ${d.short ? '<div class="qa"><strong>Fell short:</strong> '+d.short+'</div>' : ''}
          ${d.tomorrow ? '<div class="qa"><strong>Improve tomorrow:</strong> '+d.tomorrow+'</div>' : ''}
        </div>`;
      } else {
        return `<div class="entry">
          <div class="entry-meta">${e.savedAt ? new Date(e.savedAt).toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'}) : 'No date'}</div>
          <div class="entry-type">FILM STUDY — ${e.title}</div>
          ${e.answers.map(({q,a}) => '<div class="qa"><strong>'+q+'</strong><br>'+a+'</div>').join('')}
        </div>`;
      }
    }).join('');

    const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
    <title>Legacy Lab Journal</title>
    <style>
      body{font-family:Georgia,serif;max-width:720px;margin:40px auto;color:#111;padding:0 20px}
      h1{font-size:32px;color:#C1121F;letter-spacing:3px;margin-bottom:4px}
      .subtitle{color:#888;font-size:13px;margin-bottom:32px;letter-spacing:2px}
      .entry{margin-bottom:32px;padding:20px;border:1px solid #ddd;border-radius:8px;page-break-inside:avoid}
      .entry-meta{font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px}
      .entry-type{font-size:14px;font-weight:bold;color:#C1121F;letter-spacing:1px;margin-bottom:12px;text-transform:uppercase}
      .qa{margin-bottom:10px;font-size:14px;line-height:1.7}
      @media print{body{margin:20px}}
    </style></head><body>
    <h1>LEGACY LAB</h1>
    <div class="subtitle">JOURNAL EXPORT · ${new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'})}</div>
    ${rows || '<p style="color:#888">No entries for this selection.</p>'}
    </body></html>`;
    const win = window.open('','_blank');
    win.document.write(html);
    win.document.close();
    setTimeout(()=>win.print(),400);
  };

  const EntryCard = ({e, i}) => (
    <Card key={i} S={S} accent={e.type==='reflection'?GOLD:RED} style={{padding:'16px 18px'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:10,flexWrap:'wrap',gap:6}}>
        <div>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:2,color:e.type==='reflection'?GOLD:RED,textTransform:'uppercase',marginBottom:4}}>
            {e.type==='reflection' ? '📔 End-of-Day Reflection' : '🎥 Film Study'}
          </div>
          {e.type==='film' && <div style={{fontSize:13,fontWeight:700}}>{e.title}</div>}
        </div>
        <div style={{textAlign:'right'}}>
          {isParent && e.type==='reflection' && (
            <div style={{fontSize:13,fontWeight:700,marginBottom:2}}>{getEmoji(e.userId)} {getName(e.userId)}</div>
          )}
          {e.type==='reflection' && <div style={{fontSize:12,fontWeight:700,color:e.pct>=70?GREEN:e.pct>=40?AMBER:RED}}>{e.pct}% complete</div>}
        </div>
      </div>
      {e.type==='reflection' ? (
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {[['What went well',e.data?.good],['Fell short',e.data?.short],['Improve tomorrow',e.data?.tomorrow]]
            .filter(([,v])=>v).map(([label,val])=>(
              <div key={label}>
                <div style={{fontSize:11,fontWeight:700,color:S.sub,letterSpacing:1,textTransform:'uppercase',marginBottom:3}}>{label}</div>
                <div style={{fontSize:14,lineHeight:1.65}}>{val}</div>
              </div>
            ))}
        </div>
      ) : (
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {e.answers.map(({q,a})=>(
            <div key={q}>
              <div style={{fontSize:11,fontWeight:700,color:S.sub,letterSpacing:1,textTransform:'uppercase',marginBottom:3}}>{q}</div>
              <div style={{fontSize:14,lineHeight:1.65}}>{a}</div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );

  return (
    <div style={{maxWidth:720}}>
      {/* Header */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:6,flexWrap:'wrap',gap:10}}>
        <SectionTitle>JOURNAL</SectionTitle>
        <Btn sm onClick={exportPDF} color={GOLD}>📄 EXPORT PDF</Btn>
      </div>
      <div style={{color:S.sub,fontSize:15,marginBottom:20}}>
        {isParent ? 'All athlete reflections and film study notes.' : 'Your daily reflections and film study notes.'}
      </div>

      {/* Filters */}
      <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:isParent?12:20}}>
        {[{id:'all',l:'All'},{id:'reflections',l:'Reflections'},{id:'film',l:'Film Study'}].map(f=>(
          <button key={f.id} onClick={()=>{setTypeFilter(f.id);setSelectedDate(null);}}
            style={{padding:'7px 16px',background:typeFilter===f.id?RED:S.card,color:typeFilter===f.id?'#fff':S.sub,border:`1px solid ${typeFilter===f.id?RED:S.border}`,borderRadius:20,cursor:'pointer',fontFamily:"'Rajdhani',sans-serif",fontWeight:700,fontSize:12,letterSpacing:1,transition:'all 0.15s'}}>
            {f.l.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Parent: person filter */}
      {isParent && (
        <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:20}}>
          <button onClick={()=>{setPersonFilter('all');setSelectedDate(null);}}
            style={{padding:'6px 14px',background:personFilter==='all'?GOLD+'22':'transparent',color:personFilter==='all'?GOLD:S.sub,border:`1px solid ${personFilter==='all'?GOLD:S.border}`,borderRadius:20,cursor:'pointer',fontFamily:"'Rajdhani',sans-serif",fontWeight:700,fontSize:12}}>
            ALL ATHLETES
          </button>
          {athletes.map(a=>(
            <button key={a.id} onClick={()=>{setPersonFilter(a.id);setSelectedDate(null);}}
              style={{padding:'6px 14px',background:personFilter===a.id?GOLD+'22':'transparent',color:personFilter===a.id?GOLD:S.sub,border:`1px solid ${personFilter===a.id?GOLD:S.border}`,borderRadius:20,cursor:'pointer',fontFamily:"'Rajdhani',sans-serif",fontWeight:700,fontSize:12}}>
              {a.emoji} {a.name.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {/* Calendar */}
      <Card S={S} style={{marginBottom:20}}>
        {/* Month nav */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
          <button onClick={()=>{const d=new Date(calYear,calMonth-1,1);setCalYear(d.getFullYear());setCalMonth(d.getMonth());setSelectedDate(null);}}
            style={{background:'transparent',border:`1px solid ${S.border}`,borderRadius:8,padding:'6px 14px',cursor:'pointer',color:S.sub,fontFamily:"'Rajdhani',sans-serif",fontWeight:700,fontSize:14}}>
            ‹
          </button>
          <div style={{fontFamily:"'Bebas Neue'",fontSize:22,letterSpacing:2}}>{monthName.toUpperCase()}</div>
          <button onClick={()=>{const d=new Date(calYear,calMonth+1,1);setCalYear(d.getFullYear());setCalMonth(d.getMonth());setSelectedDate(null);}}
            style={{background:'transparent',border:`1px solid ${S.border}`,borderRadius:8,padding:'6px 14px',cursor:'pointer',color:S.sub,fontFamily:"'Rajdhani',sans-serif",fontWeight:700,fontSize:14}}>
            ›
          </button>
        </div>

        {/* Day-of-week headers */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:4,marginBottom:6}}>
          {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d=>(
            <div key={d} style={{textAlign:'center',fontSize:11,fontWeight:700,letterSpacing:1,color:S.sub,padding:'4px 0'}}>{d}</div>
          ))}
        </div>

        {/* Day cells */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:4}}>
          {cells.map((day, idx) => {
            if (!day) return <div key={idx} />;
            const key   = toKey(day);
            const hasEnt = daysWithEntries[key]?.length > 0;
            const isSel  = selectedDate === key;
            const isTdy  = key === todayKey;
            const cnt    = daysWithEntries[key]?.length || 0;
            const typeDots = daysWithEntries[key]
              ? [...new Set(daysWithEntries[key].map(e=>e.type))]
              : [];
            return (
              <button key={idx} onClick={()=>setSelectedDate(isSel ? null : key)}
                style={{
                  position:'relative',padding:'8px 4px',minHeight:48,background:isSel?RED:isTdy?RED+'18':hasEnt?S.card2:'transparent',
                  border:`1px solid ${isSel?RED:isTdy?RED+'44':hasEnt?S.border:'transparent'}`,
                  borderRadius:8,cursor:hasEnt?'pointer':'default',textAlign:'center',transition:'all 0.15s',
                }}>
                <div style={{fontSize:13,fontWeight:isTdy||isSel?700:400,color:isSel?'#fff':isTdy?RED:S.text}}>{day}</div>
                {hasEnt && (
                  <div style={{display:'flex',justifyContent:'center',gap:3,marginTop:4}}>
                    {typeDots.map(t=>(
                      <div key={t} style={{width:6,height:6,borderRadius:'50%',background:t==='reflection'?GOLD:RED,opacity:isSel?0.9:0.7}} />
                    ))}
                    {cnt > 1 && <div style={{fontSize:9,color:isSel?'rgba(255,255,255,0.8)':S.sub,fontWeight:700,marginLeft:1}}>{cnt}</div>}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div style={{display:'flex',gap:16,marginTop:14,paddingTop:12,borderTop:`1px solid ${S.border}`}}>
          <div style={{display:'flex',alignItems:'center',gap:6}}>
            <div style={{width:8,height:8,borderRadius:'50%',background:GOLD}} />
            <span style={{fontSize:11,color:S.sub,fontWeight:600,letterSpacing:1}}>REFLECTION</span>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:6}}>
            <div style={{width:8,height:8,borderRadius:'50%',background:RED}} />
            <span style={{fontSize:11,color:S.sub,fontWeight:600,letterSpacing:1}}>FILM STUDY</span>
          </div>
          <div style={{marginLeft:'auto',fontSize:11,color:S.sub}}>{Object.keys(daysWithEntries).length} day{Object.keys(daysWithEntries).length!==1?'s':''} this month</div>
        </div>
      </Card>

      {/* Selected date entries */}
      {selectedDate && (
        <div>
          <div style={{fontFamily:"'Bebas Neue'",fontSize:22,letterSpacing:1,marginBottom:14,color:RED}}>
            {new Date(selectedDate+'T12:00:00').toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'}).toUpperCase()}
            <span style={{fontSize:14,fontWeight:400,fontFamily:"'Rajdhani',sans-serif",color:S.sub,marginLeft:12}}>{selEntries.length} entr{selEntries.length!==1?'ies':'y'}</span>
          </div>
          {selEntries.length === 0 ? (
            <Card S={S} style={{textAlign:'center',padding:28}}>
              <div style={{color:S.sub}}>No entries match your current filters for this date.</div>
            </Card>
          ) : (
            <div style={{display:'flex',flexDirection:'column',gap:12}}>
              {selEntries.map((e,i) => <EntryCard key={i} e={e} i={i} />)}
            </div>
          )}
        </div>
      )}

      {/* No-date selected: show recent entries */}
      {!selectedDate && (
        <div>
          <div style={{fontFamily:"'Bebas Neue'",fontSize:20,letterSpacing:1,marginBottom:14,color:S.sub}}>
            ALL ENTRIES — {filtered.length} TOTAL
          </div>
          {filtered.length === 0 ? (
            <Card S={S} style={{textAlign:'center',padding:40}}>
              <div style={{fontSize:36,marginBottom:12}}>📓</div>
              <div style={{fontFamily:"'Bebas Neue'",fontSize:22,letterSpacing:1,marginBottom:8}}>NO ENTRIES YET</div>
              <div style={{color:S.sub,fontSize:14}}>Reflections from clock-out and film study answers will appear here.</div>
            </Card>
          ) : (
            <div style={{display:'flex',flexDirection:'column',gap:12}}>
              {[...filtered].sort((a,b)=>(b.date||'').localeCompare(a.date||'')).map((e,i)=><EntryCard key={i} e={e} i={i} />)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SETUP PAGE
═══════════════════════════════════════════════════════════════ */
function SetupPage({ S, user, athletes, setAthletes, films, setFilms, devos, setDevos, appConfig, setAppConfig, setTasks, setGoals }) {
  const isParent = user?.role === 'parent';
  const [tab, setTab] = useState(isParent ? 'athletes' : 'tasks');

  const ALL_TABS = [
    { id:'athletes',  icon:'👤', label:'Athletes',     parentOnly: true  },
    { id:'app',       icon:'⚙️', label:'App Settings', parentOnly: true  },
    { id:'tasks',     icon:'📋', label:'Task Templates',parentOnly: false },
    { id:'training',  icon:'🏋🏾', label:'Training',    parentOnly: false },
    { id:'devos',     icon:'📖', label:'Devotionals',  parentOnly: false },
    { id:'films',     icon:'🎥', label:'Film Library', parentOnly: false },
  ];

  const TABS = isParent ? ALL_TABS : ALL_TABS.filter(t => !t.parentOnly);

  const TabBtn = ({ id, icon, label }) => (
    <button onClick={() => setTab(id)}
      style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 16px', background: tab===id ? RED : 'transparent', color: tab===id ? '#fff' : S.sub, border:`1px solid ${tab===id ? RED : S.border}`, borderRadius:8, cursor:'pointer', fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:13, letterSpacing:1, whiteSpace:'nowrap', transition:'all 0.18s' }}>
      <span>{icon}</span>{label.toUpperCase()}
    </button>
  );

  return (
    <div>
      <SectionTitle>SETUP & CONFIGURATION</SectionTitle>
      <div style={{ color:S.sub, fontSize:15, marginBottom:24 }}>
        {isParent ? 'Manage everything for your family — athletes, content, and app settings.' : 'Personalize your task templates, training drills, devotionals, and film library.'}
      </div>

      <div style={{ display:'flex', gap:8, marginBottom:28, flexWrap:'wrap' }}>
        {TABS.map(t => <TabBtn key={t.id} {...t} />)}
      </div>

      {tab === 'athletes'  && <AthletesTab  S={S} athletes={athletes} setAthletes={setAthletes} />}
      {tab === 'app'       && <AppTab       S={S} appConfig={appConfig} setAppConfig={setAppConfig} setTasks={setTasks} setGoals={setGoals} setAthletes={setAthletes} setFilms={setFilms} setDevos={setDevos} />}
      {tab === 'tasks'     && <TasksTab     S={S} setTasks={setTasks} />}
      {tab === 'training'  && <TrainingTab  S={S} />}
      {tab === 'devos'     && <DevosTab     S={S} devos={devos} setDevos={setDevos} />}
      {tab === 'films'     && <FilmsTab     S={S} films={films} setFilms={setFilms} />}
    </div>
  );
}

/* ── SETUP: ATHLETES ────────────────────────────────────────── */
function AthletesTab({ S, athletes, setAthletes }) {
  const blank = { id:'', name:'', role:'athlete', sport:'Basketball', age:15, emoji:'🏀', pin:'', points:0, streak:0 };
  const [editing, setEditing] = useState(null); // null | 'new' | athlete.id
  const [form, setForm]       = useState(blank);
  const [pinErr, setPinErr]   = useState('');

  const openNew  = () => { setForm({...blank, id: Date.now().toString()}); setEditing('new'); setPinErr(''); };
  const openEdit = (a) => { setForm({...a}); setEditing(a.id); setPinErr(''); };
  const cancel   = () => { setEditing(null); };

  const save = () => {
    if (!form.name.trim()) return;
    if (!/^\d{4}$/.test(form.pin)) { setPinErr('PIN must be exactly 4 digits'); return; }
    if (editing === 'new') {
      setAthletes(p => [...p, form]);
    } else {
      setAthletes(p => p.map(a => a.id === form.id ? form : a));
    }
    setEditing(null);
  };

  const remove = (id) => {
    const nonParents = athletes.filter(a => a.role !== 'parent');
    if (nonParents.length <= 1 && athletes.find(a=>a.id===id)?.role !== 'parent') return;
    setAthletes(p => p.filter(a => a.id !== id));
  };

  const F = ({ label, children }) => (
    <div style={{ marginBottom:16 }}>
      <Label S={S}>{label}</Label>
      {children}
    </div>
  );

  if (editing !== null) return (
    <div style={{ maxWidth:480 }}>
      <div style={{ fontFamily:"'Bebas Neue'", fontSize:26, letterSpacing:1, marginBottom:20 }}>
        {editing === 'new' ? 'ADD ATHLETE' : 'EDIT ATHLETE'}
      </div>

      <Card S={S}>
        <F label="Name">
          <Input S={S} value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} placeholder="First name" />
        </F>
        <F label="Role">
          <div style={{ display:'flex', gap:10 }}>
            {['athlete','parent'].map(r => (
              <button key={r} onClick={()=>setForm(p=>({...p,role:r}))}
                style={{ flex:1, padding:'12px 0', background: form.role===r ? RED : 'transparent', color: form.role===r ? '#fff' : S.sub, border:`1px solid ${form.role===r ? RED : S.border}`, borderRadius:8, cursor:'pointer', fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:14, transition:'all 0.15s' }}>
                {r === 'athlete' ? '🏆 ATHLETE' : '👨‍💼 PARENT'}
              </button>
            ))}
          </div>
        </F>
        {form.role === 'athlete' && (
          <>
            <F label="Sport">
              <Select S={S} value={form.sport} onChange={e=>setForm(p=>({...p,sport:e.target.value}))} options={SPORTS} />
            </F>
            <F label="Age">
              <Input S={S} type="number" value={form.age} onChange={e=>setForm(p=>({...p,age:parseInt(e.target.value)||14}))} />
            </F>
          </>
        )}
        <F label="Avatar Emoji">
          <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:6 }}>
            {EMOJIS.map(e => (
              <button key={e} onClick={()=>setForm(p=>({...p,emoji:e}))}
                style={{ fontSize:28, padding:6, background: form.emoji===e ? RED+'22' : 'transparent', border:`2px solid ${form.emoji===e ? RED : 'transparent'}`, borderRadius:8, cursor:'pointer', lineHeight:1 }}>
                {e}
              </button>
            ))}
          </div>
        </F>
        <F label="4-Digit PIN">
          <Input S={S} type="password" value={form.pin} onChange={e=>{ setForm(p=>({...p,pin:e.target.value})); setPinErr(''); }} placeholder="e.g. 1234" style={{ letterSpacing:8, fontSize:20 }} />
          {pinErr && <div style={{ color:RED, fontSize:12, marginTop:6 }}>{pinErr}</div>}
        </F>
      </Card>

      <div style={{ display:'flex', gap:12, marginTop:16 }}>
        <Btn onClick={save} full>SAVE ATHLETE</Btn>
        <Btn onClick={cancel} outline full>CANCEL</Btn>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth:640 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
        <div style={{ color:S.sub, fontSize:14 }}>{athletes.length} account{athletes.length!==1?'s':''} configured</div>
        <Btn onClick={openNew} sm>+ ADD ATHLETE</Btn>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {athletes.map(a => (
          <Card key={a.id} S={S} style={{ display:'flex', alignItems:'center', gap:16 }}>
            <div style={{ fontSize:42 }}>{a.emoji}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:700, fontSize:17, letterSpacing:1 }}>{a.name}</div>
              <div style={{ color:S.sub, fontSize:13, marginTop:2 }}>
                {a.role === 'parent' ? '👨‍💼 Parent Account' : `🏆 ${a.sport} · Age ${a.age} · ${a.streak||0}🔥 streak`}
              </div>
              <div style={{ color:S.sub, fontSize:12, marginTop:2 }}>PIN: {'●'.repeat(4)}</div>
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <Btn sm outline onClick={()=>openEdit(a)}>EDIT</Btn>
              <button onClick={()=>remove(a.id)} disabled={athletes.length<=1}
                style={{ background:'transparent', border:`1px solid ${RED}44`, color:RED, borderRadius:8, padding:'8px 14px', cursor: athletes.length<=1 ? 'not-allowed' : 'pointer', fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:12, opacity: athletes.length<=1 ? 0.3 : 1 }}>
                REMOVE
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ── SETUP: APP SETTINGS ────────────────────────────────────── */
function AppTab({ S, appConfig, setAppConfig, setTasks, setGoals, setAthletes, setFilms, setDevos }) {
  const [cfg, setCfg] = useState(appConfig);
  const [resetConfirm, setResetConfirm] = useState(false);
  const [saved, setSaved] = useState(false);

  const save = () => {
    setAppConfig(cfg);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const fullReset = () => {
    if (resetConfirm) {
      setTasks(DEFAULT_TASKS);
      setGoals(DEFAULT_GOALS);
      setAthletes(USERS);
      setFilms(DEFAULT_FILMS);
      setDevos(DEVOS);
      setAppConfig(DEFAULT_CONFIG);
      setCfg(DEFAULT_CONFIG);
      // (localStorage reset calls removed, not available in this environment)
      setResetConfirm(false);
    } else {
      setResetConfirm(true);
      setTimeout(() => setResetConfirm(false), 5000);
    }
  };

  return (
    <div style={{ maxWidth:480 }}>
      <Card S={S} style={{ marginBottom:16 }}>
        <div style={{ fontFamily:"'Bebas Neue'", fontSize:20, letterSpacing:1, marginBottom:16 }}>GENERAL</div>
        <Label S={S}>Family Name</Label>
        <Input S={S} value={cfg.familyName} onChange={e=>setCfg(p=>({...p,familyName:e.target.value}))} placeholder="e.g. The Johnson Family" style={{ marginBottom:16 }} />

        <Label S={S}>Reward Amount Per Task ($)</Label>
        <Input S={S} type="number" value={cfg.rewardPer} onChange={e=>setCfg(p=>({...p,rewardPer:parseInt(e.target.value)||0}))} placeholder="5" style={{ marginBottom:16 }} />

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 0', borderTop:`1px solid ${S.border}` }}>
          <div>
            <div style={{ fontWeight:700, fontSize:15 }}>ADHD Mode</div>
            <div style={{ color:S.sub, fontSize:13 }}>Show only the next task — minimal distractions</div>
          </div>
          <button onClick={()=>setCfg(p=>({...p,adhdMode:!p.adhdMode}))}
            style={{ width:52, height:28, borderRadius:99, background: cfg.adhdMode ? RED : S.muted, border:'none', cursor:'pointer', position:'relative', transition:'background 0.2s', flexShrink:0 }}>
            <span style={{ position:'absolute', top:3, left: cfg.adhdMode ? 26 : 3, width:22, height:22, background:'#fff', borderRadius:'50%', transition:'left 0.2s' }} />
          </button>
        </div>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 0', borderTop:`1px solid ${S.border}` }}>
          <div>
            <div style={{ fontWeight:700, fontSize:15 }}>YouTube Film Library</div>
            <div style={{ color:S.sub, fontSize:13 }}>Allow athletes to watch YouTube videos in Film Hub</div>
          </div>
          <button onClick={()=>setCfg(p=>({...p,allowYouTube:!p.allowYouTube}))}
            style={{ width:52, height:28, borderRadius:99, background: cfg.allowYouTube!==false ? GREEN : S.muted, border:'none', cursor:'pointer', position:'relative', transition:'background 0.2s', flexShrink:0 }}>
            <span style={{ position:'absolute', top:3, left: cfg.allowYouTube!==false ? 26 : 3, width:22, height:22, background:'#fff', borderRadius:'50%', transition:'left 0.2s' }} />
          </button>
        </div>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 0', borderTop:`1px solid ${S.border}` }}>
          <div>
            <div style={{ fontWeight:700, fontSize:15 }}>Video File Uploads</div>
            <div style={{ color:S.sub, fontSize:13 }}>Allow athletes to upload their own video files</div>
          </div>
          <button onClick={()=>setCfg(p=>({...p,allowUpload:!p.allowUpload}))}
            style={{ width:52, height:28, borderRadius:99, background: cfg.allowUpload!==false ? GREEN : S.muted, border:'none', cursor:'pointer', position:'relative', transition:'background 0.2s', flexShrink:0 }}>
            <span style={{ position:'absolute', top:3, left: cfg.allowUpload!==false ? 26 : 3, width:22, height:22, background:'#fff', borderRadius:'50%', transition:'left 0.2s' }} />
          </button>
        </div>
      </Card>

      <div style={{ display:'flex', gap:12, marginBottom:24 }}>
        <Btn onClick={save} full>{saved ? '✓ SAVED!' : 'SAVE SETTINGS'}</Btn>
      </div>

      <Card S={S} style={{ borderColor: RED+'44', background: RED+'08' }}>
        <div style={{ fontFamily:"'Bebas Neue'", fontSize:20, letterSpacing:1, marginBottom:10, color:RED }}>DANGER ZONE</div>
        <div style={{ color:S.sub, fontSize:13, marginBottom:16, lineHeight:1.6 }}>
          This will reset ALL data — athletes, tasks, goals, films, devotionals, and progress — back to the original demo content. This cannot be undone.
        </div>
        <button onClick={fullReset}
          style={{ background: resetConfirm ? RED : 'transparent', color: resetConfirm ? '#fff' : RED, border:`2px solid ${RED}`, borderRadius:8, padding:'12px 24px', cursor:'pointer', fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:14, letterSpacing:1, transition:'all 0.2s' }}>
          {resetConfirm ? '⚠️ TAP AGAIN TO CONFIRM RESET' : 'RESET ALL DATA TO DEFAULTS'}
        </button>
      </Card>
    </div>
  );
}

/* ── SETUP: TASK TEMPLATES ──────────────────────────────────── */
function TasksTab({ S, setTasks }) {
  const [localTasks, setLocalTasks] = useLS('ll_task_templates', DEFAULT_TASKS);
  const [editing, setEditing]       = useState(null);
  const [form, setForm]             = useState({});
  const [saved, setSaved]           = useState(false);

  const blank = { id: Date.now(), title:'', cat:'Academics', priority:'medium', time:'8:00 AM', done:false, pts:50 };

  const openNew  = () => { setForm({...blank, id: Date.now()}); setEditing('new'); };
  const openEdit = (t) => { setForm({...t}); setEditing(t.id); };
  const cancel   = () => setEditing(null);

  const save = () => {
    if (!form.title.trim()) return;
    const updated = editing === 'new' ? [...localTasks, form] : localTasks.map(t => t.id===form.id ? form : t);
    setLocalTasks(updated);
    setEditing(null);
  };

  const remove = (id) => setLocalTasks(p => p.filter(t => t.id !== id));

  const applyToday = () => {
    setTasks(localTasks.map(t => ({...t, done: false})));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (editing !== null) return (
    <div style={{ maxWidth:480 }}>
      <div style={{ fontFamily:"'Bebas Neue'", fontSize:26, letterSpacing:1, marginBottom:20 }}>{editing==='new'?'NEW TASK TEMPLATE':'EDIT TASK'}</div>
      <Card S={S}>
        <Label S={S}>Task Title</Label>
        <Input S={S} value={form.title} onChange={e=>setForm(p=>({...p,title:e.target.value}))} placeholder="e.g. Complete Algebra homework" style={{ marginBottom:14 }} />

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:14 }}>
          <div>
            <Label S={S}>Category</Label>
            <Select S={S} value={form.cat} onChange={e=>setForm(p=>({...p,cat:e.target.value}))} options={Object.keys(CAT_COLORS)} />
          </div>
          <div>
            <Label S={S}>Priority</Label>
            <Select S={S} value={form.priority} onChange={e=>setForm(p=>({...p,priority:e.target.value}))} options={['high','medium','low']} />
          </div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          <div>
            <Label S={S}>Time</Label>
            <Input S={S} value={form.time} onChange={e=>setForm(p=>({...p,time:e.target.value}))} placeholder="3:00 PM" />
          </div>
          <div>
            <Label S={S}>Points</Label>
            <Input S={S} type="number" value={form.pts} onChange={e=>setForm(p=>({...p,pts:parseInt(e.target.value)||10}))} />
          </div>
        </div>
      </Card>
      <div style={{ display:'flex', gap:12, marginTop:16 }}>
        <Btn onClick={save} full>SAVE TASK</Btn>
        <Btn onClick={cancel} outline full>CANCEL</Btn>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth:640 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
        <div style={{ color:S.sub, fontSize:14 }}>{localTasks.length} task templates</div>
        <div style={{ display:'flex', gap:10 }}>
          <Btn sm outline onClick={applyToday}>{saved ? '✓ APPLIED!' : 'APPLY TO TODAY'}</Btn>
          <Btn sm onClick={openNew}>+ ADD TASK</Btn>
        </div>
      </div>
      <div style={{ color:S.sub, fontSize:12, marginBottom:16 }}>Templates are the default tasks loaded each day. "Apply to Today" resets the current day's mission board.</div>
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {localTasks.map(t => (
          <Card key={t.id} S={S} accent={CAT_COLORS[t.cat]} style={{ display:'flex', alignItems:'center', gap:12, padding:'14px 16px' }}>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:700, fontSize:15 }}>{t.title}</div>
              <div style={{ color:S.sub, fontSize:12, marginTop:3 }}>{t.cat} · {t.priority} · {t.time} · {t.pts}pts</div>
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <Btn sm outline onClick={()=>openEdit(t)}>EDIT</Btn>
              <button onClick={()=>remove(t.id)}
                style={{ background:'transparent', border:`1px solid ${RED}44`, color:RED, borderRadius:8, padding:'8px 14px', cursor:'pointer', fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:12 }}>✕</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ── SETUP: TRAINING ────────────────────────────────────────── */
function TrainingTab({ S }) {
  const [plans, setPlans] = useLS('ll_training_plans', TRAINING_PLANS);
  const [sport, setSport] = useState('Basketball');
  const [type, setType]   = useState(0);
  const [editDrill, setEditDrill] = useState(null);
  const [newDrill, setNewDrill]   = useState('');
  const [saved, setSaved]         = useState(false);

  const sportOptions = Object.keys(plans);
  const currentPlan = plans[sport] || [];
  const block = currentPlan[type] || { type:'Skill', drills:[], duration:'30 min' };

  const addDrill = () => {
    if (!newDrill.trim()) return;
    const updated = currentPlan.map((b,i) => i===type ? {...b, drills:[...b.drills, newDrill.trim()]} : b);
    setPlans(p => ({...p, [sport]: updated}));
    setNewDrill('');
  };

  const removeDrill = (di) => {
    const updated = currentPlan.map((b,i) => i===type ? {...b, drills: b.drills.filter((_,j)=>j!==di)} : b);
    setPlans(p => ({...p, [sport]: updated}));
  };

  const updateDrill = (di, val) => {
    const updated = currentPlan.map((b,i) => i===type ? {...b, drills: b.drills.map((d,j)=>j===di?val:d)} : b);
    setPlans(p => ({...p, [sport]: updated}));
    setEditDrill(null);
  };

  const updateDuration = (val) => {
    const updated = currentPlan.map((b,i) => i===type ? {...b, duration: val} : b);
    setPlans(p => ({...p, [sport]: updated}));
  };

  const addSport = () => {
    const name = prompt('New sport name:');
    if (!name || plans[name]) return;
    setPlans(p => ({...p, [name]: [
      { type:'Skill', drills:['Add your first drill'], duration:'30 min' },
      { type:'Strength', drills:['Add your first exercise'], duration:'30 min' },
      { type:'Conditioning', drills:['Add your first conditioning drill'], duration:'20 min' },
    ]}));
    setSport(name);
  };

  return (
    <div style={{ maxWidth:620 }}>
      <div style={{ display:'flex', gap:10, marginBottom:16, flexWrap:'wrap', alignItems:'center' }}>
        {sportOptions.map(s => (
          <button key={s} onClick={()=>{setSport(s);setType(0);}}
            style={{ padding:'9px 18px', background:sport===s?RED:'transparent', color:sport===s?'#fff':S.sub, border:`1px solid ${sport===s?RED:S.border}`, borderRadius:8, cursor:'pointer', fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:13, transition:'all 0.18s' }}>
            {s.toUpperCase()}
          </button>
        ))}
        <button onClick={addSport}
          style={{ padding:'9px 14px', background:'transparent', color:GOLD, border:`1px solid ${GOLD}`, borderRadius:8, cursor:'pointer', fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:13 }}>
          + ADD SPORT
        </button>
      </div>

      <div style={{ display:'flex', gap:8, marginBottom:20 }}>
        {currentPlan.map((b,i) => (
          <button key={i} onClick={()=>setType(i)}
            style={{ padding:'8px 16px', background:type===i?GOLD+'22':'transparent', color:type===i?GOLD:S.sub, border:`1px solid ${type===i?GOLD:S.border}`, borderRadius:8, cursor:'pointer', fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:13 }}>
            {b.type.toUpperCase()}
          </button>
        ))}
      </div>

      <Card S={S} style={{ marginBottom:16 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
          <div style={{ fontFamily:"'Bebas Neue'", fontSize:22, letterSpacing:1 }}>{block.type} DRILLS</div>
          <div style={{ display:'flex', gap:8, alignItems:'center' }}>
            <span style={{ color:S.sub, fontSize:13 }}>Duration:</span>
            <input value={block.duration} onChange={e=>updateDuration(e.target.value)}
              style={{ background:S.card2, border:`1px solid ${S.border}`, borderRadius:6, padding:'6px 10px', color:S.text, fontFamily:"'Rajdhani',sans-serif", fontSize:13, width:90 }} />
          </div>
        </div>

        {block.drills.map((d,di) => (
          <div key={di} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
            {editDrill===di ? (
              <input autoFocus defaultValue={d} onBlur={e=>updateDrill(di,e.target.value)} onKeyDown={e=>{if(e.key==='Enter')updateDrill(di,e.target.value);}}
                style={{ flex:1, background:S.card2, border:`1px solid ${RED}`, borderRadius:6, padding:'9px 12px', color:S.text, fontFamily:"'Rajdhani',sans-serif", fontSize:14 }} />
            ) : (
              <div onClick={()=>setEditDrill(di)} style={{ flex:1, padding:'9px 12px', background:S.card2, borderRadius:6, fontSize:14, cursor:'pointer', border:`1px solid ${S.border}` }}>
                {d}
                <span style={{ color:S.sub, fontSize:11, marginLeft:8 }}>✏️ tap to edit</span>
              </div>
            )}
            <button onClick={()=>removeDrill(di)}
              style={{ background:'transparent', border:`1px solid ${RED}44`, color:RED, borderRadius:6, padding:'8px 12px', cursor:'pointer', fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:12 }}>✕</button>
          </div>
        ))}

        <div style={{ display:'flex', gap:8, marginTop:12 }}>
          <input value={newDrill} onChange={e=>setNewDrill(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')addDrill();}} placeholder="Add new drill..."
            style={{ flex:1, background:S.card2, border:`1px solid ${S.border}`, borderRadius:6, padding:'10px 12px', color:S.text, fontFamily:"'Rajdhani',sans-serif", fontSize:14 }} />
          <Btn sm onClick={addDrill}>+ ADD</Btn>
        </div>
      </Card>
      <div style={{ color:S.sub, fontSize:12 }}>💡 Tap any drill to edit it inline. Changes save automatically.</div>
    </div>
  );
}

/* ── SETUP: DEVOTIONALS ─────────────────────────────────────── */
function DevosTab({ S, devos, setDevos }) {
  const [editing, setEditing] = useState(null);
  const [form, setForm]       = useState({});

  const blank = { id:Date.now(), ref:'', verse:'', msg:'', action:'' };
  const openNew  = () => { setForm({...blank, id:Date.now()}); setEditing('new'); };
  const openEdit = (d) => { setForm({...d}); setEditing(d.id); };
  const cancel   = () => setEditing(null);

  const save = () => {
    if (!form.ref.trim() || !form.verse.trim()) return;
    const updated = editing === 'new' ? [...devos, form] : devos.map(d => d.id===form.id ? form : d);
    setDevos(updated);
    setEditing(null);
  };

  if (editing !== null) return (
    <div style={{ maxWidth:560 }}>
      <div style={{ fontFamily:"'Bebas Neue'", fontSize:26, letterSpacing:1, marginBottom:20 }}>{editing==='new'?'NEW DEVOTIONAL':'EDIT DEVOTIONAL'}</div>
      <Card S={S} style={{ display:'flex', flexDirection:'column', gap:14 }}>
        <div><Label S={S}>Scripture Reference (e.g. John 3:16)</Label><Input S={S} value={form.ref} onChange={e=>setForm(p=>({...p,ref:e.target.value}))} placeholder="Book Chapter:Verse" /></div>
        <div>
          <Label S={S}>Verse Text</Label>
          <textarea value={form.verse} onChange={e=>setForm(p=>({...p,verse:e.target.value}))} placeholder="The full scripture text..."
            style={{ width:'100%', background:S.card2, border:`1px solid ${S.border}`, borderRadius:8, padding:'12px 14px', color:S.text, fontFamily:"'Rajdhani',sans-serif", fontSize:14, resize:'none', height:80 }} />
        </div>
        <div>
          <Label S={S}>Reflection / Message</Label>
          <textarea value={form.msg} onChange={e=>setForm(p=>({...p,msg:e.target.value}))} placeholder="Coach-voice message to the athlete..."
            style={{ width:'100%', background:S.card2, border:`1px solid ${S.border}`, borderRadius:8, padding:'12px 14px', color:S.text, fontFamily:"'Rajdhani',sans-serif", fontSize:14, resize:'none', height:90 }} />
        </div>
        <div>
          <Label S={S}>Action Step</Label>
          <Input S={S} value={form.action} onChange={e=>setForm(p=>({...p,action:e.target.value}))} placeholder="What should the athlete DO today?" />
        </div>
      </Card>
      <div style={{ display:'flex', gap:12, marginTop:16 }}>
        <Btn onClick={save} full>SAVE DEVOTIONAL</Btn>
        <Btn onClick={cancel} outline full>CANCEL</Btn>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth:640 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
        <div style={{ color:S.sub, fontSize:14 }}>{devos.length} devotional{devos.length!==1?'s':''} · rotates daily</div>
        <Btn sm onClick={openNew}>+ ADD DEVOTIONAL</Btn>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {devos.map((d,i) => (
          <Card key={d.id||i} S={S} accent={GOLD} style={{ padding:'14px 16px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
              <div style={{ flex:1 }}>
                <div style={{ color:GOLD, fontWeight:700, fontSize:13, letterSpacing:1, marginBottom:4 }}>{d.ref}</div>
                <div style={{ fontSize:14, fontStyle:'italic', marginBottom:6, lineHeight:1.5 }}>"{d.verse}"</div>
                <div style={{ color:S.sub, fontSize:13 }}>{d.msg?.slice(0,80)}{d.msg?.length>80?'...':''}</div>
              </div>
              <div style={{ display:'flex', gap:8, marginLeft:12 }}>
                <Btn sm outline onClick={()=>openEdit(d)}>EDIT</Btn>
                {devos.length > 1 && (
                  <button onClick={()=>setDevos(p=>p.filter((_,j)=>j!==i))}
                    style={{ background:'transparent', border:`1px solid ${RED}44`, color:RED, borderRadius:8, padding:'8px 12px', cursor:'pointer', fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:12 }}>✕</button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ── SETUP: FILMS ───────────────────────────────────────────── */
function FilmsTab({ S, films, setFilms }) {
  const [editing, setEditing] = useState(null);
  const [form, setForm]       = useState({});

  const blank = { id:Date.now(), title:'', url:'', topic:'Skill Development' };
  const TOPICS = ['Skill Development','Mindset','Film Study','Strength & Conditioning','Leadership','Other'];

  const openNew  = () => { setForm({...blank, id:Date.now()}); setEditing('new'); };
  const openEdit = (f) => { setForm({...f}); setEditing(f.id); };
  const cancel   = () => setEditing(null);

  const normalizeUrl = (raw) => {
    // Convert standard YouTube URL to embed
    const match = raw.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (match) return `https://www.youtube.com/embed/${match[1]}`;
    return raw; // assume already an embed URL
  };

  const save = () => {
    if (!form.title.trim() || !form.url.trim()) return;
    const saved = {...form, url: normalizeUrl(form.url)};
    const updated = editing === 'new' ? [...films, saved] : films.map(f => f.id===form.id ? saved : f);
    setFilms(updated);
    setEditing(null);
  };

  if (editing !== null) return (
    <div style={{ maxWidth:520 }}>
      <div style={{ fontFamily:"'Bebas Neue'", fontSize:26, letterSpacing:1, marginBottom:20 }}>{editing==='new'?'ADD FILM':'EDIT FILM'}</div>
      <Card S={S} style={{ display:'flex', flexDirection:'column', gap:14 }}>
        <div><Label S={S}>Video Title</Label><Input S={S} value={form.title} onChange={e=>setForm(p=>({...p,title:e.target.value}))} placeholder="e.g. Steph Curry Ball Handling Breakdown" /></div>
        <div>
          <Label S={S}>YouTube URL or Embed URL</Label>
          <Input S={S} value={form.url} onChange={e=>setForm(p=>({...p,url:e.target.value}))} placeholder="https://www.youtube.com/watch?v=..." />
          <div style={{ color:S.sub, fontSize:11, marginTop:6 }}>Paste any YouTube link — it'll be converted automatically.</div>
        </div>
        <div><Label S={S}>Topic / Category</Label><Select S={S} value={form.topic} onChange={e=>setForm(p=>({...p,topic:e.target.value}))} options={TOPICS} /></div>
      </Card>
      <div style={{ display:'flex', gap:12, marginTop:16 }}>
        <Btn onClick={save} full>SAVE FILM</Btn>
        <Btn onClick={cancel} outline full>CANCEL</Btn>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth:640 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
        <div style={{ color:S.sub, fontSize:14 }}>{films.length} video{films.length!==1?'s':''} in library</div>
        <Btn sm onClick={openNew}>+ ADD FILM</Btn>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {films.map((f,i) => (
          <Card key={f.id||i} S={S} style={{ display:'flex', alignItems:'center', gap:12, padding:'14px 16px' }}>
            <div style={{ fontSize:28 }}>🎥</div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:700, fontSize:15 }}>{f.title}</div>
              <div style={{ color:S.sub, fontSize:12, marginTop:2 }}>{f.topic}</div>
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <Btn sm outline onClick={()=>openEdit(f)}>EDIT</Btn>
              {films.length > 1 && (
                <button onClick={()=>setFilms(p=>p.filter((_,j)=>j!==i))}
                  style={{ background:'transparent', border:`1px solid ${RED}44`, color:RED, borderRadius:8, padding:'8px 12px', cursor:'pointer', fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:12 }}>✕</button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════════════════════ */
function AthleteDevelopmentApp({ onBack, siteUser }) {
  const [loaded, setLoaded] = useState(!siteUser); // if no siteUser, skip loading and behave as before
  const [theme, setTheme]           = useLS('ll_theme', 'dark');
  const [user, setUser]             = useState(null);
  const [page, setPage]             = useState(siteUser ? 'loading' : 'login');
  const [clockedIn, setClockedIn]   = useState(false);
  const [clockTime, setClockTime]   = useState(null);
  const [focus, setFocus]           = useState('');
  const [tasks, setTasks]           = useState(DEFAULT_TASKS);
  const [goals, setGoals]           = useState(DEFAULT_GOALS);
  const [reflections, setReflections] = useState([]);
  const [rewards, setRewards]       = useLS('ll_rewards', { marcus:0, jordan:0, zion:0 });
  const [athletes, setAthletes]     = useLS('ll_athletes', USERS);
  const [films, setFilms]           = useLS('ll_films', DEFAULT_FILMS);
  const [devos, setDevos]           = useLS('ll_devos', DEVOS);
  const [appConfig, setAppConfig]   = useLS('ll_config', DEFAULT_CONFIG);

  // Real, per-student data for the core daily loop (tasks, goals, clock
  // status). Rewards, the multi-athlete family roster, films, devotionals,
  // and app config are still local-only, that's a real, scoped-out gap,
  // not a silent one, see README.
  useEffect(() => {
    if (!siteUser) return;
    (async () => {
      try {
        const [tasksRes, goalsRes, statusRes, configRes] = await Promise.all([
          fetch("/api/athlete/tasks", { credentials: "include" }),
          fetch("/api/athlete/goals", { credentials: "include" }),
          fetch("/api/athlete/status", { credentials: "include" }),
          fetch("/api/athlete/config", { credentials: "include" }),
        ]);
        const tasksData = tasksRes.ok ? await tasksRes.json() : { tasks: [] };
        const goalsData = goalsRes.ok ? await goalsRes.json() : { goals: [] };
        const statusData = statusRes.ok ? await statusRes.json() : { status: {} };
        const configData = configRes.ok ? await configRes.json() : { config: null };

        // A brand-new student has no tasks/goals rows yet, seed them with
        // the same defaults the standalone app used to start with, so the
        // dashboard isn't empty on day one.
        if (tasksData.tasks && tasksData.tasks.length > 0) {
          setTasks(tasksData.tasks.map((t) => ({ id: t.id, title: t.title, cat: t.cat, priority: t.priority, time: t.time, done: t.done, pts: t.pts })));
        }
        if (goalsData.goals && goalsData.goals.length > 0) {
          setGoals(goalsData.goals.map((g) => ({ id: g.id, title: g.title, cat: g.cat, deadline: g.deadline, progress: g.progress })));
        }
        if (configData.config) {
          setAppConfig(configData.config);
        }
        const status = statusData.status || {};
        setClockedIn(!!status.clockedIn);
        setClockTime(status.clockTime || null);

        const sport = status.sport || 'Basketball';
        setUser({ id: siteUser.studentId, name: siteUser.name, role: 'athlete', sport, emoji: '🏀', points: 0, streak: 0 });
        setPage(status.clockedIn ? 'dashboard' : 'clockin');
      } catch (e) {
        setUser({ id: siteUser.studentId, name: siteUser.name, role: 'athlete', sport: 'Basketball', emoji: '🏀', points: 0, streak: 0 });
        setPage('clockin');
      }
      setLoaded(true);
    })();
  }, [siteUser]);

  // Save settings changes back to the real record for this student, once
  // the initial load has completed (so we don't immediately overwrite a
  // fresh load with the pre-load default object).
  useEffect(() => {
    if (!siteUser || !loaded) return;
    const timeout = setTimeout(() => {
      fetch("/api/athlete/config", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appConfig),
      }).catch(() => {});
    }, 800);
    return () => clearTimeout(timeout);
  }, [siteUser, loaded, appConfig]);

  const dark = theme === 'dark';
  const S = {
    dark,
    bg:      dark ? '#16121F' : '#FFFFFF',
    card:    dark ? '#221C33' : '#FFF8F3',
    card2:   dark ? '#2D2247' : '#FFE2C7',
    topbar:  dark ? 'rgba(22,18,31,0.92)' : 'rgba(255,255,255,0.92)',
    sidebar: dark ? '#16121F' : '#FFF8F3',
    border:  dark ? '#3C3455' : '#F0D6BC',
    text:    dark ? '#FBF8FF' : '#141414',
    sub:     dark ? '#C4BCDA' : '#5C4A40',
    muted:   dark ? '#3C3455' : '#D6BBA6',
  };

  const completed = tasks.filter(t=>t.done).length;
  const pct       = tasks.length>0 ? Math.round((completed/tasks.length)*100) : 0;
  const devoPool  = devos && devos.length > 0 ? devos : DEVOS;
  const devo      = devoPool[new Date().getDay() % devoPool.length];

  // Real per-student status, replacing the old window.storage snapshot
  // (which only ever worked inside a Claude artifact). Debounced so
  // rapid task toggles don't fire a request per click.
  useEffect(() => {
    if (!user || !siteUser) return;
    const timeout = setTimeout(() => {
      fetch("/api/athlete/status", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sport: user.sport, clockedIn, clockTime }),
      }).catch(() => {});
    }, 600);
    return () => clearTimeout(timeout);
  }, [user, siteUser, clockedIn, clockTime]);

  const handleLogin = (u) => {
    setUser(u);
    if (u.role==='parent') { setPage('parent'); return; }
    setPage(clockedIn ? 'dashboard' : 'clockin');
  };

  const handleClockIn = () => {
    setClockedIn(true); setClockTime(new Date().toISOString()); setPage('devotional');
  };

  const handleClockOut = (ref) => {
    setClockedIn(false);
    setReflections(p=>[...p,{date:new Date().toISOString(),userId:user?.id,reflection:ref,pct}]);
    if (siteUser) {
      fetch("/api/athlete/status", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sport: user?.sport, clockedIn: false, clockTime: null, reflection: ref, pct }),
      }).catch(() => {});
    }
    setPage('clockin');
  };

  const toggleTask = (id) => {
    setTasks(p=>p.map(t=>t.id===id?{...t,done:!t.done}:t));
    if (siteUser) {
      const target = tasks.find((t) => t.id === id);
      fetch("/api/athlete/tasks", {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, done: !target?.done }),
      }).catch(() => {});
    }
  };

  if (!loaded) {
    return (
      <div style={{minHeight:'100vh',background:'#FFFFFF',color:'#141414',fontFamily:"Verdana, Geneva, sans-serif",display:'flex',alignItems:'center',justifyContent:'center'}}>
        Loading...
      </div>
    );
  }

  if (page==='login') return <LoginPage S={S} onLogin={handleLogin} theme={theme} setTheme={setTheme} athletes={athletes} onBack={onBack} />;
  if (page==='family') return (
    <FamilyPage S={S} setPage={setPage} tasks={tasks} goals={goals} theme={theme} setTheme={setTheme} athletes={athletes} user={user} />
  );

  const sharedProps = { S, user, page, setPage, tasks, setTasks, goals, setGoals, pct, completed, focus, setFocus, rewards, setRewards, reflections, theme, setTheme, toggleTask, athletes, setAthletes, films, setFilms, devos, setDevos, appConfig, setAppConfig, siteUser };

  return (
    <div style={{ background:S.bg, minHeight:'100vh', color:S.text, fontFamily:"'Rajdhani',sans-serif", transition:'background 0.3s,color 0.3s' }}>
      <FontLoader />
      <TopBar S={S} user={user} page={page} setPage={setPage} theme={theme} setTheme={setTheme} clockedIn={clockedIn} pct={pct} onLogout={()=>{setUser(null);setPage('login');}} onBack={onBack} />
      <div style={{ display:'flex', minHeight:'calc(100vh - 58px)' }}>
        <Sidebar S={S} page={page} setPage={setPage} user={user} />
        <main style={{ flex:1, padding:'32px 28px', overflowX:'hidden', paddingBottom:100, maxWidth: 900 }}>
          {page==='clockin'    && <ClockInPage    {...sharedProps} clockedIn={clockedIn} onClockIn={handleClockIn} onClockOut={handleClockOut} />}
          {page==='devotional' && <DevotionalPage {...sharedProps} devo={devo} onContinue={()=>setPage('dashboard')} />}
          {page==='dashboard'  && <DashboardPage  {...sharedProps} appConfig={appConfig} />}
          {page==='mission'    && <MissionPage    {...sharedProps} />}
          {page==='training'   && <TrainingPage   {...sharedProps} />}
          {page==='goals'      && <GoalsPage      {...sharedProps} />}
          {page==='coach'      && <CoachPage      {...sharedProps} />}
          {page==='film'       && <FilmPage       {...sharedProps} films={films} appConfig={appConfig} />}
          {page==='report'     && <ReportPage     {...sharedProps} />}
          {page==='parent'     && <ParentPage     {...sharedProps} />}
          {page==='journal'    && <JournalPage    {...sharedProps} />}
          {page==='setup'      && <SetupPage      {...sharedProps} />}
        </main>
      </div>
      <BottomNav S={S} page={page} setPage={setPage} user={user} />
    </div>
  );
}

// ─── 30-DAY PROGRAM DATA ───────────────────────────────────────────────────

export default AthleteDevelopmentApp;
