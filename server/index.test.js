import request from "supertest";
import app from "./index";
// import fs from "fs";
import { mocksOpenIa } from "./mocks";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import { jest } from "@jest/globals";
import sinon from 'sinon'

describe("Test of the endpoints", () => {
  it("GET /Send an array of meals", async () => {
    const response = await request(app).get("/meals");
    expect(response.status).toEqual(200);
    expect(response.body).toBeInstanceOf(Array);
  });


  it("GET /meals/:id send back a specific meal", async () => {
    const response = await request(app).get("/meals/1");
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("id", 1);
    expect(response.body).toHaveProperty("title", "test1");
  });

  it.skip("DELETE /meals/:id delete the diet", async () => {
    const meal = await prisma.mealAI.create({
      data: {
        description: "hello",
        userId: "google-oauth2|105514186843076497545",
        mealInfoId: 3,
      },
    });
    console.log("id du meal", meal.id);
    const response = await request(app).delete(`/meals/${meal.id}`);
    expect(response.status).toEqual(204);
  });

  it("PUT /meals/:id update title of the diet", async () => {
    const mealToUpdate = { title: "test1" };
    const response = await request(app).put("/meals/1").send(mealToUpdate);

    expect(response.status).toEqual(200);
    expect(response.body.title).toEqual("test1");

    const updatedMeal = await prisma.mealInfo.findUnique({
      where: { id: 1 },
    });
    expect(updatedMeal.title).toEqual("test1");
  });

  it.skip("POST /ai-generate generate a meal with ", async () => {
    const response = await request(app).post("/ai-generate").send(mocksOpenIa);
    expect(response.status).toEqual(200);
  }, 90000);

  it.skip("POST /Should send 500 status if plan is not correctly generated", async () => {
    const response = await request(app).post("/ai-generate").send({});
    expect(response.status).toEqual(500);
  }, 90000);

  it("POST /ai-generate, age must be positive number", async () => {
    const response = await request(app).post("/ai-generate").send({
      auth0Id: "google-oauth2|105514186843076497545",
      userName: "Guillaume",
      userPic: "",
      email: "guillaume.rouchaud@gmail.com",
      title: "Test",
      name: "Guillaume",
      age: -30,
      gender: "MALE",
      weight: 90,
      height: 183,
      activityLevel: "ACTIVE",
      dietaryPreferences: "ham, eggs",
      weightGoal: "LOSE",
      weightAmount: 5,
      timeFrame: 3,
      eatingFrequency: 3,
    });
    expect(response.status).toEqual(400);
  }, 90000);

  it("POST /ai-generate, weight must be positive number", async () => {
    const response = await request(app).post("/ai-generate").send({
      auth0Id: "google-oauth2|105514186843076497545",
      userName: "Guillaume",
      userPic: "",
      email: "guillaume.rouchaud@gmail.com",
      title: "Test",
      name: "Guillaume",
      age: 90,
      gender: "MALE",
      weight: -90,
      height: 183,
      activityLevel: "ACTIVE",
      dietaryPreferences: "ham, eggs",
      weightGoal: "LOSE",
      weightAmount: 5,
      timeFrame: 3,
      eatingFrequency: 3,
    });
    expect(response.status).toEqual(400);
  }, 90000);

  it("POST /ai-generate, height must be positive number", async () => {
    const response = await request(app).post("/ai-generate").send({
      auth0Id: "google-oauth2|105514186843076497545",
      userName: "Guillaume",
      userPic: "",
      email: "guillaume.rouchaud@gmail.com",
      title: "Test",
      name: "Guillaume",
      age: 90,
      gender: "MALE",
      weight: 90,
      height: -183,
      activityLevel: "ACTIVE",
      dietaryPreferences: "ham, eggs",
      weightGoal: "LOSE",
      weightAmount: 5,
      timeFrame: 3,
      eatingFrequency: 3,
    });
    expect(response.status).toEqual(400);
  }, 90000);

  it("POST /ai-generate, weightAmount must be positive number", async () => {
    const response = await request(app).post("/ai-generate").send({
      auth0Id: "google-oauth2|105514186843076497545",
      userName: "Guillaume",
      userPic: "",
      email: "guillaume.rouchaud@gmail.com",
      title: "Test",
      name: "Guillaume",
      age: 90,
      gender: "MALE",
      weight: 90,
      height: 183,
      activityLevel: "ACTIVE",
      dietaryPreferences: "ham, eggs",
      weightGoal: "LOSE",
      weightAmount: -5,
      timeFrame: 3,
      eatingFrequency: 3,
    });
    expect(response.status).toEqual(400);
  }, 90000);

  it("POST /ai-generate, timeFrame must be positive number", async () => {
    const response = await request(app).post("/ai-generate").send({
      auth0Id: "google-oauth2|105514186843076497545",
      userName: "Guillaume",
      userPic: "",
      email: "guillaume.rouchaud@gmail.com",
      title: "Test",
      name: "Guillaume",
      age: 90,
      gender: "MALE",
      weight: 90,
      height: 183,
      activityLevel: "ACTIVE",
      dietaryPreferences: "ham, eggs",
      weightGoal: "LOSE",
      weightAmount: 5,
      timeFrame: -3,
      eatingFrequency: 3,
    });
    expect(response.status).toEqual(400);
  }, 90000);

  it("POST /ai-generate, eatingFrequency must be positive number", async () => {
    const response = await request(app).post("/ai-generate").send({
      auth0Id: "google-oauth2|105514186843076497545",
      userName: "Guillaume",
      userPic: "",
      email: "guillaume.rouchaud@gmail.com",
      title: "Test",
      name: "Guillaume",
      age: 90,
      gender: "MALE",
      weight: 90,
      height: 183,
      activityLevel: "ACTIVE",
      dietaryPreferences: "ham, eggs",
      weightGoal: "LOSE",
      weightAmount: 5,
      timeFrame: 3,
      eatingFrequency: -3,
    });
    expect(response.status).toEqual(400);
  }, 90000);
});
