# Legacy Lab Academy

An open-source student platform combining academics, athlete development,
mental performance training, and a portfolio system, built around one core
idea: subjects are data, not code.

## Quick start

This now has a real backend: Postgres via Prisma, and Vercel serverless
functions for auth and data. `npm run dev` (Vite alone) only serves the
frontend, it won't run the `/api` routes, use `vercel dev` for that once
you have the Vercel CLI installed.

```bash
npm install
cp .env.example .env
# fill in DATABASE_URL, JWT_SECRET, ANTHROPIC_API_KEY in .env
npx prisma migrate dev --name init
npx vercel dev
```

`DATABASE_URL` needs a real Postgres instance, Vercel Postgres, Supabase,
and Neon all work, none of them are required specifically. In production,
set the same three environment variables in the Vercel dashboard under
Project Settings, Environment Variables, not in a committed file.

Requires Node 18+.

## Multi-student support

This is the part that changed most recently, worth being explicit about.

Earlier versions of this app used `window.storage`, a Claude.ai artifact-
specific API that doesn't exist in a normal browser. Outside that
environment it silently did nothing, and even if it had worked, every key
was global, meaning two different students opening the same deployed URL
would have read and overwritten each other's data.

That's fixed for the core Learn experience:

- Real accounts (`User` table), password hashing with bcrypt, JWT sessions
  in httpOnly cookies
- Every student's data (lesson completions, portfolio artifacts, XP and
  house points, Mission 1's saved answers) is a real row scoped to their
  `Student` id, not a shared blob
- Parents and coaches can be linked to specific students
  (`ParentStudentLink`, `CoachStudentLink`) and the API enforces that link
  before returning anything, checked against the database on every
  request, not just trusted from the URL
- The Coach AI grading key lives server-side only (`api/grade.js`), never
  sent to the browser

**Update: Athlete Development and Mental Toughness are now on the real
backend too.**

- **Mental Toughness**: fully ported. `MentalToughnessProgress` (one row
  per student) holds `currentDay`, `completedDays`, journal entries, goal
  entries, and confidence ratings, all via `/api/mental-toughness`.
- **Athlete Development**: its own separate PIN/family login is bypassed
  entirely when launched from inside the site, it uses the real logged-in
  student's identity instead. Tasks, goals, and clock-in status/reflections
  (`AthleteTask`, `AthleteGoal`, `AthleteStatus`, `AthleteReflection`) are
  real per-student rows. Toggling a task, clocking in or out, and adding a
  goal all persist for real now.
- The Home and Progress screens read live numbers from these same APIs
  instead of the dead storage keys, so "Training, 40% today" on the
  dashboard is now a real, current number, not a frozen snapshot.

**Update: settings and film breakdown notes are now real too.**
`AthleteConfig` (family name, reward-per-task, ADHD mode, YouTube/upload
permissions) and `AthleteFilmNotes` (a student's written breakdown of each
film) both persist per-student now, same load/debounced-save pattern as
everything else here.

**What's still explicitly not ported**, on purpose, not by oversight:
Athlete Development's $ rewards ledger and the multi-athlete family roster
(the Marcus/Jordan/Zion demo data) are tightly coupled to each other and to
`ParentPage`'s whole multi-child view, none of which maps cleanly onto the
new one-student-per-account auth model yet, that reconciliation is its own
piece of work. Devotional history and the Setup page's task-template
editor also remain local. And `JournalPage`'s calendar view still reads
film data from the old in-memory-only reference, so its film section will
show empty even though `FilmPage` itself now saves for real, a real,
known inconsistency between two screens, not a hidden one.

Requires Node 18+.

## Architecture

```
src/
  engine/
    LessonEngine.jsx      # Subject-agnostic. Renders any lesson spec.
  content/
    lessonSpecs.js        # The actual lesson content, plain data.
    catalog.js            # Course/unit metadata, references lessonSpecs.
    generated/            # Output folder for tools/pdf_to_lesson.py
  apps/
    PersonalDevelopmentApp.jsx   # Standalone: Grade 8 leadership missions
    AthleteDevelopmentApp.jsx    # Standalone: training, goals, film, coach
    MentalToughnessApp.jsx       # Standalone: 30-day mental performance program
  shell/
    AppShell.jsx           # Nav, theme, top-level chrome
    HomeAndProgress.jsx    # Home screen, Focus Mode, Progress dashboard
    LearnScreens.jsx        # Course catalog, course overview, mastery
    PortfolioScreen.jsx     # Reads/writes real portfolio artifacts
    DevelopPerformFamily.jsx
  App.jsx                  # Wires everything together
tools/
  pdf_to_lesson.py         # Converts a source PDF/DOCX into a lesson spec
```

## The core idea: adding a subject is a data change, not a code change

The Lesson Engine (`src/engine/LessonEngine.jsx`) doesn't know anything
about History or Math specifically. It only knows how to render six step
"kinds": `choice`, `text`, `multi-text`, `content`, `graded-write` (AI-graded
against a rubric), and `graded-numeric` (deterministic exact-answer
checking).

A lesson is just an object with a `steps` array built from those kinds. See
`src/content/lessonSpecs.js` for two real, working examples: a History
lesson and a Math lesson, using completely different step kinds and grading
strategies, running through the exact same engine.

