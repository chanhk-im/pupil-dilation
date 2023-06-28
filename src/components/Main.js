import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'swiper/swiper.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import PropTypes from 'prop-types';
import { fetchShowList } from '../features/show/slices/showSlice';
import './Main.css';
import slides from './image.json';
import getShows from '../features/show/api/getShows';

// eslint-disable-next-line no-shadow
function Slider({ slides }) {
    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={4} // 몇개를 한 슬라이드에 담는지
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            {slides.map((slide) => (
                <SwiperSlide className="eventBoard" key={slide.image}>
                    <img
                        className="eventImage"
                        src={slide.image}
                        alt={slide.title}
                    />
                    <p className="eventName">{slide.title}</p>
                    <p>{slide.subtitle}</p>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
Slider.propTypes = {
    slides: PropTypes.node.isRequired,
};

function Main() {
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
            <h3 className="ticketsOpen">Tickets Open</h3>
            <Slider className="slider" slides={slides} />
            <div className="slider">
                <button type="button">〈</button>
                <div className="eventBoard">
                    <div className="eventSlot">
                        <img
                            className="eventImage"
                            src="images/Dongari1.png"
                            alt="Image1"
                        />
                        <p className="eventName">
                            <strong>즉새두의 야간 작업실</strong>
                        </p>
                        <p>2023.06.18(일) 22:00</p>
                    </div>
                    <div className="eventSlot">
                        <img
                            className="eventImage"
                            src="images/Dongari2.jpg"
                            alt="Image2"
                        />
                        <p className="eventName">
                            <strong>NEO 카페 in Seoul</strong>
                        </p>
                        <p>2023.07.15(토) 17:00</p>
                    </div>
                    <div className="eventSlot">
                        <img
                            className="eventImage"
                            src="images/Dongari3.jpg"
                            alt="Image3"
                        />
                        <p className="eventName">
                            <strong>메두사의 뗏목</strong>
                        </p>
                        <p>2023.06.08(목) 22:00</p>
                    </div>
                    <div className="eventSlot">
                        <img
                            className="eventImage"
                            src="images/Dongari4.jpg"
                            alt="Image4"
                        />
                        <p className="eventName">
                            <strong>NEO X Soul Connetion</strong>
                        </p>
                        <p>2023.06.03(토) 19:00</p>
                    </div>
                </div>
                <button type="button">〉</button>
            </div>
        </div>
    );
}

export default Main;
