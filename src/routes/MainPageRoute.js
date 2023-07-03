import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../components/Main';
import Detail from '../components/Detail/Detail';
import LoginPage from '../components/LoginPage';
import SignUpPage from '../components/SignUpPage';
import Seats from '../components/Seats/Seats';
import TicketList from '../components/TicketList';
import HostMainPage from '../components/HostMainPage';
import HostEventManage from '../components/HostEventManage';
import Loading from '../components/Loading';
import HostCreate from '../components/HostCreate';

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
                <Route path="/loading" element={<Loading />} />
                <Route path="/hostcreate" element={<HostCreate />} />
            </Routes>
        </div>
    );
}

export default MainPageRoute;
