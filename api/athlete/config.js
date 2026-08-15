import { prisma } from "../_lib/db.js";
import { resolveAuthorizedStudentId } from "../_lib/access.js";

export default async function handler(req, res) {
  const studentId = await resolveAuthorizedStudentId(req, res);
  if (!studentId) return;

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
