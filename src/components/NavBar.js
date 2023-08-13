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
                    <NavLink to="/LogIn"> Log out</NavLink>
                ) : (
                    <NavLink to="/LogIn"> Log in</NavLink>
                )}
            </div>
        </nav>
    );
}

export default Navbar;