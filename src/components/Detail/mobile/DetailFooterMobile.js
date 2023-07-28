import React from 'react';
import PropTypes from 'prop-types';
import useShowById from '../../../hooks/useShowById';
import './DetailFooterMobile.css';
import { getDateScheduleFormat } from '../../../functions/dateFeature';

function DetailFooterMobile({ id }) {
    const show = useShowById(id);

    const schedule = show.schedule.map((value, i) => (
        <option value={i}>
            {i + 1}공 {getDateScheduleFormat(value)}
        </option>
    ));
    return (
        <div className="detailpage-button-mobile">
            <select name="schedule" className="schedule-button-mobile">
                {schedule}
            </select>
            <button
                type="button"
                className="revervation-button-mobile"
                onClick={() => {}}
            >
                예매하기
            </button>
        </div>
    );
}
DetailFooterMobile.propTypes = {
    id: PropTypes.node.isRequired,
};

export default DetailFooterMobile;
