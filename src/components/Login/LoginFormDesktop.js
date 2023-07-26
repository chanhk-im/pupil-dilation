import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../features/user/api/firebase_auth';
import { stageUser } from '../../features/user/slices/userSlice';
import './LoginFormDesktop.css';

function LoginFormDesktop() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
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

    const onButtonClick = async () => {
        await loginUser(account.id, account.password).then((res) => {
            if (res) {
                dispatch(
                    stageUser({
                        user: res.user,
                        userCredential: res.userCredential,
                        isHost: res.isHost,
                    }),
                );
                console.log(res);
                if (res.user.userType == 0) navigate('/');
                else if (res.user.userType == 1) navigate('/host');
            }
        });
    };

    return (
        <div className="right-page-desktop">
            <div className="right-high-desktop">
                <div className="login-text1-desktop">로그인</div>
                <Link className="sign-up1-desktop" to="/login/signup">
                    <div className="sign-up-text1-desktop"> 회원가입</div>
                </Link>
            </div>
            <input
                type="text"
                className="id1-desktop"
                id="id"
                name="id"
                placeholder="아이디"
                onChange={onChangeAccount}
            />
            <input
                type="password"
                className="password1-desktop"
                id="password"
                name="password"
                placeholder="비밀번호"
                onChange={onChangeAccount}
            />
            <div className="checker-desktop">
                <input className="id-check-desktop" type="checkbox" />
                <div className="save-id-desktop">아이디 저장</div>
            </div>
            <button
                className="login1-desktop"
                type="button"
                onClick={onButtonClick}
            >
                <div className="login-text2-desktop">로그인</div>
            </button>
        </div>
    );
}

export default LoginFormDesktop;
