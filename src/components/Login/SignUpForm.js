import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpForm.css';

function SignUpForm({ onChangeAccount, onButtonClick }) {
    const navigate = useNavigate();

    return (
        <div className="container">
            <img className="logo" alt="pupil-dilation" src="/images/Logo.svg" />
            <div className="right-page1">
                <div className="right-high">
                    <div className="sign-up-text">회원가입</div>
                    <div>
                        <button
                            className="host-signup-button"
                            type="button"
                            onClick={() => navigate('/login/signup-host')}
                        >
                            <div className="host-signup-text">주최자 가입</div>
                        </button>
                        <button
                            className="login"
                            type="button"
                            onClick={() => navigate('/login')}
                        >
                            <div className="login-text">로그인</div>
                        </button>
                    </div>
                </div>
                <div>
                    <div className="sign-up-title">아이디</div>
                    <input
                        type="text"
                        className="sign-up-input"
                        id="id"
                        name="id"
                        placeholder="4~12자리 영소문자, 숫자"
                        onChange={onChangeAccount}
                    />
                </div>
                <div>
                    <div className="sign-up-title">비밀번호</div>
                    <input
                        type="password"
                        className="sign-up-input"
                        id="password"
                        name="password"
                        placeholder="8~20자리 영문 대/소문자, 숫자, 특수문자 조합"
                        onChange={onChangeAccount}
                    />
                </div>
                <div>
                    <div className="sign-up-title">비밀번호 재입력</div>
                    <input
                        type="password"
                        className="sign-up-input"
                        id="password-check"
                        name="password-check"
                        placeholder="확인을 위한 비밀번호 재입력"
                    />
                </div>
                <div>
                    <div className="sign-up-title">이름</div>
                    <input
                        type="text"
                        className="sign-up-input"
                        id="name"
                        name="name"
                        placeholder=""
                        onChange={onChangeAccount}
                    />
                </div>
                <div>
                    <div className="sign-up-title">전화번호</div>
                    <input
                        type="text"
                        className="sign-up-input"
                        id="phone-number"
                        name="phone"
                        placeholder="010-xxxx-xxxx"
                        onChange={onChangeAccount}
                    />
                </div>
                <div>
                    <div className="sign-up-title">이메일</div>
                    <input
                        type="text"
                        className="sign-up-input"
                        id="email"
                        name="email"
                        placeholder=""
                        onChange={onChangeAccount}
                    />
                </div>
                <button
                    className="sign-up"
                    type="button"
                    onClick={onButtonClick}
                >
                    <div className="sign-up-text2">가입 완료</div>
                </button>
            </div>
        </div>
    );
}

export default SignUpForm;
