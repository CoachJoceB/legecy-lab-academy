import React, { useState, useEffect } from "react";
import {
  BookOpen, Layers, Users, Hammer, Mic, Lock, CheckCircle2,
  Flame, Star, Trophy, ChevronLeft, Sparkles, Loader2, Check, X,
  TrendingDown, TrendingUp, Send, ArrowLeft,
} from "lucide-react";

const VALUES = [
  "Integrity", "Courage", "Discipline", "Faith", "Family", "Excellence",
  "Compassion", "Curiosity", "Resilience", "Service", "Loyalty", "Ambition",
];

const HOUSES = {
  purpose: { name: "House Purpose", motto: "I act.", color: "var(--crimson-text)", bg: "var(--crimson-bg)", border: "var(--border-crimson)" },
  wisdom: { name: "House Wisdom", motto: "I think.", color: "var(--wisdom-text)", bg: "var(--wisdom-bg)", border: "var(--border-blue)" },
};

const MISSIONS = [
  { id: "mon", num: 1, tag: "Learn", title: "The Cost of Character", quote: "You cannot stand for everything. Choose.", eq: "What does a value actually cost the person who holds it?", Icon: BookOpen },
  { id: "tue", num: 2, tag: "Practice", title: "Choosing Under Pressure", quote: "Every choice you avoid making gets made for you.", eq: "When two things I care about conflict, which one wins, and what do I lose either way?", Icon: Layers },
  { id: "wed", num: 3, tag: "Apply", title: "Borrowing Wisdom", quote: "Nobody builds their values alone.", eq: "Where did my values actually come from, and do they hold up under questioning?", Icon: Users },
  { id: "thu", num: 4, tag: "Lead", title: "Building Your Statement", quote: "Say it plain enough that it can be tested.", eq: "Can I write a statement specific enough that it couldn't apply to anyone else?", Icon: Hammer },
  { id: "fri", num: 5, tag: "Reflect", title: "Defending It", quote: "Words are cheap until someone pushes back.", eq: "Can my statement survive being challenged, not just spoken?", Icon: Mic },
];

const VILLAIN = { name: "Drift", tagline: "You'll figure out who you are later." };
const DRIFT_LINES = {
  mon: "You don't need to decide today.",
  tue: "Just pick whichever is easier.",
  wed: "Nobody else's story applies to you.",
  thu: "Generic is safe. Nobody can argue with vague.",
  fri: "Words are just words. No one's really listening.",
};

const DILEMMAS = [
  { id: "d1", prompt: "Your best friend copies your homework answers right before class and gets a good grade off it. Say something and you risk the friendship. Stay quiet and you're letting your own integrity slide. What do you do, and what does it cost you either way?", a: "Loyalty", b: "Integrity" },
  { id: "d2", prompt: "Your family needs you to watch your younger siblings the same night as a tryout that could change your entire athletic future. There's no rescheduling either one. What do you choose, and what do you lose by choosing it?", a: "Family", b: "Ambition" },
  { id: "d3", prompt: "Your friend group is mocking a kid who eats lunch alone. Saying something could make you the next target. Staying silent keeps you safe but goes against what you know is right. What do you do?", a: "Compassion", b: "Courage" },
];

const CASE_STUDY = `On March 2, 1955, fifteen-year-old Claudette Colvin was riding a bus home from high school in Montgomery, Alabama, when a bus driver ordered her to give up her seat to a white passenger. She refused. Police dragged her off the bus in handcuffs. This happened nine months before Rosa Parks did the same thing and became famous for it. Colvin's case was actually used in the federal lawsuit that legally ended bus segregation in Montgomery. Civil rights leaders at the time worried the public wouldn't rally behind a pregnant, unmarried teenager as their symbol, so her name mostly disappeared from the story for decades.`;

function wordCount(s) {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

async function callClaude(prompt, { json } = { json: true }) {
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    const data = await response.json();
    const raw = (data.content || []).filter((b) => b.type === "text").map((b) => b.text).join("\n");
    const clean = raw.replace(/```json|```/g, "").trim();
    if (json) {
      const parsed = JSON.parse(clean);
      if (!["Developing", "Proficient", "Exemplary"].includes(parsed.tier)) throw new Error("bad tier");
      return { tier: parsed.tier, feedback: parsed.feedback };
    }
    return clean;
  } catch (err) {
    if (json) return { tier: "Proficient", feedback: "Coach feedback is temporarily unavailable, so this was scored on checklist completion only." };
    return "The Coach is offline right now; try again in a moment.";
  }
}

const TIER_XP = { Developing: 0, Proficient: 20, Exemplary: 40 };
const TIER_HOUSE = { Developing: -5, Proficient: 5, Exemplary: 15 };
const TIER_COLOR = { Developing: "var(--developing)", Proficient: "var(--blue)", Exemplary: "var(--gold)" };
const TIER_SCORE = { Developing: 1, Proficient: 2, Exemplary: 3 };
const TIER_LABEL = { Developing: "Not there yet", Proficient: "Solid work", Exemplary: "Legacy-worthy" };

