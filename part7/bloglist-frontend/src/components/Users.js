import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Users = () => {


  const userList = useSelector(state => state.users);
  if (userList === null) {
    return null;
  }
  console.log(userList);
  return (
    <>
      <table>
        <thead>
          <tr>
            <th></th>
            <th><b>blogs created</b></th>
          </tr>
        </thead>
        <tbody>
          {
            userList.map(user =>
              <tr key={user.id}>
                <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
                <td>{user.blogs.length}</td>
              </tr>
            )}
        </tbody>
      </table>
    </>
  );
};

export default Users;