import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './HostEventManage.css';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, deleteObject } from 'firebase/storage';
import HostEventContent from './HostEventContent';
import { fStorage } from '../../Firebase';
import { deleteShowsDocument } from '../../features/show/api/showsDocumentApi';
import DeletePopup from '../Popup/DeletePopup';

function HostEventManage() {
    const navigate = useNavigate();
    function getIndex(showList, id) {
        return showList.findIndex((element) => element.id === id);
    }
    const [popup, setPopup] = useState({
        open: false,
        message: '',
        callback: false,
    });
    const { id } = useParams();
    const showList = useSelector((state) => state.show.showList);
    const index = getIndex(showList, id);
    const imageRef = ref(fStorage, showList[index].image);

    const handleDeleteButtonOnClick = () => {
        setPopup({
            open: true,
            message: '정말로 삭제하시겠습니까?',
            callback: () => {
                deleteShowsDocument(id);
                navigate('/host');
                deleteObject(imageRef);
            },
        });
    };

    return (
        <div className="detail">
            <DeletePopup
                open={popup.open}
                setPopup={setPopup}
                message={popup.message}
                callback={popup.callback}
            />
            <div className="buttonBoard">
                <button
                    className="updateButton"
                    type="button"
                    onClick={() => navigate(`/host/update/${id}`)}
                >
                    정보 수정
                </button>
                <button
                    className="delateButton"
                    type="button"
                    onClick={handleDeleteButtonOnClick}
                >
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
