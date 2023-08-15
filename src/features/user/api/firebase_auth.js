import {
    getAuth,
    updatePassword,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import {
    collection,
    addDoc,
    getDocs,
    where,
    query,
    getDoc,
} from 'firebase/firestore';
import { authService, fireStore } from '../../../Firebase';
import { setDoc, doc, updateDoc } from 'firebase/firestore';
import { hasHostPermission } from '../../../functions/checkAuthentication';
import { encrypt, decrypt } from '../../../components/Crypto/Crypto';

const handleErrorLogin = (code) => {
    switch (code) {
        case 'auth/user-not-found':
            return 2;
        case 'auth/wrong-password':
            return 3;
        default:
            return 4;
    }
};

const handleErrorSignUp = (code) => {
    switch (code) {
        case 'auth/email-already-in-use':
            return 4;
        case 'auth/weak-password':
            return 5;
        case 'auth/network-request-failed':
            return 6;
        case 'auth/invalid-email':
            return 7;
        case 'auth/internal-error':
            return 8;
        default:
            return 9;
    }
};

export async function checkID(newUserInfo) {
    const docRef = doc(fireStore, 'users', newUserInfo.id);
    const loginUserSnapshot = await getDoc(docRef);
    if (loginUserSnapshot.exists()) {
        return true;
    }
}

export async function createUser(newUserInfo) {
    let res = false;

    await createUserWithEmailAndPassword(
        authService,
        newUserInfo.email,
        newUserInfo.password,
    )
        .then(async () => {
            const encryptionKey = newUserInfo.id;
            const data = {
                encryptedData: encrypt(newUserInfo, encryptionKey),
                encryptionKey: encryptionKey,
            };
            await setDoc(doc(fireStore, 'users', newUserInfo.id), data)
                .then(() => {
                    res = true;
                })
                .catch((error) => {
                    alert(error);
                    res = false;
                });
        })
        .catch((error) => {
            res = handleErrorSignUp(error.code);
        });
    return res;
}

export async function loginUser(id, password) {
    let res = {};
    if (id === '' || password === '') {
        return 10;
    }
    const docRef = doc(fireStore, 'users', id);
    const loginUserSnapshot = await getDoc(docRef);
    if (!loginUserSnapshot.exists()) {
        return 1;
    }

    const loginUserInfo = decrypt(
        loginUserSnapshot.data().encryptedData,
        loginUserSnapshot.data().encryptionKey,
    );

    await signInWithEmailAndPassword(authService, loginUserInfo.email, password)
        .then(async (userCredential) => {
            const isHost = loginUserInfo.userType === 0 ? false : true;
            res = {
                user: loginUserInfo,
                userCredential,
                isHost,
            };
        })
        .catch((error) => {
            const errorCode = handleErrorLogin(error.code);
            return errorCode;
        });

    return res;
}

export async function changePassword(
    id,
    currentPassword,
    realPassword,
    newPassword,
    checkPassword,
) {
    let res;
    const col = collection(fireStore, 'users');
    const q = query(col, where('id', '==', id));
    const userInfo = await getDocs(q);

    const user = authService.currentUser;
    const newData = {
        id: id,
        password: newPassword,
    };
    console.log(user);
    if (currentPassword !== realPassword) {
        return 1;
    }
    if (newPassword === '') {
        return 2;
    }
    if (newPassword !== checkPassword) {
        return 3;
    }

    updatePassword(user, newPassword)
        .then(() => {
            updateUsersDocument(newData);
        })

        .catch((error) => {
            alert(error);
        });
    return 4;
}

export async function updateUsersDocument(updateData) {
    let res = {};
    const docRef = doc(fireStore, 'users', updateData.id);
    const updateUserSnapshot = await getDoc(docRef);

    const updateUserInfo = decrypt(
        updateUserSnapshot.data().encryptedData,
        updateUserSnapshot.data().encryptionKey,
    );

    updateUserInfo.password = updateData.password;

    const encryptionKey = updateUserInfo.id;
    const data = {
        encryptedData: encrypt(updateUserInfo, encryptionKey),
        encryptionKey: encryptionKey,
    };

    await setDoc(doc(fireStore, 'users', updateData.id), data)
        .then(() => {
            res = true;
        })
        .catch((error) => {
            alert(error);
            res = false;
        });

    // await updateDoc(doc(fireStore, 'users', updateData.id), {
    //     password: updateUserInfo.password,
    // });

    return res;
}
