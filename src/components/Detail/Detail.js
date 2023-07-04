import React from 'react';
import { useParams } from 'react-router-dom';
import DetailContent from './DetailContent';
import DetailFooter from './DetailFooter';
import './Detail.css';

function Detail() {
    const { id } = useParams();
    console.log(id);

    return (
        <div className="detail">
            <DetailContent id={id} />
            <DetailFooter id={id} />
        </div>
    );
}

export default Detail;
