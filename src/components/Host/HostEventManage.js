import React from 'react';
import { useSelector } from 'react-redux';
import './HostEventManage.css';
import { useParams, useNavigate } from 'react-router-dom';
import HostEventContent from './HostEventContent';

function HostEventManage() {
    const navigate = useNavigate();
    function getIndex(showList, id) {
        return showList.findIndex((element) => element.id === id);
    }

    const { id } = useParams();
    console.log(id);
    const showList = useSelector((state) => state.show.showList);
    const index = getIndex(showList, id);
    console.log(showList[index]);

    return (
        <div className="detail">
            <div className="buttonBoard">
                <button
                    className="updateButton"
                    type="button"
                    onClick={() => navigate('/host/update')}
                >
                    정보 수정
                </button>
                <button className="delateButton" type="button">
                    공연 삭제
                </button>
            </div>
            <HostEventContent show={showList[index]} />
            <button type="button" onClick={() => {}} className="CheckButton">
                예매자 목록 보기
            </button>
        </div>
    );
}

export default HostEventManage;
