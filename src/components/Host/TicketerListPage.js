import React, { useEffect, useState } from 'react';
import './css/TicketerListPage.css';


/*eslint-disable*/
function TicketerListPage() {
    const [totalRowCnt, setTotalRowCnt] = useState(0);
    const [toggleState, setToggleState] = useState(false);

    function toggleStateChange() {
        setToggleState(!toggleState);
    }

    useEffect(() => {
        const table = document.getElementById('mytable');
        const totalRowCnt = table?.rows?.length || 0;
        setTotalRowCnt(totalRowCnt);
    }, []);
  
    return (
        <>
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
                            <td>5/27 19:58</td>
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
                                <p
                                    style={
                                        toggleState
                                            ? { color: 'blue' }
                                            : { color: 'red' }
                                    }
                                >
                                    {toggleState ? '예매 완료' : '예매 중'}
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default TicketerListPage;
