import React from 'react';
import MainPageDesktop from './desktop/MainPageDesktop';
import Desktop from '../MediaQuery/Desktop';
// import Mobile from '../MediaQuery/Mobile';
// import MainPageMobile from './mobile/MainPageMobile';

function MainPage() {
    return (
        <Desktop>
            <MainPageDesktop />
        </Desktop>
    );
}

export default MainPage;
