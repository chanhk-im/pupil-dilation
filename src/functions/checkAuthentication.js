import React from 'react';
import { useSelector } from 'react-redux';
import { getRequestUsersDocumenetById } from '../features/user/api/requestUsersDocumentApi';

export async function hasHostPermission(user) {
    const info = await getRequestUsersDocumenetById(user.id);

    if (info) {
        if (info.accepted) {
            return user.userType === 1 ? true : false;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
