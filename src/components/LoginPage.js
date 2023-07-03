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
                <div className="checker">
                    <input className="id-check" type="checkbox" />
                    <div className="save-id">아이디 저장</div>
                </div>
                <button
                    className="login1"
                    type="button"
                    onClick={onClickButton}
                >
                    <div className="login-text2">로그인</div>
                </button>
            </div>
        </div>
    );
}

export default LoginPage;
