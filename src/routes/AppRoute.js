import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPageContainer from '../containers/MainPageContainer';
import LoginPageContainer from '../containers/LoginPageContainer';
import HostPageContainer from '../containers/HostPageContainer';

function AppRoute() {
    return (
        <div>
            <Routes>
                <Route path="/*" element={<MainPageContainer />} />
                <Route path="/login/*" element={<LoginPageContainer />} />
                <Route path="/host/*" element={<HostPageContainer />} />
            </Routes>
        </div>
    );
}

export default AppRoute;
