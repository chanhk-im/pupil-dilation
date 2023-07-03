import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShowList } from '../features/show/slices/showSlice';
import './TicketerListPage.css';
import getShows from '../features/show/api/getShows';

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
        <div>
            <p>예매자 확인 페이지임</p>
        </div>
    );
}

export default TicketerListPage;
