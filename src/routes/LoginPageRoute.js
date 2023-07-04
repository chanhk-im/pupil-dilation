import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../components/Login/LoginPage';
import SignUpPage from '../components/Login/SignUpPage';

function LoginPageRoute() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
            </Routes>
        </div>
    );
}

export default LoginPageRoute;
