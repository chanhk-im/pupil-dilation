import React from 'react';
import PropTypes from 'prop-types';
import getShowById from './getShowByIndex';
import './DetailContent.css';

function DetailContent({ id }) {
    const show = getShowById(id);

    const schedule = show.schedule.map((value, i) => (
        <div>
            <strong>{i + 1}공</strong> {value}
        </div>
    ));

    return (
        <div className="detail-contents">
            <div className="information">
                <div className="show-image" />
                <div className="show-main">
                    <h2 className="show-title">{show.title}</h2>
                    <h3 className="info-title">소개</h3>
                    <div className="info-content">{show.introduction}</div>
                </div>
                <div className="show-detail">
                    <h3 className="detail-title">공연기간</h3>
                    <p className="detail-info-period">{show.period}</p>
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
DetailContent.propTypes = {
    id: PropTypes.node.isRequired,
};

export default DetailContent;
