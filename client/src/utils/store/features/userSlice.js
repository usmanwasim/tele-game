'use client';
import { createSlice } from '@reduxjs/toolkit';
import { userAuth, userLogin, userSignup } from '../actions/userAction';
import { toast } from 'react-toastify';

const initialState = {
    id: null,
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    gender: '',
    image: '',
    token: '',
    loading: false,
    error: null,
    success: false,
};
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userSignup.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(userSignup.fulfilled, (state) => {
                toast.success('Signed up');
                state.loading = false;
                state.error = null;
                state.success = true;
            })
            .addCase(userSignup.rejected, (state, { payload }) => {
                const error = typeof payload === 'string' ? payload : 'An error occurred';
                toast.error(error);
                state.success = false;
                state.loading = false;
                state.error = error;
            })
            .addCase(userLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(userLogin.fulfilled, (state, { payload }) => {
                toast.success('Logged in');
                return {
                    ...payload,
                    success: true,
                    error: null,
                    loading: false,
                };
            })
            .addCase(userLogin.rejected, (state, { payload }) => {
                const error = typeof payload === 'string' ? payload : 'An error occurred';
                toast.error(error);
                state.loading = false;
                state.success = false;
                state.error = error;
            })
            .addCase(userAuth.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(userAuth.fulfilled, (state, { payload }) => {
                return {
                    ...payload,
                    token: state.token,
                    success: true,
                    error: null,
                    loading: false,
                };
            })
            .addCase(userAuth.rejected, (state) => {
                return {
                    ...state,
                    id: null,
                    username: '',
                    email: '',
                    firstName: '',
                    lastName: '',
                    gender: '',
                    image: '',
                    token: '',
                    loading: false,
                    error: null,
                    success: false,
                };
            });
    },
});

export default userSlice.reducer;
