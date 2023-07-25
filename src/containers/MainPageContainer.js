import React from 'react';
import MainPageRoute from '../routes/MainPageRoute';
import Header from '../components/Header';

function MainPageContainer() {
    return (
        <div>
            <Header />
            <MainPageRoute />
        </div>
    );
}

export default MainPageContainer;
