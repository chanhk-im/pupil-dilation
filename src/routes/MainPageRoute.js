import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../components/Main/MainPage';
import Detail from '../components/Detail/Detail';
import Seats from '../components/Seats/Seats';
import TicketList from '../components/MyPage/TicketList';
import Loading from '../components/Loading';
import HostPageContainer from '../containers/HostPageContainer';
import LoginPageContainer from '../containers/LoginPageContainer';

function MainPageRoute() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="detail/:id" element={<Detail />} />
                <Route path="/login/*" element={<LoginPageContainer />} />
                <Route path="/seats" element={<Seats />} />
                <Route path="/ticketlist" element={<TicketList />} />
                <Route path="/loading" element={<Loading />} />
                <Route path="/host/*" element={<HostPageContainer />} />
            </Routes>
        </div>
    );
}

export default MainPageRoute;
