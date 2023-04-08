import { Link } from "react-router-dom";
import React from "react";
import "../Styles/Navbar.css"
function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link exact to="/">
            Home
          </Link>
        </li>
       
      </ul>
    </nav>
  );
}

export default Navbar;