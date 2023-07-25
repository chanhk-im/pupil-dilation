import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HostMainPage from '../components/Host/HostMainPage';
import HostEventManage from '../components/Host/HostEventManage';
import HostCreate from '../components/Host/HostCreate';
import TicketerListPage from '../components/Host/TicketerListPage';
import HostUpdate from '../components/Host/HostUpdate';
import ErrorPage from '../components/Error/ErrorPage';
import HostMyPage from '../components/Host/HostMyPage';

function HostPageRoute() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<HostMainPage />} />
                <Route path="/manage/:id" element={<HostEventManage />} />
                <Route path="/ticketer" element={<TicketerListPage />} />
                <Route path="/create" element={<HostCreate />} />
                <Route path="/update/:id" element={<HostUpdate />} />
                <Route path="/mypage" element={<HostMyPage />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </div>
    );
}

export default HostPageRoute;
