/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-syntax */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    error: null,
    mention: null,
    mentionSetting: null,
    mentionSettingLoading: false,
    mentionSettingUpdateLoading: false,
    mentionSettingCreteOrUpdateLoading: false,
    mentionSettingCretedOrUpdated: false,
    mentionSettingUpdated: false,
    mentionSettingCreated: false,
    loading: false
};

const mentionSlice = createSlice({
    name: 'mention',
    initialState,
    reducers: {
        hasError(state, action) {
            state.error = action.payload;
        },
        mentionInit(state) {
            state = initialState;
        },

        loading(state, { payload }) {
            state.loading = payload;
        },
        mentionSettingUpdateLoading(state, { payload }) {
            state.mentionSettingUpdateLoading = payload;
        },
        getMentionSetting(state, { payload }) {
            state.mentionSetting = payload.item;
            state.loading = false;
        },
        updateMentionSetting(state, { payload }) {
            state.mentionSetting = payload.item;
            state.mentionSettingCreteOrUpdateLoading = false;
            state.mentionSettingCretedOrUpdated = true;
        },
        mentionSettingCretedOrUpdated(state, { payload }) {
            state.mentionSettingCretedOrUpdated = payload;
        }
    }
});

export const {
    hasError,
    loading,
    mentionSettingUpdateLoading,
    mentionSettingCretedOrUpdated,
    getMentionSetting,
    updateMentionSetting,
    setMentionCredits,
    mentionInit
} = mentionSlice.actions;

export default mentionSlice.reducer;
