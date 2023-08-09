// Remove the import statement for React (if you have it)
// import React from 'react';
import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const Navbar = () => {
    return (
        <nav className="navbar">

            <div className="links">
                <NavLink to="/"> Home</NavLink>
            </div>
            <div className="links">
                <NavLink to="/LogIn"> Log in</NavLink>
            </div>
        </nav>
    );
}

export default Navbar;

