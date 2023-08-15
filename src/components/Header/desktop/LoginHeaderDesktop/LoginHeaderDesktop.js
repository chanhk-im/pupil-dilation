import React from 'react';
import { Link } from 'react-router-dom';
import './LoginHeaderDesktop.css';

function LoginHeaderDesktop() {
    return (
        <div>
            <div className="first-login-header" />
            <div className="second-header">
                <Link to="/">
                    <img
                        src="/img/header_logo.svg"
                        alt="동공확장"
                        className="header-image"
                    />
                </Link>
            </div>
        </div>
    );
}

export default LoginHeaderDesktop;
