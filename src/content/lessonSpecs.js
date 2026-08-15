// Each lesson spec below is plain data. Adding a new lesson means adding a
// new object here (or a new file exporting one), not writing a new screen.
// See /tools/pdf_to_lesson.py for generating one of these automatically
// from a source PDF or DOCX.

const MT_DAY1_LESSON = {
  subject: "Mental Toughness",
  courseLabel: "30-Day Performance Playbook",
  meta: "Week 1 · Day 1 · You Are Built For This",
  steps: [
    {
      key: "concept", sectionLabel: "Concept", minutes: 5, kind: "content",
      title: "You Are Built For This",
      body: [
        `"Whether you think you can or think you can't, you're right." — Henry Ford`,
        "Mental toughness is not something you either have or you don't. It's a skill. Just like shooting a free throw or throwing a strike, you practice it until it's automatic.",
        "Kobe Bryant wasn't born the Mamba. The Black Mamba was built in the gym, in the mind, in the thousands of hours of deliberate work that nobody filmed.",
        "Michael Jordan was cut from his high school basketball team. Serena Williams grew up practicing on cracked courts in Compton. Steph Curry had zero college scholarship offers until late in his senior year.",
        "Every single one of them chose to build what most people thought they were supposed to be born with.",
        "You're starting a 30-day journey to build the most important muscle you have, your mind.",
      ],
    },
    {
      key: "reflect", sectionLabel: "Reflect", minutes: 8, kind: "multi-text",
      instructions: "Every great journey starts with an honest look in the mirror. Answer these with complete honesty.",
      groups: [
        {
          label: "", count: 3, placeholder: "",
          labels: [
            "What sport do you play, and why do you love it?",
            "What is the ONE mental challenge that holds you back most?",
            "On a scale of 1 to 10, how mentally tough do you feel right now? Why?",
          ],
        },
      ],
    },
    {
      key: "goal", sectionLabel: "Field Application", minutes: 5, kind: "text",
      prompt: "Write down ONE athletic goal you want to achieve in the next 30 days. Be specific. Not \"get better,\" write exactly what you want.",
    },
    {
      key: "mantra", sectionLabel: "Today's Mantra", minutes: 2, kind: "content",
      title: "Carry this with you today",
      body: [
        "I am not defined by where I start. I am defined by where I'm going.",
        "Key takeaway: mental toughness is a skill. You can build it starting today.",
      ],
    },
  ],
};

const AAE_LESSON = {
  subject: "Social Studies",
  courseLabel: "The African American Experience",
  meta: "Week 1 · Day 3 · Ch. 1a, Nubia & Egypt (pp. 9 to 14)",
  steps: [
    {
      key: "hook", sectionLabel: "Hook", minutes: 4, kind: "choice",
      prompt: "Egypt and Nubia sit right next to each other on the Nile. Before reading, guess: which civilization influenced the other more, or did they trade influence back and forth?",
      options: ["Egypt influenced Nubia more", "Nubia influenced Egypt more", "They traded influence back and forth", "Not sure yet"],
      followUp: "Why do you think that?",
    },
    {
      key: "read", sectionLabel: "Read & Hunt", minutes: 9, kind: "multi-text",
      instructions: "Read \"The Nubian Achievement\" and \"Egypt's Contributions\" (pages 9 to 13). Hunt task, circle or list 3 specific achievements each civilization is credited with (examples: pyramids, ironworking, writing systems, trade goods).",
      groups: [
        { label: "Nubia's achievements", count: 3, placeholder: "Achievement" },
        { label: "Egypt's achievements", count: 3, placeholder: "Achievement" },
      ],
    },
    {
      key: "analyze", sectionLabel: "Analyze", minutes: 6, kind: "multi-text",
      prompt: "Find TWO examples in the text where Nubia and Egypt influenced or fought with each other. They weren't separate stories, they were neighbors who shaped each other for centuries.",
      groups: [{ label: "", count: 2, placeholder: "Example" }],
    },
    {
      key: "write", sectionLabel: "Write", minutes: 8, kind: "graded-write",
      prompt: "Was Nubia just Egypt's little brother, or a great civilization in its own right?",
      fields: [
        { key: "restate", label: "R, Restate the question in your own words" },
        { key: "answer", label: "A, Answer it directly" },
        { key: "cite", label: "C, Cite one specific detail from the text" },
        { key: "explain", label: "E, Explain why it supports your answer" },
      ],
      rubric: `Grade strictly against this 4-point rubric:
4 = answers the prompt with specific evidence from the text
3 = answers the prompt but evidence is thin
2 = attempted but off-target
1 = blank or unrelated
A citation of a real, specific fact (not a vague reference) is required for a 4.`,
      maxScore: 4,
    },
    {
      key: "exit", sectionLabel: "Exit Ticket", minutes: 3, kind: "text",
      prompt: "One sentence: what's one thing about ancient Africa you didn't know before today?",
    },
  ],
};

const MATH_LESSON = {
  subject: "Math",
  courseLabel: "Algebra I",
  meta: "Unit 2 · Day 1 · Solving One-Step Equations",
  steps: [
    {
      key: "launch", sectionLabel: "Launch", minutes: 3, kind: "text",
      prompt: "You have $45 saved. You buy a game for an unknown price x, and after buying it you have $12 left. Write an equation using x for what happened, don't solve it yet.",
    },
    {
      key: "worked", sectionLabel: "Worked Example", minutes: 5, kind: "content",
      title: "Solve x + 7 = 15",
      body: [
        "The goal is to get x alone on one side.",
        "x + 7 = 15 has 7 added to x. The opposite of adding 7 is subtracting 7.",
        "Subtract 7 from both sides: x + 7 − 7 = 15 − 7",
        "That leaves: x = 8",
        "Check it: 8 + 7 = 15. True, so x = 8 is correct.",
      ],
    },
    {
      key: "guided", sectionLabel: "Guided Practice", minutes: 6, kind: "multi-text",
      prompt: "Solve x − 4 = 9. Answer each step.",
      groups: [{ label: "", count: 3, placeholder: "", labels: ["What operation undoes subtracting 4?", "What do you add to both sides?", "What is x?"] }],
    },
    {
      key: "independent", sectionLabel: "Independent Practice", minutes: 8, kind: "graded-numeric",
      instructions: "Solve each equation for x. Enter just the number.",
      problems: [
        { prompt: "x + 6 = 13", answer: "7" },
        { prompt: "2x = 18", answer: "9" },
        { prompt: "x − 9 = 2", answer: "11" },
      ],
    },
    {
      key: "mastery", sectionLabel: "Mastery Check", minutes: 3, kind: "graded-numeric",
      instructions: "Last two, no hints this time.",
      problems: [
        { prompt: "x + 15 = 22", answer: "7" },
        { prompt: "3x = 21", answer: "7" },
      ],
      isMasteryGate: true,
    },
  ],
};


export { AAE_LESSON, MATH_LESSON, MT_DAY1_LESSON };
