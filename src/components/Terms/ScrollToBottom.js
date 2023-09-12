import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToBottom(props) {
    const { pathname } = useLocation();

    useEffect(() => {
        console.log('Scrolling to bottom');
        window.scrollTo(0, -50);
    }, [pathname]);

    return <>{props.children}</>;
}
