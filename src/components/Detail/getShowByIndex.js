import { useSelector } from 'react-redux';

export default function getShowById(id) {
    const showList = useSelector((state) => state.show.showList);
    const index = showList.findIndex((element) => element.id === id);
    return showList[index];
}