function PersonalDevelopmentApp({ onBack }) {
  // Single fixed brand theme: white / red / black / orange
  const STORAGE_KEY = "legacy-lab-week1-progress";
  const [loaded, setLoaded] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [seenIntro, setSeenIntro] = useState(false);
  const [xp, setXp] = useState(20);
  const [housePoints, setHousePoints] = useState(90);
  const rivalPoints = 105;
  const [streak] = useState(4);
  const [completed, setCompleted] = useState([]);
  const [activeMission, setActiveMission] = useState(null);
  const [briefed, setBriefed] = useState(new Set());
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [showFlashForward, setShowFlashForward] = useState(false);
  const [toast, setToast] = useState(null);
  const [tiers, setTiers] = useState({});
  const [leadershipXp, setLeadershipXp] = useState(0);

  const [selectedValues, setSelectedValues] = useState([]);
  const [primaryValue, setPrimaryValue] = useState("");
  const [caseAnalysis, setCaseAnalysis] = useState("");
  const [monJustification, setMonJustification] = useState("");
  const [monAttempts, setMonAttempts] = useState(0);
  const [monGrading, setMonGrading] = useState(false);
  const [monResult, setMonResult] = useState(null);

  const [dilemmaIdx, setDilemmaIdx] = useState(0);
  const [dilemmaAnswers, setDilemmaAnswers] = useState({});
  const [tueTotalXp, setTueTotalXp] = useState(0);

  const [interviewQuote, setInterviewQuote] = useState("");
  const [compareReflection, setCompareReflection] = useState("");

  const [missionDraft, setMissionDraft] = useState("");
  const [thuAttempts, setThuAttempts] = useState(0);
  const [thuGrading, setThuGrading] = useState(false);
  const [thuResult, setThuResult] = useState(null);

  const [panel1, setPanel1] = useState("");
  const [panel2, setPanel2] = useState("");
  const [friAttempts, setFriAttempts] = useState(0);
  const [friGrading, setFriGrading] = useState(false);
  const [friResult, setFriResult] = useState(null);

  const isUnlocked = (idx) => idx === 0 || completed.includes(MISSIONS[idx - 1].id);
  const isDone = (id) => completed.includes(id);

  // Load saved progress once on mount
  useEffect(() => {
    (async () => {
      try {
        const result = await window.storage.get(STORAGE_KEY, false);
        if (result && result.value) {
          const saved = JSON.parse(result.value);
          if (saved.xp !== undefined) setXp(saved.xp);
          if (saved.housePoints !== undefined) setHousePoints(saved.housePoints);
          if (saved.completed) setCompleted(saved.completed);
          if (saved.tiers) setTiers(saved.tiers);
          if (saved.leadershipXp !== undefined) setLeadershipXp(saved.leadershipXp);
          if (saved.selectedValues) setSelectedValues(saved.selectedValues);
          if (saved.primaryValue) setPrimaryValue(saved.primaryValue);
          if (saved.caseAnalysis) setCaseAnalysis(saved.caseAnalysis);
          if (saved.monJustification) setMonJustification(saved.monJustification);
          if (saved.monAttempts !== undefined) setMonAttempts(saved.monAttempts);
          if (saved.monResult) setMonResult(saved.monResult);
          if (saved.dilemmaIdx !== undefined) setDilemmaIdx(saved.dilemmaIdx);
          if (saved.dilemmaAnswers) setDilemmaAnswers(saved.dilemmaAnswers);
          if (saved.tueTotalXp !== undefined) setTueTotalXp(saved.tueTotalXp);
          if (saved.interviewQuote) setInterviewQuote(saved.interviewQuote);
          if (saved.compareReflection) setCompareReflection(saved.compareReflection);
          if (saved.missionDraft) setMissionDraft(saved.missionDraft);
          if (saved.thuAttempts !== undefined) setThuAttempts(saved.thuAttempts);
          if (saved.thuResult) setThuResult(saved.thuResult);
          if (saved.panel1) setPanel1(saved.panel1);
          if (saved.panel2) setPanel2(saved.panel2);
          if (saved.friAttempts !== undefined) setFriAttempts(saved.friAttempts);
          if (saved.friResult) setFriResult(saved.friResult);
          if (saved.seenIntro) { setSeenIntro(true); setShowIntro(false); }
        }
      } catch (err) {
        // no saved progress yet; start fresh
      }
      setLoaded(true);
    })();
  }, []);

  // Debounced autosave whenever progress changes, once initial load is done
  useEffect(() => {
    if (!loaded) return;
    const progress = {
      xp, housePoints, completed, tiers, leadershipXp,
      selectedValues, primaryValue, caseAnalysis, monJustification, monAttempts, monResult,
      dilemmaIdx, dilemmaAnswers, tueTotalXp,
      interviewQuote, compareReflection,
      missionDraft, thuAttempts, thuResult,
      panel1, panel2, friAttempts, friResult,
      seenIntro,
    };
    const timeout = setTimeout(async () => {
      try {
        const result = await window.storage.set(STORAGE_KEY, JSON.stringify(progress), false);
        setSaveError(!result);
      } catch (err) {
        setSaveError(true);
      }
    }, 800);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    loaded, xp, housePoints, completed, tiers, leadershipXp,
    selectedValues, primaryValue, caseAnalysis, monJustification, monAttempts, monResult,
    dilemmaIdx, dilemmaAnswers, tueTotalXp,
    interviewQuote, compareReflection,
    missionDraft, thuAttempts, thuResult,
    panel1, panel2, friAttempts, friResult,
    seenIntro,
  ]);

  async function resetProgress() {
    if (!window.confirm("Reset all progress on this device? This can't be undone.")) return;
    try {
      await window.storage.delete(STORAGE_KEY, false);
    } catch (err) {
      // nothing was saved yet; fine
    }
    setXp(20); setHousePoints(90); setCompleted([]); setTiers({}); setLeadershipXp(0);
    setSelectedValues([]); setPrimaryValue(""); setCaseAnalysis(""); setMonJustification("");
    setMonAttempts(0); setMonResult(null);
    setDilemmaIdx(0); setDilemmaAnswers({}); setTueTotalXp(0);
    setInterviewQuote(""); setCompareReflection("");
    setMissionDraft(""); setThuAttempts(0); setThuResult(null);
    setPanel1(""); setPanel2(""); setFriAttempts(0); setFriResult(null);
    setActiveMission(null); setBriefed(new Set()); setShowPortfolio(false); setShowFlashForward(false);
  }

  if (!loaded) {
    return (
      <div data-theme="brand" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FFFFFF", color: "#141414", fontFamily: "Verdana, Geneva, sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
          <Loader2 size={18} className="animate-spin" /> Loading your progress...
        </div>
      </div>
    );
  }

  function award(tier, xpAmt, houseAmt, id, leadershipShare = 0) {
    setXp((x) => Math.max(0, x + xpAmt));
    setHousePoints((h) => Math.max(0, h + houseAmt));
    setLeadershipXp((l) => l + Math.round(xpAmt * leadershipShare));
    setTiers((t) => ({ ...t, [id]: tier }));
    const sign = houseAmt >= 0 ? "+" : "";
    const label = tier === "Developing" ? `${VILLAIN.name} wins this round` : `You proved ${VILLAIN.name} wrong`;
    setToast(`${label} · ${xpAmt} XP, ${sign}${houseAmt} house pts`);
    setTimeout(() => setToast(null), 3200);
  }

  function finishMission(id) {
    setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setTimeout(() => setActiveMission(null), 700);
  }

  function openMission(id) {
    if (!briefed.has(id)) {
      setBriefed((prev) => new Set(prev).add(id));
    }
    setActiveMission(id);
  }

  async function submitMonday() {
    setMonGrading(true);
    setMonAttempts((a) => a + 1);
    const prompt = `You are a strict, direct middle-school character-education coach. Grade an 8th grader's submission against this rubric. Be tough; do not give high marks for vague or generic answers.

Case study the student read (about Claudette Colvin):
${CASE_STUDY}

Student's analysis of what value drove Colvin's choice and what it cost her:
"${caseAnalysis}"

Student's own top value right now: ${primaryValue}
Student's real personal example of a time they lived out this value:
"${monJustification}"

Grade "Developing" if either answer is vague, generic, restates the prompt, gives no specific real detail, or dodges the "cost" question. Grade "Proficient" if both answers are specific and reasoned but not deeply reflective. Grade "Exemplary" only if the case analysis correctly identifies a real cost AND the personal example is concrete, specific, and honest about difficulty.

Respond with ONLY this JSON, no markdown, no other text: {"tier":"Developing|Proficient|Exemplary","feedback":"one direct, specific sentence about what is missing or strong"}`;
    const result = await callClaude(prompt);
    setMonGrading(false);
    setMonResult(result);
    const final = monAttempts + 1 >= 2 || result.tier !== "Developing";
    if (final) {
      award(result.tier, TIER_XP[result.tier], TIER_HOUSE[result.tier], "mon", 0.15);
      finishMission("mon");
    }
  }

  function submitDilemma() {
    const ans = dilemmaAnswers[DILEMMAS[dilemmaIdx].id];
    if (!ans || !ans.choice || wordCount(ans.text || "") < 40) return;
    const wc = wordCount(ans.text);
    const otherValue = ans.choice === DILEMMAS[dilemmaIdx].a ? DILEMMAS[dilemmaIdx].b : DILEMMAS[dilemmaIdx].a;
    const hasTradeoff = /(even though|but|however|still|yet|despite|even if)/i.test(ans.text) || ans.text.toLowerCase().includes(otherValue.toLowerCase());
    const tier = wc >= 70 && hasTradeoff ? "Exemplary" : hasTradeoff ? "Proficient" : "Developing";
    const xpAmt = { Developing: 0, Proficient: 10, Exemplary: 20 }[tier];
    setDilemmaAnswers((prev) => ({ ...prev, [DILEMMAS[dilemmaIdx].id]: { ...ans, tier, submitted: true } }));
    setTueTotalXp((t) => t + xpAmt);
    if (dilemmaIdx < DILEMMAS.length - 1) {
      setTimeout(() => setDilemmaIdx((i) => i + 1), 1400);
    } else {
      const total = tueTotalXp + xpAmt;
      setXp((x) => x + total);
      setLeadershipXp((l) => l + Math.round(total * 0.3));
      const avgTier = total >= 45 ? "Exemplary" : total >= 20 ? "Proficient" : "Developing";
      setHousePoints((h) => Math.max(0, h + TIER_HOUSE[avgTier]));
      setTiers((t) => ({ ...t, tue: avgTier }));
      setToast(`Mission 2 complete · ${total} XP earned`);
      setTimeout(() => setToast(null), 3200);
      finishMission("tue");
    }
  }

  function submitWednesday() {
    const topThree = selectedValues.slice(0, 3);
    const mentionsValue = topThree.some((v) => compareReflection.toLowerCase().includes(v.toLowerCase()));
    const meetsBar = wordCount(interviewQuote) >= 30 && wordCount(compareReflection) >= 30 && mentionsValue;
    if (!meetsBar) return;
    award("Proficient", 15, 5, "wed", 0.1);
    finishMission("wed");
  }

  const thuChecks = [
    { label: "Names one of your top values by name", pass: selectedValues.some((v) => missionDraft.toLowerCase().includes(v.toLowerCase())) },
    { label: "Uses a first-person action verb (I lead / I choose / I refuse / I show up...)", pass: /\bi\s+(will|lead|choose|refuse|show up|stand|serve|commit|protect)\b/i.test(missionDraft) },
    { label: 'States a real cost: "even when / even though / no matter / despite"', pass: /(even when|even though|no matter|despite|regardless)/i.test(missionDraft) },
    { label: "At least 25 words, and specific enough it couldn't apply to a stranger", pass: wordCount(missionDraft) >= 25 },
  ];
  const thuChecklistPassed = thuChecks.every((c) => c.pass);

  async function submitThursday() {
    if (!thuChecklistPassed) return;
    setThuGrading(true);
    setThuAttempts((a) => a + 1);
    const prompt = `You are a strict middle-school writing coach grading a personal mission statement. Be tough on generic language; phrases like "I will be a good person" or "I will try my best" are NOT acceptable even if technically they contain a value word.

Student's top 5 values: ${selectedValues.join(", ")}
Student's draft: "${missionDraft}"

Grade "Developing" if the statement is generic, cliché, or could apply to almost any student. Grade "Proficient" if it's specific to this student and names a real cost. Grade "Exemplary" only if it is vivid, concrete, and sounds like something only this specific student could have written.

Respond with ONLY this JSON, no markdown: {"tier":"Developing|Proficient|Exemplary","feedback":"one direct sentence of coaching feedback"}`;
    const result = await callClaude(prompt);
    setThuGrading(false);
    setThuResult(result);
    const final = thuAttempts + 1 >= 2 || result.tier !== "Developing";
    if (final) {
      award(result.tier, TIER_XP[result.tier], TIER_HOUSE[result.tier], "thu", 0.2);
      finishMission("thu");
    }
  }

  async function submitFriday() {
    if (wordCount(panel1) < 50 || wordCount(panel2) < 40) return;
    setFriGrading(true);
    setFriAttempts((a) => a + 1);
    const prompt = `You are a strict panel judge at a middle school leadership defense. Grade this student's answers to two challenge questions.

Q1: "Tell me about a specific moment in the last year when living out one of your values actually cost you something real: a grade, a friendship, popularity, comfort. What happened?"
Answer: "${panel1}"

Q2: "Which of your listed values are you LEAST consistent at living out? Be honest, what gets in the way?"
Answer: "${panel2}"

Grade "Developing" if either answer avoids specifics, sounds rehearsed, or dodges the honesty required by Q2. Grade "Proficient" if both are specific and honest. Grade "Exemplary" only if both show real vulnerability and self-awareness a typical 8th grader wouldn't volunteer without being pushed.

Respond with ONLY this JSON, no markdown: {"tier":"Developing|Proficient|Exemplary","feedback":"one direct sentence of coaching feedback"}`;
    const result = await callClaude(prompt);
    setFriGrading(false);
    setFriResult(result);
    const final = friAttempts + 1 >= 2 || result.tier !== "Developing";
    if (final) {
      award(result.tier, TIER_XP[result.tier], TIER_HOUSE[result.tier], "fri", 0.4);
      finishMission("fri");
    }
  }

  const allDone = completed.length === MISSIONS.length;
  const stakesIds = ["mon", "thu", "fri"];
  const avgScore = stakesIds.reduce((s, d) => s + (TIER_SCORE[tiers[d]] || 0), 0) / stakesIds.length;
  const weekBadge = allDone ? (avgScore >= 2.6 ? "Gold" : avgScore >= 1.8 ? "Silver" : "Bronze") : null;
  const weekBadgeColor = { Gold: "var(--gold)", Silver: "var(--blue)", Bronze: "var(--developing)" }[weekBadge];

  const purposePct = Math.min(100, 8 + xp * 0.55);
  const leadershipPct = Math.min(100, 5 + leadershipXp * 1.1);

  return (
    <div data-theme="brand" className="min-h-screen w-full" style={{ background: "var(--bg)", color: "var(--ink)", fontFamily: "Verdana, Geneva, sans-serif" }}>
      <style>{`
        .font-display { font-family: Verdana, Geneva, sans-serif; }
        @keyframes floatIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: floatIn 0.35s ease-out; }
        @keyframes toastIn { from { opacity: 0; transform: translate(-50%, -8px); } to { opacity: 1; transform: translate(-50%, 0); } }
        @keyframes briefIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes barGrow { from { width: 0; } }
        @keyframes pulseNode { 0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(168,58,10,0.25); } 50% { transform: scale(1.02); box-shadow: 0 0 0 6px rgba(168,58,10,0); } }
        @keyframes bounceIn { 0% { opacity: 0; transform: translate(-50%, -16px) scale(0.9); } 60% { opacity: 1; transform: translate(-50%, 2px) scale(1.03); } 100% { transform: translate(-50%, 0) scale(1); } }
        .pulse-node { animation: pulseNode 1.6s ease-in-out infinite; }
        .duo-btn { border: none; cursor: pointer; transition: transform 0.12s ease, box-shadow 0.12s ease, opacity 0.12s ease; }
        .duo-btn:hover:not(:disabled) { transform: translateY(-1px); opacity: 0.94; }
        .duo-btn:active:not(:disabled) { transform: scale(0.97); opacity: 0.88; }
        .duo-btn:disabled { cursor: not-allowed; }
        textarea::placeholder { color: var(--placeholder); }

        [data-theme="brand"] {
          --bg: #FFFFFF; --surface: #FFF8F3; --surface-alt: #FFE2C7; --surface-done: #FCE7E7;
          --border: #F0D6BC; --border-dim: #F7E9DA; --border-done: #FF8A2E; --border-crimson: #F3B3B3; --border-blue: #FFCB9C;
          --ink: #141414; --muted: #5C4A40; --muted2: #7A6154; --muted3: #241812; --placeholder: #D6BBA6; --villain: #A83535;
          --gold: #A83A0A; --blue: #000000;
          --crimson-bg: #FFE6E6; --crimson-text: #C81E2C; --wisdom-bg: #FFEEDD; --wisdom-text: #8C3D00;
          --developing: #D6182B; --success: #141414; --track: #F5E1CC; --toast-bg: #FFFFFF; --toast-border: #F0D6BC; --path-line: #F0D6BC;
          --cta: #FF7A1A; --cta-shadow: #C15A00; --cta-ink: #141414;
        }
      `}</style>

      <header className="px-5 md:px-10 pt-6 pb-4 flex flex-wrap gap-3 items-center justify-between border-b" style={{ borderColor: "var(--border)" }}>
        <div>
          <div className="font-display font-800 tracking-tight text-lg md:text-xl">
            LEGACY LAB <span style={{ color: "var(--gold)" }}>LEADERSHIP ACADEMY</span>
          </div>
          <div className="text-xs mt-0.5 tracking-widest uppercase" style={{ color: "var(--muted2)" }}>Season One · Discover Your Purpose</div>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden sm:flex items-center gap-1.5 text-sm" style={{ color: "var(--crimson-text)" }}>
            <Flame size={16} /> <span className="font-medium">{streak}-day streak</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm" style={{ color: "var(--gold)" }}>
            <Star size={16} fill="var(--gold)" /> <span className="font-semibold">{xp} XP</span>
          </div>
          <button onClick={resetProgress} className="text-xs underline" style={{ color: "var(--muted2)" }}>Reset progress</button>
          <button onClick={() => setShowIntro(true)} className="text-xs underline" style={{ color: "var(--muted2)" }}>How this works</button>
        </div>
      </header>

      <div className="px-5 md:px-10 pt-4">
        <button onClick={onBack} className="flex items-center gap-1.5 text-xs font-bold" style={{ color: "var(--muted2)" }}>
          <ArrowLeft size={13} /> All subjects
        </button>
      </div>

      {saveError && (
        <div className="px-5 md:px-10 pt-3">
          <div className="max-w-4xl mx-auto text-xs px-3 py-2 rounded-lg" style={{ background: "var(--crimson-bg)", color: "var(--crimson-text)", border: "1px solid var(--border-crimson)" }}>
            Your progress isn't saving right now; it'll still work this session, but may not be here if you close the tab.
          </div>
        </div>
      )}

      {!showIntro && (
      <div className="px-5 md:px-10 pt-4">
        <div className="max-w-4xl mx-auto flex flex-col gap-3">
          {/* House scoreboard with identity */}
          <div className="rounded-xl px-4 py-3 flex items-center justify-between text-sm" style={{ background: HOUSES.purpose.bg, border: `1px solid ${HOUSES.purpose.border}` }}>
            <div style={{ color: HOUSES.purpose.color }}>
              <span className="font-semibold">{HOUSES.purpose.name}</span>
              <span className="italic ml-2" style={{ color: "var(--muted)" }}>"{HOUSES.purpose.motto}"</span>
              <span className="ml-2">· {housePoints} pts</span>
            </div>
            <div className="flex items-center gap-1.5" style={{ color: housePoints >= rivalPoints ? "var(--success)" : "var(--developing)" }}>
              {housePoints >= rivalPoints ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              vs {HOUSES.wisdom.name} ({rivalPoints})
            </div>
          </div>

          {/* Life map */}
          <div className="rounded-xl px-4 py-4" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <div className="text-[11px] font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--muted2)" }}>Who you're becoming</div>
            <div className="flex flex-col gap-2.5">
              <LifeBar label="Purpose" pct={purposePct} color="var(--gold)" />
              <LifeBar label="Leadership" pct={leadershipPct} color="var(--blue)" />
              <LifeBar label="Money" pct={6} color="var(--placeholder)" locked note="Opens Quarter 2" />
              <LifeBar label="Relationships" pct={6} color="var(--placeholder)" locked note="Opens later this year" />
              <LifeBar label="Health" pct={6} color="var(--placeholder)" locked note="Opens later this year" />
            </div>
          </div>
        </div>
      </div>
      )}

      {showIntro ? (
        <IntroScreen
          onStart={() => {
            setShowIntro(false);
            setSeenIntro(true);
          }}
        />
      ) : activeMission ? (
        briefed.has(activeMission) === "just" ? null : (
          <MissionShell
            mission={MISSIONS.find((m) => m.id === activeMission)}
            onBack={() => setActiveMission(null)}
            state={{
              selectedValues, setSelectedValues, primaryValue, setPrimaryValue,
              caseAnalysis, setCaseAnalysis, monJustification, setMonJustification,
              monAttempts, monGrading, monResult, submitMonday,
              dilemmaIdx, dilemmaAnswers, setDilemmaAnswers, submitDilemma,
              interviewQuote, setInterviewQuote, compareReflection, setCompareReflection, submitWednesday,
              missionDraft, setMissionDraft, thuChecks, thuChecklistPassed, thuAttempts, thuGrading, thuResult, submitThursday,
              panel1, setPanel1, panel2, setPanel2, friAttempts, friGrading, friResult, submitFriday,
            }}
            done={isDone(activeMission)}
            locked={!isUnlocked(MISSIONS.findIndex((m) => m.id === activeMission))}
            prevTitle={(() => {
              const idx = MISSIONS.findIndex((m) => m.id === activeMission);
              return idx > 0 ? MISSIONS[idx - 1].title : null;
            })()}
          />
        )
      ) : showFlashForward ? (
        <FlashForward onBack={() => setShowFlashForward(false)} primaryValue={primaryValue} monJustification={monJustification} />
      ) : showPortfolio ? (
        <PortfolioView onBack={() => setShowPortfolio(false)} selectedValues={selectedValues} missionDraft={missionDraft} weekBadge={weekBadge} weekBadgeColor={weekBadgeColor} tiers={tiers} onFlashForward={() => setShowFlashForward(true)} />
      ) : (
        <main className="px-5 md:px-10 py-8 max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: "var(--blue)" }}>Season One · Chapter 1: Identity</div>
            <h1 className="font-display font-700 text-2xl md:text-3xl mb-3">Who Am I Becoming?</h1>
            <div className="inline-block text-xs font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full mb-2" style={{ background: "var(--crimson-bg)", color: "var(--developing)", border: "1px solid var(--border-crimson)" }}>
              This chapter's villain: {VILLAIN.name}
            </div>
            <p className="text-sm italic" style={{ color: "var(--villain)" }}>{VILLAIN.name} whispers: "{VILLAIN.tagline}"</p>
            <p className="text-sm mt-3" style={{ color: "var(--muted)" }}>The Coach isn't grading you; every mission is a chance to prove {VILLAIN.name} wrong. But weak work still costs your house points, and you only get two tries.</p>
          </div>

          <div className="relative pl-2 mb-12">
            <div className="absolute left-[31px] top-6 bottom-6 w-0" style={{ borderLeft: "2px dashed var(--path-line)" }} />
            <div className="flex flex-col gap-4">
              {MISSIONS.map((m, idx) => {
                const unlocked = isUnlocked(idx);
                const done = isDone(m.id);
                const current = unlocked && !done;
                const Icon = m.Icon;
                const tier = tiers[m.id];
                return (
                  <button
                    key={m.id}
                    onClick={() => openMission(m.id)}
                    className="duo-btn relative flex items-center gap-4 text-left rounded-2xl px-4 py-4"
                    style={{
                      background: done ? "var(--surface-done)" : current ? "var(--surface-alt)" : "var(--surface)",
                      border: `1.5px solid ${current ? "var(--gold)" : done ? "var(--border-done)" : "var(--border)"}`,
                      boxShadow: current ? "0 2px 8px rgba(20,20,20,0.16)" : done ? "0 2px 8px rgba(20,20,20,0.16)" : "0 2px 8px rgba(20,20,20,0.16)",
                      opacity: unlocked ? 1 : 0.75,
                    }}
                  >
                    <div
                      className={`relative z-10 flex items-center justify-center rounded-full shrink-0 ${current ? "pulse-node" : ""}`}
                      style={{ width: 52, height: 52, background: done ? "var(--gold)" : current ? "var(--cta)" : "var(--border)", color: done ? "var(--surface-done)" : current ? "var(--cta-ink)" : "var(--ink)", border: `1.5px solid ${done ? "var(--border-done)" : current ? "var(--cta-shadow)" : "var(--border-dim)"}` }}
                    >
                      {done ? <CheckCircle2 size={24} /> : unlocked ? <Icon size={22} /> : <Lock size={18} />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase" style={{ color: current ? "var(--gold)" : "var(--muted2)" }}>
                        Mission {m.num} · {m.tag} {!unlocked && !done && "· Preview only"}
                      </div>
                      <div className="font-display font-700 text-base">{m.title}</div>
                    </div>
                    {tier && <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ color: TIER_COLOR[tier], background: "var(--toast-bg)", border: `2px solid ${TIER_COLOR[tier]}` }}>{TIER_LABEL[tier]}</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {allDone && (
            <button onClick={() => setShowPortfolio(true)} className="w-full mb-10 flex items-center justify-between rounded-2xl px-5 py-4 fade-in" style={{ background: "linear-gradient(90deg, var(--crimson-bg), var(--surface-alt))", border: `1px solid ${weekBadgeColor}` }}>
              <div className="flex items-center gap-3">
                <Trophy size={22} style={{ color: weekBadgeColor }} />
                <div className="text-left">
                  <div className="font-display font-700">{weekBadge} badge earned · Chapter 1: Identity</div>
                  <div className="text-xs" style={{ color: "var(--muted)" }}>View your mission statement in your portfolio</div>
                </div>
              </div>
              <ChevronLeft size={18} style={{ transform: "rotate(180deg)", color: weekBadgeColor }} />
            </button>
          )}
        </main>
      )}

      {activeMission && !isDone(activeMission) && briefed.has(activeMission) && (
        <MissionBriefingGate missionId={activeMission} />
      )}

      {toast && (
        <div className="fixed top-6 left-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold" style={{ transform: "translateX(-50%)", background: "var(--toast-bg)", color: "var(--ink)", border: "1.5px solid var(--gold)", boxShadow: "0 2px 8px rgba(20,20,20,0.16)", animation: "bounceIn 0.4s ease-out" }}>
          <Sparkles size={16} style={{ color: "var(--gold)" }} /> {toast}
        </div>
      )}
    </div>
  );
}

const INTRO_STEPS = [
  { eyebrow: "Season One · Chapter 1", title: "Discover Your Purpose", visual: "hero" },
  { eyebrow: "How a week works", title: "One rhythm, five missions", visual: "path" },
  { eyebrow: "Feedback", title: "The Coach reads what you write", visual: "tiers" },
  { eyebrow: "Stakes", title: "You're already in the fight", visual: "houses" },
];

function IntroScreen({ onStart }) {
  const [step, setStep] = useState(0);
  const isLast = step === INTRO_STEPS.length - 1;
  const current = INTRO_STEPS[step];

  return (
    <main className="px-5 md:px-10 py-8 max-w-2xl mx-auto fade-in">
      <div className="flex items-center gap-1.5 mb-8">
        {INTRO_STEPS.map((_, i) => (
          <div key={i} className="h-1.5 rounded-full flex-1" style={{ background: i <= step ? "var(--gold)" : "var(--border)" }} />
        ))}
      </div>

      <div className="flex items-center justify-between mb-2">
        <div className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--gold)" }}>{current.eyebrow}</div>
        {!isLast && <button onClick={onStart} className="text-xs underline" style={{ color: "var(--muted2)" }}>Skip</button>}
      </div>
      <h1 className="font-display font-800 text-2xl md:text-3xl mb-6">{current.title}</h1>

      {current.visual === "hero" && (
        <div className="flex flex-col items-center text-center py-6 mb-8 fade-in">
          <div className="flex items-center justify-center rounded-full mb-5" style={{ width: 88, height: 88, background: "var(--cta)", border: "4px solid var(--cta-shadow)", color: "var(--cta-ink)" }}>
            <Trophy size={38} />
          </div>
          <p className="text-sm leading-relaxed max-w-sm" style={{ color: "var(--muted3)" }}>
            Five short missions this week build toward one thing: a personal mission statement you actually mean, not one copied off a worksheet.
          </p>
          <div className="mt-5 text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: "var(--crimson-bg)", color: "var(--developing)", border: "2px solid var(--border-crimson)" }}>
            This chapter's villain: {VILLAIN.name}
          </div>
        </div>
      )}

      {current.visual === "path" && (
        <div className="mb-8 fade-in">
          <div className="flex items-start justify-between mb-6 relative">
            <div className="absolute top-5 left-0 right-0 h-0" style={{ borderTop: "1.5px dashed var(--path-line)", zIndex: 0 }} />
            {MISSIONS.map((m) => {
              const Icon = m.Icon;
              return (
                <div key={m.id} className="relative z-10 flex flex-col items-center gap-2" style={{ width: "20%" }}>
                  <div className="flex items-center justify-center rounded-full" style={{ width: 40, height: 40, background: "var(--surface)", border: "1.5px solid var(--gold)", color: "var(--gold)" }}>
                    <Icon size={17} />
                  </div>
                  <div className="text-[10px] font-bold uppercase text-center leading-tight" style={{ color: "var(--muted2)" }}>{m.tag}</div>
                </div>
              );
            })}
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted3)" }}>
            Every week runs the same five steps, in order. You can look ahead at any mission, but you can only submit them once the one before it is done.
          </p>
        </div>
      )}

      {current.visual === "tiers" && (
        <div className="mb-8 fade-in">
          <div className="rounded-2xl px-5 py-5 mb-4" style={{ background: "#141414", border: "1.5px solid var(--gold)" }}>
            <p className="italic text-base" style={{ color: "#FFFFFF" }}>"{DRIFT_LINES.mon}"</p>
            <div className="text-xs font-bold uppercase tracking-widest mt-2" style={{ color: "#FF7A1A" }}>{VILLAIN.name} whispers</div>
          </div>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted3)" }}>
            Written missions get real feedback, not a grade. You get two tries.
          </p>
          <div className="flex gap-2">
            {["Developing", "Proficient", "Exemplary"].map((t) => (
              <span key={t} className="flex-1 text-center text-xs font-bold px-2 py-2 rounded-full" style={{ color: TIER_COLOR[t], background: "var(--surface)", border: `2px solid ${TIER_COLOR[t]}` }}>{TIER_LABEL[t]}</span>
            ))}
          </div>
        </div>
      )}

      {current.visual === "houses" && (
        <div className="mb-8 fade-in">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 rounded-2xl px-4 py-4 text-center" style={{ background: HOUSES.purpose.bg, border: `1.5px solid ${HOUSES.purpose.border}` }}>
              <div className="font-bold text-sm" style={{ color: HOUSES.purpose.color }}>{HOUSES.purpose.name}</div>
              <div className="text-xs italic mt-0.5" style={{ color: "var(--muted)" }}>"{HOUSES.purpose.motto}"</div>
              <div className="text-[10px] font-bold uppercase tracking-widest mt-2" style={{ color: "var(--muted2)" }}>You</div>
            </div>
            <div className="text-xs font-bold" style={{ color: "var(--muted2)" }}>VS</div>
            <div className="flex-1 rounded-2xl px-4 py-4 text-center" style={{ background: HOUSES.wisdom.bg, border: `1.5px solid ${HOUSES.wisdom.border}` }}>
              <div className="font-bold text-sm" style={{ color: HOUSES.wisdom.color }}>{HOUSES.wisdom.name}</div>
              <div className="text-xs italic mt-0.5" style={{ color: "var(--muted)" }}>"{HOUSES.wisdom.motto}"</div>
              <div className="text-[10px] font-bold uppercase tracking-widest mt-2" style={{ color: "var(--muted2)" }}>Rival</div>
            </div>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted3)" }}>
            Your house races the rival on points all season. Everything you build along the way also becomes a portfolio you keep.
          </p>
        </div>
      )}

      <div className="flex items-center gap-3">
        {step > 0 && (
          <button onClick={() => setStep((n) => n - 1)} className="px-5 py-3.5 rounded-2xl text-sm font-bold" style={{ background: "var(--surface)", border: "2px solid var(--border)", color: "var(--muted2)" }}>Back</button>
        )}
        <button
          onClick={() => (isLast ? onStart() : setStep((n) => n + 1))}
          className="duo-btn flex-1 px-6 py-3.5 rounded-2xl text-sm font-bold"
          style={{ background: "var(--cta)", color: "var(--cta-ink)", boxShadow: "0 2px 8px rgba(20,20,20,0.16)" }}
        >
          {isLast ? "Start Mission 1 →" : "Continue"}
        </button>
      </div>

      <p className="text-xs mt-5" style={{ color: "var(--muted2)" }}>Your progress saves automatically on this device.</p>
    </main>
  );
}

