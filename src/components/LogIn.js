import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LogIn.css'; // Import the CSS file you created
import PropTypes from "prop-types";




const Login = (props) => {
    const [userID, setUserID] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Use the useNavigate hook for navigation

// Replace 'correctUserID' with the actual correct userID stored in the database

console.log(props.allUsers)

    const userIdList = props.allUsers.map((user) => user.userId);

    const handleInputChange = (event) => {
    setUserID(event.target.value);};

    const handleSubmit = (event) => {
    event.preventDefault();
    if (userIdList.includes(parseInt(userID))) {
        console.log("hi here")
      // Redirect to the ManagerManagement site if the userID matches
        navigate('/ManagerPage');
    } else {
      // Show an error message if the userID doesn't match
        setErrorMessage('Incorrect userID. Please try again.');
    }
    };

return (
    <div className="login-body">
        <div className="login-container">
            <form onSubmit={handleSubmit}>
            <label htmlFor="userID">UserID:</label>
            <input
                type="text"
                id="userID"
                value={userID}
                onChange={handleInputChange}
                required
            />
            <button type="submit">Submit</button>
            </form>
            {errorMessage && <p className="login-error">{errorMessage}</p>}
        </div>
    </div>
);
};


Login.propTypes = {
    allUsers: PropTypes.object.isRequired,};


export default Login;
