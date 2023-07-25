import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HostMainPage from '../components/Host/HostMainPage';
import HostEventManage from '../components/Host/HostEventManage';
import HostCreate from '../components/Host/HostCreate';
import TicketerListPage from '../components/Host/TicketerListPage';
import HostUpdate from '../components/Host/HostUpdate';
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
            </Routes>
        </div>
    );
}

export default HostPageRoute;
