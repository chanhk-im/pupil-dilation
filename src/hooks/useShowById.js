import { useSelector } from 'react-redux';

export default function useShowById(id) {
    const showList = useSelector((state) => state.show.showList);
    const index = showList.findIndex((element) => element.id === id);
    return showList[index];
}