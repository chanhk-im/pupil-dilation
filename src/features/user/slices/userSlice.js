import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'show',
    initialState: {
        user: {
            id: '',
            password: '',
            name: '',
            phone: '',
            email: '',
        },
        isLogged: false,
    },
    reducers: {
        stageUser: (state, action) => {
            state.user = action.payload;
            state.isLogged = true;
        },
    },
});

export const { stageUser } = userSlice.actions;

export default userSlice.reducer;
