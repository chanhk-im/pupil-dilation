import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ticketReservDocument } from '../../../features/show/api/showsDocumentApi';
import Loading from '../../Loading';
import { useParams } from 'react-router-dom';
import {
    getShowDocumentById,
    getShowTicketingById,
    getShowTicketingByUserIdNotExpired,
} from '../../../features/show/api/showsDocumentApi';
import {
    getDateSeatTickegingFrameDateFormat,
    getDateTimeFormat,
    getDateFormat,
} from '../../../functions/dateFeature';
import './TicketList.css';
import Popup from '../../Popup/Popup';

function TicketComponent({ show, ticketingData }) {
    const [ticketDown, setTicketDown] = useState(false);
    const seatsNameListString = ticketingData.seats
        .map((e) => e.name)
        .join(', ');
    return (
        <div className="opened-ticket">
            <div className="opened-ticket-high">
                <button
                    className="arrow"
                    onClick={() => {
                        setTicketDown((ticketDown) => !ticketDown);
                    }}
                >
                    {ticketDown ? (
                        <img src="/images/arrow-right.svg" alt="arrow-right" />
                    ) : (
                        <img src="/images/arrow-down.svg" alt="arrow-down" />
                    )}
                </button>
                <div className="ticket-show-title">{show.title}</div>
                <div className="ticket-show-time">
                    {getDateFormat(show.schedule[ticketingData.showNum - 1])}
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
                    {show.imageDownloaded ? (
                        <img
                            className="dongari1"
                            src={show.image}
                            alt="즉새두"
                        />
                    ) : (
                        <img
                            className="dongari1"
                            src="/images/loadImage.png"
                            alt="즉새두"
                        />
                    )}

                    <div className="seat-data">{seatsNameListString}</div>
                </div>
                <div className="ticket-hidden-middle">
                    <div className="location">
                        <div className="location-title">장소</div>
                        <div className="location-content">{show.place}</div>
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
                <div className="ticket-hidden-right">
                    <div className="ticket-hidden-right-text">
                        {ticketingData.remitted ? '결제완료' : '결제확인중'}
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default TicketComponent;
