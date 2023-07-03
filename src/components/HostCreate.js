import React from 'react';
import './HostCreate.css';

function HostCreate() {
    return (
        <div className="host-create-container">
            <div className="host-create-left">
                <img
                    className="image-upload"
                    src="/images/logo.svg"
                    alt="업로드"
                />
            </div>
            <div className="host-create-right">
                <div className="host-create-right-1">
                    <input
                        className="host-create-title"
                        type="text"
                        placeholder="공연 제목 입력"
                    />
                </div>
                <div className="host-create-right-2">
                    <div className="host-create-right-2-left">
                        <div className="host-create-introduction-title">
                            소개
                        </div>
                        <input
                            className="host-create-introduction-content"
                            type="text"
                            placeholder="소개 입력"
                        />
                    </div>
                    <div className="host-create-right-2-right">
                        <div className="host-create-place">
                            <div className="host-create-place-title">장소</div>
                            <input
                                className="host-create-place-content"
                                type="text"
                                placeholder="장소선택"
                            />
                        </div>
                        <div className="host-create-price">
                            <div className="host-create-price-title">가격</div>
                            <input
                                className="host-create-price-content"
                                type="text"
                                placeholder="가격 입력"
                            />
                        </div>
                    </div>
                </div>
                <div className="host-create-right-3">
                    <div className="host-create-ticket-date">
                        <div className="host-create-ticket-date-start">
                            시작
                        </div>
                        <div className="host-create-ticket-date-finish">
                            마감
                        </div>
                    </div>
                </div>
                {/* <div className="host-create-right-4"></div> */}
            </div>
        </div>
    );
}

export default HostCreate;