function LifeBar({ label, pct, color, locked, note }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1.5">
        <span style={{ color: locked ? "var(--muted2)" : "var(--ink)" }} className="font-bold flex items-center gap-1.5">
          {locked && <Lock size={11} />} {label}
        </span>
        <span className="font-bold" style={{ color: "var(--muted2)" }}>{locked ? note : `${Math.round(pct)}%`}</span>
      </div>
      <div className="w-full h-4 rounded-full" style={{ background: "var(--track)", border: "2px solid var(--border)" }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color, animation: "barGrow 0.6s ease-out" }} />
      </div>
    </div>
  );
}

function MissionBriefingGate() { return null; }

function BriefingScreen({ mission, onBegin }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center px-6" style={{ background: "#000" }}>
      <div className="text-center max-w-md fade-in">
        <div className="text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ color: "#FF7A1A" }}>{VILLAIN.name} whispers</div>
        <p className="italic text-base mb-8" style={{ color: "#FFFFFF" }}>"{DRIFT_LINES[mission.id]}"</p>
        <div className="text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: "#D9CFC4" }}>Mission {mission.num}</div>
        <h1 className="font-display font-800 text-3xl md:text-4xl mb-6" style={{ color: "#FFFFFF" }}>{mission.title}</h1>
        <p className="italic text-lg mb-10" style={{ color: "#FF7A1A" }}>"{mission.quote}"</p>
        <button onClick={onBegin} className="duo-btn px-6 py-3 rounded-2xl text-sm font-bold" style={{ background: "#FF7A1A", color: "#141414", boxShadow: "0 4px 0 #C15A00" }}>Prove {VILLAIN.name} wrong →</button>
      </div>
    </div>
  );
}

