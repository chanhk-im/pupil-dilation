import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShowList } from '../../features/show/slices/showSlice';
import './css/TicketerListPage.css';
// import getShows from '../../features/show/api/getShows';
import { getShowsDocument } from '../../features/show/api/showsDocumentApi';

function TicketerListPage() {
    const dispatch = useDispatch();
    const showList = useSelector((state) => state.show.showList);
    async function onRefresh() {
        await getShowsDocument().then((value) => {
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
                <table className="tablet">
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
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default TicketerListPage;
