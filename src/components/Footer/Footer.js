import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <div className="footer-container">
            <div className="footer-box">
                <div className="footer-start">
                    <div className="developers-container">
                        <div className="developer-title"></div>
                        <div className="developer-content"></div>
                    </div>
                    <div className="designer-container">
                        <div className="designer-title"></div>
                        <div className="designer-content"></div>
                    </div>
                </div>
                <div className="footer-line"></div>
                <div className="footer-center">
                    <div className="footer-email"></div>
                    <div className="footer-address"></div>
                </div>
                <div calssName="footer-line"></div>
                <div className="footer-end">
                    <div className="user-privacy"></div>
                    <div className="terms-of-use"></div>
                    <div className="end-img"></div>
                </div>
            </div>
        </div>
    );
}
export default Footer;
