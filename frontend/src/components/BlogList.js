import React, { useEffect } from 'react';
import { initBlogs } from '../reducers/blogReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Blog from './Blog';
import BlogView from './BlogView';
import BlogForm from './BlogForm';

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const match = useRouteMatch('/blogs/:id');
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

  // Sorting blogs by highest amount of likes
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  useEffect(() => {
    dispatch(initBlogs());
  }, [dispatch]);

  return (
    <div>
      <Switch>
        <Route path="/blogs/:id">
          <BlogView blog={blog} />
        </Route>
        <Route path="/">
          <h2>Blogs</h2>
          <BlogForm />
          {sortedBlogs.map((blog, i) => (
            <Blog i={i} key={blog.id} id={blog.id} blog={blog} />
          ))}
        </Route>
      </Switch>
    </div>
  );
};

export default BlogList;