function MissionShell({ mission, onBack, state, done, locked, prevTitle }) {
  const [entered, setEntered] = useState(false);
  if (!entered && !done) {
    return <BriefingScreen mission={mission} onBegin={() => setEntered(true)} />;
  }
  return <DayView mission={mission} onBack={onBack} done={done} state={state} locked={locked} prevTitle={prevTitle} />;
}

function GradeResult({ result, grading }) {
  if (grading) return <div className="flex items-center gap-2 text-sm mt-4" style={{ color: "var(--muted)" }}><Loader2 size={16} className="animate-spin" /> The Coach is reviewing your submission...</div>;
  if (!result) return null;
  const color = { Developing: "var(--developing)", Proficient: "var(--blue)", Exemplary: "var(--gold)" }[result.tier];
  return (
    <div className="mt-4 rounded-xl px-4 py-3 fade-in" style={{ background: "var(--surface)", border: `1px solid ${color}` }}>
      <div className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color }}>Coach says · {TIER_LABEL[result.tier]}</div>
      <p className="text-sm" style={{ color: "var(--muted3)" }}>{result.feedback}</p>
    </div>
  );
}

function DayView({ mission, onBack, done, state, locked, prevTitle }) {
  if (mission.id === "mon") return <MondayView mission={mission} onBack={onBack} done={done} s={state} previewLocked={locked} prevTitle={prevTitle} />;
  if (mission.id === "tue") return <TuesdayView mission={mission} onBack={onBack} done={done} s={state} previewLocked={locked} prevTitle={prevTitle} />;
  if (mission.id === "wed") return <WednesdayView mission={mission} onBack={onBack} done={done} s={state} previewLocked={locked} prevTitle={prevTitle} />;
  if (mission.id === "thu") return <ThursdayView mission={mission} onBack={onBack} done={done} s={state} previewLocked={locked} prevTitle={prevTitle} />;
  return <FridayView mission={mission} onBack={onBack} done={done} s={state} previewLocked={locked} prevTitle={prevTitle} />;
}

