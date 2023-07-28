import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import './DetailFooterDesktop.css';
import { getDateScheduleFormat } from '../../../functions/dateFeature';
import useShowById from '../../../hooks/useShowById';
import Popup from '../../Popup/Popup';

function DetailFooterDesktop({ id }) {
    const show = useShowById(id);
    const navigate = useNavigate();
    const isLogged = useSelector((state) => state.user.isLogged);
    const [popup, setPopup] = useState({
        open: false,
        message: '',
        callback: false,
    });

    const schedule = show.schedule.map((value, i) => (
        <option value={i + 1}>
            {i + 1}공 {getDateScheduleFormat(value)}
        </option>
    ));
    return (
        <div className="detail-footer">
            <Popup
                open={popup.open}
                setPopup={setPopup}
                message={popup.message}
                title={popup.title}
                callback={popup.callback}
            />
            <select name="schedule" className="select-schedule">
                {schedule}
            </select>
            <button
                type="button"
                onClick={() => {
                    if (isLogged) navigate('/seats/' + id);
                    else {
                        setPopup({
                            open: true,
                            message: '로그인해라',
                            callback: () => navigate('/login'),
                        });
                    }
                }}
                className="ticketing-button"
            >
                예매하기
            </button>
        </div>
    );
}
DetailFooterDesktop.propTypes = {
    id: PropTypes.node.isRequired,
};

export default DetailFooterDesktop;
