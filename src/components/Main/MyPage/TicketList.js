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
} from '../../../functions/dateFeature';
import './TicketList.css';
import Popup from '../../Popup/Popup';
import TicketComponent from './TicketComponent';

function TicketList() {
    const user = useSelector((state) => state.user.user);
    const showList = useSelector((state) => state.show.showList);
    const [ticketDown, setTicketDown] = useState(false);
    const [ticketingInfo, setTicketingInfo] = useState([]);
    const [ticketComponentList, setTicketComponentList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [show, setShow] = useState({});
    const [popup, setPopup] = useState({
        open: false,
        message: '',
        callback: false,
    });
    let tickets;

    //const showIds = reservDocs.map((doc) => doc.data().showId);
    // const ticketList = ticketReservDocument.map((value, i) => {
    //     value.docs[i].data().showID, value.docs[i].data().showNum;
    // });

    const onLoading = async () => {
        tickets = await ticketReservDocument(user.id);
        await getShowTicketingByUserIdNotExpired(user.id).then((res) => {
            const ticketingData = res.docs.map((e) => e.data());
            setTicketingInfo(ticketingData);
            let tempList = [];
            ticketingData.forEach((ticketingE) => {
                console.log(ticketingE);
                const show = showList.find(
                    (showE) => showE.id === ticketingE.showId,
                );
                console.log(show);
                tempList.push(
                    <TicketComponent show={show} ticketingData={ticketingE} />,
                );
            });
            setTicketComponentList(tempList);
            setIsLoaded(true);
        });
    };

    // async function onRefresh() {
    //     await ticketReservDocument(user.id).then((value) => {
    //         setTicketList(value);
    //         setIsLoaded(true);
    //     });
    // }

    useEffect(() => {
        onLoading();
    }, []);

    if (isLoaded) {
        return (
            <div className="user-mypage-container">
                <div className="ticket-list">
                    <div className="ticket-reservation">예매내역</div>
                    <div>{ticketComponentList}</div>
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
