import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../features/user/api/firebase_auth';
import { stageUser } from '../../features/user/slices/userSlice';
import './LoginFormMobile.css';

function LoginFormMobile({ setIsLoaded }) {
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

    const onClickButton = async () => {
        setIsLoaded(false);
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
                if (res) {
                    if (res.user.userType == 0) navigate('/');
                    else if (res.user.userType == 1) navigate('/host');
                }
            }
        });
        setIsLoaded(true);
    };

    return (
        <div className="right-page">
            <div className="right-high">
                <div className="login-text1">로그인</div>
                <Link className="sign-up1" to="/login/signup">
                    <div className="sign-up-text1"> 회원가입</div>
                </Link>
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
            <div className="button-location">
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

export default LoginFormMobile;
