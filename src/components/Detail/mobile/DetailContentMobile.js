import React from 'react';
import PropTypes from 'prop-types';
import useShowById from '../../../hooks/useShowById';
import './DetailContentMobile.css';
import {
    getDateShortFormat,
    getDateScheduleFormat,
} from '../../../functions/dateFeature';

function DetailContentMobile({ id }) {
    const show = useShowById(id);

    const schedule = show.schedule.map((value, i) => (
        <div>
            <strong>{i + 1}공</strong> {getDateScheduleFormat(value)}
        </div>
    ));

    return (
        <div className="detail-container-mobile">
            <p className="event-title-mobile">{show.title}</p>
            <div>
                <div className="first-detail-mobile">
                    {show.imageDownloaded ? (
                        <img
                            className="event-image-mobile"
                            src={show.image}
                            alt={show.title}
                        />
                    ) : (
                        <img src="images/Dongari3.jpg" alt={show.title} />
                    )}
                    <div className="second-detail-mobile">
                        <div>
                            <p className="content-title">가격</p>
                            <p>{show.price}원</p>
                        </div>
                        <div>
                            <p className="content-title">장소</p>
                            <p>{show.place}</p>
                        </div>
                        <div>
                            <p className="content-title">공연기간</p>
                            <p>
                                {getDateShortFormat(show.startDate)} ~{' '}
                                {getDateShortFormat(show.endDate)}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="third-detail-mobile">
                    <div>
                        <p className="content-title">소개</p>
                        <div>{show.introduction}</div>
                    </div>
                    <p className="content-title">공연일정</p>
                    <p>{schedule}</p>
                </div>
            </div>
        </div>
    );
}
DetailContentMobile.propTypes = {
    id: PropTypes.node.isRequired,
};

export default DetailContentMobile;
