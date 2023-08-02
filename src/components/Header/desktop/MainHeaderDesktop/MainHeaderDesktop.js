import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './MainHeaderDesktop.css';
import { restoreUser } from '../../../../features/user/slices/userSlice';

function MainHeaderDesktop() {
    const isLogged = useSelector((state) => state.user.isLogged);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showList = useSelector((state) => state.show.showList);
    const [searchValue, setSearchValue] = useState('');

    const [tooltipImage, setTooltipImage] = useState(null);

    const handleMouseEnter = (image) => {
        setTooltipImage(image);
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

    var notes = [];

    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
        notes = showList.filter((note) =>
            note.title.includes(event.target.value),
        );
        setSearchResults(notes);
    };

    const displaySearchContent = searchResults.map((value, key) => (
        <div
            className="searched-list"
            onClick={() => navigate('/detail/' + value.id)}
            // onMouseEnter={() => (
            //     <img
            //         className="show-image-mini"
            //         src={value.image}
            //         alt={value.title}
            //     />
            // )}
            onMouseEnter={() => handleMouseEnter(value.image)}
            onMouseLeave={handleMouseLeave}
        >
            {/* {tooltipImage ? (
                <div className="tool" style={{ color: 'blue' }}>
                    {value.title}
                </div>
            ) : (
                <div className="tool">{value.title}</div>
            )} */}
            {value.title}
        </div>
    ));
    console.log(notes);
    return (
        <div className="header">
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
                    <div>
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
                <Link to="/">
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
                            placeholder="&nbsp;공연/동아리 검색"
                            onFocus={handleInputFocus}
                            onChange={handleInputChange}
                        />
                        <img
                            className="search-button"
                            alt="search-button"
                            src="/images/search.png"
                        />
                        {isModalOpen && (
                            <div className="header-modal">
                                <ul>{displaySearchContent}</ul>
                                {tooltipImage ? (
                                    <div className="tooltip">
                                        <img
                                            className="show-image-mini"
                                            src={tooltipImage}
                                            alt="Tooltip"
                                        />
                                    </div>
                                ) : (
                                    <div className="tooltip">
                                        <img
                                            className="show-image-mini"
                                            src={
                                                searchResults.length > 0
                                                    ? searchResults[0].image
                                                    : ''
                                            }
                                            alt="Tooltip"
                                        />
                                    </div>
                                )}
                                <img
                                    className="search-line"
                                    src="/images/Vector 710.png"
                                    alt="line"
                                />
                                <button onClick={closeModal}>닫기</button>
                            </div>
                        )}
                    </div>
                    <img
                        className="user-button"
                        alt="search-button"
                        src="/images/user.svg"
                    />
                </div>
            </div>
        </div>
    );
}

export default MainHeaderDesktop;
