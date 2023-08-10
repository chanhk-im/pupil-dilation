import React, { useState, useEffect, useRef } from 'react';
import './PaymentPageMobile.css';
import Timer from '../Timer';

/*eslint-disable*/
function PaymentPageMobile() {
    const timerSeconds = 15 * 60;
    return (
        <div className="whole-paymentpage">
            <div className="first-payment">
                <div className="title-payment">결제</div>
                <div className="timer-mobile">
                    <Timer seconds={timerSeconds} />
                </div>
            </div>
            <div className="second-payment">
                <img
                    className="ticket-image-mobile"
                    src="images/ticketWhite.png"
                    alt="티켓 정보"
                />
                <img
                    className="ticket-event-image"
                    src="images/Dongari1.png"
                    alt="티켓 이미지"
                />
            </div>
            <div className="third-payment">
                <p>test</p>
            </div>
        </div>
    );
}

export default PaymentPageMobile;
