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
import { decrypt } from '../../../components/Crypto/Crypto';

export async function getNotAcceptedRequestUsersDocument() {
    const requestList = [];
    const q = query(
        collection(fireStore, 'requestUsers'),
        where('accepted', '==', false),
    );
    try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((elementDoc) => {
            const reqUser = elementDoc.id;
            requestList.push(reqUser);
        });
        return requestList;
    } catch (e) {
        alert(e);
        return;
    }
}

export async function getAcceptedRequestUsersDocument() {
    const requestList = [];
    const q = query(
        collection(fireStore, 'requestUsers'),
        where('accepted', '==', true),
    );
    try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((elementDoc) => {
            const reqUser = elementDoc.id;
            requestList.push(reqUser);
        });
        return requestList;
    } catch (e) {
        alert(e);
        return;
    }
}

export async function fetchUserData(userId) {
    const q = doc(fireStore, 'users', userId);
    const decryptionKey = userId;
    const querySnapshot = await getDoc(q);
    if (querySnapshot.exists()) {
        const encryptedUserData = querySnapshot.data().encryptedData;
        const decryptedUserData = decrypt(encryptedUserData, decryptionKey);
        return decryptedUserData;
    } else {
        return null;
    }
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
            id: reqUserId,
        });
    } catch (e) {
        alert(e);
        return;
    }
}

export async function changeRequestUsersDocument(reqUserId) {
    try {
        await setDoc(doc(fireStore, 'requestUsers', reqUserId), {
            accepted: true,
            id: reqUserId,
        });
    } catch (e) {
        alert(e);
        return;
    }
}

export async function deleteRequestUsersDocument(reqUserId) {
    await deleteDoc(doc(fireStore, 'requestUsers', reqUserId))
        .then(() => {
            return true;
        })
        .catch((e) => {
            alert(e);
            return false;
        });
    return false;
}

export async function checkRequestUsersDocument(reqUserId) {
    const q = query(
        collection(fireStore, 'requestUsers'),
        where('id', '==', reqUserId),
        where('accepted', '==', true),
    );

    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
}
