// import { React, useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useParams, useNavigate } from 'react-router-dom';
// import './HostUpdate.css';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// import { createShowsDocument } from '../../features/show/api/showsDocumentApi';

// import { fStorage } from '../../Firebase';

// function HostUpdate() {
//     const navigate = useNavigate();
//     function getIndex(showList, id) {
//         return showList.findIndex((element) => element.id === id);
//     }

//     const { id } = useParams();
//     console.log(id);
//     const showList = useSelector((state) => state.show.showList);
//     const index = getIndex(showList, id);
//     console.log(showList[index]);

//     const [introduction, setIntroduction] = useState(
//         showList[index].introduction,
//     );
//     const [price, setPrice] = useState(showList[index].price);
//     const [title, setTitle] = useState(showList[index].title);
//     const [place, setPlace] = useState(showList[index].place);
//     const [time, setTime] = useState('');
//     const [startYear, setStartYear] = useState(
//         showList[index].startDate.getYear(),
//     );
//     const [startMonth, setStartMonth] = useState(
//         showList[index].startDate.getMonth(),
//     );
//     const [startDay, setStartDay] = useState(
//         showList[index].startDate.getDay(),
//     );
//     const [endYear, setEndYear] = useState(showList[index].endDate.getYear());
//     const [endMonth, setEndMonth] = useState(
//         showList[index].endDate.getMonth(),
//     );
//     const [endDay, setEndDay] = useState(showList[index].endDate.getDay());

//     const [newShowInfo, setNewShowInfo] = useState({
//         title: '',
//         introduction: '',
//         place: '',
//         price: '',
//         schedule: [],
//         startDate: new Date(),
//         endDate: new Date(),
//         hasImage: true,
//         isHost: false,
//         image: '',
//     });

//     useEffect(() => {
//         setTitle(showList[index].title);
//         setIntroduction(showList[index].introduction);
//         setPrice(showList[index].price);
//         setPlace(showList[index].place);
//         setStartMonth(showList[index].startDate.getMonth());
//         setTime(showList[index].time);
//         setEndDay(showList[index].endday);
//     });

//     function makeDate(info) {
//         console.log(info);
//         const timeArray = info.time.split(':');
//         const hour = Number(timeArray[0]);
//         const minute = Number(timeArray[1]);
//         const resDate = new Date();

//         resDate.setFullYear(info.year);
//         resDate.setMonth(info.month - 1);
//         resDate.setDate(info.day);
//         resDate.setHours(hour);
//         resDate.setMinutes(minute);
//         console.log(resDate);

//         return resDate;
//     }

//     const [imageUpload, setImageUpload] = useState(null);

//     const days = [];
//     const months = [];
//     const dayOfWeeks = [];
//     const places = [];
//     const halls = ['그레이스', '학관', '올네'];
//     const weeks = ['월', '화', '수', '목', '금', '토', '일'];
//     const schedules = [];

//     const [scheduleCount, setScheduleCount] = useState(1);
//     const [timeInfo, setTimeInfo] = useState({
//         start: {
//             year: 2023,
//             month: 0,
//             day: 0,
//             time: '',
//         },
//         end: {
//             year: 2023,
//             month: 0,
//             day: 0,
//             time: '',
//         },
//         schedule: [
//             {
//                 year: 2023,
//                 month: 0,
//                 day: 0,
//                 time: '',
//             },
//         ],
//     });

//     const upload = () => {
//         if (imageUpload === null) return;
//         setNewShowInfo({
//             ...newShowInfo,
//             image: `show-image/${imageUpload.name}`,
//         });
//         const imageRef = ref(fStorage, `show-image/${imageUpload.name}`);
//         // `images === 참조값이름(폴더이름), / 뒤에는 파일이름 어떻게 지을지
//         uploadBytes(imageRef, imageUpload).then((snapshot) => {
//             // 업로드 되자마자 뜨게 만들기
//             getDownloadURL(snapshot.ref);
//             //
//         });
//     };

//     const onChangeAccount = (e) => {
//         setNewShowInfo({
//             ...newShowInfo,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const onChangeStartDate = (e) => {
//         const newTimeInfo = {
//             ...timeInfo,
//             start: {
//                 ...timeInfo.start,
//                 [e.target.name]: e.target.value,
//             },
//         };

//         setTimeInfo(newTimeInfo);
//     };

//     const onChangeEndDate = (e) => {
//         const newTimeInfo = {
//             ...timeInfo,
//             end: {
//                 ...timeInfo.end,
//                 [e.target.name]: e.target.value,
//             },
//         };
//         setTimeInfo(newTimeInfo);
//     };

//     const onButtonClick = async () => {
//         const values = Object.values(newShowInfo);

//         setNewShowInfo({
//             ...newShowInfo,
//             schedule: [],
//             startDate: makeDate(timeInfo.start),
//             endDate: makeDate(timeInfo.end),
//         });

