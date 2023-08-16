import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from '../../Popup/Popup';
import './desktop/PaymentPageDesktop.css';
import { deleteSeat } from '../../../features/user/api/firebase_auth';

function Timer({ seconds, id }) {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(seconds);
    const [isExpired, setIsExpired] = useState(false);
    const timeLeftRef = useRef(timeLeft);
    const [popup, setPopup] = useState({
        open: false,
        message: '',
        callback: false,
    });
    useEffect(() => {
        timeLeftRef.current = timeLeft;
    }, [timeLeft]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prevTimeLeft) => {
                const newTimeLeft = prevTimeLeft - 1;

                if (newTimeLeft <= -1) {
                    clearInterval(interval);
                    setIsExpired(true);
                    deleteSeat(id);
                    setPopup({
                        open: true,
                        message: '시간이 만료되었습니다.',
                        callback: () => navigate('/'),
                    });
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
            <Popup
                open={popup.open}
                setPopup={setPopup}
                message={popup.message}
                callback={popup.callback}
            />
            {timeLeftRef.current > 0 ? (
                <p>{formatTime(timeLeftRef.current)}</p>
            ) : (
                <p>Timer expired</p>
            )}
        </div>
    );
}

export default Timer;
