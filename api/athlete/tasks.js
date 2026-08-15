import { prisma } from "../_lib/db.js";
import { resolveAuthorizedStudentId } from "../_lib/access.js";

export default async function handler(req, res) {
  const studentId = await resolveAuthorizedStudentId(req, res);
  if (!studentId) return;

  if (req.method === "GET") {
    const tasks = await prisma.athleteTask.findMany({ where: { studentId }, orderBy: { createdAt: "asc" } });
    res.status(200).json({ tasks });
    return;
  }

  if (req.method === "POST") {
    const { title, cat, priority, time, pts } = req.body || {};
    if (!title || !cat) {
      res.status(400).json({ error: "title and cat are required" });
      return;
    }
    const task = await prisma.athleteTask.create({
      data: { studentId, title, cat, priority: priority || "medium", time: time || "", pts: pts || 0 },
    });
    res.status(201).json({ task });
    return;
  }

  if (req.method === "PATCH") {
    const { id, done } = req.body || {};
    if (!id) {
      res.status(400).json({ error: "id is required" });
      return;
    }
    // Only ever update a task that actually belongs to this student, so a
    // student can't toggle someone else's task by guessing an id.
    const existing = await prisma.athleteTask.findFirst({ where: { id, studentId } });
    if (!existing) {
      res.status(404).json({ error: "Task not found" });
      return;
    }
    const task = await prisma.athleteTask.update({ where: { id }, data: { done: !!done } });
    res.status(200).json({ task });
    return;
  }

  if (req.method === "DELETE") {
    const { id } = req.query || {};
    if (!id) {
      res.status(400).json({ error: "id is required" });
      return;
    }
    const existing = await prisma.athleteTask.findFirst({ where: { id, studentId } });
    if (!existing) {
      res.status(404).json({ error: "Task not found" });
      return;
    }
    await prisma.athleteTask.delete({ where: { id } });
    res.status(200).json({ ok: true });
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}
