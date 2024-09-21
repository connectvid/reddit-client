/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-syntax */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    error: null,
    report: null,
    reports: [],
    reportLoading: false,
    reportUpdateLoading: false,
    reportCreateLoading: false,
    reportDeleteLoading: false,
    reportUpdated: false,
    reportCreated: false,
    reportDeleted: false,
    loading: false
};

const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {
        hasError(state, action) {
            state.error = action.payload;
        },
        reportInit(state) {
            state = initialState;
        },

        loading(state, { payload }) {
            state.loading = payload;
        },
        reportLoading(state, { payload = true }) {
            state.reportLoading = payload;
        },
        getAllReports(state, { payload }) {
            state.reports = payload.items;
            state.loading = false;
        },
        getReport(state, { payload }) {
            state.report = payload.item;
            state.reportLoading = false;
        },
        reportCreateLoading(state, { payload = true }) {
            state.reportCreateLoading = payload;
        },
        addReport(state, { payload }) {
            state.reports = [payload.item, ...state.reports];
            state.reportCreateLoading = false;
            state.reportCreated = true;
        },

        reportUpdateLoading(state, { payload }) {
            state.reportUpdateLoading = payload;
        },
        updateReport(state, { payload }) {
            // state.report = payload.item;
            // state.reportUpdateLoading = false;
            // state.reportUpdated = true;
        },
        reportDeleteLoading(state, { payload }) {
            state.reportDeleteLoading = payload;
        },
        removeReport(state, { payload }) {
            const { _id } = payload.item;
            state.reports = state.reports.filter((item) => item._id !== _id);
            state.reportDeleteLoading = false;
            state.reportDeleteLoading = true;
        }
    }
});

export const {
    hasError,
    loading,
    reportLoading,
    reportUpdateLoading,
    reportCretedOrUpdated,
    getReport,
    updateReport,
    setreportCredits,
    reportInit,
    reportCreateLoading,
    addReport,
    reportDeleteLoading,
    removeReport,
    getAllReports
} = reportSlice.actions;

export default reportSlice.reducer;
