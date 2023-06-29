import React from 'react';
import './SignUpPage.css';

function SignUpPage() {
    return (
        <div className="container">
            <img className="logo" alt="pupil-dilation" src="/images/Logo.svg" />
            <div className="right-page1">
                <div className="right-high">
                    <button className="login" type="button">
                        <div className="login-text">로그인</div>
                    </button>
                    <div className="sign-up-text">회원가입</div>
                </div>
                <div>
                    <div className="sign-up-title">아이디</div>
                    <input
                        type="text"
                        className="sign-up-input"
                        id="id"
                        placeholder="4~12자리 영소문자, 숫자"
                    />
                </div>
                <div>
                    <div className="sign-up-title">비밀번호</div>
                    <input
                        type="password"
                        className="sign-up-input"
                        id="password"
                        placeholder="8~20자리 영문 대/소문자, 숫자, 특수문자 조합"
                    />
                </div>
                <div>
                    <div className="sign-up-title">비밀번호 재입력</div>
                    <input
                        type="password"
                        className="sign-up-input"
                        id="password-check"
                        placeholder="확인을 위한 비밀번호 재입력"
                    />
                </div>
                <div>
                    <div className="sign-up-title">이름</div>
                    <input
                        type="text"
                        className="sign-up-input"
                        id="name"
                        placeholder=""
                    />
                </div>
                <div>
                    <div className="sign-up-title">전화번호</div>
                    <input
                        type="text"
                        className="sign-up-input"
                        id="phone-number"
                        placeholder="010-xxxx-xxxx"
                    />
                </div>
                <div>
                    <div className="sign-up-title">이메일</div>
                    <input
                        type="text"
                        className="sign-up-input"
                        id="email"
                        placeholder=""
                    />
                </div>
                <button className="sign-up" type="button">
                    <div className="sign-up-text2">가입 완료</div>
                </button>
            </div>
        </div>
    );
}

export default SignUpPage;
