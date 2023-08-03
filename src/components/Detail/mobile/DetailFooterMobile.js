import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import useShowById from '../../../hooks/useShowById';
import './DetailFooterMobile.css';
import { getDateScheduleFormat } from '../../../functions/dateFeature';
import Popup from '../../Popup/Popup';

function DetailFooterMobile({ id }) {
    const show = useShowById(id);
    const navigate = useNavigate();
    const isLogged = useSelector((state) => state.user.isLogged);
    const [popup, setPopup] = useState({
        open: false,
        message: '',
        callback: false,
    });

    const schedule = show.schedule.map((value, i) => (
        <option value={i}>
            {i + 1}공 {getDateScheduleFormat(value)}
        </option>
    ));
    return (
        <div className="detailpage-button-mobile">
            <Popup
                open={popup.open}
                setPopup={setPopup}
                message={popup.message}
                title={popup.title}
                callback={popup.callback}
            />
            <select name="schedule" className="schedule-button-mobile">
                {schedule}
            </select>
            <button
                type="button"
                className="revervation-button-mobile"
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
