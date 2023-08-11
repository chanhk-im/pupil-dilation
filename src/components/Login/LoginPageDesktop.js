import React, { useState } from 'react';
import './LoginPageDesktop.css';
import LoginFormDesktop from './LoginFormDesktop';
import LoadingOverlay from '../LoadingOverlay';

function LoginPageDesktop() {
    const [isLoaded, setIsLoaded] = useState(true);

    return (
        <div className="container-desktop">
            {!isLoaded ? <LoadingOverlay /> : <></>}
            <img
                className="logo-desktop"
                alt="pupil-dilation"
                src="/images/Logo.svg"
            />
            <LoginFormDesktop setIsLoaded={setIsLoaded} />
        </div>
    );
}

export default LoginPageDesktop;
