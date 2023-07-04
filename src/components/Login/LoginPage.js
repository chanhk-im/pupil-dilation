import React from 'react';
import './LoginPage.css';
import LoginForm from './LoginForm';

function LoginPage() {
    return (
        <div className="container">
            <img className="logo" alt="pupil-dilation" src="/images/Logo.svg" />
            <LoginForm />
        </div>
    );
}

export default LoginPage;
