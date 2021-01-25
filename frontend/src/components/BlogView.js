import React from 'react';
import { addLike, deleteBlog, createComment } from '../reducers/blogReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const BlogView = ({ blog }) => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  const history = useHistory();

  const boldSpan = {
    fontWeight: 'bold',
  };

  // likar lite segt
  const likeBlog = async (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    dispatch(addLike(id, blog));
  };

  // error handling does not work
  const removeBlog = async (id) => {
    const confirmation = window.confirm(
      'Are you sure you want to delete this blog?'
    );
    if (confirmation) {
      dispatch(deleteBlog(id));
      history.goBack();
    }
  };

  const addComment = (event) => {
    event.preventDefault();
    const newComment = {
      content: event.target.content.value,
    };
    dispatch(createComment(blog.id, newComment));
    event.target.content.value = '';
  };

  if (!blog) {
    return null;
  }

  return (
    <div className="blog">
      {blog.title} <span style={boldSpan}>by</span> {blog.author}{' '}
      <p>
        <span style={boldSpan}>url:</span> {blog.url}
      </p>
      <p id="likes">
        <span style={boldSpan}>likes:</span> {blog.likes}
        <button id="like" onClick={() => likeBlog(blog.id)} className="likeBtn">
          like
        </button>
      </p>
      <p>
        <span style={boldSpan}>creator:</span> {blog.user.name}
      </p>
      <h3>Comments</h3>
      <form onSubmit={addComment}>
        <input id="comment" type="text" name="content" />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
      <button
        id="#delete"
        onClick={() => {
          removeBlog(blog.id);
        }}
        style={{ color: 'red', fontWeight: 'bold' }}
      >
        remove
      </button>
    </div>
  );
};

export default BlogView;
