import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import blogReducer from './reducers/blogReducer';
import alertReducer from './reducers/alertReducer';
import userReducer from './reducers/userReducer';
import membersReducer from './reducers/membersReducer';

const reducer = combineReducers({
  blogs: blogReducer,
  alert: alertReducer,
  user: userReducer,
  members: membersReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
