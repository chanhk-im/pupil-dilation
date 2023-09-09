import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminHeaderDesktop from '../components/Header/desktop/AdminHeaderDesktop/AdminHeaderDesktop';
import AdminPageRoute from '../routes/AdminPageRoute';
import useMainPageLoading from '../hooks/useMainPageLoading';
import Loading from '../components/Loading';
import Popup from '../components/Popup/Popup';

function AdminPageContainer() {
    const navigate = useNavigate();
    const isLogged = useSelector((state) => state.user.isLogged);
    const user = useSelector((state) => state.user.user);
    const [popup, setPopup] = useState({
        open: false,
        message: '',
        callback: false,
    });

    useEffect(() => {
        if (isLogged) {
            if (user.id !== 'admin') {
                setPopup({
                    open: true,
                    message: '권한이 없습니다.',
                    callback: () => navigate('/'),
                });
            }
        }
    });
    return (
        <div>
            <Popup
                open={popup.open}
                setPopup={setPopup}
                message={popup.message}
                title={popup.title}
                callback={popup.callback}
            />
            <AdminHeaderDesktop />
            <AdminPageRoute />
        </div>
    );
}

export default AdminPageContainer;
