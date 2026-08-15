import React from "react";
import { Sparkles, BookOpen, Flame, Trophy, Landmark, Users, Clock, TrendingUp } from "lucide-react";

const BRAND_THEME_CSS = `
  [data-theme="brand"] {
    --bg: #FFFFFF; --surface: #FFF8F3; --surface-alt: #FFE2C7; --surface-done: #FCE7E7;
    --border: #F0D6BC; --border-dim: #F7E9DA; --border-done: #FF8A2E; --border-crimson: #F3B3B3; --border-blue: #FFCB9C;
    --ink: #141414; --muted: #5C4A40; --muted2: #7A6154; --muted3: #241812; --placeholder: #D6BBA6; --villain: #A83535;
    --gold: #A83A0A; --blue: #000000;
    --crimson-bg: #FFE6E6; --crimson-text: #C81E2C; --wisdom-bg: #FFEEDD; --wisdom-text: #8C3D00;
    --developing: #D6182B; --success: #141414; --track: #F5E1CC; --toast-bg: #FFFFFF; --toast-border: #F0D6BC; --path-line: #F0D6BC;
    --cta: #FF7A1A; --cta-shadow: #C15A00; --cta-ink: #141414;
  }
`;

function ShellWrapper({ children }) {
  return (
    <div data-theme="brand" className="min-h-screen w-full" style={{ background: "var(--bg)", color: "var(--ink)", fontFamily: "Verdana, Geneva, sans-serif" }}>
      <style>{`
        .font-display { font-family: Verdana, Geneva, sans-serif; }
        @keyframes floatIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: floatIn 0.35s ease-out; }
        .duo-btn { border: none; cursor: pointer; transition: transform 0.12s ease, box-shadow 0.12s ease, opacity 0.12s ease; }
        .duo-btn:hover:not(:disabled) { transform: translateY(-1px); opacity: 0.94; }
        .duo-btn:active:not(:disabled) { transform: scale(0.97); opacity: 0.88; }
        ${BRAND_THEME_CSS}
      `}</style>
      {children}
    </div>
  );
}

// ─── REAL CURRICULUM DATA ────────────────────────────────────────────────────
// Unit-level data for all 10 units is real, pulled from the actual curriculum
// document. Full day-by-day lesson breakdowns only exist for Unit 1, where a
// lesson is actually built. Other units are listed honestly as not yet broken
// into lessons, not faked with placeholder day numbers.
const AAE_COURSE = {
  id: "aae", subjectId: "history", subject: "Social Studies",
  title: "The African American Experience",
  meta: "Grades 8 to 10 · One Semester · 17 Weeks · 68 Lessons",
  units: [
    { id: 1, title: "The African Homeland", range: "Beginnings to 1900s", chapters: "Chapters 1 to 3",
      lessons: [
        { day: 1, label: "Orientation & Diagnostic", built: false },
        { day: 2, label: "Unit 1 Opener, The African Homeland", built: false },
        { day: 3, label: "Ch.1a, Nubia & Egypt", built: true, specKey: "AAE_LESSON" },
        { day: 4, label: "Ch.1b, Religion, Heritage & the Great Pyramid", built: false },
        { day: 5, label: "Ch.2, West African Empires & Kingdoms", built: false },
        { day: 6, label: "Ch.3, East African Trading States", built: false },
        { day: 7, label: "Unit 1 Review & Writing", built: false },
      ] },
    { id: 2, title: "Africans in the Americas", range: "1500 to 1760s", chapters: "Chapters 4 to 6", lessons: [] },
    { id: 3, title: "African Americans and a New Nation", range: "1768 to 1840s", chapters: "Chapters 7 to 9", lessons: [] },
    { id: 4, title: "Free and Enslaved", range: "1619 to 1860", chapters: "Chapters 10 to 12", lessons: [] },
    { id: 5, title: "Challenges to Slavery", range: "1800 to 1860", chapters: "Chapters 13 to 15", lessons: [] },
    { id: 6, title: "Hope for a New Way of Life", range: "1820 to 1880", chapters: "Chapters 16 to 19", lessons: [] },
    { id: 7, title: "Freedom Without Equality", range: "1877 to 1910", chapters: "Chapters 20 to 22", lessons: [] },
    { id: 8, title: "Protest and Hope in a New Century", range: "1900 to 1941", chapters: "Chapters 23 to 27", lessons: [] },
    { id: 9, title: "The Civil Rights Revolution", range: "1941 to 1973", chapters: "Chapters 28 to 32", lessons: [] },
    { id: 10, title: "Building a New America", range: "1965 to Present", chapters: "Chapters 33 to 35", lessons: [] },
  ],
};

