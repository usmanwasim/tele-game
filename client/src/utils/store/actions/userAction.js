import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const userSignup = createAsyncThunk(
    'user/signupstatus',
    async ({ username, email, firstName, lastName, gender, password }, { rejectWithValue }) => {
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/users/add`,
                { username, email, firstName, lastName, password, gender },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    },
);

export const userLogin = createAsyncThunk(
    'user/loginStatus',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const data = await axios
                .post(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
                    { username, password },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    },
                )
                .then((res) => res.data);

            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    },
);

export const userAuth = createAsyncThunk(
    'user/authStatus',
    async ({ token }, { rejectWithValue }) => {
        try {
            const data = await axios
                .get(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/me`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => res.data);

            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    },
);
