import React from 'react';
import { Link } from 'react-router-dom';

function SideBar() {
  return (
    <nav className="sidebar">
      <ul>
        <li>
          <Link to="/create-post">Create a Post</Link>
        </li>
        <li>
          <Link to="/post-gallery">Post Gallery</Link>
        </li>
      </ul>
    </nav>
  );
}

export default SideBar;

