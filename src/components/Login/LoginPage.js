import React from 'react';
import Desktop from '../MediaQuery/Desktop';
import Mobile from '../MediaQuery/Mobile';
import LoginPageDesktop from './LoginPageDesktop';
import LoginPageMobile from './LoginPageMobile';

function LoginPage() {
    return (
        <div>
            <Desktop>
                <LoginPageDesktop />
            </Desktop>
            <Mobile>
                <LoginPageMobile />
            </Mobile>
        </div>
    );
}

export default LoginPage;
