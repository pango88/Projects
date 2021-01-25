const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('../utils/api_helper');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe('/api/blogs GET', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const res = await api.get('/api/blogs');

    expect(res.body.length).toBe(helper.initialBlogs.length);
  });

  test('unique identifier property called "id" exists', async () => {
    const res = await api.get('/api/blogs');
    for (let i = 0; i < res.body.legnth; i++) {
      expect(res.body[i].id).toBeDefined();
    }
  });
});

describe('/api/blogs POST', () => {
  test('a valid blog can be added', async () => {
    await api.post('/api/users').send(helper.newUser);
    const res = await api.post('/api/login').send(helper.newUser);

    await api
      .post('/api/blogs')
      .set({
        Authorization: 'bearer ' + res.body.token,
        Accept: 'application/json',
      })
      .send(helper.newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const contents = blogsAtEnd.map((n) => n.title);
    expect(contents).toContain('Jude is happy');
  });

  test('if property "likes" missing it defaults to 0', async () => {
    const missingLikesBlog = {
      title: 'Jude is happy',
      author: 'Judith Harris',
      url: 'www.happy.com',
    };

    await api.post('/api/users').send(helper.newUser);
    const res = await api.post('/api/login').send(helper.newUser);

    await api
      .post('/api/blogs')
      .set({
        Authorization: 'bearer ' + res.body.token,
        Accept: 'application/json',
      })
      .send(missingLikesBlog);

    const blogsAtEnd = await helper.blogsInDb();
    // I use helper.intialBlogs.length to get the index of the just added item since the length of an array is allways 1 longer than where the index ends, since it is 0 indexed. a simple console.log will prove this, however maybe there is a cleaner way
    expect(blogsAtEnd[helper.initialBlogs.length].likes).toBe(0);
  });

  test('a invalid blog post returns error 400', async () => {
    const invalidBlog = {
      author: 'Judith Harris',
      likes: 443,
    };

    await api.post('/api/users').send(helper.newUser);
    const res = await api.post('/api/login').send(helper.newUser);

    await api
      .post('/api/blogs')
      .set({
        Authorization: 'bearer ' + res.body.token,
        Accept: 'application/json',
      })
      .send(invalidBlog)
      .expect(400);
  });

  test('a blog POST request missing token recieves status 401', async () => {
    await api.post('/api/blogs').send(helper.newBlog).expect(401);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe('/api/blogs DELETE', () => {
  test('deletion of a specific blog', async () => {
    await api.post('/api/users').send(helper.newUser);
    const res = await api.post('/api/login').send(helper.newUser);

    const blog = await api
      .post('/api/blogs')
      .set({
        Authorization: 'bearer ' + res.body.token,
        Accept: 'application/json',
      })
      .send(helper.newBlog);

    await api
      .delete(`/api/blogs/${blog.body.id}`)
      .set({
        Authorization: 'bearer ' + res.body.token,
      })
      .expect(204);
  });
});

describe('/api/blogs PUT', () => {
  test('put request of a specific blog', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedBlog = {
      url: 'new_url.com',
      likes: 99,
    };

    const res = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200);

    expect(res.body.likes).toBe(99);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
