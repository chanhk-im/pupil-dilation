import React from 'react';
import './LoginPage.css';

function LoginPage() {
    return (
        <div className="container">
            <img className="logo" alt="pupil-dilation" src="/images/Logo.svg" />
            <div className="right-page">
                <div className="right-high">
                    <div className="login-text1">로그인</div>
                    <button className="sign-up1" type="button">
                        <div className="sign-up-text1"> 회원가입</div>
                    </button>
                </div>
                <input
                    type="text"
                    className="id1"
                    id="id"
                    placeholder="아이디"
                />
                <input
                    type="password"
                    className="password1"
                    id="password"
                    placeholder="비밀번호"
                />
                <div className="checker">
                    <input className="id-check" type="checkbox" />
                    <div className="save-id">아이디 저장</div>
                </div>
                <button className="login1" type="button">
                    <div className="login-text2"> 로그인</div>
                </button>
            </div>
        </div>
    );
}

export default LoginPage;
