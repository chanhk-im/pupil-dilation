import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../features/user/api/firebase_auth';
import { createRequestUsersDocument } from '../../features/user/api/requestUsersDocumentApi';
import HostSignUpForm from './HostSignUpForm';
import Popup from '../Popup/Popup';

function HostSignUp() {
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
        email: '',
        userType: 1,
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
            await createUser(newUserInfo).then(async (res) => {
                // TODO: navigate main
                if (res) {
                    await createRequestUsersDocument(newUserInfo.id);
                    setPopup({
                        open: true,
                        message: '주최자 가입 요청이 완료되었습니다.',
                        callback: ()=>navigate('/login'),
                    });
                    // navigate('/login');
                }
            });
        } else {
            setPopup({
                open: true,
                message: '주최자 가입 실패..',
            });
        }
    };

    return (
        <div>
            <Popup
                open={popup.open}
                setPopup={setPopup}
                message={popup.message}
                title={popup.title}
                callback={popup.callback}
            />
            <HostSignUpForm
                onChangeAccount={onChangeAccount}
                onButtonClick={onButtonClick}
            />
        </div>
    );
}

export default HostSignUp;
