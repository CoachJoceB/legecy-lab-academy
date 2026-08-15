// Cross-lesson XP/house-point tracking for Personal Development, now a real
// per-student ledger via /api/stakes instead of a shared local blob.

async function awardStakes({ xp = 0, house = 0, reason }) {
  try {
    const res = await fetch("/api/stakes", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ xp, house, reason }),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}

async function getStakes() {
  try {
    const res = await fetch("/api/stakes", { credentials: "include" });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}

export { awardStakes, getStakes };
