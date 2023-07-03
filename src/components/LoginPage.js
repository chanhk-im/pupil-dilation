import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../features/user/api/firebase_auth';
import './LoginPage.css';

function LoginPage() {
    const navigate = useNavigate();
    const [account, setAccount] = useState({
        id: '',
        password: '',
    });

    const onChangeAccount = (e) => {
        setAccount({
            ...account,
            [e.target.name]: e.target.value,
        });
    };

    const onClickButton = async () => {
        await loginUser(account.id, account.password).then((res) => {
            if (res) {
                navigate('/');
            }
        });
    };

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
                    name="id"
                    placeholder="아이디"
                    onChange={onChangeAccount}
                />
                <input
                    type="password"
                    className="password1"
                    id="password"
                    name="password"
                    placeholder="비밀번호"
                    onChange={onChangeAccount}
                />
                <dev className="checker">
                    <input className="id-check" type="checkbox" />
                    <dev className="save-id">아이디 저장</dev>
                </dev>
                <button
                    className="login1"
                    type="button"
                    onClick={onClickButton}
                >
                    <dev className="login-text2">로그인</dev>
                </button>
            </dev>
        </dev>
    );
}

export default LoginPage;
