import React, { useState, useEffect } from "react";
import { Loader2, ChevronLeft, Lock, ArrowLeft } from "lucide-react";
import { CATALOG } from "../content/catalog";
import { getCompletedLessons } from "./lessonProgress";

function MasteryScreen() {
  const [loaded, setLoaded] = useState(false);
  const [artifacts, setArtifacts] = useState([]);

  useEffect(() => {
    (async () => {
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

  const analysisScore = artifacts.find((a) => a.skill === "Analysis")?.score;
  const applicationPassed = artifacts.some((a) => a.skill === "Application" && a.mastered);

  const DIMENSIONS = [
    { key: "knowledge", label: "Knowledge", status: "Not yet assessed" },
    { key: "application", label: "Application", status: applicationPassed ? "Demonstrated" : "Not yet assessed" },
    { key: "analysis", label: "Analysis", status: analysisScore !== undefined ? `${analysisScore} / 4 on most recent evidence` : "Not yet assessed" },
    { key: "synthesis", label: "Synthesis", status: "Not yet assessed" },
    { key: "creation", label: "Creation", status: "Not yet assessed" },
  ];

  return (
    <main className="px-5 md:px-10 py-8 max-w-2xl mx-auto fade-in">
      <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "var(--gold)" }}>Learn</div>
      <h1 className="font-display font-800 text-2xl mb-2">Mastery Dashboard</h1>
      <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>Mastery is tracked separately from completion. Finishing an activity is not the same as mastering the skill behind it.</p>

      {!loaded ? (
        <div className="flex items-center gap-2 text-sm" style={{ color: "var(--muted2)" }}><Loader2 size={15} className="animate-spin" /> Loading...</div>
      ) : (
        <div className="flex flex-col gap-3">
          {DIMENSIONS.map((d) => (
            <div key={d.key} className="flex items-center justify-between rounded-2xl px-5 py-4" style={{ background: "var(--surface)", border: "1.5px solid var(--border)" }}>
              <div className="font-display font-700 text-sm">{d.label}</div>
              <div className="text-xs font-bold" style={{ color: d.status.includes("Not yet") ? "var(--muted2)" : "var(--gold)" }}>{d.status}</div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

// ─── COURSE CATALOG / MY COURSES / COURSE OVERVIEW ──────────────────────────
function CourseCatalog({ onOpenCourse }) {
  return (
    <main className="px-5 md:px-10 py-8 max-w-3xl mx-auto fade-in">
      <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "var(--gold)" }}>Learn</div>
      <h1 className="font-display font-800 text-2xl mb-6">Course Catalog</h1>
      <div className="flex flex-col gap-3">
        {CATALOG.map((c) => (
          <button key={c.id} onClick={() => onOpenCourse(c.id)} className="w-full text-left rounded-2xl px-5 py-4" style={{ background: "var(--surface)", border: "1.5px solid var(--border)" }}>
            <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "var(--gold)" }}>{c.subject}</div>
            <div className="font-display font-700 text-base mb-1">{c.title}</div>
            <div className="text-xs" style={{ color: "var(--muted2)" }}>{c.meta}</div>
          </button>
        ))}
      </div>
    </main>
  );
}

function CourseOverview({ courseId, onBack, onOpenLesson }) {
  const course = CATALOG.find((c) => c.id === courseId);
  const [openUnit, setOpenUnit] = useState(1);
  const [completed, setCompleted] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const list = await getCompletedLessons();
      setCompleted(list);
      setLoaded(true);
    })();
  }, []);

  if (!course) return null;
  return (
    <main className="px-5 md:px-10 py-8 max-w-3xl mx-auto fade-in">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm mb-6" style={{ color: "var(--muted2)" }}><ArrowLeft size={16} /> Course catalog</button>
      <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "var(--gold)" }}>{course.subject}</div>
      <h1 className="font-display font-800 text-2xl mb-1">{course.title}</h1>
      <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>{course.meta}</p>

      <div className="flex flex-col gap-2">
        {course.units.map((u) => (
          <div key={u.id} className="rounded-2xl overflow-hidden" style={{ background: "var(--surface)", border: "1.5px solid var(--border)" }}>
            <button onClick={() => setOpenUnit(openUnit === u.id ? null : u.id)} className="w-full text-left px-5 py-4 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold" style={{ color: "var(--muted2)" }}>Unit {u.id}{u.range ? ` · ${u.range}` : ""}</div>
                <div className="font-display font-700 text-sm">{u.title}</div>
              </div>
              <ChevronLeft size={16} style={{ transform: openUnit === u.id ? "rotate(90deg)" : "rotate(-90deg)", color: "var(--muted2)" }} />
            </button>
            {openUnit === u.id && (
              <div className="px-5 pb-4 fade-in">
                {u.lessons.length === 0 ? (
                  <p className="text-xs" style={{ color: "var(--muted2)" }}>Lessons for this unit aren't broken out yet.</p>
                ) : (
                  <div className="flex flex-col gap-1.5">
                    {u.lessons.map((l, idx) => {
                      const builtLessonsBefore = u.lessons.slice(0, idx).filter((x) => x.built);
                      const prevUnbuilt = builtLessonsBefore.find((x) => !completed.includes(x.specKey));
                      const locked = !!prevUnbuilt;
                      const done = l.built && completed.includes(l.specKey);
                      return (
                        <button
                          key={l.day}
                          disabled={!l.built}
                          onClick={() => l.built && loaded && onOpenLesson(l.specKey, locked, prevUnbuilt?.label)}
                          className="w-full flex items-center justify-between text-left rounded-xl px-3 py-2.5 text-sm"
                          style={{ background: l.built ? "var(--surface-alt)" : "transparent", color: l.built ? "var(--ink)" : "var(--muted2)", cursor: l.built ? "pointer" : "default" }}
                        >
                          <span>Day {l.day}, {l.label}</span>
                          {!l.built ? <Lock size={13} /> : done ? <span className="text-xs font-bold" style={{ color: "var(--gold)" }}>Done</span> : locked ? <span className="text-xs font-bold flex items-center gap-1" style={{ color: "var(--muted2)" }}><Lock size={11} /> Preview</span> : <span className="text-xs font-bold" style={{ color: "var(--gold)" }}>Start</span>}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}

function MyCourses({ onOpenCourse }) {
  return (
    <main className="px-5 md:px-10 py-8 max-w-3xl mx-auto fade-in">
      <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "var(--gold)" }}>Learn</div>
      <h1 className="font-display font-800 text-2xl mb-6">My Courses</h1>
      <div className="flex flex-col gap-3">
        {CATALOG.map((c) => (
          <button key={c.id} onClick={() => onOpenCourse(c.id)} className="w-full text-left rounded-2xl px-5 py-4 flex items-center justify-between" style={{ background: "var(--surface)", border: "1.5px solid var(--border)" }}>
            <div>
              <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "var(--gold)" }}>{c.subject}</div>
              <div className="font-display font-700 text-base">{c.title}</div>
            </div>
            <span className="text-xs font-bold" style={{ color: "var(--gold)" }}>Continue →</span>
          </button>
        ))}
      </div>
    </main>
  );
}

function LearnHome({ tab, setTab, onOpenCourse, activeCourse, onBackFromCourse, onOpenLesson }) {
  if (activeCourse) return <CourseOverview courseId={activeCourse} onBack={onBackFromCourse} onOpenLesson={onOpenLesson} />;
  return (
    <div>
      <div className="px-5 md:px-10 pt-6 flex gap-2">
        {["My Courses", "Catalog", "Mastery"].map((t) => (
          <button key={t} onClick={() => setTab(t)} className="text-sm font-bold px-3 py-1.5 rounded-full" style={{ background: tab === t ? "var(--ink)" : "var(--surface)", color: tab === t ? "#FFFFFF" : "var(--muted2)", border: "1.5px solid var(--border)" }}>{t}</button>
        ))}
      </div>
      {tab === "My Courses" && <MyCourses onOpenCourse={onOpenCourse} />}
      {tab === "Catalog" && <CourseCatalog onOpenCourse={onOpenCourse} />}
      {tab === "Mastery" && <MasteryScreen />}
    </div>
  );
}

// ─── HOME + FOCUS MODE ────────────────────────────────────────────────────────

export { MasteryScreen, CourseCatalog, CourseOverview, MyCourses, LearnHome };
