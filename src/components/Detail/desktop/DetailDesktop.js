import React from 'react';
import { useParams } from 'react-router-dom';
import DetailContentDesktop from './DetailContentDesktop';
import './DetailDesktop.css';
import DetailFooterDesktop from './DetailFooterDesktop';

function DetailDesktop() {
    const { id } = useParams();
    console.log(id);

    return (
        <div className="detail">
            <DetailContentDesktop id={id} />
            <DetailFooterDesktop id={id} />
        </div>
    );
}

export default DetailDesktop;
