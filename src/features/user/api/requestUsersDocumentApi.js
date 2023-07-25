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

export async function getNotAcceptedRequestUsersDocument() {
    const requestList = [];
    const q = query(
        collection(fireStore, 'requestUsers'),
        where('accepted', '==', false),
    );
    try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((elementDoc) => {
            const reqUser = elementDoc.data().id;
            requestList.push(reqUser);
        });
    } catch (e) {
        alert(e);
        return;
    }

    return requestList;
}

export async function getRequestUsersDocumenetById(reqUserId) {
    const reference = doc(fireStore, 'requestUsers', reqUserId);
    try {
        const snapshot = await getDoc(reference);
        return snapshot.data();
    } catch (e) {
        alert(e);
        return;
    }
}

export async function createRequestUsersDocument(reqUserId) {
    try {
        await setDoc(doc(fireStore, 'requestUsers', reqUserId), {
            accepted: false,
        });
    } catch (e) {
        alert(e);
        return;
    }
}
