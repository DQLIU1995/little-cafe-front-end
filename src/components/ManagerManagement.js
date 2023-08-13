import React from 'react';
import { Link } from 'react-router-dom';
import './ManagerManagement.css'; // Import the CSS file for this component

const ManagerPage = (props) => {
    const loggedIn = props.loggedIn; 
    const setLoggedIn = props.setLoggedIn;

    const handleLogout = () => {
        localStorage.removeItem('loggedInUserID');
        setLoggedIn(!loggedIn); // Mark the user as logged out
    };

    return (
        <div className="manager-page-container">
            <h2>Welcome to Management Service</h2>
            <h3>Please select below option to make changes</h3>
            <div className="button-container">
                <Link to="/CategoryManager">
                    <button className="change-button">Category Change</button>
                </Link>
                <Link to="/DishManager">
                    <button className="change-button">Dish Change</button>
                </Link>
                <Link to="/LogIn">
                <button id="logout-button" onClick={handleLogout}>Logout</button> 
                </Link>
            </div>
        </div>
    );
};

export default ManagerPage;



