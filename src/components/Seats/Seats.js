import React from 'react';
import './Seats.css';
import PropTypes from 'prop-types';

function Seat({ index }) {
    return <div id={index} className="seat" />;
}
Seat.propTypes = {
    index: PropTypes.number.isRequired,
};

function Seats() {
    const seat = [];
    const columnNumber = [];
    let index = 0;
    for (let i = 0; i < 8; i += 1) {
        seat.push(
            <div className="row-alpha">{String.fromCharCode(i + 65)}</div>,
        );
        for (let j = 0; j < 14; j += 1) {
            if (j === 2 || j === 11) {
                seat.push(<div />);
            } else {
                seat.push(<Seat index={index} />);
                index += 1;
            }
        }
    }
    for (let i = 0; i < 12; i += 1) {
        columnNumber.push(<div className="col-num">{i + 1}</div>);
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
}

export default Seats;
