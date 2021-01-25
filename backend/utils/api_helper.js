const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'Jude is dancing',
    author: 'Judith Harris',
    url: 'www.dance.com',
    likes: 44,
  },
  {
    title: 'Monkey see monkey do',
    author: 'Hillary Trump',
    url: 'www.monkeyseemonkeydo.com',
    likes: 666,
  },
];

const newBlog = {
  title: 'Jude is happy',
  author: 'Judith Harris',
  url: 'www.happy.com',
  likes: 443,
};

const initialUsers = [
  {
    username: 'Pango',
    name: 'Hans',
    passwordHash: 'randomhash23123##%#"#21',
  },
  {
    username: 'Panfu01',
    name: 'Panda',
    passwordHash: 'randomhash23123##%#"#21',
  },
  {
    username: 'Shaina33',
    name: 'Shaina',
    passwordHash: 'randomhash23123##%#"#21',
  },
];

const newUser = {
  username: 'test',
  name: 'test',
  password: 'test',
};

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  initialUsers,
  usersInDb,
  newBlog,
  newUser,
};
