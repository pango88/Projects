import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../reducers/userReducer.js';

const Navbar = ({ user }) => {
  const dispatch = useDispatch();

  return (
    <div className="navBar">
      <span className="navItem">
        <Link to="/">Blogs</Link>
      </span>
      <span className="navItem">
        <Link to="/users">Users</Link>
      </span>
      <span className="navItem">{user.name} logged in</span>
      <span className="navItem">
        <button
          onClick={() => {
            window.localStorage.clear();
            dispatch(logoutUser());
          }}
        >
          Logout
        </button>
      </span>
    </div>
  );
};

export default Navbar;
