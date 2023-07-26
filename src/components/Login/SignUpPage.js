import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../features/user/api/firebase_auth';
import SignUpForm from './SignUpForm';
import Popup from '../Popup/Popup';

function SignUpPage() {
    const navigate = useNavigate();

    const [popup, setPopup] = useState({
        open: false,
        title: '',
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
                // TODO: navigate main
                if (res) {
                    alert('회원가입 완료!');
                    navigate('/login');
                }
            });
        } else {
            setPopup({
                open: true,
                title: 'Error',
                message: 'Please make sure all fields are filled in correctly.',
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
            <SignUpForm
                onChangeAccount={onChangeAccount}
                onButtonClick={onButtonClick}
            />
        </div>
    );
}

export default SignUpPage;
