import React from 'react';
import { useSelector } from 'react-redux';
import './Detail.css';
import { useParams } from 'react-router-dom';
import DetailContent from './DetailContent';

function Detail() {
    const { id } = useParams();
    console.log(id);
    const showList = useSelector((state) => state.show.showList);
    return (
        <div className="detail">
            <DetailContent show={showList[id]} />
        </div>
    );
}

export default Detail;
