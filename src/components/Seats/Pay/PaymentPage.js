import React from 'react';
import './PaymentPage.css';

/*eslint-disable*/
function PaymentPage() {
    return (
        <div className="payment-container">
            <div className="pay-ticket">
                <div className="ticket-white">
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
                        <div className="final">
                            <div className="final-title">최종결제금액</div>
                            <div className="final-title-content">10000원</div>
                        </div>
                        <div className="account">
                            <div className="account-title">입금계좌</div>
                            <div className="account-content">
                                국민 123123123123123
                            </div>
                        </div>
                        <div className="sending">
                            <div className="sending-title">송금계좌</div>
                            <input
                                className="sending-name"
                                type="text"
                                name="name"
                                placeholder="예금주 입력"
                            />
                            <input
                                className="sending-bank"
                                type="text"
                                name="bank"
                                placeholder="은행명 입력"
                            />
                            <input
                                className="sending-account"
                                type="text"
                                name="account"
                                placeholder='"-" 포함 계좌번호 입력'
                            />
                        </div>
                    </div>
                    <div className="sending-check">
                        <input
                            className="confirm-send"
                            id="send-yes"
                            type="checkbox"
                        />
                        <label for="send-yes" className="select-none">
                            <i></i>
                            Yes
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentPage;
