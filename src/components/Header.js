import React from 'react';
import './Header.css';

function Header() {
    return (
        <div className="header">
            <div className="header-red" />
            <div className="header-image">
                <div className="line">
                    <img
                        className="pupil-dilation"
                        alt="my-header"
                        src="img/header_img.png"
                    />
                    <input type="text" id="search" name="search" />
                </div>
            </div>
        </div>
    );
}

export default Header;
