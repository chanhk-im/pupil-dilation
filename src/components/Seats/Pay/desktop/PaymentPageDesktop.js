import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
    getShowDocumentById,
    getShowTicketingById,
    setShowTicketingToCompleted,
} from '../../../../features/show/api/showsDocumentApi';
import Loading from '../../../Loading';
import { useSelector } from 'react-redux';
import {
    getDateSeatTickegingFrameDateFormat,
    getDateTimeFormat,
} from '../../../../functions/dateFeature';
import Popup from '../../../Popup/Popup';
import Timer from '../Timer';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentPageDesktop.css';

function PaymentPageDesktop() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const [ticketingInfo, setTicketingInfo] = useState({});
    const [sendName, setSendName] = useState('');
    const [sendBank, setSendBank] = useState('');
    const [sendAccount, setSendAccount] = useState('');
    const [myTimer, setMyTimer] = useState(0);
    const [show, setShow] = useState({});
    const [popup, setPopup] = useState({
        open: false,
        message: '',
        callback: false,
    });
    const [data, setData] = useState({});

    const showList = useSelector((state) => state.show.showList);

    const onLoading = async () => {
        console.log(id);
        await getShowTicketingById(id).then((res) => {
            const ticketingData = res.data();

            if (!ticketingData || !ticketingData.showId) {
                setPopup({
                    open: true,
                    message: '페이지를 불러올 수 없습니다.',
                    callback: () => navigate('/'),
                });
                return;
            }
            setTicketingInfo(res.data());
            const index = showList.findIndex(
                (element) => element.id === res.data().showId,
            );
            setShow(showList[index]);
            setIsLoaded(true);
            console.log(res.data());
            setData(res.data());
            console.log(data);

            const expireDate = new Date(Date.now());
            expireDate.setMinutes(expireDate.getMinutes());
            setMyTimer((expireDate - res.data().time.toDate()) / 1000);
        });
    };
    const remit = data.remitted;
    const timerSeconds = 15 * 60 - myTimer;
    const onButtonClick = async () => {
        if (!sendName || !sendBank || !sendAccount) {
            setPopup({
                open: true,
                message: '송금정보를 모두 입력해주세요.',
            });
            return;
        }

        await setShowTicketingToCompleted(id, {
            ...ticketingInfo,
            sendName: sendName,
            sendBank: sendBank,
            sendAccount: sendAccount,
        }).then(() => {
            setPopup({
                open: true,
                message: '예약되었습니다.',
                callback: () => navigate('/mypage'),
            });
        });
    };
    const onChangeAccount = (e) => {
        setNewUserInfo({
            ...newUserInfo,
            [e.target.name]: e.target.value,
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
                                <div className="timer">
                                    <Timer
                                        seconds={timerSeconds}
                                        id={id}
                                        remit={remit}
                                    />
                                </div>
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
                                    value={sendName}
                                    onChange={(e) =>
                                        setSendName(e.target.value)
                                    }
                                />
                                <input
                                    className="sending-bank"
                                    type="text"
                                    name="bank"
                                    placeholder="은행명 입력"
                                    value={sendBank}
                                    onChange={(e) =>
                                        setSendBank(e.target.value)
                                    }
                                />
                                <input
                                    className="sending-account"
                                    type="number"
                                    name="account"
                                    placeholder="계좌번호 입력"
                                    value={sendAccount}
                                    onChange={(e) =>
                                        setSendAccount(e.target.value)
                                    }
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
                        <button
                            type="button"
                            className="payment-submit"
                            onClick={onButtonClick}
                        >
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
}

export default PaymentPageDesktop;
