import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShowList } from '../features/show/slices/showSlice';
import './Main.css';
import getShows from '../features/show/api/getShows';

function Main() {
    const dispatch = useDispatch();
    const showList = useSelector((state) => state.show.showList);
    async function onRefresh() {
        await getShows().then((value) => {
            dispatch(fetchShowList(value));
            console.log(showList[0]);
        });
    }

    useEffect(() => {
        onRefresh();
    }, []);

    return (
        <div>
            <h3 className="ticketsOpen">Tickets Open</h3>
            <div className="eventBoard">
                <div className="eventSlot">
                    <img
                        className="eventImage"
                        src="images/Dongari1.png"
                        alt="Image1"
                    />
                    <p className="eventName">
                        <strong>즉새두의 야간 작업실</strong>
                    </p>
                    <p>2023.06.18(일) 22:00</p>
                </div>
                <div className="eventSlot">
                    <img
                        className="eventImage"
                        src="images/Dongari2.jpg"
                        alt="Image2"
                    />
                    <p className="eventName">
                        <strong>NEO 카페 in Seoul</strong>
                    </p>
                    <p>2023.07.15(토) 17:00</p>
                </div>
                <div className="eventSlot">
                    <img
                        className="eventImage"
                        src="images/Dongari3.jpg"
                        alt="Image3"
                    />
                    <p className="eventName">
                        <strong>메두사의 뗏목</strong>
                    </p>
                    <p>2023.06.08(목) 22:00</p>
                </div>
                <div className="eventSlot">
                    <img
                        className="eventImage"
                        src="images/Dongari4.jpg"
                        alt="Image4"
                    />
                    <p className="eventName">
                        <strong>NEO X Soul Connetion</strong>
                    </p>
                    <p>2023.06.03(토) 19:00</p>
                </div>
            </div>
        </div>
    );
}

export default Main;
