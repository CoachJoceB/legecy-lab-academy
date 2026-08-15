import { prisma } from "../../lib/db.js";
import { hashPassword, verifyPassword, signSession, setSessionCookie, clearSessionCookie, getSession } from "../../lib/auth.js";

// One function instead of four, /api/auth/login, /api/auth/logout, /api/auth/me,
// and /api/auth/register all still work exactly as before, Vercel's [action]
// bracket syntax routes them all here based on the URL segment. This exists
// because the Hobby plan caps a deployment at 12 serverless functions, and
// four separate files for four small auth actions was a wasteful way to
// spend that budget.

async function login(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const { email, password } = req.body || {};
  if (!email || !password) {
    res.status(400).json({ error: "email and password are required" });
    return;
  }
  const user = await prisma.user.findUnique({ where: { email }, include: { student: true } });
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

async function logout(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  clearSessionCookie(res);
  res.status(200).json({ ok: true });
}

async function me(req, res) {
  const session = getSession(req);
  if (!session) {
    res.status(200).json({ user: null });
    return;
  }
  const user = await prisma.user.findUnique({ where: { id: session.userId }, include: { student: true } });
  if (!user) {
    res.status(200).json({ user: null });
    return;
  }
  res.status(200).json({
    user: { id: user.id, name: user.name, email: user.email, roles: user.roles },
    studentId: user.student?.id || null,
  });
}

async function register(req, res) {
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
    data: { email, passwordHash, name, roles: role },
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

const ACTIONS = { login, logout, me, register };

export default async function handler(req, res) {
  const action = req.query.action;
  const fn = ACTIONS[action];
  if (!fn) {
    res.status(404).json({ error: "Unknown auth action" });
    return;
  }
  await fn(req, res);
}
