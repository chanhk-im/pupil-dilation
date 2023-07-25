import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPageContainer from '../containers/MainPageContainer';
import LoginPageContainer from '../containers/LoginPageContainer';
import HostPageContainer from '../containers/HostPageContainer';
import ErrorPage from '../components/Error/ErrorPage';

function AppRoute() {
    return (
        <div>
            <Routes>
                <Route path="/*" element={<MainPageContainer />} />
                <Route path="/login/*" element={<LoginPageContainer />} />
                <Route path="/host/*" element={<HostPageContainer />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </div>
    );
}

export default AppRoute;
