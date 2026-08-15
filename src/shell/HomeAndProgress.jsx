import React, { useState, useEffect } from "react";
import { Loader2, Clock, CheckCircle2, Lock } from "lucide-react";

import { getCompletedLessons } from "./lessonProgress";

function FocusModeView({ flow, onOpenAction }) {
  const current = flow.find((f) => !f.done) || flow[0];
  const next = flow.find((f) => f !== current && !f.done);
  return (
    <main className="px-5 md:px-10 py-10 max-w-md mx-auto fade-in flex flex-col items-center text-center">
      <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "var(--gold)" }}>{current.category}</div>
      <h1 className="font-display font-800 text-2xl mb-2">{current.label}</h1>
      <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>Estimated time: {current.estMinutes} minutes</p>
      <button onClick={() => onOpenAction(current)} className="duo-btn w-full px-6 py-3.5 rounded-2xl text-sm font-bold mb-8" style={{ background: "var(--cta)", color: "var(--cta-ink)", boxShadow: "0 2px 8px rgba(20,20,20,0.16)" }}>
        {current.actionLabel}
      </button>
      {next && (
        <p className="text-xs" style={{ color: "var(--muted2)" }}>Next: {next.label}</p>
      )}
    </main>
  );
}

function HomeScreen({ focusMode, onNav, onOpenLesson }) {
  const [loaded, setLoaded] = useState(false);
  const [pdMissionsDone, setPdMissionsDone] = useState(0);
  const [athleteStatus, setAthleteStatus] = useState(null);
  const [mtStatus, setMtStatus] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const list = await getCompletedLessons();
        setPdMissionsDone(list.filter((k) => k.startsWith("PD_MISSION")).length);
      } catch (e) {}
      try {
        const res = await fetch("/api/athlete/status", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          if (data.status && (data.status.clockedIn || data.status.sport)) setAthleteStatus(data.status);
        }
      } catch (e) {}
      try {
        const res = await fetch("/api/mental-toughness", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          if (data.progress) setMtStatus(data.progress);
        }
      } catch (e) {}
      setLoaded(true);
    })();
  }, []);

  const flow = [
    { key: "history", category: "Academic", label: "The African American Experience, Nubia & Egypt", estMinutes: 30, actionLabel: "Start Lesson", done: false, go: () => onOpenLesson("aae", "AAE_LESSON") },
    { key: "math", category: "Academic", label: "Algebra I, One-Step Equations", estMinutes: 25, actionLabel: "Start Lesson", done: false, go: () => onOpenLesson("algebra1", "MATH_LESSON") },
    { key: "mt", category: "Development", label: mtStatus ? `Mental Toughness, Day ${(mtStatus.currentDay ?? 0) + 1}` : "Mental Toughness, Day 1", estMinutes: 15, actionLabel: "Continue", done: false, go: () => onNav("develop") },
    { key: "athlete", category: "Performance", label: athleteStatus ? `Training, ${athleteStatus.sport || "today's session"}` : "Training", estMinutes: 45, actionLabel: "Continue", done: !!athleteStatus?.clockedIn, go: () => onNav("perform") },
  ];

  if (focusMode && loaded) {
    return <FocusModeView flow={flow} onOpenAction={(item) => item.go()} />;
  }

  const streak = athleteStatus ? undefined : undefined;

  return (
    <main className="px-5 md:px-10 py-8 max-w-4xl mx-auto fade-in">
      <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "var(--gold)" }}>{new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}</div>
      <h1 className="font-display font-800 text-2xl md:text-3xl mb-6">Welcome back</h1>

      <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "var(--muted2)" }}>Today's Flow</div>
      {!loaded ? (
        <div className="flex items-center gap-2 text-sm mb-8" style={{ color: "var(--muted2)" }}><Loader2 size={15} className="animate-spin" /> Loading...</div>
      ) : (
        <div className="flex flex-col gap-2.5 mb-8">
          {flow.map((item) => (
            <button key={item.key} onClick={item.go} className="w-full flex items-center gap-3 text-left rounded-2xl px-4 py-3.5" style={{ background: "var(--surface)", border: "1.5px solid var(--border)", boxShadow: "0 2px 8px rgba(20,20,20,0.06)" }}>
              <div className="flex items-center justify-center rounded-full shrink-0" style={{ width: 34, height: 34, background: item.done ? "var(--gold)" : "var(--surface-alt)", color: item.done ? "#FFFFFF" : "var(--muted2)" }}>
                {item.done ? <CheckCircle2 size={16} /> : <Clock size={15} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--muted2)" }}>{item.category} · {item.estMinutes} min</div>
                <div className="text-sm font-bold truncate">{item.label}</div>
              </div>
              <div className="text-xs font-bold shrink-0" style={{ color: "var(--gold)" }}>{item.actionLabel} →</div>
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => onNav("learn")} className="text-left rounded-2xl px-4 py-4" style={{ background: "var(--surface)", border: "1.5px solid var(--border)" }}>
          <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--gold)" }}>Academic progress</div>
          <div className="text-sm font-bold">{pdStatus ? `Mission ${(pdStatus.completed?.length || 0) + 1} of 5` : "Get started"}</div>
        </button>
        <button onClick={() => onNav("perform")} className="text-left rounded-2xl px-4 py-4" style={{ background: "var(--surface)", border: "1.5px solid var(--border)" }}>
          <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--gold)" }}>Performance</div>
          <div className="text-sm font-bold">{athleteStatus ? `${athleteStatus.pct}% today` : "Not started"}</div>
        </button>
      </div>
    </main>
  );
}

