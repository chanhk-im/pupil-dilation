import React, { useEffect, useState } from 'react';
import './MainPageMobile.css';
import SliderMobile from './SliderMobile';
import Loading from '../../Loading';
import { useDispatch } from 'react-redux';
import {
    fetchShowList,
    addShow,
} from '../../../features/show/slices/showSlice';
import {
    getShowsDocument,
    createShowsDocument,
} from '../../../features/show/api/showsDocumentApi';

function MainPageMobile() {
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
            <p className="mobile-main-header">Tickets Open</p>
            <div>
                <div>
                    <SliderMobile />
                </div>
            </div>
            <button onClick={test}>test</button>
        </div>
    ) : (
        <div>
            <Loading />
        </div>
    );
}

export default MainPageMobile;
