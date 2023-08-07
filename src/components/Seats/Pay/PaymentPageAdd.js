import React, { useEffect, useState } from 'react';
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

/*eslint-disable*/
function PaymentPageAdd() {
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
            <div>
                <Popup
                    open={popup.open}
                    setPopup={setPopup}
                    message={popup.message}
                    title={popup.title}
                    callback={popup.callback}
                />
                <div>{show.title}</div>
                <div>날짜</div>
                <div>
                    {getDateSeatTickegingFrameDateFormat(
                        show.schedule[ticketingInfo.showNum - 1],
                    )}
                </div>
                <div>시간</div>
                <div>
                    {getDateTimeFormat(
                        show.schedule[ticketingInfo.showNum - 1],
                    )}
                </div>
                <div>좌석수/번호</div>
                <div>
                    {ticketingInfo.seats.length} / {seatsNameListString}
                </div>
                <div>최종결제금액</div>
                <div>{ticketingInfo.seats.length * show.price}원</div>
                <div>입금계좌</div>
                <div>
                    {show.bankName} {show.bankNumber}
                </div>
                <button onClick={onButtonClick}>예매 완료</button>
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

export default PaymentPageAdd;