function Shell({ mission, onBack, children, previewLocked, prevTitle }) {
  return (
    <main className="px-5 md:px-10 py-8 max-w-3xl mx-auto fade-in">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm mb-6" style={{ color: "var(--muted)" }}><ChevronLeft size={16} /> Back to path</button>
      <div className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: "var(--blue)" }}>Mission {mission.num} · {mission.tag}</div>
      <h1 className="font-display font-700 text-2xl mb-2">{mission.title}</h1>
      <p className="text-sm mb-6"><span className="font-bold" style={{ color: "var(--gold)" }}>Essential question:</span> <span className="font-bold" style={{ color: "var(--gold)" }}>{mission.eq}</span></p>
      {previewLocked && (
        <div className="flex items-center gap-2 rounded-xl px-4 py-3 mb-6 text-sm fade-in" style={{ background: "var(--surface)", border: "1px solid var(--border-crimson)", color: "var(--crimson-text)" }}>
          <Lock size={14} /> Preview only: finish "{prevTitle}" first to unlock submitting this mission.
        </div>
      )}
      {children}
    </main>
  );
}

function MondayView({ mission, onBack, done, s, previewLocked, prevTitle }) {
  const ready = s.selectedValues.length === 5 && s.primaryValue && wordCount(s.caseAnalysis) >= 30 && wordCount(s.monJustification) >= 40;
  const locked = done || s.monAttempts >= 2 || (s.monResult && s.monResult.tier !== "Developing");
  return (
    <Shell mission={mission} onBack={onBack} previewLocked={previewLocked} prevTitle={prevTitle}>
      <div className="rounded-xl px-4 py-4 mb-5 text-sm leading-relaxed" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--muted3)" }}>
        <div className="text-[11px] font-semibold tracking-widest uppercase mb-2" style={{ color: "var(--muted2)" }}>Case study</div>
        {CASE_STUDY}
      </div>
      <label className="text-xs font-bold tracking-widest uppercase mb-2 block" style={{ color: "var(--gold)" }}>What value drove Colvin's choice, and what did it cost her? (min 30 words)</label>
      <textarea disabled={locked} value={s.caseAnalysis} onChange={(e) => s.setCaseAnalysis(e.target.value)} rows={3} className="w-full rounded-xl px-4 py-3 text-sm outline-none mb-1" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--ink)" }} placeholder="Be specific about what she lost, not just what she did." />
      <div className="text-xs mb-6" style={{ color: wordCount(s.caseAnalysis) >= 30 ? "var(--success)" : "var(--muted2)" }}>{wordCount(s.caseAnalysis)} / 30 words</div>

      <p className="text-sm mb-3" style={{ color: "var(--muted3)" }}>Now pick exactly <strong style={{ color: "var(--ink)" }}>5 values</strong> that describe who you want to be:</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-5">
        {VALUES.map((v) => {
          const active = s.selectedValues.includes(v);
          return (
            <button key={v} disabled={locked} onClick={() => s.setSelectedValues((prev) => prev.includes(v) ? prev.filter((x) => x !== v) : prev.length < 5 ? [...prev, v] : prev)}
              className="duo-btn text-sm font-bold rounded-2xl px-3 py-2.5" style={{ background: active ? "var(--crimson-bg)" : "var(--surface)", border: `1.5px solid ${active ? "var(--gold)" : "var(--border)"}`, color: active ? "var(--gold)" : "var(--ink)", boxShadow: active ? "0 2px 8px rgba(20,20,20,0.16)" : "0 2px 8px rgba(20,20,20,0.16)" }}>
              {v}
            </button>
          );
        })}
      </div>

      {s.selectedValues.length === 5 && (
        <div className="mb-5 fade-in">
          <label className="text-xs font-bold tracking-widest uppercase mb-2 block" style={{ color: "var(--gold)" }}>Which matters most to you today?</label>
          <div className="flex flex-wrap gap-2">
            {s.selectedValues.map((v) => (
              <button key={v} disabled={locked} onClick={() => s.setPrimaryValue(v)} className="text-sm px-3 py-1.5 rounded-full" style={{ background: s.primaryValue === v ? "var(--blue)" : "var(--surface)", border: "1px solid var(--border)", color: s.primaryValue === v ? "#fff" : "var(--muted3)" }}>{v}</button>
            ))}
          </div>
        </div>
      )}

      {s.primaryValue && (
        <div className="mb-2 fade-in">
          <label className="text-xs font-bold tracking-widest uppercase mb-2 block" style={{ color: "var(--gold)" }}>A real, specific time you actually lived out "{s.primaryValue}," and what it cost you (min 40 words)</label>
          <textarea disabled={locked} value={s.monJustification} onChange={(e) => s.setMonJustification(e.target.value)} rows={4} className="w-full rounded-xl px-4 py-3 text-sm outline-none" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--ink)" }} placeholder="Generic answers get sent back. Name the actual moment." />
          <div className="text-xs mt-1" style={{ color: wordCount(s.monJustification) >= 40 ? "var(--success)" : "var(--muted2)" }}>{wordCount(s.monJustification)} / 40 words</div>
        </div>
      )}

      <GradeResult result={s.monResult} grading={s.monGrading} />

      <div className="mt-8 flex items-center justify-between">
        <div className="text-xs" style={{ color: "var(--muted2)" }}>{done ? "Mission complete." : `Attempt ${s.monAttempts} of 2`}</div>
        {!locked && (previewLocked ? (
          <span className="text-xs px-4 py-2.5 rounded-full flex items-center gap-1.5" style={{ background: "var(--border)", color: "var(--muted2)" }}><Lock size={12} /> Locked until "{prevTitle}" is done</span>
        ) : (
          <button disabled={!ready || s.monGrading} onClick={s.submitMonday} className="duo-btn px-5 py-2.5 rounded-2xl text-sm font-bold" style={{ background: ready ? "var(--cta)" : "var(--border)", color: ready ? "var(--cta-ink)" : "var(--muted2)", boxShadow: ready ? "0 2px 8px rgba(20,20,20,0.16)" : "none" }}>
            {s.monAttempts === 0 ? "Submit to coach" : "Revise"}
          </button>
        ))}
      </div>
    </Shell>
  );
}

