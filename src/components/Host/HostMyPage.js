import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../../features/user/api/firebase_auth';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { changePasswordUser } from '../../features/user/slices/userSlice';
import { useRef } from 'react';
import Popup from '../Popup/Popup';
import './HostMyPage.css';

function HostMyPage() {
    const [hostInfo, setHostInfo] = useState({
        currentPassword: '',
        newPassword: '',
        checkPassword: '',
    });

    const [popup, setPopup] = useState({
        open: false,
        message: '',
        callback: false,
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user.user);

    const onChangeAccount = (e) => {
        setHostInfo({
            ...hostInfo,
            [e.target.name]: e.target.value,
        });
    };

    const onCallback = (hostInfo) => {
        dispatch(changePasswordUser(hostInfo.newPassword));
        navigate('/host');
    };

    const id = userData.id;
    const realPassword = userData.password;
    const email = userData.email;

    const onButtonClick = async () => {
        await changePassword(
            id,
            hostInfo.currentPassword,
            realPassword,
            hostInfo.newPassword,
            hostInfo.checkPassword,
        ).then((e) => {
            if (e == 1)
                setPopup({
                    open: true,
                    message: '비밀번호가 일치하지 않습니다',
                });
            else if (e == 2)
                setPopup({
                    open: true,
                    message: '새 비밀번호를 입력해주세요',
                });
            else if (e == 3)
                setPopup({
                    open: true,
                    message: '새 비밀번호와 비밀번호 확인 부분이 다릅니다',
                });
            else {
                setPopup({
                    open: true,
                    message: '수정 완료!',
                    callback: () => {
                        onCallback(hostInfo);
                    },
                });
            }
        });
    };

    //password type 변경용 state
    const [passwordType, setPasswordType] = useState({
        type: 'password',
        visible: false,
    });

    //password type 변경하는 함수
    const handlePasswordType = (e) => {
        setPasswordType(() => {
            if (!passwordType.visible) {
                return { type: 'text', visible: true };
            }
            return { type: 'password', visible: false };
        });
    };

    return (
        <div className="host-mypage-container">
            <Popup
                open={popup.open}
                setPopup={setPopup}
                message={popup.message}
                title={popup.title}
                callback={popup.callback}
            />
            <div className="host-mypage-text">마이페이지</div>
            <div className="host-mypage-data">
                <div className="host-mypage-account-data">계정 정보</div>
                <div className="host-mypage-data-box">
                    <div className="host-mypage-box-name">CRA</div>
                    <div className="host-mypage-id">
                        <div className="host-mypage-id-text">아이디</div>
                        <div className="host-mypage-id-data">{id}</div>
                    </div>
                    <div className="host-mypage-pw">
                        <div className="host-mypage-pw-text">비밀번호</div>

                        <div className="host-mypage-pw-inputs">
                            <input
                                type={passwordType.type}
                                className="host-mypage-pw-input"
                                name="currentPassword"
                                placeholder="현재 비밀번호"
                                onChange={onChangeAccount}
                            ></input>
                            <input
                                type={passwordType.type}
                                className="host-mypage-pw-input"
                                name="newPassword"
                                placeholder="새 비밀번호"
                                onChange={onChangeAccount}
                            ></input>
                            <input
                                type={passwordType.type}
                                className="host-mypage-pw-input"
                                name="checkPassword"
                                placeholder="비밀번호 확인"
                                onChange={onChangeAccount}
                            ></input>
                            <div className="pw-visible">
                                <button
                                    className="see-pw-img"
                                    onClick={handlePasswordType}
                                >
                                    {passwordType.visible ? (
                                        <img
                                            className="blindPW"
                                            src="../../../images/blindPW.svg"
                                        />
                                    ) : (
                                        <img
                                            className="seePW"
                                            src="../../../images/seePW.svg"
                                        />
                                    )}
                                </button>
                                <label className="see-pw-text">
                                    비밀번호 표시하기
                                </label>
                            </div>
                            <button
                                type="button"
                                className="host-mypage-change-pw-button"
                                onClick={onButtonClick}
                            >
                                비밀번호 변경
                            </button>
                        </div>
                    </div>
                    <div className="host-email">
                        <div className="host-email-text">담당자 이메일</div>
                        <div className="host-email-data">{email}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HostMyPage;
