import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../../../features/user/api/firebase_auth';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { changePasswordUser } from '../../../features/user/slices/userSlice';
import Popup from '../../Popup/Popup';
import './ChangePW.css';

function ChangePW() {
    const [userInfo, setUserInfo] = useState({
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
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        });
    };

    const onCallback = (userInfo) => {
        dispatch(changePasswordUser(userInfo.newPassword));
        navigate('/mypage');
    };

    const id = userData.id;
    const realPassword = userData.password;

    const onButtonClick = async () => {
        await changePassword(
            id,
            userInfo.currentPassword,
            realPassword,
            userInfo.newPassword,
            userInfo.checkPassword,
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
                        onCallback(userInfo);
                    },
                });
            }
        });
    };

    return (
        <div className="user-mypage-data">
            <Popup
                open={popup.open}
                setPopup={setPopup}
                message={popup.message}
                title={popup.title}
                callback={popup.callback}
            />
            <div className="user-mypage-account-data">비밀번호 변경</div>
            <div className="user-mypage-pw">
                <div className="user-mypage-pw-text">
                    <img
                        className="lock-icon"
                        src="/images/lock.svg"
                        alt="자물쇠"
                    ></img>
                    비밀번호
                </div>
                <div className="user-mypage-pw-inputs">
                    <input
                        type="password"
                        className="user-mypage-pw-input"
                        name="currentPassword"
                        placeholder="현재 비밀번호"
                        onChange={onChangeAccount}
                    ></input>
                    <input
                        type="password"
                        className="user-mypage-pw-input"
                        name="newPassword"
                        placeholder="새 비밀번호"
                        onChange={onChangeAccount}
                    ></input>
                    <input
                        type="password"
                        className="user-mypage-pw-input"
                        name="checkPassword"
                        placeholder="비밀번호 확인"
                        onChange={onChangeAccount}
                    ></input>
                    <button
                        type="button"
                        className="user-mypage-change-pw-button"
                        onClick={onButtonClick}
                    >
                        비밀번호 변경
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChangePW;
