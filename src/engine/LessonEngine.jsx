import React, { useState } from "react";
import { ArrowLeft, Check, X } from "lucide-react";

// The Lesson Engine is subject-agnostic. It knows nothing about History,
// Math, or Personal Development specifically, it only knows how to render a
// spec's step "kind"s. Every field added below to support Personal
// Development is optional and defaults to prior behavior, so History, Math,
// and Mental Toughness Day 1 are unaffected.
//
// Step kinds: choice, text, multi-text, content, graded-write (AI-graded,
// now with an optional checklist gate and tier labels), graded-numeric
// (deterministic), multi-select (pick exactly N), choice-justify (pick one
// of two options and justify it, graded by a local heuristic function, no
// AI call).
//
// A spec can optionally define villain: { name, tagline } and its first
// step can optionally define villainLine, shown as a one-time briefing
// before the lesson begins. A spec can also optionally provide onAward via
// the LessonEngine's own prop (passed by the host app), called whenever a
// gradeable step resolves, so cross-lesson stakes (XP, house points) live
// outside the engine, where student-wide state belongs.

function wordCount(s) {
  return (s || "").trim().split(/\s+/).filter(Boolean).length;
}

function VillainBriefing({ villain, line, onBegin }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center px-6" style={{ background: "#000" }}>
      <div className="text-center max-w-md fade-in">
        <div className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: "#FF7A1A" }}>{villain.name} whispers</div>
        <p className="italic text-base mb-8" style={{ color: "#FFFFFF" }}>"{line}"</p>
        <button onClick={onBegin} className="duo-btn px-6 py-3 rounded-2xl text-sm font-bold" style={{ background: "#FF7A1A", color: "#141414", boxShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>
          Prove {villain.name} wrong →
        </button>
      </div>
    </div>
  );
}

function GradedWriteBlock({ step, value, setValue, onSubmit, result, grading, attempts }) {
  const ready = step.fields.every((f) => (value?.[f.key] || "").trim());
  const checklistPassed = !step.checklist || step.checklist.every((c) => c.test(value || {}));
  const locked = attempts >= 2 || (result && result.score >= step.maxScore - 1);
  const tierLabel = (score) => (step.tierLabels ? step.tierLabels[score] : null);
  return (
    <div className="fade-in">
      <p className="text-sm font-bold mb-4" style={{ color: "var(--gold)" }}>{step.prompt}</p>
      {step.fields.map((f) => (
        <div key={f.key} className="mb-3">
          <label className="text-xs font-bold tracking-widest uppercase mb-1.5 block" style={{ color: "var(--gold)" }}>{f.label}</label>
          <textarea disabled={locked} value={value?.[f.key] || ""} onChange={(e) => setValue({ ...value, [f.key]: e.target.value })} rows={2} className="w-full rounded-xl px-4 py-3 text-sm outline-none" style={{ background: "var(--surface)", border: "1.5px solid var(--border)", color: "var(--ink)" }} />
        </div>
      ))}

      {step.checklist && (
        <div className="flex flex-col gap-1.5 mb-3">
          {step.checklist.map((c) => {
            const pass = c.test(value || {});
            return (
              <div key={c.label} className="flex items-center gap-2 text-sm" style={{ color: pass ? "var(--gold)" : "var(--muted2)" }}>
                {pass ? <Check size={14} /> : <X size={14} style={{ color: "var(--border)" }} />} {c.label}
              </div>
            );
          })}
        </div>
      )}

      {result && (
        <div className="mt-4 rounded-xl px-4 py-3" style={{ background: "var(--surface)", border: `1.5px solid ${result.score >= step.maxScore - 1 ? "var(--gold)" : "var(--developing)"}` }}>
          <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: result.score >= step.maxScore - 1 ? "var(--gold)" : "var(--developing)" }}>
            {tierLabel(result.score) ? `Coach says, ${tierLabel(result.score)}` : `Score: ${result.score} / ${step.maxScore}`}
          </div>
          <p className="text-sm" style={{ color: "var(--muted)" }}>{result.feedback}</p>
        </div>
      )}
      {!locked && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs" style={{ color: "var(--muted2)" }}>Attempt {attempts} of 2</div>
          <button disabled={!ready || !checklistPassed || grading} onClick={onSubmit} className="duo-btn px-5 py-2.5 rounded-2xl text-sm font-bold" style={{ background: ready && checklistPassed ? "var(--cta)" : "var(--border)", color: ready && checklistPassed ? "var(--cta-ink)" : "var(--muted2)", boxShadow: ready && checklistPassed ? "0 2px 8px rgba(20,20,20,0.16)" : "none" }}>
            {grading ? "Grading..." : attempts === 0 ? "Submit" : "Revise"}
          </button>
        </div>
      )}
    </div>
  );
}

