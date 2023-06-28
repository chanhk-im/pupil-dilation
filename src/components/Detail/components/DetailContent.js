import React from 'react';
import PropTypes from 'prop-types';
import './Detail.css';

function DetailContent({ show }) {
    console.log(show.schedule);
    const schedule = show.schedule.map((value, i) => (
        <div>
            <strong>{i + 1}공</strong> {value}
        </div>
    ));
    return (
        <div className="detail">
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
                        <p className="detail-info">{show.period}</p>
                        <h3 className="detail-title">공연일정</h3>
                        <p className="detail-info">{schedule}</p>
                        <h3 className="detail-title">장소</h3>
                        <p className="detail-info">{show.place}</p>
                        <h3 className="detail-title">가격</h3>
                        <p className="detail-info">{show.price}원</p>
                    </div>
                </div>
                <div className="detail-footer">
                    <div className="calendar">달력</div>
                    <div className="calendar-setting">
                        <div>dd</div>
                        <div>dd</div>
                        <div>dd</div>
                        <div>dd</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
DetailContent.propTypes = {
    show: PropTypes.node.isRequired,
};

export default DetailContent;
