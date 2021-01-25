import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initMembers } from '../reducers/membersReducer';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import UserView from './UserView';

const Users = () => {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.members);
  const match = useRouteMatch('/users/:id');
  const user = match
    ? members.find((user) => user.id === match.params.id)
    : null;

  // Sorting by amunt of blogs, highest to lowest
  const sortedMembers = members.sort((a, b) => b.blogs.length - a.blogs.length);

  useEffect(() => {
    dispatch(initMembers());
  }, [dispatch]);

  return (
    <div>
      <Switch>
        <Route path="/users/:id">
          <UserView user={user} />
        </Route>
        <Route path="/users">
          <h2>Users</h2>
          <table>
            <tr>
              <th>Name</th>
              <th>Blogs</th>
            </tr>
            {sortedMembers.map((user) => (
              <tr key={user.id}>
                <Link to={`/users/${user.id}`}>
                  <td>{user.name}</td>
                </Link>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </table>
        </Route>
      </Switch>
    </div>
  );
};

export default Users;
