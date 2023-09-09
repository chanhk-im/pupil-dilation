import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <div className="footer-container">
            <div className="footer-box">
                <div className="footer-start">
                    <div className="developers-container">
                        <div className="developer-title">Developers</div>
                        <div className="developer-content">
                            Obsun wor__yth EastBean chanhk
                        </div>
                    </div>
                    <div className="designer-container">
                        <div className="designer-title">Designer</div>
                        <div className="designer-content">haeunU</div>
                    </div>
                </div>
                {/* <div className="footer-line">
                    <hr className="line"></hr>
                </div> */}
                <div className="footer-center">
                    <div className="footer-email">
                        이용문의 / dghj.cra.handong.gmail.com
                    </div>
                    <div className="footer-address">
                        경북 포항시 북구 흥해읍 한동로 558 한동대학교 37554
                    </div>
                </div>
                <div calssName="footer-line"></div>
                <div className="footer-end">
                    <div className="user-privacy">개인정보처리방침</div>
                    <div className="terms-of-use">이용약관</div>
                    <div className="end-img"></div>
                </div>
            </div>
        </div>
    );
}
export default Footer;
