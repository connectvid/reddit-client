/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-syntax */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    error: null,
    aiModels: [],
    aiModelsGroup: { OpenAi: [], Straico: [], Gemini: [] },
    aiModelsString: [],
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
    name: 'aiModel',
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
            const items = payload.items;
            state.aiModels = items;
            const group = {};
            const strings = [];
            for (const item of items) {
                group[item.modelGroupName] = item.model;
                strings.push(item.model);
            }
            state.aiModelsGroup = { ...state.aiModelsGroup, ...group };
            state.aiModelsString = strings;
            const defaultModel = items.find((item) => item.type === 'default');
            state.selectedAiModel = defaultModel;
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
