import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShowList } from '../features/show/slices/showSlice';
import './HostMainPage.css';
import getShows from '../features/show/api/getShows';

function HostMainPage() {
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
        <div className="whole">
            <div>
                <h1 className="title">주최한 공연</h1>
            </div>
            <div className="createdEvent">
                <p className="Text">즉새두의 야간 작업실</p>
            </div>
            <div className="createdEvent">
                <p className="Text">메두사의 뗏목</p>
            </div>
            <div className="create">
                <p className="Text"> + 공연 추가하기</p>
            </div>
        </div>
    );
}

export default HostMainPage;
