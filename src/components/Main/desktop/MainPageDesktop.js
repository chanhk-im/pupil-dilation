import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShowList } from '../../../features/show/slices/showSlice';
import './MainPageDesktop.css';
import slides from '../image.json';
import getShows from '../../../features/show/api/getShows';
import SliderDesktop from './SliderDesktop';

function MainPageDesktop() {
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
            <h3 className="ticketsOpen">📽️Tickets Open🎞</h3>
            <div className="slider">
                <div>
                    <SliderDesktop slides={slides} />
                </div>
            </div>
        </div>
    );
}

export default MainPageDesktop;
