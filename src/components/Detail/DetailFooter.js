import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import useShowById from '../../hooks/useShowById';
import './DetailFooter.css';
import { getDateScheduleFormat } from '../../functions/dateFeature';

function DetailFooter({ id }) {
    const show = useShowById(id);
    const navigate = useNavigate();
    const isLogged = useSelector((state) => state.user.isLogged);

    const schedule = show.schedule.map((value, i) => (
        <option value={i + 1}>
            {i + 1}공 {getDateScheduleFormat(value)}
        </option>
    ));
    return (
        <div className="detail-footer">
            <select name="schedule" className="select-schedule">
                {schedule}
            </select>
            <button
                type="button"
                onClick={() => {
                    if (isLogged)
                        navigate('/seats/' + id);
                    else
                    {
                        alert('로그인해라');
                        navigate('/login');
                    }
                }}
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
