import { prisma } from "../_lib/db.js";
import { resolveAuthorizedStudentId } from "../_lib/access.js";

export default async function handler(req, res) {
  const studentId = await resolveAuthorizedStudentId(req, res);
  if (!studentId) return;

  if (req.method === "GET") {
    const entries = await prisma.stakesLedgerEntry.findMany({ where: { studentId } });
    const xp = entries.reduce((sum, e) => sum + e.xpDelta, 0);
    const housePoints = 90 + entries.reduce((sum, e) => sum + e.houseDelta, 0); // 90 is the same starting baseline the prototype used
    res.status(200).json({ xp, housePoints: Math.max(0, housePoints) });
    return;
  }

  if (req.method === "POST") {
    const { xp, house, reason } = req.body || {};
    await prisma.stakesLedgerEntry.create({
      data: { studentId, xpDelta: xp || 0, houseDelta: house || 0, reason: reason || null },
    });
    const entries = await prisma.stakesLedgerEntry.findMany({ where: { studentId } });
    const totalXp = entries.reduce((sum, e) => sum + e.xpDelta, 0);
    const totalHouse = 90 + entries.reduce((sum, e) => sum + e.houseDelta, 0);
    res.status(200).json({ xp: totalXp, housePoints: Math.max(0, totalHouse) });
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}
