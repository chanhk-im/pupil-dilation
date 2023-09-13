import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShowList } from '../../../../features/show/slices/showSlice';
import './HostMainPageMobile.css';
import { getShowsDocument } from '../../../../features/show/api/showsDocumentApi';
import Loading from '../../../Loading';

function HostMainPageMobile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const showList = useSelector((state) => state.show.showList);
    const user = useSelector((state) => state.user.user);
    const [isLoaded, setIsLoaded] = useState(false);
    const [ownShows, setOwnShows] = useState([]);

    async function onRefresh() {
        const newOwnShows = showList.filter((v) => v.userId === user.id);
        setOwnShows(newOwnShows);
        setIsLoaded(true);
    }

    const displayShowContent = ownShows.map((value, i) => (
        <button
            type="button"
            className="created-event-mobile"
            onClick={() => navigate(`/host/manage/${ownShows[i].id}`)}
        >
            <p className="event-text-mobile">{value.title}</p>
        </button>
    ));

    useEffect(() => {
        onRefresh();
    }, []);

    return isLoaded ? (
        <div className="host-main-container">
            <div>
                <h1 className="host-main-title">주최한 공연</h1>
            </div>
            {displayShowContent}
            <button
                type="button"
                className="event-create-mobile"
                onClick={() => navigate('create')}
            >
                <p className="event-text-mobile"> + 공연 추가하기</p>
            </button>
        </div>
    ) : (
        <Loading />
    );
}

export default HostMainPageMobile;
