import React, { useState, useEffect, useRef } from 'react';
import Popup from '../../Popup/Popup';
import './desktop/PaymentPageDesktop.css';

function Timer({ seconds }) {
    const [timeLeft, setTimeLeft] = useState(seconds);
    const [isExpired, setIsExpired] = useState(false);
    const timeLeftRef = useRef(timeLeft);

    useEffect(() => {
        timeLeftRef.current = timeLeft;
    }, [timeLeft]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prevTimeLeft) => {
                const newTimeLeft = prevTimeLeft - 1;

                if (newTimeLeft <= 0) {
                    clearInterval(interval);
                    setIsExpired(true);
                }

                return newTimeLeft;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (time) => {
        const date = new Date(time * 1000);
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        const seconds = date.getUTCSeconds().toString().padStart(2, '0');

        return `${minutes}:${seconds}`;
    };

    return (
        <div>
            {timeLeftRef.current > 0 ? (
                <p>{formatTime(timeLeftRef.current)}</p>
            ) : (
                <p>Timer expired</p>
            )}
            {isExpired && <Popup message="15분이 지났습니다." />}
        </div>
    );
}

export default Timer;
