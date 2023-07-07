import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShowList } from '../../features/show/slices/showSlice';
import './HostMainPage.css';
import { getShowsDocument } from '../../features/show/api/showsDocument';
import Loading from '../Loading';

function HostMainPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const showList = useSelector((state) => state.show.showList);
    const [isLoaded, setIsLoaded] = useState(false);
    async function onRefresh() {
        await getShowsDocument().then((value) => {
            dispatch(fetchShowList(value));
            setIsLoaded(true);
        });
    }

    const displayShowContent = showList.map((value, i) => (
        <button
            type="button"
            className="createdEvent"
            onClick={() => navigate(`/host/manage/${showList[i].id}`)}
        >
            <p className="Text">{value.title}</p>
        </button>
    ));

    useEffect(() => {
        onRefresh();
    }, []);

    return isLoaded ? (
        <div className="whole">
            <div>
                <h1 className="title">주최한 공연</h1>
            </div>
            {displayShowContent}
            <div className="create">
                <p className="Text"> + 공연 추가하기</p>
            </div>
        </div>
    ) : (
        <Loading />
    );
}

export default HostMainPage;
