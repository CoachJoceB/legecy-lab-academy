// The five real missions from the Grade 8 Q1 prototype, converted into
// Lesson Engine specs. All prompts, dilemmas, the case study, and the AI
// grading rubrics are ported verbatim from the working PersonalDevelopmentApp,
// not rewritten. rewardMap/onPassAward xp+house values match the original
// TIER_XP/TIER_HOUSE constants exactly.

const VALUES = [
  "Integrity", "Courage", "Discipline", "Faith", "Family", "Excellence",
  "Compassion", "Curiosity", "Resilience", "Service", "Loyalty", "Ambition",
];

const TIER_LABELS_3 = { 1: "Not there yet", 2: "Solid work", 3: "Legacy-worthy" };
const REWARD_MAP_3 = {
  1: { xp: 0, house: -5 },
  2: { xp: 20, house: 5 },
  3: { xp: 40, house: 15 },
};

const CASE_STUDY = `On March 2, 1955, fifteen-year-old Claudette Colvin was riding a bus home from high school in Montgomery, Alabama, when a bus driver ordered her to give up her seat to a white passenger. She refused. Police dragged her off the bus in handcuffs. This happened nine months before Rosa Parks did the same thing and became famous for it. Colvin's case was actually used in the federal lawsuit that legally ended bus segregation in Montgomery. Civil rights leaders at the time worried the public wouldn't rally behind a pregnant, unmarried teenager as their symbol, so her name mostly disappeared from the story for decades.`;

const VILLAIN = { name: "Drift", tagline: "You'll figure out who you are later." };

// ─── Mission 1, Monday: The Cost of Character ───────────────────────────────
const PD_MISSION_1 = {
  subject: "Personal Development",
  courseLabel: "Season One, Chapter 1: Identity",
  meta: "Mission 1, Learn · The Cost of Character",
  villain: VILLAIN,
  steps: [
    {
      key: "case", sectionLabel: "Learn", minutes: 6, kind: "content",
      title: "Case study",
      villainLine: "You don't need to decide today.",
      body: [CASE_STUDY],
    },
    {
      key: "values", sectionLabel: "Learn", minutes: 4, kind: "multi-select",
      prompt: "Pick exactly 5 values that describe who you want to be.",
      options: VALUES, selectCount: 5,
    },
    {
      key: "monday-write", sectionLabel: "Learn", minutes: 10, kind: "graded-write",
      prompt: "What value drove Colvin's choice, and what did it cost her? Then, name your own top value right now and give a real, specific time you actually lived it out, and what it cost you.",
      fields: [
        { key: "caseAnalysis", label: "What value drove Colvin's choice, and what did it cost her?" },
        { key: "justification", label: "A real, specific time you lived out one of your own values, and what it cost you" },
      ],
      rubric: `Grade "Developing" (score 1) if either answer is vague, generic, restates the prompt, gives no specific real detail, or dodges the "cost" question. Grade "Proficient" (score 2) if both answers are specific and reasoned but not deeply reflective. Grade "Exemplary" (score 3) only if the case analysis correctly identifies a real cost AND the personal example is concrete, specific, and honest about difficulty.`,
      maxScore: 3,
      tierLabels: TIER_LABELS_3,
      rewardMap: REWARD_MAP_3,
    },
  ],
};

// ─── Mission 2, Tuesday: Choosing Under Pressure (3 dilemmas) ───────────────
const dilemmaGrade = (choice, text, other) => {
  const wc = (text || "").trim().split(/\s+/).filter(Boolean).length;
  if (wc < 40) return "Developing";
  const hasTradeoff = /(even though|but|however|still|yet|despite|even if)/i.test(text) || text.toLowerCase().includes(other.toLowerCase());
  if (wc >= 70 && hasTradeoff) return "Exemplary";
  if (hasTradeoff) return "Proficient";
  return "Developing";
};

