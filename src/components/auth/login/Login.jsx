import React, { useState } from 'react';
import './Login.css';
import { login } from '../../../core/api/users.api';
import { Redirect, Link } from 'react-router-dom';

export function Login(props) {

    const [userData, setUserData] = useState({});
    const [isLoggedUser, setLoggedUser] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onInputChange = (event) => {
        event.persist();
        console.log(event);

        setUserData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
        setErrorMessage('');
        console.log(userData);
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        login(userData).then(() => {
            console.log('LOGIN SUCCESS');
            setLoggedUser(true);
        })
        .catch((err) => setErrorMessage(err.message));
    };

    return (
        <>
        { isLoggedUser && <Redirect to="/" /> }
        <div className="login-wrapper">
            <form className="login-form" onSubmit={onFormSubmit}>
                { errorMessage && <span className="text-danger">{errorMessage}</span> }
                <div className="form-group">
                    <label htmlFor="username">Username: </label>
                    <input type="text" name="username" id="nusernameame" className="form-control" onChange={onInputChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" className="form-control" onChange={onInputChange} />
                </div>
                <button className="btn btn-outline-primary">Login</button>
                <Link to="/register">Don't have an account?</Link>
            </form>
        </div>
        </>
    )
}