import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: 'dark',
    loader: false,
};
export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
        },
    },
});
export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
