import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ticketReservDocument } from '../../../features/show/api/showsDocumentApi';
import Loading from '../../Loading';
import { useParams } from 'react-router-dom';
import {
    getShowDocumentById,
    getShowTicketingById,
    setShowTicketingToCompleted,
} from '../../../features/show/api/showsDocumentApi';
import {
    getDateSeatTickegingFrameDateFormat,
    getDateTimeFormat,
} from '../../../functions/dateFeature';
import './TicketList.css';
import Popup from '../../Popup/Popup';

async function TicketList() {
    const userId = '사용자ID';
    const user = useSelector((state) => state.user.user);
    const showList = useSelector((state) => state.show.showList);
    const [ticketDown, setTicketDown] = useState(false);
    const [ticketingInfo, setTicketingInfo] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [show, setShow] = useState({});
    const [popup, setPopup] = useState({
        open: false,
        message: '',
        callback: false,
    });
    const tickets = await ticketReservDocument(userId);
    const showIds = reservDocs.map((doc) => doc.data().showId);
    // const ticketList = ticketReservDocument.map((value, i) => {
    //     value.docs[i].data().showID, value.docs[i].data().showNum;
    // });
    const onLoading = async () => {
        await getShowTicketingById(id).then((res) => {
            setTicketingInfo(res.data());
            const index = showList.findIndex(
                (element) => element.id === res.data().showId,
            );
            setShow(showList[index]);
            setIsLoaded(true);
            console.log(res.data());
        });
    };
    async function onRefresh() {
        await ticketReservDocument(user.id).then((value) => {
            setTicketList(value);
            setIsLoaded(true);
        });
    }
    useEffect(() => {
        onLoading();
    }, []);
    if (isLoaded) {
        const seatsNameListString = ticketingInfo.seats
            .map((e) => e.name)
            .join(', ');
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
                                {show.title}
                            </div>
                            <div className="ticket-show-time">
                                2023.09.27(토) 22:00
                            </div>
                            {/* <Link
                            to={`/detail/${value.id}`}
                            style={{ textDecoration: 'none' }}
                        ></Link> */}
                            <button className="ticket-show-info">
                                공연정보
                            </button>
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
                                    <div className="enter-time-title">
                                        입장시작
                                    </div>
                                    <div className="enter-time-content">
                                        21:30
                                    </div>
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
    } else {
        return (
            <div>
                <Popup
                    open={popup.open}
                    setPopup={setPopup}
                    message={popup.message}
                    title={popup.title}
                    callback={popup.callback}
                />
            </div>
        );
    }
}

export default TicketList;
