import { React, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import './HostUpdate.css';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { updateShowsDocument } from '../../features/show/api/showsDocumentApi';

import { fStorage } from '../../Firebase';
import Popup from '../Popup/Popup';

function HostUpdate() {
    const navigate = useNavigate();
    function getIndex(showList, id) {
        return showList.findIndex((element) => element.id === id);
    }
    const [popup, setPopup] = useState({
        open: false,
        message: '',
        callback: false,
    });
    const { id } = useParams();
    console.log(id);
    const showList = useSelector((state) => state.show.showList);
    const index = getIndex(showList, id);
    console.log(showList[index]);

    const [newShowInfo, setNewShowInfo] = useState({
        title: showList[index].title,
        introduction: showList[index].introduction,
        place: showList[index].place,
        price: showList[index].price,
        schedule: showList[index].schedule,
        startDate: showList[index].startDate,
        endDate: showList[index].endDate,
        bankName: showList[index].bankName,
        bankNumber: showList[index].bankNumber,
    });

    function makeDate(info) {
        const timeArray = (info.time || '').split(':');
        const hour = Number(timeArray[0]);
        const minute = Number(timeArray[1]);
        const resDate = new Date();

        resDate.setFullYear(info.year);
        resDate.setMonth(info.month - 1);
        resDate.setDate(info.day);
        resDate.setHours(hour);
        resDate.setMinutes(minute);

        return resDate;
    }

    const [imageUpload, setImageUpload] = useState(null);

    const days = [];
    const months = [];
    const dayOfWeeks = [];
    const places = [];
    const halls = ['그레이스', '학관', '올네'];
    const weeks = ['월', '화', '수', '목', '금', '토', '일'];
    const schedules = [];

    const [scheduleCount, setScheduleCount] = useState(
        showList[index].schedule.length,
    );
    const eventList = showList[index].schedule.map((element) => {
        return {
            year: element.getFullYear(),
            month: element.getMonth(),
            day: element.getDate(),
            time:
                (element.getHours() < 10
                    ? '0' + String(element.getHours())
                    : String(element.getHours())) +
                ':' +
                (element.getMinutes() < 10
                    ? '0' + String(element.getMinutes())
                    : String(element.getMinutes())),
        };
    });
    const [timeInfo, setTimeInfo] = useState({
        start: {
            year: showList[index].startDate.getFullYear(),
            month: showList[index].startDate.getMonth(),
            day: showList[index].startDate.getDate(),
            time:
                (showList[index].startDate.getHours() < 10
                    ? '0' + String(showList[index].startDate.getHours())
                    : String(showList[index].startDate.getHours())) +
                ':' +
                (showList[index].startDate.getMinutes() < 10
                    ? '0' + String(showList[index].startDate.getMinutes())
                    : String(showList[index].startDate.getMinutes())),
        },
        end: {
            year: showList[index].endDate.getFullYear(),
            month: showList[index].endDate.getMonth(),
            day: showList[index].endDate.getDate(),
            time:
                (showList[index].endDate.getHours() < 10
                    ? '0' + String(showList[index].endDate.getHours())
                    : String(showList[index].endDate.getHours())) +
                ':' +
                (showList[index].endDate.getMinutes() < 10
                    ? '0' + String(showList[index].endDate.getMinutes())
                    : String(showList[index].endDate.getMinutes())),
        },
        schedule: eventList,
    });

    const upload = async () => {
        if (imageUpload === null) return;
        const imageRef = ref(fStorage, `show-image/${imageUpload.name}`);
        await uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref);
        });
    };

    const onChangeAccount = (e) => {
        setNewShowInfo({
            ...newShowInfo,
            [e.target.name]: e.target.value,
        });
    };

    const onChangeStartDate = (e) => {
        const newTimeInfo = {
            ...timeInfo,
            start: {
                ...timeInfo.start,
                [e.target.name]: e.target.value,
            },
        };

        setTimeInfo(newTimeInfo);
    };

    const onChangeEndDate = (e) => {
        const newTimeInfo = {
            ...timeInfo,
            end: {
                ...timeInfo.end,
                [e.target.name]: e.target.value,
            },
        };
        setTimeInfo(newTimeInfo);
    };

    const onChangeScheduleDate = (e) => {
        const newSchedule = timeInfo.schedule;
        newSchedule[e.target.id] = {
            ...newSchedule[e.target.id],
            [e.target.name]: e.target.value,
        };

        const newTimeInfo = {
            ...timeInfo,
            schedule: newSchedule,
        };

        setTimeInfo(newTimeInfo);
    };

    // const onChangeSchedule = (e) => {
    //     const newSchedule = timeInfo.schedule;
    //     newSchedule[Number(e.target.id)] = {
    //         ...newSchedule[Number(e.target.id)],
    //         [e.target.name]: e.target.value,
    //     };

    //     setTimeInfo({
    //         ...timeInfo,
    //         schedule: newSchedule,
    //     });
    // };

    const onSubtractClick = () => {
        if (scheduleCount > 1) setScheduleCount(scheduleCount - 1);
        else
            setPopup({
                open: true,
                message: '더 이상 삭제할 수 없습니다!',
            });
    };

    const onButtonClick = async () => {
        const values = Object.values(newShowInfo);

        setNewShowInfo({
            ...newShowInfo,
            image: `show-image/${imageUpload.name}`,
            schedule: timeInfo.schedule.map((element) => makeDate(element)),
            startDate: makeDate(timeInfo.start),
            endDate: makeDate(timeInfo.end),
        });

        const info = {
            ...newShowInfo,
            image: `show-image/${imageUpload.name}`,
            id,
            schedule: timeInfo.schedule.map((element) => makeDate(element)),
            startDate: makeDate(timeInfo.start),
            endDate: makeDate(timeInfo.end),
        };
        if (!values.includes('') && !values.includes(undefined)) {
            await updateShowsDocument(info).then((res) => {
                if (res) {
                    setPopup({
                        open: true,
                        message: '수정 완료!',
                        callback: () => navigate('/host'),
                    });
                }
            });
        } else {
            setPopup({
                open: true,
                message: '수정 실패...',
            });
        }
    };

    days.push(<option value={0}>&nbsp;선택&emsp;</option>);

    for (let i = 1; i <= 31; i += 1) {
        days.push(<option value={i}>{i}</option>);
    }

    months.push(<option value={0}>&nbsp;선택&emsp;</option>);

    for (let i = 1; i <= 12; i += 1) {
        months.push(<option value={i}>{i}</option>);
    }

    dayOfWeeks.push(<option value={0}>&nbsp;선택&emsp;</option>);

    for (let i = 1; i <= 7; i += 1) {
        dayOfWeeks.push(<option value={i}>{weeks[i - 1]}</option>);
    }

    places.push(
        <option value={0}>&nbsp;장소선택&emsp;&emsp;&emsp;&emsp;&emsp;</option>,
    );

    for (let i = 1; i <= 3; i += 1) {
        places.push(<option value={halls[i - 1]}>{halls[i - 1]}</option>);
    }

    for (let i = 0; i < scheduleCount; i += 1) {
        schedules.push(
            <div className="host-create-ticket-date-end" id={i}>
                <div className="host-create-ticket-start-text2">
                    {i + 1}공&nbsp;&nbsp;
                </div>
                <div className="host-create-date-end-month">
                    <select
                        name="month"
                        className="select-month-end"
                        defaultValue={timeInfo.schedule[i].month + 1}
                        id={i}
                        onChange={onChangeScheduleDate}
                    >
                        {months}
                    </select>
                    <div className="host-create-ticket-start-text">
                        &nbsp;월
                    </div>
                </div>
                <div className="host-create-date-end-day">
                    <select
                        name="day"
                        className="select-day-end"
                        defaultValue={timeInfo.schedule[i].day}
                        id={i}
                        onChange={onChangeScheduleDate}
                    >
                        {days}
                    </select>
                    <div className="host-create-ticket-start-text">
                        &nbsp;일
                    </div>
                </div>
                <div className="host-create-date-end-dayOfWeek">
                    <select
                        name="dayOfWeek-end"
                        className="select-dayOfWeek-end"
                    >
                        {dayOfWeeks}
                    </select>
                    <div className="host-create-ticket-start-text">
                        &nbsp;요일
                    </div>
                </div>
                <input
                    type="text"
                    className="host-create-date-end-time"
                    placeholder="&nbsp;시간 입력(24:00)"
                    name="time"
                    defaultValue={timeInfo.schedule[i].time}
                    id={i}
                    onChange={onChangeScheduleDate}
                />
            </div>,
        );
    }

    return (
        <div className="host-create-container">
            <Popup
                open={popup.open}
                setPopup={setPopup}
                message={popup.message}
                title={popup.title}
                callback={popup.callback}
            />
            <div className="host-create-left">
                <input
                    type="file"
                    onChange={(event) => {
                        setImageUpload(event.target.files[0]);
                    }}
                />
            </div>
            <div className="host-create-right">
                <div className="host-create-right-1">
                    <img
                        src="/images/upload-image.png"
                        alt="업로드"
                        className="upload-image"
                    />
                    <input
                        className="host-create-title"
                        type="text"
                        name="title"
                        placeholder="&nbsp;공연 제목 입력"
                        onChange={onChangeAccount}
                        value={newShowInfo.title}
                    />
                </div>
                <div className="host-create-right-2">
                    <div className="host-create-right-2-left">
                        <div className="host-create-introduction-title">
                            소개
                        </div>
                        <textarea
                            className="host-create-introduction-content"
                            type="textarea"
                            placeholder="&nbsp;소개 입력"
                            name="introduction"
                            onChange={onChangeAccount}
                            value={newShowInfo.introduction}
                        />
                    </div>
                    <div className="host-create-right-2-right">
                        <div className="host-create-place">
                            <div className="host-create-place-title">장소</div>
                            <select
                                name="place"
                                className="select-place"
                                onChange={onChangeAccount}
                                value={newShowInfo.place}
                            >
                                {places}
                            </select>
                        </div>
                        <div className="host-create-price">
                            <div className="host-create-price-title">가격</div>
                            <input
                                className="host-create-price-content"
                                type="number"
                                step="500"
                                placeholder="&nbsp;가격 입력"
                                name="price"
                                onChange={onChangeAccount}
                                value={newShowInfo.price}
                            />
                        </div>
                        <div className="host-create-bank">
                            <div className="host-create-price-title">
                                입금계좌
                            </div>
                            <div className="host-create-bank-set">
                                <input
                                    className="host-create-bank-name"
                                    type="text"
                                    placeholder="&nbsp;은행명 입력"
                                    name="bankName"
                                    onChange={onChangeAccount}
                                    value={newShowInfo.bankName}
                                />
                                <input
                                    className="host-create-price-content"
                                    type="text"
                                    placeholder='&nbsp;"-"포함 계좌번호 입력'
                                    name="bankNumber"
                                    onChange={onChangeAccount}
                                    value={newShowInfo.bankNumber}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="host-create-right-3">
                    <div className="host-create-ticket-date">
                        <div className="host-create-date">예매일정</div>
                        <div className="host-create-ticket-date-end">
                            <div className="host-create-ticket-start-text2">
                                시작
                            </div>
                            <div className="host-create-date-start-month">
                                <select
                                    name="month"
                                    className="select-month-start"
                                    onChange={onChangeStartDate}
                                    defaultValue={timeInfo.start.month + 1}
                                >
                                    {months}
                                </select>
                                <div className="host-create-ticket-start-text">
                                    &nbsp;월
                                </div>
                            </div>
                            <div className="host-create-date-start-day">
                                <select
                                    name="day"
                                    className="select-day-start"
                                    onChange={onChangeStartDate}
                                    defaultValue={timeInfo.start.day}
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
                                name="time"
                                onChange={onChangeStartDate}
                                value={timeInfo.start.time}
                            />
                        </div>
                        <div className="host-create-ticket-date-end">
                            <div className="host-create-ticket-start-text2">
                                마감
                            </div>
                            <div className="host-create-date-end-month">
                                <select
                                    name="month"
                                    className="select-month-end"
                                    onChange={onChangeEndDate}
                                    defaultValue={timeInfo.end.month + 1}
                                >
                                    {months}
                                </select>
                                <div className="host-create-ticket-start-text">
                                    &nbsp;월
                                </div>
                            </div>
                            <div className="host-create-date-end-day">
                                <select
                                    name="day"
                                    className="select-day-end"
                                    onChange={onChangeEndDate}
                                    defaultValue={timeInfo.end.day}
                                >
                                    {days}
                                </select>
                                <div className="host-create-ticket-start-text">
                                    &nbsp;일
                                </div>
                            </div>
                            <div className="host-create-date-end-dayOfWeek">
                                <select
                                    name="dayOfWeek-end"
                                    className="select-dayOfWeek-end"
                                >
                                    {dayOfWeeks}
                                </select>
                                <div className="host-create-ticket-start-text">
                                    &nbsp;요일
                                </div>
                            </div>
                            <input
                                type="text"
                                className="host-create-date-end-time"
                                placeholder="&nbsp;시간 입력(24:00)"
                                name="time"
                                onChange={onChangeEndDate}
                                value={timeInfo.end.time}
                            />
                        </div>
                        <div className="host-create-date">공연일정</div>
                        {schedules}
                        <div className="host-create-add-buttons">
                            <button
                                type="button"
                                className="host-create-add-button"
                                onClick={() => {
                                    setScheduleCount(scheduleCount + 1);
                                    const newScheduleItem = {
                                        year: 2023,
                                        month: 0,
                                        day: 0,
                                        time: '',
                                    };
                                    const newSchedule = [
                                        ...timeInfo.schedule,
                                        newScheduleItem,
                                    ];
                                    const newTimeInfo = {
                                        ...timeInfo,
                                        schedule: newSchedule,
                                    };

                                    setTimeInfo(newTimeInfo);
                                }}
                            >
                                <div>+</div>
                                <div>열 추가하기</div>
                            </button>
                            <button
                                type="button"
                                className="host-create-subtract-button"
                                onClick={onSubtractClick}
                            >
                                <div>-</div>
                                <div>열 삭제하기</div>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="host-create-right-4">
                    <button
                        type="button"
                        className="host-create-button"
                        onClick={onButtonClick}
                    >
                        등록
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HostUpdate;
