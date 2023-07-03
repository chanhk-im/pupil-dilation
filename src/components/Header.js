import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <div className="header">
            <div className="header-red">
                <Link to="/login" className="auth">
                    로그인
                </Link>
                <Link to="/signup" className="auth">
                    회원가입
                </Link>
            </div>
            <div className="line">
                <Link to="/">
                    <img
                        className="pupil-dilation"
                        alt="my-header"
                        src="/img/header_img.png"
                    />
                </Link>

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
                            src="/images/search.png"
                        />
                    </div>
                    <img
                        className="user-button"
                        alt="search-button"
                        src="/images/user.svg"
                    />
                </div>
            </div>
        </div>
    );
}

export default Header;
