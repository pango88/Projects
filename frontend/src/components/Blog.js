import React from 'react';
import { Link } from 'react-router-dom';

const Blog = ({ blog, i, id }) => {
  const boldSpan = {
    fontWeight: 'bold',
  };

  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle} className="blog" id={i}>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} <span style={boldSpan}>by</span> {blog.author}{' '}
      </Link>
    </div>
  );
};

export default Blog;
