import { prisma } from "../_lib/db.js";
import { getSession } from "../_lib/auth.js";

export default async function handler(req, res) {
  const session = getSession(req);
  if (!session) {
    res.status(200).json({ user: null });
    return;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: { student: true },
  });

  if (!user) {
    res.status(200).json({ user: null });
    return;
  }

  res.status(200).json({
    user: { id: user.id, name: user.name, email: user.email, roles: user.roles },
    studentId: user.student?.id || null,
  });
}
