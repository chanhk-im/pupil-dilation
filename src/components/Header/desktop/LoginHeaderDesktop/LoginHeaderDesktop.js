import React from 'react';
import './LoginHeaderDesktop.css';

function LoginHeaderDesktop() {
    return (
        <div>
            <div className="first-header" />
            <div className="second-header">
                <img
                    src="img/header_img.png"
                    alt="동공확장"
                    className="header-image"
                />
            </div>
        </div>
    );
}

export default LoginHeaderDesktop;
