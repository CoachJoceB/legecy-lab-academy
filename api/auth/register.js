import { prisma } from "../_lib/db.js";
import { hashPassword, signSession, setSessionCookie } from "../_lib/auth.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { email, password, name, role } = req.body || {};

  if (!email || !password || !name || !role) {
    res.status(400).json({ error: "email, password, name, and role are all required" });
    return;
  }
  if (password.length < 8) {
    res.status(400).json({ error: "Password must be at least 8 characters" });
    return;
  }
  if (!["student", "parent", "coach"].includes(role)) {
    res.status(400).json({ error: "role must be student, parent, or coach" });
    return;
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    res.status(409).json({ error: "An account with that email already exists" });
    return;
  }

  const passwordHash = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      name,
      roles: role, // a person can hold more than one role later via a separate "add role" step; registration starts with one
    },
  });

  let student = null;
  if (role === "student") {
    student = await prisma.student.create({ data: { userId: user.id } });
  }

  const token = signSession({ userId: user.id, roles: user.roles, studentId: student?.id || null });
  setSessionCookie(res, token);

  res.status(201).json({
    user: { id: user.id, name: user.name, email: user.email, roles: user.roles },
    studentId: student?.id || null,
  });
}
