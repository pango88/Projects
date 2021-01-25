const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const Comment = require('../models/comment');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
    .populate('user', {
      username: 1,
      name: 1,
      id: 1,
    })
    .populate('comments', {
      content: 1,
    });
  res.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
    .populate('user', {
      username: 1,
      name: 1,
      id: 1,
    })
    .populate('comments', {
      content: 1,
    });
  res.json(blog.toJSON());
});

blogsRouter.post('/', async (req, res) => {
  const body = req.body;
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    user: user._id,
    url: body.url,
    likes: body.likes || 0,
  });

  if (!body.title || !body.url) {
    return res.status(400).json({
      error: 'title and/or url missing',
    });
  }

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  res.status(201).json(savedBlog.toJSON());
});

blogsRouter.delete('/:id', async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }
  const blog = await Blog.findById(req.params.id);

  if (decodedToken.id === blog.user.toString()) {
    const blogDelete = await Blog.findByIdAndRemove(req.params.id);
    if (blogDelete) {
      return res.status(204).end();
    } else {
      return res.status(404).end();
    }
  }

  return res.status(403).json({
    error: 'incorrect token, only user who created blog can delete it',
  });
});

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body;

  const blog = {
    url: body.url,
    likes: body.likes,
  };

  Blog.findByIdAndUpdate(req.params.id, blog, { new: true }).then(
    (updatedBlog) => {
      res.json(updatedBlog.toJSON());
    }
  );
});

blogsRouter.post('/:id/comments', async (req, res) => {
  const body = req.body;

  const blog = await Blog.findById(req.params.id);

  const comment = new Comment({
    content: body.content,
    blog: blog._id,
  });

  if (!body.content) {
    return res.status(400).json({
      error: 'content missing',
    });
  }

  const savedComment = await comment.save();
  blog.comments = blog.comments.concat(savedComment._id);
  await blog.save();
  res.status(201).json(savedComment.toJSON());
});

module.exports = blogsRouter;
