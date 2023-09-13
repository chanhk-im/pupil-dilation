import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HostPageRoute from '../routes/HostPageRoute';
import HostHeaderDesktop from '../components/Header/desktop/HostHeaderDesktop/HostHeaderDesktop';
import Popup from '../components/Popup/Popup';
import HostHeaderMobile from '../components/Header/mobile/HostHeaderMobile/HostHeaderMobile';
import Desktop from '../components/MediaQuery/Desktop';
import Mobile from '../components/MediaQuery/Mobile';
import { checkRequestUsersDocument } from '../features/user/api/requestUsersDocumentApi';
import Loading from '../components/Loading';
import useMainPageLoading from '../hooks/useMainPageLoading';
import Footer from '../components/Footer/Footer';

function HostPageContainer() {
    const navigate = useNavigate();
    const [popup, setPopup] = useState({
        open: false,
        message: '',
        callback: false,
    });

    const isHost = useSelector((state) => state.user.user.id);
    const isLogged = useSelector((state) => state.user.isLogged);
    const [isLoaded, setIsLoaded, onRefresh] = useMainPageLoading();
    const handleIfNotHost = async () => {
        const check = await checkRequestUsersDocument(isHost);
        if (isLogged) {
            if (!check) {
                setPopup({
                    open: true,
                    message: '권한이 없습니다.',
                    callback: () => navigate('/'),
                });
            }
        } else {
            setPopup({
                open: true,
                message: '로그인 부탁드립니다.',
                callback: () => navigate('/login'),
            });
        }
    };

    useEffect(() => {
        handleIfNotHost();
    }, []);

    if (isLoaded)
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
                <Footer />
            </div>
        );
    else <Loading />;
}

export default HostPageContainer;
