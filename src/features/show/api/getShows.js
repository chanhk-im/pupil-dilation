import { collection, getDocs } from 'firebase/firestore';
import { fireStore } from '../../../Firebase';

export default async function getShows() {
    const showList = [];
    const querySnapshot = await getDocs(collection(fireStore, 'shows'));
    querySnapshot.forEach((doc) => {
        const show = {
            id: doc.id,
            title: doc.data().title,
            introduction: doc.data().introduction,
            period: doc.data().period,
            schedule: doc.data().schedule,
            place: doc.data().place,
            price: doc.data().price,
            image: doc.data().image,
            imageDownloaded: false,
        };
        showList.push(show);
    });

    return showList;
}
