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
    },
    reducers: {
        stageUser: (state, action) => {
            state.user = action.payload;
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
    },
});

export const { stageUser, restoreUser } = userSlice.actions;

export default userSlice.reducer;
