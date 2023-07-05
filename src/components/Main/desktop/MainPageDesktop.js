import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    fetchShowList,
    addShow,
} from '../../../features/show/slices/showSlice';
import './MainPageDesktop.css';
import {
    getShowsDocument,
    createShowsDocument,
} from '../../../features/show/api/showsDocument';
import SliderDesktop from './SliderDesktop';
import Loading from '../../Loading';

function MainPageDesktop() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    async function onRefresh() {
        await getShowsDocument().then((value) => {
            dispatch(fetchShowList(value));
            setIsLoaded(true);
        });
    }

    const test = async () => {
        setIsLoaded(false);
        await createShowsDocument().then((res) => {
            alert('success!');
            dispatch(addShow(res));
            setIsLoaded(true);
        });
    };

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
            <button onClick={test} type="button">
                test
            </button>
        </div>
    ) : (
        <Loading />
    );
}

export default MainPageDesktop;
