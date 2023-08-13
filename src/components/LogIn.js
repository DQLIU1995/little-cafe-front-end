import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
import './LogIn.css'; 

const Login = (props) => {
    const loggedIn = props.loggedIn; 
    const setLoggedIn = props.setLoggedIn;
    const [userID, setUserID] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const userIdList = props.allUsers.map((user) => user.userId);

    useEffect(() => {
        // Check if the username is already stored in local storage
        const loggedInUsername = localStorage.getItem('loggedInUsername');
        
        if (loggedInUsername) {
            setLoggedIn(true); // User is already logged in
        }
    }, []);

    const handleInputChange = (event) => {
        setUserID(event.target.value);
    };

    const handleLogin = (event) => {
        event.preventDefault();
        if (userIdList.includes(parseInt(userID))) {
            const loggedInUser = props.allUsers.find(user => user.userId === parseInt(userID));
            if (loggedInUser) {
                localStorage.setItem('loggedInUsername', loggedInUser.username);
                setLoggedIn(true); // Mark the user as logged in
            }
            
            navigate('/ManagerPage');
        } else {
            setErrorMessage('Incorrect userID. Please try again.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('loggedInUsername');
        setLoggedIn(false); // Mark the user as logged out
    };

    return (
        <div className="login-body">
            <div className="login-container">
            {loggedIn ? (
                <>
                    <p> Please Confirm Log Out </p>
                    <button onClick={handleLogout}>Log out</button>
                </>
            ) : (
                <form onSubmit={handleLogin}>
                    <label htmlFor="userID">UserID:</label>
                    <input
                        type="text"
                        id="userID"
                        value={userID}
                        onChange={handleInputChange}
                        required
                    />
                    <button type="submit">Log in</button>
                    {errorMessage && <p className="login-error">{errorMessage}</p>}
                </form>
            )}
        </div>
        </div>
    );
};

Login.propTypes = {
    allUsers: PropTypes.object.isRequired,
};

export default Login;






// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import PropTypes from "prop-types";
// import './LogIn.css'; 

// const Login = (props) => {
//     const [userID, setUserID] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');
//     const navigate = useNavigate();

//     const userIdList = props.allUsers.map((user) => user.userId);

//     useEffect(() => {
//         // Check if the username is already stored in local storage
//         const loggedInUsername = localStorage.getItem('loggedInUsername');
        
//         if (loggedInUsername) {
//             setLoggedIn(true); // User is already logged in
//         }
//     }, []);

//     const handleInputChange = (event) => {
//         setUserID(event.target.value);
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         if (userIdList.includes(parseInt(userID))) {
//             const loggedInUser = props.allUsers.find(user => user.userId === parseInt(userID));
//             if (loggedInUser) {
//                 localStorage.setItem('loggedInUsername', loggedInUser.username);
//             }
            
//             navigate('/ManagerPage');
//         } else {
//             setErrorMessage('Incorrect userID. Please try again.');
//         }
//     };

//     return (
//         <div className="login-body">
//             <div className="login-container">
//             <form onSubmit={handleSubmit}>
//             <label htmlFor="userID">UserID:</label>
//             <input
//                 type="text"
//                 id="userID"
//                 value={userID}
//                 onChange={handleInputChange}
//                 required
//             />
//             <button type="submit">Submit</button>
//             </form>
//             {errorMessage && <p className="login-error">{errorMessage}</p>}
//         </div>
//         </div>
//     );
// };

// Login.propTypes = {
//     allUsers: PropTypes.object.isRequired,
// };

// export default Login;


