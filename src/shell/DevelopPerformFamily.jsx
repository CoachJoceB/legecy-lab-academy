import React from "react";
import { Lock } from "lucide-react";

function DevelopHome({ onNav }) {
  const items = [
    { id: "mental-toughness", label: "Mental Toughness", built: true },
    { id: "leadership", label: "Leadership", built: false },
    { id: "character", label: "Character", built: false },
    { id: "life-skills", label: "Life Skills", built: false },
  ];
  return (
    <main className="px-5 md:px-10 py-8 max-w-2xl mx-auto fade-in">
      <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "var(--gold)" }}>Develop</div>
      <h1 className="font-display font-800 text-2xl mb-6">Development</h1>
      <div className="flex flex-col gap-3">
        {items.map((it) => (
          <button key={it.id} disabled={!it.built} onClick={() => it.built && onNav(it.id)} className="w-full text-left rounded-2xl px-5 py-4 flex items-center justify-between" style={{ background: "var(--surface)", border: "1.5px solid var(--border)", opacity: it.built ? 1 : 0.6 }}>
            <div className="font-display font-700 text-sm">{it.label}</div>
            {it.built ? <span className="text-xs font-bold" style={{ color: "var(--gold)" }}>Open →</span> : <span className="text-xs font-bold flex items-center gap-1" style={{ color: "var(--muted2)" }}><Lock size={12} /> Coming soon</span>}
          </button>
        ))}
      </div>
    </main>
  );
}

function PerformHome({ onOpenAthlete }) {
  const items = [
    { label: "Training Hub", desc: "Sport-specific training plans" },
    { label: "Goals", desc: "Athletic, fitness, and academic goals" },
    { label: "Film Hub", desc: "Film review and breakdowns" },
    { label: "AI Coach", desc: "Effort reflection and coaching feedback" },
  ];
  return (
    <main className="px-5 md:px-10 py-8 max-w-2xl mx-auto fade-in">
      <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "var(--gold)" }}>Perform</div>
      <h1 className="font-display font-800 text-2xl mb-2">Athlete Development</h1>
      <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>Training, goals, film, and coaching, all in the Athlete Development app.</p>
      <div className="flex flex-col gap-2 mb-6">
        {items.map((it) => (
          <div key={it.label} className="rounded-2xl px-5 py-4" style={{ background: "var(--surface)", border: "1.5px solid var(--border)" }}>
            <div className="font-display font-700 text-sm">{it.label}</div>
            <div className="text-xs" style={{ color: "var(--muted2)" }}>{it.desc}</div>
          </div>
        ))}
      </div>
      <button onClick={onOpenAthlete} className="duo-btn w-full px-6 py-3.5 rounded-2xl text-sm font-bold" style={{ background: "var(--cta)", color: "var(--cta-ink)", boxShadow: "0 2px 8px rgba(20,20,20,0.16)" }}>Open Athlete Development →</button>
    </main>
  );
}

function FamilyHome({ onOpenAthlete }) {
  return (
    <main className="px-5 md:px-10 py-8 max-w-2xl mx-auto fade-in">
      <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "var(--gold)" }}>Family</div>
      <h1 className="font-display font-800 text-2xl mb-2">Parent Command</h1>
      <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>Parent Command lives inside the Athlete Development app for now, log in there with the parent PIN.</p>
      <button onClick={onOpenAthlete} className="duo-btn w-full px-6 py-3.5 rounded-2xl text-sm font-bold" style={{ background: "var(--cta)", color: "var(--cta-ink)", boxShadow: "0 2px 8px rgba(20,20,20,0.16)" }}>Open Parent Command →</button>
    </main>
  );
}


export { DevelopHome, PerformHome, FamilyHome };
