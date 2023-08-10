import {
    getAuth,
    updatePassword,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { collection, addDoc, getDocs, where, query } from 'firebase/firestore';
import { authService, fireStore } from '../../../Firebase';
import { setDoc, doc, updateDoc } from 'firebase/firestore';
import { hasHostPermission } from '../../../functions/checkAuthentication';

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

export async function createUser(newUserInfo) {
    let res = false;

    await createUserWithEmailAndPassword(
        authService,
        newUserInfo.email,
        newUserInfo.password,
    )
        .then(async () => {
            await setDoc(doc(fireStore, 'users', newUserInfo.id), newUserInfo)
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
    const col = collection(fireStore, 'users');
    const q = query(col, where('id', '==', id));
    const loginUserInfo = await getDocs(q);

    if (loginUserInfo.docs.length === 0) {
        return 1;
    }

    await signInWithEmailAndPassword(
        authService,
        loginUserInfo.docs[0].data().email,
        password,
    )
        .then(async (userCredential) => {
            const isHost =
                loginUserInfo.docs[0].data().userType === 0 ? false : true;
            console.log(isHost);
            res = {
                user: loginUserInfo.docs[0].data(),
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
    await updateDoc(doc(fireStore, 'users', updateData.id), {
        password: updateData.password,
    });
}
