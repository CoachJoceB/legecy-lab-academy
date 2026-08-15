-- Hand-written to match prisma/schema.prisma exactly, since generating this
-- automatically requires Prisma's engine binary, which this sandbox can't
-- reach. Every table, column, default, and constraint below corresponds to
-- one model in the schema. If you ever add a model normally (with a real
-- `prisma migrate dev` on a machine that CAN reach Prisma's servers), that
-- new migration will layer on top of this one correctly.

CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "roles" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "gradeLevel" INTEGER,
    "houseName" TEXT NOT NULL DEFAULT 'House Purpose',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "Student_userId_key" ON "Student"("userId");
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE TABLE "ParentStudentLink" (
    "id" TEXT NOT NULL,
    "parentUserId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    CONSTRAINT "ParentStudentLink_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "ParentStudentLink_parentUserId_studentId_key" ON "ParentStudentLink"("parentUserId", "studentId");
ALTER TABLE "ParentStudentLink" ADD CONSTRAINT "ParentStudentLink_parentUserId_fkey" FOREIGN KEY ("parentUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "ParentStudentLink" ADD CONSTRAINT "ParentStudentLink_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE TABLE "CoachStudentLink" (
    "id" TEXT NOT NULL,
    "coachUserId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    CONSTRAINT "CoachStudentLink_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "CoachStudentLink_coachUserId_studentId_key" ON "CoachStudentLink"("coachUserId", "studentId");
ALTER TABLE "CoachStudentLink" ADD CONSTRAINT "CoachStudentLink_coachUserId_fkey" FOREIGN KEY ("coachUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "CoachStudentLink" ADD CONSTRAINT "CoachStudentLink_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE TABLE "LessonCompletion" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "specKey" TEXT NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "LessonCompletion_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "LessonCompletion_studentId_specKey_key" ON "LessonCompletion"("studentId", "specKey");
ALTER TABLE "LessonCompletion" ADD CONSTRAINT "LessonCompletion_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE TABLE "PortfolioArtifact" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "lessonKey" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "skill" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "score" INTEGER,
    "maxScore" INTEGER,
    "mastered" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PortfolioArtifact_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "PortfolioArtifact" ADD CONSTRAINT "PortfolioArtifact_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE TABLE "StakesLedgerEntry" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "xpDelta" INTEGER NOT NULL DEFAULT 0,
    "houseDelta" INTEGER NOT NULL DEFAULT 0,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "StakesLedgerEntry_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "StakesLedgerEntry" ADD CONSTRAINT "StakesLedgerEntry_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE TABLE "Mission1Answer" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "selectedValues" TEXT NOT NULL,
    "justification" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Mission1Answer_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "Mission1Answer_studentId_key" ON "Mission1Answer"("studentId");
ALTER TABLE "Mission1Answer" ADD CONSTRAINT "Mission1Answer_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE TABLE "AthleteTask" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "cat" TEXT NOT NULL,
    "priority" TEXT NOT NULL DEFAULT 'medium',
    "time" TEXT NOT NULL DEFAULT '',
    "done" BOOLEAN NOT NULL DEFAULT false,
    "pts" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AthleteTask_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "AthleteTask" ADD CONSTRAINT "AthleteTask_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE TABLE "AthleteGoal" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "cat" TEXT NOT NULL,
    "deadline" TEXT NOT NULL DEFAULT '',
    "progress" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AthleteGoal_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "AthleteGoal" ADD CONSTRAINT "AthleteGoal_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE TABLE "AthleteStatus" (
    "studentId" TEXT NOT NULL,
    "sport" TEXT,
    "clockedIn" BOOLEAN NOT NULL DEFAULT false,
    "clockTime" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "AthleteStatus_pkey" PRIMARY KEY ("studentId")
);
ALTER TABLE "AthleteStatus" ADD CONSTRAINT "AthleteStatus_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE TABLE "AthleteReflection" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "reflection" TEXT NOT NULL,
    "pct" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AthleteReflection_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "AthleteReflection" ADD CONSTRAINT "AthleteReflection_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE TABLE "MentalToughnessProgress" (
    "studentId" TEXT NOT NULL,
    "currentDay" INTEGER NOT NULL DEFAULT 0,
    "completedDays" TEXT NOT NULL DEFAULT '{}',
    "journalEntries" TEXT NOT NULL DEFAULT '{}',
    "goalEntries" TEXT NOT NULL DEFAULT '{}',
    "confidenceRatings" TEXT NOT NULL DEFAULT '{}',
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "MentalToughnessProgress_pkey" PRIMARY KEY ("studentId")
);
ALTER TABLE "MentalToughnessProgress" ADD CONSTRAINT "MentalToughnessProgress_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE TABLE "AthleteConfig" (
    "studentId" TEXT NOT NULL,
    "familyName" TEXT NOT NULL DEFAULT 'My Family',
    "rewardPer" INTEGER NOT NULL DEFAULT 5,
    "adhdMode" BOOLEAN NOT NULL DEFAULT true,
    "allowYouTube" BOOLEAN NOT NULL DEFAULT true,
    "allowUpload" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "AthleteConfig_pkey" PRIMARY KEY ("studentId")
);
ALTER TABLE "AthleteConfig" ADD CONSTRAINT "AthleteConfig_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE TABLE "AthleteFilmNotes" (
    "studentId" TEXT NOT NULL,
    "notes" TEXT NOT NULL DEFAULT '{}',
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "AthleteFilmNotes_pkey" PRIMARY KEY ("studentId")
);
ALTER TABLE "AthleteFilmNotes" ADD CONSTRAINT "AthleteFilmNotes_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
