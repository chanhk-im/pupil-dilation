import React from 'react';
import './SeatTicketingFrame.css';

function SeatTicketingFrame() {
    return (
        <div className="seat-ticketing-frame">
            <div className="seat-show-poster" />
            <div className="seat-show-title">공연 제목</div>
            <div className="seat-show-schedule">
                <div>05/18 (일)</div>
                <div>20:00</div>
            </div>
            <div className="seat-num-people-title">관람인원 선택</div>
            <div className="seat-num-people">
                <div className="seat-plus-minus">-</div>
                <div className="seat-number">1</div>
                <div className="seat-plus-minus">+</div>
            </div>
            <div className="seat-final-check">
                <div className="seat-final-check-content">
                    <div className="seat-final-check-title-text">선택좌석</div>
                    <div className="seat-final-check-content-text">A8</div>
                </div>
                <div className="seat-final-check-content">
                    <div className="seat-final-check-title-text">
                        최종결제금액
                    </div>
                    <div className="seat-final-check-content-text">5000원</div>
                </div>
            </div>
            <button type="button" className="seat-ticketing-submit">
                결제하기
            </button>
        </div>
    );
}

export default SeatTicketingFrame;
