import React from 'react';
import {
    createShowSeatsToProgress,
    getShowDocumentById,
    getShowSeatsByIdAndShowNumber,
} from '../../features/show/api/showsDocumentApi';
import './SeatTicketingFrame.css';
import useShowById from '../../hooks/useShowById';
import {
    getDateSeatTickegingFrameDateFormat,
    getDateTimeFormat,
} from '../../functions/dateFeature';

function SeatTicketingFrame({ id, selected, completedSeats, user }) {
    const show = useShowById(id);
    const selectedName = selected.map((e) => (
        <div key={e.index}>
            {e.name}
            {', '}
        </div>
    ));
    return (
        <div className="seat-ticketing-frame">
            <img
                className="seat-show-poster"
                src={show.imageDownloaded ? show.image : '/images/Dongari3.jpg'}
            />
            <div className="seat-show-title">{show.title}</div>
            <div className="seat-show-schedule">
                <div>
                    {getDateSeatTickegingFrameDateFormat(show.schedule[0])}
                </div>
                <div>{getDateTimeFormat(show.schedule[0])}</div>
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
                    <div className="seat-final-check-content-text seat-final-check-content-selected-name">
                        {selectedName}
                    </div>
                </div>
                <div className="seat-final-check-content">
                    <div className="seat-final-check-title-text">
                        최종결제금액
                    </div>
                    <div className="seat-final-check-content-text">
                        {show.price * selected.length}원
                    </div>
                </div>
            </div>
            <button
                type="button"
                className="seat-ticketing-submit"
                onClick={async () => {
                    const res = await getShowSeatsByIdAndShowNumber(id, 1);
                    let flag = false;
                    selected.forEach((e) => {
                        if (
                            res.findIndex((resE) => {
                                return e.index.toString() === resE.id;
                            }) > -1
                        ) {
                            flag = true;
                        }
                    });
                    console.log(res);
                    if (!flag)
                        await createShowSeatsToProgress(
                            id,
                            1,
                            selected,
                            user.id,
                        )
                            .then(() => alert('성공'))
                            .catch((e) => {
                                alert(e);
                            });
                    else {
                        alert('이미 예매되었거나 예매 진행중인 좌석입니다.');
                    }
                }}
            >
                결제하기
            </button>
        </div>
    );
}

export default SeatTicketingFrame;