// ─── PROGRESS ────────────────────────────────────────────────────────────────
function LifeBar({ label, pct, locked, note }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1.5">
        <span className="font-bold flex items-center gap-1.5" style={{ color: locked ? "var(--muted2)" : "var(--ink)" }}>
          {locked && <Lock size={11} />} {label}
        </span>
        <span className="font-bold" style={{ color: "var(--muted2)" }}>{locked ? note : `${Math.round(pct)}%`}</span>
      </div>
      <div className="w-full h-3 rounded-full" style={{ background: "var(--track, #F5E1CC)", border: "1.5px solid var(--border)" }}>
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: locked ? "var(--border)" : "var(--gold)", transition: "width 0.5s ease" }} />
      </div>
    </div>
  );
}

function ProgressScreen() {
  const [loaded, setLoaded] = useState(false);
  const [pdCompletedCount, setPdCompletedCount] = useState(0);
  const [pdStakes, setPdStakes] = useState(null);
  const [athleteStatus, setAthleteStatus] = useState(null);
  const [mtStatus, setMtStatus] = useState(null);
  const [artifacts, setArtifacts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const list = await getCompletedLessons();
        setPdCompletedCount(list.filter((k) => k.startsWith("PD_MISSION")).length);
      } catch (e) {}
      try {
        const res = await fetch("/api/stakes", { credentials: "include" });
        if (res.ok) setPdStakes(await res.json());
      } catch (e) {}
      try {
        const res = await fetch("/api/athlete/status", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          if (data.status) setAthleteStatus(data.status);
        }
      } catch (e) {}
      try {
        const res = await fetch("/api/mental-toughness", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          if (data.progress) setMtStatus(data.progress);
        }
      } catch (e) {}
      try {
        const res = await fetch("/api/portfolio", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setArtifacts(data.artifacts || []);
        }
      } catch (e) {}
      setLoaded(true);
    })();
  }, []);

  const rows = [
    { label: "Completion", value: loaded ? `${pdCompletedCount} of 5 Personal Development missions` : "..." },
    { label: "Mastery", value: loaded ? `${artifacts.length} portfolio artifact${artifacts.length === 1 ? "" : "s"} on record` : "..." },
    { label: "Performance", value: loaded ? (athleteStatus ? `${athleteStatus.pct}% of today's tasks` : "Not started") : "..." },
    { label: "Consistency", value: loaded ? (mtStatus ? `${Object.keys(mtStatus.completedDays || {}).length} of 30 Mental Toughness days` : "Not started") : "..." },
  ];

  const purposePct = Math.min(100, 8 + (pdStakes?.xp || 0) * 0.4);

  return (
    <main className="px-5 md:px-10 py-8 max-w-2xl mx-auto fade-in">
      <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "var(--gold)" }}>Progress</div>
      <h1 className="font-display font-800 text-2xl mb-6">Unified Progress</h1>
      <div className="flex flex-col gap-3 mb-8">
        {rows.map((r) => (
          <div key={r.label} className="rounded-2xl px-5 py-4" style={{ background: "var(--surface)", border: "1.5px solid var(--border)" }}>
            <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "var(--gold)" }}>{r.label}</div>
            <div className="text-sm font-bold">{r.value}</div>
          </div>
        ))}
      </div>

      <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "var(--muted2)" }}>Who you're becoming</div>
      <div className="rounded-2xl px-5 py-5 flex flex-col gap-3" style={{ background: "var(--surface)", border: "1.5px solid var(--border)" }}>
        <LifeBar label="Purpose" pct={purposePct} />
        <LifeBar label="Money" pct={6} locked note="Comes from a future course" />
        <LifeBar label="Relationships" pct={6} locked note="Comes from a future course" />
        <LifeBar label="Health" pct={6} locked note="Comes from a future course" />
      </div>
      {pdStakes && (
        <p className="text-xs mt-3" style={{ color: "var(--muted2)" }}>Purpose is driven by Personal Development XP ({pdStakes.xp} XP so far). The other three fill in as more courses get built, not faked ahead of time.</p>
      )}
    </main>
  );
}


export { FocusModeView, HomeScreen, ProgressScreen };
