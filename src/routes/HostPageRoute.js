import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HostMainPage from '../components/Host/HostMainPage';
import HostEventManage from '../components/Host/HostEventManage';
import HostCreate from '../components/Host/HostCreate';
import TicketerListPage from '../components/Host/TicketerListPage';

function HostPageRoute() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<HostMainPage />} />
                <Route path="/manage/:id" element={<HostEventManage />} />
                <Route path="/ticketer" element={<TicketerListPage />} />
                <Route path="/create" element={<HostCreate />} />
            </Routes>
        </div>
    );
}

export default HostPageRoute;
