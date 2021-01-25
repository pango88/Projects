import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Alert from './components/Alert';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import UserList from './components/UserList';
import BlogList from './components/BlogList';

import { rememberUser } from './reducers/userReducer.js';

import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // ännu mer i redux? eller ha kvar detta för error handling?
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(rememberUser(user));
    }
  }, [dispatch]);

  if (user === null) {
    return (
      <div>
        <Alert />
        <LoginForm />
      </div>
    );
  }

  return (
    <div>
      <Alert />
      <Navbar user={user} />
      <h1>Bloglist Application</h1>
      <Switch>
        <Route path="/users">
          <UserList />
        </Route>
        <Route path="/">
          <BlogList />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
