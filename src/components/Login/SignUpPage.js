import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../features/user/api/firebase_auth';
import SignUpForm from './SignUpForm';

function SignUpPage() {
    const navigate = useNavigate();

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
        <SignUpForm onChangeAccount={onChangeAccount} onButtonClick={onButtonClick}/>
    );
}

export default SignUpPage;
