import React from 'react';
import Desktop from '../MediaQuery/Desktop';
import Mobile from '../MediaQuery/Mobile';
import DetailDesktop from './desktop/DetailDesktop';
import DetailMobile from './mobile/DetailMobile';
import DetailFooterDesktop from './desktop/DetailFooterDesktop';

function Detail() {
    return (
        <>
            <Desktop>
                <DetailDesktop />
            </Desktop>
            <Mobile>
                <DetailMobile />
            </Mobile>
        </>
    );
}

export default Detail;
