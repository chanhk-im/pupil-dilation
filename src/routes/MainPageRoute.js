import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../components/Main';
import Detail from '../components/Detail/Detail';
import LoginPage from '../components/Login/LoginPage';
import SignUpPage from '../components/Login/SignUpPage';
import Seats from '../components/Seats/Seats';
import TicketList from '../components/MyPage/TicketList';
import HostMainPage from '../components/Host/HostMainPage';
import HostEventManage from '../components/Host/HostEventManage';
import Loading from '../components/Loading';
import HostCreate from '../components/HostCreate';
import TicketerListPage from '../components/TicketerListPage';

function MainPageRoute() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="detail/:id" element={<Detail />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/seats" element={<Seats />} />
                <Route path="/ticketlist" element={<TicketList />} />
                <Route path="/HostMain" element={<HostMainPage />} />
                <Route
                    path="/HostEventManage/:id"
                    element={<HostEventManage />}
                />
                <Route path="/TicketerList" element={<TicketerListPage />} />
                <Route path="/loading" element={<Loading />} />
                <Route path="/hostcreate" element={<HostCreate />} />
            </Routes>
        </div>
    );
}

export default MainPageRoute;
