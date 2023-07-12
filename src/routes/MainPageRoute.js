import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../components/Main/MainPage';
import Detail from '../components/Detail/Detail';
import Seats from '../components/Seats/Seats';
import TicketList from '../components/Main/MyPage/TicketList';
import Loading from '../components/Loading';

function MainPageRoute() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="detail/:id" element={<Detail />} />
                <Route path="/seats" element={<Seats />} />
                <Route path="/ticketlist" element={<TicketList />} />
                <Route path="/loading" element={<Loading />} />
            </Routes>
        </div>
    );
}

export default MainPageRoute;
