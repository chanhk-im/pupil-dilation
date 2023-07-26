import React, { useState } from 'react';
import './TicketList.css';

function TicketList() {
    const [ticketDown, setTicketDown] = useState(false);
    return (
        <div className="user-mypage-container">
            <div className="user-mypage-text">My Page</div>
            <div className="ticket-list">
                <div className="ticket-reservation">예매내역</div>
                <div className="opened-ticket">
                    <div className="opened-ticket-high">
                        <button
                            className="arrow"
                            onClick={() => {
                                setTicketDown((ticketDown) => !ticketDown);
                            }}
                        >
                            {ticketDown ? (
                                <img
                                    src="/images/arrow-right.svg"
                                    alt="arrow-right"
                                />
                            ) : (
                                <img
                                    src="/images/arrow-down.svg"
                                    alt="arrow-down"
                                />
                            )}
                        </button>
                        <div className="ticket-show-title">즉새두</div>
                        <div className="ticket-show-time">
                            2023.09.27(토) 22:00
                        </div>
                        <button className="ticket-show-info">공연정보</button>
                    </div>
                    <nav className={ticketDown ? 'ticket-hidden' : ''}>
                        {/* <div className="ticket-hidden"> */}
                        <div className="ticket-picture">
                            <img
                                className="dongari1"
                                alt="dongari1"
                                src="/images/Dongari1.png"
                            />
                            <div className="seat-data">A8</div>
                        </div>
                        <div className="ticket-hidden-middle">
                            <div className="location">
                                <div className="location-title">장소</div>
                                <div className="location-content">
                                    학관 101호
                                </div>
                            </div>
                            <div className="seat-detail">
                                <div className="seat-detail-title">
                                    좌석번호
                                </div>
                                <div className="seat-detail-content">
                                    A열 8번
                                </div>
                            </div>
                            <div className="enter-time">
                                <div className="enter-time-title">입장시작</div>
                                <div className="enter-time-content">21:30</div>
                            </div>
                        </div>
                        <div className="ticket-hidden-right">
                            <div className="ticket-hidden-right-text">
                                결제확인중
                            </div>
                        </div>
                        {/* </div> */}
                    </nav>
                </div>
                <div></div>
            </div>
        </div>
    );
}

export default TicketList;
