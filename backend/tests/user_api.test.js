const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('../utils/api_helper');
const app = require('../app');
const api = supertest(app);
const User = require('../models/user');

beforeEach(async () => {
  await User.deleteMany({});
  const userObjects = helper.initialUsers.map((user) => new User(user));
  const promiseArray = userObjects.map((user) => user.save());
  await Promise.all(promiseArray);
});

describe('/api/users GET', () => {
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});

describe('/api/users POST', () => {
  test('creation fails with proper statuscode and message if username is already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'Pango',
      name: 'Hans',
      password: 'fortesting',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
    expect(result.body.error).toContain('`username` to be unique');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('creation fails with proper statuscode and message if password does not meet requirements', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'Flailingbird',
      name: 'Birdo',
      password: '1',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
    expect(result.body.error).toContain(
      'password must be atleast 3 characters'
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
