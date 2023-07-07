import React from 'react';
import PropTypes from 'prop-types';
import getShowById from './getShowById';
import './DetailFooter.css';

function DetailFooter({ id }) {
    const show = getShowById(id);

    const schedule = show.schedule.map((value, i) => (
        <option value={i}>
            {i + 1}공 {value.getDate()}
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
    id: PropTypes.node.isRequired,
};

export default DetailFooter;
