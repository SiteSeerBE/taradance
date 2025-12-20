-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "authorId" TEXT,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" TIMESTAMP(3) NOT NULL,
    "important" BOOLEAN NOT NULL DEFAULT false,
    "location" TEXT,
    "membersContent" TEXT,
    "membersOnly" BOOLEAN NOT NULL DEFAULT false,
    "repeatId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "time" TEXT,
    "title" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