const PD_MISSION_2 = {
  subject: "Personal Development",
  courseLabel: "Season One, Chapter 1: Identity",
  meta: "Mission 2, Practice · Choosing Under Pressure",
  villain: VILLAIN,
  steps: [
    {
      key: "d1", sectionLabel: "Practice 1 of 3", minutes: 5, kind: "choice-justify",
      villainLine: "Just pick whichever is easier.",
      prompt: "Your best friend copies your homework answers right before class and gets a good grade off it. Say something and you risk the friendship. Stay quiet and you're letting your own integrity slide. What do you do, and what does it cost you either way?",
      optionA: "Loyalty", optionB: "Integrity", minWords: 40,
      grade: (choice, text) => dilemmaGrade(choice, text, choice === "Loyalty" ? "Integrity" : "Loyalty"),
      tierLabels: { Developing: "Not there yet", Proficient: "Solid work", Exemplary: "Legacy-worthy" },
      feedbackByTier: {
        Developing: "You picked a side but didn't really wrestle with the cost. Next time, sit with the discomfort longer.",
        Proficient: "Solid, you acknowledged the cost of your choice.",
        Exemplary: "You named the real tradeoff, that's what leadership under pressure looks like.",
      },
      rewardMap: { Developing: { xp: 0, house: 0 }, Proficient: { xp: 10, house: 0 }, Exemplary: { xp: 20, house: 0 } },
    },
    {
      key: "d2", sectionLabel: "Practice 2 of 3", minutes: 5, kind: "choice-justify",
      prompt: "Your family needs you to watch your younger siblings the same night as a tryout that could change your entire athletic future. There's no rescheduling either one. What do you choose, and what do you lose by choosing it?",
      optionA: "Family", optionB: "Ambition", minWords: 40,
      grade: (choice, text) => dilemmaGrade(choice, text, choice === "Family" ? "Ambition" : "Family"),
      tierLabels: { Developing: "Not there yet", Proficient: "Solid work", Exemplary: "Legacy-worthy" },
      feedbackByTier: {
        Developing: "You picked a side but didn't really wrestle with the cost. Next time, sit with the discomfort longer.",
        Proficient: "Solid, you acknowledged the cost of your choice.",
        Exemplary: "You named the real tradeoff, that's what leadership under pressure looks like.",
      },
      rewardMap: { Developing: { xp: 0, house: 0 }, Proficient: { xp: 10, house: 0 }, Exemplary: { xp: 20, house: 0 } },
    },
    {
      key: "d3", sectionLabel: "Practice 3 of 3", minutes: 5, kind: "choice-justify",
      prompt: "Your friend group is mocking a kid who eats lunch alone. Saying something could make you the next target. Staying silent keeps you safe but goes against what you know is right. What do you do?",
      optionA: "Compassion", optionB: "Courage", minWords: 40,
      grade: (choice, text) => dilemmaGrade(choice, text, choice === "Compassion" ? "Courage" : "Compassion"),
      tierLabels: { Developing: "Not there yet", Proficient: "Solid work", Exemplary: "Legacy-worthy" },
      feedbackByTier: {
        Developing: "You picked a side but didn't really wrestle with the cost. Next time, sit with the discomfort longer.",
        Proficient: "Solid, you acknowledged the cost of your choice.",
        Exemplary: "You named the real tradeoff, that's what leadership under pressure looks like.",
      },
      rewardMap: { Developing: { xp: 0, house: 0 }, Proficient: { xp: 10, house: 0 }, Exemplary: { xp: 20, house: 0 } },
    },
  ],
};

// ─── Mission 3, Wednesday: Borrowing Wisdom ─────────────────────────────────
const PD_MISSION_3 = {
  subject: "Personal Development",
  courseLabel: "Season One, Chapter 1: Identity",
  meta: "Mission 3, Apply · Borrowing Wisdom",
  villain: VILLAIN,
  steps: [
    {
      key: "interview", sectionLabel: "Apply", minutes: 12, kind: "multi-text",
      villainLine: "Nobody else's story applies to you.",
      instructions: `Off-screen task: ask a parent, grandparent, or mentor, "What's one value you've never compromised on, and what did it cost you?" Then paraphrase what they told you in detail (min 30 words), and name one of your own top values and say whether their answer matches or challenges it, and why (min 30 words).`,
      groups: [{ label: "", count: 2, placeholder: "", labels: ["What they told you (min 30 words)", "Does it match or challenge one of your own values, and why (min 30 words)"] }],
      gate: (v) => {
        const t1 = ((v?.[0] || [])[0] || "").trim().split(/\s+/).filter(Boolean).length;
        const t2 = ((v?.[0] || [])[1] || "").trim().split(/\s+/).filter(Boolean).length;
        return t1 >= 30 && t2 >= 30;
      },
      onPassAward: { tier: "Proficient", xp: 15, house: 5 },
    },
  ],
};

