import React from 'react';
import 'swiper/swiper-bundle.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import PropTypes from 'prop-types';
import { Navigation, Pagination, A11y, Zoom, Autoplay } from 'swiper';
import './Main.css';

// eslint-disable-next-line no-shadow
function Slider({ slides }) {
    return (
        <Swiper
            modules={[Navigation, Pagination, A11y, Zoom, Autoplay]}
            spaceBetween={50}
            slidesPerView={4} // 몇개를 한 슬라이드에 담는지
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
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
                    <p className="eventDate">{slide.date}</p>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
Slider.propTypes = {
    slides: PropTypes.node.isRequired,
};

export default Slider;
