import React from 'react';
import './Main.css';

function Main() {
    return (
        <div>
            <h3 className="ticketsOpen">Tickets Open</h3>
            <div>
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
