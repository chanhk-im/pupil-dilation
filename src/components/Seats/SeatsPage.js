import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import Seats from './Seats';
import SeatTicketingFrame from './SeatTicketingFrame';
import './SeatsPage.css';
import Popup from '../Popup/Popup';
import LoadingOverlay from '../LoadingOverlay';

function SeatsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoaded, setIsLoaded] = useState(true);
    const showNum = Number(searchParams.get('showNum'));
    const [showIndex, setShowIndex] = useState(0);
    const [selected, setSelected] = useState([]);

    const showList = useSelector((state) => state.show.showList);
    const isLogged = useSelector((state) => state.user.isLogged);
    const user = useSelector((state) => state.user.user);
    const [popup, setPopup] = useState({
        open: false,
        message: '',
        callback: false,
    });
    const onLoading = () => {
        const index = showList.findIndex((element) => element.id === id);
        setShowIndex(index);
    };
    useEffect(() => {
        onLoading;
    });
    useEffect(() => {
    }, [selected]);
    const bankName = showList[showIndex].bankName;
    const bankNumber = showList[showIndex].bankNumber;
    useEffect(() => {
        if (!isLogged) {
            setPopup({
                open: true,
                message: '로그인 부탁드립니다.',
                callback: () => navigate('/login'),
            });
        }
    });

    const onSeatClick = (index, name) => {
        const newElement = { index, name };
        const currIndex = selected.findIndex((e) => {
            if (e.index === index && e.name === name) return true;
        });

        if (currIndex > -1) {
            setSelected(
                selected
                    .filter((e) => e.index !== index)
                    .sort((a, b) => {
                        if (a.index > b.index) return 1;
                        if (a.index === b.index) return 0;
                        return -1;
                    }),
            );
        } else {
            setSelected(
                [...selected, newElement].sort((a, b) => {
                    if (a.index > b.index) return 1;
                    if (a.index === b.index) return 0;
                    return -1;
                }),
            );
        }
    };

    return (
        <div className="seats-page">
            {!isLoaded ? <LoadingOverlay /> : <></>}
            <Popup
                open={popup.open}
                setPopup={setPopup}
                message={popup.message}
                title={popup.title}
                callback={popup.callback}
            />
            <div className="seats-left">
                <h2 className="seats-select-text">좌석 선택</h2>
                <div className="seats-place-name">ANH 오디토리움</div>
                <div className="test">
                    <div className="seats-stage">STAGE</div>
                </div>
                <Seats
                    id={id}
                    showNum={showNum}
                    selected={selected}
                    onSeatClick={onSeatClick}
                />
                <div className="seats-type-grid">
                    <div className="seats-type-content">
                        <div className="seats-type-box seats-type-box-selected" />
                        <div>선택한 좌석</div>
                    </div>
                    <div className="seats-type-content">
                        <div className="seats-type-box seats-type-box-available" />
                        <div>선택가능</div>
                    </div>
                    <div className="seats-type-content">
                        <div className="seats-type-box seats-type-box-ticketed" />
                        <div>예매완료</div>
                    </div>
                    <div />
                    <div className="seats-type-content">
                        <div className="seats-type-box seats-type-box-not-available" />
                        <div>선택불가</div>
                    </div>
                    <div className="seats-type-content">
                        <div className="seats-type-box seats-type-box-proceeding" />
                        <div>예매중</div>
                    </div>
                </div>
            </div>

            <SeatTicketingFrame
                id={id}
                showNum={showNum}
                selected={selected}
                user={user}
                setIsLoaded={setIsLoaded}
            />
        </div>
    );
}

export default SeatsPage;
