import React from 'react';
import './ErrorPage.css';
import { Link } from 'react-router-dom';

function ErrorPage() {
    return (
        <div className="page-board">
            <div className="error-image">
                <img src="/images/logo_error.png" alt="잘못된 경로입니다." />
            </div>
            <p className="error-message-title">
                죄송합니다. 현재 찾을 수 없는 페이지를 요청하셨습니다.
            </p>
            <p className="error-message-content">
                요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하셨습니다.
                주소를 다시 확인해주세요.
            </p>
            <div className="error-buttons">
                <Link to="/">
                    <button>메인으로 &gt;</button>
                </Link>

                <button>이전 페이지 &gt;</button>
            </div>
        </div>
    );
}

export default ErrorPage;
