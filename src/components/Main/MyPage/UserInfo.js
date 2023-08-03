import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './UserInfo.css';

function UserInfo() {
    const navigate = useNavigate();
    const userData = useSelector((state) => state.user.user);
    const email = userData.email;
    const phone = userData.phone;
    const name = userData.name;
    const id = userData.id;
    return (
        <div className="profile-info">
            <div className="user-info">회원정보</div>
            <div className="profile-content ">
                <img
                    className="profile-pic"
                    src="images/Icon_user.svg"
                    alt="프로필 사진"
                />
                <div className="profile-right">
                    <div className="profile-top">
                        <div className="profile-name">{name}</div>
                        <div className="profile-name-area">님</div>
                        <div className="pw-change">
                            <button
                                onClick={() => navigate('/mypage/changepw')}
                            >
                                비밀번호 변경하기
                            </button>
                        </div>
                    </div>
                    <img
                        className="line-pic"
                        src="images/line.svg"
                        alt="line"
                    ></img>
                    <div className="profile-bottom">
                        <div className="info-id">
                            <img
                                className="id-icon"
                                src="images/User_face.svg"
                                alt="ID아이콘"
                            ></img>
                            <p className="title-id">아이디</p>
                            <div className="content-id">{id}</div>
                        </div>
                        <div className="info-email">
                            <img
                                className="email-icon"
                                src="images/mail.svg"
                                alt="Email아이콘"
                            ></img>
                            <p className="title-email">이메일</p>
                            <div className="content-email">{email}</div>
                        </div>
                        <div className="info-number">
                            <img
                                className="callnum-icon"
                                src="images/call.svg"
                                alt="call아이콘"
                            ></img>
                            <p className="title-number">전화번호</p>
                            <div className="content-number">{phone}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default UserInfo;
