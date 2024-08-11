/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import BizReplyConfig from 'BizReplyConfig';

const initialState = {
    subscription: {},
    isLoading: false,
    isError: false,
    error: ''
};

export const fetchSubscription = createAsyncThunk('subscription/fetchSubscription', ({ accessToken, email }) =>
    axios.post(
        `${BizReplyConfig.getNodeUrl()}stripe/checkSubscription`,
        {
            email
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
    )
);
const subscriptionSlice = createSlice({
    name: 'subscription',
    initialState,
    reducers: {
        cleanError(state) {
            state.error = '';
            state.isError = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSubscription.pending, (state) => {
            state.isLoading = true;
            // state.error = '';
            // state.isError = false;
        });
        builder.addCase(fetchSubscription.fulfilled, (state, action) => {
            const payload = action.payload.data;
            state.isLoading = false;
            state.subscription = { ...payload, status: 'success' };
        });
        builder.addCase(fetchSubscription.rejected, (state, action) => {
            state.isLoading = false;
            const message = action.payload?.response?.data?.message || action.payload?.message;
            state.error = message;
            state.isError = true;
        });
    }
});

export default subscriptionSlice.reducer;
export const { cleanError } = subscriptionSlice.actions;
