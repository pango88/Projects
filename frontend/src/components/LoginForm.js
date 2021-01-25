import React from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../reducers/userReducer';

const BlogForm = () => {
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    dispatch(loginUser(username, password));
  };

  return (
    <div>
      <h1>Bloglist Application</h1>
      <h2>Log in to continue</h2>
      <form onSubmit={handleLogin}>
        username
        <input id="username" type="text" name="username" />
        <br />
        password
        <input id="password" type="password" name="password" />
        <br />
        <button id="loginBtn" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
