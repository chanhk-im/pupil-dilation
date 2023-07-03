import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { collection, addDoc, getDocs, where, query } from 'firebase/firestore';
// import { useDispatch } from 'react-redux';
import { authService, fireStore } from '../../../Firebase';
// import { stageUser } from '../slices/userSlice';

const handleError = (code) => {
    switch (code) {
        case 'auth/user-not-found':
            return '이메일이 존재하지 않습니다.';
        case 'auth/wrong-password':
            return '비밀번호가 일치하지 않습니다.';
        case 'auth/email-already-in-use':
            return '이미 사용 중인 이메일입니다.';
        case 'auth/weak-password':
            return '비밀번호는 6글자 이상이어야 합니다.';
        case 'auth/network-request-failed':
            return '네트워크 연결에 실패하였습니다.';
        case 'auth/invalid-email':
            return '잘못된 이메일 형식입니다.';
        case 'auth/internal-error':
            return '잘못된 요청입니다.';
        default:
            return '알 수 없는 오류로 회원가입에 실패했습니다.';
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
            await addDoc(collection(fireStore, 'users'), newUserInfo)
                .then(() => {
                    res = true;
                })
                .catch((error) => {
                    alert(error);
                    res = false;
                });
        })
        .catch((error) => {
            alert(handleError(error.code));
            res = false;
        });
    return res;
}

export async function loginUser(id, password) {
    let res = true;
    // const dispatch = useDispatch();
    const col = collection(fireStore, 'users');
    const q = query(col, where('id', '==', id));
    const loginUserInfo = await getDocs(q);
    if (loginUserInfo.docs.length > 0) {
        console.log(loginUserInfo.docs[0].data());
    } else {
        alert('존재하지 않는 id입니다.');
        return false;
    }

    await signInWithEmailAndPassword(
        authService,
        loginUserInfo.docs[0].data().email,
        password,
    )
        .then(() => {
            // dispatch(stageUser(loginUserInfo));
            res = true;
        })
        .catch((error) => {
            alert(handleError(error.code));
            res = false;
        });

    return res;
}
