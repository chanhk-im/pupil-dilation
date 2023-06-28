import React from 'react';
import './Header.css';

function Header() {
    return (
        <div className="header">
            <div className="header-red">
                <div className="auth">로그인</div>
                <div className="auth">회원가입</div>
            </div>
            <div className="line">
                <img
                    className="pupil-dilation"
                    alt="my-header"
                    src="img/header_img.png"
                />
                <div className="line-right">
                    <div className="search-input">
                        <input
                            type="text"
                            id="search"
                            name="search"
                            placeholder="공연/동아리 검색"
                        />
                        <img
                            className="search-button"
                            alt="search-button"
                            src="images/search.png"
                        />
                    </div>
                    <img
                        className="user-button"
                        alt="search-button"
                        src="images/user.svg"
                    />
                </div>
            </div>
        </div>
    );
}

export default Header;
