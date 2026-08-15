import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { FlashForwardScreen } from "./flashForward";

// ─── PORTFOLIO (real storage-backed) ────────────────────────────────────────
async function addPortfolioArtifact(artifact) {
  try {
    await fetch("/api/portfolio", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(artifact),
    });
  } catch (e) {}
}

function PortfolioScreen() {
  const [loaded, setLoaded] = useState(false);
  const [artifacts, setArtifacts] = useState([]);
  const [showFlashForward, setShowFlashForward] = useState(false);

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

  const SECTIONS = ["All Work", "Writing", "Projects", "Labs", "Athletic", "Development", "Capstones", "Transcript"];
  const [tab, setTab] = useState("All Work");
  const filtered = tab === "All Work" ? artifacts : artifacts.filter((a) => a.section === tab);

  if (showFlashForward) {
    return <FlashForwardScreen onBack={() => setShowFlashForward(false)} />;
  }

  return (
    <main className="px-5 md:px-10 py-8 max-w-3xl mx-auto fade-in">
      <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "var(--gold)" }}>Portfolio</div>
      <h1 className="font-display font-800 text-2xl mb-6">My Academic Portfolio</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        {SECTIONS.map((s) => (
          <button key={s} onClick={() => setTab(s)} className="text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: tab === s ? "var(--ink)" : "var(--surface)", color: tab === s ? "#FFFFFF" : "var(--muted2)", border: "1.5px solid var(--border)" }}>{s}</button>
        ))}
      </div>

      {!loaded ? (
        <div className="flex items-center gap-2 text-sm" style={{ color: "var(--muted2)" }}><Loader2 size={15} className="animate-spin" /> Loading portfolio...</div>
      ) : filtered.length === 0 ? (
        <p className="text-sm" style={{ color: "var(--muted2)" }}>Nothing here yet. Artifacts appear here automatically when you complete graded work.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((a) => (
            <div key={a.id} className="rounded-2xl px-5 py-4" style={{ background: "var(--surface)", border: "1.5px solid var(--border)" }}>
              <div className="flex items-center justify-between mb-1">
                <div className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--gold)" }}>{a.course} · {a.unit}</div>
                <div className="text-xs" style={{ color: "var(--muted2)" }}>{new Date(a.createdAt).toLocaleDateString()}</div>
              </div>
              <div className="font-display font-700 text-sm mb-1">{a.title}</div>
              <div className="text-xs mb-2" style={{ color: "var(--muted)" }}>Skill: {a.skill}</div>
              {a.score !== undefined && (
                <div className="text-xs font-bold" style={{ color: "var(--ink)" }}>Score: {a.score}{a.maxScore ? ` / ${a.maxScore}` : ""}</div>
              )}
            </div>
          ))}
        </div>
      )}

      <button onClick={() => setShowFlashForward(true)} className="w-full mt-6 flex items-center justify-between rounded-2xl px-5 py-4" style={{ background: "var(--surface)", border: "1.5px solid var(--gold)" }}>
        <div className="text-left">
          <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "var(--gold)" }}>Bonus scene</div>
          <div className="font-display font-700 text-sm">Check in with the Coach</div>
        </div>
        <span className="text-xs font-bold" style={{ color: "var(--gold)" }}>Open →</span>
      </button>
    </main>
  );
}

export { addPortfolioArtifact, PortfolioScreen };
