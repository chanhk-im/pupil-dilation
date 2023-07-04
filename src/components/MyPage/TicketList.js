import React from 'react';
import './TicketList.css';

function TicketList() {
    return (
        <div className="ticket-list">
            <div className="ticket-reservation">예매내역</div>
            <div className="opened-ticket">
                <div className="opened-ticket-high">
                    <img
                        className="arrow-down"
                        alt="arrow-down"
                        src="/images/arrow-right.svg"
                    />
                    <div className="ticket-show-title">공연 제목</div>
                    <div className="ticket-show-time">2000.00.00(토) 22:00</div>
                    <div className="ticket-show-info">공연정보</div>
                </div>
                <div className="ticket-hidden">
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
                            <div className="location-content">장소이름</div>
                        </div>
                        <div className="seat-detail">
                            <div className="seat-detail-title">좌석번호</div>
                            <div className="seat-detail-content">A열 8번</div>
                        </div>
                        <div className="enter-time">
                            <div className="enter-time-title">입장시작</div>
                            <div className="enter-time-content">21:30</div>
                        </div>
                    </div>
                    <div className="ticket-hidden-right">결제확인중</div>
                </div>
            </div>
            <div className="closed-ticket">
                <img
                    className="arrow-right"
                    alt="arrow-right"
                    src="/images/arrow-right.svg"
                />
                <div className="show-title">공연 제목</div>
                <div className="show-time">2000.00.00(토) 22:00</div>
                <div className="ticket-opened-right">결제확인완료</div>
            </div>
            <div className="closed-ticket">
                <img
                    className="arrow-right"
                    alt="arrow-right"
                    src="/images/arrow-right.svg"
                />
                <div className="show-title">공연 제목</div>
                <div className="show-time">2000.00.00(토) 22:00</div>
                <div className="ticket-opened-right">결제확인중</div>
            </div>
        </div>
    );
}

export default TicketList;
