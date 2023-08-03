import React, { useState, useEffect } from 'react';
import './Seats.css';
import { getShowSeatsByIdAndShowNumberNotExpired } from '../../features/show/api/showsDocumentApi';
import Loading from '../Loading';

const SeatState = {
    AVAILABLE: 0,
    UNAVAILABLE: 1,
    SELECTED: 2,
    PROGRESS: 3,
    COMPLETED: 4,
};

function Seat({ index, name, state, onSeatClick }) {
    switch (state) {
        case SeatState.AVAILABLE:
            return (
                <div
                    className="seat seat-available"
                    name={name}
                    onClick={() => onSeatClick(index, name)}
                />
            );
        case SeatState.UNAVAILABLE:
            return <div className="seat seat-unavailable" name={name} />;
        case SeatState.SELECTED:
            return (
                <div
                    className="seat seat-selected"
                    name={name}
                    onClick={() => onSeatClick(index, name)}
                />
            );
        case SeatState.PROGRESS:
            return <div className="seat seat-progress" name={name} />;
        case SeatState.COMPLETED:
            return (
                <img
                    className="seat seat-completed"
                    name={name}
                    src="/images/seat-completed.svg"
                />
            );
    }
    return <div className="seat seat-unavailable" name={name} />;
}

function Seats({ id, showNum, selected, onSeatClick }) {
    const seat = [];
    const columnNumber = [];
    const [isLoaded, setIsLoaded] = useState(false);
    const [completedSeats, setCompletedSeats] = useState([]);

    const loadSeats = async () => {
        await getShowSeatsByIdAndShowNumberNotExpired(id, showNum).then(
            (res) => {
                setCompletedSeats(
                    res.map((e) => {
                        return { index: Number(e.id), ...e.data() };
                    }),
                );
                setIsLoaded(true);
            },
        );
    };

    useEffect(() => {
        loadSeats();
    }, []);

    if (isLoaded) {
        let index = 0;
        let seatNum;
        for (let i = 0; i < 8; i += 1) {
            seat.push(
                <div key={String.fromCharCode(i + 65)} className="row-alpha">
                    {String.fromCharCode(i + 65)}
                </div>,
            );
            seatNum = 1;
            for (let j = 0; j < 14; j += 1) {
                if (j === 2 || j === 11) {
                    seat.push(<div key={i + j + 300} />);
                } else {
                    const name = `${String.fromCharCode(i + 65)}${seatNum}`;
                    const completedExistIndex = completedSeats.findIndex(
                        (e) => {
                            if (e.index === index && e.name === name)
                                return true;
                        },
                    );
                    if (completedExistIndex > -1) {
                        seat.push(
                            <Seat
                                key={index}
                                index={index}
                                name={name}
                                state={
                                    completedSeats[completedExistIndex].state
                                }
                                onSeatClick={onSeatClick}
                            />,
                        );
                    } else {
                        const selectedExistIndex = selected.findIndex((e) => {
                            if (e.index === index && e.name === name)
                                return true;
                        });
                        seat.push(
                            <Seat
                                key={index}
                                index={index}
                                name={name}
                                state={
                                    selectedExistIndex > -1
                                        ? SeatState.SELECTED
                                        : SeatState.AVAILABLE
                                }
                                onSeatClick={onSeatClick}
                            />,
                        );
                    }
                    index += 1;
                    seatNum += 1;
                }
            }
        }
        for (let i = 0; i < 12; i += 1) {
            columnNumber.push(
                <div key={i} className="col-num">
                    {i + 1}
                </div>,
            );
        }
        columnNumber.splice(2, 0, <div className="col-num" />);
        columnNumber.splice(11, 0, <div className="col-num" />);

        return (
            <div className="seats-container">
                <div className="start" />
                {columnNumber}
                {seat}
            </div>
        );
    } else {
        return <Loading />;
    }
}

export default Seats;
