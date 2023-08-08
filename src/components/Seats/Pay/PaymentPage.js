import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
    getShowDocumentById,
    getShowTicketingById,
    setShowTicketingToCompleted,
} from '../../../features/show/api/showsDocumentApi';
import Loading from '../../Loading';
import { useSelector } from 'react-redux';
import {
    getDateSeatTickegingFrameDateFormat,
    getDateTimeFormat,
} from '../../../functions/dateFeature';
import Popup from '../../Popup/Popup';
import Timer from './Timer';
import React from 'react';
import Desktop from '../../MediaQuery/Desktop';
import Mobile from '../../MediaQuery/Mobile';
import PaymentPageDesktop from './desktop/PaymentPageDesktop';
import PaymentPageMobile from './mobile/PaymentPageMobile';

function PaymentPage() {
    const timerSeconds = 15 * 60;
    const { id } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const [ticketingInfo, setTicketingInfo] = useState({});
    const [show, setShow] = useState({});
    const [popup, setPopup] = useState({
        open: false,
        message: '',
        callback: false,
    });

    const showList = useSelector((state) => state.show.showList);

    const onLoading = async () => {
        await getShowTicketingById(id).then((res) => {
            setTicketingInfo(res.data());
            const index = showList.findIndex(
                (element) => element.id === res.data().showId,
            );
            setShow(showList[index]);
            setIsLoaded(true);
            const expireDate = new Date(Date.now());
            expireDate.setMinutes(expireDate.getMinutes() - 15);
            if (expireDate > res.data().time.toDate()) {
                console.log(expireDate + ', ' + res.data().time.toDate());
                setPopup({
                    open: true,
                    message: '15분 지났다구리',
                });
            }
        });
    };

    const onButtonClick = async () => {
        await setShowTicketingToCompleted(id, ticketingInfo).then(() => {
            setPopup({
                open: true,
                message: '예매 완료됐다구리',
            });
        });
    };

    useEffect(() => {
        onLoading();
    }, []);
    if (isLoaded) {
        const seatsNameListString = ticketingInfo.seats
            .map((e) => e.name)
            .join(', ');
        return (
            <div className="payment-container">
                <Popup
                    open={popup.open}
                    setPopup={setPopup}
                    message={popup.message}
                    title={popup.title}
                    callback={popup.callback}
                />
                <div className="pay-ticket">
                    <div className="ticket-white">
                        <h3 className="event-title">{show.title}</h3>
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
                                        {getDateSeatTickegingFrameDateFormat(
                                            show.schedule[
                                                ticketingInfo.showNum - 1
                                            ],
                                        )}
                                    </div>
                                </div>
                                <div className="timeLine">
                                    <div className="timeLine-title">시간</div>
                                    <div className="timeLine-content">
                                        {getDateTimeFormat(
                                            show.schedule[
                                                ticketingInfo.showNum - 1
                                            ],
                                        )}
                                    </div>
                                </div>
                                <div className="seatLine">
                                    <div className="seatLine-title">
                                        좌석수/번호
                                    </div>
                                    <div className="seatLine-content">
                                        {ticketingInfo.seats.length} /{' '}
                                        {seatsNameListString}
                                    </div>
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
                                <div className="final-title-content">
                                    {ticketingInfo.seats.length * show.price}원
                                </div>
                                <Timer
                                    className="timer"
                                    seconds={timerSeconds}
                                />
                            </div>
                            <div className="account">
                                <div className="account-title">입금계좌</div>
                                <div className="account-content">
                                    {show.bankName} {show.bankNumber}
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
                                id="send-yes"
                                type="checkbox"
                                className="send-box"
                            />
                            <label for="send-yes" />
                            <p className="send-text">송금을 완료했습니다.</p>
                            <p className="send-alert">
                                예금주 명으로 송금확인이 되지 않거나 송금된
                                금액이 틀린 경우 예매가 취소될 수 있습니다.
                                송금계좌는 환불계좌로 사용됩니다.
                            </p>
                        </div>
                        <button type="button" className="payment-submit">
                            예매 완료
                        </button>
                    </div>
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
