// Which lessons a student has actually finished. Used to be a single
// window.storage blob shared by anyone who opened the app; now it's a real
// per-student record behind auth, via /api/lessons.

async function getCompletedLessons() {
  try {
    const res = await fetch("/api/lessons", { credentials: "include" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.completed || [];
  } catch (e) {
    return [];
  }
}

async function markLessonComplete(specKey) {
  try {
    await fetch("/api/lessons", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ specKey }),
    });
  } catch (e) {}
}

export { getCompletedLessons, markLessonComplete };
