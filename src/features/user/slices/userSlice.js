import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {
            id: '',
            password: '',
            name: '',
            phone: '',
            email: '',
            isHost: false,
        },
        isLogged: false,
        userCredential: undefined,
    },
    reducers: {
        stageUser: (state, action) => {
            state.user = action.payload.user;
            state.userCredential = action.payload.userCredential;
            state.isLogged = true;
        },
        restoreUser: (state) => {
            state.user = {
                id: '',
                password: '',
                name: '',
                phone: '',
                email: '',
                isHost: false,
            };
            state.isLogged = false;
        },
        changePasswordUser: (state, action) => {
            state.user.password = action.payload;
        },
    },
});

export const { stageUser, restoreUser, changePasswordUser } = userSlice.actions;

export default userSlice.reducer;
