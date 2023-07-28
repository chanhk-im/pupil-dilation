import React from 'react';
import './LoginHeaderMobile.css';
import { Link } from 'react-router-dom';

function LoginHeaderMobile() {
    return (
        <>
            <div className="first-login-header" />
            <div className="second-login-header">
                <Link to="/">
                    <img
                        className="login-header-image"
                        alt="pupil-dilation"
                        src="/img/login_header_logo.svg"
                    />
                </Link>
            </div>
        </>
    );
}

export default LoginHeaderMobile;
