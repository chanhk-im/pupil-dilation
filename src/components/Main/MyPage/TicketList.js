import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './TicketList.css';

function TicketList() {
    const user = useSelector((state) => state.user.user);
    const reserv = query(showID, where('userId', '==', user));
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
                        <div className="ticket-show-title">{reserv.title}</div>
                        <div className="ticket-show-time">
                            2023.09.27(토) 22:00
                        </div>
                        <button className="ticket-show-info">공연정보</button>
                    </div>
                    <nav className={ticketDown ? 'ticket-hidden' : ''}>
                        {/* <div className="ticket-hidden"> */}
                        <div className="ticket-picture">
                            {show.imageDownloaded ? (
                                <img
                                    className="dongari1"
                                    src={reserv.image}
                                    alt={reserv.title}
                                />
                            ) : (
                                <img
                                    className="dongari1"
                                    src="images/Dongari3.jpg"
                                    alt={reserv.title}
                                />
                            )}
                            <div className="seat-data">A8</div>
                        </div>
                        <div className="ticket-hidden-middle">
                            <div className="location">
                                <div className="location-title">장소</div>
                                <div className="location-content">
                                    {reserv.place}
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
