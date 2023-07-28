import React from 'react';
import Desktop from '../components/MediaQuery/Desktop';
import Mobile from '../components/MediaQuery/Mobile';
import LoginPageRoute from '../routes/LoginPageRoute';
import MainHeaderDesktop from '../components/Header/desktop/MainHeaderDesktop/MainHeaderDesktop';

function LoginPageContainer() {
    return (
        <div>
            <Desktop>
                <MainHeaderDesktop />
            </Desktop>
            <Mobile>
                <MainHeaderDesktop />
            </Mobile>
            <LoginPageRoute />
        </div>
    );
}

export default LoginPageContainer;
