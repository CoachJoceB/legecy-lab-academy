import { prisma } from "../_lib/db.js";
import { resolveAuthorizedStudentId } from "../_lib/access.js";

export default async function handler(req, res) {
  const studentId = await resolveAuthorizedStudentId(req, res);
  if (!studentId) return; // response already sent

  if (req.method === "GET") {
    const rows = await prisma.lessonCompletion.findMany({ where: { studentId } });
    res.status(200).json({ completed: rows.map((r) => r.specKey) });
    return;
  }

  if (req.method === "POST") {
    const { specKey } = req.body || {};
    if (!specKey) {
      res.status(400).json({ error: "specKey is required" });
      return;
    }
    await prisma.lessonCompletion.upsert({
      where: { studentId_specKey: { studentId, specKey } },
      create: { studentId, specKey },
      update: {},
    });
    res.status(200).json({ ok: true });
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}
