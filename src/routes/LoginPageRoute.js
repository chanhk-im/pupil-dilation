import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../components/Login/LoginPage';
import SignUpPage from '../components/Login/SignUpPage';
import HostSignUp from '../components/Host/HostSignUp';

function LoginPageRoute() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/signup-host" element={<HostSignUp />} />
            </Routes>
        </div>
    );
}

export default LoginPageRoute;
