import React from 'react';
import MyPageRoute from '../routes/MyPageRoute';
import MypageForm from '../components/Main/MyPage/MypageForm';
import MainHeaderDesktop from '../components/Header/desktop/MainHeaderDesktop/MainHeaderDesktop';
import useMainPageLoading from '../hooks/useMainPageLoading';
import Loading from '../components/Loading';
import Mobile from '../components/MediaQuery/Mobile';
import Desktop from '../components/MediaQuery/Desktop';
import MainHeaderMobile from '../components/Header/mobile/MainHeaderMobile/MainHeaderMobile';

function MyPageContainer() {
    const [isLoaded, setIsLoaded, onRefresh] = useMainPageLoading();

    if (isLoaded)
        return (
            <div>
                <Desktop>
                    <MainHeaderDesktop />
                </Desktop>
                <Mobile>
                    <MainHeaderMobile />
                </Mobile>
                <MypageForm />
                <MyPageRoute />
            </div>
        );
    else return <Loading />;
}

export default MyPageContainer;