// ─── Mission 4, Thursday: Building Your Statement ───────────────────────────
const PD_MISSION_4 = {
  subject: "Personal Development",
  courseLabel: "Season One, Chapter 1: Identity",
  meta: "Mission 4, Lead · Building Your Statement",
  villain: VILLAIN,
  steps: [
    {
      key: "statement", sectionLabel: "Lead", minutes: 10, kind: "graded-write",
      villainLine: "Generic is safe. Nobody can argue with vague.",
      prompt: "Write your personal mission statement. It should name a value, use a first-person action verb, and state a real cost, something you'll do even when it's hard.",
      fields: [{ key: "statement", label: "Your mission statement" }],
      checklist: [
        { label: "Names one of your top values by name", test: (v) => /Integrity|Courage|Discipline|Faith|Family|Excellence|Compassion|Curiosity|Resilience|Service|Loyalty|Ambition/i.test(v.statement || "") },
        { label: "Uses a first-person action verb (I lead / I choose / I refuse / I show up...)", test: (v) => /\bi\s+(will|lead|choose|refuse|show up|stand|serve|commit|protect)\b/i.test(v.statement || "") },
        { label: 'States a real cost: "even when / even though / no matter / despite"', test: (v) => /(even when|even though|no matter|despite|regardless)/i.test(v.statement || "") },
        { label: "At least 25 words, and specific enough it couldn't apply to a stranger", test: (v) => (v.statement || "").trim().split(/\s+/).filter(Boolean).length >= 25 },
      ],
      rubric: `Be tough on generic language, phrases like "I will be a good person" or "I will try my best" are NOT acceptable even if technically they contain a value word. Grade "Developing" (1) if the statement is generic, cliché, or could apply to almost any student. Grade "Proficient" (2) if it's specific to this student and names a real cost. Grade "Exemplary" (3) only if it is vivid, concrete, and sounds like something only this specific student could have written.`,
      maxScore: 3,
      tierLabels: TIER_LABELS_3,
      rewardMap: { 1: { xp: 0, house: -5 }, 2: { xp: 20, house: 5 }, 3: { xp: 40, house: 15 } },
    },
  ],
};

// ─── Mission 5, Friday: Defending It ────────────────────────────────────────
const PD_MISSION_5 = {
  subject: "Personal Development",
  courseLabel: "Season One, Chapter 1: Identity",
  meta: "Mission 5, Reflect · Defending It",
  villain: VILLAIN,
  steps: [
    {
      key: "panel", sectionLabel: "Reflect", minutes: 12, kind: "graded-write",
      villainLine: "Words are just words. No one's really listening.",
      prompt: "Read your mission statement to your house group today. Then answer two panel challenge questions, no rehearsed answers accepted.",
      fields: [
        { key: "panel1", label: "Tell me about a specific moment this year when living out one of your values actually cost you something real: a grade, a friendship, popularity, comfort. What happened?" },
        { key: "panel2", label: "Which of your listed values are you LEAST consistent at living out? Be honest, what gets in the way?" },
      ],
      rubric: `Grade "Developing" (1) if either answer avoids specifics, sounds rehearsed, or dodges the honesty required by the second question. Grade "Proficient" (2) if both are specific and honest. Grade "Exemplary" (3) only if both show real vulnerability and self-awareness a typical 8th grader wouldn't volunteer without being pushed.`,
      maxScore: 3,
      tierLabels: TIER_LABELS_3,
      rewardMap: REWARD_MAP_3,
    },
  ],
};

export { PD_MISSION_1, PD_MISSION_2, PD_MISSION_3, PD_MISSION_4, PD_MISSION_5, VALUES, VILLAIN };
