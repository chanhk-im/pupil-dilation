import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../features/user/api/firebase_auth';
import { createRequestUsersDocument } from '../../features/user/api/requestUsersDocumentApi';
import HostSignUpForm from './HostSignUpForm';

function HostSignUp() {
    const navigate = useNavigate();

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
                    await createRequestUsersDocument(newUserInfo.id)
                    alert('주최자 가입 요청이 완료되었습니다.');
                    navigate('/login');
                }
            });
        } else {
            alert('ㅁ');
        }
    };

    return (
        <HostSignUpForm
            onChangeAccount={onChangeAccount}
            onButtonClick={onButtonClick}
        />
    );
}

export default HostSignUp;
