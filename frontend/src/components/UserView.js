import React from 'react';

const User = ({ user }) => {
  const userBlogs = () => {
    if (user.blogs.length > 0) {
      return (
        <div>
          <h3>added blogs</h3>
          <ul>
            {user.blogs.map((blog) => (
              <li key={blog.id}>{blog.title}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <div>{user.name} has not added any blogs</div>;
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      {userBlogs()}
    </div>
  );
};

export default User;
