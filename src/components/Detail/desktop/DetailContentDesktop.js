import React from 'react';
import PropTypes from 'prop-types';
import './DetailContentDesktop.css';
import useShowById from '../../../hooks/useShowById';
import {
    getDateShortFormat,
    getDateScheduleFormat,
} from '../../../functions/dateFeature';

function DetailContentDesktop({ id }) {
    const show = useShowById(id);

    const schedule = show.schedule.map((value, i) => (
        <div>
            <strong key={i}>{i + 1}공</strong> {getDateScheduleFormat(value)}
        </div>
    ));

    return (
        <div className="detail-contents">
            <div className="information">
                {show.imageDownloaded ? (
                    <img
                        className="show-image"
                        src={show.image}
                        alt={show.title}
                    />
                ) : (
                    <img
                        className="eventImage"
                        src="images/Dongari3.jpg"
                        alt={show.title}
                    />
                )}
                <div className="show-title">{show.title}</div>
                <div className="show-main">
                    <h3 className="info-title">소개</h3>
                    <div className="info-content">{show.introduction}</div>
                </div>
                <div className="show-detail">
                    <h3 className="detail-title">공연기간</h3>
                    <p className="detail-info-period">
                        {getDateShortFormat(show.startDate)} ~{' '}
                        {getDateShortFormat(show.endDate)}
                    </p>
                    <div className="place-and-price">
                        <div className="show-detail-content">
                            <h3 className="detail-title">가격</h3>
                            <p className="detail-info">{show.price}원</p>
                        </div>
                        <div className="show-detail-content">
                            <h3 className="detail-title">장소</h3>
                            <p className="detail-info">{show.place}</p>
                        </div>
                    </div>
                    <h3 className="detail-title">공연일정</h3>
                    <p className="detail-info">{schedule}</p>
                </div>
            </div>
        </div>
    );
}
DetailContentDesktop.propTypes = {
    id: PropTypes.node.isRequired,
};

export default DetailContentDesktop;
