import request from 'supertest';
import app from '../index';


describe('GET /meals', function () {
    it('responds with json', function (done) {
      request(app)
        .get('/meals')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
  
  describe('GET /meals/:id', function () {
    it('responds with json', function (done) {
      request(app)
        .get('/meals/1') 
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
  
  describe('POST /ai-generate', function () {
    it('responds with json', function (done) {
      request(app)
        .post('/ai-generate')
        .send({ input: 'Sample input' }) 
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
  
  describe('PUT /meals/:id', function () {
    it('responds with json', function (done) {
      request(app)
        .put('/meals/1') 
        .send({ name: 'Updated meal name' }) 
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
  
  describe('DELETE /meals/:id', function () {
    it('responds with json', function (done) {
      request(app)
        .delete('/meals/1') 
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
