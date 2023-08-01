import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './MainHeaderDesktop.css';
import { restoreUser } from '../../../../features/user/slices/userSlice';
// import SearchModal from '../../../Popup/SearchModal';

function MainHeaderDesktop() {
    const isLogged = useSelector((state) => state.user.isLogged);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showList = useSelector((state) => state.show.showList);
    const [searchValue, setSearchValue] = useState('');
    console.log(showList);
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
    // const onChangeSearch = (event) => {
    //     setSearchValue(event.target.value);
    // };

    // const onClickSearch = () => {
    //     setPopup({
    //         open: true,
    //         message: '더 이상 삭제할 수 없습니다!',
    //     });
    // };

    const handleInputFocus = () => {
        openModal();
    };

    var notes = [];

    // const [popup, setPopup] = useState({
    //     open: false,
    //     message: '',
    //     callback: false,
    // });
    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
        notes = showList.filter((note) =>
            note.title.includes(event.target.value),
        );
        // 여기에서 검색 로직을 구현하여 검색 결과를 업데이트합니다.
        // 예시로 검색 결과를 빈 배열로 설정합니다.
        setSearchResults(notes);
    };

    const displaySearchContent = searchResults.map((value) => (
        <Link to={`/detail/${value.id}`}>
            <li>{value.title}</li>
        </Link>
    ));

    console.log(notes);
    return (
        <div className="header">
            {/* <SearchModal
                open={popup.open}
                setPopup={setPopup}
                message={popup.message}
                title={popup.title}
                callback={popup.callback}
            /> */}
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
                            // onChange={(e) => {
                            //     notes = showList.filter((note) =>
                            //         note.title.includes(e.target.value),
                            //     );
                            //     console.log(notes);
                            // }}
                            // onClick={onClickSearch}
                            onFocus={handleInputFocus}
                            // onChange={onChangeSearch}
                            onChange={handleInputChange}
                        />
                        {/* <div className="search-data">{notes}</div> */}
                        <img
                            className="search-button"
                            alt="search-button"
                            src="/images/search.png"
                        />
                        {isModalOpen && (
                            <div className="modal">
                                {/* 모달에 검색 결과를 표시하는 부분을 구현하세요 */}
                                {/* 예시로 연관 공연들을 리스트로 보여줍니다. */}
                                <ul>
                                    {/* notes.map()
                                    <li>연관 공연 1</li>
                                    <li>연관 공연 2</li>
                                    ... */}
                                    {displaySearchContent}
                                </ul>
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
