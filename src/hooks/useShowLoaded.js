import { useSelector } from 'react-redux';

export default function useShowLoaded() {
    const showLoaded = useSelector((state) => state.show.showLoaded);
    return showLoaded;
}
