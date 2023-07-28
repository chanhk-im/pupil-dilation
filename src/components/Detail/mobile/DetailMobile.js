import React from 'react';
import { useParams } from 'react-router-dom';
import DetailContentMobile from './DetailContentMobile';
import DetailFooterMobile from './DetailFooterMobile';
import './DetailMobile.css';

function DetailMobile() {
    const { id } = useParams();
    console.log(id);

    return (
        <div className="detail-mobile">
            <DetailContentMobile id={id} />
            <DetailFooterMobile id={id} />
        </div>
    );
}

export default DetailMobile;
