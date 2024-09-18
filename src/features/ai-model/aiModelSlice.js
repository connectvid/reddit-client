/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-syntax */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    error: null,
    aiModels: [],
    selectedAiModel: null,
    aiModel: null,
    aiModelLoading: false,
    singleAiModelloading: false,
    aiModelUpdateLoading: false,
    aiModelCreteOrUpdateLoading: false,
    aiModelCretedOrUpdated: false,
    aiModelUpdated: false,
    aiModelCreated: false,
    loading: false
};

const mentionSlice = createSlice({
    name: 'AiModel',
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
        singleAiModelloading(state, { payload }) {
            state.singleAiModelloading = payload;
        },
        aiModelUpdateLoading(state, { payload }) {
            state.aiModelUpdateLoading = payload;
        },
        getAiModel(state, { payload }) {
            state.aiModel = payload.item;
            state.singleAiModelloading = false;
        },
        getAiModels(state, { payload }) {
            state.aiModels = payload.items;
            state.loading = false;
        },
        updateAiModel(state, { payload }) {
            state.aiModel = payload.item;
            state.aiModelCreteOrUpdateLoading = false;
            state.aiModelCretedOrUpdated = true;
        },
        aiModelCretedOrUpdated(state, { payload }) {
            state.aiModelCretedOrUpdated = payload;
        }
    }
});

export const {
    hasError,
    loading,
    singleAiModelloading,
    aiModelUpdateLoading,
    aiModelCretedOrUpdated,
    getAiModel,
    getAiModels,
    updateAiModel,
    mentionInit
} = mentionSlice.actions;

export default mentionSlice.reducer;
