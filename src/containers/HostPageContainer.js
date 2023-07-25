import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HostPageRoute from '../routes/HostPageRoute';
import HostHeader from '../components/Host/HostHeader';

function HostPageContainer() {
    const navigate = useNavigate();

    const isHost = useSelector((state) => state.user.isHost);

    const handleIfNotHost = () => {
        if (!isHost) {
            alert('권한이 없습니다!!');
            navigate('/');
        }
    };

    useEffect(() => {
        handleIfNotHost();
    });

    return (
        <div>
            <HostHeader />
            <HostPageRoute />
        </div>
    );
}

export default HostPageContainer;
