import React from 'react';
import Desktop from '../components/MediaQuery/Desktop';
import Mobile from '../components/MediaQuery/Mobile';
import LoginPageRoute from '../routes/LoginPageRoute';
import LoginHeaderDesktop from '../components/Header/desktop/LoginHeaderDesktop/LoginHeaderDesktop';

function LoginPageContainer() {
    return (
        <div>
            <Desktop>
                <LoginHeaderDesktop />
            </Desktop>
            <Mobile>
                <LoginHeaderDesktop />
            </Mobile>
            <LoginPageRoute />
        </div>
    );
}

export default LoginPageContainer;
