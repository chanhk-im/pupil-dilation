import React from 'react';
import Desktop from '../../MediaQuery/Desktop';
import Mobile from '../../MediaQuery/Mobile';
import PaymentPageDesktop from './desktop/PaymentPageDesktop';
import PaymentPageMobile from './mobile/PaymentPageMobile';

function PaymentPage() {
    return (
        <>
            <Desktop>
                <PaymentPageDesktop />
            </Desktop>
            <Mobile>
                <PaymentPageMobile />
            </Mobile>
        </>
    );
}

export default PaymentPage;
