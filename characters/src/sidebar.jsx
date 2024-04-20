import React from 'react';
import { Link } from 'react-router-dom';

function SideBar() {
  return (
    <nav className="sidebar">
      <ul>
        <li>
          <Link to="/create-crewmate">Create a Crewmate</Link>
        </li>
        <li>
          <Link to="/crewmate-gallery">Crewmate Gallery</Link>
        </li>
      </ul>
    </nav>
  );
}

export default SideBar;

