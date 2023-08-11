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

    async function onRefresh() {
        await getShowsDocument().then((value) => {
            const ownShows = value.filter((v) => v.userId === user.id);
            dispatch(fetchShowList(ownShows));
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
            <button
                type="button"
                className="create"
                onClick={() => navigate('create')}
            >
                <p className="Text"> + 공연 추가하기</p>
            </button>
        </div>
    ) : (
        <Loading />
    );
}

export default HostMainPageDesktop;
