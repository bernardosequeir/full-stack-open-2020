import React from 'react';
import {
  Link
} from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
      <Link to="/">home</Link>
      <Link to="/create">create</Link>
      <Link to="/users">users</Link>
    </div>
  );
};

export default NavBar;