import React from 'react';
import Desktop from '../MediaQuery/Desktop';
import Mobile from '../MediaQuery/Mobile';
import HostMainPageDesktop from './HostMainPage/desktop/HostMainPageDesktop';
import HostMainPageMobile from './HostMainPage/mobile/HostMainPageMobile';

function HostMainPage() {
    return (
        <>
            <Desktop>
                <HostMainPageDesktop />
            </Desktop>
            <Mobile>
                <HostMainPageMobile />
            </Mobile>
        </>
    );
}

export default HostMainPage;
