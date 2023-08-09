import React, { useState, useEffect } from 'react';
import './AdminPage.css';
import {
    changeRequestUsersDocument,
    fetchUserData,
    getAcceptedRequestUsersDocument,
    getNotAcceptedRequestUsersDocument,
} from '../../features/user/api/requestUsersDocumentApi';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { fireStore } from '../../Firebase';

function AdminPage() {
    const [notAcceptedRequestList, setNotAcceptedRequestList] = useState([]);
    const [acceptedRequestList, setAcceptedRequestList] = useState([]);
    const [notAcceptedUserDetails, setNotAcceptedUserDetails] = useState({});
    const [acceptedUserDetails, setAcceptedUserDetails] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                const notAcceptedData =
                    await getNotAcceptedRequestUsersDocument();
                setNotAcceptedRequestList(notAcceptedData);

                const acceptedData = await getAcceptedRequestUsersDocument();
                setAcceptedRequestList(acceptedData);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        async function fetchAcceptedUsersWithUserType() {
            const acceptedUsersWithUserType = [];
            const q = query(
                collection(fireStore, 'users'),
                where('userType', '==', 1),
            );

            try {
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    acceptedUsersWithUserType.push(doc.data());
                });

                setAcceptedUserDetails(acceptedUsersWithUserType);
            } catch (error) {
                console.error(error);
            }
        }

        fetchAcceptedUsersWithUserType();
    }, []);

    useEffect(() => {
        async function fetchUserDetails(userIds, setUserDetailsFn) {
            const userDetailsMap = await Promise.all(
                userIds.map(async (userId) => {
                    const userData = await fetchUserData(userId);
                    return { userId, userData };
                }),
            );

            const userDetailsObj = {};
            userDetailsMap.forEach((item) => {
                userDetailsObj[item.userId] = item.userData;
            });

            setUserDetailsFn(userDetailsObj);
        }

        if (notAcceptedRequestList.length > 0) {
            fetchUserDetails(notAcceptedRequestList, setNotAcceptedUserDetails);
        }

        if (acceptedRequestList.length > 0) {
            fetchUserDetails(acceptedRequestList, setAcceptedUserDetails);
        }
    }, [notAcceptedRequestList, acceptedRequestList]);

    const displayNotAcceptedRequestUser = notAcceptedRequestList.map(
        (value, i) => (
            <div key={i}>
                {notAcceptedUserDetails[value] && (
                    <div className="request">
                        <p className="request-title">
                            {notAcceptedUserDetails[value].name}
                        </p>
                        <div className="right-side">
                            <p className="request-email">
                                {notAcceptedUserDetails[value].email}
                            </p>
                            <div className="request-button">
                                <button
                                    className="confirm"
                                    onClick={async () => {
                                        await changeRequestUsersDocument(
                                            notAcceptedUserDetails[value].id,
                                        );
                                        window.location.reload();
                                    }}
                                >
                                    확인
                                </button>
                                <button className="delete">삭제</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        ),
    );

    const displayAcceptedRequestUser = acceptedRequestList.map((value, i) => (
        <div key={i}>
            {acceptedUserDetails[value] && (
                <div className="already">
                    <p className="already-title">
                        {acceptedUserDetails[value].name}
                    </p>
                    <div className="user-id">
                        <p className="user-info-title">ID</p>
                        <p className="user-info-text">
                            {acceptedUserDetails[value].id}
                        </p>
                    </div>
                    <div className="user-email">
                        <p className="user-info-title">Email</p>
                        <p className="user-info-text">
                            {acceptedUserDetails[value].email}
                        </p>
                    </div>
                </div>
            )}
        </div>
    ));
    return (
        <div className="whole-container">
            <div className="admin-request">
                <h1>주최자 권한 요청</h1>
                <div className="not-accepted">
                    {displayNotAcceptedRequestUser}
                </div>
            </div>
            <div className="already-request">
                <h1>등록된 주최자 계정</h1>
                <div className="accepted">{displayAcceptedRequestUser}</div>
            </div>
        </div>
    );
}

export default AdminPage;
