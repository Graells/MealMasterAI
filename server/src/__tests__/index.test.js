const request = require('supertest');
// const app = require('../index');
// import fs from "fs";
const { mocksOpenIa } = require('../mocks');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// const { jest } from '@jest/globals';

describe('Test of the endpoints', () => {
  it('GET /Send an array of meals', async () => {
    console.log(process.env.DATABASE_URL);
    const response = await request('http://localhost:3001').get('/meals');
    expect(response.status).toEqual(200);
    expect(response.body).toBeInstanceOf(Array);
    //+add the test for error 500 with check of the error message
  });

  it('GET /meals/:id send back a specific meal', async () => {
    const response = await request('http://localhost:3001').get('/meals/1');
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body).toHaveProperty('title', 'test1');
  });
  it('DELETE /meals/:id delete the diet', async () => {
    const meal = await prisma.mealAI.create({
      data: {
        description: 'hello',
        userId: 'github|122622286',
        mealInfoId: 1,
      },
    });
    console.log('id du meal', meal.id);
    const response = await request('http://localhost:3001').delete(
      `/meals/${meal.id}`
    );
    expect(response.status).toEqual(204);
  });
  it('PUT /meals/:id update title of the diet', async () => {
    const mealToUpdate = { title: 'test1' };
    const response = await request('http://localhost:3001')
      .put('/meals/1')
      .send(mealToUpdate);
    expect(response.status).toEqual(200);
    expect(response.body.title).toEqual('test1');
    const updatedMeal = await prisma.mealInfo.findUnique({
      where: { id: 1 },
    });
    expect(updatedMeal.title).toEqual('test1');
  });
  it.skip('POST /ai-generate generate a meal with ', async () => {
    const response = await request('http://localhost:3001')
      .post('/ai-generate')
      .send(mocksOpenIa);
    expect(response.status).toEqual(200);
  }, 90000);
  it.skip('POST /Should send 500 status if plan is not correctly generated', async () => {
    // console.log("mockdata", mockData);
    const response = await request('http://localhost:3001')
      .post('/ai-generate')
      .send({});
    expect(response.status).toEqual(500);
    // + test the error message line 95 in controller
  }, 90000);
  // test if createchatcompletion has been called with the rights parameters
  // test if the prompt constructs the prompt in the correct way
});
