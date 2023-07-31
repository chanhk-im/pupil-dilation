import React from 'react';
import './HostHeaderMobile.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { restoreUser } from '../../../../features/user/slices/userSlice';

function HostHeaderMobile() {
    const isLogged = useSelector((state) => state.user.isLogged);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onClickLogout = () => {
        dispatch(restoreUser());
        navigate('/login');
    };
    return (
        <>
            <div className="host-first-header">
                <div className="host-first-header-button">
                    {isLogged ? (
                        <button
                            className="host-first-header-signed"
                            onClick={onClickLogout}
                        >
                            로그아웃
                        </button>
                    ) : (
                        <div className="host-first-header-button">
                            <Link to="/login">
                                <button>로그인</button>
                            </Link>

                            <Link to="/login/signup">
                                <button>회원가입</button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            <div className="second-host-header">
                <Link to="/">
                    <img
                        src="/img/header_logo.svg"
                        alt="동공확장"
                        className="mobile-header-logo"
                    />
                </Link>
                <img
                    src="/images/search.png"
                    alt="검색"
                    className="mobile-header-search"
                />
                <img
                    src="/images/user.svg"
                    alt="마이페이지"
                    className="mobile-mypage"
                />
            </div>
        </>
    );
}

export default HostHeaderMobile;
