import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkID, createUser } from '../../features/user/api/firebase_auth';
import SignUpForm from './SignUpForm';
import Popup from '../Popup/Popup';

function SignUpPage() {
    const navigate = useNavigate();

    const [popup, setPopup] = useState({
        open: false,
        message: '',
        callback: false,
    });

    const [newUserInfo, setNewUserInfo] = useState({
        id: '',
        password: '',
        passwordCheck: '',
        name: '',
        phone: '',
        email: '',
        userType: 0,
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
            await checkID(newUserInfo).then(async (res1) => {
                if (!res1) {
                    if (newUserInfo.password !== newUserInfo.passwordCheck) {
                        setPopup({
                            open: true,
                            message: '비밀번호와 재입력 부분이 다릅니다.',
                        });
                        return;
                    }
                    await createUser(newUserInfo).then((res) => {
                        console.log(res);
                        if (res) {
                            switch (res) {
                                case 4:
                                    setPopup({
                                        open: true,
                                        message: '이미 사용 중인 이메일입니다.',
                                    });
                                    return;
                                case 5:
                                    setPopup({
                                        open: true,
                                        message:
                                            '비밀번호는 6글자 이상이어야 합니다.',
                                    });
                                    return;
                                case 6:
                                    setPopup({
                                        open: true,
                                        message:
                                            '네트워크 연결에 실패하였습니다.',
                                    });
                                    return;
                                case 7:
                                    setPopup({
                                        open: true,
                                        message: '잘못된 이메일 형식입니다.',
                                    });
                                    return;
                                case 8:
                                    setPopup({
                                        open: true,
                                        message: '잘못된 요청입니다.',
                                    });
                                    return;
                                case 9:
                                    setPopup({
                                        open: true,
                                        message: '회원가입 완료!',
                                        callback: () => navigate('/login'),
                                    });
                                    return;
                                default:
                                    setPopup({
                                        open: true,
                                        message: '회원가입 완료!',
                                        callback: () => navigate('/login'),
                                    });
                            }
                        }
                    });
                } else {
                    setPopup({
                        open: true,
                        message: '이미 사용 중인 ID입니다.',
                    });
                }
            });
        } else {
            setPopup({
                open: true,
                message: '빈칸을 모두 채워주세요!',
            });
        }
    };

    return (
        <div>
            <Popup
                open={popup.open}
                setPopup={setPopup}
                message={popup.message}
                callback={popup.callback}
            />
            <SignUpForm
                onChangeAccount={onChangeAccount}
                onButtonClick={onButtonClick}
            />
        </div>
    );
}

export default SignUpPage;
