import React, { useState, useEffect } from "react";

import AthleteDevelopmentApp from "./apps/AthleteDevelopmentApp";
import MentalToughnessApp from "./apps/MentalToughnessApp";

import LessonEngine from "./engine/LessonEngine";
import { CATALOG, LESSON_SPECS } from "./content/catalog";
import { addPortfolioArtifact } from "./shell/PortfolioScreen";
import { awardStakes } from "./shell/stakes";
import { markLessonComplete } from "./shell/lessonProgress";
import { saveMission1Answers } from "./shell/flashForward";

import { ShellWrapper, AcademySidebar, MobileNav, AcademyTopBar } from "./shell/AppShell";
import { HomeScreen } from "./shell/HomeAndProgress";
import { LearnHome } from "./shell/LearnScreens";
import { PortfolioScreen } from "./shell/PortfolioScreen";
import { ProgressScreen } from "./shell/HomeAndProgress";
import { DevelopHome, PerformHome, FamilyHome } from "./shell/DevelopPerformFamily";
import AuthScreen from "./shell/AuthScreen";

// Personal Development's missions carry real stakes (XP, house points) that
// persist across missions, not just within one lesson. The engine calls
// onAward whenever a step resolves; this is where that gets turned into
// actual persisted state, kept out of the engine on purpose, since
// student-wide stakes aren't something a single lesson should own.
async function handlePersonalDevAward({ tier, xp, house, stepKey, values }) {
  if (xp || house) {
    await awardStakes({ xp: xp || 0, house: house || 0 });
  }
  if (stepKey === "monday-write") {
    const selectedValues = values?.values || [];
    const justification = values?.["monday-write"]?.justification || "";
    if (justification) {
      await saveMission1Answers({ selectedValues, justification });
    }
  }
}

function AcademyLessonRunner({ specKey, courseId, locked, lockedReason, onDone }) {
  const spec = LESSON_SPECS[specKey];
  const course = CATALOG.find((c) => c.id === courseId) || CATALOG[0];
  const isPersonalDev = specKey.startsWith("PD_MISSION");

  async function handleDone() {
    if (locked) {
      // Preview mode, nothing was actually submitted, don't mark complete
      // or write a portfolio artifact for it.
      onDone();
      return;
    }
    if (specKey === "AAE_LESSON") {
      await addPortfolioArtifact({
        courseId: course.id, course: course.title, unit: "Unit 1", lessonKey: specKey,
        title: "RACE Paragraph: Was Nubia Just Egypt's Little Brother?",
        skill: "Analysis", section: "Writing",
      });
    }
    if (specKey === "MATH_LESSON") {
      await addPortfolioArtifact({
        courseId: course.id, course: course.title, unit: "Unit 2", lessonKey: specKey,
        title: "Mastery Check: One-Step Equations",
        skill: "Application", section: "Projects", mastered: true,
      });
    }
    if (specKey === "PD_MISSION_4") {
      await addPortfolioArtifact({
        courseId: course.id, course: course.title, unit: "Unit 1", lessonKey: specKey,
        title: "Personal Mission Statement",
        skill: "Analysis", section: "Writing",
      });
    }
    await markLessonComplete(specKey);
    onDone();
  }

  return (
    <LessonEngine
      spec={spec}
      onBack={handleDone}
      onAward={isPersonalDev && !locked ? handlePersonalDevAward : undefined}
      locked={locked}
      lockedReason={lockedReason}
    />
  );
}

export default function App() {
  const [authChecked, setAuthChecked] = useState(false);
  const [session, setSession] = useState(null); // { user, studentId }
  const [nav, setNav] = useState("home");
  const [focusMode, setFocusMode] = useState(false);
  const [learnTab, setLearnTab] = useState("My Courses");
  const [activeCourse, setActiveCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null); // { courseId, specKey, locked, lockedReason }
  const [subApp, setSubApp] = useState(null); // 'athlete' | 'mental-toughness'

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        const data = await res.json();
        if (data.user) setSession(data);
      } catch (e) {}
      setAuthChecked(true);
    })();
  }, []);

  function openLesson(courseId, specKey, locked, lockedReason) {
    setActiveLesson({ courseId, specKey, locked: !!locked, lockedReason });
  }

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    } catch (e) {}
    setSession(null);
    setNav("home");
  }

  if (!authChecked) {
    return (
      <div data-theme="brand" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FFFFFF", fontFamily: "Verdana, Geneva, sans-serif" }}>
        Loading...
      </div>
    );
  }

  if (!session) {
    return <AuthScreen onAuthenticated={(data) => setSession(data)} />;
  }

  // A parent or coach account with no student of their own is a valid
  // session but has nowhere obvious to land yet; the Family view already
  // supports viewing a linked student's data via ?studentId=, this just
  // doesn't have a "pick a student" landing screen wired up yet. Real gap,
  // noted rather than hidden.

  if (subApp === "athlete") return <AthleteDevelopmentApp onBack={() => setSubApp(null)} siteUser={session.studentId ? { studentId: session.studentId, name: session.user.name } : null} />;
  if (subApp === "mental-toughness") return <MentalToughnessApp onBack={() => setSubApp(null)} siteUserName={session.studentId ? session.user.name : undefined} />;

  if (activeLesson) {
    return (
      <ShellWrapper>
        <AcademyLessonRunner
          specKey={activeLesson.specKey}
          courseId={activeLesson.courseId}
          locked={activeLesson.locked}
          lockedReason={activeLesson.lockedReason}
          onDone={() => setActiveLesson(null)}
        />
      </ShellWrapper>
    );
  }

  return (
    <ShellWrapper>
      <div className="flex">
        <AcademySidebar active={nav} onNav={setNav} focusMode={focusMode} setFocusMode={setFocusMode} userName={session.user.name} onLogout={handleLogout} />
        <div className="flex-1 min-w-0" style={{ paddingBottom: 70 }}>
          <AcademyTopBar focusMode={focusMode} setFocusMode={setFocusMode} />

          {nav === "home" && <HomeScreen focusMode={focusMode} onNav={setNav} onOpenLesson={openLesson} />}

          {nav === "learn" && (
            <LearnHome
              tab={learnTab} setTab={setLearnTab}
              activeCourse={activeCourse}
              onOpenCourse={setActiveCourse}
              onBackFromCourse={() => setActiveCourse(null)}
              onOpenLesson={(specKey, locked, lockedReason) => openLesson(activeCourse, specKey, locked, lockedReason)}
            />
          )}

          {nav === "develop" && <DevelopHome onNav={(id) => id === "mental-toughness" && setSubApp("mental-toughness")} />}
          {nav === "perform" && <PerformHome onOpenAthlete={() => setSubApp("athlete")} />}
          {nav === "portfolio" && <PortfolioScreen />}
          {nav === "progress" && <ProgressScreen />}
          {nav === "family" && <FamilyHome onOpenAthlete={() => setSubApp("athlete")} />}
        </div>
      </div>
      <MobileNav active={nav} onNav={(key) => setNav(key === "more" ? "portfolio" : key)} />
    </ShellWrapper>
  );
}
