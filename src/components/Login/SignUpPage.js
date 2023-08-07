import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../features/user/api/firebase_auth';
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
            await createUser(newUserInfo).then((res) => {
                console.log(res);
                if (res === true) {
                    setPopup({
                        open: true,
                        message: '회원가입 완료!',
                        callback: () => navigate('/login'),
                    });
                } else {
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
                                message: '이미 사용 중인 이메일입니다.',
                            });
                            return;
                        case 5:
                            setPopup({
                                open: true,
                                message: '비밀번호는 6글자 이상이어야 합니다.',
                            });
                            return;
                        case 6:
                            setPopup({
                                open: true,
                                message: '네트워크 연결에 실패하였습니다.',
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
                        default:
                            setPopup({
                                open: true,
                                message: '알 수 없는 오류로 실패했습니다.',
                            });
                            return;
                    }
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
