-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Word" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "word" TEXT NOT NULL,
    "definition" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "User_Word" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "wordId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "User_Word_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "User_Word_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Synonyms" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "synonym" TEXT NOT NULL,
    "wordId" TEXT NOT NULL,
    CONSTRAINT "Synonyms_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Word_word_key" ON "Word"("word");
