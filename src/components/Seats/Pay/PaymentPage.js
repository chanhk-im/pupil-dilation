import React from 'react';
import './PaymentPage.css';

function PaymentPage() {
    return (
        <div className="payment-container">
            <div className="pay-ticket">
                <div className="ticket-picture">
                    <h3 className="event-title">즉새두</h3>
                    <div className="ticket-content">
                        <img
                            className="ticket-pic"
                            alt="pic1"
                            src="/images/Dongari1.png"
                        />
                        <div className="ticket-lines">
                            <div className="dateLine">
                                <div className="dateLine-title">날짜</div>
                                <div className="dateLine-content">
                                    05/18(일)
                                </div>
                            </div>
                            <div className="timeLine">
                                <div className="timeLine-title">시간</div>
                                <div className="timeLine-content">20:00</div>
                            </div>
                            <div className="seatLine">
                                <div className="seatLine-title">
                                    좌석수/번호
                                </div>
                                <div className="seatLine-content">2/A8,A9</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="accountBox">
                <div className="content-box">
                    <div className="pay-price">
                        <p>최종결제금액</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentPage;
