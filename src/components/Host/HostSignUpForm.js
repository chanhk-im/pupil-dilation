import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HostSignUpForm.css';

function HostSignUpForm({ onChangeAccount, onButtonClick }) {
    const navigate = useNavigate();

    return (
        <div className="container">
            <img className="logo" alt="pupil-dilation" src="/images/Logo.svg" />
            <div className="host-signup-right-page1">
                <div className="host-signup-right-high">
                    <div className="host-signup-sign-up-text">
                        주최자 가입 요청
                    </div>

                    <button
                        className="host-signup-return-button"
                        type="button"
                        onClick={() => navigate('/signup')}
                    >
                        <div className="host-signup-return-text">
                            회원가입으로 돌아가기
                        </div>
                    </button>
                </div>
                <div className="host-signup-input-container">
                    <div className="host-signup-title">동아리/단체 명</div>
                    <input
                        type="text"
                        className="host-signup-input"
                        id="name"
                        name="name"
                        placeholder="동아리명 입력"
                        onChange={onChangeAccount}
                    />
                </div>
                <div className="host-signup-input-container">
                    <div className="host-signup-title">아이디</div>
                    <input
                        type="text"
                        className="host-signup-input"
                        id="id"
                        name="id"
                        placeholder="4~12자리 영소문자, 숫자"
                        onChange={onChangeAccount}
                    />
                </div>
                <div className="host-signup-input-container">
                    <div className="sign-up-title">비밀번호</div>
                    <input
                        type="password"
                        className="host-signup-input"
                        id="password"
                        name="password"
                        placeholder="8~20자리 영문 대/소문자, 숫자, 특수문자 조합"
                        onChange={onChangeAccount}
                    />
                </div>
                <div className="host-signup-input-container">
                    <div className="host-signup-title">비밀번호 재입력</div>
                    <input
                        type="password"
                        className="host-signup-input"
                        id="password-check"
                        name="password-check"
                        placeholder="확인을 위한 비밀번호 재입력"
                    />
                </div>
                <div>
                    <div className="host-signup-title">동아리/단체 이메일</div>
                    <p className="host-signup-email-notification">
                        *추후 변경이 불가능하니 기존의 공용 이메일 주소가 없는
                        경우 동아리/단체 공용 이메일 주소를 생성하여
                        등록해주시기 바랍니다. 주최자 가입 요청수락 등
                        주요알림을 본 이메일 주소로 받게 되니 참고바랍니다.
                    </p>
                    <input
                        type="text"
                        className="host-signup-input"
                        id="email"
                        name="email"
                        placeholder="example@abc.com"
                        onChange={onChangeAccount}
                    />
                </div>
                <button
                    className="host-signup-request"
                    type="button"
                    onClick={onButtonClick}
                >
                    <div className="host-signup-request-text2">요청하기</div>
                </button>
            </div>
        </div>
    );
}

export default HostSignUpForm;
