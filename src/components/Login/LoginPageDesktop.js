import React from 'react';
import './LoginPageDesktop.css';
import LoginFormDesktop from './LoginFormDesktop';

function LoginPageDesktop() {
    return (
        <div className="container-desktop">
            <img
                className="logo-desktop"
                alt="pupil-dilation"
                src="/images/Logo.svg"
            />
            <LoginFormDesktop />
        </div>
    );
}

export default LoginPageDesktop;
