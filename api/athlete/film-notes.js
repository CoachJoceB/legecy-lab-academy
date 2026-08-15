import { prisma } from "../_lib/db.js";
import { resolveAuthorizedStudentId } from "../_lib/access.js";

export default async function handler(req, res) {
  const studentId = await resolveAuthorizedStudentId(req, res);
  if (!studentId) return;

  if (req.method === "GET") {
    const row = await prisma.athleteFilmNotes.findUnique({ where: { studentId } });
    res.status(200).json({ notes: row ? JSON.parse(row.notes) : {} });
    return;
  }

  if (req.method === "POST") {
    const { notes } = req.body || {};
    if (!notes || typeof notes !== "object") {
      res.status(400).json({ error: "notes must be an object" });
      return;
    }
    await prisma.athleteFilmNotes.upsert({
      where: { studentId },
      create: { studentId, notes: JSON.stringify(notes) },
      update: { notes: JSON.stringify(notes) },
    });
    res.status(200).json({ ok: true });
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}
