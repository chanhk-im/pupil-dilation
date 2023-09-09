import React from 'react';
import PropTypes from 'prop-types';
import './HostEventContent.css';
import {
    getDateShortFormat,
    getDateScheduleFormat,
} from '../../functions/dateFeature';

function HostEventContent({ show }) {
    console.log(show.image);
    const schedule = show.schedule.map((value, i) => (
        <div>
            <strong>{i + 1}공</strong> {getDateScheduleFormat(value)}
        </div>
    ));
    return (
        <div className="detail-contents-host">
            <div className="information-host">
                {show.imageDownloaded ? (
                    <img
                        className="show-image-host"
                        src={show.image}
                        alt={show.title}
                    />
                ) : (
                    <img
                        className="show-image-host"
                        src="/images/Dongari3.jpg"
                        alt={show.title}
                    />
                )}
                <div className="show-main-host">
                    <h2 className="show-title-host">{show.title}</h2>
                    <h3 className="info-title-host">소개</h3>
                    <div className="info-content-host">{show.introduction}</div>
                </div>
                <div className="show-detail-host">
                    <h3 className="detail-title-host">공연기간</h3>
                    <p className="detail-info-period-host">
                        {getDateShortFormat(show.startDate)} ~{' '}
                        {getDateShortFormat(show.endDate)}
                    </p>
                    <div className="place-and-price-host">
                        <div className="show-detail-content-host">
                            <h3 className="detail-title-host">가격</h3>
                            <p className="detail-info-host">{show.price}원</p>
                        </div>
                        <div className="show-detail-content-host">
                            <h3 className="detail-title-host">장소</h3>
                            <p className="detail-info-host">{show.place}</p>
                        </div>
                    </div>
                    <h3 className="detail-title-host">공연일정</h3>
                    <p className="detail-info-host">{schedule}</p>
                </div>
            </div>
        </div>
    );
}
HostEventContent.propTypes = {
    show: PropTypes.node.isRequired,
};

export default HostEventContent;
