import React from 'react';
import LoginPageRoute from '../routes/LoginPageRoute';
import Header from '../components/Header';

function LoginPageContainer() {
    return (
        <div>
            <Header />
            <LoginPageRoute />
        </div>
    );
}

export default LoginPageContainer;
