import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HostCreate from './HostCreate';

import './HostUpdate.css';

/*eslint-disable*/
function HostUpdate() {
    const navigate = useNavigate();
    function getIndex(showList, id) {
        return showList.findIndex((element) => element.id === id);
    }

    const { id } = useParams();
    console.log(id);
    const showList = useSelector((state) => state.show.showList);
    const index = getIndex(showList, id);
    console.log(showList[index]);
    return <HostCreate />;
}

export default HostUpdate;
