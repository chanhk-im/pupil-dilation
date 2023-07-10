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
            ...elementDoc.data(),
            imageDownloaded: false,
        };
        const scheduleConvertToDate = show.schedule.map((e) => e.toDate());
        show.schedule = scheduleConvertToDate;
        show.startDate = show.startDate.toDate();
        show.endDate = show.endDate.toDate();
        showList.push(show);
    });

    return showList;
}

export async function createShowsDocument(newShow) {
    let show = {};
    await addDoc(collection(fireStore, 'shows'), newShow)
        .then(async (value) => {
            const createdSnapshot = await getDoc(value);
            show = {
                // id: createdSnapshot.id,
                title: createdSnapshot.data().title,
                introduction: createdSnapshot.data().introduction,
                // startDate: createdSnapshot.data().startDate.toDate(),
                // endDate: createdSnapshot.data().endDate.toDate(),
                // schedule: createdSnapshot.data().schedule,
                // place: createdSnapshot.data().place,
                price: createdSnapshot.data().price,
                // image: createdSnapshot.data().image,
                // imageDownloaded: false,
            };
            const scheduleConvertToDate = show.schedule.map((e) => e.toDate());
            show.schedule = scheduleConvertToDate;
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
                startDate: updatedSnapshot.data().startDate.toDate(),
                endDate: updatedSnapshot.data().endDate.toDate(),
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
