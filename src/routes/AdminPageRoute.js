import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminPage from '../components/Admin/AdminPage';
import ErrorPage from '../components/Error/ErrorPage';

function AdminPageRoute() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<AdminPage />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </div>
    );
}

export default AdminPageRoute;
