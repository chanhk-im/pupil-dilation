import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from '../../Popup/Popup';
import './desktop/PaymentPageDesktop.css';
import { deleteSeat } from '../../../features/user/api/firebase_auth';

export function Timer({ seconds, id, remit }) {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(seconds);
    const [isExpired, setIsExpired] = useState(false);
    const timeLeftRef = useRef(timeLeft);
    const [popup, setPopup] = useState({
        open: false,
        message: '',
        callback: false,
    });

    const handleDeleteSeat = async () => {
        try {
            await deleteSeat(id);
            setPopup({
                open: true,
                message: '시간이 만료되었습니다.',
                callback: () => navigate('/'),
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        timeLeftRef.current = timeLeft;
    }, [timeLeft]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(prevTimeLeft => {
                const newTimeLeft = prevTimeLeft - 1;
                if (newTimeLeft <= -1) {
                    clearInterval(interval);
                    setIsExpired(true);

                    if (!remit) {
                        handleDeleteSeat();
                    } else {
                        setPopup({
                            open: true,
                            message: '주최자가 송금을 확인 중입니다.',
                            callback: () => navigate('/'),
                        });
                    }
                }
                return newTimeLeft;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [remit, handleDeleteSeat]);

    const formatTime = time => {
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