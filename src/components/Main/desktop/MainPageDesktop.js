import React from 'react';
import './MainPageDesktop.css';
import SliderDesktop from './SliderDesktop';

function MainPageDesktop() {


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
