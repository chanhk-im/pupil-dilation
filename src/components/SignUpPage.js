import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
                        name="id"
                        placeholder="4~12자리 영소문자, 숫자"
                        onChange={onChangeAccount}
                    />
                </dev>
                <dev>
                    <dev className="sign-up-title">비밀번호</dev>
                    <input
                        type="password"
                        className="sign-up-input"
                        id="password"
                        name="password"
                        placeholder="8~20자리 영문 대/소문자, 숫자, 특수문자 조합"
                        onChange={onChangeAccount}
                    />
                </dev>
                <dev>
                    <dev className="sign-up-title">비밀번호 재입력</dev>
                    <input
                        type="password"
                        className="sign-up-input"
                        id="password-check"
                        name="password-check"
                        placeholder="확인을 위한 비밀번호 재입력"
                    />
                </dev>
                <dev>
                    <dev className="sign-up-title">이름</dev>
                    <input
                        type="text"
                        className="sign-up-input"
                        id="name"
                        name="name"
                        placeholder=""
                        onChange={onChangeAccount}
                    />
                </dev>
                <dev>
                    <dev className="sign-up-title">전화번호</dev>
                    <input
                        type="text"
                        className="sign-up-input"
                        id="phone-number"
                        name="phone"
                        placeholder="010-xxxx-xxxx"
                        onChange={onChangeAccount}
                    />
                </dev>
                <dev>
                    <dev className="sign-up-title">이메일</dev>
                    <input
                        type="text"
                        className="sign-up-input"
                        id="email"
                        name="email"
                        placeholder=""
                        onChange={onChangeAccount}
                    />
                </dev>
                <button
                    className="sign-up"
                    type="button"
                    onClick={onButtonClick}
                >
                    <dev className="sign-up-text2">가입 완료</dev>
                </button>
            </dev>
        </dev>
    );
}

export default SignUpPage;
