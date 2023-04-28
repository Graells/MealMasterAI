import request from 'supertest';
import router from '../router';
import app from '../index';

describe('GET/meals', function () {
  it('responds with json', function () {
    request(app)
      .get('/meals')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
      });
  });
});

describe('GET/meals/:id', function () {
  it('responds with json', function () {
    request(app)
      .get('/meals/:id')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
      });
  });
});

describe('POST/ai-generate', function () {
  it('responds with json', function () {
    request(app)
      .get('/meals/:id')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
      });
  });
});

describe('PUT/meals/:id', function () {
  it('responds with json', function () {
    request(app)
      .get('/meals/:id')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
      });
  });
});

describe('DELETE/meals/:id', function () {
  it('responds with json', function () {
    request(app)
      .get('/meals/:id')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
      });
  });
});
