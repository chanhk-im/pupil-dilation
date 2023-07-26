import {
    collection,
    doc,
    getDocs,
    addDoc,
    getDoc,
    setDoc,
    deleteDoc,
    updateDoc,
} from 'firebase/firestore';
import { fireStore } from '../../../Firebase';

export async function getShowDocumentById(id) {
    const documentSnapshot = await getDoc(doc(fireStore, 'shows', id));
    console.log(documentSnapshot.data());
    const document = {
        id: documentSnapshot.id,
        ...documentSnapshot.data(),
        imageDownloaded: false,
    };
    return document;
}

export async function getShowSeatsByIdAndShowNumber(id, showNum) {
    const reference = collection(
        fireStore,
        'shows',
        id,
        'showNumber',
        showNum.toString(),
        'seats',
    );
    const querySnapshot = await getDocs(reference);
    return querySnapshot.docs;
}

export async function createShowSeatsToProgress(id, showNum, seats, userId) {
    seats.forEach(async (e) => {
        const reference = doc(
            fireStore,
            'shows',
            id,
            'showNumber',
            showNum.toString(),
            'seats',
            e.index.toString(),
        );
        await setDoc(reference, {
            name: e.name,
            userId,
            state: 3,
            time: new Date(Date.now()),
        });
    });
}

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
            createdSnapshot.data().schedule.forEach(async (e, index) => {
                await setDoc(
                    doc(
                        fireStore,
                        'shows',
                        createdSnapshot.id,
                        'showNumber',
                        (index + 1).toString(),
                    ),
                    { date: e },
                );
            });
            show = {
                id: createdSnapshot.id,
                title: createdSnapshot.data().title,
                introduction: createdSnapshot.data().introduction,
                startDate: createdSnapshot.data().startDate.toDate(),
                endDate: createdSnapshot.data().endDate.toDate(),
                schedule: createdSnapshot.data().schedule,
                place: createdSnapshot.data().place,
                price: createdSnapshot.data().price,
                image: createdSnapshot.data().image,
                imageDownloaded: false,
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
    await updateDoc(doc(fireStore, 'shows', updateData.id), updateData)
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
