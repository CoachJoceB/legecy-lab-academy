import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

// Persists what a student actually wrote in Mission 1, so the "Coach
// remembers you" flash-forward scene can reference real answers later,
// not a fabrication. This is the one piece of student-authored content the
// spec-driven mission system captures beyond grading tiers, kept separate
// from stakes/portfolio because it's neither a score nor a shareable
// artifact, just raw context for one specific bonus scene.

async function saveMission1Answers({ selectedValues, justification }) {
  try {
    await fetch("/api/mission1-answers", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ selectedValues, justification }),
    });
  } catch (e) {}
}

async function getMission1Answers() {
  try {
    const res = await fetch("/api/mission1-answers", { credentials: "include" });
    if (!res.ok) return null;
    const data = await res.json();
    return data.answer || null;
  } catch (e) {
    return null;
  }
}


function FlashForwardScreen({ onBack }) {
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState(null);
  const [entry, setEntry] = useState("");
  const [reply, setReply] = useState(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    (async () => {
      const a = await getMission1Answers();
      setAnswers(a);
      setLoading(false);
    })();
  }, []);

  function wordCount(s) {
    return (s || "").trim().split(/\s+/).filter(Boolean).length;
  }

  async function send() {
    if (wordCount(entry) < 15) return;
    setSending(true);
    const prompt = `You are "the Coach," a warm but direct AI mentor inside a leadership app for an 8th grader, an unnamed, non-personified role, not a specific character. Early in the season (Mission 1), this student picked these values as who they want to be: ${(answers?.selectedValues || []).join(", ")}. They also wrote this real example of living out one of those values: "${answers?.justification || ""}". Later, the student just wrote this journal entry: "${entry}".

Respond as the Coach in 2 to 4 sentences: reference their Mission 1 answer naturally, without just repeating it word for word, and ask one honest, specific follow-up question about the gap between what they said mattered then and what they're describing now. Do not lecture or moralize. Sound like a real mentor, not a chatbot.

Respond with ONLY plain text, no JSON, no markdown, no quotation marks around the whole thing.`;
    try {
      const response = await fetch("/api/grade", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setReply((data.text || "").replace(/```/g, "").trim());
    } catch (e) {
      setReply("The Coach is offline right now, try again in a moment.");
    }
    setSending(false);
  }

  if (loading) {
    return (
      <main className="px-5 md:px-10 py-8 max-w-2xl mx-auto fade-in">
        <div className="flex items-center gap-2 text-sm" style={{ color: "var(--muted2)" }}><Loader2 size={15} className="animate-spin" /> Loading...</div>
      </main>
    );
  }

  if (!answers) {
    return (
      <main className="px-5 md:px-10 py-8 max-w-2xl mx-auto fade-in">
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm mb-6" style={{ color: "var(--muted2)" }}>Back to portfolio</button>
        <p className="text-sm" style={{ color: "var(--muted2)" }}>Finish Mission 1 first, this scene needs a real answer from you to reference.</p>
      </main>
    );
  }

  return (
    <main className="px-5 md:px-10 py-8 max-w-2xl mx-auto fade-in">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm mb-6" style={{ color: "var(--muted2)" }}>Back to portfolio</button>
      <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "var(--gold)" }}>Bonus scene</div>
      <h1 className="font-display font-800 text-2xl mb-2">Checking in with the Coach</h1>
      <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>This uses your real Mission 1 answer, saved on this device, nothing sent anywhere except this one request.</p>

      <label className="text-xs font-bold tracking-widest uppercase mb-2 block" style={{ color: "var(--gold)" }}>Journal entry, what's actually going on for you this week?</label>
      <textarea value={entry} onChange={(e) => setEntry(e.target.value)} rows={4} disabled={!!reply} className="w-full rounded-xl px-4 py-3 text-sm outline-none mb-4" style={{ background: "var(--surface)", border: "1.5px solid var(--border)", color: "var(--ink)" }} placeholder="Try writing something that seems to drift from your Mission 1 value..." />

      {!reply && (
        <button disabled={wordCount(entry) < 15 || sending} onClick={send} className="duo-btn px-5 py-2.5 rounded-2xl text-sm font-bold" style={{ background: wordCount(entry) >= 15 ? "var(--cta)" : "var(--border)", color: wordCount(entry) >= 15 ? "var(--cta-ink)" : "var(--muted2)" }}>
          {sending ? "The Coach is thinking..." : "Send to the Coach"}
        </button>
      )}

      {reply && (
        <div className="rounded-2xl px-5 py-4 fade-in" style={{ background: "var(--surface)", border: "1.5px solid var(--gold)" }}>
          <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--gold)" }}>The Coach</div>
          <p className="text-sm leading-relaxed" style={{ color: "var(--ink)" }}>{reply}</p>
        </div>
      )}
    </main>
  );
}

export { saveMission1Answers, getMission1Answers, FlashForwardScreen };