function TuesdayView({ mission, onBack, done, s, previewLocked, prevTitle }) {
  const scenario = DILEMMAS[s.dilemmaIdx];
  const ans = s.dilemmaAnswers[scenario.id] || { choice: null, text: "" };
  const canSubmit = ans.choice && wordCount(ans.text) >= 40 && !ans.submitted;
  return (
    <Shell mission={mission} onBack={onBack} previewLocked={previewLocked} prevTitle={prevTitle}>
      <div className="text-xs mb-4" style={{ color: "var(--muted2)" }}>Dilemma {s.dilemmaIdx + 1} of {DILEMMAS.length}</div>
      <div className="rounded-xl px-4 py-4 mb-5 text-sm leading-relaxed font-bold" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--gold)" }}>{scenario.prompt}</div>
      <div className="flex gap-2 mb-4">
        {[scenario.a, scenario.b].map((v) => (
          <button key={v} disabled={ans.submitted} onClick={() => s.setDilemmaAnswers((prev) => ({ ...prev, [scenario.id]: { ...ans, choice: v } }))} className="duo-btn flex-1 text-sm font-bold rounded-2xl px-4 py-3" style={{ background: ans.choice === v ? "var(--crimson-bg)" : "var(--surface)", border: `1.5px solid ${ans.choice === v ? "var(--gold)" : "var(--border)"}`, color: ans.choice === v ? "var(--gold)" : "var(--ink)", boxShadow: ans.choice === v ? "0 2px 8px rgba(20,20,20,0.16)" : "0 2px 8px rgba(20,20,20,0.16)" }}>
            Choose {v}
          </button>
        ))}
      </div>
      <label className="text-xs font-bold tracking-widest uppercase mb-2 block" style={{ color: "var(--gold)" }}>Defend it, and name what you lose by NOT choosing the other side (min 40 words)</label>
      <textarea disabled={ans.submitted} value={ans.text} onChange={(e) => s.setDilemmaAnswers((prev) => ({ ...prev, [scenario.id]: { ...ans, text: e.target.value } }))} rows={4} className="w-full rounded-xl px-4 py-3 text-sm outline-none" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--ink)" }} />
      <div className="text-xs mt-1 mb-4" style={{ color: wordCount(ans.text) >= 40 ? "var(--success)" : "var(--muted2)" }}>{wordCount(ans.text)} / 40 words</div>

      {ans.submitted && (
        <div className="rounded-xl px-4 py-3 mb-4 fade-in" style={{ background: "var(--surface)", border: `1px solid ${{ Developing: "var(--developing)", Proficient: "var(--blue)", Exemplary: "var(--gold)" }[ans.tier]}` }}>
          <div className="text-xs font-semibold tracking-widest uppercase" style={{ color: { Developing: "var(--developing)", Proficient: "var(--blue)", Exemplary: "var(--gold)" }[ans.tier] }}>Coach says · {TIER_LABEL[ans.tier]}</div>
          <p className="text-sm mt-1" style={{ color: "var(--muted3)" }}>{ans.tier === "Developing" ? "You picked a side but didn't really wrestle with the cost. Next time, sit with the discomfort longer." : ans.tier === "Exemplary" ? "You named the real tradeoff; that's what leadership under pressure looks like." : "Solid: you acknowledged the cost of your choice."}</p>
        </div>
      )}

      {!done && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-xs" style={{ color: "var(--muted2)" }}>No retries on dilemmas; think before you submit.</div>
          {previewLocked ? (
            <span className="text-xs px-4 py-2.5 rounded-full flex items-center gap-1.5" style={{ background: "var(--border)", color: "var(--muted2)" }}><Lock size={12} /> Locked until "{prevTitle}" is done</span>
          ) : (
            <button disabled={!canSubmit} onClick={s.submitDilemma} className="duo-btn px-5 py-2.5 rounded-2xl text-sm font-bold" style={{ background: canSubmit ? "var(--cta)" : "var(--border)", color: canSubmit ? "var(--cta-ink)" : "var(--muted2)", boxShadow: canSubmit ? "0 2px 8px rgba(20,20,20,0.16)" : "none" }}>
              {s.dilemmaIdx < DILEMMAS.length - 1 ? "Submit & next" : "Submit final dilemma"}
            </button>
          )}
        </div>
      )}
    </Shell>
  );
}

