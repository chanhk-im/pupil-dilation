import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HostPageRoute from '../routes/HostPageRoute';
import HostHeaderDesktop from '../components/Header/desktop/HostHeaderDesktop/HostHeaderDesktop';
import Popup from '../components/Popup/Popup';
import HostHeaderMobile from '../components/Header/mobile/HostHeaderMobile/HostHeaderMobile';
import Desktop from '../components/MediaQuery/Desktop';
import Mobile from '../components/MediaQuery/Mobile';

function HostPageContainer() {
    const navigate = useNavigate();
    const [popup, setPopup] = useState({
        open: false,
        message: '',
        callback: false,
    });

    const isHost = useSelector((state) => state.user.isHost);

    const handleIfNotHost = () => {
        if (!isHost) {
            setPopup({
                open: true,
                message: '권한이 없습니다!',
                callback: () => navigate('/'),
            });
        }
    };

    useEffect(() => {
        handleIfNotHost();
    }, []);

    return (
        <div>
            <Popup
                open={popup.open}
                setPopup={setPopup}
                message={popup.message}
                title={popup.title}
                callback={popup.callback}
            />
            <Desktop>
                <HostHeaderDesktop />
            </Desktop>
            <Mobile>
                <HostHeaderMobile />
            </Mobile>
            <HostPageRoute />
        </div>
    );
}

export default HostPageContainer;
