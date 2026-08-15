// A single shared Prisma client. In serverless environments, creating a new
// client per request exhausts database connections fast; this pattern
// reuses one client across warm invocations of the same function instance.

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