function WednesdayView({ mission, onBack, done, s, previewLocked, prevTitle }) {
  const topThree = s.selectedValues.slice(0, 3);
  const mentionsValue = topThree.some((v) => s.compareReflection.toLowerCase().includes(v.toLowerCase()));
  const ready = wordCount(s.interviewQuote) >= 30 && wordCount(s.compareReflection) >= 30 && mentionsValue;
  return (
    <Shell mission={mission} onBack={onBack} previewLocked={previewLocked} prevTitle={prevTitle}>
      <div className="rounded-xl px-4 py-3 mb-5 text-sm" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--muted3)" }}>
        <strong style={{ color: "var(--ink)" }}>Off-screen task:</strong> Ask a parent, grandparent, or mentor: <span className="font-bold" style={{ color: "var(--gold)" }}>"What's one value you've never compromised on, and what did it cost you?"</span>
      </div>
      <label className="text-xs font-bold tracking-widest uppercase mb-2 block" style={{ color: "var(--gold)" }}>What they told you: paraphrase it in detail (min 30 words)</label>
      <textarea disabled={done} value={s.interviewQuote} onChange={(e) => s.setInterviewQuote(e.target.value)} rows={3} className="w-full rounded-xl px-4 py-3 text-sm outline-none mb-1" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--ink)" }} />
      <div className="text-xs mb-5" style={{ color: wordCount(s.interviewQuote) >= 30 ? "var(--success)" : "var(--muted2)" }}>{wordCount(s.interviewQuote)} / 30 words</div>

      <label className="text-xs font-bold tracking-widest uppercase mb-2 block" style={{ color: "var(--gold)" }}>Name one of your top 3 values by name, and say whether their answer matches or challenges it, and why (min 30 words)</label>
      <textarea disabled={done} value={s.compareReflection} onChange={(e) => s.setCompareReflection(e.target.value)} rows={3} className="w-full rounded-xl px-4 py-3 text-sm outline-none" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--ink)" }} placeholder={topThree.length ? `Try mentioning: ${topThree.join(", ")}` : ""} />
      <div className="text-xs mt-1" style={{ color: mentionsValue ? "var(--success)" : "var(--muted2)" }}>{wordCount(s.compareReflection)} / 30 words {mentionsValue ? "· names a top value ✓" : ""}</div>

      {!done && (
        <div className="mt-8 flex items-center justify-between">
          <div className="text-xs" style={{ color: "var(--muted2)" }}>{ready ? "Ready to submit." : "Both fields and a named value are required."}</div>
          {previewLocked ? (
            <span className="text-xs px-4 py-2.5 rounded-full flex items-center gap-1.5" style={{ background: "var(--border)", color: "var(--muted2)" }}><Lock size={12} /> Locked until "{prevTitle}" is done</span>
          ) : (
            <button disabled={!ready} onClick={s.submitWednesday} className="duo-btn px-5 py-2.5 rounded-2xl text-sm font-bold" style={{ background: ready ? "var(--cta)" : "var(--border)", color: ready ? "var(--cta-ink)" : "var(--muted2)", boxShadow: ready ? "0 2px 8px rgba(20,20,20,0.16)" : "none" }}>Complete mission</button>
          )}
        </div>
      )}
    </Shell>
  );
}

function ThursdayView({ mission, onBack, done, s, previewLocked, prevTitle }) {
  const locked = done || s.thuAttempts >= 2 || (s.thuResult && s.thuResult.tier !== "Developing");
  return (
    <Shell mission={mission} onBack={onBack} previewLocked={previewLocked} prevTitle={prevTitle}>
      <p className="text-sm mb-3" style={{ color: "var(--muted3)" }}>Your values: <strong style={{ color: "var(--gold)" }}>{s.selectedValues.join(", ")}</strong></p>
      <textarea disabled={locked} value={s.missionDraft} onChange={(e) => s.setMissionDraft(e.target.value)} rows={5} placeholder="I lead with ___. I refuse to ___ even when ___." className="w-full rounded-xl px-4 py-3 text-sm outline-none mb-4" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--ink)" }} />

      <div className="flex flex-col gap-2 mb-4">
        {s.thuChecks.map((c) => (
          <div key={c.label} className="flex items-center gap-2 text-sm" style={{ color: c.pass ? "var(--success)" : "var(--muted2)" }}>
            {c.pass ? <Check size={14} /> : <X size={14} style={{ color: "var(--path-line)" }} />} {c.label}
          </div>
        ))}
      </div>

      <GradeResult result={s.thuResult} grading={s.thuGrading} />

      {!locked && (
        <div className="mt-8 flex items-center justify-between">
          <div className="text-xs" style={{ color: "var(--muted2)" }}>{done ? "Mission complete." : `Attempt ${s.thuAttempts} of 2`}</div>
          {previewLocked ? (
            <span className="text-xs px-4 py-2.5 rounded-full flex items-center gap-1.5" style={{ background: "var(--border)", color: "var(--muted2)" }}><Lock size={12} /> Locked until "{prevTitle}" is done</span>
          ) : (
            <button disabled={!s.thuChecklistPassed || s.thuGrading} onClick={s.submitThursday} className="duo-btn px-5 py-2.5 rounded-2xl text-sm font-bold" style={{ background: s.thuChecklistPassed ? "var(--cta)" : "var(--border)", color: s.thuChecklistPassed ? "var(--cta-ink)" : "var(--muted2)", boxShadow: s.thuChecklistPassed ? "0 2px 8px rgba(20,20,20,0.16)" : "none" }}>
              {s.thuAttempts === 0 ? "Submit for coach review" : "Revise"}
            </button>
          )}
        </div>
      )}
    </Shell>
  );
}

