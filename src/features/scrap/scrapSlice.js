/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import TwitterDMConfig from 'TwitterDMConfig';

const initialState = {
    scraps: [],
    currentScrapingId: '',
    isLoading: false,
    error: '',
    results: [],
    isResultLoading: false,
    resultError: '',
    startScrapLoading: false,
    startScraperror: '',
    scrapIds: [],
    startScrapSuccess: ''
};

export const fetchScraps = createAsyncThunk('fetchScraps/fetchScraps', ({ id, token, qry = '' }) =>
    axios.get(`${TwitterDMConfig.getNodeUrl()}email-scrapper/scrap-by-extension/${id}?${qry}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
);

export const fetchResults = createAsyncThunk('scrapedResults/fetchResults', ({ id, token, qry = '' }) =>
    axios.get(`${TwitterDMConfig.getNodeUrl()}email-scrapper/scrap-by-extension/${id}?${qry}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
);

export const startScrap = createAsyncThunk('scrapedResults/startScrap', ({ id, token }) => {
    console.log('sending api request');
    return axios.get(`${TwitterDMConfig.getNodeUrl()}email-scrapper/extensions-scrap-start/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
});

const scrapResultSlice = createSlice({
    name: 'scrapedResults',
    initialState,
    reducers: {
        cleanError(state) {
            state.error = '';
        },
        cleanResultError(state) {
            state.resultError = '';
        },
        cleanStartScrapError(state) {
            state.startScraperror = '';
        },
        clearStartScrapSuccess(state) {
            state.startScrapSuccess = '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchScraps.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        });
        builder.addCase(fetchScraps.fulfilled, (state, action) => {
            state.isLoading = false;
            const data = action.payload.data.data?.reverse?.() || [];
            state.scraps = data;
        });
        builder.addCase(fetchScraps.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
        // Scrap Results
        builder.addCase(fetchResults.pending, (state) => {
            state.isResultLoading = true;
            state.resultError = '';
        });
        builder.addCase(fetchResults.fulfilled, (state, action) => {
            state.isResultLoading = false;
            state.results = action.payload.data.data?.reverse?.() || [];
        });
        builder.addCase(fetchResults.rejected, (state, action) => {
            state.isResultLoading = false;
            state.resultError = action.error.message;
        }); // Start Scrap
        builder.addCase(startScrap.pending, (state, action) => {
            state.currentScrapingId = action.meta.arg.id;
            state.startScrapLoading = true;
            state.startScraperror = '';
        });
        builder.addCase(startScrap.fulfilled, (state, action) => {
            const id = action.meta.arg.id;
            state.scrapIds = [...state.scrapIds, id];
            state.startScrapLoading = false;
            state.currentScrapingId = null;
            state.startScrapSuccess = action.payload.data.message;
        });
        builder.addCase(startScrap.rejected, (state, action) => {
            state.startScrapLoading = false;
            state.currentScrapingId = null;
            state.startScraperror = action.error.message;
        });
    }
});

export default scrapResultSlice.reducer;
export const { cleanError, cleanResultError, cleanStartScrapError, clearStartScrapSuccess } = scrapResultSlice.actions;
