import React from 'react';
import { useDispatch } from 'react-redux';
import {
    addShow,
} from '../../../features/show/slices/showSlice';
import './MainPageDesktop.css';
import {
    createShowsDocument,
} from '../../../features/show/api/showsDocumentApi';
import SliderDesktop from './SliderDesktop';

function MainPageDesktop() {
    const dispatch = useDispatch();

    const test = async () => {
        setIsLoaded(false);
        await createShowsDocument().then((res) => {
            alert('success!');
            dispatch(addShow(res));
            setIsLoaded(true);
        });
    };

    return (
        <div>
            <h3 className="ticketsOpen">📽️Tickets Open🎞</h3>
            <div className="slider">
                <div>
                    <SliderDesktop />
                </div>
            </div>
            <button onClick={test} type="button">
                test
            </button>
        </div>
    );
}

export default MainPageDesktop;
