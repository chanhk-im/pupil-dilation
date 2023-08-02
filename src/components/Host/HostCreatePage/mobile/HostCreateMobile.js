import { React, useState } from 'react';
import './HostCreateMobile.css';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { createShowsDocument } from '../../../../features/show/api/showsDocumentApi';
import { fStorage } from '../../../../Firebase';
import Popup from '../../../Popup/Popup';

function HostCreateMobile() {
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

    const [popup, setPopup] = useState({
        open: false,
        message: '',
        callback: false,
    });

    const [imageUpload, setImageUpload] = useState(null);

    const days = [];
    const months = [];
    const dayOfWeeks = [];
    const places = [];
    const halls = ['그레이스', '학관', '올네'];
    const weeks = ['월', '화', '수', '목', '금', '토', '일'];
    const schedules = [];

    const [newShowInfo, setNewShowInfo] = useState({
        title: '',
        introduction: '',
        place: '',
        price: '',
        schedule: [],
        startDate: new Date(),
        endDate: new Date(),
        bankName: '',
        bankNumber: '',
    });
    const [scheduleCount, setScheduleCount] = useState(1);
    const [timeInfo, setTimeInfo] = useState({
        start: {
            year: 2023,
            month: 0,
            day: 0,
            time: '',
        },
        end: {
            year: 2023,
            month: 0,
            day: 0,
            time: '',
        },
        schedule: [
            {
                year: 2023,
                month: 0,
                day: 0,
                time: '',
            },
        ],
    });

    const upload = async () => {
        if (imageUpload === null) return;
        const imageRef = ref(fStorage, `show-image/${imageUpload.name}`);
        await uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref);
        });
    };

    const navigate = useNavigate();

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

    const onChangeSchedule = (e) => {
        const newSchedule = timeInfo.schedule;
        newSchedule[Number(e.target.id)] = {
            ...newSchedule[Number(e.target.id)],
            [e.target.name]: e.target.value,
        };

        setTimeInfo({
            ...timeInfo,
            schedule: newSchedule,
        });
    };

    const mappedSchedule = timeInfo.schedule.map((item) => makeDate(item));

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
        await upload();

        const info = {
            ...newShowInfo,
            image: `show-image/${imageUpload.name}`,
            schedule: mappedSchedule,
            startDate: makeDate(timeInfo.start),
            endDate: makeDate(timeInfo.end),
        };
        if (!values.includes('') && !values.includes(undefined)) {
            await createShowsDocument(info).then((res) => {
                if (res) {
                    setPopup({
                        open: true,
                        message: '추가 완료!',
                        callback: () => navigate('/host'),
                    });
                }
            });
        } else {
            setPopup({
                open: true,
                message: '추가 실패,,',
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
            <div className="host-create-date-table-mobile" id={i}>
                <div className="event-number-mobile">{i + 1}공&nbsp;&nbsp;</div>
                <div className="event-schedule-mobile">
                    <div className="host-create-date-table-mobile">
                        <select
                            name="month"
                            className="host-create-date-choose"
                            onChange={onChangeSchedule}
                            id={i}
                        >
                            {months}
                        </select>
                        <div className="host-create-date-choose-text">
                            &nbsp;월
                        </div>
                    </div>
                    <div className="host-create-date-table-mobile">
                        <select
                            name="day"
                            className="host-create-date-choose"
                            onChange={onChangeSchedule}
                            id={i}
                        >
                            {days}
                        </select>
                        <div className="host-create-date-choose-text">
                            &nbsp;일
                        </div>
                    </div>
                    <div className="host-create-date-time-text">시간</div>
                    <input
                        type="text"
                        className="host-create-date-choose"
                        placeholder="&nbsp;24:00"
                        name="time"
                        onChange={onChangeSchedule}
                        id={i}
                    />
                </div>
            </div>,
        );
    }

    return (
        <>
            <div className="host-create-container-mobile">
                <Popup
                    open={popup.open}
                    setPopup={setPopup}
                    message={popup.message}
                    title={popup.title}
                    callback={popup.callback}
                />
                <input
                    className="host-create-title-mobile"
                    type="text"
                    name="title"
                    placeholder="&nbsp;공연 제목 입력"
                    onChange={onChangeAccount}
                />
                <div className="second-input-mobile"></div>
                <div className="third-input-mobile">
                    <div className="host-create-introduction-title-mobile">
                        소개
                    </div>
                    <textarea
                        className="host-create-introduction-content-mobile"
                        type="textarea"
                        placeholder="소개 입력"
                        name="introduction"
                        onChange={onChangeAccount}
                    />
                </div>
                <div>
                    <div className="host-create-date-mobile">예매일정</div>
                    <div className="host-create-table-title">시작</div>
                    <div className="host-create-date-table-mobile">
                        <div className="host-create-date-table-mobile">
                            <select
                                name="month"
                                className="host-create-date-choose"
                                onChange={onChangeStartDate}
                            >
                                {months}
                            </select>
                            <div className="host-create-date-choose-text">
                                월
                            </div>
                        </div>
                        <div className="host-create-date-table-mobile">
                            <select
                                name="day"
                                className="host-create-date-choose"
                                onChange={onChangeStartDate}
                            >
                                {days}
                            </select>
                            <div className="host-create-date-choose-text">
                                일
                            </div>
                        </div>
                        <div className="host-create-date-time-text">시간</div>
                        <input
                            type="text"
                            className="host-create-date-choose"
                            placeholder="&nbsp;24:00"
                            name="time"
                            onChange={onChangeStartDate}
                        />
                    </div>
                    <div className="host-create-table-title">마감</div>
                    <div className="host-create-date-table-mobile">
                        <div className="host-create-date-table-mobile">
                            <select
                                name="month"
                                className="host-create-date-choose"
                                onChange={onChangeEndDate}
                            >
                                {months}
                            </select>
                            <div className="host-create-date-choose-text">
                                &nbsp;월
                            </div>
                        </div>
                        <div className="host-create-date-table-mobile">
                            <select
                                name="day"
                                className="host-create-date-choose"
                                onChange={onChangeEndDate}
                            >
                                {days}
                            </select>
                            <div className="host-create-date-choose-text">
                                &nbsp;일
                            </div>
                        </div>
                        <div className="host-create-date-time-text">시간</div>
                        <input
                            type="text"
                            className="host-create-date-choose"
                            placeholder="&nbsp;24:00"
                            name="time"
                            onChange={onChangeEndDate}
                        />
                    </div>
                    <div className="space" />
                    <div className="host-create-date-mobile">공연일정</div>
                    <div className="host-create-date-table-mobile">
                        <div className="event-schedules">{schedules}</div>
                        <div>
                            <button
                                type="button"
                                className="event-delete-button-mobile"
                                onClick={onSubtractClick}
                            >
                                <img
                                    src="/images/Trash.svg"
                                    alt="열 삭제하기"
                                />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="host-create-add-mobile">
                    <button
                        type="button"
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
                        className="event-add-button-mobile"
                    >
                        <p>+</p>
                        <p>열 추가하기</p>
                    </button>
                </div>
            </div>
        </>
    );
}

export default HostCreateMobile;
