import React from 'react';
import MainPageRoute from '../routes/MainPageRoute';
import Header from '../components/Header';
import Mobile from '../components/MediaQuery/Mobile';
import Desktop from '../components/MediaQuery/Desktop';
import MobileHeader from '../components/MobileHeader';

function MainPageContainer() {
    return (
        <div>
            <Desktop>
                <Header />
            </Desktop>
            <Mobile>
                <MobileHeader />
            </Mobile>
            <MainPageRoute />
        </div>
    );
}

export default MainPageContainer;
