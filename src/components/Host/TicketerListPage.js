import React, { useEffect, useState } from 'react';
import Popup from '../Popup/Popup';
import {
    changeRemmited,
    getShowTicketerListByShowNotExpired,
} from '../../features/show/api/showsDocumentApi';
import { formatDateTime } from '../../functions/dateFeature';
import './TicketerListPage.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

/*eslint-disable*/
function TicketerListPage() {
    const { id } = useParams();

    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const showList = useSelector((state) => state.show.showList);

    const onLoading = async () => {
        await getShowTicketerListByShowNotExpired(id).then((value) => {
            const totalRowCnt = value.docs.length;
            setTotalRowCnt(totalRowCnt);
            setTicketerList(value.docs);
        });
        setIsLoaded(true);
    };
    const onClickToggle = async (index, dataId, toggle) => {
        toggleStateChange(index + 1);
        await changeRemmited(dataId, toggle);
    };
    useEffect(() => {
        onLoading().then(() => {});
    }, []);
    const headers = [
        {
            text: '목록',
            value: '목록',
        },
        {
            text: '이름',
            value: '이름',
        },
        {
            text: '좌석',
            value: '좌석',
        },
        {
            text: '예금주',
            value: '예금주',
        },
        {
            text: '',
            value: '',
        },
        {
            text: '예매일시',
            value: '예매일시',
        },
        {
            text: '입금 현황',
            value: '입금 현황',
        },
        {
            text: '예매 상태',
            value: '예매 상태',
        },
    ];

    const [popup, setPopup] = useState({
        open: false,
        message: '',
        callback: false,
    });

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
    const [ticketerList, setTicketerList] = useState([]);
    const [ticketerToggle, setTicketerToggle] = useState([]);

    function toggleStateChange(inx) {
        console.log('teest ' + ticketerToggle);
        console.log(inx - 1 + ' is clicked');
        const newTicketState = [...ticketerToggle];
        newTicketState[inx - 1] = !newTicketState[inx - 1];
        setTicketerToggle(newTicketState);
    }

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
            <td id="copy">
                {e.data().sendName} {e.data().sendBank} {e.data().sendAccount}{' '}
            </td>
            <td>
                <button
                    style={{ border: 'none' }}
                    onClick={() => {
                        const copyText = document.getElementById('copy');

                        handleCopyClipBoard(copyText.textContent);
                    }}
                    className="copy-button"
                >
                    <img src="../../../images/copy.svg"></img>
                </button>
            </td>
            <td>{formatDateTime(e.data().time.toDate())}</td>
            <td>
                <section className="model-1">
                    <p>입금 전</p>
                    <div className="checkbox">
                        <input
                            type="checkbox"
                            id="check"
                            onClick={() =>
                                onClickToggle(
                                    index,
                                    e.data().id,
                                    !ticketerToggle[index],
                                )
                            }
                        />
                        <label htmlFor="check" />
                    </div>
                    <p>입금 완료</p>
                </section>
            </td>
            <td>
                <p
                    style={
                        ticketerToggle[index]
                            ? { color: 'blue' }
                            : { color: 'red' }
                    }
                >
                    {ticketerToggle[index] ? '예매 완료' : '예매 중'}
                </p>
            </td>
        </tr>
    ));
    console.log('t' + ticketerTableList);
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
                <h1 className="title-sub">총 {totalRowCnt}명</h1>
            </div>
            <div className="ticketer-list-container">
                <table className="tablet" id="mytable">
                    <thead>
                        <tr>
                            {headers.map((header) => (
                                <th key={header.text}>{header.text}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>{ticketerTableList}</tbody>
                </table>
            </div>
        </>
    ) : (
        <></>
    );
}

export default TicketerListPage;
