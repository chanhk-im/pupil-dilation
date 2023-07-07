import {
    collection,
    doc,
    getDocs,
    addDoc,
    getDoc,
    setDoc,
    deleteDoc,
} from 'firebase/firestore';
import { fireStore } from '../../../Firebase';

export async function getShowsDocument() {
    const showList = [];
    const querySnapshot = await getDocs(collection(fireStore, 'shows'));
    querySnapshot.forEach((elementDoc) => {
        const show = {
            id: elementDoc.id,
            title: elementDoc.data().title,
            introduction: elementDoc.data().introduction,
            period: elementDoc.data().period,
            schedule: elementDoc.data().schedule,
            place: elementDoc.data().place,
            price: elementDoc.data().price,
            image: elementDoc.data().image,
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
        .catch((e) => {
            alert(e);
            return show;
        });
    return show;
}

export async function updateShowsDocument(updateData) {
    let show = {};
    await setDoc(doc(fireStore, 'shows', updateData.id))
        .then(async (value) => {
            const updatedSnapshot = await getDoc(value);
            show = {
                id: updatedSnapshot.id,
                title: updatedSnapshot.data().title,
                introduction: updatedSnapshot.data().introduction,
                period: updatedSnapshot.data().period,
                schedule: updatedSnapshot.data().schedule,
                place: updatedSnapshot.data().place,
                price: updatedSnapshot.data().price,
                image: updatedSnapshot.data().image,
                imageDownloaded: updateData.imageDownloaded,
            };
            return show;
        })
        .catch((e) => {
            alert(e);
            return show;
        });
    return show;
}

export async function deleteShowsDocument(deleteId) {
    await deleteDoc(doc(fireStore, 'shows', deleteId))
        .then(() => {
            return true;
        })
        .catch((e) => {
            alert(e);
            return false;
        });
    return false;
}
