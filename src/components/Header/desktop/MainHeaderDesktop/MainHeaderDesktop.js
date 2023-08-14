import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './MainHeaderDesktop.css';
import { restoreUser } from '../../../../features/user/slices/userSlice';
import { getDateFormat } from '../../../../functions/dateFeature';

function MainHeaderDesktop() {
    const isLogged = useSelector((state) => state.user.isLogged);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showList = useSelector((state) => state.show.showList);
    const [searchValue, setSearchValue] = useState('');
    const [mouseValue, setmouseValue] = useState([]);

    const [tooltipImage, setTooltipImage] = useState(null);

    const outside = useRef();

    const handleMouseEnter = (value) => {
        setTooltipImage(value.image);
        setmouseValue(value);
    };

    const handleMouseLeave = () => {
        setTooltipImage(null);
    };

    const onClickLogout = () => {
        dispatch(restoreUser());
        navigate('/login');
    };

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleInputFocus = () => {
        openModal();
    };

    // const handleModalClick = (e) => {
    //     if (e.target === outside.current) {
    //         closeModal();
    //     }
    // };

    var notes = [];

    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
        notes = showList.filter((note) =>
            note.title.includes(event.target.value),
        );
        setSearchResults(notes);
    };

    const displaySearchContent = searchResults.map((value) =>
        value === mouseValue ? (
            <div
                className="searched-list-color"
                onClick={() => navigate('/detail/' + value.id)}
                onMouseEnter={() => handleMouseEnter(value)}
                onMouseLeave={handleMouseLeave}
            >
                {value.title}
            </div>
        ) : (
            <div
                className="searched-list-white"
                onClick={() => navigate('/detail/' + value.id)}
                onMouseEnter={() => handleMouseEnter(value)}
                onMouseLeave={handleMouseLeave}
            >
                {value.title}
            </div>
        ),
    );
    console.log(mouseValue);
    return (
        <div>
            <div className="whole-page">
                <div className="header ">
                    <div className="header-red">
                        {isLogged ? (
                            <button
                                type="button"
                                onClick={onClickLogout}
                                className="header__auth-logout"
                            >
                                로그아웃
                            </button>
                        ) : (
                            <div className="test">
                                <Link to="/login" className="auth">
                                    로그인
                                </Link>
                                <Link to="/login/signup" className="auth">
                                    회원가입
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className="line">
                        <Link className="test" to="/">
                            <img
                                className="pupil-dilation"
                                alt="my-header"
                                src="/img/header_img.png"
                            />
                        </Link>

                        <div className="line-right">
                            <div className="search-input">
                                <input
                                    type="text"
                                    id="search"
                                    value={searchValue}
                                    name="search"
                                    placeholder="공연/동아리 검색"
                                    onFocus={handleInputFocus}
                                    onChange={handleInputChange}
                                />
                                <img
                                    className="search-button"
                                    alt="search-button"
                                    src="/images/search.png"
                                />
                                {isModalOpen === true ? (
                                    <div
                                        className="header-modal"
                                        ref={outside}
                                        onClick={closeModal}
                                    >
                                        <ul>{displaySearchContent}</ul>
                                        {tooltipImage ? (
                                            <div className="tooltip">
                                                <img
                                                    className="show-image-mini"
                                                    src={tooltipImage}
                                                    alt=""
                                                />
                                                <div className="header-show-title">
                                                    {mouseValue.title}
                                                </div>
                                                <div className="header-show-time">
                                                    {getDateFormat(
                                                        mouseValue.startDate,
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="tooltip">
                                                <img
                                                    className="show-image-mini"
                                                    src={
                                                        searchResults.length > 0
                                                            ? searchResults[0]
                                                                  .image
                                                            : ''
                                                    }
                                                    alt="No Search"
                                                />
                                                <div className="header-show-title">
                                                    {searchResults.length > 0
                                                        ? searchResults[0].title
                                                        : ''}
                                                </div>
                                                <div className="header-show-time">
                                                    {searchResults.length > 0
                                                        ? getDateFormat(
                                                              searchResults[0]
                                                                  .startDate,
                                                          )
                                                        : ''}
                                                </div>
                                            </div>
                                        )}
                                        <img
                                            className="search-line"
                                            src="/images/Vector 710.png"
                                            alt="line"
                                        />
                                        <button
                                            className="closebutton"
                                            onClick={closeModal}
                                        >
                                            X
                                        </button>
                                    </div>
                                ) : null}
                            </div>
                            <Link className="test" to="/mypage">
                                <img
                                    className="user-button"
                                    alt="search-button"
                                    src="/images/user.svg"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
                {/* <div className="bottom-header" onClick={closeModal}></div> */}
            </div>
        </div>
    );
}

export default MainHeaderDesktop;
