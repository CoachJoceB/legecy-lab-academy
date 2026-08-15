import { prisma } from "./db.js";
import { getSession } from "./auth.js";

// Every data route needs to answer "which student, and is this caller
// allowed to see or write that student's data." Centralized here so that
// check happens the same way everywhere instead of being reimplemented
// (and potentially gotten wrong) in six different route files.
//
// - No query.studentId: caller must be a student, acting on their own data.
// - query.studentId present: caller must be that student, OR a parent/coach
//   with a real link to that student, checked against the database, not
//   just trusted from the request.
export async function resolveAuthorizedStudentId(req, res) {
  const session = getSession(req);
  if (!session) {
    res.status(401).json({ error: "Not signed in" });
    return null;
  }

  const requestedId = req.query?.studentId;

  if (!requestedId) {
    if (!session.studentId) {
      res.status(403).json({ error: "This account isn't a student account" });
      return null;
    }
    return session.studentId;
  }

  if (requestedId === session.studentId) {
    return requestedId;
  }

  const [parentLink, coachLink] = await Promise.all([
    prisma.parentStudentLink.findFirst({ where: { parentUserId: session.userId, studentId: requestedId } }),
    prisma.coachStudentLink.findFirst({ where: { coachUserId: session.userId, studentId: requestedId } }),
  ]);

  if (parentLink || coachLink) {
    return requestedId;
  }

  res.status(403).json({ error: "You don't have access to this student's data" });
  return null;
}
