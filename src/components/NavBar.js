import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const Navbar = ({ loggedIn }) => {
    return (
        <nav className="navbar">
            <div className="links">
                <NavLink to="/"> Home</NavLink>
            </div>
            <div className="links">
                {loggedIn ? (
                    <NavLink to="/LogIn"> Manager Log In</NavLink>
                ) : (
                    <NavLink to="/LogIn"> Manage Center</NavLink>
                )}
            </div>
        </nav>
    );
}

export default Navbar;