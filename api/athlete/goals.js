import { prisma } from "../_lib/db.js";
import { resolveAuthorizedStudentId } from "../_lib/access.js";

export default async function handler(req, res) {
  const studentId = await resolveAuthorizedStudentId(req, res);
  if (!studentId) return;

  if (req.method === "GET") {
    const goals = await prisma.athleteGoal.findMany({ where: { studentId }, orderBy: { createdAt: "asc" } });
    res.status(200).json({ goals });
    return;
  }

  if (req.method === "POST") {
    const { title, cat, deadline, progress } = req.body || {};
    if (!title || !cat) {
      res.status(400).json({ error: "title and cat are required" });
      return;
    }
    const goal = await prisma.athleteGoal.create({
      data: { studentId, title, cat, deadline: deadline || "", progress: progress || 0 },
    });
    res.status(201).json({ goal });
    return;
  }

  if (req.method === "PATCH") {
    const { id, progress } = req.body || {};
    if (!id || progress === undefined) {
      res.status(400).json({ error: "id and progress are required" });
      return;
    }
    const existing = await prisma.athleteGoal.findFirst({ where: { id, studentId } });
    if (!existing) {
      res.status(404).json({ error: "Goal not found" });
      return;
    }
    const goal = await prisma.athleteGoal.update({ where: { id }, data: { progress } });
    res.status(200).json({ goal });
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}
