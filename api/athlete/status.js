import { prisma } from "../_lib/db.js";
import { resolveAuthorizedStudentId } from "../_lib/access.js";

export default async function handler(req, res) {
  const studentId = await resolveAuthorizedStudentId(req, res);
  if (!studentId) return;

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
      // Clocking out with a reflection is a ledger entry, not just a status flip.
      await prisma.athleteReflection.create({
        data: { studentId, reflection, pct: pct ?? 0 },
      });
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
