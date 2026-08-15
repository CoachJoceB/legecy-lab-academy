// Minimal, real auth. Not NextAuth (this is a Vite SPA + Vercel serverless
// functions, not a Next.js app, so NextAuth doesn't apply cleanly here).
// Password hashing with bcrypt, a signed JWT in an httpOnly cookie for the
// session, nothing more elaborate than that on purpose.

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";

const COOKIE_NAME = "legacylab_session";
const JWT_SECRET = process.env.JWT_SECRET;

export async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

export function signSession(payload) {
  if (!JWT_SECRET) throw new Error("JWT_SECRET is not set");
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "30d" });
}

export function verifySession(token) {
  if (!JWT_SECRET) throw new Error("JWT_SECRET is not set");
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return null;
  }
}

export function setSessionCookie(res, token) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    })
  );
}

export function clearSessionCookie(res) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize(COOKIE_NAME, "", { httpOnly: true, path: "/", maxAge: 0 })
  );
}

// Returns the decoded session payload, or null if there isn't a valid one.
// Use this at the top of any route that needs to know who's calling it.
export function getSession(req) {
  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies[COOKIE_NAME];
  if (!token) return null;
  return verifySession(token);
}