const MATH_COURSE = {
  id: "algebra1", subjectId: "math", subject: "Mathematics",
  title: "Algebra I",
  meta: "Unit 2, Solving Equations",
  units: [
    { id: 1, title: "Foundations", lessons: [] },
    { id: 2, title: "Solving Equations", lessons: [
      { day: 1, label: "One-Step Equations", built: true, specKey: "MATH_LESSON" },
    ] },
  ],
};

const CATALOG = [AAE_COURSE, MATH_COURSE];
const LESSON_SPECS = { AAE_LESSON, MATH_LESSON };

// ─── NAV ──────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { key: "home", label: "Home", Icon: Sparkles },
  { key: "learn", label: "Learn", Icon: BookOpen },
  { key: "develop", label: "Develop", Icon: Flame },
  { key: "perform", label: "Perform", Icon: Trophy },
  { key: "portfolio", label: "Portfolio", Icon: Landmark },
  { key: "progress", label: "Progress", Icon: TrendingUp },
  { key: "family", label: "Family", Icon: Users },
];
const MOBILE_NAV_ITEMS = [
  { key: "home", label: "Home", Icon: Sparkles },
  { key: "learn", label: "Learn", Icon: BookOpen },
  { key: "perform", label: "Train", Icon: Trophy },
  { key: "progress", label: "Progress", Icon: TrendingUp },
  { key: "more", label: "More", Icon: Users },
];

function AcademySidebar({ active, onNav, focusMode, setFocusMode, userName, onLogout }) {
  return (
    <aside className="hidden md:flex flex-col shrink-0" style={{ width: 208, borderRight: "1.5px solid var(--border)", background: "var(--surface)", minHeight: "100vh" }}>
      <div className="px-5 py-6">
        <div className="font-display font-800 text-sm" style={{ color: "var(--ink)" }}>LEGACY LAB</div>
        <div className="text-[10px] font-bold tracking-widest uppercase mt-0.5" style={{ color: "var(--gold)" }}>Academy</div>
      </div>
      <nav className="flex-1 px-3">
        {NAV_ITEMS.map((item) => (
          <button key={item.key} onClick={() => onNav(item.key)} className="w-full flex items-center gap-2.5 text-left rounded-xl px-3 py-2.5 mb-1 text-sm font-bold"
            style={{ background: active === item.key ? "var(--surface-alt)" : "transparent", color: active === item.key ? "var(--gold)" : "var(--muted)" }}>
            <item.Icon size={16} /> {item.label}
          </button>
        ))}
      </nav>
      <div className="px-3 pb-6">
        <button onClick={() => setFocusMode((f) => !f)} className="w-full flex items-center gap-2 text-left rounded-xl px-3 py-2.5 text-xs font-bold mb-2"
          style={{ background: focusMode ? "var(--ink)" : "var(--surface-alt)", color: focusMode ? "#FFFFFF" : "var(--muted2)" }}>
          <Clock size={14} /> {focusMode ? "Focus Mode: On" : "Focus Mode"}
        </button>
        {userName && (
          <div className="px-3 py-2">
            <div className="text-xs font-bold truncate" style={{ color: "var(--muted)" }}>{userName}</div>
            <button onClick={onLogout} className="text-xs underline" style={{ color: "var(--muted2)" }}>Log out</button>
          </div>
        )}
      </div>
    </aside>
  );
}

function MobileNav({ active, onNav }) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around py-2" style={{ background: "var(--surface)", borderTop: "1.5px solid var(--border)" }}>
      {MOBILE_NAV_ITEMS.map((item) => (
        <button key={item.key} onClick={() => onNav(item.key)} className="flex flex-col items-center gap-0.5 px-2 py-1" style={{ color: active === item.key || (item.key === "more" && ["family", "portfolio"].includes(active)) ? "var(--gold)" : "var(--muted2)" }}>
          <item.Icon size={18} />
          <span className="text-[10px] font-bold">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

function AcademyTopBar({ focusMode, setFocusMode }) {
  return (
    <div className="md:hidden flex items-center justify-between px-5 py-4" style={{ borderBottom: "1.5px solid var(--border)" }}>
      <div>
        <div className="font-display font-800 text-sm">LEGACY LAB</div>
        <div className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "var(--gold)" }}>Academy</div>
      </div>
      <button onClick={() => setFocusMode((f) => !f)} className="flex items-center gap-1.5 text-xs font-bold rounded-full px-3 py-1.5" style={{ background: focusMode ? "var(--ink)" : "var(--surface-alt)", color: focusMode ? "#FFFFFF" : "var(--muted2)" }}>
        <Clock size={13} /> Focus
      </button>
    </div>
  );
}

export { ShellWrapper, AcademySidebar, MobileNav, AcademyTopBar, NAV_ITEMS, MOBILE_NAV_ITEMS };
