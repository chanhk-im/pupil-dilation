import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './SignUpPage.css';
import { createUser } from '../features/user/api/firebase_auth';

function SignUpPage() {
    const navigate = useNavigate();

    const [newUserInfo, setNewUserInfo] = useState({
        id: '',
        password: '',
        name: '',
        phone: '',
        email: '',
    });

    const onChangeAccount = (e) => {
        setNewUserInfo({
            ...newUserInfo,
            [e.target.name]: e.target.value,
        });
    };

    const onButtonClick = async () => {
        const values = Object.values(newUserInfo);
        if (!values.includes('') && !values.includes(undefined)) {
            await createUser(newUserInfo).then((res) => {
                // TODO: navigate main
                if (res) {
                    alert('회원가입 완료!');
                    navigate('/login');
                }
            });
        } else {
            alert('ㅁ');
        }
    };

    return (
        <div className="container">
            <img className="logo" alt="pupil-dilation" src="/images/Logo.svg" />
            <div className="right-page1">
                <div className="right-high">
                    <button className="login" type="button">
                        <Link to="/login">
                            <div className="login-text">로그인</div>
                        </Link>
                    </button>
                    <div className="sign-up-text">회원가입</div>
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

export default SignUpPage;
