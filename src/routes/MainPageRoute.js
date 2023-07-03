import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../components/Main';
import Detail from '../components/Detail/Detail';
import LoginPage from '../components/LoginPage';
import SignUpPage from '../components/SignUpPage';
import SeatsPage from '../pages/SeatsPage';

function MainPageRoute() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="detail/:id" element={<Detail />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/seats" element={<SeatsPage />} />
            </Routes>
        </div>
    );
}

export default MainPageRoute;
