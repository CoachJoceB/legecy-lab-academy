import { prisma } from "../_lib/db.js";
import { verifyPassword, signSession, setSessionCookie } from "../_lib/auth.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { email, password } = req.body || {};
  if (!email || !password) {
    res.status(400).json({ error: "email and password are required" });
    return;
  }

  const user = await prisma.user.findUnique({
    where: { email },
    include: { student: true },
  });

  // Deliberately identical error for "no such user" and "wrong password",
  // so a failed login doesn't leak which emails have accounts.
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  const token = signSession({ userId: user.id, roles: user.roles, studentId: user.student?.id || null });
  setSessionCookie(res, token);

  res.status(200).json({
    user: { id: user.id, name: user.name, email: user.email, roles: user.roles },
    studentId: user.student?.id || null,
  });
}
