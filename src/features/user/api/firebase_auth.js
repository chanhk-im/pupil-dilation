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

const handleError = (code) => {
    switch (code) {
        case 'auth/user-not-found':
            // return '이메일이 존재하지 않습니다.';
            return 2;
        case 'auth/wrong-password':
            // return '비밀번호가 일치하지 않습니다.';
            return 3;
        case 'auth/email-already-in-use':
            // return '이미 사용 중인 이메일입니다.';
            return 4;
        case 'auth/weak-password':
            // return '비밀번호는 6글자 이상이어야 합니다.';
            return 5;
        case 'auth/network-request-failed':
            // return '네트워크 연결에 실패하였습니다.';
            return 6;
        case 'auth/invalid-email':
            // return '잘못된 이메일 형식입니다.';
            return 7;
        case 'auth/internal-error':
            // return '잘못된 요청입니다.';
            return 8;
        default:
            // return '알 수 없는 오류로 회원가입에 실패했습니다.';
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
            // TODO: firebase에 user정보 추가
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
            // alert(handleError(error.code));
            res = handleError(error.code);
        });
    return res;
}

export async function loginUser(id, password) {
    let res = {};
    const col = collection(fireStore, 'users');
    const q = query(col, where('id', '==', id));
    const loginUserInfo = await getDocs(q);

    if (loginUserInfo.docs.length === 0) {
        // alert('존재하지 않는 id입니다.');
        return 1;
    }

    try {
        const userCredential = await signInWithEmailAndPassword(
            authService,
            loginUserInfo.docs[0].data().email,
            password,
        );

        const isHost = await hasHostPermission(loginUserInfo.docs[0].data());

        res = {
            user: loginUserInfo.docs[0].data(),
            userCredential,
            isHost,
        };
    } catch (error) {
        const errorCode = handleError(error.code);
        // alert(errorCode);
        // console.log(errorCode);
        return errorCode;
    }

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
    // if (userInfo.docs.length > 0) {
    //     console.log(userInfo.docs[0].data());
    // } else {
    //     alert('존재하지 않는 id입니다.');
    //     return false;
    // }

    const user = authService.currentUser;
    const newData = {
        id: id,
        password: newPassword,
    };
    console.log(user);
    if (currentPassword !== realPassword) {
        // alert('비밀번호가 일치하지 않습니다');
        return 1;
    }
    if (newPassword === '') {
        // alert('새 비밀번호를 입력해주세요');
        return 2;
    }
    if (newPassword !== checkPassword) {
        // alert('새 비밀번호와 비밀번호 확인 부분이 다릅니다');
        return 3;
    }

    updatePassword(user, newPassword)
        .then(() => {
            updateUsersDocument(newData);
        })

        .catch((error) => {
            //An error ocurred
            alert(error);
        });
    // alert('수정 완료');
    return 4;
    // alert(1);
}

export async function updateUsersDocument(updateData) {
    await updateDoc(doc(fireStore, 'users', updateData.id), {
        password: updateData.password,
    });
}
