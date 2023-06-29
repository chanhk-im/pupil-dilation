import React from 'react';
import './LoginPage.css';

function LoginPage() {
    return (
        <dev className="container">
            <img className="logo" alt="pupil-dilation" src="/images/Logo.svg" />
            <dev className="right-page">
                <dev className="right-high">
                    <dev className="login-text1">로그인</dev>
                    <button className="sign-up1" type="button">
                        <dev className="sign-up-text1"> 회원가입</dev>
                    </button>
                </dev>
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
                <dev className="checker">
                    <input className="id-check" type="checkbox" />
                    <dev className="save-id">아이디 저장</dev>
                </dev>
                <button className="login1" type="button">
                    <dev className="login-text2"> 로그인</dev>
                </button>
            </dev>
        </dev>
    );
}

export default LoginPage;
