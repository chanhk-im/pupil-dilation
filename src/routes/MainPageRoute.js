import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../components/Main';
import Detail from '../components/Detail/components/Detail';

function MainPageRoute() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="detail/:id" element={<Detail />} />
            </Routes>
        </div>
    );
}

export default MainPageRoute;
