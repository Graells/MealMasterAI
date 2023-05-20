-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "ActivityLevel" AS ENUM ('SEDENTARY', 'LIGHT', 'MODERATE', 'ACTIVE', 'VERY_ACTIVE');

-- CreateEnum
CREATE TYPE "WeightGoal" AS ENUM ('LOSE', 'GAIN', 'MAINTAIN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "auth0Id" TEXT NOT NULL,
    "email" TEXT,
    "userName" TEXT,
    "userPic" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MealAI" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mealInfoId" INTEGER NOT NULL,

    CONSTRAINT "MealAI_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MealInfo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "activityLevel" "ActivityLevel" NOT NULL,
    "dietaryPreferences" TEXT,
    "weightGoal" "WeightGoal" NOT NULL,
    "weightAmount" DOUBLE PRECISION NOT NULL,
    "timeFrame" INTEGER,
    "eatingFrequency" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MealInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_auth0Id_key" ON "User"("auth0Id");

-- CreateIndex
CREATE UNIQUE INDEX "MealAI_mealInfoId_key" ON "MealAI"("mealInfoId");

-- AddForeignKey
ALTER TABLE "MealAI" ADD CONSTRAINT "MealAI_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("auth0Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealAI" ADD CONSTRAINT "MealAI_mealInfoId_fkey" FOREIGN KEY ("mealInfoId") REFERENCES "MealInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
