import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TicketList from '../components/Main/MyPage/TicketList';
import UserInfo from '../components/Main/MyPage/UserInfo';
import ChangePW from '../components/Main/MyPage/ChangePW';
import ErrorPage from '../components/Error/ErrorPage';

function MyPageRoute() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<UserInfo />} />
                <Route path="/ticketed" element={<TicketList />} />
                <Route path="*" element={<ErrorPage />} />
                <Route path="/changepw" element={<ChangePW />} />
            </Routes>
        </div>
    );
}

export default MyPageRoute;
