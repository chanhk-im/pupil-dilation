import React from 'react';
import './AdminPage.css';

function AdminPage() {
    return (
        <div className="whole-container">
            <div clasName="admin-request">
                <h1>주최자 권한 요청</h1>
                <div className="request">
                    <p className="request-title">CRA</p>
                    <div className="right-side">
                        <p className="request-email">22000712@handong.ac.kr</p>
                        <div className="request-button">
                            <button className="confirm">확인</button>
                            <button className="delete">삭제</button>
                        </div>
                    </div>
                </div>
                <div className="request">
                    <p className="request-title">CRA</p>
                    <div className="right-side">
                        <p className="request-email">22000712@handong.ac.kr</p>
                        <div className="request-button">
                            <button className="confirm">확인</button>
                            <button className="delete">삭제</button>
                        </div>
                    </div>
                </div>
                <div className="request">
                    <p className="request-title">CRA</p>
                    <div className="right-side">
                        <p className="request-email">22000712@handong.ac.kr</p>
                        <div className="request-button">
                            <button className="confirm">확인</button>
                            <button className="delete">삭제</button>
                        </div>
                    </div>
                </div>
            </div>
            <div clasName="already-request">
                <h1>등록된 주최자 계정</h1>
                <div className="already">
                    <h2>test1</h2>
                </div>
                <div className="already">
                    <h2>test2</h2>
                </div>
                <div className="already">
                    <h2>test3</h2>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;
