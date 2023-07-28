import React, { useEffect, useState } from 'react';
import './MainPageMobile.css';
import SliderMobile from './SliderMobile';
import Loading from '../../Loading';
import { useDispatch } from 'react-redux';
import {
    fetchShowList,
} from '../../../features/show/slices/showSlice';
import {
    getShowsDocument,
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
        </div>
    ) : (
        <div>
            <Loading />
        </div>
    );
}

export default MainPageMobile;
