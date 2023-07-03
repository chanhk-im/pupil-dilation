import React from 'react';
import './Loading.css';

function Loading() {
    return (
        <>
            <img
                className="spin"
                src="/assets/Spinner.gif"
                alt="로딩중"
                width="10%"
            />
            <img
                className="logo-not-spin"
                src="/images/circle-logo.png"
                alt="로고"
                width="7%"
            />
        </>
    );
}

export default Loading;
