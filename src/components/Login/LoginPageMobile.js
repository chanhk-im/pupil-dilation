import React from 'react';
import './LoginPageMobile.css';
import LoginFormMobile from './LoginFormMobile';

function LoginPageMobile() {
    return (
        <div className="container-mobile">
            <div className="logo-mobile-location">
                <img
                    className="logo-mobile"
                    alt="pupil-dilation"
                    src="/images/Logo.svg"
                />
            </div>
            <LoginFormMobile />
        </div>
    );
}

export default LoginPageMobile;