To add a new lesson:

1. Write a spec object (or generate a first draft, see below).
2. Export it from `src/content/lessonSpecs.js` (or its own file).
3. Add it to `LESSON_SPECS` and reference it from a unit in
   `src/content/catalog.js` with `{ built: true, specKey: "YOUR_KEY" }`.

No new screens, no new components.

## Generating a lesson from source material

`tools/pdf_to_lesson.py` takes a PDF or DOCX curriculum document, extracts
its text (including tables, since real curriculum docs often keep lesson
plans in Word tables, not paragraphs), and asks Claude to produce a spec
matching the engine's exact schema.

```bash
pip install pdfplumber python-docx requests
export ANTHROPIC_API_KEY=your-key-here

python3 tools/pdf_to_lesson.py path/to/lesson.docx \
  --subject "Social Studies" \
  --course "The African American Experience" \
  --out day5-west-african-empires.js
```

This writes a draft into `src/content/generated/`. It is a first draft, not
a finished lesson: review it, check the rubric text is real (pulled from
your source document, not invented), and check the reading page ranges are
correct before wiring it into the catalog. The script validates the output
against the schema and will tell you plainly if something's missing rather
than silently guessing.

## What's fully modular vs. what isn't, and why

Being upfront about the current state:

- **Fully modular (data-driven, one shared engine)**: the Lesson Engine and
  everything under `content/`. Four subjects now run through it: History
  (AI-graded essay writing), Math (deterministic numeric grading), Mental
  Toughness Day 1 (reflection, no grading), and Personal Development's full
  five-mission week (multi-select value picking, heuristic-graded dilemmas
  with no AI call, checklist-gated writing, cross-mission XP and house-point
  stakes). Four genuinely different content types, one engine.

- **The engine grew two new step kinds and a stakes hook to make Personal
  Development possible**: `multi-select` (pick exactly N options) and
  `choice-justify` (pick one of two options, justify it, graded by a plain
  JS function passed directly in the spec, no AI call needed). It also
  gained an optional `villain` briefing screen and an `onAward` callback so
  a host app can track points across an entire week of missions, since that
  kind of state doesn't belong inside a single lesson. All of this is
  additive: History, Math, and Mental Toughness don't use any of it and
  behave exactly as before.

- **Extracted into a shared UI kit** (`src/ui/primitives.jsx`): `Card`,
  `Btn`, `Chip`, `Input`, `Select`, `Label`, `Bar`, `SectionTitle`, no
  longer duplicated inside Athlete Development.

- **`src/apps/PersonalDevelopmentApp.jsx` still exists in the repo but is
  no longer routed.** It's kept for reference (it has a villain briefing
  screen, a life-map progress dashboard, and a Coach flash-forward scene
  that weren't ported into the new spec-driven version), but the actual
  Learn catalog now launches the five missions through
  `content/personalDevelopmentLessons.js` and the Lesson Engine instead.

- **Deliberately NOT converted into lesson specs**: `AthleteDevelopmentApp`
  and `MentalToughnessApp`'s remaining 29 days are not, and should not be,
  lesson specs. A training log, a parent portal, a film review page, and a
  PIN-based login flow aren't lesson content, they're a different kind of
  application entirely. Forcing them through the Lesson Engine's step-kind
  model would be the wrong abstraction.

- **Known gap**: the old app enforced "submit in order, but you can preview
  ahead" across the five missions. The new Course Overview screen doesn't
  gate lessons by prior completion yet, all five show as open once
  `built: true`. That's real, worth fixing before this replaces the old app
  for actual use, not something to assume is handled.

### Update: the three gaps above are closed

- **Sequential gating with real preview is implemented.** A new
  `src/shell/lessonProgress.js` tracks which lessons are actually finished.
  `CourseOverview` uses it to mark a lesson "Preview" instead of "Start" if
  an earlier built lesson in the same unit isn't done yet. The Lesson
  Engine itself gained a `locked` prop: when set, the entire interactive
  area is wrapped in a disabled `<fieldset>` (one line disables every input
  and button inside it at once) and a banner explains why, matching the
  original app's "look but don't submit" behavior exactly.

- **The life-map is real, on the Progress screen**, driven by actual
  Personal Development XP (`legacy-lab-pd-stakes`), not fabricated numbers.
  Money, Relationships, and Health stay honestly locked with "comes from a
  future course" instead of pretending progress that doesn't exist.

- **The flash-forward Coach scene is back**, reachable from Portfolio. It
  needed a real gap closed to work: the spec-driven engine didn't persist
  what a student actually wrote, so `onAward` was extended to include the
  full answer values, and `src/shell/flashForward.js` saves Mission 1's
  real selected values and justification the moment it's graded. The scene
  won't render at all until that real data exists, it doesn't fall back to
  a fake answer.

- **One real bug caught in this pass, not by running the app but by
  rereading the code**: `App.jsx`'s inline `onOpenLesson` handler for the
  Learn tab only forwarded `specKey`, silently dropping the new
  `locked`/`lockedReason` arguments `CourseOverview` was passing. That
  would have made the entire gating feature silently do nothing. Fixed.


## License

MIT, see LICENSE.
