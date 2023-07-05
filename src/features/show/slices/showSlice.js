import { createSlice } from '@reduxjs/toolkit';

export const showSlice = createSlice({
    name: 'show',
    initialState: {
        showList: [],
    },
    reducers: {
        addShow: (state, action) => {
            console.log(action.payload);
            state.showList.push(action.payload);
        },
        fetchShowList: (state, action) => {
            state.showList = action.payload;
        },
        markAsDownloadImage: (state, action) => {
            state.showList[action.payload.index].imageDownloaded = true;
            state.showList[action.payload.index].image = action.payload.url;
        },
    },
});

export const { addShow, fetchShowList, markAsDownloadImage } =
    showSlice.actions;

export default showSlice.reducer;
