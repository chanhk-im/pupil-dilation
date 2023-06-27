import React from 'react';
import './Detail.css';

function Detail() {
    return (
        <div className="detail">
            <div className="detail-contents">
                <div className="information">
                    <div className="show-image" />
                    <div className="show-main">
                        <h2 className="show-title">공연 제목</h2>
                        <h3 className="info-title">소개</h3>
                        <div className="info-content">
                            <p>
                                뇌척수막염 후유증으로 물리적인 고통을 받고 있던
                                앙토냉 아르토. 야심차게 준비해 온 공연이 처참히
                                무너지자 정신착란 증세를 겪게 된다.
                                <br /> 그는 결국 정신병원에 갇히고, 정기적인
                                전기치료를 받게 된다. 그 고통 속에서 빈센트 반
                                고흐를 발견하는 기이한 체험을 한다.
                            </p>
                        </div>
                    </div>
                    <div className="show-detail">
                        <h3 className="detail-title">공연기간</h3>
                        <p className="detail-info">2023.05.18 ~ 2023.05.19</p>
                        <h3 className="detail-title">공연일정</h3>
                        <p className="detail-info">
                            <strong className="bold">1공</strong> (5/18 일)
                            20:00
                            <br />
                            <strong className="bold">2공</strong> (5/19 월)
                            21:30
                            <br />
                            <strong className="bold">막공</strong> (5/20 화)
                            20:30
                        </p>
                        <h3 className="detail-title">장소</h3>
                        <p className="detail-info">장소이름</p>
                        <h3 className="detail-title">가격</h3>
                        <p className="detail-info">티켓가격</p>
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

export default Detail;
