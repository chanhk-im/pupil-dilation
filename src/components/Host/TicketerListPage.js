import React, { useEffect, useState } from 'react';
import Popup from '../Popup/Popup';
import { getShowTicketerListByShow } from '../../features/show/api/showsDocumentApi';
import { getDateSeatTickegingFrameDateFormat } from '../../functions/dateFeature';
import './TicketerListPage.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShowList } from '../../features/show/slices/showSlice';
import { getShowsDocument } from '../../features/show/api/showsDocumentApi';
import Loading from '../Loading';
import { fireStore } from '../../Firebase';
import {
    collection,
    doc,
    getDocs,
    addDoc,
    getDoc,
    setDoc,
    deleteDoc,
    updateDoc,
    query,
    where,
    and,
} from 'firebase/firestore';

/*eslint-disable*/
function TicketerListPage() {
    const { id } = useParams();
    const reference = collection(fireStore, 'ticketing');
    const q = query(reference, where('showid', '==', id));

    const [popup, setPopup] = useState({
        open: false,
        message: '',
        callback: false,
    });
    const [isLoaded, setIsLoaded] = useState(false);
    const [ticketerList, setTicketerList] = useState([]);

    const loading = async () => {
        const tList = await getShowTicketerListByShow(id, showNum);
        setTicketerList(tList);
        setIsLoaded(true);
    };

    useEffect(() => {
        loading();
    }, []);

    const handleCopyClipBoard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setPopup({
                open: true,
                message: 'copied!!',
            });
        } catch (e) {
            setPopup({
                open: true,
                message: '복사 실패...',
            });
        }
    };

    const [totalRowCnt, setTotalRowCnt] = useState(0);
    const [toggleState1, setToggleState1] = useState(false);
    const [toggleState2, setToggleState2] = useState(false);

    function toggleState1Change() {
        setToggleState1(!toggleState1);
    }
    function toggleState2Change() {
        setToggleState2(!toggleState2);
    }

    useEffect(() => {
        const table = document.getElementById('mytable');
        const totalRowCnt = table?.rows?.length || 0;
        setTotalRowCnt(totalRowCnt);
    }, []);

    const ticketerTableList = ticketerList.map((e, index) => (
        <tr>
            <td>{index + 1}</td>
            <td>{e.data().userId}</td>
            <td>
                {e
                    .data()
                    .seats.map((e) => e.name)
                    .join(', ')}
            </td>
            <td id="copy">(예금주) 신한 1234-1234121-12341 </td>
            <td>
                <button
                    style={{ border: 'none' }}
                    onClick={() => {
                        const copyText = document.getElementById('copy');

                        handleCopyClipBoard(copyText.textContent);
                    }}
                >
                    <img src="../../../images/copy.svg"></img>
                </button>
            </td>
            <td>
                {getDateSeatTickegingFrameDateFormat(e.data().time.toDate())}
            </td>
            <td>
                <section className="model-1">
                    <p>입금 전</p>
                    <div className="checkbox">
                        <input
                            type="checkbox"
                            id="check"
                            onClick={toggleStateChange}
                        />
                        <label htmlFor="check" />
                    </div>
                    <p>입금 완료</p>
                </section>
            </td>
            <td>
                <p style={toggleState ? { color: 'blue' } : { color: 'red' }}>
                    {toggleState ? '예매 완료' : '예매 중'}
                </p>
            </td>
        </tr>
    ));
    console.log(ticketerTableList);
    return isLoaded ? (
        <>
            <Popup
                open={popup.open}
                setPopup={setPopup}
                message={popup.message}
                title={popup.title}
                callback={popup.callback}
            />
            <div className="ticketer-header">
                <h1 className="title-main">예매자 목록</h1>
                <h1 className="title-sub">총 {totalRowCnt - 1}명</h1>
            </div>
            <div className="ticketer-list-container">
                <table className="tablet" id="mytable">
                    <thead>
                        <tr>
                            <th>목록</th>
                            <th>이름</th>
                            <th>좌석</th>
                            <th>예금주</th>
                            <th></th>
                            <th>예매 일시</th>
                            <th>입금 현황</th>
                            <th>예매 상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>조동운</td>
                            <td>12A</td>
                            <td id="copy">(예금주) 신한 1234-1234121-12341 </td>
                            <td>
                                <button
                                    style={{ border: 'none' }}
                                    onClick={() => {
                                        const copyText =
                                            document.getElementById('copy');

                                        handleCopyClipBoard(
                                            copyText.textContent,
                                        );
                                    }}
                                    className="copy-button"
                                >
                                    <img src="../../../images/copy.svg"></img>
                                </button>
                            </td>
                            <td>5/27 19:58</td>
                            <td>
                                <section className="model-1">
                                    <p>입금 전</p>
                                    <div className="checkbox">
                                        <input
                                            type="checkbox"
                                            id="check"
                                            onClick={toggleState1Change}
                                        />
                                        <label htmlFor="check" />
                                    </div>
                                    <p>입금 완료</p>
                                </section>
                            </td>
                            <td>
                                <p
                                    style={
                                        toggleState1
                                            ? { color: 'blue' }
                                            : { color: 'red' }
                                    }
                                >
                                    {toggleState1 ? '예매 완료' : '예매 중'}
                                </p>
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>조동운</td>
                            <td>12A</td>
                            <td id="copy">(예금주) 신한 1234-1234121-12341 </td>
                            <td>
                                <button
                                    style={{ border: 'none' }}
                                    onClick={() => {
                                        const copyText =
                                            document.getElementById('copy');

                                        handleCopyClipBoard(
                                            copyText.textContent,
                                        );
                                    }}
                                    className="copy-button"
                                >
                                    <img src="../../../images/copy.svg"></img>
                                </button>
                            </td>
                            <td>5/27 19:58</td>
                            <td>
                                <section className="model-1">
                                    <p>입금 전</p>
                                    <div className="checkbox">
                                        <input
                                            type="checkbox"
                                            id="check"
                                            onClick={toggleState2Change}
                                        />
                                        <label htmlFor="check" />
                                    </div>
                                    <p>입금 완료</p>
                                </section>
                            </td>
                            <td>
                                <p
                                    style={
                                        toggleState2
                                            ? { color: 'blue' }
                                            : { color: 'red' }
                                    }
                                >
                                    {toggleState2 ? '예매 완료' : '예매 중'}
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    ) : (
        <></>
    );
}

export default TicketerListPage;
