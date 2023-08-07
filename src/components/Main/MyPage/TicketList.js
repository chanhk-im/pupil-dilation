import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ticketReservDocument } from '../../../features/show/api/showsDocumentApi';
import Loading from '../../Loading';
import './TicketList.css';

function TicketList() {
    const user = useSelector((state) => state.user.user);
    const [ticketDown, setTicketDown] = useState(false);
    const ticketList = ticketReservDocument.map((value, i) => {
        value.docs[i].data().showID, value.docs[i].data().showNum;
    });
    async function onRefresh() {
        await ticketReservDocument(user.id).then((value) => {
            setTicketList(value);
            setIsLoaded(true);
        });
    }
    useEffect(() => {
        onRefresh();
    }, []);

    return (
        <div className="user-mypage-container">
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
                        <div className="ticket-show-title">
                            {ticketList[0].data().showId.title}
                        </div>
                        <div className="ticket-show-time">
                            2023.09.27(토) 22:00
                        </div>
                        {/* <Link
                            to={`/detail/${value.id}`}
                            style={{ textDecoration: 'none' }}
                        ></Link> */}
                        <button className="ticket-show-info">공연정보</button>
                    </div>
                    <nav className={ticketDown ? 'ticket-hidden' : ''}>
                        {/* <div className="ticket-hidden"> */}
                        <div className="ticket-picture">
                            <img
                                className="dongari1"
                                src="/images/Dongari3.jpg"
                                alt="즉새두"
                            />

                            <div className="seat-data">A8</div>
                        </div>
                        <div className="ticket-hidden-middle">
                            <div className="location">
                                <div className="location-title">장소</div>
                                <div className="location-content">현동</div>
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
                    </nav>
                </div>
                <div></div>
            </div>
        </div>
    );
}

export default TicketList;
