import React from 'react';
import './Seats.css';

function Seats() {
    const seat = [];
    let index = 0;
    for (let i = 0; i < 8; i += 1) {
        seat.push(<div>{i + 1}</div>);
        for (let j = 0; j < 14; j += 1) {
            if (j === 2 || j === 11) {
                seat.push(<div />);
            } else {
                seat.push(<div id={index} className="seat" />);
                index += 1;
            }
        }
    }
    return (
        <div className="container">
            <div className="seats-container">
                <div />
                <div>1</div>
                <div>2</div>
                <div />
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
                <div>7</div>
                <div>8</div>
                <div>9</div>
                <div>10</div>
                <div />
                <div>11</div>
                <div>12</div>
                {seat}
            </div>
        </div>
    );
}

export default Seats;
