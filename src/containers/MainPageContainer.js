import React from 'react';
import MainPageRoute from '../routes/MainPageRoute';
import Header from '../components/Header';
import useMainPageLoading from '../hooks/useMainPageLoading';
import Loading from '../components/Loading';
import Mobile from '../components/MediaQuery/Mobile';
import Desktop from '../components/MediaQuery/Desktop';
import MobileHeader from '../components/MobileHeader';

function MainPageContainer() {
    const [isLoaded, setIsLoaded, onRefresh] = useMainPageLoading();

    if (isLoaded)
        return (
            <div>
              <Desktop>
                  <Header />
              </Desktop>
              <Mobile>
                  <MobileHeader />
              </Mobile>
              <MainPageRoute />
            </div>
          );
    else return <Loading />;
}

export default MainPageContainer;
