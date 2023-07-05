import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchShowList } from '../../../features/show/slices/showSlice';
import './MainPageDesktop.css';
import getShows from '../../../features/show/api/getShows';
import SliderDesktop from './SliderDesktop';
import Loading from '../../Loading';

function MainPageDesktop() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    async function onRefresh() {
        await getShows().then((value) => {
            dispatch(fetchShowList(value));
            setIsLoaded(true);
        });
    }

    useEffect(() => {
        onRefresh();
    }, []);

    return isLoaded ? (
        <div>
            <h3 className="ticketsOpen">📽️Tickets Open🎞</h3>
            <div className="slider">
                <div>
                    <SliderDesktop />
                </div>
            </div>
        </div>
    ) : (
        <Loading />
    );
}

export default MainPageDesktop;
