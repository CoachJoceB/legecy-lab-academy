import { prisma } from "../../lib/db.js";
import { resolveAuthorizedStudentId } from "../../lib/access.js";

// One function instead of five. /api/athlete/config, /api/athlete/film-notes,
// /api/athlete/goals, /api/athlete/status, and /api/athlete/tasks all still
// work exactly as before, Vercel's [resource] bracket syntax routes them
// all here based on the URL segment. Same reason as api/auth/[action].js,
// the Hobby plan's 12-function cap.

async function config(req, res, studentId) {
  if (req.method === "GET") {
    const config = await prisma.athleteConfig.findUnique({ where: { studentId } });
    res.status(200).json({
      config: config || { familyName: "My Family", rewardPer: 5, adhdMode: true, allowYouTube: true, allowUpload: true },
    });
    return;
  }
  if (req.method === "POST") {
    const { familyName, rewardPer, adhdMode, allowYouTube, allowUpload } = req.body || {};
    const config = await prisma.athleteConfig.upsert({
      where: { studentId },
      create: { studentId, familyName, rewardPer, adhdMode, allowYouTube, allowUpload },
      update: { familyName, rewardPer, adhdMode, allowYouTube, allowUpload },
    });
    res.status(200).json({ config });
    return;
  }
  res.status(405).json({ error: "Method not allowed" });
}

async function filmNotes(req, res, studentId) {
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

async function goals(req, res, studentId) {
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

async function status(req, res, studentId) {
  if (req.method === "GET") {
    const [status, tasks] = await Promise.all([
      prisma.athleteStatus.findUnique({ where: { studentId } }),
      prisma.athleteTask.findMany({ where: { studentId } }),
    ]);
    const tasksCompleted = tasks.filter((t) => t.done).length;
    const tasksTotal = tasks.length;
    const pct = tasksTotal > 0 ? Math.round((tasksCompleted / tasksTotal) * 100) : 0;
    res.status(200).json({
      status: {
        clockedIn: status?.clockedIn || false,
        sport: status?.sport || null,
        clockTime: status?.clockTime || null,
        tasksCompleted,
        tasksTotal,
        pct,
      },
    });
    return;
  }
  if (req.method === "POST") {
    const { sport, clockedIn, clockTime, reflection, pct } = req.body || {};
    if (reflection !== undefined) {
      await prisma.athleteReflection.create({ data: { studentId, reflection, pct: pct ?? 0 } });
    }
    const status = await prisma.athleteStatus.upsert({
      where: { studentId },
      create: { studentId, sport: sport ?? null, clockedIn: !!clockedIn, clockTime: clockTime ? new Date(clockTime) : null },
      update: { ...(sport !== undefined ? { sport } : {}), clockedIn: !!clockedIn, clockTime: clockTime ? new Date(clockTime) : null },
    });
    res.status(200).json({ status });
    return;
  }
  res.status(405).json({ error: "Method not allowed" });
}

async function tasks(req, res, studentId) {
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

const RESOURCES = { config, "film-notes": filmNotes, goals, status, tasks };

export default async function handler(req, res) {
  const studentId = await resolveAuthorizedStudentId(req, res);
  if (!studentId) return; // response already sent

  const resource = req.query.resource;
  const fn = RESOURCES[resource];
  if (!fn) {
    res.status(404).json({ error: "Unknown athlete resource" });
    return;
  }
  await fn(req, res, studentId);
}
