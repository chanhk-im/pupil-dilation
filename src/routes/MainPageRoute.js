import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../components/Main';
import Detail from '../features/Detail/components/Detail';
import LoginPage from '../components/LoginPage';

function MainPageRoute() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="detail/:id" element={<Detail />} />
                <Route path="/Login" element={<LoginPage />} />
            </Routes>
        </div>
    );
}

export default MainPageRoute;
