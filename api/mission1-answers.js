import { prisma } from "../_lib/db.js";
import { resolveAuthorizedStudentId } from "../_lib/access.js";

export default async function handler(req, res) {
  const studentId = await resolveAuthorizedStudentId(req, res);
  if (!studentId) return;

  if (req.method === "GET") {
    const row = await prisma.mission1Answer.findUnique({ where: { studentId } });
    if (!row) {
      res.status(200).json({ answer: null });
      return;
    }
    res.status(200).json({ answer: { selectedValues: JSON.parse(row.selectedValues), justification: row.justification } });
    return;
  }

  if (req.method === "POST") {
    const { selectedValues, justification } = req.body || {};
    if (!justification) {
      res.status(400).json({ error: "justification is required" });
      return;
    }
    await prisma.mission1Answer.upsert({
      where: { studentId },
      create: { studentId, selectedValues: JSON.stringify(selectedValues || []), justification },
      update: { selectedValues: JSON.stringify(selectedValues || []), justification },
    });
    res.status(200).json({ ok: true });
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}
