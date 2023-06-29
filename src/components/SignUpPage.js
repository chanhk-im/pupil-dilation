import React from 'react';
import './SignUpPage.css';

function SignUpPage() {
    return (
        <dev className="container">
            <img className="logo" alt="pupil-dilation" src="/images/Logo.svg" />
            <dev className="right-page1">
                <dev className="right-high">
                    <button className="login" type="button">
                        <dev className="login-text">로그인</dev>
                    </button>
                    <dev className="sign-up-text">회원가입</dev>
                </dev>
                <dev>
                    <dev className="sign-up-title">아이디</dev>
                    <input
                        type="text"
                        className="sign-up-input"
                        id="id"
                        placeholder="4~12자리 영소문자, 숫자"
                    />
                </dev>
                <dev>
                    <dev className="sign-up-title">비밀번호</dev>
                    <input
                        type="password"
                        className="sign-up-input"
                        id="password"
                        placeholder="8~20자리 영문 대/소문자, 숫자, 특수문자 조합"
                    />
                </dev>
                <dev>
                    <dev className="sign-up-title">비밀번호 재입력</dev>
                    <input
                        type="password"
                        className="sign-up-input"
                        id="password-check"
                        placeholder="확인을 위한 비밀번호 재입력"
                    />
                </dev>
                <dev>
                    <dev className="sign-up-title">이름</dev>
                    <input
                        type="text"
                        className="sign-up-input"
                        id="name"
                        placeholder=""
                    />
                </dev>
                <dev>
                    <dev className="sign-up-title">전화번호</dev>
                    <input
                        type="text"
                        className="sign-up-input"
                        id="phone-number"
                        placeholder="010-xxxx-xxxx"
                    />
                </dev>
                <dev>
                    <dev className="sign-up-title">이메일</dev>
                    <input
                        type="text"
                        className="sign-up-input"
                        id="email"
                        placeholder=""
                    />
                </dev>
                <button className="sign-up" type="button">
                    <dev className="sign-up-text2">가입 완료</dev>
                </button>
            </dev>
        </dev>
    );
}

export default SignUpPage;
