import { prisma } from "../_lib/db.js";
import { resolveAuthorizedStudentId } from "../_lib/access.js";

export default async function handler(req, res) {
  const studentId = await resolveAuthorizedStudentId(req, res);
  if (!studentId) return;

  if (req.method === "GET") {
    const artifacts = await prisma.portfolioArtifact.findMany({
      where: { studentId },
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json({ artifacts });
    return;
  }

  if (req.method === "POST") {
    const { courseId, course, unit, lessonKey, title, skill, section, score, maxScore, mastered } = req.body || {};
    if (!courseId || !course || !title || !skill || !section) {
      res.status(400).json({ error: "courseId, course, title, skill, and section are required" });
      return;
    }
    const artifact = await prisma.portfolioArtifact.create({
      data: {
        studentId, courseId, course, unit: unit || "", lessonKey: lessonKey || "",
        title, skill, section, score: score ?? null, maxScore: maxScore ?? null, mastered: !!mastered,
      },
    });
    res.status(201).json({ artifact });
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}
