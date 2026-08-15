import React, { useState, useEffect, useRef } from "react";

const PROGRAM = [
  // ── WEEK 1: FOUNDATION ─────────────────────────────────────────────────
  {
    day:1, week:1, phase:"FOUNDATION", emoji:"🔥",
    title:"You Are Built For This",
    subtitle:"Mental toughness isn't born — it's built.",
    module:"Introduction",
    color:"#A83A0A",
    quote:{text:"Whether you think you can or think you can't — you're right.",author:"Henry Ford"},
    lesson:`Mental toughness is not something you either have or you don't. It's a skill. Just like shooting a free throw or throwing a strike — you practice it until it's automatic.

Kobe Bryant wasn't born the Mamba. The Black Mamba was BUILT in the gym, in the mind, in the thousands of hours of deliberate work that nobody filmed.

Michael Jordan was cut from his high school basketball team. Serena Williams grew up practicing on cracked courts in Compton. Steph Curry had zero college scholarship offers until late in his senior year.

Every single one of them chose to build what most people thought they were supposed to be born with.

That's why you're here. You're starting a 30-day journey to build the most important muscle you have — your mind. The eight tools in this playbook are used by Olympic athletes, NBA legends, and world champions. And starting today, they belong to you.

The only thing that separates you from the athlete you want to be is the mental work. Let's get to work.`,
    exercise:{
      type:"reflection",
      title:"Your Starting Point",
      icon:"📍",
      prompt:"Every great journey starts with an honest look in the mirror. Right now, before you become who you're going to become, answer these questions with complete honesty.",
      questions:[
        "What sport do you play, and why do you love it?",
        "What is the ONE mental challenge that holds you back most (fear of failing, anxiety before games, not believing in yourself, getting in your head after a mistake)?",
        "On a scale of 1-10, how mentally tough do you feel RIGHT NOW? Why?"
      ]
    },
    dailyGoal:"Write down ONE athletic goal you want to achieve in the next 30 days. Be specific. Not 'get better' — write EXACTLY what you want.",
    mantra:"I am not defined by where I start. I am defined by where I'm going.",
    keyTakeaway:"Mental toughness is a SKILL. You can build it starting today."
  },
  {
    day:2, week:1, phase:"FOUNDATION", emoji:"🧠",
    title:"Your Hidden Supercomputer",
    subtitle:"Exercise #1: Subconscious Mind Training",
    module:"Subconscious Mind",
    color:"#A83A0A",
    quote:{text:"I am the greatest. I said it before I knew I was.",author:"Muhammad Ali"},
    lesson:`Your subconscious mind controls 97% of what you do. Right now it's running your heartbeat, your breathing, your balance — without you thinking about it once.

That same supercomputer is also storing every belief you have about yourself. Every time a coach said you weren't ready. Every time you missed a big shot and felt the crowd go quiet. Every time someone told you the odds were stacked against you. Your subconscious kept all of it on file.

Here's the game-changing news: you can REPROGRAM IT.

Richard Williams did it for Venus and Serena. He posted signs around their tennis court with messages like: "Venus, you must take control of your future." Their subconscious minds heard it thousands of times — and they became exactly what those signs said.

Tiger Woods recorded his own voice giving his subconscious mind instructions. Muhammad Ali told himself he was the greatest before the world agreed. Arthur Ashe played every game the way he'd already seen himself play it in his mind.

There's one huge catch: your subconscious mind has NO FILTER. It can't tell the difference between what you want and what you fear. It just hears what you feed it.

So when you say "Don't miss this shot" — your subconscious only hears "MISS THIS SHOT."
When you say "Don't choke" — it hears "CHOKE."
When you say "I take this shot" — it hears "TAKE THIS SHOT."

Starting today, you speak to your mind in the language of what you WANT to see — not what you're afraid of.`,
    exercise:{
      type:"rewrite",
      title:"Flip the Script",
      icon:"🔄",
      prompt:"The most powerful thing you can do today is change the words you use. Rewrite these common negative athlete thoughts into powerful, positive commands your subconscious can act on.",
      rewrites:[
        {negative:"Don't miss this shot",hint:"Tell yourself WHAT TO DO with the ball"},
        {negative:"Don't choke under pressure",hint:"Describe what a clutch player DOES"},
        {negative:"I hope I don't mess up",hint:"Write what a confident you DOES instead"},
        {negative:"I'm not good enough for this team",hint:"Flip it — claim what you ARE"},
        {negative:"Don't let them score on me",hint:"Tell yourself what you WILL do defensively"}
      ]
    },
    dailyGoal:"Create 3 positive self-talk statements about your game. Write them in present tense. Post them somewhere you'll see them every day.",
    mantra:"My mind hears everything I say. I speak my future into existence.",
    keyTakeaway:"Speak to your subconscious in the language of what you WANT — not what you fear."
  },
  {
    day:3, week:1, phase:"FOUNDATION", emoji:"🛡️",
    title:"Guard Your Mind Like It's Your Jersey",
    subtitle:"Exercise #1 continued: Protecting Your Mental Space",
    module:"Subconscious Mind",
    color:"#A83A0A",
    quote:{text:"If you're afraid of failure, you don't deserve success.",author:"Nastia Liukin, Olympic Champion"},
    lesson:`Someone is going to try to get in your head today. Maybe it's a coach who benches you. Maybe it's a teammate who talks down to you. Maybe it's the voice inside your own head replaying every mistake you've ever made.

Elite athletes learn to treat their mind the way they treat their body. You wouldn't let someone inject poison into your body — why would you let someone inject limiting beliefs into your mind?

Richard Williams once physically stepped between a heckler and 14-year-old Venus Williams on a tennis court. He understood something most sports parents don't: the mind of a young athlete is the most important asset on the court. And he guarded it ferociously.

Here's what most people don't understand about mental attacks:
→ When someone tells you that you'll never make it — that's about THEIR experience, not yours.
→ When a coach or teammate doubts you — that's about THEIR ceiling, not yours.
→ Kobe was 17 and shot four airballs in a playoff game on national TV. Four. The crowd chanted "AIRBALL." He didn't quit. He came back. Mental toughness is not the absence of pressure — it's the decision to keep shooting anyway.

Your job is to build a wall around your mind so thick that nothing gets in unless YOU decide it should. Nerves, anxiety, doubt — those are normal. Even Bill Russell threw up before every NBA championship game. The difference is what you DO with those feelings.

Nerves = heightened awareness. You can use that energy.`,
    exercise:{
      type:"scenario",
      title:"Your Mental Armor",
      icon:"⚔️",
      prompt:"Real situations require real preparation. For each scenario below, write exactly what you would THINK and SAY to yourself to stay mentally strong.",
      scenarios:[
        "You make a big mistake early in the game and can feel your confidence dropping.",
        "Someone on the opposing team is trash-talking you and getting in your head.",
        "Your coach pulls you from the game in a critical moment.",
        "You've missed your last 4 attempts and your team needs you right now.",
        "Someone tells you that you're not good enough to play at the next level."
      ]
    },
    dailyGoal:"Identify ONE person or situation that tends to shake your mental confidence. Write your game plan for how you'll handle it next time.",
    mantra:"Other people's doubts about me have nothing to do with me. I am unshakeable.",
    keyTakeaway:"Your mind is sacred ground. Guard it like a champion."
  },
  {
    day:4, week:1, phase:"FOUNDATION", emoji:"🎬",
    title:"Run the Movie Before You Play the Game",
    subtitle:"Exercise #2: The Visualization Workout",
    module:"Visualization",
    color:"#D6182B",
    quote:{text:"Imagination is everything. It is the preview of life's coming attractions.",author:"Albert Einstein"},
    lesson:`Before Michael Phelps ever dove into the water at the Olympics, he had already won the race — in his mind. Every night before bed, every morning when he woke up, he watched the "mental tape" of his swim from the starting whistle to the celebration. Over and over. A million times.

His coach Bob Bowman called it their secret weapon. And Phelps won 22 Olympic medals.

Before Pele stepped onto any soccer pitch, he walked the entire stadium. He breathed the air. He felt the ground. He walked the stands. Then he went to the locker room, lay down, and played the entire match in his head — every pass, every goal, every save. He called visualization as important as physical practice.

Olympic swimmer Missy Franklin would solve every possible problem that could happen in a race — in her mind — before she stepped on the blocks. So when something unexpected happened in real life, she'd already handled it.

Here's the science that makes this wild: your subconscious mind cannot tell the difference between what is real and what is vividly imagined. A study at the University of Chicago found that athletes who ONLY visualized shooting free throws for a month improved by 23% — almost as much as those who physically practiced.

This isn't magic. This is neuroscience. When you vividly imagine performing a skill, your brain fires the same neural pathways as when you physically do it. You are literally practicing in your mind.

Starting tonight: close your eyes and run the movie.`,
    exercise:{
      type:"guided_viz",
      title:"Your First Visualization Session",
      icon:"🎯",
      prompt:"Follow this 5-step process right now. Read each step, close your eyes, and experience it fully before moving on.",
      steps:[
        {step:1, instruction:"Find a quiet space. Sit or lie down comfortably. Take 5 slow, deep breaths. Let your body relax completely."},
        {step:2, instruction:"See yourself arriving at your next competition. Feel the environment — the sounds, the smells, the energy. Make it vivid and real."},
        {step:3, instruction:"Watch yourself performing at your absolute best. See your technique perfectly executed. See yourself making the big play, the clutch moment, the move you've been working on."},
        {step:4, instruction:"Feel the emotions of competing at that level — the focus, the confidence, the control. You're in the zone. Nothing can shake you."},
        {step:5, instruction:"See the end result. Maybe it's a great performance, a personal best, a win. Feel what it feels like to have competed at YOUR best. Soak it in."}
      ],
      journalPrompt:"Describe your visualization experience. What did you see? What did you feel? What happened in your mental movie?"
    },
    dailyGoal:"Set a timer for 5 minutes tonight before bed. Run your visualization. Make it as detailed and vivid as you can.",
    mantra:"I see it first. Then I make it real.",
    keyTakeaway:"The mind doesn't know the difference between what you imagine and what is real. Use that."
  },
  {
    day:5, week:1, phase:"FOUNDATION", emoji:"✍️",
    title:"Write It Down, Make It Real",
    subtitle:"Exercise #3: Goal Setting That Actually Works",
    module:"Goal Writing",
    color:"#D6182B",
    quote:{text:"I play in the NBA. I get drafted in the first round.",author:"D'Shawn Schwartz, age 13 — now plays for the Colorado Buffs (Pac-12)"},
    lesson:`D'Shawn Schwartz wrote that sentence in 7th grade. He didn't write "I hope to play in the NBA someday." He wrote it in the present tense, specific, clear, and committed. His subconscious mind had clear orders.

Senior year: he was highly recruited by Pac-12 schools. He plays for Colorado Buffs.

Dr. Gail Matthews at Dominican University studied 267 people and found that those who wrote down their goals achieved them at a 42% higher rate than those who didn't.

42%. For just writing something down.

Here's why writing goals works:
1. **Clarity** — Writing forces you to be specific. "Get better" is a wish. "I take 8 shots in every game" is a goal your mind can execute.
2. **Encoding** — The physical act of writing activates both hemispheres of your brain simultaneously. Thinking uses only your imagination. Writing makes it real.
3. **Subconscious Programming** — Writing down your goals is a direct injection of information into your subconscious. Every time you write it, you reinforce the neural pathway.

The rules are simple:
→ Write in PRESENT TENSE ("I am" not "I will be")
→ Make them SPECIFIC (not "I want to shoot better" — "I take 10 shots in every game")
→ Focus on what you CAN CONTROL (shots attempted, effort given, focus maintained)
→ Write them EVERY MORNING and EVERY NIGHT

Your subconscious mind is most receptive to new programming right before you fall asleep and right when you wake up.

Michael Jordan's mom didn't tell him he was already great when he got cut from the team. She told him to discipline himself. Then he wrote his goals and went to work. The rest is history.`,
    exercise:{
      type:"goal_builder",
      title:"Build Your Goal Stack",
      icon:"🎯",
      prompt:"Use this framework to build your complete goal stack. Remember: present tense, specific, controllable in the beginning.",
      goalTypes:[
        {type:"Today's Goal", timeframe:"What will you accomplish TODAY in practice or training?", example:"I take 50 extra shots after practice today."},
        {type:"This Week's Goal", timeframe:"What specific thing will you improve or accomplish this week?", example:"I sprint the first 5 steps on every defensive play this week."},
        {type:"This Season's Goal", timeframe:"What does your best season look like? Be specific.", example:"I start every game this season and lead my team in assists."},
        {type:"Long-Range Vision", timeframe:"Where do you see yourself in 3-5 years?", example:"I earn a starting spot on a Division I college team."},
        {type:"The Dream", timeframe:"If nothing was impossible, what would be your ultimate athletic achievement?", example:"I compete at the highest level of my sport professionally."}
      ]
    },
    dailyGoal:"Write ALL of your goals from this exercise in a notebook or notes app. You'll be reviewing and updating them throughout this program.",
    mantra:"I write my future with my own hand. What I write, I become.",
    keyTakeaway:"Write goals in present tense, specific, every morning and every night. It works — science proves it."
  },
  {
    day:6, week:1, phase:"FOUNDATION", emoji:"👁️",
    title:"Study the Greats. Steal Their Moves.",
    subtitle:"Exercise #4: The Engraving Technique",
    module:"Watch the Pros",
    color:"#A83A0A",
    quote:{text:"Learn the basics and do them over and over and over again.",author:"Kobe Bryant"},
    lesson:`Here's something wild: young athletes are already accidentally using one of the most powerful skill-building techniques in sports psychology — and most of them are using it wrong.

The Engraving Technique comes from Daniel Coyle's book The Little Book of Talent. It's simple: when you watch elite athletes perform skills you want to master — and you watch with real FOCUS and INTENTION — your brain literally engraves that skill into your subconscious.

Here's the science: your brain has mirror neurons. When you watch someone perform a skill with intense concentration, your brain fires the same neural pathways as if you were doing it yourself. You're actually practicing in your mind while watching.

Kobe Bryant studied Michael Jordan so obsessively that Gatorade had to make commercials where they swapped their bodies — their in-game moves were virtually identical.

Jayson Tatum studied Kevin Durant so deeply that by the time he made the NBA, he was scoring on LeBron James and screaming in his face. That's what engraving does.

The Suzuki method of music education is built entirely on this principle. Children learn violin by listening to masters play every single day. The music gets engraved in their minds before their fingers ever touch the strings.

The difference between using your phone to watch athletes and ENGRAVING their skills?
→ Regular watching: passive, entertainment, scrolling
→ Engraving: focused, intentional, imagining you're inside the athlete's body, feeling every movement

Watch one skill. Watch it 20 times. Feel it from inside their body. Then go practice it.

NOT the Instagram highlight reels. The PROS. The full game footage.`,
    exercise:{
      type:"engraving",
      title:"Your Engraving Assignment",
      icon:"🎥",
      prompt:"Choose your professional role model and your target skill for this week's engraving session.",
      questions:[
        "Who is the professional athlete you most want to model your game after? What sport do they play?",
        "What is ONE specific skill they have that you want to add to your game?",
        "Find a video of them executing that skill perfectly. Watch it at least 10 times with FULL concentration. Describe what you observe — not just what they do physically, but how they SET UP the move, what their body position is, and how it FEELS to watch.",
        "Now close your eyes and imagine performing that exact skill. You are INSIDE their body. Describe what it feels like."
      ]
    },
    dailyGoal:"Watch your role model perform your target skill for 10-15 minutes tonight. Not entertainment — STUDY. Then go physically practice it.",
    mantra:"I don't just watch greatness. I absorb it.",
    keyTakeaway:"Watch elite athletes with focused intention and your brain will literally practice the skill for you."
  },
  {
    day:7, week:1, phase:"FOUNDATION", emoji:"🌟",
    title:"Week 1 Check-In: Who Are You Becoming?",
    subtitle:"Weekly Reflection & Goal Review",
    module:"Review",
    color:"#D6182B",
    quote:{text:"By the yard it's hard. But inch by inch, everything's a cinch.",author:"Norman Vincent Peale"},
    lesson:`You made it through Week 1. That already puts you in a different category than most athletes.

Most people read one page of a book about mental toughness and never come back. You've been here every day for 7 days. That's not nothing — that's EVERYTHING. That's the beginning of a habit. And habits become character.

Let's take stock of what you've built so far:

✅ You know that mental toughness is a SKILL — not something you're born with
✅ You know how to speak to your subconscious in the language of what you WANT
✅ You know how to guard your mind from doubt and negativity
✅ You've done your first visualization session
✅ You've written your goals in present tense
✅ You've started the engraving process with your role model

These are not small things. These are the exact tools used by every elite athlete you've ever watched dominate on the biggest stages.

Week 2 is where things get deeper. We're going to add meditation, constraint training, and the power of practicing slow. These are the exercises that separate good athletes from great ones.

But first — let's measure where you are. Growth without measurement is just hope.`,
    exercise:{
      type:"weekly_review",
      title:"Week 1 Debrief",
      icon:"📊",
      prompt:"Answer these review questions honestly. This is your data — not a test.",
      questions:[
        "What was the most powerful thing you learned in Week 1?",
        "Which of the 4 exercises did you actually practice this week (subconscious talk, visualization, goal writing, engraving)?",
        "On a scale of 1-10, how mentally tough do you feel NOW compared to Day 1? What's different?",
        "What's the biggest mental challenge you still face? Be specific.",
        "What is ONE win from this week — no matter how small — that you want to acknowledge?"
      ]
    },
    dailyGoal:"Re-read your goals from Day 5. Update any that need to be more specific. Add at least one new goal based on what you've learned this week.",
    mantra:"Progress, not perfection. Every rep — physical or mental — counts.",
    keyTakeaway:"Consistent small actions build extraordinary athletes. You're in the 1% for being here."
  },

  // ── WEEK 2: LEVEL UP ────────────────────────────────────────────────────
  {
    day:8, week:2, phase:"LEVEL UP", emoji:"🧘",
    title:"Find Your Zone",
    subtitle:"Exercise #5: The Meditation Workout",
    module:"Meditation",
    color:"#A83A0A",
    quote:{text:"Meditation is the secret weapon that no one is talking about.",author:"Kobe Bryant"},
    lesson:`Michael Jordan. LeBron James. Kobe Bryant. Shaquille O'Neal. Aaron Gordon. Zach LaVine.

These are not people who meditate because they have nothing better to do. These are some of the most fiercely competitive athletes to ever play their sports. And every single one of them meditates.

The zone. Flow state. Being "unconscious." Whatever you call it — every athlete has experienced it and wants more of it. It's that moment when everything slows down, your body moves on autopilot, and you CAN'T MISS.

Meditation is how you get there on purpose — not just by accident.

When you meditate, you're training your brain to clear out the mental noise — the "my coach is watching," the "I missed my last three shots," the "what if I fail" — and operate from your subconscious. The place where all your training lives. The place where skills happen automatically.

Bill Russell threw up before every NBA championship game because his nerves were so intense. His response? He kicked down the stall door and yelled "Don't worry guys — we're gonna WIN." They did. He learned to harness his nervous energy, not fight it.

Sports anxiety and the zone cannot coexist. One must go for the other to stay. Your job is to kick anxiety out.

Science confirms it: a study published in "Effects of a Mindfulness Intervention on Sports-Anxiety, Pessimism, and Flow in Competitive Cyclists" showed that athletes in flow state had the highest optimal performance. Meditation gets you into flow more consistently.

Stressed athletes are also 5x more likely to be injured. Meditation protects your body too.

Start with 5 minutes. Every single day.`,
    exercise:{
      type:"meditation",
      title:"5-Minute Zone Training",
      icon:"🧘",
      prompt:"Here is your daily meditation protocol. Do this every day — morning is ideal, but any time works.",
      steps:[
        {step:1, instruction:"Find a quiet space. Sit comfortably with your back straight."},
        {step:2, instruction:"Set a 5-minute timer so your mind doesn't have to track time."},
        {step:3, instruction:"Close your eyes. Imagine yourself sitting on the bank of a slowly flowing river."},
        {step:4, instruction:"As thoughts come — and they will — picture each one as a log floating down the river. Don't fight the thoughts. Just attach them to logs and let them float away."},
        {step:5, instruction:"The goal is NOT to have zero thoughts. The goal is to have FEWER logs than when you started. That's the practice."},
        {step:6, instruction:"When the timer goes off, take 3 deep breaths. Open your eyes. You just trained your brain."}
      ],
      journalPrompt:"After your meditation session: What was it like? How many thoughts came? How did you feel when it was over? On a scale of 1-10, how focused did you feel afterward?"
    },
    dailyGoal:"Meditate for 5 minutes today. Set the timer. No shortcuts. This is your mental conditioning session.",
    mantra:"I am the stillness inside the storm. When everything is loud, I go quiet.",
    keyTakeaway:"Daily meditation is how elite athletes achieve the zone more consistently. 5 minutes a day changes everything."
  },
  {
    day:9, week:2, phase:"LEVEL UP", emoji:"⚡",
    title:"Nerves Are Not the Enemy",
    subtitle:"Harnessing Your Competitive Energy",
    module:"Meditation",
    color:"#A83A0A",
    quote:{text:"Failure I can live with. Not trying is what I can't handle.",author:"Sanya Richards-Ross, Olympic Champion"},
    lesson:`Before we go further, let's settle something once and for all: feeling nervous before a big game is NOT a sign that you're weak. It's a sign that you're ALIVE and you CARE.

Bill Russell — 11 NBA championships, considered by many the greatest winner in basketball history — threw up in the locker room before EVERY. CHAMPIONSHIP. GAME. He wasn't nervous because he was weak. He was nervous because he cared that much.

The greats don't experience no anxiety. They experience anxiety differently.

They've trained themselves to interpret those sweaty palms, pounding heartbeat, and racing thoughts not as warning signals — but as FUEL.

Think about what's actually happening in your body when you're nervous:
→ Your heart rate increases → more blood and oxygen to your muscles
→ Your mind becomes hyper-focused → heightened awareness of everything
→ Your adrenaline surges → faster reaction time, more explosive power

Your body is literally preparing you to perform at a higher level. The only question is whether your MIND will cooperate.

When you feel nerves, instead of saying "I'm anxious, I'm scared" — say this:
"My body is ready. I have heightened awareness. I am prepared. This energy belongs to me, and I'm using it."

Combine today's lesson with your meditation practice. Meditate BEFORE your visualization. The calm, focused state that meditation creates is the perfect mental environment for visualization to work at full power. Meditate → then run your mental movie.`,
    exercise:{
      type:"energy_shift",
      title:"Flip the Feeling",
      icon:"⚡",
      prompt:"Think about a time you felt nervous or anxious before a competition. Answer these questions to reframe that experience.",
      questions:[
        "Describe the specific physical sensations you felt (heart pounding, tight chest, shaky hands, etc.).",
        "What story were you telling yourself ABOUT those feelings? ('I'm scared,' 'I'm going to mess up,' etc.)",
        "Now rewrite that story using what you know: your body was PREPARING you. What was your body actually doing to help you perform?",
        "Write 3 sentences you will say to yourself the next time you feel pre-competition nerves.",
        "When was the last time you competed and felt IN THE ZONE? Describe that feeling in detail."
      ]
    },
    dailyGoal:"Do your 5-minute meditation, then immediately do your 5-minute visualization. Notice how much more vivid the visualization is when your mind is calm.",
    mantra:"My nerves are my rocket fuel. I don't fight them — I ride them.",
    keyTakeaway:"Nerves are not weakness — they're your body's performance enhancement. Use them."
  },
  {
    day:10, week:2, phase:"LEVEL UP", emoji:"📝",
    title:"Level Up Your Goals",
    subtitle:"Goals That Pull You Forward vs. Goals That Stress You Out",
    module:"Goal Writing",
    color:"#D6182B",
    quote:{text:"I can accept failure. Everyone fails at something. But I can't accept not trying.",author:"Michael Jordan"},
    lesson:`By now you've had your goals written down for almost a week. Let's make them even more powerful.

There's a difference between goals that PULL you toward greatness and goals that CREATE PRESSURE.

Here's the rule that will change everything: In the beginning, only set goals you can CONTROL.

You cannot control:
→ Whether your team wins
→ Whether the coach plays you
→ Whether your shot goes in
→ What other athletes do

You CAN control:
→ How many shots you TAKE
→ How hard you sprint on every play
→ How focused you are in practice
→ Your attitude after a mistake
→ How much extra work you put in

Jamal Murray's dad didn't let him play on an AAU team consistently until 10th grade. Not because he wasn't good enough — but because they were focused on SKILL. Not wins. Not stats. Not rankings. Skill. Murray is now a key player in the NBA.

Steph Curry spent an entire SUMMER not shooting outside the paint. An elite player — not shooting the three-pointer that made him famous — for a whole summer. Because he was focused on the foundation, not the result. That decision made him arguably the greatest shooter in NBA history.

Work backward from your big dream. Break it into seasons. Break seasons into months. Break months into weeks. Break weeks into today. What can you control TODAY that gets you one step closer?

That's your goal.`,
    exercise:{
      type:"goal_audit",
      title:"Goal Audit & Upgrade",
      icon:"🎯",
      prompt:"Go back to your goals from Day 5. It's time to audit and upgrade them.",
      questions:[
        "List your current goals (from Day 5 or your notebook).",
        "For each goal, ask: 'Is this something I can CONTROL, or is it an OUTCOME?' Rewrite any outcome-based goals into process-based goals you control.",
        "Add a new daily goal that you can execute TODAY with no excuses — no special equipment, no perfect conditions needed.",
        "Write a 'process goal' for your next practice or competition — something about HOW you compete, not WHAT results you get.",
        "What is the single most important thing you can work on this week to build toward your season goal?"
      ]
    },
    dailyGoal:"Write your updated goals in your notebook. Then write them AGAIN tonight before bed. That double-writing is programming your subconscious twice.",
    mantra:"I control the process. The results take care of themselves.",
    keyTakeaway:"Focus on what you can control. Process goals build champions — outcome goals create pressure."
  },
  {
    day:11, week:2, phase:"LEVEL UP", emoji:"🔬",
    title:"The Science of Seeing It",
    subtitle:"Visualization — Advanced Training",
    module:"Visualization",
    color:"#D6182B",
    quote:{text:"I visualize winning a race a million times so I won't have to worry about anything when the race comes.",author:"Missy Franklin, 4x Olympic Gold Medalist"},
    lesson:`You've been visualizing for a week now. Let's go deeper — and use it like the Olympians do.

A study by exercise physiologist Guang Yue had volunteers ONLY IMAGINE flexing their biceps — no actual movement. After a few weeks, they showed a 13.5% INCREASE in actual strength. Zero physical reps. Just mental ones.

A University of Chicago study had athletes visualize shooting free throws for a month with ZERO physical practice. They improved by 23%. Almost identical to the group that physically practiced.

The athletes who COMBINED visualization with physical practice improved by 45%.

That's the formula: Mental practice + Physical practice = Maximum improvement.

Here's how to level up your visualization:

**Add All 5 Senses:**
Pele didn't just see the pitch — he walked it, smelled the air, felt the ground, heard the crowd. The more detailed and sensory your visualization, the more real it is to your subconscious.

**Visualize Problems, Not Just Success:**
Olympic fencer Mariel Zagunis spent flight time reviewing every possible scenario that could arise — including when things go WRONG. She then saw herself respond to each one perfectly. When the unexpected happened in real life? She'd already handled it a thousand times in her mind.

**Run the Bad Moments:**
Visualize yourself making a mistake — and then RESPONDING TO IT PERFECTLY. See yourself miss the shot, get up, stay composed, and take the next one with confidence. This is how you build mental resilience in advance.

Tonight: don't just visualize the win. Visualize the adversity and your elite response to it.`,
    exercise:{
      type:"advanced_viz",
      title:"Advanced Visualization: All 5 Senses + Adversity Response",
      icon:"🎬",
      prompt:"Tonight's visualization session has two parts. Journal your experience for both.",
      parts:[
        {part:1, title:"The Full Sensory Movie", instruction:"Close your eyes for 5 minutes. See your next competition or practice. This time, add all 5 senses: What do you HEAR? What do you SMELL? What do you FEEL (the equipment, the ground, the air)? What do you TASTE? Make it so real you could reach out and touch it. Journal what you experienced."},
        {part:2, title:"The Adversity & Response", instruction:"Now close your eyes again. Visualize a specific moment where something goes wrong — you make a big mistake, fall behind, or feel the pressure mounting. Watch yourself pause, breathe, refocus, and execute at your best. See yourself RESPOND like a champion. How did that feel? What did you see yourself do?"}
      ]
    },
    dailyGoal:"5-min meditation → 5-min visualization (full sensory + adversity response). Do both back to back.",
    mantra:"I have already won in my mind. Now I go make it real.",
    keyTakeaway:"Add all 5 senses to your visualization AND rehearse adversity responses. This is how champions prepare."
  },
  {
    day:12, week:2, phase:"LEVEL UP", emoji:"🔬",
    title:"Make the Hard Look Easy",
    subtitle:"Exercise #6: Play Small — Constraint Training",
    module:"Play Small",
    color:"#A83A0A",
    quote:{text:"If you want to find out if you can really swim, jump in the deep end.",author:"Unknown"},
    lesson:`Why does South America consistently produce the world's greatest soccer players despite having far fewer resources than wealthier nations?

One word: Futsal.

In Futsal, everything is SMALLER. Smaller ball. Smaller court. Harder surface. Smaller goals. Everything that was already hard becomes harder.

Then when these athletes step onto a full-size pitch with a regulation ball? It feels like shooting fish in a barrel.

Neymar, widely considered the most technically skilled player of his generation, is a product of Futsal and street soccer. His moves look like magic because he learned them on rocky, unpredictable streets where precision was survival.

Ozil plays in a cage. Petr Cech catches ping pong balls from a machine. Venus and Serena Williams learned to hit on Compton courts with cracked surfaces and broken nets.

This is constraint training — and the science behind it is powerful:

When your environment is uncertain and difficult, your brain signals: "PAY ATTENTION — this matters." Your brain becomes MORE active, MORE creative, MORE adaptive.

When your environment is comfortable and predictable, your brain signals: "This is fine, I can coast." Your brain goes to sleep.

The absence of constraints breeds the absence of creativity. The presence of constraints breeds resourcefulness and adaptability.

This is why "I only play well in our gym" is a mental toughness problem — not a skill problem. Elite athletes perform ANYWHERE because they've trained in harder conditions than the game will ever provide.

Make your practice harder than your competition and your competition will feel easy.`,
    exercise:{
      type:"constraint_design",
      title:"Design Your Constraint Training",
      icon:"🔧",
      prompt:"Apply the Play Small principle to YOUR sport. Answer these questions to design your constraint training.",
      questions:[
        "What is your sport? What skill do you most need to improve?",
        "How could you make practice HARDER for that skill? (smaller target, less space, dominant hand only, eyes closed for part of it, shorter time limits, etc.)",
        "What uncomfortable practice environment could you train in once a week? (outdoor court, rough surface, different gym, early morning, etc.)",
        "Design ONE drill for your next practice that makes the skill harder than it would be in competition. Describe it in detail.",
        "Why do you think practicing in harder conditions builds more confidence for the actual competition?"
      ]
    },
    dailyGoal:"At your next practice, attempt ONE constraint drill you designed above. Embrace the difficulty — that's where the growth is.",
    mantra:"I train harder than I play. The game feels easy because my practice was tough.",
    keyTakeaway:"Harder practice conditions = easier competition. Constraints create creativity and confidence."
  },
  {
    day:13, week:2, phase:"LEVEL UP", emoji:"⏱️",
    title:"Slow Is Smooth. Smooth Is Fast.",
    subtitle:"Exercise #7: Practice Slower",
    module:"Practice Slower",
    color:"#A83A0A",
    quote:{text:"Practice doesn't make perfect. Perfect practice makes perfect.",author:"Vince Lombardi"},
    lesson:`Steph Curry spent an entire summer not shooting outside the paint. He was already an elite shooter — and he STOPPED shooting threes for a FULL SUMMER to rebuild the foundation.

That decision made him arguably the greatest shooter in the history of professional basketball.

Venus and Serena Williams practiced their strokes in slow motion for hours at a time. Not because they couldn't do it faster — because slowing down revealed every tiny flaw their eyes couldn't catch at full speed.

The Weber-Fechner Law says: as stimulus increases, the brain's ability to pick out details DROPS.

Translation: when you practice too fast, your brain gets flooded with signals and can't identify the small mistakes that are keeping you from elite-level performance. Those small wasted movements stay — they become habits. And bad habits performed at full speed are how mediocre athletes stay mediocre.

But when you slow it down — the brain suddenly sees EVERYTHING. The slight hitch in your release. The moment your footwork breaks down. The split-second where your form collapses under pressure.

Here's the neuroscience that makes this extra powerful:

When you slowly and consistently practice a skill, myelin — an insulating protein — wraps around the neural pathway in your brain that controls that skill. Myelin PROTECTS that pathway from being disrupted by adrenaline and cortisol (the stress hormones released in big games).

Slow → perfect → repeat → myelin builds → now you can do it perfectly under ANY pressure.

That's why elite athletes perform their best moves in the biggest moments. Their neural pathways are bulletproof.`,
    exercise:{
      type:"slow_practice",
      title:"Break It Down",
      icon:"⏱️",
      prompt:"Choose ONE skill in your sport and break it down into slow-motion components.",
      questions:[
        "What skill do you want to break down today? (Example: shooting form, swing mechanics, first-step drive, defensive stance)",
        "Break that skill into its smallest components — like building blocks. What are the individual steps/positions? List them in order.",
        "Describe how you will practice this skill in SLOW MOTION at your next training session.",
        "What do you think you'll notice that you currently miss when you go full speed?",
        "Kobe Bryant was known for practicing skills thousands of times in slow motion before he allowed himself to use them in games. How does this philosophy change how you think about practice?"
      ]
    },
    dailyGoal:"In your next practice session, walk through your target skill in slow motion for 5-10 reps before you do it at full speed. Notice everything.",
    mantra:"Slow is how I build. Speed is what it becomes.",
    keyTakeaway:"Slow practice builds the myelin sheath that protects your skills under maximum pressure. Slow down to speed up."
  },
  {
    day:14, week:2, phase:"LEVEL UP", emoji:"🏆",
    title:"Week 2 Check-In: You're Leveling Up",
    subtitle:"Halfway Review & Celebration",
    module:"Review",
    color:"#D6182B",
    quote:{text:"Winning makes you feel like there's nothing you can't do. Losing teaches you the things you need to improve. Both are necessary.",author:"LeBron James"},
    lesson:`Two weeks in. You've now been introduced to all eight mental training exercises. Let that sink in for a moment.

You've been doing what 99% of athletes will never do. While other athletes are working only on their physical skills, you've been building the mental infrastructure that makes elite performance possible.

The athletes you look up to — the ones performing on the biggest stages in their sports — all use some version of what you've been practicing. And most of them had to discover this stuff in adulthood, by accident, after years of struggle.

You're learning it NOW.

Here's what you've covered:
✅ Subconscious Mind Training — speaking what you want to see
✅ Mind Protection — guarding your mental space
✅ Visualization — running the movie before the game
✅ Goal Writing — programming your subconscious with specifics
✅ Engraving Technique — studying the pros to steal their skills
✅ Meditation — training your brain to find the zone
✅ Nerves as fuel — reframing anxiety as energy
✅ Constraint Training — playing small to get big results
✅ Slow Practice — building bulletproof neural pathways

Week 3 is where you start putting it all together into a daily system. You're going to get very intentional about failure, about comfort zones, and about building the mental toughness that doesn't crack under pressure.

First — let's celebrate what you've built.`,
    exercise:{
      type:"weekly_review",
      title:"Week 2 Debrief",
      icon:"📊",
      prompt:"Take stock of the last 7 days. Be honest, be specific.",
      questions:[
        "Which of the Week 2 exercises (meditation, advanced visualization, constraint training, slow practice) did you actually implement?",
        "What's the hardest mental thing you faced in competition or practice this week? How did you respond?",
        "Rate your confidence from 1-10 right now. Compare this to Week 1 and Day 1.",
        "What is the single thing you want to focus on mastering in Week 3?",
        "Acknowledge ONE moment of mental toughness from this week — a moment you responded with discipline or resilience. Describe it."
      ]
    },
    dailyGoal:"Review ALL your goals. Update them. Add new ones based on what you've discovered about yourself in Week 2.",
    mantra:"Two weeks of mental work. I feel the difference. I AM the difference.",
    keyTakeaway:"You've covered all 8 exercises. Now it's time to build them into a daily system."
  },

  // ── WEEK 3: GO DEEPER ──────────────────────────────────────────────────
  {
    day:15, week:3, phase:"GO DEEPER", emoji:"💪",
    title:"Get Comfortable Being Uncomfortable",
    subtitle:"Exercise #8: Train Rough",
    module:"Train Rough",
    color:"#A83A0A",
    quote:{text:"The will to win is not nearly as important as the will to prepare to win.",author:"Vince Lombardi"},
    lesson:`After losing to a young Leon Spinks, Muhammad Ali disappeared to the woods of Pennsylvania to train. Not to a state-of-the-art facility. Not to a perfectly maintained boxing gym. The woods. Rough. Uncertain. Uncomfortable.

He came back a three-time heavyweight champion and one of the greatest boxers who ever lived.

Michael Phelps trained at the North Baltimore Aquatic Club — an old YMCA that looked nothing like an Olympic training center. 22 medals.

Russian gymnasts dominated Olympic gymnastics for decades training in facilities with barely operable equipment. The Russian gymnasts were famous for outperforming athletes with 10x their resources.

Serena and Venus Williams learned tennis on cracked courts in Compton, California.

This is not a coincidence.

Here's the neuroscience: when your training environment is CERTAIN and COMFORTABLE, your brain activity decreases. Your brain thinks "this is fine — nothing to worry about." It goes into maintenance mode.

When your environment is UNCERTAIN and CHALLENGING, your brain lights up like a switchboard. It goes on full alert: "Something unexpected could happen — I need to learn FAST." Your brain becomes more adaptive, more creative, more resilient.

A Yale study confirmed this with monkeys. When presented with tasks with fixed outcomes, their frontal cortex showed reduced activity. When outcomes were uncertain? The brain became significantly more active.

Uncertainty = accelerated learning.

The athlete who only trains in perfect conditions performs perfectly in perfect conditions. But competitions are never perfect. The athlete who has trained in rough, uncertain conditions performs well EVERYWHERE — because their brain has been trained to adapt.

Seek the uncomfortable. That's where the growth lives.`,
    exercise:{
      type:"rough_plan",
      title:"Design Your Rough Training",
      icon:"💪",
      prompt:"Apply the Train Rough principle to your sport and your life.",
      questions:[
        "Describe your current typical training environment. What's comfortable about it?",
        "What would 'training rough' look like for your sport? (outdoor court, different gym, bad weather, early morning, playing against older athletes, training with distractions, etc.)",
        "When was the last time you were uncomfortable in practice or competition? What did you learn from it?",
        "Design ONE 'rough training' experience you can do this week. Where, what, when. Make it specific.",
        "Muhammad Ali said: 'I hated every minute of training, but I said: Don't quit. Suffer now and live the rest of your life as a champion.' What does suffering in training give you?"
      ]
    },
    dailyGoal:"This week, do at least ONE training session outside your comfort zone. Different environment, different conditions, different opponent. Embrace the rough.",
    mantra:"I seek the uncomfortable. That's where champions are made.",
    keyTakeaway:"Uncertain, challenging training environments accelerate brain learning and build adaptability. Seek the rough."
  },
  {
    day:16, week:3, phase:"GO DEEPER", emoji:"💡",
    title:"Failure Is Your Best Coach",
    subtitle:"The Growth Mindset in Action",
    module:"Growth Mindset",
    color:"#D6182B",
    quote:{text:"If anything, I think losing makes me even more motivated.",author:"Serena Williams"},
    lesson:`Let's talk about failure. Not to make you feel better about it. But to completely change how you see it.

Thomas Edison failed 1,000 times before inventing the light bulb. His response? "I have not failed 1,000 times. I have successfully discovered 1,000 ways NOT to make a light bulb."

Kareem Abdul-Jabbar is the all-time leading scorer in NBA history. He also holds the record for the MOST MISSED SHOTS in NBA history. The greatest scorer of all time is also the greatest misser of all time.

J.K. Rowling was rejected by 12 publishers before Harry Potter became the most successful book series in history.

Oprah Winfrey was told she was "unfit for television." She's now worth $3.5 billion.

Michael Jordan missed more shots than nearly any player in NBA history — and he was STILL the greatest.

The mental toughness difference between elite athletes and everyone else isn't that elite athletes don't fail. They fail MORE. They take more risks. They miss more shots. They get up more times.

The difference is what they BELIEVE about failure.

Fixed mindset says: "I failed → I'm not good enough → I should stop."
Growth mindset says: "I failed → I found something to work on → I get better."

Dr. Carol Dweck's research (her book Mindset is referenced throughout this program) shows that athletes with a growth mindset consistently outperform equally talented athletes with a fixed mindset. Not because of physical ability — because of how they respond to adversity.

You are not defined by your failures. You are defined by what you do AFTER them.`,
    exercise:{
      type:"failure_reframe",
      title:"The Failure Audit",
      icon:"💡",
      prompt:"The most powerful exercise in this whole program. Be completely honest.",
      questions:[
        "Describe your biggest athletic failure or setback. What happened?",
        "What did you TELL YOURSELF about that failure at the time? (What story did your fixed mindset create?)",
        "Now rewrite that story from a growth mindset perspective. What did that failure TEACH you? What did it make possible?",
        "Name one elite athlete who failed massively before succeeding massively. What does their story tell you about your story?",
        "What failure are you AFRAID of right now? What would happen if you leaned INTO that fear instead of avoiding it?"
      ]
    },
    dailyGoal:"In your next practice, intentionally try something that might fail. A harder move, a riskier play, a more aggressive approach. Celebrate the attempt regardless of outcome.",
    mantra:"I seek failure. Each one brings me closer to who I'm becoming.",
    keyTakeaway:"Growth mindset athletes see failure as data. Fixed mindset athletes see failure as identity. Protect your growth mindset."
  },
  {
    day:17, week:3, phase:"GO DEEPER", emoji:"🔥",
    title:"The Daily Mental Training Routine",
    subtitle:"Building Your 5-Minute Mind Gym",
    module:"Full System",
    color:"#A83A0A",
    quote:{text:"The mental side of athletics is 90% of the game.",author:"Yogi Berra"},
    lesson:`You now have 8 powerful mental training tools. The question is: how do you use them consistently?

The answer is a simple daily routine that takes under 30 minutes. Like physical conditioning, mental conditioning only works when you do it CONSISTENTLY.

Elite athletes don't meditate when they feel like it. They don't visualize only before big games. They don't write their goals when they get around to it. They build these practices into their daily non-negotiables — like eating and sleeping.

Here is the complete DAILY MENTAL TRAINING ROUTINE:

**Morning (10-15 min total):**
→ Wake up, pick up your notebook
→ Write your goals (3 min) — in present tense, same goals every day until you level them up
→ Read your subconscious affirmations out loud (1 min)
→ 5-minute visualization — see your next performance at your absolute best
→ Say your mantra 3 times

**Pre-Practice/Competition (5-10 min):**
→ Arrive early (like Pele)
→ 5-minute meditation — clear your mind of everything except the task
→ Run your visualization one more time — feel the zone before you enter it
→ Remind yourself: "My practice was harder than this game. I am prepared."

**Night (5-10 min):**
→ Write your goals again (3 min)
→ Review your performance — what worked? What do you work on tomorrow?
→ Watch 5-10 minutes of your role model performing your target skill
→ Sleep

This is it. Not complicated. Not time-consuming. CONSISTENT.

Kobe Bryant woke up at 4 AM. Not because he had to. Because his mental game demanded it. When the game was on the line, all that 4 AM work spoke for him.`,
    exercise:{
      type:"routine_builder",
      title:"Build YOUR Daily System",
      icon:"📋",
      prompt:"Customize the daily routine to work with your life and schedule.",
      questions:[
        "What time do you wake up? At what time will you do your morning mental training?",
        "Which morning components feel most important to you right now: goal writing, affirmations, or visualization? Why?",
        "How much time before practice/competition can you realistically get to the venue early for meditation and visualization?",
        "What time will you do your nightly routine?",
        "Write out YOUR specific daily mental training schedule — morning, pre-competition, and night. Include exact times. This is your commitment."
      ]
    },
    dailyGoal:"Execute your full daily mental training routine today — morning AND night. No shortcuts. This is the 1% work.",
    mantra:"Every day I build what other athletes won't. That's why I become what they can't.",
    keyTakeaway:"Mental conditioning requires daily consistency. Build your non-negotiable routine and protect it."
  },
  {
    day:18, week:3, phase:"GO DEEPER", emoji:"🌊",
    title:"When Your Mind Becomes Your Weapon",
    subtitle:"Fixed Mindset vs. Growth Mindset in the Heat of the Moment",
    module:"Growth Mindset",
    color:"#A83A0A",
    quote:{text:"You miss 100% of the shots you don't take.",author:"Wayne Gretzky"},
    lesson:`There's a moment in every competition when your mind will either become your greatest weapon or your biggest enemy. That moment is the split second after a mistake.

You miss a shot. You make a bad pass. You get scored on. You come up short.

In that moment — which usually lasts less than 3 seconds — your subconscious mind will reach into its file cabinet and pull out whatever you've been feeding it. What's in there?

If you've been feeding it fear, doubt, "what will they think of me," and memories of past failures — that's what comes up. And it will handcuff you for the next play.

If you've been feeding it "I take the next shot," "I've been here before," "I use my energy," "failure is my teacher" — that's what comes up instead. And it will set you free.

This is what coaches mean when they talk about "short memory." It's not that great athletes forget their mistakes. It's that they've trained their subconscious to FILE mistakes as data and immediately move to the NEXT PLAY.

Kobe Bryant once said: "It's just a shot. Make or miss — it's just a shot. Don't make it bigger than it is."

That's not indifference. That's mental mastery.

The "it's just math" philosophy: If you shoot 40% in practice and you've missed 4 shots in a row, the math says your next 4 are likely to go in. It's not hot or cold — it's math. Trust your practice. Trust your preparation. Trust the process.

When the pressure is highest, trust the work you've already done. Your subconscious knows what to do. Let it.`,
    exercise:{
      type:"reset_protocol",
      title:"Build Your 3-Second Reset",
      icon:"🔄",
      prompt:"Every elite athlete has a reset protocol for after a mistake. Design yours.",
      questions:[
        "Describe specifically what happens in your mind and body when you make a big mistake in competition. Be honest about the self-talk and physical reaction.",
        "Think of a current great athlete in your sport. How do they respond to mistakes on the field/court? What can you observe about their body language and next actions?",
        "Design your personal 3-Second Reset Protocol: a physical cue + a mental phrase you will use IMMEDIATELY after every mistake. (Example: deep breath + 'next play, same me')",
        "How does the 'it's just math' philosophy apply to your sport? If you give 100% effort on every play, what percentage of good plays would you expect?",
        "What's the difference between caring deeply about results and being CONTROLLED by results? How do you want to feel after a mistake?"
      ]
    },
    dailyGoal:"Decide on your personal 3-second reset protocol. Practice it in your next training session every single time you make a mistake — no exceptions.",
    mantra:"Next play. Same me. My preparation speaks for itself.",
    keyTakeaway:"Train your subconscious to treat mistakes as data, not definitions. Your 3-second reset is a skill — practice it."
  },
  {
    day:19, week:3, phase:"GO DEEPER", emoji:"🎯",
    title:"The Loneliest Road to Greatness",
    subtitle:"What Elite Commitment Actually Looks Like",
    module:"Elite Mindset",
    color:"#D6182B",
    quote:{text:"Be the hardest worker in the room. Every room.",author:"Dwyane Wade"},
    lesson:`Nobody tells you this part.

The road to elite performance is the loneliest road you will ever walk. Not because nobody loves you — but because 99% of the people around you won't understand what you're doing or why.

When you wake up early to train, they're sleeping.
When you skip the hangout to visualize and do your mental prep, they're scrolling.
When you're working on your mindset while they're playing video games, they'll tell you you're taking it too seriously.

When you make it to the next level, those same people will call you lucky.

Kobe Bryant famously had very few close friends because his dedication was at a level most people couldn't understand. He once said: "I have a lot of respect for people who are passionate about their craft, but I don't have time for people who aren't."

This isn't about being antisocial or thinking you're better than others. It's about understanding that the path you've chosen requires a focus that most people aren't willing to give.

You will face three mental toughness roadblocks on this journey:
1. Other authority figures who will try to plant limiting beliefs in your mind
2. Your own current beliefs about who you are and what you can achieve
3. Peers who aren't on the same journey and will unconsciously try to pull you back

Your job is to recognize these roadblocks and not let them stop you. Not to fight them — just to keep moving.

One very important truth: your people — the ones who truly support you — live under the same roof you do. Lean on your family. They're your real team.`,
    exercise:{
      type:"identity",
      title:"Who You're Becoming",
      icon:"🦁",
      prompt:"This exercise is about identity — who you're choosing to become.",
      questions:[
        "Describe the athlete you want to become in 3 years. Not just stats — WHO are they? What's their mentality? How do they practice? How do they respond to setbacks?",
        "What three daily non-negotiables would that future version of you NEVER miss?",
        "Who in your life currently supports your elite athletic goals fully? Who drains your energy or plants doubt?",
        "What does 'lonely road to greatness' mean to you? Can you accept that sometimes doing the right things means doing them alone?",
        "Write a letter from your future elite self to your current self. What does that version of you want you to know right now?"
      ]
    },
    dailyGoal:"Share your athletic goals with one person in your life who you trust to support them. Let someone into your vision.",
    mantra:"The road to elite is lonely. I walk it anyway. My future self is waiting for me.",
    keyTakeaway:"Greatness requires a level of commitment that most people won't understand. Walk the road anyway."
  },
  {
    day:20, week:3, phase:"GO DEEPER", emoji:"🔁",
    title:"Put It All Together",
    subtitle:"Stacking the 8 Exercises into One Daily Practice",
    module:"Full System",
    color:"#D6182B",
    quote:{text:"The successful warrior is the average man with laser-like focus.",author:"Bruce Lee"},
    lesson:`You now have all 8 tools. Let's stack them into a single, integrated daily mental performance system.

Here's what that looks like:

**THE MENTAL TOUGHNESS DAILY PROTOCOL:**

🌅 **Morning (15 min):**
• Write goals (3 min) — subconscious programming
• Affirmations/positive self-talk out loud (1 min) — subconscious mind exercise
• Visualization (5 min) — see your next performance in vivid detail
• 1 min of engraving — watch your role model execute one skill

🏟️ **Pre-Competition/Practice (10 min):**
• Arrive early — get familiar with the environment (Pele's method)
• 5-min meditation — clear the noise, enter the zone
• Quick visualization — run the movie one more time
• Remind yourself of your process goals for today

⚙️ **During Practice:**
• Slow motion reps before full speed (practice slower)
• Try your constraint drill (play small)
• Apply your 3-second reset protocol after every mistake

🌙 **Night (10 min):**
• Write goals again
• Review your performance — growth mindset lens only
• 10 min engraving session — watch the pros
• Read your affirmations before sleep

Every single piece of this works together. Meditation → Visualization → Goals → Engraving → Constraint training → Slow practice → Reset protocol → Training rough.

This is the full mental mamba system.`,
    exercise:{
      type:"system_integration",
      title:"Your Integrated Mental Training Day",
      icon:"🔁",
      prompt:"Design your complete integrated mental training day in detail.",
      questions:[
        "Walk through your ideal competition day from wake-up to warm-up to competition to post-game. When and where does each mental training exercise fit in?",
        "Which 2 of the 8 exercises feel most natural and powerful for you right now?",
        "Which 2 feel hardest or most foreign? What makes them difficult?",
        "Write out your full daily mental training protocol in your own words — morning, pre-game, during, and night. Make it YOUR language.",
        "What happens when you miss a day? What's your plan to get back on track without guilt or self-judgment?"
      ]
    },
    dailyGoal:"Execute the full daily mental training protocol today — all parts. This is your hardest day intentionally.",
    mantra:"All 8 tools. One athlete. Unstoppable.",
    keyTakeaway:"The 8 exercises work as a system. Each one amplifies the others. Run the full stack daily."
  },
  {
    day:21, week:3, phase:"GO DEEPER", emoji:"📊",
    title:"Week 3 Check-In: Measuring Growth You Can't See",
    subtitle:"The Invisible Gains",
    module:"Review",
    color:"#D6182B",
    quote:{text:"Talent is God-given. Be humble. Fame is man-given. Be grateful. Conceit is self-given. Be careful.",author:"John Wooden"},
    lesson:`Mental toughness is what the authors of this program call "The Harry Houdini of Sports Skills" — you can't see it to measure it.

It's not like improving your vertical or your sprint time. You can't put mental toughness on a chart. But it shows up. It shows up when you take the shot at the end of the game instead of passing it. It shows up when you bounce back after a bad half instead of sulking. It shows up when you stay in the game mentally when everything is going wrong physically.

Three weeks in. Let's look at the invisible gains.

You might not be able to see them in the scoreboard yet. Mental work has a delayed release — it's like planting seeds. You do the invisible work, you trust the process, and then one day — when the pressure is highest and everything is on the line — the tree grows. And people wonder how you got there.

Keep going. You're planting something extraordinary.`,
    exercise:{
      type:"weekly_review",
      title:"Week 3 Debrief",
      icon:"📊",
      prompt:"Three weeks of mental work. Let's measure what you can't see.",
      questions:[
        "In what specific competition or practice moment this week did you notice your mental training working? Describe it.",
        "Compare how you respond to mistakes NOW vs. how you responded on Day 1. What's different?",
        "How has your daily routine changed? What mental exercises are you now doing consistently?",
        "Confidence rating 1-10. What's moved the needle the most?",
        "What is the biggest mental shift that has happened in 3 weeks? Not a physical improvement — a MENTAL one."
      ]
    },
    dailyGoal:"Write a message to a teammate who you know struggles mentally. Not advice — just encouragement. Mental strength multiplies when shared.",
    mantra:"The seeds I plant in my mind today become the tree I climb tomorrow.",
    keyTakeaway:"Mental toughness gains are invisible before they're undeniable. Keep planting."
  },

  // ── WEEK 4: ELITE LEVEL ─────────────────────────────────────────────────
  {
    day:22, week:4, phase:"ELITE LEVEL", emoji:"🏅",
    title:"The 10,000 Hours Are Not Enough",
    subtitle:"Deliberate Practice vs. Just Showing Up",
    module:"Elite Mindset",
    color:"#D6182B",
    quote:{text:"Hard work beats talent when talent doesn't work hard.",author:"Tim Notke"},
    lesson:`Malcolm Gladwell said it takes 10,000 hours to master a skill. Then Anders Ericsson came along and corrected it: it takes 10,000 hours of DELIBERATE practice.

There's a massive difference.

Just showing up to practice every day is not deliberate practice. You can do 10,000 hours of mediocre practice and get 10,000 hours of mediocre results.

Deliberate practice means:
→ You know EXACTLY which skill you're working on
→ You have SPECIFIC feedback on how you're doing
→ You're working slightly OUTSIDE your comfort zone
→ You have FULL concentration on what you're doing
→ You're analyzing and adjusting CONSTANTLY

Kobe Bryant would reportedly start practice with 800 makes — not attempts, MAKES — before any other player had arrived. That's not just hours. That's deliberate, focused, intentional repetition.

Combine deliberate practice with your mental training tools:
• Slow practice reveals the flaws deliberate practice corrects
• Constraint training pushes you outside your comfort zone
• Visualization primes your brain before deliberate physical practice
• Meditation gives you the focus deliberate practice demands
• Goal writing tells your subconscious EXACTLY what to practice

When you combine elite mental training with deliberate physical practice — that's the formula that produces players coaches recruit, colleges notice, and fans watch.`,
    exercise:{
      type:"deliberate_design",
      title:"Design Your Deliberate Practice",
      icon:"🎯",
      prompt:"Upgrade your practice approach with deliberate practice principles.",
      questions:[
        "What is the one technical skill in your sport that you most need to improve right now? Be very specific.",
        "Design a 20-minute deliberate practice block for that skill: What are the specific reps? How will you get feedback? What's the progression?",
        "How do you currently practice this skill? Where is the difference between what you do now and deliberate practice?",
        "Which mental training tools will you use BEFORE this deliberate practice session to prime your brain?",
        "Describe what 10,000 hours of deliberate practice in your sport would look like for you — starting from tomorrow."
      ]
    },
    dailyGoal:"Execute ONE deliberate practice block this week using the design above. Quality over quantity.",
    mantra:"Every rep is intentional. Every session has a purpose. I am deliberate.",
    keyTakeaway:"10,000 hours of deliberate practice — combined with daily mental training — is the elite performance formula."
  },
  {
    day:23, week:4, phase:"ELITE LEVEL", emoji:"🦋",
    title:"The Transformation Moment",
    subtitle:"From Timid to Fearless",
    module:"Full System",
    color:"#A83A0A",
    quote:{text:"He was fearless. That's one of the things that spurred him to greatness. He wasn't going to allow himself to fail.",author:"Jerry West, on Kobe Bryant's four airballs"},
    lesson:`Let's go back to the beginning. Kobe Bryant. Four airballs. Biggest game of his young career. Millions watching. Chanted at by the crowd.

His response? He came back and shot three MORE airballs in overtime.

Not out of stubbornness. Not out of ego. Out of the deep, unshakeable belief that HIS WORK had earned him the right to take that shot. And that his subconscious — programmed through thousands of hours of deliberate practice and mental training — knew what to do.

Jerry West got it almost right when he said Kobe "wasn't going to allow himself to fail." What West actually identified was something deeper: Kobe had NO FEAR of failure, which meant he was completely FREE to succeed.

Fear of failure RESTRICTS. No fear of failure LIBERATES.

You've been doing mental training for 23 days now. You've been reprogramming your subconscious. You've been visualizing success and adversity. You've been guarding your mental space. You've been meditating toward flow state. You've been writing your goals into your brain chemistry.

At some point — maybe it's already happened — you're going to feel a shift. A moment in competition where you take the hard shot, make the aggressive play, try the risky move — and something inside you says: "I've been here. I've done this. I know what to do."

That's your subconscious speaking.
That's your mental training speaking.
That's the athlete you've been building.

The question isn't IF that moment is coming. The only question is: will you be READY for it?

You're getting ready right now.`,
    exercise:{
      type:"breakthrough",
      title:"Your Fearless Moment",
      icon:"🦋",
      prompt:"Explore your relationship with fear and your path to fearlessness.",
      questions:[
        "Describe a moment in competition where you held back because of fear. What were you afraid of?",
        "Kobe shot four airballs and came back for more. What would you have needed to believe about yourself to do the same thing?",
        "What is ONE bold, aggressive play or action in your sport that you currently avoid because you're afraid to fail at it? Describe it specifically.",
        "If you KNEW your subconscious was fully programmed and your physical training was complete — if you KNEW you were ready — what would you do differently in your next competition?",
        "Write your commitment to fearlessness: 'In my next competition, I will _____ regardless of the outcome.'"
      ]
    },
    dailyGoal:"In your next competition or practice, take the ONE bold action you identified above. Do it once. Just once. Notice what happens.",
    mantra:"Fear is the cage. My training is the key. I walk out fearless.",
    keyTakeaway:"Fear of failure restricts. The mental training you've done is your permission slip to compete fearlessly."
  },
  {
    day:24, week:4, phase:"ELITE LEVEL", emoji:"🔮",
    title:"See It. Believe It. Become It.",
    subtitle:"Visualization + Subconscious + Goals: The Triple Stack",
    module:"Full System",
    color:"#D6182B",
    quote:{text:"All my life I've been waiting for this. A Williams is going to win.",author:"Richard Williams"},
    lesson:`Richard Williams announced to the world that his daughters were going to be the greatest female tennis players in history before they were even born. Before he knew anything about tennis. Before he'd moved to Compton. Before Venus and Serena had picked up a racket.

He decided. He wrote it on signs. He posted them on the tennis court. He said it out loud. He acted like it was already true.

He was running the triple stack: Subconscious programming + Visualization + Goal writing — simultaneously, constantly, relentlessly.

Your subconscious mind doesn't know the difference between a vivid imagined experience and a real one. When you write a goal 14 times, your brain starts treating it as a fact it needs to bring into reality. When you visualize your best performance with all 5 senses, your subconscious starts building the neural infrastructure to make it happen.

This is not wishful thinking. This is neurological fact.

The triple stack works like this:
1. **Goal Writing** gives your subconscious specific marching orders
2. **Positive Self-Talk** feeds those orders to your subconscious daily
3. **Visualization** builds the neural blueprint for execution

When all three are aligned and working simultaneously — your subconscious becomes a heat-seeking missile locked onto your stated target. Not if, but when.

Richard Williams never doubted. Even when others laughed. Even when resources were scarce. Even when Compton wasn't exactly a tennis culture hub.

He kept the triple stack running. And his daughters became exactly what he said they would be.

You have the same tools. What are you going to say they'll become?`,
    exercise:{
      type:"triple_stack",
      title:"Run the Triple Stack",
      icon:"🔮",
      prompt:"Execute all three components of the triple stack right now, in sequence.",
      parts:[
        {part:1, title:"Subconscious Programming", instruction:"Write your 5 most important goals RIGHT NOW, in present tense. Read them out loud after writing them. Then write 3 powerful affirmations about yourself as an athlete. Read those out loud too."},
        {part:2, title:"Visualization", instruction:"Close your eyes for 5 minutes. See your season's vision come to life — not just one game, but the whole arc. See yourself growing, improving, competing, succeeding, handling adversity. Make it vivid. Journal what you saw."},
        {part:3, title:"Commitment", instruction:"Write a Richard Williams-style declaration — present tense, bold, specific, no doubt: 'I am...' Describe exactly what you and your athletic career will accomplish. No hedging. Pure belief."}
      ]
    },
    dailyGoal:"Run the triple stack (write goals → affirmations out loud → visualization) every morning for the rest of this program.",
    mantra:"I have decided. My subconscious has received the order. It is done.",
    keyTakeaway:"The triple stack — goal writing + positive self-talk + visualization — is the complete subconscious programming system."
  },
  {
    day:25, week:4, phase:"ELITE LEVEL", emoji:"💥",
    title:"The Days That Define You",
    subtitle:"Mental Toughness When It Matters Most",
    module:"Elite Mindset",
    color:"#A83A0A",
    quote:{text:"We don't rise to the level of our expectations. We fall to the level of our training.",author:"Archilochus"},
    lesson:`You want to talk about the big moments? The final seconds. The fourth quarter. The championship game. The tryout that determines your future.

Here's the hard truth: you don't RISE to the occasion in those moments. You FALL to your training level.

If you haven't trained your mind for that moment, when the pressure spikes, your subconscious will pull up... nothing. Or worse — it'll pull up your doubts, your fear, your memories of past failures.

But if you've been doing your mental reps every single day — meditating, visualizing, speaking to your subconscious, guarding your thoughts, practicing with constraints, training rough — when that moment comes, your subconscious will pull up EXACTLY what you've been putting in.

Desi Linden ran the 2018 Boston Marathon in freezing cold, driving rain, brutal headwinds. At mile 6 she thought "this is not my day." Her body was freezing. The conditions were comical in how bad they were.

But she kept running. Because her training had prepared her for the worst days, not just the best ones. She became the first American woman to win the Boston Marathon in 33 years.

Not because the conditions were good.
Not because everything went according to plan.
Because her training was HARDER than the race.

Your mental training for the last 25 days? That's your Desi Linden moment preparation.

Make the big moments normal by preparing for them every single day.`,
    exercise:{
      type:"big_moment",
      title:"Preparing for Your Biggest Moment",
      icon:"💥",
      prompt:"Prepare mentally for the highest-stakes moment in your athletic near future.",
      questions:[
        "What is the most important competition, tryout, or performance opportunity coming up for you? Describe it specifically.",
        "What are the 2-3 things that could go wrong in that moment that would mentally challenge you most?",
        "For each challenge, describe your trained response — using your reset protocol, positive self-talk, and mental training.",
        "Run a complete visualization of this event right now — including the adversity moments and your elite response. Describe what you saw.",
        "What is the one mental skill you want to be MOST sharp for that moment? How will you specifically train it in the days before?"
      ]
    },
    dailyGoal:"Do a focused visualization session specifically for your upcoming biggest competition. See it in as much detail as you've ever visualized anything.",
    mantra:"The pressure doesn't define me. My preparation defines my response to pressure.",
    keyTakeaway:"You fall to your training level when pressure peaks. Daily mental training ensures your training level is elite."
  },
  {
    day:26, week:4, phase:"ELITE LEVEL", emoji:"🤝",
    title:"Be a Teammate First",
    subtitle:"Mental Toughness Is Contagious",
    module:"Leadership",
    color:"#D6182B",
    quote:{text:"Talent wins games, but teamwork and intelligence win championships.",author:"Michael Jordan"},
    lesson:`Here's something the book hints at but never says directly: mental toughness is contagious.

When you walk into the gym with locked-in focus, when you respond to adversity with composure, when you take the big shot with confidence — your teammates feel it. It raises the entire team's energy.

Leadership doesn't require a title. The most mentally tough athlete in the room is ALWAYS leading, whether they know it or not.

Conversely, the most mentally fragile athlete in the room brings the whole team down. We've all been on a team where one person's anxiety became everyone's anxiety. One person's doubt became everyone's doubt.

You've been doing 26 days of mental work. You're not the same athlete you were on Day 1. People will start to notice. Coaches will start to notice. And the most important thing you can do with the mental strength you're building is USE IT IN SERVICE OF YOUR TEAM.

This doesn't mean giving advice. Nobody likes unsolicited coaching.
It means competing with infectious energy.
It means responding to mistakes with resilience, not frustration.
It means encouraging your teammates when they're struggling.
It means being the person in the huddle who makes everyone else believe.

The mentally toughest athlete on any team is also the most valuable — regardless of their stats.

Be THAT athlete.`,
    exercise:{
      type:"leadership",
      title:"Mental Leadership",
      icon:"🤝",
      prompt:"Explore your mental leadership on your team.",
      questions:[
        "Think about your team right now. Who struggles the most mentally — with confidence, anxiety, or responding to mistakes?",
        "How does your mental state affect your team? What happens to your teammates when you're locked in vs. when you're struggling?",
        "What is ONE thing you could do differently this week that would make your TEAM's collective mental state stronger?",
        "Describe what a mentally tough teammate looks like. How do they compete? How do they handle adversity in front of the group?",
        "Write a commitment to your team: 'My mental toughness is in service of my team. I will _____.'"
      ]
    },
    dailyGoal:"Identify one teammate who could use encouragement. Give it to them genuinely — not as coaching, just as support.",
    mantra:"My mental strength makes everyone around me better. That's leadership.",
    keyTakeaway:"Mental toughness is contagious. How you compete affects your whole team. Lead by example."
  },
  {
    day:27, week:4, phase:"ELITE LEVEL", emoji:"🚀",
    title:"Beyond the Sport",
    subtitle:"Mental Toughness is a Life Skill",
    module:"Life Application",
    color:"#A83A0A",
    quote:{text:"Mental toughness is doing the right thing for the team when it's not the best thing for you.",author:"Bill Belichick"},
    lesson:`Here's the most important thing this whole program has been preparing you for: none of this is just about sports.

Every mental tool you've built over the last 27 days will serve you in every other area of your life.

Visualization? You can use it before a job interview, a public speech, a difficult conversation, an exam.

Goal writing? That's how the most successful humans in every field achieve extraordinary things — in business, in art, in science, in relationships.

Meditation? That's how leaders make clear decisions under pressure. That's how doctors perform surgery with steady hands. That's how musicians perform at Carnegie Hall without freezing.

Failure as a teacher? That's the secret of every entrepreneur who ever built something great. J.K. Rowling. Steve Jobs. Oprah Winfrey. They all failed massively before they succeeded massively.

Subconscious programming? That's literally how every great human being who ever lived shaped their own mind to align with their greatest vision for themselves.

Training rough, playing small, practicing slow — these are principles for mastering ANY skill in ANY field.

You're not just becoming a better athlete. You're becoming a better person. A clearer thinker. A more resilient human being. The mental architecture you're building right now will pay dividends for the rest of your life in ways you can't yet imagine.

The sports arena is just the training ground.`,
    exercise:{
      type:"life_application",
      title:"Mental Toughness Beyond the Game",
      icon:"🌍",
      prompt:"Expand your mental toughness vision beyond the sport.",
      questions:[
        "Outside of sports, where in your life do you struggle most with confidence or mental toughness?",
        "Choose TWO of the 8 mental exercises and describe specifically how you could apply them to that non-sports area of your life.",
        "What do you want to be known for in life — beyond your athletic achievements? How does mental toughness serve that vision?",
        "Describe an adult in your life (parent, coach, mentor) who displays the mental toughness characteristics you want to embody. What do you see in them?",
        "If you applied these same mental training principles to school, relationships, or a future career — what would that look like?"
      ]
    },
    dailyGoal:"Apply one mental training principle to a non-sports challenge you're facing right now. Journal the experience.",
    mantra:"The mental toughness I build in sports makes me unstoppable everywhere.",
    keyTakeaway:"Every mental tool in this program is a life tool. Your athletic training ground is preparing you for everything."
  },
  {
    day:28, week:4, phase:"ELITE LEVEL", emoji:"🔮",
    title:"Week 4 Check-In: The Athlete You've Become",
    subtitle:"Four Weeks of Mental Work",
    module:"Review",
    color:"#D6182B",
    quote:{text:"I've failed over and over and over again in my life. And that is why I succeed.",author:"Michael Jordan"},
    lesson:`Four weeks ago you sat down and answered questions about who you were mentally as an athlete. You rated yourself. You identified your biggest mental challenge. You wrote down where you wanted to go.

Let's measure the gap between then and now.

28 days of mental work. That's 28 days of:
→ Goal writing (if you kept up with it — most mornings and nights)
→ Visualization sessions
→ Meditation practice
→ Subconscious reprogramming
→ Engraving sessions watching the pros
→ Constraint training and slow practice reps
→ Mental resets after mistakes in competition
→ Deep reflection on failure, growth, fearlessness, leadership

This is a LOT of invisible work. And invisible work produces visible results — they're just on a delay.

You might not have had your breakout moment yet. Or maybe you have. But whether you can see the results yet or not, something has changed. The seeds are in the ground.

Champions are not made in the season. Champions are made in the offseason. In the moments when no one is watching. In the mental reps. In the 5-minute meditation nobody sees. In the goals written before the sun comes up.

You've been doing that. Quietly, consistently, intentionally.

That's who you are now.`,
    exercise:{
      type:"weekly_review",
      title:"Four-Week Final Debrief",
      icon:"🏆",
      prompt:"Compare yourself now to Day 1.",
      questions:[
        "Go back and read your Day 1 answers. What's different about how you see yourself as an athlete?",
        "Which of the 8 mental exercises has become a genuine habit for you?",
        "What is the most important mental shift that happened in the last 4 weeks? Describe it.",
        "What do your goals look like now compared to Day 1? More specific? More confident? More ambitious?",
        "Rate your mental toughness 1-10 right now. Compare to Day 1. What drove the change?"
      ]
    },
    dailyGoal:"Rewrite your goals one more time — with the confidence of someone who has done 28 days of mental work. Notice how they've evolved.",
    mantra:"28 days of invisible work. Watch what happens when it becomes visible.",
    keyTakeaway:"Mental toughness is built daily. You've been building it. The results are coming."
  },

  // ── FINAL DAYS: GRADUATION ─────────────────────────────────────────────
  {
    day:29, week:5, phase:"GRADUATION", emoji:"📖",
    title:"Build Your Personal Playbook",
    subtitle:"The System That's Yours Forever",
    module:"Personal Playbook",
    color:"#A83A0A",
    quote:{text:"Know yourself, or be known by your defeat.",author:"Sun Tzu"},
    lesson:`You've spent 29 days learning, practicing, and applying eight mental toughness tools. Now it's time to build YOUR playbook — the personalized mental performance system that belongs to you.

No two athletes are exactly alike. You've discovered over these 29 days which tools work best for you. Which visualization techniques connect most powerfully. Which affirmations ring truest. Which of the 8 exercises feels most natural.

Your job now is to codify what works — to write it down so clearly that on the hardest day of your athletic career, when everything is going wrong and you need your mental tools most — you know EXACTLY what to do.

This is your life's work as an athlete. Not just the physical training. The whole system.

Elite athletes revisit and refine their mental playbooks throughout their careers. What works for you at 14 may need adjustments at 17. What serves you at the high school level will evolve at the college level. The foundation stays the same — the fine-tuning continues.

You're not done after today. You're just getting started.

Tomorrow is the graduation day. But the real graduation isn't a ceremony — it's the moment in competition when you're under maximum pressure and your mental training speaks for you.

That moment is coming. You'll know it when it arrives.`,
    exercise:{
      type:"playbook",
      title:"Your Personal Mental Performance Playbook",
      icon:"📖",
      prompt:"Compile your complete personal playbook. This is your most important work in the whole program.",
      sections:[
        {section:"My Identity", prompt:"Write 5 sentences that define who you are as an athlete. Present tense, powerful, specific."},
        {section:"My Goals", prompt:"Write your complete goal stack: today, this week, this season, long-range, the dream. Present tense, specific."},
        {section:"My Daily Mental Routine", prompt:"Write out your complete morning/pre-game/night mental training protocol in detail."},
        {section:"My Reset Protocol", prompt:"Describe your exact 3-second reset process for after mistakes."},
        {section:"My Top 3 Mental Tools", prompt:"Which 3 of the 8 exercises are most powerful for you? Why?"},
        {section:"My Mental Challenges", prompt:"What are your 2 biggest mental challenges? What's your game plan for each?"},
        {section:"My Mantra", prompt:"Write your personal performance mantra — the phrase that puts you in your best mental state."}
      ]
    },
    dailyGoal:"Complete your full personal playbook. This document belongs to you. Keep it and update it throughout your career.",
    mantra:"I have a playbook. I have a system. I have a plan. I am ready.",
    keyTakeaway:"Your personalized mental playbook is the most valuable document you'll create as an athlete. Build it. Use it. Evolve it."
  },
  {
    day:30, week:5, phase:"GRADUATION", emoji:"🏆",
    title:"Welcome to the 1%",
    subtitle:"30 Days. 8 Tools. One Extraordinary Athlete.",
    module:"Graduation",
    color:"#D6182B",
    quote:{text:"Mental toughness is doing the work when nobody's watching, in preparation for the moments when everybody is.",author:"Kobe Bryant"},
    lesson:`30 days ago you opened this playbook.

You were already a good athlete. Now you have something most athletes will never have — a mental performance system that the greatest athletes in the world use, in your hands, tested by you, personalized to your game.

Let's acknowledge what you've built:

🧠 **Your subconscious mind** is now programmed with what you WANT to see — not what you fear.
🛡️ **Your mental armor** is built. You know how to guard your thoughts and protect your mindset.
🎬 **Your visualization practice** has given you hundreds of mental reps in your sport — on top of all your physical ones.
📝 **Your goals** are written, specific, present-tense, and programmed into your brain.
👁️ **Your engraving library** is building as you study the pros you admire.
🧘 **Your meditation practice** is training your brain toward the zone.
🔥 **Your constraint training** has made the actual competition feel easier.
⏱️ **Your slow practice** is building neural pathways that perform under maximum pressure.

These are not things you READ about. These are things you PRACTICED.

The journey doesn't end here. In fact, today is just the beginning.

30 days was your foundation. Now you build on it. Every day. For the rest of your athletic career.

Mental toughness is not a destination — it's a practice. A daily choice to show up for your mind the way you show up for your body.

You made that choice for 30 days.

That's who you are now. Welcome to the 1%.

See you at the top.`,
    exercise:{
      type:"graduation",
      title:"Graduation Day",
      icon:"🏆",
      prompt:"Your final entry in this playbook. Make it count.",
      questions:[
        "What was the single most powerful insight from these 30 days? The thing that changed how you see yourself as an athlete.",
        "Describe a specific moment from the last 30 days where your mental training made a real difference in competition or practice.",
        "Write a letter to an athlete one year behind you — someone just starting their mental toughness journey. What do you want them to know?",
        "What is your commitment to your mental training practice beyond Day 30? How will you keep the system alive?",
        "Finish this sentence: 'In 5 years, because of the mental work I started on Day 1 of this playbook, I will have...'"
      ]
    },
    dailyGoal:"Share this playbook with one athlete who needs it. Pay it forward. Mental toughness multiplies when shared.",
    mantra:"I am mentally tough. I was built for this. I earned it. Now I go use it.",
    keyTakeaway:"You completed 30 days of mental training. You are now in the 1%. The work continues — every single day."
  }
];

