import React from 'react';
import './LoadingOverlay.css';

function LoadingOverlay() {
    return (
        <div className="loading-overlay__container">
            <div>
                <img
                    className="loading-overlay__spin"
                    src="/assets/Spinner.gif"
                    alt="로딩중"
                    width="10%"
                />
                <img
                    className="loading-overlay__logo-not-spin"
                    src="/images/circle-logo.png"
                    alt="로고"
                    width="7%"
                />
            </div>
        </div>
    );
}

export default LoadingOverlay; 