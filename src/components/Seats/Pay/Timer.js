import React, { useState, useEffect, useRef } from 'react';
import './PaymentPage.css';

function Timer({ seconds }) {
    const [timeLeft, setTimeLeft] = useState(seconds);
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
                }

                return newTimeLeft;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (timeLeft === 0) {
            console.log('Timer expired');
        }
    }, [timeLeft]);

    const formatTime = (time) => {
        const date = new Date(time * 1000);
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        const seconds = date.getUTCSeconds().toString().padStart(2, '0');

        return `${minutes}:${seconds}`;
    };

    return (
        <div className="timer">
            {timeLeftRef.current > 0 ? (
                <p>{formatTime(timeLeftRef.current)}</p>
            ) : (
                <p>Timer expired</p>
            )}
        </div>
    );
}

export default Timer;
