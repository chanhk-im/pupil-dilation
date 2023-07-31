import React from 'react';
import Desktop from '../MediaQuery/Desktop';
import Mobile from '../MediaQuery/Mobile';
import MainPageDesktop from './desktop/MainPageDesktop';
import MainPageMobile from './Mobile/MainPageMobile';

function MainPage() {
    return (
        <>
            <Desktop>
                <MainPageDesktop />
            </Desktop>
            <Mobile>
                <MainPageMobile />
            </Mobile>
        </>
    );
}

export default MainPage;
