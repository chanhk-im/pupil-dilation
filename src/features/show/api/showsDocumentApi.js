import {
    collection,
    doc,
    getDocs,
    addDoc,
    getDoc,
    setDoc,
    deleteDoc,
    updateDoc,
    query,
    where,
    and,
} from 'firebase/firestore';
import { fireStore } from '../../../Firebase';
import { resolveConfig } from 'prettier';

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
    const reference = collection(fireStore, 'seats');
    const q = query(
        reference,
        and(where('showId', '==', id), where('showNum', '==', showNum)),
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs;
}

export async function getShowSeatBySeatIndex(id, showNum, index) {
    const reference = collection(fireStore, 'seats');
    const q = query(
        reference,
        and(
            where('showId', '==', id),
            where('showNum', '==', showNum),
            where('index', '==', index),
        ),
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs;
}

export async function getShowSeatsByIdAndShowNumberNotExpired(id, showNum) {
    const expireDate = new Date(Date.now());
    expireDate.setMinutes(expireDate.getMinutes() - 15);
    const reference = collection(fireStore, 'seats');
    const q = query(
        reference,
        and(
            where('showId', '==', id),
            where('showNum', '==', showNum),
            where('time', '>=', expireDate),
        ),
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs;
}

export async function getShowTicketingById(id) {
    const reference = doc(fireStore, 'ticketing', id);
    const ticketing = await getDoc(reference);
    return ticketing;
}

export async function getShowTicketerListByShow(showId) {
    const reference = collection(fireStore, 'ticketing');
    const q = query(reference, where('showId', '==', showId));

    const res = await getDocs(q);
    return res;
}

export async function createShowTicketing(
    id,
    showNum,
    seats,
    userId,
    userName,
) {
    const reference = collection(fireStore, 'ticketing');
    const newReference = await addDoc(reference, {
        showId: id,
        showNum,
        userId,
        userName,
        seats,
        time: new Date(Date.now()),
        state: 0,
        remitted: false,
    });
    const newDocId = newReference.id;
    await updateDoc(newReference, { id: newDocId });

    return newReference.id;
}

export async function setShowTicketingToCompleted(ticketingId, ticketingInfo) {
    const reference = doc(fireStore, 'ticketing', ticketingId);
    await setDoc(reference, {
        ...ticketingInfo,
        id: ticketingId,
        state: 1,
    });
}

export async function createShowSeatsToProgress(id, showNum, seats, userId) {
    seats.forEach(async (e) => {
        const existSeat = await getShowSeatBySeatIndex(id, showNum, e.index);
        if (existSeat.length > 0) {
            const reference = doc(fireStore, 'seats', existSeat[0].id);
            await setDoc(reference, {
                index: e.index,
                name: e.name,
                showId: id,
                showNum,
                userId,
                state: 3,
                time: new Date(Date.now()),
            });
        } else {
            const reference = collection(fireStore, 'seats');
            await addDoc(reference, {
                index: e.index,
                name: e.name,
                showId: id,
                showNum,
                userId,
                state: 3,
                time: new Date(Date.now()),
            });
        }
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

export async function createShowsDocument(newShow, userId) {
    let show = {};
    await addDoc(collection(fireStore, 'shows'), { ...newShow, userId })
        .then(async (value) => {
            const createdSnapshot = await getDoc(value);
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
                userId,
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

export async function ticketReservDocument(userId) {
    const reference = collection(fireStore, 'ticketing');
    const q = query(reference, where('userId', '==', userId));

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs;
}

export async function changeRemmited(dataId, toggle) {
    try {
        await updateDoc(doc(fireStore, 'ticketing', dataId), {
            remitted: toggle,
        });
    } catch (e) {
        alert(e);
        return;
    }
}
