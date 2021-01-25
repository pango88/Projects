import loginService from '../services/login';
import blogService from '../services/blogs';
import { setAlert } from './alertReducer';

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data;
    case 'LOGIN_USER':
      return action.data;
    case 'REMEMBER_USER':
      return action.data;
    case 'LOGOUT_USER':
      return action.data;
    default:
      return state;
  }
};

export const loginUser = (username, password) => {
  return async (dispatch) => {
    const user = await loginService
      .login({
        username,
        password,
      })
      .catch((error) => {
        dispatch(setAlert('Incorrect username and/or password', 5));
      });
    if (user) {
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch({
        type: 'LOGIN_USER',
        data: user,
      });
      dispatch(setAlert('Successfully logged in', 5));
    }
  };
};

export const rememberUser = (user) => {
  return async (dispatch) => {
    blogService.setToken(user.token);
    dispatch({
      type: 'REMEMBER_USER',
      data: user,
    });
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch({
      type: 'LOGOUT_USER',
      data: null,
    });
    dispatch(setAlert('Logged out', 3));
  };
};

export default userReducer;
