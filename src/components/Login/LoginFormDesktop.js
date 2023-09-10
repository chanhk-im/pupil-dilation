import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../features/user/api/firebase_auth';
import { stageUser } from '../../features/user/slices/userSlice';
import './LoginFormDesktop.css';
import Popup from '../Popup/Popup';
import { checkRequestUsersDocument } from '../../features/user/api/requestUsersDocumentApi';

function LoginFormDesktop({ setIsLoaded }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [account, setAccount] = useState({
        id: '',
        password: '',
    });

    const [popup, setPopup] = useState({
        open: false,
        message: '',
        callback: false,
    });

    const onChangeAccount = (e) => {
        setAccount({
            ...account,
            [e.target.name]: e.target.value,
        });
    };

    const onButtonClick = async () => {
        setIsLoaded(false);
        const check = await checkRequestUsersDocument(account.id);
        if (check) {
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
                        switch (res) {
                            case 1:
                                setPopup({
                                    open: true,
                                    message: '존재하지 않는 id입니다.',
                                });
                                return;
                            case 2:
                                setPopup({
                                    open: true,
                                    message: '이메일이 존재하지 않습니다.',
                                });
                                return;
                            case 3:
                                setPopup({
                                    open: true,
                                    message: '비밀번호가 일치하지 않습니다.',
                                });
                                return;
                            case 4:
                                setPopup({
                                    open: true,
                                    message: '알 수 없는 오류로 실패했습니다.',
                                });
                                return;
                            case 10:
                                setPopup({
                                    open: true,
                                    message:
                                        '아이디와 비밀번호를 모두 입력해주세요.',
                                });
                                return;
                            default:
                                if (res.user.id === 'admin') navigate('/admin');
                                if (res.user.userType == 0) navigate('/');
                                else if (res.user.userType == 1)
                                    navigate('/host');
                                else
                                    setPopup({
                                        open: true,
                                        message:
                                            '알 수 없는 오류로 실패했습니다.',
                                    });
                        }
                    }
                }
                setIsLoaded(true);
            });
        } else
            await loginUser(account.id, account.password).then((res) => {
                if (res) {
                    dispatch(
                        stageUser({
                            user: res.user,
                            userCredential: res.userCredential,
                            isHost: res.isHost,
                        }),
                    );
                    if (res) {
                        switch (res) {
                            case 1:
                                setPopup({
                                    open: true,
                                    message: '존재하지 않는 id입니다.',
                                });
                                return;
                            case 2:
                                setPopup({
                                    open: true,
                                    message: '이메일이 존재하지 않습니다.',
                                });
                                return;
                            case 3:
                                setPopup({
                                    open: true,
                                    message: '비밀번호가 일치하지 않습니다.',
                                });
                                return;
                            case 4:
                                setPopup({
                                    open: true,
                                    message: '알 수 없는 오류로 실패했습니다.',
                                });
                                return;
                            case 10:
                                setPopup({
                                    open: true,
                                    message:
                                        '아이디와 비밀번호를 모두 입력해주세요.',
                                });
                                return;
                            default:
                                if (!res.user) {
                                    setPopup({
                                        open: true,
                                        message:
                                            '비밀번호가 일치하지 않습니다.',
                                    });
                                    return;
                                }
                                if (res.user.userType == 0) navigate('/');
                                else
                                    setPopup({
                                        open: true,
                                        message:
                                            '권한이 없거나 id가 존재하지 않습니다.',
                                    });
                        }
                    }
                } else setPopup({ open: true, message: '실패' });
            });
        setIsLoaded(true);
    };
    return (
        <div className="right-page-desktop">
            <Popup
                open={popup.open}
                setPopup={setPopup}
                message={popup.message}
                title={popup.title}
                callback={popup.callback}
            />
            <div className="right-high-desktop">
                <div className="login-text1-desktop">로그인</div>
                <Link className="sign-up1-desktop" to="/login/signup">
                    <div className="sign-up-text1-desktop"> 회원가입</div>
                </Link>
            </div>
            <div className="id-blank">
                <input
                    type="text"
                    className="id1-desktop"
                    id="id"
                    name="id"
                    placeholder="아이디"
                    onChange={onChangeAccount}
                />
                <div className="id-blank-image">
                    <img
                        src="/images/login-id-icon.svg"
                        alt="."
                        className="input-id-img"
                    />
                </div>
            </div>
            <div className="password-blank">
                <input
                    type="password"
                    className="password1-desktop"
                    id="password"
                    name="password"
                    placeholder="비밀번호"
                    onChange={onChangeAccount}
                />
                <div className="password-blank-image">
                    <img
                        src="/images/login-lock-icon.svg"
                        alt="."
                        className="input-pass-img"
                    />
                </div>
            </div>
            <div className="checker-desktop">
                <div className="checker-desktop-left">
                    <input className="id-check-desktop" type="checkbox" />
                    <div className="save-id-desktop">아이디 저장</div>
                </div>
                <div className="checker-desktop-right">
                    <button>아이디 찾기</button>
                    <div className="vertical-line" />
                    <button>비밀번호 찾기</button>
                </div>
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
