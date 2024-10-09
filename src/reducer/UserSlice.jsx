import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = 'http://localhost:8080';

// Async thunk for logging in the user
export const loginUser = createAsyncThunk(
    'auth/login',
    async (userCredential, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, userCredential);
            const data = response.data;
            localStorage.setItem('user', JSON.stringify(data));
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data || error.message);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.isAuthenticated = false;
                state.user = null;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
                if (action.payload?.message === 'Unauthorized') {
                    state.error = 'Access Denied! Invalid Credentials';
                } else {
                    state.error = action.payload || action.error.message;
                }
            });
    }
});

export default userSlice.reducer;
