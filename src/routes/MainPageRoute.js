import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../components/Main/MainPage';
import Detail from '../components/Detail/Detail';
import SeatsPage from '../components/Seats/SeatsPage';
import Seats from '../components/Seats/Seats';
import UserInfo from '../components/Main/MyPage/UserInfo';
import TicketList from '../components/Main/MyPage/TicketList';
import ChangePW from '../components/Main/MyPage/ChangePW';
import Loading from '../components/Loading';
import AdminPage from '../components/Admin/AdminPage';
import PaymentPage from '../components/Seats/Pay/PaymentPage';
import ErrorPage from '../components/Error/ErrorPage';

function MainPageRoute() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="detail/:id" element={<Detail />} />
                <Route path="/seats/:id" element={<SeatsPage />} />
                <Route path="/userinfo" element={<UserInfo />} />
                <Route path="/ticketlist/:id" element={<TicketList />} />
                <Route path="/changepw" element={<ChangePW />} />
                <Route path="/loading" element={<Loading />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </div>
    );
}

export default MainPageRoute;
