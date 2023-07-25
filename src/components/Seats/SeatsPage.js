import React from 'react';
import Seats from './Seats';
import SeatTicketingFrame from './SeatTicketingFrame';
import './SeatsPage.css';

function SeatsPage() {
    return (
        <div className="seats-page">
            <div className="seats-left">
                <h2 className="seats-select-text">좌석 선택</h2>
                <div className="seats-place-name">ANH 오디토리움</div>
                <div className="seats-stage">STAGE</div>
                <Seats />
                <div className="seats-type-grid">
                    <div className="seats-type-content">
                        <div className="seats-type-box seats-type-box-selected" />
                        <div>선택한 좌석</div>
                    </div>
                    <div className="seats-type-content">
                        <div className="seats-type-box seats-type-box-available" />
                        <div>선택가능</div>
                    </div>
                    <div className="seats-type-content">
                        <div className="seats-type-box seats-type-box-ticketed" />
                        <div>예매완료</div>
                    </div>
                    <div />
                    <div className="seats-type-content">
                        <div className="seats-type-box seats-type-box-not-available" />
                        <div>선택불가</div>
                    </div>
                    <div className="seats-type-content">
                        <div className="seats-type-box seats-type-box-proceeding" />
                        <div>예매중</div>
                    </div>
                </div>
            </div>

            <SeatTicketingFrame />
        </div>
    );
}

export default SeatsPage;