function GradedNumericBlock({ step, value, setValue, checked, setChecked }) {
  return (
    <div className="fade-in">
      <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>{step.instructions}</p>
      {step.problems.map((p, i) => {
        const v = value?.[i] ?? "";
        const isChecked = checked?.[i] !== undefined;
        const isCorrect = isChecked && v.trim() === p.answer;
        return (
          <div key={i} className="mb-3">
            <label className="text-sm font-bold mb-1.5 block" style={{ color: "var(--gold)" }}>{p.prompt}</label>
            <div className="flex items-center gap-2">
              <input
                disabled={isCorrect}
                value={v}
                onChange={(e) => setValue({ ...(value || {}), [i]: e.target.value })}
                placeholder="x ="
                className="rounded-xl px-4 py-2.5 text-sm outline-none"
                style={{ width: 100, background: "var(--surface)", border: `1.5px solid ${isChecked ? (isCorrect ? "var(--gold)" : "var(--developing)") : "var(--border)"}`, color: "var(--ink)" }}
              />
              {!isCorrect && (
                <button onClick={() => setChecked({ ...(checked || {}), [i]: true })} disabled={!v.trim()} className="duo-btn px-4 py-2.5 rounded-xl text-xs font-bold" style={{ background: v.trim() ? "var(--cta)" : "var(--border)", color: v.trim() ? "var(--cta-ink)" : "var(--muted2)" }}>
                  Check
                </button>
              )}
              {isChecked && (
                <span className="text-xs font-bold" style={{ color: isCorrect ? "var(--gold)" : "var(--developing)" }}>
                  {isCorrect ? "Correct" : "Not yet, try again"}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MultiSelectBlock({ step, value, setValue }) {
  const selected = value || [];
  return (
    <div className="fade-in">
      <p className="text-sm font-bold mb-4" style={{ color: "var(--gold)" }}>{step.prompt}</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-2">
        {step.options.map((opt) => {
          const active = selected.includes(opt);
          return (
            <button
              key={opt}
              onClick={() => setValue(active ? selected.filter((o) => o !== opt) : selected.length < step.selectCount ? [...selected, opt] : selected)}
              className="duo-btn text-sm font-bold rounded-2xl px-3 py-2.5"
              style={{ background: active ? "var(--crimson-bg)" : "var(--surface)", border: `1.5px solid ${active ? "var(--gold)" : "var(--border)"}`, color: active ? "var(--gold)" : "var(--ink)" }}
            >
              {opt}
            </button>
          );
        })}
      </div>
      <div className="text-xs" style={{ color: "var(--muted2)" }}>{selected.length} / {step.selectCount} selected</div>
    </div>
  );
}

function ChoiceJustifyBlock({ step, value, setValue, onSubmit, result }) {
  const choice = value?.choice;
  const text = value?.text || "";
  const submitted = !!result;
  const canSubmit = choice && wordCount(text) >= (step.minWords || 40) && !submitted;
  return (
    <div className="fade-in">
      <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>{step.prompt}</p>
      <div className="flex gap-2 mb-4">
        {[step.optionA, step.optionB].map((opt) => (
          <button key={opt} disabled={submitted} onClick={() => setValue({ ...value, choice: opt })} className="duo-btn flex-1 text-sm font-bold rounded-2xl px-4 py-3" style={{ background: choice === opt ? "var(--crimson-bg)" : "var(--surface)", border: `1.5px solid ${choice === opt ? "var(--gold)" : "var(--border)"}`, color: choice === opt ? "var(--gold)" : "var(--ink)" }}>
            Choose {opt}
          </button>
        ))}
      </div>
      <textarea disabled={submitted} value={text} onChange={(e) => setValue({ ...value, text: e.target.value })} rows={4} placeholder={`Minimum ${step.minWords || 40} words`} className="w-full rounded-xl px-4 py-3 text-sm outline-none" style={{ background: "var(--surface)", border: "1.5px solid var(--border)", color: "var(--ink)" }} />
      <div className="text-xs mt-1 mb-4" style={{ color: wordCount(text) >= (step.minWords || 40) ? "var(--gold)" : "var(--muted2)" }}>{wordCount(text)} / {step.minWords || 40} words</div>

      {result && (
        <div className="rounded-xl px-4 py-3 mb-4 fade-in" style={{ background: "var(--surface)", border: `1.5px solid ${result.tier === "Developing" ? "var(--developing)" : "var(--gold)"}` }}>
          <div className="text-xs font-bold uppercase tracking-widest" style={{ color: result.tier === "Developing" ? "var(--developing)" : "var(--gold)" }}>Coach says, {result.label}</div>
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>{result.feedback}</p>
        </div>
      )}
      {!submitted && (
        <div className="flex items-center justify-between">
          <div className="text-xs" style={{ color: "var(--muted2)" }}>No retries here, think before you submit.</div>
          <button disabled={!canSubmit} onClick={onSubmit} className="duo-btn px-5 py-2.5 rounded-2xl text-sm font-bold" style={{ background: canSubmit ? "var(--cta)" : "var(--border)", color: canSubmit ? "var(--cta-ink)" : "var(--muted2)", boxShadow: canSubmit ? "0 2px 8px rgba(20,20,20,0.16)" : "none" }}>Submit</button>
        </div>
      )}
    </div>
  );
}

function LessonEngine({ spec, onBack, onAward, locked, lockedReason }) {
  const [section, setSection] = useState(0);
  const [values, setValues] = useState({});
  const [gradedResults, setGradedResults] = useState({});
  const [gradedAttempts, setGradedAttempts] = useState({});
  const [gradingKey, setGradingKey] = useState(null);
  const [numericChecked, setNumericChecked] = useState({});
  const [briefingSeen, setBriefingSeen] = useState(false);
  const [multiTextAwarded, setMultiTextAwarded] = useState({});

  const step = spec.steps[section];

  function award(stepKey, tier, xp, house) {
    if (onAward) onAward({ stepKey, tier, xp, house, lessonMeta: spec.meta, values });
  }

  async function submitGradedWrite(step) {
    setGradingKey(step.key);
    setGradedAttempts((a) => ({ ...a, [step.key]: (a[step.key] || 0) + 1 }));
    const fieldsText = step.fields.map((f) => `${f.label}: "${(values[step.key] || {})[f.key] || ""}"`).join("\n");
    const prompt = `You are grading a student's structured response for a ${spec.subject} lesson.

The prompt was: "${step.prompt}"

Student's response:
${fieldsText}

${step.rubric}

Respond with ONLY this JSON, no markdown: {"score": 1-${step.maxScore}, "feedback": "one direct sentence explaining the score, coach voice, not a teacher lecturing"}`;
    try {
      const response = await fetch("/api/grade", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      const raw = data.text || "";
      const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
      setGradedResults((r) => ({ ...r, [step.key]: { score: parsed.score, feedback: parsed.feedback } }));
      if (step.rewardMap) {
        const tierName = step.tierLabels ? step.tierLabels[parsed.score] : null;
        const reward = step.rewardMap[parsed.score] || {};
        award(step.key, tierName, reward.xp || 0, reward.house || 0);
      }
    } catch (err) {
      const fallback = step.maxScore - 1;
      setGradedResults((r) => ({ ...r, [step.key]: { score: fallback, feedback: "Feedback is temporarily unavailable, this was scored on completion only." } }));
    }
    setGradingKey(null);
  }

  function submitChoiceJustify(step) {
    const v = values[step.key] || {};
    const tier = step.grade(v.choice, v.text || "");
    const label = step.tierLabels?.[tier] || tier;
    const feedback = step.feedbackByTier?.[tier] || "";
    setGradedResults((r) => ({ ...r, [step.key]: { tier, label, feedback } }));
    if (step.rewardMap) {
      const reward = step.rewardMap[tier] || {};
      award(step.key, tier, reward.xp || 0, reward.house || 0);
    }
  }

  function confirmMultiTextGate(step) {
    if (!step.onPassAward || multiTextAwarded[step.key]) return;
    const r = step.onPassAward;
    award(step.key, r.tier, r.xp || 0, r.house || 0);
    setMultiTextAwarded((a) => ({ ...a, [step.key]: true }));
  }

  const isLastStep = section === spec.steps.length - 1;
  const masteryFailed = step.kind === "graded-numeric" && step.isMasteryGate &&
    step.problems.every((p, i) => numericChecked[step.key]?.[i] !== undefined) &&
    !step.problems.every((p, i) => (values[step.key]?.[i] || "").trim() === p.answer);
  const masteryPassed = step.kind === "graded-numeric" && step.isMasteryGate &&
    step.problems.every((p, i) => (values[step.key]?.[i] || "").trim() === p.answer && numericChecked[step.key]?.[i]);

  const multiSelectReady = step.kind === "multi-select" && (values[step.key] || []).length === step.selectCount;
  const multiTextGateReady = step.kind === "multi-text" && step.gate && step.gate(values[step.key] || {});

  const showBriefing = spec.villain && !briefingSeen;
  if (showBriefing) {
    return <VillainBriefing villain={spec.villain} line={spec.steps[0].villainLine || spec.villain.tagline} onBegin={() => setBriefingSeen(true)} />;
  }

  return (
    <main className="px-5 md:px-10 py-8 max-w-2xl mx-auto fade-in">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm mb-6" style={{ color: "var(--muted2)" }}>
        <ArrowLeft size={16} /> All subjects
      </button>
      <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "var(--gold)" }}>{spec.subject} · {spec.courseLabel}</div>
      <h1 className="font-display font-800 text-2xl mb-1">{step.sectionLabel}</h1>
      <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>{spec.meta}</p>

      <div className="flex items-center gap-1.5 mb-8">
        {spec.steps.map((_, i) => (
          <div key={i} className="h-1.5 rounded-full flex-1" style={{ background: i <= section ? "var(--gold)" : "var(--border)" }} />
        ))}
      </div>

      <div className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "var(--muted2)" }}>{step.sectionLabel}, {step.minutes} minutes</div>

      {locked && (
        <div className="flex items-center gap-2 rounded-xl px-4 py-3 mb-6 text-sm fade-in" style={{ background: "var(--surface)", border: "1.5px solid var(--developing)", color: "var(--developing)" }}>
          Preview only, finish "{lockedReason}" first to unlock submitting this mission.
        </div>
      )}

      <fieldset disabled={locked} style={{ border: "none", margin: 0, padding: 0 }}>

      {step.kind === "choice" && (
        <div className="fade-in">
          <p className="text-sm font-bold mb-4" style={{ color: "var(--gold)" }}>{step.prompt}</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {step.options.map((opt) => (
              <button key={opt} onClick={() => setValues((v) => ({ ...v, [step.key]: { ...(v[step.key] || {}), choice: opt } }))} className="duo-btn text-sm font-bold rounded-2xl px-4 py-2.5" style={{ background: values[step.key]?.choice === opt ? "var(--crimson-bg)" : "var(--surface)", border: `1.5px solid ${values[step.key]?.choice === opt ? "var(--gold)" : "var(--border)"}`, color: values[step.key]?.choice === opt ? "var(--gold)" : "var(--ink)" }}>{opt}</button>
            ))}
          </div>
          {step.followUp && (
            <>
              <label className="text-xs font-bold tracking-widest uppercase mb-2 block" style={{ color: "var(--gold)" }}>{step.followUp}</label>
              <textarea value={values[step.key]?.why || ""} onChange={(e) => setValues((v) => ({ ...v, [step.key]: { ...(v[step.key] || {}), why: e.target.value } }))} rows={2} className="w-full rounded-xl px-4 py-3 text-sm outline-none" style={{ background: "var(--surface)", border: "1.5px solid var(--border)", color: "var(--ink)" }} />
            </>
          )}
        </div>
      )}

      {step.kind === "text" && (
        <div className="fade-in">
          <label className="text-xs font-bold tracking-widest uppercase mb-2 block" style={{ color: "var(--gold)" }}>{step.prompt}</label>
          <textarea value={values[step.key] || ""} onChange={(e) => setValues((v) => ({ ...v, [step.key]: e.target.value }))} rows={2} className="w-full rounded-xl px-4 py-3 text-sm outline-none" style={{ background: "var(--surface)", border: "1.5px solid var(--border)", color: "var(--ink)" }} />
        </div>
      )}

      {step.kind === "multi-text" && (
        <div className="fade-in">
          {step.instructions && <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>{step.instructions}</p>}
          {step.prompt && <p className="text-sm font-bold mb-4" style={{ color: "var(--gold)" }}>{step.prompt}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {step.groups.map((g, gi) => (
              <div key={gi}>
                {g.label && <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--gold)" }}>{g.label}</div>}
                {Array.from({ length: g.count }).map((_, i) => (
                  <input
                    key={i}
                    value={(values[step.key]?.[gi] || [])[i] || ""}
                    onChange={(e) => setValues((v) => {
                      const groupArr = [...(v[step.key]?.[gi] || [])];
                      groupArr[i] = e.target.value;
                      return { ...v, [step.key]: { ...(v[step.key] || {}), [gi]: groupArr } };
                    })}
                    placeholder={g.labels ? g.labels[i] : `${g.placeholder} ${i + 1}`}
                    className="w-full rounded-xl px-3 py-2.5 text-sm outline-none mb-2"
                    style={{ background: "var(--surface)", border: "1.5px solid var(--border)", color: "var(--ink)" }}
                  />
                ))}
              </div>
            ))}
          </div>
          {step.gate && (
            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs" style={{ color: multiTextGateReady ? "var(--gold)" : "var(--muted2)" }}>{multiTextGateReady ? "Ready to submit." : "Fill in the required fields."}</div>
              {!multiTextAwarded[step.key] ? (
                <button disabled={!multiTextGateReady} onClick={() => confirmMultiTextGate(step)} className="duo-btn px-5 py-2.5 rounded-2xl text-sm font-bold" style={{ background: multiTextGateReady ? "var(--cta)" : "var(--border)", color: multiTextGateReady ? "var(--cta-ink)" : "var(--muted2)", boxShadow: multiTextGateReady ? "0 2px 8px rgba(20,20,20,0.16)" : "none" }}>Complete</button>
              ) : (
                <span className="text-xs font-bold" style={{ color: "var(--gold)" }}>Complete</span>
              )}
            </div>
          )}
        </div>
      )}

      {step.kind === "content" && (
        <div className="fade-in rounded-2xl px-5 py-5" style={{ background: "var(--surface)", border: "1.5px solid var(--gold)" }}>
          <div className="font-display font-700 text-base mb-3" style={{ color: "var(--gold)" }}>{step.title}</div>
          {step.body.map((line, i) => (
            <p key={i} className="text-sm mb-2 last:mb-0" style={{ color: "var(--ink)" }}>{line}</p>
          ))}
        </div>
      )}

      {step.kind === "graded-write" && (
        <GradedWriteBlock
          step={step}
          value={values[step.key]}
          setValue={(v) => setValues((prev) => ({ ...prev, [step.key]: v }))}
          onSubmit={() => submitGradedWrite(step)}
          result={gradedResults[step.key]}
          grading={gradingKey === step.key}
          attempts={gradedAttempts[step.key] || 0}
        />
      )}

      {step.kind === "graded-numeric" && (
        <>
          <GradedNumericBlock
            step={step}
            value={values[step.key]}
            setValue={(v) => setValues((prev) => ({ ...prev, [step.key]: v }))}
            checked={numericChecked[step.key]}
            setChecked={(c) => setNumericChecked((prev) => ({ ...prev, [step.key]: c }))}
          />
          {step.isMasteryGate && masteryFailed && (
            <div className="mt-4 rounded-xl px-4 py-3" style={{ background: "var(--surface)", border: "1.5px solid var(--developing)" }}>
              <p className="text-sm font-bold" style={{ color: "var(--developing)" }}>Not mastered yet. Fix the ones marked wrong above before moving on, mastery here means both correct, not just attempted.</p>
            </div>
          )}
          {step.isMasteryGate && masteryPassed && (
            <div className="mt-4 rounded-xl px-4 py-3" style={{ background: "var(--surface)", border: "1.5px solid var(--gold)" }}>
              <p className="text-sm font-bold" style={{ color: "var(--gold)" }}>Mastered. Both correct.</p>
            </div>
          )}
        </>
      )}

      {step.kind === "multi-select" && (
        <MultiSelectBlock
          step={step}
          value={values[step.key]}
          setValue={(v) => setValues((prev) => ({ ...prev, [step.key]: v }))}
        />
      )}

      {step.kind === "choice-justify" && (
        <ChoiceJustifyBlock
          step={step}
          value={values[step.key]}
          setValue={(v) => setValues((prev) => ({ ...prev, [step.key]: v }))}
          onSubmit={() => submitChoiceJustify(step)}
          result={gradedResults[step.key]}
        />
      )}

      </fieldset>

      <div className="flex items-center gap-3 mt-8">
        {section > 0 && (
          <button onClick={() => setSection((s) => s - 1)} className="px-5 py-3 rounded-2xl text-sm font-bold" style={{ background: "var(--surface)", border: "1.5px solid var(--border)", color: "var(--muted2)" }}>Back</button>
        )}
        {!isLastStep && (
          <button
            disabled={!locked && step.kind === "multi-select" && !multiSelectReady}
            onClick={() => setSection((s) => s + 1)}
            className="duo-btn flex-1 px-6 py-3 rounded-2xl text-sm font-bold"
            style={{ background: (step.kind === "multi-select" && !multiSelectReady) ? "var(--border)" : "var(--cta)", color: (step.kind === "multi-select" && !multiSelectReady) ? "var(--muted2)" : "var(--cta-ink)", boxShadow: "0 2px 8px rgba(20,20,20,0.16)" }}
          >
            Continue
          </button>
        )}
        {isLastStep && (
          <button onClick={onBack} className="duo-btn flex-1 px-6 py-3 rounded-2xl text-sm font-bold" style={{ background: "var(--cta)", color: "var(--cta-ink)", boxShadow: "0 2px 8px rgba(20,20,20,0.16)" }}>Done, back to subjects</button>
        )}
      </div>
    </main>
  );
}


export default LessonEngine;
