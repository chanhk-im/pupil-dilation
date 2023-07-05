import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShowList } from '../../features/show/slices/showSlice';
import './css/TicketerListPage.css';
import getShows from '../../features/show/api/getShows';

function TicketerListPage() {
    const dispatch = useDispatch();
    const showList = useSelector((state) => state.show.showList);
    async function onRefresh() {
        await getShows().then((value) => {
            dispatch(fetchShowList(value));
            console.log(showList[0]);
        });
    }

    useEffect(() => {
        onRefresh();
    }, []);

    return (
        <>
            <h1 className="title">예매자 목록</h1>
            <div className="ticketer-list-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>목록</th>
                            <th>이름</th>
                            <th>좌석</th>
                            <th>예매 일시</th>
                            <th>입금 현황</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>조동운</td>
                            <td>12A</td>
                            <td>5/27 20:00</td>
                            <td>
                                <section className="model-1">
                                    <p>입금 전</p>
                                    <div className="checkbox">
                                        <input type="checkbox" id="check" />
                                        <label htmlFor="check" />
                                    </div>
                                    <p>입금 후</p>
                                </section>
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>임찬혁</td>
                            <td>12B</td>
                            <td>5/28 16:00</td>
                            <td>
                                <section className="model-1">
                                    <p>입금 전</p>
                                    <div className="checkbox">
                                        <input type="checkbox" id="check" />
                                        <label htmlFor="check" />
                                    </div>
                                    <p>입금 후</p>
                                </section>
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>임혜원</td>
                            <td>12C</td>
                            <td>5/28 20:17</td>
                            <td>
                                <section className="model-1">
                                    <p>입금 전</p>
                                    <div className="checkbox">
                                        <input type="checkbox" id="check" />
                                        <label htmlFor="check" />
                                    </div>
                                    <p>입금 후</p>
                                </section>
                            </td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>최동빈</td>
                            <td>12D</td>
                            <td>5/28 20:22</td>
                            <td>
                                <section className="model-1">
                                    <p>입금 전</p>
                                    <div className="checkbox">
                                        <input type="checkbox" id="check" />
                                        <label htmlFor="check" />
                                    </div>
                                    <p>입금 후</p>
                                </section>
                            </td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>유하은</td>
                            <td>12E</td>
                            <td>5/29 21:10</td>
                            <td>
                                <section className="model-1">
                                    <p>입금 전</p>
                                    <div className="checkbox">
                                        <input type="checkbox" id="check" />
                                        <label htmlFor="check" />
                                    </div>
                                    <p>입금 후</p>
                                </section>
                            </td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>김민혁</td>
                            <td>12F</td>
                            <td>5/29 21:12</td>
                            <td>
                                <section className="model-1">
                                    <p>입금 전</p>
                                    <div className="checkbox">
                                        <input type="checkbox" id="check" />
                                        <label htmlFor="check" />
                                    </div>
                                    <p>입금 후</p>
                                </section>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default TicketerListPage;
