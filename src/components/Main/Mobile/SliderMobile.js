import React, { useEffect } from 'react';
import 'swiper/swiper-bundle.min.css';
import { ref, getDownloadURL } from 'firebase/storage';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navigation, Pagination, A11y, Zoom, Autoplay } from 'swiper';
import './SliderMobile.css';
import { fStorage } from '../../../Firebase';
import { markAsDownloadImage } from '../../../features/show/slices/showSlice';
import { getDateFormat } from '../../../functions/dateFeature';

// eslint-disable-next-line no-shadow
function SliderMobile() {
    const dispatch = useDispatch();
    const showList = useSelector((state) => state.show.showList);

    const getImageUrl = async (storageUrl) => {
        let downloadUrl;
        const imageRef = ref(fStorage, storageUrl);
        await getDownloadURL(imageRef).then((url) => {
            downloadUrl = url;
        });
        return downloadUrl;
    };

    useEffect(() => {
        showList.forEach((element, index) => {
            if (!element.imageDownloaded) {
                getImageUrl(element.image).then((url) => {
                    dispatch(markAsDownloadImage({ index, url }));
                });
            }
        });
    }, []);

    const MySwiper = {
        slidesPerView: 1,
        spaceBetween: 0.1,
        breakpoints: {
            345: {
                slidesPerView: 2,
                spaceBetween: 0.1,
            },
        },
    };

    return (
        <Swiper
            {...MySwiper}
            modules={[Navigation, Pagination, A11y, Zoom, Autoplay]}
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
                <SwiperSlide className="eventBoard-mobile" key={slide.id}>
                    <Link
                        to={`/detail/${slide.id}`}
                        style={{ textDecoration: 'none' }}
                    >
                        <div className="poster-mobile">
                            <h2 className="dday-mobile">TODAY</h2>
                            <img
                                className="ddayImg-mobile"
                                src="images/dday2.svg"
                                alt="dday"
                            />
                            {slide.imageDownloaded ? (
                                <img
                                    className="eventImage-mobile"
                                    src={slide.image}
                                    alt={slide.title}
                                />
                            ) : (
                                <img
                                    className="eventImage-mobile"
                                    src="images/loadImage.png"
                                    alt={slide.title}
                                />
                            )}
                        </div>
                        <p className="eventName-mobile">{slide.title}</p>
                        <p className="eventDate-mobile">
                            {getDateFormat(slide.startDate)}
                        </p>
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default SliderMobile;
