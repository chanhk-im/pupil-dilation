import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchShowList } from '../../../features/show/slices/showSlice';
import './MainPageDesktop.css';
import getShows from '../../../features/show/api/getShows';
import SliderDesktop from './SliderDesktop';

function MainPageDesktop() {
    const dispatch = useDispatch();
    async function onRefresh() {
        await getShows().then((value) => {
            dispatch(fetchShowList(value));
        });
    }

    useEffect(() => {
        onRefresh();
    }, []);

    return (
        <div>
            <h3 className="ticketsOpen">📽️Tickets Open🎞</h3>
            <div className="slider">
                <div>
                    <SliderDesktop />
                </div>
            </div>
        </div>
    );
}

export default MainPageDesktop;
