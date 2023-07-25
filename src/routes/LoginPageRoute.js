import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../components/Login/LoginPage';
import SignUpPage from '../components/Login/SignUpPage';
import ErrorPage from '../components/Error/ErrorPage';

function LoginPageRoute() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </div>
    );
}

export default LoginPageRoute;
