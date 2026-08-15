import { prisma } from "./_lib/db.js";
import { resolveAuthorizedStudentId } from "./_lib/access.js";

export default async function handler(req, res) {
  const studentId = await resolveAuthorizedStudentId(req, res);
  if (!studentId) return;

  if (req.method === "GET") {
    const row = await prisma.mentalToughnessProgress.findUnique({ where: { studentId } });
    if (!row) {
      res.status(200).json({ progress: { currentDay: 0, completedDays: {}, journalEntries: {}, goalEntries: {}, confidenceRatings: {} } });
      return;
    }
    res.status(200).json({
      progress: {
        currentDay: row.currentDay,
        completedDays: JSON.parse(row.completedDays),
        journalEntries: JSON.parse(row.journalEntries),
        goalEntries: JSON.parse(row.goalEntries),
        confidenceRatings: JSON.parse(row.confidenceRatings),
      },
    });
    return;
  }

  if (req.method === "POST") {
    const { currentDay, completedDays, journalEntries, goalEntries, confidenceRatings } = req.body || {};
    const row = await prisma.mentalToughnessProgress.upsert({
      where: { studentId },
      create: {
        studentId,
        currentDay: currentDay ?? 0,
        completedDays: JSON.stringify(completedDays ?? {}),
        journalEntries: JSON.stringify(journalEntries ?? {}),
        goalEntries: JSON.stringify(goalEntries ?? {}),
        confidenceRatings: JSON.stringify(confidenceRatings ?? {}),
      },
      update: {
        ...(currentDay !== undefined ? { currentDay } : {}),
        ...(completedDays !== undefined ? { completedDays: JSON.stringify(completedDays) } : {}),
        ...(journalEntries !== undefined ? { journalEntries: JSON.stringify(journalEntries) } : {}),
        ...(goalEntries !== undefined ? { goalEntries: JSON.stringify(goalEntries) } : {}),
        ...(confidenceRatings !== undefined ? { confidenceRatings: JSON.stringify(confidenceRatings) } : {}),
      },
    });
    res.status(200).json({ ok: true });
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}
