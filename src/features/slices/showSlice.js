import { createSlice } from '@reduxjs/toolkit';

export const showSlice = createSlice({
    name: 'show',
    initialState: {
        showList: [
            {
                id: 0,
                title: '즉새두',
                introduction: 'Englishman in New York',
                period: '2023.05.18 ~ 2023.05.19',
                schedule: [
                    '(5/18 일) 20:00',
                    '(5/19 월) 21:30',
                    '(5/20 화) 20:30',
                ],
                place: '장소이름',
                price: 3000,
            },
            {
                id: 1,
                title: '미르',
                introduction: '유다빈밴드 백일몽',
                period: '2023.05.18 ~ 2023.05.19',
                schedule: [
                    '(6/18 일) 20:00',
                    '(6/19 월) 21:30',
                    '(6/20 화) 20:30',
                ],
                place: '장소이름',
                price: 4000,
            },
            {
                id: 2,
                title: '네오',
                introduction: '모시깽이',
                period: '2023.05.18 ~ 2023.05.19',
                schedule: [
                    '(6/18 일) 20:00',
                    '(6/19 월) 21:30',
                    '(6/20 화) 20:30',
                ],
                place: '장소이름',
                price: 4000,
            },
        ],
    },
    reducers: {
        addShow: (state, action) => {
            state.showList.push(action.payload);
        },
    },
});

export const { addShow } = showSlice.actions;

export default showSlice.reducer;
