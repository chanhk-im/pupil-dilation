import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MypageForm.css';

function MypageForm() {
    const navigate = useNavigate();
    return (
        <div className="mypage">
            <div className="two-selection">
                <button
                    type="button"
                    className="user-info-button"
                    onClick={() => navigate('/mypage')}
                >
                    <img
                        className="userinfo-icon"
                        src="/images/userinfo_navy.svg"
                        alt="회원정보 아이콘"
                    ></img>
                </button>
                <button
                    type="button"
                    className="ticketlist-button"
                    onClick={() => navigate('/mypage/ticketed')}
                >
                    <img
                        className="ticketlist-icon"
                        src="/images/ticketmini.svg"
                        alt="예매내역 아이콘"
                    ></img>
                    예매내역
                </button>
            </div>
            <div className="change-box-container">
                <div className="change-box"></div>
            </div>
        </div>
    );
}
export default MypageForm;
