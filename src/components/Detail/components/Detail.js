import React from 'react';
import { useSelector } from 'react-redux';
import './Detail.css';
import { useParams } from 'react-router-dom';
import DetailContent from './DetailContent';
import DetailFooter from './DetailFooter';

function Detail() {
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
            <DetailContent show={showList[index]} />
            <DetailFooter show={showList[index]} />
        </div>
    );
}

export default Detail;
