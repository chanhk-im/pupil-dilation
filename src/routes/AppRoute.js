import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage';

function AppRoute() {
    return (
        <div>
            <Routes>
                <Route path="/*" element={<MainPage />} />
            </Routes>
        </div>
    );
}

export default AppRoute;
