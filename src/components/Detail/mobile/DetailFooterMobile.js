import React from 'react';
import PropTypes from 'prop-types';
import getShowById from '../getShowById';
import './DetailFooterMobile.css';
import { getDateScheduleFormat } from '../../../functions/dateFeature';

function DetailFooterMobile({ id }) {
    const show = getShowById(id);

    const schedule = show.schedule.map((value, i) => (
        <option value={i}>
            {i + 1}공 {getDateScheduleFormat(value)}
        </option>
    ));
    return (
        <div>
            <select name="schedule">{schedule}</select>
            <button type="button" onClick={() => {}}>
                예매하기
            </button>
        </div>
    );
}
DetailFooterMobile.propTypes = {
    id: PropTypes.node.isRequired,
};

export default DetailFooterMobile;
