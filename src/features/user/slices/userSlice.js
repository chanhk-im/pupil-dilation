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
            userType: 0,
        },
        isLogged: false,
        isHost: false,
        userCredential: undefined,
    },
    reducers: {
        stageUser: (state, action) => {
            state.user = action.payload.user;
            state.userCredential = action.payload.userCredential;
            state.isLogged = true;
            state.isHost = action.payload.isHost;
        },
        restoreUser: (state) => {
            state.user = {
                id: '',
                password: '',
                name: '',
                phone: '',
                email: '',
                userType: 0,
            };
            state.isLogged = false;
            state.isHost = false;
        },
        setIsHost: (state, action) => {
            state.isHost = action.payload;
        },
        changePasswordUser: (state, action) => {
            state.user.password = action.payload;
        },
    },
});

export const { stageUser, restoreUser, changePasswordUser } = userSlice.actions;

export default userSlice.reducer;
