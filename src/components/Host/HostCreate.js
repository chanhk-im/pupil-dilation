import React from 'react';
import './HostCreate.css';

function HostCreate() {
    const days = [];
    const months = [];
    const dayOfWeeks = [];
    const places = [];
    const halls = ['그레이스', '학관', '올네'];
    const weeks = ['월', '화', '수', '목', '금', '토', '일'];

    days.push(<option value={1}>&nbsp;선택&emsp;</option>);

    for (let i = 1; i <= 31; i += 1) {
        days.push(<option value={i + 1}>{i}</option>);
    }

    months.push(<option value={1}>&nbsp;선택&emsp;</option>);

    for (let i = 1; i <= 12; i += 1) {
        months.push(<option value={i + 1}>{i}</option>);
    }

    dayOfWeeks.push(<option value={1}>&nbsp;선택&emsp;</option>);

    for (let i = 1; i <= 7; i += 1) {
        dayOfWeeks.push(<option value={i + 1}>{weeks[i - 1]}</option>);
    }

    places.push(
        <option value={1}>
            &nbsp;장소선택&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
        </option>,
    );

    for (let i = 1; i <= 3; i += 1) {
        places.push(<option value={i + 1}>{halls[i - 1]}</option>);
    }

    return (
        <div className="host-create-container">
            <div className="host-create-left">
                <img
                    className="image-upload"
                    src="/images/upload-image.png"
                    alt="업로드"
                />
            </div>
            <div className="host-create-right">
                <div className="host-create-right-1">
                    <input
                        className="host-create-title"
                        type="text"
                        placeholder="&nbsp;공연 제목 입력"
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
                            placeholder="&nbsp;소개 입력"
                        />
                    </div>
                    <div className="host-create-right-2-right">
                        <div className="host-create-place">
                            <div className="host-create-place-title">장소</div>
                            <select name="place" className="select-place">
                                {places}
                            </select>
                        </div>
                        <div className="host-create-price">
                            <div className="host-create-price-title">가격</div>
                            <input
                                className="host-create-price-content"
                                type="text"
                                placeholder="&nbsp;가격 입력"
                            />
                        </div>
                    </div>
                </div>
                <div className="host-create-right-3">
                    <div className="host-create-ticket-date">
                        <div className="host-create-date">예매일정</div>
                        <div className="host-create-ticket-date-start">
                            <div className="host-create-ticket-start-text2">
                                시작
                            </div>
                            <div className="host-create-date-start-month">
                                <select
                                    name="month-start"
                                    className="select-month-start"
                                >
                                    {months}
                                </select>
                                <div className="host-create-ticket-start-text">
                                    &nbsp;월
                                </div>
                            </div>
                            <div className="host-create-date-start-day">
                                <select
                                    name="day-start"
                                    className="select-day-start"
                                >
                                    {days}
                                </select>
                                <div className="host-create-ticket-start-text">
                                    &nbsp;일
                                </div>
                            </div>
                            <div className="host-create-date-start-dayOfWeek">
                                <select
                                    name="dayOfWeek-start"
                                    className="select-dayOfWeek-start"
                                >
                                    {dayOfWeeks}
                                </select>
                                <div className="host-create-ticket-start-text">
                                    &nbsp;요일
                                </div>
                            </div>
                            <input
                                type="text"
                                className="host-create-date-start-time"
                                placeholder="&nbsp;시간 입력(24:00)"
                            />
                        </div>
                        <div className="host-create-ticket-date-finish">
                            <div className="host-create-ticket-start-text2">
                                마감
                            </div>
                            <div className="host-create-date-finish-month">
                                <select
                                    name="month-finish"
                                    className="select-month-finish"
                                >
                                    {months}
                                </select>
                                <div className="host-create-ticket-start-text">
                                    &nbsp;월
                                </div>
                            </div>
                            <div className="host-create-date-finish-day">
                                <select
                                    name="day-finish"
                                    className="select-day-finish"
                                >
                                    {days}
                                </select>
                                <div className="host-create-ticket-start-text">
                                    &nbsp;일
                                </div>
                            </div>
                            <div className="host-create-date-finish-dayOfWeek">
                                <select
                                    name="dayOfWeek-finish"
                                    className="select-dayOfWeek-finish"
                                >
                                    {dayOfWeeks}
                                </select>
                                <div className="host-create-ticket-start-text">
                                    &nbsp;요일
                                </div>
                            </div>
                            <input
                                type="text"
                                className="host-create-date-finish-time"
                                placeholder="&nbsp;시간 입력(24:00)"
                            />
                        </div>
                        <div className="host-create-date">공연일정</div>
                        <div className="host-create-ticket-date-finish">
                            <div className="host-create-ticket-start-text2">
                                1공&nbsp;&nbsp;
                            </div>
                            <div className="host-create-date-finish-month">
                                <select
                                    name="month-finish"
                                    className="select-month-finish"
                                >
                                    {months}
                                </select>
                                <div className="host-create-ticket-start-text">
                                    &nbsp;월
                                </div>
                            </div>
                            <div className="host-create-date-finish-day">
                                <select
                                    name="day-finish"
                                    className="select-day-finish"
                                >
                                    {days}
                                </select>
                                <div className="host-create-ticket-start-text">
                                    &nbsp;일
                                </div>
                            </div>
                            <div className="host-create-date-finish-dayOfWeek">
                                <select
                                    name="dayOfWeek-finish"
                                    className="select-dayOfWeek-finish"
                                >
                                    {dayOfWeeks}
                                </select>
                                <div className="host-create-ticket-start-text">
                                    &nbsp;요일
                                </div>
                            </div>
                            <input
                                type="text"
                                className="host-create-date-finish-time"
                                placeholder="&nbsp;시간 입력(24:00)"
                            />
                        </div>
                        <div className="host-create-add-buttons">
                            <button
                                type="button"
                                className="host-create-add-button"
                            >
                                +&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;열
                                추가하기
                            </button>
                        </div>
                    </div>
                </div>
                <div className="host-create-right-4">
                    <button type="button" className="host-create-button">
                        등록
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HostCreate;
