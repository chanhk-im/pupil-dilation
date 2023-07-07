import { collection, getDocs, addDoc, getDoc } from 'firebase/firestore';
import { fireStore } from '../../../Firebase';

export async function getShowsDocument() {
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

export async function createShowsDocument() {
    let show = {};
    await addDoc(collection(fireStore, 'shows'), {
        title: '미르',
        introduction: '자공 많관부!',
        period: '2023.10.11 ~ 2023.10.13',
        schedule: ['(10.11 ?) 20:00', '(10.12 ?) 20:00', '(10.13 ?) 20:00'],
        place: 'TBD',
        price: 6000,
        image: 'show-image/Dongari1.png',
    })
        .then(async (value) => {
            const createdSnapshot = await getDoc(value);
            show = {
                id: createdSnapshot.id,
                title: createdSnapshot.data().title,
                introduction: createdSnapshot.data().introduction,
                period: createdSnapshot.data().period,
                schedule: createdSnapshot.data().schedule,
                place: createdSnapshot.data().place,
                price: createdSnapshot.data().price,
                image: createdSnapshot.data().image,
                imageDownloaded: false,
            };
            return show;
        })
        .catch(() => {
            return show;
        });
    return show;
}
