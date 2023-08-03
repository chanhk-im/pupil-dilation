import React from 'react';
import Desktop from '../MediaQuery/Desktop';
import Mobile from '../MediaQuery/Mobile';
import HostCreateDesktop from './HostCreatePage/desktop/HostCreateDesktop';
import HostCreateMobile from './HostCreatePage/mobile/HostCreateMobile';

function HostCreate() {
    return (
        <>
            <Desktop>
                <HostCreateDesktop />
            </Desktop>
            <Mobile>
                <HostCreateMobile />
            </Mobile>
        </>
    );
}

export default HostCreate;
