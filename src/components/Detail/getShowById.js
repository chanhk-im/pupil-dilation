import { useSelector } from 'react-redux';

export default function getShowById(id) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const showList = useSelector((state) => state.show.showList);
    const index = showList.findIndex((element) => element.id === id);
    return showList[index];
}