//         const info = {
//             ...newShowInfo,
//             startDate: makeDate(timeInfo.start),
//             endDate: makeDate(timeInfo.end),
//         };
//         console.log(info);
//         if (!values.includes('') && !values.includes(undefined)) {
//             await createShowsDocument(info).then((res) => {
//                 // TODO: navigate main
//                 if (res) {
//                     alert('회원가입 완료!');
//                     navigate('/host');
//                 }
//             });
//         } else {
//             alert('ㅁ');
//         }
//     };

//     days.push(<option value={0}>&nbsp;선택&emsp;</option>);

//     for (let i = 1; i <= 31; i += 1) {
//         days.push(<option value={i}>{i}</option>);
//     }

//     months.push(<option value={0}>&nbsp;선택&emsp;</option>);

//     for (let i = 1; i <= 12; i += 1) {
//         months.push(<option value={i}>{i}</option>);
//     }

//     dayOfWeeks.push(<option value={0}>&nbsp;선택&emsp;</option>);

//     for (let i = 1; i <= 7; i += 1) {
//         dayOfWeeks.push(<option value={i}>{weeks[i - 1]}</option>);
//     }

//     places.push(
//         <option value={0}>&nbsp;장소선택&emsp;&emsp;&emsp;&emsp;&emsp;</option>,
//     );

//     for (let i = 1; i <= 3; i += 1) {
//         places.push(<option value={halls[i - 1]}>{halls[i - 1]}</option>);
//     }

//     for (let i = 1; i <= scheduleCount; i += 1) {
//         schedules.push(
//             <div className="host-create-ticket-date-end" id={i}>
//                 <div className="host-create-ticket-start-text2">
//                     {i}공&nbsp;&nbsp;
//                 </div>
//                 <div className="host-create-date-end-month">
//                     <select name="month-end" className="select-month-end">
//                         {months}
//                     </select>
//                     <div className="host-create-ticket-start-text">
//                         &nbsp;월
//                     </div>
//                 </div>
//                 <div className="host-create-date-end-day">
//                     <select name="day-end" className="select-day-end">
//                         {days}
//                     </select>
//                     <div className="host-create-ticket-start-text">
//                         &nbsp;일
//                     </div>
//                 </div>
//                 <div className="host-create-date-end-dayOfWeek">
//                     <select
//                         name="dayOfWeek-end"
//                         className="select-dayOfWeek-end"
//                     >
//                         {dayOfWeeks}
//                     </select>
//                     <div className="host-create-ticket-start-text">
//                         &nbsp;요일
//                     </div>
//                 </div>
//                 <input
//                     type="text"
//                     className="host-create-date-end-time"
//                     placeholder="&nbsp;시간 입력(24:00)"
//                     name="time-end"
//                 />
//             </div>,
//         );
//     }

