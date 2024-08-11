/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import BizReplyConfig from 'BizReplyConfig';

const initialState = {
    plans: [],
    isLoading: false,
    isError: false,
    error: ''
};

export const fetchPlans = createAsyncThunk('plan/fetchPlans', (accessToken) =>
    axios.get(`${BizReplyConfig.getNodeUrl()}plans`, { headers: { Authorization: `Bearer ${accessToken}` } })
);
const planSlice = createSlice({
    name: 'plan',
    initialState,
    reducers: {
        cleanError(state) {
            state.error = '';
            state.isError = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPlans.pending, (state) => {
            state.isLoading = true;
            state.error = '';
            state.isError = false;
        });
        builder.addCase(fetchPlans.fulfilled, (state, action) => {
            state.isLoading = false;
            state.plans = action.payload.data.plans;
        });
        builder.addCase(fetchPlans.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.isError = true;
        });
    }
});

export default planSlice.reducer;
export const { cleanError } = planSlice.actions;