function FridayView({ mission, onBack, done, s, previewLocked, prevTitle }) {
  const ready = wordCount(s.panel1) >= 50 && wordCount(s.panel2) >= 40;
  const locked = done || s.friAttempts >= 2 || (s.friResult && s.friResult.tier !== "Developing");
  return (
    <Shell mission={mission} onBack={onBack} previewLocked={previewLocked} prevTitle={prevTitle}>
      <p className="text-sm mb-5" style={{ color: "var(--muted3)" }}>Read your mission statement to your house group today. Then a panelist asks two follow-ups; no rehearsed answers accepted.</p>

      <label className="text-xs font-bold tracking-widest uppercase mb-2 block" style={{ color: "var(--gold)" }}>"Tell me about a specific moment this year when living out one of your values actually cost you something real. What happened?" (min 50 words)</label>
      <textarea disabled={locked} value={s.panel1} onChange={(e) => s.setPanel1(e.target.value)} rows={4} className="w-full rounded-xl px-4 py-3 text-sm outline-none mb-1" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--ink)" }} />
      <div className="text-xs mb-5" style={{ color: wordCount(s.panel1) >= 50 ? "var(--success)" : "var(--muted2)" }}>{wordCount(s.panel1)} / 50 words</div>

      <label className="text-xs font-bold tracking-widest uppercase mb-2 block" style={{ color: "var(--gold)" }}>"Which value on your list are you LEAST consistent at living out? Be honest, what gets in the way?" (min 40 words)</label>
      <textarea disabled={locked} value={s.panel2} onChange={(e) => s.setPanel2(e.target.value)} rows={4} className="w-full rounded-xl px-4 py-3 text-sm outline-none" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--ink)" }} />
      <div className="text-xs mt-1" style={{ color: wordCount(s.panel2) >= 40 ? "var(--success)" : "var(--muted2)" }}>{wordCount(s.panel2)} / 40 words</div>

      <GradeResult result={s.friResult} grading={s.friGrading} />

      {!locked && (
        <div className="mt-8 flex items-center justify-between">
          <div className="text-xs" style={{ color: "var(--muted2)" }}>{done ? "Defense complete." : `Attempt ${s.friAttempts} of 2`}</div>
          {previewLocked ? (
            <span className="text-xs px-4 py-2.5 rounded-full flex items-center gap-1.5" style={{ background: "var(--border)", color: "var(--muted2)" }}><Lock size={12} /> Locked until "{prevTitle}" is done</span>
          ) : (
            <button disabled={!ready || s.friGrading} onClick={s.submitFriday} className="duo-btn px-5 py-2.5 rounded-2xl text-sm font-bold" style={{ background: ready ? "var(--cta)" : "var(--border)", color: ready ? "var(--cta-ink)" : "var(--muted2)", boxShadow: ready ? "0 2px 8px rgba(20,20,20,0.16)" : "none" }}>
              {s.friAttempts === 0 ? "Submit to panel" : "Revise"}
            </button>
          )}
        </div>
      )}
    </Shell>
  );
}

function PortfolioView({ onBack, selectedValues, missionDraft, weekBadge, weekBadgeColor, tiers, onFlashForward }) {
  return (
    <main className="px-5 md:px-10 py-8 max-w-2xl mx-auto fade-in">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm mb-6" style={{ color: "var(--muted)" }}><ChevronLeft size={16} /> Back to path</button>
      <div className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: "var(--blue)" }}>Portfolio artifact</div>
      <h1 className="font-display font-700 text-2xl mb-2">My Personal Mission Statement</h1>
      <div className="flex items-center gap-1.5 text-sm mb-6" style={{ color: weekBadgeColor }}><Trophy size={16} /> {weekBadge} badge · Chapter 1: Identity</div>

      <div className="rounded-2xl px-6 py-6 mb-6" style={{ background: "linear-gradient(135deg, var(--surface-alt), var(--surface))", border: `1px solid ${weekBadgeColor}` }}>
        <p className="text-lg font-display italic leading-relaxed">"{missionDraft}"</p>
      </div>

      <div className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--muted2)" }}>Your values</div>
      <div className="flex flex-wrap gap-2 mb-8">
        {selectedValues.map((v) => (<span key={v} className="text-sm px-3 py-1.5 rounded-full" style={{ background: "var(--crimson-bg)", color: "var(--crimson-text)", border: "1px solid var(--border-crimson)" }}>{v}</span>))}
      </div>

      <div className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--muted2)" }}>Coach-reviewed scores this week</div>
      <div className="flex flex-wrap gap-2 mb-10">
        {Object.entries(tiers).map(([id, tier]) => (
          <span key={id} className="text-sm px-3 py-1.5 rounded-full" style={{ background: "var(--surface)", border: `1px solid ${{ Developing: "var(--developing)", Proficient: "var(--blue)", Exemplary: "var(--gold)" }[tier]}`, color: { Developing: "var(--developing)", Proficient: "var(--blue)", Exemplary: "var(--gold)" }[tier] }}>
            {id.toUpperCase()}: {TIER_LABEL[tier]}
          </span>
        ))}
      </div>

      <button onClick={onFlashForward} className="w-full flex items-center justify-between rounded-2xl px-5 py-4" style={{ background: "var(--wisdom-bg)", border: "1px solid var(--border-blue)" }}>
        <div className="text-left">
          <div className="text-[11px] font-semibold tracking-widest uppercase mb-1" style={{ color: "var(--wisdom-text)" }}>Bonus scene</div>
          <div className="font-display font-600">Flash-forward: Week 8 check-in</div>
        </div>
        <ChevronLeft size={18} style={{ transform: "rotate(180deg)", color: "var(--wisdom-text)" }} />
      </button>
    </main>
  );
}

function FlashForward({ onBack, primaryValue, monJustification }) {
  const [entry, setEntry] = useState("");
  const [reply, setReply] = useState(null);
  const [loading, setLoading] = useState(false);

  async function send() {
    if (wordCount(entry) < 15) return;
    setLoading(true);
    const prompt = `You are "the Coach," a warm but direct AI mentor inside a leadership app for an 8th grader (an unnamed, non-personified role, not a specific character). Early in the semester (Week 1), this student told you their top value was "${primaryValue}" and gave this real example of living it out: "${monJustification}". It's now Week 8. The student just wrote this journal entry: "${entry}".

Respond as the Coach in 2-4 sentences: reference their Week 1 value naturally, without just repeating it word for word, and ask one honest, specific follow-up question about the gap between what they said mattered then and what they're describing now. Don't lecture or moralize. Sound like a real mentor, not a chatbot.

Respond with ONLY plain text: no JSON, no markdown, no quotation marks around the whole thing.`;
    const result = await callClaude(prompt, { json: false });
    setReply(result);
    setLoading(false);
  }

  return (
    <main className="px-5 md:px-10 py-8 max-w-2xl mx-auto fade-in">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm mb-6" style={{ color: "var(--muted)" }}><ChevronLeft size={16} /> Back to portfolio</button>
      <div className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: "var(--wisdom-text)" }}>Bonus scene · Week 8</div>
      <h1 className="font-display font-700 text-2xl mb-2">Checking in with the Coach</h1>
      <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>This simulates the app remembering your Week 1 answers later in the season, using only what's in this session, nothing saved anywhere.</p>

      <label className="text-xs font-bold tracking-widest uppercase mb-2 block" style={{ color: "var(--gold)" }}>Journal entry: what's actually going on for you this week?</label>
      <textarea value={entry} onChange={(e) => setEntry(e.target.value)} rows={4} disabled={!!reply} className="w-full rounded-xl px-4 py-3 text-sm outline-none mb-4" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--ink)" }} placeholder="Try writing something that seems to drift from your Week 1 value..." />

      {!reply && (
        <button disabled={wordCount(entry) < 15 || loading} onClick={send} className="duo-btn flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold" style={{ background: wordCount(entry) >= 15 ? "var(--cta)" : "var(--border)", color: wordCount(entry) >= 15 ? "var(--cta-ink)" : "var(--muted2)", boxShadow: wordCount(entry) >= 15 ? "0 2px 8px rgba(20,20,20,0.16)" : "none" }}>
          {loading ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />} {loading ? "The Coach is thinking..." : "Send to the Coach"}
        </button>
      )}

      {reply && (
        <div className="rounded-2xl px-5 py-4 fade-in" style={{ background: "var(--wisdom-bg)", border: "1px solid var(--border-blue)" }}>
          <div className="text-[11px] font-semibold tracking-widest uppercase mb-2" style={{ color: "var(--wisdom-text)" }}>The Coach</div>
          <p className="text-sm leading-relaxed" style={{ color: "var(--ink)" }}>{reply}</p>
        </div>
      )}
    </main>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LEGACY LAB — PERFORMANCE COMMAND CENTER
   Multi-sport · Faith-centered · ADHD-friendly
═══════════════════════════════════════════════════════════════ */


export default PersonalDevelopmentApp;
