import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShowList } from '../../../../features/show/slices/showSlice';
import './HostMainPageDesktop.css';
import { getShowsDocument } from '../../../../features/show/api/showsDocumentApi';
import Loading from '../../../Loading';

function HostMainPageDesktop() {
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
        <div className="created-event-button">
            <button
                type="button"
                className="createdEvent"
                onClick={() => navigate(`/host/manage/${ownShows[i].id}`)}
            >
                <p className="Text">{value.title}</p>
            </button>
        </div>
    ));

    useEffect(() => {
        onRefresh();
    }, []);

    return isLoaded ? (
        <div className="whole">
            <div>
                <p className="title">주최한 공연</p>
            </div>
            {displayShowContent}
            <div className="create-button">
                <button
                    type="button"
                    className="create"
                    onClick={() => navigate('create')}
                >
                    <p className="Text"> + 공연 추가하기</p>
                </button>
            </div>
        </div>
    ) : (
        <Loading />
    );
}

export default HostMainPageDesktop;
