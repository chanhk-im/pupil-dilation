import React from 'react';
import Desktop from '../components/MediaQuery/Desktop';
import Mobile from '../components/MediaQuery/Mobile';
import LoginPageRoute from '../routes/LoginPageRoute';
import LoginHeaderDesktop from '../components/Header/desktop/LoginHeaderDesktop/LoginHeaderDesktop';
import LoginHeaderMobile from '../components/Header/mobile/LoginHeaderMobile/LoginHeaderMobile';

function LoginPageContainer() {
    return (
        <div>
            <Desktop>
                <LoginHeaderDesktop />
            </Desktop>
            <Mobile>
                <LoginHeaderMobile />
            </Mobile>
            <LoginPageRoute />
        </div>
    );
}

export default LoginPageContainer;
