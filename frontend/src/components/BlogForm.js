import React from 'react';
import { setAlert } from '../reducers/alertReducer';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import Togglable from './Togglable';

const BlogForm = () => {
  const dispatch = useDispatch();

  const blogFormRef = React.createRef();

  const addBlog = (event) => {
    event.preventDefault();
    const newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    };
    blogFormRef.current.toggleVisibility();
    event.target.title.value = '';
    event.target.author.value = '';
    event.target.url.value = '';
    // I only have double check for this because of the alerts, if createBlog fails because it is empty the catch method in the App component will handle it
    if ((newBlog.title && newBlog.author && newBlog.url) !== '') {
      dispatch(setAlert(`a new blog ${newBlog.title} by ${newBlog.author}`, 5));
    }
    dispatch(createBlog(newBlog));
  };

  return (
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <h2>Create new blog</h2>
        <form onSubmit={addBlog} id="blogform">
          title:
          <input id="title" type="text" name="title" />
          <br />
          author:
          <input id="author" type="text" name="author" />
          <br />
          url:
          <input id="url" type="text" name="url" />
          <br />
          <button type="submit">create</button>
        </form>
      </Togglable>
    </div>
  );
};

export default BlogForm;
