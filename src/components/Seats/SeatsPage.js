import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Seats from './Seats';
import SeatTicketingFrame from './SeatTicketingFrame';
import { getShowSeatsByIdAndShowNumber } from '../../features/show/api/showsDocumentApi';
import './SeatsPage.css';

function SeatsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selected, setSelected] = useState([]);
    const isLogged = useSelector((state) => state.user.isLogged);
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        console.log(selected);
    }, [selected]);

    useEffect(() => {
        if (!isLogged) {
            alert('로그인 하쇼');
            navigate('/login');
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
            <div className="seats-left">
                <h2 className="seats-select-text">좌석 선택</h2>
                <div className="seats-place-name">ANH 오디토리움</div>
                <div className="seats-stage">STAGE</div>
                <Seats id={id} showNum={1} selected={selected} onSeatClick={onSeatClick} />
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

            <SeatTicketingFrame id={id} selected={selected} user={user} />
        </div>
    );
}

export default SeatsPage;