//     return (
//         <div className="host-create-container">
//             <div className="host-create-left">
//                 <input
//                     type="file"
//                     onChange={(event) => {
//                         setImageUpload(event.target.files[0]);
//                     }}
//                 />
//                 <button type="button" onClick={upload}>
//                     업로드
//                 </button>
//             </div>
//             <div className="host-create-right">
//                 <div className="host-create-right-1">
//                     <input
//                         className="host-create-title"
//                         type="text"
//                         name="title"
//                         placeholder="&nbsp;공연 제목 입력"
//                         onChange={onChangeAccount}
//                         value={newShowInfo.title}
//                     />
//                 </div>
//                 <div className="host-create-right-2">
//                     <div className="host-create-right-2-left">
//                         <div className="host-create-introduction-title">
//                             소개
//                         </div>
//                         <input
//                             className="host-create-introduction-content"
//                             type="text"
//                             placeholder="&nbsp;소개 입력"
//                             name="introduction"
//                             onChange={onChangeAccount}
//                             value={newShowInfo.introduction}
//                         />
//                     </div>
//                     <div className="host-create-right-2-right">
//                         <div className="host-create-place">
//                             <div className="host-create-place-title">장소</div>
//                             <select
//                                 name="place"
//                                 className="select-place"
//                                 onChange={onChangeAccount}
//                                 value={newShowInfo.place}
//                             >
//                                 {places}
//                             </select>
//                         </div>
//                         <div className="host-create-price">
//                             <div className="host-create-price-title">가격</div>
//                             <input
//                                 className="host-create-price-content"
//                                 type="number"
//                                 step="500"
//                                 placeholder="&nbsp;가격 입력"
//                                 name="price"
//                                 onChange={onChangeAccount}
//                                 value={newShowInfo.price}
//                             />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="host-create-right-3">
//                     <div className="host-create-ticket-date">
//                         <div className="host-create-date">예매일정</div>
//                         <div className="host-create-ticket-date-end">
//                             <div className="host-create-ticket-start-text2">
//                                 시작
//                             </div>
//                             <div className="host-create-date-start-month">
//                                 <select
//                                     name="month"
//                                     className="select-month-start"
//                                     onChange={onChangeStartDate}
//                                     value={timeInfo.start.month}
//                                 >
//                                     {months}
//                                 </select>
//                                 <div className="host-create-ticket-start-text">
//                                     &nbsp;월
//                                 </div>
//                             </div>
//                             <div className="host-create-date-start-day">
//                                 <select
//                                     name="day"
//                                     className="select-day-start"
//                                     onChange={onChangeStartDate}
//                                     value={newShowInfo.day}
//                                 >
//                                     {days}
//                                 </select>
//                                 <div className="host-create-ticket-start-text">
//                                     &nbsp;일
//                                 </div>
//                             </div>
//                             <div className="host-create-date-start-dayOfWeek">
//                                 <select
//                                     name="dayOfWeek-start"
//                                     className="select-dayOfWeek-start"
//                                 >
//                                     {dayOfWeeks}
//                                 </select>
//                                 <div className="host-create-ticket-start-text">
//                                     &nbsp;요일
//                                 </div>
//                             </div>
//                             <input
//                                 type="text"
//                                 className="host-create-date-start-time"
//                                 placeholder="&nbsp;시간 입력(24:00)"
//                                 name="time"
//                                 onChange={onChangeStartDate}
//                                 value={newShowInfo.time}
//                             />
//                         </div>
//                         <div className="host-create-ticket-date-end">
//                             <div className="host-create-ticket-start-text2">
//                                 마감
//                             </div>
//                             <div className="host-create-date-end-month">
//                                 <select
//                                     name="month"
//                                     className="select-month-end"
//                                     onChange={onChangeEndDate}
//                                     value={newShowInfo.month}
//                                 >
//                                     {months}
//                                 </select>
//                                 <div className="host-create-ticket-start-text">
//                                     &nbsp;월
//                                 </div>
//                             </div>
//                             <div className="host-create-date-end-day">
//                                 <select
//                                     name="day"
//                                     className="select-day-end"
//                                     onChange={onChangeEndDate}
//                                     value={newShowInfo.day}
//                                 >
//                                     {days}
//                                 </select>
//                                 <div className="host-create-ticket-start-text">
//                                     &nbsp;일
//                                 </div>
//                             </div>
//                             <div className="host-create-date-end-dayOfWeek">
//                                 <select
//                                     name="dayOfWeek-end"
//                                     className="select-dayOfWeek-end"
//                                 >
//                                     {dayOfWeeks}
//                                 </select>
//                                 <div className="host-create-ticket-start-text">
//                                     &nbsp;요일
//                                 </div>
//                             </div>
//                             <input
//                                 type="text"
//                                 className="host-create-date-end-time"
//                                 placeholder="&nbsp;시간 입력(24:00)"
//                                 name="time"
//                                 onChange={onChangeEndDate}
//                                 value={newShowInfo.time}
//                             />
//                         </div>
//                         <div className="host-create-date">공연일정</div>
//                         {schedules}
//                         <div className="host-create-add-buttons">
//                             <button
//                                 type="button"
//                                 className="host-create-add-button"
//                                 onClick={() => {
//                                     setScheduleCount(scheduleCount + 1);
//                                     const newSchedule = [
//                                         ...timeInfo.schedule,
//                                         {
//                                             year: 2023,
//                                             month: 0,
//                                             day: 0,
//                                             time: '',
//                                         },
//                                     ];
//                                     const newTimeInfo = {
//                                         ...timeInfo,
//                                         schedule: newSchedule,
//                                     };
//                                     setTimeInfo(newTimeInfo);
//                                 }}
//                             >
//                                 <div>+</div>
//                                 <div>열 추가하기</div>
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="host-create-right-4">
//                     <button
//                         type="button"
//                         className="host-create-button"
//                         onClick={onButtonClick}
//                     >
//                         등록
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default HostUpdate;

// // import React, { useEffect, useState } from 'react';
// // import './HostUpdate.css';
// // import { useSelector } from 'react-redux';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import HostCreate from './HostCreate';

// // /*eslint-disable*/
// // function HostUpdate() {
// //     let [introduction, setIntroduction] = useState('');
// //     let [price, setPrice] = useState('');
// //     // let [saveImage, setSaveImage] = useState([]); // 이미 저장된 이미지를 담을 State
// //     // let [keep, setKeep] = useState(false); // 수정버튼을 눌렀지만 수정을 안할 때를 대비
// //     const navigate = useNavigate();
// //     function getIndex(showList, id) {
// //         return showList.findIndex((element) => element.id === id);
// //     }

// //     const { id } = useParams();
// //     console.log(id);
// //     const showList = useSelector((state) => state.show.showList);
// //     const index = getIndex(showList, id);
// //     console.log(showList[index]);

// //     useEffect(() => {
// //         setIntroduction(showList[index].introduction);
// //         console.log(showList[index].introduction);
// //         setPrice(showList[index].price);
// //     });
// //     //     let copySaveImage = [...saveImage];
// //     //     if (.url !== undefined) {
// //     //         copySaveImage.push(...posts.url);
// //     //     }
// //     //     setSaveImage(copySaveImage);
// //     //     //저장된 이미지가 있으면 posts.url의 데이터를 saveImage로 전송
// //     // }, [posts]);
// //     return <HostCreate />;
// // }

// // export default HostUpdate;
