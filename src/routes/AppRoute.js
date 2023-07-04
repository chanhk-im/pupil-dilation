import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPageContainer from '../containers/MainPageContainer';

function AppRoute() {
    return (
        <div>
            <Routes>
                <Route path="/*" element={<MainPageContainer />} />
            </Routes>
        </div>
    );
}

export default AppRoute;