// ─── AI FEEDBACK ───────────────────────────────────────────────────────────
async function getAIFeedback(dayTitle, prompt, response, athleteName) {
  const name = athleteName || "Athlete";
  const systemPrompt = `You are an elite sports psychologist and mental performance coach working with young competitive athletes. You are direct, encouraging, and challenging — like a great coach. Never condescending. Always in their corner. Gender-neutral language always. Reference the mental toughness principles from the program when relevant. Keep feedback to 3-5 sentences max. Be specific to what they wrote.`;
  const userPrompt = `Day topic: "${dayTitle}"\nPrompt: "${prompt}"\n${name}'s response: "${response}"\n\nGive this athlete direct, specific, coach-level feedback on their response. Push them forward. Be real with them.`;
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({model:"claude-sonnet-4-6",max_tokens:300,
        system:systemPrompt, messages:[{role:"user",content:userPrompt}]})
    });
    const d = await r.json();
    return d.content?.[0]?.text || "Keep pushing. Every rep counts.";
  } catch(e) { return "Great work. Keep showing up for your mind like you show up for your body."; }
}

// ─── MAIN APP ──────────────────────────────────────────────────────────────
function MentalToughnessApp({ onBack, siteUserName }) {
  const [loaded, setLoaded] = useState(false);
  const [currentDay, setCurrentDay] = useState(0);
  const [view, setView] = useState("home"); // home | day | journal | goals | progress
  const [journalEntries, setJournalEntries] = useState({});
  const [goalEntries, setGoalEntries] = useState({});
  const [confidenceRatings, setConfidenceRatings] = useState({});
  const [completedDays, setCompletedDays] = useState({});
  const [showDayPicker, setShowDayPicker] = useState(false);
  const [aiFeedback, setAiFeedback] = useState({});
  const [loadingFeedback, setLoadingFeedback] = useState({});
  const [athleteName, setAthleteName] = useState(siteUserName || "");
  const [meditationActive, setMeditationActive] = useState(false);
  const [meditationTime, setMeditationTime] = useState(300);
  const [timerInterval, setTimerInterval] = useState(null);
  const [showNameSetup, setShowNameSetup] = useState(false);
  const contentRef = useRef(null);

  const day = PROGRAM[currentDay];

  // Load real progress once on mount, replacing what used to be a
  // window.storage read (which never worked outside a Claude artifact).
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/mental-toughness", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          const p = data.progress || {};
          if (p.currentDay !== undefined) setCurrentDay(p.currentDay);
          if (p.completedDays) setCompletedDays(p.completedDays);
          if (p.journalEntries) setJournalEntries(p.journalEntries);
          if (p.goalEntries) setGoalEntries(p.goalEntries);
          if (p.confidenceRatings) setConfidenceRatings(p.confidenceRatings);
        }
      } catch (e) {}
      setLoaded(true);
    })();
  }, []);

  // Debounced save whenever real progress changes, once the initial load
  // is done (so we don't immediately overwrite a fresh load with defaults).
  useEffect(() => {
    if (!loaded) return;
    const timeout = setTimeout(() => {
      fetch("/api/mental-toughness", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentDay, completedDays, journalEntries, goalEntries, confidenceRatings }),
      }).catch(() => {});
    }, 800);
    return () => clearTimeout(timeout);
  }, [loaded, currentDay, completedDays, journalEntries, goalEntries, confidenceRatings]);

  useEffect(() => {
    contentRef.current?.scrollTo({top:0, behavior:"smooth"});
  }, [currentDay, view]);

  function startMeditation() {
    setMeditationActive(true);
    setMeditationTime(300);
    const iv = setInterval(() => {
      setMeditationTime(t => {
        if (t <= 1) { clearInterval(iv); setMeditationActive(false); return 0; }
        return t - 1;
      });
    }, 1000);
    setTimerInterval(iv);
  }

  function stopMeditation() {
    if (timerInterval) clearInterval(timerInterval);
    setMeditationActive(false);
    setMeditationTime(300);
  }

  function markDayComplete() {
    setCompletedDays(c => ({...c, [currentDay]: true}));
    if (currentDay < 29) {
      setTimeout(() => { setCurrentDay(d => d + 1); setView("home"); }, 500);
    }
  }

  async function requestFeedback(key, prompt, response) {
    if (!response?.trim() || response.trim().length < 20) return;
    setLoadingFeedback(l => ({...l, [key]: true}));
    const fb = await getAIFeedback(day.title, prompt, response, athleteName);
    setAiFeedback(f => ({...f, [key]: fb}));
    setLoadingFeedback(l => ({...l, [key]: false}));
  }

  const phaseColors = {
    "FOUNDATION":"#FF4500", "LEVEL UP":"#0077B6",
    "GO DEEPER":"#4A148C", "ELITE LEVEL":"#FF6F00", "GRADUATION":"#1B5E20"
  };
  const weekLabels = {1:"Week 1: Foundation",2:"Week 2: Level Up",3:"Week 3: Go Deeper",4:"Week 4: Elite Level",5:"Graduation"};
  const completedCount = Object.keys(completedDays).length;

  // ── MEDITATION TIMER DISPLAY
  const formatTime = t => `${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`;

  // ── Home Screen
  if (!loaded) {
    return (
      <div style={{minHeight:"100vh",background:"#FFFFFF",color:"#141414",fontFamily:"Verdana, Geneva, sans-serif",display:"flex",alignItems:"center",justifyContent:"center"}}>
        Loading your playbook...
      </div>
    );
  }

  if (view === "home" && !showNameSetup) {
    return (
      <div style={{minHeight:"100vh",background:"#FFFFFF",color:"#141414",fontFamily:"Verdana, Geneva, sans-serif",display:"flex",flexDirection:"column"}}>
        <style>{`*{box-sizing:border-box;}body{margin:0;background:#FFFFFF;}::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-thumb{background:#333;}textarea,input{font-family:Verdana, Geneva, sans-serif;}`}</style>

        {/* Hero Header */}
        <div style={{background:`linear-gradient(180deg, ${day.color}22 0%, #0A0A0A 100%)`,padding:"2rem 1.2rem 1.5rem",borderBottom:`2px solid ${day.color}44`}}>
          <div style={{maxWidth:"680px",margin:"0 auto"}}>
            {/* Progress bar */}
            {onBack && (
              <button onClick={onBack} style={{background:"transparent",border:"1px solid #333",color:"#aaa",borderRadius:8,padding:"5px 12px",cursor:"pointer",fontSize:"0.72rem",fontWeight:700,letterSpacing:"0.05em",marginBottom:"0.9rem"}}>
                ← All subjects
              </button>
            )}
            <div style={{display:"flex",alignItems:"center",gap:"0.7rem",marginBottom:"1.2rem"}}>
              <div style={{flex:1,background:"#1a1a1a",borderRadius:"4px",height:"4px"}}>
                <div style={{background:day.color,borderRadius:"4px",height:"100%",width:`${(completedCount/30)*100}%`,transition:"width 0.5s"}}/>
              </div>
              <span style={{color:"#888",fontSize:"0.72rem",fontWeight:700,letterSpacing:"0.1em",whiteSpace:"nowrap"}}>{completedCount}/30 DAYS</span>
            </div>

            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:"1rem"}}>
              <div>
                <p style={{margin:"0 0 0.3rem",color:day.color,fontSize:"0.7rem",fontWeight:800,letterSpacing:"0.2em",textTransform:"uppercase"}}>{weekLabels[day.week]} · {day.phase}</p>
                <h1 style={{margin:"0 0 0.3rem",fontFamily:"Verdana, Geneva, sans-serif",fontSize:"clamp(2rem,8vw,3.2rem)",fontWeight:900,lineHeight:1,letterSpacing:"-0.02em",textTransform:"uppercase"}}>
                  {athleteName ? `${athleteName},` : "🔥"}<br/>
                  <span style={{color:day.color}}>Day {day.day}</span>
                </h1>
                <p style={{margin:0,fontSize:"0.9rem",color:"#aaa",fontStyle:"italic"}}>{day.subtitle}</p>
              </div>
              <div onClick={()=>setShowDayPicker(true)} style={{background:"#1a1a1a",border:`2px solid ${day.color}55`,borderRadius:"10px",padding:"0.6rem 0.9rem",cursor:"pointer",textAlign:"center",flexShrink:0}}>
                <p style={{margin:0,fontSize:"2rem",lineHeight:1}}>{day.emoji}</p>
                <p style={{margin:"0.2rem 0 0",fontSize:"0.65rem",color:"#888",fontWeight:700,letterSpacing:"0.1em"}}>DAY MAP</p>
              </div>
            </div>

            {/* Today's quote */}
            <div style={{background:"#111",borderLeft:`1.5px solid ${day.color}`,borderRadius:"0 8px 8px 0",padding:"0.9rem 1rem",marginTop:"1.2rem"}}>
              <p style={{margin:"0 0 0.3rem",fontSize:"0.95rem",fontStyle:"italic",color:"#ddd",lineHeight:1.5}}>"{day.quote.text}"</p>
              <p style={{margin:0,fontSize:"0.72rem",color:day.color,fontWeight:700,letterSpacing:"0.08em"}}>— {day.quote.author}</p>
            </div>
          </div>
        </div>

        {/* Nav Cards */}
        <div style={{flex:1,maxWidth:"680px",margin:"0 auto",padding:"1.2rem",width:"100%"}}>
          {[
            {id:"lesson",emoji:"📖",title:"Today's Lesson",desc:"Read the mental training content",color:"#333"},
            {id:"exercise",emoji:"⚡",title:"Today's Exercise",desc:day.exercise.title,color:"#D6182B",accent:day.color},
            {id:"goals",emoji:"🎯",title:"My Goals",desc:"View & update your goal stack",color:"#111"},
            {id:"journal",emoji:"📓",title:"My Journal",desc:"All your reflections in one place",color:"#111"},
          ].map(item => (
            <div key={item.id} onClick={()=>setView(item.id === "lesson" ? "day" : item.id === "exercise" ? "exercise" : item.id)}
              style={{background:item.color,border:`1px solid ${item.accent||"#333"}`,borderRadius:"12px",padding:"1rem 1.2rem",marginBottom:"0.7rem",cursor:"pointer",display:"flex",alignItems:"center",gap:"1rem",transition:"transform 0.15s"}}
              onMouseEnter={e=>e.currentTarget.style.transform="scale(1.01)"}
              onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
              <span style={{fontSize:"1.6rem",flexShrink:0}}>{item.emoji}</span>
              <div>
                <p style={{margin:"0 0 0.1rem",fontWeight:800,fontSize:"0.95rem",letterSpacing:"0.02em"}}>{item.title}</p>
                <p style={{margin:0,fontSize:"0.8rem",color:"#888"}}>{item.desc}</p>
              </div>
              <span style={{marginLeft:"auto",color:"#555",fontSize:"1.2rem"}}>›</span>
            </div>
          ))}

          {/* Meditation quick-start */}
          <div style={{background:"#0d1a2e",border:"1px solid #0077B644",borderRadius:"12px",padding:"1rem 1.2rem",marginBottom:"0.7rem"}}>
            <div style={{display:"flex",alignItems:"center",gap:"1rem",marginBottom:meditationActive?"0.8rem":"0"}}>
              <span style={{fontSize:"1.6rem"}}>🧘</span>
              <div style={{flex:1}}>
                <p style={{margin:"0 0 0.1rem",fontWeight:800,fontSize:"0.95rem"}}>5-Minute Meditation</p>
                <p style={{margin:0,fontSize:"0.8rem",color:"#888"}}>{meditationActive ? `${formatTime(meditationTime)} remaining` : "Train your brain for the zone"}</p>
              </div>
              <button onClick={meditationActive ? stopMeditation : startMeditation}
                style={{background:meditationActive?"#B71C1C":"#0077B6",border:"none",borderRadius:"8px",color:"white",padding:"0.5rem 1rem",fontWeight:700,fontSize:"0.82rem",cursor:"pointer",fontFamily:"inherit"}}>
                {meditationActive ? "Stop" : "Start"}
              </button>
            </div>
            {meditationActive && (
              <div style={{background:"#0a1525",borderRadius:"8px",padding:"0.8rem",textAlign:"center"}}>
                <p style={{margin:"0 0 0.4rem",fontFamily:"Verdana, Geneva, sans-serif",fontSize:"2.5rem",fontWeight:900,color:"#D6182B",letterSpacing:"0.05em"}}>{formatTime(meditationTime)}</p>
                <p style={{margin:0,fontSize:"0.8rem",color:"#555",fontStyle:"italic"}}>Imagine a calm river. Attach each thought to a log and let it float away.</p>
              </div>
            )}
          </div>

          {/* Confidence rating */}
          <div style={{background:"#111",border:"1px solid #333",borderRadius:"12px",padding:"1rem 1.2rem",marginBottom:"1.2rem"}}>
            <p style={{margin:"0 0 0.8rem",fontWeight:800,fontSize:"0.88rem",color:"#aaa",letterSpacing:"0.05em",textTransform:"uppercase"}}>Today's Confidence Rating</p>
            <div style={{display:"flex",gap:"0.4rem",justifyContent:"space-between"}}>
              {[1,2,3,4,5,6,7,8,9,10].map(n => (
                <button key={n} onClick={()=>setConfidenceRatings(r=>({...r,[currentDay]:n}))}
                  style={{flex:1,padding:"0.5rem 0",borderRadius:"7px",border:"none",background:confidenceRatings[currentDay]===n?day.color:"#D6182B",color:confidenceRatings[currentDay]===n?"white":"#666",fontWeight:800,fontSize:"0.82rem",cursor:"pointer",transition:"all 0.15s"}}>
                  {n}
                </button>
              ))}
            </div>
            {confidenceRatings[currentDay] && <p style={{margin:"0.6rem 0 0",fontSize:"0.78rem",color:"#666",textAlign:"center"}}>Rated {confidenceRatings[currentDay]}/10 today</p>}
          </div>

          {/* Today's Mantra */}
          <div style={{background:`${day.color}15`,border:`1px solid ${day.color}33`,borderRadius:"12px",padding:"1rem 1.2rem",marginBottom:"1.2rem",textAlign:"center"}}>
            <p style={{margin:"0 0 0.3rem",fontSize:"0.65rem",color:day.color,fontWeight:800,letterSpacing:"0.2em",textTransform:"uppercase"}}>TODAY'S MANTRA</p>
            <p style={{margin:0,fontSize:"1rem",fontWeight:700,fontStyle:"italic",color:"white",lineHeight:1.5}}>"{day.mantra}"</p>
          </div>

          {/* Complete Day button */}
          {!completedDays[currentDay] && (
            <button onClick={markDayComplete}
              style={{width:"100%",padding:"1rem",borderRadius:"12px",border:"none",background:`linear-gradient(135deg,${day.color},${day.color}aa)`,color:"white",fontFamily:"Verdana, Geneva, sans-serif",fontSize:"1.1rem",fontWeight:900,letterSpacing:"0.08em",textTransform:"uppercase",cursor:"pointer",boxShadow:`0 4px 20px ${day.color}44`}}>
              ✓ MARK DAY {day.day} COMPLETE
            </button>
          )}
          {completedDays[currentDay] && (
            <div style={{background:"#0d2818",border:"1px solid #2E7D32",borderRadius:"12px",padding:"0.8rem",textAlign:"center"}}>
              <p style={{margin:0,color:"#D6182B",fontWeight:800,letterSpacing:"0.05em"}}>✅ DAY {day.day} COMPLETE</p>
            </div>
          )}

          <p style={{textAlign:"center",marginTop:"1.5rem",fontSize:"0.72rem",color:"#333",fontStyle:"italic"}}>Mental Toughness for Young Athletes • Troy & Moses Horne • Personal use only</p>
        </div>

        {/* Day Picker Modal */}
        {showDayPicker && (
          <div onClick={()=>setShowDayPicker(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",zIndex:100,display:"flex",alignItems:"flex-end",backdropFilter:"blur(4px)"}}>
            <div onClick={e=>e.stopPropagation()} style={{background:"#111",borderRadius:"20px 20px 0 0",padding:"1.5rem",width:"100%",maxHeight:"80vh",overflowY:"auto"}}>
              <h3 style={{margin:"0 0 1.2rem",fontFamily:"Verdana, Geneva, sans-serif",fontSize:"1.4rem",fontWeight:900,textTransform:"uppercase",letterSpacing:"0.05em"}}>30-Day Program Map</h3>
              {[1,2,3,4,5].map(week => (
                <div key={week} style={{marginBottom:"1rem"}}>
                  <p style={{margin:"0 0 0.5rem",fontSize:"0.7rem",fontWeight:800,color:"#555",letterSpacing:"0.15em",textTransform:"uppercase"}}>{weekLabels[week]}</p>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:"5px"}}>
                    {PROGRAM.filter(d=>d.week===week).map(d => {
                      const di = d.day - 1;
                      return <button key={d.day} onClick={()=>{setCurrentDay(di);setView("home");setShowDayPicker(false);}}
                        style={{padding:"6px 2px",borderRadius:"6px",border:"none",background:di===currentDay?d.color:completedDays[di]?"#1a3a1a":"#1a1a1a",color:di===currentDay?"white":completedDays[di]?"#4CAF50":"#555",fontWeight:di===currentDay?900:600,fontSize:"0.75rem",cursor:"pointer"}}>
                        {d.day}
                      </button>;
                    })}
                  </div>
                </div>
              ))}
              <button onClick={()=>setShowDayPicker(false)} style={{width:"100%",marginTop:"0.5rem",padding:"0.7rem",borderRadius:"10px",border:"1px solid #333",background:"transparent",color:"#666",cursor:"pointer",fontFamily:"inherit",fontWeight:700}}>Close</button>
            </div>
          </div>
        )}

        {/* Name setup button */}
        <div style={{position:"fixed",bottom:"1rem",right:"1rem"}}>
          <button onClick={()=>setShowNameSetup(true)} style={{background:"#1a1a1a",border:"1px solid #333",borderRadius:"50%",width:"44px",height:"44px",cursor:"pointer",fontSize:"1.1rem",color:"white"}}>⚙️</button>
        </div>
      </div>
    );
  }

  // ── Name Setup
  if (showNameSetup) {
    return (
      <div style={{minHeight:"100vh",background:"#FFFFFF",color:"#141414",fontFamily:"Verdana, Geneva, sans-serif",display:"flex",alignItems:"center",justifyContent:"center",padding:"1.5rem"}}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;700;800;900&family=Barlow+Condensed:wght@700;800;900&display=swap');*{box-sizing:border-box;}body{margin:0;}`}</style>
        <div style={{maxWidth:"400px",width:"100%",textAlign:"center"}}>
          <p style={{fontSize:"3rem",marginBottom:"1rem"}}>🔥</p>
          <h1 style={{fontFamily:"Verdana, Geneva, sans-serif",fontSize:"2.2rem",fontWeight:900,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:"0.5rem"}}>Your Playbook</h1>
          <p style={{color:"#888",marginBottom:"2rem",fontSize:"0.9rem"}}>What should we call you, athlete?</p>
          <input value={athleteName} onChange={e=>setAthleteName(e.target.value)}
            placeholder="First name"
            style={{width:"100%",padding:"0.9rem",background:"#111",border:"2px solid #333",borderRadius:"10px",color:"white",fontSize:"1.1rem",textAlign:"center",marginBottom:"1rem",outline:"none"}}
            onFocus={e=>e.target.style.borderColor=PROGRAM[currentDay].color}
            onBlur={e=>e.target.style.borderColor="#333"}/>
          <button onClick={()=>setShowNameSetup(false)}
            style={{width:"100%",padding:"0.9rem",borderRadius:"10px",border:"none",background:PROGRAM[currentDay].color,color:"white",fontFamily:"Verdana, Geneva, sans-serif",fontSize:"1.1rem",fontWeight:900,letterSpacing:"0.08em",textTransform:"uppercase",cursor:"pointer"}}>
            {athleteName ? `LET'S GO, ${athleteName.toUpperCase()}` : "ENTER PLAYBOOK"}
          </button>
        </div>
      </div>
    );
  }

  // ── Lesson / Day View
  if (view === "day") {
    return (
      <div style={{minHeight:"100vh",background:"#FFFFFF",color:"#141414",fontFamily:"Verdana, Geneva, sans-serif"}}>
        <style>{`*{box-sizing:border-box;}body{margin:0;}`}</style>
        {/* Top bar */}
        <div style={{background:"#111",borderBottom:"1px solid #222",padding:"0.9rem 1.2rem",position:"sticky",top:0,zIndex:50,display:"flex",alignItems:"center",gap:"0.8rem"}}>
          <button onClick={()=>setView("home")} style={{background:"none",border:"none",color:"#888",cursor:"pointer",fontSize:"1.3rem",padding:0}}>←</button>
          <div>
            <p style={{margin:0,fontSize:"0.65rem",color:day.color,fontWeight:800,letterSpacing:"0.15em",textTransform:"uppercase"}}>DAY {day.day} · {day.module}</p>
            <p style={{margin:0,fontWeight:800,fontSize:"0.95rem"}}>{day.title}</p>
          </div>
        </div>

        <div ref={contentRef} style={{maxWidth:"680px",margin:"0 auto",padding:"1.5rem 1.2rem 5rem"}}>
          <div style={{background:"#111",borderLeft:`4px solid ${day.color}`,borderRadius:"0 10px 10px 0",padding:"1rem 1.2rem",marginBottom:"1.5rem"}}>
            <p style={{margin:0,fontStyle:"italic",fontSize:"0.95rem",color:"#ddd",lineHeight:1.6}}>"{day.quote.text}"</p>
            <p style={{margin:"0.5rem 0 0",fontSize:"0.72rem",color:day.color,fontWeight:700,letterSpacing:"0.08em"}}>— {day.quote.author}</p>
          </div>

          <div style={{whiteSpace:"pre-line",fontSize:"0.95rem",lineHeight:1.8,color:"#ccc"}}>
            {day.lesson.split('\n\n').map((para, i) => (
              <p key={i} style={{margin:"0 0 1.2rem",
                fontWeight: para.startsWith('**') ? 700 : 400,
                color: para.startsWith('→') || para.startsWith('✅') ? "#aaa" : "#ccc",
                fontSize: para.startsWith('**') ? "1rem" : "0.95rem"
              }}>
                {para.replace(/\*\*/g,"")}
              </p>
            ))}
          </div>

          <div style={{background:`${day.color}15`,border:`1px solid ${day.color}33`,borderRadius:"10px",padding:"1rem",marginTop:"1.5rem"}}>
            <p style={{margin:"0 0 0.3rem",fontSize:"0.65rem",color:day.color,fontWeight:800,letterSpacing:"0.15em",textTransform:"uppercase"}}>KEY TAKEAWAY</p>
            <p style={{margin:0,fontWeight:700,color:"white",lineHeight:1.5}}>{day.keyTakeaway}</p>
          </div>

          <button onClick={()=>setView("exercise")}
            style={{width:"100%",marginTop:"1.5rem",padding:"0.9rem",borderRadius:"10px",border:"none",background:day.color,color:"white",fontFamily:"Verdana, Geneva, sans-serif",fontSize:"1.1rem",fontWeight:900,letterSpacing:"0.08em",textTransform:"uppercase",cursor:"pointer"}}>
            JUMP TO TODAY'S EXERCISE ›
          </button>
        </div>
      </div>
    );
  }

  // ── Exercise View
  if (view === "exercise") {
    const dayJournal = journalEntries[currentDay] || {};
    function setEntry(key, val) {
      setJournalEntries(j => ({...j, [currentDay]: {...j[currentDay]||{}, [key]: val}}));
    }
    const ex = day.exercise;

    return (
      <div style={{minHeight:"100vh",background:"#FFFFFF",color:"#141414",fontFamily:"Verdana, Geneva, sans-serif"}}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,400;0,700;0,800;0,900;1,400;1,700&family=Barlow+Condensed:wght@700;800;900&display=swap');*{box-sizing:border-box;}body{margin:0;}textarea{outline:none;}`}</style>
        <div style={{background:"#111",borderBottom:"1px solid #222",padding:"0.9rem 1.2rem",position:"sticky",top:0,zIndex:50,display:"flex",alignItems:"center",gap:"0.8rem"}}>
          <button onClick={()=>setView("home")} style={{background:"none",border:"none",color:"#888",cursor:"pointer",fontSize:"1.3rem",padding:0}}>←</button>
          <div>
            <p style={{margin:0,fontSize:"0.65rem",color:day.color,fontWeight:800,letterSpacing:"0.15em",textTransform:"uppercase"}}>DAY {day.day} EXERCISE</p>
            <p style={{margin:0,fontWeight:800,fontSize:"0.95rem"}}>{ex.icon} {ex.title}</p>
          </div>
        </div>

        <div style={{maxWidth:"680px",margin:"0 auto",padding:"1.2rem 1.2rem 5rem"}}>
          <div style={{background:"#111",borderRadius:"10px",padding:"1rem",marginBottom:"1.2rem",border:"1px solid #222"}}>
            <p style={{margin:0,color:"#bbb",fontSize:"0.9rem",lineHeight:1.6}}>{ex.prompt}</p>
          </div>

          {/* Meditation type */}
          {ex.type === "meditation" && (
            <div>
              {ex.steps?.map((s,i) => (
                <div key={i} style={{background:"#0d1a2e",border:"1px solid #0077B633",borderRadius:"10px",padding:"1rem",marginBottom:"0.7rem",display:"flex",gap:"0.8rem",alignItems:"flex-start"}}>
                  <div style={{background:day.color,borderRadius:"50%",width:"28px",height:"28px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.8rem",fontWeight:900,flexShrink:0}}>{s.step}</div>
                  <p style={{margin:0,color:"#ccc",fontSize:"0.9rem",lineHeight:1.6}}>{s.instruction}</p>
                </div>
              ))}
              {ex.journalPrompt && (
                <div style={{marginTop:"1.2rem"}}>
                  <p style={{margin:"0 0 0.6rem",fontWeight:800,color:"#aaa",fontSize:"0.82rem",letterSpacing:"0.08em",textTransform:"uppercase"}}>Post-Meditation Journal</p>
                  <p style={{margin:"0 0 0.6rem",color:"#888",fontSize:"0.85rem"}}>{ex.journalPrompt}</p>
                  <textarea value={dayJournal["meditation"]||""} onChange={e=>setEntry("meditation",e.target.value)}
                    placeholder="Write your experience here..."
                    rows={4} style={{width:"100%",background:"#111",border:"2px solid #333",borderRadius:"10px",color:"white",padding:"0.8rem",fontSize:"0.9rem",resize:"vertical",lineHeight:1.6}}/>
                  <button onClick={()=>requestFeedback("meditation", ex.journalPrompt, dayJournal["meditation"]||"")}
                    style={{marginTop:"0.5rem",padding:"0.5rem 1rem",borderRadius:"8px",border:"none",background:"#0077B6",color:"white",fontWeight:700,fontSize:"0.82rem",cursor:"pointer",fontFamily:"inherit"}}>
                    {loadingFeedback["meditation"] ? "Getting feedback..." : "Get Coach Feedback 🤖"}
                  </button>
                  {aiFeedback["meditation"] && <div style={{marginTop:"0.7rem",background:"#0d1a2e",borderRadius:"8px",padding:"0.8rem",fontSize:"0.85rem",color:"#A83A0A",lineHeight:1.6,borderLeft:`1.5px solid #0077B6`}}>{aiFeedback["meditation"]}</div>}
                </div>
              )}
            </div>
          )}

          {/* Questions-based exercises */}
          {["reflection","scenario","energy_shift","goal_audit","deliberate_design","big_moment","identity","leadership","life_application","rough_plan","system_integration","triple_stack","failure_reframe","weekly_review","constraint_design","slow_practice","engraving","breakthrough","goal_builder"].includes(ex.type) && (
            <div>
              {(ex.questions || ex.parts?.flatMap(p=>[{text:p.title+": "+p.instruction}]) || []).map((q,i) => {
                const questionText = typeof q === "string" ? q : q.text || q;
                const key = `q${i}`;
                return <div key={i} style={{marginBottom:"1.2rem"}}>
                  <div style={{display:"flex",alignItems:"flex-start",gap:"0.5rem",marginBottom:"0.5rem"}}>
                    <span style={{background:day.color,color:"white",borderRadius:"50%",width:"24px",height:"24px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.75rem",fontWeight:900,flexShrink:0,marginTop:"0.1rem"}}>{i+1}</span>
                    <p style={{margin:0,color:"#ccc",fontSize:"0.9rem",lineHeight:1.6,fontWeight:500}}>{questionText}</p>
                  </div>
                  <textarea value={dayJournal[key]||""} onChange={e=>setEntry(key,e.target.value)}
                    placeholder="Write your answer here..." rows={3}
                    style={{width:"100%",background:"#111",border:"2px solid #222",borderRadius:"9px",color:"white",padding:"0.7rem 0.9rem",fontSize:"0.88rem",resize:"vertical",lineHeight:1.6,borderTop:`2px solid ${day.color}44`}}
                    onFocus={e=>e.target.style.borderColor=day.color}
                    onBlur={e=>e.target.style.borderColor=`${day.color}44`}/>
                  {(dayJournal[key]||"").length > 30 && !aiFeedback[key] && (
                    <button onClick={()=>requestFeedback(key, questionText, dayJournal[key]||"")}
                      style={{marginTop:"0.3rem",padding:"0.35rem 0.8rem",borderRadius:"7px",border:"none",background:"#1a1a1a",color:"#888",fontWeight:700,fontSize:"0.75rem",cursor:"pointer",fontFamily:"inherit"}}>
                      {loadingFeedback[key] ? "..." : "Coach Feedback 🤖"}
                    </button>
                  )}
                  {aiFeedback[key] && <div style={{marginTop:"0.5rem",background:"#111",borderRadius:"8px",padding:"0.7rem",fontSize:"0.83rem",color:"#A83A0A",lineHeight:1.6,borderLeft:`1.5px solid ${day.color}`}}>{aiFeedback[key]}</div>}
                </div>;
              })}
            </div>
          )}

          {/* Goal builder type */}
          {ex.type === "goal_builder" && ex.goalTypes && (
            <div>
              {ex.goalTypes.map((g,i) => (
                <div key={i} style={{marginBottom:"1.2rem"}}>
                  <div style={{display:"flex",alignItems:"center",gap:"0.5rem",marginBottom:"0.4rem"}}>
                    <span style={{background:day.color,color:"white",borderRadius:"6px",padding:"0.2rem 0.6rem",fontSize:"0.7rem",fontWeight:800,letterSpacing:"0.05em",textTransform:"uppercase"}}>{g.type}</span>
                  </div>
                  <p style={{margin:"0 0 0.4rem",color:"#888",fontSize:"0.82rem"}}>{g.timeframe}</p>
                  <p style={{margin:"0 0 0.5rem",color:"#555",fontSize:"0.78rem",fontStyle:"italic"}}>Example: {g.example}</p>
                  <textarea value={dayJournal[`goal_${i}`]||""} onChange={e=>setEntry(`goal_${i}`,e.target.value)}
                    placeholder="Write in present tense: 'I am...' or 'I take...'" rows={2}
                    style={{width:"100%",background:"#111",border:`2px solid ${day.color}44`,borderRadius:"9px",color:"white",padding:"0.7rem 0.9rem",fontSize:"0.88rem",resize:"none",lineHeight:1.6}}
                    onFocus={e=>e.target.style.borderColor=day.color}
                    onBlur={e=>e.target.style.borderColor=`${day.color}44`}/>
                </div>
              ))}
            </div>
          )}

          {/* Rewrite type */}
          {ex.type === "rewrite" && ex.rewrites && (
            <div>
              {ex.rewrites.map((r,i) => (
                <div key={i} style={{marginBottom:"1.2rem"}}>
                  <div style={{background:"#1a1a1a",borderRadius:"8px",padding:"0.7rem 0.9rem",marginBottom:"0.5rem"}}>
                    <p style={{margin:"0 0 0.2rem",fontSize:"0.72rem",color:"#555",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em"}}>Negative Thought</p>
                    <p style={{margin:0,color:"#888",fontStyle:"italic",textDecoration:"line-through",fontSize:"0.9rem"}}>"{r.negative}"</p>
                  </div>
                  <p style={{margin:"0 0 0.4rem",color:"#666",fontSize:"0.78rem"}}>💡 {r.hint}</p>
                  <textarea value={dayJournal[`rw${i}`]||""} onChange={e=>setEntry(`rw${i}`,e.target.value)}
                    placeholder="Rewrite as a positive command..." rows={2}
                    style={{width:"100%",background:"#111",border:`2px solid ${day.color}44`,borderRadius:"9px",color:"white",padding:"0.7rem",fontSize:"0.88rem",resize:"none",lineHeight:1.6}}
                    onFocus={e=>e.target.style.borderColor=day.color}
                    onBlur={e=>e.target.style.borderColor=`${day.color}44`}/>
                </div>
              ))}
            </div>
          )}

          {/* Guided visualization */}
          {ex.type === "guided_viz" && (
            <div>
              {ex.steps?.map((s,i) => (
                <div key={i} style={{background:"#0d1030",border:"1px solid #0077B633",borderRadius:"10px",padding:"1rem",marginBottom:"0.7rem",display:"flex",gap:"0.8rem"}}>
                  <div style={{background:"#0077B6",borderRadius:"50%",width:"28px",height:"28px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.8rem",fontWeight:900,flexShrink:0,marginTop:"0.1rem"}}>
                    {s.step}
                  </div>
                  <p style={{margin:0,color:"#ccc",fontSize:"0.9rem",lineHeight:1.6}}>{s.instruction}</p>
                </div>
              ))}
              <div style={{marginTop:"1.2rem"}}>
                <p style={{margin:"0 0 0.6rem",color:"#888",fontSize:"0.85rem"}}>{ex.journalPrompt}</p>
                <textarea value={dayJournal["viz_journal"]||""} onChange={e=>setEntry("viz_journal",e.target.value)}
                  placeholder="Describe your visualization experience..." rows={5}
                  style={{width:"100%",background:"#111",border:`2px solid ${day.color}44`,borderRadius:"9px",color:"white",padding:"0.8rem",fontSize:"0.9rem",resize:"vertical",lineHeight:1.6}}
                  onFocus={e=>e.target.style.borderColor=day.color}
                  onBlur={e=>e.target.style.borderColor=`${day.color}44`}/>
                <button onClick={()=>requestFeedback("viz", ex.journalPrompt, dayJournal["viz_journal"]||"")}
                  style={{marginTop:"0.5rem",padding:"0.5rem 1rem",borderRadius:"8px",border:"none",background:day.color,color:"white",fontWeight:700,fontSize:"0.82rem",cursor:"pointer",fontFamily:"inherit"}}>
                  {loadingFeedback["viz"] ? "..." : "Get Coach Feedback 🤖"}
                </button>
                {aiFeedback["viz"] && <div style={{marginTop:"0.7rem",background:"#111",borderRadius:"8px",padding:"0.8rem",fontSize:"0.85rem",color:"#A83A0A",lineHeight:1.6,borderLeft:`1.5px solid ${day.color}`}}>{aiFeedback["viz"]}</div>}
              </div>
            </div>
          )}

          {/* Advanced viz */}
          {ex.type === "advanced_viz" && ex.parts && (
            <div>
              {ex.parts.map((p,i) => (
                <div key={i} style={{marginBottom:"1.4rem"}}>
                  <div style={{background:`${day.color}22`,borderRadius:"8px 8px 0 0",padding:"0.7rem 0.9rem"}}>
                    <p style={{margin:0,fontWeight:800,color:day.color,fontSize:"0.82rem",letterSpacing:"0.05em"}}>PART {p.part}: {p.title}</p>
                  </div>
                  <div style={{background:"#0d1030",borderRadius:"0 0 8px 8px",padding:"0.9rem",border:`1px solid ${day.color}33`,borderTop:"none"}}>
                    <p style={{margin:"0 0 0.7rem",color:"#bbb",fontSize:"0.88rem",lineHeight:1.6}}>{p.instruction}</p>
                    <textarea value={dayJournal[`aviz${i}`]||""} onChange={e=>setEntry(`aviz${i}`,e.target.value)}
                      placeholder="Journal your experience..." rows={3}
                      style={{width:"100%",background:"#0a0a0a",border:`1px solid ${day.color}44`,borderRadius:"8px",color:"white",padding:"0.7rem",fontSize:"0.88rem",resize:"vertical",lineHeight:1.6}}
                      onFocus={e=>e.target.style.borderColor=day.color}
                      onBlur={e=>e.target.style.borderColor=`${day.color}44`}/>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Playbook type */}
          {ex.type === "playbook" && ex.sections && (
            <div>
              {ex.sections.map((s,i) => (
                <div key={i} style={{marginBottom:"1.4rem"}}>
                  <p style={{margin:"0 0 0.4rem",fontWeight:800,color:day.color,fontSize:"0.88rem",letterSpacing:"0.05em"}}>{s.section}</p>
                  <p style={{margin:"0 0 0.5rem",color:"#888",fontSize:"0.82rem"}}>{s.prompt}</p>
                  <textarea value={dayJournal[`pb${i}`]||""} onChange={e=>setEntry(`pb${i}`,e.target.value)}
                    placeholder="Write here..." rows={3}
                    style={{width:"100%",background:"#111",border:`2px solid ${day.color}44`,borderRadius:"9px",color:"white",padding:"0.7rem",fontSize:"0.88rem",resize:"vertical",lineHeight:1.6}}
                    onFocus={e=>e.target.style.borderColor=day.color}
                    onBlur={e=>e.target.style.borderColor=`${day.color}44`}/>
                </div>
              ))}
            </div>
          )}

          {/* Triple stack */}
          {ex.type === "triple_stack" && ex.parts && (
            <div>
              {ex.parts.map((p,i) => (
                <div key={i} style={{background:`${day.color}15`,border:`1px solid ${day.color}44`,borderRadius:"12px",padding:"1rem",marginBottom:"1rem"}}>
                  <p style={{margin:"0 0 0.4rem",fontWeight:900,color:day.color,fontFamily:"Verdana, Geneva, sans-serif",fontSize:"1rem",letterSpacing:"0.05em",textTransform:"uppercase"}}>PART {p.part}: {p.title}</p>
                  <p style={{margin:"0 0 0.7rem",color:"#bbb",fontSize:"0.88rem",lineHeight:1.5}}>{p.instruction}</p>
                  <textarea value={dayJournal[`ts${i}`]||""} onChange={e=>setEntry(`ts${i}`,e.target.value)}
                    placeholder="Write here..." rows={4}
                    style={{width:"100%",background:"rgba(0,0,0,0.3)",border:`1px solid ${day.color}66`,borderRadius:"8px",color:"white",padding:"0.7rem",fontSize:"0.88rem",resize:"vertical",lineHeight:1.6}}
                    onFocus={e=>e.target.style.borderColor=day.color}
                    onBlur={e=>e.target.style.borderColor=`${day.color}66`}/>
                  <button onClick={()=>requestFeedback(`ts${i}`, p.instruction, dayJournal[`ts${i}`]||"")}
                    style={{marginTop:"0.4rem",padding:"0.35rem 0.8rem",borderRadius:"7px",border:"none",background:day.color,color:"white",fontWeight:700,fontSize:"0.75rem",cursor:"pointer",fontFamily:"inherit"}}>
                    {loadingFeedback[`ts${i}`] ? "..." : "Coach Feedback 🤖"}
                  </button>
                  {aiFeedback[`ts${i}`] && <div style={{marginTop:"0.5rem",background:"rgba(0,0,0,0.3)",borderRadius:"7px",padding:"0.7rem",fontSize:"0.83rem",color:"#A83A0A",lineHeight:1.6}}>{aiFeedback[`ts${i}`]}</div>}
                </div>
              ))}
            </div>
          )}

          {/* Today's Daily Goal */}
          <div style={{background:"#111",border:`2px solid ${day.color}33`,borderRadius:"12px",padding:"1rem",marginTop:"1.5rem"}}>
            <p style={{margin:"0 0 0.5rem",fontSize:"0.7rem",color:day.color,fontWeight:800,letterSpacing:"0.15em",textTransform:"uppercase"}}>TODAY'S MISSION</p>
            <p style={{margin:"0 0 0.8rem",color:"#bbb",fontSize:"0.9rem",lineHeight:1.5}}>{day.dailyGoal}</p>
            <p style={{margin:"0 0 0.4rem",fontSize:"0.72rem",color:"#666",fontWeight:700}}>Did you do it? Notes:</p>
            <textarea value={dayJournal["daily_goal"]||""} onChange={e=>setEntry("daily_goal",e.target.value)}
              placeholder="Quick check-in on today's mission..." rows={2}
              style={{width:"100%",background:"#1a1a1a",border:"1px solid #333",borderRadius:"8px",color:"white",padding:"0.6rem",fontSize:"0.85rem",resize:"none",lineHeight:1.6}}/>
          </div>

          <button onClick={()=>{markDayComplete();setView("home");}}
            style={{width:"100%",marginTop:"1.5rem",padding:"0.9rem",borderRadius:"10px",border:"none",background:`linear-gradient(135deg,${day.color},${day.color}aa)`,color:"white",fontFamily:"Verdana, Geneva, sans-serif",fontSize:"1.1rem",fontWeight:900,letterSpacing:"0.08em",textTransform:"uppercase",cursor:"pointer"}}>
            {completedDays[currentDay] ? "✓ DAY COMPLETE — GO HOME" : "COMPLETE DAY & CONTINUE →"}
          </button>
        </div>
      </div>
    );
  }

  // ── Goals View
  if (view === "goals") {
    return (
      <div style={{minHeight:"100vh",background:"#FFFFFF",color:"#141414",fontFamily:"Verdana, Geneva, sans-serif"}}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;700;800;900&family=Barlow+Condensed:wght@700;800;900&display=swap');*{box-sizing:border-box;}body{margin:0;}textarea{outline:none;}`}</style>
        <div style={{background:"#111",borderBottom:"1px solid #222",padding:"0.9rem 1.2rem",position:"sticky",top:0,zIndex:50,display:"flex",alignItems:"center",gap:"0.8rem"}}>
          <button onClick={()=>setView("home")} style={{background:"none",border:"none",color:"#888",cursor:"pointer",fontSize:"1.3rem",padding:0}}>←</button>
          <div>
            <p style={{margin:0,fontSize:"0.65rem",color:"#A83A0A",fontWeight:800,letterSpacing:"0.15em",textTransform:"uppercase"}}>MY GOALS</p>
            <p style={{margin:0,fontWeight:800,fontSize:"0.95rem"}}>Goal Stack</p>
          </div>
        </div>
        <div style={{maxWidth:"680px",margin:"0 auto",padding:"1.2rem",paddingBottom:"4rem"}}>
          <p style={{color:"#888",fontSize:"0.85rem",marginBottom:"1.2rem",lineHeight:1.5}}>Write in present tense. These are your marching orders to your subconscious. Update them as you grow. Write them every morning and night.</p>
          {[
            {key:"today",label:"TODAY'S GOAL",placeholder:"I take 50 extra shots after practice today.",color:"#A83A0A"},
            {key:"week",label:"THIS WEEK'S GOAL",placeholder:"I beat my opponent on the first step every play this week.",color:"#A83A0A"},
            {key:"season",label:"THIS SEASON'S GOAL",placeholder:"I start every game this season and lead my team in...",color:"#D6182B"},
            {key:"longrange",label:"LONG-RANGE VISION",placeholder:"I earn a starting spot at the next level.",color:"#A83A0A"},
            {key:"dream",label:"THE DREAM",placeholder:"I compete at the highest level of my sport.",color:"#A83A0A"},
            {key:"life",label:"LIFE BEYOND SPORT",placeholder:"I use the mental skills I've built here to achieve...",color:"#D6182B"},
          ].map(g => (
            <div key={g.key} style={{marginBottom:"1.2rem"}}>
              <p style={{margin:"0 0 0.4rem",fontSize:"0.7rem",color:g.color,fontWeight:800,letterSpacing:"0.15em",textTransform:"uppercase"}}>{g.label}</p>
              <textarea value={goalEntries[g.key]||""} onChange={e=>setGoalEntries(ge=>({...ge,[g.key]:e.target.value}))}
                placeholder={g.placeholder} rows={2}
                style={{width:"100%",background:"#111",border:`2px solid ${g.color}44`,borderRadius:"9px",color:"white",padding:"0.7rem 0.9rem",fontSize:"0.9rem",resize:"none",lineHeight:1.6}}
                onFocus={e=>e.target.style.borderColor=g.color}
                onBlur={e=>e.target.style.borderColor=`${g.color}44`}/>
            </div>
          ))}
          <button onClick={()=>{
            requestFeedback("goals_review", "Review all my athletic goals and give me direct coaching on whether they are specific enough, ambitious enough, and how to strengthen them.",
              Object.entries(goalEntries).filter(([,v])=>v).map(([k,v])=>`${k.toUpperCase()}: ${v}`).join('\n'));
          }} style={{width:"100%",padding:"0.8rem",borderRadius:"10px",border:"none",background:"#FF4500",color:"white",fontFamily:"Verdana, Geneva, sans-serif",fontSize:"1rem",fontWeight:900,letterSpacing:"0.08em",textTransform:"uppercase",cursor:"pointer",marginBottom:"1rem"}}>
            {loadingFeedback["goals_review"] ? "GETTING FEEDBACK..." : "GET COACH FEEDBACK ON MY GOALS 🤖"}
          </button>
          {aiFeedback["goals_review"] && <div style={{background:"#111",borderRadius:"10px",padding:"1rem",fontSize:"0.88rem",color:"#A83A0A",lineHeight:1.7,borderLeft:"1.5px solid #FF4500"}}>{aiFeedback["goals_review"]}</div>}
        </div>
      </div>
    );
  }

  // ── Journal View
  if (view === "journal") {
    const completedDaysList = Object.keys(completedDays).map(Number).sort((a,b)=>a-b);
    return (
      <div style={{minHeight:"100vh",background:"#FFFFFF",color:"#141414",fontFamily:"Verdana, Geneva, sans-serif"}}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;700;800;900&family=Barlow+Condensed:wght@700;800;900&display=swap');*{box-sizing:border-box;}body{margin:0;}`}</style>
        <div style={{background:"#111",borderBottom:"1px solid #222",padding:"0.9rem 1.2rem",position:"sticky",top:0,zIndex:50,display:"flex",alignItems:"center",gap:"0.8rem"}}>
          <button onClick={()=>setView("home")} style={{background:"none",border:"none",color:"#888",cursor:"pointer",fontSize:"1.3rem",padding:0}}>←</button>
          <div>
            <p style={{margin:0,fontSize:"0.65rem",color:"#A83A0A",fontWeight:800,letterSpacing:"0.15em",textTransform:"uppercase"}}>MY JOURNAL</p>
            <p style={{margin:0,fontWeight:800,fontSize:"0.95rem"}}>{completedDaysList.length} days logged</p>
          </div>
        </div>
        <div style={{maxWidth:"680px",margin:"0 auto",padding:"1.2rem",paddingBottom:"4rem"}}>
          {completedDaysList.length === 0 ? (
            <div style={{textAlign:"center",padding:"3rem 1rem",color:"#555"}}>
              <p style={{fontSize:"2rem",marginBottom:"0.5rem"}}>📓</p>
              <p style={{fontWeight:700}}>No completed days yet</p>
              <p style={{fontSize:"0.85rem"}}>Complete a day to see your journal entries here</p>
            </div>
          ) : completedDaysList.map(di => {
            const d = PROGRAM[di];
            const entries = journalEntries[di] || {};
            const hasEntries = Object.values(entries).some(v => v && v.length > 0);
            if (!hasEntries) return null;
            return <div key={di} style={{background:"#111",border:"1px solid #222",borderRadius:"12px",padding:"1rem",marginBottom:"0.9rem"}}>
              <div style={{display:"flex",alignItems:"center",gap:"0.6rem",marginBottom:"0.7rem"}}>
                <span style={{background:d.color,borderRadius:"6px",padding:"0.2rem 0.6rem",fontSize:"0.7rem",fontWeight:800,color:"white",letterSpacing:"0.05em"}}>DAY {d.day}</span>
                <p style={{margin:0,fontWeight:800,fontSize:"0.9rem"}}>{d.title}</p>
              </div>
              {Object.entries(entries).filter(([,v])=>v).slice(0,3).map(([k,v]) => (
                <div key={k} style={{marginBottom:"0.5rem",padding:"0.5rem 0.7rem",background:"#1a1a1a",borderRadius:"7px"}}>
                  <p style={{margin:0,fontSize:"0.82rem",color:"#ccc",lineHeight:1.5}}>{v.slice(0,200)}{v.length>200?"...":""}</p>
                </div>
              ))}
              {confidenceRatings[di] && <p style={{margin:"0.5rem 0 0",fontSize:"0.72rem",color:"#555"}}>Confidence: {confidenceRatings[di]}/10</p>}
            </div>;
          })}
        </div>
      </div>
    );
  }

  return null;
}

// ─── LESSON ENGINE ──────────────────────────────────────────────────────────
// One reusable engine, config-driven, used by every subject's daily lesson.
// Different subjects don't get their own hand-built lesson screens; they define
// a spec (steps + step kinds) and this engine renders it. Proven below with two
// genuinely different subjects: History (Hook/Read/Analyze/Write/Exit) and Math
// (Launch/Worked Example/Guided Practice/Independent Practice/Mastery Check).


export default MentalToughnessApp;
