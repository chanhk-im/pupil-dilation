import React from 'react';
import 'swiper/swiper-bundle.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navigation, Pagination, A11y, Zoom, Autoplay } from 'swiper';
import './SliderDesktop.css';
import { getDateFormat } from '../../../functions/dateFeature';

// eslint-disable-next-line no-shadow
function SliderDesktop() {
    const showList = useSelector((state) => state.show.showList);

    const MySwiper = {
        slidesPerView: 1,
        spaceBetween: 0.1,
        breakpoints: {
            893: {
                slidesPerView: 2,
                spaceBetween: 0.1,
            },
            1330: {
                slidesPerView: 3,
                spaceBetween: 0.1,
            },
            1650: {
                slidesPerView: 4,
                spaceBetween: 0.1,
            },
        },
    };

    return (
        <Swiper
            {...MySwiper}
            modules={[Navigation, Pagination, A11y, Zoom, Autoplay]}
            // 몇개를 한 슬라이드에 담는지
            navigation
            //     nextEl: '.swiper-button-next',
            //     prevEl: '.swiper-button-prev',
            // }}
            // let $slides = document.querySelectorAll('.swiper-slide');
            // for(let i of $sliders){
            //     i.addEventListener('mouseover', funtion(){
            //         swiper.autoplay.stop();
            //     });
            //     i.addEventListener('mouseover', funtion(){
            //         swiper.autoplay.start();
            //     });
            // }
            pagination={{ clickable: true }}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            {showList.map((slide) => (
                <SwiperSlide className="eventBoard" key={slide.id}>
                    <Link
                        to={`/detail/${slide.id}`}
                        style={{ textDecoration: 'none' }}
                    >
                        <div className="poster">
                            <h2 className="dday">TODAY</h2>
                            <img
                                className="ddayImg"
                                src="images/dday2.svg"
                                alt="dday"
                            />
                            {slide.imageDownloaded ? (
                                <img
                                    className="eventImage"
                                    src={slide.image}
                                    alt={slide.title}
                                />
                            ) : (
                                <img
                                    className="eventImage"
                                    src="images/Dongari3.jpg"
                                    alt={slide.title}
                                />
                            )}
                        </div>
                        <p className="eventName">{slide.title}</p>
                        <p className="eventDate">
                            {getDateFormat(slide.startDate)}
                        </p>
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default SliderDesktop;
