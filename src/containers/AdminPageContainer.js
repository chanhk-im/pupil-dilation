import React from 'react';
import AdminHeaderDesktop from '../components/Header/desktop/AdminHeaderDesktop/AdminHeaderDesktop';
import AdminPageRoute from '../routes/AdminPageRoute';
import useMainPageLoading from '../hooks/useMainPageLoading';
import Loading from '../components/Loading';

function AdminPageContainer() {
    const [isLoaded, setIsLoaded, onRefresh] = useMainPageLoading();

    if (isLoaded)
        return (
            <div>
                <AdminHeaderDesktop />
                <AdminPageRoute />
            </div>
        );
    else return <Loading />;
}

export default AdminPageContainer;
