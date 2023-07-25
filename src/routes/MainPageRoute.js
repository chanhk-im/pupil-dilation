import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../components/Main/MainPage';
import Detail from '../components/Detail/Detail';
import Seats from '../components/Seats/Seats';
import TicketList from '../components/Main/MyPage/TicketList';
import Loading from '../components/Loading';
import AdminPage from '../components/Admin/AdminPage';
import ErrorPage from '../components/Error/ErrorPage';

function MainPageRoute() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="detail/:id" element={<Detail />} />
                <Route path="/seats" element={<Seats />} />
                <Route path="/ticketlist" element={<TicketList />} />
                <Route path="/loading" element={<Loading />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </div>
    );
}

export default MainPageRoute;
