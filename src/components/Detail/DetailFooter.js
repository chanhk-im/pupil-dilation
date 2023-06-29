import React from 'react';
import PropTypes from 'prop-types';
import './DetailFooter.css';

function DetailFooter({ show }) {
    const schedule = show.schedule.map((value, i) => (
        <option value={i}>
            {i + 1}공 {value}
        </option>
    ));
    return (
        <div className="detail-footer">
            <select name="schedule" className="select-schedule">
                {schedule}
            </select>
            <button
                type="button"
                onClick={() => {}}
                className="ticketing-button"
            >
                예매하기
            </button>
        </div>
    );
}
DetailFooter.propTypes = {
    show: PropTypes.node.isRequired,
};

export default DetailFooter;
